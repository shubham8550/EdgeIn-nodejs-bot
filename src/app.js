import * as dotenv from "dotenv";
dotenv.config();
import { Telegraf } from "telegraf";
import botHandler from "./botHandler.js";
import db from "./database.js";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
botHandler(bot);
//bot.telegram.sendMessage(700156004, "Text here");  //example sending msg with chat id
console.log(db.getAllIds()); // This will give u all chat ids in array
bot.launch();
