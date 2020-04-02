package com.clazzbuddy.service;

import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.mongocollections.UserGroup;
import com.clazzbuddy.mongocollections.UserGroupMembers;

@Component
public class UserGroupService {

	@Autowired
	MongoTemplate mongoTemplate;
	
	
	@Autowired
	UserService userService;

	public UserGroup createUserGroup(UserGroup userGroup) throws Exception {
		UserGroup userGroupFromDB = getUserGroupByName(userGroup.getGroupName());
		
		if (userGroupFromDB != null) {
			return userGroupFromDB;
		}
		
		userGroupFromDB = mongoTemplate.insert(userGroup);
		
		if (userGroup.getUserGroupMembers() != null) {
			for (UserGroupMembers userId : userGroup.getUserGroupMembers()) {
				Users user = userService.getUser(userId.get_id());
				if (user == null) {
					throw new Exception("Not a valid creator user: " + userId);
				}
				if (user.getUserGroup() == null) {
					user.setUserGroup(new ArrayList<UserGroup>());
				}
				user.getUserGroup().add(userGroup);
				userService.updateUser(user);
			}
	}
		
		
		return userGroupFromDB;
	}

	public void updateUserGroup(UserGroup userGroup) {
		UserGroup userGroupFromDB = getUserGroupById(userGroup.getId());
		userGroupFromDB.setGroupName(userGroup.getGroupName());
		userGroupFromDB.setHidden(userGroup.getHidden());
		userGroupFromDB.setPrivacy(userGroup.getPrivacy());
		userGroupFromDB.setUserGroupMembers(userGroup.getUserGroupMembers());
		mongoTemplate.save(userGroupFromDB);
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
