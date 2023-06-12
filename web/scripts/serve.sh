#!/bin/sh

dir="$1"
node scripts/populate-html-env.mjs "$dir/index.html"
portArg=""
if [ ! -z "$PORT" ]; then
  portArg="-l $PORT"
fi
serve -s "$dir" $portArg
