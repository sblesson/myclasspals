package com.clazzbuddy.externalclients;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.clazzbuddy.mongocollections.School;

@Component
public class SchoolDiggerClient {

	private final String REST_URI = "arm/v1.2/autocomplete/schools?q=${Search}&appID=02e5e1fb&appKey=516f6dd0da01a186ffedea905bec1041";

	private Client client = ClientBuilder.newClient();

	public List<School> getSchoolList(String searchKey) throws Exception {
		;

		String url = REST_URI.replace("${Search}", URLEncoder.encode(searchKey,"UTF-8"));
		SchoolDiggerResult diggerResult = client.target(url).request(MediaType.APPLICATION_JSON).get(SchoolDiggerResult.class);
		
		return diggerResult.getSchoolMatches();

	}
}
