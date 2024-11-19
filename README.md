sshpass -p IYoL\)4551 ssh -L 25100:localhost:25100 s408116@helios.cs.ifmo.ru -p 2222
sshpass -p IYoL\)4551 ssh -L 36002:localhost:36002 s408116@helios.cs.ifmo.ru -p 2222

CREATE TABLE point_model {
id SERIAL PRIMARY KEY,
x DOUBLE PRECISION NOT NULL,
y DOUBLE PRECISION NOT NULL,
r DOUBLE PRECISION NOT NULL
}