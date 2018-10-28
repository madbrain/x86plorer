(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$True = {$: 'True'};
var author$project$Main$initialModel = {content: 'add [eax],ebx', decode: false, is32Bits: true};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$not = _Basics_not;
var author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Change':
				var text = msg.a;
				return _Utils_update(
					model,
					{content: text});
			case 'OperationModeChange':
				return _Utils_update(
					model,
					{decode: !model.decode});
			default:
				return _Utils_update(
					model,
					{is32Bits: !model.is32Bits});
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var author$project$Diagram$blockName = F3(
	function (prefix, level, i) {
		return A2(
			elm$core$String$join,
			'_',
			_List_fromArray(
				[
					prefix,
					elm$core$String$fromInt(level),
					elm$core$String$fromInt(i)
				]));
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(
			A3(elm$core$List$foldl, elm$core$Basics$max, x, xs));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(
			A3(elm$core$List$foldl, elm$core$Basics$min, x, xs));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_n0, _n1) {
			var x = _n0.a;
			var y = _n0.b;
			var xs = _n1.a;
			var ys = _n1.b;
			return _Utils_Tuple2(
				A2(elm$core$List$cons, x, xs),
				A2(elm$core$List$cons, y, ys));
		});
	return A3(
		elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var timjs$elm_collage$Collage$Flat = {$: 'Flat'};
var timjs$elm_collage$Collage$Core$Path = F2(
	function (a, b) {
		return {$: 'Path', a: a, b: b};
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Basics$cos = _Basics_cos;
var elm$core$Basics$sin = _Basics_sin;
var elm$core$Basics$sub = _Basics_sub;
var timjs$elm_collage$Collage$Core$apply = function (_n0) {
	var shift = _n0.shift;
	var scale = _n0.scale;
	var rotation = _n0.rotation;
	var rotated = function (_n5) {
		var x = _n5.a;
		var y = _n5.b;
		var s = elm$core$Basics$sin(rotation);
		var c = elm$core$Basics$cos(rotation);
		return _Utils_Tuple2((c * x) - (s * y), (s * x) + (c * y));
	};
	var _n1 = scale;
	var sx = _n1.a;
	var sy = _n1.b;
	var scaled = function (_n4) {
		var x = _n4.a;
		var y = _n4.b;
		return _Utils_Tuple2(sx * x, sy * y);
	};
	var _n2 = shift;
	var dx = _n2.a;
	var dy = _n2.b;
	var shifted = function (_n3) {
		var x = _n3.a;
		var y = _n3.b;
		return _Utils_Tuple2(x + dx, y + dy);
	};
	return A2(
		elm$core$Basics$composeL,
		A2(elm$core$Basics$composeL, shifted, scaled),
		rotated);
};
var elm$core$Basics$fdiv = _Basics_fdiv;
var timjs$elm_collage$Collage$Layout$handlePoints = function (thickness) {
	var thicken = function (_n0) {
		var x = _n0.a;
		var y = _n0.b;
		var t = thickness / 2;
		return _Utils_Tuple2(
			(x < 0) ? (x - t) : (x + t),
			(y < 0) ? (y - t) : (y + t));
	};
	return elm$core$List$map(thicken);
};
var timjs$elm_collage$Collage$Layout$handleBox = F2(
	function (thickness, _n0) {
		var w = _n0.a;
		var h = _n0.b;
		var y = h / 2;
		var x = w / 2;
		return A2(
			timjs$elm_collage$Collage$Layout$handlePoints,
			thickness,
			_List_fromArray(
				[
					_Utils_Tuple2(-x, -y),
					_Utils_Tuple2(x, -y),
					_Utils_Tuple2(x, y),
					_Utils_Tuple2(-x, y)
				]));
	});
var timjs$elm_collage$Collage$Layout$unpack = function (_n0) {
	var toTop = _n0.toTop;
	var toBottom = _n0.toBottom;
	var toRight = _n0.toRight;
	var toLeft = _n0.toLeft;
	return _List_fromArray(
		[
			_Utils_Tuple2(-toLeft, -toBottom),
			_Utils_Tuple2(toRight, -toBottom),
			_Utils_Tuple2(toRight, toTop),
			_Utils_Tuple2(-toLeft, toTop)
		]);
};
var timjs$elm_collage$Collage$Layout$distances = function (col) {
	var points = timjs$elm_collage$Collage$Layout$handleBasic(col.basic);
	var _n8 = elm$core$List$unzip(
		A2(
			elm$core$List$map,
			timjs$elm_collage$Collage$Core$apply(col),
			points));
	var xs = _n8.a;
	var ys = _n8.b;
	return {
		toBottom: -A2(
			elm$core$Maybe$withDefault,
			0,
			elm$core$List$minimum(ys)),
		toLeft: -A2(
			elm$core$Maybe$withDefault,
			0,
			elm$core$List$minimum(xs)),
		toRight: A2(
			elm$core$Maybe$withDefault,
			0,
			elm$core$List$maximum(xs)),
		toTop: A2(
			elm$core$Maybe$withDefault,
			0,
			elm$core$List$maximum(ys))
	};
};
var timjs$elm_collage$Collage$Layout$handleBasic = function (basic) {
	handleBasic:
	while (true) {
		switch (basic.$) {
			case 'Shape':
				switch (basic.b.$) {
					case 'Circle':
						var _n1 = basic.a;
						var thickness = _n1.b.thickness;
						var r = basic.b.a;
						var d = 2 * r;
						return A2(
							timjs$elm_collage$Collage$Layout$handleBox,
							thickness,
							_Utils_Tuple2(d, d));
					case 'Ellipse':
						var _n2 = basic.a;
						var thickness = _n2.b.thickness;
						var _n3 = basic.b;
						var rx = _n3.a;
						var ry = _n3.b;
						return A2(
							timjs$elm_collage$Collage$Layout$handleBox,
							thickness,
							_Utils_Tuple2(2 * rx, 2 * ry));
					case 'Rectangle':
						var _n4 = basic.a;
						var thickness = _n4.b.thickness;
						var _n5 = basic.b;
						var w = _n5.a;
						var h = _n5.b;
						return A2(
							timjs$elm_collage$Collage$Layout$handleBox,
							thickness,
							_Utils_Tuple2(w, h));
					case 'Polygon':
						var _n6 = basic.a;
						var thickness = _n6.b.thickness;
						var ps = basic.b.a;
						return A2(timjs$elm_collage$Collage$Layout$handlePoints, thickness, ps);
					default:
						var _n7 = basic.a;
						var line = _n7.b;
						var path = basic.b.a;
						var $temp$basic = A2(timjs$elm_collage$Collage$Core$Path, line, path);
						basic = $temp$basic;
						continue handleBasic;
				}
			case 'Path':
				var thickness = basic.a.thickness;
				var cap = basic.a.cap;
				var ps = basic.b.a;
				return A2(
					timjs$elm_collage$Collage$Layout$handlePoints,
					_Utils_eq(cap, timjs$elm_collage$Collage$Flat) ? 0 : thickness,
					ps);
			case 'Text':
				var dims = basic.a;
				return A2(timjs$elm_collage$Collage$Layout$handleBox, 0, dims);
			case 'Image':
				var dims = basic.a;
				return A2(timjs$elm_collage$Collage$Layout$handleBox, 0, dims);
			case 'Html':
				var dims = basic.a;
				return A2(timjs$elm_collage$Collage$Layout$handleBox, 0, dims);
			case 'Group':
				var cols = basic.a;
				return A2(
					timjs$elm_collage$Collage$Layout$handlePoints,
					0,
					elm$core$List$concat(
						A2(
							elm$core$List$map,
							A2(elm$core$Basics$composeR, timjs$elm_collage$Collage$Layout$distances, timjs$elm_collage$Collage$Layout$unpack),
							cols)));
			default:
				var back = basic.b;
				return A2(
					timjs$elm_collage$Collage$Layout$handlePoints,
					0,
					timjs$elm_collage$Collage$Layout$unpack(
						timjs$elm_collage$Collage$Layout$distances(back)));
		}
	}
};
var timjs$elm_collage$Collage$Layout$bottom = function (col) {
	var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
	var toBottom = _n0.toBottom;
	return _Utils_Tuple2(0, -toBottom);
};
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var timjs$elm_collage$Helpers$foldrLazy = F3(
	function (f, acc, list) {
		if (!list.b) {
			return acc;
		} else {
			var x = list.a;
			var xs = list.b;
			return A2(
				f,
				x,
				function (_n1) {
					return A3(timjs$elm_collage$Helpers$foldrLazy, f, acc, xs);
				});
		}
	});
var timjs$elm_collage$Helpers$orLazy = F2(
	function (ma, fmb) {
		if (ma.$ === 'Nothing') {
			return fmb(_Utils_Tuple0);
		} else {
			return ma;
		}
	});
var timjs$elm_collage$Collage$Layout$locate = F3(
	function (string, anchor, _this) {
		var recurse = function (col) {
			var match = A2(
				elm$core$Maybe$withDefault,
				false,
				A2(
					elm$core$Maybe$map,
					elm$core$Basics$eq(string),
					col.name));
			var firstOf = A2(
				timjs$elm_collage$Helpers$foldrLazy,
				A2(elm$core$Basics$composeL, timjs$elm_collage$Helpers$orLazy, recurse),
				elm$core$Maybe$Nothing);
			return match ? elm$core$Maybe$Just(
				anchor(col)) : A2(
				elm$core$Maybe$map,
				timjs$elm_collage$Collage$Core$apply(col),
				function () {
					var _n0 = col.basic;
					switch (_n0.$) {
						case 'Group':
							var cols = _n0.a;
							return firstOf(cols);
						case 'Subcollage':
							var fore = _n0.a;
							var back = _n0.b;
							return firstOf(
								_List_fromArray(
									[fore, back]));
						default:
							return elm$core$Maybe$Nothing;
					}
				}());
		};
		return recurse(_this);
	});
var author$project$Diagram$getBlock = F3(
	function (collage, level, i) {
		return A3(
			timjs$elm_collage$Collage$Layout$locate,
			A3(author$project$Diagram$blockName, 'block', level, i),
			timjs$elm_collage$Collage$Layout$bottom,
			collage);
	});
var timjs$elm_collage$Collage$Layout$left = function (col) {
	var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
	var toLeft = _n0.toLeft;
	return _Utils_Tuple2(-toLeft, 0);
};
var author$project$Diagram$getDesc = F3(
	function (collage, level, i) {
		return A3(
			timjs$elm_collage$Collage$Layout$locate,
			A3(author$project$Diagram$blockName, 'desc', level, i),
			timjs$elm_collage$Collage$Layout$left,
			collage);
	});
var the_sett$elm_color$Color$Color = F4(
	function (red, green, blue, alpha) {
		return {alpha: alpha, blue: blue, green: green, red: red};
	});
var the_sett$elm_color$Color$rgba = the_sett$elm_color$Color$Color;
var the_sett$elm_color$Color$blue = A4(the_sett$elm_color$Color$rgba, 52, 101, 164, 1);
var timjs$elm_collage$Collage$Core$Shape = F2(
	function (a, b) {
		return {$: 'Shape', a: a, b: b};
	});
var timjs$elm_collage$Collage$Core$collage = function (basic) {
	return {
		basic: basic,
		handlers: _List_Nil,
		name: elm$core$Maybe$Nothing,
		opacity: 1,
		rotation: 0,
		scale: _Utils_Tuple2(1, 1),
		shift: _Utils_Tuple2(0, 0)
	};
};
var timjs$elm_collage$Collage$styled = function (style) {
	return A2(
		elm$core$Basics$composeL,
		timjs$elm_collage$Collage$Core$collage,
		timjs$elm_collage$Collage$Core$Shape(style));
};
var timjs$elm_collage$Collage$Core$Transparent = {$: 'Transparent'};
var timjs$elm_collage$Collage$transparent = timjs$elm_collage$Collage$Core$Transparent;
var timjs$elm_collage$Collage$outlined = function (linestyle) {
	return timjs$elm_collage$Collage$styled(
		_Utils_Tuple2(timjs$elm_collage$Collage$transparent, linestyle));
};
var timjs$elm_collage$Collage$Core$Rectangle = F3(
	function (a, b, c) {
		return {$: 'Rectangle', a: a, b: b, c: c};
	});
var timjs$elm_collage$Collage$roundedRectangle = timjs$elm_collage$Collage$Core$Rectangle;
var timjs$elm_collage$Collage$rectangle = F2(
	function (w, h) {
		return A3(timjs$elm_collage$Collage$roundedRectangle, w, h, 0);
	});
var timjs$elm_collage$Collage$Core$Text = F2(
	function (a, b) {
		return {$: 'Text', a: a, b: b};
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var timjs$elm_collage$Collage$Text$height = function (_n0) {
	var sty = _n0.a;
	return sty.size;
};
var elm$core$String$length = _String_length;
var timjs$elm_collage$Collage$Text$width = function (text) {
	var sty = text.a;
	var str = text.b;
	return (timjs$elm_collage$Collage$Text$height(text) / 2) * elm$core$String$length(str);
};
var timjs$elm_collage$Collage$rendered = function (text) {
	return timjs$elm_collage$Collage$Core$collage(
		A2(
			timjs$elm_collage$Collage$Core$Text,
			_Utils_Tuple2(
				timjs$elm_collage$Collage$Text$width(text),
				timjs$elm_collage$Collage$Text$height(text)),
			text));
};
var the_sett$elm_color$Color$black = A4(the_sett$elm_color$Color$rgba, 0, 0, 0, 1);
var timjs$elm_collage$Collage$Sharp = {$: 'Sharp'};
var timjs$elm_collage$Collage$thin = 2.0;
var timjs$elm_collage$Collage$Core$Uniform = function (a) {
	return {$: 'Uniform', a: a};
};
var timjs$elm_collage$Collage$uniform = timjs$elm_collage$Collage$Core$Uniform;
var timjs$elm_collage$Collage$defaultLineStyle = {
	cap: timjs$elm_collage$Collage$Flat,
	dashPattern: _List_Nil,
	dashPhase: 0,
	fill: timjs$elm_collage$Collage$uniform(the_sett$elm_color$Color$black),
	join: timjs$elm_collage$Collage$Sharp,
	thickness: timjs$elm_collage$Collage$thin
};
var timjs$elm_collage$Collage$broken = F3(
	function (dashes, thickness, fill) {
		return _Utils_update(
			timjs$elm_collage$Collage$defaultLineStyle,
			{dashPattern: dashes, fill: fill, thickness: thickness});
	});
var timjs$elm_collage$Collage$solid = timjs$elm_collage$Collage$broken(_List_Nil);
var timjs$elm_collage$Collage$Layout$height = function (col) {
	var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
	var toTop = _n0.toTop;
	var toBottom = _n0.toBottom;
	return toTop + toBottom;
};
var timjs$elm_collage$Collage$Core$Subcollage = F2(
	function (a, b) {
		return {$: 'Subcollage', a: a, b: b};
	});
var timjs$elm_collage$Collage$Layout$impose = F2(
	function (front, back) {
		return timjs$elm_collage$Collage$Core$collage(
			A2(timjs$elm_collage$Collage$Core$Subcollage, front, back));
	});
var timjs$elm_collage$Collage$Layout$width = function (col) {
	var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
	var toLeft = _n0.toLeft;
	var toRight = _n0.toRight;
	return toLeft + toRight;
};
var timjs$elm_collage$Collage$Core$Chunk = F2(
	function (a, b) {
		return {$: 'Chunk', a: a, b: b};
	});
var timjs$elm_collage$Collage$Text$None = {$: 'None'};
var timjs$elm_collage$Collage$Text$Regular = {$: 'Regular'};
var timjs$elm_collage$Collage$Text$Sansserif = {$: 'Sansserif'};
var timjs$elm_collage$Collage$Text$Upright = {$: 'Upright'};
var timjs$elm_collage$Collage$Text$normal = 16;
var timjs$elm_collage$Collage$Text$defaultStyle = {color: the_sett$elm_color$Color$black, line: timjs$elm_collage$Collage$Text$None, shape: timjs$elm_collage$Collage$Text$Upright, size: timjs$elm_collage$Collage$Text$normal, typeface: timjs$elm_collage$Collage$Text$Sansserif, weight: timjs$elm_collage$Collage$Text$Regular};
var timjs$elm_collage$Collage$Text$fromString = timjs$elm_collage$Collage$Core$Chunk(timjs$elm_collage$Collage$Text$defaultStyle);
var author$project$Diagram$makeBox = function (content) {
	var str = timjs$elm_collage$Collage$rendered(
		timjs$elm_collage$Collage$Text$fromString(content));
	var w = timjs$elm_collage$Collage$Layout$width(str) + 10;
	var h = timjs$elm_collage$Collage$Layout$height(str) + 10;
	return A2(
		timjs$elm_collage$Collage$Layout$impose,
		str,
		A2(
			timjs$elm_collage$Collage$outlined,
			A2(
				timjs$elm_collage$Collage$solid,
				timjs$elm_collage$Collage$thin,
				timjs$elm_collage$Collage$uniform(the_sett$elm_color$Color$blue)),
			A2(timjs$elm_collage$Collage$rectangle, w, h)));
};
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var elm$core$Array$indexedMap = F2(
	function (func, _n0) {
		var len = _n0.a;
		var tree = _n0.c;
		var tail = _n0.d;
		var initialBuilder = {
			nodeList: _List_Nil,
			nodeListSize: 0,
			tail: A3(
				elm$core$Elm$JsArray$indexedMap,
				func,
				elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.nodeListSize * elm$core$Array$branchFactor;
					var mappedLeaf = elm$core$Array$Leaf(
						A3(elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						nodeList: A2(elm$core$List$cons, mappedLeaf, builder.nodeList),
						nodeListSize: builder.nodeListSize + 1,
						tail: builder.tail
					};
				}
			});
		return A2(
			elm$core$Array$builderToArray,
			true,
			A3(elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						elm$core$List$cons,
						sep,
						A2(elm$core$List$cons, x, rest));
				});
			var spersed = A3(elm$core$List$foldr, step, _List_Nil, tl);
			return A2(elm$core$List$cons, hd, spersed);
		}
	});
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var the_sett$elm_color$Color$green = A4(the_sett$elm_color$Color$rgba, 115, 210, 22, 1);
var timjs$elm_collage$Collage$Core$Polyline = function (a) {
	return {$: 'Polyline', a: a};
};
var timjs$elm_collage$Collage$path = timjs$elm_collage$Collage$Core$Polyline;
var timjs$elm_collage$Collage$semithick = 3.0;
var timjs$elm_collage$Collage$traced = F2(
	function (linestyle, p) {
		return timjs$elm_collage$Collage$Core$collage(
			A2(timjs$elm_collage$Collage$Core$Path, linestyle, p));
	});
var timjs$elm_collage$Collage$Layout$Down = {$: 'Down'};
var timjs$elm_collage$Collage$Layout$Right = {$: 'Right'};
var timjs$elm_collage$Collage$opposite = function (_n0) {
	var x = _n0.a;
	var y = _n0.b;
	return _Utils_Tuple2(-x, -y);
};
var timjs$elm_collage$Collage$shift = F2(
	function (_n0, collage) {
		var dx = _n0.a;
		var dy = _n0.b;
		var _n1 = collage.shift;
		var x = _n1.a;
		var y = _n1.b;
		return _Utils_update(
			collage,
			{
				shift: _Utils_Tuple2(x + dx, y + dy)
			});
	});
var timjs$elm_collage$Collage$Layout$align = F2(
	function (anchor, col) {
		return A2(
			timjs$elm_collage$Collage$shift,
			timjs$elm_collage$Collage$opposite(
				anchor(col)),
			col);
	});
var timjs$elm_collage$Collage$Layout$envelope = F2(
	function (dir, col) {
		var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
		var toTop = _n0.toTop;
		var toBottom = _n0.toBottom;
		var toLeft = _n0.toLeft;
		var toRight = _n0.toRight;
		switch (dir.$) {
			case 'Up':
				return toTop;
			case 'Down':
				return toBottom;
			case 'Right':
				return toRight;
			default:
				return toLeft;
		}
	});
var timjs$elm_collage$Collage$Layout$Left = {$: 'Left'};
var timjs$elm_collage$Collage$Layout$Up = {$: 'Up'};
var timjs$elm_collage$Collage$Layout$facing = function (dir) {
	switch (dir.$) {
		case 'Up':
			return timjs$elm_collage$Collage$Layout$Down;
		case 'Down':
			return timjs$elm_collage$Collage$Layout$Up;
		case 'Right':
			return timjs$elm_collage$Collage$Layout$Left;
		default:
			return timjs$elm_collage$Collage$Layout$Right;
	}
};
var timjs$elm_collage$Collage$Layout$place = F3(
	function (dir, a, b) {
		var len = A2(timjs$elm_collage$Collage$Layout$envelope, dir, a) + A2(
			timjs$elm_collage$Collage$Layout$envelope,
			timjs$elm_collage$Collage$Layout$facing(dir),
			b);
		var move = function () {
			switch (dir.$) {
				case 'Up':
					return _Utils_Tuple2(0, len);
				case 'Down':
					return _Utils_Tuple2(0, -len);
				case 'Right':
					return _Utils_Tuple2(len, 0);
				default:
					return _Utils_Tuple2(-len, 0);
			}
		}();
		return A2(timjs$elm_collage$Collage$shift, move, b);
	});
var timjs$elm_collage$Collage$Core$Group = function (a) {
	return {$: 'Group', a: a};
};
var timjs$elm_collage$Collage$group = A2(elm$core$Basics$composeL, timjs$elm_collage$Collage$Core$collage, timjs$elm_collage$Collage$Core$Group);
var timjs$elm_collage$Collage$Layout$stack = timjs$elm_collage$Collage$group;
var timjs$elm_collage$Collage$Layout$beside = F3(
	function (dir, a, b) {
		return timjs$elm_collage$Collage$Layout$stack(
			_List_fromArray(
				[
					a,
					A3(timjs$elm_collage$Collage$Layout$place, dir, a, b)
				]));
	});
var timjs$elm_collage$Collage$invisible = A2(timjs$elm_collage$Collage$solid, 0, timjs$elm_collage$Collage$transparent);
var timjs$elm_collage$Collage$Layout$spacer = F2(
	function (w, h) {
		return A2(
			timjs$elm_collage$Collage$styled,
			_Utils_Tuple2(timjs$elm_collage$Collage$transparent, timjs$elm_collage$Collage$invisible),
			A2(timjs$elm_collage$Collage$rectangle, w, h));
	});
var timjs$elm_collage$Collage$Layout$empty = A2(timjs$elm_collage$Collage$Layout$spacer, 0, 0);
var timjs$elm_collage$Collage$Layout$horizontal = A2(
	elm$core$List$foldr,
	timjs$elm_collage$Collage$Layout$beside(timjs$elm_collage$Collage$Layout$Right),
	timjs$elm_collage$Collage$Layout$empty);
var timjs$elm_collage$Collage$Layout$name = F2(
	function (string, col) {
		return _Utils_update(
			col,
			{
				name: elm$core$Maybe$Just(string)
			});
	});
var timjs$elm_collage$Collage$Layout$vertical = A2(
	elm$core$List$foldr,
	timjs$elm_collage$Collage$Layout$beside(timjs$elm_collage$Collage$Layout$Down),
	timjs$elm_collage$Collage$Layout$empty);
var author$project$Diagram$drawDiagram = F2(
	function (level, data) {
		var _n3 = A2(author$project$Diagram$makeBlocks, data, level);
		var bl = _n3.a;
		var ds = _n3.b;
		var collage = timjs$elm_collage$Collage$Layout$stack(
			_List_fromArray(
				[
					bl,
					A3(
					timjs$elm_collage$Collage$Layout$place,
					timjs$elm_collage$Collage$Layout$Down,
					bl,
					A3(timjs$elm_collage$Collage$Layout$place, timjs$elm_collage$Collage$Layout$Right, bl, ds))
				]));
		var lines = A2(
			elm$core$List$filterMap,
			function (i) {
				var _n4 = _Utils_Tuple2(
					A3(author$project$Diagram$getBlock, collage, level, i),
					A3(author$project$Diagram$getDesc, collage, level, i));
				if ((_n4.a.$ === 'Just') && (_n4.b.$ === 'Just')) {
					var f = _n4.a.a;
					var x1 = f.a;
					var y1 = f.b;
					var t = _n4.b.a;
					var x2 = t.a;
					var y2 = t.b;
					return elm$core$Maybe$Just(
						A2(
							timjs$elm_collage$Collage$traced,
							A2(
								timjs$elm_collage$Collage$solid,
								timjs$elm_collage$Collage$semithick,
								timjs$elm_collage$Collage$uniform(the_sett$elm_color$Color$green)),
							timjs$elm_collage$Collage$path(
								_List_fromArray(
									[
										f,
										_Utils_Tuple2(x1, y2),
										t
									]))));
				} else {
					return elm$core$Maybe$Nothing;
				}
			},
			elm$core$Array$toList(
				A2(
					elm$core$Array$initialize,
					elm$core$List$length(data),
					elm$core$Basics$identity)));
		return timjs$elm_collage$Collage$Layout$stack(
			A2(elm$core$List$cons, collage, lines));
	});
var author$project$Diagram$makeBlockAndDesc = F3(
	function (level, i, _n2) {
		var label = _n2.a;
		var element = _n2.b;
		return _Utils_Tuple2(
			A2(
				timjs$elm_collage$Collage$Layout$name,
				A3(author$project$Diagram$blockName, 'block', level, i),
				author$project$Diagram$makeBox(label)),
			A2(
				timjs$elm_collage$Collage$Layout$align,
				timjs$elm_collage$Collage$Layout$left,
				timjs$elm_collage$Collage$Layout$vertical(
					_List_fromArray(
						[
							A2(timjs$elm_collage$Collage$Layout$spacer, 0, 10),
							A2(
							timjs$elm_collage$Collage$Layout$name,
							A3(author$project$Diagram$blockName, 'desc', level, i),
							timjs$elm_collage$Collage$Layout$horizontal(
								_List_fromArray(
									[
										A2(timjs$elm_collage$Collage$Layout$spacer, 10, 0),
										A2(author$project$Diagram$makeDesc, element, level + 1)
									])))
						]))));
	});
var author$project$Diagram$makeBlocks = F2(
	function (data, level) {
		var _n1 = elm$core$List$unzip(
			elm$core$Array$toList(
				A2(
					elm$core$Array$indexedMap,
					author$project$Diagram$makeBlockAndDesc(level),
					elm$core$Array$fromList(data))));
		var blocks = _n1.a;
		var descs = _n1.b;
		return _Utils_Tuple2(
			timjs$elm_collage$Collage$Layout$horizontal(
				A2(
					elm$core$List$intersperse,
					A2(timjs$elm_collage$Collage$Layout$spacer, 10, 0),
					blocks)),
			timjs$elm_collage$Collage$Layout$vertical(
				elm$core$List$reverse(
					A2(
						elm$core$List$intersperse,
						A2(timjs$elm_collage$Collage$Layout$spacer, 0, 10),
						descs))));
	});
var author$project$Diagram$makeDesc = F2(
	function (element, level) {
		if (element.$ === 'Leaf') {
			var label = element.a;
			return timjs$elm_collage$Collage$rendered(
				timjs$elm_collage$Collage$Text$fromString(label));
		} else {
			var label = element.a;
			var data = element.b;
			return timjs$elm_collage$Collage$Layout$horizontal(
				_List_fromArray(
					[
						timjs$elm_collage$Collage$rendered(
						timjs$elm_collage$Collage$Text$fromString(label)),
						A2(timjs$elm_collage$Collage$Layout$spacer, 10, 0),
						A2(author$project$Diagram$drawDiagram, level, data)
					]));
		}
	});
var timjs$elm_collage$Collage$Layout$topLeft = function (col) {
	var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
	var toLeft = _n0.toLeft;
	var toTop = _n0.toTop;
	return _Utils_Tuple2(-toLeft, toTop);
};
var elm$core$String$fromFloat = _String_fromNumber;
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$html$Html$div = _VirtualDom_node('div');
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$version = _VirtualDom_attribute('version');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var elm$svg$Svg$circle = elm$svg$Svg$trustedNode('circle');
var elm$svg$Svg$ellipse = elm$svg$Svg$trustedNode('ellipse');
var elm$svg$Svg$foreignObject = elm$svg$Svg$trustedNode('foreignObject');
var elm$svg$Svg$g = elm$svg$Svg$trustedNode('g');
var elm$svg$Svg$image = elm$svg$Svg$trustedNode('image');
var elm$svg$Svg$polygon = elm$svg$Svg$trustedNode('polygon');
var elm$svg$Svg$polyline = elm$svg$Svg$trustedNode('polyline');
var elm$svg$Svg$rect = elm$svg$Svg$trustedNode('rect');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$svg$Svg$text = elm$virtual_dom$VirtualDom$text;
var elm$svg$Svg$text_ = elm$svg$Svg$trustedNode('text');
var elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
var elm$svg$Svg$Attributes$ry = _VirtualDom_attribute('ry');
var elm$svg$Svg$Attributes$xlinkHref = function (value) {
	return A3(
		_VirtualDom_attributeNS,
		'http://www.w3.org/1999/xlink',
		'xlink:href',
		_VirtualDom_noJavaScriptUri(value));
};
var elm$svg$Svg$Attributes$dominantBaseline = _VirtualDom_attribute('dominant-baseline');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var elm$svg$Svg$Attributes$fontFamily = _VirtualDom_attribute('font-family');
var elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var elm$svg$Svg$Attributes$fontStyle = _VirtualDom_attribute('font-style');
var elm$svg$Svg$Attributes$fontVariant = _VirtualDom_attribute('font-variant');
var elm$svg$Svg$Attributes$fontWeight = _VirtualDom_attribute('font-weight');
var elm$svg$Svg$Attributes$opacity = _VirtualDom_attribute('opacity');
var elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
var elm$svg$Svg$Attributes$strokeDashoffset = _VirtualDom_attribute('stroke-dashoffset');
var elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var elm$svg$Svg$Attributes$strokeOpacity = _VirtualDom_attribute('stroke-opacity');
var elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var elm$svg$Svg$Attributes$textDecoration = _VirtualDom_attribute('text-decoration');
var elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var timjs$elm_collage$Collage$Render$decodeCap = function (cap) {
	switch (cap.$) {
		case 'Round':
			return 'round';
		case 'Padded':
			return 'square';
		default:
			return 'butt';
	}
};
var timjs$elm_collage$Collage$Render$decodeDashing = function (ds) {
	var decodeOnOff = function (_n0) {
		var x = _n0.a;
		var y = _n0.b;
		return A2(
			elm$core$String$join,
			',',
			_List_fromArray(
				[
					elm$core$String$fromInt(x),
					elm$core$String$fromInt(y)
				]));
	};
	return A2(
		elm$core$String$join,
		' ',
		A2(elm$core$List$map, decodeOnOff, ds));
};
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var the_sett$elm_color$Color$toRgb = elm$core$Basics$identity;
var timjs$elm_collage$Collage$Render$decodeColor = function (c) {
	var _n0 = the_sett$elm_color$Color$toRgb(c);
	var red = _n0.red;
	var green = _n0.green;
	var blue = _n0.blue;
	var b = elm$core$String$fromInt(blue);
	var g = elm$core$String$fromInt(green);
	var r = elm$core$String$fromInt(red);
	return elm$core$String$concat(
		_List_fromArray(
			['rgb(', r, ',', g, ',', b, ')']));
};
var timjs$elm_collage$Collage$Render$decodeFill = function (fs) {
	if (fs.$ === 'Uniform') {
		var c = fs.a;
		return timjs$elm_collage$Collage$Render$decodeColor(c);
	} else {
		return 'none';
	}
};
var timjs$elm_collage$Collage$Render$decodeOpacity = function (c) {
	var _n0 = the_sett$elm_color$Color$toRgb(c);
	var alpha = _n0.alpha;
	return elm$core$String$fromFloat(alpha);
};
var timjs$elm_collage$Collage$Render$decodeFillOpacity = function (fs) {
	if (fs.$ === 'Uniform') {
		var c = fs.a;
		return timjs$elm_collage$Collage$Render$decodeOpacity(c);
	} else {
		return '0';
	}
};
var timjs$elm_collage$Collage$Render$decodeJoin = function (join) {
	switch (join.$) {
		case 'Smooth':
			return 'round';
		case 'Sharp':
			return 'miter';
		default:
			return 'bevel';
	}
};
var elm$core$Basics$pi = _Basics_pi;
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var timjs$elm_collage$Collage$Render$decodeTransform = function (collage) {
	var sy = elm$core$String$fromFloat(collage.scale.b);
	var sx = elm$core$String$fromFloat(collage.scale.a);
	var r = elm$core$String$fromFloat((((-collage.rotation) / 2) / elm$core$Basics$pi) * 360);
	var dy = elm$core$String$fromFloat(-collage.shift.b);
	var dx = elm$core$String$fromFloat(collage.shift.a);
	return elm$core$String$concat(
		_List_fromArray(
			['translate(', dx, ',', dy, ') scale(', sx, ',', sy, ') rotate(', r, ')']));
};
var timjs$elm_collage$Collage$Render$attrs = function (collage) {
	var _n0 = collage.basic;
	switch (_n0.$) {
		case 'Path':
			var line = _n0.a;
			return _List_fromArray(
				[
					elm$svg$Svg$Attributes$stroke(
					timjs$elm_collage$Collage$Render$decodeFill(line.fill)),
					elm$svg$Svg$Attributes$strokeOpacity(
					timjs$elm_collage$Collage$Render$decodeFillOpacity(line.fill)),
					elm$svg$Svg$Attributes$strokeWidth(
					elm$core$String$fromFloat(line.thickness)),
					elm$svg$Svg$Attributes$strokeLinecap(
					timjs$elm_collage$Collage$Render$decodeCap(line.cap)),
					elm$svg$Svg$Attributes$strokeLinejoin(
					timjs$elm_collage$Collage$Render$decodeJoin(line.join)),
					elm$svg$Svg$Attributes$fill('none'),
					elm$svg$Svg$Attributes$opacity(
					elm$core$String$fromFloat(collage.opacity)),
					elm$svg$Svg$Attributes$transform(
					timjs$elm_collage$Collage$Render$decodeTransform(collage)),
					elm$svg$Svg$Attributes$strokeDashoffset(
					elm$core$String$fromInt(line.dashPhase)),
					elm$svg$Svg$Attributes$strokeDasharray(
					timjs$elm_collage$Collage$Render$decodeDashing(line.dashPattern))
				]);
		case 'Shape':
			var _n1 = _n0.a;
			var fill = _n1.a;
			var line = _n1.b;
			return _List_fromArray(
				[
					elm$svg$Svg$Attributes$fill(
					timjs$elm_collage$Collage$Render$decodeFill(fill)),
					elm$svg$Svg$Attributes$fillOpacity(
					timjs$elm_collage$Collage$Render$decodeFillOpacity(fill)),
					elm$svg$Svg$Attributes$stroke(
					timjs$elm_collage$Collage$Render$decodeFill(line.fill)),
					elm$svg$Svg$Attributes$strokeOpacity(
					timjs$elm_collage$Collage$Render$decodeFillOpacity(line.fill)),
					elm$svg$Svg$Attributes$strokeWidth(
					elm$core$String$fromFloat(line.thickness)),
					elm$svg$Svg$Attributes$strokeLinecap(
					timjs$elm_collage$Collage$Render$decodeCap(line.cap)),
					elm$svg$Svg$Attributes$strokeLinejoin(
					timjs$elm_collage$Collage$Render$decodeJoin(line.join)),
					elm$svg$Svg$Attributes$opacity(
					elm$core$String$fromFloat(collage.opacity)),
					elm$svg$Svg$Attributes$transform(
					timjs$elm_collage$Collage$Render$decodeTransform(collage)),
					elm$svg$Svg$Attributes$strokeDashoffset(
					elm$core$String$fromInt(line.dashPhase)),
					elm$svg$Svg$Attributes$strokeDasharray(
					timjs$elm_collage$Collage$Render$decodeDashing(line.dashPattern))
				]);
		case 'Text':
			var _n2 = _n0.b;
			var style = _n2.a;
			var str = _n2.b;
			return _List_fromArray(
				[
					elm$svg$Svg$Attributes$fill(
					timjs$elm_collage$Collage$Render$decodeFill(
						timjs$elm_collage$Collage$Core$Uniform(style.color))),
					elm$svg$Svg$Attributes$fontFamily(
					function () {
						var _n3 = style.typeface;
						switch (_n3.$) {
							case 'Serif':
								return 'serif';
							case 'Sansserif':
								return 'sans-serif';
							case 'Monospace':
								return 'monospace';
							default:
								var name = _n3.a;
								return name;
						}
					}()),
					elm$svg$Svg$Attributes$fontSize(
					elm$core$String$fromInt(style.size)),
					elm$svg$Svg$Attributes$fontWeight(
					function () {
						var _n4 = style.weight;
						switch (_n4.$) {
							case 'Thin':
								return '200';
							case 'Light':
								return '300';
							case 'Regular':
								return 'normal';
							case 'Medium':
								return '500';
							case 'SemiBold':
								return '600';
							case 'Bold':
								return 'bold';
							default:
								return '800';
						}
					}()),
					elm$svg$Svg$Attributes$fontStyle(
					function () {
						var _n5 = style.shape;
						switch (_n5.$) {
							case 'Upright':
								return 'normal';
							case 'SmallCaps':
								return 'normal';
							case 'Slanted':
								return 'oblique';
							default:
								return 'italic';
						}
					}()),
					elm$svg$Svg$Attributes$fontVariant(
					function () {
						var _n6 = style.shape;
						if (_n6.$ === 'SmallCaps') {
							return 'small-caps';
						} else {
							return 'normal';
						}
					}()),
					elm$svg$Svg$Attributes$textDecoration(
					function () {
						var _n7 = style.line;
						switch (_n7.$) {
							case 'None':
								return 'none';
							case 'Under':
								return 'underline';
							case 'Over':
								return 'overline';
							default:
								return 'line-through';
						}
					}()),
					elm$svg$Svg$Attributes$textAnchor('middle'),
					elm$svg$Svg$Attributes$dominantBaseline('middle'),
					elm$svg$Svg$Attributes$transform(
					timjs$elm_collage$Collage$Render$decodeTransform(collage))
				]);
		default:
			return _List_fromArray(
				[
					elm$svg$Svg$Attributes$transform(
					timjs$elm_collage$Collage$Render$decodeTransform(collage))
				]);
	}
};
var elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var timjs$elm_collage$Collage$Render$box = F2(
	function (w, h) {
		return _List_fromArray(
			[
				elm$svg$Svg$Attributes$width(
				elm$core$String$fromFloat(w)),
				elm$svg$Svg$Attributes$height(
				elm$core$String$fromFloat(h)),
				elm$svg$Svg$Attributes$x(
				elm$core$String$fromFloat((-w) / 2)),
				elm$svg$Svg$Attributes$y(
				elm$core$String$fromFloat((-h) / 2))
			]);
	});
var timjs$elm_collage$Collage$Render$decodePoints = function (ps) {
	return A2(
		elm$core$String$join,
		' ',
		A2(
			elm$core$List$map,
			function (_n0) {
				var x = _n0.a;
				var y = _n0.b;
				return A2(
					elm$core$String$join,
					',',
					_List_fromArray(
						[
							elm$core$String$fromFloat(x),
							elm$core$String$fromFloat(-y)
						]));
			},
			ps));
};
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$svg$Svg$Events$on = elm$html$Html$Events$on;
var timjs$elm_collage$Helpers$uncurry = F2(
	function (f, _n0) {
		var a = _n0.a;
		var b = _n0.b;
		return A2(f, a, b);
	});
var timjs$elm_collage$Collage$Render$events = function (handlers) {
	return A2(
		elm$core$List$map,
		timjs$elm_collage$Helpers$uncurry(elm$svg$Svg$Events$on),
		handlers);
};
var timjs$elm_collage$Collage$Render$render = function (collage) {
	render:
	while (true) {
		var name = A2(elm$core$Maybe$withDefault, '_unnamed_', collage.name);
		var _n0 = collage.basic;
		switch (_n0.$) {
			case 'Path':
				var style = _n0.a;
				var path = _n0.b;
				var ps = path.a;
				return A2(
					elm$svg$Svg$polyline,
					_Utils_ap(
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$id(name),
								elm$svg$Svg$Attributes$points(
								timjs$elm_collage$Collage$Render$decodePoints(ps))
							]),
						_Utils_ap(
							timjs$elm_collage$Collage$Render$attrs(collage),
							timjs$elm_collage$Collage$Render$events(collage.handlers))),
					_List_Nil);
			case 'Shape':
				var _n2 = _n0.a;
				var fill = _n2.a;
				var line = _n2.b;
				var shape = _n0.b;
				switch (shape.$) {
					case 'Polygon':
						var ps = shape.a;
						return A2(
							elm$svg$Svg$polygon,
							_Utils_ap(
								_List_fromArray(
									[
										elm$svg$Svg$Attributes$id(name),
										elm$svg$Svg$Attributes$points(
										timjs$elm_collage$Collage$Render$decodePoints(ps))
									]),
								_Utils_ap(
									timjs$elm_collage$Collage$Render$attrs(collage),
									timjs$elm_collage$Collage$Render$events(collage.handlers))),
							_List_Nil);
					case 'Circle':
						var r = shape.a;
						return A2(
							elm$svg$Svg$circle,
							_Utils_ap(
								_List_fromArray(
									[
										elm$svg$Svg$Attributes$id(name),
										elm$svg$Svg$Attributes$r(
										elm$core$String$fromFloat(r))
									]),
								_Utils_ap(
									timjs$elm_collage$Collage$Render$attrs(collage),
									timjs$elm_collage$Collage$Render$events(collage.handlers))),
							_List_Nil);
					case 'Ellipse':
						var rx = shape.a;
						var ry = shape.b;
						return A2(
							elm$svg$Svg$ellipse,
							_Utils_ap(
								_List_fromArray(
									[
										elm$svg$Svg$Attributes$id(name),
										elm$svg$Svg$Attributes$rx(
										elm$core$String$fromFloat(rx)),
										elm$svg$Svg$Attributes$ry(
										elm$core$String$fromFloat(ry))
									]),
								_Utils_ap(
									timjs$elm_collage$Collage$Render$attrs(collage),
									timjs$elm_collage$Collage$Render$events(collage.handlers))),
							_List_Nil);
					case 'Rectangle':
						var w = shape.a;
						var h = shape.b;
						var r = shape.c;
						return A2(
							elm$svg$Svg$rect,
							_Utils_ap(
								_List_fromArray(
									[
										elm$svg$Svg$Attributes$id(name),
										elm$svg$Svg$Attributes$rx(
										elm$core$String$fromFloat(r)),
										elm$svg$Svg$Attributes$ry(
										elm$core$String$fromFloat(r))
									]),
								_Utils_ap(
									A2(timjs$elm_collage$Collage$Render$box, w, h),
									_Utils_ap(
										timjs$elm_collage$Collage$Render$attrs(collage),
										timjs$elm_collage$Collage$Render$events(collage.handlers)))),
							_List_Nil);
					default:
						var path = shape.a;
						var $temp$collage = _Utils_update(
							collage,
							{
								basic: A2(timjs$elm_collage$Collage$Core$Path, line, path)
							});
						collage = $temp$collage;
						continue render;
				}
			case 'Text':
				var _n4 = _n0.b;
				var style = _n4.a;
				var str = _n4.b;
				return A2(
					elm$svg$Svg$text_,
					_Utils_ap(
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$id(name)
							]),
						_Utils_ap(
							timjs$elm_collage$Collage$Render$attrs(collage),
							timjs$elm_collage$Collage$Render$events(collage.handlers))),
					_List_fromArray(
						[
							elm$svg$Svg$text(str)
						]));
			case 'Image':
				var _n5 = _n0.a;
				var w = _n5.a;
				var h = _n5.b;
				var url = _n0.b;
				return A2(
					elm$svg$Svg$image,
					_Utils_ap(
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$id(name),
								elm$svg$Svg$Attributes$xlinkHref(url)
							]),
						_Utils_ap(
							A2(timjs$elm_collage$Collage$Render$box, w, h),
							_Utils_ap(
								timjs$elm_collage$Collage$Render$attrs(collage),
								timjs$elm_collage$Collage$Render$events(collage.handlers)))),
					_List_Nil);
			case 'Html':
				var _n6 = _n0.a;
				var w = _n6.a;
				var h = _n6.b;
				var html = _n0.b;
				return A2(
					elm$svg$Svg$foreignObject,
					_Utils_ap(
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$id(name)
							]),
						_Utils_ap(
							A2(timjs$elm_collage$Collage$Render$box, w, h),
							_Utils_ap(
								timjs$elm_collage$Collage$Render$attrs(collage),
								timjs$elm_collage$Collage$Render$events(collage.handlers)))),
					_List_fromArray(
						[html]));
			case 'Group':
				var collages = _n0.a;
				return A2(
					elm$svg$Svg$g,
					A2(
						elm$core$List$cons,
						elm$svg$Svg$Attributes$id(name),
						_Utils_ap(
							timjs$elm_collage$Collage$Render$attrs(collage),
							timjs$elm_collage$Collage$Render$events(collage.handlers))),
					A3(
						elm$core$List$foldl,
						F2(
							function (col, res) {
								return A2(
									elm$core$List$cons,
									timjs$elm_collage$Collage$Render$render(col),
									res);
							}),
						_List_Nil,
						collages));
			default:
				var fore = _n0.a;
				var back = _n0.b;
				var $temp$collage = _Utils_update(
					collage,
					{
						basic: timjs$elm_collage$Collage$Core$Group(
							_List_fromArray(
								[fore, back]))
					});
				collage = $temp$collage;
				continue render;
		}
	}
};
var timjs$elm_collage$Collage$Render$svgAbsolute = F2(
	function (_n0, collage) {
		var width = _n0.a;
		var height = _n0.b;
		var w = elm$core$String$fromFloat(width);
		var h = elm$core$String$fromFloat(height);
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$svg,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$width(w),
							elm$svg$Svg$Attributes$height(h),
							elm$svg$Svg$Attributes$version('1.1')
						]),
					_List_fromArray(
						[
							timjs$elm_collage$Collage$Render$render(collage)
						]))
				]));
	});
