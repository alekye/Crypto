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

console.log(shift_encrypt("abcdxyz", 1))
console.log(shift_decrypt("BCDEYZA", -1))