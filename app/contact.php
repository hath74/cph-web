<?php
/* Set e-mail recipient */
$myemail  = "info@cascadiapublichouse.com";

/* Check all form inputs using check_input function */
$yourname = check_input($_POST['name'], "Enter your name");
$email    = check_input($_POST['email']);
$comments = check_input($_POST['message'], "Write your comments");

$headers = "From: $email\r\n";


/* Let's prepare the message for the e-mail */
$message = "Hello!

Your contact form has been submitted by:

Name: $yourname
E-mail: $email

Comments:
$comments

End of message
";

/* Send the message using mail() function */
mail($myemail, 'CPH contact form submission', $message, $headers);

/* Redirect visitor to the thank you page */
echo('Success');
exit();

/* Functions we used */
function check_input($data, $problem='')
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    if ($problem && strlen($data) == 0)
    {
        show_error($problem);
    }
    return $data;
}

function show_error($myError)
{
echo('Fail');
exit();
}
?>