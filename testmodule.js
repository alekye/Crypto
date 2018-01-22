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

// console.log(shift_encrypt("abcdxyz", 1))
// console.log(shift_decrypt("BCDEYZA", -1))

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

// console.log(vigenere_encrypt("thiscrypto", "CIPHER"));
// console.log(vigenere_encrypt("wearediscoveredsaveyourself", "friday"));
console.log(vigenere_decrypt("BVIUEBNJKRVCWVLVATJPWXRQJCN", "friday"));




















