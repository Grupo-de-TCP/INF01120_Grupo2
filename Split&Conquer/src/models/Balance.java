package models;

// Representa o saldo entre os membros
public class Balance {
    private User fromUser;
    private User toUser;
    private double amount;

    // Construtor
    public Balance(User fromUser, User toUser, double amount) {
        this.setFromUser(fromUser);
        this.setToUser(toUser);
        this.setAmount(amount);
    }

    // Getters
    public User getFromUser() {
        return fromUser;
    }

    public User getToUser() {
        return toUser;
    }

    public double getAmount() {
        return amount;
    }

    // Setters
    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    public void setToUser(User toUser) {
        this.toUser = toUser;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
