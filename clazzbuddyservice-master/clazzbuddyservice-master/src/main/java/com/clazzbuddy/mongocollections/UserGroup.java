package com.clazzbuddy.mongocollections;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class UserGroup {

	@Id
	private String id;

	private String groupName;
	
	private String description;

	
	private String privacy;
	
	private String hidden;
	
	private UserGroupMembers createrUserId;
	
	private List<UserGroupMembers> adminUserIds;
	
	private List<UserGroupMembers> userGroupMembers;
	
	private List<GroupInvitations> pendingInvitations;
	
	private List<GroupInvitations> requestedInvitations;
	
	private String isSchoolGroup;

	private String schoolName;
	
	private String schoolAddress;
	
	private String schoolCity;
	
	private String schoolZipCode;
	
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

	public List<UserGroupMembers> getAdminUserIds() {
		return adminUserIds;
	}

	public void setAdminUserIds(List<UserGroupMembers> adminUserIds) {
		this.adminUserIds = adminUserIds;
	}

	public UserGroupMembers getCreaterUserId() {
		return createrUserId;
	}

	public void setCreaterUserId(UserGroupMembers createrUserId) {
		this.createrUserId = createrUserId;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public String getSchoolAddress() {
		return schoolAddress;
	}

	public void setSchoolAddress(String schoolAddress) {
		this.schoolAddress = schoolAddress;
	}

	public String getIsSchoolGroup() {
		return isSchoolGroup;
	}

	public void setIsSchoolGroup(String isSchoolGroup) {
		this.isSchoolGroup = isSchoolGroup;
	}

	public String getSchoolZipCode() {
		return schoolZipCode;
	}

	public void setSchoolZipCode(String schoolZipCode) {
		this.schoolZipCode = schoolZipCode;
	}

	public String getSchoolCity() {
		return schoolCity;
	}

	public void setSchoolCity(String schoolCity) {
		this.schoolCity = schoolCity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
}
