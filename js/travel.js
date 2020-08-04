; (function () {
         
    // 排序固定    
    // TravelSortFix();
    // function TravelSortFix() {
        let header = document.querySelector(".header");
        let travel_sort = document.querySelector("#travel_sort")
        function travel_sort_scrollHandler() {
            // if ((window.scrollY + header.offsetHeight) >= travel_sort.offsetTop) {
                travel_sort.classList.add("fix");
                travel_sort.style.top = header.offsetHeight + "px";
                document.querySelector("#replace").classList.add("col-3");
                travel_sort.classList.remove("col-3");
                //  $("#search").append("</div>");
            // } else {
            //     travel_sort.classList.remove("fix");
            //     document.querySelector("#replace").classList.remove("col-3");
            //     travel_sort.classList.add("col-3");
            //     travel_sort.style.top = 0 + "px";
            // }
        }
        travel_sort_scrollHandler();
        // window.addEventListener("scroll", travel_sort_scrollHandler);
    // }
    var i=0;
    //排序變化總版，注意JS.CSS不吃Hex碼
    $("body").on('click', "#travel_sort .sort li", function () {
        if (i==0) {    //第2n-1次點擊
            i++;
            // $(this).css('border-color') == 'rgb(255, 0, 0)'
            $(this).css('border-color', 'rgb(250, 225, 7)');
            $("#temp").remove();
            if($(this).attr('id')=="begin"){
                $(this).append("<span id='temp'>近－>遠</span>");
            }
            else if($(this).attr('id')=="end"){
                $(this).append("<span id='temp'>快－>慢</span>");
            }
            else if($(this).attr('id')=="site"){
                $(this).append("<span id='temp'>北－>南</span>");
            }
            else {
                $(this).append("<span id='temp'>高－>低</span>");
            }
        }
        else{        
            i--;   
            $(this).css('border-color', 'rgb(250, 225, 7)');    //第2*n次點擊
            $("#temp").remove();
            if($(this).attr('id')=="begin"){
                $(this).append("<span id='temp'>遠－>近</span>");
            }
            else if($(this).attr('id')=="end"){
                $(this).append("<span id='temp'>慢－>快</span>");
            }
            else if($(this).attr('id')=="site"){
                $(this).append("<span id='temp'>南－>北</span>");
            }
            else {
                $(this).append("<span id='temp'>低－>高</span>");
            }  


        }
        $(this).siblings().css('border-color', 'transparent');    //剔除未選取排序           
    })
    $("#travel_sort .sort li").eq(0).click();                               //預設熱門被選為排序
    

})(); 