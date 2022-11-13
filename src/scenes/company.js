import { Scenes, Markup } from "telegraf";
import { SCENE_COMPANY } from "./constant.js";
import { Keyboard } from "telegram-keyboard";
import { saveDataWithId } from "../botDataAdapter.js";

const companyWizard = new Scenes.WizardScene(
  SCENE_COMPANY,
  (ctx) => {
    ctx.reply("Hello! Please tell us your company name.");
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.c_name = ctx.message.text;
    ctx.reply(`Please provide us ${ctx.wizard.state.data.c_name} website!`);
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.c_website = ctx.message.text;
    const keyboard = Keyboard.make(["skip"]);
    ctx.reply(
      `Can you tell us more about ${ctx.wizard.state.data.c_name}!`,
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
      ctx.wizard.state.data.c_about = "";
      return ctx.scene.leave();
    }
    ctx.wizard.state.data.c_about = ctx.message.text;
    return ctx.scene.leave();
  }
);
companyWizard.leave((ctx) => {
  ctx.reply(_CdetailsFormatter(ctx.wizard.state.data));
  ctx.wizard.state.data.type = "company";
  saveDataWithId(ctx.from.id, ctx.wizard.state.data);
  ctx.reply(
    `Thank you ${ctx.from.first_name}! your information successfully saved`
  );
});
const _CdetailsFormatter = (data) => {
  return `
  Here is your Details- 

  Company  - ${data.c_name}
  Website  - ${data.c_name}
  About  - ${data.c_about}
  `;
};
export default companyWizard;
