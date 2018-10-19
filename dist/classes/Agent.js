"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("./UUID");
const Vector3_1 = require("./Vector3");
const Inventory_1 = require("./Inventory");
const Message_1 = require("../enums/Message");
const AgentUpdate_1 = require("./messages/AgentUpdate");
const Quaternion_1 = require("./Quaternion");
const AgentState_1 = require("../enums/AgentState");
const BuiltInAnimations_1 = require("../enums/BuiltInAnimations");
const LLSD = require("@caspertech/llsd");
const AgentWearablesRequest_1 = require("./messages/AgentWearablesRequest");
const InventorySortOrder_1 = require("../enums/InventorySortOrder");
const RezSingleAttachmentFromInv_1 = require("./messages/RezSingleAttachmentFromInv");
const AttachmentPoint_1 = require("../enums/AttachmentPoint");
const Utils_1 = require("./Utils");
const __1 = require("..");
class Agent {
    constructor(clientEvents) {
        this.localID = 0;
        this.chatSessions = {};
        this.controlFlags = 0;
        this.openID = {};
        this.buddyList = [];
        this.uiFlags = {};
        this.cameraLookAt = new Vector3_1.Vector3([0.979546, 0.105575, -0.171303]);
        this.cameraCenter = new Vector3_1.Vector3([199.58, 203.95, 24.304]);
        this.cameraLeftAxis = new Vector3_1.Vector3([-1.0, 0.0, 0]);
        this.cameraUpAxis = new Vector3_1.Vector3([0.0, 0.0, 1.0]);
        this.cameraFar = 1;
        this.home = {};
        this.gestures = [];
        this.agentUpdateTimer = null;
        this.estateManager = false;
        this.inventory = new Inventory_1.Inventory(clientEvents, this);
        this.clientEvents = clientEvents;
        this.clientEvents.onGroupChatAgentListUpdate.subscribe((event) => {
            const str = event.groupID.toString();
            if (this.chatSessions[str] === undefined) {
                this.chatSessions[str] = {};
            }
            const agent = event.agentID.toString();
            if (event.entered) {
                this.chatSessions[str][agent] = {
                    hasVoice: event.canVoiceChat,
                    isModerator: event.isModerator
                };
            }
            else {
                delete this.chatSessions[str][agent];
            }
        });
    }
    setIsEstateManager(is) {
        this.estateManager = is;
    }
    getSessionAgentCount(uuid) {
        const str = uuid.toString();
        if (this.chatSessions[str] === undefined) {
            return 0;
        }
        else {
            return Object.keys(this.chatSessions[str]).length;
        }
    }
    addChatSession(uuid) {
        const str = uuid.toString();
        if (this.chatSessions[str] === undefined) {
            this.chatSessions[str] = {};
        }
    }
    hasChatSession(uuid) {
        const str = uuid.toString();
        return !(this.chatSessions[str] === undefined);
    }
    setCurrentRegion(region) {
        this.currentRegion = region;
        this.currentRegion.circuit.subscribeToMessages([
            Message_1.Message.AvatarAnimation
        ], this.onAnimState.bind(this));
    }
    circuitActive() {
        this.agentUpdateTimer = setInterval(this.sendAgentUpdate.bind(this), 1000);
    }
    sendAgentUpdate() {
        if (!this.currentRegion) {
            return;
        }
        const circuit = this.currentRegion.circuit;
        const agentUpdate = new AgentUpdate_1.AgentUpdateMessage();
        agentUpdate.AgentData = {
            AgentID: this.agentID,
            SessionID: circuit.sessionID,
            HeadRotation: Quaternion_1.Quaternion.getIdentity(),
            BodyRotation: Quaternion_1.Quaternion.getIdentity(),
            State: AgentState_1.AgentState.None,
            CameraCenter: this.cameraCenter,
            CameraAtAxis: this.cameraLookAt,
            CameraLeftAxis: this.cameraLeftAxis,
            CameraUpAxis: this.cameraUpAxis,
            Far: this.cameraFar,
            ControlFlags: this.controlFlags,
            Flags: __1.AgentFlags.None
        };
        circuit.sendMessage(agentUpdate, 0);
    }
    shutdown() {
        if (this.agentUpdateTimer !== null) {
            clearInterval(this.agentUpdateTimer);
            this.agentUpdateTimer = null;
        }
    }
    onAnimState(packet) {
        if (packet.message.id === Message_1.Message.AvatarAnimation) {
            const animMsg = packet.message;
            if (animMsg.Sender.ID.toString() === this.agentID.toString()) {
                animMsg.AnimationList.forEach((anim) => {
                    const a = anim.AnimID.toString();
                    if (a === BuiltInAnimations_1.BuiltInAnimations.STANDUP ||
                        a === BuiltInAnimations_1.BuiltInAnimations.PRE_JUMP ||
                        a === BuiltInAnimations_1.BuiltInAnimations.LAND ||
                        a === BuiltInAnimations_1.BuiltInAnimations.MEDIUM_LAND ||
                        a === BuiltInAnimations_1.BuiltInAnimations.WALK ||
                        a === BuiltInAnimations_1.BuiltInAnimations.RUN) {
                        this.controlFlags = __1.ControlFlags.AGENT_CONTROL_FINISH_ANIM;
                        this.sendAgentUpdate();
                        this.controlFlags = 0;
                    }
                });
            }
        }
    }
    setInitialAppearance() {
        const circuit = this.currentRegion.circuit;
        const wearablesRequest = new AgentWearablesRequest_1.AgentWearablesRequestMessage();
        wearablesRequest.AgentData = {
            AgentID: this.agentID,
            SessionID: circuit.sessionID
        };
        circuit.sendMessage(wearablesRequest, __1.PacketFlags.Reliable);
        circuit.waitForMessage(Message_1.Message.AgentWearablesUpdate, 10000).then((wearables) => {
            if (!this.wearables || wearables.AgentData.SerialNum > this.wearables.serialNumber) {
                this.wearables = {
                    serialNumber: wearables.AgentData.SerialNum,
                    attachments: []
                };
                wearables.WearableData.forEach((wearable) => {
                    if (this.wearables && this.wearables.attachments) {
                        this.wearables.attachments.push({
                            itemID: wearable.ItemID,
                            assetID: wearable.AssetID,
                            wearableType: wearable.WearableType
                        });
                    }
                });
            }
            Object.keys(this.inventory.main.skeleton).forEach((uuid) => {
                const folder = this.inventory.main.skeleton[uuid];
                if (folder.typeDefault === __1.AssetType.CurrentOutfitFolder) {
                    const folderID = folder.folderID;
                    const requestFolder = {
                        folder_id: new LLSD.UUID(folderID),
                        owner_id: new LLSD.UUID(this.agentID),
                        fetch_folders: true,
                        fetch_items: true,
                        sort_order: InventorySortOrder_1.InventorySortOrder.ByName
                    };
                    const requestedFolders = {
                        'folders': [
                            requestFolder
                        ]
                    };
                    this.currentRegion.caps.capsRequestXML('FetchInventoryDescendents2', requestedFolders).then((folderContents) => {
                        const currentOutfitFolderContents = folderContents['folders'][0]['items'];
                        const wornObjects = this.currentRegion.objects.getObjectsByParent(this.localID);
                        currentOutfitFolderContents.forEach((item) => {
                            if (item.type === 6) {
                                let found = false;
                                wornObjects.forEach((obj) => {
                                    if (obj.hasNameValueEntry('AttachItemID')) {
                                        if (item['item_id'].toString() === obj.getNameValueEntry('AttachItemID')) {
                                            found = true;
                                        }
                                    }
                                });
                                if (!found) {
                                    const rsafi = new RezSingleAttachmentFromInv_1.RezSingleAttachmentFromInvMessage();
                                    rsafi.AgentData = {
                                        AgentID: this.agentID,
                                        SessionID: circuit.sessionID
                                    };
                                    rsafi.ObjectData = {
                                        ItemID: new UUID_1.UUID(item['item_id'].toString()),
                                        OwnerID: this.agentID,
                                        AttachmentPt: 0x80 | AttachmentPoint_1.AttachmentPoint.Default,
                                        ItemFlags: item['flags'],
                                        GroupMask: item['permissions']['group_mask'],
                                        EveryoneMask: item['permissions']['everyone_mask'],
                                        NextOwnerMask: item['permissions']['next_owner_mask'],
                                        Name: Utils_1.Utils.StringToBuffer(item['name']),
                                        Description: Utils_1.Utils.StringToBuffer(item['desc'])
                                    };
                                    circuit.sendMessage(rsafi, __1.PacketFlags.Reliable);
                                }
                            }
                        });
                    });
                }
            });
        });
    }
}
exports.Agent = Agent;
//# sourceMappingURL=Agent.js.map