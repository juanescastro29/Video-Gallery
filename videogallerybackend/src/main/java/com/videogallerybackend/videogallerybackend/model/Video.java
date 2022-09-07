package com.videogallerybackend.videogallerybackend.model;

import javax.persistence.*;

@Entity
@Table(name = "videos")
public class Video {

    @Id
    @Column(name = "video_id")
    private int videoId;
    @Column(name = "yt_id")
    private String ytId;
    @Column(name = "video_tittle", nullable = false)
    private String videoTittle;
    @Column(name = "description", nullable = false)
    private String videoDescription;
    @Column(name = "video_min", nullable = false)
    private String videoMin;
    @Column(name = "video_source", nullable = false)
    private String videoSource;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;

    public Video() {

    }

    public int getVideoId() {
        return videoId;
    }

    public void setVideoId(int videoId) {
        this.videoId = videoId;
    }

    public String getYtId() {
        return ytId;
    }

    public void setYtId(String ytId) {
        this.ytId = ytId;
    }

    public String getVideoTittle() {
        return videoTittle;
    }

    public void setVideoTittle(String videoTittle) {
        this.videoTittle = videoTittle;
    }

    public String getVideoDescription() {
        return videoDescription;
    }

    public void setVideoDescription(String videoDescription) {
        this.videoDescription = videoDescription;
    }

    public String getVideoMin() {
        return videoMin;
    }

    public void setVideoMin(String videoMin) {
        this.videoMin = videoMin;
    }

    public String getVideoSource() {
        return videoSource;
    }

    public void setVideoSource(String videoSource) {
        this.videoSource = videoSource;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
