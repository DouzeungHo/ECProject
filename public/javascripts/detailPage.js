jQuery(function($) {
	function setProvinceValue(provinces) {
		var app = new Vue({
			el: '#detail-page-block',
			data: {
				provinces: provinces,
				parentIndex: 0
			},
			methods: {
				parentSelect: function(e) {
				this.parentIndex = e.target.selectedIndex;
			}
  }
		});
	}
	$.ajax({
		url: "/api/city",
		dataType: 'json',
		success: function(result) {
			var cities = result;
			setProvinceValue(cities.provinces);
		}
	});
});