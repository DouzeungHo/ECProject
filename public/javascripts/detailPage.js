jQuery(function($) {
	//default value
	var vanilla = null;
	var provinceData = [{
							provinceName: '',
							citys:[{
								citysName:''
							}]
						}];
	var provinces = provinceData;
	var states = [];
	var cities = [];
	var detailApp = new Vue({
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
			directorDisabled: true,
			// next part is director part
			states: states,
			cities: cities,
			detailSchool: '',
			detailAddr:'',
			detailState: '',
			detailUSCity: '',
			desiredSalary: '',
			maximumNum: '',
			vehicle: '',
			//dialog
			showDialog: false,
			src: null
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
			startEditUserForm: function() {
				this.disabled = false;
			},
			startEditTourGuyForm: function() {
				this.directorDisabled = false;
			},
			submitTourGuyForm: function() {
				this.directorDisabled = true;
				var data = {
					detailSchool: this.detailSchool,
					detailAddr: this.detailAddr,
					detailState: this.detailState,
					detailUSCity: this.detailUSCity,
					desiredSalary: this.desiredSalary,
					maximumNum: this.maximumNum,
					vehicle: this.vehicle
				};
				$.ajax({
					type: "POST",
					url:"users/tourGuyDetailUpdate",
					dataType: 'json',
					data: data, 
					success: function(response) {
						console.log(response);
					}
				})
			},
			setUSCity: function() {
				cities.length = 0;
				if(this.detailState != '') {
					for (city in US[this.detailState]) {
						cities.push(US[this.detailState][city]);
					}
				}
			},
			test: function() {
				this.showDialog = true;
			},
			loadImg: function() {
				$('#imgInput').click();
			},
			getImg: function(event) {
				var file = event.target.files[0];
				var reader = new FileReader();
				if (file) {
					reader.readAsDataURL(file);
				}
				reader.onloadend = function(){
					$('#select-headImg-btn').hide();
					$('#confirm-headImg-btn').show();
					document.querySelector('#image').src = reader.result;
					useCroppie();
				}
			},
			exportImg: function() {
				if(vanilla != null) {
					vanilla.croppie('result', 'base64').then(function(img) {
						$('.user-headImg').attr('src', img);
						uploadToServer(img);
					});
				}
			}
		}
	});
	initPage();
	function useCroppie() {
		vanilla = $('#image').croppie({
			enableExif: true,
			viewport: { width: 100, height: 100, type:'circle' },
			boundary: { width: 300, height: 300 },
		})
	}
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
	function setPageUserDetail(userDetail) {
		detailApp.detailName = userDetail.detailName;
		detailApp.detailProvince = userDetail.detailProvince;
		detailApp.detailPhone = userDetail.detailPhone;
		detailApp.detailID = userDetail.detailID;
		detailApp.detailCity = userDetail.detailCity;
		detailApp.selfIntroduction = userDetail.selfIntroduction;
		detailApp.selectedLanguages = userDetail.selectedLanguages;
		detailApp.sex = userDetail.sex;
	}
	function setPageTourGuyDetail(tourGuyDetail) {
		detailApp.detailSchool = tourGuyDetail.detailSchool;
		detailApp.detailAddr = tourGuyDetail.detailAddr;
		detailApp.detailState = tourGuyDetail.detailState;
		detailApp.detailUSCity = tourGuyDetail.detailUSCity;
		detailApp.desiredSalary = tourGuyDetail.desiredSalary;
		detailApp.maximumNum = tourGuyDetail.maximumNum;
		detailApp.vehicle = tourGuyDetail.vehicle;
	}
	function setTourGuyDetail(tourGuyDetail) {
		$.ajax({
			url: "/users/getTourGuyDetail",
			type: "POST",
			dataType:'json',
			success: function(result) {
				if(result.code == 200) {
					setPageTourGuyDetail(result.tourGuyDetail);
				}
			}
		})
	}
	function uploadToServer(img) {
		var formdata = new FormData();
		formdata.append("file",img);
        $.ajax({
           url: "/users/uploadHeadImg",
            type: "post",
            data: formdata,
            processData: false,  // 不处理数据
            contentType: false ,  // 不设置内容类型
            success:function (result) {
                console.log(result);
            }
        });
        detailApp.showDialog = false;
	}
	function checkHeadImg(email) {
		//TODO: check if exist
		var headimg = '/user_headimg/' + email + '.png'
		$(".user-headImg").attr('src', headimg);
	}
	function getCityList() {
		$.ajax({
			url: "/api/city",
			dataType: 'json',
			success: function(result) {
				var cities = result;
				setProvinceValue(cities.provinces);
			}
		});
		$.ajax({
			url: "/api/usCities",
			dataType: 'json',
			success: function(result) {
				US = result;
				for (var key in result) {
					states.push(key);
				}
			}
		});
	}
	function setUserDetail() {
		//get userdata
		$.ajax({
			url: "/users/getUserDetail",
			type: "POST",
			dataType:'json',
			success: function(result) {
				if(result.code == 200) {
					setPageUserDetail(result.userDetail);
					checkHeadImg(result.userDetail.userEmail);
				}
			}
		})
	}
	function initPage() {
		checkHeadImg();
		getCityList();
		setUserDetail();
		setTourGuyDetail()
	}
});