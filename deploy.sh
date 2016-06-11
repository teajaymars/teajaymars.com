#!/bin/bash

set -e

rm -rf public
git subtree add --prefix=public git@github.com:zephod/tomre.es.git gh-pages --squash
hugo --theme="hugo-steam-theme"
