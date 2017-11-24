// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class UserInfoRequestPacket implements Packet
{
    name = 'UserInfoRequest';
    flags = MessageFlags.FrequencyLow;
    id = 4294902159;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };

    getSize(): number
    {
        return 32;
    }

}
