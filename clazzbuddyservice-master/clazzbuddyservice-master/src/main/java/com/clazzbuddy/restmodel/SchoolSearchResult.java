package com.clazzbuddy.restmodel;

import java.util.List;

import com.clazzbuddy.mongocollections.School;

public class SchoolSearchResult extends CommonResult{

	private List<School> schoolMatches;

	public List<School> getSchoolMatches() {
		return schoolMatches;
	}

	public void setSchoolMatches(List<School> schoolMatches) {
		this.schoolMatches = schoolMatches;
	}

	

	
	
}
