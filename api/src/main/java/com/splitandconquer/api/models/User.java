package com.splitandconquer.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.ApiApplication;
import com.splitandconquer.api.views.GroupViews;
import java.util.ArrayList;

/**
 *
 * @author petry, ceccato
 */
public class User {
    @JsonView({GroupViews.SingleGroupView.class, GroupViews.ExpensesView.class})
    private int id;
    
    @JsonView({GroupViews.SingleGroupView.class, GroupViews.ExpensesView.class})
    private String name;
    
    @JsonIgnore
    private ArrayList<Balance> balances = new ArrayList<Balance>();
    
    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
    public void addBalance(Balance balance) {
        this.balances.add(balance);
    }
    
    public boolean updateDividend(int receiverId, int debtorId, float amount) {
        Balance balance = null;
        
        if (this.id == receiverId && this.id != debtorId) { // Se o usuário é o recebidor, aumenta o dívidendo
            balance = this.getBalanceByUser(debtorId);
        } else if (this.id == debtorId) { // Se o usuário é o devedor, diminui o dívidendo
            balance = this.getBalanceByUser(receiverId);
            amount = -amount;
        }
        
        if (balance != null) {
            balance.updateDividend(amount);
            return true;
        }
        
        return false;
    }
    
    public int getId() {
        return this.id;
    }
    
    public String getName() {
        return this.name;
    }
    
    public ArrayList<Balance> getBalances() {
        return this.balances;
    }
    
    public Balance getBalanceByUser(int userId) {
        for (Balance balance : this.balances) {
            if (userId == balance.getUser().getId()) {
                return balance;
            }
        }
        
        return null;
    }
    
    @JsonView(GroupViews.SingleGroupView.class)
    public float getDebt() {
        User loggedUser = ApiApplication.getLoggedUser();
        
        if (loggedUser.getId() == this.id) {
            return 0;
        }
        
        return -loggedUser.getBalanceByUser(this.id).getDividend();
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public void setBalances(ArrayList<Balance> balances) {
        this.balances = balances;
    }
}
