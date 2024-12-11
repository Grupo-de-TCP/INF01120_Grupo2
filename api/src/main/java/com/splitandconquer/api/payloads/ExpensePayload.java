package com.splitandconquer.api.payloads;

/**
 *
 * @author petry
 */
public record ExpensePayload(String title, float amount, int[] participants, int payerId, int groupId) { }
