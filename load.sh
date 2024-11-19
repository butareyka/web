#!/bin/sh
set -x #echo on

WORKDIR=/home/studs/s408116/wildfly
WILDFLY34=/Users/macbook/ITMO/WEB/servers/wildfly-34.0.0.Final
WILDFLY26=/Users/macbook/ITMO/WEB/servers/wildfly-preview-26.1.3.Final

REMOTE_HOST=helios.cs.ifmo.ru
REMOTE_PORT=2222

REMOTE_USER=s408116
REMOTE_PASSWORD=IYoL\)4551

sshpass -p "$REMOTE_PASSWORD" scp -r -P 2222 $WILDFLY26 $REMOTE_USER@$REMOTE_HOST:$WORKDIR
