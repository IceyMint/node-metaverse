// This file has been automatically generated by writeMessageClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ScriptDataRequestMessage implements MessageBase
{
    name = 'ScriptDataRequest';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ScriptDataRequest;

    DataBlock: {
        Hash: Long;
        RequestType: number;
        Request: Buffer;
    }[];

    getSize(): number
    {
        return this.calculateVarVarSize(this.DataBlock, 'Request', 2) + ((9) * this.DataBlock.length) + 1;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        const count = this.DataBlock.length;
        buf.writeUInt8(this.DataBlock.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeInt32LE(this.DataBlock[i]['Hash'].low, pos);
            pos += 4;
            buf.writeInt32LE(this.DataBlock[i]['Hash'].high, pos);
            pos += 4;
            buf.writeInt8(this.DataBlock[i]['RequestType'], pos++);
            buf.writeUInt16LE(this.DataBlock[i]['Request'].length, pos);
            pos += 2;
            this.DataBlock[i]['Request'].copy(buf, pos);
            pos += this.DataBlock[i]['Request'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const count = buf.readUInt8(pos++);
        this.DataBlock = [];
        for (let i = 0; i < count; i++)
        {
            const newObjDataBlock: {
                Hash: Long,
                RequestType: number,
                Request: Buffer
            } = {
                Hash: Long.ZERO,
                RequestType: 0,
                Request: Buffer.allocUnsafe(0)
            };
            newObjDataBlock['Hash'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
            pos += 8;
            newObjDataBlock['RequestType'] = buf.readInt8(pos++);
            varLength = buf.readUInt16LE(pos);
            pos += 2;
            newObjDataBlock['Request'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            this.DataBlock.push(newObjDataBlock);
        }
        return pos - startPos;
    }
}

