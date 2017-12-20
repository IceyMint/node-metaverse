// This file has been automatically generated by writeMessageClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ImprovedTerseObjectUpdateMessage implements MessageBase
{
    name = 'ImprovedTerseObjectUpdate';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyHigh;
    id = Message.ImprovedTerseObjectUpdate;

    RegionData: {
        RegionHandle: Long;
        TimeDilation: number;
    };
    ObjectData: {
        Data: Buffer;
        TextureEntry: Buffer;
    }[];

    getSize(): number
    {
        return this.calculateVarVarSize(this.ObjectData, 'Data', 1) + this.calculateVarVarSize(this.ObjectData, 'TextureEntry', 2) + 11;
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
        buf.writeInt32LE(this.RegionData['RegionHandle'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.RegionData['RegionHandle'].high, pos);
        pos += 4;
        buf.writeUInt16LE(this.RegionData['TimeDilation'], pos);
        pos += 2;
        const count = this.ObjectData.length;
        buf.writeUInt8(this.ObjectData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt8(this.ObjectData[i]['Data'].length, pos++);
            this.ObjectData[i]['Data'].copy(buf, pos);
            pos += this.ObjectData[i]['Data'].length;
            buf.writeUInt16LE(this.ObjectData[i]['TextureEntry'].length, pos);
            pos += 2;
            this.ObjectData[i]['TextureEntry'].copy(buf, pos);
            pos += this.ObjectData[i]['TextureEntry'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjRegionData: {
            RegionHandle: Long,
            TimeDilation: number
        } = {
            RegionHandle: Long.ZERO,
            TimeDilation: 0
        };
        newObjRegionData['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
        pos += 8;
        newObjRegionData['TimeDilation'] = buf.readUInt16LE(pos);
        pos += 2;
        this.RegionData = newObjRegionData;
        const count = buf.readUInt8(pos++);
        this.ObjectData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjObjectData: {
                Data: Buffer,
                TextureEntry: Buffer
            } = {
                Data: Buffer.allocUnsafe(0),
                TextureEntry: Buffer.allocUnsafe(0)
            };
            varLength = buf.readUInt8(pos++);
            newObjObjectData['Data'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            varLength = buf.readUInt16LE(pos);
            pos += 2;
            newObjObjectData['TextureEntry'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            this.ObjectData.push(newObjObjectData);
        }
        return pos - startPos;
    }
}

