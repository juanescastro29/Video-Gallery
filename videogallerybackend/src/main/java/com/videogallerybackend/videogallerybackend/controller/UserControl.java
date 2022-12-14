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
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserControl {

    @Autowired
    private UserService userService;
    @Autowired
    private SendMailService sendMailService;

    @PostMapping("/registerUser")
    public ResponseEntity<Object> registerUser(@RequestBody User user) throws MessagingException, UnsupportedEncodingException {
        Map<String, Object> response = new HashMap<>();
        for (int i = 0; i < userService.getUsers().size(); i++) {
            if (user.getUserEmail().equals(userService.getUsers().get(i).getUserEmail())) {
                System.out.print(userService.getUsers().size());
                response.put("message", "Email already registered");
                response.put("user", null);
                return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
            }
        }
        String verificationCode = generateCode();
        user.setVerificationCode(verificationCode);
        userService.saveUser(user);
        sendMailService.sendEmail(user.getUserEmail(), verificationCode);
        response.put("message", "User registered");
        response.put("userId", user.getUserId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody Map<String, String> userCredentials) {
        String userEmail = userCredentials.get("userEmail");
        String userPassword = userCredentials.get("userPassword");
        User user = null;
        Map<String, Object> response = new HashMap<>();
        if (userService.getUsers().size() == 0) {
            response.put("route", "/register");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        for (int i = 0; i < userService.getUsers().size(); i++){
           if (userEmail.equals(userService.getUsers().get(i).getUserEmail())){
               user = userService.getUsers().get(i);
           }
        }

        if (user != null) {
            if (!userPassword.equals(user.getUserPassword())) {
                response.put("error", "Password incorrect");
                return new ResponseEntity<>(response, HttpStatus.BAD_GATEWAY);
            }
        }else {
            response.put("route", "/register");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        if (!user.isVerified()) {
            response.put("route", "/verification");
            response.put("userId", user.getUserId());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        response.put("route", "/");
        response.put("user", user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{user_email}")
    public User getUser(@PathVariable String user_email) {
        User user = new User();
        int position = 0;
        for (int i = 0; i < userService.getUsers().size(); i++){
            if (user_email.equals(userService.getUsers().get(i).getUserEmail())){
                position = i;
                i = userService.getUsers().size();
            }
        }
        user = userService.getUsers().get(position);
        return user;
    }

    @PostMapping("/verificationEmail/resend/{userId}")
    public String resendEmail(@PathVariable Integer userId) throws MessagingException, UnsupportedEncodingException {
        User user = userService.getUser(userId);
        String verificationCode = generateCode();
        user.setVerificationCode(verificationCode);
        userService.saveUser(user);
        sendMailService.sendEmail(user.getUserEmail(), verificationCode);
        return  "Email send";
    }

    @PutMapping("/verifyUser/{userId}")
    public ResponseEntity<Object> updateProfile(@RequestBody Map<String, String> verificationCode, @PathVariable Integer userId) {
        try {
            String codeUser = verificationCode.get("verificationCode");
            Map<String, Object> response = new HashMap<>();
            User userFound = userService.getUser(userId);
            if (userFound.getVerificationCode().equals(codeUser)){
                userFound.setVerified(true);
                userService.saveUser(userFound);
                response.put("route", "/videos");
                response.put("user", userFound);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }else {
                response.put("error", "Verification code incorrect");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Not user found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateProfile/{userId}")
    public ResponseEntity<String> updateProfile(@RequestBody User user, @PathVariable Integer userId) {
        try {
            User userFound = userService.getUser(userId);
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

    @DeleteMapping("/deleteAccount/{userId}")
    public ResponseEntity<String> deleteAccount(@PathVariable Integer userId) {
        try {
            int position = 0;
            for (int i = 0; i < userService.getUsers().size(); i++){
                if (userId == userService.getUsers().get(i).getUserId()){
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
