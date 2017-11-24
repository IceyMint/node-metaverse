// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {Quaternion} from '../Quaternion';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ScriptSensorReplyPacket implements Packet
{
    name = 'ScriptSensorReply';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902008;

    Requester: {
        SourceID: UUID;
    };
    SensedData: {
        ObjectID: UUID;
        OwnerID: UUID;
        GroupID: UUID;
        Position: Vector3;
        Velocity: Vector3;
        Rotation: Quaternion;
        Name: string;
        Type: number;
        Range: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.SensedData, 'Name', 1) + 92) * this.SensedData.length) + 17;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.Requester['SourceID'].writeToBuffer(buf, pos);
         pos += 16;
         const count = this.SensedData.length;
         buf.writeUInt8(this.SensedData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             this.SensedData[i]['ObjectID'].writeToBuffer(buf, pos);
             pos += 16;
             this.SensedData[i]['OwnerID'].writeToBuffer(buf, pos);
             pos += 16;
             this.SensedData[i]['GroupID'].writeToBuffer(buf, pos);
             pos += 16;
             this.SensedData[i]['Position'].writeToBuffer(buf, pos, false);
             pos += 12;
             this.SensedData[i]['Velocity'].writeToBuffer(buf, pos, false);
             pos += 12;
             this.SensedData[i]['Rotation'].writeToBuffer(buf, pos);
             pos += 12;
             buf.write(this.SensedData[i]['Name'], pos);
             pos += this.SensedData[i]['Name'].length;
             buf.writeInt32LE(this.SensedData[i]['Type'], pos);
             pos += 4;
             buf.writeFloatLE(this.SensedData[i]['Range'], pos);
             pos += 4;
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjRequester: {
             SourceID: UUID
         } = {
             SourceID: UUID.zero()
         };
         newObjRequester['SourceID'] = new UUID(buf, pos);
         pos += 16;
         this.Requester = newObjRequester;
         const count = buf.readUInt8(pos++);
         this.SensedData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjSensedData: {
                 ObjectID: UUID,
                 OwnerID: UUID,
                 GroupID: UUID,
                 Position: Vector3,
                 Velocity: Vector3,
                 Rotation: Quaternion,
                 Name: string,
                 Type: number,
                 Range: number
             } = {
                 ObjectID: UUID.zero(),
                 OwnerID: UUID.zero(),
                 GroupID: UUID.zero(),
                 Position: Vector3.getZero(),
                 Velocity: Vector3.getZero(),
                 Rotation: Quaternion.getIdentity(),
                 Name: '',
                 Type: 0,
                 Range: 0
             };
             newObjSensedData['ObjectID'] = new UUID(buf, pos);
             pos += 16;
             newObjSensedData['OwnerID'] = new UUID(buf, pos);
             pos += 16;
             newObjSensedData['GroupID'] = new UUID(buf, pos);
             pos += 16;
             newObjSensedData['Position'] = new Vector3(buf, pos, false);
             pos += 12;
             newObjSensedData['Velocity'] = new Vector3(buf, pos, false);
             pos += 12;
             newObjSensedData['Rotation'] = new Quaternion(buf, pos);
             pos += 12;
             newObjSensedData['Name'] = buf.toString('utf8', pos, length);
             pos += length;
             newObjSensedData['Type'] = buf.readInt32LE(pos);
             pos += 4;
             newObjSensedData['Range'] = buf.readFloatLE(pos);
             pos += 4;
             this.SensedData.push(newObjSensedData);
         }
         return pos - startPos;
     }
}

