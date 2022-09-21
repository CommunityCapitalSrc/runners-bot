import * as eventsApi from '@slack/events-api'

import * as dotenv from 'dotenv'
import express from 'express'
import { networkInterfaces } from 'os'

import { NotificationService } from './NotificationService'
import { RequestService } from './RequestService'
import { StateService } from './State'

dotenv.config()

const PORT = process.env.PORT || 3000
const slackEvents = eventsApi.createEventAdapter(process.env.SIGNING_SECRET as string)
const app = express()
const nets = networkInterfaces()
const networks = Object.create(null)

for (const name of Object.keys(nets)) {
  for (const net of nets[name]!) {
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    if (net.family === familyV4Value && !net.internal) {
      if (!networks[name]) {
        networks[name] = []
      }
      networks[name].push(net.address)
    }
  }
}

console.log(networks)

app.use('/', slackEvents.expressMiddleware())

const Notification = new NotificationService()

setInterval(async () => {
  const {
    data: { runners },
  } = await RequestService.getRunnersData()

  const checkIsRunnerOffline = ({ runnerId }: { runnerId: number }) => {
    const runners = StateService.runnersData
    const runner = runners?.find((runner) => runner.id === runnerId)
    return runner?.status === 'offline'
  }

  // NOTE: initial run
  if (!StateService.runners) {
    StateService.initialData = runners
    runners.forEach(({ id: runnerId }) => {
      const isRunnerOffline = checkIsRunnerOffline({ runnerId })
      if (isRunnerOffline) {
        Notification.postRunnerDownMessage({ runnerId })
      }
    })
  }
  // NOTE: initial run end

  runners.forEach((currentRunnerState) => {
    const runnerPrevState = StateService.runnersData?.find(
      (runnerInState) => runnerInState.id === currentRunnerState.id,
    )

    if (runnerPrevState?.status === 'offline' && currentRunnerState.status === 'online') {
      Notification.postRunnerUpMessage({ runnerId: currentRunnerState.id })
    }

    if (currentRunnerState.status === 'offline' && runnerPrevState?.status !== 'offline') {
      Notification.postRunnerDownMessage({ runnerId: currentRunnerState.id })
    }
  })
}, 60000)

app.listen(PORT, () => {
  console.log(`Runners Bor listening at http://${networks[Object.keys(networks)[0]]}:${PORT}`)
})
