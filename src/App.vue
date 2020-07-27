<template>
  <div id="app">
      <h4>新闻列表管理</h4>
      <div class="add">
        <input placeholder="请输入标题" v-model="title"/>
        <input placeholder="请输入内容" v-model="content"/>
        <button @click="add">添加</button>
      </div>
      <div class="news_list">
          <table width="1200" class="table" border>
            <tr>
              <th>图片</th>
              <th>标题</th>
              <th>内容</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="item in list" :key="item.id">
              <td>
                <img :src="item.img_url" alt="">
              </td>
              <td>
                {{item.title}}
              </td>
              <td>
                {{item.content}}
              </td>
              <td>
                {{item.add_time}}
              </td>
              <td>
                <button class="remove" @click="remove(item.id)">删除</button>
              </td>
            </tr>
           
          </table>
      </div>
      <div class="pages">
        <button @click="prevPage">上一页</button>
        <button @click="nextPage">下一页</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
   data(){
     return{
      title:'',
      content:'',
      list:[],
      pageindex:1
     }
   },
   created(){
     this.getNewsList()
   },
   methods: {
     add(){
       if(this.title.trim() === '' || this.content.trim() === '')
          return alert('请填写新闻标题和内容')
       console.log(this.title,this.content)
       axios.post('/api/add/news',{
         title:this.title,
         content:this.content
       }).then(res=>{
         console.log(res)
       })
     },
     remove(id){
       console.log(id)
       axios.post('/api/delete/news',{
         id
       }).then(res=>{
         console.log(res)
       })
     },
     //获取新闻数据
     getNewsList(){
       axios.get('/api/get/news',{
          params:{
            pageindex:this.pageindex,
            pagesize:10
          }
        }
       ).then(res=>{
        //  console.log(res)
        this.list = res.data.list;
        // console.log(121,this.list)
       })
     },
     nextPage(){
       this.pageindex++;
       this.getNewsList();
       
     },
     prevPage(){
       this.pageindex--;
       this.getNewsList();
     }
   }
}
</script>

<style lang="scss">
.news_list{
  width:1220px;
  height:495px;
  overflow-y:scroll;
  overflow-x:hidden;
  margin:10px;
}
table{
  border-collapse:collapse;
  border:1px solid #d3d3d3;
  color:#606060;
  border-radius: 5px;
  margin-top:10px;
  margin-bottom:10px;
  & th{
    font-size:16px;
    height:30px;
    font-weight: normal;
  }
  & td{
    font-size:12px;
    padding:5px;
    &:nth-child(4){
      width:150px;
    }
    &:nth-child(2){
      min-width:100px;
    }
  }
  & img{
    width:80px;
    height:80px;
  }
  & .remove{
    background:#f56c6c;
  }
}

</style>
