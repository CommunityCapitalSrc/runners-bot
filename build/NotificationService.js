"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
var SlackWebApi = __importStar(require("@slack/web-api"));
var dotenv = __importStar(require("dotenv"));
var State_1 = require("./State");
dotenv.config();
// const token = process.env.BOT_TOKEN
var token = 'xoxb-1023509052823-4087609066962-pBCglmA5uOHCVhtsVqHAF6Rr';
var WebClient = SlackWebApi.WebClient, LogLevel = SlackWebApi.LogLevel;
var client = new WebClient(token, {
    logLevel: LogLevel.DEBUG,
});
var NotificationService = /** @class */ (function () {
    function NotificationService() {
    }
    NotificationService.prototype.postRunnerDownMessage = function (_a) {
        var runnerId = _a.runnerId;
        var runners = State_1.State.runnersData;
        var runner = runners === null || runners === void 0 ? void 0 : runners.find(function (runner) { return runner.id === runnerId; });
        client.chat.postMessage({
            token: token,
            channel: process.env.MOBILE_CI_CHANNEL_ID,
            text: "Runner *".concat(runner === null || runner === void 0 ? void 0 : runner.name, "* is down"),
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
        });
    };
    NotificationService.prototype.postRunnerUpMessage = function (_a) {
        var runnerId = _a.runnerId;
        var runners = State_1.State.runnersData;
        var runner = runners === null || runners === void 0 ? void 0 : runners.find(function (runner) { return runner.id === runnerId; });
        client.chat.postMessage({
            token: token,
            channel: process.env.MOBILE_CI_CHANNEL_ID,
            text: "Runner *".concat(runner === null || runner === void 0 ? void 0 : runner.name, "* is up again"),
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
        });
    };
    return NotificationService;
}());
exports.NotificationService = NotificationService;
