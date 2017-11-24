// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class GroupAccountTransactionsRequestPacket implements Packet
{
    name = 'GroupAccountTransactionsRequest';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902117;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        GroupID: UUID;
    };
    MoneyData: {
        RequestID: UUID;
        IntervalDays: number;
        CurrentInterval: number;
    };

    getSize(): number
    {
        return 72;
    }

}
