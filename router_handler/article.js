const db=require('../db/index')
exports.getArticleCates=(req,res)=>{
   let sql='select * from ev_article_cate where is_delete=0 order by id asc'
   db.query(sql,(err,results)=>{
     if(err) return res.cc(err)
      res.send({
          code:0,
          message:'获取分类列表成功',
          data:results
})  
   })
}
exports.addArticleCates=(req,res)=>{
  let sql1='select * from ev_article_cate where cate_name=? or cate_alias=?'  
  db.query(sql1,[req.body.cate_name,req.body.cate_alias],(err,results)=>{
    if(err){
        return res.cc('新增分类失败')
    }
    if(results.length===2){
        return res.cc('分类名称与别名已被占用')
    }
    if(results.length===1 && results[0].cate_name===req.body.cate_name && results[0].cate_alias===req.body.cate_alias){
        return res.cc('分类名称和别名都已被占用')
    }
    if(results.length===1 && results[0].cate_name===req.body.cate_name){
        return res.cc('分类名称已被占用')
    }
    if(results.length===1 && results[0].cate_alias===req.body.cate_alias){
        return res.cc('分类别名已被占用')
    }else{
       let sql2='insert into ev_article_cate set ? ' 
       db.query(sql2,req.body,(err,results)=>{
        if(err){return res.cc(err)}
        if(results.affectedRows!==1){
            return res.cc('新增文章分类失败')
        }else{
              res.send({
                 code:0,
                 message:'新增分类成功'})
        }
       })

    }
  })
}
exports.delArticleCates=(req,res)=>{
    let sql3='update ev_article_cate set is_delete=1 where id=?'
     db.query(sql3,req.query.id,(err,results)=>{
        if(err){return res.cc(err)}
        if(results.affectedRows!==1){return res.cc('删除文章分类失败')

        }else{
            return res.send({
                code:0,
                message:'删除分类成功'
            })
        }
     })

}
exports.updateArticleCates=(req,res)=>{
const sql4='select * from ev_article_cate where id<>? and (cate_name=? or cate_alias=?) '
db.query(sql4,[req.body.id,req.body.cate_name,req.body.cate_alias],
    (err,results)=>{
        if(err){
            return res.cc('修改分类失败')
        }
        if(results.length===2){
            return res.cc('分类名称与别名已被占用')
        }
        if(results.length===1 && results[0].cate_name===req.body.cate_name && results[0].cate_alias===req.body.cate_alias){
            return res.cc('分类名称和别名都已被占用')
        }
        if(results.length===1 && results[0].cate_name===req.body.cate_name){
            return res.cc('分类名称已被占用')
        }
        if(results.length===1 && results[0].cate_alias===req.body.cate_alias){
            return res.cc('分类别名已被占用')
        }else{
            let sql6='update ev_article_cate set ? where id=?'
            db.query(sql6,[req.body,req.body.id],(err,results)=>{
                 if(err){return res.cc(err)}
                 if(results.affectedRows!==1){
                    return res.cc('更新文章分类失败')
                 }else{
                    res.send({
                         code:0,
                         message:"修改文章分类成功"
                          })
                 }
            })
        }
    }
)
}