package com.splitandconquer.api.responses.group;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.models.Group;
import com.splitandconquer.api.views.GroupViews;

/**
 *
 * @author petry
 */
@JsonView(GroupViews.SingleGroupView.class)
public record SingleGroupResponse(boolean success, Group content) { }
