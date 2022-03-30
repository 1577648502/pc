<template>
  <div class="home">
     <!-- <el-button :plain="" @click="open2">成功</el-button> -->
       <el-header>
         
      <el-row class="home_title_title">
          <el-col :span="4"><div class="grid-content "><img src="../../public/logo.gif" alt=""></div></el-col>
          <el-col :span="8"><div class="grid-content  aaa"><el-input v-model="input" placeholder="请输入内容"></el-input></div></el-col>
          <el-col :span="1"><div class="grid-content "><el-button type="primary" icon="el-icon-search" @click="getseek()">搜索</el-button></div></el-col>
      </el-row>
  </el-header>
  <el-container class="container">
    <el-aside width="200px" class="container_left">
    <ul>
      <li v-for="i in this.GoodsCategoryList" :key="i.id" @click="sort(i)">{{i.name}}
      </li>
    </ul>
    </el-aside>
    <el-container class="container_r">
      <el-main>
        <p>{{name}}</p>
        <div v-for="(i) in Shopping" :key=i.id>
            <el-image :src="'http://127.0.0.1/Shopping/'+i.default_img"></el-image>
            <!-- 地址栏传递id -->
             <router-link :to="'/home/details/'+i.id">
            <h3>{{i.name}}</h3>
            </router-link>
            <span> ￥{{i.shop_price}}</span>
            <span>￥{{i.price}}</span>
            <a @click="collect(i)">收藏</a>
        </div>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>
<script>
export default {
   data() {
    return {
      input: '',
      GoodsCategoryList:[],
      Shopping:[],
      name:''
    }
  },
  created(){
     this.getGoodsCategory(),
      this.getShopping()
  },
  methods:{
       open2() {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        });
      },
       open4() {
        this.$message({
          showClose: true,
          message: '请登录',
          type: 'error'
        });
       },
      //  获取商品分类标签
      getGoodsCategory(){
        this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/product/classification',{})
        .then(res => {
          this.GoodsCategoryList=res.data.data
          console.log(res)
          // console.log();
        })
        .catch(err => {
          console.error(err); 
        })
      },
      // 获取所有商品
      getShopping(){
        this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/product/category',{categoryId:2})
        .then(res => {
          this.Shopping=res.data.data
          // this.id=this.Shopping[0].categoryId
          // this.id=this.getsort(this.Shopping[0].categoryId)1
          this.$store.state.id=res.data.data[0].productRelationList
          console.log(res.data.data[0].productRelationList)
        })
        .catch(err => {
          console.error(err); 
        })
      },
      getseek(){
        this.$axios.post('http://127.0.0.1/Shopping/api/v1/catalog/search/product',{"productName":this.input})
        .then(res => {
            this.Shopping=res.data.data.productList
            // console.log(Shopping)
        })
        .catch(err => {
          console.error(err); 
        })
      },
      //点击商品分类标签1
      sort(i){
          this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/product/category',{"categoryId":i.id})
        .then(res => {
          console.log(res);
           this.Shopping=res.data.data
           this.name=res.data.data.name
            this.getsort(i.id)
          console.log(res)
          // this.getsort(i)
        })
        .catch(err => {
          // console.error(res); 
        })
      },
      // getsort(i){
      //   this.$axios.post('/Shopping/api/v1/catalog/category',{"categoryId":i})
      //   .then(res => {
      //     this.name=res.data.name
      //     console.log(this.name)
      //   })
      //   .catch(err => {
      //     console.error(err); 
      //   })
      // },
      collect(i){
        this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/user/add/wishlist',{"productId":i.id,"userId":this.$store.state.loginId})
        .then(res => {
          if(this.$store.state.loginId==0){
            this.open4()
          }
          else{
            this.$store.state.collect=res.data.data.message
            console.log(i.id);
            console.log(this.$store.state.loginId)
            console.log(this.$store.state.collect)
            this.open2()
          }        
        })
        .catch(err => {
          console.error(err); 
        })
      }

  }
}
</script>

<style lang="scss">
.home_title{

  border-bottom:1px solid rgb(226, 226, 226);
  margin-bottom: 10px;
  div{
    float:right;
    span{
      padding: 5px;
      line-height: 50px;
    }
  }

}
.home_title_title{
    margin: 40px 0;
      border-bottom:1px solid rgb(226, 226, 226);
  img{
    width: 80%;
    // margin-right: 20px;
  }
  .aaa{
    width: 100%;
  }
}
.container{
  li{
    list-style: none;
    height: 40px;
    border-bottom: 1px solid rgb(231, 231, 231);
    text-align: left;
    font-size: 12px;
    line-height: 40px;
  }
  margin-top: 150px;
  .container_r{
    // width: 10%;
    div{
      display: flex;
      justify-content: space-between;
    }
  }
}
#app {
  width: 80%;
  margin: 0 auto;
  // background-color: #42b983;
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
