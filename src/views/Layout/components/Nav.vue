<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const confirm = () => {
  console.log('用户要退出登录了');
  // 退出登录业务逻辑实现
  // 1.清除用户信息 触发action
  userStore.clearUserInfo()
  // 2.跳转到登录页
  router.push('/login')
}

</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="true">
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-user">周杰伦</i>
            </a>
          </li>
          <li>
            <el-popconfirm title="确认退出吗" confirm-button-text="确认" cancel-button-text="取消">
              <!--插槽reference： 触发 Popconfirm 显示的 HTML 元素-->
              <template #reference>
                <a href="javascript:;" @click="confirm">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="/checkout">我的订单</a></li>
          <li><a href="/member">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style lang='scss' scoped>
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }
    }
    
    ~li {
      a {
        border-left: 2px solid #666;
      }
    }
  }
}
</style>