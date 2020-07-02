package com.clazzbuddy.restmodel;

public class GroupInvitationAction {

	private String groupId;
	
	private String requestorUserId;
	
	private String invitedUserId;
	
	private String action;
	
	private String invitedUsers;
	
	private String role;

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getRequestorUserId() {
		return requestorUserId;
	}

	public void setRequestorUserId(String requestorUserId) {
		this.requestorUserId = requestorUserId;
	}

	public String getInvitedUserId() {
		return invitedUserId;
	}

	public void setInvitedUserId(String invitedUserId) {
		this.invitedUserId = invitedUserId;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getInvitedUsers() {
		return invitedUsers;
	}

	public void setInvitedUsers(String invitedUsers) {
		this.invitedUsers = invitedUsers;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}


	
	
}
