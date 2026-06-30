package com.roboclean.backend.repository;

import com.roboclean.backend.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface FaqRepository extends JpaRepository<Faq, UUID> {
    List<Faq> findAllByOrderByDisplayOrderAsc();
}
