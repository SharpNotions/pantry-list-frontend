#!/bin/bash
# envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf
sed "s/\${PORT}/$PORT/" /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf
cat /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
