let NOTES = [
    {
        "title": "Python要点笔记",
        "icon": "../img/language_icon/python.png",
        "href": "../docs/Python/pythonKeyNote.html"
    },
    {
        "title": "一次性搞懂fetch、promise、then、catch",
        "icon": "../img/language_icon/javascript.png",
        "href": "../docs/javascript/fetch_and_promise.html"
    },
    {
        "title": "规规矩矩应试C - C语言应试笔记",
        "icon": "../img/language_icon/c.svg",
        "href": "/docs/C/C_note_for_test.html"
    },
    {
        "title": "JavaScript入门",
        "icon": "../img/language_icon/javascript.png",
        "href": "../docs/javascript/JavaScript_Basic.html"
    },
    {
        "title": "git入门 - 有些呆板的笔记",
        "icon": "../img/language_icon/git.png",
        "href": "../docs/Git/git_note_1.html"
    }
    
]

function initNotesGUI(){
    let notes_shelf = document.getElementById("notes_shelf");
    display_shelf(NOTES, notes_shelf, "../reader.html");
}