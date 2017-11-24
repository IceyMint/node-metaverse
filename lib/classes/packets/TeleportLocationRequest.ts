// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class TeleportLocationRequestPacket implements Packet
{
    name = 'TeleportLocationRequest';
    flags = MessageFlags.FrequencyLow;
    id = 4294901823;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Info: {
        RegionHandle: Long;
        Position: Vector3;
        LookAt: Vector3;
    };

    getSize(): number
    {
        return 64;
    }

}
