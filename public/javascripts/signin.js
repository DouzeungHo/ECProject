jQuery(function($) {
	function userLogin(email, password) {
		data = {
			email:email,
			password:password
		};
		$.ajax({
          type: "POST",
          url: "/users/login",
          data: data,
          dataType: 'json',
          success: function(result) {
          	console.log("code:" + result.code);
          	if (result.code == 200) {
	          	new PNotify({
	    			title: '登录成功',
	    			type:'success'
	  			});
	  			window.location.replace("/")
	        } else if (result.code == 400) {
	        	new PNotify({
	    			title: '邮箱未被注册'
	  			});
	        } else if (result.code == 500) {
	        	new PNotify({
	    			title: '用户名或密码错误'
	  			});
	        }
          }
	    });
	}

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