package com.clazzbuddy.restmodel;

import java.util.List;

import com.clazzbuddy.mongocollections.Users;

public class UserResult extends CommonResult{

	private List<Users> user;

	public List<Users> getUser() {
		return user;
	}

	public void setUser(List<Users> user) {
		this.user = user;
	}
}
