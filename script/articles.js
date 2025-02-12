let ARTICLES = [
    {
        "title": "2024年，将Python项目发布到PyPI保姆级教程",
        "icon": "",
        "href": ""
    },
    {
        "title": "JavaScript基础教程",
        "icon": "",
        "href": ""
    },
    {
        "title": "如何优化前端性能",
        "icon": "",
        "href": ""
    },
    {
        "title": "React 16的新特性",
        "icon": "",
        "href": ""
    },
    {
        "title": "如何优化前端性能",
        "icon": "",
        "href": ""
    },
    {
        "title": "React 16的新特性",
        "icon": "",
        "href": ""
    },
    // 添加更多文章...
]

let ITEMS_PER_ROW = 4;
let DEFAULT_IMG = "../img/tech_article2.png"

function initArticlesGUI(){
    let articles_shelf = document.getElementById("articles_shelf");
    display_shelf(ARTICLES, articles_shelf)
}