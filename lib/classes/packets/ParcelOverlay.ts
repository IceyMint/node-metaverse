// This file has been automatically generated by writePacketClasses.js

import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ParcelOverlayPacket implements Packet
{
    name = 'ParcelOverlay';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901956;

    ParcelData: {
        SequenceID: number;
        Data: string;
    };

    getSize(): number
    {
        return (this.ParcelData['Data'].length + 2) + 4;
    }

}
