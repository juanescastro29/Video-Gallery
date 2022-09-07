package com.videogallerybackend.videogallerybackend.service;

import com.videogallerybackend.videogallerybackend.model.User;

import java.util.List;

public interface UserService {

    public void saveUser(User user);
    public List<User> getUsers();
    public User getUser(Integer user_id);
    public void deleteUser(Integer user_id);

}
