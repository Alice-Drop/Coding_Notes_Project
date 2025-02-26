const LINKS = {
    "通用": "articles.html",
    "编程语言笔记": "notes.html",
    "在线小工具": "./tools.html"
}


function initBasicGUI(){
    // 在onload时为网页加上标题栏内容和底部栏内容
    drawNav();
    drawPageTail();
}


function drawNav(){
    let nav = document.getElementById("nav");
    nav.innerHTML = `        
    
        <div id="navItemPlacer" style="margin: 0 auto;display:flex; justify-content:space-between;align-items:center; width:80%;">    
            <img src="../../img/flower_icon.png" alt="icon " height="22px" style="margin:0 5px;">
            <a href="/index.html" class="navLink">AliceDrop知识库共享</a>

            <span class="navLinkContanier_right">
                <a href="${LINKS["通用"]}" class="navLink">通用</a>
            
                <a href="${LINKS["编程语言笔记"]}" class="navLink">编程语言笔记</a>

                <a href="${LINKS["在线小工具"]}" class="navLink">在线小工具</a>
            </span>
        </div>
    `

}

function drawPageTail(){
    let page_tail = document.getElementById("pageTail");
    page_tail.innerHTML = `<p style="font-size:15px;">© Copyright AliceDrop 2024-2025 网页内容受 <a href="https://github.com/Alice-Drop/Coding_Notes_Project/blob/main/LICENSE">CC BY-NC</a> 协议保护。</p>
   
    <p style="font-size:15px;">本项目为个人项目，如果喜欢本网站，可以给 <a href="https://github.com/Alice-Drop/Coding_Notes_Project" target="_blank">本项目</a> 一个star</p>
`
}