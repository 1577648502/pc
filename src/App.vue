<template>
  <div id="app">
    <el-container>
      <el-header class="home_title">
        <div v-if="!this.$store.state.loginId">
          <span
            ><router-link to="/home"
              ><el-link href="" target="_blank" :underline="false"
                >首页</el-link
              ></router-link
            ></span
          >
          <span
            ><router-link to="/home/signin"
              ><el-link href="" target="_blank" :underline="false"
                >注册</el-link
              ></router-link
            ></span
          >
          <span
            ><router-link to="/home/login"
              ><el-link href="" target="_blank" :underline="false"
                >登录</el-link
              ></router-link
            ></span
          >
        </div>
        <div v-else>
          <el-menu class="el-menu-demo" mode="horizontal">
            <router-link to="/home"><template>首页</template></router-link>
            <el-submenu index="2">
              <template slot="title"
                >欢迎{{ this.$store.state.loginId }}</template
              >
              <template slot="title">会员中心</template>
              <router-link to="/home/main/shopping">
                <el-menu-item index="2-1">购物车</el-menu-item>
              </router-link>
              <router-link to="/home/main/first">
                <el-menu-item index="2-1">订单历史</el-menu-item>
              </router-link>
              <router-link to="/home/main/third">
                <el-menu-item index="2-2">收藏夹</el-menu-item>
              </router-link>
              <router-link to="/home/main/second">
                <el-menu-item index="2-3">常用联系人</el-menu-item>
              </router-link>
              <router-link to="/home/main/fourth">
                <el-menu-item index="2-4">个人设置</el-menu-item>
              </router-link>
              <router-link to="/home/main/fourthy">
                <el-menu-item index="2-5">充值</el-menu-item>
              </router-link>
              <router-link to="/home/main/fourthy1">
                <el-menu-item index="2-6">我的足迹</el-menu-item>
              </router-link>
              <router-link to="/home/main/fourthy2">
                <el-menu-item index="2-6">发票抬头</el-menu-item>
              </router-link>
              <router-link to="/home/main/fourthy">
                <el-menu-item index="2-6">退出</el-menu-item>
              </router-link>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
    </el-container>
    <router-view />
    <footer id="footer">
      <div class="text-center">
        <p style="font-size: 14px; color: #fff; padding-top: 30px">
          全国高职院校Web应用软件开发技能竞赛
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
#footer {
  background-color: #555555;
  height: 80px;
  width: 100%;
}
.home_title {
  border-bottom: 1px solid rgb(226, 226, 226);
  margin-bottom: 10px;
  div {
    float: right;
    span {
      padding: 5px;
      line-height: 50px;
    }
  }
}
.home_title_title {
  margin: 40px 0;
  border-bottom: 1px solid rgb(226, 226, 226);
  img {
    width: 80%;
    // margin-right: 20px;
  }
  .aaa {
    width: 100%;
  }
}
.container {
  li {
    list-style: none;
  }
  margin-top: 150px;
  .container_r {
    // width: 10%;
    div {
      display: flex;
      justify-content: space-between;
    }
  }
}
#app {
  width: 80%;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
