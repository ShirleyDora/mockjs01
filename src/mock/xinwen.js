import Mock from 'mockjs'

//定义获取新闻列表
// Mock.mock('/api/get/news','get',()=>{
//     return{
//         status:200,
//         message:'获取新闻列表成功',
//         list:[
//             {
//                 "id":1,
//                 "title":"hello",
//                 "content":"你好呀",
//                 "img_url":"http://dummyimage.com/100*100/FFE485/fff&text=暂无图片",
//                 "add_time":"2020-07-15 11:12:37"
//             }      
//         ],
//         total: 50
//     }
// })//与json定义没有区别
var { newsList } = Mock.mock({
    'newsList|50-99': [
        {
            "id": "@increment()",
            "title": "@ctitle()",
            "content": "@cparagraph(5,15)",
            "img_url": "@image('20*20','#FF83FA','#FCFCFC','png','好')",
            "add_time": "@date(yyyy-MM-dd hh:mm:ss)"
        }
    ]
})
console.log(newsList)
//根据url获取query参数
const getQuery = (url, name) => {
    // console.log(url,name);
    const index = url.indexOf('?')
    // console.log(index)
    if (index !== -1) {
        //    const queryStr = url.substr(index+1);
        //    console.log(queryStr)
        const queryStrArr = url.substr(index + 1).split('&');
        //    console.log(queryStrArr)
        for (var i = 0; i < queryStrArr.length; i++) {
            const itemArr = queryStrArr[i].split('=');
            //    console.log(itemArr)
            if (itemArr[0] === name) {
                return itemArr[1]
            }
        }
    }
    return null;
}
//定义获取新闻列表的数据 /api/get/news?pageindex=1&pagesize=10
Mock.mock(/\/api\/get\/news/, 'get', (options) => {
    // console.log(options)
    //获取传递的参数pageindex
    const pageindex = getQuery(options.url, 'pageindex');
    //获取传递的参数pagesize
    const pagesize = getQuery(options.url, 'pagesize');
    // console.log(pageindex)
    // console.log(pagesize)
    //截取数据的起始位置
    const start = (pageindex - 1) * pagesize;
    //截取数据的终点位置
    const end = pageindex * pagesize;
    //计算总页数
    const totalPage = Math.ceil(newsList.length / pagesize);//向上取整
    // console.log(totalPage)
    //1 10 0-9
    //2 10 10-19
    //3 10 20-29
    //数据的起始位置；(pageindex-1)*pagesize 数据的结束位置；pageindex*pagesize ;slice方法不包含最后一个，所以不用减1
    // const list = newsList.slice(start,end)
    // console.log(list)
    const list = pageindex > totalPage ? [] : newsList.slice(start, end)
    // console.log(121221,list)
    return {
        status: 200,
        message: '获取新闻列表成功',
        list: list,
        total: newsList.length
    }
})
//定义添加新闻列表的数据
Mock.mock('/api/add/news', 'post', (options) => {
    console.log(options)
    const body = JSON.parse(options.body)
    console.log(body)
    newsList.push(
        Mock.mock({
            "id": "@increment()",
            "title": body.title,
            "content": body.content,
            "img_url": "@image('20*20','#FF83FA','#FCFCFC','png','好')",
            "add_time": "@date(yyyy-MM-dd hh:mm:ss)"
        })
    )
    return {
        status: 200,
        message: '添加成功',
        list: newsList,
        total: newsList.length
    }
})
//定义删除的接口
Mock.mock('/api/delete/news', 'post', (options) => {
    // console.log(options)
    const body =JSON.parse(options.body)
    // console.log(body)
    const index = newsList.findIndex(item=>{
        return item.id === body.id
    });
    // console.log(123,index)
    newsList.splice(index,1)
    return {
        status: 200,
        message: '删除成功',
        list: newsList,
        total: newsList.length
    }
})

