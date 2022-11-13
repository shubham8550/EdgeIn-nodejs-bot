import db from "./database.js";

export const chatIdSaveIfNotExist = (id) => {
  //ctx.message.chat.id
  if (!db.has(id)) {
    db.set(id, { entries: [] });
  }
};

export const saveDataWithId = (id, data) => {
  chatIdSaveIfNotExist(id);
  let payload = db.get(id);
  payload.entries.push(data);
  db.set(id, payload);
};
