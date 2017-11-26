// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class UUIDNameReplyMessage implements MessageBase
{
    name = 'UUIDNameReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.UUIDNameReply;

    UUIDNameBlock: {
        ID: UUID;
        FirstName: Buffer;
        LastName: Buffer;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.UUIDNameBlock, 'FirstName', 1) + this.calculateVarVarSize(this.UUIDNameBlock, 'LastName', 1) + 16) * this.UUIDNameBlock.length) + 1;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        const count = this.UUIDNameBlock.length;
        buf.writeUInt8(this.UUIDNameBlock.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.UUIDNameBlock[i]['ID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.UUIDNameBlock[i]['FirstName'].length, pos++);
            this.UUIDNameBlock[i]['FirstName'].copy(buf, pos);
            pos += this.UUIDNameBlock[i]['FirstName'].length;
            buf.writeUInt8(this.UUIDNameBlock[i]['LastName'].length, pos++);
            this.UUIDNameBlock[i]['LastName'].copy(buf, pos);
            pos += this.UUIDNameBlock[i]['LastName'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const count = buf.readUInt8(pos++);
        this.UUIDNameBlock = [];
        for (let i = 0; i < count; i++)
        {
            const newObjUUIDNameBlock: {
                ID: UUID,
                FirstName: Buffer,
                LastName: Buffer
            } = {
                ID: UUID.zero(),
                FirstName: Buffer.allocUnsafe(0),
                LastName: Buffer.allocUnsafe(0)
            };
            newObjUUIDNameBlock['ID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjUUIDNameBlock['FirstName'] = buf.slice(pos, pos + (varLength - 1));
            pos += varLength;
            varLength = buf.readUInt8(pos++);
            newObjUUIDNameBlock['LastName'] = buf.slice(pos, pos + (varLength - 1));
            pos += varLength;
            this.UUIDNameBlock.push(newObjUUIDNameBlock);
        }
        return pos - startPos;
    }
}

