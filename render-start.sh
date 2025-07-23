#!/usr/bin/env bash

cd build 
npm ci --omit="dev"
npm start