#!/bin/bash

DEST_BUCKET=tomre.es
CONFIG_FILE=s3cfg

if [ ! -e $CONFIG_FILE ] ; then
  echo "I can't see the config file \"$CONFIG_FILE\"."
  echo "Create a new s3cmd config here, giving it account credentials with just enough power to control the S3 bucket: \"$DEST_BUCKET\"."
  exit -3
fi

TMP=$(mktemp -d)
hugo --theme="hugo-steam-theme" --destination="$TMP"

# http://s3tools.org/usage
# http://stackoverflow.com/questions/14807702/amazon-s3-static-website-doesnt-serve-css-or-js-files
# --no-mime-magic because the magic delivers CSS files as text/plain?!
# (maybe a problem on my mac)
s3cmd sync \
  --force \
  --no-preserve \
  --exclude=".DS_Store" \
  --delete-removed \
  --acl-public \
  --no-mime-magic \
  --config=$CONFIG_FILE \
  $TMP/ \
  s3://$DEST_BUCKET/

rm -rf $TMP
