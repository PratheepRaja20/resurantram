package com.example.cms.controller;

import com.example.cms.model.MenuItem;
import com.example.cms.service.MenuItemService;
import com.example.cms.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserMenuController {

    private final MenuItemService menuItemService;

    @Autowired
    private MenuItemRepository menuRepo;

    public UserMenuController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    // ✅ 1. Get all menu items
    @GetMapping("/menu/all")
    public List<MenuItem> getAllItems() {
        return menuItemService.getAllItems();
    }

    // ✅ 2. Reduce stock by 1 when user adds to cart
    @PutMapping("/menu/reduce-stock/{id}")
    public ResponseEntity<String> reduceStock(@PathVariable Long id) {
        Optional<MenuItem> optional = menuRepo.findById(id);
        if (optional.isPresent()) {
            MenuItem item = optional.get();

            if (item.getStock() > 0) {
                item.setStock(item.getStock() - 1); // reduce 1 item
                menuRepo.save(item);
                return ResponseEntity.ok("Stock reduced");
            } else {
                return ResponseEntity.badRequest().body("Out of Stock");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ 3. Count how many items are in low stock (< 5)
    @GetMapping("/menu/low-stock-count")
    public Long getLowStockCount() {
        return menuRepo.findAll().stream()
                .filter(item -> item.getStock() < 5)
                .count();
    }

    // ✅ 4. Return the full list of low-stock items (< 5)
    @GetMapping("/menu/low-stock")
    public List<MenuItem> getLowStockItems() {
        return menuRepo.findAll().stream()
                .filter(item -> item.getStock() < 5)
                .toList();
    }
}
