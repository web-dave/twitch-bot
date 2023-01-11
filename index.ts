import tmi from "tmi.js"; // some documentation here: https://github.com/tmijs/docs/tree/gh-pages/_posts/v1.4.2
import type { ChatUserstate } from "tmi.js";
import { ACCOUNT } from "./configs.js";

const client = new tmi.Client(ACCOUNT);

async function onMessage(
  channel: string,
  userstate: ChatUserstate,
  message: string,
  self: boolean
) {
  if (
    self ||
    !message.startsWith("!") ||
    typeof ACCOUNT["identity"] === "undefined"
  )
    return;
  message = message.slice(1); // remove the identifier

  const words = message.match(/\S+/g) ?? []; // get words with regex
  const command = (words[0] ?? "").toLowerCase(); // get the command and make it lowercase
  const args = words.slice(1); // get the arguments

  const isMod = userstate.mod || userstate.username === channel.slice(1); // is true if the message sender is a mod

  let reply = "";

  switch (command) {
    case "ping":
      reply = "Pong!";
      break;
    case "pong":
      reply = "Ping?";
      break;
    case "say":
      reply = args.join(" ");
      break;
    case "discord":
      reply = "Join our DISCORD Server! => https://discord.gg/dAeR3KeKBc";
      break;
    case "amiamod":
      reply = isMod
        ? `Yes, @${userstate["display-name"]}. You are a mod!`
        : `No, @${userstate["display-name"]}.`;
      break;
    case "entwicklergesöff":
      reply = "🧉🧉🧉🧉🧉🧉🧉🧉🧉🧉";
      break;
    case "birthday":
      reply = `Happy Birthday 🍰🎂🎉🎊`;
      if (args.length >= 1) {
        reply = `Happy Birthday to ${args[0]} 🍰🎂🎉🎊`;
      }
      break;
    case "applaus":
      reply = "👏🏼👏👏🏻👏🏽👏🏾👏🏿";
      if (args.length >= 1) {
        reply = "👏🏼👏👏🏻👏🏽👏🏾👏🏿 to " + args[0];
      }
      break;
    case "👊🏼":
      reply = "🎆";

      break;
    default:
      // reply = "Ohne Heu kann das beste Pferd nicht furzen.";
      reply = "nein! doch! oh! 🦄";
      break;
  }

  await client.say(channel, reply);
}

// register event handlers
client.on("connected", (address: string, port: number) => {
  console.log(`* connected to: address - ${address}, port - ${port}`);
});

client.on("message", onMessage);

// connect to Twitch
client.connect();
