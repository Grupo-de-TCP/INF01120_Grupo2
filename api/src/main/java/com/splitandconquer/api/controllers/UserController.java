package com.splitandconquer.api.controllers;

import com.splitandconquer.api.ApiApplication;
import com.splitandconquer.api.models.Balance;
import com.splitandconquer.api.models.User;
import com.splitandconquer.api.responses.user.*;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
    
    public static User createUser(String name) {
        int id = UserController.allUsers.size();
        User newUser = new User(id, name);
        
        User loggedUser = ApiApplication.getLoggedUser();
        if (loggedUser != null) {
            Balance balance = new Balance(newUser, 0);
            loggedUser.addBalance(balance);
        }
        
        UserController.allUsers.add(newUser);
        return newUser;
    };
}
