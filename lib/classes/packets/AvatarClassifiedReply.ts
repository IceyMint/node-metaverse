// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class AvatarClassifiedReplyPacket implements Packet
{
    name = 'AvatarClassifiedReply';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294901802;

    AgentData: {
        AgentID: UUID;
        TargetID: UUID;
    };
    Data: {
        ClassifiedID: UUID;
        Name: string;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.Data, 'Name', 1) + 16) * this.Data.length) + 33;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

}
