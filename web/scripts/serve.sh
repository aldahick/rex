#!/bin/sh
[ -d build ] || yarn build

yarn serve -s build
