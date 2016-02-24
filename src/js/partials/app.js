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


var viewStateCange = (function(){

		var _previousClass = "";
		var _changeState = function($this){
				var item = $this.closest(".sort__view_item"),
						view =  item.data("view"),
						listOfItems = $("#products__list"),
						modificationPrefix = "products__list_",
						classOfViewState = modificationPrefix +  view;

				if ("_previousClass" == ""){
						_previousClass.list = listOfItems.attr("class");
				}
				_changeActiveClass($this);
				listOfItems.attr("class",  _previousClass + " " + classOfViewState);

		}

		var _changeActiveClass = function($this){
				$this.closest(".sort__view_item").addClass("active")
						.siblings().removeClass("active");
		}

		return {
				init: function(){
						$(".sort__view_link").on("click", function(e){
								e.preventDefault();
								_changeState($(this));
						});
				}
		}
}());


var ratingWidget = (function(){

		var _letTheStarsShining = function(ratingAmount){
				var starsArray = [];

				for (var i = 0; i < 5; i++){
						var starClassName = (i < ratingAmount) ? "products__rating-stars-item products__rating-stars-item_filed" : "products__rating-stars-item";

						var star = $("<li>",{
								class: starClassName
						});

						starsArray.push(star);
				}

				return starsArray;
		}

		var _generateMarkup = function(ratingAmount, elementToAppend){
				var ul =  $("<ul>", {
						class: "products__rating-stars",
						html: _letTheStarsShining (ratingAmount)
				});

				var retingDisplay = $("<div>", {
						class: "products__reting-amount",
						text: ratingAmount
				});

				elementToAppend.append([ul, retingDisplay]);
		}

		return {
				init: function(){
						$(".products__raiting").each(function (){
								var $this = $(this),
										ratingAmount = parseInt($this.data("rating"));

								_generateMarkup(ratingAmount, $this);
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


var slideShow = (function(){

		var _changeSlide = function($this){
				var container = $this.closest(".products__slideshow"),
						path = $this.find("img").attr("src"),
						display = container.find(".products__slideshow-img");

				$this.closest(".products__slideshow-item").addClass("active")
						.siblings().removeClass("active");

				display.fadeOut(function(){
						$(this).attr("src", path).fadeIn();
				});
		}

		return {
				init: function(){
						$(".products__slideshow-link").on("click", function(e){
								e.preventDefault();

								var $this = $(this);

								_changeSlide($this);
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

		if ($(".filter").length){
				accordeon.init();
		}

		if ($(".products__slideshow").length){
				slideShow.init();
		}

		if ($(".products__raiting").length){
				ratingWidget.init();
		}

		if ($(".filter__slider_element").length){
				sliderCategories.init();
		}



		categoriesSort.init();
		// accordeon.init();
		viewStateCange.init();

		$(".filter__reset").on("click", function(e){
		e.preventDefault();

		var $this = $(this),
			container = $this.closest(".filter__item"),
			checkboxes = container.find("input:checkbox");

		checkboxes.removeAttr("checked")
		});


		if ($(".sort__select_element").length){
				$(".sort__select_element").select2({
						minimumResultsForSearch: Infinity
				});
		}

		/* --------- columnizer --------- */
		$('.important-info__text').addClass('dontsplit');
		$(".attension__text").columnize({
				columns: 2
		});


	});


