package models;

import java.util.List;

// Representa uma despesa associada a um grupo
public class Expense {
    private String id;
    private double amount;
    private User paidBy;
    private List<User> splitAmong;

    // Construtor
    public Expense(String id, double amount, User paidBy, List<User> splitAmong) {
        this.setId(id);
        this.setAmount(amount);
        this.setPaidBy(paidBy);
        this.setSplitAmong(splitAmong);
    }

    // Getters
    public String getId() {
        return id;
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

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setPaidBy(User paidBy) {
        this.paidBy = paidBy;
    }

    public void setSplitAmong(List<User> splitAmong) {
        this.splitAmong = splitAmong;
    }
}
