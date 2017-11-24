// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ScriptDialogReplyPacket implements Packet
{
    name = 'ScriptDialogReply';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901951;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        ObjectID: UUID;
        ChatChannel: number;
        ButtonIndex: number;
        ButtonLabel: string;
    };

    getSize(): number
    {
        return (this.Data['ButtonLabel'].length + 1) + 56;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         this.Data['ObjectID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeInt32LE(this.Data['ChatChannel'], pos);
         pos += 4;
         buf.writeInt32LE(this.Data['ButtonIndex'], pos);
         pos += 4;
         buf.write(this.Data['ButtonLabel'], pos);
         pos += this.Data['ButtonLabel'].length;
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
         const newObjData: {
             ObjectID: UUID,
             ChatChannel: number,
             ButtonIndex: number,
             ButtonLabel: string
         } = {
             ObjectID: UUID.zero(),
             ChatChannel: 0,
             ButtonIndex: 0,
             ButtonLabel: ''
         };
         newObjData['ObjectID'] = new UUID(buf, pos);
         pos += 16;
         newObjData['ChatChannel'] = buf.readInt32LE(pos);
         pos += 4;
         newObjData['ButtonIndex'] = buf.readInt32LE(pos);
         pos += 4;
         newObjData['ButtonLabel'] = buf.toString('utf8', pos, length);
         pos += length;
         this.Data = newObjData;
         return pos - startPos;
     }
}

