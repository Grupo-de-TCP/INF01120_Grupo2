package com.splitandconquer.api.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.models.Expense;
import com.splitandconquer.api.models.Group;
import com.splitandconquer.api.responses.group.*;
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
    @JsonView(GroupViews.SingleGroupView.class)
    public SingleGroupResponse getGroup(@PathVariable int id) {
        if (id < 0 || id >= GroupController.allGroups.size()) {
           return new SingleGroupResponse(false, null);
        }
        
        return new SingleGroupResponse(true, GroupController.findGroup(id));
    }
    
    @GetMapping("{id}/expenses")
    @JsonView(GroupViews.ExpensesView.class)
    public GroupAllExpensesResponse getExpenses(@PathVariable int id) {
        if (id < 0 || id >= GroupController.allGroups.size()) {
           return new GroupAllExpensesResponse(false, null);
        }
        
        Group group = GroupController.findGroup(id);
        ArrayList<Expense> expenses = group.getExpenses();
        
        return new GroupAllExpensesResponse(true, expenses);
    }
    
    @GetMapping("{groupId}/expenses/{expenseId}")
    @JsonView(GroupViews.ExpensesView.class)
    public GroupSingleExpenseResponse getExpense(@PathVariable int groupId, @PathVariable int expenseId) {
        if (groupId < 0 || groupId >= GroupController.allGroups.size()) {
           return new GroupSingleExpenseResponse(false, null);
        }
        
        Group group = GroupController.findGroup(groupId);
        ArrayList<Expense> expenses = group.getExpenses();
        
        if (expenseId < 0 || expenseId >= expenses.size()) {
           return new GroupSingleExpenseResponse(false, null);
        }
        
        return new GroupSingleExpenseResponse(true, expenses.get(expenseId));
    }
    
    public static Group findGroup(int id) {
        if (id < 0 || id >= GroupController.allGroups.size()) {
            return null;
        }
        
        return GroupController.allGroups.get(id);
    }
    
    public static Group createGroup(String title) {
        int id = GroupController.allGroups.size();
        Group group = new Group(id, title);
        
        GroupController.allGroups.add(group);
        return group;
    }
}
