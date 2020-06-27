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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.clazzbuddy.externalclients.EmailServiceClient;
import com.clazzbuddy.mongocollections.GroupInvitations;
import com.clazzbuddy.mongocollections.School;
import com.clazzbuddy.mongocollections.UserGroup;
import com.clazzbuddy.mongocollections.UserGroupMembers;
import com.clazzbuddy.mongocollections.UserRegistration;
import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.restmodel.GroupInvitationAction;
import com.clazzbuddy.utils.CommonUtils;
import com.clazzbuddy.utils.Constants;

@Component
public class UserService implements UserDetailsService{

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	UserGroupService userGroupService;

	@Autowired
	EmailServiceClient emailServiceClient;

	@Autowired
	SchoolCache schoolCache;
	
	@Autowired
    private PasswordEncoder bcryptEncoder;

	public Users createUser(Users user) throws Exception {
		if (user.getRegId() != null) {
			Users userWithRegId = getUserDetailsFromRegistrationId(user.getRegId());
			deleteUserRegToken(user.getRegId());
			userWithRegId.setPassword(bcryptEncoder.encode(user.getPassword()));
			userWithRegId.setName(user.getName());
			mongoTemplate.save(userWithRegId);
			return userWithRegId;
		}
		Query userByName = new Query();
		userByName.addCriteria(Criteria.where("email").is(user.getEmail()));
		Users userFromDB = mongoTemplate.findOne(userByName, Users.class);
		if (userFromDB != null) {
			throw new Exception("User already exists");
		}
		if (user.getUserGroup() != null) {
			for (UserGroup userGroup : user.getUserGroup()) {
				UserGroup userGroupFromDB = userGroupService.createUserGroup(userGroup);
				userGroup.setId(userGroupFromDB.getId());
			}
		}
		user.setCreatedDate(new Date());
		user.setPassword(bcryptEncoder.encode(user.getPassword()));
		mongoTemplate.insert(user);
		return user;
	}
	
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		Query userByName = new Query();
		userByName.addCriteria(Criteria.where("email").is(userName));
		Users userFromDB = mongoTemplate.findOne(userByName, Users.class);
		if (userFromDB == null) {
			throw new UsernameNotFoundException("User not found with username: " + userName);
		}
		return new org.springframework.security.core.userdetails.User(userFromDB.getEmail(), userFromDB.getPassword(),
				new ArrayList<>());
	}

	public Users updateUser(Users user) throws Exception {
		Query userByEmail = new Query();
		userByEmail.addCriteria(Criteria.where("email").is(user.getEmail()));
		Users userFromDB = mongoTemplate.findOne(userByEmail, Users.class);
		if (userFromDB == null) {
			throw new Exception("No user match found");
		}

		if (user.getName() != null) {
			userFromDB.setName(user.getName());
		}

		if (user.getCity() != null) {
			userFromDB.setCity(user.getCity());
		}
		if (user.getZipcode() != null) {
			userFromDB.setZipcode(user.getZipcode());
		}
		if (user.getState() != null) {
			userFromDB.setState(user.getState());
		}
		if (user.getSchoolId() != null) {
			List<School> schools = new ArrayList<School>();
			for (String id : user.getSchoolId()) {
				School school = schoolCache.getSchoolBySchoolId(id);
				if (school == null) {
					throw new Exception("school id is incorrect:" + id);
				}
				schools.add(school);
			}
			userFromDB.setSchools(schools);
			;
		}
		return mongoTemplate.save(userFromDB);
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

		Users user = mongoTemplate.findOne(userByName, Users.class);
		if (user == null) {
			try {
				ObjectId objID = new ObjectId(userKey);
				Query userById = new Query();
				userById.addCriteria(Criteria.where("_id").is(objID));
				user = mongoTemplate.findOne(userById, Users.class);
			} catch (IllegalArgumentException il) {
				return null;
			}
		}
		

		if (user.getUserGroup() != null) {
			for (UserGroup userGroup : user.getUserGroup()) {
				userGroup.initializeRole(user.get_id(), user.getEmail());
			}
		}
		if (user.getRequestedUserGroup() != null) {
			for (UserGroup userGroup : user.getRequestedUserGroup()) {
				userGroup.initializeRole(user.get_id(), user.getEmail());
			}
		}
		if (user.getPendingInvitedUserGroups() != null) {
			for (UserGroup userGroup : user.getPendingInvitedUserGroups()) {
				userGroup.initializeRole(user.get_id(), user.getEmail());
			}
		}
		return user;
	}

	public Users getUserDetailsFromRegistrationId(String id) throws Exception {
		Query userRegById = new Query();
		userRegById.addCriteria(Criteria.where("regId").is(id));
		UserRegistration userReg = mongoTemplate.findOne(userRegById, UserRegistration.class);

		if (userReg == null) {
			throw new Exception("Not a valid Reg id");
		}
		Query userByName = new Query();
		userByName.addCriteria(Criteria.where("email").is(userReg.getUserId()));

		Users user = mongoTemplate.findOne(userByName, Users.class);
		if (user == null) {
			throw new Exception("Not a valid user");
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

	public Users requestToJoinUserGroup(GroupInvitationAction action) throws Exception {

		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());

		Users requestorUser = getUserDetails(action.getRequestorUserId());
		
		if (Constants.PUBLIC.equals(userGroup.getPrivacy())) {
			if (requestorUser.getUserGroup() == null) {
				requestorUser.setUserGroup(new ArrayList<UserGroup>());
			}
			requestorUser.getUserGroup().add(userGroup);

			if (userGroup.getUserGroupMembers() == null) {
				userGroup.setUserGroupMembers(new ArrayList<UserGroupMembers>());
			}
			UserGroupMembers userGroupMember = new UserGroupMembers();
			userGroupMember.set_id(requestorUser.get_id());
			userGroupMember.setName(requestorUser.getEmail());
			userGroupMember.setRole(action.getRole());
			userGroup.getUserGroupMembers().add(userGroupMember);

			
		} else {

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
		}
	
		mongoTemplate.save(requestorUser);
		mongoTemplate.save(userGroup);
		

		return requestorUser;

	}

	public UserGroup inviteToJoinUserGroup(GroupInvitationAction action) throws Exception {

		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());

		Users invitedUser = getUserDetails(action.getInvitedUserId());
		if (invitedUser == null) {
			invitedUser = new Users();
			invitedUser.setEmail(action.getInvitedUserId());
			UserRegistration userRegistration = new UserRegistration();
			userRegistration.setUserId(action.getInvitedUserId());
			userRegistration.setRegId(CommonUtils.getRandomId().toString());
			mongoTemplate.save(userRegistration);
			emailServiceClient.sendUserRegistrationEmail(userRegistration.getRegId(),
					action.getInvitedUserId());

		}

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

		return userGroup;
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

			for (Iterator<GroupInvitations> invitationIter = userGroup.getRequestedInvitations()
					.iterator(); invitationIter.hasNext();) {
				GroupInvitations invitation = invitationIter.next();
				if (invitation.getInvitedUserId().equals(action.getInvitedUserId())) {
					invitationIter.remove();
					break;
				}

			}
			for (Iterator<UserGroup> userGroupIter = invitedUser.getPendingInvitedUserGroups().iterator(); userGroupIter
					.hasNext();) {
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

	public void acceptGroupRequest(GroupInvitationAction action) throws Exception {

		UserGroup userGroup = userGroupService.getUserGroupById(action.getGroupId());

		Users invitedUser = getUserDetails(action.getRequestorUserId());

		if (action.getAction().equals(GroupInvitationActions.REQUEST_ACCEPT.toString())) {

			for (Iterator<GroupInvitations> invitationIter = userGroup.getPendingInvitations()
					.iterator(); invitationIter.hasNext();) {
				GroupInvitations invitation = invitationIter.next();
				if (invitation.getRequestorUserId().equals(action.getRequestorUserId())) {
					invitationIter.remove();
					break;
				}

			}
			for (Iterator<UserGroup> userGroupIter = invitedUser.getRequestedUserGroup().iterator(); userGroupIter
					.hasNext();) {
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

	public void deleteUserRegToken(String id) {

		Query userRegById = new Query();
		userRegById.addCriteria(Criteria.where("regId").is(id));
		UserRegistration userReg = mongoTemplate.findOne(userRegById, UserRegistration.class);

		mongoTemplate.remove(userReg);
	}



}
