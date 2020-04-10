package com.clazzbuddy.restmodel;

public class PostSearchQuery {

	private String keyword;

	private String groupId;

	private String catagoryId;

	private Boolean privateMessage;

	private String userId;

	private String lastseen;

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getLastseen() {
		return lastseen;
	}

	public void setLastseen(String lastseen) {
		this.lastseen = lastseen;
	}

	public Boolean getPrivateMessage() {
		return privateMessage;
	}

	public void setPrivateMessage(Boolean privateMessage) {
		this.privateMessage = privateMessage;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getCatagoryId() {
		return catagoryId;
	}

	public void setCatagoryId(String catagoryId) {
		this.catagoryId = catagoryId;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

}
