package com.videogallerybackend.videogallerybackend.service;


import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface SendMailService {

    public void sendEmail(String toEmail, String verificationCode) throws MessagingException, UnsupportedEncodingException;

}
