const admin = require("firebase-admin");
const path = require("path");
const serviceAccount = require("./secretKeyFirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "medi-sathi.appspot.com",
});

const storage = admin.storage();

module.exports = {
  storage: storage,
  downloadFile:async function functionName(filePath) {
    function extractFileName(url) {
      // Parse the URL
      const parsedUrl = new URL(url);
  
      // Get the file path
      const filePath = parsedUrl.pathname;
  
      // Extract the file name using path module
      const fileName = path.basename(filePath);
  
      return fileName;
    }
  
    const fileName = extractFileName(filePath);
    console.log(fileName);
  
    // Assuming storage is already defined somewhere in your code
    const fileRef = storage.bucket("medi-sathi.appspot.com").file(fileName);
  
    // Check if the file exists in the database
    const fileExists = await fileRef.exists();
    console.log("File in database exists ", fileExists);
  
    if (!fileExists){
      return undefined
    }

    const config = {
      action: "read",
      expires: "01-01-2026",
    };
  
    const url = await new Promise((resolve, reject) => {
      fileRef.getSignedUrl(config, function (err, url) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(url);
      });
    });

    return url;
  }
}
