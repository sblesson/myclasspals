package com.clazzbuddy.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.Event;
import com.clazzbuddy.mongocollections.EventInvites;
import com.clazzbuddy.mongocollections.Post;
import com.clazzbuddy.mongocollections.UserGroup;
import com.clazzbuddy.mongocollections.UserGroupMembers;
import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.restmodel.PostSearchResult;

@Component
public class EventService {

	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserGroupService userGroupService;
	
	public Event createEvent(Event event) throws Exception
	{
		Users user = (Users) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal();
		event.setUserId(user.getEmail());
		event.setUserName(user.getName());
		Date current = new Date();
		event.setPostedDate(current);
		
		List<String> groupInvitesUserNames = new ArrayList<String>();
		List<String> groupInvitesUserIds = new ArrayList<String>();
		if (event.getGroupId() != null) {
			UserGroup userGroup = userGroupService.getUserGroupById(event.getGroupId());
			if (userGroup == null) {
				throw new Exception("Invalid group id");
			}
			
			event.setGroupName(userGroup.getGroupName());
			
			if (userGroup.getUserGroupMembers() != null) {
				for (UserGroupMembers groupMembers :userGroup.getUserGroupMembers()) {
					groupInvitesUserIds.add(groupMembers.get_id());
					groupInvitesUserNames.add(groupMembers.getName());
				}
			}
			event.setEventInvities(groupInvitesUserNames);
		} else {
			groupInvitesUserIds = event.getEventInvities();
			
		}
		Event eventFromDB = mongoTemplate.insert(event);
		
		
		for (String invites : groupInvitesUserIds) {
			EventInvites eventInvite = new EventInvites();
			Users invitedUser = userService.getUserDetails(invites);
			eventInvite.setEvent(eventFromDB);
			eventInvite.setUserId(invitedUser.get_id());
			eventInvite.setUserName(invites);
			mongoTemplate.insert(eventInvite);
			
		}
		
		return eventFromDB;
		
		
		
		
		
	}
	
	public void deletePost(String eventId) {
		ObjectId objID = new ObjectId(eventId);
		Query eventById = new Query();
		eventById.addCriteria(Criteria.where("_id").is(objID));
		Event event = mongoTemplate.findOne(eventById, Event.class);
		if (event == null) {
			return;
		}
		
		mongoTemplate.remove(event);
	}
	
	public Event getEvent(String eventId) {
		ObjectId objID = new ObjectId(eventId);
		Query eventById = new Query();
		eventById.addCriteria(Criteria.where("_id").is(objID));
		return mongoTemplate.findOne(eventById, Event.class);
	}
	
	public List<EventInvites> getEventForUser(String userId) {
		Query eventListQuery = new Query();
		eventListQuery.addCriteria(Criteria.where("userId").is(userId));
		return mongoTemplate.find(eventListQuery, EventInvites.class);
	}
}
