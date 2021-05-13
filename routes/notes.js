import { default as express } from "express";
import { NotesStore as notes } from "../app.js";

export const router = express.Router();

//lets add our note
router.get("/add",(req, res, next) => {
    res.render("noteedit", {
        title: "Add a Note",
        docreate: true,
        notekey: " ",
        note: undefined,
    });
});

router.post("save", async(req, res, next) => {
    try{
        let note;
        if(req.body.docreate === "create") {
            note = await notes.create(
                req.body.notekey,
                req.body.body
            );
        } else {
            note = await notes.update(
                req.body.notekey,
                req.body.title,
                req.body.body
            );
        }
        res.redirect("/notes/view?key=" + req.body.notekey);
    } catch(err) {
        next(err);
    }
});

//Read Note(read)
router.get('/view', async(req, res, next) => {
    try {
        let note = await notes.read(req.query.key);
        res.render('noteview', {
            title: note ? note.title: "",
            notekey: req.query.key,
            note: note
        });
    } catch (err) { next(err); }
});

//Edit note (update)
router.get('/edit', async (req, res, next) => {
    try {
        let note = await notes.read(req.query.key);
        res.render('noteedit', {
            title: note ? ("Edit" + note.title): "Add a Note",
            docreate: false,
            notekey: req.query.key,
            note: note
        });
    } catch (err) { next(err); }
})

//Ask to Delete note (destory)
router.get('/destory', async (req, res, next) => {
    try {
        let note = await notes.read(req.query.key);
        res.render('notedestory', {
            title: note ? note.title : "",
            notekey: req.query.key,
            note: note
        });
    } catch (err) { next(err); }
});

//Really destory note (destory)
router.post('/destory/confirm', async (req, res, next) => {
    try {
        await notes.destory(req.body.notekey)
        res.redirect("/")
    } catch (err) { next(err); }
})