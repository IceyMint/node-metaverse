"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class GroupActiveProposalsRequestPacket {
    constructor() {
        this.name = 'GroupActiveProposalsRequest';
        this.flags = MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294902119;
    }
    getSize() {
        return 64;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.GroupData['GroupID'].writeToBuffer(buf, pos);
        pos += 16;
        this.TransactionData['TransactionID'].writeToBuffer(buf, pos);
        pos += 16;
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
        const newObjGroupData = {
            GroupID: UUID_1.UUID.zero()
        };
        newObjGroupData['GroupID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.GroupData = newObjGroupData;
        const newObjTransactionData = {
            TransactionID: UUID_1.UUID.zero()
        };
        newObjTransactionData['TransactionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.TransactionData = newObjTransactionData;
        return pos - startPos;
    }
}
exports.GroupActiveProposalsRequestPacket = GroupActiveProposalsRequestPacket;
//# sourceMappingURL=GroupActiveProposalsRequest.js.map