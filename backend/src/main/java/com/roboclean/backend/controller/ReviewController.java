package com.roboclean.backend.controller;

import com.roboclean.backend.entity.Review;
import com.roboclean.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getReviews() {
        List<Review> reviews = reviewRepository.findAll();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", reviews);

        return ResponseEntity.ok(response);
    }
}
