package com.clazzbuddy.mongocollections;

import org.springframework.data.annotation.Id;

public class UserGroup {

	@Id
	private String id;

	private String groupName;
	
	private Boolean userCreatedGroup;


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public Boolean getUserCreatedGroup() {
		return userCreatedGroup;
	}

	public void setUserCreatedGroup(Boolean userCreatedGroup) {
		this.userCreatedGroup = userCreatedGroup;
	}
}
