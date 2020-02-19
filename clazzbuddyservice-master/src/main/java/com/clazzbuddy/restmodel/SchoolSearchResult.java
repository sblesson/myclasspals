package com.clazzbuddy.restmodel;

import java.util.List;

import com.clazzbuddy.mongocollections.School;

public class SchoolSearchResult extends CommonResult{

	private List<School> schoolSearchResult;

	public List<School> getSchoolSearchResult() {
		return schoolSearchResult;
	}

	public void setSchoolSearchResult(List<School> schoolSearchResult) {
		this.schoolSearchResult = schoolSearchResult;
	}

	
	
}
