const User = require('./user.model');
const Investment = require('../Investment/investment.model');
const MembershipRequest = require('../MembershipUpgrage/membership.upgradge.model');
const BusinessCenter = require('../BusinessCenter/business.center.model');

const {
    hashPassword,
    comparePassword
} = require('../Utility/hash.password');
const jwt = require('jsonwebtoken');
const {
    registerValidation,
    loginValidation
} = require('../middleware/validate.user');
const multer = require('multer');
//method to delete directory
const {
    deleteUploadDirectory
} = require('../Utility/delete.directory');

//cloudinary integration
const cloudinary = require('cloudinary').v2;
const async = require('async');

//method to check if user
const checkIfUserAlreadyExists = async (businessId) => {
    const fortunesBusinessId = await User.findOne({
        fortunes_business_id: businessId
    });
    return fortunesBusinessId;
};

//method to register normal users
module.exports.register = async (req, res) => {
    // console.log(req.body);
    // console.log(req.files);
    // res.status(200).send();
    // destructing body values
    const upload = multer({
        dest: 'uploads'
    }).fields([{
            name: 'nidImage',
            maxCount: 1
        }, {
            name: 'userImage',
            maxCount: 1
        },
        {
            name: 'nomineePhoto',
            maxCount: 1
        }, {
            name: 'nomineeNidPhoto',
            maxCount: 1
        }
    ]);
    upload(req, res, async (error) => {
        // if(error) {console.log(error)};
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });
        //cloudinary configuration
        cloudinary.config({ 
            cloud_name: 'dzywuv120', 
            api_key: '383977439748697', 
            api_secret: 'N_66lZPmjQqdEkx0Rcs5iKHnimg' 
        });

        //destruct body objects
        const {
            name,
            fatherName,
            motherName,
            spouseName,
            phoneNumber,
            emailAddress,
            nidNumber,
            dateOfBirth,
            memberType,
            presentAddress,
            permanentAddress,
            fortunesBusinessId,
            password,
            nomineeName,
            nomineeRelationship,
            nomineeMobile,
            nomineeNid,
            referenceNumber,
            totalShare
        } = req.body;
        // check if business id used previously or not
        const businessIdExists = await checkIfUserAlreadyExists(fortunesBusinessId);
        if (businessIdExists) return res.status(400).send({
            message: `Business id is already in use`
        });

        // console.log(req.body);
        // console.log(req.files);
        // let filePaths = req.files.nidImage[0].path;
        // console.log(filePaths);
        // const businessId = 2289;
        // let fortunesBusinessId = 2289;
        // let imageUrl;
        const uploadImageToCloudinary = async () => {
            async.parallel({
                userImage: (callback) => {
                    cloudinary.uploader.upload(req.files.userImage[0].path, {
                            public_id: `fortunes-somiti/user/${fortunesBusinessId}/profile/${req.files.userImage[0].filename}`
                        })
                        .then((response) => {
                            callback(null, response.url);
                        })
                },
                userNidImage: (callback) => {
                    cloudinary.uploader.upload(req.files.nidImage[0].path, {
                            public_id: `fortunes-somiti/user/${fortunesBusinessId}/nid/${req.files.nidImage[0].filename}`
                        })
                        .then((response) => {
                            callback(null, response.url);
                        })
                },
                nomineeImage: (callback) => {
                    cloudinary.uploader.upload(req.files.nomineePhoto[0].path, {
                            public_id: `fortunes-somiti/user/${fortunesBusinessId}/nominee/${req.files.nomineePhoto[0].filename}`
                        })
                        .then((response) => {
                            callback(null, response.url);
                        })
                },
                nomineeNidImage: (callback) => {
                    cloudinary.uploader.upload(req.files.nomineeNidPhoto[0].path, {
                            public_id: `fortunes-somiti/user/${fortunesBusinessId}/nominee/nid/${req.files.nomineeNidPhoto[0].filename}`
                        })
                        .then((response) => {
                            callback(null, response.url);
                        })
                }
            }, async (error, result) => {
                const saveInformationToDatabase = async () => {
                    //if not exits create new account
                    let dueAmount = 0;
                    
                    if(memberType.toUpperCase() == 'PREMIUM'){
                        dueAmount = Number(Number(1000000) * Number(totalShare));
                    }else if(memberType.toUpperCase() == 'GENERAL'){
                        dueAmount = Number(Number(500000)* Number(totalShare));
                    }
                    const hashedPassword = await hashPassword(password);
                    const user = new User({
                        name: name,
                        father_name: fatherName,
                        mother_name: motherName,
                        spouse_name: spouseName,
                        phone_number: phoneNumber,
                        email_address: emailAddress,
                        nid_number: nidNumber,
                        nid_image: result.userNidImage,
                        image: result.userImage,
                        date_of_birth: dateOfBirth,
                        member_type: memberType.toUpperCase(),
                        fortunes_business_id: fortunesBusinessId,
                        present_address: presentAddress,
                        permanent_address: permanentAddress,
                        password: hashedPassword,
                        reference: referenceNumber,
                        is_approved: false,
                        due_amount: dueAmount,
                        total_share: totalShare,
                        nominee: {
                            name: nomineeName,
                            relationship: nomineeRelationship,
                            nid: nomineeNid,
                            mobile_number: nomineeMobile,
                            nid_image: result.nomineeNidImage,
                            image: result.nomineeImage
                        }
                    });
                    try {
                        await user.save();
                        await deleteUploadDirectory();
                        res.status(200).send({
                            message: 'Registration Completed'
                        });
                    } catch (error) {
                        res.status(400).send({
                            message: `Sorry unable to complete the operation`
                        });
                        console.log(error);
                    }
                }
                await saveInformationToDatabase();

            })

        }
        await uploadImageToCloudinary();


    })

}

