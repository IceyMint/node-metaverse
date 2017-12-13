"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
const Message_1 = require("../../enums/Message");
class ParcelPropertiesRequestByIDMessage {
    constructor() {
        this.name = 'ParcelPropertiesRequestByID';
        this.messageFlags = MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = Message_1.Message.ParcelPropertiesRequestByID;
    }
    getSize() {
        return 40;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.ParcelData['SequenceID'], pos);
        pos += 4;
        buf.writeInt32LE(this.ParcelData['LocalID'], pos);
        pos += 4;
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            SessionID: UUID_1.UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjParcelData = {
            SequenceID: 0,
            LocalID: 0
        };
        newObjParcelData['SequenceID'] = buf.readInt32LE(pos);
        pos += 4;
        newObjParcelData['LocalID'] = buf.readInt32LE(pos);
        pos += 4;
        this.ParcelData = newObjParcelData;
        return pos - startPos;
    }
}
exports.ParcelPropertiesRequestByIDMessage = ParcelPropertiesRequestByIDMessage;
//# sourceMappingURL=ParcelPropertiesRequestByID.js.map