const express = require("express");

//router object
const router = new express.Router();
const user = require("../controllers/userControl");
const upload = require("../middleware/multerMiddleware");
const { jwtMiddleware } = require("../middleware/jwtMiddleware");

//signup
router.post("/user/register", user.register);

//login
router.post("/user/login", user.login);

//update profile
router.put(
  "/user/update-profile/:_id",
  jwtMiddleware,
  upload.single("profile"),
  user.editProfile
);

//getProfile
// router.get("/user/getProfile/:_id",jwtMiddleware,user.getProfile)

//add new project
router.post(
  "/user/add-project",
  jwtMiddleware,
  upload.single("projectImage"),
  user.addProject
);

//get user projects
router.get("/user/get-user-projects/:id", jwtMiddleware, user.getProjects);

//get all projects
router.get("/user/get-all-projects", user.getAllProjects);

//get 3 projects only
router.get("/user/get-three-projects", user.getThreeProjects);

//update project
router.put(
  "/user/edit-project/:_id",
  jwtMiddleware,
  upload.single("projectImage"),
  user.updateProject
);

//delete project
router.delete("/user/delete-project/:_id",jwtMiddleware,user.deleteProject)

module.exports = router;
