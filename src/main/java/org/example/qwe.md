public_html
...se/~s408116
java -DFCGI_PORT=24871 -jar ~/public_html/httpd-root/fcgi-bin/WebLab1-1.jar
httpd -f ~/public_html/httpd-root/conf/httpd.conf -k start
