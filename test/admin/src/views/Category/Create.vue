<template>
  <div class="CategoryCreate">
    <h3>{{id ? '修改' : '新建'}}分类</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="前置知识点">
        <el-select v-model="model.pre">
          <el-option
            v-for="item in preCategories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {}, // 保存分类
      preCategories: [] // 上级分类的数组数据
    }
  },
  created () {
    this.id && this.fetch()
    this.fetchPreOptios()
  },
  methods: {
    async save () {
      let res
      console.log(this.model)
      if (this.id) {
        res = await this.$http.put(`/category/${this.id}`, this.model)
      } else {
        res = await this.$http.post('category', this.model)
      }
      console.log(res)
      this.$router.push('/admin/category/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`/category/${this.id}`)
      console.log(res)
      this.model = res.data
    },
    async fetchPreOptios () {
      const res = await this.$http.get(`/category`)
      console.log(res.data)
      this.preCategories = res.data
    }
  }
}
</script>

<style>
</style>
