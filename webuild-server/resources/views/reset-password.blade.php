<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>WEBUILD</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

   <!-- Favicons -->
   {{-- <link href="{{asset('../../../webuild-frontend/assets/img/favicon.png')}}" rel="icon">
   <link href="{{asset('../../../webuild-frontend/assets/img/apple-touch-icon.png')}}" rel="apple-touch-icon"> --}}
 
   <!-- Google Fonts -->
   {{-- <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"> --}}
 
   <!-- Vendor CSS Files -->
   {{-- <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
   <link href="../assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
   <link href="../assets/vendor/fontawesome-free/css/all.min.css" rel="stylesheet">
   <link href="../assets/vendor/aos/aos.css" rel="stylesheet">
   <link href="../assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
   <link href="../assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet"> --}}
 
   <!-- Template Main CSS File -->
   <link href="{{asset('../../../webuild-frontend/assets/css/main.css')}}" rel="stylesheet">
   <link href="{{asset('../../../webuild-frontend/assets/css/auth.css')}}" rel="stylesheet">
 </head>
 
 <body class="main-container">
    <!-- ======= Header ======= -->
  <header id="header" class="header d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <img src="../assets/webuild-logo-white.png" alt="">
      </a>
      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <nav id="navbar" class="navbar">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li class="dropdown"><a href="#"><span>Dropdown</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              <li><a href="#">Dropdown 1</a></li>
              <li class="dropdown"><a href="#"><span>Deep Dropdown</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                <ul>
                  <li><a href="#">Deep Dropdown 1</a></li>
                  <li><a href="#">Deep Dropdown 2</a></li>
                  <li><a href="#">Deep Dropdown 3</a></li>
                  <li><a href="#">Deep Dropdown 4</a></li>
                  <li><a href="#">Deep Dropdown 5</a></li>
                </ul>
              </li>
              <li><a href="#">Dropdown 2</a></li>
              <li><a href="#">Dropdown 3</a></li>
              <li><a href="#">Dropdown 4</a></li>
            </ul>
          </li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav><!-- .navbar -->
    </div>
  </header><!-- End Header -->
  <main>
  <div class="hilight"></div>
  <br>
  <br>
  <br>
  <br>
  <div data-aos="fade-down" class="card-container">
    <div class="raw">
      <div class="sub-container">
        <div class="card-content">
          <div class="card-body padding">
              <h5 class="card-title">Reset Password</h5>
              <div class="input">
                  <label class="form-label" for="email">Email</label>
                  <input
                    class="form-control"
                    type="text"
                    id="email"
                    name="email"
                    autofocus
                    required
                  />
                  <label id = "email_f" class="feedback-text"><b></b></label>
              </div>
              <button id = "reset_pass" class="btn">Send Reset Link</button>
              <label class="small-text">Do not have na acount</label>
            <a href="registerUser.html" class="register-link"><b>Register?</b></a>
          </div>
        </div>
      </div>
      <main id = "response" class="container response">
    </div>
    </div>
  </div>
  <footer class="fix-footer"></footer>
</main>
    <!-- Vendor JS Files -->
    {{-- <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/vendor/aos/aos.js"></script>
    <script src="../assets/vendor/glightbox/js/glightbox.min.js"></script>
    <script src="../assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
    <script src="../assets/vendor/swiper/swiper-bundle.min.js"></script>
    <script src="../assets/vendor/purecounter/purecounter_vanilla.js"></script>
    <script src="../assets/vendor/php-email-form/validate.js"></script> --}}
  
    <!-- Template Main JS File -->
    {{-- <script src="{{asset('../assets/js/main.js')}}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js"></script>
    <script src="{{asset('../../../webuild-frontend/javascripts/page_script.js')}}" type="text/javascript"></script> --}}
    {{-- <script>
        webuild_pages.loadFor("reset_password");
    </script> --}}
</body>

</html>