package com.videogallerybackend.videogallerybackend.repository;

import com.videogallerybackend.videogallerybackend.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Integer> {
}
