// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class InternalScriptMailMessage implements MessageBase
{
    name = 'InternalScriptMail';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyMedium;
    id = Message.InternalScriptMail;

    DataBlock: {
        From: Buffer;
        To: UUID;
        Subject: Buffer;
        Body: Buffer;
    };

    getSize(): number
    {
        return (this.DataBlock['From'].length + 1 + this.DataBlock['Subject'].length + 1 + this.DataBlock['Body'].length + 2) + 16;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8(this.DataBlock['From'].length, pos++);
        this.DataBlock['From'].copy(buf, pos);
        pos += this.DataBlock['From'].length;
        this.DataBlock['To'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.DataBlock['Subject'].length, pos++);
        this.DataBlock['Subject'].copy(buf, pos);
        pos += this.DataBlock['Subject'].length;
        buf.writeUInt16LE(this.DataBlock['Body'].length, pos);
        pos += 2;
        this.DataBlock['Body'].copy(buf, pos);
        pos += this.DataBlock['Body'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjDataBlock: {
            From: Buffer,
            To: UUID,
            Subject: Buffer,
            Body: Buffer
        } = {
            From: Buffer.allocUnsafe(0),
            To: UUID.zero(),
            Subject: Buffer.allocUnsafe(0),
            Body: Buffer.allocUnsafe(0)
        };
        varLength = buf.readUInt8(pos++);
        newObjDataBlock['From'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjDataBlock['To'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjDataBlock['Subject'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjDataBlock['Body'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.DataBlock = newObjDataBlock;
        return pos - startPos;
    }
}

