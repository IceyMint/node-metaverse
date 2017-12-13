"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class ParcelAccessListRequestPacket {
    constructor() {
        this.name = 'ParcelAccessListRequest';
        this.flags = MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294901975;
    }
    getSize() {
        return 44;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.Data['SequenceID'], pos);
        pos += 4;
        buf.writeUInt32LE(this.Data['Flags'], pos);
        pos += 4;
        buf.writeInt32LE(this.Data['LocalID'], pos);
        pos += 4;
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
        const newObjData = {
            SequenceID: 0,
            Flags: 0,
            LocalID: 0
        };
        newObjData['SequenceID'] = buf.readInt32LE(pos);
        pos += 4;
        newObjData['Flags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjData['LocalID'] = buf.readInt32LE(pos);
        pos += 4;
        this.Data = newObjData;
        return pos - startPos;
    }
}
exports.ParcelAccessListRequestPacket = ParcelAccessListRequestPacket;
//# sourceMappingURL=ParcelAccessListRequest.js.map