package com.clazzbuddy.restmodel;

import java.util.List;

import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.mongocollections.UserGroup;

public class UserGroupResult extends CommonResult{

	private List<UserGroup> userGroup;

	public List<UserGroup> getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(List<UserGroup> userGroup) {
		this.userGroup = userGroup;
	}


}
