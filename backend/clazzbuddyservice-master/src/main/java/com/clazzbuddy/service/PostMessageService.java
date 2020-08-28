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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.Post;
import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.restmodel.PostSearchQuery;
import com.clazzbuddy.restmodel.PostSearchResult;

@Component
public class PostMessageService {

	@Autowired
	MongoTemplate mongoTemplate;

	public Post createPost(Post post) {
		Users user = (Users) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal();
		post.setUserId(user.getEmail());
		post.setUserName(user.getName());
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
		Users user = (Users) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal();
		post.setUserId(user.getEmail());
		post.setUserName(user.getName());
		
		mongoTemplate.insert(post);
		if (parentPost.getComments() == null) {
			parentPost.setComments(new ArrayList<Post>());
		}
		parentPost.getComments().add(post);
		return mongoTemplate.save(parentPost);
	}

	public void deletePost(String postId) {
		ObjectId objID = new ObjectId(postId);
		Query postById = new Query();
		postById.addCriteria(Criteria.where("_id").is(objID));
		Post post = mongoTemplate.findOne(postById, Post.class);
		if (post == null) {
			return;
		}
		if (post.getComments() != null) {
			for (Post comment: post.getComments()) {
				mongoTemplate.remove(comment);
			}
		}
		mongoTemplate.remove(post);
	}
	
	public Post getPost(String postId) {
		ObjectId objID = new ObjectId(postId);
		Query postById = new Query();
		postById.addCriteria(Criteria.where("_id").is(objID));
		return mongoTemplate.findOne(postById, Post.class);
	}

	public PostSearchResult searchPost(PostSearchQuery postSearchQuery) {

		PostSearchResult postSearchResult= new PostSearchResult();
		Query postListQuery = new Query();
		if (postSearchQuery.getKeyword() != null) {
			postListQuery.addCriteria(new Criteria()
			        .orOperator(
			                Criteria.where("message").regex(postSearchQuery.getKeyword(), "i"),
			                Criteria.where("subject").regex(postSearchQuery.getKeyword(), "i")
			            ) );
			
		}
		Users user = (Users) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal();
		if ((postSearchQuery.getIsPrivate() != null) && (postSearchQuery.getIsPrivate() == true)) {
			postListQuery.addCriteria(new Criteria()
			        .orOperator(
			                Criteria.where("endUserId").is(user.getEmail()),
			                Criteria.where("userId").is(user.getEmail())
			            ) );
		}
		if (postSearchQuery.getGroupId() != null) {
			postListQuery.addCriteria(Criteria.where("groupId").is(postSearchQuery.getGroupId()));
		}
		if (postSearchQuery.getCatagoryId() != null) {
			postListQuery.addCriteria(Criteria.where("catagoryId").is(postSearchQuery.getCatagoryId()));
		}
		if (postSearchQuery.getDateFilterGreaterThan() != null && postSearchQuery.getDateFilterLessThan() != null) {
			postListQuery.addCriteria(new Criteria().andOperator(
					Criteria.where("postedDate").gte(postSearchQuery.getDateFilterGreaterThan()),
					Criteria.where("postedDate").lte(postSearchQuery.getDateFilterLessThan())));
		} else if (postSearchQuery.getDateFilterGreaterThan() != null) {
			postListQuery.addCriteria(Criteria.where("postedDate").gte(postSearchQuery.getDateFilterGreaterThan()));
		} else if (postSearchQuery.getDateFilterLessThan() != null) {
			postListQuery.addCriteria(Criteria.where("postedDate").lte(postSearchQuery.getDateFilterLessThan()));
		}
		if (postSearchQuery.getLastseen() != null) {
			ObjectId objID = new ObjectId(postSearchQuery.getLastseen());
			postListQuery.addCriteria(Criteria.where("_id").lt(objID));
		}
		if (postSearchQuery.getIsPrivate() != null) {
			postListQuery.addCriteria(Criteria.where("isPrivate").is(postSearchQuery.getIsPrivate()));
		} else {
			postListQuery.addCriteria(Criteria.where("isPrivate").is(false));
		}
		postListQuery.addCriteria(Criteria.where("isComment").ne(true));

		postListQuery.with(new Sort(Sort.Direction.DESC, "_id"));
		if (postSearchQuery.getResultSize() > 0) {
			postListQuery.limit(postSearchQuery.getResultSize());
		}
		
		if (postSearchQuery.getStartIndex() > 0) {
			postListQuery.skip(postSearchQuery.getStartIndex());
		}
		
		if (postSearchQuery.getEndIndex() > 0) {
			postListQuery.limit(postSearchQuery.getEndIndex() - postSearchQuery.getStartIndex());
		}
		List<Post> posts = mongoTemplate.find(postListQuery, Post.class);
		postSearchResult.setPost(posts);
		postSearchResult.setTotalPostCount(mongoTemplate.count(postListQuery, Post.class)); 
		return postSearchResult;

	}
}
