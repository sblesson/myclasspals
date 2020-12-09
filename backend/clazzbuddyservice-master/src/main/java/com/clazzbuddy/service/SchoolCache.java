package com.clazzbuddy.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import com.clazzbuddy.externalclients.SchoolDiggerClient;
import com.clazzbuddy.mongocollections.School;
import com.clazzbuddy.mongocollections.SchoolSearches;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

@Component
public class SchoolCache {

	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	SchoolDiggerClient schoolDiggerClient;
	
	public List<School> getSchoolStartingWithLetters(String searchKey) throws Exception {
		Query schoolSearchQuery = new Query();
		schoolSearchQuery.addCriteria(Criteria.where("key").is(searchKey));
		
		SchoolSearches schoolSearch = mongoTemplate.findOne(schoolSearchQuery, SchoolSearches.class);
		
		if (schoolSearch  != null) {
			Query schoolListQuery = new Query();
			schoolListQuery.addCriteria(Criteria.where("schoolSerachKey").is(searchKey.toLowerCase()));			
			List<School> schools = mongoTemplate.find(schoolListQuery, School.class);
			return schools;
		} else {
			List<School> schools = schoolDiggerClient.getSchoolList(searchKey);
			schoolSearch = new SchoolSearches();
			schoolSearch.setKey(searchKey);
			schoolSearch.setLastModified(new Date());
			for (School school : schools) {
				Query schoolByID = new Query();
				schoolByID.addCriteria(Criteria.where("schoolid").is(school.getSchoolid()));
				if (mongoTemplate.findOne(schoolByID, School.class) == null) {
					school.setSchoolSerachKey(searchKey);
					mongoTemplate.insert(school);
				}
			}
			
			mongoTemplate.insert(schoolSearch);
			return schools;
		}
		
		
	}
	public School getSchoolBySchoolId(String id) throws Exception {
		Query schoolQuery = new Query();
		schoolQuery.addCriteria(Criteria.where("schoolid").is(id));
		
		return mongoTemplate.findOne(schoolQuery, School.class);
		
	}
}
