package com.videogallerybackend.videogallerybackend.controller;

import com.videogallerybackend.videogallerybackend.model.User;
import com.videogallerybackend.videogallerybackend.model.Video;
import com.videogallerybackend.videogallerybackend.service.UserService;
import com.videogallerybackend.videogallerybackend.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/video")
public class VideoControl {

    @Autowired
    private VideoService videoService;
    @Autowired
    private UserService userService;

    @PostMapping("/addVideo/{userId}")
    public ResponseEntity addVideo(@RequestBody Video video, @PathVariable Integer userId) {
        User user = userService.getUser(userId);
        for (int i = 0; i < videoService.getVideos().size(); i++) {
            if (video.getYtId().equals(videoService.getVideos().get(i).getYtId())) {
                return new ResponseEntity("Video already upload", HttpStatus.BAD_REQUEST);
            }
        }
        video.setUser(user);
        videoService.saveVideo(video);
        return new ResponseEntity("Video saved", HttpStatus.OK);
    }

    @PostMapping("/addVideo/user/{userId}")
    public String addVideoUser(@RequestBody Video video, @PathVariable Integer userId) {
        User user = userService.getUser(userId);
        for (int i = 0; i < user.getVideos().size(); i++){
            if (video.getYtId().equals(user.getVideos().get(i).getYtId())){
                return "Video already upload";
            }
        }
        user.getVideos().add(video);
        userService.saveUser(user);
        return "Video saved";
    }
    @GetMapping("showVideos/{userId}/{page}")
    public List<Video> getVideosLimited(@PathVariable Integer userId, @PathVariable Integer page) {
        ArrayList<Video> videosLimited = new ArrayList<>();
        User user = userService.getUser(userId);
        int elements = 0;
        int startLimit = 0;
        if (page > 0) {
            startLimit = (6*page)-6;
        }

        for (int i = startLimit; i < user.getVideos().size(); i++) {
            if (elements <= 5) {
                videosLimited.add(user.getVideos().get(i));
                elements = elements + 1;
            } else {
                i = videoService.getVideos().size();
            }
        }

        return videosLimited;
    }

    @DeleteMapping("/deleteVideo/user/{userId}/{videoId}")
    public ResponseEntity<String> deleteVideoUser(@PathVariable Integer userId, @PathVariable Integer videoId) {
       try {
           int position = 0;
           User user = userService.getUser(userId);
           for (int i = 0; i < user.getVideos().size(); i++){
               if (videoId == user.getVideos().get(i).getVideoId()){
                   position = i;
                   i = user.getVideos().size();
               }
           }
           user.getVideos().remove(position);
           return new ResponseEntity<>("Video deleted", HttpStatus.OK);
       }catch (NoSuchElementException e) {
           return new ResponseEntity<>("Not video found", HttpStatus.NOT_FOUND);
       }
    }

}
