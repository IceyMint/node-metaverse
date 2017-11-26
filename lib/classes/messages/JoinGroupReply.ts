// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class JoinGroupReplyMessage implements MessageBase
{
    name = 'JoinGroupReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.JoinGroupReply;

    AgentData: {
        AgentID: UUID;
    };
    GroupData: {
        GroupID: UUID;
        Success: boolean;
    };

    getSize(): number
    {
        return 33;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.GroupData['GroupID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8((this.GroupData['Success']) ? 1 : 0, pos++);
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
        const newObjGroupData: {
            GroupID: UUID,
            Success: boolean
        } = {
            GroupID: UUID.zero(),
            Success: false
        };
        newObjGroupData['GroupID'] = new UUID(buf, pos);
        pos += 16;
        newObjGroupData['Success'] = (buf.readUInt8(pos++) === 1);
        this.GroupData = newObjGroupData;
        return pos - startPos;
    }
}

