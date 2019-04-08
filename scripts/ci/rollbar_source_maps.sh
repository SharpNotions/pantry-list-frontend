#!/bin/bash
set -e

curl https://api.rollbar.com/api/1/sourcemap/ \
       -F access_token='${rollbar_post_server_item_access_token}'\
       -F version=’1.0’ \
       -F minified_url=https://pantry-list-frontend.herokuapp.com/dist/build.js \
       -F source_map=dist/buid.js.map \