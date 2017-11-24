// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ParcelReclaimPacket implements Packet
{
    name = 'ParcelReclaim';
    flags = MessageFlags.FrequencyLow;
    id = 4294901968;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        LocalID: number;
    };

    getSize(): number
    {
        return 36;
    }

}
