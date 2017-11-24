// This file has been automatically generated by writePacketClasses.js

import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class TestMessagePacket implements Packet
{
    name = 'TestMessage';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901761;

    TestBlock1: {
        Test1: number;
    };
    NeighborBlock: {
        Test0: number;
        Test1: number;
        Test2: number;
    }[];

    getSize(): number
    {
        return 52;
    }

}
