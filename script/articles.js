let ARTICLES = [
    {
        "title": "2024年，将Python项目发布到PyPI保姆级教程",
        "icon": "",
        "href": "../docs/common/pip/pip.html"
    },
    {
        "title": "【硬科普】存储卡、读卡器挑选指南",
        "icon": "",
        "href": "../docs/common/tfCard/tfCard.html"
    },
    
]

let ITEMS_PER_ROW = 4;
let DEFAULT_IMG = "../img/tech_article2.png"

function initArticlesGUI(){
    let articles_shelf = document.getElementById("articles_shelf");
    display_shelf(ARTICLES, articles_shelf, "../reader.html", "通用笔记")
}