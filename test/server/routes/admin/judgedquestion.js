module.exports = app => {
    const express = require('express')
    const router = express.Router()
    // 引入数据库模型
    const { JudgedQuestion } = require('../../models/admin/JudgedQuestion')

    // 存入数据
    router.post('/', async (req, res) => {
        // 创建数据
        await JudgedQuestion.create({ 'question': req.body }, (err, data) => {
            res.send(data)
        })
    })

    // 获取判断题列表
    router.get('/', async (req, res) => {
        const items = await JudgedQuestion.find().limit(10)
        res.send(items)
    })

    // 删除题目
    router.delete('/:id', async (req, res) => {
        await JudgedQuestion.findByIdAndDelete(req.params.id, req.body)
        // 发回客户端
        res.send({
            success: '删除成功'
        })
    })

    // 根据id查找
    router.get('/:id', async (req, res) => {
        console.log(req.params.id)
        await JudgedQuestion.findById(req.params.id, (err, data) => {
            res.send(data)
        })
    })

    // 修改
    router.put('/:id', async (req, res) => {
        // console.log(req.params.id)//url里的id
        // console.log(req.body)//传到后端的数据
        const model = await JudgedQuestion.findByIdAndUpdate(req.params.id, { 'question': req.body })
        // 发回客户端
        res.send(model)
    })

    // 路由挂载
    app.use('/admin/api/judgedQuestion', router)
}