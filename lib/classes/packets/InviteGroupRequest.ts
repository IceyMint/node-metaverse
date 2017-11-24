// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class InviteGroupRequestPacket implements Packet
{
    name = 'InviteGroupRequest';
    flags = MessageFlags.FrequencyLow;
    id = 4294902109;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    GroupData: {
        GroupID: UUID;
    };
    InviteData: {
        InviteeID: UUID;
        RoleID: UUID;
    }[];

    getSize(): number
    {
        return ((32) * this.InviteData.length) + 49;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         this.GroupData['GroupID'].writeToBuffer(buf, pos);
         pos += 16;
         const count = this.InviteData.length;
         buf.writeUInt8(this.InviteData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             this.InviteData[i]['InviteeID'].writeToBuffer(buf, pos);
             pos += 16;
             this.InviteData[i]['RoleID'].writeToBuffer(buf, pos);
             pos += 16;
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
         const newObjGroupData: {
             GroupID: UUID
         } = {
             GroupID: UUID.zero()
         };
         newObjGroupData['GroupID'] = new UUID(buf, pos);
         pos += 16;
         this.GroupData = newObjGroupData;
         const count = buf.readUInt8(pos++);
         this.InviteData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjInviteData: {
                 InviteeID: UUID,
                 RoleID: UUID
             } = {
                 InviteeID: UUID.zero(),
                 RoleID: UUID.zero()
             };
             newObjInviteData['InviteeID'] = new UUID(buf, pos);
             pos += 16;
             newObjInviteData['RoleID'] = new UUID(buf, pos);
             pos += 16;
             this.InviteData.push(newObjInviteData);
         }
         return pos - startPos;
     }
}

