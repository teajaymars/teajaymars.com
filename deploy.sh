#!/bin/bash

set -e

MESSAGE=$1
if [[ -z $MESSAGE ]] ; then
  MESSAGE="Pushing at $(date)"
fi

REPO=zephod/tomre.es.git

# rm -rf public
# git subtree add --prefix=public git@github.com:$REPO gh-pages --squash
hugo --theme="hugo-steam-theme"
echo "tomre.es" > public/CNAME
git add -A
git commit -a -m "[./deploy.sh] $MESSAGE"
git push origin master
git subtree push --prefix=public git@github.com:$REPO gh-pages