var timjs$elm_collage$Collage$Render$svg = function (collage) {
	return A2(
		timjs$elm_collage$Collage$Render$svgAbsolute,
		_Utils_Tuple2(
			timjs$elm_collage$Collage$Layout$width(collage),
			timjs$elm_collage$Collage$Layout$height(collage)),
		A2(timjs$elm_collage$Collage$Layout$align, timjs$elm_collage$Collage$Layout$topLeft, collage));
};
var author$project$Diagram$draw = function (data) {
	return timjs$elm_collage$Collage$Render$svg(
		A2(author$project$Diagram$drawDiagram, 0, data));
};
var author$project$Diagram$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var author$project$Encode$encodeMode = function (mode) {
	switch (mode.$) {
		case 'MEMORY':
			return 0;
		case 'MEMORY_DISP8':
			return 1;
		case 'MEMORY_DISP32':
			return 2;
		default:
			return 3;
	}
};
var author$project$Encode$encodeScale = function (scale) {
	switch (scale) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 4:
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$slice = _String_slice;
var elm$core$String$fromList = _String_fromList;
var elm$core$Basics$modBy = _Basics_modBy;
var rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					elm$core$List$cons,
					rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					elm$core$List$cons,
					rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2(elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var rtfeldman$elm_hex$Hex$toString = function (num) {
	return elm$core$String$fromList(
		(num < 0) ? A2(
			elm$core$List$cons,
			_Utils_chr('-'),
			A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var author$project$EncodeDiagram$toByteHex = function (value) {
	return A3(
		elm$core$String$slice,
		1,
		3,
		rtfeldman$elm_hex$Hex$toString(value + 256));
};
var author$project$EncodeDiagram$bytes = function (values) {
	return A2(
		elm$core$String$join,
		' ',
		A2(elm$core$List$map, author$project$EncodeDiagram$toByteHex, values));
};
var author$project$Diagram$Node = F2(
	function (a, b) {
		return {$: 'Node', a: a, b: b};
	});
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var author$project$EncodeDiagram$toBits = F2(
	function (size, value) {
		return A2(
			elm$core$String$join,
			'',
			elm$core$Array$toList(
				A2(
					elm$core$Array$initialize,
					size,
					function (i) {
						return elm$core$String$fromInt(1 & (value >> ((size - i) - 1)));
					})));
	});
var elm$core$Bitwise$or = _Bitwise_or;
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var author$project$EncodeDiagram$encodeIntoByte = F2(
	function (encoding, values) {
		var o = A3(
			elm$core$List$map2,
			F2(
				function (el, v) {
					return _Utils_Tuple2(
						A2(author$project$EncodeDiagram$toBits, el.size, v),
						author$project$Diagram$Leaf(el.name));
				}),
			encoding.elements,
			values);
		var e = elm$core$List$singleton(
			A3(
				elm$core$List$foldl,
				elm$core$Bitwise$or,
				0,
				A3(
					elm$core$List$map2,
					F2(
						function (el, v) {
							return v << el.shift;
						}),
					encoding.elements,
					values)));
		return _Utils_Tuple2(
			author$project$EncodeDiagram$bytes(e),
			A2(author$project$Diagram$Node, encoding.name, o));
	});
var author$project$EncodeDiagram$modRmEncoding = {
	elements: _List_fromArray(
		[
			{name: 'Mode', shift: 6, size: 2},
			{name: 'Reg', shift: 3, size: 3},
			{name: 'RM', shift: 0, size: 3}
		]),
	name: 'ModRM'
};
var author$project$EncodeDiagram$opRegEncoding = {
	elements: _List_fromArray(
		[
			{name: 'Opcode', shift: 3, size: 5},
			{name: 'Reg', shift: 0, size: 3}
		]),
	name: 'Opcode and Register'
};
var author$project$EncodeDiagram$sibEncoding = {
	elements: _List_fromArray(
		[
			{name: 'Scale', shift: 6, size: 2},
			{name: 'Index', shift: 3, size: 3},
			{name: 'Base', shift: 0, size: 3}
		]),
	name: 'SIB'
};
var author$project$EncodeDiagram$toLitteEndian = F2(
	function (size, value) {
		return A2(
			elm$core$List$map,
			function (i) {
				return 255 & (value >>> (i * 8));
			},
			A2(elm$core$List$range, 0, ((size / 8) | 0) - 1));
	});
var author$project$Syntax$toDisplayInt = function (value) {
	return (value < 1000) ? elm$core$String$fromInt(value) : (rtfeldman$elm_hex$Hex$toString(value) + 'h');
};
var author$project$X86$bitSize = function (size) {
	switch (size.$) {
		case 'S_8':
			return 8;
		case 'S_16':
			return 16;
		default:
			return 32;
	}
};
var author$project$EncodeDiagram$encodeElement = function (element) {
	switch (element.$) {
		case 'Prefix':
			var value = element.a;
			return _Utils_Tuple2(
				author$project$EncodeDiagram$bytes(
					_List_fromArray(
						[value])),
				author$project$Diagram$Leaf('Prefix'));
		case 'Opcode':
			var value = element.a;
			return _Utils_Tuple2(
				author$project$EncodeDiagram$bytes(
					_List_fromArray(
						[value])),
				author$project$Diagram$Leaf('Opcode'));
		case 'OpcodeAndReg':
			var _n1 = element.a;
			var opcode = _n1.a;
			var reg = _n1.b;
			return A2(
				author$project$EncodeDiagram$encodeIntoByte,
				author$project$EncodeDiagram$opRegEncoding,
				_List_fromArray(
					[opcode, reg]));
		case 'ModRM':
			var _n2 = element.a;
			var mode = _n2.a;
			var reg = _n2.b;
			var rm = _n2.c;
			return A2(
				author$project$EncodeDiagram$encodeIntoByte,
				author$project$EncodeDiagram$modRmEncoding,
				_List_fromArray(
					[
						author$project$Encode$encodeMode(mode),
						reg,
						rm
					]));
		case 'Sib':
			var _n3 = element.a;
			var base = _n3.a;
			var index = _n3.b;
			var scale = _n3.c;
			return A2(
				author$project$EncodeDiagram$encodeIntoByte,
				author$project$EncodeDiagram$sibEncoding,
				_List_fromArray(
					[
						author$project$Encode$encodeScale(scale),
						index,
						base
					]));
		case 'Disp8':
			var value = element.a;
			return _Utils_Tuple2(
				author$project$EncodeDiagram$bytes(
					_List_fromArray(
						[value])),
				author$project$Diagram$Leaf(
					'Displacement: ' + author$project$Syntax$toDisplayInt(value)));
		case 'Disp32':
			var value = element.a;
			return _Utils_Tuple2(
				author$project$EncodeDiagram$bytes(
					A2(author$project$EncodeDiagram$toLitteEndian, 32, value)),
				author$project$Diagram$Leaf(
					'Displacement: ' + author$project$Syntax$toDisplayInt(value)));
		default:
			var _n4 = element.a;
			var size = _n4.a;
			var value = _n4.b;
			return _Utils_Tuple2(
				author$project$EncodeDiagram$bytes(
					A2(
						author$project$EncodeDiagram$toLitteEndian,
						author$project$X86$bitSize(size),
						value)),
				author$project$Diagram$Leaf(
					'Immediat value: ' + author$project$Syntax$toDisplayInt(value)));
	}
};
var author$project$EncodeDiagram$encode = function (elements) {
	return author$project$Diagram$draw(
		A2(elm$core$List$map, author$project$EncodeDiagram$encodeElement, elements));
};
var author$project$Main$BitSizeChange = {$: 'BitSizeChange'};
var author$project$Main$Change = function (a) {
	return {$: 'Change', a: a};
};
var author$project$Main$OperationModeChange = {$: 'OperationModeChange'};
var author$project$X86$S_16 = {$: 'S_16'};
var author$project$X86$S_16_32 = {$: 'S_16_32'};
var author$project$X86$S_32 = {$: 'S_32'};
var author$project$Decode$getContextSize = F2(
	function (size, context) {
		return _Utils_eq(size, author$project$X86$S_16_32) ? (context.is32Bits ? author$project$X86$S_32 : author$project$X86$S_16) : size;
	});
var author$project$Syntax$AstRegister = function (a) {
	return {$: 'AstRegister', a: a};
};
var author$project$X86$regName = F2(
	function (size, reg) {
		switch (reg.$) {
			case 'AX':
				return _Utils_eq(size, author$project$X86$S_16) ? 'AX' : 'EAX';
			case 'AL':
				return 'AL';
			default:
				return 'DX';
		}
	});
var author$project$Decode$decodeFixedRegister = F3(
	function (size, reg, context) {
		return _Utils_update(
			context,
			{
				operands: A2(
					elm$core$List$cons,
					author$project$Syntax$AstRegister(
						A2(
							author$project$X86$regName,
							A2(author$project$Decode$getContextSize, size, context),
							reg)),
					context.operands)
			});
	});
var author$project$Decode$getByte = function (context) {
	var _n0 = context.bytes;
	if (_n0.b) {
		var x = _n0.a;
		var tail = _n0.b;
		return _Utils_Tuple2(
			elm$core$Maybe$Just(x),
			_Utils_update(
				context,
				{bytes: tail}));
	} else {
		return _Utils_Tuple2(
			elm$core$Maybe$Nothing,
			_Utils_update(
				context,
				{error: 'Not enough bytes'}));
	}
};
var author$project$Decode$getLong = function (context) {
	var number = function (l) {
		return A3(
			elm$core$List$foldl,
			F2(
				function (a, s) {
					return a | (s << 8);
				}),
			0,
			l);
	};
	var _n0 = context.bytes;
	if (((_n0.b && _n0.b.b) && _n0.b.b.b) && _n0.b.b.b.b) {
		var x = _n0.a;
		var _n1 = _n0.b;
		var y = _n1.a;
		var _n2 = _n1.b;
		var z = _n2.a;
		var _n3 = _n2.b;
		var w = _n3.a;
		var tail = _n3.b;
		return _Utils_Tuple2(
			elm$core$Maybe$Just(
				number(
					_List_fromArray(
						[w, z, y, x]))),
			_Utils_update(
				context,
				{bytes: tail}));
	} else {
		return _Utils_Tuple2(
			elm$core$Maybe$Nothing,
			_Utils_update(
				context,
				{error: 'Not enough bytes'}));
	}
};
var author$project$Decode$getWord = function (context) {
	var _n0 = context.bytes;
	if (_n0.b && _n0.b.b) {
		var x = _n0.a;
		var _n1 = _n0.b;
		var y = _n1.a;
		var tail = _n1.b;
		return _Utils_Tuple2(
			elm$core$Maybe$Just(y | (x << 8)),
			_Utils_update(
				context,
				{bytes: tail}));
	} else {
		return _Utils_Tuple2(
			elm$core$Maybe$Nothing,
			_Utils_update(
				context,
				{error: 'Not enough bytes'}));
	}
};
var author$project$Encode$Immediat = function (a) {
	return {$: 'Immediat', a: a};
};
var author$project$Syntax$AstImmediat = function (a) {
	return {$: 'AstImmediat', a: a};
};
var author$project$Decode$decodeImm = F2(
	function (size, context) {
		var s = A2(author$project$Decode$getContextSize, size, context);
		var _n0 = function () {
			switch (s.$) {
				case 'S_8':
					return author$project$Decode$getByte(context);
				case 'S_16':
					return author$project$Decode$getWord(context);
				default:
					return author$project$Decode$getLong(context);
			}
		}();
		var value = _n0.a;
		var newContext = _n0.b;
		if (value.$ === 'Just') {
			var v = value.a;
			return _Utils_update(
				newContext,
				{
					elements: A2(
						elm$core$List$cons,
						author$project$Encode$Immediat(
							_Utils_Tuple2(s, v)),
						context.elements),
					operands: A2(
						elm$core$List$cons,
						author$project$Syntax$AstImmediat(v),
						context.operands)
				});
		} else {
			return newContext;
		}
	});
var author$project$Decode$decodeRegName = F2(
	function (size, r) {
		switch (size.$) {
			case 'S_8':
				switch (r) {
					case 0:
						return 'AL';
					case 1:
						return 'CL';
					case 2:
						return 'DL';
					case 3:
						return 'CL';
					case 4:
						return 'AH';
					case 5:
						return 'CH';
					case 6:
						return 'DH';
					default:
						return 'CH';
				}
			case 'S_16':
				switch (r) {
					case 0:
						return 'AX';
					case 1:
						return 'CX';
					case 2:
						return 'DX';
					case 3:
						return 'BX';
					case 4:
						return 'SP';
					case 5:
						return 'BP';
					case 6:
						return 'SI';
					default:
						return 'DI';
				}
			case 'S_32':
				switch (r) {
					case 0:
						return 'EAX';
					case 1:
						return 'ECX';
					case 2:
						return 'EDX';
					case 3:
						return 'EBX';
					case 4:
						return 'ESP';
					case 5:
						return 'EBP';
					case 6:
						return 'ESI';
					default:
						return 'EDI';
				}
			default:
				return 'RR';
		}
	});
var author$project$Syntax$AstEffectiveAddress = function (a) {
	return {$: 'AstEffectiveAddress', a: a};
};
var author$project$Decode$decodeRM = F2(
	function (size, context) {
		var _n0 = function () {
			var _n1 = context.mode;
			_n1$2:
			while (true) {
				if (_n1.$ === 'Just') {
					switch (_n1.a.$) {
						case 'REG':
							var _n2 = _n1.a;
							return _Utils_Tuple2(
								author$project$Syntax$AstRegister(
									A2(
										author$project$Decode$decodeRegName,
										A2(author$project$Decode$getContextSize, size, context),
										A2(elm$core$Maybe$withDefault, 0, context.rm))),
								context);
						case 'MEMORY':
							var _n3 = _n1.a;
							var _n4 = context.rm;
							if (_n4.$ === 'Just') {
								switch (_n4.a) {
									case 4:
										return _Utils_Tuple2(
											author$project$Syntax$AstRegister('SIB no displacement'),
											context);
									case 5:
										var s = A2(author$project$Decode$getContextSize, size, context);
										var _n5 = context.is32Bits ? author$project$Decode$getLong(context) : author$project$Decode$getWord(context);
										var v = _n5.a;
										var nc = _n5.b;
										var value = A2(elm$core$Maybe$withDefault, 0, v);
										return _Utils_Tuple2(
											author$project$Syntax$AstEffectiveAddress(
												{base: elm$core$Maybe$Nothing, displacement: value, index: elm$core$Maybe$Nothing, size: s}),
											_Utils_update(
												nc,
												{
													elements: A2(
														elm$core$List$cons,
														author$project$Encode$Immediat(
															_Utils_Tuple2(s, value)),
														context.elements)
												}));
									default:
										var rm = _n4.a;
										return _Utils_Tuple2(
											author$project$Syntax$AstEffectiveAddress(
												{
													base: elm$core$Maybe$Just(
														A2(
															author$project$Decode$decodeRegName,
															A2(author$project$Decode$getContextSize, size, context),
															rm)),
													displacement: 0,
													index: elm$core$Maybe$Nothing,
													size: size
												}),
											context);
								}
							} else {
								return _Utils_Tuple2(
									author$project$Syntax$AstRegister('expecting modrm'),
									context);
							}
						default:
							break _n1$2;
					}
				} else {
					break _n1$2;
				}
			}
			return _Utils_Tuple2(
				author$project$Syntax$AstRegister('mode error'),
				context);
		}();
		var operand = _n0.a;
		var newContext = _n0.b;
		return _Utils_update(
			newContext,
			{
				operands: A2(elm$core$List$cons, operand, newContext.operands)
			});
	});
var author$project$Decode$decodeReg = F2(
	function (size, context) {
		var operand = author$project$Syntax$AstRegister(
			A2(
				author$project$Decode$decodeRegName,
				A2(author$project$Decode$getContextSize, size, context),
				A2(elm$core$Maybe$withDefault, 0, context.reg)));
		return _Utils_update(
			context,
			{
				operands: A2(elm$core$List$cons, operand, context.operands)
			});
	});
var author$project$Decode$decodeRel = F2(
	function (size, context) {
		var _n0 = function () {
			switch (size.$) {
				case 'S_8':
					return author$project$Decode$getByte(context);
				case 'S_16':
					return author$project$Decode$getWord(context);
				case 'S_32':
					return author$project$Decode$getLong(context);
				default:
					return context.is32Bits ? author$project$Decode$getLong(context) : author$project$Decode$getWord(context);
			}
		}();
		var value = _n0.a;
		var newContext = _n0.b;
		if (value.$ === 'Just') {
			var v = value.a;
			var newPc = (newContext.pc + v) + (newContext.length - elm$core$List$length(newContext.bytes));
			return _Utils_update(
				newContext,
				{
					elements: A2(
						elm$core$List$cons,
						author$project$Encode$Immediat(
							_Utils_Tuple2(size, v)),
						context.elements),
					operands: A2(
						elm$core$List$cons,
						author$project$Syntax$AstImmediat(newPc),
						newContext.operands)
				});
		} else {
			return newContext;
		}
	});
var elm$core$Debug$toString = _Debug_toString;
var author$project$Decode$decodeOperand = F2(
	function (operand, context) {
		switch (operand.$) {
			case 'R':
				var size = operand.a;
				return A2(author$project$Decode$decodeReg, size, context);
			case 'RM':
				var size = operand.a;
				return A2(author$project$Decode$decodeRM, size, context);
			case 'I':
				var size = operand.a;
				return A2(author$project$Decode$decodeImm, size, context);
			case 'REL':
				var size = operand.a;
				return A2(author$project$Decode$decodeRel, size, context);
			case 'Register':
				var _n1 = operand.a;
				var size = _n1.a;
				var r = _n1.b;
				return A3(author$project$Decode$decodeFixedRegister, size, r, context);
			default:
				return _Utils_update(
					context,
					{
						error: context.error + (' >> ' + elm$core$Debug$toString(operand))
					});
		}
	});
var author$project$Decode$decodeOperands = F2(
	function (instr, context) {
		var operands = function () {
			var _n1 = instr.a;
			var ops = _n1.c;
			return ops;
		}();
		return A3(
			elm$core$List$foldl,
			author$project$Decode$decodeOperand,
			_Utils_update(
				context,
				{
					instr: elm$core$Maybe$Just(instr)
				}),
			operands);
	});
var author$project$Decode$ExtractModRM = function (a) {
	return {$: 'ExtractModRM', a: a};
};
var author$project$Decode$ExtractReg = function (a) {
	return {$: 'ExtractReg', a: a};
};
var author$project$Decode$InstructionNode = function (a) {
	return {$: 'InstructionNode', a: a};
};
var author$project$Decode$MatchOpcodeNode = function (a) {
	return {$: 'MatchOpcodeNode', a: a};
};
var author$project$Decode$MatchRegNode = function (a) {
	return {$: 'MatchRegNode', a: a};
};
var author$project$Decode$NextOpcode = function (a) {
	return {$: 'NextOpcode', a: a};
};
var author$project$Decode$UnknownNode = {$: 'UnknownNode'};
var author$project$Decode$advance = function (pending) {
	var _n0 = pending.opcodes;
	if (_n0.b) {
		var x = _n0.a;
		var tail = _n0.b;
		return _Utils_update(
			pending,
			{opcodes: tail});
	} else {
		return pending;
	}
};
var author$project$Decode$extractOpcodes = function (pending) {
	var _n0 = pending.opcodes;
	_n0$2:
	while (true) {
		if (_n0.b) {
			switch (_n0.a.$) {
				case 'O':
					var value = _n0.a.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(value, pending)
						]);
				case 'O_R':
					var value = _n0.a.a;
					return elm$core$Array$toList(
						A2(
							elm$core$Array$initialize,
							8,
							function (i) {
								return _Utils_Tuple2(value | i, pending);
							}));
				default:
					break _n0$2;
			}
		} else {
			break _n0$2;
		}
	}
	return _List_Nil;
};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			elm$core$List$any,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, isOkay),
			list);
	});
