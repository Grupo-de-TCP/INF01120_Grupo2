package com.splitandconquer.api.models;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.views.GroupViews;
import java.util.ArrayList;

/**
 *
 * @author petry, ceccato, perini
 */
public class Expense {
    @JsonView(GroupViews.ExpensesView.class)
    private int id;
    
    @JsonView(GroupViews.ExpensesView.class)
    private User payer;
    
    @JsonView(GroupViews.ExpensesView.class)
    private String title;
    
    @JsonView(GroupViews.ExpensesView.class)
    private float amount;
    
    @JsonView(GroupViews.ExpensesView.class)
    private ArrayList<User> participants = new ArrayList<User>();
    
    public Expense(int id, User payer, String title, float amount) {
        this.id = id;
        this.payer = payer;
        this.title = title;
        this.amount = amount;
    }
    
    public Expense(int id, User payer, String title, float amount, ArrayList<User> participants) {
        this.id = id;
        this.payer = payer;
        this.title = title;
        this.amount = amount;
        this.participants = participants;
    }
    
    public int getId() {
        return this.id;
    }
    
    public User getPayer() {
        return this.payer;
    }
    
    public String getTitle() {
        return this.title;
    }
    
    public float getAmount() {
        return this.amount;
    }
    
    public ArrayList<User> getParticipants() {
        return this.participants;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public void setPayer(User payer) {
        this.payer = payer;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public void setAmount(float amount) {
        this.amount = amount;
    }
    
    public void setParticipants(ArrayList<User> participants) {
        this.participants = participants;
    }

}
