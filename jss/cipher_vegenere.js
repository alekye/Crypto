var alpha = "abcdefghijklmnopqrstuvwxyz";

// 维吉尼亚密码加密
function vigenere_encrypt(text, key) {
	// body...
	var lowerText = text.toLowerCase();
	var lowerKey = key.toLowerCase();
	var cipher = "";
	for (var i = 0; i < lowerText.length; i++) {
		var kIndex = i % lowerKey.length;
		var charIndex = lowerText.charCodeAt(i) - 97;
		var keyIndex = lowerKey.charCodeAt(kIndex) - 97;
		var encryptIndex = (charIndex + keyIndex) % 26;
		cipher += alpha.charAt(encryptIndex);
	}
	return cipher.toUpperCase();
}

// 维吉尼亚密码解密
function vigenere_decrypt(cipher, key) {
	// body...
	var lowerCipher = cipher.toLowerCase();
	var lowerKey = key.toLowerCase();
	var text = "";
	for (var i = 0; i < lowerCipher.length; i++) {
		var kIndex = i % lowerKey.length;
		var charIndex = lowerCipher.charCodeAt(i) - 97;
		var keyIndex = lowerKey.charCodeAt(kIndex) - 97;
		var decryptIndex = (charIndex - keyIndex + 26) % 26;
		text += alpha.charAt(decryptIndex);
	}
	return text;
}

// 绑定加密按钮事件
document.querySelector('#btn_encrypt').addEventListener('click', function () {
	var d = document.getElementById('myconsole');
	var key = document.querySelector('#input_key').value;
	if (key.length > 0) {
		// d.innerHTML = "<p>" + key + "</p>";
		var text = document.querySelector('#input_text').value;
		if (text.length > 0) {
			d.innerHTML = "<p>" + vigenere_encrypt(text, key) + "</p>";
		} else {
			d.innerHTML = "<p>加密内容不能为空！</p>";	
		}
	} else {
		d.innerHTML = "<p>请输入正确的秘钥！</p>";
	}
});

// 绑定解密按钮事件
document.querySelector('#btn_decrypt').addEventListener('click', function () {
	var d = document.getElementById('myconsole');
	var key = document.querySelector('#input_key').value;
	if (key.length > 0) {
		// d.innerHTML = "<p>" + key + "</p>";
		var cipher = document.querySelector('#input_cipher').value;
		if (cipher.length > 0) {
			d.innerHTML = "<p>" + vigenere_decrypt(cipher, key) + "</p>";
		} else {
			d.innerHTML = "<p>解密内容不能为空！</p>";	
		}
	} else {
		d.innerHTML = "<p>请输入正确的秘钥！</p>";
	}
});
