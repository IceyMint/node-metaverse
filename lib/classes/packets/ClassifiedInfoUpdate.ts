// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ClassifiedInfoUpdatePacket implements Packet
{
    name = 'ClassifiedInfoUpdate';
    flags = MessageFlags.FrequencyLow;
    id = 4294901805;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        ClassifiedID: UUID;
        Category: number;
        Name: string;
        Desc: string;
        ParcelID: UUID;
        ParentEstate: number;
        SnapshotID: UUID;
        PosGlobal: Vector3;
        ClassifiedFlags: number;
        PriceForListing: number;
    };

    getSize(): number
    {
        return (this.Data['Name'].length + 1 + this.Data['Desc'].length + 2) + 117;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         this.Data['ClassifiedID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt32LE(this.Data['Category'], pos);
         pos += 4;
         buf.write(this.Data['Name'], pos);
         pos += this.Data['Name'].length;
         buf.write(this.Data['Desc'], pos);
         pos += this.Data['Desc'].length;
         this.Data['ParcelID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt32LE(this.Data['ParentEstate'], pos);
         pos += 4;
         this.Data['SnapshotID'].writeToBuffer(buf, pos);
         pos += 16;
         this.Data['PosGlobal'].writeToBuffer(buf, pos, true);
         pos += 24;
         buf.writeUInt8(this.Data['ClassifiedFlags'], pos++);
         buf.writeInt32LE(this.Data['PriceForListing'], pos);
         pos += 4;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID,
             SessionID: UUID
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero()
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['SessionID'] = new UUID(buf, pos);
         pos += 16;
         this.AgentData = newObjAgentData;
         const newObjData: {
             ClassifiedID: UUID,
             Category: number,
             Name: string,
             Desc: string,
             ParcelID: UUID,
             ParentEstate: number,
             SnapshotID: UUID,
             PosGlobal: Vector3,
             ClassifiedFlags: number,
             PriceForListing: number
         } = {
             ClassifiedID: UUID.zero(),
             Category: 0,
             Name: '',
             Desc: '',
             ParcelID: UUID.zero(),
             ParentEstate: 0,
             SnapshotID: UUID.zero(),
             PosGlobal: Vector3.getZero(),
             ClassifiedFlags: 0,
             PriceForListing: 0
         };
         newObjData['ClassifiedID'] = new UUID(buf, pos);
         pos += 16;
         newObjData['Category'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjData['Name'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjData['Desc'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjData['ParcelID'] = new UUID(buf, pos);
         pos += 16;
         newObjData['ParentEstate'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjData['SnapshotID'] = new UUID(buf, pos);
         pos += 16;
         newObjData['PosGlobal'] = new Vector3(buf, pos, true);
         pos += 24;
         newObjData['ClassifiedFlags'] = buf.readUInt8(pos++);
         newObjData['PriceForListing'] = buf.readInt32LE(pos);
         pos += 4;
         this.Data = newObjData;
         return pos - startPos;
     }
}

