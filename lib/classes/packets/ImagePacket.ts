// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ImagePacketPacket implements Packet
{
    name = 'ImagePacket';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyHigh;
    id = 10;

    ImageID: {
        ID: UUID;
        Packet: number;
    };
    ImageData: {
        Data: string;
    };

    getSize(): number
    {
        return (this.ImageData['Data'].length + 2) + 18;
    }

}
