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
import com.clazzbuddy.mongocollections.GroupInvitations;
import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.mongocollections.UserGroup;
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

	public Users getUser(String userKey) {
		Query userByName = new Query();
		userByName.addCriteria(Criteria.where("name").is(userKey));
		Users user = mongoTemplate.findOne(userByName, Users.class);
		if (user == null) {
			ObjectId objID = new ObjectId(userKey);
			Query userById = new Query();
			userById.addCriteria(Criteria.where("_id").is(objID));
			user = mongoTemplate.findOne(userById, Users.class);
		}
		return user;
	}
	
	public void requestToJoinUserGroup(GroupInvitationAction action) {
		
		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());
		
		Users requestorUser = getUser(action.getRequestorUserId());
		
		GroupInvitations invitation = new GroupInvitations();
		invitation.setGroupId(action.getGroupId());
		invitation.setRequestorUserId(action.getRequestorUserId());
		
		
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
		

	}
	
	
	public void inviteToJoinUserGroup(GroupInvitationAction action) {
		
		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());
		
		Users invitedUser = getUser(action.getInvitedUserId());
		
		GroupInvitations invitation = new GroupInvitations();
		invitation.setGroupId(action.getGroupId());
		
		invitation.setInvitedUserId(action.getInvitedUserId());
		

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

	public void acceptGroupInvitation(GroupInvitationAction action) {
		
		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());
		
		Users invitedUser = getUser(action.getInvitedUserId());
		
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
			
			mongoTemplate.save(invitedUser);
			mongoTemplate.save(userGroup);
		}
	}
	
	
	public void acceptGroupRequest(GroupInvitationAction action) {
		
		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());
		
		Users invitedUser = getUser(action.getRequestorUserId());
		
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
		
			mongoTemplate.save(invitedUser);
			mongoTemplate.save(userGroup);
		}
	}
	
}
