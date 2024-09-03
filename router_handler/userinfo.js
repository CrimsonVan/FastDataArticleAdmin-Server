const db=require('../db/index')
const bcrypt=require('bcryptjs')
//获取用户信息
exports.getUserInfo=(req,res)=>{
    let sql='select id, username, nickname, email, user_pic from ev_users where id=?'
    db.query(sql,req.user.id,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length!==1){
            return res.cc('获取用户信息失败')
              
        }else{
             res.send({
        message:'获取用户信息成功！',
        data:results[0],
        code:0})
        }
    })

   
}
//修改用户信息
exports.updateUserInfo=(req,res)=>{
   let sql='update ev_users set ? where id=?'
   db.query(sql,[req.body,req.body.id],(err,results)=>{
   if(err){
   return res.cc(err)
   }
   if(results.affectedRows!==1){
    return res.cc('修改用户失败')
   }else{
    return res.send({
        message:'修改用户信息成功！',
        code:0 })
   }
   })   
}
//修改密码
exports.updatePassword=(req,res)=>{
    let sql='select * from ev_users where id=?'
    // res.send('修改密码成功')
    db.query(sql,req.user.id,(err,results)=>{
             if(err){
                return res.cc(err)
             }
             if(results.length!==1){
                return res.cc('token失效')
             }else{
          const compareResult=bcrypt.compareSync(
            req.body.oldPwd,results[0].password
          )
          
          
          if(!compareResult){
            return res.send('原密码错误')
          }else{
            let sqlStr='update ev_users set password=? where id=?'
            let newPwd=bcrypt.hashSync(req.body.newPwd,10)
            db.query(sqlStr,[newPwd,req.user.id],
                (err,results)=>{
                if(err){return res.cc(err)}
                if(results.affectedRows!==1){return res.cc('重置密码错误')}else{
                    return res.send({
                        message:'修改密码成功！',
                        code:0
                    })
                }
            })
          }
             }
    })
} 
//修改头像
exports.updateAvatar=(req,res)=>{
    let sql='update ev_users set user_pic=? where id=?'
    // res.send('更新头像成功')
    db.query(sql,[req.body.avatar,req.user.id],
        (err,results)=>{
         if(err){
            return res.cc(err)
         }
         if(results.affectedRows!==1){
            return res.cc('更新头像失败')
            
         }else{
            return res.send({
                message:'更新头像成功！',
                code:0
            })
         }
    })
}