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

import com.clazzbuddy.mongocollections.Event;
import com.clazzbuddy.restmodel.CommonResult;
import com.clazzbuddy.restmodel.EventResult;
import com.clazzbuddy.restmodel.PostResult;
import com.clazzbuddy.service.EventService;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "*")
public class EventController {

	Logger logger = LogManager.getLogger(EventController.class);

	@Autowired
	EventService eventService;

	@PostMapping(produces = { "application/json" })
	public CommonResult createPost(@RequestBody Event event) {
		EventResult result = new EventResult();

		try {
			result.setEvent(eventService.createEvent(event));

			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("Error :", e);
		}

		return result;

	}

	@DeleteMapping(value="/{id}", produces = { "application/json" })
	public CommonResult deleteEvent(@PathVariable(value = "id") String id) {
		PostResult result = new PostResult();

		try {
			eventService.deletePost(id);
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("Error :", e);
		}

		return result;

	}

	@GetMapping(value="/{id}", produces = { "application/json" })
	public CommonResult getEvent(@PathVariable(value = "id") String id) {
		EventResult result = new EventResult();

		try {
			result.setEvent(eventService.getEvent(id));
			result.setErrorCode(0);
		} catch (Exception e) {
			result.setErrorCode(1);
			result.setException(e.toString());
			logger.error("Error :", e);
		}

		return result;

	}

}
