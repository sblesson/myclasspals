package com.clazzbuddy.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clazzbuddy.jwt.JwtTokenUtil;
import com.clazzbuddy.mongocollections.Users;
import com.clazzbuddy.restmodel.CommonResult;
import com.clazzbuddy.restmodel.GroupInvitationAction;
import com.clazzbuddy.restmodel.JwtRequest;
import com.clazzbuddy.restmodel.JwtResponse;
import com.clazzbuddy.restmodel.UserGroupResult;
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

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserService userDetailsService;

	@PostMapping(value = "/authenticate", produces = { "application/json" })
	public ResponseEntity<?> createAuthenticationToken(@RequestBody Users authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	@PostMapping(value = "/register", produces = { "application/json" })
	public CommonResult saveUser(@RequestBody Users user) throws Exception {
		UserResult result = new UserResult();

		try {
			result.setUser(userService.createUser(user));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.getMessage());
			logger.error("error", e);
		}

		return result;
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

	@PostMapping(value = "/createuser", produces = { "application/json" })
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

	@PutMapping(value = "/updateuser", produces = { "application/json" })
	public CommonResult updateuser(@RequestBody Users user) {
		UserResult result = new UserResult();

		try {
			result.setUser(userService.updateUser(user));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}

		return result;

	}

	@GetMapping(value = "/getuserdetails", produces = { "application/json" })
	public CommonResult getUserDetails(@RequestParam(value = "user") String userkey) {
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

	// basic user info
	@GetMapping(value = "/getuser", produces = { "application/json" })
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

	@GetMapping(value = "/userbyregid/{id}", produces = { "application/json" })
	public CommonResult getUserByRegId(@PathVariable("id") String id) {
		UserResult result = new UserResult();

		try {
			Users user = new Users();
			result.setUser(userService.getUserDetailsFromRegistrationId(id));
			user.setEmail(user.getEmail());
			user.setCreatedDate(user.getCreatedDate());
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}

		return result;

	}

	@DeleteMapping(value = "/userbyregid/{id}", produces = { "application/json" })
	public CommonResult deleteUserRegToken(@PathVariable("id") String id) {
		CommonResult result = new CommonResult();
		try {
			userService.deleteUserRegToken(id);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		return result;
	}

	@GetMapping(value = "/searchuser", produces = { "application/json" })
	public CommonResult searchUser(@RequestParam(value = "user") String userkey) {
		UserResult result = new UserResult();

		try {
			result.setUsers(userService.searchUser(userkey));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}

		return result;

	}

	// @PostMapping(value="/validateuser", produces={"application/json"})
	// public CommonResult validateProfile(@RequestBody Users user) {
	// UserResult result = new UserResult();
	//
	// try {
	// List<Users> userList = new ArrayList<>();
	// userList.add(userService.validateUser(user));
	// result.setUser(userList);
	// result.setErrorCode(0);
	// } catch (Exception e) {
	// result.setErrorCode(1);
	// result.setException(e.toString());
	// logger.error("error", e);
	// }
	//
	// return result;
	//
	// }

	@PostMapping(value = "/requestusergroup", produces = { "application/json" })
	public UserResult requestUserGroup(@RequestBody GroupInvitationAction groupInvitationAction) {

		UserResult result = new UserResult();
		try {
			result.setUser(userService.requestToJoinUserGroup(groupInvitationAction));
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		return result;
	}

	@PostMapping(value = "/invitetousergroup", produces = { "application/json" })
	public CommonResult inviteToUserGroup(@RequestBody GroupInvitationAction groupInvitationAction) {
		UserGroupResult result = new UserGroupResult();
		try {
			if (groupInvitationAction.getInvitedUsers() != null) {
				String[] emailAddresses = groupInvitationAction.getInvitedUsers().split(",");
				for (int count = 0; count < emailAddresses.length; count++) {
					GroupInvitationAction newGroupInvitationAction = new GroupInvitationAction();
					newGroupInvitationAction.setGroupId(groupInvitationAction.getGroupId());
					newGroupInvitationAction.setInvitedUserId(emailAddresses[count]);
					newGroupInvitationAction.setRole(groupInvitationAction.getRole());
					result.setUserGroup(userService.inviteToJoinUserGroup(newGroupInvitationAction));
				}
			} else {
				result.setUserGroup(userService.inviteToJoinUserGroup(groupInvitationAction));
			}
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		return result;
	}

	@PostMapping(value = "/acceptusergroupinvitaion", produces = { "application/json" })
	public CommonResult acceptGroupInvitation(@RequestBody GroupInvitationAction groupInvitationAction) {
		UserResult result = new UserResult();
		try {
			result.setUser(userService.acceptGroupInvitation(groupInvitationAction));
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("error", e);
		}
		return result;
	}

	@PostMapping(value = "/acceptusergrouprequest", produces = { "application/json" })
	public CommonResult acceptGroupRquest(@RequestBody GroupInvitationAction groupInvitationAction) {
		CommonResult result = new CommonResult();
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
