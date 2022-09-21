import * as SlackWebApi from '@slack/web-api'

import * as dotenv from 'dotenv'

import { StateService } from './State'

dotenv.config()

const token = process.env.BOT_TOKEN
const { WebClient, LogLevel } = SlackWebApi
const client = new WebClient(token, {
  logLevel: LogLevel.DEBUG,
})

export class NotificationService {
  public postRunnerDownMessage({ runnerId }: { runnerId: number }) {
    const runners = StateService.runnersData
    const runner = runners?.find((runner) => runner.id === runnerId)
    client.chat.postMessage({
      token,
      channel: process.env.MOBILE_CI_CHANNEL_ID as string,
      text: `Runner *${runner?.name}* is down`,
      attachments: [
        {
          color: '#FF033E',
          title: 'Runners State',
          title_link: 'https://github.com/CommunityCapitalSrc/Noumena-App/settings/actions/runners',
          text: 'Please pay attention to runners state',
          fields: [
            {
              title: 'Priority',
              value: 'High',
              short: false,
            },
          ],
          thumb_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
          footer: 'Runners Bot',
          footer_icon: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
          ts: Date.now().toString(),
        },
      ],
    })
  }

  public postRunnerUpMessage({ runnerId }: { runnerId: number }) {
    const runners = StateService.runnersData
    const runner = runners?.find((runner) => runner.id === runnerId)
    client.chat.postMessage({
      token,
      channel: process.env.MOBILE_CI_CHANNEL_ID as string,
      text: `Runner *${runner?.name}* is up again`,
      attachments: [
        {
          color: '#2eb886',
          title: 'Runners State',
          title_link: 'https://github.com/CommunityCapitalSrc/Noumena-App/settings/actions/runners',
          text: 'Please pay attention to runners state',
          fields: [
            {
              title: 'Priority',
              value: 'High',
              short: false,
            },
          ],
          thumb_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
          footer: 'Runners Bot',
          footer_icon: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
          ts: Date.now().toString(),
        },
      ],
    })
  }
}
