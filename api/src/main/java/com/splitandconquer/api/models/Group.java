package com.splitandconquer.api.models;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.views.GroupViews;

/**
 *
 * @author petry
 */
public class Group {
    @JsonView(GroupViews.AllGroupsView.class)
    private int id;
    
    @JsonView(GroupViews.AllGroupsView.class)
    private String title;
    
    public Group(int id, String title) {
        this.id = id;
        this.title = title;
    }
    
    public int getId() {
        return this.id;
    }
    
    public String getTitle() {
        return this.title;
    }
    
    @JsonView(GroupViews.AllGroupsView.class)
    public float getDebt() {
        return 100;
    }
    
    @JsonView(GroupViews.AllGroupsView.class)
    public float getDividend() {
        return 10;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }

}