//method to log in
module.exports.login = async (req, res) => {
    //descrut body object
    const {
        fortunesBusinessId,
        password
    } = req.body;

    //check if fortunes business id is registered or not
    const user = await checkIfUserAlreadyExists(fortunesBusinessId);
    if (!user) return res.status(404).send({
        message: `Sorry you've provided wrong id or password`
    });
    //check if user is approved
    if (!user.is_approved) return res.status(404).send({
        message: 'Wrong credential or approval pending'
    });

    //check if provided password matches or not
    const passwordMatched = await comparePassword(password, user.password);
    if (!passwordMatched) return res.status(404).send({
        message: `Sorry you've provided wrong id or password`
    });

    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);
    // console.log(user.member_type);
    res.send({
        accessToken: token,
        businessId: fortunesBusinessId,
        memberType: user.member_type
    });
}

//method to get user profile
module.exports.profile = async (req, res) => {
    const {
        _id
    } = req.user;
    // const _id = '5ff9f07739194013d8443af8';

    const user = await User.findOne({
        _id
    });

    res.send(user);
}

//method to get registered user profile
module.exports.requestedUserList = async (req, res) => {
    const user = await User.find({
        is_approved: false
    }).sort({
        '_id': -1
    });
    res.status(200).send(user);
}
//method to update user email
module.exports.updateEmail = async (req, res) => {
    const {
        _id
    } = req.user;
    const user = await User.findOne({
        _id
    });
    user.email_address = req.body.data;

    try {
        await user.save();
        res.status(200).send({
            'message': 'Email Updated Succesfully'
        });
    } catch (error) {
        res.status(400).send({
            'message': 'Something went wrong!'
        });
    }
}
//method to update user phone
module.exports.updatePhone = async (req, res) => {
    const {
        _id
    } = req.user;
    const user = await User.findOne({
        _id
    });
    user.phone_number = req.body.data;
    // console.log(req.body.data);
    try {
        await user.save();
        res.status(200).send({
            'message': 'Phone Number Updated Succesfully'
        });
    } catch (error) {
        // console.log(error);
        res.status(400).send({
            'message': 'Something went wrong!'
        });
    }
}
//method to update spouse infromation
module.exports.updateSpouseInformation = async (req, res) => {
    const {
        _id
    } = req.user;
    const user = await User.findOne({
        _id
    });
    user.spouse_name = req.body.data;

    try {
        await user.save();
        res.status(200).send({
            'message': 'Spouse Infromation updated succesfully'
        });
    } catch (error) {
        res.status(400).send({
            'message': 'Something went wrong!'
        });
    }
}
//method to update present address
module.exports.updatePresentAddress = async (req, res) => {
    const {
        _id
    } = req.user;
    const user = await User.findOne({
        _id
    });
    user.present_address = req.body.data;

    try {
        await user.save();
        res.status(200).send({
            'message': 'Present Address Infromation updated succesfully'
        });
    } catch (error) {
        res.status(400).send({
            'message': 'Something went wrong!'
        });
    }
}
//method to approve a user
module.exports.approveUser = async (req, res) => {
    const {
        _id
    } = req.body;
    const user = await User.findOne({
        _id
    });
    let businessCenter;
    user.is_approved = true;
    user.total_share = 1;
    if(user.member_type == 'PREMIUM'){
        businessCenter = await BusinessCenter.findOne({_id: '60436f82b650c1d538a63db0'});
        businessCenter.total_premium_share_sold = Number(businessCenter.total_premium_share_sold) + Number(1);
    }else if(user.member_type == 'GENERAL'){
        businessCenter = await BusinessCenter.findOne({_id: '60436f82b650c1d538a63db0'});
        businessCenter.total_general_share_sold = Number(businessCenter.total_general_share_sold) + Number(1);
    }

    try {
        await user.save();
        await businessCenter.save();
        res.status(200).send({
            message: `User Approved!`
        });
    } catch (error) {
        res.status(400).send({
            message: 'Something went wrong! Please contact the developer!'
        });
    }
}

