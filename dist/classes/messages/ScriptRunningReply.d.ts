/// <reference types="node" />
import { UUID } from '../UUID';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';
export declare class ScriptRunningReplyMessage implements MessageBase {
    name: string;
    messageFlags: number;
    id: Message;
    Script: {
        ObjectID: UUID;
        ItemID: UUID;
        Running: boolean;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
