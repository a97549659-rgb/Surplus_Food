// cloudinary.v2.uploader.upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
//     {public_id: 'shoes'},
//     function(error, result) {console.log(result); }

//);

// const uploadOnCloudinary = async (localFilePath) => {
//       try {
//         if(!localFilePath) return null
//         const response = await cloudinary.uploader.upload(localFilePath, {resourse_type: "auto"});
//         console.log("File Upload Successfully", response.url);
//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }

//import { v2 as cloudinary } from "cloudinary";
//import fs from "fs";

//cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return "Path not found";
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "user-profile",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return "Error uploading to cloudinary: " + error.message;
  }
};

export { uploadOnCloudinary };
// mera code
// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null;
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "image",
//             folder: "user-profile",
//         });
//         fs.unlinkSync(localFilePath);
//         return response;
//     } catch (error) {
//         if (fs.existsSync(localFilePath)) {
//             fs.unlinkSync(localFilePath);
//         }
//         console.error("Error uploading to cloudinary:", error.message);
//         return null;
//     }
// };

//export {uploadOnCloudinary};

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null;
//         const resposne = await cloudinary.uploader.upload(
//             localFilePath,
//             {
//                 resource_type: "image",
//                 folder: "user-profile",
//             }

//         );
//         fs.unlinkSync(localFilePath);
//         return resposne;
//     } catch (error) {
//         fs.unlinkSync(localFilePath);
//         return null;
//         //return "Error uploading to cloudinary: " + error.message;
//     }
// };

// const deleteFromCloudinary = async (public_id, type)=>{
//     try {
//         await cloudinary.uploader.destroy(public_id,{resource_type: type,});
//       } catch (error) {
//         return null;
//         //return "Error deleting image from cloudinary: " + error.message;;
//       }

// }
// export { uploadOnCloudinary, deleteFromCloudinary };
