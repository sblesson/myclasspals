package com.clazzbuddy.mongocollections;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;

public class Event {
	
	@Id
	private String _id;
	
	private String start;

	
	private String end;
	
	private String title;
	
	private String desc;
	
	private String location;
	
	private Boolean allDay;
	
	private String userId;
	
	private String userName;
	
	private Date postedDate;
	
	private String groupId;
	
	private String groupName;
	
	private List<String> eventInvities;
	
 
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Date getPosedtDate() {
		return postedDate;
	}

	public void setPostedDate(Date postDate) {
		this.postedDate = postDate;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public List<String> getEventInvities() {
		return eventInvities;
	}

	public void setEventInvities(List<String> eventInvities) {
		this.eventInvities = eventInvities;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getEnd() {
		return end;
	}

	public void setEnd(String end) {
		this.end = end;
	}

	public Boolean getAllDay() {
		return allDay;
	}

	public void setAllDay(Boolean allDay) {
		this.allDay = allDay;
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

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	

}
