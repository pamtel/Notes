import express from 'express';

export const router = express.Router(); 

router.get('/', async (req, res, next) => {
    res.render('index', { title: 'Notes' });
});