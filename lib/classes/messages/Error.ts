// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ErrorMessage implements MessageBase
{
    name = 'Error';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.Error;

    AgentData: {
        AgentID: UUID;
    };
    Data: {
        Code: number;
        Token: Buffer;
        ID: UUID;
        System: Buffer;
        Message: Buffer;
        Data: Buffer;
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
        buf.writeUInt8(this.Data['Token'].length, pos++);
        this.Data['Token'].copy(buf, pos);
        pos += this.Data['Token'].length;
        this.Data['ID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.Data['System'].length, pos++);
        this.Data['System'].copy(buf, pos);
        pos += this.Data['System'].length;
        buf.writeUInt16LE(this.Data['Message'].length, pos);
        pos += 2;
        this.Data['Message'].copy(buf, pos);
        pos += this.Data['Message'].length;
        buf.writeUInt16LE(this.Data['Data'].length, pos);
        pos += 2;
        this.Data['Data'].copy(buf, pos);
        pos += this.Data['Data'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
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
            Token: Buffer,
            ID: UUID,
            System: Buffer,
            Message: Buffer,
            Data: Buffer
        } = {
            Code: 0,
            Token: Buffer.allocUnsafe(0),
            ID: UUID.zero(),
            System: Buffer.allocUnsafe(0),
            Message: Buffer.allocUnsafe(0),
            Data: Buffer.allocUnsafe(0)
        };
        newObjData['Code'] = buf.readInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjData['Token'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjData['ID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjData['System'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjData['Message'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjData['Data'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.Data = newObjData;
        return pos - startPos;
    }
}

