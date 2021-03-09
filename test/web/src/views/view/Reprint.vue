<template>
  <div class="Reprint">
    <Header title="刷题"></Header>
    <div
      class="container"
      :style="{
          width: screenWidth * question.length + 'px',
          left: -(pageNum * screenWidth) + 'px'
        }"
      @touchstart="touchStart"
      @touchend="touchEnd"
    >
      <div
        class="box"
        :style="{ width: screenWidth + 'px' }"
        v-for="(item, index) in question"
        :key="index"
      >
        {{ item.title }}
        <div class="list">
          <div
            class="list-demo"
            v-for="(Aitem, Ai) in item.answerList"
            :key="Ai"
            @click="action(index,Ai)"
          >
            <div
              class="option"
              :style="{ background: Ai === item.answer  ? 'green' : actionData[index] == Ai ? 'pink' : '' }"
            >{{option[Ai]}}</div>
            {{Aitem}}
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="content"
      :style="{
      width:`${screenWidth * question.length}px`,
      left:`${-(pageNum * screenWidth)}px`
    }"
      @touchstart="touchStart"
      @touchend="touchEnd"
    >
      <div class="question" v-for="(item,index) in question" :key="index">
        <div class="title">{{item.question.title}}</div>
        <div class="answerlist">
          <div class="list-demo">
            <div class="option">A</div>
            <div class="answer">{{item.question.answerA}}</div>
          </div>
          <div class="list-demo">
            <div class="option">B</div>
            <div class="answer">{{item.question.answerB}}</div>
          </div>
          <div class="list-demo">
            <div class="option">C</div>
            <div class="answer">{{item.question.answerC}}</div>
          </div>
          <div class="list-demo">
            <div class="option">D</div>
            <div class="answer">{{item.question.answerD}}</div>
          </div>
        </div>
      </div>
    </div>-->

    <footer>
      <!-- <div>
        <img src="@/assets/images/Reprint/Favorite.png" alt />
        收藏
      </div>-->
      <div>
        <img src="@/assets/images/Reprint/Correct.png" alt />
        {{ Correct }}
      </div>
      <div>
        <img src="@/assets/images/Reprint/Wrong.png" alt />
        {{ Wrong }}
      </div>
      <div>
        <img src="@/assets/images/Reprint/Quantity.png" alt />
        {{ pageNum +1 }}/{{ question.length }}
      </div>
    </footer>
  </div>
</template>

<script>
import Header from '../../components/Header'
import { shuffle } from '../../common/utils'

