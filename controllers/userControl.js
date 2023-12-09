const { response } = require("express")
const users = require("../models/userModel")
const jwt=require('jsonwebtoken')
const projects = require("../models/projectModel")

exports.register=async(req,res)=>{
    const {userName,email,password}=req.body
    // console.log(userName,email,password);
    // res.status(200).json("register worked")

try{
const existingUser = await users.findOne({ email });
if (existingUser) {
  res.status(400).json("email already exists");
} else {
  const newUser = new users({
    userName,
    email,
    password,
    github: "",
    linkedin: "",
    profile: "",
  });
  await newUser.save();
  res.status(200).json(selectedUser);
}
}catch(err){
res.status(401).json("register api failed",err)
}
    
}

exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{
const existUser=await users.findOne({email,password})
if(existUser){
 const token= jwt.sign({_id:existUser._id},"superkey123")
 console.log(token);
    res.status(200).json({
      user:existUser,
      token
    })
}
else{
    res.status(404).json("incorrect email or password")
}
    }
    catch{
        res.status(401).json("register api failed", err);

    }
}

exports.editProfile=async(req,res)=>{
  const {userName,github,linkedin,profile}=req.body
  const {_id}=req.params;
  const profile1=req.file?req.file.filename:profile
  console.log("hello");
  // console.log(userName);
  // console.log(_id);
  // console.log(profile);
  // res.send("edit request received")

  try{
    const selectedUser=await users.findOne({_id})
    if(selectedUser){
      selectedUser.userName=userName
      selectedUser.github=github
      selectedUser.linkedin=linkedin
      selectedUser.profile=profile1

//save to mongo db
      await selectedUser.save()
      res.status(200).json(selectedUser)
    }
    else{
      res.status(404).json("profile not present")
    }
  }
  catch(err){
    res.status(401).json("login api failed",err)
  }
}

//get profile
// exports.getProfile=async(req,res)=>{
//   const {_id}=req.params;
//   try{
// const userData=await users.findOne({_id})
// if(userData){
//   res.status(200).json({userData})
// }
// else{
//   res.status(404).json("profile update failed")
// }
//   }
//   catch{
//     res.status(402).json("login api failed")
//   }
// }

//add project
exports.addProject=async(req,res)=>{
  const{title,languages,overview,github,website}=req.body

const projectImage=req.file.filename

const userId=req.payload

try{
const existingProject=await projects.findOne({github})
if(existingProject){
  res.status(400).json(`${existingProject.title} already exists`)
}
else{
  const newProject = new projects({
    title,
    languages,
    overview,
    github,
    website,
    projectImage,
    userId
  });
  await newProject.save()
  res.status(200).json(newProject)
}
}
catch{
res.status(401).json("project api failed")
}
}

//get user project
exports.getProjects=async(req,res)=>{
  const {id}=req.params
  try{
const projectResult=await projects.find({userId:id})
if(projectResult){
  res.status(200).json(projectResult)
}
else{
  res.status(401).json("no projects uploaded")
}
  }
  catch{
    res.status(401).json("project api failed");

  }
}

//get all projects
exports.getAllProjects=async(req,res)=>{
    const searchQuery = req.query.search;
   try{
    const query={
      title:{$regex:searchQuery,$options:"i"}
    }
const allProjectResult=await projects.find(query)
if(allProjectResult){
  res.status(200).json(allProjectResult)
}
else{
  res.status(401).json("no projects uploaded")
}
  }
  catch{
    res.status(401).json("project api failed");

  }
}

//get three projects
exports.getThreeProjects=async(req,res)=>{
   try{
const threeProjectResult=await projects.find().limit(3)
if (threeProjectResult) {
  res.status(200).json(threeProjectResult);
} else {
  res.status(401).json("no projects uploaded");
}
  }
  catch{
    res.status(401).json("project api failed");

  }
}

//update project
exports.updateProject=async(req,res)=>{
    const { title, languages, overview, github, website,projectImage } = req.body;
    console.log(req.body);
const{_id}=req.params
const uploadImage = req.file ? req.file.filename : projectImage

try{
const updatedProject=await projects.findByIdAndUpdate({_id},
{ title, languages, overview, github, website,projectImage:uploadImage}
,{new:true})
await updatedProject.save()
res.status(200).json(updatedProject)
}
catch(err){
res.status(402).json(`project api failed ${err}`)
}
}

//delete project
exports.deleteProject=async(req,res)=>{
  const {_id}=req.params
  try{
const response=await projects.deleteOne({_id})
if(response){
  res.status(200).json("project deleted")
}
  }
  catch(err){
    res.status(402).json(`project api failed ${err}`);

  }
}