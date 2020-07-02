package com.clazzbuddy.restmodel;

public class UserGroupSearchFilter {

	private String groupKeyword;
	
	private String privacy;
	
	private String city;

	private String state;

	private String zipcode;
	
	private String schoolId;

	
	private String schoolName;
	
	private String schoolCity;
	
	private String schoolZipCode;

	public String getGroupKeyword() {
		return groupKeyword;
	}

	public void setGroupKeyword(String groupKeyword) {
		this.groupKeyword = groupKeyword;
	}

	public String getPrivacy() {
		return privacy;
	}

	public void setPrivacy(String privacy) {
		this.privacy = privacy;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public String getSchoolCity() {
		return schoolCity;
	}

	public void setSchoolCity(String schoolCity) {
		this.schoolCity = schoolCity;
	}

	public String getSchoolZipCode() {
		return schoolZipCode;
	}

	public void setSchoolZipCode(String schoolZipCode) {
		this.schoolZipCode = schoolZipCode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(String schoolId) {
		this.schoolId = schoolId;
	}
	
	
}
