 -- ACTORS --

CREATE TABLE IF NOT EXISTS actors (
  id INTEGER PRIMARY KEY,
  login TEXT DEFAULT "",
  avarta_url TEXT DEFAULT "",
);

INSERT INTO actors
  (id, login, avarta_url) 
VALUES 
  (4276597, "iholloway", "https://avatars.com/4276597"),
  (2917996, "oscarschmidt", "https://avatars.com/2917996"),
  (2790311, "daniel33", "https://avatars.com/2790311"),
  (2222918, "xnguyen", "https://avatars.com/2222918"),
  (3466404, "khunt", "https://avatars.com/3466404"),
  (3698252, "daniel51", "https://avatars.com/3698252"),
  (4949434, "millerlarry", "https://avatars.com/4949434"),
  (4864659, "katrinaallen", "https://avatars.com/4864659"),
  (2907782, "eric66", "https://avatars.com/2907782");
  

-- EVENTS --

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY,
  type TEXT DEFAULT "",
  actor_id INTEGER DEFAULT "",
  repo_id INTEGER DEFAULT "",
  created_at DATE DEFAULT "",
);

INSERT INTO events 
  (id, type, actor_id, repo_id, created_at)
VALUES (
  (4633249595, "PushEvent", 4276597, 269910, "2016-04-18 00:13:31"),
  (4501280090, "PushEvent", 2917996, 301227, "2016-03-05 10:13:31"),
  (4501280090, "PushEvent", 2917996, 301227, "2016-03-05 10:13:31"),
  (4055191679, "PushEvent", 2790311, 352806, "2015-10-03 06:13:31"),
  (3822562012, "PushEvent", 2222918, 425512, "2015-07-15 15:13:31"),
);

-- REPOS --

CREATE TABLE IF NOT EXISTS repos (
  id INTEGER PRIMARY KEY,
  name TEXT DEFAULT "",
  url TEXT DEFAULT "",
);

INSERT INTO repos (
  id, name, url
) VALUES (
    (
        269910,
        "iholloway/aperiam-consectetur",
        "https://github.com/iholloway/aperiam-consectetur"
    ), (
        301227,
        "oscarschmidt/doloremque-expedita",
        "https://github.com/oscarschmidt/doloremque-expedita"
    ), 
    (
        352806,
        "johnbolton/exercitationem",
        "https://github.com/johnbolton/exercitationem"
    ),
    (
        425512,
        "cohenjacqueline/quam-autem-suscipit",
        "https://github.com/cohenjacqueline/quam-autem-suscipit"
    ),
    (
        426482,
        "pestrada/voluptatem",
        "https://github.com/pestrada/voluptatem"
    ),
    (
        292520,
        "svazquez/dolores-quidem",
        "https://github.com/svazquez/dolores-quidem"
    )
);