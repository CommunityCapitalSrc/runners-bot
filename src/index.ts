import { RequestService } from "./RequestService";

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const token = process.env.BOT_TOKEN;
const eventsApi = require("@slack/events-api");
const slackEvents = eventsApi.createEventAdapter(process.env.SIGNING_SECRET);
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(token, {
  logLevel: LogLevel.DEBUG,
});
app.use("/", slackEvents.expressMiddleware());

slackEvents.on("message", async (event: any) => {
  console.log(event);
});

// slackEvents.on("message", async (event: any) => {
//   if (!event.subtype && !event.bot_id)
//     client.chat.postMessage({
//       token,
//       channel: process.env.MOBILE_CI_CHANNEL_ID,
//       //   thread_ts: event.ts,
//       text: "Wszystkiego najlepszego z okazji urodzin !! spóźnione, ale szczere :)",
//     });
// });

const interval = setInterval(async () => {
  const runnersResponse = await RequestService.getRunnersData();
  const runners = runnersResponse.data.runners;
  runners.forEach((runner) => {
    if (runner.status === "offline") {
      client.chat.postMessage({
        token,
        channel: process.env.MOBILE_CI_CHANNEL_ID,
        text: '"Runner is down"',
      });
    }
  });
  console.log("RUNNERS", runners);
}, 5000);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
