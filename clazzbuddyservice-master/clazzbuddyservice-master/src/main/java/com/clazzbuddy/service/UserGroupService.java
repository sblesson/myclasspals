package com.clazzbuddy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.UserGroup;

@Component
public class UserGroupService {

	@Autowired
	MongoTemplate mongoTemplate;

	public void createUserGroup(UserGroup userGroup) {
		mongoTemplate.insert(userGroup);
	}

	public void updateUserGroup(UserGroup userGroup) {
		UserGroup userFromDB = getUserGroup(userGroup.getGroupName());
		userFromDB.setGroupName(userGroup.getGroupName());
		mongoTemplate.save(userFromDB);
	}

	public UserGroup getUserGroup(String id) {

		Query userByName = new Query();
		userByName.addCriteria(Criteria.where("groupname").is(id));
		return mongoTemplate.findOne(userByName, UserGroup.class);

	}
}
