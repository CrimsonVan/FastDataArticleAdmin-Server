const express=require('express') 
const app=express()
const cors=require('cors')
const bodyParser = require('body-parser')
const userRouter=require('./router/user')
const userinfoRouter=require('./router/userinfo')
const articleCateRouter=require('./router/article')
const articleRouter=require('./router/articleInfo')
const joi=require('joi')
const expressJWT=require('express-jwt')
const config=require('./config')
app.use(cors())
app.use('/uploads', express.static('./uploads'))

app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.cc=(err,status=1)=>{
          res.send({
             
             message:err instanceof Error ?err.message : err,
             status
           })
           
    }
    next()
})
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))
app.use('/api',userRouter)
app.use('/my',userinfoRouter)
app.use('/my/cate',articleCateRouter)
app.use('/my/article',articleRouter)



app.use((err,req,res,next)=>{
  if(err instanceof joi.ValidationError){
  return  res.cc(err)
  }if (err.name==='UnauthorizedError') {
    return res.cc('身份认证失败',401)
  }
  else{
   return res.cc(err)

  }
})
app.listen(3007,function(){
    console.log('app server running at http://127.0.0.1:3007');
    
})