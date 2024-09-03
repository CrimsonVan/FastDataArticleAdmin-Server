const bcrypt=require('bcryptjs')
const db=require('../db/index')
const jwt=require('jsonwebtoken')
const config=require('../config')
// const { date } = require('joi')
exports.regUser=(req,res)=>{
    const userInfo=req.body
    // 判断账号密码是否为空
    // if(!userInfo.username || !userInfo.password){
    //     return res.send({
           
    //             code:1,
    //             message:'用户名或密码不能为空！'
            
    //     })
    // }
    
    const sql='select * from ev_users where username=?'
//    连接数据库并且判断是否重名
    db.query(sql,userInfo.username,function(err,results){
        console.log(userInfo);
       
        userInfo.password=bcrypt.hashSync(userInfo.password,10)  
        console.log(userInfo);
         if(err){
            // return res.send({status:400,data:{
            //     message:'出错了'
            // }})
            return res.cc(err)
         }
         if(results.length>0){
             return res.send({
                
                    code:1,
                message:'用户名已被占用'
                
                
            })
           
         }
         if(results.length===0){
            const sql='insert into ev_users set ?'
            db.query(sql,
                {username:userInfo.username,password:userInfo.password},(err,results)=>{
                    if(err){
                      return res.cc(err)
                     }
                     if(results.affectedRows!==1){
                         return res.send({
                                code:1,
                            message:'注册用户失败'
                            
                            
                        })
                       
                     }else{
                        res.send({
                            code:0,
                            message:'注册成功'
                        })
                     }
            })
         }
       //给密码加密
     
    
    })

    }
exports.loginUser=(req,res)=>{
    const userInfo=req.body
    const sql='select * from ev_users where username=?'
      db.query(sql,userInfo.username,function(err,results){
          if(err){
           return res.cc(err)
          }
          if(results.length!==1){
              return res.send({
                code:1,
                message:'登录失败'
              })
          }else{
        const compareResult=bcrypt.compareSync(userInfo.password,results[0].password)
        if(!compareResult){
         return res.send({
                code:1,
                message:'用户名或密码错误'
              })
        }else{
          
            
            const user={...results[0],password:'',user_pic:''}
            const tokenStr=jwt.sign(user,config.jwtSecretKey,{
                expiresIn:'10h'
            })
             return res.send({
            code:0,
            message:'登录成功',
            token:'Bearer '+tokenStr

           })
        }
            
          
          }
      })
        }    