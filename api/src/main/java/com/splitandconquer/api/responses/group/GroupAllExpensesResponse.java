package com.splitandconquer.api.responses.group;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.models.Expense;
import com.splitandconquer.api.views.GroupViews;
import java.util.ArrayList;

/**
 *
 * @author petry
 */
@JsonView(GroupViews.ExpensesView.class)
public record GroupAllExpensesResponse(boolean success, ArrayList<Expense> content) { }
