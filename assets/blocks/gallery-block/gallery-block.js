$(function(){
	function galerryPreviuw(image){
		var bigPic = $('.gallery-block__left .big-pic')

		bigPic.css('background-image', 'url('+image+')');
	}
	var href = $('.gallery-block__left .pic-list a.active').attr('href');
	
	galerryPreviuw(href);

	$('.gallery-block__left .pic-list a').on('click', function(e){
		e.preventDefault();

		var $this = $(this),
			href  = $this.attr('href');

		$('.gallery-block__left .pic-list a').removeClass('active');
		$this.addClass('active');

		galerryPreviuw(href);
	});
});