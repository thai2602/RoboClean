package com.roboclean.backend.repository;

import com.roboclean.backend.entity.TrackingEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface TrackingEventRepository extends JpaRepository<TrackingEvent, UUID> {
}
