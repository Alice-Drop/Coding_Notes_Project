function init_reader(){  // 默认是通过传参获得。
    let parms = new URLSearchParams(window.location.search);
    let doc_href = parms.get("doc_href");
    load_doc(doc_href);
    // set_scale();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   


}

let IS_MOBILE = false;

function set_scale(){
    // todo: 在初始化时，通过缩放来让整个网页宽度合适，这是对移动端适配设计错误的临时解决办法

    let vw = window.outerWidth;
    //document.documentElement.clientWidth;

    if (vw < NAV_MIN_WIDTH){
        let rate = vw / NAV_MIN_WIDTH;
        console.log(`正在调整文档内容：
            当前视口尺寸 ${vw}
            尝试缩放到${rate}

        `);
        //document.documentElement.style.transform = `scale(${rate})`;
        //document.documentElement.style.transformOrigin = 'top left';
        document.documentElement.style.zoom = `${rate*100}%`;
        IS_MOBILE = true;
        document.getElementById("help").innerText = rate;
    }
}

function load_doc(url_doc){
    fetch(url_doc)
        .then(response=> response.text())
        .then(html => {
            document.getElementById("document_content").innerHTML = html;
            fix_src(url_doc)
            generate_toc();
            add_parent_tag();
            scroll_change_control();
        })
    
}

function fix_src(url){
    let base_url = url.slice(0, url.lastIndexOf("/") + 1)
    console.log(`base url为${base_url}`);
    
    let imgs = document_content.querySelectorAll("img");
    imgs.forEach((item) => {
        item.src = base_url + item.getAttribute("src");
    })
}

function add_parent_tag(){
    // 给每个东西标注它属于哪个标题下

    let document_content = document.getElementById("document_content");
    let area_parent_id = ""
    for (let value of document_content.querySelectorAll("*")){
        //console.log("准备给这个添加所属标签：");
        //console.log(value);

        if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(value.tagName)){
            area_parent_id = value.id;
        }else{
            if (area_parent_id){
                value.classList.add("son_of_" + area_parent_id);
            }else {
                console.log("准备给这个添加所属标签：");
                console.log(value);
                console.log("当前没有所属父元素识别标签，无法标记。"); 
                // 注意，会识别到一些<meta name="viewport" content="width=device-width, initial-scale=1.0"> 之类的html头，
                // 这是正常的，因为document_content的内容是通过外部导入的，把导入的网站的这些信息也处理了。
                // 这个不影响使用，不管他，不过未来可以加个排除
            }
        }
    }
}

function adjust_doc_size(){
    // 调整document_content的位置、判断目录是否要默认收起等。首先，doc设置的宽度是60%，然后的话，

    window.addEventListener("resize", function(){
        let document_content = document.getElementById("document_content");
        let vw = document.documentElement.clientWidth;
        let vh = document.documentElement.clientHeight;
        
        // 如果视口宽度小于STD（300px）则文档占满宽度，否则不调整即保持60%
        if (vw <= DOC_CONTENT_STD_WIDTH){
            document_content.classList.add("mobile_style");
        }else {
            document_content.classList.remove("mobile_style");
        }
            
        // todo:如果放置好的document_content左侧的空间不足以放下toc，则toc默认折叠
        
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
        toc_item.classList.add("tocItem");

        toc_item.id = "toc_"+id;
        toc_item.onclick = () => {
            console.log(`点击了${toc_item.id}`);
            
            scroll_to_heading(toc_item.id.slice(4,toc_item.id.length))
        }
        document_toc.appendChild(toc_item);
    });
    window.current_heading = document_content.querySelector("h1,h2,h3,h4,h5,h6")

    

}

function scroll_to_heading(heading_id){
    // 滚动到某个标题上
    let target_heading = document.getElementById(heading_id);
    let document_content = document.getElementById("document_content")
    console.log("试图滚动到"+ heading_id);
    
    target_heading.scrollIntoView(); // 之后可以考虑设置动画。
    
    window.scrollBy(0, TOC_GOTO_MARGIN_TOP)
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

function toc_btn_onclicked(){
    let SRC_FOLDED = "./img/toc.svg";
    let SRC_UNFOLDED = "./img/toc_unfolded.svg"
    let img_toc_btn = document.getElementById("img_toc_btn");
    let document_toc = document.getElementById("document_toc");
    if (img_toc_btn.getAttribute("src") === SRC_FOLDED){
        img_toc_btn.setAttribute("src", SRC_UNFOLDED);
        document_toc.classList.remove("hidden");
    }else{
        img_toc_btn.setAttribute("src", SRC_FOLDED);
        document_toc.classList.add("hidden");
    }

    
    
    
}

function scroll_change_control(){
    // 监听滚动事件，用来控制toc的sticked，以及控制各种问题
    window.addEventListener("scroll", function(){
        toc_sticker();
        mark_first_observable_item();
    });
}


function toc_sticker(){
    let toc = document.getElementById("toc");

    // 如果在滚动的位置到上面了，就把布局改为fixed, top 70, left 0（也许也可以不为0，这个是以后美化要做的）；
    if (window.scrollY <= TOC_STICKED_Y){
        toc.classList.remove("sticked");
    }else {
        toc.classList.add("sticked");
    }
}


function mark_first_observable_item(){
    // 根据滚动，更新toc的当前内容
    let result = null;

    remove_toc_current_sign();
    
    let document_content = document.getElementById("document_content");
    let items = document_content.querySelectorAll("*");
    //console.log(items);
    
    let scroll_top = window.scrollY;

    for (let widget of items){
        let item_offset_top = widget.offsetTop;
        let item_offset_height = widget.offsetHeight;
        if (item_offset_top + item_offset_height > scroll_top){
            result = widget;
            break;
        }
    }
    if (result){ // 由于在文档背后加上了一个很长的留白来确保阅读滚动，需要使用这个来避免空白的屏幕没有东西
        if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(result.tagName)){
            let toc_current_heading = document.getElementById("toc_"+ result.id)
            toc_current_heading.classList.add("current_header");
        }else{
            for (let class_name of result.classList){
                
                if (class_name.startsWith("son_of_")){
                    let id = class_name.slice("son_of_".length)
                    console.log(id);
                    let toc_current_heading = document.getElementById("toc_"+ id)
                    toc_current_heading.classList.add("current_header");
                    break;
                }
            }
        }

    }


    //console.log("找到的内容：")
    //console.log(result)

}

function remove_toc_current_sign(){
    // 清除当前选中的toc
    let document_toc = document.getElementById("document_toc");
    let selected = document_toc.querySelectorAll(".current_header");
    selected.forEach((value)=>{
        value.classList.remove("current_header");
    })
}

function show_headings_offset(){
    let document_content = document.getElementById("document_content");
    let headings = document_content.querySelectorAll("h1, h2, h3, h4, h5, h6");
    for (let i =0; i< headings.length; i++){
        let hd = headings[i];
        console.log(hd)
        //console.log(hd.offsetTop)
        console.log(hd.getBoundingClientRect().top)
    }
}