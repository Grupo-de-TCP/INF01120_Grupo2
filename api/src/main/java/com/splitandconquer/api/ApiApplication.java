package com.splitandconquer.api;

import com.splitandconquer.api.controllers.GroupController;
import com.splitandconquer.api.controllers.UserController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication {
    
    public static void main(String[] args) {
        UserController.createUser("teste");
        GroupController.createGroup("teste");
        
        
	SpringApplication.run(ApiApplication.class, args);
    }
    
}
