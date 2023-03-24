#! /bin/bash
source ../.env
psql -U $PGUSER -h localhost -d $PGDATABASE -p 5433 -f init.sql
