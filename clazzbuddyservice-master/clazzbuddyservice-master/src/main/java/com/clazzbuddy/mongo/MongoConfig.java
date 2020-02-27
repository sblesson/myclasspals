package com.clazzbuddy.mongo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoClientFactoryBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import static java.util.Collections.singletonList;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoCredential;
import com.mongodb.MongoOptions;
import com.mongodb.ServerAddress;

@Configuration
public class MongoConfig extends AbstractMongoConfiguration {

	@Override
	public String getDatabaseName() {
		return "database";
	}

	@Override
	@Bean
	public MongoClient mongoClient() {

		return new MongoClient(singletonList(new ServerAddress("127.0.0.1", 27017)),
				MongoCredential.createCredential("clazz", "clazzbuddy", "buddy".toCharArray()),
				MongoClientOptions.builder().build());
	}

	public @Bean MongoTemplate mongoTemplate() {
		return new MongoTemplate(mongoClient(), "clazzbuddy");
	}
}
