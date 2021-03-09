<template>
  <div class="FileList">
    <h1>文件列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="model.name" label="文件名"></el-table-column>
      <!-- <el-table-column prop="model.icon" label="展示">
        <template slot-scope="scope">
          <img :src="scope.row.model.icon" style="height:3rem" />
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.$http.get('/file').then(res => {
        console.log(res.data)
        this.items = res.data
      })
    },
    async remove (row) {
      this.$confirm(`是否删除文件`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 请求删除的接口
        await this.$http.delete(`file/${row._id}`).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
</style>
