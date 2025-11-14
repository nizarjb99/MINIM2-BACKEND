package edu.upc.backend.classes;

public abstract class Item {
    static int maxDurability = 20;

    int id;
    int durability;

    public Item() {}
    public Item(int id)
    {
        setId(id);
        setDurability(Item.maxDurability);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDurability() {
        return durability;
    }

    public void setDurability(int durability) {
        this.durability = durability;
    }

}
