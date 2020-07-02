package com.clazzbuddy.restmodel;

import java.util.List;

import com.clazzbuddy.mongocollections.Users;

public class UserResult extends CommonResult {

	private Users user;
	
	private List<Users> users;

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public List<Users> getUsers() {
		return users;
	}

	public void setUsers(List<Users> users) {
		this.users = users;
	}

}
