package services;

import models.Group;
import models.User;
import java.util.HashMap;
import java.util.Map;

//  Serviço para gerenciar grupos
public class GroupService {
    private Map<String, Group> groups = new HashMap<>();

    public void createGroup(Group group) {
        groups.put(group.getId(), group);
    }

    public Group getGroup(String groupId) {
        return groups.get(groupId);
    }

    public void addMemberToGroup(String groupId, User user) {
        Group group = groups.get(groupId);
        if (group != null) {
            group.addMember(user);
        }
    }
}
