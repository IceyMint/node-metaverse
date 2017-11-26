// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class DirPlacesQueryBackendMessage implements MessageBase
{
    name = 'DirPlacesQueryBackend';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.DirPlacesQueryBackend;

    AgentData: {
        AgentID: UUID;
    };
    QueryData: {
        QueryID: UUID;
        QueryText: Buffer;
        QueryFlags: number;
        Category: number;
        SimName: Buffer;
        EstateID: number;
        Godlike: boolean;
        QueryStart: number;
    };

    getSize(): number
    {
        return (this.QueryData['QueryText'].length + 1 + this.QueryData['SimName'].length + 1) + 46;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.QueryData['QueryID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.QueryData['QueryText'].length, pos++);
        this.QueryData['QueryText'].copy(buf, pos);
        pos += this.QueryData['QueryText'].length;
        buf.writeUInt32LE(this.QueryData['QueryFlags'], pos);
        pos += 4;
        buf.writeInt8(this.QueryData['Category'], pos++);
        buf.writeUInt8(this.QueryData['SimName'].length, pos++);
        this.QueryData['SimName'].copy(buf, pos);
        pos += this.QueryData['SimName'].length;
        buf.writeUInt32LE(this.QueryData['EstateID'], pos);
        pos += 4;
        buf.writeUInt8((this.QueryData['Godlike']) ? 1 : 0, pos++);
        buf.writeInt32LE(this.QueryData['QueryStart'], pos);
        pos += 4;
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
        const newObjQueryData: {
            QueryID: UUID,
            QueryText: Buffer,
            QueryFlags: number,
            Category: number,
            SimName: Buffer,
            EstateID: number,
            Godlike: boolean,
            QueryStart: number
        } = {
            QueryID: UUID.zero(),
            QueryText: Buffer.allocUnsafe(0),
            QueryFlags: 0,
            Category: 0,
            SimName: Buffer.allocUnsafe(0),
            EstateID: 0,
            Godlike: false,
            QueryStart: 0
        };
        newObjQueryData['QueryID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjQueryData['QueryText'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        newObjQueryData['QueryFlags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjQueryData['Category'] = buf.readInt8(pos++);
        varLength = buf.readUInt8(pos++);
        newObjQueryData['SimName'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        newObjQueryData['EstateID'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjQueryData['Godlike'] = (buf.readUInt8(pos++) === 1);
        newObjQueryData['QueryStart'] = buf.readInt32LE(pos);
        pos += 4;
        this.QueryData = newObjQueryData;
        return pos - startPos;
    }
}

