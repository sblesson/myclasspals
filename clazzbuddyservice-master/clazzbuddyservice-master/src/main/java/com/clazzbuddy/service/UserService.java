package com.clazzbuddy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.Community;
import com.clazzbuddy.mongocollections.User;

@Component
public class UserService {

	@Autowired
	MongoTemplate mongoTemplate;
	
	public void createUser(User user) {
		mongoTemplate.insert(user);
	}
	
	public void updateUser(User user) {
		User userFromDB = getUser(user.getName());
		if (user.getCommunity() != null) {
			if (userFromDB.getCommunity() == null) {
				userFromDB.setCommunity(new ArrayList<Community>());
			}
			userFromDB.getCommunity().addAll(user.getCommunity());
		}
		mongoTemplate.save(userFromDB);
	}
	public User getUser(String username) {
		Query userByName = new Query();
		userByName.addCriteria(Criteria.where("name").is(username));
		return mongoTemplate.findOne(userByName, User.class);
	}
}
