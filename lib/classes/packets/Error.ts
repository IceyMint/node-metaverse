// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ErrorPacket implements Packet
{
    name = 'Error';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902183;

    AgentData: {
        AgentID: UUID;
    };
    Data: {
        Code: number;
        Token: string;
        ID: UUID;
        System: string;
        Message: string;
        Data: string;
    };

    getSize(): number
    {
        return (this.Data['Token'].length + 1 + this.Data['System'].length + 1 + this.Data['Message'].length + 2 + this.Data['Data'].length + 2) + 36;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeInt32LE(this.Data['Code'], pos);
         pos += 4;
         buf.write(this.Data['Token'], pos);
         pos += this.Data['Token'].length;
         this.Data['ID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.write(this.Data['System'], pos);
         pos += this.Data['System'].length;
         buf.write(this.Data['Message'], pos);
         pos += this.Data['Message'].length;
         buf.write(this.Data['Data'], pos);
         pos += this.Data['Data'].length;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID
         } = {
             AgentID: UUID.zero()
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         this.AgentData = newObjAgentData;
         const newObjData: {
             Code: number,
             Token: string,
             ID: UUID,
             System: string,
             Message: string,
             Data: string
         } = {
             Code: 0,
             Token: '',
             ID: UUID.zero(),
             System: '',
             Message: '',
             Data: ''
         };
         newObjData['Code'] = buf.readInt32LE(pos);
         pos += 4;
         newObjData['Token'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjData['ID'] = new UUID(buf, pos);
         pos += 16;
         newObjData['System'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjData['Message'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjData['Data'] = buf.toString('utf8', pos, length);
         pos += length;
         this.Data = newObjData;
         return pos - startPos;
     }
}

