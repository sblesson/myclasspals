package com.clazzbuddy.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.restmodel.GroupChangeRoleAction;
import com.clazzbuddy.restmodel.UserGroupSearchFilter;
import com.clazzbuddy.mongocollections.UserGroup;
import com.clazzbuddy.mongocollections.UserGroupMembers;

@Component
public class UserGroupService {
	
	Logger logger = LogManager.getLogger(UserGroupService.class);

	@Autowired
	MongoTemplate mongoTemplate;
	
	
	@Autowired
	UserService userService;

	public UserGroup createUserGroup(UserGroup userGroup) throws Exception {
		UserGroup userGroupFromDB = getUserGroupByName(userGroup.getGroupName());
		
		if (userGroupFromDB != null) {
			return userGroupFromDB;
		}
		
		userGroup.setCreatedDate(new Date().toString());
		userGroupFromDB = mongoTemplate.insert(userGroup);
		
		if (userGroup.getUserGroupMembers() != null) {
			for (UserGroupMembers userId : userGroup.getUserGroupMembers()) {
				Users user = userService.getUserDetails(userId.get_id());
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

	public UserGroup updateUserGroup(UserGroup userGroup) {
		UserGroup userGroupFromDB = getUserGroupById(userGroup.getId());
		if (userGroup.getGroupName() != null) {
			userGroupFromDB.setGroupName(userGroup.getGroupName());
		}
		if (userGroup.getHidden() != null) {
			userGroupFromDB.setHidden(userGroup.getHidden());
		}
		if (userGroup.getPrivacy() != null) {
			userGroupFromDB.setPrivacy(userGroup.getPrivacy());
		}
		if (userGroup.getGroupRules() != null) {
			userGroupFromDB.setGroupRules(userGroup.getGroupRules());
		}
		if (userGroup.getDescription() != null) {
			userGroupFromDB.setDescription(userGroup.getDescription());
		}
		mongoTemplate.save(userGroupFromDB);
		return userGroupFromDB;
	}

	public UserGroup getUserGroupById(String id) {

		ObjectId objID = new ObjectId(id);
		Query userGroupById = new Query();
		userGroupById.addCriteria(Criteria.where("_id").is(objID));
		return mongoTemplate.findOne(userGroupById, UserGroup.class);

	}
	
	public List<UserGroup> getUserGroupBySerachFilter(UserGroupSearchFilter filter) {

		Query userGroupSearch = new Query();
		if (filter.getGroupKeyword() != null) {
			userGroupSearch.addCriteria(Criteria.where("groupName").regex(filter.getGroupKeyword()));
		}
		if (filter.getPrivacy() != null) {
			userGroupSearch.addCriteria(Criteria.where("privacy").regex(filter.getPrivacy()));

		}
		if (filter.getSchoolName() != null) {
			userGroupSearch.addCriteria(Criteria.where("schoolName").regex(filter.getSchoolName()));

		}
		if (filter.getSchoolCity() != null) {
			userGroupSearch.addCriteria(Criteria.where("schoolCity").regex(filter.getSchoolCity()));

		}
		if (filter.getSchoolZipCode() != null) {
			userGroupSearch.addCriteria(Criteria.where("schoolZipCode").regex(filter.getSchoolZipCode()));

		}
		logger.info(userGroupSearch.toString());
		return mongoTemplate.find(userGroupSearch, UserGroup.class);

	}
	
	public UserGroup getUserGroupByName(String id) {

		Query userByName = new Query();
		userByName.addCriteria(Criteria.where("groupName").is(id));
		return mongoTemplate.findOne(userByName, UserGroup.class);

	}
	
	public UserGroup changeUserRole(GroupChangeRoleAction action) throws Exception {
		UserGroup userGroup = getUserGroupById(action.getGroupId());
		
		if (userGroup == null) {
			throw new Exception("user group is invalid");
		}
		
		if (userGroup.getUserGroupMembers() == null) {
			throw new Exception("No group members");
		}
		
		for (UserGroupMembers member : userGroup.getUserGroupMembers()) {
			if (member.get_id().equals(action.getUserId())) {
				member.setRole(action.getNewRole());
				mongoTemplate.save(userGroup);
				return userGroup;
			}
		}
		throw new Exception("User is not a member in the group :" + action.getUserId());
		
	}
	
}
