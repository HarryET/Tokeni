type validateRes = {
    identifier: string;
    date: Date;
    validator: any;
}


export default class Tokeni {

    static encrypt(identifier: string, validator: any, key: string): string {
        let p = [];

        p.push( Buffer.from(identifier).toString('base64') );
        p.push( Buffer.from((~~(Date.now() / 1000) - 1155945600).toString()).toString('base64') );
        p.push( Buffer.from( validator ).toString('base64') );

        return p.join(".");
    }

    static decrypt(token: string, key: string): validateRes {
        let ts = token.split(".")

        return {
            identifier: Buffer.from(ts[0], 'base64').toString('utf-8'),
            date: new Date(Buffer.from(ts[1], 'base64').readInt32BE(0)),
            validator: ts[2]
        };

    }

}
