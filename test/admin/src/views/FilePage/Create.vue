<template>
  <div class="FileCreate">
    <h1>上传文件</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="文件名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item class="answers" label="上传">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/file/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <input type="file">
      <el-form-item>
        <el-button type="primary" native-type="submit">提交保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  props: {},
  data () {
    return {
      model: {}
    }
  },
  methods: {
    async save () {
      // 将题目保存到数据库,后端路由上传到file接口
      console.log(this.model)
      await this.$http.post('/file', this.model).then(res => {
        console.log(res)
        this.$router.push('/admin/filePage/list')
          .catch(error => { console.log(error) })
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      })
    },
    // 上传文件成功后的回调函数
    afterUpload (res) {
      // 显式赋值 this.$set(object, propertyName, value)
      this.$set(this.model, 'icon', res.url)
      console.log(res)
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
