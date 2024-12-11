package com.splitandconquer.api.responses.user;

import com.splitandconquer.api.models.User;
import java.util.ArrayList;

/**
 *
 * @author petry
 */
public record AllUsersResponse(boolean success, ArrayList<User> content) { };
