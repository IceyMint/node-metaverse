// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class LiveHelpGroupReplyMessage implements MessageBase
{
    name = 'LiveHelpGroupReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.LiveHelpGroupReply;

    ReplyData: {
        RequestID: UUID;
        GroupID: UUID;
        Selection: string;
    };

    getSize(): number
    {
        return (this.ReplyData['Selection'].length + 1) + 32;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.ReplyData['RequestID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ReplyData['GroupID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.ReplyData['Selection'].length, pos++);
        buf.write(this.ReplyData['Selection'], pos);
        pos += this.ReplyData['Selection'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjReplyData: {
            RequestID: UUID,
            GroupID: UUID,
            Selection: string
        } = {
            RequestID: UUID.zero(),
            GroupID: UUID.zero(),
            Selection: ''
        };
        newObjReplyData['RequestID'] = new UUID(buf, pos);
        pos += 16;
        newObjReplyData['GroupID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjReplyData['Selection'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        this.ReplyData = newObjReplyData;
        return pos - startPos;
    }
}

