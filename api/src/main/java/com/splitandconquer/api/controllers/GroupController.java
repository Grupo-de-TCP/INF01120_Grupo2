package com.splitandconquer.api.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.models.Group;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.splitandconquer.api.views.GroupViews;

/**
 *
 * @author petry
 */
@RestController
@RequestMapping("groups")
public class GroupController {
    private static ArrayList<Group> allGroups = new ArrayList<Group>();

    @GetMapping("")
    @JsonView(GroupViews.AllGroupsView.class)
    public AllGroupsResponse getGroups() {
        return new AllGroupsResponse(true, GroupController.allGroups);
    }
    
    @GetMapping("/{id}")
    public GroupResponse getGroup(@PathVariable int id) {
        int index = id - 1;
        return new GroupResponse(true, GroupController.allGroups.get(index));
    }
    
    public static void createGroup(String title) {
        int id = GroupController.allGroups.size() + 1;
        Group group = new Group(id, title);
        
        GroupController.allGroups.add(group);
    }
}

@JsonView(GroupViews.AllGroupsView.class)
record AllGroupsResponse(boolean success, ArrayList<Group> content) { }


record GroupResponse(boolean success, Group content) { }
