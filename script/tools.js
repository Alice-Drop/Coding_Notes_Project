// 目前已上传的工具的数据
let tools_list = [
    {
        title: "舒尔特方格 注意力训练",
        minimum_width: "350px",
        minimum_height: "660px",
        href: "http://schulte.alicedrop.site/",
        icon: "/img/tool_icon/SchulteGrid.jpg"
    },
    {
        title: "CSV表格在线查看与格式转换工具",
        minimum_width: "",
        minimum_height: "",
        href: "https://alicecsv.alicedrop.site/demo.html",
        icon: "/img/tool_icon/aliceCSV_demo.jpg"
    },
    {
        title: "浏览器状态详情",
        minimum_width: "",
        minimum_height: "",
        href: "/tools/BrowseringDetail/BrowseringDetail.html",
        icon: ""
    },

];

let ITEMS_PER_ROW = 4;
let DEFAULT_IMG = "../img/tech_article2.png"

function initToolsGUI(){
    // 所有书架展示样式的都交给shelf.js
    let tools_shelf = document.getElementById("tools_shelf");
    display_shelf(tools_list, tools_shelf);
}