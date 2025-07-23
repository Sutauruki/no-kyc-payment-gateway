#!/usr/bin/env bash

npm install --include=dev 
node ace migration:run
npm run build 