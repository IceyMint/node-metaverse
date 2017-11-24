// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class DirPlacesQueryPacket implements Packet
{
    name = 'DirPlacesQuery';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901793;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    QueryData: {
        QueryID: UUID;
        QueryText: string;
        QueryFlags: number;
        Category: number;
        SimName: string;
        QueryStart: number;
    };

    getSize(): number
    {
        return (this.QueryData['QueryText'].length + 1 + this.QueryData['SimName'].length + 1) + 57;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         this.QueryData['QueryID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.write(this.QueryData['QueryText'], pos);
         pos += this.QueryData['QueryText'].length;
         buf.writeUInt32LE(this.QueryData['QueryFlags'], pos);
         pos += 4;
         buf.writeInt8(this.QueryData['Category'], pos++);
         buf.write(this.QueryData['SimName'], pos);
         pos += this.QueryData['SimName'].length;
         buf.writeInt32LE(this.QueryData['QueryStart'], pos);
         pos += 4;
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
         const newObjQueryData: {
             QueryID: UUID,
             QueryText: string,
             QueryFlags: number,
             Category: number,
             SimName: string,
             QueryStart: number
         } = {
             QueryID: UUID.zero(),
             QueryText: '',
             QueryFlags: 0,
             Category: 0,
             SimName: '',
             QueryStart: 0
         };
         newObjQueryData['QueryID'] = new UUID(buf, pos);
         pos += 16;
         newObjQueryData['QueryText'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjQueryData['QueryFlags'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjQueryData['Category'] = buf.readInt8(pos++);
         newObjQueryData['SimName'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjQueryData['QueryStart'] = buf.readInt32LE(pos);
         pos += 4;
         this.QueryData = newObjQueryData;
         return pos - startPos;
     }
}

