package com.clazzbuddy.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.Community;
import com.clazzbuddy.mongocollections.GroupInvitations;
import com.clazzbuddy.mongocollections.School;
import com.clazzbuddy.mongocollections.SchoolSearches;
import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.mongocollections.UserGroup;
import com.clazzbuddy.mongocollections.UserGroupMembers;
import com.clazzbuddy.restmodel.GroupInvitationAction;

@Component
public class UserService {

	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	UserGroupService userGroupService;

	public void createUser(Users user) throws Exception {
		if (user.getUserGroup() != null) {
			for (UserGroup userGroup : user.getUserGroup()) {
				UserGroup userGroupFromDB = userGroupService.createUserGroup(userGroup);
				userGroup.setId(userGroupFromDB.getId());
			}
		}
		user.setCreatedDate(new Date());
		mongoTemplate.insert(user);
	}

	public void updateUser(Users user) {
		mongoTemplate.save(user);
	}
	
	public Users validateUser(Users user) throws Exception {
		Query userByNameAndPassword = new Query();
		userByNameAndPassword.addCriteria(Criteria.where("email").is(user.getEmail()));
		userByNameAndPassword.addCriteria(Criteria.where("password").is(user.getPassword()));
		Users userFromDB = mongoTemplate.findOne(userByNameAndPassword, Users.class);
		if (userFromDB == null) {
			throw new Exception("No match found");
		}
		return userFromDB;
	}

	public Users getUserDetails(String userKey) {
		Query userByName = new Query();
		userByName.addCriteria(Criteria.where("email").is(userKey));
		userByName.addCriteria(Criteria.where("name").is(userKey));

		Users user = mongoTemplate.findOne(userByName, Users.class);
		if (user == null) {
			ObjectId objID = new ObjectId(userKey);
			Query userById = new Query();
			userById.addCriteria(Criteria.where("_id").is(objID));
			user = mongoTemplate.findOne(userById, Users.class);
		}
		
		if (user.getUserGroup() != null) {
			for (UserGroup userGroup : user.getUserGroup()) {
				userGroup.initializeRole(user.get_id(), user.getEmail());
			}
		}
		if (user.getRequestedUserGroup() != null) {
			for (UserGroup userGroup : user.getRequestedUserGroup()) {
				userGroup.initializeRole(user.get_id(),user.getEmail());
			}
		}
		if (user.getPendingInvitedUserGroups() != null) {
			for (UserGroup userGroup : user.getPendingInvitedUserGroups()) {
				userGroup.initializeRole(user.get_id(),user.getEmail());
			}
		}
		return user;
	}
	
	public List<Users> searchUser(String searchKey) throws Exception {
		Query schoolListQuery = new Query();
		schoolListQuery.addCriteria(Criteria.where("email").regex("^" + searchKey.toLowerCase(), "i"));			
		schoolListQuery.fields().include("email");
		List<Users> schools = mongoTemplate.find(schoolListQuery, Users.class);
		
		return schools;
		
		
	}
	
	public Users requestToJoinUserGroup(GroupInvitationAction action) {
		
		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());
		
		Users requestorUser = getUserDetails(action.getRequestorUserId());
		
		GroupInvitations invitation = new GroupInvitations();
		invitation.setGroupId(action.getGroupId());
		invitation.setRequestorUserId(action.getRequestorUserId());
		invitation.setRole(action.getRole());
		
		if (userGroup.getPendingInvitations() == null) {
			userGroup.setPendingInvitations(new ArrayList<GroupInvitations>());
		}
		userGroup.getPendingInvitations().add(invitation);
		
		if (requestorUser.getRequestedUserGroup() == null) {
			requestorUser.setRequestedUserGroup(new ArrayList<UserGroup>());
		}
		requestorUser.getRequestedUserGroup().add(userGroup);
		
		mongoTemplate.save(requestorUser);
		mongoTemplate.save(userGroup);
		
