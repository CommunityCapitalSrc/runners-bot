# Mac runners slack bot

Node.js application with Slack integration to post messages in channels

## Installation

### Install dependencies

```
yarn install
```

### Create .env file

```
cp .env.example .env
```

### Fill .env file with proper data

You can find proper data in links at the bottom of this readme file

```
SIGNING_SECRET= <Signing secret of the Slack app>
BOT_TOKEN= <bot token of the Slack app>
MOBILE_CI_CHANNEL_ID= <id of slack channel where to post messages>
GITHUB_API=https://api.github.com
GITHUB_AUTH_TOKEN= <auth token from github with access to github api>
PORT=3000 <It can stay>
MACHINE_NAME= <identify where the app is running>
WATCH_INTERVAL=60000 <How often we fetch data from github api>
```

## Running the app

### Local dev mode

```
yarn start:dev
```

### Local production mode

```
yarn start
```

### running the app on AWS EC2 server

```
npm run build && sudo pm2 start build/app.js
```

To make the process unstoppable please run

```
sudo pm2 startup
```

## Useful links

How to build slack bot with node.js https://medium.com/codex/building-a-slack-bot-using-node-js-part-1-7b3e7d54e9b6

How to deploy app to AWS EC2 https://ourcodeworld.com/articles/read/977/how-to-deploy-a-node-js-application-on-aws-ec2-server
