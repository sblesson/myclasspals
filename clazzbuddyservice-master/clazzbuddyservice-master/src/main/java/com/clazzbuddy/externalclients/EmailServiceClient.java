package com.clazzbuddy.externalclients;

import java.io.Serializable;

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

	private Client client = ClientBuilder.newClient();

	public void sendUserRegistrationEmail(String id, String email) throws Exception {
		UserRegDetails userRegDetails = new UserRegDetails();
		userRegDetails.email = email;
		userRegDetails.id = id;
		String url = emailService + "/" + "signup";
		Response response = client.target(url).request(MediaType.APPLICATION_JSON).post(Entity.entity(userRegDetails, MediaType.APPLICATION_JSON));

		if (response.getStatus() > 200) {
			throw new Exception("Unable to send email");
		}

	}
	
	class UserRegDetails implements Serializable{
		private String email;
		private String id;
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		
	}

}
