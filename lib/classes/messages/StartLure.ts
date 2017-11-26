// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class StartLureMessage implements MessageBase
{
    name = 'StartLure';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.StartLure;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Info: {
        LureType: number;
        Message: string;
    };
    TargetData: {
        TargetID: UUID;
    }[];

    getSize(): number
    {
        return (this.Info['Message'].length + 1) + ((16) * this.TargetData.length) + 34;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.Info['LureType'], pos++);
        buf.writeUInt8(this.Info['Message'].length, pos++);
        buf.write(this.Info['Message'], pos);
        pos += this.Info['Message'].length;
        const count = this.TargetData.length;
        buf.writeUInt8(this.TargetData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.TargetData[i]['TargetID'].writeToBuffer(buf, pos);
            pos += 16;
        }
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
        const newObjInfo: {
            LureType: number,
            Message: string
        } = {
            LureType: 0,
            Message: ''
        };
        newObjInfo['LureType'] = buf.readUInt8(pos++);
        varLength = buf.readUInt8(pos++);
        newObjInfo['Message'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        this.Info = newObjInfo;
        const count = buf.readUInt8(pos++);
        this.TargetData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjTargetData: {
                TargetID: UUID
            } = {
                TargetID: UUID.zero()
            };
            newObjTargetData['TargetID'] = new UUID(buf, pos);
            pos += 16;
            this.TargetData.push(newObjTargetData);
        }
        return pos - startPos;
    }
}

