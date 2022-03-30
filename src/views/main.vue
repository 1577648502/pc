<template>

  <el-tabs v-model="activeName">

    <el-tab-pane label="我的购物车" name="shopping">
                  <div class="content shopCart">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/dashboard' }">产品</el-breadcrumb-item>
        <el-breadcrumb-item>购物车</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- Steps -->
    <div class="steps">
      <el-steps :active="1" align-center>
        <el-step title="购物车"></el-step>
        <el-step title="订单信息"></el-step>
        <el-step title="订单支付"></el-step>
        <el-step title="成功提交订单"></el-step>
      </el-steps>
    </div>
    <!-- table -->
    <div class="table">
      <el-table element-loading-text="正在为您拼命加载中..." :data="tableData" ref="multipleTable" style="width: 100%"
        @selection-change="handleSelectionChange" :close-on-click-modal="false" :close-on-press-escape="false"
        :header-cell-style="{background:'#f8f8f8',color:'#999'}">
        <el-table-column type="selection" width="75" align="center" />
        <el-table-column prop="shopImg" align="center" width="150" label="商品">
          <template slot-scope="scope">
            <img :src="'/Shopping/'+scope.row.default_img" style="width:100px ;" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center">
          <template slot-scope="scope">
            <span class="shop">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" align="center">
          <template slot-scope="scope">
            <span class="price">¥{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" align="center">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.quantity" oninput="value=value.replace(/[^\d]/g,'')" autocomplete="off" style="width:140px" size="mini"
              @change="handleInput(scope.row)">
              <el-button size="mini" slot="prepend" @click="del(scope.row)"><i class="el-icon-minus"></i></el-button>
              <el-button slot="append" size="mini" @click="add(scope.row)"><i class="el-icon-plus"></i></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="小计" align="center">
          <template slot-scope="scope">
            <span class="count">¥{{(scope.row.quantity)*(scope.row.price)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <i class="el-icon-delete" style="font-size:18px;cursor: pointer;" @click="handleDelete(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="submit">
          <p class="submitBar">
            <span>继续购物</span>
            <span>
              共 <b>{{tableData.length}}</b> 件商品,
            </span>
          </p>
        <el-button type="danger" @click="emptyShopping()">清空购物车</el-button>
        <el-button type="primary" @click="uptableData()">更新购物车</el-button>
        <el-button type="primary"  @click="dialogVisible = true">去支付</el-button>
        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
<!-- @click="payShopping() -->
        <el-dialog
          title="请选择支付方式"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>
            <el-radio v-model="radio" label="1">微信</el-radio>
            <el-radio v-model="radio" label="2">支付宝</el-radio>
          </span>
          <span slot="footer" class="dialog-footer">
              
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="payShopping()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
    </el-tab-pane>
    <el-tab-pane label="我的订单" name="first">   
     <template>
      <el-table
      :data="history"
        style="width: 100%">
        <el-table-column
          prop="order_num"
          label="订单编号"
          width="360">
        </el-table-column>
        <el-table-column
          prop="name"
          label="联系人姓名"
          width="360">
        </el-table-column>
        <el-table-column
          prop="mobile"
          width="360"
          label="联系人电话">
        </el-table-column>
        <el-table-column
          prop="note"
          label="订单状态">
        </el-table-column>
        <el-table-column
          prop="price"
          label="订单金额">
        </el-table-column>
      </el-table>
  </template>
    </el-tab-pane>
    <!-- <el-tab-pane label="常用收货地址" name="second">
       <template>
    <el-table
    :data="dzListOn"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="360">
      </el-table-column>
      <el-table-column
        prop="mobile"
        width="360"
        label="电话">
      </el-table-column>
       <el-table-column
        prop="address"
        width="360"
        label="地址">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deletedz(scope.$index, dzListOn)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-form>
      姓名：<el-input v-model="dzlist.name" style="width:46% ;"></el-input>
      电话：<el-input v-model="dzlist.mobile" style="width:47% ;"></el-input>
      地址：<el-input v-model="dzlist.address"></el-input>
      <el-button type="primary" @click="addDzlist()">保存</el-button>
    </el-form>
  </template>
    </el-tab-pane> -->
    <el-tab-pane label="我的收藏" name="third">
       
       
       <template>
    <el-table
    :data="collectList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="商品名称"
        width="860">
      </el-table-column>
      <el-table-column
        prop="price"
        label="市场价格"
        width="160">
      </el-table-column>
      <el-table-column
        prop="shop_price"
        width="160"
        label="店内价格">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, collectList)"
          type="text"
          size="small">
          删除
        </el-button>
        <el-button
          @click.native.prevent="getShopping(scope.$index, row)"
          type="text"
          size="small">
          查看
        </el-button>
      </template>
    </el-table-column>
    </el-table>
  </template>
    </el-tab-pane>
    <el-tab-pane label="个人设置" name="fourth">定时任务补偿</el-tab-pane>
    <el-tab-pane label="充值" name="fourthy">

    </el-tab-pane>
    <el-tab-pane label="我的足迹" name="fourthy1">

     <div v-for="i in footprint" :key="i.id">
       <img :src="'/Shopping'+i.default_img" alt="">
       <p>{{i.name}}</p>
       <span>现价：{{i.shop_price}}</span>
      <span>原价：{{i.price}}</span>
     </div>

    </el-tab-pane>
    <el-tab-pane label="发票抬头" name="fourthy2">
             <template>
    <el-table
    :data="fpListOn"
      style="width: 100%">
      <el-table-column
      prop="sfkt" :formatter="sfktFormate"
        label="企业/个人"
        width="160">
      </el-table-column>
      <el-table-column
        prop="i_name"
        width="160"
        label="抬头名称">
      </el-table-column>
       <el-table-column
        prop="i_identifier"
        width="160"
        label="识别号">
      </el-table-column>
       <el-table-column
        prop="i_bankname"
        width="160"
        label="开户银行">
      </el-table-column>
       <el-table-column
        prop="i_bankNo"
        width="160"
        label="银行账户">
      </el-table-column>
       <el-table-column
        prop="i_adress"
        width="160"
        label="企业地址">
      </el-table-column>
       <el-table-column
        prop="i_phone"
        width="160"
        label="企业电话">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deletefp(scope.$index, fpListOn)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-form>
      抬头名称:<el-input v-model="fplist.iname" style="width:45% ;"></el-input>
      识别号码:<el-input v-model="fplist.iidentifier" style="width:45% ;"></el-input>
      开户银行:<el-input v-model="fplist.ibankname" style="width:44% ;"></el-input>
      银行账号:<el-input v-model="fplist.ibankNo" style="width:46% ;"></el-input>
      企业地址:<el-input v-model="fplist.iadress" style="width:44% ;"></el-input>
      企业电话:<el-input v-model="fplist.iphone" style="width:46% ;"></el-input>
      <el-button type="primary" @click='getfplist()'>保存</el-button>
    </el-form>
  </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
    data(){
        return{
          history:[],
            radio: '1',
           dialogVisible: false,
             activeName: 'first',
             id:this.$route.params.name,
             collectList:[],
              shoppingId:[],
              list:[],
              tableData:[],
              totalPrice: 0,
              multipleSelection: [],
              footprint:[],
              fplist:{
                'userId':this.$store.state.loginId,
                //名称
                'iname':'',
                'iidentifier':'',
                'itype':'1',
                'ibankname':'',
                'ibankNo':'',
                'iadress':'',
                'iphone':'',
                'idefault':'1'
              },
              dzlist:{
                  'userId':this.$store.state.loginId,
                  'name':'',
                  'mobile':'',
                  "contactFlag":1,
                  'address':'',
              },
              fpListOn:[],
              dzListOn:[]
        }
    },
    created(){
        this.getAdmin(),
         this.getCollectShopping()
         this.gettableData()
         this.getfootprint()
         this.cxfp()
        //  this.getDzlist()1
         this.getHistory()
    },
    methods:{
      //获取历史订单
      getHistory(){
        this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/order/historyorders',{"userId":this.$store.state.loginId})
        .then(res=>{
          console.log(res);
          this.history=res.data.data
            console.log(this.history);
        })
      },
      //去支付
      payShopping(){
        this.$axios.post("http://127.0.0.1/Shopping/public/api/v1/order/pay",{  "userId":this.$store.state.loginId,"orderNum":this.tableData[0].order_num,"payType":this.radio})
        .then(res => {
          if(res.data.errorCode==0){
            this.open2()
            this.dialogVisible = false
            this.tableData=[]
          }
          console.log(res)

        })
        .catch(err => {
          console.error(err); 
        })
      },
      // //增加收获地址1
      // addDzlist(){
      //   this.$axios.post("/Shopping/api/v1/user/add/contect",this.dzlist)
      //   .then(res => {
      //     this.getDzlist()
      //     // console.log(res)
      //   })
      //   .catch(err => {
      //     console.error(err); 
      //   })
      // },
      // //获取收货地址1
      // getDzlist(){
      //   this.$axios.post('/Shopping/api/v1/contect',{"userId":this.$store.state.loginId})
      //   .then(res => {
      //     this.dzListOn=res.data.data.data
      //     // console.log(res)
      //   })
      //   .catch(err => {
      //     console.error(err); 
      //   })
      // },
      //删除发票
      deletefp(index,rows){
         this.$axios.post("http://127.0.0.1/Shopping/public/api/v1/user/invoice/remove",{userId:this.$store.state.loginId,id:rows[index].id})
         .then(res => {
           console.log(res)
         })
         .catch(err => {
           console.error(err); 
         })
         rows.splice(index, 1);
         console.log(rows[index]);
      },
      //删除地址
      deletedz(index,rows){
           this.$axios.post("http://127.0.0.1/Shopping/api/v1/user/remove/contect",{userId:this.$store.state.loginId,id:rows[index].id})
         .then(res => {
           console.log(res)
         })
         .catch(err => {
           console.error(err); 
         })
         rows.splice(index, 1);
         console.log(rows);
      },
      //发票判断个人企业
        sfktFormate(row) {
          if (row.i_type == 1) {
            return "个人";
          } else {
            return "企业";
          }
        },
      //发票抬头
      cxfp(){
        this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/user/invoice/search',{userId:this.$store.state.loginId})
        .then(res => {
          // console.log(res);
          this.fpListOn=res.data.data
          console.log(this.fpListOn);
        })
      },
      getfplist(){
        this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/user/invoice/add',this.fplist)
        .then(res =>{
          this.cxfp()
          // this.$set(this.fpListOn.push(this.fplist))
          console.log(this.fpListOn);
        })
      },
      //个人足迹
      getfootprint(){
        this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/user/footprint/get',{userId:this.$store.state.loginId})
        .then(res => {
          this.footprint=res.data.data.history
          console.log(res);
        })
      },
      //购物车列表
      gettableData(){
          this.$axios.post("http://127.0.0.1/Shopping/public/api/v1/order/getCart",{userId:this.$store.state.loginId})
          .then(res => {
            this.tableData=res.data.data
            console.log(this.tableData)
          })
          .catch(err => {
            console.error(err); 
          })
      },
      //更新购物车
      uptableData(){
        this.tableData.forEach(element => {
            this.$axios.post('http://127.0.0.1/Shopping/api/v1/cart/items/update',{"userId":this.$store.state.loginId,"orderItemList": [{"id": element.id,"productId":element.product_id,"quantity": element.quantity}]})
            .then(res => {
              // console.log(res)
            })
        .catch(err => {
          console.error(err); 
        })
          // console.log(element.quantity);
        });
      
      },
       getShopping(row) {
        this.$router.push("/Home/details/"+this.collectList[row].id);
      },
      //删除收藏
      deleteRow(index, row) {
         row.splice(index, 1);
        console.log(index);
        this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/user/remove/wishlist',{"id":this.shoppingId[index],"userId":this.$store.state.loginId})
          .then(res => {
            console.log(res);
            this.open2()
            // console.log(this.collectList[index])
               
          })
          .catch(err => {
            console.error(err); 
          })
         
      },
        getAdmin(){
          // console.log(this.id);
          this.activeName=this.id
        },
        // 获取商品收藏列表
        getCollectShopping(){
          this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/user/wishlist',{"userId":this.$store.state.loginId})
          .then(res => {
            console.log(res);
            for(var i=1;i<(res.data.wishlist).length;i++){
              console.log(i);
              // console.log(res.data.wishlist.data[i].name);
                this.collectList.push(res.data.wishlist[i])
                this.shoppingId.push(res.data.wishlist[i].id)
            }
            console.log(this.collectList)
            console.log(this.shoppingId)
          })
          .catch(err => {
            console.error(err); 
          })
        },
        // 删除
         handleDelete(index, row) {
        this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/order/removeCart',{"itemId": this.tableData[index].id,"orderNum": this.tableData[index].order_num})
        .then(res => {
         this.tableData.splice(index, 1);
         console.log(this.tableData[index])
         console.log(res);
         this.open2()
       })},
       emptyShopping(index){
         this.$axios.post('http://127.0.0.1/Shopping/public/api/v1/order/clearCart',{"orderNum": this.tableData[0].order_num})
         .then(res => 
         {
           this.tableData=[];
           console.log(res);
         })
         
       },
    handleInput(value) {
      console.log(value);
      if (null == value.number || value.number == "" || value.number == 0) {
        value.number = 1;
      }
      value.goodTotal = (value.number * value.price).toFixed(2);//保留两位小数
      //增加商品数量也需要重新计算商品总价
      this.handleSelectionChange(this.multipleSelection);
    },
    add(addGood) {
      addGood.quantity+1
      console.log(addGood.quantity++);
    },
    del(delGood) {
      if(delGood.quantity==1){
      }
      else{
          delGood.quantity--
      }
    },
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
      this.totalPrice = 0;
      //此处不支持forEach循环，只能用原始方法了
      for (var i = 0; i < selection.length; i++) {
        //判断返回的值是否是字符串
        if (typeof selection[i].goodTotal == 'string') {
          selection[i].goodTotal = parseInt(selection[i].goodTotal);
        };
        this.totalPrice += selection[i].goodTotal;
      }
    },
         open2() {
        this.$message({
          showClose: true,
          message: '成功',
          type: 'success'
        });
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
}
</script>

<style>

</style>