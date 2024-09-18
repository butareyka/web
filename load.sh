#!/bin/sh
set -x #echo on

WORKDIRCONF=/home/studs/s408116/public_html/httpd-root/conf
WORKDIRJAR=/home/studs/s408116/public_html/httpd-root/fcgi-bin
WORKDIRSTATIC=/home/studs/s408116/public_html/www

REMOTE_HOST=helios.cs.ifmo.ru
REMOTE_PORT=2222

REMOTE_USER=s408116
REMOTE_PASSWORD=IYoL\)4551


sshpass -p "$REMOTE_PASSWORD" scp -P $REMOTE_PORT /Users/macbook/WEB/WebLab1/httpd.conf $REMOTE_USER@$REMOTE_HOST:$WORKDIRCONF