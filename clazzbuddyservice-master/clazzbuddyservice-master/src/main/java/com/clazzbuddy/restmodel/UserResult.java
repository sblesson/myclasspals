package com.clazzbuddy.restmodel;

import com.clazzbuddy.mongocollections.Users;

public class UserResult extends CommonResult {

	private Users user;

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

}
