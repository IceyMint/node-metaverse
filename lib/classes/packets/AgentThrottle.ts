// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class AgentThrottlePacket implements Packet
{
    name = 'AgentThrottle';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901841;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        CircuitCode: number;
    };
    Throttle: {
        GenCounter: number;
        Throttles: string;
    };

    getSize(): number
    {
        return (this.Throttle['Throttles'].length + 1) + 40;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt32LE(this.AgentData['CircuitCode'], pos);
         pos += 4;
         buf.writeUInt32LE(this.Throttle['GenCounter'], pos);
         pos += 4;
         buf.write(this.Throttle['Throttles'], pos);
         pos += this.Throttle['Throttles'].length;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID,
             SessionID: UUID,
             CircuitCode: number
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero(),
             CircuitCode: 0
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['SessionID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['CircuitCode'] = buf.readUInt32LE(pos);
         pos += 4;
         this.AgentData = newObjAgentData;
         const newObjThrottle: {
             GenCounter: number,
             Throttles: string
         } = {
             GenCounter: 0,
             Throttles: ''
         };
         newObjThrottle['GenCounter'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjThrottle['Throttles'] = buf.toString('utf8', pos, length);
         pos += length;
         this.Throttle = newObjThrottle;
         return pos - startPos;
     }
}

