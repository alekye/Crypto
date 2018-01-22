console.log('Hello World!');

function my_add(a, b) {
	// body...
	return a + b;
}

c = my_add(3, 7);
console.log('c = ' + c);

var str="abcd"
console.log('len = ' + str.length);
// console.log('ch = ' + str.charAt(1));

var ch = String.fromCharCode(98);
console.log('ch = ' + ch);
console.log('type = ' + typeof(ch));
var num = str.charCodeAt(2);
console.log('num = ' + num);
console.log('type = ' + typeof(num));

var upper = "ABCD";
var lower = upper.toLowerCase();
console.log("lower = " + lower);

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
var cipher = "ESPESTCOPIPCNTDPYPPODACZRCLXXTYR";
var ret = shift_decrypt(cipher);
console.log(ret);
