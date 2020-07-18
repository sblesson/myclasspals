package com.clazzbuddy.restmodel;

import java.util.Date;

public class PostSearchQuery {

	private String keyword;

	private String groupId;

	private String catagoryId;

	private Boolean isPrivate;

	private String userId;
	
	private Date dateFilterGreaterThan;
	
	private Date dateFilterLessThan;

	private String lastseen;
	
	private int resultSize;
	
	private int startIndex;
	
	private int endIndex;

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

	public Date getDateFilterLessThan() {
		return dateFilterLessThan;
	}

	public void setDateFilterLessThan(Date dateFilterLessThan) {
		this.dateFilterLessThan = dateFilterLessThan;
	}

	public Date getDateFilterGreaterThan() {
		return dateFilterGreaterThan;
	}

	public void setDateFilterGreaterThan(Date dateFilterGreaterThan) {
		this.dateFilterGreaterThan = dateFilterGreaterThan;
	}

	public Boolean getIsPrivate() {
		return isPrivate;
	}

	public void setIsPrivate(Boolean isPrivate) {
		this.isPrivate = isPrivate;
	}

	public int getResultSize() {
		return resultSize;
	}

	public void setResultSize(int resultSize) {
		this.resultSize = resultSize;
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getEndIndex() {
		return endIndex;
	}

	public void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}

}
