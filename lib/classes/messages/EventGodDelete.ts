// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class EventGodDeleteMessage implements MessageBase
{
    name = 'EventGodDelete';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.EventGodDelete;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    EventData: {
        EventID: number;
    };
    QueryData: {
        QueryID: UUID;
        QueryText: Buffer;
        QueryFlags: number;
        QueryStart: number;
    };

    getSize(): number
    {
        return (this.QueryData['QueryText'].length + 1) + 60;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.EventData['EventID'], pos);
        pos += 4;
        this.QueryData['QueryID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.QueryData['QueryText'].length, pos++);
        this.QueryData['QueryText'].copy(buf, pos);
        pos += this.QueryData['QueryText'].length;
        buf.writeUInt32LE(this.QueryData['QueryFlags'], pos);
        pos += 4;
        buf.writeInt32LE(this.QueryData['QueryStart'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
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
        const newObjEventData: {
            EventID: number
        } = {
            EventID: 0
        };
        newObjEventData['EventID'] = buf.readUInt32LE(pos);
        pos += 4;
        this.EventData = newObjEventData;
        const newObjQueryData: {
            QueryID: UUID,
            QueryText: Buffer,
            QueryFlags: number,
            QueryStart: number
        } = {
            QueryID: UUID.zero(),
            QueryText: Buffer.allocUnsafe(0),
            QueryFlags: 0,
            QueryStart: 0
        };
        newObjQueryData['QueryID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjQueryData['QueryText'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        newObjQueryData['QueryFlags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjQueryData['QueryStart'] = buf.readInt32LE(pos);
        pos += 4;
        this.QueryData = newObjQueryData;
        return pos - startPos;
    }
}

