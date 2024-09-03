db=require('../db/index')
exports.addArticleInfo=(req,res)=>{
    if (!req.file || req.file.fieldname !== 'cover_img'){
        return res.cc('文章封面是必选参数！')
    } else{
        // 导入处理路径的 path 核心模块
const path = require('path')

const articleInfo = {
  // 标题、内容、状态、所属的分类Id
  ...req.body,
  // 文章封面在服务器端的存放路径
  cover_img: path.join('/uploads', req.file.filename),
  // 文章发布时间
  pub_date: new Date(),
  // 文章作者的Id
  author_id: req.user.id,
}
const sql = `insert into ev_articles set ?`
db.query(sql,articleInfo,(err,results)=>{
    if(err){return res.cc(err)}
    if(results.affectedRows!==1){
        return res.cc('发布文章失败')
    }else{
        res.send({
            code:0,
            message:'发布文章成功',
            data:articleInfo
        })
    }
})
}
        
     
    

}
exports.getArticleList=(req,res)=>{
    let sql=undefined
    // let noExistSql=null
    const cate_id=req.query.cate_id
    const state=req.query.state
    const page_num = req.query.pagenum //当前的num
    const page_size = req.query.pagesize //当前页的数量
    const params = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]

    if(!cate_id || !state){
       sql='select * from ev_articles where is_delete=0 order by id asc limit ?,? '
       db.query(sql,params,(err,results)=>{
        if(err) return res.cc(err)
         res.send({
             code:0,
             message:'获取文章列表成功',
             data:results,
             query:params
   })  
  }) 
    }else{
        sql='select * from ev_articles where is_delete=0 and state=? and cate_id=?  order by id asc limit ?,? '
        db.query(sql,[state,cate_id,...params],(err,results)=>{
            if(err) return res.cc(err)
             res.send({
                 code:0,
                 message:'获取文章列表成功',
                 data:results,
                 query:params
       })  
      }) 
    }


//     db.query(sql,[state,cate_id,...params],(err,results)=>{
//       if(err) return res.cc(err)
//        res.send({
//            code:0,
//            message:'获取文章列表成功',
//            data:results,
//            query:params
//  })  
// })    

}
exports.getArticleInfo=(req,res)=>{
    sql='select * from ev_articles where id=? order by id asc  '
    db.query(sql,req.query.id,(err,results)=>{
        if(err){return err}
        res.send({
            code:0,
            message:'获取单个信息成功',
            data:results[0]
        })
    })
    // res.send('获取单个文章信息成功')
}
exports.delArticleInfo=(req,res)=>{
    let sql3='update ev_articles set is_delete=1 where id=?'
    db.query(sql3,req.query.id,(err,results)=>{
       if(err){return res.cc(err)}
       if(results.affectedRows!==1){return res.cc('删除文章失败')

       }else{
           return res.send({
               code:0,
               message:'删除文章成功'
           })
       }
    })

//  res.send({
//     code:0,
//     message:'删除文章成功'
//  })
}
exports.editArticleInfo=(req,res)=>{
//    res.send({
//         code:0,
//         data:req.body,
//         file:req.file
//     })
    const path = require('path')

const articleInfo = {
  // 标题、内容、状态、所属的分类Id
  ...req.body,
  // 文章封面在服务器端的存放路径
  cover_img: path.join('/uploads', req.file.filename),
  // 文章发布时间
  pub_date: new Date(),
  // 文章作者的Id
  author_id: req.user.id,
}
    let sql6='update ev_articles set ? where id=?'
    db.query(sql6,[articleInfo,req.body.id],(err,results)=>{
         if(err){return res.cc(err)}
         if(results.affectedRows!==1){
            return res.cc('更新文章失败')
         }else{
            res.send({
                 code:0,
                 message:"修改文章成功"
                  })
         }
    })
}