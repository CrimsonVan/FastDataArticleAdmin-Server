const express=require('express')
const {regUser,loginUser}=require('../router_handler/user')
const{reg_login_schema}=require('../schema/user')
const expressJoi = require('@escook/express-joi')
const router=express.Router()
router.post('/reg',expressJoi(reg_login_schema),regUser)
router.post('/login',expressJoi(reg_login_schema),loginUser)    
 module.exports=router   