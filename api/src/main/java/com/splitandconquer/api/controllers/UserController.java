package com.splitandconquer.api.controllers;

import com.splitandconquer.api.models.User;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author petry
 */
@RestController
@RequestMapping("users")
public class UserController {
    private static ArrayList<User> allUsers = new ArrayList<User>();

    @GetMapping("")
    public AllUsersResponse getUsers() {
        return new AllUsersResponse(true, UserController.allUsers);
    }
    
    public static void createUser(String name) {
        int id = UserController.allUsers.size() + 1;
        User user = new User(id, name);
        
        UserController.allUsers.add(user);
    };
}

record AllUsersResponse(boolean success, ArrayList<User> content) { };
