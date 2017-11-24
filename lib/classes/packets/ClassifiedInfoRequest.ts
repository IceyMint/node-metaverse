// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ClassifiedInfoRequestPacket implements Packet
{
    name = 'ClassifiedInfoRequest';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901803;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        ClassifiedID: UUID;
    };

    getSize(): number
    {
        return 48;
    }

}
