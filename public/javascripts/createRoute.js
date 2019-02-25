jQuery(function($) {
	var US;
	var states = [];
	var cities = [];
	var cityPOI = [];
	var selectedPOI = [];
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
	var app = new Vue({
		el: '#create-route-block',
		data: {
			active: 'first-step',
			first: false,
			second: false,
			third: false,
			secondStepError: null,
			states: states,
			cities:cities,
			US: US,
			cityPOI: cityPOI,
			selectedPOI: selectedPOI,
			selectedState: null, //null
			selectedCity: null,
			selectedDate: null
      	},
		methods: {
			setDone: function(id, index) {
				//判断是否合规
				if (id == 'first-step') {
					if (states.includes(this.selectedState) == false) {
						new PNotify({
		    				title: '选择正确的州名'
		  				});
		  				//return;
		  			} else if (this.selectedDate) { //check selectedDate
		  				console.log(this.selectedDate)
		  			}
		  			//clean wrong reply
		  			this.selectedCity = '';
		  			cityPOI.length = 0;
		  			getStateCity(this.selectedState);
				} else if (id == 'second-step') {

				}
				this[id] = true;
				this.secondStepError = null;
				if (index) {
					this.active = index;
				}
			},
			submitForm() {
				console.log('assume you submit');
			},
			getPOI() {
				cityPOI.length = 0;
				$.ajax({
					url: "../resources/" + this.selectedState + "/" + this.selectedCity + ".json",
					dataType: 'json',
					success: function(result) {
						setPOIList(result);
					}
				});
			},
			addPOItoTravel(poi) {
				console.log(poi);
			},
			searchOnGoogle(name) {
				window.open("https://www.google.com.hk/search?safe=strict&q="+name);
			}
		}
	});
	function getStateCity(State) {
		cities.length = 0;
		for (city in US[State]) {
			cities.push(US[State][city]);
		}
	}
	function setPOIList(data) {
		for (poi in data) {
			cityPOI.push(data[poi])
		}
	}
})