// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ConfirmAuctionStartMessage implements MessageBase
{
    name = 'ConfirmAuctionStart';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ConfirmAuctionStart;

    AuctionData: {
        ParcelID: UUID;
        AuctionID: number;
    };

    getSize(): number
    {
        return 20;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AuctionData['ParcelID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.AuctionData['AuctionID'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAuctionData: {
            ParcelID: UUID,
            AuctionID: number
        } = {
            ParcelID: UUID.zero(),
            AuctionID: 0
        };
        newObjAuctionData['ParcelID'] = new UUID(buf, pos);
        pos += 16;
        newObjAuctionData['AuctionID'] = buf.readUInt32LE(pos);
        pos += 4;
        this.AuctionData = newObjAuctionData;
        return pos - startPos;
    }
}

