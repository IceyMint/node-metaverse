// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectImagePacket implements Packet
{
    name = 'ObjectImage';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901856;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ObjectLocalID: number;
        MediaURL: string;
        TextureEntry: string;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.ObjectData, 'MediaURL', 1) + this.calculateVarVarSize(this.ObjectData, 'TextureEntry', 2) + 4) * this.ObjectData.length) + 33;
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
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         const count = this.ObjectData.length;
         buf.writeUInt8(this.ObjectData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             buf.writeUInt32LE(this.ObjectData[i]['ObjectLocalID'], pos);
             pos += 4;
             buf.write(this.ObjectData[i]['MediaURL'], pos);
             pos += this.ObjectData[i]['MediaURL'].length;
             buf.write(this.ObjectData[i]['TextureEntry'], pos);
             pos += this.ObjectData[i]['TextureEntry'].length;
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID,
             SessionID: UUID
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero()
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['SessionID'] = new UUID(buf, pos);
         pos += 16;
         this.AgentData = newObjAgentData;
         const count = buf.readUInt8(pos++);
         this.ObjectData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjObjectData: {
                 ObjectLocalID: number,
                 MediaURL: string,
                 TextureEntry: string
             } = {
                 ObjectLocalID: 0,
                 MediaURL: '',
                 TextureEntry: ''
             };
             newObjObjectData['ObjectLocalID'] = buf.readUInt32LE(pos);
             pos += 4;
             newObjObjectData['MediaURL'] = buf.toString('utf8', pos, length);
             pos += length;
             newObjObjectData['TextureEntry'] = buf.toString('utf8', pos, length);
             pos += length;
             this.ObjectData.push(newObjObjectData);
         }
         return pos - startPos;
     }
}

