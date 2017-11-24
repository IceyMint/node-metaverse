// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class OfflineNotificationPacket implements Packet
{
    name = 'OfflineNotification';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294902083;

    AgentBlock: {
        AgentID: UUID;
    }[];

    getSize(): number
    {
        return ((16) * this.AgentBlock.length) + 1;
    }

}
