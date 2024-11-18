import AWS from "aws-sdk";
import fs from "fs";

const uploadFile = (upload, callBack) => {
  // Set the region and access keys
  AWS.config.update({
    region: "ap-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  // Create a new instance of the S3 class
  const s3 = new AWS.S3();
  // Set the parameters for the file you want to upload
  const params = {
    Bucket: "audiofiles-manoj",
    Key: upload.filename,
    Body: fs.createReadStream(upload.path),
  };

  console.log(upload.filename, 'kajsdhkjas')
  // Upload the file to S3
  if (upload.filename) {
    s3.upload(params, (err, data) => {
      if (err) {
        callBack(false, err);
      } else {
        const url = s3.getSignedUrl("getObject", {
          Bucket: "audiofiles-manoj",
          Key: data.Key,
        });
        console.log("URL", url)
        callBack(true, url);
      }
    });
  } else {
    const params = {
      Bucket: "audi0files",
    };
    s3.listObjects(params, (err, data) => {
      if (err) {
        callBack(false, err);
        return "There was an error viewing your album: " + err.message;
      } else {
        let urls = [];
        const response = new Promise((resolve, reject) => {
          data.Contents.forEach(function (obj, index) {
            const url = s3.getSignedUrl("getObject", {
              Bucket: "audi0files",
              Key: obj.Key,
            });
            urls.push(url);
          });
          resolve(urls);
        });
        callBack(true, urls);
      }
    });
  }
};

export default uploadFile;
