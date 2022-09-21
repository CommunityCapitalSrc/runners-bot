import * as eventsApi from '@slack/events-api'

import * as dotenv from 'dotenv'
import express from 'express'

import { NotificationService } from './NotificationService'
import { RequestService } from './RequestService'
import { StateService } from './State'

dotenv.config()

const PORT = process.env.PORT || 3000
const slackEvents = eventsApi.createEventAdapter(process.env.SIGNING_SECRET as string)
const app = express()

app.use('/', slackEvents.expressMiddleware())

const Notification = new NotificationService()

setInterval(async () => {
  const {
    data: { runners },
  } = await RequestService.getRunnersData()

  const checkIsRunnerOffline = ({ runnerId }: { runnerId: number }) => {
    const runners = StateService.runnersData
    const runner = runners?.find((runner) => runner.id === runnerId)
    return runner?.status === 'online'
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

  console.log('RUNNERS', runners)
}, 10000)

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
