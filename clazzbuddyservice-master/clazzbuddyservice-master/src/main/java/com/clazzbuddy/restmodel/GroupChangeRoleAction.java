package com.clazzbuddy.restmodel;

public class GroupChangeRoleAction {
	
	private String groupId;
	
	private String adminId;
	
	private String userId;
		
	private String newRole;
	
	private String oldRole;

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getNewRole() {
		return newRole;
	}

	public void setNewRole(String newRole) {
		this.newRole = newRole;
	}

	public String getOldRole() {
		return oldRole;
	}

	public void setOldRole(String oldRole) {
		this.oldRole = oldRole;
	}

	public String getAdminId() {
		return adminId;
	}

	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}
	
}
