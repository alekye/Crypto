/* dialog */

var alpha = "abcdefghijklmnopqrstuvwxyz";
function shift_decrypt(cipher) {
	// body...
	var ret = new Array();
	var lowerCipher = cipher.toLowerCase();
	for (var off = 1; off < 26; off++) {
		var plainText = "";
		for (var i = 0; i < cipher.length; i++) {
			var index = lowerCipher.charCodeAt(i) - 97 + off;
			index %= 26;
			plainText += alpha.charAt(index);
		}
		var mstr = "off = " + off + " : " + plainText;
		ret[off-1] = mstr;
	}
	return ret;
}

// var cipher = "ESPESTCOPIPCNTDPYPPODACZRCLXXTYR";
// var ret = shift_decrypt(cipher);
// // console.log(ret);
// for (var item in ret) {
// 	console.log(ret[item]);
// }

document.querySelector('#mybutton').addEventListener('click', function () {
	var text = document.querySelector('#input_cipher').value;
	var d = document.getElementById('myconsole');
    // decrypt the cipher
    var decryptResult = shift_decrypt(text);
    for (var idx in decryptResult) {
    	var result = '<p>' + decryptResult[idx] + '</p>';
    	d.innerHTML = d.innerHTML + result;
    }
});

