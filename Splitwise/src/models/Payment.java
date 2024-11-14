package models;

public class Payment {
    private User payer;
    private User payee;
    private double amount;

    public Payment(User payer, User payee, double amount) {
        this.payer = payer;
        this.payee = payee;
        this.amount = amount;
    }

    public User getPayer() {
        return payer;
    }

    public User getPayee() {
        return payee;
    }

    public double getAmount() {
        return amount;
    }
}
