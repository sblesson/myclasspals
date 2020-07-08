package com.clazzbuddy.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.core.SecurityContext;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.restmodel.GroupChangeRoleAction;
import com.clazzbuddy.restmodel.UserGroupSearchFilter;
import com.clazzbuddy.mongocollections.School;
import com.clazzbuddy.mongocollections.UserGroup;
import com.clazzbuddy.mongocollections.UserGroupMembers;

@Component
public class UserGroupService {

	Logger logger = LogManager.getLogger(UserGroupService.class);

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	SchoolCache schoolCache;

	@Autowired
	UserService userService;

	public UserGroup createUserGroup(UserGroup userGroup) throws Exception {
		UserGroup userGroupFromDB = getUserGroupByName(userGroup.getGroupName());

		if (userGroupFromDB != null) {
			return userGroupFromDB;
		}

		userGroup.setCreatedDate(new Date().toString());
		populateSchoolDetails(userGroup);
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
				mongoTemplate.save(user);
			}
		}

		return userGroupFromDB;
	}

	private void populateSchoolDetails(UserGroup userGroup) throws Exception {

		if (userGroup.getSchoolId() != null) {
			School school = schoolCache.getSchoolBySchoolId(userGroup.getSchoolId());
			if (school == null) {
				throw new Exception("Unable to find school :" + userGroup.getSchoolId());
			}
			userGroup.setSchoolName(school.getSchoolName());
			userGroup.setSchoolCity(school.getCity());
			userGroup.setSchoolState(school.getState());
			userGroup.setSchoolZipCode(school.getZip());
		}
	}

	public UserGroup updateUserGroup(UserGroup userGroup) throws Exception {
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
		populateSchoolDetails(userGroup);
		mongoTemplate.save(userGroupFromDB);
		return userGroupFromDB;
	}

	public UserGroup getUserGroupById(String id) throws Exception {

		ObjectId objID = new ObjectId(id);
		Query userGroupById = new Query();
		userGroupById.addCriteria(Criteria.where("_id").is(objID));
		UserGroup userGroup = mongoTemplate.findOne(userGroupById, UserGroup.class);
		if (userGroup != null) {
			Users user = (Users) SecurityContextHolder
					.getContext().getAuthentication().getPrincipal();
			userGroup.initializeRole(user.get_id(), user.getEmail());
			
		}
		
		return userGroup;
		
		

	}

	public List<UserGroup> getUserGroups(String key) {
		Query userGroupSearch = new Query();
		userGroupSearch.addCriteria(Criteria.where("groupName").regex("^" + key));
		List<UserGroup> userGroups = mongoTemplate.find(userGroupSearch, UserGroup.class);
		return userGroups;
		

	}
	public List<UserGroup> getUserGroupBySerachFilter(UserGroupSearchFilter filter) throws Exception {

		
		

		Query userGroupSearch = new Query();
		if (filter.getGroupKeyword() != null && filter.getSchoolName() != null) {
			userGroupSearch.addCriteria(new Criteria()
			        .orOperator(
			        		Criteria.where("groupName").regex("^" +filter.getGroupKeyword(), "i"),
			        		Criteria.where("schoolName").regex("^" + filter.getSchoolName(), "i")
			            ) );
		} else if (filter.getGroupKeyword() != null) {
			userGroupSearch.addCriteria(Criteria.where("groupName").regex(filter.getGroupKeyword()));
		} else if (filter.getSchoolName() != null) {
			userGroupSearch.addCriteria(Criteria.where("schoolName").regex(filter.getSchoolName()));
		}
		if (filter.getPrivacy() != null) {
			userGroupSearch.addCriteria(Criteria.where("privacy").regex(filter.getPrivacy()));

		}
		
		if (filter.getCity() != null) {
			userGroupSearch.addCriteria(Criteria.where("city").regex(filter.getCity()));
		}
		if (filter.getState() != null) {
			userGroupSearch.addCriteria(Criteria.where("state").regex(filter.getState()));
		}
		if (filter.getZipcode() != null) {
			userGroupSearch.addCriteria(Criteria.where("zipcode").regex(filter.getZipcode()));
		}
		if (filter.getSchoolId() != null) {
			userGroupSearch.addCriteria(Criteria.where("schoolId").regex(filter.getSchoolId()));

		}

		if (filter.getSchoolCity() != null) {
			userGroupSearch.addCriteria(Criteria.where("schoolCity").regex(filter.getSchoolCity()));
		}
		if (filter.getSchoolZipCode() != null) {
			userGroupSearch.addCriteria(Criteria.where("schoolZipCode").regex(filter.getSchoolZipCode()));

		}
		logger.info(userGroupSearch.toString());
		List<UserGroup> userGroups = mongoTemplate.find(userGroupSearch, UserGroup.class);
		if (userGroups != null) {
			Users users = (Users) SecurityContextHolder
					.getContext().getAuthentication().getPrincipal();

			for (UserGroup userGroup : userGroups) {
				userGroup.initializeRole(users.get_id(), users.getEmail());
			}
		}
		return userGroups;

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