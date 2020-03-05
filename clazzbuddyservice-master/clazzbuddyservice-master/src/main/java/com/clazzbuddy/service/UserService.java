package com.clazzbuddy.service;

import java.util.ArrayList;

import org.bson.types.ObjectId;
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

	public User getUser(String userKey) {
		Query userByName = new Query();
		userByName.addCriteria(Criteria.where("name").is(userKey));
		User user = mongoTemplate.findOne(userByName, User.class);
		if (user == null) {
			ObjectId objID = new ObjectId(userKey);
			Query userById = new Query();
			userById.addCriteria(Criteria.where("_id").is(objID));
			user = mongoTemplate.findOne(userById, User.class);
		}
		return user;
	}
}
