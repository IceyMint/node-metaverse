// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ParcelMediaUpdateMessage implements MessageBase
{
    name = 'ParcelMediaUpdate';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ParcelMediaUpdate;

    DataBlock: {
        MediaURL: string;
        MediaID: UUID;
        MediaAutoScale: number;
    };
    DataBlockExtended: {
        MediaType: string;
        MediaDesc: string;
        MediaWidth: number;
        MediaHeight: number;
        MediaLoop: number;
    };

    getSize(): number
    {
        return (this.DataBlock['MediaURL'].length + 1) + (this.DataBlockExtended['MediaType'].length + 1 + this.DataBlockExtended['MediaDesc'].length + 1) + 26;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8(this.DataBlock['MediaURL'].length, pos++);
        buf.write(this.DataBlock['MediaURL'], pos);
        pos += this.DataBlock['MediaURL'].length;
        this.DataBlock['MediaID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.DataBlock['MediaAutoScale'], pos++);
        buf.writeUInt8(this.DataBlockExtended['MediaType'].length, pos++);
        buf.write(this.DataBlockExtended['MediaType'], pos);
        pos += this.DataBlockExtended['MediaType'].length;
        buf.writeUInt8(this.DataBlockExtended['MediaDesc'].length, pos++);
        buf.write(this.DataBlockExtended['MediaDesc'], pos);
        pos += this.DataBlockExtended['MediaDesc'].length;
        buf.writeInt32LE(this.DataBlockExtended['MediaWidth'], pos);
        pos += 4;
        buf.writeInt32LE(this.DataBlockExtended['MediaHeight'], pos);
        pos += 4;
        buf.writeUInt8(this.DataBlockExtended['MediaLoop'], pos++);
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjDataBlock: {
            MediaURL: string,
            MediaID: UUID,
            MediaAutoScale: number
        } = {
            MediaURL: '',
            MediaID: UUID.zero(),
            MediaAutoScale: 0
        };
        varLength = buf.readUInt8(pos++);
        newObjDataBlock['MediaURL'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        newObjDataBlock['MediaID'] = new UUID(buf, pos);
        pos += 16;
        newObjDataBlock['MediaAutoScale'] = buf.readUInt8(pos++);
        this.DataBlock = newObjDataBlock;
        const newObjDataBlockExtended: {
            MediaType: string,
            MediaDesc: string,
            MediaWidth: number,
            MediaHeight: number,
            MediaLoop: number
        } = {
            MediaType: '',
            MediaDesc: '',
            MediaWidth: 0,
            MediaHeight: 0,
            MediaLoop: 0
        };
        varLength = buf.readUInt8(pos++);
        newObjDataBlockExtended['MediaType'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjDataBlockExtended['MediaDesc'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        newObjDataBlockExtended['MediaWidth'] = buf.readInt32LE(pos);
        pos += 4;
        newObjDataBlockExtended['MediaHeight'] = buf.readInt32LE(pos);
        pos += 4;
        newObjDataBlockExtended['MediaLoop'] = buf.readUInt8(pos++);
        this.DataBlockExtended = newObjDataBlockExtended;
        return pos - startPos;
    }
}

