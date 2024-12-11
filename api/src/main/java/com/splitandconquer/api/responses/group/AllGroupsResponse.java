package com.splitandconquer.api.responses.group;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.models.Group;
import com.splitandconquer.api.views.GroupViews;
import java.util.ArrayList;

/**
 *
 * @author petry
 */
@JsonView(GroupViews.AllGroupsView.class)
public record AllGroupsResponse(boolean success, ArrayList<Group> content) { }
