// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {IPAddress} from '../IPAddress';
import {Vector3} from '../Vector3';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class CrossedRegionMessage implements MessageBase
{
    name = 'CrossedRegion';
    messageFlags = MessageFlags.Trusted | MessageFlags.Blacklisted | MessageFlags.FrequencyMedium;
    id = Message.CrossedRegion;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    RegionData: {
        SimIP: IPAddress;
        SimPort: number;
        RegionHandle: Long;
        SeedCapability: Buffer;
    };
    Info: {
        Position: Vector3;
        LookAt: Vector3;
    };

    getSize(): number
    {
        return (this.RegionData['SeedCapability'].length + 2) + 70;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.RegionData['SimIP'].writeToBuffer(buf, pos);
        pos += 4;
        buf.writeUInt16LE(this.RegionData['SimPort'], pos);
        pos += 2;
        buf.writeInt32LE(this.RegionData['RegionHandle'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.RegionData['RegionHandle'].high, pos);
        pos += 4;
        buf.writeUInt16LE(this.RegionData['SeedCapability'].length, pos);
        pos += 2;
        this.RegionData['SeedCapability'].copy(buf, pos);
        pos += this.RegionData['SeedCapability'].length;
        this.Info['Position'].writeToBuffer(buf, pos, false);
        pos += 12;
        this.Info['LookAt'].writeToBuffer(buf, pos, false);
        pos += 12;
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
        const newObjRegionData: {
            SimIP: IPAddress,
            SimPort: number,
            RegionHandle: Long,
            SeedCapability: Buffer
        } = {
            SimIP: IPAddress.zero(),
            SimPort: 0,
            RegionHandle: Long.ZERO,
            SeedCapability: Buffer.allocUnsafe(0)
        };
        newObjRegionData['SimIP'] = new IPAddress(buf, pos);
        pos += 4;
        newObjRegionData['SimPort'] = buf.readUInt16LE(pos);
        pos += 2;
        newObjRegionData['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
        pos += 8;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjRegionData['SeedCapability'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.RegionData = newObjRegionData;
        const newObjInfo: {
            Position: Vector3,
            LookAt: Vector3
        } = {
            Position: Vector3.getZero(),
            LookAt: Vector3.getZero()
        };
        newObjInfo['Position'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjInfo['LookAt'] = new Vector3(buf, pos, false);
        pos += 12;
        this.Info = newObjInfo;
        return pos - startPos;
    }
}