//method to reject a member request
module.exports.rejectUser = async (req, res) => {
    const {
        id
    } = req.body;

    try {
        await User.findOneAndRemove({
            _id: id
        });
        res.status(200).send({
            message: `User Rejected!`
        });
    } catch (error) {
        res.status(400).send({
            message: 'Something went wrong! Please contact the developer!'
        });
    }
}
//method to get registered member list
module.exports.registeredMemberList = async (req, res) => {
    const user = await User.find({
        is_approved: true
    }).sort({
        '_id': -1
    });
    res.status(200).send(user);
}
//method to get user according member type
module.exports.registeredMemberListAccordingMemberType = async (req, res) => {
    const {
        memberType
    } = req.body;
    const user = await User.find({
        member_type: memberType
    });
    res.status(200).send(user);
}
//method to get user dashboard information total amount, last payment date and amount
module.exports.getUserDashboard = async (req, res) => {
    const {
        _id
    } = req.user;
    // const _id = '5fff4cf8c2978f4470554f39';
    const user = await User.findOne({
        _id
    }).select({
        'total_deposited_amount': 1,
        'payment_status': 1
    }).limit(1);
    const length = user.payment_status.length;
    let result = {
        total_deposited_amount: user.total_deposited_amount,
        last_payment: {
            amount: user.payment_status[length - 1].amount,
            date: `${user.payment_status[length-1].month_name},${user.payment_status[length-1].year}`
        }
    };
    // console.log(result);
    // console.log(user);
    res.send(result);
}
//method to add bonus or profit for a specific user
module.exports.addProfit = async (req, res) => {
    const {
        _id,
        profit_amount,
        profit_percentage,
        month_name,
        year
    } = req.body;
    // console.log(req.body);
    // const totalAmount = await updateSpecificUserTotalDepositAmount(_id, profit_amount);
    // if (!totalAmount) return res.status(400).send({
    //     message: 'Something went wrong!'
    // });
    // console.log(totalAmount); 
    let netProfit;
    const userProfit = await User.findOne({_id}).select({total_profit: 1});
    if(!userProfit.total_profit) netProfit = Number(profit_amount);
    else netProfit = Number(profit_amount) + Number(userProfit.total_profit);
    userProfit.total_profit = netProfit;

    try {
        await userProfit.save();
        await User.findOneAndUpdate({
            _id
        }, {
            $push: {
                profit: {
                    month_name: month_name,
                    amount: profit_amount,
                    year: year,
                    percentage: profit_percentage,
                    total_profit_amount: netProfit
                }
            }
        });
        res.status(200).send({
            message: 'Profit added!'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Something went wrong! Please contact the developeer!'
        });
    }
    // console.log(req.body);
}
//method to update user total deposit
const updateSpecificUserTotalDepositAmount = async (_id, amount) => {
    const user = await User.findOne({
        _id
    }).select({
        total_deposited_amount: 1
    });
    let totalAmount = Number(amount) + Number(user.total_deposited_amount);
    // console.log(amount);
    // console.log(user);
    // console.log(user.total_deposited_amount);
    user.total_deposited_amount = totalAmount;

    try {
        await user.save();
        return totalAmount;
    } catch (error) {
        // console.log(error);
        return false;
    }

}
//method to get profit of a specific user
module.exports.getProfit = async (req, res) => {
    const {
        _id
    } = req.user;
    // const _id = "5fff4cf8c2978f4470554f39";
    const user = await User.findOne({
        _id
    }).select({
        'profit': 1
    });
    const sortedData = user.profit.sort((a,b)=> (b.total_profit_amount) - (a.total_profit_amount))
    // console.log(sortedData);
    res.status(200).send(sortedData);
    // res.send(user);
}

