package com.splitandconquer.api.models;

/**
 *
 * @author petry, ceccato
 */
public class Balance {
    private User user;
    
    // Negativo = dívida do usuário logado com o user do balance
    // Positivo = dividendo do usuário logado com o user do balance
    private float dividend;
    
    public Balance(User user, float dividend) {
        this.user = user;
        this.dividend = dividend;
    }
    
    public void updateDividend(float dividend) {
        this.dividend = (float)Math.round((this.dividend + dividend) * 100) / 100;
    }
    
    public User getUser() {
        return this.user;
    }
    
    public float getDividend() {
        return this.dividend;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public void setDividend(float dividend) {
        this.dividend = dividend;
    }
}
