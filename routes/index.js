import * as express from "express";
import { NotesStore as notes } from "../app.js";
export const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const keylist = await notes.keylist();
    //console.log(`keylist  ${util.inspect(keylist)}`)
    const keyPromises = keylist.map((key) => {
      return notes.read(key);
    });
    const notelist = await Promise.all(keyPromises);
    //console.log(util.inspect(notelist));
    //... placeholder for Notes home page code
    res.render("index", { title: "Tech Academy Notes App" });
  } catch (err) {
    next(err);
  }
});