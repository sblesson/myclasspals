package com.clazzbuddy.mongocollections;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class UserGroup {

	@Id
	private String id;

	private String groupName;
	
	private String privacy;
	
	private String hidden;
	
	private String createrUserId;
	
	private List<String> adminUserIds;
	
	@DBRef
	private List<UserGroupMembers> userGroupMembers;
	
	private List<GroupInvitations> pendingInvitations;
	
	private List<GroupInvitations> requestedInvitations;

	public List<UserGroupMembers> getUserGroupMembers() {
		return userGroupMembers;
	}

	public void setUserGroupMembers(List<UserGroupMembers> userGroupMembers) {
		this.userGroupMembers = userGroupMembers;
	}

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

	public String getPrivacy() {
		return privacy;
	}

	public void setPrivacy(String privacy) {
		this.privacy = privacy;
	}

	public String getHidden() {
		return hidden;
	}

	public void setHidden(String hidden) {
		this.hidden = hidden;
	}

	public String getCreaterUserId() {
		return createrUserId;
	}

	public void setCreaterUserId(String createrUserId) {
		this.createrUserId = createrUserId;
	}

	public List<String> getAdminUserIds() {
		return adminUserIds;
	}

	public void setAdminUserIds(List<String> adminUserIds) {
		this.adminUserIds = adminUserIds;
	}

	public List<GroupInvitations> getPendingInvitations() {
		return pendingInvitations;
	}

	public void setPendingInvitations(List<GroupInvitations> pendingInvitations) {
		this.pendingInvitations = pendingInvitations;
	}

	public List<GroupInvitations> getRequestedInvitations() {
		return requestedInvitations;
	}

	public void setRequestedInvitations(List<GroupInvitations> requestedInvitations) {
		this.requestedInvitations = requestedInvitations;
	}

	
}
