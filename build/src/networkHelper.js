"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetworksData = void 0;
var os_1 = require("os");
var nets = (0, os_1.networkInterfaces)();
var networks = Object.create(null);
var getNetworksData = function () {
    for (var _i = 0, _a = Object.keys(nets); _i < _a.length; _i++) {
        var name = _a[_i];
        for (var _b = 0, _c = nets[name]; _b < _c.length; _b++) {
            var net = _c[_b];
            var familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
            if (net.family === familyV4Value && !net.internal) {
                if (!networks[name]) {
                    networks[name] = [];
                }
                networks[name].push(net.address);
            }
        }
    }
    return networks;
};
exports.getNetworksData = getNetworksData;
