console.log('in app.js');

var ctegoriesSort = (function(){

    var _changeActiveClass = function($this){
        $this.closest(".categories__item, .nav__item").addClass("active")
            .siblings().removeClass("active");
    }

    return {
        init: function(){
            $(".categories__link, .nav__link").on("click", function(e){
                e.preventDefault();
                 _changeActiveClass($(this));
            });
        }
    }
}());


	$(document).ready(function (){

		ctegoriesSort.init();


	});


