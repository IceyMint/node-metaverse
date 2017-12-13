"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class ChangeInventoryItemFlagsPacket {
    constructor() {
        this.name = 'ChangeInventoryItemFlags';
        this.flags = MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294902031;
    }
    getSize() {
        return ((20) * this.InventoryData.length) + 33;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.InventoryData.length;
        buf.writeUInt8(this.InventoryData.length, pos++);
        for (let i = 0; i < count; i++) {
            this.InventoryData[i]['ItemID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt32LE(this.InventoryData[i]['Flags'], pos);
            pos += 4;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            SessionID: UUID_1.UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const count = buf.readUInt8(pos++);
        this.InventoryData = [];
        for (let i = 0; i < count; i++) {
            const newObjInventoryData = {
                ItemID: UUID_1.UUID.zero(),
                Flags: 0
            };
            newObjInventoryData['ItemID'] = new UUID_1.UUID(buf, pos);
            pos += 16;
            newObjInventoryData['Flags'] = buf.readUInt32LE(pos);
            pos += 4;
            this.InventoryData.push(newObjInventoryData);
        }
        return pos - startPos;
    }
}
exports.ChangeInventoryItemFlagsPacket = ChangeInventoryItemFlagsPacket;
//# sourceMappingURL=ChangeInventoryItemFlags.js.map