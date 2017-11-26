// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class CreateInventoryItemMessage implements MessageBase
{
    name = 'CreateInventoryItem';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.CreateInventoryItem;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    InventoryBlock: {
        CallbackID: number;
        FolderID: UUID;
        TransactionID: UUID;
        NextOwnerMask: number;
        Type: number;
        InvType: number;
        WearableType: number;
        Name: Buffer;
        Description: Buffer;
    };

    getSize(): number
    {
        return (this.InventoryBlock['Name'].length + 1 + this.InventoryBlock['Description'].length + 1) + 75;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.InventoryBlock['CallbackID'], pos);
        pos += 4;
        this.InventoryBlock['FolderID'].writeToBuffer(buf, pos);
        pos += 16;
        this.InventoryBlock['TransactionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.InventoryBlock['NextOwnerMask'], pos);
        pos += 4;
        buf.writeInt8(this.InventoryBlock['Type'], pos++);
        buf.writeInt8(this.InventoryBlock['InvType'], pos++);
        buf.writeUInt8(this.InventoryBlock['WearableType'], pos++);
        buf.writeUInt8(this.InventoryBlock['Name'].length, pos++);
        this.InventoryBlock['Name'].copy(buf, pos);
        pos += this.InventoryBlock['Name'].length;
        buf.writeUInt8(this.InventoryBlock['Description'].length, pos++);
        this.InventoryBlock['Description'].copy(buf, pos);
        pos += this.InventoryBlock['Description'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjInventoryBlock: {
            CallbackID: number,
            FolderID: UUID,
            TransactionID: UUID,
            NextOwnerMask: number,
            Type: number,
            InvType: number,
            WearableType: number,
            Name: Buffer,
            Description: Buffer
        } = {
            CallbackID: 0,
            FolderID: UUID.zero(),
            TransactionID: UUID.zero(),
            NextOwnerMask: 0,
            Type: 0,
            InvType: 0,
            WearableType: 0,
            Name: Buffer.allocUnsafe(0),
            Description: Buffer.allocUnsafe(0)
        };
        newObjInventoryBlock['CallbackID'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjInventoryBlock['FolderID'] = new UUID(buf, pos);
        pos += 16;
        newObjInventoryBlock['TransactionID'] = new UUID(buf, pos);
        pos += 16;
        newObjInventoryBlock['NextOwnerMask'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjInventoryBlock['Type'] = buf.readInt8(pos++);
        newObjInventoryBlock['InvType'] = buf.readInt8(pos++);
        newObjInventoryBlock['WearableType'] = buf.readUInt8(pos++);
        varLength = buf.readUInt8(pos++);
        newObjInventoryBlock['Name'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjInventoryBlock['Description'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        this.InventoryBlock = newObjInventoryBlock;
        return pos - startPos;
    }
}

