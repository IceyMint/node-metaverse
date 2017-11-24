// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class MeanCollisionAlertPacket implements Packet
{
    name = 'MeanCollisionAlert';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901896;

    MeanCollision: {
        Victim: UUID;
        Perp: UUID;
        Time: number;
        Mag: number;
        Type: number;
    }[];

    getSize(): number
    {
        return ((41) * this.MeanCollision.length) + 1;
    }

}
