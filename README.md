```markdown
# x-clone-api

## Overview
`x-clone-api` is a backend API designed to handle various functionalities for managing user posts, images, and interactions in a social media-like application. It provides endpoints for creating posts, uploading images, handling user data, and more. The API uses AWS S3 for image storage and Multer for handling file uploads.

## Features
- User authentication and profile management.
- Creating and managing posts with images.
- Image uploads to AWS S3 storage.
- Flexible API endpoints for CRUD operations on posts and images.

## API Documentation

### 1. **Create Post**
   **POST** `/api/v1/post/create`
   
   Creates a new post. You can optionally upload images when creating a post.

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

### 2. **Upload Post Images**
   **POST** `/api/v1/upload/image/post/{postId}/{userId}`

   Upload images to an existing post.

   #### Request Body:
   **Form Data**:
   - `postImages`: (Multiple image files, maximum of 10 images).
   
   #### Response:
   ```json
   {
     "message": "Post image uploaded successfully",
     "post": {
       "_id": "post_id",
       "title": "Post title",
       "images": ["image_id_1", "image_id_2"],
       "createdAt": "timestamp"
     }
   }
   ```

   **Note**: Currently, there is a known bug when uploading multiple images. The API works correctly when uploading a single image, but an issue arises with multiple image uploads, causing the request to hang or fail. We are actively working on fixing this bug.

### 3. **Get Post Details**
   **GET** `/api/v1/post/{postId}`
   
   Retrieves details of a specific post.

   #### Response:
   ```json
   {
     "_id": "post_id",
     "title": "Post title",
     "content": "Post content",
     "images": ["image_id_1", "image_id_2"],
     "createdAt": "timestamp"
   }
   ```

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/x-clone-api.git
   ```

2. Install dependencies:
   ```bash
   cd x-clone-api
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root directory and configure the following values:
   ```env
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_BUCKET_NAME=your-s3-bucket-name
   ```

4. Start the API:
   ```bash
   npm start
   ```

---

## Known Issues

- **Multiple Image Upload Bug**: The current version of the API has a bug when uploading multiple images for a post. The request may hang or fail when attempting to upload more than one image. The issue is related to how `multer` handles multiple file uploads with `aws-sdk`. This issue does **not** occur with single-image uploads. We are investigating a fix and will release an update soon.

---

## Contributing

We welcome contributions! If you find any bugs or have suggestions, feel free to open an issue or submit a pull request.

### Steps to Contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m "Add feature"`.
4. Push to your fork: `git push origin feature-name`.
5. Submit a pull request for review.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or inquiries, please open an issue on the GitHub repository or contact us at [email@example.com].

```

### Notes:
1. **Bug Notification**: The bug about multiple image uploads is explicitly mentioned in the **Known Issues** section, and it explains the problem along with a note that the issue only occurs with multiple images.
2. **Contributing**: There are clear instructions on how others can contribute to the project, including how to fork the repo and submit pull requests.
3. **Environment Setup**: Instructions for setting up AWS credentials for file uploads are included.
4. **Installation & Running**: Simple steps to clone, install dependencies, and run the project locally.

You can save this `README.md` file and upload it to your GitHub repository. This will give users a clear understanding of the API, how to use it, and the known bug.