/// <reference types="node" />
import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { Packet } from '../Packet';
export declare class ParcelDeedToGroupPacket implements Packet {
    name: string;
    flags: MessageFlags;
    id: number;
    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        GroupID: UUID;
        LocalID: number;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
