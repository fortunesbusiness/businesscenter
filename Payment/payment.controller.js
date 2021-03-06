const Payment = require('./payment.model');
const User = require('../User/user.model');
const multer = require('multer');
const storage = multer.memoryStorage();
const BusinessCenter = require('../BusinessCenter/business.center.model');

const {deleteUploadDirectory} = require('../Utility/delete.directory');
//cloudinary integration
const cloudinary = require('cloudinary').v2;

//method to request for payment update
module.exports.makePaymentUpdateRequest = async (req, res) => {
    const upload = multer({
        dest: 'uploads'
    }).single("recipt_image");
    upload(req, res, (error) => {
        // console.log(req.body);
        // console.log(req.file);
        if(error) console.log(error);
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });
        const {
            fortunesBusinessId,
            amount,
            recipt_number_or_txrd_id,
            payment_method,
            bankName
        } = req.body;
        // // console.log(req.file.path);
        // // console.log(req.file.path);
        // // console.log(req.file.path);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/user/${fortunesBusinessId}/payment/${req.file.filename}`
        })
        .then(async (response)=>{
            // async function (result) {
                const {url} = response;
                // console.log(response);
                // console.log(url);
                // res.send({message: 'File Uploaded'});
                
                const payment = new Payment();
                payment.recipt_or_transaction_id_image = url;
                payment.amount = amount;
                payment.fortunes_business_id = fortunesBusinessId;
                payment.payment_type = payment_method;
                payment.is_approved = false;
                payment.bank_recipt_number_bkash_or_rocket_transaction_id = recipt_number_or_txrd_id;
                payment.bank_name = bankName;
                try {
                    await payment.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `You payment information has been sent, Please wait for approval`
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

//method to approve user request for update of payment
module.exports.approveUserPayment = async (req, res) => {
    const {
        id,
        fortunesBusinessId,
        month_name,
        amount,
        year,
        bankName
    } = req.body;
    const updatedAmount = await updateDepositAndAmount(amount,fortunesBusinessId);
    // console.log(updatedAmount);
    if(!updatedAmount.total) return res.status(400).send({message: 'Some issue occured! Please contact the developer'});
    const businessCenter = await BusinessCenter.findOne({_id: '6042f1e6b5e92405ccb4b95c'});
    businessCenter.total_deposit = Number(businessCenter.total_deposit) + Number(amount);
    // console.log(req.body);
    // console.log(total_deposited_amount);
    try {
        await businessCenter.save();
        await updatePaymentStatus(id);
        await User.findOneAndUpdate({
            fortunes_business_id: fortunesBusinessId
        }, {
            $push: {
                payment_status: {
                    month_name: month_name,
                    amount: amount,
                    year: year,
                    bank_name: bankName,
                    total_deposit_amount: updatedAmount.total,
                    due_amount: updatedAmount.due
                }
            }
        });
        res.status(200).send({
            message: 'User payment updated!'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Something went wrong! Please contact the developer'
        });
    }

}
//method to update user total deposit amount
const updateDepositAndAmount = async(amount,fortunesBusinessId)=>{
    const user = await User.findOne({fortunes_business_id: fortunesBusinessId}).select({'total_deposited_amount': 1,'due_amount': 1});
    const paid_amount = Number(amount);
    

    let total_amount;
    if(!user.total_deposited_amount) total_amount = paid_amount;
    else total_amount = Number(user.total_deposited_amount)+ Number(paid_amount);
    user.total_deposited_amount = total_amount;
    user.due_amount = Number(user.due_amount) - Number(paid_amount);
    const updatedAmount = {
        due: user.due_amount,
        total: total_amount
    }
    try{
        await user.save();
        return updatedAmount;
    }   
    catch(error){
        return 0;
    }
}

//method to update payment status
const updatePaymentStatus = async (id) => {
    try {
        const payment = await Payment.findOne({_id: id});
        payment.is_approved = true;
        await payment.save();
    } catch (error) {
        return error;
        // console.log(error);
        // return res.status(400).send({
        //     message: 'Some problem occured! Please Contact maintanace team!'
        // });
    }
}

//method to get user payment request list
module.exports.userPaymentToBeApprovedList = async (req, res) => {
    try {
        // const payment = new Payment();
        const paymentList = await Payment.find({
            is_approved: false
        });
        res.send(paymentList);
    } catch (error) {
        res.status(400).send({
            message: 'Something went wrong! Please contact the developer'
        });
        // console.log(error);
    }
}

//method to get specific user payment status
module.exports.specificUserPaymentStatus = async(req,res)=>{
    const {_id} = req.user;
    // const id = "5fff4cf8c2978f4470554f39";
    const user = await User.findOne({_id}).select({'payment_status': 1});
    const sortedData = user.payment_status.sort((a,b)=> (b.total_deposit_amount) - (a.total_deposit_amount));
    // console.log(sortedData);
    res.status(200).send(sortedData);

}

//method to count total payment to be approved list
module.exports.totalPaymentToBeApprovedCount = async(req,res)=>{
    const total = await Payment.find({is_approved: false}).count();

    res.status(200).send({total});
}