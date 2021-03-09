<template>
  <div class="Zhenti">
    <Header title="软考真题"/>
    <nav>
      <h4>真题年份选择</h4>
      <div class="listData">
        <div class="list" v-for="(item,i) in listData" :key="i">
          item
        </div>
      </div>
    </nav>
    <footer>
      <div>上午综合知识</div>
      <div style="background: #ea9463">下午案例分析</div>
      <div style="background: #69aefb">下午论文范题</div>
    </footer>
  </div>
</template>

<script>
import Header from "../../components/Header";

export default {
  data() {
    return {
      listData: [
        {
          title: '测试'
        },
        {
          title: '测试'
        },
        {
          title: '测试'
        },
        {
          title: '测试'
        },
        {
          title: '测试'
        },
        {
          title: '测试'
        },
        {
          title: '测试'
        },
        {
          title: '测试'
        },
        {
          title: '测试'
        },
        {
          title: '测试'
        },

      ]
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
// 80 330
@import "../../assets/styles/mixin.less";
.Zhenti {
  background: #f1f1f1;
  height: 100vh;
  nav {
    h4 {
      font-weight: 400;
      color: #9b9b9b;
      margin: 40px 0 45px 32px;
    }
    .listData {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .list {
        // float: left;
        .wh(40%,80px);
        background: #fff;

      }
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background: #fff;
    padding: 20px 0 280px 0;
    div {
      height: 88px;
      background: #91cc7a;
      border-radius: 10px;
      color: #fff;
      text-align: center;
      line-height: 88px;
      margin: 30px;
      margin-top: 0;
    }
  }
}
</style>