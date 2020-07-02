#!/usr/bin/env bash

mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db/

mongo < /classbuddyserver/mongo.sql

mongod --shutdown
