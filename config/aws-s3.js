const { S3Client } = require('@aws-sdk/client-s3');
const AWS = require('aws-sdk');
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
            cb(null, { feildName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + file.originalname);
        }
    }),
    limits: {
        fileSize: 1500000
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" || 
            file.mimetype === "image/jpg" || 
            file.mimetype === "image/jng"
        ) {
            cb(null, true);
        } else {
            cb(new Error('only images are allowed'), false);
        }
    }
});

module.exports = upload;