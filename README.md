# x-clone-api Documentation

## Overview
The `x-clone-api` provides a backend API for managing user accounts, posts, and images for a social media-like application. This API supports user registration, login, post creation, image uploads to AWS S3, and other post-related functionalities.

---

## Table of Contents
1. [User Routes](#user-routes)
2. [Post Routes](#post-routes)
3. [Image Routes](#image-routes)
4. [Authentication Routes](#authentication-routes)
5. [Error Handling](#error-handling)

---

## User Routes

### 1. **Get All Users**
   **GET** `/api/v1/users/`
   
   Retrieves all users in the system.

   #### Response:
   ```json
   [
     {
       "_id": "user_id",
       "username": "user_name",
       "email": "user_email"
     },
   ]
   ```

### 2. **Get User By ID**
   **GET** `/api/v1/users/:id`
   
   Retrieves a specific user by their `id`.

   #### Response:
   ```json
   {
     "_id": "user_id",
     "username": "user_name",
     "email": "user_email"
   }
   ```

---

## Post Routes

### 1. **Get All Posts**
   **GET** `/api/v1/posts/`
   
   Retrieves all posts in the system.

   #### Response:
   ```json
   [
     {
       "_id": "post_id",
       "title": "Post title",
       "content": "Post content",
       "images": ["image_id_1", "image_id_2"],
       "createdAt": "timestamp"
     },
   ]
   ```

### 2. **Add Post**
   **POST** `/api/v1/posts/`
   
   Creates a new post.

   #### Request Body:
   ```json
   {
     "title": "Post title",
     "content": "Post content"
   }
   ```

   #### Response:
   ```json
   {
     "message": "Post created successfully",
     "post": {
       "_id": "post_id",
       "title": "Post title",
       "content": "Post content",
       "createdAt": "timestamp"
     }
   }
   ```

### 3. **Update Post**
   **PUT** `/api/v1/posts/:id/update`
   
   Updates a specific post by its `id`.

   #### Request Body:
   ```json
   {
     "title": "Updated post title",
     "content": "Updated content"
   }
   ```

   #### Response:
   ```json
   {
     "message": "Post updated successfully",
     "post": {
       "_id": "post_id",
       "title": "Updated post title",
       "content": "Updated content",
       "createdAt": "timestamp"
     }
   }
   ```

### 4. **Add Post Comment**
   **PUT** `/api/v1/posts/:id/comment`
   
   Adds a comment to a specific post.

   #### Request Body:
   ```json
   {
     "comment": "This is a comment"
   }
   ```

   #### Response:
   ```json
   {
     "message": "Comment added successfully",
     "post": {
       "_id": "post_id",
       "comments": ["comment_id_1"]
     }
   }
   ```

### 5. **Delete Post Comment**
   **DELETE** `/api/v1/posts/delete/:postId/comment/:commentId`
   
   Deletes a specific comment from a post.

   #### Response:
   ```json
   {
     "message": "Comment deleted successfully"
   }
   ```

---

## Image Routes

### 1. **Upload Profile Image**
   **POST** `/api/v1/upload/image/profile/:userId`
   
   Uploads a profile image for a user.

   #### Request Body:
   **Form Data**:
   - `image`: (Profile image file)

   #### Response:
   ```json
   {
     "message": "Profile image uploaded successfully",
     "user": {
       "_id": "user_id",
       "profileImageUrl": "image_url"
     }
   }
   ```

### 2. **Upload Post Image**
   **POST** `/api/v1/upload/image/post/:postId/:userId`
   
   Uploads images for a post (up to 5 images).

   #### Request Body:
   **Form Data**:
   - `postImages`: (Multiple image files, max 5 images)

   #### Response:
   ```json
   {
     "message": "Post image uploaded successfully",
     "post": {
       "_id": "post_id",
       "images": ["image_id_1", "image_id_2"]
     }
   }
   ```

---

## Authentication Routes

### 1. **Register User**
   **POST** `/api/v1/auth/register`
   
   Registers a new user.

   #### Request Body:
   ```json
   {
     "username": "new_user",
     "email": "user_email",
     "password": "user_password"
   }
   ```

   #### Response:
   ```json
   {
     "message": "User registered successfully",
     "user": {
       "_id": "user_id",
       "username": "new_user",
       "email": "user_email"
     }
   }
   ```

### 2. **Login User**
   **POST** `/api/v1/auth/login`
   
   Logs a user into the application.

   #### Request Body:
   ```json
   {
     "email": "user_email",
     "password": "user_password"
   }
   ```

   #### Response:
   ```json
   {
     "message": "User logged in successfully",
     "user": {
       "_id": "user_id",
       "username": "user_name",
       "email": "user_email"
     }
   }
   ```

### 3. **Logout User**
   **POST** `/api/v1/auth/logout`
   
   Logs a user out of the application.

   #### Response:
   ```json
   {
     "message": "User logged out successfully"
   }
   ```

---

## Error Handling

The API uses a robust error handling system to handle various types of errors:

- **Multer Errors**: If there are issues with file uploads (e.g., file size exceeded, unexpected file field).
- **Validation Errors**: If a validation error occurs (e.g., invalid input).
- **Server Errors**: If there are internal server issues, the API will return an error with details.

### Common Errors:
- **File size exceeds the 1.5MB limit**: Occurs if a file is too large during upload.
- **Unexpected field encountered in the file upload**: Occurs when the uploaded field does not match the expected field in the request.
- **Too many files uploaded**: Occurs if the number of uploaded files exceeds the specified limit.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/x-clone-api.git
   ```

2. Install dependencies:
   ```bash
   cd x-clone-api
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the project with the following:
   ```env
   AWS_ACCESS_KEY_ID=your-aws-access-key-id
   AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   AWS_BUCKET_NAME=your-aws-bucket-name
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or issues, please open an issue in the GitHub repository or contact us at [anguzud7@gmail.com].