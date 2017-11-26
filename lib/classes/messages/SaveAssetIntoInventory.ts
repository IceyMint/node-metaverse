// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class SaveAssetIntoInventoryMessage implements MessageBase
{
    name = 'SaveAssetIntoInventory';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.SaveAssetIntoInventory;

    AgentData: {
        AgentID: UUID;
    };
    InventoryData: {
        ItemID: UUID;
        NewAssetID: UUID;
    };

    getSize(): number
    {
        return 48;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.InventoryData['ItemID'].writeToBuffer(buf, pos);
        pos += 16;
        this.InventoryData['NewAssetID'].writeToBuffer(buf, pos);
        pos += 16;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID
        } = {
            AgentID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjInventoryData: {
            ItemID: UUID,
            NewAssetID: UUID
        } = {
            ItemID: UUID.zero(),
            NewAssetID: UUID.zero()
        };
        newObjInventoryData['ItemID'] = new UUID(buf, pos);
        pos += 16;
        newObjInventoryData['NewAssetID'] = new UUID(buf, pos);
        pos += 16;
        this.InventoryData = newObjInventoryData;
        return pos - startPos;
    }
}

