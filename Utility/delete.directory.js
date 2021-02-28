const fs = require('fs');

const deleteDirectory = async()=>{
    fs.rmdir('uploads', { recursive: true }, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(`Deleted Uploads Folder!`);
    });
}

module.exports.deleteUploadDirectory = deleteDirectory;