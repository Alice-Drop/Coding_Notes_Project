function initGUI(){
    // 在onload时为网页加上标题栏内容和底部栏内容
    drawTitleBar();
    drawPageTail();
}


function drawTitleBar(){
    let nav = document.getElementById("nav");
    nav.innerHTML = `        
        <div id="container" style="margin: 0 auto;display:flex; justify-content:space-between; width:80%;">    
            <span><img src="../../img/flower_icon.png" alt="icon " height="22px" style="margin:0 5px;"></span>
            <span ><a href="/index.html" class="navLink">AliceDrop的笔记共享</a></span>

            <span class="navLinkContanier_right">
                <a href="/qt.html" class="navLink">通用</a>
            
                <a href="/.html" class="navLink">编程语言笔记</a>

                <a href="/tools.html" class="navLink">在线小工具</a>
            </span>
        </div>
    `

}

function drawPageTail(){
    let page_tail = document.getElementById("pageTail");
    page_tail.innerHTML = `<p>©Copyright AliceDrop 2024  网页源码受<a></a>保护。</p>
            <p>本项目为个人项目,如果喜欢本网站，请给<a class="paraLink" href="https://github.com/Alice-Drop/Coding_Notes_Project">本项目</a>一个star，谢谢！</p>
`
}