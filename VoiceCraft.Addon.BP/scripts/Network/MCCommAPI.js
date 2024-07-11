const PacketType = Object.freeze({
  Login: 0,
  Accept: 1,
  Deny: 2,
  Bind: 3,
  Update: 4,
  AckUpdate: 5,
  GetChannels: 6,
  GetChannelSettings: 7,
  SetChannelSettings: 8,
  GetDefaultSettings: 9,
  SetDefaultSettings: 10,

  //Participant Stuff
  GetParticipants: 11,
  DisconnectParticipant: 12,
  GetParticipantBitmask: 13,
  SetParticipantBitmask: 14,
  MuteParticipant: 15,
  UnmuteParticipant: 16,
  DeafenParticipant: 17,
  UndeafenParticipant: 18,

  ANDModParticipantBitmask: 19,
  ORModParticipantBitmask: 20,
  XORModParticipantBitmask: 21,

  ChannelMove: 22,
});

const BitmaskMap = Object.freeze({
  Bitmask1Settings: 0b00000000000000000000000000001111,
  Bitmask2Settings: 0b00000000000000000000000011110000,
  Bitmask3Settings: 0b00000000000000000000111100000000,
  Bitmask4Settings: 0b00000000000000001111000000000000,
  Bitmask5Settings: 0b00000000000011110000000000000000,
  TalkBitmask1: 0b00000000000100000000000000000000,
  TalkBitmask2: 0b00000000001000000000000000000000,
  TalkBitmask3: 0b00000000010000000000000000000000,
  TalkBitmask4: 0b00000000100000000000000000000000,
  TalkBitmask5: 0b00000001000000000000000000000000,
  ListenBitmask1: 0b00000010000000000000000000000000,
  ListenBitmask2: 0b00000100000000000000000000000000,
  ListenBitmask3: 0b00001000000000000000000000000000,
  ListenBitmask4: 0b00010000000000000000000000000000,
  ListenBitmask5: 0b00100000000000000000000000000000,
  DataBitmask: 0b11000000000000000000000000000000,
});

const BitmaskMapUtils = Object.freeze({
  Default: BitmaskMap.TalkBitmask1 | BitmaskMap.ListenBitmask1,
  AllBitmaskSettings:
    BitmaskMap.Bitmask1Settings |
    BitmaskMap.Bitmask2Settings |
    BitmaskMap.Bitmask3Settings |
    BitmaskMap.Bitmask4Settings |
    BitmaskMap.Bitmask5Settings,
  AllTalkBitmasks:
    BitmaskMap.TalkBitmask1 |
    BitmaskMap.TalkBitmask2 |
    BitmaskMap.TalkBitmask3 |
    BitmaskMap.TalkBitmask4 |
    BitmaskMap.TalkBitmask5,
  AllListenBitmasks:
    BitmaskMap.ListenBitmask1 |
    BitmaskMap.ListenBitmask2 |
    BitmaskMap.ListenBitmask3 |
    BitmaskMap.ListenBitmask4 |
    BitmaskMap.ListenBitmask5,
});

const BitmaskLocations = Object.freeze({
  Bitmask1Settings: 0, //4 bits
  Bitmask2Settings: 4, //4 bits
  Bitmask3Settings: 8, //4 bits
  Bitmask4Settings: 12, //4 bits
  Bitmask5Settings: 16, //4 bits
  TalkBitmask1: 20, //1 bit
  TalkBitmask2: 21, //1 bit
  TalkBitmask3: 22, //1 bit
  TalkBitmask4: 23, //1 bit
  TalkBitmask5: 24, //1 bit
  ListenBitmask1: 25, //1 bit
  ListenBitmask2: 26, //1 bit
  ListenBitmask3: 27, //1 bit
  ListenBitmask4: 28, //1 bit
  ListenBitmask5: 29, //1 bit
  DataBitmask: 30, //2 bits
  //32 bits total
});

