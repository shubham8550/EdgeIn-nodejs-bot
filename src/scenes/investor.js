import { Scenes, Markup } from "telegraf";
import { SCENE_INVESTOR } from "./constant.js";
import { Keyboard } from "telegram-keyboard";
const investorWizard = new Scenes.WizardScene(
  SCENE_INVESTOR,
  (ctx) => {
    ctx.reply("Hello! Please tell me your full name");
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.i_name = ctx.message.text;
    ctx.reply(
      `Hey ${ctx.wizard.state.data.i_name}! Can you tell me the name of company in which you have invested?`
    );
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.i_c_name = ctx.message.text;
    ctx.reply(
      `Nice!! Can provide us ${ctx.wizard.state.data.i_c_name} Website?`
    );
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.i_c_website = ctx.message.text;
    const keyboard = Keyboard.make(["skip"]);
    ctx.reply(
      `Please provide ${ctx.wizard.state.data.i_c_name} linkedin profile link`,
      keyboard.inline()
    );
    return ctx.wizard.next();
  },

  (ctx) => {
    if (
      ctx?.callbackQuery?.data &&
      ctx?.callbackQuery?.data.toLowerCase() === "skip"
    ) {
      console.log("skiped");
      ctx.reply(`No problem! Thank you!`);
      ctx.wizard.state.data.i_c_linkedin = "";
      return ctx.scene.leave();
    }
    ctx.wizard.state.data.i_c_linkedin = ctx.message.text;
    return ctx.scene.leave();
  }
);
investorWizard.leave((ctx) => {
  console.log(ctx.wizard.state);
  ctx.reply(_IdetailsFormatter(ctx.wizard.state.data));
});

const _IdetailsFormatter = (data) => {
  return `
  Here is your Details- 

  Name  - ${data.i_name}
  Invested in  - ${data.i_c_name}
  Website  - ${data.i_c_website}
  LinkedIn  - ${data.i_c_linkedin}
  `;
};

export default investorWizard;
