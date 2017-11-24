// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RequestObjectPropertiesFamilyPacket implements Packet
{
    name = 'RequestObjectPropertiesFamily';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyMedium;
    id = 65285;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        RequestFlags: number;
        ObjectID: UUID;
    };

    getSize(): number
    {
        return 52;
    }

}
