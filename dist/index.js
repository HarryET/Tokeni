"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var crypto = __importStar(require("crypto"));
var Tokeni = /** @class */ (function () {
    function Tokeni() {
    }
    Tokeni.encrypt = function (identifier, data, key) {
        var p = [];
        p.push(Buffer.from(identifier).toString('base64'));
        p.push(Buffer.from((~~(Date.now() / 1000) - 1155945600).toString()).toString('base64'));
        p.push(crypto.createHmac("sha1", key).update(JSON.stringify(data)).digest("base64"));
        return p.join(".");
    };
    Tokeni.validate = function (token, data, key) {
        var ts = token.split(".");
        var p = [];
        p.push(ts[0]);
        p.push(ts[1]);
        p.push(crypto.createHmac("sha1", key).update(JSON.stringify(data)).digest("base64"));
        return {
            valid: p.join(".") == token,
            identifier: Buffer.from(ts[0], 'base64').toString()
        };
    };
    return Tokeni;
}());
exports.default = Tokeni;
