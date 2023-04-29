const webuild_pages = {};
const base_url = "http://127.0.0.1:8000/api/";

webuild_pages.Console = (title, values, oneValue = true) => {
  console.log("---" + title + "---");
  if (oneValue) {
    console.log(values);
  } else {
    for (let i = 0; i < values.length; i++) {
      console.log(values[i]);
    }
  }
  console.log("--/" + title + "---");
};
webuild_pages.loadFor = (page) => {
  eval("webuild_pages.load_" + page + "();");
};
webuild_pages.postAPI = async (api_url, api_data, api_token = null) => {
  try {
    return await axios.post(api_url, api_data, {
      headers: {
        Authorization: "Bearer " + api_token,
      },
    });
  } catch (error) {
    webuild_pages.Console("Error from POST", error);
  }
};
webuild_pages.securePostAPI = async (api_url, api_data, api_token) => {
  try {
    return await axios.post(api_url, api_data, {
      headers: {
        Authorization: "Bearer " + api_token,
      },
    });
  } catch (error) {
    webuild_pages.Console("Error from Secure POST", error);
  }
};
webuild_pages.getAPI = async (api_url, token = null) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios(api_url, config);
  } catch (error) {
    webuild_pages.Console("Error from Linking (GET)", error);
  }
};
webuild_pages.load_register_user = () => {
  const signup_btn = document.getElementById("register");
  const result = document.getElementById("response");
  const username_feedback = document.getElementById("username_f");
  const email_feedback = document.getElementById("email_f");
  const phone_feedback = document.getElementById("phone_f");
  const address_feedback = document.getElementById("address_f");
  const pass_feedback = document.getElementById("pass_f");

  const signup = async () => {
    const signup_url = base_url + "user/register";
    const signup_data = new URLSearchParams();
    signup_data.append("username", document.getElementById("username").value);
    signup_data.append("email", document.getElementById("email").value);
    signup_data.append("password", document.getElementById("password").value);
    signup_data.append(
      "password_confirmation",
      document.getElementById("password_confirmation").value
    );
    signup_data.append(
      "phone_number",
      document.getElementById("phone_number").value
    );
    signup_data.append("adress", document.getElementById("address").value);
    signup_data.append("user_type", "u");

    const response = await webuild_pages.postAPI(signup_url, signup_data);
    if (response.data.error) {
      if (response.data.error.username) {
        username_feedback.innerHTML = `<label id = "username_f" class="feedback-text"><b>${response.data.error.username[0]}</b></label>`;
        setTimeout(() => {
          username_feedback.innerHTML = `<label id = "username_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.email) {
        email_feedback.innerHTML = `<label id = "email_f" class="feedback-text"><b>${response.data.error.email[0]}</b></label>`;
        setTimeout(() => {
          email_feedback.innerHTML = `<label id = "email_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.phone_number) {
        phone_feedback.innerHTML = `<label id = "phone_f" class="feedback-text"><b>${response.data.error.phone_number[0]}</b></label>`;
        setTimeout(() => {
          phone_feedback.innerHTML = `<label id = "phone_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.adress) {
        address_feedback.innerHTML = `<label id = "address_f" class="feedback-text"><b>${response.data.error.adress[0]}</b></label>`;
        setTimeout(() => {
          address_feedback.innerHTML = `<label id = "address_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.password) {
        pass_feedback.innerHTML = `<label id = "pass_f" class="feedback-text"><b>${response.data.error.password[0]}</b></label>`;
        setTimeout(() => {
          pass_feedback.innerHTML = `<label id = "pass_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    }
    if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container response">
        <div class="alert alert-success alert-dismissible fade show" role="alert">${response.data.message}
        </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response" class="container mt-3">`;
      }, 5000);
    }
  };
  signup_btn.addEventListener("click", signup);
};
webuild_pages.load_register_warehouse = () => {
  const signup_btn = document.getElementById("register");
  const result = document.getElementById("response");
  const warehouse_feedback = document.getElementById("warehouse_f");
  const email_feedback = document.getElementById("email_f");
  const phone_feedback = document.getElementById("phone_f");
  const address_feedback = document.getElementById("address_f");
  const pass_feedback = document.getElementById("pass_f");
  const signup = async () => {
    const signup_url = base_url + "user/register";

    const signup_data = new URLSearchParams();
    signup_data.append("username", document.getElementById("warehouse").value);
    signup_data.append("email", document.getElementById("email").value);
    signup_data.append("password", document.getElementById("password").value);
    signup_data.append(
      "password_confirmation",
      document.getElementById("password_confirmation").value
    );
    signup_data.append(
      "phone_number",
      document.getElementById("phone_number").value
    );
    signup_data.append("adress", document.getElementById("address").value);
    signup_data.append("user_type", "w");

    const response = await webuild_pages.postAPI(signup_url, signup_data);
    if (response.data.error) {
      if (response.data.error.username) {
        warehouse_feedback.innerHTML = `<label id = "username_f" class="feedback-text"><b>${response.data.error.username[0]}</b></label>`;
        setTimeout(() => {
          warehouse_feedback.innerHTML = `<label id = "username_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.email) {
        email_feedback.innerHTML = `<label id = "email_f" class="feedback-text"><b>${response.data.error.email[0]}</b></label>`;
        setTimeout(() => {
          email_feedback.innerHTML = `<label id = "email_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.phone_number) {
        phone_feedback.innerHTML = `<label id = "phone_f" class="feedback-text"><b>${response.data.error.phone_number[0]}</b></label>`;
        setTimeout(() => {
          phone_feedback.innerHTML = `<label id = "phone_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.adress) {
        address_feedback.innerHTML = `<label id = "address_f" class="feedback-text"><b>${response.data.error.adress[0]}</b></label>`;
        setTimeout(() => {
          address_feedback.innerHTML = `<label id = "address_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.password) {
        pass_feedback.innerHTML = `<label id = "pass_f" class="feedback-text"><b>${response.data.error.password[0]}</b></label>`;
        setTimeout(() => {
          pass_feedback.innerHTML = `<label id = "pass_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    }
    if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container response">
          <div class="alert alert-success alert-dismissible fade show" role="alert">${response.data.message}
          </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response" class="container mt-3">`;
      }, 5000);
    }
  };
  signup_btn.addEventListener("click", signup);
};
webuild_pages.load_login = () => {
  const login_btn = document.getElementById("login");
  const result = document.getElementById("response");
  const email_feedback = document.getElementById("email_f");
  const pass_feedback = document.getElementById("pass_f");

  const login = async () => {
    const login_url = base_url + "user/login";
    const login_data = new URLSearchParams();
    login_data.append("email", document.getElementById("email").value);
    login_data.append("password", document.getElementById("password").value);

    const response = await webuild_pages.postAPI(login_url, login_data);
    if (response.data.error) {
      if (response.data.error.email) {
        email_feedback.innerHTML = `<label id = "email_f" class="feedback-text"><b>${response.data.error.email[0]}</b></label>`;
        setTimeout(() => {
          email_feedback.innerHTML = `<label id = "email_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      } else if (response.data.error.password) {
        pass_feedback.innerHTML = `<label id = "pass_f" class="feedback-text"><b>${response.data.error.password[0]}</b></label>`;
        setTimeout(() => {
          pass_feedback.innerHTML = `<label id = "pass_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      } else {
        result.innerHTML = `<main id = "response" class="container mt-3">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">${response.data.error}
              </div></main>`;
        setTimeout(() => {
          result.innerHTML = `<main id = "response" class="container mt-3">`;
        }, 5000);
      }
    } else {
      const userData = [];
      const user_type = response.data.user.user_type;
      const user_id = response.data.user.id;
      const username = response.data.user.username;
      const user_email = response.data.user.email;
      const phone_number = response.data.phone_number;
      const address = response.data.adress;
      const access_token = response.data.access_token;
      userData.push({
        user_type,
        user_id,
        username,
        user_email,
        phone_number,
        address,
        access_token,
      });
      localStorage.setItem("userData", JSON.stringify(userData));
      result.innerHTML = `<main id = "response" class="container mt-3">
            <div class="alert alert-neutral alert-dismissible fade show" role="alert">Welcome
          </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response" class="container mt-3">`;
      }, 2000);
      if (user_type === "u") {
        setTimeout(function () {
          window.location.href = "../views/userHome.html";
        }, 2000);
      } else if (user_type === "w") {
        setTimeout(function () {
          window.location.href = "../views/warehouseHome.html";
        }, 2000);
      }
    }
  };
  login_btn.addEventListener("click", login);
};
webuild_pages.load_reset_password = () => {
  const reset_pass_btn = document.getElementById("reset_pass");
  const email_feedback = document.getElementById("email_f");
  const result = document.getElementById("response");
  const sendResetLink = async () => {
    const reset_pass_url = base_url + "user/password/email";
    const reset_pass_data = new URLSearchParams();
    reset_pass_data.append("email", document.getElementById("email").value);
    const response = await webuild_pages.postAPI(
      reset_pass_url,
      reset_pass_data
    );
    if (!response) {
      email_feedback.innerHTML = `<label id = "email_f" class="feedback-text"><b>Invalid Email</b></label>`;
      setTimeout(() => {
        email_feedback.innerHTML = `<label id = "email_f" class="feedback-text"><b></b></label>`;
      }, 5000);
    } else if (response.data.error) {
      result.innerHTML = `<main id = "response" class="container mt-3">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">${response.data.error}
      </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response" class="container mt-3">`;
      }, 5000);
    } else if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container mt-3">
            <div class="alert alert-success alert-dismissible fade show" role="alert">${response.data.message}
          </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response" class="container mt-3">`;
      }, 5000);
    }
  };
  reset_pass_btn.addEventListener("click", sendResetLink);
};
webuild_pages.load_user_home = () => {
  const logout_btn = document.getElementById('logout');
  const getWarehouses = async () => {
    const get_warehouses_url = base_url + "user/w";
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      get_warehouses_url,
      access_token
    );
    const all_warehouses = document.getElementById("all_warehouses");
    let warehouses_list = `<div id = "all_warehouses" class="row gy-4">`;
    if (response.data.error) {
      all_warehouses.innerHTML = `<div id = "all_warehouses" class="row gy-4">
      <div class="hilight"></div>
       <p class="not-available"">No available Warehouses</p>`;
    }
    if (response.data.message) {
      const warehouses = response.data.Warehouses;
      warehouses.map(
        (warehouse, i) =>
          (warehouses_list += `<div id = ${warehouse.id} class="a-warehouse col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
        <div class="service-item  position-relative">
          <div class="icon">
            <i class="fa-solid fa-mountain-city"></i>
          </div>
          <h3>${warehouse.username}</h3>
          <p>Email: ${warehouse.email}</p>
          <p>Address: ${warehouse.adress}</p>
          <a onclick = "warehouseClickHandler('${warehouse.id}', '${warehouse.username}')" href="#" class="readmore stretched-link">Learn more <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>`)
      );
      warehouses_list += `</div>`;
      all_warehouses.innerHTML = warehouses_list;
    }
  };
  const logout = async () => {
    const logout_url = base_url + "user/logout";
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const logout_data = [];
    const response = await webuild_pages.postAPI(
      logout_url,
      logout_data,
      access_token
    );
    localStorage.clear();
    window.location.href = '../views/index.html';
  }
  getWarehouses();
  logout_btn.addEventListener('click', logout);
};
webuild_pages.load_warehouse_home = () => {
  const warehouse_id = localStorage.getItem("warehouse_id");
  const warehouse_name = localStorage.getItem("warehouse_name");
  const warehouse = document.getElementById("warehouse_name");
  warehouse.innerText = warehouse_name;
  const getMaterialsCategories = async () => {
    const get_categories_url = base_url + "category/" + warehouse_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      get_categories_url,
      access_token
    );
    const all_categories = document.getElementById("all_categories");
    let categories_list = `<div id = "all_categories" class="row gy-4">`;
    if (response.data.error) {
      all_categories.innerHTML = `<div id = "all_categories" class="row gy-4">
      <div class="hilight"></div>
       <p class="not-available"">No available Materials</p>`;
    }
    if (response.data.message) {
      const categories = response.data.Categories;
      categories.map((category, i) => {
        categories_list += `<div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
          <div class="service-item  position-relative">
            <div class="icon">
              <i class="fa-solid fa-trowel-bricks"></i>
            </div>
            <h3>${category.name}</h3>
            <p></p>
            <p></p>
            <a onclick = "categoriesClickHandler('${category.id}', '${category.name}')"href="#" class="readmore stretched-link"></a>
          </div>
          </div>`;
      });
      categories_list += `</div>`;
      all_categories.innerHTML = categories_list;
    }
  };
  getMaterialsCategories();
};
webuild_pages.load_materials = () => {
  const warehouse_name = localStorage.getItem("warehouse_name");
  const category_name = localStorage.getItem("category_name");
  const category_id = localStorage.getItem("category_id");
  const warehouse_id = localStorage.getItem("warehouse_id");
  const warehouse = document.getElementById("warehouse_name");
  warehouse.innerText = warehouse_name;
  const getMaterials = async () => {
    const get_materials_url =
      base_url + "material/" + warehouse_id + "/" + category_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      get_materials_url,
      access_token
    );
    const all_materials = document.getElementById("all_materials");
    let materials_list = `<div id = "all_materials" class="row gy-4 posts-list">`;
    if (response.data.error) {
      all_materials.innerHTML = `<div id = "all_materials" class="row gy-4 posts-list">
      <div class="hilight"></div>
       <p class="not-available"">No available Materials for ${category_name}</p>`;
    }
    if (response.data.message) {
      const materials = response.data.Materials;
      materials.map((material, i) => {
        let src = "../../webuild-server/public/images/WeBuild_Logo.png";
        const image_url = material.image_url;
        if (image_url !== "images/WeBuild_Logo.png") {
          src =
            "../../webuild-server/storage/app/public/materials/" + image_url;
        }
        materials_list += `<div class="col-xl-4 col-md-6">
          <div class="post-item position-relative h-100">
            <div class="post-img position-relative overflow-hidden">
              <img src="${src}" class="img-fluid" alt="">
            </div>
            <div class="post-content d-flex flex-column">
              <h3 class="post-title">${material.name}</h3>
              <p><b>Price <span>:</span></b>${material.price_per_unit}</p>
              <p class="post-description">${material.description}</p>
              <hr>
              <a href="blog-details.html" class="readmore stretched-link"><span>Order</span><i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>`;
      });
      materials_list += `</div>`;
      all_materials.innerHTML = materials_list;
    }
  };
  getMaterials();
};
webuild_pages.load_reviews = () => {
  const reviews_result = document.getElementById("response");
  const add_result = document.getElementById("add_response");
  const review_feedback = document.getElementById("review_f");
  const add_review = document.getElementById("addReview");
  const warehouse_id = localStorage.getItem("warehouse_id");
  const getReviews = async () => {
    const get_reviews_url = base_url + "reviews/" + warehouse_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(get_reviews_url, access_token);
    const all_reviews = document.getElementById("all_reviews");
    let reviews_list = `<div id = "all_reviews">`;
    if (response.data.message) {
      if (response.data.message == "No Comments") {
        reviews_result.innerHTML = `<main id = "response" class="container mt-3">
      <div class="alert alert-neutral alert-dismissible fade show" role="alert">No Reviews
    </div></main>`;
      } else if (response.data.message == "Available") {
        const reviews = response.data.comments;
        reviews.map(
          (review, i) =>
            { const user_id = store[0].user_id;
              let icon = `<i></i>`;
              if(user_id === review.user_id){
                icon = `<i id = "${review.id}" class="bi bi-trash delete-icon"></i>`
              }
              reviews_list += `<div class="card">
              <div class="card-body">
              <div class="material-item">
                  ${icon}
                </div>
                <h5>${review.username}</h5>
                <p class="card-text">${review.comment}</p> 
              </div>
            </div>
            <br>`}
        );
      }
    }
    reviews_list += `</div>`;
    all_reviews.innerHTML = reviews_list;
    const delete_icons = document.querySelectorAll(".delete-icon");
    delete_icons.forEach((element) => element.addEventListener("click", deleteReview));
  };
  const addReview = async () => {
    const add_review_url = base_url + "reviews/add";
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const add_review_data = new URLSearchParams();
    add_review_data.append("warehouse_id", warehouse_id);
    add_review_data.append("comment", document.getElementById("review").value);
    const response = await webuild_pages.postAPI(
      add_review_url,
      add_review_data,
      access_token
    );
    if (response.data.error) {
      if (response.data.error.comment) {
        review_feedback.innerHTML = `<label id = "review_f" class="feedback-text"><b>${response.data.error.comment[0]}</b></label>`;
        setTimeout(() => {
          review_feedback.innerHTML = `<label id = "review_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else if (response.data.message) {
      add_result.innerHTML = `<main id = "add_response" class="container mt-3">
                <div class="alert alert-neutral alert-dismissible fade show" role="alert">Review Added
              </div></main>`;
      setTimeout(() => {
        add_result.innerHTML = `<main id = "add_response"></main>`;
      }, 3000);
    }
  };
  const deleteReview = async (event) => {
    const review_id = event.target.id;
    const delete_reviews_url = base_url + "reviews/delete/" + review_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(delete_reviews_url, access_token);
    if (response.data.message){
      reviews_result.innerHTML =  `<main id = "response" class="container mt-3">
      <div class="alert alert-neutral alert-dismissible fade show" role="alert">Review Deleted!
    </div></main>`;
    setTimeout(() => {
      reviews_result.innerHTML = `<main id = "response" class="container mt-3"></main>`;
    }, 5000);
    }
  }
  getReviews();
  add_review.addEventListener("click", addReview);
};
webuild_pages.load_user_profile = () => {
  let change_happen = false;
  const user = document.getElementById("user");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const phone_number = document.getElementById("phone_number");
  const address = document.getElementById("address");
  const update_btn = document.getElementById("update_profile");
  const username_feedback = document.getElementById("username_f");
  const email_feedback = document.getElementById("email_f");
  const phone_feedback = document.getElementById("phone_f");
  const address_feedback = document.getElementById("address_f");
  const result = document.getElementById("response");
  const getUserProfile = async () => {
    const get_user_url = base_url + "user/user-profile";
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(get_user_url, access_token);
    if (response.data.id) {
      username.value = response.data.username;
      email.value = response.data.email;
      phone_number.value = response.data.phone_number;
      address.value = response.data.adress;
      user.innerText = response.data.username;
    }
  };
  const updateProfile = async () => {
    const update_profile_url = base_url + "user/editProfile";
    const update_profile_data = new URLSearchParams();
    update_profile_data.append("username", username.value);
    update_profile_data.append("email", email.value);
    update_profile_data.append("phone_number", phone_number.value);
    update_profile_data.append("adress", address.value);
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      update_profile_url,
      update_profile_data,
      access_token
    );
    if (response.data.error) {
      if (response.data.error.username) {
        username_feedback.innerHTML = `<label id = "username_f" class="feedback-text"><b>${response.data.error.username[0]}</b></label>`;
        setTimeout(() => {
          username_feedback.innerHTML = `<label id = "username_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.email) {
        email_feedback.innerHTML = `<label id = "email_f" class="feedback-text"><b>${response.data.error.email[0]}</b></label>`;
        setTimeout(() => {
          email_feedback.innerHTML = `<label id = "email_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.phone_number) {
        phone_feedback.innerHTML = `<label id = "phone_f" class="feedback-text"><b>${response.data.error.phone_number[0]}</b></label>`;
        setTimeout(() => {
          phone_feedback.innerHTML = `<label id = "phone_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.adress) {
        address_feedback.innerHTML = `<label id = "address_f" class="feedback-text"><b>${response.data.error.adress[0]}</b></label>`;
        setTimeout(() => {
          address_feedback.innerHTML = `<label id = "address_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    }
    if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container response">
        <div class="alert alert-success alert-dismissible fade show" role="alert">${response.data.message}
        </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response" class="container mt-3">`;
      }, 5000);
    }
  };
  username.addEventListener("change", () => (change_happen = true));
  email.addEventListener("change", () => (change_happen = true));
  phone_number.addEventListener("change", () => (change_happen = true));
  address.addEventListener("change", () => (change_happen = true));
  getUserProfile();
  update_btn.addEventListener("click", () => {
    if (change_happen) {
      updateProfile();
      change_happen = false;
    } else {
      result.innerHTML = `<main id = "response" class="container mt-3">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">Nothing to update.
      </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response" class="container mt-3">`;
      }, 5000);
    }
  });
};
webuild_pages.load_change_password = () => {
  const old_password = document.getElementById("old_password");
  const new_password = document.getElementById("new_password");
  const new_pass_conf = document.getElementById("pass_confirmation");
  const old_pass_feedback = document.getElementById("old_pass_f");
  const new_pass_feedback = document.getElementById("new_pass_f");
  const result = document.getElementById("response");
  const change_pass_btn = document.getElementById("change_pass");
  const forget_pass_btn = document.getElementById("forget_pass");
  const changePassword = async () => {
    const change_pass_url = base_url + "user/password/change";
    const change_pass_data = new URLSearchParams();
    change_pass_data.append("current_password", old_password.value);
    change_pass_data.append("new_password", new_password.value);
    change_pass_data.append("new_password_confirmation", new_pass_conf.value);
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      change_pass_url,
      change_pass_data,
      access_token
    );
    if (response.data.error) {
      if (response.data.error.current_password) {
        old_pass_feedback.innerHTML = `<label id = "old_pass_f" class="feedback-text"><b>${response.data.error.current_password[0]}</b></label>`;
        setTimeout(() => {
          old_pass_feedback.innerHTML = `<label id = "old_pass_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      } else if (response.data.error.new_password) {
        new_pass_feedback.innerHTML = `<label id = "new_pass_f" class="feedback-text"><b>${response.data.error.new_password[0]}</b></label>`;
        setTimeout(() => {
          new_pass_feedback.innerHTML = `<label id = "new_pass_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      } else {
        result.innerHTML = `<main id = "response" class="container mt-3">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">${response.data.error}
      </div></main>`;
        setTimeout(() => {
          result.innerHTML = `<main id = "response" class="container mt-3">`;
        }, 5000);
      }
    }
    if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container response">
        <div class="alert alert-success alert-dismissible fade show" role="alert">${response.data.message}
        </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response" class="container mt-3">`;
      }, 5000);
      setTimeout(function () {
        window.location.href = "../views/userHome.html";
      }, 5000);
    }
  };
  const resetPassword = async () => {
    const reset_pass_url = base_url + "user/password/email";
    const reset_pass_data = new URLSearchParams();
    const store = JSON.parse(localStorage.getItem("userData"));
    const email = store[0].user_email;
    reset_pass_data.append("email", email);
    const response = await webuild_pages.postAPI(
      reset_pass_url,
      reset_pass_data
    );
    if (response.data.error) {
      result.innerHTML = `<main id = "response" class="container mt-3">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">${response.data.error}
      </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response" class="container mt-3">`;
      }, 5000);
    } else if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container mt-3">
            <div class="alert alert-success alert-dismissible fade show" role="alert">${response.data.message}
          </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response" class="container mt-3">`;
      }, 5000);
      setTimeout(function () {
        window.location.href = "../views/userHome.html";
      }, 5000);
    }
  };
  change_pass_btn.addEventListener("click", changePassword);
  forget_pass_btn.addEventListener("click", resetPassword);
};
