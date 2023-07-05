#!/bin/bash
set -e

version=$(cat package.json | jq -r '.version')

function bump_version() {
  package="$1"
  cd "$package"
  pnpm version "$version"
  git add package.json
  cd ..
}

bump_version api
bump_version web

echo "Committing new git tag: $version"
git add package.json
