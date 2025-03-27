import { world, system } from "@minecraft/server";

class CommandSystem {
  static Prefix = "!";
  static Commands = {};

  static RegisterCommand(name, callback, paramTypes, opOnly = false) {
    this.Commands[name] = {
      callback: callback,
      paramTypes: paramTypes,
      opOnly: opOnly,
    };
  }

  static executeCommand(input, source, event) {
    if (input.startsWith(CommandSystem.Prefix)) {
      event.cancel = true;
      system.run(() => {
        const text = input.replace(this.Prefix, "");
        const parts = text.split(" ");
        const commandName = parts[0];
        const args = parts.slice(1);

        if (this.Commands[commandName]) {
          const command = this.Commands[commandName];
          if (command.opOnly && !source.isOp()) {
            source.sendMessage("§cThis command can only be used by operators!");
            return;
          }
          const typedArgs = {};

          typedArgs["source"] = source;

          let i = 0;
          for (const [paramName, type] of Object.entries(command.paramTypes)) {
            let value = args[i];

            switch (type) {
              case "string":
                if (value == undefined) {
                  source.sendMessage(
                    `§cInvalid Paramater Input: §e[${paramName}]§r. Received §e[${value}]§r, Expected §e[${type}]§r`
                  );
                  return;
                }
                break;
              case "integer":
                value = parseInt(value);
                if (isNaN(value)) {
                  source.sendMessage(
                    `§cInvalid Paramater Input: §e[${paramName}]§r. Received §e[${value}]§r, Expected §e[${type}]§r`
                  );
                  return;
                }
                break;
              case "float":
                value = parseFloat(value);
                if (isNaN(value)) {
                  source.sendMessage(
                    `§cInvalid Paramater Input: §e[${paramName}]§r. Received §e[${value}]§r, Expected §e[${type}]§r`
                  );
                  return;
                }
                break;
              default:
                source.sendMessage(
                  `§cInvalid parameter type: ${type} for param ${paramName}`
                );
                return;
            }

            typedArgs[paramName] = value;
            i++;
          }
          command.callback.call(null, typedArgs);
        } else {
          source.sendMessage(`§cUnkown command: ${commandName}`);
        }
      });
    }
  }
}

system.afterEvents.scriptEventReceive.subscribe((event) => {
  const {
    id, // returns string (wiki:test)
    initiator, // returns Entity (or undefined if an NPC did not fire the command)
    message, // returns string (Hello World)
    sourceBlock, // returns Block (or undefined if a block did not fire the command)
    sourceEntity, // returns Entity (or undefined if an entity did not fire the command)
    sourceType, // returns MessageSourceType (can be 'Block', 'Entity', 'NPCDialogue', or 'Server')
  } = event;

  // `/scriptevent voicecraft:voice help` -> !help

  if (id.toLowerCase() === 'voicecraft:voice') {
    let source = sourceEntity ?? initiator;
    if (sourceType == 'Server' || source === undefined)  {
      source = {
        isOp: () => true,
        sendMessage: function(message) {
          console.log(message);
        }
      }
    }
    CommandSystem.executeCommand(CommandSystem.Prefix + message, source, event);
  }
});

// No longer using this, but if beta api's are enabled, it will still work
world?.beforeEvents?.chatSend?.subscribe?.((ev) => {
  CommandSystem.executeCommand(ev.message, ev.sender, ev);
});

export { CommandSystem };
