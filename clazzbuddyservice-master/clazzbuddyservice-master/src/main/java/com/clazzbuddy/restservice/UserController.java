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

import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.restmodel.CommonResult;
import com.clazzbuddy.restmodel.GroupInvitationAction;
import com.clazzbuddy.restmodel.UserResult;
import com.clazzbuddy.service.UserService;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

	Logger logger = LogManager.getLogger(UserController.class);

	@Autowired
	UserService userService;

	@PostMapping(value="/createuser", produces={"application/json"})
	public CommonResult createUser(@RequestBody Users user) {
		CommonResult result = new CommonResult();
		
		try {
			userService.createUser(user);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		
		return result;
		
	}
	
	@PutMapping(value="/updateuser", produces={"application/json"})
	public CommonResult updateuser(@RequestBody Users user) {
		CommonResult result = new CommonResult();
		
		try {
			userService.updateUser(user);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		
		return result;
		
	}
	
	@GetMapping(value="/getuserdetails", produces={"application/json"})
	public CommonResult getUserDetailsx(@RequestParam(value = "user") String userkey) {
		UserResult result = new UserResult();
		
		try {
			result.setUser(userService.getUserDetails(userkey));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		
		return result;
		
	}
	//basic user info
	@GetMapping(value="/getuser", produces={"application/json"})
	public CommonResult getUser(@RequestParam(value = "user") String userkey) {
		UserResult result = new UserResult();
		
		try {
			Users user = new Users();
			result.setUser(userService.getUserDetails(userkey));
			user.setEmail(user.getEmail());
			user.setName(user.getName());
			user.setCreatedDate(user.getCreatedDate());
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		
		return result;
		
	}
	
//	@PostMapping(value="/validateuser", produces={"application/json"})
//	public CommonResult validateProfile(@RequestBody Users user) {
//		UserResult result = new UserResult();
//		
//		try {
//			List<Users> userList = new ArrayList<>();
//			userList.add(userService.validateUser(user));
//			result.setUser(userList);
//			result.setErrorCode(0);
//		} catch (Exception e) {
//			result.setErrorCode(1);
//			result.setException(e.toString());
//			logger.error("error", e);
//		}
//		
//		return result;
//		
//	}
	
	@PostMapping(value="/requestusergroup", produces={"application/json"})
	public UserResult requestUserGroup(@RequestBody GroupInvitationAction groupInvitationAction) {
		
		
		UserResult result  = new UserResult();
		try {
			result.setUser(userService.requestToJoinUserGroup(groupInvitationAction));
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		return result;
	}
	
	@PostMapping(value="/invitetousergroup", produces={"application/json"})
	public CommonResult inviteToUserGroup(@RequestBody GroupInvitationAction groupInvitationAction) {
		CommonResult result  = new CommonResult();
		try {
			if (groupInvitationAction.getInvitedUsers() != null) {
				String[] emailAddresses = groupInvitationAction.getInvitedUsers().split(",");
				for (int count=0; count<emailAddresses.length ;count++) {
					GroupInvitationAction newGroupInvitationAction = new GroupInvitationAction();
					newGroupInvitationAction.setGroupId(groupInvitationAction.getGroupId());
					newGroupInvitationAction.setInvitedUserId(emailAddresses[count]);
					newGroupInvitationAction.setRole(groupInvitationAction.getRole());
					userService.inviteToJoinUserGroup(newGroupInvitationAction);
				}
			} else {
				userService.inviteToJoinUserGroup(groupInvitationAction);
			}
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		return result;
	}
	
	@PostMapping(value="/acceptusergroupinvitaion", produces={"application/json"})
	public CommonResult acceptGroupInvitation(@RequestBody GroupInvitationAction groupInvitationAction) {
		UserResult result  = new UserResult();
		try {
			result.setUser(userService.acceptGroupInvitation(groupInvitationAction));
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		return result;
	}
	
	@PostMapping(value="/acceptusergrouprequest", produces={"application/json"})
	public CommonResult acceptGroupRquest(@RequestBody GroupInvitationAction groupInvitationAction) {
		CommonResult result  = new CommonResult();
		try {
			userService.acceptGroupRequest(groupInvitationAction);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		return result;
	}
	
	
	
}
