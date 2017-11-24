// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class GroupNoticesListReplyPacket implements Packet
{
    name = 'GroupNoticesListReply';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294901819;

    AgentData: {
        AgentID: UUID;
        GroupID: UUID;
    };
    Data: {
        NoticeID: UUID;
        Timestamp: number;
        FromName: string;
        Subject: string;
        HasAttachment: boolean;
        AssetType: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.Data, 'FromName', 2) + this.calculateVarVarSize(this.Data, 'Subject', 2) + 22) * this.Data.length) + 33;
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
