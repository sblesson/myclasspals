## Quick Start

```
# change default.json file in config folder

# this file is located in config/default.json

# add uri of your mongodb connection for example

 "mongoURI": "mongodb://localhost/dev-social",

```

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install

# Run both Express & React from root
npm run dev

# Build for production
cd client
npm run build
```

## App Info

### Author

Brad Traversy
[Traversy Media](http://www.traversymedia.com)

### Version

2.0.0

### License

This project is licensed under the MIT License

### Docker

Create docker container
Go to java server base dir
mvn clean install
docker build . --tag blessonpaul/clazzbuddy
docker push blessonpaul/clazzbuddy

Run docker container
docker run -d -p 3000:3000 -p 5000:5000 -p 8080:8080 clazzvilla:1.0

For running automation test, I am using Selenium SIDE Runner
npm install -g selenium-side-runner

selenium-side-runner -c "browserName=chrome platform=MAC"

selenium-side-runner --server http://localhost:4444/wd/hub

cd frontend

Change axios file to prod setting

Nom run build
Locally
docker build . --tag blessonpaul/clazzbuddy
docker push blessonpaul/clazzbuddy
——————
docker run -d -p 3000:3000 -p 5000:5000 -p 8080:8080 blessonpaul/clazzbuddy:latest

————
Prod
docker ps
2 docker stop 40a9ea361cc5
docker images
9 docker image rm -f c837b534b136
10 docker pull blessonpaul/clazzbuddy
