// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectDropPacket implements Packet
{
    name = 'ObjectDrop';
    flags = MessageFlags.FrequencyLow;
    id = 4294901874;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ObjectLocalID: number;
    }[];

    getSize(): number
    {
        return ((4) * this.ObjectData.length) + 33;
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
                 ObjectLocalID: number
             } = {
                 ObjectLocalID: 0
             };
             newObjObjectData['ObjectLocalID'] = buf.readUInt32LE(pos);
             pos += 4;
             this.ObjectData.push(newObjObjectData);
         }
         return pos - startPos;
     }
}

