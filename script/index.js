function initIndex(){
    let page1 = document.getElementById("page1");

    /*
        "anime-girls.jpg": "可爱！",
        "misty.jpg": "整体氛围气质不错"
    */

    page1.setAttribute("style", `
            background-image: url("img/bg/misty2.jpg");
            background-repeat: no-repeat;
            background-size: cover;
    `);

    let div_how_are_you = document.getElementById("div_how_are_you");
    div_how_are_you.setAttribute("style", 
        `
        font-size: 18px;
        color: black;
        `)

    let greeting = "";
    let time_now = new Date();
    if (time_now.getHours() < 11){
        greeting = "早上好呀\n今天想做点什么？";
    }else if (time_now.getHours() < 14){
        greeting = "中午好\n今天想做点什么？";
    }else if (time_now.getHours() < 18){
        greeting = "下午好\n今天想做点什么？"
    }else if (time_now.getHours() < 24){
        greeting = "晚上好\n今天想做点什么？"
    }

    let greeting_span = document.createElement("p");
    greeting_span.innerText = greeting;
    div_how_are_you.appendChild(greeting_span);

    let greet_sentences = [];  // 未来实现随机的greet

    load_new_things();
    
}

function load_new_things(){
    let new_things = document.getElementById("new_things");
    let new_docs_title = [
        {
            title: "【硬科普】存储卡、读卡器挑选指南",
            href: "../reader.html?doc_href=../docs/javascript/fetch_and_promise.html"
        },
        {
            title: "一次性搞懂fetch、promise、then、catch",
            href: "../reader.html?doc_href=../docs/javascript/fetch_and_promise.html"
        }
        
    ];

    for (let item of new_docs_title){
        if (item){
            new_things.appendChild(new_doc_item(item));
        };
    };
    /*
    new_things_placer.innerHTML = `
        <table id="new_things_placer">
            <tr>
                <td><img src="../img/tool_icon/SchulteGrid.jpg" height="45px"></td>
                <td><img src="../img/tool_icon/aliceCSV_demo.jpg" height="45px"></td>
                <td></td>
            </tr>

            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    `
    */
}

function new_doc_item(data){
    let title=data["title"], href=data["href"];
    let div = document.createElement("div");
    div.classList.add("NewDocItem");
    div.innerHTML = `<a href="${href}">${title}</a>`;

    return div;
}
