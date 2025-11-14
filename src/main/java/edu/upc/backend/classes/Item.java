package edu.upc.backend.classes;

public class Item {
    static int maxDurability = 20;

    int id;
    String name;
    int durability;
    int price;
    String emoji;

    public Item() {}
    /*public Item(int id, String name, int durability, int price)
    {
        setId(id);
        setDurability(Item.maxDurability);
    }

     */

    public Item(int id, String name, int durability, int price, String emoji)
    {
        this.id = id;
        this.name = name;
        this.durability = durability;
        this.price = price;
        this.emoji = emoji;
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

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmoji() {
        return emoji;
    }
    public void setEmoji(String emoji) {
        this.emoji = emoji;
    }
}
