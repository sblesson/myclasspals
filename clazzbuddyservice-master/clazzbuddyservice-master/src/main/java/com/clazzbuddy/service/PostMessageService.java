package com.clazzbuddy.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
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
		if (post.getIsPrivate() == null) {
			post.setIsPrivate(false);
		}
		return mongoTemplate.insert(post);
	}

	public Post addComment(String postId, Post post) throws Exception {
		Post parentPost = getPost(postId);
		if (parentPost == null) {
			throw new Exception("Post is not valid" + postId);
		}
		Date current = new Date();
		post.setPostedDate(current);
		post.setIsComment(true);
		mongoTemplate.insert(post);
		if (parentPost.getComments() == null) {
			parentPost.setComments(new ArrayList<Post>());
		}
		parentPost.getComments().add(post);
		return mongoTemplate.save(parentPost);
	}

	public Post getPost(String postId) {
		ObjectId objID = new ObjectId(postId);
		Query postById = new Query();
		postById.addCriteria(Criteria.where("_id").is(objID));
		return mongoTemplate.findOne(postById, Post.class);
	}

	public List<Post> searchPost(PostSearchQuery postSearchQuery) {

		Query postListQuery = new Query();
		if (postSearchQuery.getKeyword() != null) {
			postListQuery.addCriteria(Criteria.where("message").regex(postSearchQuery.getKeyword().toLowerCase()));
		}

		if ((postSearchQuery.getIsPrivate() != null) && (postSearchQuery.getIsPrivate() == true)) {
			postListQuery.addCriteria(new Criteria()
			        .orOperator(
			                Criteria.where("endUserId").is(postSearchQuery.getUserId()),
			                Criteria.where("userId").is(postSearchQuery.getUserId())
			            ) );
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
		if (postSearchQuery.getIsPrivate() != null) {
			postListQuery.addCriteria(Criteria.where("isPrivate").is(postSearchQuery.getIsPrivate()));
		} else {
			postListQuery.addCriteria(Criteria.where("isPrivate").is(false));
		}
		postListQuery.addCriteria(Criteria.where("isComment").ne(true));

		postListQuery.with(new Sort(Sort.Direction.DESC, "_id"));
		postListQuery.limit(30);
		List<Post> posts = mongoTemplate.find(postListQuery, Post.class);
		return posts;

	}
}
