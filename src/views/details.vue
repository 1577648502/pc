<template>
  <div>
      <div class="title">
          <h2>{{list.explain}}</h2>
      </div>
      <div class="container"> 
      </div>
      <div>
        <el-row>
            <el-col :span="16">
                <div class="container_container_lift-lift">
                            <div class="container_container_img">
                                <img :src="'http://127.0.0.1/Shopping/'+list.default_img" alt="">
                                </div>
                                <div class="container_container" >
                                        <div class="container_container_lift">
                                        <span>￥{{list.shop_price}}</span>
                                        <span>￥{{list.price}}</span>
                                        <i class="el-icon-burger"></i>
                                        </div>
                                <div>
                            <p>商品简介：</p>
                            </div>
                            <div class="container_container_lift-bottom">
                                <span>购买数量：<el-input-number v-model="num" :min="1" :max="99" label="描述文字"></el-input-number></span>
                            </div>
                            <button type="button" class="el-button el-button--warning"><span  @click="addShoppingche()">加入购物车</span></button>
                            <button type="button" class="el-button el-button--danger"><span>立即购买</span></button>
                </div>

                    <img :src="'https://api.pwmqr.com/qrcode/create/?url=https://172.18.72.14/home/details/'+this.list.id" alt="">


            </div>
        </el-col>
                <el-col :span="6">
                        <div>
                        <div class="container_container_r">
                            <p>热销商品</p>
                                <div class="container_container_r_r" v-for="i in hot" :key="i.id" @click="getCommodityDetails(i.id)">
                                        <img :src="'/Shopping/'+i.default_img" alt="">
                                        <div>
                                            <p>{{i.explain}}</p>
                                            <p>￥{{i.price}}</p>
                                            <p>市场价：{{i.shop_price}}</p>
                                        </div>
                                </div>
                            </div>
                        
                        </div>
                </el-col>
        </el-row>
      </div>
          <template>
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="商品描述" name="first">{{list.explain}}</el-tab-pane>
                    <el-tab-pane label="商品评论（）" name="second">配置管理</el-tab-pane>
                </el-tabs>
            </template>
  </div>
</template>

<script>




export default {
    data(){
        return{
            id:this.$route.params.id,
            list:[],
            num: 1,
            hot:[],
            activeName: 'first'
        }
    },
    created(){
        this.getCommodityDetails(parseInt(this.$route.params.id))
        this.getshoppingId()
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
        addShoppingche(){
            if(this.$store.state.loginId==0){
                   this. open4()
            }
            else{
                // console.log(this.list);
             this.$axios.post("http://127.0.0.1/Shopping/public/api/v1/order/addCart",{"userId":this.$store.state.loginId,"proId":this.list.id,"price":this.list.price,"quantity":this.num})
            .then(res => {
                if(res.data.errorCode==0){
                    console.log(res);
                    this. open2()
                    
                }
                // this.list=res.data.data
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
            }
        },
        getCommodityDetails(index){
           this.$axios.post("http://127.0.0.1/Shopping/public/api/v1/product/details",{"productId":index})
            .then(res => {
                console.log(res);
                this.list=res.data[0]
                console.log(this.list)
            })
            .catch(err => {
                console.error(err); 
            })
            //  this.$axios.post("/api/v1/user/footprint/add",{userId:this.$store.state.loginId,productId:index})
            // .then(res => {
            //     this.list=res.data.data
            //     // console.log(res)
            // })
            // .catch(err => {
            //     console.error(err); 
            // })
        },
        getshoppingId(){
            this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/product/getHotPro',{category_id:'1'})
            .then(res => {
                 this.hot=res.data.data
                console.log( this.hot)
            })
            .catch(err => {
                console.error(err); 
            })
            // for(var i=0;i<(this.$store.state.id).length;i++){
            //     // console.log(this.$store.state.id[i].id);
            //      this.$axios.post("/Shopping/api/v1/catalog/product/details",{"productId":this.$store.state.id[i].id})
            // .then(res => {
            //     // this.list=res.data.data
            //     if(res.data.data.hot==1){
            //         this.hot.push(res.data.data) 
            //         console.log(this.hot);
            //     }
            //     // console.log(res)
            // })
            // .catch(err => {
            //     console.error(err); 
            // })
            // }
        },


         handleClick(tab, event) {
        console.log(tab, event);
      },
      addShopping(){
          this.$axios.post("http://127.0.0.1/Shopping/api/v1/catalog/product/details",{"productId":index})
            .then(res => {
                this.list=res.data.data
                // console.log(this. list)
            })
            .catch(err => {
                console.error(err); 
            })
      },
       handleChange(value) {
        console.log(value);
      }
      
    }
}
</script>

<style lang="scss">
.container{
    display: flex;
    justify-content: space-between;
      
        }
        .container_container_r{
            text-align: left;
          img{
                 width:100%;
                float: left;
          }
          div{
              div{display: flex;
                flex-direction:column;
                
          }
          }
          .container_container_r_r{
              img{
                  float: left;
                  width: 30%;
              }
              p{
                  width: 100%;
              }
          }
        .container_container_img{
            float: left;
            width: 100%;
            border: 1px solid #ccc;
        }
        
    }
    .container_container_lift-lift{
            display: flex;
            justify-content: space-evenly;
        }
      

.container_container_lift-bottom{
    margin-bottom: 60px;
}

</style>