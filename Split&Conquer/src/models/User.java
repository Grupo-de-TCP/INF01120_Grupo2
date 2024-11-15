package models;

// Representa um usuário
public class User {
    private String id;
    private String name;

    // Construtor
    public User(String id, String name) {
        this.setId(id);
        this.setName(name);
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}


