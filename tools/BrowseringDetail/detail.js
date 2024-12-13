function loadDetail(){
    let detail_txt = document.getElementById("detail_txt");
    let text = "";
    text += `屏幕大小：${window.screen.width}x${window.screen.height}
    屏幕avail大小：${window.screen.availWidth}x${window.screen.availHeight}
    浏览器窗口尺寸：${window.innerWidth}x${window.innerHeight}

    系统颜色深度: ${window.screen.colorDepth}
    
    User Agent：${navigator.userAgent}
    浏览器语言: ${navigator.language}

    启用Cookies：${navigator.cookieEnabled}
    Do Not Track：${navigator.doNotTrack}

    电池信息：${navigator.getBattery ? 
        "\n电池电量：" + navigator.getBattery.level
        +"\n充电中：" + navigator.getBattery.charge
        : "无法获取"
    }

    支持触摸屏：${'ontouchstart' in window}
    
    `

    detail_txt.innerText = text;
}