package com.clazzbuddy.mongocollections;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Users {

	@Id
	private String _id;
	
	private String name;
	
	private String password;
	
	private Date createdDate;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	private String email;

	private String phone;

	private String street;

	private String suite;

	private String city;

	private String state;

	private String zipcode;
	
	@DBRef
	private List<School> schools;
	
	@DBRef
	private List<UserGroup> userGroup;
	
	@DBRef
	private List<UserGroup> pendingInvitedUserGroups;
	
	@DBRef
	private List<UserGroup> requestedUserGroup;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getSuite() {
		return suite;
	}

	public void setSuite(String suite) {
		this.suite = suite;
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


	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public List<UserGroup> getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(List<UserGroup> userGroup) {
		this.userGroup = userGroup;
	}

	public List<UserGroup> getPendingInvitedUserGroups() {
		return pendingInvitedUserGroups;
	}

	public void setPendingInvitedUserGroups(List<UserGroup> pendingInvitedUserGroups) {
		this.pendingInvitedUserGroups = pendingInvitedUserGroups;
	}

	public List<UserGroup> getRequestedUserGroup() {
		return requestedUserGroup;
	}

	public void setRequestedUserGroup(List<UserGroup> requestedUserGroup) {
		this.requestedUserGroup = requestedUserGroup;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public List<School> getSchools() {
		return schools;
	}

	public void setSchools(List<School> schools) {
		this.schools = schools;
	}

	
}
