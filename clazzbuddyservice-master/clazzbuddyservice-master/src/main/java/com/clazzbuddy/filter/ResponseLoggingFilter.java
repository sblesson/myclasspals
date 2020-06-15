package com.clazzbuddy.filter;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Provider
public class ResponseLoggingFilter implements ContainerResponseFilter {

	Logger logger = LogManager.getLogger(ResponseLoggingFilter.class);

	
	@Override
	public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
			throws IOException {
		
		
		logger.info(responseContext.getEntity());
		
		// TODO Auto-generated method stub
		
	}

	
}
