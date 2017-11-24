// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RegionHandshakeReplyPacket implements Packet
{
    name = 'RegionHandshakeReply';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901909;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    RegionInfo: {
        Flags: number;
    };

    getSize(): number
    {
        return 36;
    }

}
