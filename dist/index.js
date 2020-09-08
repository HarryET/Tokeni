"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tokeni = /** @class */ (function () {
    function Tokeni() {
    }
    Tokeni.encrypt = function (identifier, validator, key) {
        var p = [];
        p.push(Buffer.from(identifier).toString('base64'));
        p.push(Buffer.from((~~(Date.now() / 1000) - 1155945600).toString()).toString('base64'));
        p.push(Buffer.from(validator).toString('base64'));
        return p.join(".");
    };
    Tokeni.decrypt = function (token, key) {
        var ts = token.split(".");
        return {
            identifier: Buffer.from(ts[0], 'base64').toString('utf-8'),
            date: new Date(Buffer.from(ts[1], 'base64').readInt32BE(0)),
            validator: ts[2]
        };
    };
    return Tokeni;
}());
exports.default = Tokeni;
