package com.clazzbuddy.restmodel;

import java.util.List;

import com.clazzbuddy.mongocollections.Users;

public class UserEventResult extends CommonResult {


	
	private List<UserEvent> events;

	public List<UserEvent> getEvents() {
		return events;
	}

	public void setEvents(List<UserEvent> events) {
		this.events = events;
	}

	

	
}
