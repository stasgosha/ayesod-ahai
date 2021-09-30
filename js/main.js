// jQuery(function($){
// 	$(window).scroll(function(){
// 		var bottomOffset = 2000; // отступ от нижней части сайта, достигнув которой будет вызвана подгрузка следующих постов
// 		var data = {
// 			'action': 'loadmore',
// 			'active': active,
// 			'page' : current_page
// 		};
// 		if($(document).scrollTop() > ($(document).height() - bottomOffset) && !$('body').hasClass('loading')) {
// 			$.ajax({
// 				url:ajaxurl,
// 				data:data,
// 				type:'POST',
// 				beforeSend: function(xhr){
// 					$('body').addClass('loading');
// 				},
// 				success:function(data){
// 					if(data) {
// 						$('.articles-list-section').append(data);
// 						$('body').removeClass('loading');
// 						current_page++;
// 					}
// 				}
// 			});
// 		}
// 	});
// });