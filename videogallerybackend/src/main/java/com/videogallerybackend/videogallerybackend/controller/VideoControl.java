package com.videogallerybackend.videogallerybackend.controller;

import com.videogallerybackend.videogallerybackend.model.User;
import com.videogallerybackend.videogallerybackend.model.Video;
import com.videogallerybackend.videogallerybackend.service.UserService;
import com.videogallerybackend.videogallerybackend.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/video")
public class VideoControl {

    @Autowired
    private VideoService videoService;
    @Autowired
    private UserService userService;

    @PostMapping("/addVideo")
    public String addVideo(@RequestBody Video video) {
        for (int i = 0; i < videoService.getVideos().size(); i++) {
            if (video.getYtId().equals(videoService.getVideos().get(i).getYtId())) {
                return "Video already upload";
            }
        }
        videoService.saveVideo(video);
        return "Video saved";
    }

    @PostMapping("/addVideo/user/{user_id}")
    public String addVideoUser(@RequestBody Video video, @PathVariable Integer user_id) {
        User user = userService.getUser(user_id);
        for (int i = 0; i < user.getVideos().size(); i++){
            if (video.getYtId().equals(user.getVideos().get(i).getYtId())){
                return "Video already upload";
            }
        }
        user.getVideos().add(video);
        userService.saveUser(user);
        return "Video saved";
    }

    @DeleteMapping("/deleteVideo/user/{user_id}/{video_id}")
    public ResponseEntity<String> deleteVideoUser(@PathVariable Integer user_id, @PathVariable Integer video_id) {
       try {
           int position = 0;
           User user = userService.getUser(user_id);
           for (int i = 0; i < user.getVideos().size(); i++){
               if (video_id == user.getVideos().get(i).getVideoId()){
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
