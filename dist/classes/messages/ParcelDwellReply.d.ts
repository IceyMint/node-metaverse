/// <reference types="node" />
import { UUID } from '../UUID';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';
export declare class ParcelDwellReplyMessage implements MessageBase {
    name: string;
    messageFlags: number;
    id: Message;
    AgentData: {
        AgentID: UUID;
    };
    Data: {
        LocalID: number;
        ParcelID: UUID;
        Dwell: number;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
