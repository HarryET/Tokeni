import * as crypto from "crypto";

type validateRes = {
    valid: boolean;
    identifier: string;
}

export default class Tokeni {

    static encrypt(identifier: string, data: object, key: string): string {
        let p = [];

        p.push( Buffer.from(identifier).toString('base64') );
        p.push( Buffer.from((~~(Date.now() / 1000) - 1155945600).toString()).toString('base64') );
        p.push( crypto.createHmac("sha1", key).update(JSON.stringify(data)).digest("base64") );

        return p.join(".");
    }

    static validate(token: string, data: object, key: string): validateRes {
        let ts = token.split(".")
        let p = [];

        p.push( ts[0] );
        p.push( ts[1] );
        p.push( crypto.createHmac("sha1", key).update(JSON.stringify(data)).digest("base64") );

        return {
            valid: p.join(".") == token,
            identifier: Buffer.from(ts[0], 'base64').toString()
        };

    }

}

