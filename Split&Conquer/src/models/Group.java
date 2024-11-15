package models;

import java.util.List;

// Representa um grupo de usuários
public class Group {
    private String id;
    private String name;
    private List<User> members;

    // Construtor
    public Group(String id, String name, List<User> members) {
        this.setId(id);
        this.setName(name);
        this.setMembers(members);
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<User> getMembers() {
        return members;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    // Adiciona um membro ao grupo
    public void addMember(User user) {
        members.add(user);
    }

    // Remove um membro do grupo
    public void removeMember(User user) {
        members.remove(user);
    }
}
