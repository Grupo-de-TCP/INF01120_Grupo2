package models;

// Representa um pagamento entre dois usuários
public class Payment {
    private User payer;
    private User payee;
    private double amount;

    // Construtor
    public Payment(User payer, User payee, double amount) {
        this.setPayer(payer);
        this.setPayee(payee);
        this.setAmount(amount);
    }
    // Getters
    public User getPayer() {
        return payer;
    }

    public User getPayee() {
        return payee;
    }

    public double getAmount() {
        return amount;
    }

    // Setters
    public void setPayer(User payer) {
        this.payer = payer;
    }

    public void setPayee(User payee) {
        this.payee = payee;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
