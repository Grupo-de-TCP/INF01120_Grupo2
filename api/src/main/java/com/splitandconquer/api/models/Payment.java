package com.splitandconquer.api.models;

/**
 *
 * @author petry
 */
public record Payment(int payerId, int receiverId, float amount, int groupId) { }
