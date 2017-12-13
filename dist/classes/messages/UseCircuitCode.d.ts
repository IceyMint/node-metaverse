/// <reference types="node" />
import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';
export declare class UseCircuitCodeMessage implements MessageBase {
    name: string;
    messageFlags: MessageFlags;
    id: Message;
    CircuitCode: {
        Code: number;
        SessionID: UUID;
        ID: UUID;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
