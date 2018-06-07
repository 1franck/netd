#!/bin/bash

if [ "$1" == "dev" ]; then
    echo "Installing dependencies in dev mode ..."
    npm install --no-bin-links --verbose
    exit 0
fi

echo "Installing dependencies in prod mode ..."
npm install --no-bin-links
npm prune --production
exit 0

