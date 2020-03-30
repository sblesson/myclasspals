package com.clazzbuddy.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.Post;
import com.clazzbuddy.restmodel.PostSearchQuery;

@Component
public class PostMessageService {

	@Autowired
	MongoTemplate mongoTemplate;

	public void createPost(Post post) {
		mongoTemplate.insert(post);
	}

	public List<Post> searchPost(PostSearchQuery postSearchQuery) {

		Query postListQuery = new Query();
		if (postSearchQuery.getKeyword() != null) {
			postListQuery.addCriteria(Criteria.where("message").regex(postSearchQuery.getKeyword().toLowerCase(), "i"));
		}

		postListQuery.addCriteria(Criteria.where("groupId").is(postSearchQuery.getGroupid()));

		if (postSearchQuery.getLastseen() != null) {
			ObjectId objID = new ObjectId(postSearchQuery.getLastseen());
			postListQuery.addCriteria(Criteria.where("_id").gt(objID));
		}
		postListQuery.limit(10);
		List<Post> posts = mongoTemplate.find(postListQuery, Post.class);
		return posts;

	}
}
