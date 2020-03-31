package com.clazzbuddy.restmodel;

import java.util.List;

import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.mongocollections.UserGroup;

public class UserGroupResult extends CommonResult{

	private List<UserGroup> userGroupList;
	
	private UserGroup userGroup;

	public List<UserGroup> getUserGroupList() {
		return userGroupList;
	}

	public void setUserGroupList(List<UserGroup> userGroupList) {
		this.userGroupList = userGroupList;
	}

	public UserGroup getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(UserGroup userGroup) {
		this.userGroup = userGroup;
	}

}
