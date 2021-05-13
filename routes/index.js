import * as express from "express";
import { NotesStore as notes } from "../app.js";

export const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const keylist = await notes.keylist();
    const keyPromises = keylist.map((key) => {
      return notes.read(key);
    });
    const noteslist = await Promise.all(keyPromises);
    res.render("index", { title: "Tech Academy Notes App" });
  } catch (err) {
    next(err);
  }
});
