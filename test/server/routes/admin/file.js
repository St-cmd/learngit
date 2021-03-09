module.exports = app => {
    const express = require('express')
    const router = express.Router()
    // 引入数据库模型
    const { File } = require('../../models/admin/File')

    // 存文件
    router.post('/', async (req, res) => {
        // 创建数据
        console.log(req.body)
        var icon = req.body.icon
        console.log('req======', req.body.icon)
        console.log(icon.split('/').pop())
        await File.create({ 'model': req.body }, (err, data) => {
            res.send(data)
        })

        fs = require('fs')
        
        fs.readFile('../server/upload/' + icon.split('/').pop(), function (err, data) {
            if (err) throw err;
            // console.log(JSON.parse(data.toString()))
            console.log(data.toString())
        })
    })



    // 获取文件列表
    router.get('/', async (req, res) => {
        const model = await File.find().limit(10)
        res.send(model)
    })

    // 删除文件
    router.delete('/:id', async (req, res) => {
        await File.findByIdAndDelete(req.params.id, req.body)
        // 发回客户端
        res.send({
            success: '删除成功'
        })
    })


    // 上传文件接口
    const multer = require('multer')
    // __dirname 表示当前文件所在的位置--admin/index.js
    const upload = multer({ dest: __dirname + '/../../upload' })
    // upload.single('file') -- file 是接口传递过来的formdata中的字段名，el-ui默认值是file
    router.post('/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:6500/upload/${file.filename}`
        res.send(file)
    })
    // 路由挂载
    app.use('/admin/api/file', router)
}