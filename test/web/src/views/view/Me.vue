<template>
  <div class="Me">
    <img class="bg" src="@/assets/images/Me/TopBg.png" alt />
    <!-- <h1>欢迎登录软考练习软件</h1> -->
    <div class="user">
      <img src="@/assets/images/Me/Avatar.png" alt />
      <div class="username">{{username}}</div>
      <div v-for="list in listData" :key="list.id">
      <div class="click-item" v-on:click="clickItem(item.title)" v-for="item in list" :key=item.id>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listData: [
        [
          { title: '个人资料' },
          // { title: 'VIP会员' },
          { title: '我的错题', border: true }
          // { title: '我的收藏', border: true }
        ],
        [
          // { title: '切换科目' },
          { title: '帮助与反馈' }, // TODO wait for complete
          { title: '清理缓存', border: true }, // TODO wait for complete
          { title: '错题清空' }
        ],
        [
          { title: '成绩查询' },
          { title: '关于版本' }, // TODO wait for complete
          { title: '将App，推荐给您的好友吧！', border: true } // TODO wait for complete
        ]
      ],
      username: ''
    }
  },
  created () {
    // this.ontest()
    this.getUser()
  },
  methods: {
    // async ontest () {
    //   this.$http.get('/choiceQuestion').then(res => {
    //     console.log(res)
    //   })
    // },
    async getUser () {
      this.$http.get('/userinfo').then(res => {
        console.log(res.data[0].username)
        this.username = this.getCookie('username')
      })
    },
    async clickItem (id) {
      console.log('click id is ' + id)
      switch (id) {
        case '个人资料': { // TODO
          break
        }
        case '我的错题': { // TODO 添加显示页面
          console.log('我的错题 ' + this.username)
          let wrongRes = await this.$http.post('/wrongquestion/list', { 'username': this.username })
          console.log(wrongRes.data)
          break
        }
        case '成绩查询': { // TODO 添加显示页面
          console.log('成绩查询 ' + this.username)
          const res = await this.$http.get('/choiceQuestion/length')
          console.log('问题总数:' + res.data)
          let wrongRes = await this.$http.post('/wrongquestion/length', { 'username': this.username })
          console.log('错题总数:' + wrongRes.data)
          break
        }
        case '帮助与反馈': { // TODO
          break
        }
        case '错题清空': {
          const res = await this.$http.post('/wrongquestion/clear', { 'username': this.username })
          console.log(res)
          break
        }
        case '关于版本': { // TODO
          break
        }
        case '将App，推荐给您的好友吧！': {
          let transfer = document.createElement('input')
          document.body.appendChild(transfer)
          transfer.value = window.location.href // 这里表示想要复制的内容
          transfer.focus()
          transfer.select()
          if (document.execCommand('copy')) {
            document.execCommand('copy')
          }
          transfer.blur()
          console.log('复制成功')
          alert('复制成功')
          document.body.removeChild(transfer)
        }
      }
    },
    getCookie (name) {
      console.log('get cookie for cookie name' + name)
      var arr = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      )
      if (arr != null) {
        console.log(arr)
        return unescape(arr[2])
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
.Me {
  position: relative;
  text-align: center;
  .username {
    font-size: 20px;
  }
  h1 {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .bg {
    width: 100%;
  }
  .user {
    width: 100%;
    height: 100%;
    // border: 1px solid #000;
    text-align: center;
    position: absolute;
    top: 40%;
    // left: 50%;
    // transform: translate(-50%, -50%);
  }
}
.click-item {
  width: 100%;
  text-align: left;
  padding-left: 20px;
  border: 1px solid #333;
}
</style>
