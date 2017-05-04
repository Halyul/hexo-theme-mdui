window.addEventListener("load",function(){
    function doWork(){
        listens.forEach(function(value,index){
            value[1]();
            $(value[0]).removeClass("mdui-list-item-active");
        })
        let actionToc = (listens[listens.reduce(function(r,v,index){
            if(v[2] == true){
                return index;
            }
            else return r;
        },undefined)] || [])[0];
        actionToc.classList.add("mdui-list-item-active");
        showToc(actionToc);
    }
    function showToc(toc) {
        console.log(list.scrollTop);
    }
    var listens = [];
    var list = document.querySelector('ul.post-toc');
    var links = document.querySelectorAll(".post-toc-link");
    Array.prototype.forEach.call(links,function(value,index){
        var id = (value.getAttribute("href") || "#").slice(1);
        var element = document.getElementById(id);
        listens.push([value,function(){
            var readed = false;
            if ($(element).offset().top <= $("body").scrollTop() + $(element).height() + 64) {
                readed = true;
            } else {
                readed = false;
            }
            listens[index][2] = readed;
        },false])
    })
    doWork();
    window.addEventListener("scroll",doWork)
})
