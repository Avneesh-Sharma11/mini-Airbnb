# WonderStay

## 📌 Description
WonderStay is a web application where users can create and manage property listings.  
Users can add a listing with a **title, price, location, country, and image**.  

The project uses **MongoDB Atlas** for database storage and **Cloudinary** for image uploads and management.  

All listings are displayed on the homepage, and users can view complete property details on the **show route**.

Users can also **edit or delete listings** directly from the show page.  
The application includes **error handling middleware**, **Bootstrap alerts**, and **server-side validations** for a better user experience.

---

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Cloudinary
- Multer
- EJS (Embedded JavaScript Templates)
- Bootstrap
- JavaScript

---

## ✨ Features
- View all listings
- Add a new listing
- Upload property images with Cloudinary
- View listing details (Show Route)
- Edit existing listings
- Delete listings
- Responsive Bootstrap UI
- Error handling with middleware
- Server-side validations
- MongoDB Atlas database integration

---

## ☁️ Cloudinary Integration
Cloudinary is used for storing and managing uploaded property images.

### Features
- Image upload support
- Optimized image delivery
- Secure cloud storage
- Automatic image URL generation

### Required Environment Variables
```env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

---

## 🍃 MongoDB Atlas Integration
MongoDB Atlas is used as the cloud database for storing listings and application data.

### Required Environment Variable
```env
ATLASDB_URL=your_mongodb_connection_string
```

Example:
```env
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/wonderstay
```

---

## 📂 Folder Structure
```bash
wonderstay
│
├── init
├── models
├── public
├── routes
├── utils
├── views
│   ├── includes
│   ├── layouts
│   └── listings
│
├── cloudConfig.js
├── app.js
├── package.json
└── .env
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Avneesh-Sharma11/mini-Airbnb.git
cd wonderstay
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add:

```env
ATLASDB_URL=your_mongodb_connection_string

CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

---

## ▶️ Run Project

### Initialize Database
```bash
nodemon init/index.js
```

### Start Server
```bash
nodemon app.js
```

---

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/listings` | Show all listings |
| `/listings/new` | Create new listing |
| `/listings/:id` | Show listing details |
| `/listings/:id/edit` | Edit listing |
| `/listings/:id` | Delete listing |

---

## 📸 Screenshots
- Homepage with all listings
- Listing details page
- Create listing form
- Edit listing form

---

## 👨‍💻 Author
Developed by Avneesh Sharma