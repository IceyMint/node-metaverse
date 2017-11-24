// This file has been automatically generated by writePacketClasses.js

import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class DisableSimulatorPacket implements Packet
{
    name = 'DisableSimulator';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294901912;


    getSize(): number
    {
        return 0;
    }

}
