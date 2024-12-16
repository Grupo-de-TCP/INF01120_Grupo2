package com.splitandconquer.api.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.models.Expense;
import com.splitandconquer.api.models.Group;
import com.splitandconquer.api.responses.DeleteResponse;
import com.splitandconquer.api.responses.group.*;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.splitandconquer.api.views.GroupViews;
import org.springframework.web.bind.annotation.DeleteMapping;

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
    public static AllGroupsResponse getGroups() {
        return new AllGroupsResponse(true, GroupController.allGroups);
    }
    
    @GetMapping("/{id}")
    @JsonView(GroupViews.SingleGroupView.class)
    public static SingleGroupResponse getGroup(@PathVariable int id) {
        if (id < 0 || id >= GroupController.allGroups.size()) {
           return new SingleGroupResponse(false, null);
        }
        
        return new SingleGroupResponse(true, GroupController.findGroup(id));
    }
    
    @GetMapping("{id}/expenses")
    @JsonView(GroupViews.ExpensesView.class)
    public static GroupAllExpensesResponse getExpenses(@PathVariable int id) {
        if (id < 0 || id >= GroupController.allGroups.size()) {
           return new GroupAllExpensesResponse(false, null);
        }
        
        Group group = GroupController.findGroup(id);
        ArrayList<Expense> expenses = group.getExpenses();
        
        return new GroupAllExpensesResponse(true, expenses);
    }
    
    @GetMapping("{groupId}/expenses/{expenseId}")
    @JsonView(GroupViews.ExpensesView.class)
    public static GroupSingleExpenseResponse getExpense(@PathVariable int groupId, @PathVariable int expenseId) {
        Group group = GroupController.findGroup(groupId);
        if (group == null) {
           return new GroupSingleExpenseResponse(false, null);
        }
        
        Expense expense = group.getExpense(expenseId);
        if (expense == null) {
           return new GroupSingleExpenseResponse(false, null);
        }
        
        return new GroupSingleExpenseResponse(true, expense);
    }
    
    @DeleteMapping("{groupId}/expenses/{expenseId}")
    public static DeleteResponse deleteExpense(@PathVariable int groupId, @PathVariable int expenseId) {
        Group group = GroupController.findGroup(groupId);
        if (group == null) {
           return new DeleteResponse(false, "Grupo não encontrado.");
        }
        
        ArrayList<Expense> expenses = group.getExpenses();
        
        for (int i = 0; i < expenses.size(); i++) {
            if (expenses.get(i).getId() == expenseId) {
                expenses.remove(i);
                return new DeleteResponse(true, "Despesa removida com sucesso.");
            }
        }
        
        return new DeleteResponse(false, "Despesa não encontradao.");
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
    
    public static void setAllGroups(ArrayList<Group> groups) {
        GroupController.allGroups = groups;
    }
}
