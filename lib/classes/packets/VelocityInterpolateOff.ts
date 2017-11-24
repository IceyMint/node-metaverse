// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class VelocityInterpolateOffPacket implements Packet
{
    name = 'VelocityInterpolateOff';
    flags = MessageFlags.FrequencyLow;
    id = 4294901886;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };

    getSize(): number
    {
        return 32;
    }

}
