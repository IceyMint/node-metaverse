/// <reference types="node" />
import { UUID } from '../UUID';
import { Packet } from '../Packet';
export declare class ObjectOwnerPacket implements Packet {
    name: string;
    flags: number;
    id: number;
    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    HeaderData: {
        Override: boolean;
        OwnerID: UUID;
        GroupID: UUID;
    };
    ObjectData: {
        ObjectLocalID: number;
    }[];
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
