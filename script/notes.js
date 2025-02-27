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
]

function initNotesGUI(){
    let notes_shelf = document.getElementById("notes_shelf");
    display_shelf(NOTES, notes_shelf, "../reader.html");
}