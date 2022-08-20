//需要将所有的dom元素和相关的资源全部加载完毕之后再来实现的事件函数
window.onload = function(){
    //声明一个记录点击的缩略图下标
    var bigimgIndex = 0;

    //路径导航的数据渲染
    function navPathDataBind(){
        /*
     1.先获取路径导航的页面元素(navPath)
     2.获取所需要的数据
     3.由于数据是动态产生的,那么相应的dom元素也应该是动态产生的,含义需要创建dom元素,根据数据数量创建dom元素
     4.再遍历数据创建dom元素的最后一条,只创建a标签,而不创建i标签
   */

     //1
     var navPath = document.querySelector('#wrapper #content .contentMain #navPath');
     //2
     var path = goodData.path;
    //  console.log(path);
     //3
     for(var i=0;i<path.length;i++){
         if(i==path.length - 1){
                var aNode = document.createElement('a');
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
         }else{
                //4
                var aNode = document.createElement('a');
                aNode.href = path[i].url;
                aNode.innerText = path[i].title;
                //5
                var iNode = document.createElement('i');
                iNode.innerText = '/';
                //6
                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
                }
     }
    }
    navPathDataBind();

    //放大镜的移入移出
    function bigClassBind(){
        /*
        1.获取小图框元素对象,并且设置移入事件(onmouseover,onmouseenter)
        2.动态创建蒙版元素以及大图框和大图片元素
        3.移出时移除蒙版元素和大图框
        */ 
       var smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic');
       var leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop');
       var imagessrc = goodData.imagessrc;
       smallPic.onmouseenter = function(){
           console.log(11);
           var maskDiv = document.createElement('div');
           maskDiv.className = 'mask';

           var bigPic = document.createElement('div');
           bigPic.id = 'bigPic';

           var bigImg = document.createElement('img');
           bigImg.src = imagessrc[bigimgIndex].b;

           bigPic.appendChild(bigImg);
           smallPic.appendChild(maskDiv);
           leftTop.appendChild(bigPic);

        //移动事件   
        smallPic.onmousemove = function(event){
            //鼠标点距离浏览器event.clientX
            //小图框距离浏览器getBoundingClientRect().left
            //蒙版元素宽maskDiv.offsetWidth
            var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth/2 ;
            var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight/2 ;
            
            if(left<0){
                left = 0;
            }else if(left > smallPic.clientWidth - maskDiv.offsetWidth){
                left = smallPic.clientWidth - maskDiv.offsetWidth+'px';
            }

            if(top<0){
                top = 0;
            }else if(top > smallPic.clientHeight - maskDiv.offsetHeight){
                top = smallPic.clientHeight - maskDiv.offsetHeight;
            }
           
           
            maskDiv.style.left = left +'px';
            maskDiv.style.top = top +'px';


            var scale = (smallPic.clientWidth - maskDiv.offsetWidth)/(bigImg.offsetWidth-bigPic.clientWidth);
            bigImg.style.left = -left/scale + 'px';
            bigImg.style.top = -top/scale + 'px';
        }


        //移出
        smallPic.onmouseleave = function(){
            smallPic.removeChild(maskDiv);
            leftTop.removeChild(bigPic);
           }
           
       } 
      
    }
    bigClassBind();


    //动态渲染放大镜缩略图
    function thumonailDate(){
    /*
      1.获取picList中的ul
      2.获取data.js文件下的goodData->imagessrc
      3.遍历数组,根据数组长度来创建li元素
    */   
     var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #picList ul');
     var imagessrc = goodData.imagessrc;
     for(var i=0;i<imagessrc.length;i++){
         var newLi = document.createElement('li');
         var newImg = document.createElement('img');
         newImg.src = imagessrc[i].s;
         newLi.appendChild(newImg);
         ul.appendChild(newLi);

     }
    }
    thumonailDate();

    //点击缩略图的效果
    function thumonailClick(){
      /*
         1.获取li元素，循环发生点击事件
         2.点击缩略图需要确定其下标位置
         3.
      */
       var smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img') 
       var liNode = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #picList ul li');
       var imagessrc = goodData.imagessrc;
       smallPic_img.src = imagessrc[0].s;
       for(var i = 0;i<liNode.length;i++){
           liNode[i].index = i;
           liNode[i].onclick = function(){
               var idx = this.index;
               bigimgIndex = idx;

               smallPic_img.src = imagessrc[idx].s;
    
           }
       }
    }
    thumonailClick();

    //缩略图轮播图
    function thumonailLeftClick(){
    /*
      1.获取左右两端的箭头按钮
      2.再获取可视的div以及ul元素和所有的li
      3.计算
      4.发生点击事件
    */   
     var prev = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.prev');
     var next = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.next');
     
     var picList = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #picList');
     var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #picList ul');
     var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #picList ul li');
     
     var start = 0;
     var step = (liNodes[0].offsetWidth + 20)*2;
     var end = (liNodes.length -5)*(liNodes[0].offsetWidth+20);
     prev.onclick = function(){
        start-=step;
        if(start<0){
            start = 0;
        }
        ul.style.left = -start +'px';
    }
     next.onclick = function(){
         start+=step;
         if(start >end){
             start = end;
         }
         ul.style.left = -start +'px';
     }
    }
    thumonailLeftClick();

    //商品详情数据的动态渲染
    function rightTopData(){
      /*
         1.查找rightTop元素
         2.查找数据
         3.建立一个字符串变量,将原来的布局结构贴进来
         ES6中模板字符串 替换数据${变量}
      */    
     var rightTop = document.querySelector('#wrapper #content .contentMain #center .right .rightTop');
     var goodsDetail = goodData.goodsDetail;
     var s = `<h3>${goodsDetail.title}</h3>
              <p>${goodsDetail.recommend}</p>
             <div class="priceWrap">
                 <div class="priceTop">
                    <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                     <div class="price">
                      <span>￥</span>
                      <p>${goodsDetail.price}</p>
                      <i>降价通知</i>
                 </div>
                 <p>
                     <span>累计评价</span>
                     <span>${goodsDetail.evaluateNum}</span>
                 </p>
               </div>
                <div class="priceButtom">
                    <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                        <p>
                          <span>${goodsDetail.promoteSales.type}</span>
                          <span>${goodsDetail.promoteSales.content}</span>
                        </p>
                </div>
             </div>
            <div class="support">
                    <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                    <p>${goodsDetail.support}</p>
            </div>
            <div class="address">
                    <span>配&nbsp;送&nbsp;至</span>&nbsp;&nbsp;
                    <p>${goodsDetail.address}</p>
            </div>`;
            //重新渲染
            rightTop.innerHTML = s;
    }
    rightTopData();
     
    //商品参数数据动态渲染
    function rightBottomData(){
     /*
       1.找元素对象
       2.查找数据crumbData数据
       3.遍历,有一个元素,需要有一个动态dl元素对象(dt/dd)
     */
    var chooseWrap = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap');
    var crumbData = goodData.goodsDetail.crumbData;
    for(var i = 0;i<crumbData.length;i++){
        var dlNode = document.createElement('dl');

        var dtNode = document.createElement('dt');
        dtNode.innerText = crumbData[i].title;
        dlNode.appendChild(dtNode);

        for(var j=0;j<crumbData[i].data.length;j++){
            var ddNode = document.createElement('dd');
            ddNode.innerText = crumbData[i].data[j].type;
            ddNode.setAttribute('price',crumbData[i].data[j].changePrice);

            dlNode.appendChild(ddNode);

        }
        chooseWrap.appendChild(dlNode); 
    }
    }
    rightBottomData();

    //点击商品参数颜色
    function clickddBind(){
    /*
    获取所有的dl元素,取其中第一个dl元素下的所有dd先做测试
    循环所有的dd元素,并添加点击事件
    确定实际发生事件的目标源对象,然后给其他所有的元素都重置为基础颜色
    */    
     var dlNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap dl')
     var arr = new Array(dlNodes.length);
     var choose = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .choose');
     //数组填充值
     arr.fill(0);
     for(var i=0;i<dlNodes.length;i++){
        (function(i){
            var ddNodes = dlNodes[i].querySelectorAll('dd');
            for(var j=0;j<ddNodes.length;j++){
                ddNodes[j].onclick = function(){
                    //清空choose
                    choose.innerHTML = '';



                    for(var k=0;k<ddNodes.length;k++){
                        ddNodes[k].style.color = '#666';
                    }
                     this.style.color = '#cc1122';    


                //点击dd元素动态产生新的mark
                /*
                  创建可以容纳点击dd元素值的容器(数组),确定数组起始长度
                  将点击dd元素的值按照对应下标来写入到数组的元素身上
                */
                  arr[i] = this;
                  changePriceBind(arr);

                  //遍历arr数组，将非0元素的值写入到mark标记
                  arr.forEach(function(value,index){
                         //只要是为真的条件，咱们就动态的来创建mark标签
                         if(value){
                              //创建div元素
                              var markDiv = document.createElement('div');
                              //并且设置class属性
                              markDiv.className = 'mark';
                              //并且设置值
                              markDiv.innerText = value.innerText;
                              //创建a元素
                              var aNode = document.createElement('a');
                              //并且设置值
                              aNode.innerText = 'X';
                              //设置下标
                              aNode.setAttribute('index',index);
                              //让div追加a 
                              markDiv.appendChild(aNode);

                              //让choose元素追加div
                              choose.appendChild(markDiv);

                    }
                })

                //获取所有的a标签元素,并循环发函俄国点击事件按
                var aNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .choose .mark a');
                for(var n=0;n<aNodes.length;n++){
                    aNodes[n].onclick = function(){
                        //获取点击标签的index
                        var idx1 = this.getAttribute('index');
                        arr[idx1] = 0;
                        var ddlist = dlNodes[idx1].querySelectorAll('dd');
                        for(var m=0;m<ddlist.length;m++){
                            ddlist[m].style.color = '#666';
                        } 
                        ddlist[0].style.color='red';

                        //删除
                        choose.removeChild(this.parentNode)
                        //调用价格函数
                        changePriceBind(arr);
                    }
                }
                }
            }
        })(i)
        
     }
    
    }
    clickddBind();


    //价格变动，点击dd时才调用
    function changePriceBind(arr){
      /*
         获取价格标签元素
         dd标签身上变化价格属性
         遍历arr，新变化加老的,再渲染
      
      */
     var oldPrice = document.querySelector('#wrapper #content .contentMain #center .right .rightTop .priceWrap .priceTop .price p');
    //  取出默认价格
    var price = goodData.goodsDetail.price;
     for(var i=0;i<arr.length;i++){
       if(arr[i]){
           //数据类型的强制转换
           var changePrice = Number(arr[i].getAttribute('price'));
           price = price + changePrice;
        }
     }
     oldPrice.innerText = price;


     //将变化后的写入左侧标签
     var leftPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');
     leftPrice.innerText = '￥'+price;

     //遍历查看是否有选中的
     var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input')
     var newPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');
     for(var j=0;j<ipts.length;j++){
         if(ipts[j].checked){
             price+=Number(ipts[j].value);
         }
     }
     newPrice.innerText = '￥'+price;
    
    }


    //选择搭配中间区域复选框选中价格变动
    function chooseprice(){
      /*
         获取中间区域所有复选框元素
         遍历元素取出价格进行累加
      */
       var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input')
       var leftPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');
       var newPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');
       for(var i=0;i<ipts.length;i++){
           ipts[i].onclick = function(){
               var oldprice= Number(leftPrice.innerText.slice(1));
               for(var j=0;j<ipts.length;j++){
                   if(ipts[j].checked){
                        oldprice =oldprice +Number(ipts[j].value);
                   }
               }
              newPrice.innerText = '￥'+ oldprice;
           }
       }
    }
    chooseprice();

    //封装一个公共的选项卡函数
    /*
     被点击的元素tabBtns
     被切换的元素tabConts
    
    */
    function Tab(tabBtns,tabConts){
       for(var i=0;i<tabBtns.length;i++){
           tabBtns[i].index = i;
           tabBtns[i].onclick = function(){
               for(var j=0;j<tabBtns.length;j++){
                   tabBtns[j].className = '';
                   tabConts[j].className = '';
               }
               this.className = 'active';
               tabConts[this.index].className = 'active';
           }
       }
    }


    //点击左侧选项卡
    function leftTab(){
        var h4s = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4');
        var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideBottom>div');
        Tab(h4s,divs); 

    }
    leftTab();

    //点击右侧选项卡
    function rightTab(){
         var lis  = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .bottomDetail .tabBtns li');
         var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .bottomDetail .tabContents div');
         Tab(lis,divs); 
        }
    rightTab();


    //右边侧边栏点击
    function rightAsideBind(){
      /*
        获取按钮元素发生点击事件
      */
     var btns = document.querySelector('#wrapper .rightAside .btns');
     var rightAside = document.querySelector('#wrapper .rightAside')
     //记录初始状态
     var flag = true;
     btns.onclick = function(){
       //判断
       if(flag){
           btns.className = 'btns btnsOpen';
           rightAside.className ='rightAside asideOpen';
       }else{
            btns.className = 'btns btnsClose';
            rightAside.className ='rightAside asideClose';
       }
       flag = !flag;
     }
    }
    rightAsideBind();
    
}