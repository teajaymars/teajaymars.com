#!/bin/bash

MESSAGE="[./deploy.sh] $1"
if [ -z $MESSAGE ] ; then
  MESSAGE="[./deploy.sh] Pushing at $(date)"
fi

REPO=zephod/tomre.es.git

set -e

rm -rf public
git subtree add --prefix=public git@github.com:$REPO gh-pages --squash
hugo --theme="hugo-steam-theme"
git commit -a -m $MESSAGE
git push origin master
git subtree push --prefix=public git@github.com:$REPO gh-pages

