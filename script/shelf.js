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

function display_shelf(data, shelf_obj){
    // 把那些文章数据渲染到上面去

    let articles_shelf = shelf_obj;
    let row_count = 0;
    let row = document.createElement("tr");
    articles_shelf.appendChild(row)
    for (let i = 0; i< data.length; i++){

        let item = data[i];
        let cell = document.createElement("td");
        cell.innerHTML = shelf_item_factory(item["title"], item["icon"], item["href"]);
        cell.classList.add("article_item")

        row.appendChild(cell)
    }
}

function shelf_item_factory(title, img, href){
    // 生成一个文章展示单元的DOM。
    if (!img){
        img = DEFAULT_IMG;
    }
    let content =  `
        <img src="${img}" />
        <a href="${href}" target="_blank">${title}</a>
        `
    return content
}