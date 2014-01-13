$(function(){
	$( "#num-slider-result" ).prepend("Случайных чисел:");
	
	// Ползунок
	$(".num-slider").slider({
		animate: true,
		range: "min",
		value:1,
		min:1,
		max:60,
		step:1,
		slide: function( event, ui ){
			var result = $( "#num-slider-result" ).html(ui.value).prepend("Случайных чисел:");;
			},
			change: function(event, ui) { 
				$('#hidden').attr('value', ui.value);
				if($('#hidden').val() > 1){
					$('#delRepeats').animate({'opacity' : '1'});
					$('label[for="delRep"]').css('cursor', 'pointer');
				}else{
					$('#delRepeats').animate({'opacity' : '0'});
				}
			}	
	});
		
	//Только числа
	$('#min-num').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});

	$('#max-num').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});
		
	//Рабочие Функции	
	function del(){
		$('#result-screen-content').css('margin-top', '-80px')
		$('.error').remove();
		$('.num-result').remove();
		$('.num-results').remove();
	}
	function error(){
		$('#result-screen-content').append('<h2 class="error">' + 'Вы ничего не ввели!' + '</h2>');
	}
	function errorNull(){
		$('#result-screen-content').append('<h2 class="error">' + 'Введите число больше 0' + '</h2>');
	}
	function random(min, max){
			return Math.round(Math.random() * (max - min) + min);
	}
	
	//По клику	
	$('#buttonGoRand').on('click', function(){
		if (document.all && document.querySelector && !document.addEventListener){
		}else{
			var myaudio = $("#myaudio")[0];
			myaudio.play();
		}
		del();
		var min = $('#min-num').val(),
			max = $('#max-num').val(),
			num = $('#hidden').val();
		if(min == '' || max == '' || num == ''){
			error();
			return false;
		}
		else if(max == '0' || num == '0'){
			errorNull();
			return false;
		}
		
		//Преобразуем переменные в числовой тип	
		min = parseFloat(min);max = parseFloat(max);num = parseFloat(num);
		
		//Результат функции random кидаем в массив arr		
		var arr = [];
		for(i = 0; i < num;i++){
			arr.push('<span class="num-result">' + random(min, max) + '</span>');
		}
		
		//Если получен ЧЕК, то сортируем и удаляем повторы	
		if($("#delRepeats").find('input').prop("checked") === true){
			arr.sort();
			for(var i = arr.length - 1; i > 0; i--){
			if(arr[i] == arr[i - 1]) arr.splice( i, 1);
			}
		}
		
		//Вывод результата на экран
		$('#result-screen-content').append(arr);
		var restext = $('#result-screen-content');
		restext.animate({'opacity' : 0}, {duration:0}).animate({'opacity' : 1,'margin-top' : '20px' }, {duration:1000})
					.animate({'margin-top' : '10px'},{duration:500})
					.animate({'margin-top' : '15px'},{duration:300})
	});
		
		
});
