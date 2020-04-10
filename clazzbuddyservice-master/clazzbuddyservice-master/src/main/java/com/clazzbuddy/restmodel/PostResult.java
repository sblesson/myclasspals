package com.clazzbuddy.restmodel;

import com.clazzbuddy.mongocollections.Post;

public class PostResult extends CommonResult{
	
	private Post post;

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

}
