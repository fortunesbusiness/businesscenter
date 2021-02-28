const Committee = require('../models/committee.model');
const multer = require('multer');

//method to delete directory
const {deleteUploadDirectory} = require('../../Utility/delete.directory');
//cloudinary integration
const cloudinary = require('cloudinary').v2;

//method to add new member
module.exports.addNewMember = async(req,res)=>{
    const upload = multer({
        dest: 'uploads'
    }).single("fortunes_business_member");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });

        const {name,committeeType,company,position,linkedIn,facebook} = req.body;
        let committeeMemberType = committeeType.toUpperCase();

        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/about/committee/${req.file.filename}`
        })
        .then(async (response)=>{
                const {url} = response;
                
                const committee = new Committee();
                committee.image = url;
                committee.name = name;
                committee.position = position;
                committee.company = company;
                committee.type = committeeMemberType;
                committee.linkedIn = linkedIn;
                committee.facebook = facebook;

                try {
                    await committee.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `New Committee Member Added!`
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

//method to get member list
module.exports.getCommitteeMemberList = async(req,res)=>{
    const committeeMemberList = await Committee.find();
    res.send(committeeMemberList);
}

