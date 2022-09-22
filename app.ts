import * as eventsApi from '@slack/events-api'

import * as dotenv from 'dotenv'
import express from 'express'
import serverless from 'serverless-http'

import { NotificationService } from './src/NotificationService'
import { RequestService } from './src/RequestService'
import { State } from './src/State'

dotenv.config()

// const PORT = process.env.PORT || 3000
// const slackEvents = eventsApi.createEventAdapter(process.env.SIGNING_SECRET as string)
const slackEvents = eventsApi.createEventAdapter('9ef7f283270fcc4564da529fb710abc8')
// const slackEvents = eventsApi.createEventAdapter(process.env.SIGNING_SECRET)
export const app = express()
// const networks = getNetworksData()

const Notification = new NotificationService()

app.use('/', slackEvents.expressMiddleware())

setInterval(async () => {
  const {
    data: { runners },
  } = await RequestService.getRunnersData()

  const checkIsRunnerOffline = ({ runnerId }: { runnerId: number }) => {
    // const checkIsRunnerOffline = ({ runnerId }) => {
    const runners = State.runnersData
    const runner = runners?.find((runner) => runner.id === runnerId)
    // console.log('test')
    // console.log('test')
    return runner?.status === 'online'
    // return runner?.status === 'offline'
  }

  // AWS TEST ONLY
  //
  // Notification.postRunnerUpMessage({ runnerId: 24 })
  // AWS TEST ONLY

  // NOTE: initial run
  if (!State.runners) {
    State.initialData = runners
    runners.forEach(({ id: runnerId }) => {
      const isRunnerOffline = checkIsRunnerOffline({ runnerId })
      if (isRunnerOffline) {
        Notification.postRunnerDownMessage({ runnerId })
      }
    })
    return
    // NOTE: initial run end
  } else {
    runners.forEach((currentRunnerState) => {
      const runnerPrevState = State.runnersData?.find((runnerInState) => runnerInState.id === currentRunnerState.id)

      if (runnerPrevState?.status === 'offline' && currentRunnerState.status === 'online') {
        Notification.postRunnerUpMessage({ runnerId: currentRunnerState.id })
      }

      if (currentRunnerState.status === 'offline' && runnerPrevState?.status !== 'offline') {
        Notification.postRunnerDownMessage({ runnerId: currentRunnerState.id })
      }
    })
  }
  State.updateRunnersData(runners)
  // }, 60000)
}, 5000)

// app.listen(PORT, () => {
// console.log(`Runners Bor listening at http://${networks[Object.keys(networks)[0]]}:${PORT}`)
// })
module.exports.handler = serverless(app)
