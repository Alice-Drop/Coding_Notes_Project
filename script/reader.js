function init_reader(){  // 默认是通过传参获得。
    let parms = new URLSearchParams(window.location.search);
    let doc_href = parms.get("doc_href");
    load_doc(doc_href);


}

function load_doc(url_doc){
    fetch(url_doc)
        .then(response=> response.text())
        .then(html => {
            document.getElementById("document_content").innerHTML = html;
            fix_src(url_doc)
            generate_toc();
        })
    
}

function fix_src(url){
    let base_url = url.slice(0, url.lastIndexOf("/") + 1)
    console.log(`base url为${base_url}`);
    

    let document_content = document.getElementById("document_content");
    let imgs = document_content.querySelectorAll("img");
    imgs.forEach((item) => {
        item.src = base_url + item.getAttribute("src");
    })
}

function generate_toc(){
    let document_content = document.getElementById("document_content");
    let document_toc = document.getElementById("document_toc");

    document.title = document_content.querySelector("h1, h2, h3, h4, h5, h6").innerText + " | " + PROJECT_NAME;
    
    let headings = document_content.querySelectorAll("h1, h2, h3, h4, h5, h6");
    // 由于文章是使用转换从docx转来的，没有id信息。为了实现跳转需要加上id。
    headings.forEach((item, index) => {
        let id = `heading_${index}`;
        item.setAttribute("id", id);
        let toc_item = document.createElement("p");
        toc_item.innerText = item.innerText
        toc_item.classList.add("tocItem_" + item.tagName)
        toc_item.id = "toc_"+id;
        toc_item.onclick = () => {
            console.log(`点击了${toc_item.id}`);
            
            scroll_to_heading(toc_item.id.slice(4,toc_item.id.length))
        }
        document_toc.appendChild(toc_item);
    });

}

function scroll_to_heading(heading_id){
    // 滚动到某个标题上
    let target_heading = document.getElementById(heading_id);
    console.log("试图滚动到"+ heading_id);
    
    target_heading.scrollIntoView(); // 之后可以考虑设置动画。

}



function testing_reader(){
    let testing_doc = "../docs/common/tf_card/tf_card.html";
    load_doc(testing_doc);

}

function test_fetch(){
    let testing_doc = "../docs/common/tf_card/tf_card.html";
    fetch(testing_doc)
        .then(response => {
            return response.text();
        })
        .then(html => {
            console.log(html)
        })
}
