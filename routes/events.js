const express = require('express');
const db = require('../config/db');
const asyncErorrHandler = require('../config/asyn-error-handler');
const router = express.Router();

// Routes related to event
router.get('/', asyncErorrHandler(async (req, res, next) => {
    const sql = "select * from events LEFT JOIN actors ON actors.id = events.actor_id LEFT JOIN repos ON repos.id = events.repo_id ORDER BY id"
    const params = []
    db.all(sql, params, asyncErorrHandler (async (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        const events = [];
        rows.forEach(row => {
            const repo = {id: row.repo_id, name: row.name, url: row.url}
            const actor = {id: row.actor_id, login: row.login, avarta_url: row.avarta_url}
            const event = { ...row, repo, actor }
            delete event['repo_id'];
            delete event['actor_id'];
            delete event['login'];
            delete event['avatar_url'];
            delete event['url'];
            delete event['name'];
            events.push(event);
        })
        
        await res.json(events)
    }));
}))

// Add new event
router.post('/', asyncErorrHandler(async (req, res, next) => {
    const { id, type, created_at, actor, repo } = req.body;

    console.log(actor)
    const insertActor = `INSERT OR REPLACE INTO actors(id, login, avatar_url) VALUES (?,?,?)`
    
    const paramsActor = [actor.id, actor.login, actor.avarta_url]
    db.run(insertActor, paramsActor, asyncErorrHandler (async (err) => {
        if (err) {
            res.status(400).json({ status_code: 400, message: err.message, body: req.body, headers: {} });
            return
        }
        const insertRepo = `INSERT OR REPLACE INTO repos (id, name, url) VALUES (?,?,?)`
        const paramsRepo = [repo.id, repo.name, repo.url]
        db.run(insertRepo, paramsRepo, asyncErorrHandler(async (err) => {
            if (err) {
                res.status(400).json({ status_code: 400, message: err.message, body: req.body, headers: {} });
                return;
            }

            const insertEvent = `INSERT INTO events (id, type, actor_id, repo_id, created_at) VALUES (?,?,?,?,?)`
            const params = [id, type, actor.id, repo.id, created_at]
            db.run(insertEvent, params, asyncErorrHandler(async (err, result) => {
                if (err) {
                   if (err.message.includes('UNIQUE constraint failed: events.id')) {
                       res.status(400).json({ status_code: 400, message: "The event you are trying to add already exists", body: req.body, headers: {} });
                       } else {
                           console.log('result', result)
                           res.status(400).json({ status_code: 400, message: err.message, body: req.body, headers: {} })
                       }
                       return
                }
                res.status(200).json({
                    stats: 200,
                    error: null,
                    success: true,
                    body: {},
                    header: {},
                    message: 'Event created successfully'
                })
            }))
        }))
    }));
}))


module.exports = router;