package com.clazzbuddy.service;

import org.bson.types.ObjectId;
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

	public UserGroup createUserGroup(UserGroup userGroup) {
		UserGroup userGroupFromDB = getUserGroupByName(userGroup.getGroupName());
		if (userGroupFromDB != null) {
			return userGroupFromDB;
		}
		return mongoTemplate.insert(userGroup);
	}

	public void updateUserGroup(UserGroup userGroup) {
		UserGroup userFromDB = getUserGroupById(userGroup.getId());
		userFromDB.setGroupName(userGroup.getGroupName());
		mongoTemplate.save(userFromDB);
	}

	public UserGroup getUserGroupById(String id) {

		ObjectId objID = new ObjectId(id);
		Query userGroupById = new Query();
		userGroupById.addCriteria(Criteria.where("_id").is(objID));
		return mongoTemplate.findOne(userGroupById, UserGroup.class);

	}
	
	public UserGroup getUserGroupByName(String id) {

		Query userByName = new Query();
		userByName.addCriteria(Criteria.where("groupName").is(id));
		return mongoTemplate.findOne(userByName, UserGroup.class);

	}
}
