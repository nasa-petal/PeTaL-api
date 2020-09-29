https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

clone    
`npm install`    
`npm start`    
`curl -i localhost:8080`

run in docker container    
`docker build -t petal-api .`    
`docker run --name petal-api -p 8080:8080 -d petal-api --mount type=bind,source="$(pwd)"/server.js,target=/app`    
`curl -i localhost:8080`

connect to docker container    
`docker exec -it petal-api /bin/bash`    