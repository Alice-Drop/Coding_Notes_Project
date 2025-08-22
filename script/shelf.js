function display_shelf_old(data, shelf_obj){
    // 把那些文章数据渲染到上面去

    let articles_shelf = shelf_obj;
    let row_count = 0;
    for (let i = 0; i< data.length; i++){
        if (i % ITEMS_PER_ROW === 0){
            var row = document.createElement("tr");
            articles_shelf.appendChild(row)
        }
        let item = data[i];
        let cell = document.createElement("td");
        cell.innerHTML = shelf_item_factory(item["title"], item["icon"], item["href"]);
        cell.classList.add("article_item")

        row.appendChild(cell)
    }
}

function display_shelf(data, shelf_obj, as_param=""){
    // 把那些文章数据渲染到上面去

    let articles_shelf = shelf_obj;
    console.log(data)
    articles_shelf.style.width = String(cal_shelf_width()+"px");
    if (data.length){
        let row = document.createElement("tr");
        articles_shelf.appendChild(row)
        for (let i = 0; i< data.length; i++){

            let item = data[i];
            let cell = shelf_item_factory(item["title"], item["icon"], item["href"], as_param);
            cell.classList.add("article_item")

            row.appendChild(cell)
        }
    }else{
        articles_shelf.appendChild(no_item_msg());
    }

    window.addEventListener("resize", ()=>{
        articles_shelf.style.width = String(cal_shelf_width()+"px");
    })

    
}

function shelf_item_factory(title, img, href, as_param=""){
    // 生成一个文章展示单元的DOM。
    // as_param如果被传入，则是打开as_param这个链接，把href作为参数传递给链接

    if (!img){
        img = DEFAULT_IMG;
    }
    if (as_param){
        href = `${as_param}?doc_href=${href}`;
    }
    let item = document.createElement("td");
    item.innerHTML =  `
        <img src="${img}" />
        <span>${title}</span>
        `
    item.addEventListener("click", function(){
        window.open(href, "_blank");
    })
    return item;
}

function no_item_msg(){
    // 如果没有可展示内容，则提示内容为空。

    let content = document.createElement("div");
    content.setAttribute("style", `
        border: 1px solid #ccc;
        border-radius: 15px;
        /*box-shadow: 1px 1px 2px #ccc;  */  
        padding: 45px;

    `);
    let para = document.createElement("p");
    para.innerText = "(´°Δ°`) 啊噢！还什么都没有呢！"
    content.appendChild(para)
    

    return content
}

function cal_shelf_width(){
    let viewportWidth = document.documentElement.clientWidth;
    let ITEM_WIDTH = 246;  // 单个article_item的宽度
    let SHELF_WIDTH_RATE = 0.7
    let theoryWidth = viewportWidth * SHELF_WIDTH_RATE  // 根据视口大小计算的shelf的理论值
    console.log(`理论值：${theoryWidth}`);
    
    let trueWidth = theoryWidth - theoryWidth % ITEM_WIDTH

    return trueWidth;
}