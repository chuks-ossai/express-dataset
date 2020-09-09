const path = require('path');
const { replace } = require('lodash');

var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = path.join(__dirname, "db.sqlite3")

// open database in Database Source (Memory)
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS actors (
            id INTEGER PRIMARY KEY,
            login TEXT UNIQUE,
            avatar_url TEXT
            )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.log('actors table was not created', err)
                } else {
                    // Table just created, creating some rows
                    console.log('actors table create insert proceed')
                    var insert = 'INSERT OR REPLACE INTO actors(id, login, avatar_url) VALUES (?,?,?)'
                    db.run(insert, [4276597, "iholloway", "https://avatars.com/4276597"])
                    db.run(insert, [2917996, "oscarschmidt", "https://avatars.com/2917996"])
                    db.run(insert, [2790311, "daniel33", "https://avatars.com/2790311"])
                    db.run(insert, [2222918, "xnguyen", "https://avatars.com/2222918"])
                    db.run(insert, [3466404, "khunt", "https://avatars.com/3466404"])
                    db.run(insert, [3698252, "daniel51", "https://avatars.com/3698252"])
                    db.run(insert, [4949434, "millerlarry", "https://avatars.com/4949434"])
                    db.run(insert, [4864659, "katrinaallen", "https://avatars.com/4864659"])
                    db.run(insert, [2907782, "eric66", "https://avatars.com/2907782"])
                }
            });  
        
        db.run(`CREATE TABLE IF NOT EXISTS repos (
                id INTEGER PRIMARY KEY,
                name TEXT DEFAULT "",
                url TEXT DEFAULT ""
                )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.error('unable to create repos table', err);
                } else {
                    // Table just created, creating some rows
                    console.log('repos table was created success');

                    var insert = 'INSERT OR REPLACE INTO repos (id, name, url) VALUES (?,?,?)'
                    db.run(insert, [269910, "iholloway/aperiam-consectetur", "https://github.com/iholloway/aperiam-consectetur"])
                    db.run(insert, [301227, "oscarschmidt/doloremque-expedita", "https://github.com/oscarschmidt/doloremque-expedita"])
                    db.run(insert, [352806, "johnbolton/exercitationem", "https://github.com/johnbolton/exercitationem"])
                    db.run(insert, [425512, "cohenjacqueline/quam-autem-suscipit", "https://github.com/cohenjacqueline/quam-autem-suscipit"])
                    db.run(insert, [426482, "pestrada/voluptatem", "https://github.com/pestrada/voluptatem"])
                    db.run(insert, [292520, "svazquez/dolores-quidem", "https://github.com/svazquez/dolores-quidem"])
                }
            });  
        db.run(`CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY,
                type TEXT DEFAULT "",
                actor_id INTEGER DEFAULT "",
                repo_id INTEGER DEFAULT "",
                created_at DATE DEFAULT "",
                FOREIGN KEY (actor_id) REFERENCES actors(id)
                FOREIGN KEY (repo_id) REFERENCES repos(id)
                )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.error('unable to create events table', err);
                } else {
                    // Table just created, creating some rows
                    console.log('events table was created success')
                    var insert = 'INSERT OR REPLACE INTO events (id, type, actor_id, repo_id, created_at) VALUES (?,?,?,?,?)'
                    db.run(insert, [4633249595, "PushEvent", 4276597, 269910, "2016-04-18 00:13:31"])
                    db.run(insert, [4501280090, "PushEvent", 2917996, 301227, "2016-03-05 10:13:31"])
                    db.run(insert, [4055191679, "PushEvent", 2790311, 352806, "2015-10-03 06:13:31"])
                    db.run(insert, [3822562012, "PushEvent", 2222918, 425512, "2015-07-15 15:13:31"])
                }
            });  
    }
});

// close the database connection
// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });


module.exports = db
