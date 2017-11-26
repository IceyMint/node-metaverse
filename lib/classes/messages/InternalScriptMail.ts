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
        From: string;
        To: UUID;
        Subject: string;
        Body: string;
    };

    getSize(): number
    {
        return (this.DataBlock['From'].length + 1 + this.DataBlock['Subject'].length + 1 + this.DataBlock['Body'].length + 2) + 16;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8(this.DataBlock['From'].length, pos++);
        buf.write(this.DataBlock['From'], pos);
        pos += this.DataBlock['From'].length;
        this.DataBlock['To'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.DataBlock['Subject'].length, pos++);
        buf.write(this.DataBlock['Subject'], pos);
        pos += this.DataBlock['Subject'].length;
        buf.writeUInt16LE(this.DataBlock['Body'].length, pos);
        pos += 2;
        buf.write(this.DataBlock['Body'], pos);
        pos += this.DataBlock['Body'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjDataBlock: {
            From: string,
            To: UUID,
            Subject: string,
            Body: string
        } = {
            From: '',
            To: UUID.zero(),
            Subject: '',
            Body: ''
        };
        varLength = buf.readUInt8(pos++);
        newObjDataBlock['From'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        newObjDataBlock['To'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjDataBlock['Subject'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjDataBlock['Body'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        this.DataBlock = newObjDataBlock;
        return pos - startPos;
    }
}

