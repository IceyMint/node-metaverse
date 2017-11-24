// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class MapNameRequestPacket implements Packet
{
    name = 'MapNameRequest';
    flags = MessageFlags.FrequencyLow;
    id = 4294902168;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        Flags: number;
        EstateID: number;
        Godlike: boolean;
    };
    NameData: {
        Name: string;
    };

    getSize(): number
    {
        return (this.NameData['Name'].length + 1) + 41;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
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
         buf.write(this.NameData['Name'], pos);
         pos += this.NameData['Name'].length;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID,
             SessionID: UUID,
             Flags: number,
             EstateID: number,
             Godlike: boolean
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero(),
             Flags: 0,
             EstateID: 0,
             Godlike: false
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['SessionID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['Flags'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjAgentData['EstateID'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjAgentData['Godlike'] = (buf.readUInt8(pos++) === 1);
         this.AgentData = newObjAgentData;
         const newObjNameData: {
             Name: string
         } = {
             Name: ''
         };
         newObjNameData['Name'] = buf.toString('utf8', pos, length);
         pos += length;
         this.NameData = newObjNameData;
         return pos - startPos;
     }
}

