package com.aveblessings.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Expose the project-root 'templates' folder (which holds demo static artifacts)
        // so the wedding demo at /templates/wedding-01/index.html is reachable.
        registry.addResourceHandler("/templates/**")
                .addResourceLocations("file:templates/");
    }
}