var author$project$Decode$hasAllOpcodes = function (pendings) {
	var matchOne = function (pending) {
		var _n0 = pending.opcodes;
		if (_n0.b && (_n0.a.$ === 'O')) {
			return true;
		} else {
			return false;
		}
	};
	return A2(elm$core$List$all, matchOne, pendings);
};
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var author$project$Utils$groupBy = F2(
	function (func, list) {
		var addToList = F2(
			function (element, previous) {
				if (previous.$ === 'Just') {
					var elements = previous.a;
					return elm$core$Maybe$Just(
						A2(elm$core$List$cons, element, elements));
				} else {
					return elm$core$Maybe$Just(
						_List_fromArray(
							[element]));
				}
			});
		var process = F2(
			function (element, dict) {
				return A3(
					elm$core$Dict$update,
					func(element),
					addToList(element),
					dict);
			});
		return A3(elm$core$List$foldl, process, elm$core$Dict$empty, list);
	});
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var author$project$Decode$buildMatchOpcode = function (pendings) {
	var groups = A2(
		elm$core$List$map,
		function (_n5) {
			var i = _n5.a;
			var l = _n5.b;
			return _Utils_Tuple2(
				i,
				A2(elm$core$List$map, elm$core$Tuple$second, l));
		},
		elm$core$Dict$toList(
			A2(author$project$Utils$groupBy, elm$core$Tuple$first, pendings)));
	return author$project$Decode$MatchOpcodeNode(
		A2(
			elm$core$List$map,
			function (_n4) {
				var value = _n4.a;
				var p = _n4.b;
				return _Utils_Tuple2(
					value,
					author$project$Decode$processGroup(p));
			},
			groups));
};
var author$project$Decode$extractExtensions = function (pending) {
	var _n3 = pending.opcodes;
	if (_n3.b && (_n3.a.$ === 'E')) {
		var value = _n3.a.a;
		return _List_fromArray(
			[
				_Utils_Tuple2(
				value,
				A2(
					elm$core$Maybe$withDefault,
					author$project$Decode$UnknownNode,
					author$project$Decode$processOpcodes(
						author$project$Decode$advance(pending))))
			]);
	} else {
		return _List_Nil;
	}
};
var author$project$Decode$processGroup = function (group) {
	if (group.b && (!group.b.b)) {
		var pending = group.a;
		return A2(
			elm$core$Maybe$withDefault,
			author$project$Decode$UnknownNode,
			author$project$Decode$processOpcodes(pending));
	} else {
		var next = A2(elm$core$List$map, author$project$Decode$advance, group);
		return author$project$Decode$hasAllOpcodes(next) ? author$project$Decode$NextOpcode(
			author$project$Decode$buildMatchOpcode(
				A2(elm$core$List$concatMap, author$project$Decode$extractOpcodes, next))) : author$project$Decode$NextOpcode(
			author$project$Decode$ExtractModRM(
				author$project$Decode$MatchRegNode(
					A2(elm$core$List$concatMap, author$project$Decode$extractExtensions, next))));
	}
};
var author$project$Decode$processOpcodes = function (pending) {
	var _n0 = pending.opcodes;
	if (!_n0.b) {
		return elm$core$Maybe$Just(
			author$project$Decode$InstructionNode(pending.instr));
	} else {
		switch (_n0.a.$) {
			case 'O':
				var value = _n0.a.a;
				var tail = _n0.b;
				return elm$core$Maybe$Just(
					author$project$Decode$NextOpcode(
						author$project$Decode$processGroup(
							_List_fromArray(
								[
									_Utils_update(
									pending,
									{opcodes: tail})
								]))));
			case 'O_R':
				var value = _n0.a.a;
				var tail = _n0.b;
				return elm$core$Maybe$Just(
					author$project$Decode$ExtractReg(
						author$project$Decode$processGroup(
							_List_fromArray(
								[
									_Utils_update(
									pending,
									{opcodes: tail})
								]))));
			case 'E':
				var value = _n0.a.a;
				var tail = _n0.b;
				return elm$core$Maybe$Just(
					author$project$Decode$ExtractModRM(
						author$project$Decode$MatchRegNode(
							_List_fromArray(
								[
									_Utils_Tuple2(
									value,
									author$project$Decode$processGroup(
										_List_fromArray(
											[
												_Utils_update(
												pending,
												{opcodes: tail})
											])))
								]))));
			default:
				var _n1 = _n0.a;
				var tail = _n0.b;
				return elm$core$Maybe$Just(
					author$project$Decode$ExtractModRM(
						author$project$Decode$processGroup(
							_List_fromArray(
								[
									_Utils_update(
									pending,
									{opcodes: tail})
								]))));
		}
	}
};
var author$project$Decode$createPending = function (instr) {
	var _n1 = instr.a;
	var opcodes = _n1.a;
	return {instr: instr, opcodes: opcodes};
};
var author$project$X86$E = function (a) {
	return {$: 'E', a: a};
};
var author$project$X86$Instr = function (a) {
	return {$: 'Instr', a: a};
};
var author$project$X86$MODRM = {$: 'MODRM'};
var author$project$X86$O = function (a) {
	return {$: 'O', a: a};
};
var author$project$X86$O_R = function (a) {
	return {$: 'O_R', a: a};
};
var author$project$X86$Error = {$: 'Error'};
var author$project$X86$I = function (a) {
	return {$: 'I', a: a};
};
var author$project$X86$R = function (a) {
	return {$: 'R', a: a};
};
var author$project$X86$REL = function (a) {
	return {$: 'REL', a: a};
};
var author$project$X86$RM = function (a) {
	return {$: 'RM', a: a};
};
var author$project$X86$Register = function (a) {
	return {$: 'Register', a: a};
};
var author$project$X86$AL = {$: 'AL'};
var author$project$X86$AX = {$: 'AX'};
var author$project$X86$DX = {$: 'DX'};
var author$project$X86$S_8 = {$: 'S_8'};
var author$project$X86$makeReg = function (tpl) {
	switch (tpl) {
		case 'E_AX':
			return elm$core$Maybe$Just(
				_Utils_Tuple2(author$project$X86$S_16_32, author$project$X86$AX));
		case 'EAX':
			return elm$core$Maybe$Just(
				_Utils_Tuple2(author$project$X86$S_32, author$project$X86$AX));
		case 'AX':
			return elm$core$Maybe$Just(
				_Utils_Tuple2(author$project$X86$S_16, author$project$X86$AX));
		case 'AL':
			return elm$core$Maybe$Just(
				_Utils_Tuple2(author$project$X86$S_8, author$project$X86$AL));
		case 'DX':
			return elm$core$Maybe$Just(
				_Utils_Tuple2(author$project$X86$S_16, author$project$X86$DX));
		default:
			return elm$core$Maybe$Nothing;
	}
};
var author$project$X86$templateSize = function (s) {
	switch (s) {
		case '32':
			return elm$core$Maybe$Just(author$project$X86$S_32);
		case '16':
			return elm$core$Maybe$Just(author$project$X86$S_16);
		case '8':
			return elm$core$Maybe$Just(author$project$X86$S_8);
		case '16/32':
			return elm$core$Maybe$Just(author$project$X86$S_16_32);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var elm$core$String$startsWith = _String_startsWith;
var author$project$X86$templatePattern = function (tpl) {
	if (A2(elm$core$String$startsWith, 'r/m', tpl)) {
		return A2(
			elm$core$Maybe$withDefault,
			author$project$X86$Error,
			A2(
				elm$core$Maybe$map,
				author$project$X86$RM,
				author$project$X86$templateSize(
					A3(
						elm$core$String$slice,
						3,
						elm$core$String$length(tpl),
						tpl))));
	} else {
		if (A2(elm$core$String$startsWith, 'rel', tpl)) {
			return A2(
				elm$core$Maybe$withDefault,
				author$project$X86$Error,
				A2(
					elm$core$Maybe$map,
					author$project$X86$REL,
					author$project$X86$templateSize(
						A3(
							elm$core$String$slice,
							3,
							elm$core$String$length(tpl),
							tpl))));
		} else {
			if (A2(elm$core$String$startsWith, 'r', tpl)) {
				return A2(
					elm$core$Maybe$withDefault,
					author$project$X86$Error,
					A2(
						elm$core$Maybe$map,
						author$project$X86$R,
						author$project$X86$templateSize(
							A3(
								elm$core$String$slice,
								1,
								elm$core$String$length(tpl),
								tpl))));
			} else {
				if (A2(elm$core$String$startsWith, 'imm', tpl)) {
					return A2(
						elm$core$Maybe$withDefault,
						author$project$X86$Error,
						A2(
							elm$core$Maybe$map,
							author$project$X86$I,
							author$project$X86$templateSize(
								A3(
									elm$core$String$slice,
									3,
									elm$core$String$length(tpl),
									tpl))));
				} else {
					var _n0 = author$project$X86$makeReg(tpl);
					if (_n0.$ === 'Just') {
						var name = _n0.a;
						return author$project$X86$Register(name);
					} else {
						return author$project$X86$Error;
					}
				}
			}
		}
	}
};
var author$project$X86$ops = function (operands) {
	return A2(elm$core$List$map, author$project$X86$templatePattern, operands);
};
var author$project$X86$instructions = _List_fromArray(
	[
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(0),
					author$project$X86$MODRM
				]),
			'ADD',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8', 'r8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(1),
					author$project$X86$MODRM
				]),
			'ADD',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32', 'r16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(2),
					author$project$X86$MODRM
				]),
			'ADD',
			author$project$X86$ops(
				_List_fromArray(
					['r8', 'r/m8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(3),
					author$project$X86$MODRM
				]),
			'ADD',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32', 'r/m16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(4)
				]),
			'ADD',
			author$project$X86$ops(
				_List_fromArray(
					['AL', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(5)
				]),
			'ADD',
			author$project$X86$ops(
				_List_fromArray(
					['E_AX', 'imm16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(128),
					author$project$X86$E(0)
				]),
			'ADD',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(129),
					author$project$X86$E(0)
				]),
			'ADD',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32', 'imm16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(131),
					author$project$X86$E(0)
				]),
			'ADD',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(254),
					author$project$X86$E(1)
				]),
			'DEC',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(255),
					author$project$X86$E(1)
				]),
			'DEC',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O_R(72)
				]),
			'DEC',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(246),
					author$project$X86$E(6)
				]),
			'DIV',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(247),
					author$project$X86$E(6)
				]),
			'DIV',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(244)
				]),
			'HLT',
			_List_Nil)),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(246),
					author$project$X86$E(7)
				]),
			'IDIV',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(247),
					author$project$X86$E(7)
				]),
			'IDIV',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(246),
					author$project$X86$E(5)
				]),
			'IMUL',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(247),
					author$project$X86$E(5)
				]),
			'IMUL',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(15),
					author$project$X86$O(175),
					author$project$X86$MODRM
				]),
			'IMUL',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32', 'r/m16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(107),
					author$project$X86$MODRM
				]),
			'IMUL',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32', 'r/m16/32', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(105),
					author$project$X86$MODRM
				]),
			'IMUL',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32', 'r/m16/32', 'imm16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(228)
				]),
			'IN',
			author$project$X86$ops(
				_List_fromArray(
					['AL', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(229)
				]),
			'IN',
			author$project$X86$ops(
				_List_fromArray(
					['E_AX', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(236)
				]),
			'IN',
			author$project$X86$ops(
				_List_fromArray(
					['AL', 'DX'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(237)
				]),
			'IN',
			author$project$X86$ops(
				_List_fromArray(
					['E_AX', 'DX'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(254),
					author$project$X86$E(0)
				]),
			'INC',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(255),
					author$project$X86$E(0)
				]),
			'INC',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O_R(64)
				]),
			'INC',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(204)
				]),
			'INT3',
			_List_Nil)),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(205)
				]),
			'INT',
			author$project$X86$ops(
				_List_fromArray(
					['imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(15),
					author$project$X86$O(132)
				]),
			'JE',
			author$project$X86$ops(
				_List_fromArray(
					['rel16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(233)
				]),
			'JMP',
			author$project$X86$ops(
				_List_fromArray(
					['rel16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(141),
					author$project$X86$MODRM
				]),
			'LEA',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32', 'm'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(136),
					author$project$X86$MODRM
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8', 'r8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(137),
					author$project$X86$MODRM
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32', 'r16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(138),
					author$project$X86$MODRM
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['r8', 'r/m8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(139),
					author$project$X86$MODRM
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32', 'r/m16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(140),
					author$project$X86$MODRM
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16', 'sreg'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(142),
					author$project$X86$MODRM
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['sreg', 'r/m16'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(160)
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['AL', 'moffs8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(161)
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['E_AX', 'moffs16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(162)
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['moffs8', 'AL'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(163)
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['moffs16/32', 'E_AX'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O_R(176)
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['r8', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O_R(184)
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32', 'imm16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(198),
					author$project$X86$E(0)
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(199),
					author$project$X86$E(0)
				]),
			'MOV',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32', 'imm16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(15),
					author$project$X86$O(182),
					author$project$X86$MODRM
				]),
			'MOVZX',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32', 'r/m8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(15),
					author$project$X86$O(183),
					author$project$X86$MODRM
				]),
			'MOVZX',
			author$project$X86$ops(
				_List_fromArray(
					['r32', 'r/m16'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(246),
					author$project$X86$E(4)
				]),
			'MUL',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(247),
					author$project$X86$E(4)
				]),
			'MUL',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(144)
				]),
			'NOP',
			_List_Nil)),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(230)
				]),
			'OUT',
			author$project$X86$ops(
				_List_fromArray(
					['imm8', 'AL'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(231)
				]),
			'OUT',
			author$project$X86$ops(
				_List_fromArray(
					['imm8', 'E_AX'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(238)
				]),
			'OUT',
			author$project$X86$ops(
				_List_fromArray(
					['DX', 'AL'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(239)
				]),
			'OUT',
			author$project$X86$ops(
				_List_fromArray(
					['DX', 'E_AX'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(44)
				]),
			'SUB',
			author$project$X86$ops(
				_List_fromArray(
					['AL', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(45)
				]),
			'SUB',
			author$project$X86$ops(
				_List_fromArray(
					['E_AX', 'imm16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(128),
					author$project$X86$E(5)
				]),
			'SUB',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(129),
					author$project$X86$E(5)
				]),
			'SUB',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32', 'imm16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(131),
					author$project$X86$E(5)
				]),
			'SUB',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(40),
					author$project$X86$MODRM
				]),
			'SUB',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8', 'r8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(41),
					author$project$X86$MODRM
				]),
			'SUB',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32', 'r16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(42),
					author$project$X86$MODRM
				]),
			'SUB',
			author$project$X86$ops(
				_List_fromArray(
					['r8', 'r/m8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(43),
					author$project$X86$MODRM
				]),
			'SUB',
			author$project$X86$ops(
				_List_fromArray(
					['r16/32', 'r/m16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(168)
				]),
			'TEST',
			author$project$X86$ops(
				_List_fromArray(
					['AL', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(169)
				]),
			'TEST',
			author$project$X86$ops(
				_List_fromArray(
					['E_AX', 'imm16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(246),
					author$project$X86$E(0)
				]),
			'TEST',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8', 'imm8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(247),
					author$project$X86$E(0)
				]),
			'TEST',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32', 'imm16/32'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(132),
					author$project$X86$MODRM
				]),
			'TEST',
			author$project$X86$ops(
				_List_fromArray(
					['r/m8', 'r8'])))),
		author$project$X86$Instr(
		_Utils_Tuple3(
			_List_fromArray(
				[
					author$project$X86$O(133),
					author$project$X86$MODRM
				]),
			'TEST',
			author$project$X86$ops(
				_List_fromArray(
					['r/m16/32', 'r16/32']))))
	]);
