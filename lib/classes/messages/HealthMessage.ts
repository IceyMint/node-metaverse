// This file has been automatically generated by writeMessageClasses.js

import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class HealthMessageMessage implements MessageBase
{
    name = 'HealthMessage';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.HealthMessage;

    HealthData: {
        Health: number;
    };

    getSize(): number
    {
        return 4;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeFloatLE(this.HealthData['Health'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjHealthData: {
            Health: number
        } = {
            Health: 0
        };
        newObjHealthData['Health'] = buf.readFloatLE(pos);
        pos += 4;
        this.HealthData = newObjHealthData;
        return pos - startPos;
    }
}

