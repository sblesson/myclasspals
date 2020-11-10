package com.clazzbuddy.restmodel;

import java.util.List;

public class UserEvent {
	
	private String start;
	
	private String end;
	
	private String title;
	
	private String desc;
	
	private String location;
	
	private String groupName;
	
	private List<String> eventInvities;
	
	
	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getEnd() {
		return end;
	}

	public void setEnd(String end) {
		this.end = end;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Boolean getAllDay() {
		return allDay;
	}

	public void setAllDay(Boolean allDay) {
		this.allDay = allDay;
	}

	public List<String> getEventInvities() {
		return eventInvities;
	}

	public void setEventInvities(List<String> eventInvities) {
		this.eventInvities = eventInvities;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	private Boolean allDay;

}
