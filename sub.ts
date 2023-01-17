import tmi, {
  Client,
  SubMethods,
  SubUserstate,
  Userstate,
  ChatUserstate,
} from "tmi.js";

import { ACCOUNT } from "./configs.js";

const client = new tmi.Client(ACCOUNT);
let channel: string = "webdave_de";
let chatters: { [key: string]: Userstate } = {};

function onMessage(
  channel: string,
  userstate: ChatUserstate,
  message: string,
  self: boolean
) {
  if (userstate["display-name"]) {
    chatters[userstate["display-name"]] = userstate;
  }
}

async function onResub(
  channel: string,
  username: string,
  months: number,
  message: string,
  userstate: SubUserstate,
  methods: SubMethods
) {
  const reply = `🎉🎉🎉🎉🎉 ${username} resubbed! Thx a lot. 😍😍😍`;
  await client.say(channel, reply);
}

async function onSubscription(
  channel: string,
  username: string,
  method: SubMethods,
  message: string,
  userstate: SubUserstate
) {
  const reply = `🎉🎉🎉🎉🎉 Welcome ${username}! Thx for your subscribtion. 😍😍😍`;
  await client.say(channel, reply);
}

// register event handlers
client.on("connected", (address: string, port: number) => {
  console.log(`* stats connected to: address - ${address}, port - ${port}`);
  setInterval(() => {
    const plsSub = async () => {
      const reply = `Please consider subscribing to this channel 😉`;
      await client.say(channel, reply);
    };
    plsSub();
  }, 1800000);
});

client.on("message", onMessage);
client.on("resub", onResub);
client.on("subscription", onSubscription);

// connect to Twitch
client.connect();
