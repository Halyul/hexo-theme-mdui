(function () {

    var items = document.querySelectorAll("#content-list .content-item");

    var list = document.querySelector(".posts-container");

    var columns = [document.createElement("div"), document.createElement("div"), document.createElement("div")];

    columns[1].classList.add("animate-else");

    var level = 4;

    var sm = 1;

    var column1Width = 600;

    var column2Width = 1024;

    list.innerHTML = "";

    function getColumnNums(){
        if(document.body.clientWidth <= column1Width) {
            return 1
        }
        if(document.body.clientWidth <= column2Width) {
            return 2
        }
        return 3
    }

    function updateList(){
        var ColumnNums = getColumnNums();
        if(level == ColumnNums) return;
        level = ColumnNums;
        list.setAttribute("class", "column-" + ColumnNums + " posts-container")
        Array.prototype.forEach.call(items, function (value,index) {
            var to = index % ColumnNums;
            columns[to].appendChild(value);
        })

        columns.forEach(function(value){
            list.appendChild(value)
        })
    }

    window.addEventListener("resize",updateList);

    updateList();

})()