import { Scenes, Telegraf, session } from "telegraf";
import scenarioTypeScene from "./scenes/base.js";
import companyWizard from "./scenes/company.js";
import investorWizard from "./scenes/investor.js";
import {
  SCENE_COMPANY,
  SCENE_INVESTOR,
  SCENE_TYPE_SELECTION,
} from "./scenes/constant.js";
import { chatIdSaveIfNotExist } from "./botDataAdapter.js";

const botHandler = (bot) => {
  const stage = new Scenes.Stage([
    scenarioTypeScene,
    companyWizard,
    investorWizard,
  ]);

  bot.use(session());
  bot.use(stage.middleware());
  bot.command("start", (ctx) => {
    chatIdSaveIfNotExist(ctx.from.id);
    console.log(ctx.from);
    ctx.scene.enter(SCENE_TYPE_SELECTION);
  });
  bot.command("company", (ctx) => {
    ctx.scene.enter(SCENE_COMPANY);
  });
  bot.command("investor", (ctx) => {
    ctx.scene.enter(SCENE_INVESTOR);
  });
  bot.command("help", (ctx) => {
    ctx.scene.enter(SCENE_TYPE_SELECTION);
  });
};

export default botHandler;
