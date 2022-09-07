package com.videogallerybackend.videogallerybackend.service;

import com.videogallerybackend.videogallerybackend.model.User;
import com.videogallerybackend.videogallerybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(Integer user_id) {
        return userRepository.findById(user_id).get();
    }

    @Override
    public void deleteUser(Integer user_id) {
        userRepository.deleteById(user_id);
    }
}
