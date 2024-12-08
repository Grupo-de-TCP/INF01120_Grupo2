package com.splitandconquer.api.models;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.views.GroupViews;

/**
 *
 * @author petry
 */
public class User {
    private int id;
    private String name;
    
    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
    public int getId() {
        return this.id;
    }
    
    public String getName() {
        return this.name;
    }
    
    public float getDebt() {
        return 100;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
