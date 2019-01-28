function userLogin(emial, password) {
	console.log("login success");
}

jQuery(function($) {
	var signinBtn = $('#signin-btn');
	var email = $('#signin-email');
	var password = $('#signin-password');
	var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	signinBtn.click(function() {
		if (email.val() == '' || password.val() == '') {
			new PNotify({
    			title: '请输入每一项内容'
  			});
		} else if (pattern.test(email.val()) == false) {
			new PNotify({
    			title: '请输入正确邮箱',
    			text: '您输入的邮箱似乎不正确'
  			});
		} else {
			userLogin(email.val(), password.val());
		}
	});
});