const BitmaskSettings = Object.freeze({
  All: 4294967295, //1111
  None: 0, //0000
  ProximityDisabled: 1, //0001
  DeathDisabled: 2, //0010
  VoiceEffectsDisabled: 4, //0100
  EnvironmentDisabled: 8, //1000
});

const DataBitmask = Object.freeze({
  Dead: 1,
  InWater: 2,
});

class MCCommPacket {
  /** @argument {Number} packetId */
  constructor(packetId) {
    this.PacketId = packetId;
    this.Token = "";
  }
}

class Login extends MCCommPacket {
  constructor() {
    super(PacketType.Login);
    /** @type {String} */
    this.LoginKey = "";
  }
}

class Accept extends MCCommPacket {
  constructor() {
    super(PacketType.Accept);
  }
}

class Deny extends MCCommPacket {
  constructor() {
    super(PacketType.Deny);
    /** @type {String} */
    this.Reason = "";
  }
}

class Bind extends MCCommPacket {
  constructor() {
    super(PacketType.Bind);
    /** @type {String} */
    this.PlayerId = "";
    /** @type {Number} */
    this.PlayerKey = 0;
    /** @type {String} */
    this.Gamertag = "";
  }
}

class Update extends MCCommPacket {
  constructor() {
    super(PacketType.Update);
    /** @type {VoiceCraftPlayer[]} */
    this.Players = [];
  }
}

class AckUpdate extends MCCommPacket {
  constructor() {
    super(PacketType.AckUpdate);
    /** @type {String[]} */
    this.SpeakingPlayers = [];
  }
}

class GetChannels extends MCCommPacket {
  constructor() {
    super(PacketType.GetChannels);
    /** @type {Map<Number, Channel>} */
    this.Channels = new Map();
  }
}

class GetChannelSettings extends MCCommPacket {
  constructor() {
    super(PacketType.GetChannelSettings);
    /** @type {Number} */
    this.ChannelId = 0;
    /** @type {Number} */
    this.ProximityDistance = 30;
    /** @type {Boolean} */
    this.ProximityToggle = true;
    /** @type {Boolean} */
    this.VoiceEffects = true;
  }
}

class SetChannelSettings extends MCCommPacket {
  constructor() {
    super(PacketType.SetChannelSettings);
    /** @type {Number} */
    this.ChannelId = 0;
    /** @type {Number} */
    this.ProximityDistance = 30;
    /** @type {Boolean} */
    this.ProximityToggle = true;
    /** @type {Boolean} */
    this.VoiceEffects = true;
    /** @type {Boolean} */
    this.ClearSettings = true;
  }
}

class GetDefaultSettings extends MCCommPacket {
  constructor() {
    super(PacketType.GetDefaultSettings);
    /** @type {Number} */
    this.ProximityDistance = 30;
    /** @type {Boolean} */
    this.ProximityToggle = true;
    /** @type {Boolean} */
    this.VoiceEffects = true;
  }
}

class SetDefaultSettings extends MCCommPacket {
  constructor() {
    super(PacketType.SetDefaultSettings);
    /** @type {Number} */
    this.ProximityDistance = 30;
    /** @type {Boolean} */
    this.ProximityToggle = true;
    /** @type {Boolean} */
    this.VoiceEffects = true;
  }
}

class GetParticipants extends MCCommPacket {
  constructor()
  {
    super(PacketType.GetParticipants);
    /** @type {String[]} */
    this.Players = [];
  }
}

class DisconnectParticipant extends MCCommPacket {
  constructor() {
    super(PacketType.DisconnectParticipant);
    /** @type {String} */
    this.PlayerId = "";
  }
}

class GetParticipantBitmask extends MCCommPacket {
  constructor() {
    super(PacketType.GetParticipantBitmask);
    /** @type {String} */
    this.PlayerId = "";
    /** @type {Number} */
    this.Bitmask = 0;
  }
}

