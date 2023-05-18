const webuild_pages = {};
const base_url = "http://127.0.0.1:8000/api/";
let status_code = 200;
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
    status_code = error.response.status;
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
  window.location.href = "../views/index.html";
};
webuild_pages.load_register_user = () => {
  document.getElementById("register").disabled = true;
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
  const checkbox = document.getElementById("terms");
  const registerButton = document.getElementById("register");
  checkbox.addEventListener("change", function () {
    registerButton.disabled = !checkbox.checked;
  });
};
webuild_pages.load_register_warehouse = () => {
  document.getElementById("register").disabled = true;
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
  const checkbox = document.getElementById("terms");
  const registerButton = document.getElementById("register");
  checkbox.addEventListener("change", function () {
    registerButton.disabled = !checkbox.checked;
  });
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
          window.location.href = "../views/userHome.html";
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
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const nav_bar = document.getElementById("navbar");
  const getWarehouses = async () => {
    const get_warehouses_url = base_url + "user/w";
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
  if (user_type === "w") {
  console.log("I am here")
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a class = active href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  getWarehouses();
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_warehouse_home = () => {
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const warehouse_id = localStorage.getItem("warehouse_id");
  const warehouse_name = localStorage.getItem("warehouse_name");
  const nav_bar = document.getElementById("navbar");
  const warehouse = document.getElementById("warehouse_name");
  const result = document.getElementById("response");
  const authenticated_user = store[0].user_id;
  let add_btn = "";
  let edit_btn = "";
  let similar_to_logged_in_warehouse = false;
  if (authenticated_user == warehouse_id) {
    similar_to_logged_in_warehouse = true;
    add_btn = `<div class="text-center mt-5">
    <button id="add-category-btn" class="btn btn-primary"><a href = "addCategory.html">Add Category</a></button>
    </div>`;
  }
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
       <p class="not-available"">No available Materials</p>
       ${add_btn}`;
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
            <a onclick = "categoriesClickHandler('${category.id}', '${
          category.name
        }')"href="#" class="readmore stretched-link"></a>
            ${
              similar_to_logged_in_warehouse
                ? `<div class="dropdown1" onclick="event.stopPropagation()">
            <i class="bi bi-three-dots-vertical d1" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="addCategory.html?id=${category.id}">Edit</a>
              <a id = ${category.id} class="dropdown-item del" href="#">Delete</a>
            </div>
          </div>`
                : edit_btn
            }
          </div>
          </div>`;
      });
      categories_list += `</div>${add_btn}`;
      all_categories.innerHTML = categories_list;
      const delete_btns = document.querySelectorAll(".del");
      delete_btns.forEach((element) =>
        element.addEventListener("click", deleteMaterialsCategory)
      );
    }
  };
  const deleteMaterialsCategory = async (event) => {
    const category_id = event.target.id;
    const delete_category_url = base_url + "category/delete/" + category_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      delete_category_url,
      access_token
    );
    if (response.data.message) {
      result.innerHTML = `<div id = "response" class="container mt-3">
      <div class="alert alert-neutral alert-dismissible fade show" role="alert">Category Deleted!
    </div></div>`;
      setTimeout(() => {
        result.innerHTML = `<div id = "response""></div>`;
      }, 5000);
    }
  };
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  getMaterialsCategories();
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_materials = () => {
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const warehouse_name = localStorage.getItem("warehouse_name");
  const category_name = localStorage.getItem("category_name");
  const category_id = localStorage.getItem("category_id");
  const warehouse_id = localStorage.getItem("warehouse_id");
  const warehouse = document.getElementById("warehouse_name");
  const nav_bar = document.getElementById("navbar");
  const result = document.getElementById("response");
  const authenticated_user = store[0].user_id;
  let add_btn = "";
  let edit_btn = "";
  let similar_to_logged_in_warehouse = false;
  if (authenticated_user == warehouse_id) {
    similar_to_logged_in_warehouse = true;
    add_btn = `<div class="text-center mt-5">
    <button id="add-material-btn" class="btn btn-primary"><a href = "addMaterial.html">Add Material</a></button>
    </div>`;
  }
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
       <p class="not-available"">No available Materials for ${category_name}</p>
       ${add_btn}`;
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
              <p><b>Price <span>:</span></b>${material.price_per_unit}$</p>
              <p class="post-description">${material.description}</p>
              <hr>
              <a href="materialOrder.html?id=${
                material.id
              }" class="readmore stretched-link"><span>Order</span><i class="bi bi-arrow-right"></i></a>
            </div>
            ${
              similar_to_logged_in_warehouse
                ? `<div class="dropdown1" onclick="event.stopPropagation()">
            <i class="bi bi-three-dots-vertical d1" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="addMaterial.html?id=${material.id}">Edit</a>
              <a id = ${material.id} class="dropdown-item del" href="#">Delete</a>
            </div>
          </div>`
                : edit_btn
            }
          </div>
        </div>`;
      });
      materials_list += `</div>${add_btn}`;
      all_materials.innerHTML = materials_list;
      const delete_btns = document.querySelectorAll(".del");
      delete_btns.forEach((element) =>
        element.addEventListener("click", deleteMaterial)
      );
    }
  };
  const deleteMaterial = async (event) => {
    const material_id = event.target.id;
    const delete_material_url = base_url + "material/delete/" + material_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      delete_material_url,
      access_token
    );
    if (response.data.message) {
      result.innerHTML = `<div id = "response" class="container mt-3">
      <div class="alert alert-neutral alert-dismissible fade show" role="alert">Material Deleted!
    </div></div>`;
      setTimeout(() => {
        result.innerHTML = `<div id = "response""></div>`;
      }, 5000);
    }
  };
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  getMaterials();
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_services = () => {
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const warehouse_name = localStorage.getItem("warehouse_name");
  const warehouse_id = localStorage.getItem("warehouse_id");
  const warehouse = document.getElementById("warehouse_name");
  const nav_bar = document.getElementById("navbar");
  const result = document.getElementById("response");
  const authenticated_user = store[0].user_id;
  let add_btn = "";
  let edit_btn = "";
  let similar_to_logged_in_warehouse = false;
  if (authenticated_user == warehouse_id) {
    similar_to_logged_in_warehouse = true;
    add_btn = `<div class="text-center mt-5">
    <button id="add-service-btn" class="btn btn-primary"><a href = "addService.html">Add Service</a></button>
    </div>`;
  }
  warehouse.innerText = warehouse_name;
  const getServices = async () => {
    const get_services_url = base_url + "service/w/" + warehouse_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(get_services_url, access_token);
    const all_services = document.getElementById("all_services");
    let services_list = `<div id = "all_services" class="row gy-4 posts-list">`;
    if (response.data.error) {
      all_services.innerHTML = `<div id = "all_services" class="row gy-4 posts-list">
      <div class="hilight"></div>
       <p class="not-available"">No available Services.</p>
       ${add_btn}`;
    }
    if (response.data.message) {
      const services = response.data.Services;
      services.map((service, i) => {
        let src = "../../webuild-server/public/images/WeBuild_Logo.png";
        const image_url = service.image_url;
        if (image_url !== "images/WeBuild_Logo.png") {
          src = "../../webuild-server/storage/app/public/services/" + image_url;
        }
        services_list += `<div class="col-xl-4 col-md-6">
          <div class="post-item position-relative h-100">
            <div class="post-img position-relative overflow-hidden">
              <img src="${src}" class="img-fluid" alt="">
            </div>
            <div class="post-content d-flex flex-column">
              <h3 class="post-title">${service.name}</h3>
              <p><b>Minimum Charge <span>:</span></b>${
                service.minimum_charge_per_hour
              }$</p>
              <p class="post-description">${service.description}</p>
              <hr>
              <a href="serviceOrder.html?id=${
                service.id
              }" class="readmore stretched-link"><span>Book Service</span><i class="bi bi-arrow-right"></i></a>
            </div>
            ${
              similar_to_logged_in_warehouse
                ? `<div class="dropdown1" onclick="event.stopPropagation()">
            <i class="bi bi-three-dots-vertical d1" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="addService.html?id=${service.id}">Edit</a>
              <a id = ${service.id} class="dropdown-item del" href="#">Delete</a>
            </div>
          </div>`
                : edit_btn
            }
          </div>
        </div>`;
      });
      services_list += `</div>${add_btn}`;
      all_services.innerHTML = services_list;
      const delete_btns = document.querySelectorAll(".del");
      delete_btns.forEach((element) =>
        element.addEventListener("click", deleteService)
      );
    }
  };
  const deleteService = async (event) => {
    const service_id = event.target.id;
    const delete_service_url = base_url + "service/delete/" + service_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      delete_service_url,
      access_token
    );
    if (response.data.message) {
      result.innerHTML = `<div id = "response" class="container mt-3">
      <div class="alert alert-neutral alert-dismissible fade show" role="alert">Service Deleted!
    </div></div>`;
      setTimeout(() => {
        result.innerHTML = `<div id = "response""></div>`;
      }, 5000);
    }
  };
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  getServices();
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_equipments = () => {
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const warehouse_name = localStorage.getItem("warehouse_name");
  const warehouse_id = localStorage.getItem("warehouse_id");
  const warehouse = document.getElementById("warehouse_name");
  const nav_bar = document.getElementById("navbar");
  const result = document.getElementById("response");
  const authenticated_user = store[0].user_id;
  let add_btn = "";
  let edit_btn = "";
  let similar_to_logged_in_warehouse = false;
  if (authenticated_user == warehouse_id) {
    similar_to_logged_in_warehouse = true;
    add_btn = `<div class="text-center mt-5">
    <button id="add-equipment-btn" class="btn btn-primary"><a href = "addEquipment.html">Add Equipment</a></button>
    </div>`;
  }
  warehouse.innerText = warehouse_name;
  const getEquipments = async () => {
    const get_equipments_url = base_url + "equipment/w/" + warehouse_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      get_equipments_url,
      access_token
    );
    const all_equipments = document.getElementById("all_equipments");
    let equipments_list = `<div id = "all_equipments" class="row gy-4 posts-list">`;
    if (response.data.error) {
      all_equipments.innerHTML = `<div id = "all_equipments" class="row gy-4 posts-list">
      <div class="hilight"></div>
       <p class="not-available"">No available Equipments.</p>
       ${add_btn}`;
    }
    if (response.data.message) {
      const equipments = response.data.Equipments;
      equipments.map((equipment, i) => {
        let src = "../../webuild-server/public/images/WeBuild_Logo.png";
        const image_url = equipment.image_url;
        if (image_url !== "images/WeBuild_Logo.png") {
          src =
            "../../webuild-server/storage/app/public/equipments/" + image_url;
        }
        equipments_list += `<div class="col-xl-4 col-md-6">
          <div class="post-item position-relative h-100">
            <div class="post-img position-relative overflow-hidden">
              <img src="${src}" class="img-fluid" alt="">
            </div>
            <div class="post-content d-flex flex-column">
              <h3 class="post-title">${equipment.name}</h3>
              <p><b>Price <span>:</span></b>${equipment.price_per_hour}$</p>
              <p class="post-description">${equipment.description}</p>
              <hr>
              <a href="equipmentOrder.html?id=${
                equipment.id
              }" class="readmore stretched-link"><span>Book Equipment</span><i class="bi bi-arrow-right"></i></a>
            </div>
            ${
              similar_to_logged_in_warehouse
                ? `<div class="dropdown1" onclick="event.stopPropagation()">
            <i class="bi bi-three-dots-vertical d1" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="addEquipment.html?id=${equipment.id}">Edit</a>
              <a id = ${equipment.id} class="dropdown-item del" href="#">Delete</a>
            </div>
          </div>`
                : edit_btn
            }
          </div>
        </div>`;
      });
      equipments_list += `</div>${add_btn}`;
      all_equipments.innerHTML = equipments_list;
      const delete_btns = document.querySelectorAll(".del");
      delete_btns.forEach((element) =>
        element.addEventListener("click", deleteEquipment)
      );
    }
  };
  const deleteEquipment = async (event) => {
    const equipment_id = event.target.id;
    const delete_equipment_url = base_url + "equipment/delete/" + equipment_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      delete_equipment_url,
      access_token
    );
    if (response.data.message) {
      result.innerHTML = `<div id = "response" class="container mt-3">
      <div class="alert alert-neutral alert-dismissible fade show" role="alert">Equipment Deleted!
    </div></div>`;
      setTimeout(() => {
        result.innerHTML = `<div id = "response""></div>`;
      }, 5000);
    }
  };
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  getEquipments();
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_reviews = () => {
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const reviews_result = document.getElementById("response");
  const add_result = document.getElementById("add_response");
  const review_feedback = document.getElementById("review_f");
  const add_review = document.getElementById("addReview");
  const warehouse_id = localStorage.getItem("warehouse_id");
  const nav_bar = document.getElementById("navbar");
  const warehouse_name = localStorage.getItem("warehouse_name");
  const warehouse = document.getElementById("warehouse_name");
  warehouse.innerText = warehouse_name;
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
        reviews.map((review, i) => {
          const user_id = store[0].user_id;
          let icon = `<i></i>`;
          if (user_id === review.user_id) {
            icon = `<i id = "${review.id}" class="bi bi-trash delete-icon"></i>`;
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
            <br>`;
        });
      }
    }
    reviews_list += `</div>`;
    all_reviews.innerHTML = reviews_list;
    const delete_icons = document.querySelectorAll(".delete-icon");
    delete_icons.forEach((element) =>
      element.addEventListener("click", deleteReview)
    );
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
    const response = await webuild_pages.getAPI(
      delete_reviews_url,
      access_token
    );
    if (response.data.message) {
      reviews_result.innerHTML = `<main id = "response" class="container mt-3">
      <div class="alert alert-neutral alert-dismissible fade show" role="alert">Review Deleted!
    </div></main>`;
      setTimeout(() => {
        reviews_result.innerHTML = `<main id = "response" class="container mt-3"></main>`;
      }, 5000);
    }
  };
  getReviews();
  add_review.addEventListener("click", addReview);
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
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
  const main_page = document.getElementById("main-page");
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const nav_bar = document.getElementById("navbar");
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
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
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
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const nav_bar = document.getElementById("navbar");
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
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_add_category = () => {
  let change_happen = false;
  const store = JSON.parse(localStorage.getItem("userData"));
  const warehouse_name = store[0].username;
  const warehouse_id = store[0].user_id;
  const nav_bar = document.getElementById("navbar");
  const add_category_btn = document.getElementById("add-category");
  const name_feedback = document.getElementById("name_f");
  const warehouse = document.getElementById("warehouse_name");
  const result = document.getElementById("response");
  warehouse.innerText = warehouse_name;
  const urlParams = new URLSearchParams(window.location.search);
  const category_id = urlParams.get("id");
  const category_name = document.getElementById("category-name");
  const form_title = document.getElementById("form-title");

  const addCategory = async () => {
    const add_category_url = base_url + "category/add";
    const add_category_data = new URLSearchParams();
    add_category_data.append("category_name", category_name.value);
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      add_category_url,
      add_category_data,
      access_token
    );
    if (response.data.error) {
      if (response.data.error.category_name) {
        name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b>${response.data.error.category_name[0]}</b></label>`;
        setTimeout(() => {
          name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container mt-3">
                <div class="alert alert-neutral alert-dismissible fade show" role="alert">Material Category Added
              </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response"></main>`;
      }, 3000);
    }
  };
  const getCategory = async () => {
    const get_category_url = base_url + "category/one/" + category_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(get_category_url, access_token);
    if (response.data.message) {
      category_name.value = response.data.message.name;
    }
  };

  const updateCategory = async () => {
    const update_category_url = base_url + "category/update/" + category_id;
    const update_category_data = new URLSearchParams();
    update_category_data.append("category_name", category_name.value);
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      update_category_url,
      update_category_data,
      access_token
    );
    if (response.data.error) {
      if (response.data.error.category_name) {
        name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b>${response.data.error.category_name[0]}</b></label>`;
        setTimeout(() => {
          name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container mt-3">
                <div class="alert alert-neutral alert-dismissible fade show" role="alert">${response.data.message}
              </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response"></main>`;
      }, 3000);
    }
  };
  nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  if (category_id) {
    category_name.addEventListener("change", () => (change_happen = true));
    getCategory();
    add_category_btn.innerText = "Edit";
    form_title.innerText = "Edit Material Category";
    add_category_btn.addEventListener("click", () => {
      if (change_happen) {
        updateCategory();
        change_happen = false;
      } else {
        result.innerHTML = `<main id = "response" class="container mt-3">
          <div class="alert alert-danger alert-dismissible fade show" role="alert">Nothing to update.
        </div></main>`;
        setTimeout(() => {
          result.innerHTML = `<main id = "response" class="container mt-3">`;
        }, 3000);
      }
    });
  } else {
    add_category_btn.innerText = "Add";
    form_title.innerText = "Add Material Category";
    add_category_btn.addEventListener("click", addCategory);
  }
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_add_material = () => {
  let change_happen = false;
  const store = JSON.parse(localStorage.getItem("userData"));
  const warehouse_name = store[0].username;
  const warehouse_id = store[0].user_id;
  const nav_bar = document.getElementById("navbar");
  const add_material_btn = document.getElementById("add-material");
  const name_feedback = document.getElementById("name_f");
  const price_feedback = document.getElementById("price_f");
  const quantity_feedback = document.getElementById("quantity_f");
  const description_feedback = document.getElementById("description_f");
  const image_feedback = document.getElementById("image_f");
  const warehouse = document.getElementById("warehouse_name");
  const result = document.getElementById("response");
  warehouse.innerText = warehouse_name;
  const urlParams = new URLSearchParams(window.location.search);
  const material_id = urlParams.get("id");
  const material_name = document.getElementById("material-name");
  const price = document.getElementById("price");
  const quantity = document.getElementById("quantity");
  const description = document.getElementById("description");
  const image = document.getElementById("image");
  const form_title = document.getElementById("form-title");
  const category_id = localStorage.getItem("category_id");
  const imagePreview = document.querySelector(".image-preview");

  image.addEventListener("change", function () {
    const file = image.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.style.display = "block";
        imagePreview.style.backgroundImage = `url(${this.result})`;
      });
      reader.readAsDataURL(file);
    } else {
      image.value = "";
      image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>The file must be an image.</b></label>`;
      setTimeout(() => {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
      }, 5000);
      imagePreview.style.backgroundImage = `url(${this.result})`;
      imagePreview.style.display = "none";
    }
  });
  const addMaterial = async () => {
    const add_material_url = base_url + "material/add";
    const add_material_data = new FormData();
    const file = image.files[0];
    add_material_data.append("category_id", category_id);
    add_material_data.append("material_name", material_name.value);
    add_material_data.append("price_per_unit", price.value);
    add_material_data.append("available_quantity", quantity.value);
    add_material_data.append("material_description", description.value);
    if (file) {
      add_material_data.append("image", file);
    }
    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      add_material_url,
      add_material_data,
      access_token
    );
    console.log(response);
    if (!response && status_code === 413) {
      image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>The file is too large. Cannot be added.</b></label>`;
      setTimeout(() => {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
      }, 5000);
      return;
    }
    if (response.data.error) {
      console.log(response.data.error);
      if (response.data.error.material_name) {
        name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b>${response.data.error.material_name[0]}</b></label>`;
        setTimeout(() => {
          name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.price_per_unit) {
        price_feedback.innerHTML = `<label id = "price_f" class="feedback-text"><b>${response.data.error.price_per_unit[0]}</b></label>`;
        setTimeout(() => {
          price_feedback.innerHTML = `<label id = "price_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.available_quantity) {
        quantity_feedback.innerHTML = `<label id = "quantity_f" class="feedback-text"><b>${response.data.error.available_quantity[0]}</b></label>`;
        setTimeout(() => {
          quantity_feedback.innerHTML = `<label id = "quantity_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.material_description) {
        description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b>${response.data.error.material_description[0]}</b></label>`;
        setTimeout(() => {
          description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.image) {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>${response.data.error.image[0]}</b></label>`;
        setTimeout(() => {
          image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container mt-3">
                <div class="alert alert-neutral alert-dismissible fade show" role="alert">${response.data.message}
              </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response"></main>`;
      }, 3000);
    }
  };
  const getMaterial = async () => {
    const get_material_url = base_url + "material/one/" + material_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(get_material_url, access_token);
    let image_url = "";
    if (response.data.message) {
      material_name.value = response.data.message.name;
      price.value = response.data.message.price_per_unit;
      quantity.value = response.data.message.available_quantity;
      description.value = response.data.message.description;
      if (response.data.message.image_url === "images/WeBuild_Logo.png") {
        image_url = "../../webuild-server/public/images/WeBuild_Logo.png";
      } else {
        image_url =
          "../../webuild-server/storage/app/public/materials/" +
          response.data.message.image_url;
      }
      imagePreview.style.display = "block";
      imagePreview.style.backgroundImage = `url(${image_url})`;
    }
  };

  const updateMaterial = async () => {
    const update_material_url = base_url + "material/update/" + material_id;
    const update_material_data = new FormData();
    const file = image.files[0];
    update_material_data.append("category_id", category_id);
    update_material_data.append("material_name", material_name.value);
    update_material_data.append("price_per_unit", price.value);
    update_material_data.append("available_quantity", quantity.value);
    update_material_data.append("material_description", description.value);
    if (file) {
      update_material_data.append("image", file);
    }
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      update_material_url,
      update_material_data,
      access_token
    );
    if (response.data.error) {
      if (response.data.error.material_name) {
        name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b>${response.data.error.material_name[0]}</b></label>`;
        setTimeout(() => {
          name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.price_per_unit) {
        price_feedback.innerHTML = `<label id = "price_f" class="feedback-text"><b>${response.data.error.price_per_unit[0]}</b></label>`;
        setTimeout(() => {
          price_feedback.innerHTML = `<label id = "price_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.available_quantity) {
        quantity_feedback.innerHTML = `<label id = "quantity_f" class="feedback-text"><b>${response.data.error.available_quantity[0]}</b></label>`;
        setTimeout(() => {
          quantity_feedback.innerHTML = `<label id = "quantity_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.material_description) {
        description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b>${response.data.error.material_description[0]}</b></label>`;
        setTimeout(() => {
          description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.image) {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>${response.data.error.image[0]}</b></label>`;
        setTimeout(() => {
          image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else if (response.data.message) {
      change_happen = false;
      result.innerHTML = `<main id = "response" class="container mt-3">
                <div class="alert alert-neutral alert-dismissible fade show" role="alert">${response.data.message}
              </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response"></main>`;
      }, 3000);
    }
  };
  nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  if (material_id) {
    material_name.addEventListener("change", () => (change_happen = true));
    price.addEventListener("change", () => (change_happen = true));
    quantity.addEventListener("change", () => (change_happen = true));
    description.addEventListener("change", () => (change_happen = true));
    image.addEventListener("change", () => (change_happen = true));
    getMaterial();
    add_material_btn.innerText = "Edit";
    form_title.innerText = "Edit Material";
    add_material_btn.addEventListener("click", () => {
      if (change_happen) {
        updateMaterial();
      } else {
        result.innerHTML = `<main id = "response" class="container mt-3">
          <div class="alert alert-danger alert-dismissible fade show" role="alert">Nothing to update.
        </div></main>`;
        setTimeout(() => {
          result.innerHTML = `<main id = "response" class="container mt-3">`;
        }, 3000);
      }
    });
  } else {
    add_material_btn.innerText = "Add";
    form_title.innerText = "Add Material";
    add_material_btn.addEventListener("click", addMaterial);
  }
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_add_service = () => {
  let change_happen = false;
  const store = JSON.parse(localStorage.getItem("userData"));
  const warehouse_name = store[0].username;
  const warehouse_id = store[0].user_id;
  const nav_bar = document.getElementById("navbar");
  const add_service_btn = document.getElementById("add-service");
  const name_feedback = document.getElementById("name_f");
  const charge_feedback = document.getElementById("charge_f");
  const description_feedback = document.getElementById("description_f");
  const image_feedback = document.getElementById("image_f");
  const time_mon_feedback = document.getElementById("time_mon_f");
  const time_tue_feedback = document.getElementById("time_tue_f");
  const time_wed_feedback = document.getElementById("time_wed_f");
  const time_thu_feedback = document.getElementById("time_thu_f");
  const time_fri_feedback = document.getElementById("time_fri_f");
  const time_sat_feedback = document.getElementById("time_sat_f");
  const time_sun_feedback = document.getElementById("time_sun_f");

  const warehouse = document.getElementById("warehouse_name");
  const result = document.getElementById("response");
  warehouse.innerText = warehouse_name;
  const urlParams = new URLSearchParams(window.location.search);
  const service_id = urlParams.get("id");
  const service_name = document.getElementById("service-name");
  const charge = document.getElementById("charge");
  const description = document.getElementById("description");
  const image = document.getElementById("image");
  const current_year = new Date().getFullYear();
  const current_month = new Date().getMonth() + 1;
  const year_select = document.getElementById("year");
  const month_select = document.getElementById("month");
  const toggle_all = document.getElementById("toggle-all");
  const open_mon = document.getElementById("open-mon");
  const open_tue = document.getElementById("open-tue");
  const open_wed = document.getElementById("open-wed");
  const open_thu = document.getElementById("open-thu");
  const open_fri = document.getElementById("open-fri");
  const open_sat = document.getElementById("open-sat");
  const open_sun = document.getElementById("open-sun");
  const start_time_mon = document.getElementById("start-time-mon");
  const end_time_mon = document.getElementById("end-time-mon");
  const start_time_tue = document.getElementById("start-time-tue");
  const end_time_tue = document.getElementById("end-time-tue");
  const start_time_wed = document.getElementById("start-time-wed");
  const end_time_wed = document.getElementById("end-time-wed");
  const start_time_thu = document.getElementById("start-time-thu");
  const end_time_thu = document.getElementById("end-time-thu");
  const start_time_fri = document.getElementById("start-time-fri");
  const end_time_fri = document.getElementById("end-time-fri");
  const start_time_sat = document.getElementById("start-time-sat");
  const end_time_sat = document.getElementById("end-time-sat");
  const start_time_sun = document.getElementById("start-time-sun");
  const end_time_sun = document.getElementById("end-time-sun");

  const form_title = document.getElementById("form-title");
  const imagePreview = document.querySelector(".image-preview");
  let file = null;

  image.addEventListener("change", function () {
    file = image.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.style.display = "block";
        imagePreview.style.backgroundImage = `url(${this.result})`;
      });
      reader.readAsDataURL(file);
    } else {
      image.value = "";
      file = null;
      image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>The file must be an image.</b></label>`;
      setTimeout(() => {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
      }, 5000);
      imagePreview.style.backgroundImage = `url(${this.result})`;
      imagePreview.style.display = "none";
    }
  });
  flatpickr(".type-input", {
    enableTime: true,
    noCalendar: true,
    minuteIncrement: 30,
    dateFormat: "H:i",
  });
  year_select.options[0].value = current_year;
  year_select.options[0].innerText = current_year;
  month_select.options[0].value = current_month;
  month_value = month_select.options[0].value;
  for (let i = 0; i < month_select.options.length; i++) {
    const option = month_select.options[i];
    if (option.value === month_value) {
      month_select.options[0].innerText = option.innerText;
    }
  }
  const toggleAll = (toggled_btn) => {
    if (parseInt(toggled_btn.value) === 0) {
      toggled_btn.value = "1";
      toggled_btn.style.backgroundColor = "#081132";
      setTrue(open_mon);
      setTrue(open_tue);
      setTrue(open_wed);
      setTrue(open_thu);
      setTrue(open_fri);
      setTrue(open_sat);
      setTrue(open_sun);
    } else if (parseInt(toggled_btn.value) === 1) {
      toggled_btn.value = "0";
      toggled_btn.style.backgroundColor = "#ccc";
      setFalse(open_mon);
      setFalse(open_tue);
      setFalse(open_wed);
      setFalse(open_thu);
      setFalse(open_fri);
      setFalse(open_sat);
      setFalse(open_sun);
    }
  };
  const setTrue = (toggled_btn) => {
    const time_container = toggled_btn.nextElementSibling;
    toggled_btn.value = "1";
    toggled_btn.style.backgroundColor = "#081132";
    time_container.style.display = "block";
  };
  const setFalse = (toggled_btn) => {
    const time_container = toggled_btn.nextElementSibling;
    toggled_btn.value = "0";
    toggled_btn.style.backgroundColor = "#ccc";
    time_container.style.display = "none";
  };
  const toggle = (toggled_btn) => {
    const time_container = toggled_btn.nextElementSibling;
    if (parseInt(toggled_btn.value) === 0) {
      toggled_btn.value = "1";
      toggled_btn.style.backgroundColor = "#081132";
      time_container.style.display = "block";
    } else if (parseInt(toggled_btn.value) === 1) {
      toggled_btn.value = "0";
      toggled_btn.style.backgroundColor = "#ccc";
      time_container.style.display = "none";
    }
  };
  const addService = async () => {
    const add_service_url = base_url + "service/add";
    const add_service_data = new FormData();
    add_service_data.append("service_name", service_name.value);
    add_service_data.append("minimum_charge_per_hour", charge.value);
    add_service_data.append("service_description", description.value);
    if (file) {
      console.log("I enter");
      add_service_data.append("image", file);
    }
    add_service_data.append("year", year_select.value);
    add_service_data.append("month", selectedMonth);
    add_service_data.append("isOpenMonday", open_mon.value);
    add_service_data.append("isOpenTuesday", open_tue.value);
    add_service_data.append("isOpenWednesday", open_wed.value);
    add_service_data.append("isOpenThursday", open_thu.value);
    add_service_data.append("isOpenFriday", open_fri.value);
    add_service_data.append("isOpenSaturday", open_sat.value);
    add_service_data.append("isOpenSunday", open_sun.value);
    if (open_mon.value == "1") {
      add_service_data.append("MondayStartTime", start_time_mon.value);
      add_service_data.append("MondayEndTime", end_time_mon.value);
    }
    if (open_tue.value == "1") {
      add_service_data.append("TuesdayStartTime", start_time_tue.value);
      add_service_data.append("TuesdayEndTime", end_time_tue.value);
    }
    if (open_wed.value == "1") {
      add_service_data.append("WednesdayStartTime", start_time_wed.value);
      add_service_data.append("WednesdayEndTime", end_time_wed.value);
    }
    if (open_thu.value == "1") {
      add_service_data.append("ThursdayStartTime", start_time_thu.value);
      add_service_data.append("ThursdayEndTime", end_time_thu.value);
    }
    if (open_fri.value == "1") {
      add_service_data.append("FridayStartTime", start_time_fri.value);
      add_service_data.append("FridayEndTime", end_time_fri.value);
    }
    if (open_sat.value == "1") {
      add_service_data.append("SaturdayStartTime", start_time_sat.value);
      add_service_data.append("SaturdayEndTime", end_time_sat.value);
    }
    if (open_sun.value == "1") {
      add_service_data.append("SundayStartTime", start_time_sun.value);
      add_service_data.append("SundayEndTime", end_time_sun.value);
    }
    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      add_service_url,
      add_service_data,
      access_token
    );
    console.log(response);
    if (!response && status_code === 413) {
      image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>The file is too large. Cannot be added.</b></label>`;
      setTimeout(() => {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
      }, 5000);
      return;
    }
    if (response.data.error) {
      console.log(response.data.error);
      if (response.data.error.service_name) {
        name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b>${response.data.error.service_name[0]}</b></label>`;
        setTimeout(() => {
          name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.minimum_charge_per_hour) {
        charge_feedback.innerHTML = `<label id = "charge_f" class="feedback-text"><b>${response.data.error.minimum_charge_per_hour[0]}</b></label>`;
        setTimeout(() => {
          charge_feedback.innerHTML = `<label id = "charge_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.service_description) {
        description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b>${response.data.error.service_description[0]}</b></label>`;
        setTimeout(() => {
          description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.image) {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>${response.data.error.image[0]}</b></label>`;
        setTimeout(() => {
          image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.MondayEndTime) {
        time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b>${response.data.error.MondayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.MondayStartTime) {
        time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b>${response.data.error.MondayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.TuesdayEndTime) {
        time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b>${response.data.error.TuesdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.TuesdayStartTime) {
        time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b>${response.data.error.TuesdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.WednesdayEndTime) {
        time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b>${response.data.error.WednesdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.WednesdayStartTime) {
        time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b>${response.data.error.WednesdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.ThursdayEndTime) {
        time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b>${response.data.error.ThursdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.ThursdayStartTime) {
        time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b>${response.data.error.ThursdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.FridayEndTime) {
        time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b>${response.data.error.FridayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.FridayStartTime) {
        time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b>${response.data.error.FridayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SaturdayEndTime) {
        time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b>${response.data.error.SaturdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SaturdayStartTime) {
        time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b>${response.data.error.SaturdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SundayEndTime) {
        time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b>${response.data.error.SundayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SundayStartTime) {
        time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b>${response.data.error.SundayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container mt-3">
                <div class="alert alert-neutral alert-dismissible fade show" role="alert">${response.data.message}
              </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response"></main>`;
      }, 3000);
    }
  };
  const getService = async () => {
    const get_service_url = base_url + "service/" + service_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(get_service_url, access_token);
    let image_url = "";
    if (response.data.message) {
      service_name.value = response.data.service.name;
      charge.value = response.data.service.minimum_charge_per_hour;
      description.value = response.data.service.description;
      if (response.data.service.image_url === "images/WeBuild_Logo.png") {
        image_url = "../../webuild-server/public/images/WeBuild_Logo.png";
      } else {
        image_url =
          "../../webuild-server/storage/app/public/services/" +
          response.data.service.image_url;
      }
      imagePreview.style.display = "block";
      imagePreview.style.backgroundImage = `url(${image_url})`;
      if (response.data.availability.length != 0) {
        let availability = {
          mon: 0,
          tue: 0,
          wed: 0,
          thu: 0,
          fri: 0,
          sat: 0,
          sun: 0,
          mon_start_time: "",
          mon_end_time: "",
          tue_start_time: "",
          tue_end_time: "",
          wed_start_time: "",
          wed_end_time: "",
          thu_start_time: "",
          thu_end_time: "",
          fri_start_time: "",
          fri_end_time: "",
          sat_start_time: "",
          sat_end_time: "",
          sun_start_time: "",
          sun_end_time: "",
        };
        let monthName;
        let year;
        const service_availability = response.data.availability;
        const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        for (i in service_availability) {
          const date = new Date(service_availability[i].date);
          monthIndex = date.getMonth();
          year = date.getFullYear();
          const dayOfWeek = date.getDay();
          const dayName = daysOfWeek[dayOfWeek];
          availability[dayName] = 1;
          const ini_start_time =
            service_availability[i].start_time.split(" ")[1];
          const start_time = ini_start_time.substring(
            0,
            ini_start_time.length - 3
          );
          availability[dayName + "_start_time"] = start_time;
          const ini_end_time = service_availability[i].end_time.split(" ")[1];
          const end_time = ini_end_time.substring(0, ini_end_time.length - 3);
          availability[dayName + "_end_time"] = end_time;
        }
        month_select.selectedIndex = 3 + 1;
        year_select.value = year;
        if (availability.mon != 0) {
          setTrue(open_mon);
          start_time_mon.value = availability.mon_start_time;
          end_time_mon.value = availability.mon_end_time;
        }
        if (availability.tue != 0) {
          setTrue(open_tue);
          start_time_tue.value = availability.tue_start_time;
          end_time_tue.value = availability.tue_end_time;
        }
        if (availability.wed != 0) {
          setTrue(open_wed);
          start_time_wed.value = availability.wed_start_time;
          end_time_wed.value = availability.wed_end_time;
        }
        if (availability.thu != 0) {
          setTrue(open_thu);
          start_time_thu.value = availability.thu_start_time;
          end_time_thu.value = availability.thu_end_time;
        }
        if (availability.fri != 0) {
          setTrue(open_fri);
          start_time_fri.value = availability.fri_start_time;
          end_time_fri.value = availability.fri_end_time;
        }
        if (availability.sat != 0) {
          setTrue(open_sat);
          start_time_sat.value = availability.sat_start_time;
          end_time_sat.value = availability.sat_end_time;
        }
        if (availability.sun != 0) {
          setTrue(open_sun);
          start_time_sun.value = availability.sun_start_time;
          end_time_sun.value = availability.sun_end_time;
        }
      }
    }
  };
  const updateService = async () => {
    const update_service_url = base_url + "service/update/" + service_id;
    const update_service_data = new FormData();
    update_service_data.append("service_name", service_name.value);
    update_service_data.append("minimum_charge_per_hour", charge.value);
    update_service_data.append("service_description", description.value);
    if (file) {
      update_service_data.append("image", file);
    }
    update_service_data.append("year", year_select.value);
    update_service_data.append("month", selectedMonth);
    update_service_data.append("isOpenMonday", open_mon.value);
    update_service_data.append("isOpenTuesday", open_tue.value);
    update_service_data.append("isOpenWednesday", open_wed.value);
    update_service_data.append("isOpenThursday", open_thu.value);
    update_service_data.append("isOpenFriday", open_fri.value);
    update_service_data.append("isOpenSaturday", open_sat.value);
    update_service_data.append("isOpenSunday", open_sun.value);
    if (open_mon.value == "1") {
      update_service_data.append("MondayStartTime", start_time_mon.value);
      update_service_data.append("MondayEndTime", end_time_mon.value);
    }
    if (open_tue.value == "1") {
      update_service_data.append("TuesdayStartTime", start_time_tue.value);
      update_service_data.append("TuesdayEndTime", end_time_tue.value);
    }
    if (open_wed.value == "1") {
      update_service_data.append("WednesdayStartTime", start_time_wed.value);
      update_service_data.append("WednesdayEndTime", end_time_wed.value);
    }
    if (open_thu.value == "1") {
      update_service_data.append("ThursdayStartTime", start_time_thu.value);
      update_service_data.append("ThursdayEndTime", end_time_thu.value);
    }
    if (open_fri.value == "1") {
      update_service_data.append("FridayStartTime", start_time_fri.value);
      update_service_data.append("FridayEndTime", end_time_fri.value);
    }
    if (open_sat.value == "1") {
      update_service_data.append("SaturdayStartTime", start_time_sat.value);
      update_service_data.append("SaturdayEndTime", end_time_sat.value);
    }
    if (open_sun.value == "1") {
      update_service_data.append("SundayStartTime", start_time_sun.value);
      update_service_data.append("SundayEndTime", end_time_sun.value);
    }
    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      update_service_url,
      update_service_data,
      access_token
    );
    console.log(response);
    if (!response && status_code === 413) {
      image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>The file is too large. Cannot be added.</b></label>`;
      setTimeout(() => {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
      }, 5000);
      return;
    }
    if (response.data.error) {
      console.log(response.data.error);
      if (response.data.error.service_name) {
        name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b>${response.data.error.service_name[0]}</b></label>`;
        setTimeout(() => {
          name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.minimum_charge_per_hour) {
        charge_feedback.innerHTML = `<label id = "charge_f" class="feedback-text"><b>${response.data.error.minimum_charge_per_hour[0]}</b></label>`;
        setTimeout(() => {
          charge_feedback.innerHTML = `<label id = "charge_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.service_description) {
        description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b>${response.data.error.service_description[0]}</b></label>`;
        setTimeout(() => {
          description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.image) {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>${response.data.error.image[0]}</b></label>`;
        setTimeout(() => {
          image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.MondayEndTime) {
        time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b>${response.data.error.MondayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.MondayStartTime) {
        time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b>${response.data.error.MondayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.TuesdayEndTime) {
        time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b>${response.data.error.TuesdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.TuesdayStartTime) {
        time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b>${response.data.error.TuesdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.WednesdayEndTime) {
        time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b>${response.data.error.WednesdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.WednesdayStartTime) {
        time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b>${response.data.error.WednesdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.ThursdayEndTime) {
        time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b>${response.data.error.ThursdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.ThursdayStartTime) {
        time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b>${response.data.error.ThursdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.FridayEndTime) {
        time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b>${response.data.error.FridayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.FridayStartTime) {
        time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b>${response.data.error.FridayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SaturdayEndTime) {
        time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b>${response.data.error.SaturdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SaturdayStartTime) {
        time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b>${response.data.error.SaturdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SundayEndTime) {
        time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b>${response.data.error.SundayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SundayStartTime) {
        time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b>${response.data.error.SundayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else if (response.data.message) {
      change_happen = false;
      result.innerHTML = `<main id = "response" class="container mt-3">
                <div class="alert alert-neutral alert-dismissible fade show" role="alert">${response.data.message}
              </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response"></main>`;
      }, 3000);
    }
  };
  toggle_all.addEventListener("click", toggleAll.bind(this, toggle_all));
  open_mon.addEventListener("click", toggle.bind(this, open_mon));
  open_tue.addEventListener("click", toggle.bind(this, open_tue));
  open_wed.addEventListener("click", toggle.bind(this, open_wed));
  open_thu.addEventListener("click", toggle.bind(this, open_thu));
  open_fri.addEventListener("click", toggle.bind(this, open_fri));
  open_sat.addEventListener("click", toggle.bind(this, open_sat));
  open_sun.addEventListener("click", toggle.bind(this, open_sun));
  let selectedMonth = current_month;
  month_select.addEventListener("change", function () {
    selectedMonth = this.value;
  });
  nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  if (service_id) {
    service_name.addEventListener("change", () => (change_happen = true));
    charge.addEventListener("change", () => (change_happen = true));
    description.addEventListener("change", () => (change_happen = true));
    image.addEventListener("change", () => (change_happen = true));
    year_select.addEventListener("change", () => (change_happen = true));
    month_select.addEventListener("change", () => (change_happen = true));
    toggle_all.addEventListener("change", () => (change_happen = true));
    open_mon.addEventListener("change", () => (change_happen = true));
    open_tue.addEventListener("change", () => (change_happen = true));
    open_wed.addEventListener("change", () => (change_happen = true));
    open_thu.addEventListener("change", () => (change_happen = true));
    open_fri.addEventListener("change", () => (change_happen = true));
    open_sat.addEventListener("change", () => (change_happen = true));
    open_sun.addEventListener("change", () => (change_happen = true));
    start_time_mon.addEventListener("change", () => (change_happen = true));
    start_time_tue.addEventListener("change", () => (change_happen = true));
    start_time_wed.addEventListener("change", () => (change_happen = true));
    start_time_thu.addEventListener("change", () => (change_happen = true));
    start_time_fri.addEventListener("change", () => (change_happen = true));
    start_time_sat.addEventListener("change", () => (change_happen = true));
    start_time_sun.addEventListener("change", () => (change_happen = true));
    end_time_mon.addEventListener("change", () => (change_happen = true));
    end_time_tue.addEventListener("change", () => (change_happen = true));
    end_time_wed.addEventListener("change", () => (change_happen = true));
    end_time_thu.addEventListener("change", () => (change_happen = true));
    end_time_fri.addEventListener("change", () => (change_happen = true));
    end_time_sat.addEventListener("change", () => (change_happen = true));
    end_time_sun.addEventListener("change", () => (change_happen = true));
    getService();
    add_service_btn.innerText = "Edit";
    form_title.innerText = "Edit Service";
    add_service_btn.addEventListener("click", () => {
      if (change_happen) {
        updateService();
      } else {
        result.innerHTML = `<main id = "response" class="container mt-3">
          <div class="alert alert-danger alert-dismissible fade show" role="alert">Nothing to update.
        </div></main>`;
        setTimeout(() => {
          result.innerHTML = `<main id = "response" class="container mt-3">`;
        }, 3000);
      }
    });
  } else {
    add_service_btn.innerText = "Add";
    form_title.innerText = "Add Service";
    add_service_btn.addEventListener("click", addService);
  }
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_add_equipment = () => {
  let change_happen = false;
  const store = JSON.parse(localStorage.getItem("userData"));
  const warehouse_name = store[0].username;
  const warehouse_id = store[0].user_id;
  const nav_bar = document.getElementById("navbar");
  const add_equipment_btn = document.getElementById("add-equipment");
  const name_feedback = document.getElementById("name_f");
  const charge_feedback = document.getElementById("charge_f");
  const description_feedback = document.getElementById("description_f");
  const image_feedback = document.getElementById("image_f");
  const time_mon_feedback = document.getElementById("time_mon_f");
  const time_tue_feedback = document.getElementById("time_tue_f");
  const time_wed_feedback = document.getElementById("time_wed_f");
  const time_thu_feedback = document.getElementById("time_thu_f");
  const time_fri_feedback = document.getElementById("time_fri_f");
  const time_sat_feedback = document.getElementById("time_sat_f");
  const time_sun_feedback = document.getElementById("time_sun_f");

  const warehouse = document.getElementById("warehouse_name");
  const result = document.getElementById("response");
  warehouse.innerText = warehouse_name;
  const urlParams = new URLSearchParams(window.location.search);
  const equipment_id = urlParams.get("id");
  const equipment_name = document.getElementById("equipment-name");
  const charge = document.getElementById("charge");
  const description = document.getElementById("description");
  const image = document.getElementById("image");
  const current_year = new Date().getFullYear();
  const current_month = new Date().getMonth() + 1;
  const year_select = document.getElementById("year");
  const month_select = document.getElementById("month");
  const toggle_all = document.getElementById("toggle-all");
  const open_mon = document.getElementById("open-mon");
  const open_tue = document.getElementById("open-tue");
  const open_wed = document.getElementById("open-wed");
  const open_thu = document.getElementById("open-thu");
  const open_fri = document.getElementById("open-fri");
  const open_sat = document.getElementById("open-sat");
  const open_sun = document.getElementById("open-sun");
  const start_time_mon = document.getElementById("start-time-mon");
  const end_time_mon = document.getElementById("end-time-mon");
  const start_time_tue = document.getElementById("start-time-tue");
  const end_time_tue = document.getElementById("end-time-tue");
  const start_time_wed = document.getElementById("start-time-wed");
  const end_time_wed = document.getElementById("end-time-wed");
  const start_time_thu = document.getElementById("start-time-thu");
  const end_time_thu = document.getElementById("end-time-thu");
  const start_time_fri = document.getElementById("start-time-fri");
  const end_time_fri = document.getElementById("end-time-fri");
  const start_time_sat = document.getElementById("start-time-sat");
  const end_time_sat = document.getElementById("end-time-sat");
  const start_time_sun = document.getElementById("start-time-sun");
  const end_time_sun = document.getElementById("end-time-sun");

  const form_title = document.getElementById("form-title");
  const imagePreview = document.querySelector(".image-preview");
  let file = null;

  image.addEventListener("change", function () {
    file = image.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.style.display = "block";
        imagePreview.style.backgroundImage = `url(${this.result})`;
      });
      reader.readAsDataURL(file);
    } else {
      image.value = "";
      file = null;
      image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>The file must be an image.</b></label>`;
      setTimeout(() => {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
      }, 5000);
      imagePreview.style.backgroundImage = `url(${this.result})`;
      imagePreview.style.display = "none";
    }
  });
  flatpickr(".type-input", {
    enableTime: true,
    noCalendar: true,
    minuteIncrement: 30,
    dateFormat: "H:i",
  });
  year_select.options[0].value = current_year;
  year_select.options[0].innerText = current_year;
  month_select.options[0].value = current_month;
  month_value = month_select.options[0].value;
  for (let i = 0; i < month_select.options.length; i++) {
    const option = month_select.options[i];
    if (option.value === month_value) {
      month_select.options[0].innerText = option.innerText;
    }
  }
  const toggleAll = (toggled_btn) => {
    if (parseInt(toggled_btn.value) === 0) {
      toggled_btn.value = "1";
      toggled_btn.style.backgroundColor = "#081132";
      setTrue(open_mon);
      setTrue(open_tue);
      setTrue(open_wed);
      setTrue(open_thu);
      setTrue(open_fri);
      setTrue(open_sat);
      setTrue(open_sun);
    } else if (parseInt(toggled_btn.value) === 1) {
      toggled_btn.value = "0";
      toggled_btn.style.backgroundColor = "#ccc";
      setFalse(open_mon);
      setFalse(open_tue);
      setFalse(open_wed);
      setFalse(open_thu);
      setFalse(open_fri);
      setFalse(open_sat);
      setFalse(open_sun);
    }
  };
  const setTrue = (toggled_btn) => {
    const time_container = toggled_btn.nextElementSibling;
    toggled_btn.value = "1";
    toggled_btn.style.backgroundColor = "#081132";
    time_container.style.display = "block";
  };
  const setFalse = (toggled_btn) => {
    const time_container = toggled_btn.nextElementSibling;
    toggled_btn.value = "0";
    toggled_btn.style.backgroundColor = "#ccc";
    time_container.style.display = "none";
  };
  const toggle = (toggled_btn) => {
    const time_container = toggled_btn.nextElementSibling;
    if (parseInt(toggled_btn.value) === 0) {
      toggled_btn.value = "1";
      toggled_btn.style.backgroundColor = "#081132";
      time_container.style.display = "block";
    } else if (parseInt(toggled_btn.value) === 1) {
      toggled_btn.value = "0";
      toggled_btn.style.backgroundColor = "#ccc";
      time_container.style.display = "none";
    }
  };
  const addEquipment = async () => {
    const add_equipment_url = base_url + "equipment/add";
    const add_equipment_data = new FormData();
    add_equipment_data.append("equipment_name", equipment_name.value);
    add_equipment_data.append("price_per_hour", charge.value);
    add_equipment_data.append("equipment_description", description.value);
    if (file) {
      console.log("I enter");
      add_equipment_data.append("image", file);
    }
    add_equipment_data.append("year", year_select.value);
    add_equipment_data.append("month", selectedMonth);
    add_equipment_data.append("isOpenMonday", open_mon.value);
    add_equipment_data.append("isOpenTuesday", open_tue.value);
    add_equipment_data.append("isOpenWednesday", open_wed.value);
    add_equipment_data.append("isOpenThursday", open_thu.value);
    add_equipment_data.append("isOpenFriday", open_fri.value);
    add_equipment_data.append("isOpenSaturday", open_sat.value);
    add_equipment_data.append("isOpenSunday", open_sun.value);
    if (open_mon.value == "1") {
      add_equipment_data.append("MondayStartTime", start_time_mon.value);
      add_equipment_data.append("MondayEndTime", end_time_mon.value);
    }
    if (open_tue.value == "1") {
      add_equipment_data.append("TuesdayStartTime", start_time_tue.value);
      add_equipment_data.append("TuesdayEndTime", end_time_tue.value);
    }
    if (open_wed.value == "1") {
      add_equipment_data.append("WednesdayStartTime", start_time_wed.value);
      add_equipment_data.append("WednesdayEndTime", end_time_wed.value);
    }
    if (open_thu.value == "1") {
      add_equipment_data.append("ThursdayStartTime", start_time_thu.value);
      add_equipment_data.append("ThursdayEndTime", end_time_thu.value);
    }
    if (open_fri.value == "1") {
      add_equipment_data.append("FridayStartTime", start_time_fri.value);
      add_equipment_data.append("FridayEndTime", end_time_fri.value);
    }
    if (open_sat.value == "1") {
      add_equipment_data.append("SaturdayStartTime", start_time_sat.value);
      add_equipment_data.append("SaturdayEndTime", end_time_sat.value);
    }
    if (open_sun.value == "1") {
      add_equipment_data.append("SundayStartTime", start_time_sun.value);
      add_equipment_data.append("SundayEndTime", end_time_sun.value);
    }
    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      add_equipment_url,
      add_equipment_data,
      access_token
    );
    console.log(response);
    if (!response && status_code === 413) {
      image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>The file is too large. Cannot be added.</b></label>`;
      setTimeout(() => {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
      }, 5000);
      return;
    }
    if (response.data.error) {
      console.log(response.data.error);
      if (response.data.error.equipment_name) {
        name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b>${response.data.error.equipment_name[0]}</b></label>`;
        setTimeout(() => {
          name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.price_per_hour) {
        charge_feedback.innerHTML = `<label id = "charge_f" class="feedback-text"><b>${response.data.error.price_per_hour[0]}</b></label>`;
        setTimeout(() => {
          charge_feedback.innerHTML = `<label id = "charge_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.equipment_description) {
        description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b>${response.data.error.equipment_description[0]}</b></label>`;
        setTimeout(() => {
          description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.image) {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>${response.data.error.image[0]}</b></label>`;
        setTimeout(() => {
          image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.MondayEndTime) {
        time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b>${response.data.error.MondayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.MondayStartTime) {
        time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b>${response.data.error.MondayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.TuesdayEndTime) {
        time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b>${response.data.error.TuesdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.TuesdayStartTime) {
        time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b>${response.data.error.TuesdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.WednesdayEndTime) {
        time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b>${response.data.error.WednesdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.WednesdayStartTime) {
        time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b>${response.data.error.WednesdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.ThursdayEndTime) {
        time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b>${response.data.error.ThursdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.ThursdayStartTime) {
        time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b>${response.data.error.ThursdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.FridayEndTime) {
        time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b>${response.data.error.FridayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.FridayStartTime) {
        time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b>${response.data.error.FridayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SaturdayEndTime) {
        time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b>${response.data.error.SaturdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SaturdayStartTime) {
        time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b>${response.data.error.SaturdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SundayEndTime) {
        time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b>${response.data.error.SundayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SundayStartTime) {
        time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b>${response.data.error.SundayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else if (response.data.message) {
      result.innerHTML = `<main id = "response" class="container mt-3">
                <div class="alert alert-neutral alert-dismissible fade show" role="alert">${response.data.message}
              </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response"></main>`;
      }, 3000);
    }
  };
  const getEquipment = async () => {
    const get_equipment_url = base_url + "equipment/" + equipment_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      get_equipment_url,
      access_token
    );
    let image_url = "";
    if (response.data.message) {
      console.log(response.data);
      equipment_name.value = response.data.equipment.name;
      charge.value = response.data.equipment.price_per_hour;
      description.value = response.data.equipment.description;
      if (response.data.equipment.image_url === "images/WeBuild_Logo.png") {
        image_url = "../../webuild-server/public/images/WeBuild_Logo.png";
      } else {
        image_url =
          "../../webuild-server/storage/app/public/equipments" +
          response.data.equipment.image_url;
      }
      imagePreview.style.display = "block";
      imagePreview.style.backgroundImage = `url(${image_url})`;
      if (response.data.availability.length != 0) {
        let availability = {
          mon: 0,
          tue: 0,
          wed: 0,
          thu: 0,
          fri: 0,
          sat: 0,
          sun: 0,
          mon_start_time: "",
          mon_end_time: "",
          tue_start_time: "",
          tue_end_time: "",
          wed_start_time: "",
          wed_end_time: "",
          thu_start_time: "",
          thu_end_time: "",
          fri_start_time: "",
          fri_end_time: "",
          sat_start_time: "",
          sat_end_time: "",
          sun_start_time: "",
          sun_end_time: "",
        };
        let monthName;
        let year;
        const equipment_availability = response.data.availability;
        const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        for (i in equipment_availability) {
          const date = new Date(equipment_availability[i].date);
          monthIndex = date.getMonth();
          year = date.getFullYear();
          const dayOfWeek = date.getDay();
          const dayName = daysOfWeek[dayOfWeek];
          availability[dayName] = 1;
          const ini_start_time =
            equipment_availability[i].start_time.split(" ")[1];
          const start_time = ini_start_time.substring(
            0,
            ini_start_time.length - 3
          );
          availability[dayName + "_start_time"] = start_time;
          const ini_end_time = equipment_availability[i].end_time.split(" ")[1];
          const end_time = ini_end_time.substring(0, ini_end_time.length - 3);
          availability[dayName + "_end_time"] = end_time;
        }
        month_select.selectedIndex = 3 + 1;
        year_select.value = year;
        if (availability.mon != 0) {
          setTrue(open_mon);
          start_time_mon.value = availability.mon_start_time;
          end_time_mon.value = availability.mon_end_time;
        }
        if (availability.tue != 0) {
          setTrue(open_tue);
          start_time_tue.value = availability.tue_start_time;
          end_time_tue.value = availability.tue_end_time;
        }
        if (availability.wed != 0) {
          setTrue(open_wed);
          start_time_wed.value = availability.wed_start_time;
          end_time_wed.value = availability.wed_end_time;
        }
        if (availability.thu != 0) {
          setTrue(open_thu);
          start_time_thu.value = availability.thu_start_time;
          end_time_thu.value = availability.thu_end_time;
        }
        if (availability.fri != 0) {
          setTrue(open_fri);
          start_time_fri.value = availability.fri_start_time;
          end_time_fri.value = availability.fri_end_time;
        }
        if (availability.sat != 0) {
          setTrue(open_sat);
          start_time_sat.value = availability.sat_start_time;
          end_time_sat.value = availability.sat_end_time;
        }
        if (availability.sun != 0) {
          setTrue(open_sun);
          start_time_sun.value = availability.sun_start_time;
          end_time_sun.value = availability.sun_end_time;
        }
      }
    }
  };
  const updateEquipment = async () => {
    const update_equipment_url = base_url + "equipment/update/" + equipment_id;
    const update_equipment_data = new FormData();
    update_equipment_data.append("equipment_name", equipment_name.value);
    update_equipment_data.append("price_per_hour", charge.value);
    update_equipment_data.append("equipment_description", description.value);
    if (file) {
      update_equipment_data.append("image", file);
    }
    update_equipment_data.append("year", year_select.value);
    update_equipment_data.append("month", selectedMonth);
    update_equipment_data.append("isOpenMonday", open_mon.value);
    update_equipment_data.append("isOpenTuesday", open_tue.value);
    update_equipment_data.append("isOpenWednesday", open_wed.value);
    update_equipment_data.append("isOpenThursday", open_thu.value);
    update_equipment_data.append("isOpenFriday", open_fri.value);
    update_equipment_data.append("isOpenSaturday", open_sat.value);
    update_equipment_data.append("isOpenSunday", open_sun.value);
    if (open_mon.value == "1") {
      update_equipment_data.append("MondayStartTime", start_time_mon.value);
      update_equipment_data.append("MondayEndTime", end_time_mon.value);
    }
    if (open_tue.value == "1") {
      update_equipment_data.append("TuesdayStartTime", start_time_tue.value);
      update_equipment_data.append("TuesdayEndTime", end_time_tue.value);
    }
    if (open_wed.value == "1") {
      update_equipment_data.append("WednesdayStartTime", start_time_wed.value);
      update_equipment_data.append("WednesdayEndTime", end_time_wed.value);
    }
    if (open_thu.value == "1") {
      update_equipment_data.append("ThursdayStartTime", start_time_thu.value);
      update_equipment_data.append("ThursdayEndTime", end_time_thu.value);
    }
    if (open_fri.value == "1") {
      update_equipment_data.append("FridayStartTime", start_time_fri.value);
      update_equipment_data.append("FridayEndTime", end_time_fri.value);
    }
    if (open_sat.value == "1") {
      update_equipment_data.append("SaturdayStartTime", start_time_sat.value);
      update_equipment_data.append("SaturdayEndTime", end_time_sat.value);
    }
    if (open_sun.value == "1") {
      update_equipment_data.append("SundayStartTime", start_time_sun.value);
      update_equipment_data.append("SundayEndTime", end_time_sun.value);
    }
    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      update_equipment_url,
      update_equipment_data,
      access_token
    );
    console.log(response);
    if (!response && status_code === 413) {
      image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>The file is too large. Cannot be added.</b></label>`;
      setTimeout(() => {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
      }, 5000);
      return;
    }
    if (response.data.error) {
      console.log(response.data.error);
      if (response.data.error.equipment_name) {
        name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b>${response.data.error.equipment_name[0]}</b></label>`;
        setTimeout(() => {
          name_feedback.innerHTML = `<label id = "name_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.price_per_hour) {
        charge_feedback.innerHTML = `<label id = "charge_f" class="feedback-text"><b>${response.data.error.price_per_hour[0]}</b></label>`;
        setTimeout(() => {
          charge_feedback.innerHTML = `<label id = "charge_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.equipment_description) {
        description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b>${response.data.error.equipment_description[0]}</b></label>`;
        setTimeout(() => {
          description_feedback.innerHTML = `<label id = "description_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.image) {
        image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b>${response.data.error.image[0]}</b></label>`;
        setTimeout(() => {
          image_feedback.innerHTML = `<label id = "image_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.MondayEndTime) {
        time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b>${response.data.error.MondayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.MondayStartTime) {
        time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b>${response.data.error.MondayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_mon_feedback.innerHTML = `<label id = "time_mon_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.TuesdayEndTime) {
        time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b>${response.data.error.TuesdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.TuesdayStartTime) {
        time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b>${response.data.error.TuesdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_tue_feedback.innerHTML = `<label id = "time_tue_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.WednesdayEndTime) {
        time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b>${response.data.error.WednesdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.WednesdayStartTime) {
        time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b>${response.data.error.WednesdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_wed_feedback.innerHTML = `<label id = "time_wed_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.ThursdayEndTime) {
        time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b>${response.data.error.ThursdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.ThursdayStartTime) {
        time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b>${response.data.error.ThursdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_thu_feedback.innerHTML = `<label id = "time_thu_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.FridayEndTime) {
        time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b>${response.data.error.FridayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.FridayStartTime) {
        time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b>${response.data.error.FridayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_fri_feedback.innerHTML = `<label id = "time_fri_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SaturdayEndTime) {
        time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b>${response.data.error.SaturdayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SaturdayStartTime) {
        time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b>${response.data.error.SaturdayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_sat_feedback.innerHTML = `<label id = "time_sat_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SundayEndTime) {
        time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b>${response.data.error.SundayEndTime[0]}</b></label>`;
        setTimeout(() => {
          time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.SundayStartTime) {
        time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b>${response.data.error.SundayStartTime[0]}</b></label>`;
        setTimeout(() => {
          time_sun_feedback.innerHTML = `<label id = "time_sun_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else if (response.data.message) {
      change_happen = false;
      result.innerHTML = `<main id = "response" class="container mt-3">
                <div class="alert alert-neutral alert-dismissible fade show" role="alert">${response.data.message}
              </div></main>`;
      setTimeout(() => {
        result.innerHTML = `<main id = "response"></main>`;
      }, 3000);
    }
  };
  toggle_all.addEventListener("click", toggleAll.bind(this, toggle_all));
  open_mon.addEventListener("click", toggle.bind(this, open_mon));
  open_tue.addEventListener("click", toggle.bind(this, open_tue));
  open_wed.addEventListener("click", toggle.bind(this, open_wed));
  open_thu.addEventListener("click", toggle.bind(this, open_thu));
  open_fri.addEventListener("click", toggle.bind(this, open_fri));
  open_sat.addEventListener("click", toggle.bind(this, open_sat));
  open_sun.addEventListener("click", toggle.bind(this, open_sun));
  let selectedMonth = current_month;
  month_select.addEventListener("change", function () {
    selectedMonth = this.value;
  });
  nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  if (equipment_id) {
    equipment_name.addEventListener("change", () => (change_happen = true));
    charge.addEventListener("change", () => (change_happen = true));
    description.addEventListener("change", () => (change_happen = true));
    image.addEventListener("change", () => (change_happen = true));
    year_select.addEventListener("change", () => (change_happen = true));
    month_select.addEventListener("change", () => (change_happen = true));
    toggle_all.addEventListener("change", () => (change_happen = true));
    open_mon.addEventListener("change", () => (change_happen = true));
    open_tue.addEventListener("change", () => (change_happen = true));
    open_wed.addEventListener("change", () => (change_happen = true));
    open_thu.addEventListener("change", () => (change_happen = true));
    open_fri.addEventListener("change", () => (change_happen = true));
    open_sat.addEventListener("change", () => (change_happen = true));
    open_sun.addEventListener("change", () => (change_happen = true));
    start_time_mon.addEventListener("change", () => (change_happen = true));
    start_time_tue.addEventListener("change", () => (change_happen = true));
    start_time_wed.addEventListener("change", () => (change_happen = true));
    start_time_thu.addEventListener("change", () => (change_happen = true));
    start_time_fri.addEventListener("change", () => (change_happen = true));
    start_time_sat.addEventListener("change", () => (change_happen = true));
    start_time_sun.addEventListener("change", () => (change_happen = true));
    end_time_mon.addEventListener("change", () => (change_happen = true));
    end_time_tue.addEventListener("change", () => (change_happen = true));
    end_time_wed.addEventListener("change", () => (change_happen = true));
    end_time_thu.addEventListener("change", () => (change_happen = true));
    end_time_fri.addEventListener("change", () => (change_happen = true));
    end_time_sat.addEventListener("change", () => (change_happen = true));
    end_time_sun.addEventListener("change", () => (change_happen = true));
    getEquipment();
    add_equipment_btn.innerText = "Edit";
    form_title.innerText = "Edit Equipment";
    add_equipment_btn.addEventListener("click", () => {
      if (change_happen) {
        updateEquipment();
      } else {
        result.innerHTML = `<main id = "response" class="container mt-3">
          <div class="alert alert-danger alert-dismissible fade show" role="alert">Nothing to update.
        </div></main>`;
        setTimeout(() => {
          result.innerHTML = `<main id = "response" class="container mt-3">`;
        }, 3000);
      }
    });
  } else {
    add_equipment_btn.innerText = "Add";
    form_title.innerText = "Add Equipment";
    add_equipment_btn.addEventListener("click", addEquipment);
  }
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_service_availability = () => {
  let isCalendarGenerated = false;
  selectedBoxes = [];
  let firstSelectedBoxIndex = -1;
  let lastSelectedBoxIndex = -1;
  let start_time;
  let end_time;
  let totalDurationHours;
  let booking_date;
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const warehouse_name = localStorage.getItem("warehouse_name");
  const warehouse_id = localStorage.getItem("warehouse_id");
  const warehouse = document.getElementById("warehouse_name");
  const nav_bar = document.getElementById("navbar");
  const result = document.getElementById("response");
  const result2 = document.getElementById("response2");
  const urlParams = new URLSearchParams(window.location.search);
  const service_id = urlParams.get("id");
  const authenticated_user = store[0].user_id;
  const service_name = document.getElementById("service-name");
  const charge = document.getElementById("charge");
  const description = document.getElementById("description");
  const booking_feedback = document.getElementById("booking_f");
  const location_desc_feedback = document.getElementById("location_desc_f");
  let similar_to_logged_in_warehouse = false;
  if (authenticated_user == warehouse_id) {
    similar_to_logged_in_warehouse = true;
    // Add sthg if necessary
  }
  const availability = {
    "01:00": "blue",
    "01:30": "blue",
    "02:00": "blue",
    "02:30": "blue",
    "03:00": "blue",
    "03:30": "blue",
    "04:00": "blue",
    "04:30": "blue",
    "05:00": "blue",
    "05:30": "blue",
    "06:00": "blue",
    "06:30": "blue",
    "07:00": "blue",
    "07:30": "blue",
    "08:00": "blue",
    "08:30": "blue",
    "09:00": "blue",
    "09:30": "blue",
    "10:00": "blue",
    "10:30": "blue",
    "11:00": "blue",
    "11:30": "blue",
    "12:00": "blue",
    "12:30": "blue",
    "13:00": "blue",
    "13:30": "blue",
    "14:00": "blue",
    "14:30": "blue",
    "15:00": "blue",
    "15:30": "blue",
    "16:00": "blue",
    "16:30": "blue",
    "17:00": "blue",
    "17:30": "blue",
    "18:00": "blue",
    "18:30": "blue",
    "19:00": "blue",
    "19:30": "blue",
    "20:00": "blue",
    "20:30": "blue",
    "21:00": "blue",
    "21:30": "blue",
    "22:00": "blue",
    "22:30": "blue",
    "23:00": "blue",
    "23:30": "blue",
    "24:00": "blue",
  };
  let service_availability = [];
  warehouse.innerText = warehouse_name;
  const getService = async () => {
    const get_service_url = base_url + "service/" + service_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(get_service_url, access_token);
    if (response.data.error) {
      result.innerHTML = `<div id = "response" class="container mt-3">
      <div class="alert alert-danger alert-dismissible fade show" role="alert">Service Not Found
    </div></div>`;
      setTimeout(() => {
        result.innerHTML = `<div id = "response""></div>`;
      }, 5000);
      document.getElementById("calendar-part").style.display = "none";
    }
    if (response.data.message) {
      service_name.innerText = response.data.service.name;
      charge.innerText = response.data.service.minimum_charge_per_hour;
      description.innerText = response.data.service.description;
      for (i in response.data.availability) {
        const ini_start_time =
          response.data.availability[i].start_time.split(" ")[1];
        const start_time = ini_start_time.substring(
          0,
          ini_start_time.length - 3
        );
        const ini_end_time =
          response.data.availability[i].end_time.split(" ")[1];
        const end_time = ini_end_time.substring(0, ini_end_time.length - 3);
        const obj = {
          date: response.data.availability[i].date,
          start_time: start_time,
          end_time: end_time,
        };
        service_availability.push(obj);
      }
    }
  };
  const orderService = async () => {
    const order_sevice_url = base_url + "order/service";
    const order_service_data = new FormData();
    order_service_data.append("item_id", service_id);
    order_service_data.append("warehouse_id", warehouse_id);
    const originalDateString =
      document.getElementById("booking-date").textContent;
    const [day, month, year] = originalDateString.split("-");
    const transformedDateString = `${year}-${month}-${day}`;
    const currentDate = new Date();
    const givenDate = new Date(transformedDateString);
    if (givenDate < currentDate) {
      result2.innerHTML = `<div id = "response2" class="container mt-3">
      <div class="alert alert-danger alert-dismissible fade show" role="alert">Cannot book a day in the past!
    </div></div>`;
      setTimeout(() => {
        result2.innerHTML = `<div id = "response2""></div>`;
      }, 5000);
      return;
    }
    order_service_data.append("date", transformedDateString);
    order_service_data.append("start_time", start_time);
    order_service_data.append("end_time", end_time);
    const pricePerHour = charge.textContent;
    const totalPrice = pricePerHour * totalDurationHours;
    order_service_data.append("price", totalPrice);
    order_service_data.append("latitude", latitude);
    order_service_data.append("longitude", longitude);
    order_service_data.append("location_description", location_desc.value);

    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      order_sevice_url,
      order_service_data,
      access_token
    );
    console.log(response);
    if (response.data.error) {
      if (response.data.error.location_description) {
        location_desc_feedback.innerHTML = `<label id = "location_desc_f" class="feedback-text"><b>${response.data.error.location_description[0]}</b></label>`;
        setTimeout(() => {
          location_desc_feedback.innerHTML = `<label id = "location_desc_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else {
      result2.innerHTML = `<div id = "response2" class="container mt-3">
      <div class="alert alert-success alert-dismissible fade show" role="alert">${response.data.message}
    </div></div>`;
      setTimeout(() => {
        result2.innerHTML = `<div id = "response2""></div>`;
      }, 5000);
    }
  };
  const resetAvailability = () => {
    for (key in availability) {
      availability[key] = "blue";
      generateSchedule();
    }
  };
  const getServiceAvailability = async (date) => {
    console.log(service_availability);
    resetAvailability();
    const keys = Object.keys(availability);
    for (i in service_availability) {
      if (service_availability[i].date === date) {
        const start_key = service_availability[i].start_time;
        const end_key = service_availability[i].end_time;
        const start_index = keys.indexOf(start_key);
        const end_index = keys.indexOf(end_key);
        for (let i = start_index; i <= end_index; i++) {
          const key = keys[i];
          availability[key] = "green";
        }
      }
    }
    const get_bookings_url = base_url + "order/get/date/item";
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const get_bookings_data = new FormData();
    get_bookings_data.append("type", "service");
    get_bookings_data.append("warehouse_id", warehouse_id);
    get_bookings_data.append("item_id", service_id);
    get_bookings_data.append("date", date);
    const response = await webuild_pages.postAPI(
      get_bookings_url,
      get_bookings_data,
      access_token
    );
    if (response.data.message) {
      for (i in response.data.bookings) {
        const start_key = response.data.bookings[i].start_time;
        const end_key = response.data.bookings[i].end_time;
        const start_index = keys.indexOf(start_key);
        const end_index = keys.indexOf(end_key);
        for (let i = start_index; i <= end_index; i++) {
          const key = keys[i];
          availability[key] = "red";
        }
      }
    }
    generateSchedule();
  };
  // Function to create a box element
  function createBox(date, time, available) {
    const boxContainer = document.createElement("div");
    boxContainer.classList.add("box-container");

    const box = document.createElement("div");
    box.classList.add("box");
    box.classList.add(available);
    box.setAttribute("data-date", date);
    box.setAttribute("data-time", time);

    const timeText = document.createElement("span");
    timeText.classList.add("time-text");
    timeText.textContent = time;

    boxContainer.appendChild(timeText);
    boxContainer.appendChild(box);
    box.addEventListener("click", boxClickHandler);
    return boxContainer;
  }
  function bookTimeSlot() {
    const date = document.getElementById("booking-date").textContent;
    if (selectedBoxes.length > 0) {
      start_time = selectedBoxes[0];
      end_time = selectedBoxes[selectedBoxes.length - 1];
      const startParts = start_time.split(":");
      const endParts = end_time.split(":");

      const startHours = parseInt(startParts[0], 10);
      const startMinutes = parseInt(startParts[1], 10);

      const endHours = parseInt(endParts[0], 10);
      const endMinutes = parseInt(endParts[1], 10);

      const startDate = new Date();
      startDate.setHours(startHours);
      startDate.setMinutes(startMinutes);

      const endDate = new Date();
      endDate.setHours(endHours);
      endDate.setMinutes(endMinutes);

      const durationMs = endDate.getTime() - startDate.getTime();

      // Convert durationMs to hours and minutes
      const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
      const durationMinutes = Math.floor(
        (durationMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      totalDurationHours = durationHours + durationMinutes / 60;
      document.getElementById("booking-details").style.display = "block";
      document.getElementById("booking-date").textContent = date;
      document.getElementById("booking-time").textContent =
        "  From " +
        start_time +
        " to " +
        end_time +
        ". A total duration of " +
        durationHours +
        " hours and " +
        durationMinutes +
        " minutes";
      if (selectedBoxes.length > 1) {
        document.getElementById("book-btn").disabled = false;
      }
      if (selectedBoxes.length < 2) {
        document.getElementById("book-btn").disabled = true;
      }
    }
    if (selectedBoxes.length == 0) {
      document.getElementById("book-btn").disabled = true;
      document.getElementById("booking-time").textContent = "";
      document.getElementById("booking-details").style.display = "none";
    }
  }
  // Function to handle box click event
  function boxClickHandler(event) {
    const box = event.target;
    const date = box.getAttribute("data-date");
    const time = box.getAttribute("data-time");
    if (box.classList.contains("blue")) {
      booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b>Service Unavailable at this time</b></label>`;
      setTimeout(() => {
        booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b></b></label>`;
      }, 3000);
      return; // Ignore unavailable cells
    }
    if (box.classList.contains("red")) {
      booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b>Service Unavailable at this time</b></label>`;
      setTimeout(() => {
        booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b></b></label>`;
      }, 3000);
    } else {
      if (!box.classList.contains("selected")) {
        const target = box.getAttribute("data-time");
        selectedBoxIndex = Object.keys(availability).indexOf(target);
        if (lastSelectedBoxIndex !== -1 && firstSelectedBoxIndex != -1) {
          if (
            selectedBoxIndex !== lastSelectedBoxIndex + 1 &&
            selectedBoxIndex !== firstSelectedBoxIndex - 1
          ) {
            booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b>You are not allowed to select nonconsecutive boxes</b></label>`;
            setTimeout(() => {
              booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b></b></label>`;
            }, 3000);
            console.log("You are not allowed to select nonconsecutive boxes");
            return;
          }
          if (selectedBoxIndex === lastSelectedBoxIndex + 1) {
            lastSelectedBoxIndex = selectedBoxIndex;
            selectedBoxes.push(box.getAttribute("data-time"));
          }
          if (selectedBoxIndex === firstSelectedBoxIndex - 1) {
            firstSelectedBoxIndex = selectedBoxIndex;
            selectedBoxes.splice(0, 0, box.getAttribute("data-time"));
          }
          box.classList.add("selected");
        } else {
          box.classList.add("selected");
          selectedBoxes.push(box.getAttribute("data-time"));
          lastSelectedBoxIndex = selectedBoxIndex;
          firstSelectedBoxIndex = selectedBoxIndex;
        }
      } else {
        const target = box.getAttribute("data-time");
        const index = selectedBoxes.indexOf(target);
        const indexIn = Object.keys(availability).indexOf(target);
        if (
          indexIn !== lastSelectedBoxIndex &&
          indexIn !== firstSelectedBoxIndex
        ) {
          booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b>You are not allowed to de-select nonconsecutive boxes</b></label>`;
          setTimeout(() => {
            booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b></b></label>`;
          }, 3000);
          return;
        }
        if (index !== -1) {
          selectedBoxes.splice(index, 1);
          box.classList.remove("selected");
          const allSelectedElements = document.querySelectorAll(".selected");
          if (allSelectedElements.length > 0) {
            const firstSelectedElement =
              allSelectedElements[0].getAttribute("data-time");
            const lastSelectedElement =
              allSelectedElements[allSelectedElements.length - 1].getAttribute(
                "data-time"
              );
            firstSelectedBoxIndex =
              Object.keys(availability).indexOf(firstSelectedElement);
            lastSelectedBoxIndex =
              Object.keys(availability).indexOf(lastSelectedElement);
          } else {
            firstSelectedBoxIndex = -1;
            lastSelectedBoxIndex = -1;
          }
        }
      }
    }
    bookTimeSlot();
  }
  function deleteSchedule() {
    const calendar = document.getElementById("calendar");
    // Remove all child elements of the calendar
    while (calendar.firstChild) {
      calendar.removeChild(calendar.firstChild);
    }

    isCalendarGenerated = false;
  }
  function generateSchedule() {
    if (isCalendarGenerated) {
      deleteSchedule();
    }
    const calendar = document.getElementById("calendar");
    for (const time in availability) {
      const available = availability[time];
      const date = document.getElementById("booking-date").textContent;
      const box = createBox(date, time, available);
      calendar.appendChild(box);
    }
    isCalendarGenerated = true;
  }
  function initMap() {
    const centerLocation = { lat: 34.123, lng: 35.6519 };
    // Create a map instance
    const map = new google.maps.Map(document.getElementById("map"), {
      center: centerLocation,
      zoom: 10, // Set an initial zoom level
    });

    // Add a marker to the map
    marker = new google.maps.Marker({
      position: centerLocation,
      map: map,
      title: "Location Name", // Example: Custom location name
    });
    latitude = marker.getPosition().lat();
    longitude = marker.getPosition().lng();

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // Set the map's center to the current location
        map.setCenter(currentLocation);
        // Add a marker for the current location
        const currentMarker = new google.maps.Marker({
          position: currentLocation,
          map: map,
          title: "Your Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Example: Custom marker icon
        });
      });
    }
    // Search for a location
    const searchInput = document.getElementById("search-input");
    const searchBox = new google.maps.places.SearchBox(searchInput);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);

    searchBox.addListener("places_changed", function () {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      // Clear any existing markers
      marker.setMap(null);

      // Get the first place result and update the map
      const place = places[0];
      if (!place.geometry) {
        console.log("No geometry available for this place.");
        return;
      }

      // Set the map's center to the searched location
      map.setCenter(place.geometry.location);

      // Add a marker for the searched location
      marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
      });
      latitude = marker.getPosition().lat();
      longitude = marker.getPosition().lng();
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    });
    // Add a click event listener to the map
    map.addListener("click", function (event) {
      placeMarker(event.latLng); // Place a marker at the clicked location
    });
    // Place a marker at the specified location
    function placeMarker(location) {
      // Remove the previous marker if it exists
      if (marker) {
        marker.setMap(null);
      }
      // Create a new marker
      marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      latitude = marker.getPosition().lat();
      longitude = marker.getPosition().lng();
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    }
  }
  document.getElementById("book-btn").disabled = true;
  $(document).ready(function () {
    function generateCalendar(month, year) {
      const selectedDate = moment({ year: year, month: month });
      $("#schedules-container").fullCalendar("changeView", "month");
      $("#schedules-container").fullCalendar("gotoDate", selectedDate);
    }

    $("#schedules-container").fullCalendar({
      header: {
        right: "prev,next today",
      },
      customButtons: {
        prev: {
          text: ">",
          click: function () {
            $("#schedules-container").fullCalendar("prev");
            deleteSchedule();
            document.getElementById("booking-date").textContent = "";
            document.getElementById("booking-details").style.display = "none";
            selectedBoxes = [];
            lastSelectedBoxIndex = -1;
            firstSelectedBoxIndex = -1;
          },
        },
        next: {
          text: "",
          click: function () {
            $("#schedules-container").fullCalendar("next");
            deleteSchedule();
            document.getElementById("booking-date").textContent = "";
            document.getElementById("booking-details").style.display = "none";
            selectedBoxes = [];
            lastSelectedBoxIndex = -1;
            firstSelectedBoxIndex = -1;
          },
        },
        today: {
          text: "This Month",
          click: function () {
            $("#schedules-container").fullCalendar("today");
            deleteSchedule();
            document.getElementById("booking-date").textContent = "";
            document.getElementById("booking-details").style.display = "none";
            selectedBoxes = [];
            lastSelectedBoxIndex = -1;
            firstSelectedBoxIndex = -1;
          },
        },
      },
      viewRender: function (view, element) {
        var today = moment().startOf("day");
        $(".fc-today").css("background-color", "#00000000"); // Set the desired background color
        $(".fc-left").css("color", "#081132"); // Set the desired background color
      },
      selectable: true,
      select: function (start) {
        const date1 = moment(start).format("YYYY-MM-DD");
        const date2 = moment(start).format("DD-MM-YYYY");
        document.getElementById("booking-date").textContent = date2;
        document.getElementById("booking-details").style.display = "none";
        selectedBoxes = [];
        lastSelectedBoxIndex = -1;
        firstSelectedBoxIndex = -1;
        getServiceAvailability(date1);
      },
    });
    const today = new Date();
    const currentMonth = today.getMonth(); // Month is zero-based (0-11)
    const currentYear = today.getFullYear();
    generateCalendar(currentMonth, currentYear); // Example usage: Generate the calendar for January 2023
  });
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  getService();
  document.getElementById("book-btn").addEventListener("click", orderService);
  window.onload = initMap;
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_equipment_availability = () => {
  let isCalendarGenerated = false;
  selectedBoxes = [];
  let firstSelectedBoxIndex = -1;
  let lastSelectedBoxIndex = -1;
  let start_time;
  let end_time;
  let totalDurationHours;
  let booking_date;
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const warehouse_name = localStorage.getItem("warehouse_name");
  const warehouse_id = localStorage.getItem("warehouse_id");
  const warehouse = document.getElementById("warehouse_name");
  const nav_bar = document.getElementById("navbar");
  const result = document.getElementById("response");
  const result2 = document.getElementById("response2");
  const urlParams = new URLSearchParams(window.location.search);
  const equipment_id = urlParams.get("id");
  const authenticated_user = store[0].user_id;
  const equipment_name = document.getElementById("equipment-name");
  const charge = document.getElementById("charge");
  const description = document.getElementById("description");
  const booking_feedback = document.getElementById("booking_f");
  const location_desc_feedback = document.getElementById("location_desc_f");
  let similar_to_logged_in_warehouse = false;
  if (authenticated_user == warehouse_id) {
    similar_to_logged_in_warehouse = true;
    // Add sthg if necessary
  }
  const availability = {
    "01:00": "blue",
    "01:30": "blue",
    "02:00": "blue",
    "02:30": "blue",
    "03:00": "blue",
    "03:30": "blue",
    "04:00": "blue",
    "04:30": "blue",
    "05:00": "blue",
    "05:30": "blue",
    "06:00": "blue",
    "06:30": "blue",
    "07:00": "blue",
    "07:30": "blue",
    "08:00": "blue",
    "08:30": "blue",
    "09:00": "blue",
    "09:30": "blue",
    "10:00": "blue",
    "10:30": "blue",
    "11:00": "blue",
    "11:30": "blue",
    "12:00": "blue",
    "12:30": "blue",
    "13:00": "blue",
    "13:30": "blue",
    "14:00": "blue",
    "14:30": "blue",
    "15:00": "blue",
    "15:30": "blue",
    "16:00": "blue",
    "16:30": "blue",
    "17:00": "blue",
    "17:30": "blue",
    "18:00": "blue",
    "18:30": "blue",
    "19:00": "blue",
    "19:30": "blue",
    "20:00": "blue",
    "20:30": "blue",
    "21:00": "blue",
    "21:30": "blue",
    "22:00": "blue",
    "22:30": "blue",
    "23:00": "blue",
    "23:30": "blue",
    "24:00": "blue",
  };
  let equipment_availability = [];
  warehouse.innerText = warehouse_name;
  const getEquipment = async () => {
    const get_equipment_url = base_url + "equipment/" + equipment_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      get_equipment_url,
      access_token
    );
    if (response.data.error) {
      result.innerHTML = `<div id = "response" class="container mt-3">
      <div class="alert alert-danger alert-dismissible fade show" role="alert">Service Not Found
    </div></div>`;
      setTimeout(() => {
        result.innerHTML = `<div id = "response""></div>`;
      }, 5000);
      document.getElementById("calendar-part").style.display = "none";
    }
    if (response.data.message) {
      equipment_name.innerText = response.data.equipment.name;
      charge.innerText = response.data.equipment.price_per_hour;
      description.innerText = response.data.equipment.description;
      for (i in response.data.availability) {
        const ini_start_time =
          response.data.availability[i].start_time.split(" ")[1];
        const start_time = ini_start_time.substring(
          0,
          ini_start_time.length - 3
        );
        const ini_end_time =
          response.data.availability[i].end_time.split(" ")[1];
        const end_time = ini_end_time.substring(0, ini_end_time.length - 3);
        const obj = {
          date: response.data.availability[i].date,
          start_time: start_time,
          end_time: end_time,
        };
        equipment_availability.push(obj);
      }
    }
  };
  const orderEquipment = async () => {
    const order_equipment_url = base_url + "order/equipment";
    const order_equipment_data = new FormData();
    order_equipment_data.append("item_id", equipment_id);
    order_equipment_data.append("warehouse_id", warehouse_id);
    const originalDateString =
      document.getElementById("booking-date").textContent;
    const [day, month, year] = originalDateString.split("-");
    const transformedDateString = `${year}-${month}-${day}`;
    const currentDate = new Date();
    const givenDate = new Date(transformedDateString);
    if (givenDate < currentDate) {
      result2.innerHTML = `<div id = "response2" class="container mt-3">
      <div class="alert alert-danger alert-dismissible fade show" role="alert">Cannot book a day in the past!
    </div></div>`;
      setTimeout(() => {
        result2.innerHTML = `<div id = "response2""></div>`;
      }, 5000);
      return;
    }
    order_equipment_data.append("date", transformedDateString);
    order_equipment_data.append("start_time", start_time);
    order_equipment_data.append("end_time", end_time);
    const pricePerHour = charge.textContent;
    const totalPrice = pricePerHour * totalDurationHours;
    order_equipment_data.append("price", totalPrice);
    order_equipment_data.append("latitude", latitude);
    order_equipment_data.append("longitude", longitude);
    order_equipment_data.append("location_description", location_desc.value);

    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      order_equipment_url,
      order_equipment_data,
      access_token
    );
    console.log(response);
    if (response.data.error) {
      if (response.data.error.location_description) {
        location_desc_feedback.innerHTML = `<label id = "location_desc_f" class="feedback-text"><b>${response.data.error.location_description[0]}</b></label>`;
        setTimeout(() => {
          location_desc_feedback.innerHTML = `<label id = "location_desc_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
    } else {
      result2.innerHTML = `<div id = "response2" class="container mt-3">
      <div class="alert alert-success alert-dismissible fade show" role="alert">${response.data.message}
    </div></div>`;
      setTimeout(() => {
        result2.innerHTML = `<div id = "response2""></div>`;
      }, 5000);
    }
  };
  const resetAvailability = () => {
    for (key in availability) {
      availability[key] = "blue";
      generateSchedule();
    }
  };
  const getServiceAvailability = async (date) => {
    console.log(equipment_availability);
    resetAvailability();
    const keys = Object.keys(availability);
    for (i in equipment_availability) {
      if (equipment_availability[i].date === date) {
        const start_key = equipment_availability[i].start_time;
        const end_key = equipment_availability[i].end_time;
        const start_index = keys.indexOf(start_key);
        const end_index = keys.indexOf(end_key);
        for (let i = start_index; i <= end_index; i++) {
          const key = keys[i];
          availability[key] = "green";
        }
      }
    }
    const get_bookings_url = base_url + "order/get/date/item";
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const get_bookings_data = new FormData();
    get_bookings_data.append("type", "equipment");
    get_bookings_data.append("warehouse_id", warehouse_id);
    get_bookings_data.append("item_id", equipment_id);
    get_bookings_data.append("date", date);
    const response = await webuild_pages.postAPI(
      get_bookings_url,
      get_bookings_data,
      access_token
    );
    if (response.data.message) {
      for (i in response.data.bookings) {
        const start_key = response.data.bookings[i].start_time;
        const end_key = response.data.bookings[i].end_time;
        const start_index = keys.indexOf(start_key);
        const end_index = keys.indexOf(end_key);
        for (let i = start_index; i <= end_index; i++) {
          const key = keys[i];
          availability[key] = "red";
        }
      }
    }
    generateSchedule();
  };
  // Function to create a box element
  function createBox(date, time, available) {
    const boxContainer = document.createElement("div");
    boxContainer.classList.add("box-container");

    const box = document.createElement("div");
    box.classList.add("box");
    box.classList.add(available);
    box.setAttribute("data-date", date);
    box.setAttribute("data-time", time);

    const timeText = document.createElement("span");
    timeText.classList.add("time-text");
    timeText.textContent = time;

    boxContainer.appendChild(timeText);
    boxContainer.appendChild(box);
    box.addEventListener("click", boxClickHandler);
    return boxContainer;
  }
  function bookTimeSlot() {
    const date = document.getElementById("booking-date").textContent;
    if (selectedBoxes.length > 0) {
      start_time = selectedBoxes[0];
      end_time = selectedBoxes[selectedBoxes.length - 1];
      const startParts = start_time.split(":");
      const endParts = end_time.split(":");

      const startHours = parseInt(startParts[0], 10);
      const startMinutes = parseInt(startParts[1], 10);

      const endHours = parseInt(endParts[0], 10);
      const endMinutes = parseInt(endParts[1], 10);

      const startDate = new Date();
      startDate.setHours(startHours);
      startDate.setMinutes(startMinutes);

      const endDate = new Date();
      endDate.setHours(endHours);
      endDate.setMinutes(endMinutes);

      const durationMs = endDate.getTime() - startDate.getTime();

      // Convert durationMs to hours and minutes
      const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
      const durationMinutes = Math.floor(
        (durationMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      totalDurationHours = durationHours + durationMinutes / 60;
      document.getElementById("booking-details").style.display = "block";
      document.getElementById("booking-date").textContent = date;
      document.getElementById("booking-time").textContent =
        "  From " +
        start_time +
        " to " +
        end_time +
        ". A total duration of " +
        durationHours +
        " hours and " +
        durationMinutes +
        " minutes";
      if (selectedBoxes.length > 1) {
        document.getElementById("book-btn").disabled = false;
      }
      if (selectedBoxes.length < 2) {
        document.getElementById("book-btn").disabled = true;
      }
    }
    if (selectedBoxes.length == 0) {
      document.getElementById("book-btn").disabled = true;
      document.getElementById("booking-time").textContent = "";
      document.getElementById("booking-details").style.display = "none";
    }
  }
  // Function to handle box click event
  function boxClickHandler(event) {
    const box = event.target;
    const date = box.getAttribute("data-date");
    const time = box.getAttribute("data-time");
    if (box.classList.contains("blue")) {
      booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b>Service Unavailable at this time</b></label>`;
      setTimeout(() => {
        booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b></b></label>`;
      }, 3000);
      return; // Ignore unavailable cells
    }
    if (box.classList.contains("red")) {
      booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b>Service Unavailable at this time</b></label>`;
      setTimeout(() => {
        booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b></b></label>`;
      }, 3000);
    } else {
      if (!box.classList.contains("selected")) {
        const target = box.getAttribute("data-time");
        selectedBoxIndex = Object.keys(availability).indexOf(target);
        if (lastSelectedBoxIndex !== -1 && firstSelectedBoxIndex != -1) {
          if (
            selectedBoxIndex !== lastSelectedBoxIndex + 1 &&
            selectedBoxIndex !== firstSelectedBoxIndex - 1
          ) {
            booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b>You are not allowed to select nonconsecutive boxes</b></label>`;
            setTimeout(() => {
              booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b></b></label>`;
            }, 3000);
            console.log("You are not allowed to select nonconsecutive boxes");
            return;
          }
          if (selectedBoxIndex === lastSelectedBoxIndex + 1) {
            lastSelectedBoxIndex = selectedBoxIndex;
            selectedBoxes.push(box.getAttribute("data-time"));
          }
          if (selectedBoxIndex === firstSelectedBoxIndex - 1) {
            firstSelectedBoxIndex = selectedBoxIndex;
            selectedBoxes.splice(0, 0, box.getAttribute("data-time"));
          }
          box.classList.add("selected");
        } else {
          box.classList.add("selected");
          selectedBoxes.push(box.getAttribute("data-time"));
          lastSelectedBoxIndex = selectedBoxIndex;
          firstSelectedBoxIndex = selectedBoxIndex;
        }
      } else {
        const target = box.getAttribute("data-time");
        const index = selectedBoxes.indexOf(target);
        const indexIn = Object.keys(availability).indexOf(target);
        if (
          indexIn !== lastSelectedBoxIndex &&
          indexIn !== firstSelectedBoxIndex
        ) {
          booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b>You are not allowed to de-select nonconsecutive boxes</b></label>`;
          setTimeout(() => {
            booking_feedback.innerHTML = `<label id = "booking_f" class="feedback-text"><b></b></label>`;
          }, 3000);
          return;
        }
        if (index !== -1) {
          selectedBoxes.splice(index, 1);
          box.classList.remove("selected");
          const allSelectedElements = document.querySelectorAll(".selected");
          if (allSelectedElements.length > 0) {
            const firstSelectedElement =
              allSelectedElements[0].getAttribute("data-time");
            const lastSelectedElement =
              allSelectedElements[allSelectedElements.length - 1].getAttribute(
                "data-time"
              );
            firstSelectedBoxIndex =
              Object.keys(availability).indexOf(firstSelectedElement);
            lastSelectedBoxIndex =
              Object.keys(availability).indexOf(lastSelectedElement);
          } else {
            firstSelectedBoxIndex = -1;
            lastSelectedBoxIndex = -1;
          }
        }
      }
    }
    bookTimeSlot();
  }
  function deleteSchedule() {
    const calendar = document.getElementById("calendar");
    // Remove all child elements of the calendar
    while (calendar.firstChild) {
      calendar.removeChild(calendar.firstChild);
    }

    isCalendarGenerated = false;
  }
  function generateSchedule() {
    if (isCalendarGenerated) {
      deleteSchedule();
    }
    const calendar = document.getElementById("calendar");
    for (const time in availability) {
      const available = availability[time];
      const date = document.getElementById("booking-date").textContent;
      const box = createBox(date, time, available);
      calendar.appendChild(box);
    }
    isCalendarGenerated = true;
  }
  function initMap() {
    const centerLocation = { lat: 34.123, lng: 35.6519 };
    // Create a map instance
    const map = new google.maps.Map(document.getElementById("map"), {
      center: centerLocation,
      zoom: 10, // Set an initial zoom level
    });

    // Add a marker to the map
    marker = new google.maps.Marker({
      position: centerLocation,
      map: map,
      title: "Location Name", // Example: Custom location name
    });
    latitude = marker.getPosition().lat();
    longitude = marker.getPosition().lng();

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // Set the map's center to the current location
        map.setCenter(currentLocation);
        // Add a marker for the current location
        const currentMarker = new google.maps.Marker({
          position: currentLocation,
          map: map,
          title: "Your Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Example: Custom marker icon
        });
      });
    }
    // Search for a location
    const searchInput = document.getElementById("search-input");
    const searchBox = new google.maps.places.SearchBox(searchInput);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);

    searchBox.addListener("places_changed", function () {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      // Clear any existing markers
      marker.setMap(null);

      // Get the first place result and update the map
      const place = places[0];
      if (!place.geometry) {
        console.log("No geometry available for this place.");
        return;
      }

      // Set the map's center to the searched location
      map.setCenter(place.geometry.location);

      // Add a marker for the searched location
      marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
      });
      latitude = marker.getPosition().lat();
      longitude = marker.getPosition().lng();
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    });
    // Add a click event listener to the map
    map.addListener("click", function (event) {
      placeMarker(event.latLng); // Place a marker at the clicked location
    });
    // Place a marker at the specified location
    function placeMarker(location) {
      // Remove the previous marker if it exists
      if (marker) {
        marker.setMap(null);
      }
      // Create a new marker
      marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      latitude = marker.getPosition().lat();
      longitude = marker.getPosition().lng();
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    }
  }
  document.getElementById("book-btn").disabled = true;
  $(document).ready(function () {
    function generateCalendar(month, year) {
      const selectedDate = moment({ year: year, month: month });
      $("#schedules-container").fullCalendar("changeView", "month");
      $("#schedules-container").fullCalendar("gotoDate", selectedDate);
    }

    $("#schedules-container").fullCalendar({
      header: {
        right: "prev,next today",
      },
      customButtons: {
        prev: {
          text: ">",
          click: function () {
            $("#schedules-container").fullCalendar("prev");
            deleteSchedule();
            document.getElementById("booking-date").textContent = "";
            document.getElementById("booking-details").style.display = "none";
            selectedBoxes = [];
            lastSelectedBoxIndex = -1;
            firstSelectedBoxIndex = -1;
          },
        },
        next: {
          text: "",
          click: function () {
            $("#schedules-container").fullCalendar("next");
            deleteSchedule();
            document.getElementById("booking-date").textContent = "";
            document.getElementById("booking-details").style.display = "none";
            selectedBoxes = [];
            lastSelectedBoxIndex = -1;
            firstSelectedBoxIndex = -1;
          },
        },
        today: {
          text: "This Month",
          click: function () {
            $("#schedules-container").fullCalendar("today");
            deleteSchedule();
            document.getElementById("booking-date").textContent = "";
            document.getElementById("booking-details").style.display = "none";
            selectedBoxes = [];
            lastSelectedBoxIndex = -1;
            firstSelectedBoxIndex = -1;
          },
        },
      },
      viewRender: function (view, element) {
        var today = moment().startOf("day");
        $(".fc-today").css("background-color", "#00000000"); // Set the desired background color
        $(".fc-left").css("color", "#081132"); // Set the desired background color
      },
      selectable: true,
      select: function (start) {
        const date1 = moment(start).format("YYYY-MM-DD");
        const date2 = moment(start).format("DD-MM-YYYY");
        document.getElementById("booking-date").textContent = date2;
        document.getElementById("booking-details").style.display = "none";
        selectedBoxes = [];
        lastSelectedBoxIndex = -1;
        firstSelectedBoxIndex = -1;
        getServiceAvailability(date1);
      },
    });
    const today = new Date();
    const currentMonth = today.getMonth(); // Month is zero-based (0-11)
    const currentYear = today.getFullYear();
    generateCalendar(currentMonth, currentYear); // Example usage: Generate the calendar for January 2023
  });
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  getEquipment();
  document.getElementById("book-btn").addEventListener("click", orderEquipment);
  window.onload = initMap;
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_order_material = () => {
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const warehouse_name = localStorage.getItem("warehouse_name");
  const warehouse_id = localStorage.getItem("warehouse_id");
  const warehouse = document.getElementById("warehouse_name");
  const nav_bar = document.getElementById("navbar");
  const result = document.getElementById("response");
  const result2 = document.getElementById("response2");
  const urlParams = new URLSearchParams(window.location.search);
  const material_id = urlParams.get("id");
  const authenticated_user = store[0].user_id;
  const material_name = document.getElementById("material-name");
  const charge = document.getElementById("charge");
  const quantity = document.getElementById("quantity");
  const order_quantity = document.getElementById("order_quantity");
  const location_desc = document.getElementById("location_desc");
  const quantity_feedback = document.getElementById("quantity_f");
  const location_desc_feedback = document.getElementById("location_desc_f");
  let marker;
  let similar_to_logged_in_warehouse = false;
  if (authenticated_user == warehouse_id) {
    similar_to_logged_in_warehouse = true;
    // Add sthg if necessary
  }
  warehouse.innerText = warehouse_name;
  const getMaterial = async () => {
    const get_material_url = base_url + "material/one/" + material_id;
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(get_material_url, access_token);
    if (response.data.error) {
      result.innerHTML = `<div id = "response" class="container mt-3">
      <div class="alert alert-danger alert-dismissible fade show" role="alert">Material Not Found
    </div></div>`;
      setTimeout(() => {
        result.innerHTML = `<div id = "response""></div>`;
      }, 5000);
    }
    if (response.data.message) {
      material_name.innerText = response.data.message.name;
      charge.innerText = response.data.message.price_per_unit + "$";
      quantity.innerText = response.data.message.available_quantity;
      description.innerText = response.data.message.description;
    }
  };
  const orderMaterial = async () => {
    const order_material_url = base_url + "order/material";
    const order_material_data = new FormData();
    order_material_data.append("item_id", material_id);
    order_material_data.append("warehouse_id", warehouse_id);
    order_material_data.append("quantity", order_quantity.value);
    order_material_data.append("latitude", latitude);
    order_material_data.append("longitude", longitude);
    order_material_data.append("location_description", location_desc.value);

    const access_token = store[0].access_token;
    const response = await webuild_pages.postAPI(
      order_material_url,
      order_material_data,
      access_token
    );
    console.log(response);
    if (response.data.error) {
      console.log(response.data.error);
      if (response.data.error.quantity) {
        quantity_feedback.innerHTML = `<label id = "quantity_f" class="feedback-text"><b>${response.data.error.quantity[0]}</b></label>`;
        setTimeout(() => {
          quantity_feedback.innerHTML = `<label id = "quantity_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (response.data.error.location_description) {
        location_desc_feedback.innerHTML = `<label id = "location_desc_f" class="feedback-text"><b>${response.data.error.location_description[0]}</b></label>`;
        setTimeout(() => {
          location_desc_feedback.innerHTML = `<label id = "location_desc_f" class="feedback-text"><b></b></label>`;
        }, 5000);
      }
      if (
        !response.data.error.quantity &&
        !response.data.error.location_description
      ) {
        result2.innerHTML = `<div id = "response2" class="container mt-3">
      <div class="alert alert-danger alert-dismissible fade show" role="alert">${response.data.error}
    </div></div>`;
        setTimeout(() => {
          result2.innerHTML = `<div id = "response2""></div>`;
        }, 5000);
      }
    } else {
      result2.innerHTML = `<div id = "response2" class="container mt-3">
      <div class="alert alert-success alert-dismissible fade show" role="alert">${response.data.message}
    </div></div>`;
      setTimeout(() => {
        result2.innerHTML = `<div id = "response2""></div>`;
      }, 5000);
    }
  };
  function initMap() {
    const centerLocation = { lat: 34.123, lng: 35.6519 };
    // Create a map instance
    const map = new google.maps.Map(document.getElementById("map"), {
      center: centerLocation,
      zoom: 10, // Set an initial zoom level
    });

    // Add a marker to the map
    marker = new google.maps.Marker({
      position: centerLocation,
      map: map,
      title: "Location Name", // Example: Custom location name
    });
    latitude = marker.getPosition().lat();
    longitude = marker.getPosition().lng();

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // Set the map's center to the current location
        map.setCenter(currentLocation);
        // Add a marker for the current location
        const currentMarker = new google.maps.Marker({
          position: currentLocation,
          map: map,
          title: "Your Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Example: Custom marker icon
        });
      });
    }
    // Search for a location
    const searchInput = document.getElementById("search-input");
    const searchBox = new google.maps.places.SearchBox(searchInput);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);

    searchBox.addListener("places_changed", function () {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      // Clear any existing markers
      marker.setMap(null);

      // Get the first place result and update the map
      const place = places[0];
      if (!place.geometry) {
        console.log("No geometry available for this place.");
        return;
      }

      // Set the map's center to the searched location
      map.setCenter(place.geometry.location);

      // Add a marker for the searched location
      marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
      });
      latitude = marker.getPosition().lat();
      longitude = marker.getPosition().lng();
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    });
    // Add a click event listener to the map
    map.addListener("click", function (event) {
      placeMarker(event.latLng); // Place a marker at the clicked location
    });
    // Place a marker at the specified location
    function placeMarker(location) {
      // Remove the previous marker if it exists
      if (marker) {
        marker.setMap(null);
      }
      // Create a new marker
      marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      latitude = marker.getPosition().lat();
      longitude = marker.getPosition().lng();
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    }
  }
  var quantityInput = document.getElementById("order_quantity");
  var decreaseBtn = document.getElementById("dec_q");
  var increaseBtn = document.getElementById("inc_q");

  // Event listener for the decrement button
  decreaseBtn.addEventListener("click", function () {
    var currentValue = parseInt(quantityInput.value);
    if (currentValue > 0) {
      quantityInput.value = currentValue - 1;
    }
  });

  // Event listener for the increment button
  increaseBtn.addEventListener("click", function () {
    var currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  getMaterial();
  document
    .getElementById("order-material")
    .addEventListener("click", orderMaterial);
  window.onload = initMap;
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
webuild_pages.load_my_orders = () => {
  const store = JSON.parse(localStorage.getItem("userData"));
  const user_type = store[0].user_type;
  const nav_bar = document.getElementById("navbar");
  const result = document.getElementById("response");
  const result2 = document.getElementById("response2");
  const authenticated_user = store[0].user_id;
  const warehouse_name = document.getElementById("warehouse_name");
  const email = document.getElementById("email");
  const phone_number = document.getElementById("phone_number");
  const material_name = document.getElementById("material_name");
  const service_name = document.getElementById("service_name");
  const equipment_name = document.getElementById("equipment_name");
  const price_per_unit = document.getElementById("price_per_unit");
  const price_per_hour = document.getElementById("price_per_hour");
  const minimum_charge_per_hour = document.getElementById(
    "minimum_charge_per_hour"
  );
  const quantity_ordered = document.getElementById("quantity_ordered");
  const date = document.getElementById("date");
  const start_time = document.getElementById("start_time");
  const end_time = document.getElementById("end_time");
  const order_price = document.getElementById("order_price");
  const longitude = document.getElementById("longitude");
  const latitude = document.getElementById("latitude");
  const location_desc = document.getElementById("location_desc");
  const all_orders = document.getElementById("all_orders");

  const getOrders = async () => {
    const get_orders_url = base_url + "order/get/u";
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(get_orders_url, access_token);
    let orders_list = `<div id="all_orders"class="comments"><br>`;
    if (response.data.error) {
      all_orders.innerHTML = `<div id="all_orders"class="comments row gy-4 posts-list">
      <div class="hilight"></div>
       <p class="not-available"">No Orders for</p>`;
    }
    if (response.data.message) {
      const orders = response.data.orders;
      orders.map((order, i) => {
        if (order.type === "material") {
          orders_list += `<div class="reply-form position-relative">    
        <div class="card-body padding">
            <div class="input">
              <ul>
                <li class="d-flex align-items-center">
                    <span id="warehouse_name"><b>Warehouse Name:</b>${order.username}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="email" ><b>Email:</b>${order.email}</span>
                </li>  
                <br>
                <li class="d-flex align-items-center">
                    <span id="phone_number" ><b>Phone Number:</b>${order.phone_number}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="material_name"><b>Material Name:</b>${order.material_name}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="price_per_unit"><b>Price Per Unit:</b>${order.price_per_unit}$</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="quantity_ordered"><b>Quantity Ordered:</b>${order.username}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="order_price" ><b>Order Price:</b>${order.price}$</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="longitude" ><b>Longitude:</b>${order.longtitude}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="latitude" ><b>Latitude:</b>${order.latitude}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="location_desc" ><b>Location Description:</b>${order.location_description}</span>
                </li>       
              </ul>
            </div>
        </div> 
    </div>
    <br>`;
        } else if (order.type === "service") {
          orders_list += `<div class="reply-form position-relative">    
            <div class="card-body padding">
                <div class="input">
                  <ul>
                    <li class="d-flex align-items-center">
                        <span id="warehouse_name"><b>Warehouse Name:</b>${order.username}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="email" ><b>Email:</b>${order.email}</span>
                    </li>  
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="phone_number" ><b>Phone Number:</b>${order.phone_number}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="service_name" ><b>Service Name:</b>${order.service_name}</span>
                    </li> 
                    <br>  
                    <li class="d-flex align-items-center">
                        <span id="minimum_charge_per_hour" ><b>Minimum Charge Per Hour:</b>${order.minimum_charge_per_hour}$</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="date" ><b>Date:</b>${order.date}</span>
                    </li> 
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="start_time" ><b>Start Time:</b>${order.start_time}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="end_time"><b>End Time:</b>${order.end_time}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="order_price" ><b>Order Price:</b>${order.price}$</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="longitude" ><b>Longitude:</b>${order.longtitude}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="latitude" ><b>Latitude:</b>${order.latitude}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="location_desc" ><b>Location Description:</b>${order.location_description}</span>
                    </li>       
                  </ul>
                </div>
            </div> 
        </div>
        <br>`;
        } else if (order.type === "equipment") {
          `<div class="reply-form position-relative">    
          <div class="card-body padding">
              <div class="input">
                <ul>
                  <li class="d-flex align-items-center">
                      <span id="warehouse_name"><b>Warehouse Name:</b>${order.username}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="email" ><b>Email:</b>${order.email}</span>
                  </li>  
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="phone_number" ><b>Phone Number:</b>${order.phone_number}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="equipment_name" ><b>Equipment Name:</b>${order.equipment_name}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="price_per_hour" ><b>Price Per Hour:</b>${order.price_per_hour}$</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="date" ><b>Date:</b>${order.date}</span>
                  </li> 
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="start_time" ><b>Start Time:</b>${order.start_time}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="end_time"><b>End Time:</b>${order.end_time}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="order_price" ><b>Order Price:</b>${order.price}$</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="longitude" ><b>Longitude:</b>${order.longtitude}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="latitude" ><b>Latitude:</b>${order.latitude}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="location_desc" ><b>Location Description:</b>${order.location_description}</span>
                  </li>       
                </ul>
              </div>
          </div> 
      </div>
      <br>`;
        }
      });
      orders_list += `</div>`;
      all_orders.innerHTML = orders_list;
      const cancel_btns = document.querySelectorAll(".del");
      cancel_btns.forEach((element) =>
        element.addEventListener("click", console.log("OK"))
      );
    }
  };
  const getWarehouseOrders = async () => {
    const get__warehouse_orders_url = base_url + "order/get/w";
    const store = JSON.parse(localStorage.getItem("userData"));
    const access_token = store[0].access_token;
    const response = await webuild_pages.getAPI(
      get__warehouse_orders_url,
      access_token
    );
    let orders_list = `<div id="all_orders"class="comments"><br>`;
    if (response.data.error) {
      all_orders.innerHTML = `<div id="all_orders"class="comments row gy-4 posts-list">
      <div class="hilight"></div>
       <p class="not-available"">No Orders for</p>`;
    }
    if (response.data.message) {
      const orders = response.data.orders;
      orders.map((order, i) => {
        if (order.type === "material") {
          orders_list += `<div class="reply-form position-relative">    
        <div class="card-body padding">
            <div class="input">
              <ul>
                <li class="d-flex align-items-center">
                    <span id="warehouse_name"><b>Warehouse Name:</b>${order.username}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="email" ><b>Email:</b>${order.email}</span>
                </li>  
                <br>
                <li class="d-flex align-items-center">
                    <span id="phone_number" ><b>Phone Number:</b>${order.phone_number}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="material_name"><b>Material Name:</b>${order.material_name}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="price_per_unit"><b>Price Per Unit:</b>${order.price_per_unit}$</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="quantity_ordered"><b>Quantity Ordered:</b>${order.username}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="order_price" ><b>Order Price:</b>${order.price}$</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="longitude" ><b>Longitude:</b>${order.longtitude}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="latitude" ><b>Latitude:</b>${order.latitude}</span>
                </li>
                <br>
                <li class="d-flex align-items-center">
                    <span id="location_desc" ><b>Location Description:</b>${order.location_description}</span>
                </li>       
              </ul>
            </div>
        </div> 
    </div>
    <br>`;
        } else if (order.type === "service") {
          orders_list += `<div class="reply-form position-relative">    
            <div class="card-body padding">
                <div class="input">
                  <ul>
                    <li class="d-flex align-items-center">
                        <span id="warehouse_name"><b>Warehouse Name:</b>${order.username}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="email" ><b>Email:</b>${order.email}</span>
                    </li>  
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="phone_number" ><b>Phone Number:</b>${order.phone_number}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="service_name" ><b>Service Name:</b>${order.service_name}</span>
                    </li> 
                    <br>  
                    <li class="d-flex align-items-center">
                        <span id="minimum_charge_per_hour" ><b>Minimum Charge Per Hour:</b>${order.minimum_charge_per_hour}$</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="date" ><b>Date:</b>${order.date}</span>
                    </li> 
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="start_time" ><b>Start Time:</b>${order.start_time}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="end_time"><b>End Time:</b>${order.end_time}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="order_price" ><b>Order Price:</b>${order.price}$</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="longitude" ><b>Longitude:</b>${order.longtitude}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="latitude" ><b>Latitude:</b>${order.latitude}</span>
                    </li>
                    <br>
                    <li class="d-flex align-items-center">
                        <span id="location_desc" ><b>Location Description:</b>${order.location_description}</span>
                    </li>       
                  </ul>
                </div>
            </div> 
        </div>
        <br>`;
        } else if (order.type === "equipment") {
          `<div class="reply-form position-relative">    
          <div class="card-body padding">
              <div class="input">
                <ul>
                  <li class="d-flex align-items-center">
                      <span id="warehouse_name"><b>Warehouse Name:</b>${order.username}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="email" ><b>Email:</b>${order.email}</span>
                  </li>  
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="phone_number" ><b>Phone Number:</b>${order.phone_number}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="equipment_name" ><b>Equipment Name:</b>${order.equipment_name}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="price_per_hour" ><b>Price Per Hour:</b>${order.price_per_hour}$</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="date" ><b>Date:</b>${order.date}</span>
                  </li> 
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="start_time" ><b>Start Time:</b>${order.start_time}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="end_time"><b>End Time:</b>${order.end_time}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="order_price" ><b>Order Price:</b>${order.price}$</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="longitude" ><b>Longitude:</b>${order.longtitude}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="latitude" ><b>Latitude:</b>${order.latitude}</span>
                  </li>
                  <br>
                  <li class="d-flex align-items-center">
                      <span id="location_desc" ><b>Location Description:</b>${order.location_description}</span>
                  </li>       
                </ul>
              </div>
          </div> 
      </div>
      <br>`;
        }
      });
      orders_list += `</div>`;
      all_orders.innerHTML = orders_list;
      const cancel_btns = document.querySelectorAll(".del");
      cancel_btns.forEach((element) =>
        element.addEventListener("click", console.log("OK"))
      );
    }
  };
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");
  if (type) {
    getWarehouseOrders();
  } else {
    getOrders();
  }
  if (user_type === "w") {
    const warehouse_id = store[0].user_id;
    const warehouse_name = store[0].username;
    nav_bar.innerHTML = `<ul>
    <li><a href="userHome.html">Warehouses</a></li>
    <li><a onclick = "warehouseClickHandler('${warehouse_id}', '${warehouse_name}')" href="categories.html">My Warehouse</a></li>
    <li><a href="orders.html">My Orders</a></li>
    <li><a href="orders.html?type=w">Customers Orders</a></li>
    <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
      <ul>
        <li><a href="./profile.html">Edit Profile</a></li>
        <li><a id = logout href="#">Logout</a></li>
      </ul>
    </li>
  </ul>`;
  } else {
    nav_bar.innerHTML =
    `<ul>
   <li><a class = "active" href="userHome.html">Warehouses</a></li>
   <li><a href="orders.html">My Orders</a></li>
   <li class="dropdown"><a href="#"><span>Profile</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
     <ul>
       <li><a href="./profile.html">Edit Profile</a></li>
       <li><a id = logout href="#">Logout</a></li>
     </ul>
   </li>
 </ul>`;
  }
  const logout_btn = document.getElementById("logout");
  logout_btn.addEventListener("click", logout);
};
