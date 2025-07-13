package com.example.cms.service;

import com.example.cms.model.MenuItem;
import com.example.cms.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;

@Service
public class MenuItemServiceImplementation implements MenuItemService {

    @Autowired
    private MenuItemRepository repo;

    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads";

    @Override
    public List<MenuItem> getAllItems() {
        return repo.findAll(); // ✅ Fetch all menu items
    }

    @Override
    public MenuItem save(MenuItem item, MultipartFile imageFile) {
        try {
            if (imageFile != null && !imageFile.isEmpty()) {
                String fileName = imageFile.getOriginalFilename();
                Path imagePath = Paths.get(UPLOAD_DIR, fileName);
                Files.createDirectories(imagePath.getParent());
                Files.copy(imageFile.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
                item.setImage(fileName);
            }

            // ✅ Set default stock if not provided or invalid
            if (item.getStock() == null || item.getStock() < 0) {
                item.setStock(0);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return repo.save(item);
    }

    @Override
    public MenuItem update(Long id, MenuItem newItem, MultipartFile imageFile) {
        Optional<MenuItem> optional = repo.findById(id);
        if (optional.isPresent()) {
            MenuItem existing = optional.get();
            existing.setName(newItem.getName());
            existing.setCategory(newItem.getCategory());
            existing.setPrice(newItem.getPrice());

            // ✅ Update stock only if valid
            if (newItem.getStock() != null && newItem.getStock() >= 0) {
                existing.setStock(newItem.getStock());
            }

            try {
                if (imageFile != null && !imageFile.isEmpty()) {
                    String fileName = imageFile.getOriginalFilename();
                    Path imagePath = Paths.get(UPLOAD_DIR, fileName);
                    Files.createDirectories(imagePath.getParent());
                    Files.copy(imageFile.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
                    existing.setImage(fileName);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            return repo.save(existing);
        } else {
            throw new RuntimeException("Menu item not found with id: " + id);
        }
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public Long getMenuCount() {
        return repo.count();
    }

    // ✅ NEWLY ADDED METHOD: Reduce stock when user places an order
    @Override
    public boolean reduceStock(Long itemId, int quantity) {
        Optional<MenuItem> optionalItem = repo.findById(itemId);

        if (optionalItem.isPresent()) {
            MenuItem item = optionalItem.get();

            if (item.getStock() != null && item.getStock() >= quantity) {
                item.setStock(item.getStock() - quantity);
                repo.save(item);
                return true;
            }
        }

        return false; // ❌ Not enough stock or item not found
    }
}
