jQuery(window).on("load", function() {
	"use strict";

	var currentCost;
	var currentStep = $('#step-first');
	var stepIndex = 0;
	var formStatus;



	$('.calculator-start').click(function(){

		$('#step-welcome').fadeOut(500);
		$('#step-welcome').removeClass('step-visible');
		$('#step-first').slideUp(200).delay(500);
		setTimeout(function(){
			$('#step-first').removeClass('step-hidden').addClass('step-visible');
			$('.to-start').removeClass('calculator-hidden');
			stepIndex +=1; 
			$('.step-indicator').text(stepIndex);

		}, 700);


	});

	$('.to-previous').click(function(){
		previousScreen();

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

	function previousScreen(){
		currentStep.removeClass('step-current step-visible').addClass('step-hidden');
		currentStep = currentStep.prev();

		currentStep.removeClass('step-hidden').addClass('step-current step-visible');

		//Show back to home button instead of previous
		if(currentStep.data('form-step')==1){
			$('.to-start').removeClass('calculator-hidden').addClass('calculator-visible');
			$('.to-previous').removeClass('calculator-visible').addClass('calculator-hidden');
		}

	}

	function switchScreen(){
		 $('.to-start').addClass('calculator-hidden');
		$('.to-previous').removeClass('calculator-hidden').addClass('calculator-visible');
		 if(formStatus!='end'){
			currentStep.removeClass('step-current step-visible').addClass('step-hidden');
			currentStep = currentStep.next();
			stepIndex +=1; 
			$('.step-indicator').text(stepIndex);
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
				var numText = (number % 1 !== 0 ? now.toFixed(1) : Math.round(now));
				element.text(numText);
			}
		});
	}
});

