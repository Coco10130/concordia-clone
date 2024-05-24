const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete ${filePath} ${err}`);
    } else {
      conolse.log(`File deleted ${filePath}`);
    }
  });
};

module.exports = { deleteFile };