var author$project$Decode$decoderRoot = author$project$Decode$buildMatchOpcode(
	A2(
		elm$core$List$concatMap,
		author$project$Decode$extractOpcodes,
		A2(elm$core$List$map, author$project$Decode$createPending, author$project$X86$instructions)));
var author$project$Encode$MEMORY = {$: 'MEMORY'};
var author$project$Encode$MEMORY_DISP32 = {$: 'MEMORY_DISP32'};
var author$project$Encode$MEMORY_DISP8 = {$: 'MEMORY_DISP8'};
var author$project$Encode$REG = {$: 'REG'};
var author$project$Decode$decodeMode = function (mode) {
	switch (mode) {
		case 0:
			return author$project$Encode$MEMORY;
		case 1:
			return author$project$Encode$MEMORY_DISP8;
		case 2:
			return author$project$Encode$MEMORY_DISP32;
		default:
			return author$project$Encode$REG;
	}
};
var author$project$Encode$ModRM = function (a) {
	return {$: 'ModRM', a: a};
};
var author$project$Decode$extractModRM = F2(
	function (x, context) {
		var rm = 7 & x;
		var reg = 7 & (x >>> 3);
		var mode = author$project$Decode$decodeMode(3 & (x >>> 6));
		return _Utils_update(
			context,
			{
				elements: A2(
					elm$core$List$cons,
					author$project$Encode$ModRM(
						_Utils_Tuple3(mode, reg, rm)),
					context.elements),
				mode: elm$core$Maybe$Just(mode),
				reg: elm$core$Maybe$Just(reg),
				rm: elm$core$Maybe$Just(rm)
			});
	});
