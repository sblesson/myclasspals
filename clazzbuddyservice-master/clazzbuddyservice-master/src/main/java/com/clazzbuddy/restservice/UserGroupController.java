package com.clazzbuddy.restservice;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.mongocollections.UserGroup;
import com.clazzbuddy.restmodel.CommonResult;
import com.clazzbuddy.restmodel.GroupChangeRoleAction;
import com.clazzbuddy.restmodel.UserGroupResult;
import com.clazzbuddy.restmodel.UserGroupSearchFilter;
import com.clazzbuddy.service.UserGroupService;
import com.clazzbuddy.service.UserService;

@ComponentScan(basePackages = "com.clazzbuddy")

@RestController
@RequestMapping("/usergroup")
@CrossOrigin(origins = "*")
public class UserGroupController {

	Logger logger = LogManager.getLogger(UserGroupController.class);
	
	@Autowired
	UserGroupService userGroupService;


	@PostMapping(value = "/creategroup", produces = { "application/json" })
	public CommonResult createGroup(@RequestBody UserGroup userGroup) {
		UserGroupResult result = new UserGroupResult();

		try {
			result.setUserGroup(userGroupService.createUserGroup(userGroup));
			
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error : ", e);
		}

		return result;

	}

	@PutMapping(value = "/updategroup", produces = { "application/json" })
	public CommonResult updateGroup(@RequestBody UserGroup userGroup) {
		UserGroupResult result = new UserGroupResult();

		try {
			result.setUserGroup(userGroupService.updateUserGroup(userGroup));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error : ", e);
		}

		return result;

	}

	@GetMapping(value = "/getgroup", produces = { "application/json" })
	public CommonResult getGroupById(@RequestParam(value = "id") String id) {
		UserGroupResult result = new UserGroupResult();

		try {
			List<UserGroup> userGroupList = new ArrayList<>();
			userGroupList.add(userGroupService.getUserGroupById(id));
			result.setUserGroupList(userGroupList);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error : ", e);
		}

		return result;

	}
	
	@PostMapping(value = "/getgroupbyfilter", produces = { "application/json" })
	public CommonResult getGroupByFilter(@RequestBody UserGroupSearchFilter searchFilter) {
		UserGroupResult result = new UserGroupResult();

		try {
			result.setUserGroupList(userGroupService.getUserGroupBySerachFilter(searchFilter));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error : ", e);
		}

		return result;

	}
	@PostMapping(value = "/changeuserrole", produces = { "application/json" })
	public CommonResult changeUserRole(@RequestBody GroupChangeRoleAction changeRoleAction) {
	
		UserGroupResult result = new UserGroupResult();

		try {
			result.setUserGroup(userGroupService.changeUserRole(changeRoleAction));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error : ", e);
		}

		return result;
	}
	
	
	
}
