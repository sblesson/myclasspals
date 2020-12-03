package com.clazzbuddy.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
import com.clazzbuddy.mongocollections.Event;
import com.clazzbuddy.mongocollections.EventInvites;
import com.clazzbuddy.mongocollections.GroupInvitations;
import com.clazzbuddy.mongocollections.School;
import com.clazzbuddy.mongocollections.UserGroup;
import com.clazzbuddy.mongocollections.UserGroupMembers;
import com.clazzbuddy.mongocollections.UserRegistration;
import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.restmodel.GroupInvitationAction;
import com.clazzbuddy.restmodel.UserEvent;
import com.clazzbuddy.restmodel.UserEventResult;
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
	EventService eventService;
	
	@Autowired
    private PasswordEncoder bcryptEncoder;
	
	Logger logger = LogManager.getLogger(UserService.class);

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
			for (Iterator<UserGroup> i = user.getUserGroup().iterator() ; i.hasNext();){
				UserGroup userGroup = i.next();
				if (userGroup == null || userGroup.getEnabled() == false) {
					i.remove();
				} else {
					userGroup.initializeRole(user.get_id(), user.getEmail());
				}
			}
		}
		if (user.getRequestedUserGroup() != null) {
			for (Iterator<UserGroup> i = user.getRequestedUserGroup().iterator() ; i.hasNext();){
				UserGroup userGroup = i.next();
				if (userGroup == null || userGroup.getEnabled() == false) {
					i.remove();
				} else {
					userGroup.initializeRole(user.get_id(), user.getEmail());
				}
			}
			
		}
		if (user.getPendingInvitedUserGroups() != null) {
			for (Iterator<UserGroup> i = user.getPendingInvitedUserGroups().iterator() ; i.hasNext();){
				UserGroup userGroup = i.next();
				if (userGroup == null || userGroup.getEnabled() == false) {
					i.remove();
				} else {
					userGroup.initializeRole(user.get_id(), user.getEmail());
				}
			}

		}
		//user.setEvents(eventService.getEventForUser(user.get_id()));
		
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
		if (checkForDuplicate(userGroup, requestorUser)) {
			return requestorUser;
		}
		
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
			userRegistration.setGroupId(userGroup.getId());
			mongoTemplate.save(userRegistration);
			emailServiceClient.sendUserRegistrationEmail(userRegistration.getRegId(),
					action.getInvitedUserId());

		}

		if (checkForDuplicate(userGroup, invitedUser)) {
			return userGroup;
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
	
	private Boolean checkForDuplicate(UserGroup userGroup, Users invitedUser) {
		if (userGroup.getRequestedInvitations() != null) {
			for (GroupInvitations invite :  userGroup.getRequestedInvitations()) {
				if (invite.getInvitedUserId().equals(invitedUser.getEmail())) {
					logger.warn("user already present in requested invitations : " + invitedUser.get_id() + " group :" + userGroup.getId());
					return true;
				}
			}
		}
		if (userGroup.getPendingInvitations() != null) {
			for (GroupInvitations invite :  userGroup.getPendingInvitations()) {
				if (invite.getInvitedUserId().equals(invitedUser.getEmail())) {
					logger.warn("user already present in pending invitations : " + invitedUser.get_id() + " group :" + userGroup.getId());
					return true;
				}
			}
		}
		if (userGroup.getUserGroupMembers() != null) {
			for (UserGroupMembers member :  userGroup.getUserGroupMembers()) {
				if (member.get_id().equals(invitedUser.get_id())) {
					logger.warn("user already part of the group : " + invitedUser.get_id() + " group :" + userGroup.getId());
					return true;
				}
			}
		}
		return false;
		
		
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

	public Users acceptGroupRequest(GroupInvitationAction action) throws Exception {

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
			return invitedUser;
		} else {
			throw new Exception("action should be REQUEST_ACCEPT. it is " + action.getAction());
		}
	}

	public void deleteUserRegToken(String id) {

		Query userRegById = new Query();
		userRegById.addCriteria(Criteria.where("regId").is(id));
		UserRegistration userReg = mongoTemplate.findOne(userRegById, UserRegistration.class);

		mongoTemplate.remove(userReg);
	}
	
	public List<UserEvent>  getUserEvents() throws Exception
	{
		Users user = (Users) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal();
		
		List<EventInvites> eventList = eventService.getEventForUser(user.get_id());
		
		List<UserEvent> userEvents = new ArrayList<UserEvent>();
		for (EventInvites event : eventList) {
			UserEvent userEvent = new UserEvent();
			if (event.getEvent() != null) {
				userEvent.setDesc(event.getEvent().getDesc());
				userEvent.setTitle(event.getEvent().getTitle());
				userEvent.setGroupName(event.getEvent().getGroupName());
				userEvent.setStart(event.getEvent().getStart());
				userEvent.setEnd(event.getEvent().getEnd());
				userEvent.setEventInvities(event.getEvent().getEventInvities());
				userEvent.setLocation(event.getEvent().getLocation());
				userEvent.setEventId(event.getEvent().get_id());
				userEvents.add(userEvent);
			}
			
		}
		return userEvents;
	}



}
