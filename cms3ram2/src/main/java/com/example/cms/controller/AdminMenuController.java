package com.example.cms.controller;

import com.example.cms.model.MenuItem;
import com.example.cms.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminMenuController {

    @Autowired
    private MenuItemService service;

    // ✅ Get all menu items
    @GetMapping
    public List<MenuItem> getAll() {
        return service.getAllItems();
    }

    // ✅ Create new menu item with image & stock
    @PostMapping
    public MenuItem create(@RequestParam("name") String name,
                           @RequestParam("category") String category,
                           @RequestParam("price") String price,
                           @RequestParam("stock") String stock,
                           @RequestParam("image") MultipartFile image) {

        MenuItem item = new MenuItem();
        item.setName(name);
        item.setCategory(category);
        item.setPrice(Double.parseDouble(price));
        item.setStock(Integer.parseInt(stock)); // ✅ handle stock

        return service.save(item, image);
    }

    // ✅ Update existing item (optionally update image and stock)
    @PutMapping("/{id}")
    public MenuItem update(@PathVariable Long id,
                           @RequestParam("name") String name,
                           @RequestParam("category") String category,
                           @RequestParam("price") String price,
                           @RequestParam("stock") String stock,
                           @RequestParam(value = "image", required = false) MultipartFile image) {

        MenuItem item = new MenuItem();
        item.setName(name);
        item.setCategory(category);
        item.setPrice(Double.parseDouble(price));
        item.setStock(Integer.parseInt(stock));

        return service.update(id, item, image);
    }

    // ✅ Delete menu item by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ Get total menu item count
    @GetMapping("/count")
    public long getMenuCount() {
        return service.getMenuCount();
    }

    // ✅ NEW: Reduce stock after order
    @PostMapping("/reduce-stock/{id}")
    public boolean reduceStock(@PathVariable Long id, @RequestParam("quantity") int quantity) {
        return service.reduceStock(id, quantity);
    }
}
