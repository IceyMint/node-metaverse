// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RedoPacket implements Packet
{
    name = 'Redo';
    flags = MessageFlags.FrequencyLow;
    id = 4294901836;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        GroupID: UUID;
    };
    ObjectData: {
        ObjectID: UUID;
    }[];

    getSize(): number
    {
        return ((16) * this.ObjectData.length) + 49;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['GroupID'].writeToBuffer(buf, pos);
         pos += 16;
         const count = this.ObjectData.length;
         buf.writeUInt8(this.ObjectData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             this.ObjectData[i]['ObjectID'].writeToBuffer(buf, pos);
             pos += 16;
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID,
             SessionID: UUID,
             GroupID: UUID
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero(),
             GroupID: UUID.zero()
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['SessionID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['GroupID'] = new UUID(buf, pos);
         pos += 16;
         this.AgentData = newObjAgentData;
         const count = buf.readUInt8(pos++);
         this.ObjectData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjObjectData: {
                 ObjectID: UUID
             } = {
                 ObjectID: UUID.zero()
             };
             newObjObjectData['ObjectID'] = new UUID(buf, pos);
             pos += 16;
             this.ObjectData.push(newObjObjectData);
         }
         return pos - startPos;
     }
}

