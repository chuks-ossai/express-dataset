
const db = require('../config/db');

var getAllActors = async (req, res, next) => {
	const sql = "select * from actors ORDER BY id"
	const params = []
	db.all(sql, params, asyncErorrHandler(async (err, rows) => {
		if (err) {
			res.status(400).json({ "error": err.message });
			return;
		}
		await res.status(200).json({
			status_code: 200,
			error: null,
			message: 'success',
			data: rows
		})
	}));
};

var updateActor = async (req, res, next) => {
	const { id, avatar_url } = req.body;

	const updateActor = `UPDATE actors
        SET avatar_url = ?
        WHERE id = ?`

	const paramsActor = [avatar_url, id]
	db.run(updateActor, paramsActor, asyncErorrHandler(async (err) => {
		if (err) {
			res.status(400).json({ status_code: 400, message: err.message, body: req.body, headers: {} });
			return
		}
		res.status(201).json({
			status_code: 200,
			message: 'Actor updated successfully',
			body: {}
		})
	}));
};

var getStreak = async (req, res, next) => {
	const sql = "select * from actors ORDER BY id"
	const params = []
	db.all(sql, params, asyncErorrHandler(async (err, rows) => {
		if (err) {
			res.status(400).json({ "error": err.message });
			return;
		}
		await res.status(200).json({
			status_code: 200,
			error: null,
			message: 'success',
			data: rows
		})
	}));
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















