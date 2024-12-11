package com.splitandconquer.api.responses.group;

import com.fasterxml.jackson.annotation.JsonView;
import com.splitandconquer.api.models.Expense;
import com.splitandconquer.api.views.GroupViews;

/**
 *
 * @author petry
 */
@JsonView(GroupViews.ExpensesView.class)
public record GroupSingleExpenseResponse(boolean success, Expense content) { }
