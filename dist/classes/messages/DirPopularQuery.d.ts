/// <reference types="node" />
import { UUID } from '../UUID';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';
export declare class DirPopularQueryMessage implements MessageBase {
    name: string;
    messageFlags: number;
    id: Message;
    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    QueryData: {
        QueryID: UUID;
        QueryFlags: number;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
