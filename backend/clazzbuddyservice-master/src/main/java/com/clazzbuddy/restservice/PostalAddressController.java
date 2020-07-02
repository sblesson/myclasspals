package com.clazzbuddy.restservice;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clazzbuddy.restmodel.PostalAddressSearchResult;
import com.clazzbuddy.restmodel.SchoolSearchResult;
import com.clazzbuddy.service.PostalAddressService;
import com.clazzbuddy.service.SchoolCache;

@ComponentScan(basePackages = "com.clazzbuddy")

@RestController
@RequestMapping("/postaladdress")
@CrossOrigin(origins = "*")
public class PostalAddressController {
	
	Logger logger = LogManager.getLogger(PostalAddressController.class);

	@Autowired
	PostalAddressService postalAddressService;

	@GetMapping(value="/searchbycity", produces={"application/json"})
	public PostalAddressSearchResult serachbycide(@RequestParam(value = "searchkey") String searchKey) {
		
		PostalAddressSearchResult postalAddressSerachResult = new PostalAddressSearchResult();
		if ((searchKey == null) || searchKey.isEmpty()) {
			postalAddressSerachResult.setException("Search Key should not be empty");
			return postalAddressSerachResult;
		}
		try {
			postalAddressSerachResult.setPostalAddresses(postalAddressService.getCityStartingWithLetters(searchKey));
		} catch (Exception e) {
			postalAddressSerachResult.setException(e.toString());
			logger.error("error", e);
		}
		
		return postalAddressSerachResult;
	}
}
