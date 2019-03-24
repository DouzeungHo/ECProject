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
			detailCity: '',
			disabled: true,
			directorDisabled: true
		},
		methods: {
			parentSelected: function() {
				var parentValue = document.getElementById('detail-province').value;
				this.parentIndex = findProvinceIndex(parentValue);
			},
			parentSelect: function() {
				this.parentIndex = 0;
				this.detailCity = '';
			},
			submitTouristForm: function() {
				this.disabled = true;
				var test = {
					selectedLanguages: this.selectedLanguages,
					sex: this.sex,
					selfIntroduction: this.selfIntroduction,
					detailName: this.detailName,
					detailPhone: this.detailPhone,
					detailID: this.detailID,
					detailProvince: this.detailProvince,
					detailCity: this.detailCity
				};
				console.log('we send');
				console.log(test);
				//TODO: submit the message to DB
				$.ajax({
					type: "POST",
					url:"users/detailUpdate",
					dataType: 'json',
					data: test, 
					success: function(response) {
						console.log(response);
					}
				})
			},
			startEdit() {
				this.disabled = false;
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
	//get userdata
	$.ajax({
		url: "/users/getUserDetail",
		type: "POST",
		dataType:'json',
		success: function(result) {
			if(result.code == 200) {
				setUserDetail(result.userDetail);
			}
		}
	})
	function setProvinceValue(provinces) {
		for (i = 0; i < provinces.length; i++) {
			provinceData.push(provinces[i]);
		}
	}
	function findProvinceIndex(province) {
		for (i = 0; i < provinceData.length; i++) {
			if (provinceData[i].provinceName == province) {
				return i;
			}
		}
		return 0;
	}
	function setUserDetail(userDetail) {
		console.log("from server:");
		console.log(userDetail);
		app.detailName = userDetail.detailName;
		app.detailProvince = userDetail.detailProvince;
		app.detailPhone = userDetail.detailPhone;
		app.detailID = userDetail.detailID;
		app.detailCity = userDetail.detailCity;
		app.selfIntroduction = userDetail.selfIntroduction;
		app.selectedLanguages = userDetail.selectedLanguages;
		app.sex = userDetail.sex;
	}
});