<!DOCTYPE html>
<html>
    <head>
        <title>Verify Email Address</title>

        <style>
            /* Add your own styles here */
        </style>
    </head>
    <body>
        <div>
            <h1>Verify Email Address</h1>

            <p>
                Thanks for signing up for our service! Before getting started, we need to verify your email address.
            </p>

            <p>
                Please click the button below to verify your email address:
            </p>

            <div>
                <a href="{{ $verificationUrl }}">Verify Email Address</a>
            </div>
        </div>
    </body>
</html>