		return requestorUser;
		

	}
	
	
	public void inviteToJoinUserGroup(GroupInvitationAction action) {
		
		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());
		
		Users invitedUser = getUserDetails(action.getInvitedUserId());
		
		GroupInvitations invitation = new GroupInvitations();
		invitation.setGroupId(action.getGroupId());
		
		invitation.setInvitedUserId(action.getInvitedUserId());
		invitation.setRole(action.getRole());

		if (userGroup.getRequestedInvitations() == null) {
			userGroup.setRequestedInvitations(new ArrayList<GroupInvitations>());
		}
		userGroup.getRequestedInvitations().add(invitation);
		
		if (invitedUser.getPendingInvitedUserGroups() == null) {
			invitedUser.setPendingInvitedUserGroups(new ArrayList<UserGroup>());
		}
		invitedUser.getPendingInvitedUserGroups().add(userGroup);
		

		mongoTemplate.save(invitedUser);
		mongoTemplate.save(userGroup);
	}

	public Users acceptGroupInvitation(GroupInvitationAction action) throws Exception {
		
		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());
		
		if (userGroup == null) {
			throw new Exception("Not a valid user group");
		}
		Users invitedUser = getUserDetails(action.getInvitedUserId());
		
		if (invitedUser == null) {
			throw new Exception("Not a valid user");
		}
		
		if (action.getAction() == null) {
			throw new Exception("Action cannot be null");
		}
		
		
		if (action.getAction().equals(GroupInvitationActions.INVITE_ACCEPT.toString())) {
			
			for(Iterator<GroupInvitations> invitationIter = userGroup.getRequestedInvitations().iterator(); invitationIter.hasNext();) {
				GroupInvitations invitation = invitationIter.next();
				if (invitation.getInvitedUserId().equals(action.getInvitedUserId())) {
					invitationIter.remove();
					break;
				}
				
			}
			for (Iterator<UserGroup> userGroupIter = invitedUser.getPendingInvitedUserGroups().iterator(); userGroupIter.hasNext();) {
				UserGroup userGroupObj = userGroupIter.next();
				if (userGroupObj.getId().equals(userGroup.getId())) {
					userGroupIter.remove();
					break;
				}
				
			}
			if (invitedUser.getUserGroup() == null) {
				invitedUser.setUserGroup(new ArrayList<UserGroup>());
			}
			invitedUser.getUserGroup().add(userGroup);
			
			if (userGroup.getUserGroupMembers() == null) {
				userGroup.setUserGroupMembers(new ArrayList<UserGroupMembers>());
			}
			UserGroupMembers userGroupMember = new UserGroupMembers();
			userGroupMember.set_id(invitedUser.get_id());
			userGroupMember.setName(invitedUser.getEmail());
			userGroupMember.setRole(action.getRole());
			userGroup.getUserGroupMembers().add(userGroupMember);
			
			mongoTemplate.save(invitedUser);
			mongoTemplate.save(userGroup);
			return invitedUser;
		} else {
			throw new Exception("action should be INVITE_ACCEPT. it is " + action.getAction());
		}
	}
	
	
	public void acceptGroupRequest(GroupInvitationAction action) {
		
		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());
		
		Users invitedUser = getUserDetails(action.getRequestorUserId());
		
		if (action.getAction().equals(GroupInvitationActions.REQUEST_ACCEPT.toString())) {
			
			for(Iterator<GroupInvitations> invitationIter = userGroup.getPendingInvitations().iterator(); invitationIter.hasNext();) {
				GroupInvitations invitation = invitationIter.next();
				if (invitation.getRequestorUserId().equals(action.getRequestorUserId())) {
					invitationIter.remove();
					break;
				}
				
			}
			for (Iterator<UserGroup> userGroupIter = invitedUser.getRequestedUserGroup().iterator(); userGroupIter.hasNext();) {
				UserGroup userGroupObj = userGroupIter.next();
				if (userGroupObj.getId().equals(userGroup.getId())) {
					userGroupIter.remove();
					break;
				}
				
			}
			if (invitedUser.getUserGroup() == null) {
				invitedUser.setUserGroup(new ArrayList<UserGroup>());
			}
			invitedUser.getUserGroup().add(userGroup);
		
			if (userGroup.getUserGroupMembers() == null) {
				userGroup.setUserGroupMembers(new ArrayList<UserGroupMembers>());
			}
			UserGroupMembers userGroupMember = new UserGroupMembers();
			userGroupMember.set_id(invitedUser.get_id());
			userGroupMember.setName(invitedUser.getEmail());
			userGroupMember.setRole(action.getRole());
			userGroup.getUserGroupMembers().add(userGroupMember);
			
			mongoTemplate.save(invitedUser);
			mongoTemplate.save(userGroup);
		}
	}
	
}
