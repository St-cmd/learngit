<template>
    <div>
        <Header title="我的资料"></Header>
        <div class="modelClass">
            <span>昵称：</span>
            <p class="userinfo">
                <span>{{username}}</span>
                <span class="symbol">&gt;</span>
            </p>
        </div>
        <div class="modelClass">
            <span>密码：</span>
            <p class="userinfo">
                <span>{{password}}</span>
                <span class="symbol">&gt;</span>
            </p>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header'
export default {
    components:{
        Header
    },
    data(){
        return {
            username:'123',
            password:'234'
        }
    }
}
</script>
<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .modelClass{
        padding:0 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        line-height: 50px;
        .userinfo{
            color: #666;
            .symbol{
                display: inline-block;
                margin-left: 10px;
            }
        }
    }
</style>