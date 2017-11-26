// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class MapNameRequestMessage implements MessageBase
{
    name = 'MapNameRequest';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.MapNameRequest;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        Flags: number;
        EstateID: number;
        Godlike: boolean;
    };
    NameData: {
        Name: string;
    };

    getSize(): number
    {
        return (this.NameData['Name'].length + 1) + 41;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.AgentData['Flags'], pos);
        pos += 4;
        buf.writeUInt32LE(this.AgentData['EstateID'], pos);
        pos += 4;
        buf.writeUInt8((this.AgentData['Godlike']) ? 1 : 0, pos++);
        buf.writeUInt8(this.NameData['Name'].length, pos++);
        buf.write(this.NameData['Name'], pos);
        pos += this.NameData['Name'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID,
            Flags: number,
            EstateID: number,
            Godlike: boolean
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero(),
            Flags: 0,
            EstateID: 0,
            Godlike: false
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['Flags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjAgentData['EstateID'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjAgentData['Godlike'] = (buf.readUInt8(pos++) === 1);
        this.AgentData = newObjAgentData;
        const newObjNameData: {
            Name: string
        } = {
            Name: ''
        };
        varLength = buf.readUInt8(pos++);
        newObjNameData['Name'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        this.NameData = newObjNameData;
        return pos - startPos;
    }
}

