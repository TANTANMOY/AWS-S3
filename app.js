var express = require('express'),
    aws = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
	accessKeyId: 'xxxxxxxxxxxxxx',
    secretAccessKey: 'xxxxxxxxxxxxxxxxx',    
    region: 'xxxxxxxxxxx'
});

var app = express(),
    s3 = new aws.S3();   

app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'porttantanmoyphoto',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});


app.post('/upload', upload.array('uploadFile',1), function (req, res, next) {
    res.send("File uploaded successfully to Amazon S3 Server!");
});

app.listen(3300, function () {
    console.log('Amazon s3 file upload app listening on port 3300');
});