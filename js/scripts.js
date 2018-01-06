jQuery(window).on("load", function() {
	"use strict";

	var currentCost;
	var currentStep = $('#step-first');
	var formStatus;


	$('.calculator-start').click(function(){

		$('#step-welcome').fadeOut(500);
		$('#step-welcome').removeClass('step-visible');
		$('#step-first').slideUp(200).delay(500);
		setTimeout(function(){
			$('#step-first').removeClass('step-hidden').addClass('step-visible')}, 700);
		
	});

	$('.form-step input').change(function(){
		
		if($(this).is(':radio')){
			
			setTimeout(function(){switchScreen()},500);
		}

		if($(this).prop('checked')== true){
			increaseTotal($(this).attr('data-price'));
		}
		else{
			decreaseTotal($(this).attr('data-price'));
		}
	});

	$('.form-next').click(function(){
	 	switchScreen();
	});

	$('.form-previous').click(function(){
		currentStep.removeClass('step-current step-visible').addClass('step-hidden');
		currentStep = currentStep.next();
		currentStep.removeClass('step-hidden').addClass('step-current step-visible');
	});

	function calculatorInitialize(){
		currentStep = $('#step-first');
	}

	function switchScreen(){
		 if(formStatus!='end'){
			currentStep.removeClass('step-current step-visible').addClass('step-hidden');
			currentStep = currentStep.next();
			currentStep.removeClass('step-hidden').addClass('step-current fs-show');
			if(currentStep.is("#step-final")){
				formStatus = 'end'; 
			}
		}
	}

	function increaseTotal(amount){
		var initialCost = parseInt($('.form-total').text());
		currentCost = parseInt($('.form-total').text());
		currentCost += parseInt(amount);
		numberAnimation(initialCost,currentCost);

	}

	function decreaseTotal(amount){
		currentCost = parseInt($('.form-total').text());
		currentCost -= parseInt(amount);
		$('.form-total').text(currentCost);
	}


	function numberAnimation(numberFrom,numberTo){
		var element = $(".form-total")
		var number = numberTo;
		element.prop('contador',numberFrom).animate({
			contador: number
		}, {
			duration: 1000,
			easing: 'swing',
			step: function (now) {
				// Verificar si es decimal o no
				var numText = (number % 1 !== 0 ? now.toFixed(1) : Math.round(now));
				element.text(numText);
			}
		});
	}
});

