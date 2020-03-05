package com.clazzbuddy.restservice;

import java.util.ArrayList;
import java.util.List;

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

import com.clazzbuddy.mongocollections.UserGroup;
import com.clazzbuddy.restmodel.CommonResult;
import com.clazzbuddy.restmodel.UserGroupResult;
import com.clazzbuddy.service.UserGroupService;

@ComponentScan(basePackages = "com.clazzbuddy")

@RestController
@RequestMapping("/usergroup")
@CrossOrigin(origins = "*")
public class UserGroupController {

	@Autowired
	UserGroupService userGroupService;

	@PostMapping(value = "/creategroup", produces = { "application/json" })
	public CommonResult createGroup(@RequestBody UserGroup userGroup) {
		CommonResult result = new CommonResult();

		try {
			userGroupService.createUserGroup(userGroup);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.getMessage());
		}

		return result;

	}

	@PutMapping(value = "/updategroup", produces = { "application/json" })
	public CommonResult updateGroup(@RequestBody UserGroup userGroup) {
		CommonResult result = new CommonResult();

		try {
			userGroupService.updateUserGroup(userGroup);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.getMessage());
		}

		return result;

	}

	@GetMapping(value = "/getgroup", produces = { "application/json" })
	public CommonResult getUser(@RequestParam(value = "usergroupid") String id) {
		UserGroupResult result = new UserGroupResult();

		try {
			List<UserGroup> userGroupList = new ArrayList<>();
			userGroupList.add(userGroupService.getUserGroupByName(id));
			result.setUserGroup(userGroupList);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.getMessage());
		}

		return result;

	}
}
