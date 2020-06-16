package com.clazzbuddy.mongocollections;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;

import com.clazzbuddy.utils.Constants;

public class UserGroup {

	@Id
	private String id;

	private String groupName;
	
	private String description;

	
	private String privacy;
	
	private String hidden;
	
	private String groupRules;
	private String aboutGroup;

	
	
	private List<GroupInvitations> pendingInvitations;
	
	private List<GroupInvitations> requestedInvitations;
	
	private String isSchoolGroup;

	private String schoolName;
	
	private String schoolId;
	
	private String grade;

	
	private String schoolState;
	
	private String schoolCity;
	
	private String schoolZipCode;
	
	private String createdDate;
	
	@Transient
	private String role;
	
	public String getRole() {
		return role;
	}
	
	public void initializeRole(String currentUserId, String emailId) {
		if (userGroupMembers != null) {
			for (UserGroupMembers group : userGroupMembers) {
				if (group.get_id() != null && (group.get_id().equals(currentUserId))) {
					role = group.getRole();
					return;
				}
				
			}
		}
		if (pendingInvitations != null) {
			for (GroupInvitations group : pendingInvitations) {
				if (group.getRequestorUserId() != null && group.getRequestorUserId().equals(currentUserId)) {
					role = Constants.PENDING_INVITATION;
					return;
				}
			}
		}
		if (requestedInvitations != null) {
			for (GroupInvitations group : requestedInvitations) {
				if (group.getInvitedUserId() != null && (group.getInvitedUserId().equals(currentUserId)
						|| group.getInvitedUserId().equals(emailId))) {
					role = Constants.REQUESTED_INVITATION;
					return;
				}
			}
		}
	}
	 
	private List<UserGroupMembers> userGroupMembers;
	
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


	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
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

	public String getSchoolState() {
		return schoolState;
	}

	public void setSchoolState(String schoolState) {
		this.schoolState = schoolState;
	}

	public String getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(String schoolId) {
		this.schoolId = schoolId;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getAboutGroup() {
		return aboutGroup;
	}

	public void setAboutGroup(String aboutGroup) {
		this.aboutGroup = aboutGroup;
	}

	public String getGroupRules() {
		return groupRules;
	}

	public void setGroupRules(String groupRules) {
		this.groupRules = groupRules;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	
}
