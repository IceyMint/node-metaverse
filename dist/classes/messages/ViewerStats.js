"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const IPAddress_1 = require("../IPAddress");
const MessageFlags_1 = require("../../enums/MessageFlags");
const Message_1 = require("../../enums/Message");
class ViewerStatsMessage {
    constructor() {
        this.name = 'ViewerStats';
        this.messageFlags = MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.Deprecated | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = Message_1.Message.ViewerStats;
    }
    getSize() {
        return (this.AgentData['SysOS'].length + 1 + this.AgentData['SysCPU'].length + 1 + this.AgentData['SysGPU'].length + 1) + ((12) * this.MiscStats.length) + 142;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['IP'].writeToBuffer(buf, pos);
        pos += 4;
        buf.writeUInt32LE(this.AgentData['StartTime'], pos);
        pos += 4;
        buf.writeFloatLE(this.AgentData['RunTime'], pos);
        pos += 4;
        buf.writeFloatLE(this.AgentData['SimFPS'], pos);
        pos += 4;
        buf.writeFloatLE(this.AgentData['FPS'], pos);
        pos += 4;
        buf.writeUInt8(this.AgentData['AgentsInView'], pos++);
        buf.writeFloatLE(this.AgentData['Ping'], pos);
        pos += 4;
        buf.writeDoubleLE(this.AgentData['MetersTraveled'], pos);
        pos += 8;
        buf.writeInt32LE(this.AgentData['RegionsVisited'], pos);
        pos += 4;
        buf.writeUInt32LE(this.AgentData['SysRAM'], pos);
        pos += 4;
        buf.writeUInt8(this.AgentData['SysOS'].length, pos++);
        this.AgentData['SysOS'].copy(buf, pos);
        pos += this.AgentData['SysOS'].length;
        buf.writeUInt8(this.AgentData['SysCPU'].length, pos++);
        this.AgentData['SysCPU'].copy(buf, pos);
        pos += this.AgentData['SysCPU'].length;
        buf.writeUInt8(this.AgentData['SysGPU'].length, pos++);
        this.AgentData['SysGPU'].copy(buf, pos);
        pos += this.AgentData['SysGPU'].length;
        buf.writeUInt32LE(this.DownloadTotals['World'], pos);
        pos += 4;
        buf.writeUInt32LE(this.DownloadTotals['Objects'], pos);
        pos += 4;
        buf.writeUInt32LE(this.DownloadTotals['Textures'], pos);
        pos += 4;
        let count = 2;
        for (let i = 0; i < count; i++) {
            buf.writeUInt32LE(this.NetStats[i]['Bytes'], pos);
            pos += 4;
            buf.writeUInt32LE(this.NetStats[i]['Packets'], pos);
            pos += 4;
            buf.writeUInt32LE(this.NetStats[i]['Compressed'], pos);
            pos += 4;
            buf.writeUInt32LE(this.NetStats[i]['Savings'], pos);
            pos += 4;
        }
        buf.writeUInt32LE(this.FailStats['SendPacket'], pos);
        pos += 4;
        buf.writeUInt32LE(this.FailStats['Dropped'], pos);
        pos += 4;
        buf.writeUInt32LE(this.FailStats['Resent'], pos);
        pos += 4;
        buf.writeUInt32LE(this.FailStats['FailedResends'], pos);
        pos += 4;
        buf.writeUInt32LE(this.FailStats['OffCircuit'], pos);
        pos += 4;
        buf.writeUInt32LE(this.FailStats['Invalid'], pos);
        pos += 4;
        count = this.MiscStats.length;
        buf.writeUInt8(this.MiscStats.length, pos++);
        for (let i = 0; i < count; i++) {
            buf.writeUInt32LE(this.MiscStats[i]['Type'], pos);
            pos += 4;
            buf.writeDoubleLE(this.MiscStats[i]['Value'], pos);
            pos += 8;
        }
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            SessionID: UUID_1.UUID.zero(),
            IP: IPAddress_1.IPAddress.zero(),
            StartTime: 0,
            RunTime: 0,
            SimFPS: 0,
            FPS: 0,
            AgentsInView: 0,
            Ping: 0,
            MetersTraveled: 0,
            RegionsVisited: 0,
            SysRAM: 0,
            SysOS: Buffer.allocUnsafe(0),
            SysCPU: Buffer.allocUnsafe(0),
            SysGPU: Buffer.allocUnsafe(0)
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['IP'] = new IPAddress_1.IPAddress(buf, pos);
        pos += 4;
        newObjAgentData['StartTime'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjAgentData['RunTime'] = buf.readFloatLE(pos);
        pos += 4;
        newObjAgentData['SimFPS'] = buf.readFloatLE(pos);
        pos += 4;
        newObjAgentData['FPS'] = buf.readFloatLE(pos);
        pos += 4;
        newObjAgentData['AgentsInView'] = buf.readUInt8(pos++);
        newObjAgentData['Ping'] = buf.readFloatLE(pos);
        pos += 4;
        newObjAgentData['MetersTraveled'] = buf.readDoubleLE(pos);
        pos += 8;
        newObjAgentData['RegionsVisited'] = buf.readInt32LE(pos);
        pos += 4;
        newObjAgentData['SysRAM'] = buf.readUInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjAgentData['SysOS'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjAgentData['SysCPU'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjAgentData['SysGPU'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.AgentData = newObjAgentData;
        const newObjDownloadTotals = {
            World: 0,
            Objects: 0,
            Textures: 0
        };
        newObjDownloadTotals['World'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjDownloadTotals['Objects'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjDownloadTotals['Textures'] = buf.readUInt32LE(pos);
        pos += 4;
        this.DownloadTotals = newObjDownloadTotals;
        let count = 2;
        this.NetStats = [];
        for (let i = 0; i < count; i++) {
            const newObjNetStats = {
                Bytes: 0,
                Packets: 0,
                Compressed: 0,
                Savings: 0
            };
            newObjNetStats['Bytes'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjNetStats['Packets'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjNetStats['Compressed'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjNetStats['Savings'] = buf.readUInt32LE(pos);
            pos += 4;
            this.NetStats.push(newObjNetStats);
        }
        const newObjFailStats = {
            SendPacket: 0,
            Dropped: 0,
            Resent: 0,
            FailedResends: 0,
            OffCircuit: 0,
            Invalid: 0
        };
        newObjFailStats['SendPacket'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjFailStats['Dropped'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjFailStats['Resent'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjFailStats['FailedResends'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjFailStats['OffCircuit'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjFailStats['Invalid'] = buf.readUInt32LE(pos);
        pos += 4;
        this.FailStats = newObjFailStats;
        count = buf.readUInt8(pos++);
        this.MiscStats = [];
        for (let i = 0; i < count; i++) {
            const newObjMiscStats = {
                Type: 0,
                Value: 0
            };
            newObjMiscStats['Type'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjMiscStats['Value'] = buf.readDoubleLE(pos);
            pos += 8;
            this.MiscStats.push(newObjMiscStats);
        }
        return pos - startPos;
    }
}
exports.ViewerStatsMessage = ViewerStatsMessage;
//# sourceMappingURL=ViewerStats.js.map