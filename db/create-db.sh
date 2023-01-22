#! /bin/bsh
sudo -u postgres psql -c "CREATE USER idst WITH PASSWORD 'idst';"
sudo -u postgres psql -c "CREATE DATABASE idst;"
sudo -u postgres psql -c "REVOKE ALL ON DATABASE idst FROM PUBLIC;"
sudo -u postgres psql -c "GRANT ALL ON DATABASE idst TO idst"
