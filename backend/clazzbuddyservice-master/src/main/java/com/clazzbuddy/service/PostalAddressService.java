package com.clazzbuddy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.PostalAddress;

@Component
public class PostalAddressService {

	@Autowired
	MongoTemplate mongoTemplate;

	public List<PostalAddress> getCityStartingWithLetters(String searchKey) throws Exception {

		Query postalAddressSearchQuery = new Query();
		postalAddressSearchQuery.addCriteria(Criteria.where("city").regex("^" + searchKey.toLowerCase(), "i"));
		List<PostalAddress> addresses = mongoTemplate.find(postalAddressSearchQuery, PostalAddress.class);
		return addresses;

	}
}
