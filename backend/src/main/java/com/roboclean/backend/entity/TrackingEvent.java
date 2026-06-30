package com.roboclean.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tracking_events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrackingEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "session_id", nullable = false)
    private String sessionId;

    @Column(name = "event_type", nullable = false)
    private String eventType; // CLICK, SCROLL, etc.

    @Column(nullable = false)
    private String page;

    private String target;

    @Column(columnDefinition = "TEXT")
    private String metadata; // Stored as JSON String for compatibility

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
