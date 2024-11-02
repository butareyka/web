sshpass -p IYoL\)4551 ssh s408116@helios.cs.ifmo.ru -p 2222

sshpass -p IYoL\)4551 ssh -L 25100:localhost:25100 s408116@helios.cs.ifmo.ru -p 2222
sshpass -p IYoL\)4551 ssh -L 36002:localhost:36002 s408116@helios.cs.ifmo.ru -p 2222

JAVA=java wildfly-33.0.0.Final/bin/standalone.sh

sshpass -p IYoL\)4551 scp -r -P 2222 /Users/macbook/Downloads/wildfly-21.0.0.Final s408116@helios.cs.ifmo.ru:/home/studs/s408116/wildfly