var author$project$Encode$OpcodeAndReg = function (a) {
	return {$: 'OpcodeAndReg', a: a};
};
var author$project$Decode$extractReg = F2(
	function (x, context) {
		var reg = 7 & x;
		var opcode = 31 & (x >>> 3);
		return _Utils_update(
			context,
			{
				elements: A2(
					elm$core$List$cons,
					author$project$Encode$OpcodeAndReg(
						_Utils_Tuple2(opcode, reg)),
					context.elements),
				reg: elm$core$Maybe$Just(reg)
			});
	});
var author$project$Encode$Opcode = function (a) {
	return {$: 'Opcode', a: a};
};
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Decode$decodeFromContext = function (context) {
	decodeFromContext:
	while (true) {
		var _n0 = _Utils_Tuple2(context.node, context.bytes);
		_n0$8:
		while (true) {
			switch (_n0.a.$) {
				case 'MatchOpcodeNode':
					if (_n0.b.b) {
						var nodes = _n0.a.a;
						var _n1 = _n0.b;
						var op = _n1.a;
						var tail = _n1.b;
						return A2(
							elm$core$Maybe$withDefault,
							_Utils_update(
								context,
								{error: 'Unknown'}),
							A2(
								elm$core$Maybe$map,
								function (_n3) {
									var v = _n3.a;
									var n = _n3.b;
									return author$project$Decode$decodeFromContext(
										_Utils_update(
											context,
											{node: n}));
								},
								elm$core$List$head(
									A2(
										elm$core$List$filter,
										function (_n2) {
											var v = _n2.a;
											var n = _n2.b;
											return _Utils_eq(v, op);
										},
										nodes))));
					} else {
						break _n0$8;
					}
				case 'NextOpcode':
					if (_n0.b.b) {
						var n = _n0.a.a;
						var _n4 = _n0.b;
						var x = _n4.a;
						var tail = _n4.b;
						var $temp$context = _Utils_update(
							context,
							{
								bytes: tail,
								elements: A2(
									elm$core$List$cons,
									author$project$Encode$Opcode(x),
									context.elements),
								node: n
							});
						context = $temp$context;
						continue decodeFromContext;
					} else {
						break _n0$8;
					}
				case 'ExtractReg':
					if (_n0.b.b) {
						var n = _n0.a.a;
						var _n5 = _n0.b;
						var x = _n5.a;
						var tail = _n5.b;
						return author$project$Decode$decodeFromContext(
							A2(
								author$project$Decode$extractReg,
								x,
								_Utils_update(
									context,
									{bytes: tail, node: n})));
					} else {
						break _n0$8;
					}
				case 'ExtractModRM':
					if (_n0.b.b) {
						var n = _n0.a.a;
						var _n6 = _n0.b;
						var x = _n6.a;
						var tail = _n6.b;
						return author$project$Decode$decodeFromContext(
							A2(
								author$project$Decode$extractModRM,
								x,
								_Utils_update(
									context,
									{bytes: tail, node: n})));
					} else {
						break _n0$8;
					}
				case 'MatchRegNode':
					var l = _n0.a.a;
					return A2(
						elm$core$Maybe$withDefault,
						_Utils_update(
							context,
							{error: 'Unknown'}),
						A2(
							elm$core$Maybe$map,
							function (_n8) {
								var v = _n8.a;
								var n = _n8.b;
								return author$project$Decode$decodeFromContext(
									_Utils_update(
										context,
										{node: n}));
							},
							elm$core$List$head(
								A2(
									elm$core$List$filter,
									function (_n7) {
										var v = _n7.a;
										var n = _n7.b;
										return _Utils_eq(
											v,
											A2(elm$core$Maybe$withDefault, -1, context.reg));
									},
									l))));
				case 'InstructionNode':
					var instr = _n0.a.a;
					return A2(author$project$Decode$decodeOperands, instr, context);
				case 'PrefixNode':
					var _n9 = _n0.a;
					return _Utils_update(
						context,
						{error: 'PREFIX not handled'});
				default:
					var _n10 = _n0.a;
					return _Utils_update(
						context,
						{
							error: elm$core$Debug$toString(author$project$Decode$decoderRoot)
						});
			}
		}
		return _Utils_update(
			context,
			{error: 'Not enough bytes'});
	}
};
var author$project$Syntax$AstInstr = function (a) {
	return {$: 'AstInstr', a: a};
};
var elm$core$Basics$neq = _Utils_notEqual;
var author$project$Syntax$memoryOperand = function (memory) {
	var index = A2(
		elm$core$Maybe$map,
		function (_n1) {
			var reg = _n1.a;
			var scale = _n1.b;
			return elm$core$String$fromInt(scale) + ('*' + reg);
		},
		memory.index);
	var disp = memory.displacement ? elm$core$Maybe$Just(
		author$project$Syntax$toDisplayInt(memory.displacement)) : elm$core$Maybe$Nothing;
	var base = A2(elm$core$Maybe$withDefault, '', memory.base);
	return A2(
		elm$core$String$join,
		'+',
		A2(
			elm$core$List$concatMap,
			function (i) {
				if (i.$ === 'Just') {
					var x = i.a;
					return _List_fromArray(
						[x]);
				} else {
					return _List_Nil;
				}
			},
			_List_fromArray(
				[memory.base, index, disp])));
};
var author$project$Syntax$memoryString = function (memory) {
	var size = function () {
		var _n0 = memory.size;
		switch (_n0.$) {
			case 'S_32':
				return '';
			case 'S_16':
				return 'WORDPTR ';
			case 'S_8':
				return 'BYTEPTR ';
			default:
				return '';
		}
	}();
	return size + ('[' + (author$project$Syntax$memoryOperand(memory) + ']'));
};
var author$project$Syntax$operandString = function (operand) {
	switch (operand.$) {
		case 'AstRegister':
			var reg = operand.a;
			return reg;
		case 'AstImmediat':
			var value = operand.a;
			return author$project$Syntax$toDisplayInt(value);
		default:
			var memory = operand.a;
			return author$project$Syntax$memoryString(memory);
	}
};
var author$project$Syntax$toString = function (_n0) {
	var _n1 = _n0.a;
	var name = _n1.a;
	var operands = _n1.b;
	return name + (' ' + A2(
		elm$core$String$join,
		', ',
		A2(elm$core$List$map, author$project$Syntax$operandString, operands)));
};
var author$project$X86$sizeName = function (size) {
	switch (size.$) {
		case 'S_32':
			return '32';
		case 'S_16':
			return '16';
		case 'S_8':
			return '8';
		default:
			return '16/32';
	}
};
var author$project$X86$operandString = function (op) {
	switch (op.$) {
		case 'RM':
			var size = op.a;
			return 'r/m' + author$project$X86$sizeName(size);
		case 'R':
			var size = op.a;
			return 'r' + author$project$X86$sizeName(size);
		case 'I':
			var size = op.a;
			return 'imm' + author$project$X86$sizeName(size);
		case 'REL':
			var size = op.a;
			return 'rel' + author$project$X86$sizeName(size);
		case 'Register':
			var _n1 = op.a;
			var size = _n1.a;
			var reg = _n1.b;
			return A2(author$project$X86$regName, size, reg);
		default:
			return '<error>';
	}
};
var author$project$X86$instrToString = function (_n0) {
	var _n1 = _n0.a;
	var name = _n1.b;
	var operands = _n1.c;
	return name + (' ' + A2(
		elm$core$String$join,
		', ',
		A2(elm$core$List$map, author$project$X86$operandString, operands)));
};
var author$project$Decode$intructionName = F2(
	function (instr, operands) {
		var name = function () {
			var _n1 = instr.a;
			var n = _n1.b;
			return n;
		}();
		return author$project$Syntax$toString(
			author$project$Syntax$AstInstr(
				_Utils_Tuple2(
					name,
					elm$core$List$reverse(operands)))) + ('  (' + (author$project$X86$instrToString(instr) + ')'));
	});
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var elm$core$Basics$pow = _Basics_pow;
var rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2(elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return elm$core$Result$Err(
							elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var rtfeldman$elm_hex$Hex$fromString = function (str) {
	if (elm$core$String$isEmpty(str)) {
		return elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2(elm$core$String$startsWith, '-', str)) {
				var list = A2(
					elm$core$Maybe$withDefault,
					_List_Nil,
					elm$core$List$tail(
						elm$core$String$toList(str)));
				return A2(
					elm$core$Result$map,
					elm$core$Basics$negate,
					A3(
						rtfeldman$elm_hex$Hex$fromStringHelp,
						elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					rtfeldman$elm_hex$Hex$fromStringHelp,
					elm$core$String$length(str) - 1,
					elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2(elm$core$Result$mapError, formatError, result);
	}
};
var author$project$Decode$split = F2(
	function (result, chars) {
		split:
		while (true) {
			var concatIfOK = function (value) {
				var _n2 = rtfeldman$elm_hex$Hex$fromString(value);
				if (_n2.$ === 'Ok') {
					var x = _n2.a;
					return A2(elm$core$List$cons, x, result);
				} else {
					var str = _n2.a;
					return result;
				}
			};
			if (chars.b) {
				if (chars.b.b) {
					var a = chars.a;
					var _n1 = chars.b;
					var b = _n1.a;
					var tail = _n1.b;
					var $temp$result = concatIfOK(
						elm$core$String$fromList(
							_List_fromArray(
								[a, b]))),
						$temp$chars = tail;
					result = $temp$result;
					chars = $temp$chars;
					continue split;
				} else {
					var a = chars.a;
					return concatIfOK(
						elm$core$String$fromChar(a));
				}
			} else {
				return result;
			}
		}
	});
var elm$core$Char$isHexDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return ((48 <= code) && (code <= 57)) || (((65 <= code) && (code <= 70)) || ((97 <= code) && (code <= 102)));
};
var elm$core$Char$toLower = _Char_toLower;
var author$project$Decode$toBytes = function (content) {
	return elm$core$List$reverse(
		A2(
			author$project$Decode$split,
			_List_Nil,
			A2(
				elm$core$List$filter,
				elm$core$Char$isHexDigit,
				A2(
					elm$core$List$map,
					elm$core$Char$toLower,
					elm$core$String$toList(content)))));
};
var author$project$Decode$decode = F2(
	function (is32Bits, content) {
		var bytes = author$project$Decode$toBytes(content);
		var context = author$project$Decode$decodeFromContext(
			{
				bytes: bytes,
				elements: _List_Nil,
				error: '',
				instr: elm$core$Maybe$Nothing,
				is32Bits: is32Bits,
				length: elm$core$List$length(bytes),
				mode: elm$core$Maybe$Nothing,
				node: author$project$Decode$decoderRoot,
				operands: _List_Nil,
				pc: 134217875,
				reg: elm$core$Maybe$Nothing,
				rm: elm$core$Maybe$Nothing
			});
		return _Utils_Tuple2(
			context.error,
			A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				A2(
					elm$core$Maybe$map,
					function (i) {
						return _List_fromArray(
							[
								_Utils_Tuple2(
								A2(author$project$Decode$intructionName, i, context.operands),
								elm$core$Maybe$Just(
									elm$core$List$reverse(context.elements)))
							]);
					},
					context.instr)));
	});
var author$project$Main$decode = function (model) {
	var _n0 = A2(author$project$Decode$decode, model.is32Bits, model.content);
	var error = _n0.a;
	var instructions = _n0.b;
	return _Utils_Tuple2(
		_List_fromArray(
			[
				{msg: error}
			]),
		instructions);
};
var author$project$Lexer$lexer = function (input) {
	return {content: input, position: 0};
};
var author$project$Lexer$T_ADD = {$: 'T_ADD'};
var author$project$Lexer$T_COMA = {$: 'T_COMA'};
var author$project$Lexer$T_EOF = {$: 'T_EOF'};
var author$project$Lexer$T_ERROR = function (a) {
	return {$: 'T_ERROR', a: a};
};
var author$project$Lexer$T_LBRT = {$: 'T_LBRT'};
var author$project$Lexer$T_MUL = {$: 'T_MUL'};
var author$project$Lexer$T_RBRT = {$: 'T_RBRT'};
var author$project$Lexer$T_SUB = {$: 'T_SUB'};
var author$project$Lexer$getChar = function (stream) {
	var _n0 = elm$core$String$uncons(stream.content);
	if (_n0.$ === 'Nothing') {
		return _Utils_Tuple2(elm$core$Maybe$Nothing, stream);
	} else {
		var _n1 = _n0.a;
		var c = _n1.a;
		var next = _n1.b;
		return _Utils_Tuple2(
			elm$core$Maybe$Just(c),
			{content: next, position: stream.position + 1});
	}
};
var elm$core$Basics$ge = _Utils_ge;
var author$project$Lexer$isDigit = function (c) {
	return (_Utils_cmp(
		c,
		_Utils_chr('0')) > -1) && (_Utils_cmp(
		c,
		_Utils_chr('9')) < 1);
};
var author$project$Lexer$isLetter = function (c) {
	return ((_Utils_cmp(
		c,
		_Utils_chr('a')) > -1) && (_Utils_cmp(
		c,
		_Utils_chr('z')) < 1)) || ((_Utils_cmp(
		c,
		_Utils_chr('A')) > -1) && (_Utils_cmp(
		c,
		_Utils_chr('Z')) < 1));
};
var author$project$Lexer$isSpace = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr(' ')) || (_Utils_eq(
		c,
		_Utils_chr('\t')) || _Utils_eq(
		c,
		_Utils_chr('\n')));
};
var author$project$Lexer$T_IDENT = function (a) {
	return {$: 'T_IDENT', a: a};
};
var author$project$Lexer$isLetterOrDigit = function (c) {
	return author$project$Lexer$isLetter(c) || author$project$Lexer$isDigit(c);
};
var author$project$Lexer$scanIdent = F2(
	function (stream, content) {
		scanIdent:
		while (true) {
			var _n0 = author$project$Lexer$getChar(stream);
			if (_n0.a.$ === 'Nothing') {
				var _n1 = _n0.a;
				var next = _n0.b;
				return _Utils_Tuple2(
					author$project$Lexer$T_IDENT(content),
					next);
			} else {
				var c = _n0.a.a;
				var next = _n0.b;
				if (author$project$Lexer$isLetterOrDigit(c)) {
					var $temp$stream = next,
						$temp$content = _Utils_ap(
						content,
						elm$core$String$fromChar(c));
					stream = $temp$stream;
					content = $temp$content;
					continue scanIdent;
				} else {
					return _Utils_Tuple2(
						author$project$Lexer$T_IDENT(content),
						stream);
				}
			}
		}
	});
