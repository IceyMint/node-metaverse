// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {IPAddress} from '../IPAddress';
import {Vector3} from '../Vector3';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class CrossedRegionPacket implements Packet
{
    name = 'CrossedRegion';
    flags = MessageFlags.Trusted | MessageFlags.Blacklisted | MessageFlags.FrequencyMedium;
    id = 65287;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    RegionData: {
        SimIP: IPAddress;
        SimPort: number;
        RegionHandle: Long;
        SeedCapability: string;
    };
    Info: {
        Position: Vector3;
        LookAt: Vector3;
    };

    getSize(): number
    {
        return (this.RegionData['SeedCapability'].length + 2) + 70;
    }

}