class SetParticipantBitmask extends MCCommPacket {
  constructor() {
    super(PacketType.SetParticipantBitmask);
    /** @type {String} */
    this.PlayerId = "";
    /** @type {Number} */
    this.Bitmask = 0;
  }
}

class MuteParticipant extends MCCommPacket {
  constructor() {
    super(PacketType.MuteParticipant);
    /** @type {String} */
    this.PlayerId = "";
  }
}

class UnmuteParticipant extends MCCommPacket {
  constructor() {
    super(PacketType.UnmuteParticipant);
    /** @type {String} */
    this.PlayerId = "";
  }
}

class DeafenParticipant extends MCCommPacket {
  constructor() {
    super(PacketType.DeafenParticipant);
    /** @type {String} */
    this.PlayerId = "";
  }
}

class UndeafenParticipant extends MCCommPacket {
  constructor() {
    super(PacketType.UndeafenParticipant);
    /** @type {String} */
    this.PlayerId = "";
  }
}

class ANDModParticipantBitmask extends MCCommPacket {
  constructor() {
    super(PacketType.ANDModParticipantBitmask);
    /** @type {String} */
    this.PlayerId = "";
    /** @type {Number} */
    this.Bitmask = 0;
  }
}

class ORModParticipantBitmask extends MCCommPacket {
  constructor() {
    super(PacketType.ORModParticipantBitmask);
    /** @type {String} */
    this.PlayerId = "";
    /** @type {Number} */
    this.Bitmask = 0;
  }
}

class XORModParticipantBitmask extends MCCommPacket {
  constructor() {
    super(PacketType.XORModParticipantBitmask);
    /** @type {String} */
    this.PlayerId = "";
    /** @type {Number} */
    this.Bitmask = 0;
  }
}

class ChannelMove extends MCCommPacket {
  constructor() {
    super(PacketType.ChannelMove);
    /** @type {String} */
    this.PlayerId = "";
    /** @type {Number} */
    this.ChannelId = 0;
  }
}

class VoiceCraftPlayer {
  constructor() {
    /** @type {Number} */
    this.PlayerId = "";
    /** @type {Number} */
    this.DimensionId = "";
    /** @type {Vector3} */
    this.Location = { x: 0, y: 0, z: 0 };
    /** @type {Number} */
    this.Rotation = 0.0;
    /** @type {Number} */
    this.CaveDensity = 0.0;
    /** @type {Boolean} */
    this.IsDead = false;
    /** @type {Boolean} */
    this.InWater = false;
  }
}

class Channel {
  constructor() {
    /** @type {String} */
    this.Name = "";
    /** @type {String} */
    this.Password = "";
    /** @type {Boolean} */
    this.Locked = false;
    /** @type {Boolean} */
    this.Hidden = false;
    /** @type {ChannelOverride | undefined} */
    this.OverrideSettings = undefined;
  }
}

class ChannelOverride {
  constructor() {
    /** @type {Number} */
    this.ProximityDistance = 30;
    /** @type {Boolean} */
    this.ProximityToggle = true;
    /** @type {Boolean} */
    this.VoiceEffects = true;
  }
}

export {
  PacketType,
  BitmaskMap,
  BitmaskMapUtils,
  BitmaskLocations,
  BitmaskSettings,
  DataBitmask,
  MCCommPacket,
  Login,
  Accept,
  Deny,
  Bind,
  Update,
  AckUpdate,
  GetChannels,
  GetChannelSettings,
  SetChannelSettings,
  GetDefaultSettings,
  SetDefaultSettings,
  GetParticipants,
  DisconnectParticipant,
  GetParticipantBitmask,
  SetParticipantBitmask,
  MuteParticipant,
  UnmuteParticipant,
  DeafenParticipant,
  UndeafenParticipant,
  ANDModParticipantBitmask,
  ORModParticipantBitmask,
  XORModParticipantBitmask,
  ChannelMove,
  VoiceCraftPlayer,
  Channel,
  ChannelOverride,
};
