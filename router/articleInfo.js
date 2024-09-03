const express =require('express')
const{add_article_schema}=require('../schema/articleInfo')
const expressJoi = require('@escook/express-joi')
const {addArticleInfo,getArticleList,getArticleInfo,delArticleInfo,editArticleInfo}=require('../router_handler/articleInfo')
const router=express.Router()
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// upload.single('cover_img')
// router.get('/list',getArticleCates)
// router.post('/add',expressJoi(add_cate_schema),addArticleCates)
// router.get('/del',expressJoi(del_cate_schema),delArticleCates)
// router.post('/info',expressJoi(update_cate_schema),updateArticleCates)
router.post('/add',upload.single('cover_img'),expressJoi(add_article_schema),addArticleInfo)
router.get('/list',getArticleList)
router.get('/info',getArticleInfo)
router.get('/delInfo',delArticleInfo)
router.post('/editInfo',upload.single('cover_img'),editArticleInfo)



module.exports=router
