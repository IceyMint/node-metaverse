"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class MapLayerRequestPacket {
    constructor() {
        this.name = 'MapLayerRequest';
        this.flags = MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294902165;
    }
    getSize() {
        return 41;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.AgentData['Flags'], pos);
        pos += 4;
        buf.writeUInt32LE(this.AgentData['EstateID'], pos);
        pos += 4;
        buf.writeUInt8((this.AgentData['Godlike']) ? 1 : 0, pos++);
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            SessionID: UUID_1.UUID.zero(),
            Flags: 0,
            EstateID: 0,
            Godlike: false
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['Flags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjAgentData['EstateID'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjAgentData['Godlike'] = (buf.readUInt8(pos++) === 1);
        this.AgentData = newObjAgentData;
        return pos - startPos;
    }
}
exports.MapLayerRequestPacket = MapLayerRequestPacket;
//# sourceMappingURL=MapLayerRequest.js.map