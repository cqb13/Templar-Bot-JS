import {} from "dotenv/config";
import fs from "fs";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const color = 4811710;

const events = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

// Check for an event and execute the corresponding file in ./events
for (let event of events) {
  const eventFile = await import(`./src/events/${event}`);
  if (eventFile.once)
    client.once(eventFile.name, (...args) => {
      eventFile.invoke(...args);
    });
  else
    client.on(eventFile.name, (...args) => {
      eventFile.invoke(...args);
    });
}

export { client, color };

client.login(process.env.TOKEN);
