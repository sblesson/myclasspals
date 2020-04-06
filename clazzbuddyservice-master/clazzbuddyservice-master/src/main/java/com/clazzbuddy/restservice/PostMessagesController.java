package com.clazzbuddy.restservice;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clazzbuddy.mongocollections.Post;
import com.clazzbuddy.restmodel.CommonResult;
import com.clazzbuddy.restmodel.PostSearchQuery;
import com.clazzbuddy.restmodel.PostSearchResult;
import com.clazzbuddy.service.PostMessageService;

@RestController
@RequestMapping("/postmessage")
@CrossOrigin(origins = "*")
public class PostMessagesController {

	Logger logger = LogManager.getLogger(PostMessagesController.class);
	@Autowired
	PostMessageService postService;

	@PostMapping(value="/createpost", produces={"application/json"})
	public CommonResult createPost(@RequestBody Post post) {
		CommonResult result = new CommonResult();
		
		try {
			postService.createPost(post);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("Error :", e);
		}
		
		return result;
		
	}
	
	@PostMapping(value="/searchpost", produces={"application/json"})
	public CommonResult getPosts(@RequestBody PostSearchQuery postSearchQuery) {
		PostSearchResult result = new PostSearchResult();
		
		try {
			result.setPost(postService.searchPost(postSearchQuery));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("Error :", e);
		}
		
		return result;
		
	}
}
