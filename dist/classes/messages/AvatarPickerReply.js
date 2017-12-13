"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
const Message_1 = require("../../enums/Message");
class AvatarPickerReplyMessage {
    constructor() {
        this.name = 'AvatarPickerReply';
        this.messageFlags = MessageFlags_1.MessageFlags.Trusted | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = Message_1.Message.AvatarPickerReply;
    }
    getSize() {
        return ((this.calculateVarVarSize(this.Data, 'FirstName', 1) + this.calculateVarVarSize(this.Data, 'LastName', 1) + 16) * this.Data.length) + 33;
    }
    calculateVarVarSize(block, paramName, extraPerVar) {
        let size = 0;
        block.forEach((bl) => {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['QueryID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.Data.length;
        buf.writeUInt8(this.Data.length, pos++);
        for (let i = 0; i < count; i++) {
            this.Data[i]['AvatarID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.Data[i]['FirstName'].length, pos++);
            this.Data[i]['FirstName'].copy(buf, pos);
            pos += this.Data[i]['FirstName'].length;
            buf.writeUInt8(this.Data[i]['LastName'].length, pos++);
            this.Data[i]['LastName'].copy(buf, pos);
            pos += this.Data[i]['LastName'].length;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            QueryID: UUID_1.UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['QueryID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const count = buf.readUInt8(pos++);
        this.Data = [];
        for (let i = 0; i < count; i++) {
            const newObjData = {
                AvatarID: UUID_1.UUID.zero(),
                FirstName: Buffer.allocUnsafe(0),
                LastName: Buffer.allocUnsafe(0)
            };
            newObjData['AvatarID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjData['FirstName'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            varLength = buf.readUInt8(pos++);
            newObjData['LastName'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            this.Data.push(newObjData);
        }
        return pos - startPos;
    }
}
exports.AvatarPickerReplyMessage = AvatarPickerReplyMessage;
//# sourceMappingURL=AvatarPickerReply.js.map