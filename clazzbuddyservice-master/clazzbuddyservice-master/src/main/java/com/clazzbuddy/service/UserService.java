package com.clazzbuddy.service;

import java.util.ArrayList;
import java.util.Iterator;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.Community;
import com.clazzbuddy.mongocollections.User;
import com.clazzbuddy.mongocollections.UserGroup;

@Component
public class UserService {

	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	UserGroupService userGroupService;

	public void createUser(User user) {
		if (user.getUserGroup() != null) {
			for (UserGroup userGroup : user.getUserGroup()) {
				UserGroup userGroupFromDB = userGroupService.createUserGroup(userGroup);
				userGroup.setId(userGroupFromDB.getId());
			}
		}
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
		if (user.getUserGroup() != null) {
			if (userFromDB.getUserGroup() == null) {
				userFromDB.setUserGroup((new ArrayList<UserGroup>()));
			}
			for (UserGroup userGroup : user.getUserGroup()) {
				userFromDB.getUserGroup().add(userGroupService.createUserGroup(userGroup));
			}
		}
		mongoTemplate.save(userFromDB);
	}
	
	public User validateUser(User user) throws Exception {
		Query userByNameAndPassword = new Query();
		userByNameAndPassword.addCriteria(Criteria.where("name").is(user.getName()));
		userByNameAndPassword.addCriteria(Criteria.where("password").is(user.getPassword()));
		User userFromDB = mongoTemplate.findOne(userByNameAndPassword, User.class);
		if (userFromDB == null) {
			throw new Exception("No match found");
		}
		return userFromDB;
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
