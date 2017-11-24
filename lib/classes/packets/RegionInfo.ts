// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RegionInfoPacket implements Packet
{
    name = 'RegionInfo';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901902;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    RegionInfo: {
        SimName: string;
        EstateID: number;
        ParentEstateID: number;
        RegionFlags: number;
        SimAccess: number;
        MaxAgents: number;
        BillableFactor: number;
        ObjectBonusFactor: number;
        WaterHeight: number;
        TerrainRaiseLimit: number;
        TerrainLowerLimit: number;
        PricePerMeter: number;
        RedirectGridX: number;
        RedirectGridY: number;
        UseEstateSun: boolean;
        SunHour: number;
    };
    RegionInfo2: {
        ProductSKU: string;
        ProductName: string;
        MaxAgents32: number;
        HardMaxAgents: number;
        HardMaxObjects: number;
    };
    RegionInfo3: {
        RegionFlagsExtended: Long;
    }[];

    getSize(): number
    {
        return (this.RegionInfo['SimName'].length + 1) + (this.RegionInfo2['ProductSKU'].length + 1 + this.RegionInfo2['ProductName'].length + 1) + ((8) * this.RegionInfo3.length) + 96;
    }

}
