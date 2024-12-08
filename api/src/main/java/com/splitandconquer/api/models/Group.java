package com.splitandconquer.api.models;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.ApiApplication;
import com.splitandconquer.api.views.GroupViews;
import java.util.ArrayList;

/**
 *
 * @author petry, ceccato
 */
public class Group {
    @JsonView({GroupViews.AllGroupsView.class, GroupViews.SingleGroupView.class})
    private int id;
    
    @JsonView({GroupViews.AllGroupsView.class, GroupViews.SingleGroupView.class})
    private String title;
    
    @JsonView(GroupViews.SingleGroupView.class)
    private ArrayList<User> members = new ArrayList<User>();
    
    private ArrayList<Expense> expenses = new ArrayList<Expense>();
    
    public Group(int id, String title) {
        this.id = id;
        this.title = title;
    }
    
    public void addMember(User member) {
        this.members.add(member);
    }
    
    public void addExpense(Expense expense) {
        this.expenses.add(expense);
    }
    
    public User findMember(int memberId) {
        for (User member : this.members) {
            if (memberId == member.getId()) {
                return member;
            }
        }
        
        return null;
    }
    
    public int getId() {
        return this.id;
    }
    
    public String getTitle() {
        return this.title;
    }
    
    public ArrayList<User> getMembers() {
        return this.members;
    }
    
    public ArrayList<Expense> getExpenses() {
        return this.expenses;
    }
    
    @JsonView({GroupViews.AllGroupsView.class, GroupViews.SingleGroupView.class})
    public float getDebt() {
        User loggedUser = ApiApplication.getLoggedUser();
        
        float debt = 0;
        
        for (Expense expense : this.expenses) {
            for (User participant : expense.getParticipants()) {
                boolean ehParticipanteNaoPagante = loggedUser.getId() != expense.getPayer().getId() && loggedUser.getId() == participant.getId();
                
                if (ehParticipanteNaoPagante) {
                    float splitAmount = expense.getAmount() / expense.getParticipants().size();
                    splitAmount = (float)Math.round(splitAmount * 100) / 100;
                    
                    debt += splitAmount;
                }
            }
        }

        return debt;
    }
    
    @JsonView({GroupViews.AllGroupsView.class, GroupViews.SingleGroupView.class})
    public float getDividend() {
        User loggedUser = ApiApplication.getLoggedUser();
        
        float dividend = 0;
        
        for (Expense expense : this.expenses) {
            if (loggedUser.getId() == expense.getPayer().getId()) {
                dividend += expense.getAmount();
            }
        }

        return dividend;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public void setMembers(ArrayList<User> members) {
        this.members = members;
    }
    
    public void setExpenses(ArrayList<Expense> expenses) {
        this.expenses = expenses;
    }

}
