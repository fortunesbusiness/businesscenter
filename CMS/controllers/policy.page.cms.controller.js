const Profit = require('../models/profit.acceptence');
const MemberContent = require('../models/member.content.model');
const MembershipRule = require('../models/membership.rules.model');


// <--------proit acceptance ------------->

//method to post profit acceptance content
module.exports.postProfitAcceptanceContent = async(req,res)=>{
    const {content} = req.body;
    const profit = new Profit();

    profit.content = content;

    try{
        await profit.save();
        res.status(200).send({'message': 'Content added for profit acceptance section'});
    }
    catch(error){
        res.status(400).send({'message': 'Something went wrong! Please try again'});
    }
}
//method to get profit acceptance content list
module.exports.getProfitAcceptanceContentList = async(req,res)=>{
    const profitAcceptanceList = await Profit.find();
    res.send(profitAcceptanceList);
}
//method to update profit acceptance content list
module.exports.updateProfitAcceptanceContentList = async(req,res)=>{
    const {_id,content} = req.body;
    const profit = await Profit.findOne({_id});
    profit.content = content;

    try{
        await profit.save();
        res.status(200).send({message: 'Updated succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}
//method to delete a specific profit acceptence content
module.exports.deleteSpecificProficAcceptanceContent = async(req,res)=>{
    const {_id} = req.params;

    try{
        await Profit.findOneAndRemove({_id});
        res.status(200).send({'message': 'Succesfully removed content!'});
    }
    catch(error){
        res.status(400).send({'message': 'Sorry! Something went wrong, please try agian'});
    }
}

// <--------membership&rules ------------->

//method to post membership&rules content
module.exports.postMembershipRuleContent = async(req,res)=>{
    const {content} = req.body;
    const membership = new MembershipRule();

    membership.content = content;

    try{
        await membership.save();
        res.status(200).send({'message': 'Content added for membership and rules'});
    }
    catch(error){
        res.status(400).send({'message': 'Something went wrong! Please try again'});
    }
}

//method to post membership&rules header
module.exports.postMembershipRuleHeader = async(req,res)=>{
    const {header} = req.body;
    const membership = new MembershipRule();

    membership.header = header;

    try{
        await membership.save();
        res.status(200).send({'message': 'Header Content added for membership and rules'});
    }
    catch(error){
        res.status(400).send({'message': 'Something went wrong! Please try again'});
    }
}

//method to post membership&rules warning note
module.exports.postMembershipWarningNote = async(req,res)=>{
    const {warning} = req.body;
    const membership = new MembershipRule();

    membership.warning_note = warning;

    try{
        await membership.save();
        res.status(200).send({'message': 'Warning Note Content added for membership and rules'});
    }
    catch(error){
        res.status(400).send({'message': 'Something went wrong! Please try again'});
    }
}

//method to get membership and rules content list for landing page
module.exports.getMembershipAndRuleContentList = async(req,res)=>{
    const membershipAndRuleContentList = await MembershipRule.find().select({'content': 1});
    const membershipAndRuleHeader = await MembershipRule.find().select({'header': 1}).sort({'header':-1}).limit(1);
    const membershipAndRuleWarningNote = await MembershipRule.find().select({'warning_note': 1}).sort({'warning_note':-1}).limit(1);

    const membershipAndRuleContent = {
        header: membershipAndRuleHeader,
        warning: membershipAndRuleWarningNote,
        content: membershipAndRuleContentList
    }
    res.send(membershipAndRuleContent);
}

//method to get membership and rules content list for adminb panel
module.exports.getMembershipAndRuleContentArray = async(req,res)=>{
    const membershipAndRuleContentList = await MembershipRule.find().select({'content': 1});
    res.send(membershipAndRuleContentList);
}

//method to update profit membership rule content list
module.exports.updateProfitMembershipRuleContent = async(req,res)=>{
    const {_id,content} = req.body;
    const membership = await MembershipRule.findOne({_id});
    membership.content = content;

    try{
        await membership.save();
        res.status(200).send({message: 'Updated succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}
//method to delete a specific membership rule  content
module.exports.deleteSpecificMembershipAndRuleContent = async(req,res)=>{
    const {_id} = req.params;

    try{
        await MembershipRule.findOneAndRemove({_id});
        res.status(200).send({'message': 'Succesfully removed content!'});
    }
    catch(error){
        res.status(400).send({'message': 'Sorry! Something went wrong, please try agian'});
    }
}

// <--------member content ------------->

//method to post member content
module.exports.postMemberSectionContent = async(req,res)=>{
    const {content,type} = req.body;
    const member = new MemberContent();
    let memberType = type.toUpperCase();
    member.content = content;
    member.member_type = memberType;

    try{
        await member.save();
        res.status(200).send({'message': 'Content added for member section'});
    }
    catch(error){
        res.status(400).send({'message': 'Something went wrong! Please try again'});
    }
}

//method to get member section content list
module.exports.getMemberSectionContentList = async(req,res)=>{
    const memberContentList = await MemberContent.find();
    res.send(memberContentList);
}

//method to update  member section content 
module.exports.updateProfitMemberContent = async(req,res)=>{
    const {_id,content} = req.body;
    const member = await MemberContent.findOne({_id});
    member.content = content;
    try{
        await member.save();
        res.status(200).send({message: 'Updated succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to delete a specific member section content
module.exports.deleteSpecificMemberSectionContent = async(req,res)=>{
    const {_id} = req.params;

    try{
        await MemberContent.findOneAndRemove({_id});
        res.status(200).send({'message': 'Succesfully removed content!'});
    }
    catch(error){
        res.status(400).send({'message': 'Sorry! Something went wrong, please try agian'});
    }
}