//method to get specific user profit 
module.exports.getUserProfitList  = async (req, res) => {
    const {
        fortunes_business_id
    } = req.body;
    // const _id = "5fff4cf8c2978f4470554f39";
    const user = await User.findOne({
        fortunes_business_id: fortunes_business_id
    }).select({
        'profit': 1
    });
    const sortedData = user.profit.sort((a,b)=> (b.total_profit_amount) - (a.total_profit_amount))
    // console.log(sortedData);
    res.status(200).send(sortedData);
    // res.send(user);
}

//method to get total number of registered user (general,premium,associate,well wisher)
module.exports.getTotalRegisteredUserCount = async (req, res) => {
    const premiumUserCount = await User.find({
        is_approved: true,
        member_type: 'PREMIUM'
    }).count();
    const generalUserCount = await User.find({
        is_approved: true,
        member_type: 'GENERAL'
    }).count();
    const associateUserCount = await User.find({
        is_approved: true,
        member_type: 'ASSOCIATE'
    }).count();
    const wellWisherUserCount = await User.find({
        is_approved: true,
        member_type: 'WELL WISHER'
    }).count();
    const totalRegistered = await User.find({
        is_approved: true
    }).count();
    const userCount = {
        general: generalUserCount,
        premium: premiumUserCount,
        associate: associateUserCount,
        well_wisher: wellWisherUserCount,
        total: totalRegistered
    }
    res.status(200).send(userCount);
}

//method to get total number of requested user (general,premium,associate,well wisher)
module.exports.getTotalRequestedUserCount = async (req, res) => {
    const premiumUserCount = await User.find({
        is_approved: false,
        member_type: 'PREMIUM'
    }).count();
    const generalUserCount = await User.find({
        is_approved: false,
        member_type: 'GENERAL'
    }).count();
    const associateUserCount = await User.find({
        is_approved: false,
        member_type: 'ASSOCIATE'
    }).count();
    const wellWisherUserCount = await User.find({
        is_approved: false,
        member_type: 'WELL WISHER'
    }).count();
    const totalRegistered = await User.find({
        is_approved: false
    }).count();
    const userCount = {
        general: generalUserCount,
        premium: premiumUserCount,
        associate: associateUserCount,
        well_wisher: wellWisherUserCount,
        total: totalRegistered
    }
    res.status(200).send(userCount);
}

