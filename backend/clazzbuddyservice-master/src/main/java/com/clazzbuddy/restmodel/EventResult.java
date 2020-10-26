package com.clazzbuddy.restmodel;

import com.clazzbuddy.mongocollections.Event;

public class EventResult extends CommonResult {

	private Event event;

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

}
