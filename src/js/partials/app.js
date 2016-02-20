console.log('in app.js');
var sliderCategories = (function(){

	var _insertValues = function($this, min, max){
		var container = $this.closest(".filter__slider"),
			from = container.find(".filter__slider_input_from"),
			to = container.find(".filter__slider_input_to");

		from.val(min);
		to.val(max);
	};

	return {
		init: function(){

			$(".filter__slider_element").each(function(){

				var $this = $(this),
					min = parseInt($this.data("min")),
					max = parseInt($this.data("max"));

				$this.slider({
					range: true,
					min: min,
					max: max,
					values: [min, max],
					slide: function(evt, ui) {
						var values = ui.values;
						_insertValues($this, values[0], values[1]);
					},
					create: function() {
						var values = $this.slider("option", "values");
						_insertValues($this, values[0], values[1]);
					}
				});
			});
		}
	}
}());


var categoriesSort = (function(){

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

var accordeon = (function(){
	var _openSection = function($this){
		var container = $this.closest(".filter__item"),
			content = container.find(".filter__content"),
			otherContant = $this.closest(".filter").find(".filter__content");

		if (!container.hasClass("active")){
			otherContant.slideUp().closest(".filter__item").removeClass("active");


			container.addClass("active");
			content.stop(true, true).slideDown();
		}else{
			container.removeClass("active");
			content.stop(true, true).slideUp();
		}
	}

	return {
		init: function(){
			$(".filter__title ").on("click", function(e){
				e.preventDefault();
				_openSection($(this));
			});
		}
	}
}());


	$(document).ready(function (){

		categoriesSort.init();
		accordeon.init();
		sliderCategories.init();

		$(".filter__reset").on("click", function(e){
		e.preventDefault();

		var $this = $(this),
			container = $this.closest(".filter__item"),
			checkboxes = container.find("input:checkbox");

		checkboxes.removeAttr("checked")
		});

		if ($(".filter__slider_element").length){
			sliderCategories.init();
		}

		if ($(".sort__select_element").length){
        $(".sort__select_element").select2({
            minimumResultsForSearch: Infinity
        });
    }


	});