//method to add amount to invetment area for specific user
module.exports.investForSpecificUser = async (req, res) => {
    const {
        area,
        amount,
        fortunesBusinessId,
        id,
        month,
        year
    } = req.body;
    console.log(req.body);
    const user = await User.findOne({
        _id: id
    }).select({
        'total_invested_amount': 1
    });
    let totalInvestment = user.total_invested_amount;
    (!totalInvestment) ? totalInvestment = amount: totalInvestment = Number(totalInvestment) + Number(amount);
    // const investment = user.investment;
    user.total_invested_amount = totalInvestment;
    // const investmentList = await User.find({_id:id},{investment: {$elemMatch: {area: area}}});
    // console.log(investmentList.investment.area);
    // console.log(totalInvestment);
    // console.log(investment);

    let userInvestmentRecord;
    let totalInvestmentRecord;
    if (area == 'Food') {
        userInvestmentRecord = await User.findOne({_id: id}).select({'food_investment_amount': 1});
        totalInvestmentRecord = await Investment.findOne({
            id: "businessCenter22"
        }).select({
            'foodInvestmentAmount': 1,
            'totalInvestment': 1
        });
        if (!userInvestmentRecord.food_investment_amount) {
            userInvestmentRecord.food_investment_amount = Number(amount);
            totalInvestmentRecord.foodInvestmentAmount = Number(totalInvestmentRecord.foodInvestmentAmount) + Number(amount);
            // console.log(totalInvestmentRecord.foodInvestmentAmount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        } else {
            userInvestmentRecord.food_investment_amount = Number(userInvestmentRecord.food_investment_amount) + Number(amount);
            totalInvestmentRecord.foodInvestmentAmount = Number(totalInvestmentRecord.foodInvestmentAmount) + Number(amount);
            // console.log(totalInvestmentRecord.foodInvestmentAmount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        }
    } else if (area == 'Health') {
        userInvestmentRecord = await User.findOne({
            _id: id
        }).select({
            'health_investment_amount': 1
        });
        totalInvestmentRecord = await Investment.findOne({
            id: "businessCenter22"
        }).select({
            'healthInvestmentAmount': 1,
            'totalInvestment': 1
        });
        if (!userInvestmentRecord.health_investment_amount) {
            userInvestmentRecord.health_investment_amount = Number(amount);
            totalInvestmentRecord.healthInvestmentAmount = Number(totalInvestmentRecord.healthInvestmentAmount) + Number(amount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        } else {
            userInvestmentRecord.health_investment_amount = Number(userInvestmentRecord.health_investment_amount) + Number(amount);
            totalInvestmentRecord.healthInvestmentAmount = Number(totalInvestmentRecord.healthInvestmentAmount) + Number(amount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        }
    } else if (area == 'Cloths/Garments') {
        userInvestmentRecord = await User.findOne({
            _id: id
        }).select({
            'garments_investment_amount': 1
        });
        totalInvestmentRecord = await Investment.findOne({
            id: "businessCenter22"
        }).select({
            'garmentsInvestmentAmount': 1,
            'totalInvestment': 1
        });
        if (!userInvestmentRecord.garments_investment_amount) {
            userInvestmentRecord.garments_investment_amount = Number(amount);
            totalInvestmentRecord.garmentsInvestmentAmount = Number(totalInvestmentRecord.garmentsInvestmentAmount) + Number(amount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        } else {
            userInvestmentRecord.garments_investment_amount = Number(userInvestmentRecord.garments_investment_amount) + Number(amount);
            totalInvestmentRecord.garmentsInvestmentAmount = Number(totalInvestmentRecord.garmentsInvestmentAmount) + Number(amount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        }
    } else if (area == 'Education') {
        userInvestmentRecord = await User.findOne({
            _id: id
        }).select({
            'education_investment_amount': 1
        });
        totalInvestmentRecord = await Investment.findOne({
            id: "businessCenter22"
        }).select({
            'educationInvestmentAmount': 1,
            'totalInvestment': 1
        });
        if (!userInvestmentRecord.education_investment_amount) {
            userInvestmentRecord.education_investment_amount = Number(amount);
            totalInvestmentRecord.educationInvestmentAmount = Number(totalInvestmentRecord.educationInvestmentAmount) + Number(amount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        } else {
            userInvestmentRecord.education_investment_amount = Number(userInvestmentRecord.education_investment_amount) + Number(amount);
            totalInvestmentRecord.educationInvestmentAmount = Number(totalInvestmentRecord.educationInvestmentAmount) + Number(amount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        }
    } else if (area == 'Vehicle') {
        userInvestmentRecord = await User.findOne({
            _id: id
        }).select({
            'vehicle_investment_amount': 1
        });
        totalInvestmentRecord = await Investment.findOne({
            id: "businessCenter22"
        }).select({
            'vehicleInvestmentAmount': 1,
            'totalInvestment': 1
        });
        if (!userInvestmentRecord.vehicle_investment_amount) {
            userInvestmentRecord.vehicle_investment_amount = Number(amount);
            totalInvestmentRecord.vehicleInvestmentAmount = Number(totalInvestmentRecord.vehicleInvestmentAmount) + Number(amount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        } else {
            userInvestmentRecord.vehicle_investment_amount = Number(userInvestmentRecord.vehicle_investment_amount) + Number(amount);
            totalInvestmentRecord.vehicleInvestmentAmount = Number(totalInvestmentRecord.vehicleInvestmentAmount) + Number(amount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        }
    } else if (area == 'Residence') {
        userInvestmentRecord = await User.findOne({
            _id: id
        }).select({
            'residence_investment_amount': 1
        });
        totalInvestmentRecord = await Investment.findOne({
            id: "businessCenter22"
        }).select({
            'residenceInvestmentAmount': 1,
            'totalInvestment': 1
        });
        if (!userInvestmentRecord.residence_investment_amount) {
            userInvestmentRecord.residence_investment_amount = Number(amount);
            totalInvestmentRecord.residenceInvestmentAmount = Number(totalInvestmentRecord.residenceInvestmentAmount) + Number(amount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        } else {
            userInvestmentRecord.residence_investment_amount = Number(userInvestmentRecord.residence_investment_amount) + Number(amount);
            totalInvestmentRecord.residenceInvestmentAmount = Number(totalInvestmentRecord.residenceInvestmentAmount) + Number(amount);
            totalInvestmentRecord.totalInvestment = Number(totalInvestmentRecord.totalInvestment) + Number(amount);
        }
    }
    try {
        await User.findOneAndUpdate({
            _id: id
        }, {
            $push: {
                investment: {
                    area: area,
                    amount: amount,
                    month: month,
                    year: year
                }
            }
        });
        await user.save();
        await userInvestmentRecord.save();
        await totalInvestmentRecord.save();
        res.status(200).send({
            message: 'Investment successfully done!'
        });
        // console.log(done);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}
//method to get investment record for a specific user
module.exports.getInvestmentRecord = async (req, res) => {
    const {
        _id
    } = req.user;
    const investmentList = await User.findById({
            _id
        })
        .select({
            'food_investment_amount': 1,
            'health_investment_amount': 1,
            'education_investment_amount': 1,
            'vehicle_investment_amount': 1,
            'garments_investment_amount': 1,
            'residence_investment_amount': 1,
            'total_invested_amount': 1
        });
    let food, health, education,
        vehicle, garments, residence, total;
    (!investmentList.food_investment_amount) ? food = 0: food = investmentList.food_investment_amount;
    (!investmentList.health_investment_amount) ? health = 0: health = investmentList.health_investment_amount;
    (!investmentList.education_investment_amount) ? education = 0: education = investmentList.education_investment_amount;
    (!investmentList.vehicle_investment_amount) ? vehicle = 0: vehicle = investmentList.vehicle_investment_amount;
    (!investmentList.garments_investment_amount) ? garments = 0: garments = investmentList.garments_investment_amount;
    (!investmentList.residence_investment_amount) ? residence = 0: residence = investmentList.residence_investment_amount;
    (!investmentList.total_invested_amount) ? total = 0: total = investmentList.total_invested_amount;

    const result = {
        food,
        health,
        education,
        vehicle,
        garments,
        residence,
        total
    }
    // console.log(result);
    res.status(200).send(result);
}

//method to get list of all membership upgradge request list
module.exports.membershipUpgradgeRequestList = async(req,res)=>{
    const membershipUpgradgeRequestObject = await MembershipRequest.find({is_approved: false}).sort({_id: -1});

    res.status(200).send(membershipUpgradgeRequestObject);
}
//method to get list of all membership upgrade request count
module.exports.membershipUpgradgeRequestCount = async(req,res)=>{
    const totalRequest = await MembershipRequest.find({is_approved: false}).count();
    // console.log(totalRequest);
    res.status(200).send({total: totalRequest});
}

//method to send membership upgrade request
module.exports.membershipUpgradeRequest = async (req, res) => {
    const {
        _id
    } = req.user;
    const user = await User.findOne({_id}).select({name: 1,fortunes_business_id: 1});
    const {
        requestedMembership
    } = req.body;
    const membershipRequest = new MembershipRequest();
    membershipRequest.user_id = _id;
    membershipRequest.requestedMembership = requestedMembership;
    membershipRequest.is_approved = false;
    membershipRequest.name = user.name;
    membershipRequest.fortunes_business_id = user.fortunes_business_id;


    try {
        await membershipRequest.save();
        res.status(200).send({
            message: 'Membership Upgrade Request Sent! Please wait for approval!'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Sorry! There was some problem, Please try again!'
        });
    }
}

//method to accept membership upgradge request
module.exports.acceptMembershipUpgradgeRequest = async (req, res) => {
    const {
        user_id,
        newMembershipType,
        _id
    } = req.body;
    const membershipUpgrade =  await MembershipRequest.findOne({_id});
    const user = await User.findOne({
        _id: user_id
    });
    membershipUpgrade.is_approved = true;
    user.member_type = newMembershipType;

    try {
        await user.save();
        await membershipUpgrade.save();
        res.status(200).send({
            message: 'Member Type Upgraded'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Something went wrong! Please Try Again!'
        });
    }
}
//method to delete membership upgradge request
module.exports.deleteMembershipUpgradgeRequest = async (req, res) => {
    const {
        _id
    } = req.body;

    try {
        await MembershipRequest.findOneAndRemove({_id});
        res.status(200).send({
            message: 'Membership deleted succesfully!'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Something went wrong!'
        });
    }

}
//method to get specific user total share number
module.exports.getTotalShareNumber = async(req,res)=>{
    const {_id} = req.user;
    const user = await User.findOne({_id}).select({'total_share': 1});

    res.status(200).send({totalShare: user.total_share});
}
//method to get specific user total due amount
module.exports.getTotalDueAmount = async(req,res)=>{
    const {_id} = req.user;
    const user = await User.findOne({_id}).select({'due_amount': 1});

    res.status(200).send({totalDueAmount: user.due_amount});
}

//method to remove a specific user
module.exports.removeUser = async(req,res)=>{
    const {_id} = req.body;

    try{
        await User.findOneAndRemove({_id});
        res.status(200).send({message: 'User Succesfully removed!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user name
module.exports.updateUserName = async(req,res)=>{
    const {name,user_id} = req.body;

    const user = await User.findOne({_id: user_id});

    user.name = name;

    try{
        await user.save();
        res.status(200).send({message: 'Username changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user father name
module.exports.updateUserFatherName = async(req,res)=>{
    const {fathername,user_id} = req.body;

    const user = await User.findOne({_id: user_id});

    user.father_name = fathername;

    try{
        await user.save();
        res.status(200).send({message: 'Father Name changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user mother name
module.exports.updateUserMotherName = async(req,res)=>{
    const {mothername,user_id} = req.body;

    const user = await User.findOne({_id: user_id});

    user.mother_name = mothername;

    try{
        await user.save();
        res.status(200).send({message: 'Mother Name changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user spouse name
module.exports.updateUserSpouseName = async(req,res)=>{
    const {spousename,user_id} = req.body;

    const user = await User.findOne({_id: user_id});

    user.spouse_name = spousename;

    try{
        await user.save();
        res.status(200).send({message: 'Spouse Name changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user  phone
module.exports.updateUserPhone = async(req,res)=>{
    const {phone,user_id} = req.body;

    const user = await User.findOne({_id: user_id});

    user.phone_number = phone;

    try{
        await user.save();
        res.status(200).send({message: 'Phone Number changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user email address
module.exports.updateUserEmail = async(req,res)=>{
    const {email,user_id} = req.body;

    const user = await User.findOne({_id: user_id});

    user.email_address = email;

    try{
        await user.save();
        res.status(200).send({message: 'Email Address changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user nid number
module.exports.updateUserNid = async(req,res)=>{
    const {nid,user_id} = req.body;

    const user = await User.findOne({_id: user_id});

    user.nid_number = nid;

    try{
        await user.save();
        res.status(200).send({message: 'Nid Number changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}


//method to update specific user date of birth
module.exports.updateUserDateOfBirth = async(req,res)=>{
    const {birthdate,user_id} = req.body;

    const user = await User.findOne({_id: user_id});

    user.date_of_birth = birthdate;

    try{
        await user.save();
        res.status(200).send({message: 'Date Of Birth changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user passsword
module.exports.updateUserPassword = async(req,res)=>{
    const {password,user_id} = req.body;

    const user = await User.findOne({_id: user_id});
    const hashedPassword = await hashPassword(password);
    console.log(hashPassword);
    user.password = hashedPassword;

    try{
        await user.save();
        res.status(200).send({message: 'Date Of Birth changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user Business Id
module.exports.updateUserBusinessId = async(req,res)=>{
    const {business_id,user_id} = req.body;

    const user = await User.findOne({_id: user_id});

    user.fortunes_business_id = business_id;

    try{
        await user.save();
        res.status(200).send({message: 'Date Of Birth changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user present address 
module.exports.updateUserPresentAddress = async(req,res)=>{
    const {presentaddress,user_id} = req.body;
    console.log(presentaddress);
    const user = await User.findOne({_id: user_id});
 
    user.present_address = presentaddress;

    try{
        await user.save();
        res.status(200).send({message: 'Present Address changed succesfully!'});
    }
    catch(error){
        console.log(error);
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user permanent address 
module.exports.updateUserPermanentAddress = async(req,res)=>{
    const {permanentaddress,user_id} = req.body;

    const user = await User.findOne({_id: user_id});
 
    user.permanent_address = permanentaddress;

    try{
        await user.save();
        res.status(200).send({message: 'Permanent Address changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user reference number 
module.exports.updateUserReferenceNumber = async(req,res)=>{
    const {reference,user_id} = req.body;

    const user = await User.findOne({_id: user_id});
 
    user.reference = reference;

    try{
        await user.save();
        res.status(200).send({message: 'Reference Number changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user due ammount
module.exports.updateUserDueAmount = async(req,res)=>{
    const {dueamount,user_id} = req.body;

    const user = await User.findOne({_id: user_id});
 
    user.due_amount = dueamount;

    try{
        await user.save();
        res.status(200).send({message: 'Due Amount changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user total deposit ammount
module.exports.updateUserTotalDepositAmount = async(req,res)=>{
    const {totaldeposit,user_id} = req.body;

    const user = await User.findOne({_id: user_id});
 
    user.total_deposited_amount = totaldeposit;

    try{
        await user.save();
        res.status(200).send({message: 'Total Deposited Amount changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user total share
module.exports.updateUserTotalShare = async(req,res)=>{
    const {totalShare,user_id} = req.body;

    const user = await User.findOne({_id: user_id});
 
    user.total_share = totalShare;

    try{
        await user.save();
        res.status(200).send({message: 'Total Share changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}



//method to update specific user total Profit
module.exports.updateUserTotalProfit = async(req,res)=>{
    const {totalProfit,user_id} = req.body;

    const user = await User.findOne({_id: user_id});
 
    user.total_profit = totalProfit;

    try{
        await user.save();
        res.status(200).send({message: 'Total Profit Amount changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user nominee name
module.exports.updateUserNomineeName = async(req,res)=>{
    const {nomineeName,user_id} = req.body;

    const user = await User.findOne({_id: user_id}).select({'nominee': 1});
 
    user.nominee[0].name = nomineeName;

    try{
        await user.save();
        res.status(200).send({message: 'User Nominee Name changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update user image
module.exports.updateUserImage = async (req, res) => {
    const upload = multer({
        dest: 'uploads'
    }).single("userImage");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });
        const {user_id,businessId} = req.body;
        // console.log(req.body);
        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/user/${businessId}/profile/${req.file.filename}`
        })
        .then(async (response)=>{
                const user = await User.findOne({_id: user_id});
                const {url} = response;
                user.image = url;
                // console.log(user.nominee[0].image);
                try {
                    await user.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `User Nominee Image Updated Succesfully!`
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
module.exports.updateUserNidImage = async (req, res) => {
    const upload = multer({
        dest: 'uploads'
    }).single("userNidImage");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });
        const {user_id,businessId} = req.body;
        // console.log(req.body);
        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/user/${businessId}/nid/${req.file.filename}`
        })
        .then(async (response)=>{
                const user = await User.findOne({_id: user_id});
                const {url} = response;
                user.nid_image = url;
                // console.log(user.nominee[0].image);
                try {
                    await user.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `User Nominee Image Updated Succesfully!`
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
//method to update specific user nominee relationship
module.exports.updateUserNomineeRelationship = async(req,res)=>{
    const {relationship,user_id} = req.body;

    const user = await User.findOne({_id: user_id}).select({'nominee': 1});
 
    user.nominee[0].relationship = relationship;

    try{
        await user.save();
        res.status(200).send({message: 'User Nominee Relationship changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user nominee nid number
module.exports.updateUserNomineeNidNumber = async(req,res)=>{
    const {nidNumber,user_id} = req.body;

    const user = await User.findOne({_id: user_id}).select({'nominee': 1});
 
    user.nominee[0].nid = nidNumber;

    try{
        await user.save();
        res.status(200).send({message: 'User Nominee Relationship changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to update specific user nominee nid number
module.exports.updateUserNomineeMobileNumber = async(req,res)=>{
    const {mobile,user_id} = req.body;

    const user = await User.findOne({_id: user_id}).select({'nominee': 1});
 
    user.nominee[0].mobile_number = mobile;

    try{
        await user.save();
        res.status(200).send({message: 'User Nominee Mobile Number changed succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something went wrong! Please ty again!'});
    }
}

//method to register normal users
module.exports.updateUserNomineeImage = async (req, res) => {
    const upload = multer({
        dest: 'uploads'
    }).single("nomineeImage");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });
        const {user_id,businessId} = req.body;
        // console.log(req.body);
        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/user/${businessId}/nominee/${req.file.filename}`
        })
        .then(async (response)=>{
                const user = await User.findOne({_id: user_id}).select({'nominee': 1});
                const {url} = response;
                user.nominee[0].image = url;
                // console.log(user.nominee[0].image);
                try {
                    await user.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `User Nominee Image Updated Succesfully!`
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

//method to update user nominee nid attachment 
module.exports.updateUserNomineeAttachment = async (req, res) => {
    const upload = multer({
        dest: 'uploads'
    }).single("nomineeNidImage");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });
        const {user_id,businessId} = req.body;
        // console.log(req.body);
        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/user/${businessId}/nominee/nid/${req.file.filename}`
        })
        .then(async (response)=>{
                const user = await User.findOne({_id: user_id}).select({'nominee': 1});
                const {url} = response;
                user.nominee[0].nid_image = url;
                // console.log(user.nominee[0].image);
                try {
                    await user.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `User Nominee Image Updated Succesfully!`
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
