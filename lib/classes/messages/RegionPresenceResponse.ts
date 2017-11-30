// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {IPAddress} from '../IPAddress';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class RegionPresenceResponseMessage implements MessageBase
{
    name = 'RegionPresenceResponse';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.RegionPresenceResponse;

    RegionData: {
        RegionID: UUID;
        RegionHandle: Long;
        InternalRegionIP: IPAddress;
        ExternalRegionIP: IPAddress;
        RegionPort: number;
        ValidUntil: number;
        Message: Buffer;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.RegionData, 'Message', 1) + 42) * this.RegionData.length) + 1;
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
        const count = this.RegionData.length;
        buf.writeUInt8(this.RegionData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.RegionData[i]['RegionID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeInt32LE(this.RegionData[i]['RegionHandle'].low, pos);
            pos += 4;
            buf.writeInt32LE(this.RegionData[i]['RegionHandle'].high, pos);
            pos += 4;
            this.RegionData[i]['InternalRegionIP'].writeToBuffer(buf, pos);
            pos += 4;
            this.RegionData[i]['ExternalRegionIP'].writeToBuffer(buf, pos);
            pos += 4;
            buf.writeUInt16LE(this.RegionData[i]['RegionPort'], pos);
            pos += 2;
            buf.writeDoubleLE(this.RegionData[i]['ValidUntil'], pos);
            pos += 8;
            buf.writeUInt8(this.RegionData[i]['Message'].length, pos++);
            this.RegionData[i]['Message'].copy(buf, pos);
            pos += this.RegionData[i]['Message'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const count = buf.readUInt8(pos++);
        this.RegionData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjRegionData: {
                RegionID: UUID,
                RegionHandle: Long,
                InternalRegionIP: IPAddress,
                ExternalRegionIP: IPAddress,
                RegionPort: number,
                ValidUntil: number,
                Message: Buffer
            } = {
                RegionID: UUID.zero(),
                RegionHandle: Long.ZERO,
                InternalRegionIP: IPAddress.zero(),
                ExternalRegionIP: IPAddress.zero(),
                RegionPort: 0,
                ValidUntil: 0,
                Message: Buffer.allocUnsafe(0)
            };
            newObjRegionData['RegionID'] = new UUID(buf, pos);
            pos += 16;
            newObjRegionData['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
            pos += 8;
            newObjRegionData['InternalRegionIP'] = new IPAddress(buf, pos);
            pos += 4;
            newObjRegionData['ExternalRegionIP'] = new IPAddress(buf, pos);
            pos += 4;
            newObjRegionData['RegionPort'] = buf.readUInt16LE(pos);
            pos += 2;
            newObjRegionData['ValidUntil'] = buf.readDoubleLE(pos);
            pos += 8;
            varLength = buf.readUInt8(pos++);
            newObjRegionData['Message'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            this.RegionData.push(newObjRegionData);
        }
        return pos - startPos;
    }
}

