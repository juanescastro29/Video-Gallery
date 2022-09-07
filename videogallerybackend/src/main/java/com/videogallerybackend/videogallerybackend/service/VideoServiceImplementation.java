package com.videogallerybackend.videogallerybackend.service;

import com.videogallerybackend.videogallerybackend.model.Video;
import com.videogallerybackend.videogallerybackend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoServiceImplementation implements VideoService{

    @Autowired
    private VideoRepository videoRepository;

    @Override
    public void saveVideo(Video video) {
        videoRepository.save(video);
    }

    @Override
    public List<Video> getVideos() {
        return videoRepository.findAll();
    }

    @Override
    public Video getVideo(Integer videoId) {
        return videoRepository.findById(videoId).get();
    }

    @Override
    public void deleteVideo(Integer videoId) {
        videoRepository.deleteById(videoId);
    }
}
