package com.videogallerybackend.videogallerybackend.controller;

import com.videogallerybackend.videogallerybackend.model.User;
import com.videogallerybackend.videogallerybackend.service.SendMailService;
import com.videogallerybackend.videogallerybackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Random;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserControl {

    @Autowired
    private UserService userService;
    @Autowired
    private SendMailService sendMailService;

    @PostMapping("/registerUser")
    public String registerUser(@RequestBody User user) throws MessagingException, UnsupportedEncodingException {
        for (int i = 0; i < userService.getUsers().size(); i++) {
            if (user.getUserEmail().equals(userService.getUsers().get(i))) {
                return "Email already registered";
            }
        }
        String verificationCode = generateCode();
        user.setVerificationCode(verificationCode);
        userService.saveUser(user);
        sendMailService.senEmail(user.getUserEmail(), verificationCode);
        return "User registered";
    }

    @GetMapping("/login")
    public String loginUser(@RequestBody Map<String, String> userCredentials) {
        String userEmail = userCredentials.get("userEmail");
        String userPassword = userCredentials.get("userPassword");
        int position = 0;
        for (int i = 0; i < userService.getUsers().size(); i++){
            if ((userEmail.equals(userService.getUsers().get(i)))
                    && (userPassword == userService.getUsers().get(i).getUserPassword())
                    && (userService.getUsers().get(i).isVerified() == true)){
                return "User registered and verified";
            } else if ((userEmail.equals(userService.getUsers().get(i)))
                    && (userPassword == userService.getUsers().get(i).getUserPassword())
                    && (userService.getUsers().get(i).isVerified() == false)) {
                return "User registered but not verified";
            }
        }
        return "User not registered";
    }

    @GetMapping("/getUser/{user_email}")
    public User getUser(@PathVariable String userEmail) {
        User user = new User();
        for (int i = 0; i < userService.getUsers().size(); i++) {
            if (userEmail.equals(userService.getUsers().get(i))){
                user = userService.getUsers().get(i);
            }
        }
        return user;
    }

    @PutMapping("/updateProfile/{user_id}")
    public ResponseEntity<String> updateProfile(@RequestBody User user, @PathVariable Integer user_id) {
        try {
            User userFound = userService.getUser(user_id);
            for (int i = 0; i < userService.getUsers().size(); i++){
                if (user.getUserEmail().equals(userService.getUsers().get(i))) {
                    return new ResponseEntity<>("Email already registered", HttpStatus.ALREADY_REPORTED);
                }
            }
            userFound.setUserEmail(user.getUserEmail());
            userFound.setUserName(user.getUserName());
            userFound.setUserLastName(user.getUserLastName());
            userService.saveUser(userFound);
            return new ResponseEntity<>("User updated correctly", HttpStatus.OK);
        }catch (NoSuchElementException e) {
            return new ResponseEntity<>("Not user found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteAccount/{user_id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Integer user_id) {
        try {
            int position = 0;
            for (int i = 0; i < userService.getUsers().size(); i++){
                if (user_id == userService.getUsers().get(i).getUserId()){
                    position = i;
                    i = userService.getUsers().size();
                }
            }
            userService.getUsers().remove(position);
            return new ResponseEntity<>("Account deleted", HttpStatus.OK);
        }catch (NoSuchElementException e) {
            return new ResponseEntity<>("Not user found", HttpStatus.NOT_FOUND);
        }
    }

    public String generateCode() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 7;
        Random random = new Random();

        String verificationCode = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return verificationCode;
    }
}
