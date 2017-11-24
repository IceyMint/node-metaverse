// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class TeleportFailedPacket implements Packet
{
    name = 'TeleportFailed';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294901834;

    Info: {
        AgentID: UUID;
        Reason: string;
    };
    AlertInfo: {
        Message: string;
        ExtraParams: string;
    }[];

    getSize(): number
    {
        return (this.Info['Reason'].length + 1) + ((this.calculateVarVarSize(this.AlertInfo, 'Message', 1) + this.calculateVarVarSize(this.AlertInfo, 'ExtraParams', 1)) * this.AlertInfo.length) + 17;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.Info['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.write(this.Info['Reason'], pos);
         pos += this.Info['Reason'].length;
         const count = this.AlertInfo.length;
         buf.writeUInt8(this.AlertInfo.length, pos++);
         for (let i = 0; i < count; i++)
         {
             buf.write(this.AlertInfo[i]['Message'], pos);
             pos += this.AlertInfo[i]['Message'].length;
             buf.write(this.AlertInfo[i]['ExtraParams'], pos);
             pos += this.AlertInfo[i]['ExtraParams'].length;
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjInfo: {
             AgentID: UUID,
             Reason: string
         } = {
             AgentID: UUID.zero(),
             Reason: ''
         };
         newObjInfo['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjInfo['Reason'] = buf.toString('utf8', pos, length);
         pos += length;
         this.Info = newObjInfo;
         const count = buf.readUInt8(pos++);
         this.AlertInfo = [];
         for (let i = 0; i < count; i++)
         {
             const newObjAlertInfo: {
                 Message: string,
                 ExtraParams: string
             } = {
                 Message: '',
                 ExtraParams: ''
             };
             newObjAlertInfo['Message'] = buf.toString('utf8', pos, length);
             pos += length;
             newObjAlertInfo['ExtraParams'] = buf.toString('utf8', pos, length);
             pos += length;
             this.AlertInfo.push(newObjAlertInfo);
         }
         return pos - startPos;
     }
}

