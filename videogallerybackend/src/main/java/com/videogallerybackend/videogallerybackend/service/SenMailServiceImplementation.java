package com.videogallerybackend.videogallerybackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;


@Service
public class SenMailServiceImplementation implements SendMailService{

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void senEmail(String toEmail, String verificationCode) throws MessagingException, UnsupportedEncodingException {
        String mailBody = "<h3>Hello, your verification code its the follows:<h3/><br><h2>"
                + verificationCode + "<h2/><br><p>Thank you<p/><p>The Video Gallery Team<p/>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("juanescastro29@gmail.com", "Video Gallery APP");
        helper.setTo(toEmail);
        helper.setSubject("Email verification");
        helper.setText(mailBody, true);

        mailSender.send(message);
    }
}
