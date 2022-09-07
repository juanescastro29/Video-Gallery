package com.videogallerybackend.videogallerybackend.service;

import com.videogallerybackend.videogallerybackend.model.Video;

import java.util.List;

public interface VideoService {

    public void saveVideo(Video video);
    public List<Video> getVideos();
    public Video getVideo(Integer video_id);
    public void deleteVideo(Integer video_id);

}
