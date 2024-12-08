/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.splitandconquer.api.models;

/**
 *
 * @author petry, ceccato
 */
public class Balance {
    private User user;
    private float amount;
    
    public Balance(User user, float amount) {
        this.user = user;
        this.amount = amount;
    }
    
    public void updateAmount(float amount) {
        this.amount = (float)Math.round((this.amount + amount) * 100) / 100;
    }
    
    public User getUser() {
        return this.user;
    }
    
    public float getAmount() {
        return this.amount;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public void setAmount(float amount) {
        this.amount = amount;
    }
}
