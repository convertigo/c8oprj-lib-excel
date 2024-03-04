/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
if (!Object.keys) Object.keys = function() {
    var t = Object.prototype.hasOwnProperty,
        e = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        r = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        i = r.length;
    return function(n) {
        if (typeof n !== "object" && typeof n !== "function" || n === null) throw new TypeError("Object.keys called on non-object");
        var o = [];
        for (var a in n)
            if (t.call(n, a)) o.push(a);
        if (e)
            for (var l = 0; l < i; ++l)
                if (t.call(n, r[l])) o.push(r[l]);
        return o
    }
}();
if (!String.prototype.trim) String.prototype.trim = function() {
    var t = this.replace(/^\s+/, "");
    for (var e = t.length - 1; e >= 0; --e)
        if (!t.charAt(e).match(/^\s/)) return t.slice(0, e + 1);
    return ""
};
if (!Array.prototype.forEach) Array.prototype.forEach = function(t) {
    var e = this.length >>> 0,
        r = arguments[1] || void 0;
    for (var i = 0; i < e; ++i)
        if (i in this) r ? t.call(r, this[i], i, this) : t(this[i], i, this)
};
if (!Array.prototype.map) Array.prototype.map = function(t) {
    var e = this.length >>> 0,
        r = arguments[1] || void 0,
        i = new Array(e);
    for (var n = 0; n < e; ++n)
        if (n in this) i[n] = r ? t.call(r, this[n], n, this) : t(this[n], n, this);
    return i
};
if (!Array.prototype.indexOf) Array.prototype.indexOf = function(t) {
    var e = this.length >>> 0,
        r = arguments[1] | 0 || 0;
    for (r < 0 && (r += e) < 0 && (r = 0); r < e; ++r)
        if (this[r] === t) return r;
    return -1
};
if (!Array.prototype.lastIndexOf) Array.prototype.lastIndexOf = function(t) {
    var e = this.length >>> 0,
        r = e - 1;
    for (; r >= 0; --r)
        if (this[r] === t) return r;
    return -1
};
if (!Array.isArray) Array.isArray = function(t) {
    return Object.prototype.toString.call(t) === "[object Array]"
};
if (!Date.prototype.toISOString) Date.prototype.toISOString = function() {
    function t(t, e) {
        return ("0000000" + t).slice(-(e || 2))
    }
    return function e() {
        var e = this.getUTCFullYear(),
            r = "";
        if (e > 9999) r = "+" + t(e, 6);
        else if (e < 0) r = "-" + t(-e, 6);
        else r = t(e, 4);
        return [r, t(this.getUTCMonth() + 1), t(this.getUTCDate())].join("-") + "T" + [t(this.getUTCHours()), t(this.getUTCMinutes()), t(this.getUTCSeconds())].join(":") + "." + t(this.getUTCMilliseconds(), 3) + "Z"
    }
}();
if (typeof ArrayBuffer !== "undefined" && !ArrayBuffer.prototype.slice) ArrayBuffer.prototype.slice = function(t, e) {
    if (t == null) t = 0;
    if (t < 0) {
        t += this.byteLength;
        if (t < 0) t = 0
    }
    if (t >= this.byteLength) return new Uint8Array(0);
    if (e == null) e = this.byteLength;
    if (e < 0) {
        e += this.byteLength;
        if (e < 0) e = 0
    }
    if (e > this.byteLength) e = this.byteLength;
    if (t > e) return new Uint8Array(0);
    var r = new ArrayBuffer(e - t);
    var i = new Uint8Array(r);
    var n = new Uint8Array(this, t, e - t);
    if (i.set) i.set(n);
    else
        while (t <= --e) i[e - t] = n[e];
    return r
};
if (typeof Uint8Array !== "undefined" && !Uint8Array.prototype.slice) Uint8Array.prototype.slice = function(t, e) {
    if (t == null) t = 0;
    if (t < 0) {
        t += this.length;
        if (t < 0) t = 0
    }
    if (t >= this.length) return new Uint8Array(0);
    if (e == null) e = this.length;
    if (e < 0) {
        e += this.length;
        if (e < 0) e = 0
    }
    if (e > this.length) e = this.length;
    if (t > e) return new Uint8Array(0);
    var r = new Uint8Array(e - t);
    while (t <= --e) r[e - t] = this[e];
    return r
};
var IE_SaveFile = function() {
    try {
        if (typeof IE_SaveFile_Impl == "undefined") document.write(['<script type="text/vbscript" language="vbscript">', 'IE_GetProfileAndPath_Key = "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders\\"', 'Function IE_GetProfileAndPath(key): Set wshell = CreateObject("WScript.Shell"): IE_GetProfileAndPath = wshell.RegRead(IE_GetProfileAndPath_Key & key): IE_GetProfileAndPath = wshell.ExpandEnvironmentStrings("%USERPROFILE%") & "!" & IE_GetProfileAndPath: End Function', 'Function IE_SaveFile_Impl(FileName, payload): Dim data, plen, i, bit: data = CStr(payload): plen = Len(data): Set fso = CreateObject("Scripting.FileSystemObject"): fso.CreateTextFile FileName, True: Set f = fso.GetFile(FileName): Set stream = f.OpenAsTextStream(2, 0): For i = 1 To plen Step 3: bit = Mid(data, i, 2): stream.write Chr(CLng("&h" & bit)): Next: stream.Close: IE_SaveFile_Impl = True: End Function', "|/script>".replace("|", "<")].join("\r\n"));
        if (typeof IE_SaveFile_Impl == "undefined") return void 0;
        var t = function() {
            var t = "";
            try {
                t = IE_GetProfileAndPath("{374DE290-123F-4565-9164-39C4925E467B}")
            } catch (e) {
                try {
                    t = IE_GetProfileAndPath("Personal")
                } catch (e) {
                    try {
                        t = IE_GetProfileAndPath("Desktop")
                    } catch (e) {
                        throw e
                    }
                }
            }
            var r = t.split("!");
            DDP = r[1].replace("%USERPROFILE%", r[0]);
            return function(t) {
                return DDP + "\\" + t
            }
        }();

        function e(t) {
            var e = [];
            var r = typeof t == "string";
            for (var i = 0; i < t.length; ++i) e.push(("00" + (r ? t.charCodeAt(i) : t[i]).toString(16)).slice(-2));
            var n = e.join("|");
            return n
        }
        return function(r, i) {
            return IE_SaveFile_Impl(t(i), e(r))
        }
    } catch (r) {
        return void 0
    }
}();
var IE_LoadFile = function() {
    try {
        if (typeof IE_LoadFile_Impl == "undefined") document.write(['<script type="text/vbscript" language="vbscript">', 'Function IE_LoadFile_Impl(FileName): Dim out(), plen, i, cc: Set fso = CreateObject("Scripting.FileSystemObject"): Set f = fso.GetFile(FileName): Set stream = f.OpenAsTextStream(1, 0): plen = f.Size: ReDim out(plen): For i = 1 To plen Step 1: cc = Hex(Asc(stream.read(1))): If Len(cc) < 2 Then: cc = "0" & cc: End If: out(i) = cc: Next: IE_LoadFile_Impl = Join(out,""): End Function', "|/script>".replace("|", "<")].join("\r\n"));
        if (typeof IE_LoadFile_Impl == "undefined") return void 0;

        function t(t) {
            var e = [];
            for (var r = 0; r < t.length; r += 2) e.push(String.fromCharCode(parseInt(t.slice(r, r + 2), 16)));
            var i = e.join("");
            return i
        }
        return function(e) {
            return t(IE_LoadFile_Impl(e))
        }
    } catch (e) {
        return void 0
    }
}();
if (typeof window !== "undefined" && typeof window.getComputedStyle !== "function") {
    window.getComputedStyle = function(t, e) {
        return this.el = t, this.getPropertyValue = function(e) {
            var r = /(\-([a-z]){1})/g;
            return e == "float" && (e = "styleFloat"), r.test(e) && (e = e.replace(r, function() {
                return arguments[2].toUpperCase()
            })), t.currentStyle[e] ? t.currentStyle[e] : null
        }, this
    }
}
