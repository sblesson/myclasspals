package com.clazzbuddy.restmodel;

import java.util.List;

import com.clazzbuddy.mongocollections.User;

public class UserResult extends CommonResult{

	private List<User> user;

	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}
}
