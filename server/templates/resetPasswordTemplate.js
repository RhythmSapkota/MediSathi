// passwordResetEmailTemplate.js

export const getPasswordResetEmailTemplate = (resetLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif;">

    <h2>Password Reset Request</h2>

    <p>You are receiving this email because a password reset request was made for your account.</p>
    
    <p>Please click the following link to reset your password:</p>

    <p><a href="${resetLink}">${resetLink}</a></p>

    <p>If you did not request this, please ignore this email.</p>

    <p>Regards,<br/>Your App Team</p>

</body>
</html>
`;
