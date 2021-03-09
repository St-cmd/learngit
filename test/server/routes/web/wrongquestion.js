module.exports = app => {
    const express = require('express')
    const router = express.Router()
    // 引入数据库模型
    const { WrongQuestion } = require('../../models/before/WrongQuestion')

    // 存入数据
    router.post('/', async (req, res) => {
        // console.log(...req.body)
        // let data = req.body.map(item => {
        //     console.log({...item})
        //     return {'question': {...item}}
        // })
        // 把做对的题目从数据库中删除
        console.log('correctQuestion' + req.body.correctQuestion)
        for (let i = 0; i < req.body.correctQuestion.length; i++) {
            let items = req.body.correctQuestion[i]
            console.log(items)
            deleteItmes = await WrongQuestion.deleteOne({'title': items.title, 'username': items.username})
            console.log('delete items is ' + items.title)
        }
        console.log('wrongQuestion' + req.body.wrongQuestion)
        for (let i = 0; i < req.body.wrongQuestion.length; i++) {
            let items = req.body.wrongQuestion[i]
            console.log('index' + i + ', ' + items)
            existItem = await WrongQuestion.findOne({'title': items.title, 'username': items.username})
            if (existItem == null || existItem == undefined) {
                console.log('not exist this tiem,insert ')
                await WrongQuestion.create(items)
            } else {
                console.log('already has this item,just skip' + existItem.title)
            }
        }
        res.send('success')
        // // 创建数据
        // await WrongQuestion.insertMany(req.body.wrongQuesion, (err, data) => {
        //     res.send(data)
        //     console.log(data)
        // })
    })

    // 获取选择题列表
    router.get('/', async (req, res) => {
        const items = await WrongQuestion.find().limit(10)
        res.send(items)
    })

    router.post('/length', async (req, res) => {
        console.log('get wrong question length ' + req.body.username)
        const items = await WrongQuestion.find(req.body)
        res.send(items.length)
    })

    router.post('/list', async (req, res) => {
        console.log('get wrong question list ' + req.body.username)
        await WrongQuestion.find(req.body, (err, data) => {
            console.log('length is ' + data.length)
            res.send(data)
            console.log(data)
        })
    })

    // 删除题目
    router.delete('/:id', async (req, res) => {
        await WrongQuestion.findByIdAndDelete(req.params.id, req.body)
        // 发回客户端
        res.send({
            success: '删除成功'
        })
    })
    router.post('/clear', async (req, res) => {
        console.log('clear ' + req.body.username)
        const clearItems = await WrongQuestion.deleteMany(req.params.username)
        console.log(clearItems)
        // 发回客户端
        res.send({
            success: '删除成功'
        })
    })

    // 获取分类详情返回到修改界面展示
    router.get('/:id', async (req, res) => {
        // console.log(typeof req.params.id)
        await WrongQuestion.findById(req.params.id, (err, data) => {
            res.send(data)
        })
    })
    // //根据title获取题目
    // router.get('/:details', async (req, res) => {
    //     console.log(req.params)
    //     await WrongQuestion.find('title', req.params.title, (err, data) => {
    //         res.send(data)
    //     })
    // })

    // 高频错题接口
    router.get('/highwrong', async (req, res) => {
        console.log(req.params.tittle)
        res.send("200")
        // const items = await WrongQuestion.find({ 'title': req.params.title })
        // console.log(items)
        // res.send(items)
    })

    // 修改
    router.put('/:id', async (req, res) => {
        // console.log(req.params.id)//url里的id
        // console.log(req.body)//传到后端的数据
        const model = await WrongQuestion.findByIdAndUpdate(req.params.id, { 'question': req.body })
        // 发回客户端
        res.send(model)
    })
    // 路由挂载
    app.use('/web/api/wrongquestion', router)
}