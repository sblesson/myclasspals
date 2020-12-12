package com.clazzbuddy.mongocollections;

import org.springframework.data.annotation.Id;

public class School {
	
	@Id
	private String _id;

	private String schoolid;
	
	private String schoolName;
	
	private String city;
	
	private String state;
	
	private String zip;
	
	private String schoolLevel;
	
	private String lowGrade;
	
	private String highGrade;
	
	private float latitude;
	
	private float longitude;
	
	private Boolean hasBoundary;
	
	private Integer rank;
	
	private Integer rankOf;
	
	private Integer rankStars;
	
	private String schoolSerachKey;

	public String getSchoolid() {
		return schoolid;
	}

	public void setSchoolid(String schoolid) {
		this.schoolid = schoolid;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
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

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getSchoolLevel() {
		return schoolLevel;
	}

	public void setSchoolLevel(String schoolLevel) {
		this.schoolLevel = schoolLevel;
	}

	public String getLowGrade() {
		return lowGrade;
	}

	public void setLowGrade(String lowGrade) {
		this.lowGrade = lowGrade;
	}

	public String getHighGrade() {
		return highGrade;
	}

	public void setHighGrade(String highGrade) {
		this.highGrade = highGrade;
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public Boolean getHasBoundary() {
		return hasBoundary;
	}

	public void setHasBoundary(Boolean hasBoundary) {
		this.hasBoundary = hasBoundary;
	}

	public Integer getRank() {
		return rank;
	}

	public void setRank(Integer rank) {
		this.rank = rank;
	}

	public Integer getRankOf() {
		return rankOf;
	}

	public void setRankOf(Integer rankOf) {
		this.rankOf = rankOf;
	}

	public Integer getRankStars() {
		return rankStars;
	}

	public void setRankStars(Integer rankStars) {
		this.rankStars = rankStars;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getSchoolSerachKey() {
		return schoolSerachKey;
	}

	public void setSchoolSerachKey(String schoolSerachKey) {
		this.schoolSerachKey = schoolSerachKey;
	}

	
	
	
	


	
	
	
}
