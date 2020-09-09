const express = require('express');
const db = require('../config/db');
const asyncErorrHandler = require('../config/asyn-error-handler');
const router = express.Router();

// Routes related to event
router.get('/', asyncErorrHandler(async (req, res, next) => {
    const sql = "select * from events LEFT JOIN actors ON actors.id = events.actorId LEFT JOIN repos ON repos.id = events.repoId"
    const params = []
    db.all(sql, params, asyncErorrHandler (async (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        const events = [];
        rows.forEach(row => {
            const repo = {id: row.repoId, name: row.name, url: row.url}
            const actor = {id: row.actorId, login: row.login, avarta_url: row.avarta_url}
            const event = { ...row, repo, actor }
            delete event['repoId'];
            delete event['actorId'];
            delete event['login'];
            delete event['avarta_url'];
            delete event['url'];
            delete event['name'];
            events.push(event);
        })
        
        await res.json(events)
    }));
}))


module.exports = router;