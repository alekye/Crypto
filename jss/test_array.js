function fast_power(a, n, mod) {
	// body...
	var result = 1;
	var va = a;
	var pow = n;
	while (pow > 0) {
		if (pow&1 == 1) {
			result = (result*va) % mod;
		}
		pow >>= 1;
		va = (va*va) % mod;
	}
	return result;
}

console.log(fast_power(8, 3, 4))