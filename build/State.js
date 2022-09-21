"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateService = void 0;
var State = /** @class */ (function () {
    function State() {
        this.runners = undefined;
    }
    State.getInstance = function () {
        if (!State.instance) {
            State.instance = new State();
        }
        return State.instance;
    };
    Object.defineProperty(State.prototype, "runnersData", {
        get: function () {
            return this.runners;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "initialData", {
        set: function (runners) {
            this.runners = runners;
        },
        enumerable: false,
        configurable: true
    });
    return State;
}());
exports.StateService = State.getInstance();
