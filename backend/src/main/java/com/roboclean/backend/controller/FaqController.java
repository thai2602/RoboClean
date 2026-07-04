package com.roboclean.backend.controller;

import com.roboclean.backend.entity.Faq;
import com.roboclean.backend.repository.FaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/v1/faq", "/faq"})
public class FaqController {

    @Autowired
    private FaqRepository faqRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getFaqs() {
        List<Faq> faqs = faqRepository.findAllByOrderByDisplayOrderAsc();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", faqs);

        return ResponseEntity.ok(response);
    }
}
