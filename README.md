# PeTaL (Periodic Table of Life) API

The Periodic Table of Life (PeTaL, pronounced petal) is a design tool aimed at allowing users to seemlesly move from ideas (from nature or other sources) to design.

PeTaL is comprised of multiple interconnected services. This repository is for the API. There are other repositories for the [ReactJS web front end client](https://github.com/nasa/PeTaL), [PostgreSQL database server](https://github.com/nasa/petal-db), and [Labeller](https://github.com/nasa/petal-labeller).

## Getting Started

clone this repo

option 1: run locally (easiest)    
`npm install`    
`npm start`    
`curl -i localhost:8080`

option 2: run in docker container    
`docker build -t petal-api .`    
`docker run --name petal-api -p 8080:8080 -d petal-api --mount type=bind,source="$(pwd)"/server.js,target=/app`    
`curl -i localhost:8080/v1/functions`

connect to docker container    
`docker exec -it petal-api /bin/bash`    


Used this guide to do initial setup
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/