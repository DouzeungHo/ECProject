jQuery(function($) {
	//default value
	var provinceData = [{
							provinceName: '',
							citys:[{
								citysName:''
							}]
						}];
	var provinces = provinceData;
	var app = new Vue({
		el: '#detail-page-block',
		data: {
			selectedLanguages:[],
			sex: '',
			provinces: provinces,
			parentIndex: 0,
			selfIntroduction: '',
			detailName: '',
			detailPhone: '',
			detailID: '',
			detailProvince: '',
			detailCity: ''
		},
		methods: {
			parentSelected: function() {
				var parentValue = document.getElementById('detail-province').value;
				this.parentIndex = findProvinceIndex(parentValue);
			},
			parentSelect: function() {
				this.parentIndex = 0;
				this.detailCity = '';
			}
		}
	});
	$.ajax({
		url: "/api/city",
		dataType: 'json',
		success: function(result) {
			var cities = result;
			setProvinceValue(cities.provinces);
		}
	});
	function setProvinceValue(provinces) {
		for (i = 0; i < provinces.length; i++) {
			provinceData.push(provinces[i]);
		}
	}
	function findProvinceIndex(province) {
		for (i = 0; i < provinceData.length; i++) {
			if (provinceData[i].provinceName == province) {
				console.log(i);
				return i;
			}
		}
		return 0;
	}
});