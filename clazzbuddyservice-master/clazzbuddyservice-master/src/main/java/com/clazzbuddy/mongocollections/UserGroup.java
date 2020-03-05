package com.clazzbuddy.mongocollections;

import org.springframework.data.annotation.Id;

public class UserGroup {

	@Id
	private String id;

	private String groupName;


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
}
