# Industrialisasi APIs

This repository contains the APIs used by Industrialisasi CMS. The APIs are developed mainly using using NodeJS and ExpressJS. This software comes at no guarantee and support. Use at your own risk.

## Requirements

1. You need to have Postgres 14 and Node.js 16 installed on your computer. The operating system is preferably Ubuntu.
2. Create the required tables and database. The example scripts are create-db.sh, create-table.sh, and init.sql on the root directory of this project.

## How to run this repository?

    git clone https://github.com/adipginting/industrialisasi-apis
    cd industrialisasi-apis
    npm install
    npm start

## Run via docker

    git clone https://github.com/adipginting/industrialisasi-apis
    cd industrialisasi-apis
    sudo docker run -p 4000:4000 -d

## Run via docker compose

Alternatively, I created a repository to run the whole website i.e. database server, api server, and the interface server with Docker Compose (a work on progress). See: https://github.com/adipginting/industrialisasi.

## To do and progress:

- [x] Register api end point.
- [x] Login api end point.
- [x] An api end point to check email existence on database.
- [x] An api end point to check username existence on database.
- [x] Use session cookie.
- [x] An api end point to send validation email to users.
- [x] Session cookie generation on login.
- [x] An api end point to save post.
- [x] An api end point to retrieve post.
- [ ] An api end point to save comment.
- [ ] An api end point to retrieve comment.
- [ ] Better security.
- [ ] Create API documentation using OpenAPI specification.
