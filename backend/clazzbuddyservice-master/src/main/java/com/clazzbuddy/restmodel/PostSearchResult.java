package com.clazzbuddy.restmodel;

import java.util.List;

import com.clazzbuddy.mongocollections.Post;

public class PostSearchResult extends CommonResult{

	private long totalPostCount;
	private List<Post> post;

	public List<Post> getPost() {
		return post;
	}

	public void setPost(List<Post> post) {
		this.post = post;
	}

	public long getTotalPostCount() {
		return totalPostCount;
	}

	public void setTotalPostCount(long totalPostCount) {
		this.totalPostCount = totalPostCount - 1;
	}
}
