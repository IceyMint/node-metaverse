// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class TeleportProgressMessage implements MessageBase
{
    name = 'TeleportProgress';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.TeleportProgress;

    AgentData: {
        AgentID: UUID;
    };
    Info: {
        TeleportFlags: number;
        Message: Buffer;
    };

    getSize(): number
    {
        return (this.Info['Message'].length + 1) + 20;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.Info['TeleportFlags'], pos);
        pos += 4;
        buf.writeUInt8(this.Info['Message'].length, pos++);
        this.Info['Message'].copy(buf, pos);
        pos += this.Info['Message'].length;
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
        const newObjInfo: {
            TeleportFlags: number,
            Message: Buffer
        } = {
            TeleportFlags: 0,
            Message: Buffer.allocUnsafe(0)
        };
        newObjInfo['TeleportFlags'] = buf.readUInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjInfo['Message'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.Info = newObjInfo;
        return pos - startPos;
    }
}

