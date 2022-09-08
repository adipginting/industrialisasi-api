#! /bin/bsh
sudo -u postgres psql -c "CREATE USER industrialisasi WITH PASSWORD 'industrialisasi';"
sudo -u postgres psql -c "CREATE DATABASE industrialisasi;"
sudo -u postgres psql -c "REVOKE ALL ON DATABASE industrialisasi FROM PUBLIC;"
sudo -u postgres psql -c "GRANT ALL ON DATABASE industrialisasi TO industrialisasi"
