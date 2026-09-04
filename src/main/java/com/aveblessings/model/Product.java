package com.aveblessings.model;

import java.util.List;

public class Product {

    private int id;
    private String name;
    private String description;
    private int price;
    private String category;
    private String tag;
    private double rating;
    private int reviews;
    private String fullDescription;
    private List<String> features;
    private String link;
    private String image;

    public Product(int id, String name, String description, int price, String category,
                   String tag, String image, String link, double rating, int reviews,
                   String fullDescription, List<String> features) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.tag = tag;
        this.image = image;
        this.link = link;
        this.rating = rating;
        this.reviews = reviews;
        this.fullDescription = fullDescription;
        this.features = features;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public int getPrice() { return price; }
    public String getCategory() { return category; }
    public String getTag() { return tag; }
    public double getRating() { return rating; }
    public int getReviews() { return reviews; }
    public String getFullDescription() { return fullDescription; }
    public List<String> getFeatures() { return features; }
    public String getLink() { return link; }
    public String getImage() { return image; }

}