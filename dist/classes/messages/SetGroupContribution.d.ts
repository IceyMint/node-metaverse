/// <reference types="node" />
import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';
export declare class SetGroupContributionMessage implements MessageBase {
    name: string;
    messageFlags: MessageFlags;
    id: Message;
    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        GroupID: UUID;
        Contribution: number;
    };
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}
