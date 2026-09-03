package com.aveblessings.model;

public class Product {

    // Thuộc tính của sản phẩm
    private int id;
    private String name;
    private String description;
    private int price;
    private String category;

    // Constructor: tao product mới với các thuộc tính
    public Product(int id, String name, String description, int price, String category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    // Getter: cho phép truy cập các thuộc tính của sản phẩm, cho phep ben ngoai doc data product    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getPrice() {
        return price;
    }

    public String getCategory() {
        return category;
    }
}