package com.clazzbuddy.externalclients;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EmailServiceClient {

	@Value("${emailservice}")
	String emailService;
	
	@Value("${emailserviceuserid}")
	String userId;
	
	@Value("${emailserviceid}")
	String serviceId;
	
	@Value("${emailsignup}")
	String signupEmailTemplate;
	


	private Client client = ClientBuilder.newClient();

	public void sendUserRegistrationEmail(String id, String email) throws Exception {
		UserRegDetails userRegDetails = new UserRegDetails();
		userRegDetails.setUser_id(userId);
		userRegDetails.setService_id(serviceId);
		userRegDetails.setTemplate_id(signupEmailTemplate);
		Map<String, String> templateParams = new HashMap<>();
		templateParams.put("email", email);
		templateParams.put("name", email);
		templateParams.put("token", id);
		userRegDetails.setTemplate_params(templateParams);
	
		Response response = client.target(emailService).request(MediaType.APPLICATION_JSON).post(Entity.entity(userRegDetails, MediaType.APPLICATION_JSON));

		if (response.getStatus() > 200) {
			throw new Exception("Unable to send email");
		}

	}
	
	class UserRegDetails implements Serializable{
		private String user_id;
		
		private String service_id;
		
		private String template_id;
		
		private Map<String, String> template_params;

		public String getUser_id() {
			return user_id;
		}

		public void setUser_id(String user_id) {
			this.user_id = user_id;
		}

		public String getService_id() {
			return service_id;
		}

		public void setService_id(String service_id) {
			this.service_id = service_id;
		}

		public String getTemplate_id() {
			return template_id;
		}

		public void setTemplate_id(String template_id) {
			this.template_id = template_id;
		}

		public Map<String, String> getTemplate_params() {
			return template_params;
		}

		public void setTemplate_params(Map<String, String> template_params) {
			this.template_params = template_params;
		}

		
	}

}
