jQuery(function($) {

	function userSignUp(userName, email, password) {
		data = {
			userName:userName,
			email:email,
			password:password
		};
		$.ajax({
          type: "POST",
          url: "/users/register",
          data: data,
          dataType: 'json',
          success: function(result) {
          	if (result.code == 200) {
	          	new PNotify({
	    			title: '登录成功',
	    			type:'success'
	  			});
	  			window.location.replace("/")
	        } else if (result.code == 400) {
	        	new PNotify({
	    			title: '用户邮箱已被注册'
	  			});
	        }
          }
	    });
	}
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
			userSignUp(userName.val(), email.val(), password.val());
		}
	});
});