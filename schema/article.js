const { query } = require('express')
const joi =require('joi')
const cate_name=joi.string().required()
const cate_alias=joi.string().alphanum().required()
const id=joi.number().integer().min(1).required()
exports.add_cate_schema={
    body:{
        cate_name,
        cate_alias
    }
}
exports.del_cate_schema={
    query:{
        id
    }
}
exports.update_cate_schema={
    body:{
        id,
        cate_name,
        cate_alias
    }
}