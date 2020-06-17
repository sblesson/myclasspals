package com.clazzbuddy.logginginterceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RequestResponseInterceptorConfig implements WebMvcConfigurer{

	@Autowired
    private RequestResponseInterceptor requestResponseInterceptor;
 
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requestResponseInterceptor)
          .addPathPatterns("/**");
    }
}
