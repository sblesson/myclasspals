FROM ubuntu:18.04

RUN apt-get -y update
RUN apt-get install -y nano openssh-server python supervisor unzip curl wget vim
RUN mkdir -p /var/run/sshd ; mkdir -p /var/log/supervisor
RUN apt-get install -y jq telnet

ADD supervisord.conf    /etc/supervisor/conf.d/supervisord.conf
RUN apt-get -y update


ENV JAVA_VER 8
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

# Install Open JDK 8
RUN apt-get update && \
	apt-get install -y openjdk-8-jdk && \
	apt-get install -y ant && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/* && \
	rm -rf /var/cache/oracle-jdk8-installer;
	
# Fix certificate issues, found as of 
# https://bugs.launchpad.net/ubuntu/+source/ca-certificates-java/+bug/983302
RUN apt-get update && \
	apt-get install -y ca-certificates-java && \
	apt-get clean && \
	update-ca-certificates -f && \
	rm -rf /var/lib/apt/lists/* && \
	rm -rf /var/cache/oracle-jdk8-installer;

# Setup JAVA_HOME, this is useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

	



RUN mkdir -p /classbuddyserver/lib

RUN mkdir -p /classbuddyserver/log

ADD clazzvilla-server.conf    /etc/supervisor/conf.d/clazzvilla-server.conf

COPY clazzbuddyservice-master/clazzbuddyservice-master/target/*.jar /classbuddyserver/lib 

RUN apt-get update && \
	apt-get install -y gnupg && \
	wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - && \
	echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list && \
	apt-get update && \
	ln -fs /usr/share/zoneinfo/America/Los_Angeles /etc/localtime && \
	apt-get install -y mongodb-org && \
	mkdir -p /data/db;

COPY clazzbuddyservice-master/mongoscript.sh /classbuddyserver/mongoscript.sh
COPY clazzbuddyservice-master/mongo.sql  /classbuddyserver/mongo.sql
RUN chmod 777 /classbuddyserver/mongoscript.sh && \
   /classbuddyserver/mongoscript.sh


ADD mongo.conf    /etc/supervisor/conf.d/mongo.conf

RUN mkdir -p /classbuddynodeserver/log
RUN mkdir -p /classbuddynodeserver/client
COPY client/public /classbuddynodeserver/client/public
COPY client/src /classbuddynodeserver/client/src
COPY client/package.json /classbuddynodeserver/client/package.json
COPY middleware /classbuddynodeserver/middleware
COPY config /classbuddynodeserver/config
COPY models /classbuddynodeserver/models
COPY package.json /classbuddynodeserver/package.json	
COPY routes /classbuddynodeserver/routes
COPY server.js /classbuddynodeserver/server.js
COPY nodeinstall.sh /classbuddynodeserver/nodeinstall.sh


RUN apt-get update && \
	curl -sL https://deb.nodesource.com/setup_10.x -o /var/tmp/nodesource_setup.sh && \
	bash /var/tmp/nodesource_setup.sh && \
	apt-get install -y nodejs && \
	apt install -y build-essential;

RUN chmod 777 /classbuddynodeserver/nodeinstall.sh && \
   /classbuddynodeserver/nodeinstall.sh
   
ADD clazzvilla-node.conf   /etc/supervisor/conf.d/clazzvilla-node.conf

# Expose all ports
EXPOSE 1-65535

CMD ["/usr/bin/supervisord"]
# default cmd to run 