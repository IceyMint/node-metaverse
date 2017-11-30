// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class MapItemReplyMessage implements MessageBase
{
    name = 'MapItemReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.MapItemReply;

    AgentData: {
        AgentID: UUID;
        Flags: number;
    };
    RequestData: {
        ItemType: number;
    };
    Data: {
        X: number;
        Y: number;
        ID: UUID;
        Extra: number;
        Extra2: number;
        Name: Buffer;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.Data, 'Name', 1) + 32) * this.Data.length) + 25;
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
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.AgentData['Flags'], pos);
        pos += 4;
        buf.writeUInt32LE(this.RequestData['ItemType'], pos);
        pos += 4;
        const count = this.Data.length;
        buf.writeUInt8(this.Data.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt32LE(this.Data[i]['X'], pos);
            pos += 4;
            buf.writeUInt32LE(this.Data[i]['Y'], pos);
            pos += 4;
            this.Data[i]['ID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeInt32LE(this.Data[i]['Extra'], pos);
            pos += 4;
            buf.writeInt32LE(this.Data[i]['Extra2'], pos);
            pos += 4;
            buf.writeUInt8(this.Data[i]['Name'].length, pos++);
            this.Data[i]['Name'].copy(buf, pos);
            pos += this.Data[i]['Name'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            Flags: number
        } = {
            AgentID: UUID.zero(),
            Flags: 0
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['Flags'] = buf.readUInt32LE(pos);
        pos += 4;
        this.AgentData = newObjAgentData;
        const newObjRequestData: {
            ItemType: number
        } = {
            ItemType: 0
        };
        newObjRequestData['ItemType'] = buf.readUInt32LE(pos);
        pos += 4;
        this.RequestData = newObjRequestData;
        const count = buf.readUInt8(pos++);
        this.Data = [];
        for (let i = 0; i < count; i++)
        {
            const newObjData: {
                X: number,
                Y: number,
                ID: UUID,
                Extra: number,
                Extra2: number,
                Name: Buffer
            } = {
                X: 0,
                Y: 0,
                ID: UUID.zero(),
                Extra: 0,
                Extra2: 0,
                Name: Buffer.allocUnsafe(0)
            };
            newObjData['X'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjData['Y'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjData['ID'] = new UUID(buf, pos);
            pos += 16;
            newObjData['Extra'] = buf.readInt32LE(pos);
            pos += 4;
            newObjData['Extra2'] = buf.readInt32LE(pos);
            pos += 4;
            varLength = buf.readUInt8(pos++);
            newObjData['Name'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            this.Data.push(newObjData);
        }
        return pos - startPos;
    }
}

