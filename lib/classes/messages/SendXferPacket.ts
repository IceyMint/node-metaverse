// This file has been automatically generated by writeMessageClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class SendXferPacketMessage implements MessageBase
{
    name = 'SendXferPacket';
    messageFlags = MessageFlags.FrequencyHigh;
    id = Message.SendXferPacket;

    XferID: {
        ID: Long;
        Packet: number;
    };
    DataPacket: {
        Data: Buffer;
    };

    getSize(): number
    {
        return (this.DataPacket['Data'].length + 2) + 12;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeInt32LE(this.XferID['ID'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.XferID['ID'].high, pos);
        pos += 4;
        buf.writeUInt32LE(this.XferID['Packet'], pos);
        pos += 4;
        buf.writeUInt16LE(this.DataPacket['Data'].length, pos);
        pos += 2;
        this.DataPacket['Data'].copy(buf, pos);
        pos += this.DataPacket['Data'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjXferID: {
            ID: Long,
            Packet: number
        } = {
            ID: Long.ZERO,
            Packet: 0
        };
        newObjXferID['ID'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
        pos += 8;
        newObjXferID['Packet'] = buf.readUInt32LE(pos);
        pos += 4;
        this.XferID = newObjXferID;
        const newObjDataPacket: {
            Data: Buffer
        } = {
            Data: Buffer.allocUnsafe(0)
        };
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjDataPacket['Data'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.DataPacket = newObjDataPacket;
        return pos - startPos;
    }
}

