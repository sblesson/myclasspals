package com.clazzbuddy.mongocollections;

public class GroupInvitations {

	
	private String groupId;
	
	private String requestorUserId;
	
	private String invitedUserId;
	
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	
	
}
