// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class SimCrashedPacket implements Packet
{
    name = 'SimCrashed';
    flags = MessageFlags.FrequencyLow;
    id = 4294902088;

    Data: {
        RegionX: number;
        RegionY: number;
    };
    Users: {
        AgentID: UUID;
    }[];

    getSize(): number
    {
        return ((16) * this.Users.length) + 9;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         buf.writeUInt32LE(this.Data['RegionX'], pos);
         pos += 4;
         buf.writeUInt32LE(this.Data['RegionY'], pos);
         pos += 4;
         const count = this.Users.length;
         buf.writeUInt8(this.Users.length, pos++);
         for (let i = 0; i < count; i++)
         {
             this.Users[i]['AgentID'].writeToBuffer(buf, pos);
             pos += 16;
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjData: {
             RegionX: number,
             RegionY: number
         } = {
             RegionX: 0,
             RegionY: 0
         };
         newObjData['RegionX'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjData['RegionY'] = buf.readUInt32LE(pos);
         pos += 4;
         this.Data = newObjData;
         const count = buf.readUInt8(pos++);
         this.Users = [];
         for (let i = 0; i < count; i++)
         {
             const newObjUsers: {
                 AgentID: UUID
             } = {
                 AgentID: UUID.zero()
             };
             newObjUsers['AgentID'] = new UUID(buf, pos);
             pos += 16;
             this.Users.push(newObjUsers);
         }
         return pos - startPos;
     }
}

