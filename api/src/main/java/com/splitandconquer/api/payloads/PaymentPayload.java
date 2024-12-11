package com.splitandconquer.api.payloads;

/**
 *
 * @author petry
 */
public record PaymentPayload(int payerId, int receiverId, float amount, int groupId) { }
