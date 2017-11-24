// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ParcelPropertiesRequestPacket implements Packet
{
    name = 'ParcelPropertiesRequest';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyMedium;
    id = 65291;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ParcelData: {
        SequenceID: number;
        West: number;
        South: number;
        East: number;
        North: number;
        SnapSelection: boolean;
    };

    getSize(): number
    {
        return 53;
    }

}
