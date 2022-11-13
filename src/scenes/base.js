import { Scenes, Telegraf, session, Markup } from "telegraf";
import {
  SCENE_TYPE_SELECTION,
  SCENE_COMPANY,
  SCENE_INVESTOR,
} from "./constant.js";
import { Keyboard, Key } from "telegram-keyboard";
// const
const _COMPANY = "_COMPANY";
const _INVESTOR = "_INVESTOR";

const scenarioTypeScene = new Scenes.BaseScene(SCENE_TYPE_SELECTION);

scenarioTypeScene.enter((ctx) => {
  ctx.session.myData = {};
  const keyboard = Keyboard.make([
    Key.callback("Company", _COMPANY),
    Key.callback("Investor", _INVESTOR),
  ]);
  ctx.reply(
    "Hi! My name is " +
      (process.env.BOT_NAME || ctx.botInfo.first_name) +
      ". I will hold a conversation with you. \n\n" +
      "Are you a company or an investor?",
    keyboard.inline()
    // Markup.inlineKeyboard([
    //   Markup.button.callback("Company", _COMPANY),
    //   Markup.button.callback("Investor", _INVESTOR),
    // ]).oneTime()
  );
});

scenarioTypeScene.action(_COMPANY, (ctx) => {
  // ctx.reply("Grate can you provide us with some details about company?");
  ctx.session.myData.preferenceType = "company";
  return ctx.scene.enter(SCENE_COMPANY); // switch to some other scene
});
scenarioTypeScene.action(_INVESTOR, (ctx) => {
  // ctx.reply("Grate can you provide us some details about you?");
  ctx.session.myData.preferenceType = "investor";
  return ctx.scene.enter(SCENE_INVESTOR); // switch to some other scene
});

// scenarioTypeScene.command("cancel", (ctx) => {
//   ctx.reply("Bye! I hope we can talk again some day.");
//   // ctx.session.myData.preferenceType = "investor";
//   return ctx.scene.leave(); // exit global namespace
// });

// scenarioTypeScene.leave((ctx) => {
//   ctx.reply("Thank you for your time!");
// });

// What to do if user entered a raw message or picked some other option?
scenarioTypeScene.use((ctx) =>
  ctx.replyWithMarkdownV2("Please choose either Company or Investor")
);

export default scenarioTypeScene;
