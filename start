#!/bin/sh

function start_dev() {
  docker-compose run dev npm run dev
}

function unit_test() {
  docker-compose run dev npm run test
}

#case statement ordered by how commands are listed in ./go help
case "$1" in
  init) shift; init $@
  ;;
  start) shift; start_dev $@
  ;;
  test) shift; unit_test $@
esac;
