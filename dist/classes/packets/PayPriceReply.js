"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class PayPriceReplyPacket {
    constructor() {
        this.name = 'PayPriceReply';
        this.flags = MessageFlags_1.MessageFlags.Trusted | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294901922;
    }
    getSize() {
        return ((4) * this.ButtonData.length) + 21;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.ObjectData['ObjectID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.ObjectData['DefaultPayPrice'], pos);
        pos += 4;
        const count = this.ButtonData.length;
        buf.writeUInt8(this.ButtonData.length, pos++);
        for (let i = 0; i < count; i++) {
            buf.writeInt32LE(this.ButtonData[i]['PayButton'], pos);
            pos += 4;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const newObjObjectData = {
            ObjectID: UUID_1.UUID.zero(),
            DefaultPayPrice: 0
        };
        newObjObjectData['ObjectID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjObjectData['DefaultPayPrice'] = buf.readInt32LE(pos);
        pos += 4;
        this.ObjectData = newObjObjectData;
        const count = buf.readUInt8(pos++);
        this.ButtonData = [];
        for (let i = 0; i < count; i++) {
            const newObjButtonData = {
                PayButton: 0
            };
            newObjButtonData['PayButton'] = buf.readInt32LE(pos);
            pos += 4;
            this.ButtonData.push(newObjButtonData);
        }
        return pos - startPos;
    }
}
exports.PayPriceReplyPacket = PayPriceReplyPacket;
//# sourceMappingURL=PayPriceReply.js.map