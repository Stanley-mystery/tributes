const mongoose = require('mongoose');
const User = require('../Models/usersmodel')
const bcrypt = require('bcryptjs');
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
// const Util = require('util');
const jwt = require('jsonwebtoken');




// CREATE/REGISTER USERS
exports.createUser = asyncErrorHandler( async (req, res, next) => {


  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  try {
    await user.save();
  return  res.redirect('login');
  } catch (error) {
    res.redirect('signup');
    
  }

   
})


// LOGIN INTO BLOG
exports.login = asyncErrorHandler( async (req, res, next) => {
const loginUserEmail  = req.body.email;
const loginUserPassword = req.body.password;
// FIND USER
const user = await User.findOne({ email: loginUserEmail});
// console.log(user);

if(!user){
  const err = `<h2> Wrong email or Password</h2> `;
 return res.status(404).render('users/index', {err: err})
}
// COMPARE HASHED PASSWORD WITH INPUT PASSWORD
const passwordMatch = await bcrypt.compare(loginUserPassword, user.password);
if(!passwordMatch){
  const err = `<h2> Wrong email or Password</h2> `; 
 return res.status(404).render('users/index',  {err: err});
} 

const token = jwt.sign({email: loginUserEmail }, process.env.SECRET_STR, {
  expiresIn: process.env.LOGIN_EXPIRES
})
console.log(token);

res.cookie("token", token, {
  httpOnly: true
})
return res.redirect('/articles')
})

// GET LOGIN PAGE
exports.loginPage = async (req, res) => {
  
  res.render('users/index');
}


// GET SIGNUP PAGE 
exports.signup = async (req, res)=> {
  res.render('users/signup')
}
  
// GET FORGOTPASS PAGE
exports.GetForgotPass = async (req, res) => {
  res.render('users/forgotPass')

}
exports.forgotPass = asyncErrorHandler( async (req, res) => {
  const email  = req.body.email;
  const CreateNewPassword = req.body.CreateNewPassword;
  // const confirmPassword = req.body.confirmPassword; 
  
  const hashedPass = await bcrypt.hash(CreateNewPassword, 10);
  


  const user = await User.findOneAndUpdate({email: email}, {password: hashedPass })

  console.log(user)
  res.redirect('login')
  
})
// LOGOUT
exports.logout = asyncErrorHandler( async (req, res ,next) => {
  res.clearCookie('jwtToken');
  res.redirect('users/login')
})

// AUTHORIZE USERS
exports.cookieJwtAuth = asyncErrorHandler( async (req, res, next) => {
  const token = req.cookies.token;

  const decodedToken  = jwt.verify(token, process.env.SECRET_STR);
  console.log(decodedToken);
 
  const user = await User.findOne({email:decodedToken.email})
// console.log(user);
  if(!user) return res.redirect('users/login')

  req.user = user;  

  next()
})
