package com.roboclean.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.roboclean.backend.entity.Product;
import com.roboclean.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getProducts() {
        List<Product> products = productRepository.findByActiveTrue();
        List<Map<String, Object>> productMaps = new ArrayList<>();

        for (Product product : products) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", product.getId());
            map.put("name", product.getName());
            map.put("sku", product.getSku());
            map.put("price", product.getPrice());
            map.put("originalPrice", product.getOriginalPrice());
            map.put("description", product.getDescription());
            map.put("imageUrl", product.getImageUrl());
            map.put("active", product.isActive());

            // Parse specifications string to map
            try {
                if (product.getSpecifications() != null && !product.getSpecifications().isEmpty()) {
                    Map<String, Object> specsMap = objectMapper.readValue(
                            product.getSpecifications(),
                            new TypeReference<Map<String, Object>>() {}
                    );
                    map.put("specifications", specsMap);
                } else {
                    map.put("specifications", new HashMap<>());
                }
            } catch (Exception e) {
                map.put("specifications", new HashMap<>());
            }

            productMaps.add(map);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", productMaps);

        return ResponseEntity.ok(response);
    }
}
