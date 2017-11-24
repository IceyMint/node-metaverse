// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class SetAlwaysRunPacket implements Packet
{
    name = 'SetAlwaysRun';
    flags = MessageFlags.FrequencyLow;
    id = 4294901848;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        AlwaysRun: boolean;
    };

    getSize(): number
    {
        return 33;
    }

}
