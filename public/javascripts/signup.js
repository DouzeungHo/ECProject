function userSignUp(userName, email, password) {
	console.log("success");
}

jQuery(function($) {
	var signupBtn = $('#signup-btn');
	var userName = $('#signup-username');
	var email = $('#signup-email');
	var password = $('#signup-password');
	var rePassword = $('#signup-repassword');
	var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	signupBtn.click(function() {
		if (password.val() == '' || email.val()=='' || rePassword.val() == '' || userName.val() == '') {
			new PNotify({
    			title: '请填写每一项内容',
  			});
		} else if (password.val() != rePassword.val()) {
			new PNotify({
    			title: '密码两次输入不相同',
    			text: '试试看重新输入一次？'
  			});
		} else if(pattern.test(email.val()) == false) {
			new PNotify({
    			title: '邮箱格式不正确',
    			text: '试试看重新输入一次？'
  			});
		} else {
			userSignUp(userName, email, password);
		}
	});
});