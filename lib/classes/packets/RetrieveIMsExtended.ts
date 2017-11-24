// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RetrieveIMsExtendedPacket implements Packet
{
    name = 'RetrieveIMsExtended';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294902187;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        IsPremium: boolean;
    };

    getSize(): number
    {
        return 33;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt8((this.AgentData['IsPremium']) ? 1 : 0, pos++);
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID,
             SessionID: UUID,
             IsPremium: boolean
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero(),
             IsPremium: false
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['SessionID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['IsPremium'] = (buf.readUInt8(pos++) === 1);
         this.AgentData = newObjAgentData;
         return pos - startPos;
     }
}