var author$project$Lexer$T_INTEGER = function (a) {
	return {$: 'T_INTEGER', a: a};
};
var author$project$Lexer$scanInteger = F2(
	function (stream, content) {
		scanInteger:
		while (true) {
			var _n0 = author$project$Lexer$getChar(stream);
			if (_n0.a.$ === 'Nothing') {
				var _n1 = _n0.a;
				var next = _n0.b;
				return _Utils_Tuple2(
					author$project$Lexer$T_INTEGER(content),
					next);
			} else {
				var c = _n0.a.a;
				var next = _n0.b;
				if (author$project$Lexer$isDigit(c)) {
					var $temp$stream = next,
						$temp$content = _Utils_ap(
						content,
						elm$core$String$fromChar(c));
					stream = $temp$stream;
					content = $temp$content;
					continue scanInteger;
				} else {
					if (_Utils_eq(
						elm$core$Char$toLower(c),
						_Utils_chr('h')) || _Utils_eq(
						elm$core$Char$toLower(c),
						_Utils_chr('b'))) {
						return _Utils_Tuple2(
							author$project$Lexer$T_INTEGER(
								_Utils_ap(
									content,
									elm$core$String$fromChar(c))),
							next);
					} else {
						return _Utils_Tuple2(
							author$project$Lexer$T_INTEGER(content),
							stream);
					}
				}
			}
		}
	});
