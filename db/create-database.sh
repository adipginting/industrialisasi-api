#! /bin/bash
source .env
sudo -u postgres psql -c "CREATE USER $PGUSER WITH PASSWORD '$PGPASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE $PGDATABASE;"
sudo -u postgres psql -c "REVOKE ALL ON DATABASE $PGDATABASE FROM PUBLIC;"
sudo -u postgres psql -c "GRANT ALL ON DATABASE $PGDATABASE TO $PGUSER;"

psql -U $PGUSER -h localhost -d $PGDATABASE -p 5433 -f init.sql
