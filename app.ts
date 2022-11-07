import * as eventsApi from '@slack/events-api'

import * as dotenv from 'dotenv'
import express from 'express'

import { NotificationService } from './src/NotificationService'
import { RequestService } from './src/RequestService'
import { State } from './src/State'
import { getNetworksData } from './src/networkHelper'

dotenv.config()

const PORT = process.env.PORT || 3000
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const slackEvents = eventsApi.createEventAdapter(process.env.SIGNING_SECRET!)
export const app = express()
const networks = getNetworksData()

const Notification = new NotificationService()

app.use('/', slackEvents.expressMiddleware())

// setInterval(() => {
// Notification.postHeartbeat()
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// }, parseInt(process.env.HEART_BEAT_INTERVAL!) || 3600000)

setInterval(async () => {
  const {
    data: { runners },
  } = await RequestService.getRunnersData()

  const checkIsRunnerOffline = ({ runnerId }: { runnerId: number }) => {
    const runners = State.runnersData
    const runner = runners?.find((runner) => runner.id === runnerId)
    return runner?.status === 'offline'
  }

  // NOTE: initial run
  if (!State.runners) {
    Notification.botLaunchedMessage()
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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}, parseInt(process.env.WATCH_INTERVAL!) || 60000)

app.listen(PORT, () => {
  console.log(`Runners Bot listening at http://${networks[Object.keys(networks)[0]]}:${PORT}`)
})
