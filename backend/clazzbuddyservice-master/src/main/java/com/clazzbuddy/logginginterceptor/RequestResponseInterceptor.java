package com.clazzbuddy.logginginterceptor;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.core.util.IOUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component
public class RequestResponseInterceptor extends HandlerInterceptorAdapter {

	Logger logger = LogManager.getLogger(RequestResponseInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		logger.info("got request");
		logger.info("Request URL : " + request.getRequestURI());
//		try {
//			
//			//logger.info("Request body : " + IOUtils.toString(request.getReader()));
//		} catch (IOException e) {
//			logger.info("Unable to get the request data");
//		}
		
		return true;
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception ex) {
		HttpServletResponseWrapper wrapper = new HttpServletResponseWrapper(response);
		logger.info("Response url : " + request.getRequestURL());

		logger.info("send response");

		//
	}
}
