package com.splitandconquer.api.models;

/**
 *
 * @author petry
 */
public record ExpenseBody(String title, float amount, int[] participants, int payerId, int groupId) { }
