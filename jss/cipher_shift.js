var alpha = "abcdefghijklmnopqrstuvwxyz";

function shift_encrypt(text, off) {
	// body...
	var lowerText = text.toLowerCase();
	var cipher = "";
	for (var i = 0; i < lowerText.length; i++) {
		var index = lowerText.charCodeAt(i) - 97 + off;
		index += 26;	// 防止负余数
		index %= 26;
		cipher += alpha.charAt(index);
	}
	return cipher.toUpperCase();
}

function shift_decrypt(cipher, off) {
	// body...
	var text = shift_encrypt(cipher, off);
	return text.toLowerCase();
}

// 绑定加密按钮事件
document.querySelector('#btn_encrypt').addEventListener('click', function () {
	var text = document.querySelector('#input_text').value;
	if (text.length > 0) {
		var d = document.getElementById('myconsole');
    	// begin encrypt
    	var result = "";
    	for (var i = 1; i < 26; i++) {
    		result += '<div class="weui-cell"><p>offset11 = ' + i + ' : ' + shift_encrypt(text, i) + '</p></div>'; 
    	}
    	d.innerHTML = result;
	}
});

// 绑定解密按钮事件
document.querySelector('#btn_decrypt').addEventListener('click', function () {
	var cipher = document.querySelector('#input_text').value;
	if (cipher.length > 0) {
		var d = document.getElementById('myconsole');
    	// begin encrypt
    	var result = "";
    	for (var i = 1; i < 26; i++) {
    		result += '<div class="weui-cell"><p>offset22 = ' + i + ' : ' + shift_decrypt(cipher, i) + '</p></div>'; 
    	}
    	d.innerHTML = result;
	}
});
