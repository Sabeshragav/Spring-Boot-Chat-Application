package com.backend.backend_springboot;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.stereotype.Component;

@Component
public class ServerPortCustomizer implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    @Value("${server.port}")
    private String port;

    @Override
    public void customize(ConfigurableServletWebServerFactory factory) {
        int listenPort;
        if (port != null && !port.isEmpty()) {
            listenPort = Integer.parseInt(port);
        } else {
            listenPort = 9000;
        }
        factory.setPort(listenPort);
    }
}
