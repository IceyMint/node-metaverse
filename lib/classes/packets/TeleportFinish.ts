// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {IPAddress} from '../IPAddress';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class TeleportFinishPacket implements Packet
{
    name = 'TeleportFinish';
    flags = MessageFlags.Trusted | MessageFlags.Blacklisted | MessageFlags.FrequencyLow;
    id = 4294901829;

    Info: {
        AgentID: UUID;
        LocationID: number;
        SimIP: IPAddress;
        SimPort: number;
        RegionHandle: Long;
        SeedCapability: string;
        SimAccess: number;
        TeleportFlags: number;
    };

    getSize(): number
    {
        return (this.Info['SeedCapability'].length + 2) + 39;
    }

}
