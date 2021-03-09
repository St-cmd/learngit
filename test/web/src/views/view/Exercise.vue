<template>
  <div>
    <Header :title="ExerciseTitle">
      <div slot="left"></div>
    </Header>
    <nav>
      <div class="wrong" @click="GoWrong">
        <img src="@/assets/images/Exercise/More.png" alt />
        高频错题
      </div>
      <div class="wrap">
        <div
          class="list"
          v-for="(item, id) in listData"
          :key="id"
          :style="{ backgroundColor: item.color }"
          @click="GoItem(item.id)"
        >
          <img src="@/assets/images/Exercise/More.png" alt />
          {{ item.title }}
        </div>
      </div>
      <div class="same" @click="GoSame(8)">
        <img src="@/assets/images/Exercise/More.png" alt />
        同类推荐
      </div>
    </nav>
  </div>
</template>

<script>
import Header from '../../components/Header'

export default {
  data () {
    return {
      ExerciseTitle: '软考练习',
      listData: [
        { id: 1, title: '分类练习', url: '', img: '', color: '#b8d480' },
        { id: 2, title: '随机练习', url: '', img: '', color: '#82d4d2' }
      ]
    }
  },
  methods: {
    GoWrong () {
      this.$router.push('/Wrong')
    },
    GoItem (id) {
      if (id === 1) {
        this.$router.push('/Chapter')
      } else if (id === 2) {
        this.$router.push('/Reprint')
      }
    },
    GoSame (id) {
      if (id === 8) {
        this.$router.push(`/Recomand/${id}`)
      }
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
nav {
  margin-top: 5px;
  color: #fff;
  padding: 10px;
  .wrong,
  .same {
    margin-bottom: 10px;
    height: 160px;
    background-color: #9e97c1;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 700;
    img {
      width: 80px;
      height: 40px;
      margin: 15px 0;
    }
  }
  .same {
    background-color: #90b0ed;
  }
  .wrap {
    display: flex;
    font-size: 25px;
    font-weight: 700;
    .list {
      flex: 1;
      margin: 0 10px 10px 0;
      display: flex;
      height: 170px;
      border-radius: 30px;
      flex-direction: column;
      align-items: center;
      img {
        width: 80px;
        height: 40px;
        margin: 45px 0 20px 0;
      }
    }
    .list:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>
