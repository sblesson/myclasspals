package com.clazzbuddy.service;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

	public Post createPost(Post post) {
		Date current = new Date();
		post.setPostedDate(current);
		return mongoTemplate.insert(post);
	}

	public List<Post> searchPost(PostSearchQuery postSearchQuery) {

		Query postListQuery = new Query();
		if (postSearchQuery.getKeyword() != null) {
			postListQuery.addCriteria(Criteria.where("message").regex(postSearchQuery.getKeyword().toLowerCase(), "i"));
		}

		if ((postSearchQuery.getPrivateMessage() != null) && (postSearchQuery.getPrivateMessage() == true)) {
			postListQuery.addCriteria(Criteria.where("endUserId").is(postSearchQuery.getUserId()));
		}
		if (postSearchQuery.getGroupId() != null) {
			postListQuery.addCriteria(Criteria.where("groupId").is(postSearchQuery.getGroupId()));
		}
		if (postSearchQuery.getCatagoryId() != null) {
			postListQuery.addCriteria(Criteria.where("catagoryId").is(postSearchQuery.getCatagoryId()));
		}
		if (postSearchQuery.getDateFilterGreaterThan() != null) {
			postListQuery.addCriteria(Criteria.where("postedDate").gte(postSearchQuery.getDateFilterGreaterThan()));
		}
		if (postSearchQuery.getDateFilterLessThan() != null) {
			postListQuery.addCriteria(Criteria.where("postedDate").lte(postSearchQuery.getDateFilterLessThan()));
		}
		if (postSearchQuery.getLastseen() != null) {
			ObjectId objID = new ObjectId(postSearchQuery.getLastseen());
			postListQuery.addCriteria(Criteria.where("_id").gt(objID));
		}

		postListQuery.with(new Sort(Sort.Direction.DESC, "_id"));
		postListQuery.limit(30);
		List<Post> posts = mongoTemplate.find(postListQuery, Post.class);
		return posts;

	}
}
