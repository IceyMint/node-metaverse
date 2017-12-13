/// <reference types="node" />
import { UUID } from '../UUID';
import { Packet } from '../Packet';
export declare class ObjectExtraParamsPacket implements Packet {
    name: string;
    flags: number;
    id: number;
    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ObjectLocalID: number;
        ParamType: number;
        ParamInUse: boolean;
        ParamSize: number;
        ParamData: string;
    }[];
    getSize(): number;
    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
