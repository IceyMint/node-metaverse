// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class TransferInventoryAckPacket implements Packet
{
    name = 'TransferInventoryAck';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902056;

    InfoBlock: {
        TransactionID: UUID;
        InventoryID: UUID;
    };

    getSize(): number
    {
        return 32;
    }

}
