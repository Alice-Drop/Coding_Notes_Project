function initIndex(){
    let page1 = document.getElementById("page1");

    /*
        "anime-girls.jpg": "可爱！",
        "misty.jpg": "整体氛围气质不错"
    */

    page1.setAttribute("style", `
            background-image: url("img/bg/misty.jpg");
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

    
}