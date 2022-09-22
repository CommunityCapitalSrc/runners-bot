"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var StateService = /** @class */ (function () {
    function StateService() {
        this.runners = undefined;
    }
    StateService.getInstance = function () {
        if (!StateService.instance) {
            StateService.instance = new StateService();
        }
        return StateService.instance;
    };
    Object.defineProperty(StateService.prototype, "runnersData", {
        get: function () {
            return this.runners;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateService.prototype, "initialData", {
        set: function (runners) {
            this.runners = runners;
        },
        enumerable: false,
        configurable: true
    });
    StateService.prototype.updateRunnersData = function (runners) {
        this.runners = runners;
    };
    return StateService;
}());
exports.State = StateService.getInstance();
