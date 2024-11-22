const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3 = new S3Client(
    {
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECERT_ACCESS_KEY
        }
    }
);

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname);
        }
    }),
    limits: {
        fileSize: 5000000
    },
    fileFilter: (req, file, cb) => {
        console.log('File type:', file.mimetype); // Debugging file type
        if (
            file.mimetype === "image/jpeg" || 
            file.mimetype === "image/jpg" || 
            file.mimetype === "image/png"
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, JPG, and PNG images are allowed.'), false);
        }
    }
});

module.exports = upload;