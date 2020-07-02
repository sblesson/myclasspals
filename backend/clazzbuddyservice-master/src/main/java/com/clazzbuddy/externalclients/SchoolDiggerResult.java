package com.clazzbuddy.externalclients;

import java.util.List;

import com.clazzbuddy.mongocollections.School;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SchoolDiggerResult {

	private List<School> schoolMatches;

	public List<School> getSchoolMatches() {
		return schoolMatches;
	}

	public void setSchoolMatches(List<School> schoolMatches) {
		this.schoolMatches = schoolMatches;
	}
}
