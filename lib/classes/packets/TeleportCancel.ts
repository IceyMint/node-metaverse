// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class TeleportCancelPacket implements Packet
{
    name = 'TeleportCancel';
    flags = MessageFlags.FrequencyLow;
    id = 4294901832;

    Info: {
        AgentID: UUID;
        SessionID: UUID;
    };

    getSize(): number
    {
        return 32;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.Info['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.Info['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjInfo: {
             AgentID: UUID,
             SessionID: UUID
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero()
         };
         newObjInfo['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjInfo['SessionID'] = new UUID(buf, pos);
         pos += 16;
         this.Info = newObjInfo;
         return pos - startPos;
     }
}

