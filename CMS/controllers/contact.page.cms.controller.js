const Contact = require('../models/contact.model');
const multer = require('multer');

//method to delete directory
const {deleteUploadDirectory} = require('../../Utility/delete.directory');
//cloudinary integration
const cloudinary = require('cloudinary').v2;

//method to post house information
module.exports.addHouseInfo = async(req,res)=>{
    const {house} = req.body;
    // console.log(house);
    const contact = new Contact();
    contact.house = house;

    try{
        await contact.save();
        res.status(200).send({'message': 'House Information Added!'});
    }
    catch(error){
        res.status(400).send({'message': 'Something went wrong! Please try again!'});
    }
}

//method to post phone number
module.exports.addPhoneInfo = async(req,res)=>{
    const {phone} = req.body;
    const contact = new Contact();
    contact.phone = phone;

    try{
        await contact.save();
        res.status(200).send({'message': 'Phone Information Added!'});
    }
    catch(error){
        res.status(400).send({'message': 'Something went wrong! Please try again!'});
    }
}

//method to post phone number
module.exports.addEmailInfo = async(req,res)=>{
    const {email} = req.body;
    const contact = new Contact();
    contact.email = email;

    try{
        await contact.save();
        res.status(200).send({'message': 'Email Information Added!'});
    }
    catch(error){
        res.status(400).send({'message': 'Something went wrong! Please try again!'});
    }
}

//method to post website address
module.exports.addWebsiteInfo = async(req,res)=>{
    const {website} = req.body;
    const contact = new Contact();
    contact.website = website;

    try{
        await contact.save();
        res.status(200).send({'message': 'Website Information Added!'});
    }
    catch(error){
        res.status(400).send({'message': 'Something went wrong! Please try again!'});
    }
}
// //method to add new member
module.exports.addContactSectionImage = async(req,res)=>{
    const upload = multer({
        dest: 'uploads'
    }).single("contact_section_image");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });

        

        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/contact/${req.file.filename}`
        })
        .then(async (response)=>{
                const {url} = response;
                
                const contact = new Contact();
                contact.image = url;

                try {
                    await contact.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `Image Succesfully Uploaded!`
                    });
                } catch (error) {
                    res.status(400).send({
                        message: `Something went wrong`
                    });
                    // console.log(error);
                }
            // }
        })
    })
}

//method to get information
module.exports.getContactInformation = async(req,res)=>{
    const house = await Contact.find().select({'house': 1}).limit(1).sort({'house': -1});
    const phone = await Contact.find().select({'phone': 1}).sort({'phone': -1});
    const email = await Contact.find().select({'email': 1}).limit(1).sort({'email': -1});
    const image = await Contact.find().select({'image': 1}).limit(1).sort({'image': -1});

    const result = {
        house: house[0].house,
        phone: phone,
        email: email[0].email,
        image: image[0].image
    }
    
    res.status(200).send(result);
}