var author$project$Lexer$nextToken = function (stream) {
	nextToken:
	while (true) {
		var _n0 = author$project$Lexer$getChar(stream);
		if (_n0.a.$ === 'Nothing') {
			var _n1 = _n0.a;
			var next = _n0.b;
			return _Utils_Tuple2(author$project$Lexer$T_EOF, next);
		} else {
			var c = _n0.a.a;
			var next = _n0.b;
			if (author$project$Lexer$isSpace(c)) {
				var $temp$stream = next;
				stream = $temp$stream;
				continue nextToken;
			} else {
				if (author$project$Lexer$isLetter(c)) {
					return A2(
						author$project$Lexer$scanIdent,
						next,
						elm$core$String$fromChar(c));
				} else {
					if (author$project$Lexer$isDigit(c)) {
						return A2(
							author$project$Lexer$scanInteger,
							next,
							elm$core$String$fromChar(c));
					} else {
						if (_Utils_eq(
							c,
							_Utils_chr(','))) {
							return _Utils_Tuple2(author$project$Lexer$T_COMA, next);
						} else {
							if (_Utils_eq(
								c,
								_Utils_chr('['))) {
								return _Utils_Tuple2(author$project$Lexer$T_LBRT, next);
							} else {
								if (_Utils_eq(
									c,
									_Utils_chr(']'))) {
									return _Utils_Tuple2(author$project$Lexer$T_RBRT, next);
								} else {
									if (_Utils_eq(
										c,
										_Utils_chr('+'))) {
										return _Utils_Tuple2(author$project$Lexer$T_ADD, next);
									} else {
										if (_Utils_eq(
											c,
											_Utils_chr('-'))) {
											return _Utils_Tuple2(author$project$Lexer$T_SUB, next);
										} else {
											if (_Utils_eq(
												c,
												_Utils_chr('*'))) {
												return _Utils_Tuple2(author$project$Lexer$T_MUL, next);
											} else {
												return _Utils_Tuple2(
													author$project$Lexer$T_ERROR(
														elm$core$String$fromChar(c)),
													next);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var author$project$Parser$advance = function (context) {
	var _n1 = author$project$Lexer$nextToken(context.stream);
	var token = _n1.a;
	var next = _n1.b;
	return author$project$Parser$skipErrors(
		_Utils_update(
			context,
			{current: token, stream: next}));
};
var author$project$Parser$skipErrors = function (context) {
	skipErrors:
	while (true) {
		var _n0 = context.current;
		if (_n0.$ === 'T_ERROR') {
			var msg = _n0.a;
			var $temp$context = author$project$Parser$advance(
				_Utils_update(
					context,
					{
						errors: A2(
							elm$core$List$cons,
							{msg: 'unexpected char \'' + (msg + '\'')},
							context.errors)
					}));
			context = $temp$context;
			continue skipErrors;
		} else {
			return context;
		}
	}
};
var author$project$Parser$makeParser = F2(
	function (is32Bits, content) {
		var stream = author$project$Lexer$lexer(content);
		var _n0 = author$project$Lexer$nextToken(stream);
		var token = _n0.a;
		var next = _n0.b;
		return author$project$Parser$skipErrors(
			{
				current: token,
				errors: _List_Nil,
				size: is32Bits ? author$project$X86$S_32 : author$project$X86$S_16,
				stream: next
			});
	});
var author$project$Parser$NOK = function (a) {
	return {$: 'NOK', a: a};
};
var author$project$Parser$OK = function (a) {
	return {$: 'OK', a: a};
};
var author$project$Parser$addError = F2(
	function (context, msg) {
		return _Utils_update(
			context,
			{
				errors: A2(
					elm$core$List$cons,
					{msg: msg},
					context.errors)
			});
	});
var author$project$Parser$errorExpecting = F2(
	function (context, ident) {
		return A2(author$project$Parser$addError, context, 'expecting ' + ident);
	});
var author$project$Parser$parseIdent = function (context) {
	var _n0 = context.current;
	if (_n0.$ === 'T_IDENT') {
		var value = _n0.a;
		return author$project$Parser$OK(
			_Utils_Tuple2(
				value,
				author$project$Parser$advance(context)));
	} else {
		return author$project$Parser$NOK(
			A2(author$project$Parser$errorExpecting, context, 'IDENT'));
	}
};
var elm$core$Result$toMaybe = function (result) {
	if (result.$ === 'Ok') {
		var v = result.a;
		return elm$core$Maybe$Just(v);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$String$endsWith = _String_endsWith;
var elm$core$String$toInt = _String_toInt;
var elm$core$String$toUpper = _String_toUpper;
var author$project$Parser$immValue = function (value) {
	return A2(
		elm$core$String$endsWith,
		'H',
		elm$core$String$toUpper(value)) ? elm$core$Result$toMaybe(
		rtfeldman$elm_hex$Hex$fromString(
			A3(elm$core$String$slice, 0, -1, value))) : elm$core$String$toInt(value);
};
var author$project$Parser$initMemoryOperand = function (size) {
	return {base: elm$core$Maybe$Nothing, displacement: 0, index: elm$core$Maybe$Nothing, size: size};
};
var author$project$Parser$scaleOf = function (value) {
	var _n0 = elm$core$String$toInt(value);
	_n0$3:
	while (true) {
		if (_n0.$ === 'Just') {
			switch (_n0.a) {
				case 1:
					return 1;
				case 2:
					return 2;
				case 4:
					return 4;
				default:
					break _n0$3;
			}
		} else {
			break _n0$3;
		}
	}
	return 1;
};
var author$project$Parser$analyseMemoryOperand = F2(
	function (element, memory) {
		if (element.$ === 'EARegister') {
			if (element.a.b.$ === 'Nothing') {
				var _n1 = element.a;
				var name = _n1.a;
				var _n2 = _n1.b;
				var _n3 = memory.base;
				if (_n3.$ === 'Just') {
					return _Utils_update(
						memory,
						{
							index: elm$core$Maybe$Just(
								_Utils_Tuple2(name, 1))
						});
				} else {
					return _Utils_update(
						memory,
						{
							base: elm$core$Maybe$Just(name)
						});
				}
			} else {
				var _n4 = element.a;
				var name = _n4.a;
				var s = _n4.b.a;
				var _n5 = _Utils_Tuple2(
					memory.base,
					author$project$Parser$scaleOf(s));
				if ((_n5.a.$ === 'Nothing') && (_n5.b === 1)) {
					var _n6 = _n5.a;
					return _Utils_update(
						memory,
						{
							base: elm$core$Maybe$Just(name)
						});
				} else {
					var scale = _n5.b;
					return _Utils_update(
						memory,
						{
							index: elm$core$Maybe$Just(
								_Utils_Tuple2(name, scale))
						});
				}
			}
		} else {
			var _n7 = element.a;
			var sign = _n7.a;
			var disp = _n7.b;
			var _n8 = author$project$Parser$immValue(disp);
			if (_n8.$ === 'Just') {
				var value = _n8.a;
				return _Utils_update(
					memory,
					{
						displacement: memory.displacement + (sign ? value : (-value))
					});
			} else {
				return memory;
			}
		}
	});
var author$project$Parser$makeMemoryOperand = F2(
	function (elements, memory) {
		makeMemoryOperand:
		while (true) {
			if (!elements.b) {
				return memory;
			} else {
				var v0 = elements.a;
				var v1 = elements.b;
				var $temp$elements = v1,
					$temp$memory = A2(author$project$Parser$analyseMemoryOperand, v0, memory);
				elements = $temp$elements;
				memory = $temp$memory;
				continue makeMemoryOperand;
			}
		}
	});
var author$project$Parser$EADisplacement = function (a) {
	return {$: 'EADisplacement', a: a};
};
var author$project$Parser$EARegister = function (a) {
	return {$: 'EARegister', a: a};
};
var author$project$Parser$parseInteger = function (context) {
	var _n0 = context.current;
	if (_n0.$ === 'T_INTEGER') {
		var value = _n0.a;
		return author$project$Parser$OK(
			_Utils_Tuple2(
				value,
				author$project$Parser$advance(context)));
	} else {
		return author$project$Parser$NOK(
			A2(author$project$Parser$errorExpecting, context, 'INTEGER'));
	}
};
var author$project$Parser$parseScale = function (context) {
	var _n0 = context.current;
	if (_n0.$ === 'T_MUL') {
		var _n1 = author$project$Parser$parseInteger(
			author$project$Parser$advance(context));
		if (_n1.$ === 'OK') {
			var _n2 = _n1.a;
			var value = _n2.a;
			var next = _n2.b;
			return author$project$Parser$OK(
				_Utils_Tuple2(
					elm$core$Maybe$Just(value),
					next));
		} else {
			var next = _n1.a;
			return author$project$Parser$NOK(next);
		}
	} else {
		return author$project$Parser$OK(
			_Utils_Tuple2(elm$core$Maybe$Nothing, context));
	}
};
var author$project$Parser$parseEAElement = F2(
	function (sign, context) {
		var _n0 = context.current;
		switch (_n0.$) {
			case 'T_IDENT':
				var name = _n0.a;
				var _n1 = author$project$Parser$parseScale(
					author$project$Parser$advance(context));
				if (_n1.$ === 'OK') {
					var _n2 = _n1.a;
					var s = _n2.a;
					var next = _n2.b;
					return author$project$Parser$OK(
						_Utils_Tuple2(
							author$project$Parser$EARegister(
								_Utils_Tuple2(name, s)),
							next));
				} else {
					var next = _n1.a;
					return author$project$Parser$NOK(next);
				}
			case 'T_INTEGER':
				var value = _n0.a;
				return author$project$Parser$OK(
					_Utils_Tuple2(
						author$project$Parser$EADisplacement(
							_Utils_Tuple2(sign, value)),
						author$project$Parser$advance(context)));
			default:
				return author$project$Parser$NOK(
					A2(author$project$Parser$errorExpecting, context, 'IDENT or INTEGER'));
		}
	});
var author$project$Parser$parseEffectiveAddress = F3(
	function (sign, context, elements) {
		parseEffectiveAddress:
		while (true) {
			var _n0 = A2(author$project$Parser$parseEAElement, sign, context);
			if (_n0.$ === 'OK') {
				var _n1 = _n0.a;
				var element = _n1.a;
				var next = _n1.b;
				var newElements = A2(elm$core$List$cons, element, elements);
				var _n2 = next.current;
				switch (_n2.$) {
					case 'T_ADD':
						var $temp$sign = true,
							$temp$context = author$project$Parser$advance(next),
							$temp$elements = newElements;
						sign = $temp$sign;
						context = $temp$context;
						elements = $temp$elements;
						continue parseEffectiveAddress;
					case 'T_SUB':
						var $temp$sign = false,
							$temp$context = author$project$Parser$advance(next),
							$temp$elements = newElements;
						sign = $temp$sign;
						context = $temp$context;
						elements = $temp$elements;
						continue parseEffectiveAddress;
					case 'T_RBRT':
						return author$project$Parser$OK(
							_Utils_Tuple2(
								elm$core$List$reverse(newElements),
								author$project$Parser$advance(next)));
					default:
						return author$project$Parser$OK(
							_Utils_Tuple2(
								elm$core$List$reverse(newElements),
								context));
				}
			} else {
				var next = _n0.a;
				return author$project$Parser$OK(
					_Utils_Tuple2(
						elm$core$List$reverse(elements),
						next));
			}
		}
	});
var author$project$Parser$parseMemory = F2(
	function (size, context) {
		var _n0 = A3(
			author$project$Parser$parseEffectiveAddress,
			true,
			author$project$Parser$advance(context),
			_List_Nil);
		if (_n0.$ === 'OK') {
			var _n1 = _n0.a;
			var elements = _n1.a;
			var next = _n1.b;
			return author$project$Parser$OK(
				_Utils_Tuple2(
					author$project$Syntax$AstEffectiveAddress(
						A2(
							author$project$Parser$makeMemoryOperand,
							elements,
							author$project$Parser$initMemoryOperand(size))),
					next));
		} else {
			var next = _n0.a;
			return author$project$Parser$NOK(next);
		}
	});
var author$project$Parser$parseOperand = function (context) {
	var _n0 = context.current;
	switch (_n0.$) {
		case 'T_IDENT':
			var name = _n0.a;
			return (name === 'byteptr') ? A2(
				author$project$Parser$parseMemory,
				author$project$X86$S_8,
				author$project$Parser$advance(context)) : ((name === 'wordptr') ? A2(
				author$project$Parser$parseMemory,
				author$project$X86$S_16,
				author$project$Parser$advance(context)) : author$project$Parser$OK(
				_Utils_Tuple2(
					author$project$Syntax$AstRegister(name),
					author$project$Parser$advance(context))));
		case 'T_INTEGER':
			var value = _n0.a;
			return author$project$Parser$OK(
				_Utils_Tuple2(
					author$project$Syntax$AstImmediat(
						A2(
							elm$core$Maybe$withDefault,
							0,
							author$project$Parser$immValue(value))),
					author$project$Parser$advance(context)));
		case 'T_LBRT':
			return A2(author$project$Parser$parseMemory, context.size, context);
		default:
			return author$project$Parser$NOK(
				A2(author$project$Parser$errorExpecting, context, 'IDENT, INTEGER or ['));
	}
};
var author$project$Parser$parseOperands = F2(
	function (context, operands) {
		parseOperands:
		while (true) {
			var _n0 = context.current;
			if (_n0.$ === 'T_EOF') {
				return _Utils_Tuple2(operands, context);
			} else {
				var _n1 = author$project$Parser$parseOperand(context);
				if (_n1.$ === 'OK') {
					var _n2 = _n1.a;
					var operand = _n2.a;
					var next = _n2.b;
					var newOperands = A2(elm$core$List$cons, operand, operands);
					var _n3 = next.current;
					if (_n3.$ === 'T_COMA') {
						var $temp$context = author$project$Parser$advance(next),
							$temp$operands = newOperands;
						context = $temp$context;
						operands = $temp$operands;
						continue parseOperands;
					} else {
						return _Utils_Tuple2(
							elm$core$List$reverse(newOperands),
							next);
					}
				} else {
					var next = _n1.a;
					return _Utils_Tuple2(
						elm$core$List$reverse(operands),
						next);
				}
			}
		}
	});
var author$project$Parser$parseAssembly = function (context) {
	var _n0 = author$project$Parser$parseIdent(context);
	if (_n0.$ === 'OK') {
		var _n1 = _n0.a;
		var name = _n1.a;
		var next = _n1.b;
		var _n2 = A2(author$project$Parser$parseOperands, next, _List_Nil);
		var operands = _n2.a;
		var nn = _n2.b;
		return _Utils_Tuple2(
			elm$core$Maybe$Just(
				author$project$Syntax$AstInstr(
					_Utils_Tuple2(name, operands))),
			nn);
	} else {
		var next = _n0.a;
		return _Utils_Tuple2(elm$core$Maybe$Nothing, next);
	}
};
var author$project$Parser$parse = F2(
	function (is32Bits, content) {
		return author$project$Parser$parseAssembly(
			A2(author$project$Parser$makeParser, is32Bits, content));
	});
var author$project$Encode$encodeReg = function (r) {
	var _n0 = elm$core$String$toUpper(r);
	switch (_n0) {
		case 'EAX':
			return 0;
		case 'ECX':
			return 1;
		case 'EDX':
			return 2;
		case 'EBX':
			return 3;
		case 'ESP':
			return 4;
		case 'EBP':
			return 5;
		case 'ESI':
			return 6;
		case 'EDI':
			return 7;
		default:
			return 0;
	}
};
var author$project$Encode$extractRegister = function (operands) {
	extractRegister:
	while (true) {
		if (!operands.b) {
			return 0;
		} else {
			if ((operands.a.a.$ === 'R') && (operands.a.b.$ === 'AstRegister')) {
				var _n1 = operands.a;
				var size = _n1.a.a;
				var name = _n1.b.a;
				return author$project$Encode$encodeReg(name);
			} else {
				var tail = operands.b;
				var $temp$operands = tail;
				operands = $temp$operands;
				continue extractRegister;
			}
		}
	}
};
var author$project$Encode$encodeOpcode = F3(
	function (operands, opcode, context) {
		switch (opcode.$) {
			case 'O':
				var value = opcode.a;
				return _Utils_update(
					context,
					{
						elements: A2(
							elm$core$List$cons,
							author$project$Encode$Opcode(value),
							context.elements)
					});
			case 'O_R':
				var value = opcode.a;
				return _Utils_update(
					context,
					{
						elements: A2(
							elm$core$List$cons,
							author$project$Encode$OpcodeAndReg(
								_Utils_Tuple2(
									value,
									author$project$Encode$extractRegister(operands))),
							context.elements)
					});
			case 'E':
				var value = opcode.a;
				return _Utils_update(
					context,
					{
						reg: elm$core$Maybe$Just(value)
					});
			default:
				return context;
		}
	});
var author$project$Encode$Disp32 = function (a) {
	return {$: 'Disp32', a: a};
};
var author$project$Encode$Sib = function (a) {
	return {$: 'Sib', a: a};
};
var author$project$Encode$encodeOpt = F2(
	function (elementOpt, context) {
		if (elementOpt.$ === 'Just') {
			var element = elementOpt.a;
			return _Utils_update(
				context,
				{
					elements: A2(elm$core$List$cons, element, context.elements)
				});
		} else {
			return context;
		}
	});
var author$project$Encode$encodeReq = F2(
	function (element, context) {
		return _Utils_update(
			context,
			{
				elements: A2(elm$core$List$cons, element, context.elements)
			});
	});
var author$project$Encode$Disp8 = function (a) {
	return {$: 'Disp8', a: a};
};
var author$project$Encode$makeDisp = function (disp) {
	if (disp.$ === 'Just') {
		var value = disp.a;
		return ((_Utils_cmp(-128, value) < 0) && (value < 127)) ? _Utils_Tuple2(
			author$project$Encode$MEMORY_DISP8,
			elm$core$Maybe$Just(
				author$project$Encode$Disp8(value))) : _Utils_Tuple2(
			author$project$Encode$MEMORY_DISP32,
			elm$core$Maybe$Just(
				author$project$Encode$Disp32(value)));
	} else {
		return _Utils_Tuple2(author$project$Encode$MEMORY, elm$core$Maybe$Nothing);
	}
};
var author$project$Encode$encodeCompleteOperands = F3(
	function (reg, rm, context) {
		var _n0 = _Utils_Tuple3(rm.isReg, rm.base, rm.index);
		_n0$0:
		while (true) {
			if (_n0.b.$ === 'Just') {
				if (_n0.c.$ === 'Nothing') {
					if (_n0.a) {
						break _n0$0;
					} else {
						var base = _n0.b.a;
						var _n1 = _n0.c;
						var _n2 = author$project$Encode$makeDisp(rm.disp);
						var mode = _n2.a;
						var disp = _n2.b;
						return A2(
							author$project$Encode$encodeOpt,
							disp,
							A2(
								author$project$Encode$encodeReq,
								author$project$Encode$ModRM(
									_Utils_Tuple3(mode, reg, base)),
								context));
					}
				} else {
					if (_n0.a) {
						break _n0$0;
					} else {
						var base = _n0.b.a;
						var _n3 = _n0.c.a;
						var index = _n3.a;
						var scale = _n3.b;
						var _n4 = author$project$Encode$makeDisp(rm.disp);
						var mode = _n4.a;
						var disp = _n4.b;
						return A2(
							author$project$Encode$encodeOpt,
							disp,
							A2(
								author$project$Encode$encodeReq,
								author$project$Encode$Sib(
									_Utils_Tuple3(base, index, scale)),
								A2(
									author$project$Encode$encodeReq,
									author$project$Encode$ModRM(
										_Utils_Tuple3(
											mode,
											reg,
											author$project$Encode$encodeReg('ESP'))),
									context)));
					}
				}
			} else {
				if (_n0.c.$ === 'Just') {
					var _n5 = _n0.b;
					var _n6 = _n0.c.a;
					var index = _n6.a;
					var scale = _n6.b;
					var _n7 = author$project$Encode$makeDisp(rm.disp);
					var mode = _n7.a;
					var disp = _n7.b;
					return A2(
						author$project$Encode$encodeReq,
						author$project$Encode$Disp32(
							A2(elm$core$Maybe$withDefault, 0, rm.disp)),
						A2(
							author$project$Encode$encodeReq,
							author$project$Encode$Sib(
								_Utils_Tuple3(
									author$project$Encode$encodeReg('EBP'),
									index,
									scale)),
							A2(
								author$project$Encode$encodeReq,
								author$project$Encode$ModRM(
									_Utils_Tuple3(
										author$project$Encode$MEMORY,
										reg,
										author$project$Encode$encodeReg('ESP'))),
								context)));
				} else {
					return context;
				}
			}
		}
		var base = _n0.b.a;
		return _Utils_update(
			context,
			{
				elements: A2(
					elm$core$List$cons,
					author$project$Encode$ModRM(
						_Utils_Tuple3(author$project$Encode$REG, reg, base)),
					context.elements)
			});
	});
var author$project$Encode$addMemoryTo = F2(
	function (context, memory) {
		var _n0 = context.reg;
		if (_n0.$ === 'Just') {
			var reg = _n0.a;
			return A3(author$project$Encode$encodeCompleteOperands, reg, memory, context);
		} else {
			return _Utils_update(
				context,
				{
					rm: elm$core$Maybe$Just(memory)
				});
		}
	});
var author$project$Encode$extractMemory = function (memory) {
	var mi = A2(
		elm$core$Maybe$map,
		function (_n0) {
			var reg = _n0.a;
			var scale = _n0.b;
			return _Utils_Tuple2(
				author$project$Encode$encodeReg(reg),
				scale);
		},
		memory.index);
	var mb = A2(elm$core$Maybe$map, author$project$Encode$encodeReg, memory.base);
	return (!memory.displacement) ? {base: mb, disp: elm$core$Maybe$Nothing, index: mi, isReg: false} : {
		base: mb,
		disp: elm$core$Maybe$Just(memory.displacement),
		index: mi,
		isReg: false
	};
};
var author$project$Encode$getSize = F2(
	function (size, is32Bits) {
		switch (size.$) {
			case 'S_8':
				return author$project$X86$S_8;
			case 'S_16':
				return author$project$X86$S_16;
			case 'S_32':
				return author$project$X86$S_32;
			default:
				return is32Bits ? author$project$X86$S_32 : author$project$X86$S_16;
		}
	});
var author$project$Encode$encodeOperand = F3(
	function (context, operandDef, operand) {
		var _n0 = _Utils_Tuple2(operandDef, operand);
		_n0$4:
		while (true) {
			switch (_n0.b.$) {
				case 'AstEffectiveAddress':
					if (_n0.a.$ === 'RM') {
						var size = _n0.a.a;
						var memory = _n0.b.a;
						return A2(
							author$project$Encode$addMemoryTo,
							context,
							author$project$Encode$extractMemory(memory));
					} else {
						break _n0$4;
					}
				case 'AstRegister':
					switch (_n0.a.$) {
						case 'RM':
							var size = _n0.a.a;
							var reg = _n0.b.a;
							return A2(
								author$project$Encode$addMemoryTo,
								context,
								{
									base: elm$core$Maybe$Just(
										author$project$Encode$encodeReg(reg)),
									disp: elm$core$Maybe$Nothing,
									index: elm$core$Maybe$Nothing,
									isReg: true
								});
						case 'R':
							var size = _n0.a.a;
							var reg = _n0.b.a;
							var _n1 = _Utils_Tuple2(
								context.rm,
								author$project$Encode$encodeReg(reg));
							if (_n1.a.$ === 'Just') {
								var rm = _n1.a.a;
								var r = _n1.b;
								return A3(author$project$Encode$encodeCompleteOperands, r, rm, context);
							} else {
								var r = _n1.b;
								return _Utils_update(
									context,
									{
										reg: elm$core$Maybe$Just(r)
									});
							}
						default:
							break _n0$4;
					}
				default:
					if (_n0.a.$ === 'I') {
						var size = _n0.a.a;
						var value = _n0.b.a;
						return A2(
							author$project$Encode$encodeReq,
							author$project$Encode$Immediat(
								_Utils_Tuple2(
									A2(author$project$Encode$getSize, size, context.is32Bits),
									value)),
							context);
					} else {
						break _n0$4;
					}
			}
		}
		return context;
	});
var author$project$Encode$encodeOperands = F2(
	function (input, operands) {
		encodeOperands:
		while (true) {
			if (!operands.b) {
				return input;
			} else {
				var _n1 = operands.a;
				var tpl = _n1.a;
				var op = _n1.b;
				var tail = operands.b;
				var $temp$input = A3(author$project$Encode$encodeOperand, input, tpl, op),
					$temp$operands = tail;
				input = $temp$input;
				operands = $temp$operands;
				continue encodeOperands;
			}
		}
	});
var author$project$Encode$encodeOpcodes = F3(
	function (operands, opcodes, context) {
		encodeOpcodes:
		while (true) {
			if (!opcodes.b) {
				return elm$core$List$reverse(
					A2(author$project$Encode$encodeOperands, context, operands).elements);
			} else {
				var opcode = opcodes.a;
				var tailOpcodes = opcodes.b;
				var $temp$operands = operands,
					$temp$opcodes = tailOpcodes,
					$temp$context = A3(author$project$Encode$encodeOpcode, operands, opcode, context);
				operands = $temp$operands;
				opcodes = $temp$opcodes;
				context = $temp$context;
				continue encodeOpcodes;
			}
		}
	});
var author$project$Encode$encodeInstr = F4(
	function (is32Bits, opcodes, operandDefs, operands) {
		var context = {elements: _List_Nil, is32Bits: is32Bits, reg: elm$core$Maybe$Nothing, rm: elm$core$Maybe$Nothing};
		return A3(
			author$project$Encode$encodeOpcodes,
			A3(
				elm$core$List$map2,
				F2(
					function (tpl, op) {
						return _Utils_Tuple2(tpl, op);
					}),
				operandDefs,
				operands),
			opcodes,
			context);
	});
var author$project$Encode$encode = F3(
	function (is32Bits, _n0, operands) {
		var _n1 = _n0.a;
		var opcodes = _n1.a;
		var templates = _n1.c;
		return _Utils_eq(
			elm$core$List$length(templates),
			elm$core$List$length(operands)) ? elm$core$Maybe$Just(
			A4(author$project$Encode$encodeInstr, is32Bits, opcodes, templates, operands)) : elm$core$Maybe$Nothing;
	});
var author$project$Search$getSize = function (size) {
	switch (size.$) {
		case 'S_8':
			return 8;
		case 'S_16':
			return 16;
		case 'S_32':
			return 32;
		default:
			return 32;
	}
};
var author$project$Search$matchImm = F2(
	function (value, tpl) {
		var _n0 = _Utils_Tuple2(value, tpl);
		if (_n0.b.$ === 'I') {
			var v = _n0.a;
			var size = _n0.b.a;
			return _Utils_eq(size, author$project$X86$S_32) || (_Utils_eq(size, author$project$X86$S_16_32) || (_Utils_cmp(
				v,
				1 << author$project$Search$getSize(size)) < 0));
		} else {
			return false;
		}
	});
var author$project$Search$matchSize = F2(
	function (s, size) {
		switch (size.$) {
			case 'S_32':
				return _Utils_eq(s, author$project$X86$S_32) || _Utils_eq(s, author$project$X86$S_16_32);
			case 'S_16':
				return _Utils_eq(s, author$project$X86$S_16) || _Utils_eq(s, author$project$X86$S_16_32);
			case 'S_8':
				return _Utils_eq(s, author$project$X86$S_8);
			default:
				return false;
		}
	});
var author$project$Search$matchMemory = F2(
	function (memory, tpl) {
		if (tpl.$ === 'RM') {
			var size = tpl.a;
			return A2(author$project$Search$matchSize, size, memory.size);
		} else {
			return false;
		}
	});
var author$project$Search$matchRegName = F3(
	function (reg, size, r) {
		var regs = _Utils_eq(size, author$project$X86$S_16_32) ? _List_fromArray(
			[author$project$X86$S_16, author$project$X86$S_32]) : _List_fromArray(
			[size]);
		return A2(
			elm$core$List$any,
			elm$core$String$startsWith(reg),
			A2(
				elm$core$List$map,
				function (s) {
					return A2(author$project$X86$regName, s, r);
				},
				regs));
	});
var author$project$Search$regSize = function (reg) {
	return A2(elm$core$String$startsWith, 'E', reg) ? elm$core$Maybe$Just(author$project$X86$S_32) : (A2(elm$core$String$endsWith, 'X', reg) ? elm$core$Maybe$Just(author$project$X86$S_16) : ((A2(elm$core$String$endsWith, 'H', reg) || A2(elm$core$String$endsWith, 'L', reg)) ? elm$core$Maybe$Just(author$project$X86$S_8) : elm$core$Maybe$Nothing));
};
var author$project$Search$matchReg = F2(
	function (reg, tpl) {
		var _n0 = _Utils_Tuple2(
			author$project$Search$regSize(reg),
			tpl);
		if (_n0.a.$ === 'Nothing') {
			var _n1 = _n0.a;
			return true;
		} else {
			switch (_n0.b.$) {
				case 'Register':
					var size = _n0.a.a;
					var _n2 = _n0.b.a;
					var s = _n2.a;
					var r = _n2.b;
					return A3(author$project$Search$matchRegName, reg, s, r);
				case 'R':
					var size = _n0.a.a;
					var s = _n0.b.a;
					return A2(author$project$Search$matchSize, s, size);
				case 'RM':
					var size = _n0.a.a;
					var s = _n0.b.a;
					return A2(author$project$Search$matchSize, s, size);
				default:
					return false;
			}
		}
	});
var author$project$Search$matchOperand = F2(
	function (op, tpl) {
		switch (op.$) {
			case 'AstRegister':
				var name = op.a;
				return A2(
					author$project$Search$matchReg,
					elm$core$String$toUpper(name),
					tpl);
			case 'AstImmediat':
				var value = op.a;
				return A2(author$project$Search$matchImm, value, tpl);
			default:
				var ea = op.a;
				return A2(author$project$Search$matchMemory, ea, tpl);
		}
	});
var author$project$Search$matchOperands = F2(
	function (operands, templates) {
		var _n0 = _Utils_Tuple2(operands, templates);
		if (_n0.a.b) {
			if (_n0.b.b) {
				var _n1 = _n0.a;
				var operand = _n1.a;
				var operandsTail = _n1.b;
				var _n2 = _n0.b;
				var tpl = _n2.a;
				var templatesTail = _n2.b;
				return A2(author$project$Search$matchOperand, operand, tpl) && A2(author$project$Search$matchOperands, operandsTail, templatesTail);
			} else {
				return false;
			}
		} else {
			return true;
		}
	});
var author$project$Search$filterByOperands = F2(
	function (operands, instrs) {
		return A2(
			elm$core$List$filter,
			function (_n0) {
				var _n1 = _n0.a;
				var templates = _n1.c;
				return A2(author$project$Search$matchOperands, operands, templates);
			},
			instrs);
	});
var author$project$X86$instructionsByName = A2(
	author$project$Utils$groupBy,
	function (_n0) {
		var _n1 = _n0.a;
		var name = _n1.b;
		return name;
	},
	author$project$X86$instructions);
var author$project$Search$search = F2(
	function (_n0, is32Bits) {
		var _n1 = _n0.a;
		var name = _n1.a;
		var operands = _n1.b;
		var compare = (elm$core$List$length(operands) > 0) ? elm$core$Basics$eq : elm$core$String$startsWith;
		var keys = A2(
			elm$core$List$filter,
			compare(
				elm$core$String$toUpper(name)),
			elm$core$Dict$keys(author$project$X86$instructionsByName));
		var instrDefs = A2(
			elm$core$List$concatMap,
			function (a) {
				var _n2 = A2(elm$core$Dict$get, a, author$project$X86$instructionsByName);
				if (_n2.$ === 'Just') {
					var value = _n2.a;
					return A2(author$project$Search$filterByOperands, operands, value);
				} else {
					return _List_Nil;
				}
			},
			keys);
		return A2(
			elm$core$List$map,
			function (i) {
				return _Utils_Tuple2(
					author$project$X86$instrToString(i),
					A3(author$project$Encode$encode, is32Bits, i, operands));
			},
			instrDefs);
	});
var author$project$Main$encode = function (model) {
	var _n0 = A2(author$project$Parser$parse, model.is32Bits, model.content);
	var instr = _n0.a;
	var context = _n0.b;
	var instructions = function () {
		if (instr.$ === 'Just') {
			var i = instr.a;
			return A2(author$project$Search$search, i, model.is32Bits);
		} else {
			return _List_Nil;
		}
	}();
	return _Utils_Tuple2(context.errors, instructions);
};
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$label = _VirtualDom_node('label');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$checked = elm$html$Html$Attributes$boolProperty('checked');
var elm$json$Json$Encode$string = _Json_wrap;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Main$makeSwitch = F5(
	function (cls, leftLabel, rightLabel, value, handler) {
		var textClass = function (v) {
			return v ? 'on' : 'off';
		};
		return A2(
			elm$html$Html$span,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class(cls)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$span,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class(
							textClass(!value))
						]),
					_List_fromArray(
						[
							elm$html$Html$text(leftLabel + ' ')
						])),
					A2(
					elm$html$Html$label,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('switch')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$input,
							_List_fromArray(
								[
									elm$html$Html$Attributes$type_('checkbox'),
									elm$html$Html$Events$onClick(handler),
									elm$html$Html$Attributes$checked(value)
								]),
							_List_Nil),
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('slider round')
								]),
							_List_Nil)
						])),
					A2(
					elm$html$Html$span,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class(
							textClass(value))
						]),
					_List_fromArray(
						[
							elm$html$Html$text(' ' + rightLabel)
						]))
				]));
	});
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$ul = _VirtualDom_node('ul');
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var author$project$Main$view = function (model) {
	var _n0 = model.decode ? author$project$Main$decode(model) : author$project$Main$encode(model);
	var errors = _n0.a;
	var instructions = _n0.b;
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$id('container')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('logo')
					]),
				_List_Nil),
				A5(author$project$Main$makeSwitch, '', 'Encode', 'Decode', model.decode, author$project$Main$OperationModeChange),
				A5(author$project$Main$makeSwitch, 'push-right', '16bits', '32bits', model.is32Bits, author$project$Main$BitSizeChange),
				A2(
				elm$html$Html$input,
				_List_fromArray(
					[
						elm$html$Html$Attributes$placeholder('Assembly'),
						elm$html$Html$Events$onInput(author$project$Main$Change),
						elm$html$Html$Attributes$type_('text'),
						elm$html$Html$Attributes$value(model.content)
					]),
				_List_Nil),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('errors')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$ul,
						_List_Nil,
						A2(
							elm$core$List$map,
							function (error) {
								return A2(
									elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(error.msg)
										]));
							},
							errors))
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('instructions')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$ul,
						_List_Nil,
						A2(
							elm$core$List$map,
							function (_n1) {
								var i = _n1.a;
								var encoding = _n1.b;
								return A2(
									elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											elm$html$Html$div,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('instruction')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$span,
													_List_Nil,
													_List_fromArray(
														[
															elm$html$Html$text(i)
														])),
													A2(
													elm$core$Maybe$withDefault,
													elm$html$Html$text(''),
													A2(elm$core$Maybe$map, author$project$EncodeDiagram$encode, encoding))
												]))
										]));
							},
							instructions))
					]))
			]));
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$sandbox = function (impl) {
	return _Browser_element(
		{
			init: function (_n0) {
				return _Utils_Tuple2(impl.init, elm$core$Platform$Cmd$none);
			},
			subscriptions: function (_n1) {
				return elm$core$Platform$Sub$none;
			},
			update: F2(
				function (msg, model) {
					return _Utils_Tuple2(
						A2(impl.update, msg, model),
						elm$core$Platform$Cmd$none);
				}),
			view: impl.view
		});
};
var author$project$Main$main = elm$browser$Browser$sandbox(
	{init: author$project$Main$initialModel, update: author$project$Main$update, view: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));