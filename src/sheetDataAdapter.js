import * as dotenv from "dotenv";
dotenv.config();
import { GoogleSpreadsheet } from "google-spreadsheet";
import googlejson from "../key.json" assert { type: "json" };

// for reference
// https://www.npmjs.com/package/google-spreadsheet
// https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account

// share your google sheet with service account email

console.log(process.env.GOOGLE_SHEET_ID);
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
await doc.useServiceAccountAuth({
  client_email: googlejson.client_email,
  private_key: googlejson.private_key,
});

await doc.loadInfo();
const company = doc.sheetsByTitle["company"];
const investor = doc.sheetsByTitle["investor"];

export const addCompanyInSheet = async (data, username) => {
  await company.addRow({
    company_name: data.c_name,
    website: data.c_website,
    about: data.c_about,
    tg_user: `t.me/${username}`,
  });
};
export const addInvestorInSheet = async (data, username) => {
  await investor.addRow({
    investor_name: data.i_name,
    invested_company: data.i_c_name,
    website: data.i_c_website,
    linkedin: data.i_c_linkedin,
    tg_user: `t.me/${username}`,
  });
};

export const isExistsInCompany = async (data) => {
  const rows = await company.getRows();
  if (
    rows.find((e) => e.company_name.toLowerCase() === data.c_name.toLowerCase())
  ) {
    return true;
  }
  return false;
};
export const isExistsInInvestor = async (data) => {
  const rows = await investor.getRows();
  if (
    rows.find(
      (e) => e.investor_name.toLowerCase() === data.i_name.toLowerCase()
    )
  ) {
    return true;
  }
  return false;
};