export default {
  props: {
    id: {}
  },
  data () {
    return {
      actionData: [], // 储存选中选项
      question: [],
      windowHeight: '',
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      option: ['A', 'B', 'C', 'D'],
      pageNum: 0, // 第几题
      Correct: 0, // 对题数量
      Wrong: 0, // 错题数量
      correctQuestion: [], // 保存正确的题目
      wrongQuestion: [], // 保存错题
      move: {
        start: '',
        end: ''
      },
      actionRight: '',
      RecomandArr: [], // 同类推荐题目数组
      wrongdataArr: [],
      username: '' // 用户名
    }
  },
  components: {
    Header
  },
  beforeDestroy () {
    if (this.wrongQuestion.length !== 0 || this.correctQuestion !== 0) {
      this.postWrongQuestion()
    }
    console.log('beforedestory')
    // console.log(this.question.length)
  },
  created () {
    // 如果有id,则按照分类id取数据
    this.getQuestion()
    // this.params.id && getRecomandQuestion()
    console.log(this.id)
    console.log(this.$route.params.id)
    this.id && this.wrongQuestionHigh()
    // if (this.id === '1') {
    //   this.wrongQuestionHigh()
    //   console.log(this.wrongdataArr)
    //   // id:1
    //   let rateOne = this.wrongdataArr.filter(item => {
    //     return item.rate < 3
    //   })
    //   console.log(rateOne)
    //   // this.question = rateOne
    // }
    this.username = this.getCookie('username')
    console.log('created: get username is ' + this.username)
  },
  // 钩子函数
  mounted () {
    const that = this
    console.log(that)
    window.onresize = () => {
      console.log(this)
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
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
    },
    // 滑屏翻页
    touchStart (e) {
      this.move.start = e.touches[0].clientX
    },
    touchEnd (e) {
      let end = e.changedTouches[0].pageX
      // if (this.list[this.pageNum].newType != 'saqs'||)
      if (this.move.start - end >= 50 && this.pageNum + 1 < this.question.length) {
        this.pageNum += 1
      }
      if (this.move.start - end <= -50 && this.pageNum !== 0) {
        this.pageNum -= 1
      }
    },
    // 标记题目对错
    action (index, Ai) {
      console.log(index, Ai) // index--第几道题 Ai--循环的第几个选项
      console.log(this.question[index])
      // 点击的时候将点击的选项记录下来
      this.$set(this.actionData, index, Ai)
      // 保存正确选项
      let Ar = this.question[index].right
      // 点击时，将正确选项存到题目属性中
      this.question[index].answer = Ar
      console.log('ai is ' + (Ai).toString() + 'type is ' + typeof Ai + ', ar is ' + Ar + 'type is ' + typeof Ar)
      if ((Ai).toString() === (Ar).toString()) {
        console.log('答案正确')
        let result = this.wrongQuestion.indexOf(this.question[index])
        console.log('find result is ' + result)
        if (result >= 0) {
          console.log('元素在错误数组存在，删除')
          this.wrongQuestion.splice(result, 1)
          this.Wrong--
        } else {
          console.log('某个元素不存在')
        }
        let res = this.correctQuestion.indexOf(this.question[index])
        console.log('correct question find result is ' + res)
        if (res > 0) {
          console.log('has this quesion ,do nothing')
        } else {
          console.log('has no this question,add it')
          this.Correct++
          let temp = this.question[index]
          temp.username = this.username
          this.correctQuestion.push(temp)
        }
      } else {
        console.log('答案错误')
        let result = this.wrongQuestion.indexOf(this.question[index])
        console.log('find result is ' + result)
        if (result >= 0) {
          console.log('元素在错误数组存在')
        } else {
          console.log('元素不在错误数组')
          this.Wrong += 1
          // 保存错题--将错误题目保存到数组中
          let temp = this.question[index]
          temp.username = this.username
          this.wrongQuestion.push(temp)
        }
        let res = this.correctQuestion.indexOf(this.question[index])
        console.log('correct question find result is ' + res)
        if (res >= 0) {
          console.log('has this quesion ,remove it ')
          this.Correct--
          this.correctQuestion.splice(result, 1)
        } else {
          console.log('has no this question,do nothing')
        }
      }
      console.log(this.wrongQuestion)

      // console.log(this.actionData)
      // // 与正确答案做对比，相同则添加背景颜色为绿色-首先得到dom
      // if (this.actionData[index] === this.question[index].right) {
      //   console.log(this.question[index].right)
      //   this.$refs.options[index + 1].style.background = 'green'
      // } else {
      //   this.$refs.options.style.background = 'pink'
      // }
    },
    // 获取题目
    async getQuestion () {
      // 如果有id,则按照分类id取
      let res
      // 同类推荐
      if (this.$route.params.id && typeof (this.$route.params.id) === 'string') {
        /**
         * 获取前置分类题目数据
         */
        // 根据类型id获取到分类的值
        const categoryRes = await this.$http.get(`/category/${this.$route.params.id}`)
        // console.log(categoryRes.data)
        // 如果分类的前置分类id存在，则根据前置分类id获取题目
        if (categoryRes.data.pre) {
          const categoryPreRes = await this.$http.get(`/choiceQuestion/${categoryRes.data.pre}`)
          const preData = categoryPreRes.data
          // 将前置分类的题目放入question数组中
          preData.forEach(item => {
            this.RecomandArr.push(item.question)
          })
        }
        // console.log(this.RecomandArr)
        /**
         * 获取这一分类的题目数据，放入数组中
         */
        res = await this.$http.get(`/choiceQuestion/${this.$route.params.id}`)
        const categoryData = res.data
        categoryData.forEach(item => {
          // console.log(item)
          this.RecomandArr.push(item.question)
        })
        console.log(this.RecomandArr)

        /**
         * 整理question数组
         */

        this.RecomandArr.forEach(item => {
          // console.log(item)
          let title = item.title
          let answerList = [item.answerA, item.answerB, item.answerC, item.answerD] // 答案数组
          let rate = item.rate
          let right = item.rightAnswer
          let category = item.category
          // 将正确答案的ABCD转化为0123
          switch (right) {
            case 'A':
              right = 0
              break
            case 'B':
              right = 1
              break
            case 'C':
              right = 2
              break
            case 'D':
              right = 3
              break
          }
          let qObj = { title, answerList, rate, right, category }
          console.log(qObj)
          this.question.push(qObj)
        })
      } else if (this.$route.params.wid) {
        // 错题
        res = await this.$http.get(`/wrongquestion/${this.$route.params.wid}`)
      } else {
        // 直接获取选择题
        res = await this.$http.get('/choiceQuestion')
        // console.log(res.data)
        let random = res.data
        let randomArr = shuffle(random)
        // console.log(randomArr)
        // 形成题目数组
        let arr = []
        randomArr.forEach(item => {
          arr.push(item.question)
        })
        console.log(arr)
        // 整理question数组格式
        arr.forEach(item => {
          // console.log(item)
          let title = item.title
          let answerList = [item.answerA, item.answerB, item.answerC, item.answerD] // 答案数组
          let rate = item.rate
          let right = item.rightAnswer
          let category = item.category
          // 将正确答案的ABCD转化为0123
          switch (right) {
            case 'A':
              right = 0
              break
            case 'B':
              right = 1
              break
            case 'C':
              right = 2
              break
            case 'D':
              right = 3
              break
          }
          let qObj = { title, answerList, rate, right, category }
          console.log(qObj)
          this.question.push(qObj)
        })
      }
      // console.log(res.data)
      // this.question = res.data.question
      // 整理答案数组
      // const questionList = []

      // 随机练习-将数组乱序
      // this.question = shuffle(this.question)
      // console.log(this.question)
    },
    // 保存错题到服务器
    async postWrongQuestion () {
      console.log(this.wrongQuestion)
      let res = await this.$http.post('/wrongquestion', { 'wrongQuestion': this.wrongQuestion, 'correctQuestion': this.correctQuestion })
      console.log(res)
    },
    async wrongQuestionHigh () {
      await this.$http.get('/choiceQuestion').then(res => {
        console.log(res)
        res.data.forEach(item =>
          this.wrongdataArr.push(item.question)
        )
        console.log(this.wrongdataArr)

        if (this.$route.params.id === '1') {
          // id:1
          let rateOne = this.wrongdataArr.filter(item => {
            return item.rate < 3
          })
          console.log(rateOne)
          rateOne.forEach(item => {
            // console.log(item)
            let title = item.title
            let answerList = [item.answerA, item.answerB, item.answerC, item.answerD] // 答案数组
            let rate = item.rate
            let right = item.rightAnswer
            let category = item.category
            // 将正确答案的ABCD转化为0123
            switch (right) {
              case 'A':
                right = 0
                break
              case 'B':
                right = 1
                break
              case 'C':
                right = 2
                break
              case 'D':
                right = 3
                break
            }
            let qObj = { title, answerList, rate, right, category }
            console.log(qObj)
            this.question.push(qObj)
          })
        } else if (this.id === '2') {
          // id:2
          let rateTwo = this.wrongdataArr.filter(item => {
            return item.rate < 4 && item.rate >= 3
          })
          console.log(rateTwo)
          rateTwo.forEach(item => {
            // console.log(item)
            let title = item.title
            let answerList = [item.answerA, item.answerB, item.answerC, item.answerD] // 答案数组
            let rate = item.rate
            let right = item.rightAnswer
            let category = item.category
            // 将正确答案的ABCD转化为0123
            switch (right) {
              case 'A':
                right = 0
                break
              case 'B':
                right = 1
                break
              case 'C':
                right = 2
                break
              case 'D':
                right = 3
                break
            }
            let qObj = { title, answerList, rate, right, category }
            console.log(qObj)
            this.question.push(qObj)
          })
        } else if (this.id === '3') {
          // id:3
          let rateThree = this.wrongdataArr.filter(item => {
            return item.rate <= 5 && item.rate >= 4
          })
          console.log(rateThree)
          rateThree.forEach(item => {
            // console.log(item)
            let title = item.title
            let answerList = [item.answerA, item.answerB, item.answerC, item.answerD] // 答案数组
            let rate = item.rate
            let right = item.rightAnswer
            let category = item.category
            // 将正确答案的ABCD转化为0123
            switch (right) {
              case 'A':
                right = 0
                break
              case 'B':
                right = 1
                break
              case 'C':
                right = 2
                break
              case 'D':
                right = 3
                break
            }
            let qObj = { title, answerList, rate, right, category }
            console.log(qObj)
            this.question.push(qObj)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.Reprint {
  .content {
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    transition: left 0.5s;
    .question {
      background: #fff;
      float: left;
      box-sizing: border-box;
      overflow: auto;
      padding: 30px 30px;
      height: 100vh;
      width: 100vw;
      .title {
        padding: 15px;
        font-size: 18px;
      }
      .answerlist {
        padding: 15px;
        .list-demo {
          display: flex;
          padding: 10px;
          align-items: center;
          .option {
            width: 35px;
            height: 35px;
            border: 1px solid #000;
            border-radius: 50%;
            text-align: center;
            line-height: 35px;
          }
          .answer {
            padding-left: 15px;
            font-size: 18px;
          }
        }
      }
    }
  }
}
.Reprint {
  .container {
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    transition: left 0.5s;
    background-color: #f1f0f5;
    height: 100vh;
    .box {
      background: #fff;
      float: left;
      box-sizing: border-box;
      overflow: auto;
      padding: 30px 30px;
      .list {
        .list-demo {
          display: flex;
          align-items: center;
          margin-top: 25px;
        }
        .option {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #dbdbdb;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 20px;
        }
        .right {
          background: green;
        }
        .wrong {
          background: pink;
        }
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 60px;
    align-items: center;
    text-align: center;
    background: #fff;
    div {
      width: 35%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}
</style>
