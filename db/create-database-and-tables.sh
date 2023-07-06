#!/bin/bash
. ./.init-db
sudo -u postgres psql -c "CREATE USER $PGUSER WITH ENCRYPTED PASSWORD '$PGPASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE $PGDATABASE;"
sudo -u postgres psql -c "ALTER DATABASE $PGDATABASE OWNER TO $PGUSER;"

psql -U $PGUSER -h localhost -d $PGDATABASE -p $PGPORT -f init.sql
