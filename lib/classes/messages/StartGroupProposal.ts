// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class StartGroupProposalMessage implements MessageBase
{
    name = 'StartGroupProposal';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.Deprecated | MessageFlags.FrequencyLow;
    id = Message.StartGroupProposal;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ProposalData: {
        GroupID: UUID;
        Quorum: number;
        Majority: number;
        Duration: number;
        ProposalText: Buffer;
    };

    getSize(): number
    {
        return (this.ProposalData['ProposalText'].length + 1) + 60;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ProposalData['GroupID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.ProposalData['Quorum'], pos);
        pos += 4;
        buf.writeFloatLE(this.ProposalData['Majority'], pos);
        pos += 4;
        buf.writeInt32LE(this.ProposalData['Duration'], pos);
        pos += 4;
        buf.writeUInt8(this.ProposalData['ProposalText'].length, pos++);
        this.ProposalData['ProposalText'].copy(buf, pos);
        pos += this.ProposalData['ProposalText'].length;
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
        const newObjProposalData: {
            GroupID: UUID,
            Quorum: number,
            Majority: number,
            Duration: number,
            ProposalText: Buffer
        } = {
            GroupID: UUID.zero(),
            Quorum: 0,
            Majority: 0,
            Duration: 0,
            ProposalText: Buffer.allocUnsafe(0)
        };
        newObjProposalData['GroupID'] = new UUID(buf, pos);
        pos += 16;
        newObjProposalData['Quorum'] = buf.readInt32LE(pos);
        pos += 4;
        newObjProposalData['Majority'] = buf.readFloatLE(pos);
        pos += 4;
        newObjProposalData['Duration'] = buf.readInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjProposalData['ProposalText'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        this.ProposalData = newObjProposalData;
        return pos - startPos;
    }
}

