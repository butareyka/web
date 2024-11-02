#!/bin/sh
set -x #echo on

WORKDIRCONF=/home/studs/s408116/httpd-root/conf
WORKDIRWAR=/home/studs/s408116/wildfly/wildfly-21.0.0.Final/standalone/deployments
WORKDIRSETTINGS=/home/studs/s408116/wildfly-33.0.0.Final/standalone/configuration
WORKDIR=/home/studs/s408116

CONFPATH=/Users/macbook/WEB/WebLab1/httpd.conf
WARPATH=/Users/macbook/WEB/WebLab2/build/libs/WebLab2.war
WILDFLYPATH=/Users/macbook/Downloads/wildfly-21.0.0.Final/standalone/deployments/


REMOTE_HOST=helios.cs.ifmo.ru
REMOTE_PORT=2222

REMOTE_USER=s408116
REMOTE_PASSWORD=IYoL\)4551

sshpass -p "$REMOTE_PASSWORD" scp -r -P 2222 $WARPATH $REMOTE_USER@$REMOTE_HOST:$WORKDIRWAR
