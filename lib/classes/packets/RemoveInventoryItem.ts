// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RemoveInventoryItemPacket implements Packet
{
    name = 'RemoveInventoryItem';
    flags = MessageFlags.FrequencyLow;
    id = 4294902030;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    InventoryData: {
        ItemID: UUID;
    }[];

    getSize(): number
    {
        return ((16) * this.InventoryData.length) + 33;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         const count = this.InventoryData.length;
         buf.writeUInt8(this.InventoryData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             this.InventoryData[i]['ItemID'].writeToBuffer(buf, pos);
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
         const count = buf.readUInt8(pos++);
         this.InventoryData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjInventoryData: {
                 ItemID: UUID
             } = {
                 ItemID: UUID.zero()
             };
             newObjInventoryData['ItemID'] = new UUID(buf, pos);
             pos += 16;
             this.InventoryData.push(newObjInventoryData);
         }
         return pos - startPos;
     }
}

