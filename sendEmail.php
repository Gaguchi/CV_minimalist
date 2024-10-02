<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = 'contact@boriskaraia.com';
    $subject = 'New Contact Form Submission';
    $headers = 'From: ' . $email;

    $body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email\n\nMessage:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo 'Message sent successfully';
    } else {
        echo 'Message could not be sent';
    }
} else {
    echo 'Wrong request method';
}
?>