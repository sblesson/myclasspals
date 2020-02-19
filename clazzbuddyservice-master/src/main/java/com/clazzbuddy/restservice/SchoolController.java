package com.clazzbuddy.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clazzbuddy.restmodel.SchoolSearchResult;
import com.clazzbuddy.service.SchoolCache;

@ComponentScan(basePackages = "com.clazzbuddy")

@RestController
public class SchoolController {

	@Autowired
	SchoolCache schoolCache;

	@GetMapping("/schoollist")
	public SchoolSearchResult schoollist(@RequestParam(value = "searchkey") String searchKey) {
		
		SchoolSearchResult schoolSerachResult = new SchoolSearchResult();
		if ((searchKey == null) || searchKey.isEmpty()) {
			schoolSerachResult.setException("Search Key should not be empty");
			return schoolSerachResult;
		}
		try {
			schoolSerachResult.setSchoolSearchResult(schoolCache.getSchoolStartingWithLetters(searchKey));
		} catch (Exception e) {
			schoolSerachResult.setException(e.getMessage());
		}
		
		return schoolSerachResult;
	}
}
