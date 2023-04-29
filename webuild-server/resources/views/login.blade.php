<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EmailVerification</title>
    <style>
        body {
            height: 100vh;
            background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                url("../Utils/nature.png");
            background-size: cover;
            background-position: center;
            text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
            box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
            margin: 0;
            font-family: system-ui;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            background-color: #fff;
            overflow: hidden
        }
        .main-container {
            display: flex;
            text-align: center;
            color: #fff;
            background-color: #fff;
            /* background-image: linear-gradient(to bottom, #081132, #0d1941); */
            background-color: #263467;
        }
        .cover-container {
            max-width: 60vw;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            padding: 1rem;
            margin-right: auto;
            margin-left: auto;
        }
        .hilight {
            position: absolute;
            width: 40px;
            height: 200px;
            background: #6e7799;
            filter: blur(200px);
        }
        .text-blocks {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 10rem;
            user-select: none;
        }
        .lead {
            font-size: 2rem;
            font-weight: 300;
            line-height: 1.2;
        }
    </style>
  </head>
  <body class="main-container">
    <div class="cover-container">
        <main class="main-content">
            <div class="hilight"></div>
            <div class="text-blocks">
                <p class="lead">Email Verified.<br>Now you can login.</p>
            <div>
          </main>
    </div>
</body>