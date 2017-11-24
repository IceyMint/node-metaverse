// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RetrieveIMsExtendedPacket implements Packet
{
    name = 'RetrieveIMsExtended';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294902187;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        IsPremium: boolean;
    };

    getSize(): number
    {
        return 33;
    }

}
