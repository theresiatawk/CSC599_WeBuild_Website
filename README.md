# WeBuild Website

Welcome to the WeBuild Website project! This repository contains the source code and documentation for the WeBuild online 
delivery service, which provides a platform for users to order construction-related equipment, services, and materials.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

## Introduction

The WeBuild Website project aims to offer a smooth online delivery service specifically designed for the construction field. Users can register and create accounts as either regular users or warehouse owners. They can browse and order various services, materials, and equipment, specify delivery preferences, and track their orders. Warehouse owners can manage their inventory, view and process orders, and update their availability.

This repository serves as the main codebase for the WeBuild Website project and includes both the frontend and backend components.

## Technologies Used
The WeBuild Website project utilizes the following technologies:

- HTML
- CSS
- JavaScript
- Laravel (PHP framework)
- MySQL (Database)
- XAMPP (Server)

## Installation
To set up the WeBuild Website project locally on your machine, please follow the instructions below:

  1. Clone the repository to your local machine using Git or download the ZIP file and extract it.  
  
  ```
  git clone https://github.com/theresiatawk/CSC599_WeBuild_Website.git
  ```

2. Install XAMPP, which provides the necessary server environment for running the Laravel application. You can download XAMPP from the official website: https://www.apachefriends.org/index.html

3. Create a new MySQL database for the project. You can use a tool like phpMyAdmin provided by XAMPP or any other MySQL client.

4. Rename the .env.example file to .env and update the database configuration settings with your MySQL credentials:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
```

5. Open a command prompt or terminal and navigate to the project's root directory.

6. Run the following commands to install the project dependencies:

```
composer install
php artisan key:generate
```
7. Run the database migrations to create the required tables:

```
php artisan migrate
```
8. Start the local development server:

```
php artisan serve
```
Congratulations! You have successfully installed the WeBuild Website project on your local machine.
