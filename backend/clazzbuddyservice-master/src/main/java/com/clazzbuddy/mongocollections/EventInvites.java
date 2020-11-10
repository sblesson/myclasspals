package com.clazzbuddy.mongocollections;

import org.springframework.data.mongodb.core.mapping.DBRef;

public class EventInvites {

	private String userId;
	
	private String userName;
	
	@DBRef
	private Event event;
	
	
	private Boolean rsvp;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public Boolean getRsvp() {
		return rsvp;
	}

	public void setRsvp(Boolean rsvp) {
		this.rsvp = rsvp;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}
