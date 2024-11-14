package models;

import java.util.List;

public class Expense {
    // private String id;
    private double amount;
    private User paidBy;
    private List<User> splitAmong;

    public Expense(String id, double amount, User paidBy, List<User> splitAmong) {
        //this.id = id;
        this.amount = amount;
        this.paidBy = paidBy;
        this.splitAmong = splitAmong;
    }

    public double getAmount() {
        return amount;
    }

    public User getPaidBy() {
        return paidBy;
    }

    public List<User> getSplitAmong() {
        return splitAmong;
    }
}
