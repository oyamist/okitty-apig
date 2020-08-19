#!/bin/bash
SCRIPTDIR=`dirname $0`
ZIPFILE=$1

if [ "$1" == "" ]; then
    ZIPFILE=~/Downloads/okitty-apig.zip
fi

if [ -e $ZIPFILE ]; then
    echo -e "BUILD\t: rm $ZIPFILE"
    rm $ZIPFILE
fi
pushd $SCRIPTDIR/.. > /dev/null
echo -e "BUILD\t: building $ZIPFILE "
zip -x README.md -x "scripts**" -x package-lock.json -q -r $ZIPFILE .
popd > /dev/null

echo -e "BUILD\t: build is ready for upload: $ZIPFILE"
