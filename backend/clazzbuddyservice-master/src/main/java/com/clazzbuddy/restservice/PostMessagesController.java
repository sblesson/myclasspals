package com.clazzbuddy.restservice;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clazzbuddy.mongocollections.Post;
import com.clazzbuddy.restmodel.CommonResult;
import com.clazzbuddy.restmodel.PostResult;
import com.clazzbuddy.restmodel.PostSearchQuery;
import com.clazzbuddy.restmodel.PostSearchResult;
import com.clazzbuddy.restmodel.UserResult;
import com.clazzbuddy.service.PostMessageService;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "*")
public class PostMessagesController {

	Logger logger = LogManager.getLogger(PostMessagesController.class);
	@Autowired
	PostMessageService postService;

	@PostMapping(value="/createpost", produces={"application/json"})
	public CommonResult createPost(@RequestBody Post post) {
		PostResult result = new PostResult();
		
		try {
			result.setPost(postService.createPost(post));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("Error :", e);
		}
		
		return result;
		
	}
	

	@GetMapping(value="/getpost", produces={"application/json"})
	public CommonResult getUserDetailsx(@RequestParam(value = "id") String id) {
		PostResult result = new PostResult();
		
		try {
			result.setPost(postService.getPost(id));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		
		return result;
		
	}
	
	@PostMapping(value="/searchpost", produces={"application/json"})
	public CommonResult getPosts(@RequestBody PostSearchQuery postSearchQuery) {
		PostSearchResult result = null;
		
		try {
			result = postService.searchPost(postSearchQuery);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("Error :", e);
		}
		
		return result;
		
	}
	@PostMapping(value="/{postid}/addcomment", produces={"application/json"})
	public CommonResult addComment(@PathVariable("postid") String postid, @RequestBody Post post) {
		PostResult result = new PostResult();
		
		try {
			result.setPost(postService.addComment(postid, post));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("Error :", e);
		}
		
		return result;
		
		
		
	}
	
	@DeleteMapping(value="/deletepost/{postid}", produces={"application/json"})
	public CommonResult deletePost(@PathVariable("postid") String postid) {
		PostResult result = new PostResult();
		
		try {
			postService.deletePost(postid);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("Error :", e);
		}
		
		return result;
		
		
		
	}
}
