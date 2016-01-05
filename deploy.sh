#!/bin/bash

SOURCE_FOLDER=public
DEST_BUCKET=tomre.es
CONFIG_FILE=s3cfg

if [ ! -e $SOURCE_FOLDER ] ; then
  echo "I can't see the folder \"$SOURCE_FOLDER\"."
  echo "Run this script from the root of the repository."
  exit -3
fi

if [ ! -e $CONFIG_FILE ] ; then
  echo "I can't see the config file \"$CONFIG_FILE\"."
  echo "Create a new s3cmd config here, giving it account credentials with just enough power to control the S3 bucket: \"$DEST_BUCKET\"."
  exit -3
fi

sudo killall hugo
rm -rf $SOURCE_FOLDER
hugo

# http://s3tools.org/usage
s3cmd sync \
  --force \
  --no-preserve \
  --exclude=".DS_Store" \
  --delete-removed \
  --acl-public \
  --config=$CONFIG_FILE \
  $SOURCE_FOLDER/ \
  s3://$DEST_BUCKET/

