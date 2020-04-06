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

import com.clazzbuddy.restmodel.SchoolSearchResult;
import com.clazzbuddy.service.SchoolCache;

@ComponentScan(basePackages = "com.clazzbuddy")

@RestController
@RequestMapping("/school")
@CrossOrigin(origins = "*")
public class SchoolController {
	
	Logger logger = LogManager.getLogger(SchoolController.class);

	@Autowired
	SchoolCache schoolCache;

	@GetMapping(value="/schoollist", produces={"application/json"})
	public SchoolSearchResult schoollist(@RequestParam(value = "searchkey") String searchKey) {
		
		SchoolSearchResult schoolSerachResult = new SchoolSearchResult();
		if ((searchKey == null) || searchKey.isEmpty()) {
			schoolSerachResult.setException("Search Key should not be empty");
			return schoolSerachResult;
		}
		try {
			schoolSerachResult.setSchoolMatches(schoolCache.getSchoolStartingWithLetters(searchKey));
		} catch (Exception e) {
			schoolSerachResult.setException(e.toString());
			logger.error("error", e);
		}
		
		return schoolSerachResult;
	}
}
