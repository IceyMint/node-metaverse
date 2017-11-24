// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class MoveInventoryFolderPacket implements Packet
{
    name = 'MoveInventoryFolder';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902035;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        Stamp: boolean;
    };
    InventoryData: {
        FolderID: UUID;
        ParentID: UUID;
    }[];

    getSize(): number
    {
        return ((32) * this.InventoryData.length) + 34;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt8((this.AgentData['Stamp']) ? 1 : 0, pos++);
         const count = this.InventoryData.length;
         buf.writeUInt8(this.InventoryData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             this.InventoryData[i]['FolderID'].writeToBuffer(buf, pos);
             pos += 16;
             this.InventoryData[i]['ParentID'].writeToBuffer(buf, pos);
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
             Stamp: boolean
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero(),
             Stamp: false
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['SessionID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['Stamp'] = (buf.readUInt8(pos++) === 1);
         this.AgentData = newObjAgentData;
         const count = buf.readUInt8(pos++);
         this.InventoryData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjInventoryData: {
                 FolderID: UUID,
                 ParentID: UUID
             } = {
                 FolderID: UUID.zero(),
                 ParentID: UUID.zero()
             };
             newObjInventoryData['FolderID'] = new UUID(buf, pos);
             pos += 16;
             newObjInventoryData['ParentID'] = new UUID(buf, pos);
             pos += 16;
             this.InventoryData.push(newObjInventoryData);
         }
         return pos - startPos;
     }
}

