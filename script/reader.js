function generate_toc(html){
    // 生成文章的目录。这个是那种比较简单的目录，不主动包含层级，而是按顺序的h1、h2等

}

function draw_toc(){
    let article = document.getElementById("app");  // todo: 可能以后要换掉底层库，ID就换成article吧
    let aa = article.querySelector("h1, h2, h3, h4, h5");
    console.log(aa);
    
}