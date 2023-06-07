#!/bin/bash
cp -r ../gql ./gql
docker build $*
dockerExit=$?
rm -rf ./gql
exit $dockerExit
