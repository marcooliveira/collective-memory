#!/bin/bash

OLDDIR=$(pwd)
SCRIPT=`readlink -f $0`
BASEDIR=`dirname $SCRIPT`

cd "${BASEDIR}/../src"
compass watch . sass/main.scss
cd "$OLDDIR"