function init_reader(){  // 默认是通过传参获得。
    let parms = new URLSearchParams(window.location.search);
    let doc_href = parms.get("doc_href");
    load_doc(doc_href);
    set_scale();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   


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
    // 给每个东西
    let document_content = document.getElementById("document_content");
    let area_parent_id = ""
    document_content.querySelectorAll("*").forEach((value)=>{
        if (value.classList.contains("tocItem")){
            area_parent_id = value.id;
        }else{
            if (area_parent_id){
                value.classList.add("son_of_"+area_parent_id);
            }
        }
    })
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

function update_current_heading(){
    let scrollY = window.scrollY + TOC_SELECTED_TOP_AGNORE;
    let document_content = document.getElementById("document_content");
    let headings = document_content.querySelectorAll("h1, h2, h3, h4, h5, h6");
    
    let current_widget = document_content.elementsFromPoint(10,10)[0];
    /*
    for (let i =0; i< headings.length; i++){
        let hd = headings[i];
        // 采用检测相对于文档的方式。不太好。
        /*if (hd.offsetTop <= scrollY){
            console.log(`检测到超出${scrollY}, 元素值为${hd.offsetTop}`)
            console.log();
            
            current_heading = headings[i];
            
        }else{
            break;
        }*/

        // 检测相对于视口的位置，如果某个离视口顶部在[50,100]之间，就选择他（第一个）
        /*
        let to_vtop = hd.getBoundingClientRect().top;
        if ((to_vtop>TOC_SELECTED_RANGE_0)&&(to_vtop<TOC_SELECTED_RANGE_1)){
            window.current_heading = hd;
            break;
        }*/

        
    console.log(current_widget);
    
        
    
    
    console.log(window.current_heading);
    remove_toc_current_sign();

    
}

function mark_first_observable_item(){
    let result = null;

    remove_toc_current_sign();
    
    let document_content = document.getElementById("document_content");
    let items = document_content.querySelectorAll("h1, h2, h3, h4, h5, h6");
    console.log(items);
    
    let scroll_top = window.scrollY;

    for (let widget of items){
        let item_offset_top = widget.offsetTop;
        let item_offset_height = widget.offsetHeight;
        if (item_offset_top + item_offset_height > scroll_top){
            result = widget;
            break;
        }
    }

    let toc_current_heading = document.getElementById("toc_"+ result.id)
    toc_current_heading.classList.add("current_header");

    console.log("找到的内容：")
    console.log(result)

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