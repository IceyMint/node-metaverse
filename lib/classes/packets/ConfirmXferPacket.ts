// This file has been automatically generated by writePacketClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ConfirmXferPacketPacket implements Packet
{
    name = 'ConfirmXferPacket';
    flags = MessageFlags.FrequencyHigh;
    id = 19;

    XferID: {
        ID: Long;
        Packet: number;
    };

    getSize(): number
    {
        return 12;
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
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
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
         return pos - startPos;
     }
}

