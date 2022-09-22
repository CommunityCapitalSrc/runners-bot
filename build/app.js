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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var eventsApi = __importStar(require("@slack/events-api"));
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var serverless_http_1 = __importDefault(require("serverless-http"));
var NotificationService_1 = require("./NotificationService");
var RequestService_1 = require("./RequestService");
var State_1 = require("./State");
dotenv.config();
// const PORT = process.env.PORT || 3000
var slackEvents = eventsApi.createEventAdapter(process.env.SIGNING_SECRET);
exports.app = (0, express_1.default)();
// const networks = getNetworksData()
var Notification = new NotificationService_1.NotificationService();
exports.app.use('/', slackEvents.expressMiddleware());
setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
    var runners, checkIsRunnerOffline;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, RequestService_1.RequestService.getRunnersData()];
            case 1:
                runners = (_a.sent()).data.runners;
                checkIsRunnerOffline = function (_a) {
                    var runnerId = _a.runnerId;
                    var runners = State_1.State.runnersData;
                    var runner = runners === null || runners === void 0 ? void 0 : runners.find(function (runner) { return runner.id === runnerId; });
                    console.log('test');
                    console.log('test');
                    return (runner === null || runner === void 0 ? void 0 : runner.status) === 'online';
                    // return runner?.status === 'offline'
                };
                // AWS TEST ONLY
                Notification.postRunnerUpMessage({ runnerId: 24 });
                // AWS TEST ONLY
                // NOTE: initial run
                if (!State_1.State.runners) {
                    State_1.State.initialData = runners;
                    runners.forEach(function (_a) {
                        var runnerId = _a.id;
                        var isRunnerOffline = checkIsRunnerOffline({ runnerId: runnerId });
                        if (isRunnerOffline) {
                            Notification.postRunnerDownMessage({ runnerId: runnerId });
                        }
                    });
                    return [2 /*return*/];
                    // NOTE: initial run end
                }
                else {
                    runners.forEach(function (currentRunnerState) {
                        var _a;
                        var runnerPrevState = (_a = State_1.State.runnersData) === null || _a === void 0 ? void 0 : _a.find(function (runnerInState) { return runnerInState.id === currentRunnerState.id; });
                        if ((runnerPrevState === null || runnerPrevState === void 0 ? void 0 : runnerPrevState.status) === 'offline' && currentRunnerState.status === 'online') {
                            Notification.postRunnerUpMessage({ runnerId: currentRunnerState.id });
                        }
                        if (currentRunnerState.status === 'offline' && (runnerPrevState === null || runnerPrevState === void 0 ? void 0 : runnerPrevState.status) !== 'offline') {
                            Notification.postRunnerDownMessage({ runnerId: currentRunnerState.id });
                        }
                    });
                }
                State_1.State.updateRunnersData(runners);
                return [2 /*return*/];
        }
    });
}); }, 5000);
// app.listen(PORT, () => {
// console.log(`Runners Bor listening at http://${networks[Object.keys(networks)[0]]}:${PORT}`)
// })
module.exports = (0, serverless_http_1.default)(exports.app);
