// This file has been automatically generated by writeMessageClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class NearestLandingRegionReplyMessage implements MessageBase
{
    name = 'NearestLandingRegionReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.NearestLandingRegionReply;

    LandingRegionData: {
        RegionHandle: Long;
    };

    getSize(): number
    {
        return 8;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeInt32LE(this.LandingRegionData['RegionHandle'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.LandingRegionData['RegionHandle'].high, pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjLandingRegionData: {
            RegionHandle: Long
        } = {
            RegionHandle: Long.ZERO
        };
        newObjLandingRegionData['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
        pos += 8;
        this.LandingRegionData = newObjLandingRegionData;
        return pos - startPos;
    }
}

