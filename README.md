https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

clone    
`npm install`    
`docker build -t petal-api .`    
`docker run --name petal-api -p 8080:8080 -d petal-api`    
`docker exec -it petal-api /bin/bash`    
`curl -i localhost:8080`    