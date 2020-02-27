package com.clazzbuddy.restservice;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clazzbuddy.mongocollections.Post;
import com.clazzbuddy.mongocollections.User;
import com.clazzbuddy.restmodel.CommonResult;
import com.clazzbuddy.restmodel.PostSearchQuery;
import com.clazzbuddy.restmodel.PostSearchResult;
import com.clazzbuddy.restmodel.UserResult;
import com.clazzbuddy.service.PostMessageService;
import com.clazzbuddy.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping(value="/createprofile", produces={"application/json"})
	public CommonResult createProfile(@RequestBody User user) {
		CommonResult result = new CommonResult();
		
		try {
			userService.createUser(user);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.getMessage());
		}
		
		return result;
		
	}
	
	@PutMapping(value="/updateprofile", produces={"application/json"})
	public CommonResult updateProfile(@RequestBody User user) {
		CommonResult result = new CommonResult();
		
		try {
			userService.updateUser(user);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.getMessage());
		}
		
		return result;
		
	}
	
	@GetMapping(value="/getuser", produces={"application/json"})
	public CommonResult getUser(@RequestParam(value = "user") String username) {
		UserResult result = new UserResult();
		
		try {
			List<User> userList = new ArrayList<>();
			userList.add(userService.getUser(username));
 			result.setUser(userList);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.getMessage());
		}
		
		return result;
		
	}
}
