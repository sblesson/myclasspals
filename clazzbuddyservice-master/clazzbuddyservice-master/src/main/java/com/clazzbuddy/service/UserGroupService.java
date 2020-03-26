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
		Users creatorUser = userService.getUser(userGroup.getCreaterUserId());
		if (creatorUser == null) {
			throw new Exception("Not a valid creator user:" + userGroup.getCreaterUserId());
		}
		userGroupFromDB = mongoTemplate.insert(userGroup);
		if (creatorUser.getUserGroup() == null) {
			creatorUser.setUserGroup(new ArrayList<UserGroup>());
		}
		creatorUser.getUserGroup().add(userGroupFromDB);
		userService.updateUser(creatorUser);
		
		if (userGroup.getAdminUserIds() != null) {
			for (String userId : userGroup.getAdminUserIds()) {
				Users adminUser = userService.getUser(userId);
				if (adminUser == null) {
					throw new Exception("Not a valid creator user: " + userId);
				}
				if (adminUser.getUserGroup() == null) {
					adminUser.setUserGroup(new ArrayList<UserGroup>());
				}
				adminUser.getUserGroup().add(userGroup);
				userService.updateUser(adminUser);
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
