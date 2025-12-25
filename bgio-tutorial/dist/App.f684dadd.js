// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/nanoid/non-secure/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nanoid = exports.customAlphabet = void 0;
let urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = '';
    let i = size | 0;
    while (i--) {
      id += alphabet[Math.random() * alphabet.length | 0];
    }
    return id;
  };
};
exports.customAlphabet = customAlphabet;
let nanoid = (size = 21) => {
  let id = '';
  let i = size | 0;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
exports.nanoid = nanoid;
},{}],"node_modules/immer/dist/immer.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyPatches = exports.Immer = void 0;
exports.castDraft = K;
exports.castImmutable = $;
exports.createDraft = void 0;
exports.current = R;
exports.default = void 0;
exports.enableAllPlugins = J;
exports.enableES5 = F;
exports.enableMapSet = C;
exports.enablePatches = T;
exports.finishDraft = void 0;
exports.freeze = d;
exports.immerable = void 0;
exports.isDraft = r;
exports.isDraftable = t;
exports.nothing = void 0;
exports.original = e;
exports.setUseProxies = exports.setAutoFreeze = exports.produceWithPatches = exports.produce = void 0;
function n(n) {
  for (var r = arguments.length, t = Array(r > 1 ? r - 1 : 0), e = 1; e < r; e++) t[e - 1] = arguments[e];
  if ("production" !== "development") {
    var i = Y[n],
      o = i ? "function" == typeof i ? i.apply(null, t) : i : "unknown error nr: " + n;
    throw Error("[Immer] " + o);
  }
  throw Error("[Immer] minified error nr: " + n + (t.length ? " " + t.map(function (n) {
    return "'" + n + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r(n) {
  return !!n && !!n[Q];
}
function t(n) {
  var r;
  return !!n && (function (n) {
    if (!n || "object" != typeof n) return !1;
    var r = Object.getPrototypeOf(n);
    if (null === r) return !0;
    var t = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
    return t === Object || "function" == typeof t && Function.toString.call(t) === Z;
  }(n) || Array.isArray(n) || !!n[L] || !!(null === (r = n.constructor) || void 0 === r ? void 0 : r[L]) || s(n) || v(n));
}
function e(t) {
  return r(t) || n(23, t), t[Q].t;
}
function i(n, r, t) {
  void 0 === t && (t = !1), 0 === o(n) ? (t ? Object.keys : nn)(n).forEach(function (e) {
    t && "symbol" == typeof e || r(e, n[e], n);
  }) : n.forEach(function (t, e) {
    return r(e, t, n);
  });
}
function o(n) {
  var r = n[Q];
  return r ? r.i > 3 ? r.i - 4 : r.i : Array.isArray(n) ? 1 : s(n) ? 2 : v(n) ? 3 : 0;
}
function u(n, r) {
  return 2 === o(n) ? n.has(r) : Object.prototype.hasOwnProperty.call(n, r);
}
function a(n, r) {
  return 2 === o(n) ? n.get(r) : n[r];
}
function f(n, r, t) {
  var e = o(n);
  2 === e ? n.set(r, t) : 3 === e ? n.add(t) : n[r] = t;
}
function c(n, r) {
  return n === r ? 0 !== n || 1 / n == 1 / r : n != n && r != r;
}
function s(n) {
  return X && n instanceof Map;
}
function v(n) {
  return q && n instanceof Set;
}
function p(n) {
  return n.o || n.t;
}
function l(n) {
  if (Array.isArray(n)) return Array.prototype.slice.call(n);
  var r = rn(n);
  delete r[Q];
  for (var t = nn(r), e = 0; e < t.length; e++) {
    var i = t[e],
      o = r[i];
    !1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (r[i] = {
      configurable: !0,
      writable: !0,
      enumerable: o.enumerable,
      value: n[i]
    });
  }
  return Object.create(Object.getPrototypeOf(n), r);
}
function d(n, e) {
  return void 0 === e && (e = !1), y(n) || r(n) || !t(n) || (o(n) > 1 && (n.set = n.add = n.clear = n.delete = h), Object.freeze(n), e && i(n, function (n, r) {
    return d(r, !0);
  }, !0)), n;
}
function h() {
  n(2);
}
function y(n) {
  return null == n || "object" != typeof n || Object.isFrozen(n);
}
function b(r) {
  var t = tn[r];
  return t || n(18, r), t;
}
function m(n, r) {
  tn[n] || (tn[n] = r);
}
function _() {
  return "production" === "development" || U || n(0), U;
}
function j(n, r) {
  r && (b("Patches"), n.u = [], n.s = [], n.v = r);
}
function g(n) {
  O(n), n.p.forEach(S), n.p = null;
}
function O(n) {
  n === U && (U = n.l);
}
function w(n) {
  return U = {
    p: [],
    l: U,
    h: n,
    m: !0,
    _: 0
  };
}
function S(n) {
  var r = n[Q];
  0 === r.i || 1 === r.i ? r.j() : r.g = !0;
}
function P(r, e) {
  e._ = e.p.length;
  var i = e.p[0],
    o = void 0 !== r && r !== i;
  return e.h.O || b("ES5").S(e, r, o), o ? (i[Q].P && (g(e), n(4)), t(r) && (r = M(e, r), e.l || x(e, r)), e.u && b("Patches").M(i[Q].t, r, e.u, e.s)) : r = M(e, i, []), g(e), e.u && e.v(e.u, e.s), r !== H ? r : void 0;
}
function M(n, r, t) {
  if (y(r)) return r;
  var e = r[Q];
  if (!e) return i(r, function (i, o) {
    return A(n, e, r, i, o, t);
  }, !0), r;
  if (e.A !== n) return r;
  if (!e.P) return x(n, e.t, !0), e.t;
  if (!e.I) {
    e.I = !0, e.A._--;
    var o = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o,
      u = o,
      a = !1;
    3 === e.i && (u = new Set(o), o.clear(), a = !0), i(u, function (r, i) {
      return A(n, e, o, r, i, t, a);
    }), x(n, o, !1), t && n.u && b("Patches").N(e, t, n.u, n.s);
  }
  return e.o;
}
function A(e, i, o, a, c, s, v) {
  if ("production" !== "development" && c === o && n(5), r(c)) {
    var p = M(e, c, s && i && 3 !== i.i && !u(i.R, a) ? s.concat(a) : void 0);
    if (f(o, a, p), !r(p)) return;
    e.m = !1;
  } else v && o.add(c);
  if (t(c) && !y(c)) {
    if (!e.h.D && e._ < 1) return;
    M(e, c), i && i.A.l || x(e, c);
  }
}
function x(n, r, t) {
  void 0 === t && (t = !1), !n.l && n.h.D && n.m && d(r, t);
}
function z(n, r) {
  var t = n[Q];
  return (t ? p(t) : n)[r];
}
function I(n, r) {
  if (r in n) for (var t = Object.getPrototypeOf(n); t;) {
    var e = Object.getOwnPropertyDescriptor(t, r);
    if (e) return e;
    t = Object.getPrototypeOf(t);
  }
}
function k(n) {
  n.P || (n.P = !0, n.l && k(n.l));
}
function E(n) {
  n.o || (n.o = l(n.t));
}
function N(n, r, t) {
  var e = s(r) ? b("MapSet").F(r, t) : v(r) ? b("MapSet").T(r, t) : n.O ? function (n, r) {
    var t = Array.isArray(n),
      e = {
        i: t ? 1 : 0,
        A: r ? r.A : _(),
        P: !1,
        I: !1,
        R: {},
        l: r,
        t: n,
        k: null,
        o: null,
        j: null,
        C: !1
      },
      i = e,
      o = en;
    t && (i = [e], o = on);
    var u = Proxy.revocable(i, o),
      a = u.revoke,
      f = u.proxy;
    return e.k = f, e.j = a, f;
  }(r, t) : b("ES5").J(r, t);
  return (t ? t.A : _()).p.push(e), e;
}
function R(e) {
  return r(e) || n(22, e), function n(r) {
    if (!t(r)) return r;
    var e,
      u = r[Q],
      c = o(r);
    if (u) {
      if (!u.P && (u.i < 4 || !b("ES5").K(u))) return u.t;
      u.I = !0, e = D(r, c), u.I = !1;
    } else e = D(r, c);
    return i(e, function (r, t) {
      u && a(u.t, r) === t || f(e, r, n(t));
    }), 3 === c ? new Set(e) : e;
  }(e);
}
function D(n, r) {
  switch (r) {
    case 2:
      return new Map(n);
    case 3:
      return Array.from(n);
  }
  return l(n);
}
function F() {
  function t(n, r) {
    var t = s[n];
    return t ? t.enumerable = r : s[n] = t = {
      configurable: !0,
      enumerable: r,
      get: function () {
        var r = this[Q];
        return "production" !== "development" && f(r), en.get(r, n);
      },
      set: function (r) {
        var t = this[Q];
        "production" !== "development" && f(t), en.set(t, n, r);
      }
    }, t;
  }
  function e(n) {
    for (var r = n.length - 1; r >= 0; r--) {
      var t = n[r][Q];
      if (!t.P) switch (t.i) {
        case 5:
          a(t) && k(t);
          break;
        case 4:
          o(t) && k(t);
      }
    }
  }
  function o(n) {
    for (var r = n.t, t = n.k, e = nn(t), i = e.length - 1; i >= 0; i--) {
      var o = e[i];
      if (o !== Q) {
        var a = r[o];
        if (void 0 === a && !u(r, o)) return !0;
        var f = t[o],
          s = f && f[Q];
        if (s ? s.t !== a : !c(f, a)) return !0;
      }
    }
    var v = !!r[Q];
    return e.length !== nn(r).length + (v ? 0 : 1);
  }
  function a(n) {
    var r = n.k;
    if (r.length !== n.t.length) return !0;
    var t = Object.getOwnPropertyDescriptor(r, r.length - 1);
    if (t && !t.get) return !0;
    for (var e = 0; e < r.length; e++) if (!r.hasOwnProperty(e)) return !0;
    return !1;
  }
  function f(r) {
    r.g && n(3, JSON.stringify(p(r)));
  }
  var s = {};
  m("ES5", {
    J: function (n, r) {
      var e = Array.isArray(n),
        i = function (n, r) {
          if (n) {
            for (var e = Array(r.length), i = 0; i < r.length; i++) Object.defineProperty(e, "" + i, t(i, !0));
            return e;
          }
          var o = rn(r);
          delete o[Q];
          for (var u = nn(o), a = 0; a < u.length; a++) {
            var f = u[a];
            o[f] = t(f, n || !!o[f].enumerable);
          }
          return Object.create(Object.getPrototypeOf(r), o);
        }(e, n),
        o = {
          i: e ? 5 : 4,
          A: r ? r.A : _(),
          P: !1,
          I: !1,
          R: {},
          l: r,
          t: n,
          k: i,
          o: null,
          g: !1,
          C: !1
        };
      return Object.defineProperty(i, Q, {
        value: o,
        writable: !0
      }), i;
    },
    S: function (n, t, o) {
      o ? r(t) && t[Q].A === n && e(n.p) : (n.u && function n(r) {
        if (r && "object" == typeof r) {
          var t = r[Q];
          if (t) {
            var e = t.t,
              o = t.k,
              f = t.R,
              c = t.i;
            if (4 === c) i(o, function (r) {
              r !== Q && (void 0 !== e[r] || u(e, r) ? f[r] || n(o[r]) : (f[r] = !0, k(t)));
            }), i(e, function (n) {
              void 0 !== o[n] || u(o, n) || (f[n] = !1, k(t));
            });else if (5 === c) {
              if (a(t) && (k(t), f.length = !0), o.length < e.length) for (var s = o.length; s < e.length; s++) f[s] = !1;else for (var v = e.length; v < o.length; v++) f[v] = !0;
              for (var p = Math.min(o.length, e.length), l = 0; l < p; l++) o.hasOwnProperty(l) || (f[l] = !0), void 0 === f[l] && n(o[l]);
            }
          }
        }
      }(n.p[0]), e(n.p));
    },
    K: function (n) {
      return 4 === n.i ? o(n) : a(n);
    }
  });
}
function T() {
  function e(n) {
    if (!t(n)) return n;
    if (Array.isArray(n)) return n.map(e);
    if (s(n)) return new Map(Array.from(n.entries()).map(function (n) {
      return [n[0], e(n[1])];
    }));
    if (v(n)) return new Set(Array.from(n).map(e));
    var r = Object.create(Object.getPrototypeOf(n));
    for (var i in n) r[i] = e(n[i]);
    return u(n, L) && (r[L] = n[L]), r;
  }
  function f(n) {
    return r(n) ? e(n) : n;
  }
  var c = "add";
  m("Patches", {
    $: function (r, t) {
      return t.forEach(function (t) {
        for (var i = t.path, u = t.op, f = r, s = 0; s < i.length - 1; s++) {
          var v = o(f),
            p = i[s];
          "string" != typeof p && "number" != typeof p && (p = "" + p), 0 !== v && 1 !== v || "__proto__" !== p && "constructor" !== p || n(24), "function" == typeof f && "prototype" === p && n(24), "object" != typeof (f = a(f, p)) && n(15, i.join("/"));
        }
        var l = o(f),
          d = e(t.value),
          h = i[i.length - 1];
        switch (u) {
          case "replace":
            switch (l) {
              case 2:
                return f.set(h, d);
              case 3:
                n(16);
              default:
                return f[h] = d;
            }
          case c:
            switch (l) {
              case 1:
                return "-" === h ? f.push(d) : f.splice(h, 0, d);
              case 2:
                return f.set(h, d);
              case 3:
                return f.add(d);
              default:
                return f[h] = d;
            }
          case "remove":
            switch (l) {
              case 1:
                return f.splice(h, 1);
              case 2:
                return f.delete(h);
              case 3:
                return f.delete(t.value);
              default:
                return delete f[h];
            }
          default:
            n(17, u);
        }
      }), r;
    },
    N: function (n, r, t, e) {
      switch (n.i) {
        case 0:
        case 4:
        case 2:
          return function (n, r, t, e) {
            var o = n.t,
              s = n.o;
            i(n.R, function (n, i) {
              var v = a(o, n),
                p = a(s, n),
                l = i ? u(o, n) ? "replace" : c : "remove";
              if (v !== p || "replace" !== l) {
                var d = r.concat(n);
                t.push("remove" === l ? {
                  op: l,
                  path: d
                } : {
                  op: l,
                  path: d,
                  value: p
                }), e.push(l === c ? {
                  op: "remove",
                  path: d
                } : "remove" === l ? {
                  op: c,
                  path: d,
                  value: f(v)
                } : {
                  op: "replace",
                  path: d,
                  value: f(v)
                });
              }
            });
          }(n, r, t, e);
        case 5:
        case 1:
          return function (n, r, t, e) {
            var i = n.t,
              o = n.R,
              u = n.o;
            if (u.length < i.length) {
              var a = [u, i];
              i = a[0], u = a[1];
              var s = [e, t];
              t = s[0], e = s[1];
            }
            for (var v = 0; v < i.length; v++) if (o[v] && u[v] !== i[v]) {
              var p = r.concat([v]);
              t.push({
                op: "replace",
                path: p,
                value: f(u[v])
              }), e.push({
                op: "replace",
                path: p,
                value: f(i[v])
              });
            }
            for (var l = i.length; l < u.length; l++) {
              var d = r.concat([l]);
              t.push({
                op: c,
                path: d,
                value: f(u[l])
              });
            }
            i.length < u.length && e.push({
              op: "replace",
              path: r.concat(["length"]),
              value: i.length
            });
          }(n, r, t, e);
        case 3:
          return function (n, r, t, e) {
            var i = n.t,
              o = n.o,
              u = 0;
            i.forEach(function (n) {
              if (!o.has(n)) {
                var i = r.concat([u]);
                t.push({
                  op: "remove",
                  path: i,
                  value: n
                }), e.unshift({
                  op: c,
                  path: i,
                  value: n
                });
              }
              u++;
            }), u = 0, o.forEach(function (n) {
              if (!i.has(n)) {
                var o = r.concat([u]);
                t.push({
                  op: c,
                  path: o,
                  value: n
                }), e.unshift({
                  op: "remove",
                  path: o,
                  value: n
                });
              }
              u++;
            });
          }(n, r, t, e);
      }
    },
    M: function (n, r, t, e) {
      t.push({
        op: "replace",
        path: [],
        value: r === H ? void 0 : r
      }), e.push({
        op: "replace",
        path: [],
        value: n
      });
    }
  });
}
function C() {
  function r(n, r) {
    function t() {
      this.constructor = n;
    }
    a(n, r), n.prototype = (t.prototype = r.prototype, new t());
  }
  function e(n) {
    n.o || (n.R = new Map(), n.o = new Map(n.t));
  }
  function o(n) {
    n.o || (n.o = new Set(), n.t.forEach(function (r) {
      if (t(r)) {
        var e = N(n.A.h, r, n);
        n.p.set(r, e), n.o.add(e);
      } else n.o.add(r);
    }));
  }
  function u(r) {
    r.g && n(3, JSON.stringify(p(r)));
  }
  var a = function (n, r) {
      return (a = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (n, r) {
        n.__proto__ = r;
      } || function (n, r) {
        for (var t in r) r.hasOwnProperty(t) && (n[t] = r[t]);
      })(n, r);
    },
    f = function () {
      function n(n, r) {
        return this[Q] = {
          i: 2,
          l: r,
          A: r ? r.A : _(),
          P: !1,
          I: !1,
          o: void 0,
          R: void 0,
          t: n,
          k: this,
          C: !1,
          g: !1
        }, this;
      }
      r(n, Map);
      var o = n.prototype;
      return Object.defineProperty(o, "size", {
        get: function () {
          return p(this[Q]).size;
        }
      }), o.has = function (n) {
        return p(this[Q]).has(n);
      }, o.set = function (n, r) {
        var t = this[Q];
        return u(t), p(t).has(n) && p(t).get(n) === r || (e(t), k(t), t.R.set(n, !0), t.o.set(n, r), t.R.set(n, !0)), this;
      }, o.delete = function (n) {
        if (!this.has(n)) return !1;
        var r = this[Q];
        return u(r), e(r), k(r), r.t.has(n) ? r.R.set(n, !1) : r.R.delete(n), r.o.delete(n), !0;
      }, o.clear = function () {
        var n = this[Q];
        u(n), p(n).size && (e(n), k(n), n.R = new Map(), i(n.t, function (r) {
          n.R.set(r, !1);
        }), n.o.clear());
      }, o.forEach = function (n, r) {
        var t = this;
        p(this[Q]).forEach(function (e, i) {
          n.call(r, t.get(i), i, t);
        });
      }, o.get = function (n) {
        var r = this[Q];
        u(r);
        var i = p(r).get(n);
        if (r.I || !t(i)) return i;
        if (i !== r.t.get(n)) return i;
        var o = N(r.A.h, i, r);
        return e(r), r.o.set(n, o), o;
      }, o.keys = function () {
        return p(this[Q]).keys();
      }, o.values = function () {
        var n,
          r = this,
          t = this.keys();
        return (n = {})[V] = function () {
          return r.values();
        }, n.next = function () {
          var n = t.next();
          return n.done ? n : {
            done: !1,
            value: r.get(n.value)
          };
        }, n;
      }, o.entries = function () {
        var n,
          r = this,
          t = this.keys();
        return (n = {})[V] = function () {
          return r.entries();
        }, n.next = function () {
          var n = t.next();
          if (n.done) return n;
          var e = r.get(n.value);
          return {
            done: !1,
            value: [n.value, e]
          };
        }, n;
      }, o[V] = function () {
        return this.entries();
      }, n;
    }(),
    c = function () {
      function n(n, r) {
        return this[Q] = {
          i: 3,
          l: r,
          A: r ? r.A : _(),
          P: !1,
          I: !1,
          o: void 0,
          t: n,
          k: this,
          p: new Map(),
          g: !1,
          C: !1
        }, this;
      }
      r(n, Set);
      var t = n.prototype;
      return Object.defineProperty(t, "size", {
        get: function () {
          return p(this[Q]).size;
        }
      }), t.has = function (n) {
        var r = this[Q];
        return u(r), r.o ? !!r.o.has(n) || !(!r.p.has(n) || !r.o.has(r.p.get(n))) : r.t.has(n);
      }, t.add = function (n) {
        var r = this[Q];
        return u(r), this.has(n) || (o(r), k(r), r.o.add(n)), this;
      }, t.delete = function (n) {
        if (!this.has(n)) return !1;
        var r = this[Q];
        return u(r), o(r), k(r), r.o.delete(n) || !!r.p.has(n) && r.o.delete(r.p.get(n));
      }, t.clear = function () {
        var n = this[Q];
        u(n), p(n).size && (o(n), k(n), n.o.clear());
      }, t.values = function () {
        var n = this[Q];
        return u(n), o(n), n.o.values();
      }, t.entries = function () {
        var n = this[Q];
        return u(n), o(n), n.o.entries();
      }, t.keys = function () {
        return this.values();
      }, t[V] = function () {
        return this.values();
      }, t.forEach = function (n, r) {
        for (var t = this.values(), e = t.next(); !e.done;) n.call(r, e.value, e.value, this), e = t.next();
      }, n;
    }();
  m("MapSet", {
    F: function (n, r) {
      return new f(n, r);
    },
    T: function (n, r) {
      return new c(n, r);
    }
  });
}
function J() {
  F(), C(), T();
}
function K(n) {
  return n;
}
function $(n) {
  return n;
}
var G,
  U,
  W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
  X = "undefined" != typeof Map,
  q = "undefined" != typeof Set,
  B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
  H = exports.nothing = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = !0, G),
  L = exports.immerable = W ? Symbol.for("immer-draftable") : "__$immer_draftable",
  Q = W ? Symbol.for("immer-state") : "__$immer_state",
  V = "undefined" != typeof Symbol && Symbol.iterator || "@@iterator",
  Y = {
    0: "Illegal state",
    1: "Immer drafts cannot have computed properties",
    2: "This object has been frozen and should not be mutated",
    3: function (n) {
      return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n;
    },
    4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
    5: "Immer forbids circular references",
    6: "The first or second argument to `produce` must be a function",
    7: "The third argument to `produce` must be a function or undefined",
    8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
    9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
    10: "The given draft is already finalized",
    11: "Object.defineProperty() cannot be used on an Immer draft",
    12: "Object.setPrototypeOf() cannot be used on an Immer draft",
    13: "Immer only supports deleting array indices",
    14: "Immer only supports setting array indices and the 'length' property",
    15: function (n) {
      return "Cannot apply patch, path doesn't resolve: " + n;
    },
    16: 'Sets cannot have "replace" patches.',
    17: function (n) {
      return "Unsupported patch operation: " + n;
    },
    18: function (n) {
      return "The plugin for '" + n + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n + "()` when initializing your application.";
    },
    20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",
    21: function (n) {
      return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n + "'";
    },
    22: function (n) {
      return "'current' expects a draft, got: " + n;
    },
    23: function (n) {
      return "'original' expects a draft, got: " + n;
    },
    24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
  },
  Z = "" + Object.prototype.constructor,
  nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
    return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
  } : Object.getOwnPropertyNames,
  rn = Object.getOwnPropertyDescriptors || function (n) {
    var r = {};
    return nn(n).forEach(function (t) {
      r[t] = Object.getOwnPropertyDescriptor(n, t);
    }), r;
  },
  tn = {},
  en = {
    get: function (n, r) {
      if (r === Q) return n;
      var e = p(n);
      if (!u(e, r)) return function (n, r, t) {
        var e,
          i = I(r, t);
        return i ? "value" in i ? i.value : null === (e = i.get) || void 0 === e ? void 0 : e.call(n.k) : void 0;
      }(n, e, r);
      var i = e[r];
      return n.I || !t(i) ? i : i === z(n.t, r) ? (E(n), n.o[r] = N(n.A.h, i, n)) : i;
    },
    has: function (n, r) {
      return r in p(n);
    },
    ownKeys: function (n) {
      return Reflect.ownKeys(p(n));
    },
    set: function (n, r, t) {
      var e = I(p(n), r);
      if (null == e ? void 0 : e.set) return e.set.call(n.k, t), !0;
      if (!n.P) {
        var i = z(p(n), r),
          o = null == i ? void 0 : i[Q];
        if (o && o.t === t) return n.o[r] = t, n.R[r] = !1, !0;
        if (c(t, i) && (void 0 !== t || u(n.t, r))) return !0;
        E(n), k(n);
      }
      return n.o[r] === t && (void 0 !== t || r in n.o) || Number.isNaN(t) && Number.isNaN(n.o[r]) || (n.o[r] = t, n.R[r] = !0), !0;
    },
    deleteProperty: function (n, r) {
      return void 0 !== z(n.t, r) || r in n.t ? (n.R[r] = !1, E(n), k(n)) : delete n.R[r], n.o && delete n.o[r], !0;
    },
    getOwnPropertyDescriptor: function (n, r) {
      var t = p(n),
        e = Reflect.getOwnPropertyDescriptor(t, r);
      return e ? {
        writable: !0,
        configurable: 1 !== n.i || "length" !== r,
        enumerable: e.enumerable,
        value: t[r]
      } : e;
    },
    defineProperty: function () {
      n(11);
    },
    getPrototypeOf: function (n) {
      return Object.getPrototypeOf(n.t);
    },
    setPrototypeOf: function () {
      n(12);
    }
  },
  on = {};
i(en, function (n, r) {
  on[n] = function () {
    return arguments[0] = arguments[0][0], r.apply(this, arguments);
  };
}), on.deleteProperty = function (r, t) {
  return "production" !== "development" && isNaN(parseInt(t)) && n(13), on.set.call(this, r, t, void 0);
}, on.set = function (r, t, e) {
  return "production" !== "development" && "length" !== t && isNaN(parseInt(t)) && n(14), en.set.call(this, r[0], t, e, r[0]);
};
var un = exports.Immer = function () {
    function e(r) {
      var e = this;
      this.O = B, this.D = !0, this.produce = function (r, i, o) {
        if ("function" == typeof r && "function" != typeof i) {
          var u = i;
          i = r;
          var a = e;
          return function (n) {
            var r = this;
            void 0 === n && (n = u);
            for (var t = arguments.length, e = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) e[o - 1] = arguments[o];
            return a.produce(n, function (n) {
              var t;
              return (t = i).call.apply(t, [r, n].concat(e));
            });
          };
        }
        var f;
        if ("function" != typeof i && n(6), void 0 !== o && "function" != typeof o && n(7), t(r)) {
          var c = w(e),
            s = N(e, r, void 0),
            v = !0;
          try {
            f = i(s), v = !1;
          } finally {
            v ? g(c) : O(c);
          }
          return "undefined" != typeof Promise && f instanceof Promise ? f.then(function (n) {
            return j(c, o), P(n, c);
          }, function (n) {
            throw g(c), n;
          }) : (j(c, o), P(f, c));
        }
        if (!r || "object" != typeof r) {
          if (void 0 === (f = i(r)) && (f = r), f === H && (f = void 0), e.D && d(f, !0), o) {
            var p = [],
              l = [];
            b("Patches").M(r, f, p, l), o(p, l);
          }
          return f;
        }
        n(21, r);
      }, this.produceWithPatches = function (n, r) {
        if ("function" == typeof n) return function (r) {
          for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) i[o - 1] = arguments[o];
          return e.produceWithPatches(r, function (r) {
            return n.apply(void 0, [r].concat(i));
          });
        };
        var t,
          i,
          o = e.produce(n, r, function (n, r) {
            t = n, i = r;
          });
        return "undefined" != typeof Promise && o instanceof Promise ? o.then(function (n) {
          return [n, t, i];
        }) : [o, t, i];
      }, "boolean" == typeof (null == r ? void 0 : r.useProxies) && this.setUseProxies(r.useProxies), "boolean" == typeof (null == r ? void 0 : r.autoFreeze) && this.setAutoFreeze(r.autoFreeze);
    }
    var i = e.prototype;
    return i.createDraft = function (e) {
      t(e) || n(8), r(e) && (e = R(e));
      var i = w(this),
        o = N(this, e, void 0);
      return o[Q].C = !0, O(i), o;
    }, i.finishDraft = function (r, t) {
      var e = r && r[Q];
      "production" !== "development" && (e && e.C || n(9), e.I && n(10));
      var i = e.A;
      return j(i, t), P(void 0, i);
    }, i.setAutoFreeze = function (n) {
      this.D = n;
    }, i.setUseProxies = function (r) {
      r && !B && n(20), this.O = r;
    }, i.applyPatches = function (n, t) {
      var e;
      for (e = t.length - 1; e >= 0; e--) {
        var i = t[e];
        if (0 === i.path.length && "replace" === i.op) {
          n = i.value;
          break;
        }
      }
      e > -1 && (t = t.slice(e + 1));
      var o = b("Patches").$;
      return r(n) ? o(n, t) : this.produce(n, function (n) {
        return o(n, t);
      });
    }, e;
  }(),
  an = new un(),
  fn = exports.produce = an.produce,
  cn = exports.produceWithPatches = an.produceWithPatches.bind(an),
  sn = exports.setAutoFreeze = an.setAutoFreeze.bind(an),
  vn = exports.setUseProxies = an.setUseProxies.bind(an),
  pn = exports.applyPatches = an.applyPatches.bind(an),
  ln = exports.createDraft = an.createDraft.bind(an),
  dn = exports.finishDraft = an.finishDraft.bind(an);
var _default = exports.default = fn;
},{}],"node_modules/boardgame.io/dist/esm/plugin-random-087f861e.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.R = void 0;
exports.a = alea;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Inlined version of Alea from https://github.com/davidbau/seedrandom.
// Converted to Typescript October 2020.
var Alea = /*#__PURE__*/function () {
  function Alea(seed) {
    _classCallCheck(this, Alea);
    var mash = Mash();
    // Apply the seeding algorithm from Baagoe.
    this.c = 1;
    this.s0 = mash(' ');
    this.s1 = mash(' ');
    this.s2 = mash(' ');
    this.s0 -= mash(seed);
    if (this.s0 < 0) {
      this.s0 += 1;
    }
    this.s1 -= mash(seed);
    if (this.s1 < 0) {
      this.s1 += 1;
    }
    this.s2 -= mash(seed);
    if (this.s2 < 0) {
      this.s2 += 1;
    }
  }
  return _createClass(Alea, [{
    key: "next",
    value: function next() {
      var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32
      this.s0 = this.s1;
      this.s1 = this.s2;
      return this.s2 = t - (this.c = Math.trunc(t));
    }
  }]);
}();
function Mash() {
  var n = 0xefc8249d;
  var mash = function mash(data) {
    var str = data.toString();
    for (var i = 0; i < str.length; i++) {
      n += str.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };
  return mash;
}
function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}
function alea(seed, state) {
  var xg = new Alea(seed);
  var prng = xg.next.bind(xg);
  if (state) copy(state, xg);
  prng.state = function () {
    return copy(xg, {});
  };
  return prng;
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Random
 *
 * Calls that require a pseudorandom number generator.
 * Uses a seed from ctx, and also persists the PRNG
 * state in ctx so that moves can stay pure.
 */
var Random = /*#__PURE__*/function () {
  /**
   * constructor
   * @param {object} ctx - The ctx object to initialize from.
   */
  function Random(state) {
    _classCallCheck(this, Random);
    // If we are on the client, the seed is not present.
    // Just use a temporary seed to execute the move without
    // crashing it. The move state itself is discarded,
    // so the actual value doesn't matter.
    this.state = state || {
      seed: '0'
    };
    this.used = false;
  }
  /**
   * Generates a new seed from the current date / time.
   */
  return _createClass(Random, [{
    key: "isUsed",
    value: function isUsed() {
      return this.used;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
    /**
     * Generate a random number.
     */
  }, {
    key: "_random",
    value: function _random() {
      this.used = true;
      var R = this.state;
      var seed = R.prngstate ? '' : R.seed;
      var rand = alea(seed, R.prngstate);
      var number = rand();
      this.state = _objectSpread(_objectSpread({}, R), {}, {
        prngstate: rand.state()
      });
      return number;
    }
  }, {
    key: "api",
    value: function api() {
      var random = this._random.bind(this);
      var SpotValue = {
        D4: 4,
        D6: 6,
        D8: 8,
        D10: 10,
        D12: 12,
        D20: 20
      };
      // Generate functions for predefined dice values D4 - D20.
      var predefined = {};
      var _loop = function _loop() {
        var spotvalue = SpotValue[key];
        predefined[key] = function (diceCount) {
          return diceCount === undefined ? Math.floor(random() * spotvalue) + 1 : Array.from({
            length: diceCount
          }).map(function () {
            return Math.floor(random() * spotvalue) + 1;
          });
        };
      };
      for (var key in SpotValue) {
        _loop();
      }
      function Die() {
        var spotvalue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
        var diceCount = arguments.length > 1 ? arguments[1] : undefined;
        return diceCount === undefined ? Math.floor(random() * spotvalue) + 1 : Array.from({
          length: diceCount
        }).map(function () {
          return Math.floor(random() * spotvalue) + 1;
        });
      }
      return _objectSpread(_objectSpread({}, predefined), {}, {
        /**
         * Roll a die of specified spot value.
         *
         * @param {number} spotvalue - The die dimension (default: 6).
         * @param {number} diceCount - number of dice to throw.
         *                             if not defined, defaults to 1 and returns the value directly.
         *                             if defined, returns an array containing the random dice values.
         */
        Die: Die,
        /**
         * Generate a random number between 0 and 1.
         */
        Number: function Number() {
          return random();
        },
        /**
         * Shuffle an array.
         *
         * @param {Array} deck - The array to shuffle. Does not mutate
         *                       the input, but returns the shuffled array.
         */
        Shuffle: function Shuffle(deck) {
          var clone = _toConsumableArray(deck);
          var sourceIndex = deck.length;
          var destinationIndex = 0;
          var shuffled = Array.from({
            length: sourceIndex
          });
          while (sourceIndex) {
            var randomIndex = Math.trunc(sourceIndex * random());
            shuffled[destinationIndex++] = clone[randomIndex];
            clone[randomIndex] = clone[--sourceIndex];
          }
          return shuffled;
        },
        _private: this
      });
    }
  }], [{
    key: "seed",
    value: function seed() {
      return Date.now().toString(36).slice(-10);
    }
  }]);
}();
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var RandomPlugin = exports.R = {
  name: 'random',
  noClient: function noClient(_ref) {
    var api = _ref.api;
    return api._private.isUsed();
  },
  flush: function flush(_ref2) {
    var api = _ref2.api;
    return api._private.getState();
  },
  api: function api(_ref3) {
    var data = _ref3.data;
    var random = new Random(data);
    return random.api();
  },
  setup: function setup(_ref4) {
    var game = _ref4.game;
    var seed = game.seed;
    if (seed === undefined) {
      seed = Random.seed();
    }
    return {
      seed: seed
    };
  },
  playerView: function playerView() {
    return undefined;
  }
};
},{}],"node_modules/lodash.isplainobject/index.js":[function(require,module,exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;

},{}],"node_modules/boardgame.io/dist/esm/turn-order-8cc4909b.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.G = exports.F = exports.E = exports.C = exports.B = exports.A = void 0;
exports.I = InitTurnOrderState;
exports.T = exports.S = exports.R = exports.P = exports.N = exports.M = void 0;
exports.U = UpdateTurnOrderState;
exports.a = void 0;
exports.b = supportDeprecatedMoveLimit;
exports.c = SetActivePlayers;
exports.d = UpdateActivePlayersOnceEmpty;
exports.e = error;
exports.h = exports.g = exports.f = void 0;
exports.i = info;
exports.z = exports.y = exports.x = exports.w = exports.v = exports.u = exports.t = exports.s = exports.r = exports.q = exports.p = exports.o = exports.n = exports.m = exports.l = exports.k = exports.j = void 0;
var _immer = _interopRequireDefault(require("immer"));
var _pluginRandom087f861e = require("./plugin-random-087f861e.js");
var _lodash = _interopRequireDefault(require("lodash.isplainobject"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var MAKE_MOVE = exports.M = 'MAKE_MOVE';
var GAME_EVENT = exports.o = 'GAME_EVENT';
var REDO = exports.R = 'REDO';
var RESET = exports.m = 'RESET';
var SYNC = exports.k = 'SYNC';
var UNDO = exports.j = 'UNDO';
var UPDATE = exports.l = 'UPDATE';
var PATCH = exports.P = 'PATCH';
var PLUGIN = exports.f = 'PLUGIN';
var STRIP_TRANSIENTS = exports.p = 'STRIP_TRANSIENTS';

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Generate a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var makeMove = exports.B = function makeMove(type, args, playerID, credentials) {
  return {
    type: MAKE_MOVE,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Generate a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var gameEvent = exports.g = function gameEvent(type, args, playerID, credentials) {
  return {
    type: GAME_EVENT,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Generate an automatic game event that is a side-effect of a move.
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var automaticGameEvent = function automaticGameEvent(type, args, playerID, credentials) {
  return {
    type: GAME_EVENT,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    },
    automatic: true
  };
};
var sync = exports.s = function sync(info) {
  return {
    type: SYNC,
    state: info.state,
    log: info.log,
    initialState: info.initialState,
    clientOnly: true
  };
};
/**
 * Used to update the Redux store's state with patch in response to
 * an action coming from another player.
 * @param prevStateID previous stateID
 * @param stateID stateID after this patch
 * @param {Operation[]} patch - The patch to apply.
 * @param {LogEntry[]} deltalog - A log delta.
 */
var patch = exports.y = function patch(prevStateID, stateID, _patch, deltalog) {
  return {
    type: PATCH,
    prevStateID: prevStateID,
    stateID: stateID,
    patch: _patch,
    deltalog: deltalog,
    clientOnly: true
  };
};
/**
 * Used to update the Redux store's state in response to
 * an action coming from another player.
 * @param {object} state - The state to restore.
 * @param {Array} deltalog - A log delta.
 */
var update = exports.z = function update(state, deltalog) {
  return {
    type: UPDATE,
    state: state,
    deltalog: deltalog,
    clientOnly: true
  };
};
/**
 * Used to reset the game state.
 * @param {object} state - The initial state.
 */
var reset = exports.u = function reset(state) {
  return {
    type: RESET,
    state: state,
    clientOnly: true
  };
};
/**
 * Used to undo the last move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var undo = exports.v = function undo(playerID, credentials) {
  return {
    type: UNDO,
    payload: {
      type: null,
      args: null,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Used to redo the last undone move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var redo = exports.w = function redo(playerID, credentials) {
  return {
    type: REDO,
    payload: {
      type: null,
      args: null,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Allows plugins to define their own actions and intercept them.
 */
var plugin = function plugin(type, args, playerID, credentials) {
  return {
    type: PLUGIN,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Private action used to strip transient metadata (e.g. errors) from the game
 * state.
 */
var stripTransients = exports.r = function stripTransients() {
  return {
    type: STRIP_TRANSIENTS
  };
};
var ActionCreators = exports.A = /*#__PURE__*/Object.freeze({
  __proto__: null,
  makeMove: makeMove,
  gameEvent: gameEvent,
  automaticGameEvent: automaticGameEvent,
  sync: sync,
  patch: patch,
  update: update,
  reset: reset,
  undo: undo,
  redo: redo,
  plugin: plugin,
  stripTransients: stripTransients
});

/**
 * Moves can return this when they want to indicate
 * that the combination of arguments is illegal and
 * the move ought to be discarded.
 */
var INVALID_MOVE = exports.n = 'INVALID_MOVE';

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Plugin that allows using Immer to make immutable changes
 * to G by just mutating it.
 */
var ImmerPlugin = {
  name: 'plugin-immer',
  fnWrap: function fnWrap(move) {
    return function (context) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var isInvalid = false;
      var newG = (0, _immer.default)(context.G, function (G) {
        var result = move.apply(void 0, [_objectSpread(_objectSpread({}, context), {}, {
          G: G
        })].concat(args));
        if (result === INVALID_MOVE) {
          isInvalid = true;
          return;
        }
        return result;
      });
      if (isInvalid) return INVALID_MOVE;
      return newG;
    };
  }
};
var GameMethod;
(function (GameMethod) {
  GameMethod["MOVE"] = "MOVE";
  GameMethod["GAME_ON_END"] = "GAME_ON_END";
  GameMethod["PHASE_ON_BEGIN"] = "PHASE_ON_BEGIN";
  GameMethod["PHASE_ON_END"] = "PHASE_ON_END";
  GameMethod["TURN_ON_BEGIN"] = "TURN_ON_BEGIN";
  GameMethod["TURN_ON_MOVE"] = "TURN_ON_MOVE";
  GameMethod["TURN_ON_END"] = "TURN_ON_END";
})(GameMethod || (exports.G = GameMethod = {}));

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var Errors;
(function (Errors) {
  Errors["CalledOutsideHook"] = "Events must be called from moves or the `onBegin`, `onEnd`, and `onMove` hooks.\nThis error probably means you called an event from other game code, like an `endIf` trigger or one of the `turn.order` methods.";
  Errors["EndTurnInOnEnd"] = "`endTurn` is disallowed in `onEnd` hooks \u2014 the turn is already ending.";
  Errors["MaxTurnEndings"] = "Maximum number of turn endings exceeded for this update.\nThis likely means game code is triggering an infinite loop.";
  Errors["PhaseEventInOnEnd"] = "`setPhase` & `endPhase` are disallowed in a phase\u2019s `onEnd` hook \u2014 the phase is already ending.\nIf you\u2019re trying to dynamically choose the next phase when a phase ends, use the phase\u2019s `next` trigger.";
  Errors["StageEventInOnEnd"] = "`setStage`, `endStage` & `setActivePlayers` are disallowed in `onEnd` hooks.";
  Errors["StageEventInPhaseBegin"] = "`setStage`, `endStage` & `setActivePlayers` are disallowed in a phase\u2019s `onBegin` hook.\nUse `setActivePlayers` in a `turn.onBegin` hook or declare stages with `turn.activePlayers` instead.";
  Errors["StageEventInTurnBegin"] = "`setStage` & `endStage` are disallowed in `turn.onBegin`.\nUse `setActivePlayers` or declare stages with `turn.activePlayers` instead.";
})(Errors || (Errors = {}));
/**
 * Events
 */
var Events = /*#__PURE__*/function () {
  function Events(flow, ctx, playerID) {
    _classCallCheck(this, Events);
    this.flow = flow;
    this.playerID = playerID;
    this.dispatch = [];
    this.initialTurn = ctx.turn;
    this.updateTurnContext(ctx, undefined);
    // This is an arbitrarily large upper threshold, which could be made
    // configurable via a game option if the need arises.
    this.maxEndedTurnsPerAction = ctx.numPlayers * 100;
  }
  return _createClass(Events, [{
    key: "api",
    value: function api() {
      var _this = this;
      var events = {
        _private: this
      };
      var _iterator = _createForOfIteratorHelper(this.flow.eventNames),
        _step;
      try {
        var _loop = function _loop() {
          var type = _step.value;
          events[type] = function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            _this.dispatch.push({
              type: type,
              args: args,
              phase: _this.currentPhase,
              turn: _this.currentTurn,
              calledFrom: _this.currentMethod,
              // Used to capture a stack trace in case it is needed later.
              error: new Error('Events Plugin Error')
            });
          };
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return events;
    }
  }, {
    key: "isUsed",
    value: function isUsed() {
      return this.dispatch.length > 0;
    }
  }, {
    key: "updateTurnContext",
    value: function updateTurnContext(ctx, methodType) {
      this.currentPhase = ctx.phase;
      this.currentTurn = ctx.turn;
      this.currentMethod = methodType;
    }
  }, {
    key: "unsetCurrentMethod",
    value: function unsetCurrentMethod() {
      this.currentMethod = undefined;
    }
    /**
     * Updates ctx with the triggered events.
     * @param {object} state - The state object { G, ctx }.
     */
  }, {
    key: "update",
    value: function update(state) {
      var initialState = state;
      var stateWithError = function stateWithError(_ref, message) {
        var stack = _ref.stack;
        return _objectSpread(_objectSpread({}, initialState), {}, {
          plugins: _objectSpread(_objectSpread({}, initialState.plugins), {}, {
            events: _objectSpread(_objectSpread({}, initialState.plugins.events), {}, {
              data: {
                error: message + '\n' + stack
              }
            })
          })
        });
      };
      EventQueue: for (var i = 0; i < this.dispatch.length; i++) {
        var event = this.dispatch[i];
        var turnHasEnded = event.turn !== state.ctx.turn;
        // This protects against potential infinite loops if specific events are called on hooks.
        // The moment we exceed the defined threshold, we just bail out of all phases.
        var endedTurns = this.currentTurn - this.initialTurn;
        if (endedTurns >= this.maxEndedTurnsPerAction) {
          return stateWithError(event.error, Errors.MaxTurnEndings);
        }
        if (event.calledFrom === undefined) {
          return stateWithError(event.error, Errors.CalledOutsideHook);
        }
        // Stop processing events once the game has finished.
        if (state.ctx.gameover) break EventQueue;
        switch (event.type) {
          case 'endStage':
          case 'setStage':
          case 'setActivePlayers':
            {
              switch (event.calledFrom) {
                // Disallow all stage events in onEnd and phase.onBegin hooks.
                case GameMethod.TURN_ON_END:
                case GameMethod.PHASE_ON_END:
                  return stateWithError(event.error, Errors.StageEventInOnEnd);
                case GameMethod.PHASE_ON_BEGIN:
                  return stateWithError(event.error, Errors.StageEventInPhaseBegin);
                // Disallow setStage & endStage in turn.onBegin hooks.
                case GameMethod.TURN_ON_BEGIN:
                  if (event.type === 'setActivePlayers') break;
                  return stateWithError(event.error, Errors.StageEventInTurnBegin);
              }
              // If the turn already ended, don't try to process stage events.
              if (turnHasEnded) continue EventQueue;
              break;
            }
          case 'endTurn':
            {
              if (event.calledFrom === GameMethod.TURN_ON_END || event.calledFrom === GameMethod.PHASE_ON_END) {
                return stateWithError(event.error, Errors.EndTurnInOnEnd);
              }
              // If the turn already ended some other way,
              // don't try to end the turn again.
              if (turnHasEnded) continue EventQueue;
              break;
            }
          case 'endPhase':
          case 'setPhase':
            {
              if (event.calledFrom === GameMethod.PHASE_ON_END) {
                return stateWithError(event.error, Errors.PhaseEventInOnEnd);
              }
              // If the phase already ended some other way,
              // don't try to end the phase again.
              if (event.phase !== state.ctx.phase) continue EventQueue;
              break;
            }
        }
        var action = automaticGameEvent(event.type, event.args, this.playerID);
        state = this.flow.processEvent(state, action);
      }
      return state;
    }
  }]);
}();
/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var EventsPlugin = {
  name: 'events',
  noClient: function noClient(_ref2) {
    var api = _ref2.api;
    return api._private.isUsed();
  },
  isInvalid: function isInvalid(_ref3) {
    var data = _ref3.data;
    return data.error || false;
  },
  // Update the events plugin’s internal turn context each time a move
  // or hook is called. This allows events called after turn or phase
  // endings to dispatch the current turn and phase correctly.
  fnWrap: function fnWrap(method, methodType) {
    return function (context) {
      var api = context.events;
      if (api) api._private.updateTurnContext(context.ctx, methodType);
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      var G = method.apply(void 0, [context].concat(args));
      if (api) api._private.unsetCurrentMethod();
      return G;
    };
  },
  dangerouslyFlushRawState: function dangerouslyFlushRawState(_ref4) {
    var state = _ref4.state,
      api = _ref4.api;
    return api._private.update(state);
  },
  api: function api(_ref5) {
    var game = _ref5.game,
      ctx = _ref5.ctx,
      playerID = _ref5.playerID;
    return new Events(game.flow, ctx, playerID).api();
  }
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Plugin that makes it possible to add metadata to log entries.
 * During a move, you can set metadata using ctx.log.setMetadata and it will be
 * available on the log entry for that move.
 */
var LogPlugin = {
  name: 'log',
  flush: function flush() {
    return {};
  },
  api: function api(_ref6) {
    var data = _ref6.data;
    return {
      setMetadata: function setMetadata(metadata) {
        data.metadata = metadata;
      }
    };
  },
  setup: function setup() {
    return {};
  }
};

/**
 * Check if a value can be serialized (e.g. using `JSON.stringify`).
 * Adapted from: https://stackoverflow.com/a/30712764/3829557
 */
function isSerializable(value) {
  // Primitives are OK.
  if (value === undefined || value === null || typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
    return true;
  }
  // A non-primitive value that is neither a POJO or an array cannot be serialized.
  if (!(0, _lodash.default)(value) && !Array.isArray(value)) {
    return false;
  }
  // Recurse entries if the value is an object or array.
  for (var key in value) {
    if (!isSerializable(value[key])) return false;
  }
  return true;
}
/**
 * Plugin that checks whether state is serializable, in order to avoid
 * network serialization bugs.
 */
var SerializablePlugin = {
  name: 'plugin-serializable',
  fnWrap: function fnWrap(move) {
    return function (context) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      var result = move.apply(void 0, [context].concat(args));
      // Check state in non-production environments.
      if ("development" !== 'production' && !isSerializable(result)) {
        throw new Error('Move state is not JSON-serialiazable.\n' + 'See https://boardgame.io/documentation/#/?id=state for more information.');
      }
      return result;
    };
  }
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var production = "development" === 'production';
var logfn = production ? function () {} : function () {
  var _console;
  return (_console = console).log.apply(_console, arguments);
};
var errorfn = function errorfn() {
  var _console2;
  return (_console2 = console).error.apply(_console2, arguments);
};
function info(msg) {
  logfn("INFO: ".concat(msg));
}
function error(error) {
  errorfn('ERROR:', error);
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * List of plugins that are always added.
 */
var CORE_PLUGINS = [ImmerPlugin, _pluginRandom087f861e.R, LogPlugin, SerializablePlugin];
var DEFAULT_PLUGINS = [].concat(CORE_PLUGINS, [EventsPlugin]);
/**
 * Allow plugins to intercept actions and process them.
 */
var ProcessAction = exports.h = function ProcessAction(state, action, opts) {
  // TODO(#723): Extend error handling to plugins.
  opts.game.plugins.filter(function (plugin) {
    return plugin.action !== undefined;
  }).filter(function (plugin) {
    return plugin.name === action.payload.type;
  }).forEach(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name] || {
      data: {}
    };
    var data = plugin.action(pluginState.data, action.payload);
    state = _objectSpread(_objectSpread({}, state), {}, {
      plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty({}, name, _objectSpread(_objectSpread({}, pluginState), {}, {
        data: data
      })))
    });
  });
  return state;
};
/**
 * The APIs created by various plugins are stored in the plugins
 * section of the state object:
 *
 * {
 *   G: {},
 *   ctx: {},
 *   plugins: {
 *     plugin-a: {
 *       data: {},  // this is generated by the plugin at Setup / Flush.
 *       api: {},   // this is ephemeral and generated by Enhance.
 *     }
 *   }
 * }
 *
 * This function retrieves plugin APIs and returns them as an object
 * for consumption as used by move contexts.
 */
var GetAPIs = exports.a = function GetAPIs(_ref7) {
  var plugins = _ref7.plugins;
  return Object.entries(plugins || {}).reduce(function (apis, _ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      name = _ref9[0],
      api = _ref9[1].api;
    apis[name] = api;
    return apis;
  }, {});
};
/**
 * Applies the provided plugins to the given move / flow function.
 *
 * @param methodToWrap - The move function or hook to apply the plugins to.
 * @param methodType - The type of the move or hook being wrapped.
 * @param plugins - The list of plugins.
 */
var FnWrap = exports.F = function FnWrap(methodToWrap, methodType, plugins) {
  return [].concat(CORE_PLUGINS, _toConsumableArray(plugins), [EventsPlugin]).filter(function (plugin) {
    return plugin.fnWrap !== undefined;
  }).reduce(function (method, _ref0) {
    var fnWrap = _ref0.fnWrap;
    return fnWrap(method, methodType);
  }, methodToWrap);
};
/**
 * Allows the plugin to generate its initial state.
 */
var Setup = exports.t = function Setup(state, opts) {
  [].concat(_toConsumableArray(DEFAULT_PLUGINS), _toConsumableArray(opts.game.plugins)).filter(function (plugin) {
    return plugin.setup !== undefined;
  }).forEach(function (plugin) {
    var name = plugin.name;
    var data = plugin.setup({
      G: state.G,
      ctx: state.ctx,
      game: opts.game
    });
    state = _objectSpread(_objectSpread({}, state), {}, {
      plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty({}, name, {
        data: data
      }))
    });
  });
  return state;
};
/**
 * Invokes the plugin before a move or event.
 * The API that the plugin generates is stored inside
 * the `plugins` section of the state (which is subsequently
 * merged into ctx).
 */
var Enhance = exports.E = function Enhance(state, opts) {
  [].concat(_toConsumableArray(DEFAULT_PLUGINS), _toConsumableArray(opts.game.plugins)).filter(function (plugin) {
    return plugin.api !== undefined;
  }).forEach(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name] || {
      data: {}
    };
    var api = plugin.api({
      G: state.G,
      ctx: state.ctx,
      data: pluginState.data,
      game: opts.game,
      playerID: opts.playerID
    });
    state = _objectSpread(_objectSpread({}, state), {}, {
      plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty({}, name, _objectSpread(_objectSpread({}, pluginState), {}, {
        api: api
      })))
    });
  });
  return state;
};
/**
 * Allows plugins to update their state after a move / event.
 */
var Flush = function Flush(state, opts) {
  // We flush the events plugin first, then custom plugins and the core plugins.
  // This means custom plugins cannot use the events API but will be available in event hooks.
  // Note that plugins are flushed in reverse, to allow custom plugins calling each other.
  [].concat(CORE_PLUGINS, _toConsumableArray(opts.game.plugins), [EventsPlugin]).reverse().forEach(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name] || {
      data: {}
    };
    if (plugin.flush) {
      var newData = plugin.flush({
        G: state.G,
        ctx: state.ctx,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
      state = _objectSpread(_objectSpread({}, state), {}, {
        plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty({}, plugin.name, {
          data: newData
        }))
      });
    } else if (plugin.dangerouslyFlushRawState) {
      state = plugin.dangerouslyFlushRawState({
        state: state,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
      // Remove everything other than data.
      var data = state.plugins[name].data;
      state = _objectSpread(_objectSpread({}, state), {}, {
        plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty({}, plugin.name, {
          data: data
        }))
      });
    }
  });
  return state;
};
/**
 * Allows plugins to indicate if they should not be materialized on the client.
 * This will cause the client to discard the state update and wait for the
 * master instead.
 */
var NoClient = exports.N = function NoClient(state, opts) {
  return [].concat(_toConsumableArray(DEFAULT_PLUGINS), _toConsumableArray(opts.game.plugins)).filter(function (plugin) {
    return plugin.noClient !== undefined;
  }).map(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name];
    if (pluginState) {
      return plugin.noClient({
        G: state.G,
        ctx: state.ctx,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
    }
    return false;
  }).includes(true);
};
/**
 * Allows plugins to indicate if the entire action should be thrown out
 * as invalid. This will cancel the entire state update.
 */
var IsInvalid = function IsInvalid(state, opts) {
  var firstInvalidReturn = [].concat(_toConsumableArray(DEFAULT_PLUGINS), _toConsumableArray(opts.game.plugins)).filter(function (plugin) {
    return plugin.isInvalid !== undefined;
  }).map(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name];
    var message = plugin.isInvalid({
      G: state.G,
      ctx: state.ctx,
      game: opts.game,
      data: pluginState && pluginState.data
    });
    return message ? {
      plugin: name,
      message: message
    } : false;
  }).find(function (value) {
    return value;
  });
  return firstInvalidReturn || false;
};
/**
 * Update plugin state after move/event & check if plugins consider the update to be valid.
 * @returns Tuple of `[updatedState]` or `[originalState, invalidError]`.
 */
var FlushAndValidate = exports.q = function FlushAndValidate(state, opts) {
  var updatedState = Flush(state, opts);
  var isInvalid = IsInvalid(updatedState, opts);
  if (!isInvalid) return [updatedState];
  var plugin = isInvalid.plugin,
    message = isInvalid.message;
  error("".concat(plugin, " plugin declared action invalid:\n").concat(message));
  return [state, isInvalid];
};
/**
 * Allows plugins to customize their data for specific players.
 * For example, a plugin may want to share no data with the client, or
 * want to keep some player data secret from opponents.
 */
var PlayerView = exports.x = function PlayerView(_ref1, _ref10) {
  var G = _ref1.G,
    ctx = _ref1.ctx,
    _ref1$plugins = _ref1.plugins,
    plugins = _ref1$plugins === void 0 ? {} : _ref1$plugins;
  var game = _ref10.game,
    playerID = _ref10.playerID;
  [].concat(_toConsumableArray(DEFAULT_PLUGINS), _toConsumableArray(game.plugins)).forEach(function (_ref11) {
    var name = _ref11.name,
      playerView = _ref11.playerView;
    if (!playerView) return;
    var _ref12 = plugins[name] || {
        data: {}
      },
      data = _ref12.data;
    var newData = playerView({
      G: G,
      ctx: ctx,
      game: game,
      data: data,
      playerID: playerID
    });
    plugins = _objectSpread(_objectSpread({}, plugins), {}, _defineProperty({}, name, {
      data: newData
    }));
  });
  return plugins;
};

/**
 * Adjust the given options to use the new minMoves/maxMoves if a legacy moveLimit was given
 * @param options The options object to apply backwards compatibility to
 * @param enforceMinMoves Use moveLimit to set both minMoves and maxMoves
 */
function supportDeprecatedMoveLimit(options) {
  var enforceMinMoves = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (options.moveLimit) {
    if (enforceMinMoves) {
      options.minMoves = options.moveLimit;
    }
    options.maxMoves = options.moveLimit;
    delete options.moveLimit;
  }
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function SetActivePlayers(ctx, arg) {
  var activePlayers = {};
  var _prevActivePlayers = [];
  var _nextActivePlayers = null;
  var _activePlayersMinMoves = {};
  var _activePlayersMaxMoves = {};
  if (Array.isArray(arg)) {
    // support a simple array of player IDs as active players
    var value = {};
    arg.forEach(function (v) {
      return value[v] = Stage.NULL;
    });
    activePlayers = value;
  } else {
    // process active players argument object
    // stages previously did not enforce minMoves, this behaviour is kept intentionally
    supportDeprecatedMoveLimit(arg);
    if (arg.next) {
      _nextActivePlayers = arg.next;
    }
    if (arg.revert) {
      _prevActivePlayers = [].concat(_toConsumableArray(ctx._prevActivePlayers), [{
        activePlayers: ctx.activePlayers,
        _activePlayersMinMoves: ctx._activePlayersMinMoves,
        _activePlayersMaxMoves: ctx._activePlayersMaxMoves,
        _activePlayersNumMoves: ctx._activePlayersNumMoves
      }]);
    }
    if (arg.currentPlayer !== undefined) {
      ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, ctx.currentPlayer, arg.currentPlayer);
    }
    if (arg.others !== undefined) {
      for (var i = 0; i < ctx.playOrder.length; i++) {
        var id = ctx.playOrder[i];
        if (id !== ctx.currentPlayer) {
          ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, id, arg.others);
        }
      }
    }
    if (arg.all !== undefined) {
      for (var _i = 0; _i < ctx.playOrder.length; _i++) {
        var _id = ctx.playOrder[_i];
        ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, _id, arg.all);
      }
    }
    if (arg.value) {
      for (var _id2 in arg.value) {
        ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, _id2, arg.value[_id2]);
      }
    }
    if (arg.minMoves) {
      for (var _id3 in activePlayers) {
        if (_activePlayersMinMoves[_id3] === undefined) {
          _activePlayersMinMoves[_id3] = arg.minMoves;
        }
      }
    }
    if (arg.maxMoves) {
      for (var _id4 in activePlayers) {
        if (_activePlayersMaxMoves[_id4] === undefined) {
          _activePlayersMaxMoves[_id4] = arg.maxMoves;
        }
      }
    }
  }
  if (Object.keys(activePlayers).length === 0) {
    activePlayers = null;
  }
  if (Object.keys(_activePlayersMinMoves).length === 0) {
    _activePlayersMinMoves = null;
  }
  if (Object.keys(_activePlayersMaxMoves).length === 0) {
    _activePlayersMaxMoves = null;
  }
  var _activePlayersNumMoves = {};
  for (var _id5 in activePlayers) {
    _activePlayersNumMoves[_id5] = 0;
  }
  return _objectSpread(_objectSpread({}, ctx), {}, {
    activePlayers: activePlayers,
    _activePlayersMinMoves: _activePlayersMinMoves,
    _activePlayersMaxMoves: _activePlayersMaxMoves,
    _activePlayersNumMoves: _activePlayersNumMoves,
    _prevActivePlayers: _prevActivePlayers,
    _nextActivePlayers: _nextActivePlayers
  });
}
/**
 * Update activePlayers, setting it to previous, next or null values
 * when it becomes empty.
 * @param ctx
 */
function UpdateActivePlayersOnceEmpty(ctx) {
  var _ctx = ctx,
    activePlayers = _ctx.activePlayers,
    _activePlayersMinMoves = _ctx._activePlayersMinMoves,
    _activePlayersMaxMoves = _ctx._activePlayersMaxMoves,
    _activePlayersNumMoves = _ctx._activePlayersNumMoves,
    _prevActivePlayers = _ctx._prevActivePlayers,
    _nextActivePlayers = _ctx._nextActivePlayers;
  if (activePlayers && Object.keys(activePlayers).length === 0) {
    if (_nextActivePlayers) {
      ctx = SetActivePlayers(ctx, _nextActivePlayers);
      var _ctx2 = ctx;
      activePlayers = _ctx2.activePlayers;
      _activePlayersMinMoves = _ctx2._activePlayersMinMoves;
      _activePlayersMaxMoves = _ctx2._activePlayersMaxMoves;
      _activePlayersNumMoves = _ctx2._activePlayersNumMoves;
      _prevActivePlayers = _ctx2._prevActivePlayers;
    } else if (_prevActivePlayers.length > 0) {
      var lastIndex = _prevActivePlayers.length - 1;
      var _prevActivePlayers$la = _prevActivePlayers[lastIndex];
      activePlayers = _prevActivePlayers$la.activePlayers;
      _activePlayersMinMoves = _prevActivePlayers$la._activePlayersMinMoves;
      _activePlayersMaxMoves = _prevActivePlayers$la._activePlayersMaxMoves;
      _activePlayersNumMoves = _prevActivePlayers$la._activePlayersNumMoves;
      _prevActivePlayers = _prevActivePlayers.slice(0, lastIndex);
    } else {
      activePlayers = null;
      _activePlayersMinMoves = null;
      _activePlayersMaxMoves = null;
    }
  }
  return _objectSpread(_objectSpread({}, ctx), {}, {
    activePlayers: activePlayers,
    _activePlayersMinMoves: _activePlayersMinMoves,
    _activePlayersMaxMoves: _activePlayersMaxMoves,
    _activePlayersNumMoves: _activePlayersNumMoves,
    _prevActivePlayers: _prevActivePlayers
  });
}
/**
 * Apply an active player argument to the given player ID
 * @param {Object} activePlayers
 * @param {Object} _activePlayersMinMoves
 * @param {Object} _activePlayersMaxMoves
 * @param {String} playerID The player to apply the parameter to
 * @param {(String|Object)} arg An active player argument
 */
function ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, playerID, arg) {
  if (_typeof(arg) !== 'object' || arg === Stage.NULL) {
    arg = {
      stage: arg
    };
  }
  if (arg.stage !== undefined) {
    // stages previously did not enforce minMoves, this behaviour is kept intentionally
    supportDeprecatedMoveLimit(arg);
    activePlayers[playerID] = arg.stage;
    if (arg.minMoves) _activePlayersMinMoves[playerID] = arg.minMoves;
    if (arg.maxMoves) _activePlayersMaxMoves[playerID] = arg.maxMoves;
  }
}
/**
 * Converts a playOrderPos index into its value in playOrder.
 * @param {Array} playOrder - An array of player ID's.
 * @param {number} playOrderPos - An index into the above.
 */
function getCurrentPlayer(playOrder, playOrderPos) {
  // convert to string in case playOrder is set to number[]
  return playOrder[playOrderPos] + '';
}
/**
 * Called at the start of a turn to initialize turn order state.
 *
 * TODO: This is called inside StartTurn, which is called from
 * both UpdateTurn and StartPhase (so it's called at the beginning
 * of a new phase as well as between turns). We should probably
 * split it into two.
 */
function InitTurnOrderState(state, turn) {
  var G = state.G,
    ctx = state.ctx;
  var _ctx3 = ctx,
    numPlayers = _ctx3.numPlayers;
  var pluginAPIs = GetAPIs(state);
  var context = _objectSpread(_objectSpread({}, pluginAPIs), {}, {
    G: G,
    ctx: ctx
  });
  var order = turn.order;
  var playOrder = _toConsumableArray(Array.from({
    length: numPlayers
  })).map(function (_, i) {
    return i + '';
  });
  if (order.playOrder !== undefined) {
    playOrder = order.playOrder(context);
  }
  var playOrderPos = order.first(context);
  var posType = _typeof(playOrderPos);
  if (posType !== 'number') {
    error("invalid value returned by turn.order.first \u2014 expected number got ".concat(posType, " \u201C").concat(playOrderPos, "\u201D."));
  }
  var currentPlayer = getCurrentPlayer(playOrder, playOrderPos);
  ctx = _objectSpread(_objectSpread({}, ctx), {}, {
    currentPlayer: currentPlayer,
    playOrderPos: playOrderPos,
    playOrder: playOrder
  });
  ctx = SetActivePlayers(ctx, turn.activePlayers || {});
  return ctx;
}
/**
 * Called at the end of each turn to update the turn order state.
 * @param {object} G - The game object G.
 * @param {object} ctx - The game object ctx.
 * @param {object} turn - A turn object for this phase.
 * @param {string} endTurnArg - An optional argument to endTurn that
                                may specify the next player.
 */
function UpdateTurnOrderState(state, currentPlayer, turn, endTurnArg) {
  var order = turn.order;
  var G = state.G,
    ctx = state.ctx;
  var playOrderPos = ctx.playOrderPos;
  var endPhase = false;
  if (endTurnArg && endTurnArg !== true) {
    if (_typeof(endTurnArg) !== 'object') {
      error("invalid argument to endTurn: ".concat(endTurnArg));
    }
    Object.keys(endTurnArg).forEach(function (arg) {
      switch (arg) {
        case 'remove':
          currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
          break;
        case 'next':
          playOrderPos = ctx.playOrder.indexOf(endTurnArg.next);
          currentPlayer = endTurnArg.next;
          break;
        default:
          error("invalid argument to endTurn: ".concat(arg));
      }
    });
  } else {
    var pluginAPIs = GetAPIs(state);
    var context = _objectSpread(_objectSpread({}, pluginAPIs), {}, {
      G: G,
      ctx: ctx
    });
    var t = order.next(context);
    var type = _typeof(t);
    if (t !== undefined && type !== 'number') {
      error("invalid value returned by turn.order.next \u2014 expected number or undefined got ".concat(type, " \u201C").concat(t, "\u201D."));
    }
    if (t === undefined) {
      endPhase = true;
    } else {
      playOrderPos = t;
      currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
    }
  }
  ctx = _objectSpread(_objectSpread({}, ctx), {}, {
    playOrderPos: playOrderPos,
    currentPlayer: currentPlayer
  });
  return {
    endPhase: endPhase,
    ctx: ctx
  };
}
/**
 * Set of different turn orders possible in a phase.
 * These are meant to be passed to the `turn` setting
 * in the flow objects.
 *
 * Each object defines the first player when the phase / game
 * begins, and also a function `next` to determine who the
 * next player is when the turn ends.
 *
 * The phase ends if next() returns undefined.
 */
var TurnOrder = exports.T = {
  /**
   * DEFAULT
   *
   * The default round-robin turn order.
   */
  DEFAULT: {
    first: function first(_ref13) {
      var ctx = _ref13.ctx;
      return ctx.turn === 0 ? ctx.playOrderPos : (ctx.playOrderPos + 1) % ctx.playOrder.length;
    },
    next: function next(_ref14) {
      var ctx = _ref14.ctx;
      return (ctx.playOrderPos + 1) % ctx.playOrder.length;
    }
  },
  /**
   * RESET
   *
   * Similar to DEFAULT, but starts from 0 each time.
   */
  RESET: {
    first: function first() {
      return 0;
    },
    next: function next(_ref15) {
      var ctx = _ref15.ctx;
      return (ctx.playOrderPos + 1) % ctx.playOrder.length;
    }
  },
  /**
   * CONTINUE
   *
   * Similar to DEFAULT, but starts with the player who ended the last phase.
   */
  CONTINUE: {
    first: function first(_ref16) {
      var ctx = _ref16.ctx;
      return ctx.playOrderPos;
    },
    next: function next(_ref17) {
      var ctx = _ref17.ctx;
      return (ctx.playOrderPos + 1) % ctx.playOrder.length;
    }
  },
  /**
   * ONCE
   *
   * Another round-robin turn order, but goes around just once.
   * The phase ends after all players have played.
   */
  ONCE: {
    first: function first() {
      return 0;
    },
    next: function next(_ref18) {
      var ctx = _ref18.ctx;
      if (ctx.playOrderPos < ctx.playOrder.length - 1) {
        return ctx.playOrderPos + 1;
      }
    }
  },
  /**
   * CUSTOM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase.
   *
   * @param {Array} playOrder - The play order.
   */
  CUSTOM: function CUSTOM(_playOrder) {
    return {
      playOrder: function playOrder() {
        return _playOrder;
      },
      first: function first() {
        return 0;
      },
      next: function next(_ref19) {
        var ctx = _ref19.ctx;
        return (ctx.playOrderPos + 1) % ctx.playOrder.length;
      }
    };
  },
  /**
   * CUSTOM_FROM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase to a value specified by a field
   * in G.
   *
   * @param {string} playOrderField - Field in G.
   */
  CUSTOM_FROM: function CUSTOM_FROM(playOrderField) {
    return {
      playOrder: function playOrder(_ref20) {
        var G = _ref20.G;
        return G[playOrderField];
      },
      first: function first() {
        return 0;
      },
      next: function next(_ref21) {
        var ctx = _ref21.ctx;
        return (ctx.playOrderPos + 1) % ctx.playOrder.length;
      }
    };
  }
};
var Stage = exports.S = {
  NULL: null
};
var ActivePlayers = exports.C = {
  /**
   * ALL
   *
   * The turn stays with one player, but any player can play (in any order)
   * until the phase ends.
   */
  ALL: {
    all: Stage.NULL
  },
  /**
   * ALL_ONCE
   *
   * The turn stays with one player, but any player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every player in the game.
   */
  ALL_ONCE: {
    all: Stage.NULL,
    minMoves: 1,
    maxMoves: 1
  },
  /**
   * OTHERS
   *
   * The turn stays with one player, and every *other* player can play (in any order)
   * until the phase ends.
   */
  OTHERS: {
    others: Stage.NULL
  },
  /**
   * OTHERS_ONCE
   *
   * The turn stays with one player, and every *other* player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every *other* player in the game.
   */
  OTHERS_ONCE: {
    others: Stage.NULL,
    minMoves: 1,
    maxMoves: 1
  }
};
},{"immer":"node_modules/immer/dist/immer.esm.js","./plugin-random-087f861e.js":"node_modules/boardgame.io/dist/esm/plugin-random-087f861e.js","lodash.isplainobject":"node_modules/lodash.isplainobject/index.js"}],"node_modules/rfc6902/pointer.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pointer = exports.escapeToken = exports.unescapeToken = void 0;
/**
Unescape token part of a JSON Pointer string

`token` should *not* contain any '/' characters.

> Evaluation of each reference token begins by decoding any escaped
> character sequence.  This is performed by first transforming any
> occurrence of the sequence '~1' to '/', and then transforming any
> occurrence of the sequence '~0' to '~'.  By performing the
> substitutions in this order, an implementation avoids the error of
> turning '~01' first into '~1' and then into '/', which would be
> incorrect (the string '~01' correctly becomes '~1' after
> transformation).

Here's my take:

~1 is unescaped with higher priority than ~0 because it is a lower-order escape character.
I say "lower order" because '/' needs escaping due to the JSON Pointer serialization technique.
Whereas, '~' is escaped because escaping '/' uses the '~' character.
*/
function unescapeToken(token) {
    return token.replace(/~1/g, '/').replace(/~0/g, '~');
}
exports.unescapeToken = unescapeToken;
/** Escape token part of a JSON Pointer string

> '~' needs to be encoded as '~0' and '/'
> needs to be encoded as '~1' when these characters appear in a
> reference token.

This is the exact inverse of `unescapeToken()`, so the reverse replacements must take place in reverse order.
*/
function escapeToken(token) {
    return token.replace(/~/g, '~0').replace(/\//g, '~1');
}
exports.escapeToken = escapeToken;
/**
JSON Pointer representation
*/
var Pointer = /** @class */ (function () {
    function Pointer(tokens) {
        if (tokens === void 0) { tokens = ['']; }
        this.tokens = tokens;
    }
    /**
    `path` *must* be a properly escaped string.
    */
    Pointer.fromJSON = function (path) {
        var tokens = path.split('/').map(unescapeToken);
        if (tokens[0] !== '')
            throw new Error("Invalid JSON Pointer: ".concat(path));
        return new Pointer(tokens);
    };
    Pointer.prototype.toString = function () {
        return this.tokens.map(escapeToken).join('/');
    };
    /**
    Returns an object with 'parent', 'key', and 'value' properties.
    In the special case that this Pointer's path == "",
    this object will be {parent: null, key: '', value: object}.
    Otherwise, parent and key will have the property such that parent[key] == value.
    */
    Pointer.prototype.evaluate = function (object) {
        var parent = null;
        var key = '';
        var value = object;
        for (var i = 1, l = this.tokens.length; i < l; i++) {
            parent = value;
            key = this.tokens[i];
            if (key == '__proto__' || key == 'constructor' || key == 'prototype') {
                continue;
            }
            // not sure if this the best way to handle non-existant paths...
            value = (parent || {})[key];
        }
        return { parent: parent, key: key, value: value };
    };
    Pointer.prototype.get = function (object) {
        return this.evaluate(object).value;
    };
    Pointer.prototype.set = function (object, value) {
        var endpoint = this.evaluate(object);
        if (endpoint.parent) {
            endpoint.parent[endpoint.key] = value;
        }
    };
    Pointer.prototype.push = function (token) {
        // mutable
        this.tokens.push(token);
    };
    /**
    `token` should be a String. It'll be coerced to one anyway.
  
    immutable (shallowly)
    */
    Pointer.prototype.add = function (token) {
        var tokens = this.tokens.concat(String(token));
        return new Pointer(tokens);
    };
    return Pointer;
}());
exports.Pointer = Pointer;

},{}],"node_modules/rfc6902/util.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = exports.objectType = exports.hasOwnProperty = void 0;
exports.hasOwnProperty = Object.prototype.hasOwnProperty;
function objectType(object) {
    if (object === undefined) {
        return 'undefined';
    }
    if (object === null) {
        return 'null';
    }
    if (Array.isArray(object)) {
        return 'array';
    }
    return typeof object;
}
exports.objectType = objectType;
function isNonPrimitive(value) {
    // loose-equality checking for null is faster than strict checking for each of null/undefined/true/false
    // checking null first, then calling typeof, is faster than vice-versa
    return value != null && typeof value == 'object';
}
/**
Recursively copy a value.

@param source - should be a JavaScript primitive, Array, Date, or (plain old) Object.
@returns copy of source where every Array and Object have been recursively
         reconstructed from their constituent elements
*/
function clone(source) {
    if (!isNonPrimitive(source)) {
        // short-circuiting is faster than a single return
        return source;
    }
    // x.constructor == Array is the fastest way to check if x is an Array
    if (source.constructor == Array) {
        // construction via imperative for-loop is faster than source.map(arrayVsObject)
        var length_1 = source.length;
        // setting the Array length during construction is faster than just `[]` or `new Array()`
        var arrayTarget = new Array(length_1);
        for (var i = 0; i < length_1; i++) {
            arrayTarget[i] = clone(source[i]);
        }
        return arrayTarget;
    }
    // Date
    if (source.constructor == Date) {
        var dateTarget = new Date(+source);
        return dateTarget;
    }
    // Object
    var objectTarget = {};
    // declaring the variable (with const) inside the loop is faster
    for (var key in source) {
        // hasOwnProperty costs a bit of performance, but it's semantically necessary
        // using a global helper is MUCH faster than calling source.hasOwnProperty(key)
        if (exports.hasOwnProperty.call(source, key)) {
            objectTarget[key] = clone(source[key]);
        }
    }
    return objectTarget;
}
exports.clone = clone;

},{}],"node_modules/rfc6902/diff.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffAny = exports.diffObjects = exports.diffArrays = exports.intersection = exports.subtract = exports.isDestructive = void 0;
var util_1 = require("./util");
function isDestructive(_a) {
    var op = _a.op;
    return op === 'remove' || op === 'replace' || op === 'copy' || op === 'move';
}
exports.isDestructive = isDestructive;
/**
List the keys in `minuend` that are not in `subtrahend`.

A key is only considered if it is both 1) an own-property (o.hasOwnProperty(k))
of the object, and 2) has a value that is not undefined. This is to match JSON
semantics, where JSON object serialization drops keys with undefined values.

@param minuend Object of interest
@param subtrahend Object of comparison
@returns Array of keys that are in `minuend` but not in `subtrahend`.
*/
function subtract(minuend, subtrahend) {
    // initialize empty object; we only care about the keys, the values can be anything
    var obj = {};
    // build up obj with all the properties of minuend
    for (var add_key in minuend) {
        if (util_1.hasOwnProperty.call(minuend, add_key) && minuend[add_key] !== undefined) {
            obj[add_key] = 1;
        }
    }
    // now delete all the properties of subtrahend from obj
    // (deleting a missing key has no effect)
    for (var del_key in subtrahend) {
        if (util_1.hasOwnProperty.call(subtrahend, del_key) && subtrahend[del_key] !== undefined) {
            delete obj[del_key];
        }
    }
    // finally, extract whatever keys remain in obj
    return Object.keys(obj);
}
exports.subtract = subtract;
/**
List the keys that shared by all `objects`.

The semantics of what constitutes a "key" is described in {@link subtract}.

@param objects Array of objects to compare
@returns Array of keys that are in ("own-properties" of) every object in `objects`.
*/
function intersection(objects) {
    var length = objects.length;
    // prepare empty counter to keep track of how many objects each key occurred in
    var counter = {};
    // go through each object and increment the counter for each key in that object
    for (var i = 0; i < length; i++) {
        var object = objects[i];
        for (var key in object) {
            if (util_1.hasOwnProperty.call(object, key) && object[key] !== undefined) {
                counter[key] = (counter[key] || 0) + 1;
            }
        }
    }
    // now delete all keys from the counter that were not seen in every object
    for (var key in counter) {
        if (counter[key] < length) {
            delete counter[key];
        }
    }
    // finally, extract whatever keys remain in the counter
    return Object.keys(counter);
}
exports.intersection = intersection;
function isArrayAdd(array_operation) {
    return array_operation.op === 'add';
}
function isArrayRemove(array_operation) {
    return array_operation.op === 'remove';
}
function appendArrayOperation(base, operation) {
    return {
        // the new operation must be pushed on the end
        operations: base.operations.concat(operation),
        cost: base.cost + 1,
    };
}
/**
Calculate the shortest sequence of operations to get from `input` to `output`,
using a dynamic programming implementation of the Levenshtein distance algorithm.

To get from the input ABC to the output AZ we could just delete all the input
and say "insert A, insert Z" and be done with it. That's what we do if the
input is empty. But we can be smarter.

          output
               A   Z
               -   -
          [0]  1   2
input A |  1  [0]  1
      B |  2  [1]  1
      C |  3   2  [2]

1) start at 0,0 (+0)
2) keep A (+0)
3) remove B (+1)
4) replace C with Z (+1)

If the `input` (source) is empty, they'll all be in the top row, resulting in an
array of 'add' operations.
If the `output` (target) is empty, everything will be in the left column,
resulting in an array of 'remove' operations.

@returns A list of add/remove/replace operations.
*/
function diffArrays(input, output, ptr, diff) {
    if (diff === void 0) { diff = diffAny; }
    // set up cost matrix (very simple initialization: just a map)
    var memo = {
        '0,0': { operations: [], cost: 0 },
    };
    /**
    Calculate the cheapest sequence of operations required to get from
    input.slice(0, i) to output.slice(0, j).
    There may be other valid sequences with the same cost, but none cheaper.
  
    @param i The row in the layout above
    @param j The column in the layout above
    @returns An object containing a list of operations, along with the total cost
             of applying them (+1 for each add/remove/replace operation)
    */
    function dist(i, j) {
        // memoized
        var memo_key = "".concat(i, ",").concat(j);
        var memoized = memo[memo_key];
        if (memoized === undefined) {
            // TODO: this !diff(...).length usage could/should be lazy
            if (i > 0 && j > 0 && !diff(input[i - 1], output[j - 1], ptr.add(String(i - 1))).length) {
                // equal (no operations => no cost)
                memoized = dist(i - 1, j - 1);
            }
            else {
                var alternatives = [];
                if (i > 0) {
                    // NOT topmost row
                    var remove_base = dist(i - 1, j);
                    var remove_operation = {
                        op: 'remove',
                        index: i - 1,
                    };
                    alternatives.push(appendArrayOperation(remove_base, remove_operation));
                }
                if (j > 0) {
                    // NOT leftmost column
                    var add_base = dist(i, j - 1);
                    var add_operation = {
                        op: 'add',
                        index: i - 1,
                        value: output[j - 1],
                    };
                    alternatives.push(appendArrayOperation(add_base, add_operation));
                }
                if (i > 0 && j > 0) {
                    // TABLE MIDDLE
                    // supposing we replaced it, compute the rest of the costs:
                    var replace_base = dist(i - 1, j - 1);
                    // okay, the general plan is to replace it, but we can be smarter,
                    // recursing into the structure and replacing only part of it if
                    // possible, but to do so we'll need the original value
                    var replace_operation = {
                        op: 'replace',
                        index: i - 1,
                        original: input[i - 1],
                        value: output[j - 1],
                    };
                    alternatives.push(appendArrayOperation(replace_base, replace_operation));
                }
                // the only other case, i === 0 && j === 0, has already been memoized
                // the meat of the algorithm:
                // sort by cost to find the lowest one (might be several ties for lowest)
                // [4, 6, 7, 1, 2].sort((a, b) => a - b) -> [ 1, 2, 4, 6, 7 ]
                var best = alternatives.sort(function (a, b) { return a.cost - b.cost; })[0];
                memoized = best;
            }
            memo[memo_key] = memoized;
        }
        return memoized;
    }
    // handle weird objects masquerading as Arrays that don't have proper length
    // properties by using 0 for everything but positive numbers
    var input_length = (isNaN(input.length) || input.length <= 0) ? 0 : input.length;
    var output_length = (isNaN(output.length) || output.length <= 0) ? 0 : output.length;
    var array_operations = dist(input_length, output_length).operations;
    var padded_operations = array_operations.reduce(function (_a, array_operation) {
        var operations = _a[0], padding = _a[1];
        if (isArrayAdd(array_operation)) {
            var padded_index = array_operation.index + 1 + padding;
            var index_token = padded_index < (input_length + padding) ? String(padded_index) : '-';
            var operation = {
                op: array_operation.op,
                path: ptr.add(index_token).toString(),
                value: array_operation.value,
            };
            // padding++ // maybe only if array_operation.index > -1 ?
            return [operations.concat(operation), padding + 1];
        }
        else if (isArrayRemove(array_operation)) {
            var operation = {
                op: array_operation.op,
                path: ptr.add(String(array_operation.index + padding)).toString(),
            };
            // padding--
            return [operations.concat(operation), padding - 1];
        }
        else { // replace
            var replace_ptr = ptr.add(String(array_operation.index + padding));
            var replace_operations = diff(array_operation.original, array_operation.value, replace_ptr);
            return [operations.concat.apply(operations, replace_operations), padding];
        }
    }, [[], 0])[0];
    return padded_operations;
}
exports.diffArrays = diffArrays;
function diffObjects(input, output, ptr, diff) {
    if (diff === void 0) { diff = diffAny; }
    // if a key is in input but not output -> remove it
    var operations = [];
    subtract(input, output).forEach(function (key) {
        operations.push({ op: 'remove', path: ptr.add(key).toString() });
    });
    // if a key is in output but not input -> add it
    subtract(output, input).forEach(function (key) {
        operations.push({ op: 'add', path: ptr.add(key).toString(), value: output[key] });
    });
    // if a key is in both, diff it recursively
    intersection([input, output]).forEach(function (key) {
        operations.push.apply(operations, diff(input[key], output[key], ptr.add(key)));
    });
    return operations;
}
exports.diffObjects = diffObjects;
/**
`diffAny()` returns an empty array if `input` and `output` are materially equal
(i.e., would produce equivalent JSON); otherwise it produces an array of patches
that would transform `input` into `output`.

> Here, "equal" means that the value at the target location and the
> value conveyed by "value" are of the same JSON type, and that they
> are considered equal by the following rules for that type:
> o  strings: are considered equal if they contain the same number of
>    Unicode characters and their code points are byte-by-byte equal.
> o  numbers: are considered equal if their values are numerically
>    equal.
> o  arrays: are considered equal if they contain the same number of
>    values, and if each value can be considered equal to the value at
>    the corresponding position in the other array, using this list of
>    type-specific rules.
> o  objects: are considered equal if they contain the same number of
>    members, and if each member can be considered equal to a member in
>    the other object, by comparing their keys (as strings) and their
>    values (using this list of type-specific rules).
> o  literals (false, true, and null): are considered equal if they are
>    the same.
*/
function diffAny(input, output, ptr, diff) {
    if (diff === void 0) { diff = diffAny; }
    // strict equality handles literals, numbers, and strings (a sufficient but not necessary cause)
    if (input === output) {
        return [];
    }
    var input_type = (0, util_1.objectType)(input);
    var output_type = (0, util_1.objectType)(output);
    if (input_type == 'array' && output_type == 'array') {
        return diffArrays(input, output, ptr, diff);
    }
    if (input_type == 'object' && output_type == 'object') {
        return diffObjects(input, output, ptr, diff);
    }
    // at this point we know that input and output are materially different;
    // could be array -> object, object -> array, boolean -> undefined,
    // number -> string, or some other combination, but nothing that can be split
    // up into multiple patches: so `output` must replace `input` wholesale.
    return [{ op: 'replace', path: ptr.toString(), value: output }];
}
exports.diffAny = diffAny;

},{"./util":"node_modules/rfc6902/util.js"}],"node_modules/rfc6902/patch.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.InvalidOperationError = exports.test = exports.copy = exports.move = exports.replace = exports.remove = exports.add = exports.TestError = exports.MissingError = void 0;
var pointer_1 = require("./pointer");
var util_1 = require("./util");
var diff_1 = require("./diff");
var MissingError = /** @class */ (function (_super) {
    __extends(MissingError, _super);
    function MissingError(path) {
        var _this = _super.call(this, "Value required at path: ".concat(path)) || this;
        _this.path = path;
        _this.name = 'MissingError';
        return _this;
    }
    return MissingError;
}(Error));
exports.MissingError = MissingError;
var TestError = /** @class */ (function (_super) {
    __extends(TestError, _super);
    function TestError(actual, expected) {
        var _this = _super.call(this, "Test failed: ".concat(actual, " != ").concat(expected)) || this;
        _this.actual = actual;
        _this.expected = expected;
        _this.name = 'TestError';
        return _this;
    }
    return TestError;
}(Error));
exports.TestError = TestError;
function _add(object, key, value) {
    if (Array.isArray(object)) {
        // `key` must be an index
        if (key == '-') {
            object.push(value);
        }
        else {
            var index = parseInt(key, 10);
            object.splice(index, 0, value);
        }
    }
    else {
        object[key] = value;
    }
}
function _remove(object, key) {
    if (Array.isArray(object)) {
        // '-' syntax doesn't make sense when removing
        var index = parseInt(key, 10);
        object.splice(index, 1);
    }
    else {
        // not sure what the proper behavior is when path = ''
        delete object[key];
    }
}
/**
>  o  If the target location specifies an array index, a new value is
>     inserted into the array at the specified index.
>  o  If the target location specifies an object member that does not
>     already exist, a new member is added to the object.
>  o  If the target location specifies an object member that does exist,
>     that member's value is replaced.
*/
function add(object, operation) {
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    // it's not exactly a "MissingError" in the same way that `remove` is -- more like a MissingParent, or something
    if (endpoint.parent === undefined) {
        return new MissingError(operation.path);
    }
    _add(endpoint.parent, endpoint.key, (0, util_1.clone)(operation.value));
    return null;
}
exports.add = add;
/**
> The "remove" operation removes the value at the target location.
> The target location MUST exist for the operation to be successful.
*/
function remove(object, operation) {
    // endpoint has parent, key, and value properties
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    if (endpoint.value === undefined) {
        return new MissingError(operation.path);
    }
    // not sure what the proper behavior is when path = ''
    _remove(endpoint.parent, endpoint.key);
    return null;
}
exports.remove = remove;
/**
> The "replace" operation replaces the value at the target location
> with a new value.  The operation object MUST contain a "value" member
> whose content specifies the replacement value.
> The target location MUST exist for the operation to be successful.

> This operation is functionally identical to a "remove" operation for
> a value, followed immediately by an "add" operation at the same
> location with the replacement value.

Even more simply, it's like the add operation with an existence check.
*/
function replace(object, operation) {
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    if (endpoint.parent === null) {
        return new MissingError(operation.path);
    }
    // this existence check treats arrays as a special case
    if (Array.isArray(endpoint.parent)) {
        if (parseInt(endpoint.key, 10) >= endpoint.parent.length) {
            return new MissingError(operation.path);
        }
    }
    else if (endpoint.value === undefined) {
        return new MissingError(operation.path);
    }
    endpoint.parent[endpoint.key] = (0, util_1.clone)(operation.value);
    return null;
}
exports.replace = replace;
/**
> The "move" operation removes the value at a specified location and
> adds it to the target location.
> The operation object MUST contain a "from" member, which is a string
> containing a JSON Pointer value that references the location in the
> target document to move the value from.
> This operation is functionally identical to a "remove" operation on
> the "from" location, followed immediately by an "add" operation at
> the target location with the value that was just removed.

> The "from" location MUST NOT be a proper prefix of the "path"
> location; i.e., a location cannot be moved into one of its children.

TODO: throw if the check described in the previous paragraph fails.
*/
function move(object, operation) {
    var from_endpoint = pointer_1.Pointer.fromJSON(operation.from).evaluate(object);
    if (from_endpoint.value === undefined) {
        return new MissingError(operation.from);
    }
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    if (endpoint.parent === undefined) {
        return new MissingError(operation.path);
    }
    _remove(from_endpoint.parent, from_endpoint.key);
    _add(endpoint.parent, endpoint.key, from_endpoint.value);
    return null;
}
exports.move = move;
/**
> The "copy" operation copies the value at a specified location to the
> target location.
> The operation object MUST contain a "from" member, which is a string
> containing a JSON Pointer value that references the location in the
> target document to copy the value from.
> The "from" location MUST exist for the operation to be successful.

> This operation is functionally identical to an "add" operation at the
> target location using the value specified in the "from" member.

Alternatively, it's like 'move' without the 'remove'.
*/
function copy(object, operation) {
    var from_endpoint = pointer_1.Pointer.fromJSON(operation.from).evaluate(object);
    if (from_endpoint.value === undefined) {
        return new MissingError(operation.from);
    }
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    if (endpoint.parent === undefined) {
        return new MissingError(operation.path);
    }
    _add(endpoint.parent, endpoint.key, (0, util_1.clone)(from_endpoint.value));
    return null;
}
exports.copy = copy;
/**
> The "test" operation tests that a value at the target location is
> equal to a specified value.
> The operation object MUST contain a "value" member that conveys the
> value to be compared to the target location's value.
> The target location MUST be equal to the "value" value for the
> operation to be considered successful.
*/
function test(object, operation) {
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    // TODO: this diffAny(...).length usage could/should be lazy
    if ((0, diff_1.diffAny)(endpoint.value, operation.value, new pointer_1.Pointer()).length) {
        return new TestError(endpoint.value, operation.value);
    }
    return null;
}
exports.test = test;
var InvalidOperationError = /** @class */ (function (_super) {
    __extends(InvalidOperationError, _super);
    function InvalidOperationError(operation) {
        var _this = _super.call(this, "Invalid operation: ".concat(operation.op)) || this;
        _this.operation = operation;
        _this.name = 'InvalidOperationError';
        return _this;
    }
    return InvalidOperationError;
}(Error));
exports.InvalidOperationError = InvalidOperationError;
/**
Switch on `operation.op`, applying the corresponding patch function for each
case to `object`.
*/
function apply(object, operation) {
    // not sure why TypeScript can't infer typesafety of:
    //   {add, remove, replace, move, copy, test}[operation.op](object, operation)
    // (seems like a bug)
    switch (operation.op) {
        case 'add': return add(object, operation);
        case 'remove': return remove(object, operation);
        case 'replace': return replace(object, operation);
        case 'move': return move(object, operation);
        case 'copy': return copy(object, operation);
        case 'test': return test(object, operation);
    }
    return new InvalidOperationError(operation);
}
exports.apply = apply;

},{"./pointer":"node_modules/rfc6902/pointer.js","./util":"node_modules/rfc6902/util.js","./diff":"node_modules/rfc6902/diff.js"}],"node_modules/rfc6902/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTests = exports.createPatch = exports.applyPatch = exports.Pointer = void 0;
var pointer_1 = require("./pointer");
Object.defineProperty(exports, "Pointer", { enumerable: true, get: function () { return pointer_1.Pointer; } });
var patch_1 = require("./patch");
var diff_1 = require("./diff");
/**
Apply a 'application/json-patch+json'-type patch to an object.

`patch` *must* be an array of operations.

> Operation objects MUST have exactly one "op" member, whose value
> indicates the operation to perform.  Its value MUST be one of "add",
> "remove", "replace", "move", "copy", or "test"; other values are
> errors.

This method mutates the target object in-place.

@returns list of results, one for each operation: `null` indicated success,
         otherwise, the result will be an instance of one of the Error classes:
         MissingError, InvalidOperationError, or TestError.
*/
function applyPatch(object, patch) {
    return patch.map(function (operation) { return (0, patch_1.apply)(object, operation); });
}
exports.applyPatch = applyPatch;
function wrapVoidableDiff(diff) {
    function wrappedDiff(input, output, ptr) {
        var custom_patch = diff(input, output, ptr);
        // ensure an array is always returned
        return Array.isArray(custom_patch) ? custom_patch : (0, diff_1.diffAny)(input, output, ptr, wrappedDiff);
    }
    return wrappedDiff;
}
/**
Produce a 'application/json-patch+json'-type patch to get from one object to
another.

This does not alter `input` or `output` unless they have a property getter with
side-effects (which is not a good idea anyway).

`diff` is called on each pair of comparable non-primitive nodes in the
`input`/`output` object trees, producing nested patches. Return `undefined`
to fall back to default behaviour.

Returns list of operations to perform on `input` to produce `output`.
*/
function createPatch(input, output, diff) {
    var ptr = new pointer_1.Pointer();
    // a new Pointer gets a default path of [''] if not specified
    return (diff ? wrapVoidableDiff(diff) : diff_1.diffAny)(input, output, ptr);
}
exports.createPatch = createPatch;
/**
Create a test operation based on `input`'s current evaluation of the JSON
Pointer `path`; if such a pointer cannot be resolved, returns undefined.
*/
function createTest(input, path) {
    var endpoint = pointer_1.Pointer.fromJSON(path).evaluate(input);
    if (endpoint !== undefined) {
        return { op: 'test', path: path, value: endpoint.value };
    }
}
/**
Produce an 'application/json-patch+json'-type list of tests, to verify that
existing values in an object are identical to the those captured at some
checkpoint (whenever this function is called).

This does not alter `input` or `output` unless they have a property getter with
side-effects (which is not a good idea anyway).

Returns list of test operations.
*/
function createTests(input, patch) {
    var tests = new Array();
    patch.filter(diff_1.isDestructive).forEach(function (operation) {
        var pathTest = createTest(input, operation.path);
        if (pathTest)
            tests.push(pathTest);
        if ('from' in operation) {
            var fromTest = createTest(input, operation.from);
            if (fromTest)
                tests.push(fromTest);
        }
    });
    return tests;
}
exports.createTests = createTests;

},{"./pointer":"node_modules/rfc6902/pointer.js","./patch":"node_modules/rfc6902/patch.js","./diff":"node_modules/rfc6902/diff.js"}],"node_modules/boardgame.io/dist/esm/reducer-24ea3e4c.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.C = CreateGameReducer;
exports.I = IsLongFormMove;
exports.P = ProcessGameConfig;
exports.T = void 0;
var _turnOrder8cc4909b = require("./turn-order-8cc4909b.js");
var _rfc = require("rfc6902");
var _excluded = ["fn", "arg"],
  _excluded2 = ["transients"];
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Flow
 *
 * Creates a reducer that updates ctx (analogous to how moves update G).
 */
function Flow(_ref) {
  var moves = _ref.moves,
    phases = _ref.phases,
    endIf = _ref.endIf,
    onEnd = _ref.onEnd,
    turn = _ref.turn,
    events = _ref.events,
    plugins = _ref.plugins;
  // Attach defaults.
  if (moves === undefined) {
    moves = {};
  }
  if (events === undefined) {
    events = {};
  }
  if (plugins === undefined) {
    plugins = [];
  }
  if (phases === undefined) {
    phases = {};
  }
  if (!endIf) endIf = function endIf() {
    return undefined;
  };
  if (!onEnd) onEnd = function onEnd(_ref2) {
    var G = _ref2.G;
    return G;
  };
  if (!turn) turn = {};
  var phaseMap = _objectSpread({}, phases);
  if ('' in phaseMap) {
    (0, _turnOrder8cc4909b.e)('cannot specify phase with empty name');
  }
  phaseMap[''] = {};
  var moveMap = {};
  var moveNames = new Set();
  var startingPhase = null;
  Object.keys(moves).forEach(function (name) {
    return moveNames.add(name);
  });
  var HookWrapper = function HookWrapper(hook, hookType) {
    var withPlugins = (0, _turnOrder8cc4909b.F)(hook, hookType, plugins);
    return function (state) {
      var pluginAPIs = (0, _turnOrder8cc4909b.a)(state);
      return withPlugins(_objectSpread(_objectSpread({}, pluginAPIs), {}, {
        G: state.G,
        ctx: state.ctx,
        playerID: state.playerID
      }));
    };
  };
  var TriggerWrapper = function TriggerWrapper(trigger) {
    return function (state) {
      var pluginAPIs = (0, _turnOrder8cc4909b.a)(state);
      return trigger(_objectSpread(_objectSpread({}, pluginAPIs), {}, {
        G: state.G,
        ctx: state.ctx
      }));
    };
  };
  var wrapped = {
    onEnd: HookWrapper(onEnd, _turnOrder8cc4909b.G.GAME_ON_END),
    endIf: TriggerWrapper(endIf)
  };
  var _loop = function _loop() {
    var phaseConfig = phaseMap[phase];
    if (phaseConfig.start === true) {
      startingPhase = phase;
    }
    if (phaseConfig.moves !== undefined) {
      for (var _i = 0, _Object$keys = Object.keys(phaseConfig.moves); _i < _Object$keys.length; _i++) {
        var move = _Object$keys[_i];
        moveMap[phase + '.' + move] = phaseConfig.moves[move];
        moveNames.add(move);
      }
    }
    if (phaseConfig.endIf === undefined) {
      phaseConfig.endIf = function () {
        return undefined;
      };
    }
    if (phaseConfig.onBegin === undefined) {
      phaseConfig.onBegin = function (_ref12) {
        var G = _ref12.G;
        return G;
      };
    }
    if (phaseConfig.onEnd === undefined) {
      phaseConfig.onEnd = function (_ref13) {
        var G = _ref13.G;
        return G;
      };
    }
    if (phaseConfig.turn === undefined) {
      phaseConfig.turn = turn;
    }
    if (phaseConfig.turn.order === undefined) {
      phaseConfig.turn.order = _turnOrder8cc4909b.T.DEFAULT;
    }
    if (phaseConfig.turn.onBegin === undefined) {
      phaseConfig.turn.onBegin = function (_ref14) {
        var G = _ref14.G;
        return G;
      };
    }
    if (phaseConfig.turn.onEnd === undefined) {
      phaseConfig.turn.onEnd = function (_ref15) {
        var G = _ref15.G;
        return G;
      };
    }
    if (phaseConfig.turn.endIf === undefined) {
      phaseConfig.turn.endIf = function () {
        return false;
      };
    }
    if (phaseConfig.turn.onMove === undefined) {
      phaseConfig.turn.onMove = function (_ref16) {
        var G = _ref16.G;
        return G;
      };
    }
    if (phaseConfig.turn.stages === undefined) {
      phaseConfig.turn.stages = {};
    }
    // turns previously treated moveLimit as both minMoves and maxMoves, this behaviour is kept intentionally
    (0, _turnOrder8cc4909b.b)(phaseConfig.turn, true);
    for (var stage in phaseConfig.turn.stages) {
      var stageConfig = phaseConfig.turn.stages[stage];
      var _moves2 = stageConfig.moves || {};
      for (var _i2 = 0, _Object$keys2 = Object.keys(_moves2); _i2 < _Object$keys2.length; _i2++) {
        var _move = _Object$keys2[_i2];
        var key = phase + '.' + stage + '.' + _move;
        moveMap[key] = _moves2[_move];
        moveNames.add(_move);
      }
    }
    phaseConfig.wrapped = {
      onBegin: HookWrapper(phaseConfig.onBegin, _turnOrder8cc4909b.G.PHASE_ON_BEGIN),
      onEnd: HookWrapper(phaseConfig.onEnd, _turnOrder8cc4909b.G.PHASE_ON_END),
      endIf: TriggerWrapper(phaseConfig.endIf)
    };
    phaseConfig.turn.wrapped = {
      onMove: HookWrapper(phaseConfig.turn.onMove, _turnOrder8cc4909b.G.TURN_ON_MOVE),
      onBegin: HookWrapper(phaseConfig.turn.onBegin, _turnOrder8cc4909b.G.TURN_ON_BEGIN),
      onEnd: HookWrapper(phaseConfig.turn.onEnd, _turnOrder8cc4909b.G.TURN_ON_END),
      endIf: TriggerWrapper(phaseConfig.turn.endIf)
    };
    if (typeof phaseConfig.next !== 'function') {
      var next = phaseConfig.next;
      phaseConfig.next = function () {
        return next || null;
      };
    }
    phaseConfig.wrapped.next = TriggerWrapper(phaseConfig.next);
  };
  for (var phase in phaseMap) {
    _loop();
  }
  function GetPhase(ctx) {
    return ctx.phase ? phaseMap[ctx.phase] : phaseMap[''];
  }
  function OnMove(state) {
    return state;
  }
  function Process(state, events) {
    var phasesEnded = new Set();
    var turnsEnded = new Set();
    for (var i = 0; i < events.length; i++) {
      var _events$i = events[i],
        fn = _events$i.fn,
        arg = _events$i.arg,
        rest = _objectWithoutProperties(_events$i, _excluded);
      // Detect a loop of EndPhase calls.
      // This could potentially even be an infinite loop
      // if the endIf condition of each phase blindly
      // returns true. The moment we detect a single
      // loop, we just bail out of all phases.
      if (fn === EndPhase) {
        turnsEnded.clear();
        var _phase = state.ctx.phase;
        if (phasesEnded.has(_phase)) {
          var ctx = _objectSpread(_objectSpread({}, state.ctx), {}, {
            phase: null
          });
          return _objectSpread(_objectSpread({}, state), {}, {
            ctx: ctx
          });
        }
        phasesEnded.add(_phase);
      }
      // Process event.
      var next = [];
      state = fn(state, _objectSpread(_objectSpread({}, rest), {}, {
        arg: arg,
        next: next
      }));
      if (fn === EndGame) {
        break;
      }
      // Check if we should end the game.
      var shouldEndGame = ShouldEndGame(state);
      if (shouldEndGame) {
        events.push({
          fn: EndGame,
          arg: shouldEndGame,
          turn: state.ctx.turn,
          phase: state.ctx.phase,
          automatic: true
        });
        continue;
      }
      // Check if we should end the phase.
      var shouldEndPhase = ShouldEndPhase(state);
      if (shouldEndPhase) {
        events.push({
          fn: EndPhase,
          arg: shouldEndPhase,
          turn: state.ctx.turn,
          phase: state.ctx.phase,
          automatic: true
        });
        continue;
      }
      // Check if we should end the turn.
      if ([OnMove, UpdateStage, UpdateActivePlayers].includes(fn)) {
        var shouldEndTurn = ShouldEndTurn(state);
        if (shouldEndTurn) {
          events.push({
            fn: EndTurn,
            arg: shouldEndTurn,
            turn: state.ctx.turn,
            phase: state.ctx.phase,
            automatic: true
          });
          continue;
        }
      }
      events.push.apply(events, next);
    }
    return state;
  }
  ///////////
  // Start //
  ///////////
  function StartGame(state, _ref3) {
    var next = _ref3.next;
    next.push({
      fn: StartPhase
    });
    return state;
  }
  function StartPhase(state, _ref4) {
    var next = _ref4.next;
    var G = state.G,
      ctx = state.ctx;
    var phaseConfig = GetPhase(ctx);
    // Run any phase setup code provided by the user.
    G = phaseConfig.wrapped.onBegin(state);
    next.push({
      fn: StartTurn
    });
    return _objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx
    });
  }
  function StartTurn(state, _ref5) {
    var currentPlayer = _ref5.currentPlayer;
    var ctx = state.ctx;
    var phaseConfig = GetPhase(ctx);
    // Initialize the turn order state.
    if (currentPlayer) {
      ctx = _objectSpread(_objectSpread({}, ctx), {}, {
        currentPlayer: currentPlayer
      });
      if (phaseConfig.turn.activePlayers) {
        ctx = (0, _turnOrder8cc4909b.c)(ctx, phaseConfig.turn.activePlayers);
      }
    } else {
      // This is only called at the beginning of the phase
      // when there is no currentPlayer yet.
      ctx = (0, _turnOrder8cc4909b.I)(state, phaseConfig.turn);
    }
    var turn = ctx.turn + 1;
    ctx = _objectSpread(_objectSpread({}, ctx), {}, {
      turn: turn,
      numMoves: 0,
      _prevActivePlayers: []
    });
    var G = phaseConfig.turn.wrapped.onBegin(_objectSpread(_objectSpread({}, state), {}, {
      ctx: ctx
    }));
    return _objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx,
      _undo: [],
      _redo: []
    });
  }
  ////////////
  // Update //
  ////////////
  function UpdatePhase(state, _ref6) {
    var arg = _ref6.arg,
      next = _ref6.next,
      phase = _ref6.phase;
    var phaseConfig = GetPhase({
      phase: phase
    });
    var _state = state,
      ctx = _state.ctx;
    if (arg && arg.next) {
      if (arg.next in phaseMap) {
        ctx = _objectSpread(_objectSpread({}, ctx), {}, {
          phase: arg.next
        });
      } else {
        (0, _turnOrder8cc4909b.e)('invalid phase: ' + arg.next);
        return state;
      }
    } else {
      ctx = _objectSpread(_objectSpread({}, ctx), {}, {
        phase: phaseConfig.wrapped.next(state) || null
      });
    }
    state = _objectSpread(_objectSpread({}, state), {}, {
      ctx: ctx
    });
    // Start the new phase.
    next.push({
      fn: StartPhase
    });
    return state;
  }
  function UpdateTurn(state, _ref7) {
    var arg = _ref7.arg,
      currentPlayer = _ref7.currentPlayer,
      next = _ref7.next;
    var _state2 = state,
      G = _state2.G,
      ctx = _state2.ctx;
    var phaseConfig = GetPhase(ctx);
    // Update turn order state.
    var _UpdateTurnOrderState = (0, _turnOrder8cc4909b.U)(state, currentPlayer, phaseConfig.turn, arg),
      endPhase = _UpdateTurnOrderState.endPhase,
      newCtx = _UpdateTurnOrderState.ctx;
    ctx = newCtx;
    state = _objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx
    });
    if (endPhase) {
      next.push({
        fn: EndPhase,
        turn: ctx.turn,
        phase: ctx.phase
      });
    } else {
      next.push({
        fn: StartTurn,
        currentPlayer: ctx.currentPlayer
      });
    }
    return state;
  }
  function UpdateStage(state, _ref8) {
    var arg = _ref8.arg,
      playerID = _ref8.playerID;
    if (typeof arg === 'string' || arg === _turnOrder8cc4909b.S.NULL) {
      arg = {
        stage: arg
      };
    }
    if (_typeof(arg) !== 'object') return state;
    // `arg` should be of type `StageArg`, loose typing as `any` here for historic reasons
    // stages previously did not enforce minMoves, this behaviour is kept intentionally
    (0, _turnOrder8cc4909b.b)(arg);
    var ctx = state.ctx;
    var _ctx = ctx,
      activePlayers = _ctx.activePlayers,
      _activePlayersMinMoves = _ctx._activePlayersMinMoves,
      _activePlayersMaxMoves = _ctx._activePlayersMaxMoves,
      _activePlayersNumMoves = _ctx._activePlayersNumMoves;
    // Checking if stage is valid, even Stage.NULL
    if (arg.stage !== undefined) {
      if (activePlayers === null) {
        activePlayers = {};
      }
      activePlayers[playerID] = arg.stage;
      _activePlayersNumMoves[playerID] = 0;
      if (arg.minMoves) {
        if (_activePlayersMinMoves === null) {
          _activePlayersMinMoves = {};
        }
        _activePlayersMinMoves[playerID] = arg.minMoves;
      }
      if (arg.maxMoves) {
        if (_activePlayersMaxMoves === null) {
          _activePlayersMaxMoves = {};
        }
        _activePlayersMaxMoves[playerID] = arg.maxMoves;
      }
    }
    ctx = _objectSpread(_objectSpread({}, ctx), {}, {
      activePlayers: activePlayers,
      _activePlayersMinMoves: _activePlayersMinMoves,
      _activePlayersMaxMoves: _activePlayersMaxMoves,
      _activePlayersNumMoves: _activePlayersNumMoves
    });
    return _objectSpread(_objectSpread({}, state), {}, {
      ctx: ctx
    });
  }
  function UpdateActivePlayers(state, _ref9) {
    var arg = _ref9.arg;
    return _objectSpread(_objectSpread({}, state), {}, {
      ctx: (0, _turnOrder8cc4909b.c)(state.ctx, arg)
    });
  }
  ///////////////
  // ShouldEnd //
  ///////////////
  function ShouldEndGame(state) {
    return wrapped.endIf(state);
  }
  function ShouldEndPhase(state) {
    var phaseConfig = GetPhase(state.ctx);
    return phaseConfig.wrapped.endIf(state);
  }
  function ShouldEndTurn(state) {
    var phaseConfig = GetPhase(state.ctx);
    // End the turn if the required number of moves has been made.
    var currentPlayerMoves = state.ctx.numMoves || 0;
    if (phaseConfig.turn.maxMoves && currentPlayerMoves >= phaseConfig.turn.maxMoves) {
      return true;
    }
    return phaseConfig.turn.wrapped.endIf(state);
  }
  /////////
  // End //
  /////////
  function EndGame(state, _ref0) {
    var arg = _ref0.arg,
      phase = _ref0.phase;
    state = EndPhase(state, {
      phase: phase
    });
    if (arg === undefined) {
      arg = true;
    }
    state = _objectSpread(_objectSpread({}, state), {}, {
      ctx: _objectSpread(_objectSpread({}, state.ctx), {}, {
        gameover: arg
      })
    });
    // Run game end hook.
    var G = wrapped.onEnd(state);
    return _objectSpread(_objectSpread({}, state), {}, {
      G: G
    });
  }
  function EndPhase(state, _ref1) {
    var arg = _ref1.arg,
      next = _ref1.next,
      initialTurn = _ref1.turn,
      automatic = _ref1.automatic;
    // End the turn first.
    state = EndTurn(state, {
      turn: initialTurn,
      force: true,
      automatic: true
    });
    var _state$ctx = state.ctx,
      phase = _state$ctx.phase,
      turn = _state$ctx.turn;
    if (next) {
      next.push({
        fn: UpdatePhase,
        arg: arg,
        phase: phase
      });
    }
    // If we aren't in a phase, there is nothing else to do.
    if (phase === null) {
      return state;
    }
    // Run any cleanup code for the phase that is about to end.
    var phaseConfig = GetPhase(state.ctx);
    var G = phaseConfig.wrapped.onEnd(state);
    // Reset the phase.
    var ctx = _objectSpread(_objectSpread({}, state.ctx), {}, {
      phase: null
    });
    // Add log entry.
    var action = (0, _turnOrder8cc4909b.g)('endPhase', arg);
    var _state3 = state,
      _stateID = _state3._stateID;
    var logEntry = {
      action: action,
      _stateID: _stateID,
      turn: turn,
      phase: phase
    };
    if (automatic) logEntry.automatic = true;
    var deltalog = [].concat(_toConsumableArray(state.deltalog || []), [logEntry]);
    return _objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx,
      deltalog: deltalog
    });
  }
  function EndTurn(state, _ref10) {
    var arg = _ref10.arg,
      next = _ref10.next,
      initialTurn = _ref10.turn,
      force = _ref10.force,
      automatic = _ref10.automatic,
      playerID = _ref10.playerID;
    // This is not the turn that EndTurn was originally
    // called for. The turn was probably ended some other way.
    if (initialTurn !== state.ctx.turn) {
      return state;
    }
    var _state$ctx2 = state.ctx,
      currentPlayer = _state$ctx2.currentPlayer,
      numMoves = _state$ctx2.numMoves,
      phase = _state$ctx2.phase,
      turn = _state$ctx2.turn;
    var phaseConfig = GetPhase(state.ctx);
    // Prevent ending the turn if minMoves haven't been reached.
    var currentPlayerMoves = numMoves || 0;
    if (!force && phaseConfig.turn.minMoves && currentPlayerMoves < phaseConfig.turn.minMoves) {
      (0, _turnOrder8cc4909b.i)("cannot end turn before making ".concat(phaseConfig.turn.minMoves, " moves"));
      return state;
    }
    // Run turn-end triggers.
    var G = phaseConfig.turn.wrapped.onEnd(state);
    if (next) {
      next.push({
        fn: UpdateTurn,
        arg: arg,
        currentPlayer: currentPlayer
      });
    }
    // Reset activePlayers.
    var ctx = _objectSpread(_objectSpread({}, state.ctx), {}, {
      activePlayers: null
    });
    // Remove player from playerOrder
    if (arg && arg.remove) {
      playerID = playerID || currentPlayer;
      var playOrder = ctx.playOrder.filter(function (i) {
        return i != playerID;
      });
      var playOrderPos = ctx.playOrderPos > playOrder.length - 1 ? 0 : ctx.playOrderPos;
      ctx = _objectSpread(_objectSpread({}, ctx), {}, {
        playOrder: playOrder,
        playOrderPos: playOrderPos
      });
      if (playOrder.length === 0) {
        next.push({
          fn: EndPhase,
          turn: turn,
          phase: phase
        });
        return state;
      }
    }
    // Create log entry.
    var action = (0, _turnOrder8cc4909b.g)('endTurn', arg);
    var _stateID = state._stateID;
    var logEntry = {
      action: action,
      _stateID: _stateID,
      turn: turn,
      phase: phase
    };
    if (automatic) logEntry.automatic = true;
    var deltalog = [].concat(_toConsumableArray(state.deltalog || []), [logEntry]);
    return _objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx,
      deltalog: deltalog,
      _undo: [],
      _redo: []
    });
  }
  function EndStage(state, _ref11) {
    var arg = _ref11.arg,
      next = _ref11.next,
      automatic = _ref11.automatic,
      playerID = _ref11.playerID;
    playerID = playerID || state.ctx.currentPlayer;
    var ctx = state.ctx,
      _stateID = state._stateID;
    var _ctx2 = ctx,
      activePlayers = _ctx2.activePlayers,
      _activePlayersNumMoves = _ctx2._activePlayersNumMoves,
      _activePlayersMinMoves = _ctx2._activePlayersMinMoves,
      _activePlayersMaxMoves = _ctx2._activePlayersMaxMoves,
      phase = _ctx2.phase,
      turn = _ctx2.turn;
    var playerInStage = activePlayers !== null && playerID in activePlayers;
    var phaseConfig = GetPhase(ctx);
    if (!arg && playerInStage) {
      var stage = phaseConfig.turn.stages[activePlayers[playerID]];
      if (stage && stage.next) {
        arg = stage.next;
      }
    }
    // Checking if arg is a valid stage, even Stage.NULL
    if (next) {
      next.push({
        fn: UpdateStage,
        arg: arg,
        playerID: playerID
      });
    }
    // If player isn’t in a stage, there is nothing else to do.
    if (!playerInStage) return state;
    // Prevent ending the stage if minMoves haven't been reached.
    var currentPlayerMoves = _activePlayersNumMoves[playerID] || 0;
    if (_activePlayersMinMoves && _activePlayersMinMoves[playerID] && currentPlayerMoves < _activePlayersMinMoves[playerID]) {
      (0, _turnOrder8cc4909b.i)("cannot end stage before making ".concat(_activePlayersMinMoves[playerID], " moves"));
      return state;
    }
    // Remove player from activePlayers.
    activePlayers = _objectSpread({}, activePlayers);
    delete activePlayers[playerID];
    if (_activePlayersMinMoves) {
      // Remove player from _activePlayersMinMoves.
      _activePlayersMinMoves = _objectSpread({}, _activePlayersMinMoves);
      delete _activePlayersMinMoves[playerID];
    }
    if (_activePlayersMaxMoves) {
      // Remove player from _activePlayersMaxMoves.
      _activePlayersMaxMoves = _objectSpread({}, _activePlayersMaxMoves);
      delete _activePlayersMaxMoves[playerID];
    }
    ctx = (0, _turnOrder8cc4909b.d)(_objectSpread(_objectSpread({}, ctx), {}, {
      activePlayers: activePlayers,
      _activePlayersMinMoves: _activePlayersMinMoves,
      _activePlayersMaxMoves: _activePlayersMaxMoves
    }));
    // Create log entry.
    var action = (0, _turnOrder8cc4909b.g)('endStage', arg);
    var logEntry = {
      action: action,
      _stateID: _stateID,
      turn: turn,
      phase: phase
    };
    if (automatic) logEntry.automatic = true;
    var deltalog = [].concat(_toConsumableArray(state.deltalog || []), [logEntry]);
    return _objectSpread(_objectSpread({}, state), {}, {
      ctx: ctx,
      deltalog: deltalog
    });
  }
  /**
   * Retrieves the relevant move that can be played by playerID.
   *
   * If ctx.activePlayers is set (i.e. one or more players are in some stage),
   * then it attempts to find the move inside the stages config for
   * that turn. If the stage for a player is '', then the player is
   * allowed to make a move (as determined by the phase config), but
   * isn't restricted to a particular set as defined in the stage config.
   *
   * If not, it then looks for the move inside the phase.
   *
   * If it doesn't find the move there, it looks at the global move definition.
   *
   * @param {object} ctx
   * @param {string} name
   * @param {string} playerID
   */
  function GetMove(ctx, name, playerID) {
    var phaseConfig = GetPhase(ctx);
    var stages = phaseConfig.turn.stages;
    var activePlayers = ctx.activePlayers;
    if (activePlayers && activePlayers[playerID] !== undefined && activePlayers[playerID] !== _turnOrder8cc4909b.S.NULL && stages[activePlayers[playerID]] !== undefined && stages[activePlayers[playerID]].moves !== undefined) {
      // Check if moves are defined for the player's stage.
      var stage = stages[activePlayers[playerID]];
      var _moves = stage.moves;
      if (name in _moves) {
        return _moves[name];
      }
    } else if (phaseConfig.moves) {
      // Check if moves are defined for the current phase.
      if (name in phaseConfig.moves) {
        return phaseConfig.moves[name];
      }
    } else if (name in moves) {
      // Check for the move globally.
      return moves[name];
    }
    return null;
  }
  function ProcessMove(state, action) {
    var playerID = action.playerID,
      type = action.type;
    var _state$ctx3 = state.ctx,
      currentPlayer = _state$ctx3.currentPlayer,
      activePlayers = _state$ctx3.activePlayers,
      _activePlayersMaxMoves = _state$ctx3._activePlayersMaxMoves;
    var move = GetMove(state.ctx, type, playerID);
    var shouldCount = !move || typeof move === 'function' || move.noLimit !== true;
    var _state$ctx4 = state.ctx,
      numMoves = _state$ctx4.numMoves,
      _activePlayersNumMoves = _state$ctx4._activePlayersNumMoves;
    if (shouldCount) {
      if (playerID === currentPlayer) numMoves++;
      if (activePlayers) _activePlayersNumMoves[playerID]++;
    }
    state = _objectSpread(_objectSpread({}, state), {}, {
      ctx: _objectSpread(_objectSpread({}, state.ctx), {}, {
        numMoves: numMoves,
        _activePlayersNumMoves: _activePlayersNumMoves
      })
    });
    if (_activePlayersMaxMoves && _activePlayersNumMoves[playerID] >= _activePlayersMaxMoves[playerID]) {
      state = EndStage(state, {
        playerID: playerID,
        automatic: true
      });
    }
    var phaseConfig = GetPhase(state.ctx);
    var G = phaseConfig.turn.wrapped.onMove(_objectSpread(_objectSpread({}, state), {}, {
      playerID: playerID
    }));
    state = _objectSpread(_objectSpread({}, state), {}, {
      G: G
    });
    var events = [{
      fn: OnMove
    }];
    return Process(state, events);
  }
  function SetStageEvent(state, playerID, arg) {
    return Process(state, [{
      fn: EndStage,
      arg: arg,
      playerID: playerID
    }]);
  }
  function EndStageEvent(state, playerID) {
    return Process(state, [{
      fn: EndStage,
      playerID: playerID
    }]);
  }
  function SetActivePlayersEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: UpdateActivePlayers,
      arg: arg
    }]);
  }
  function SetPhaseEvent(state, _playerID, newPhase) {
    return Process(state, [{
      fn: EndPhase,
      phase: state.ctx.phase,
      turn: state.ctx.turn,
      arg: {
        next: newPhase
      }
    }]);
  }
  function EndPhaseEvent(state) {
    return Process(state, [{
      fn: EndPhase,
      phase: state.ctx.phase,
      turn: state.ctx.turn
    }]);
  }
  function EndTurnEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndTurn,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      arg: arg
    }]);
  }
  function PassEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndTurn,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      force: true,
      arg: arg
    }]);
  }
  function EndGameEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndGame,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      arg: arg
    }]);
  }
  var eventHandlers = {
    endStage: EndStageEvent,
    setStage: SetStageEvent,
    endTurn: EndTurnEvent,
    pass: PassEvent,
    endPhase: EndPhaseEvent,
    setPhase: SetPhaseEvent,
    endGame: EndGameEvent,
    setActivePlayers: SetActivePlayersEvent
  };
  var enabledEventNames = [];
  if (events.endTurn !== false) {
    enabledEventNames.push('endTurn');
  }
  if (events.pass !== false) {
    enabledEventNames.push('pass');
  }
  if (events.endPhase !== false) {
    enabledEventNames.push('endPhase');
  }
  if (events.setPhase !== false) {
    enabledEventNames.push('setPhase');
  }
  if (events.endGame !== false) {
    enabledEventNames.push('endGame');
  }
  if (events.setActivePlayers !== false) {
    enabledEventNames.push('setActivePlayers');
  }
  if (events.endStage !== false) {
    enabledEventNames.push('endStage');
  }
  if (events.setStage !== false) {
    enabledEventNames.push('setStage');
  }
  function ProcessEvent(state, action) {
    var _action$payload = action.payload,
      type = _action$payload.type,
      playerID = _action$payload.playerID,
      args = _action$payload.args;
    if (typeof eventHandlers[type] !== 'function') return state;
    return eventHandlers[type].apply(eventHandlers, [state, playerID].concat(_toConsumableArray(Array.isArray(args) ? args : [args])));
  }
  function IsPlayerActive(_G, ctx, playerID) {
    if (ctx.activePlayers) {
      return playerID in ctx.activePlayers;
    }
    return ctx.currentPlayer === playerID;
  }
  return {
    ctx: function ctx(numPlayers) {
      return {
        numPlayers: numPlayers,
        turn: 0,
        currentPlayer: '0',
        playOrder: _toConsumableArray(Array.from({
          length: numPlayers
        })).map(function (_, i) {
          return i + '';
        }),
        playOrderPos: 0,
        phase: startingPhase,
        activePlayers: null
      };
    },
    init: function init(state) {
      return Process(state, [{
        fn: StartGame
      }]);
    },
    isPlayerActive: IsPlayerActive,
    eventHandlers: eventHandlers,
    eventNames: Object.keys(eventHandlers),
    enabledEventNames: enabledEventNames,
    moveMap: moveMap,
    moveNames: _toConsumableArray(moveNames.values()),
    processMove: ProcessMove,
    processEvent: ProcessEvent,
    getMove: GetMove
  };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function IsProcessed(game) {
  return game.processMove !== undefined;
}
/**
 * Helper to generate the game move reducer. The returned
 * reducer has the following signature:
 *
 * (G, action, ctx) => {}
 *
 * You can roll your own if you like, or use any Redux
 * addon to generate such a reducer.
 *
 * The convention used in this framework is to
 * have action.type contain the name of the move, and
 * action.args contain any additional arguments as an
 * Array.
 */
function ProcessGameConfig(game) {
  // The Game() function has already been called on this
  // config object, so just pass it through.
  if (IsProcessed(game)) {
    return game;
  }
  if (game.name === undefined) game.name = 'default';
  if (game.deltaState === undefined) game.deltaState = false;
  if (game.disableUndo === undefined) game.disableUndo = false;
  if (game.setup === undefined) game.setup = function () {
    return {};
  };
  if (game.moves === undefined) game.moves = {};
  if (game.playerView === undefined) game.playerView = function (_ref17) {
    var G = _ref17.G;
    return G;
  };
  if (game.plugins === undefined) game.plugins = [];
  game.plugins.forEach(function (plugin) {
    if (plugin.name === undefined) {
      throw new Error('Plugin missing name attribute');
    }
    if (plugin.name.includes(' ')) {
      throw new Error(plugin.name + ': Plugin name must not include spaces');
    }
  });
  if (game.name.includes(' ')) {
    throw new Error(game.name + ': Game name must not include spaces');
  }
  var flow = Flow(game);
  return _objectSpread(_objectSpread({}, game), {}, {
    flow: flow,
    moveNames: flow.moveNames,
    pluginNames: game.plugins.map(function (p) {
      return p.name;
    }),
    processMove: function processMove(state, action) {
      var moveFn = flow.getMove(state.ctx, action.type, action.playerID);
      if (IsLongFormMove(moveFn)) {
        moveFn = moveFn.move;
      }
      if (moveFn instanceof Function) {
        var fn = (0, _turnOrder8cc4909b.F)(moveFn, _turnOrder8cc4909b.G.MOVE, game.plugins);
        var args = [];
        if (action.args !== undefined) {
          args = Array.isArray(action.args) ? action.args : [action.args];
        }
        var context = _objectSpread(_objectSpread({}, (0, _turnOrder8cc4909b.a)(state)), {}, {
          G: state.G,
          ctx: state.ctx,
          playerID: action.playerID
        });
        return fn.apply(void 0, [context].concat(_toConsumableArray(args)));
      }
      (0, _turnOrder8cc4909b.e)("invalid move object: ".concat(action.type));
      return state.G;
    }
  });
}
function IsLongFormMove(move) {
  return move instanceof Object && move.move !== undefined;
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var UpdateErrorType;
(function (UpdateErrorType) {
  // The action’s credentials were missing or invalid
  UpdateErrorType["UnauthorizedAction"] = "update/unauthorized_action";
  // The action’s matchID was not found
  UpdateErrorType["MatchNotFound"] = "update/match_not_found";
  // Could not apply Patch operation (rfc6902).
  UpdateErrorType["PatchFailed"] = "update/patch_failed";
})(UpdateErrorType || (UpdateErrorType = {}));
var ActionErrorType;
(function (ActionErrorType) {
  // The action contained a stale state ID
  ActionErrorType["StaleStateId"] = "action/stale_state_id";
  // The requested move is unknown or not currently available
  ActionErrorType["UnavailableMove"] = "action/unavailable_move";
  // The move declared it was invalid (INVALID_MOVE constant)
  ActionErrorType["InvalidMove"] = "action/invalid_move";
  // The player making the action is not currently active
  ActionErrorType["InactivePlayer"] = "action/inactive_player";
  // The game has finished
  ActionErrorType["GameOver"] = "action/gameover";
  // The requested action is disabled (e.g. undo/redo, events)
  ActionErrorType["ActionDisabled"] = "action/action_disabled";
  // The requested action is not currently possible
  ActionErrorType["ActionInvalid"] = "action/action_invalid";
  // The requested action was declared invalid by a plugin
  ActionErrorType["PluginActionInvalid"] = "action/plugin_invalid";
})(ActionErrorType || (ActionErrorType = {}));

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Check if the payload for the passed action contains a playerID.
 */
var actionHasPlayerID = function actionHasPlayerID(action) {
  return action.payload.playerID !== null && action.payload.playerID !== undefined;
};
/**
 * Returns true if a move can be undone.
 */
var CanUndoMove = function CanUndoMove(G, ctx, move) {
  function HasUndoable(move) {
    return move.undoable !== undefined;
  }
  function IsFunction(undoable) {
    return undoable instanceof Function;
  }
  if (!HasUndoable(move)) {
    return true;
  }
  if (IsFunction(move.undoable)) {
    return move.undoable({
      G: G,
      ctx: ctx
    });
  }
  return move.undoable;
};
/**
 * Update the undo and redo stacks for a move or event.
 */
function updateUndoRedoState(state, opts) {
  if (opts.game.disableUndo) return state;
  var undoEntry = {
    G: state.G,
    ctx: state.ctx,
    plugins: state.plugins,
    playerID: opts.action.payload.playerID || state.ctx.currentPlayer
  };
  if (opts.action.type === 'MAKE_MOVE') {
    undoEntry.moveType = opts.action.payload.type;
  }
  return _objectSpread(_objectSpread({}, state), {}, {
    _undo: [].concat(_toConsumableArray(state._undo), [undoEntry]),
    // Always reset redo stack when making a move or event
    _redo: []
  });
}
/**
 * Process state, adding the initial deltalog for this action.
 */
function initializeDeltalog(state, action, move) {
  // Create a log entry for this action.
  var logEntry = {
    action: action,
    _stateID: state._stateID,
    turn: state.ctx.turn,
    phase: state.ctx.phase
  };
  var pluginLogMetadata = state.plugins.log.data.metadata;
  if (pluginLogMetadata !== undefined) {
    logEntry.metadata = pluginLogMetadata;
  }
  if (_typeof(move) === 'object' && move.redact === true) {
    logEntry.redact = true;
  } else if (_typeof(move) === 'object' && move.redact instanceof Function) {
    logEntry.redact = move.redact({
      G: state.G,
      ctx: state.ctx
    });
  }
  return _objectSpread(_objectSpread({}, state), {}, {
    deltalog: [logEntry]
  });
}
/**
 * Update plugin state after move/event & check if plugins consider the action to be valid.
 * @param state Current version of state in the reducer.
 * @param oldState State to revert to in case of error.
 * @param pluginOpts Plugin configuration options.
 * @returns Tuple of the new state updated after flushing plugins and the old
 * state augmented with an error if a plugin declared the action invalid.
 */
function flushAndValidatePlugins(state, oldState, pluginOpts) {
  var _FlushAndValidate = (0, _turnOrder8cc4909b.q)(state, pluginOpts),
    _FlushAndValidate2 = _slicedToArray(_FlushAndValidate, 2),
    newState = _FlushAndValidate2[0],
    isInvalid = _FlushAndValidate2[1];
  if (!isInvalid) return [newState];
  return [newState, WithError(oldState, ActionErrorType.PluginActionInvalid, isInvalid)];
}
/**
 * ExtractTransientsFromState
 *
 * Split out transients from the a TransientState
 */
function ExtractTransients(transientState) {
  if (!transientState) {
    // We preserve null for the state for legacy callers, but the transient
    // field should be undefined if not present to be consistent with the
    // code path below.
    return [null, undefined];
  }
  var transients = transientState.transients,
    state = _objectWithoutProperties(transientState, _excluded2);
  return [state, transients];
}
/**
 * WithError
 *
 * Augment a State instance with transient error information.
 */
function WithError(state, errorType, payload) {
  var error = {
    type: errorType,
    payload: payload
  };
  return _objectSpread(_objectSpread({}, state), {}, {
    transients: {
      error: error
    }
  });
}
/**
 * Middleware for processing TransientState associated with the reducer
 * returned by CreateGameReducer.
 * This should pretty much be used everywhere you want realistic state
 * transitions and error handling.
 */
var TransientHandlingMiddleware = exports.T = function TransientHandlingMiddleware(store) {
  return function (next) {
    return function (action) {
      var result = next(action);
      switch (action.type) {
        case _turnOrder8cc4909b.p:
          {
            return result;
          }
        default:
          {
            var _ExtractTransients = ExtractTransients(store.getState()),
              _ExtractTransients2 = _slicedToArray(_ExtractTransients, 2),
              transients = _ExtractTransients2[1];
            if (typeof transients !== 'undefined') {
              store.dispatch((0, _turnOrder8cc4909b.r)());
              // Dev Note: If parent middleware needs to correlate the spawned
              // StripTransients action to the triggering action, instrument here.
              //
              // This is a bit tricky; for more details, see:
              //   https://github.com/boardgameio/boardgame.io/pull/940#discussion_r636200648
              return _objectSpread(_objectSpread({}, result), {}, {
                transients: transients
              });
            }
            return result;
          }
      }
    };
  };
};
/**
 * CreateGameReducer
 *
 * Creates the main game state reducer.
 */
function CreateGameReducer(_ref18) {
  var game = _ref18.game,
    isClient = _ref18.isClient;
  game = ProcessGameConfig(game);
  /**
   * GameReducer
   *
   * Redux reducer that maintains the overall game state.
   * @param {object} state - The state before the action.
   * @param {object} action - A Redux action.
   */
  return function () {
    var stateWithTransients = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var _ExtractTransients3 = ExtractTransients(stateWithTransients),
      _ExtractTransients4 = _slicedToArray(_ExtractTransients3, 1),
      state /*, transients */ = _ExtractTransients4[0];
    switch (action.type) {
      case _turnOrder8cc4909b.p:
        {
          // This action indicates that transient metadata in the state has been
          // consumed and should now be stripped from the state..
          return state;
        }
      case _turnOrder8cc4909b.o:
        {
          state = _objectSpread(_objectSpread({}, state), {}, {
            deltalog: []
          });
          // Process game events only on the server.
          // These events like `endTurn` typically
          // contain code that may rely on secret state
          // and cannot be computed on the client.
          if (isClient) {
            return state;
          }
          // Disallow events once the game is over.
          if (state.ctx.gameover !== undefined) {
            (0, _turnOrder8cc4909b.e)("cannot call event after game end");
            return WithError(state, ActionErrorType.GameOver);
          }
          // Ignore the event if the player isn't active.
          if (actionHasPlayerID(action) && !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
            (0, _turnOrder8cc4909b.e)("disallowed event: ".concat(action.payload.type));
            return WithError(state, ActionErrorType.InactivePlayer);
          }
          // Execute plugins.
          state = (0, _turnOrder8cc4909b.E)(state, {
            game: game,
            isClient: false,
            playerID: action.payload.playerID
          });
          // Process event.
          var newState = game.flow.processEvent(state, action);
          // Execute plugins.
          var stateWithError;
          var _flushAndValidatePlug = flushAndValidatePlugins(newState, state, {
            game: game,
            isClient: false
          });
          var _flushAndValidatePlug2 = _slicedToArray(_flushAndValidatePlug, 2);
          newState = _flushAndValidatePlug2[0];
          stateWithError = _flushAndValidatePlug2[1];
          if (stateWithError) return stateWithError;
          // Update undo / redo state.
          newState = updateUndoRedoState(newState, {
            game: game,
            action: action
          });
          return _objectSpread(_objectSpread({}, newState), {}, {
            _stateID: state._stateID + 1
          });
        }
      case _turnOrder8cc4909b.M:
        {
          var oldState = state = _objectSpread(_objectSpread({}, state), {}, {
            deltalog: []
          });
          // Check whether the move is allowed at this time.
          var move = game.flow.getMove(state.ctx, action.payload.type, action.payload.playerID || state.ctx.currentPlayer);
          if (move === null) {
            (0, _turnOrder8cc4909b.e)("disallowed move: ".concat(action.payload.type));
            return WithError(state, ActionErrorType.UnavailableMove);
          }
          // Don't run move on client if move says so.
          if (isClient && move.client === false) {
            return state;
          }
          // Disallow moves once the game is over.
          if (state.ctx.gameover !== undefined) {
            (0, _turnOrder8cc4909b.e)("cannot make move after game end");
            return WithError(state, ActionErrorType.GameOver);
          }
          // Ignore the move if the player isn't active.
          if (actionHasPlayerID(action) && !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
            (0, _turnOrder8cc4909b.e)("disallowed move: ".concat(action.payload.type));
            return WithError(state, ActionErrorType.InactivePlayer);
          }
          // Execute plugins.
          state = (0, _turnOrder8cc4909b.E)(state, {
            game: game,
            isClient: isClient,
            playerID: action.payload.playerID
          });
          // Process the move.
          var G = game.processMove(state, action.payload);
          // The game declared the move as invalid.
          if (G === _turnOrder8cc4909b.n) {
            (0, _turnOrder8cc4909b.e)("invalid move: ".concat(action.payload.type, " args: ").concat(action.payload.args));
            // TODO(#723): Marshal a nice error payload with the processed move.
            return WithError(state, ActionErrorType.InvalidMove);
          }
          var _newState = _objectSpread(_objectSpread({}, state), {}, {
            G: G
          });
          // Some plugin indicated that it is not suitable to be
          // materialized on the client (and must wait for the server
          // response instead).
          if (isClient && (0, _turnOrder8cc4909b.N)(_newState, {
            game: game
          })) {
            return state;
          }
          state = _newState;
          // If we're on the client, just process the move
          // and no triggers in multiplayer mode.
          // These will be processed on the server, which
          // will send back a state update.
          if (isClient) {
            var _stateWithError;
            var _flushAndValidatePlug3 = flushAndValidatePlugins(state, oldState, {
              game: game,
              isClient: true
            });
            var _flushAndValidatePlug4 = _slicedToArray(_flushAndValidatePlug3, 2);
            state = _flushAndValidatePlug4[0];
            _stateWithError = _flushAndValidatePlug4[1];
            if (_stateWithError) return _stateWithError;
            return _objectSpread(_objectSpread({}, state), {}, {
              _stateID: state._stateID + 1
            });
          }
          // On the server, construct the deltalog.
          state = initializeDeltalog(state, action, move);
          // Allow the flow reducer to process any triggers that happen after moves.
          state = game.flow.processMove(state, action.payload);
          var _stateWithError2;
          var _flushAndValidatePlug5 = flushAndValidatePlugins(state, oldState, {
            game: game
          });
          var _flushAndValidatePlug6 = _slicedToArray(_flushAndValidatePlug5, 2);
          state = _flushAndValidatePlug6[0];
          _stateWithError2 = _flushAndValidatePlug6[1];
          if (_stateWithError2) return _stateWithError2;
          // Update undo / redo state.
          state = updateUndoRedoState(state, {
            game: game,
            action: action
          });
          return _objectSpread(_objectSpread({}, state), {}, {
            _stateID: state._stateID + 1
          });
        }
      case _turnOrder8cc4909b.m:
      case _turnOrder8cc4909b.l:
      case _turnOrder8cc4909b.k:
        {
          return action.state;
        }
      case _turnOrder8cc4909b.j:
        {
          state = _objectSpread(_objectSpread({}, state), {}, {
            deltalog: []
          });
          if (game.disableUndo) {
            (0, _turnOrder8cc4909b.e)('Undo is not enabled');
            return WithError(state, ActionErrorType.ActionDisabled);
          }
          var _state4 = state,
            _G2 = _state4.G,
            ctx = _state4.ctx,
            _undo = _state4._undo,
            _redo = _state4._redo,
            _stateID = _state4._stateID;
          if (_undo.length < 2) {
            (0, _turnOrder8cc4909b.e)("No moves to undo");
            return WithError(state, ActionErrorType.ActionInvalid);
          }
          var last = _undo[_undo.length - 1];
          var restore = _undo[_undo.length - 2];
          // Only allow players to undo their own moves.
          if (actionHasPlayerID(action) && action.payload.playerID !== last.playerID) {
            (0, _turnOrder8cc4909b.e)("Cannot undo other players' moves");
            return WithError(state, ActionErrorType.ActionInvalid);
          }
          // If undoing a move, check it is undoable.
          if (last.moveType) {
            var lastMove = game.flow.getMove(restore.ctx, last.moveType, last.playerID);
            if (!CanUndoMove(_G2, ctx, lastMove)) {
              (0, _turnOrder8cc4909b.e)("Move cannot be undone");
              return WithError(state, ActionErrorType.ActionInvalid);
            }
          }
          state = initializeDeltalog(state, action);
          return _objectSpread(_objectSpread({}, state), {}, {
            G: restore.G,
            ctx: restore.ctx,
            plugins: restore.plugins,
            _stateID: _stateID + 1,
            _undo: _undo.slice(0, -1),
            _redo: [last].concat(_toConsumableArray(_redo))
          });
        }
      case _turnOrder8cc4909b.R:
        {
          state = _objectSpread(_objectSpread({}, state), {}, {
            deltalog: []
          });
          if (game.disableUndo) {
            (0, _turnOrder8cc4909b.e)('Redo is not enabled');
            return WithError(state, ActionErrorType.ActionDisabled);
          }
          var _state5 = state,
            _undo2 = _state5._undo,
            _redo2 = _state5._redo,
            _stateID2 = _state5._stateID;
          if (_redo2.length === 0) {
            (0, _turnOrder8cc4909b.e)("No moves to redo");
            return WithError(state, ActionErrorType.ActionInvalid);
          }
          var first = _redo2[0];
          // Only allow players to redo their own undos.
          if (actionHasPlayerID(action) && action.payload.playerID !== first.playerID) {
            (0, _turnOrder8cc4909b.e)("Cannot redo other players' moves");
            return WithError(state, ActionErrorType.ActionInvalid);
          }
          state = initializeDeltalog(state, action);
          return _objectSpread(_objectSpread({}, state), {}, {
            G: first.G,
            ctx: first.ctx,
            plugins: first.plugins,
            _stateID: _stateID2 + 1,
            _undo: [].concat(_toConsumableArray(_undo2), [first]),
            _redo: _redo2.slice(1)
          });
        }
      case _turnOrder8cc4909b.f:
        {
          // TODO(#723): Expose error semantics to plugin processing.
          return (0, _turnOrder8cc4909b.h)(state, action, {
            game: game
          });
        }
      case _turnOrder8cc4909b.P:
        {
          var _oldState = state;
          var _newState2 = JSON.parse(JSON.stringify(_oldState));
          var patchError = (0, _rfc.applyPatch)(_newState2, action.patch);
          var hasError = patchError.some(function (entry) {
            return entry !== null;
          });
          if (hasError) {
            (0, _turnOrder8cc4909b.e)("Patch ".concat(JSON.stringify(action.patch), " apply failed"));
            return WithError(_oldState, UpdateErrorType.PatchFailed, patchError);
          } else {
            return _newState2;
          }
        }
      default:
        {
          return state;
        }
    }
  };
}
},{"./turn-order-8cc4909b.js":"node_modules/boardgame.io/dist/esm/turn-order-8cc4909b.js","rfc6902":"node_modules/rfc6902/index.js"}],"node_modules/flatted/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toJSON = exports.stringify = exports.parse = exports.fromJSON = void 0;
/// <reference types="../types/index.d.ts" />

// (c) 2020-present Andrea Giammarchi

const {
  parse: $parse,
  stringify: $stringify
} = JSON;
const {
  keys
} = Object;
const Primitive = String; // it could be Number
const primitive = 'string'; // it could be 'number'

const ignore = {};
const object = 'object';
const noop = (_, value) => value;
const primitives = value => value instanceof Primitive ? Primitive(value) : value;
const Primitives = (_, value) => typeof value === primitive ? new Primitive(value) : value;
const revive = (input, parsed, output, $) => {
  const lazy = [];
  for (let ke = keys(output), {
      length
    } = ke, y = 0; y < length; y++) {
    const k = ke[y];
    const value = output[k];
    if (value instanceof Primitive) {
      const tmp = input[value];
      if (typeof tmp === object && !parsed.has(tmp)) {
        parsed.add(tmp);
        output[k] = ignore;
        lazy.push({
          k,
          a: [input, parsed, tmp, $]
        });
      } else output[k] = $.call(output, k, tmp);
    } else if (output[k] !== ignore) output[k] = $.call(output, k, value);
  }
  for (let {
      length
    } = lazy, i = 0; i < length; i++) {
    const {
      k,
      a
    } = lazy[i];
    output[k] = $.call(output, k, revive.apply(null, a));
  }
  return output;
};
const set = (known, input, value) => {
  const index = Primitive(input.push(value) - 1);
  known.set(value, index);
  return index;
};

/**
 * Converts a specialized flatted string into a JS value.
 * @param {string} text
 * @param {(this: any, key: string, value: any) => any} [reviver]
 * @returns {any}
 */
const parse = (text, reviver) => {
  const input = $parse(text, Primitives).map(primitives);
  const value = input[0];
  const $ = reviver || noop;
  const tmp = typeof value === object && value ? revive(input, new Set(), value, $) : value;
  return $.call({
    '': tmp
  }, '', tmp);
};

/**
 * Converts a JS value into a specialized flatted string.
 * @param {any} value
 * @param {((this: any, key: string, value: any) => any) | (string | number)[] | null | undefined} [replacer]
 * @param {string | number | undefined} [space]
 * @returns {string}
 */
exports.parse = parse;
const stringify = (value, replacer, space) => {
  const $ = replacer && typeof replacer === object ? (k, v) => k === '' || -1 < replacer.indexOf(k) ? v : void 0 : replacer || noop;
  const known = new Map();
  const input = [];
  const output = [];
  let i = +set(known, input, $.call({
    '': value
  }, '', value));
  let firstRun = !i;
  while (i < input.length) {
    firstRun = true;
    output[i] = $stringify(input[i++], replace, space);
  }
  return '[' + output.join(',') + ']';
  function replace(key, value) {
    if (firstRun) {
      firstRun = !firstRun;
      return value;
    }
    const after = $.call(this, key, value);
    switch (typeof after) {
      case object:
        if (after === null) return after;
      case primitive:
        return known.get(after) || set(known, input, after);
    }
    return after;
  }
};

/**
 * Converts a generic value into a JSON serializable object without losing recursion.
 * @param {any} value
 * @returns {any}
 */
exports.stringify = stringify;
const toJSON = value => $parse(stringify(value));

/**
 * Converts a previously serialized object with recursion into a recursive one.
 * @param {any} value
 * @returns {any}
 */
exports.toJSON = toJSON;
const fromJSON = value => parse($stringify(value));
exports.fromJSON = fromJSON;
},{}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"node_modules/setimmediate/setImmediate.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

},{"process":"node_modules/process/browser.js"}],"node_modules/boardgame.io/dist/esm/ai-7998b00f.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.R = exports.M = exports.B = void 0;
exports.S = Step;
exports.a = Simulate;
var _turnOrder8cc4909b = require("./turn-order-8cc4909b.js");
var _pluginRandom087f861e = require("./plugin-random-087f861e.js");
var _reducer24ea3e4c = require("./reducer-24ea3e4c.js");
require("setimmediate");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Base class that bots can extend.
 */
var Bot = exports.B = /*#__PURE__*/function () {
  function Bot(_ref) {
    var enumerate = _ref.enumerate,
      seed = _ref.seed;
    _classCallCheck(this, Bot);
    this.enumerateFn = enumerate;
    this.seed = seed;
    this.iterationCounter = 0;
    this._opts = {};
  }
  return _createClass(Bot, [{
    key: "addOpt",
    value: function addOpt(_ref2) {
      var key = _ref2.key,
        range = _ref2.range,
        initial = _ref2.initial;
      this._opts[key] = {
        range: range,
        value: initial
      };
    }
  }, {
    key: "getOpt",
    value: function getOpt(key) {
      return this._opts[key].value;
    }
  }, {
    key: "setOpt",
    value: function setOpt(key, value) {
      if (key in this._opts) {
        this._opts[key].value = value;
      }
    }
  }, {
    key: "opts",
    value: function opts() {
      return this._opts;
    }
  }, {
    key: "enumerate",
    value: function enumerate(G, ctx, playerID) {
      var actions = this.enumerateFn(G, ctx, playerID);
      return actions.map(function (a) {
        if ('payload' in a) {
          return a;
        }
        if ('move' in a) {
          return (0, _turnOrder8cc4909b.B)(a.move, a.args, playerID);
        }
        if ('event' in a) {
          return (0, _turnOrder8cc4909b.g)(a.event, a.args, playerID);
        }
      });
    }
  }, {
    key: "random",
    value: function random(arg) {
      var number;
      if (this.seed !== undefined) {
        var seed = this.prngstate ? '' : this.seed;
        var rand = (0, _pluginRandom087f861e.a)(seed, this.prngstate);
        number = rand();
        this.prngstate = rand.state();
      } else {
        number = Math.random();
      }
      if (arg) {
        if (Array.isArray(arg)) {
          var id = Math.floor(number * arg.length);
          return arg[id];
        } else {
          return Math.floor(number * arg);
        }
      }
      return number;
    }
  }]);
}();
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * The number of iterations to run before yielding to
 * the JS event loop (in async mode).
 */
var CHUNK_SIZE = 25;
/**
 * Bot that uses Monte-Carlo Tree Search to find promising moves.
 */
var MCTSBot = exports.M = /*#__PURE__*/function (_Bot) {
  function MCTSBot(_ref3) {
    var _this;
    var enumerate = _ref3.enumerate,
      seed = _ref3.seed,
      objectives = _ref3.objectives,
      game = _ref3.game,
      iterations = _ref3.iterations,
      playoutDepth = _ref3.playoutDepth,
      iterationCallback = _ref3.iterationCallback;
    _classCallCheck(this, MCTSBot);
    _this = _callSuper(this, MCTSBot, [{
      enumerate: enumerate,
      seed: seed
    }]);
    if (objectives === undefined) {
      objectives = function objectives() {
        return {};
      };
    }
    _this.objectives = objectives;
    _this.iterationCallback = iterationCallback || function () {};
    _this.reducer = (0, _reducer24ea3e4c.C)({
      game: game
    });
    _this.iterations = iterations;
    _this.playoutDepth = playoutDepth;
    _this.addOpt({
      key: 'async',
      initial: false
    });
    _this.addOpt({
      key: 'iterations',
      initial: typeof iterations === 'number' ? iterations : 1000,
      range: {
        min: 1,
        max: 2000
      }
    });
    _this.addOpt({
      key: 'playoutDepth',
      initial: typeof playoutDepth === 'number' ? playoutDepth : 50,
      range: {
        min: 1,
        max: 100
      }
    });
    return _this;
  }
  _inherits(MCTSBot, _Bot);
  return _createClass(MCTSBot, [{
    key: "createNode",
    value: function createNode(_ref4) {
      var state = _ref4.state,
        parentAction = _ref4.parentAction,
        parent = _ref4.parent,
        playerID = _ref4.playerID;
      var G = state.G,
        ctx = state.ctx;
      var actions = [];
      var objectives = [];
      if (playerID !== undefined) {
        actions = this.enumerate(G, ctx, playerID);
        objectives = this.objectives(G, ctx, playerID);
      } else if (ctx.activePlayers) {
        for (var _playerID in ctx.activePlayers) {
          var _actions;
          (_actions = actions).push.apply(_actions, _toConsumableArray(this.enumerate(G, ctx, _playerID)));
          objectives.push(this.objectives(G, ctx, _playerID));
        }
      } else {
        actions = this.enumerate(G, ctx, ctx.currentPlayer);
        objectives = this.objectives(G, ctx, ctx.currentPlayer);
      }
      return {
        state: state,
        parent: parent,
        parentAction: parentAction,
        actions: actions,
        objectives: objectives,
        children: [],
        visits: 0,
        value: 0
      };
    }
  }, {
    key: "select",
    value: function select(node) {
      // This node has unvisited children.
      if (node.actions.length > 0) {
        return node;
      }
      // This is a terminal node.
      if (node.children.length === 0) {
        return node;
      }
      var selectedChild = null;
      var best = 0;
      var _iterator = _createForOfIteratorHelper(node.children),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          var childVisits = child.visits + Number.EPSILON;
          var uct = child.value / childVisits + Math.sqrt(2 * Math.log(node.visits) / childVisits);
          if (selectedChild == null || uct > best) {
            best = uct;
            selectedChild = child;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return this.select(selectedChild);
    }
  }, {
    key: "expand",
    value: function expand(node) {
      var actions = node.actions;
      if (actions.length === 0 || node.state.ctx.gameover !== undefined) {
        return node;
      }
      var id = this.random(actions.length);
      var action = actions[id];
      node.actions.splice(id, 1);
      var childState = this.reducer(node.state, action);
      var childNode = this.createNode({
        state: childState,
        parentAction: action,
        parent: node
      });
      node.children.push(childNode);
      return childNode;
    }
  }, {
    key: "playout",
    value: function playout(_ref5) {
      var _this2 = this;
      var state = _ref5.state;
      var playoutDepth = this.getOpt('playoutDepth');
      if (typeof this.playoutDepth === 'function') {
        playoutDepth = this.playoutDepth(state.G, state.ctx);
      }
      var _loop = function _loop() {
          var _state = state,
            G = _state.G,
            ctx = _state.ctx;
          var playerID = ctx.currentPlayer;
          if (ctx.activePlayers) {
            playerID = Object.keys(ctx.activePlayers)[0];
          }
          var moves = _this2.enumerate(G, ctx, playerID);
          // Check if any objectives are met.
          var objectives = _this2.objectives(G, ctx, playerID);
          var score = Object.keys(objectives).reduce(function (score, key) {
            var objective = objectives[key];
            if (objective.checker(G, ctx)) {
              return score + objective.weight;
            }
            return score;
          }, 0);
          // If so, stop and return the score.
          if (score > 0) {
            return {
              v: {
                score: score
              }
            };
          }
          if (!moves || moves.length === 0) {
            return {
              v: undefined
            };
          }
          var id = _this2.random(moves.length);
          var childState = _this2.reducer(state, moves[id]);
          state = childState;
        },
        _ret;
      for (var i = 0; i < playoutDepth && state.ctx.gameover === undefined; i++) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
      return state.ctx.gameover;
    }
  }, {
    key: "backpropagate",
    value: function backpropagate(node) {
      var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      node.visits++;
      if (result.score !== undefined) {
        node.value += result.score;
      }
      if (result.draw === true) {
        node.value += 0.5;
      }
      if (node.parentAction && result.winner === node.parentAction.payload.playerID) {
        node.value++;
      }
      if (node.parent) {
        this.backpropagate(node.parent, result);
      }
    }
  }, {
    key: "play",
    value: function play(state, playerID) {
      var _this3 = this;
      var root = this.createNode({
        state: state,
        playerID: playerID
      });
      var numIterations = this.getOpt('iterations');
      if (typeof this.iterations === 'function') {
        numIterations = this.iterations(state.G, state.ctx);
      }
      var getResult = function getResult() {
        var selectedChild = null;
        var _iterator2 = _createForOfIteratorHelper(root.children),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var child = _step2.value;
            if (selectedChild == null || child.visits > selectedChild.visits) {
              selectedChild = child;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        var action = selectedChild && selectedChild.parentAction;
        var metadata = root;
        return {
          action: action,
          metadata: metadata
        };
      };
      return new Promise(function (resolve) {
        var iteration = function iteration() {
          for (var i = 0; i < CHUNK_SIZE && _this3.iterationCounter < numIterations; i++) {
            var leaf = _this3.select(root);
            var child = _this3.expand(leaf);
            var result = _this3.playout(child);
            _this3.backpropagate(child, result);
            _this3.iterationCounter++;
          }
          _this3.iterationCallback({
            iterationCounter: _this3.iterationCounter,
            numIterations: numIterations,
            metadata: root
          });
        };
        _this3.iterationCounter = 0;
        if (_this3.getOpt('async')) {
          var _asyncIteration = function asyncIteration() {
            if (_this3.iterationCounter < numIterations) {
              iteration();
              setImmediate(_asyncIteration);
            } else {
              resolve(getResult());
            }
          };
          _asyncIteration();
        } else {
          while (_this3.iterationCounter < numIterations) {
            iteration();
          }
          resolve(getResult());
        }
      });
    }
  }]);
}(Bot);
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Bot that picks a move at random.
 */
var RandomBot = exports.R = /*#__PURE__*/function (_Bot2) {
  function RandomBot() {
    _classCallCheck(this, RandomBot);
    return _callSuper(this, RandomBot, arguments);
  }
  _inherits(RandomBot, _Bot2);
  return _createClass(RandomBot, [{
    key: "play",
    value: function play(_ref6, playerID) {
      var G = _ref6.G,
        ctx = _ref6.ctx;
      var moves = this.enumerate(G, ctx, playerID);
      return Promise.resolve({
        action: this.random(moves)
      });
    }
  }]);
}(Bot);
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Make a single move on the client with a bot.
 *
 * @param {...object} client - The game client.
 * @param {...object} bot - The bot.
 */
function Step(_x, _x2) {
  return _Step.apply(this, arguments);
}
/**
 * Simulates the game till the end or a max depth.
 *
 * @param {...object} game - The game object.
 * @param {...object} bots - An array of bots.
 * @param {...object} state - The game state to start from.
 */
function _Step() {
  _Step = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(client, bot) {
    var state, playerID, _yield$bot$play, action, metadata, a;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          state = client.store.getState();
          playerID = state.ctx.currentPlayer;
          if (state.ctx.activePlayers) {
            playerID = Object.keys(state.ctx.activePlayers)[0];
          }
          _context.n = 1;
          return bot.play(state, playerID);
        case 1:
          _yield$bot$play = _context.v;
          action = _yield$bot$play.action;
          metadata = _yield$bot$play.metadata;
          if (!action) {
            _context.n = 2;
            break;
          }
          a = _objectSpread(_objectSpread({}, action), {}, {
            payload: _objectSpread(_objectSpread({}, action.payload), {}, {
              metadata: metadata
            })
          });
          client.store.dispatch(a);
          return _context.a(2, a);
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _Step.apply(this, arguments);
}
function Simulate(_x3) {
  return _Simulate.apply(this, arguments);
}
function _Simulate() {
  _Simulate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref7) {
    var game, bots, state, depth, reducer, metadata, iter, playerID, bot, t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          game = _ref7.game, bots = _ref7.bots, state = _ref7.state, depth = _ref7.depth;
          if (depth === undefined) depth = 10000;
          reducer = (0, _reducer24ea3e4c.C)({
            game: game
          });
          metadata = null;
          iter = 0;
        case 1:
          if (!(state.ctx.gameover === undefined && iter < depth)) {
            _context2.n = 4;
            break;
          }
          playerID = state.ctx.currentPlayer;
          if (state.ctx.activePlayers) {
            playerID = Object.keys(state.ctx.activePlayers)[0];
          }
          bot = bots instanceof Bot ? bots : bots[playerID];
          _context2.n = 2;
          return bot.play(state, playerID);
        case 2:
          t = _context2.v;
          if (t.action) {
            _context2.n = 3;
            break;
          }
          return _context2.a(3, 4);
        case 3:
          metadata = t.metadata;
          state = reducer(state, t.action);
          iter++;
          _context2.n = 1;
          break;
        case 4:
          return _context2.a(2, {
            state: state,
            metadata: metadata
          });
      }
    }, _callee2);
  }));
  return _Simulate.apply(this, arguments);
}
},{"./turn-order-8cc4909b.js":"node_modules/boardgame.io/dist/esm/turn-order-8cc4909b.js","./plugin-random-087f861e.js":"node_modules/boardgame.io/dist/esm/plugin-random-087f861e.js","./reducer-24ea3e4c.js":"node_modules/boardgame.io/dist/esm/reducer-24ea3e4c.js","setimmediate":"node_modules/setimmediate/setImmediate.js"}],"node_modules/boardgame.io/dist/esm/Debug-8242c26e.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.D = void 0;
exports._ = _inherits;
exports.a = _createSuper;
exports.b = _createClass;
exports.c = _defineProperty;
exports.d = _classCallCheck;
exports.e = _objectWithoutProperties;
exports.f = _objectSpread2;
var _turnOrder8cc4909b = require("./turn-order-8cc4909b.js");
var _reducer24ea3e4c = require("./reducer-24ea3e4c.js");
var _flatted = require("flatted");
var _ai7998b00f = require("./ai-7998b00f.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _ownKeys(Object(t), !0).forEach(function (r) { _defineProperty2(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : _ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty2(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf2(o), _possibleConstructorReturn2(t, _isNativeReflectConstruct2() ? Reflect.construct(o, e || [], _getPrototypeOf2(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn2(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized2(t); }
function _assertThisInitialized2(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct2() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct2 = function _isNativeReflectConstruct2() { return !!t; })(); }
function _getPrototypeOf2(t) { return _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf2(t); }
function _inherits2(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf2(t, e); }
function _setPrototypeOf2(t, e) { return _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf2(t, e); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray2(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper2(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray2(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _classCallCheck2(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function __defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass2(e, r, t) { return r && __defineProperties(e.prototype, r), t && __defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray2(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray2(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray2(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray2(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray2(r); }
function _arrayLikeToArray2(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function noop() {}
var identity = function identity(x) {
  return x;
};
function assign(tar, src) {
  // @ts-ignore
  for (var k in src) tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === 'function';
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store) {
  if (store == null) {
    return noop;
  }
  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callbacks[_key - 1] = arguments[_key];
  }
  var unsub = store.subscribe.apply(store, callbacks);
  return unsub.unsubscribe ? function () {
    return unsub.unsubscribe();
  } : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    var lets = definition[2](fn(dirty));
    if ($$scope.dirty === undefined) {
      return lets;
    }
    if (_typeof(lets) === 'object') {
      var merged = [];
      var len = Math.max($$scope.dirty.length, lets.length);
      for (var i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    var slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    var dirty = [];
    var length = $$scope.ctx.length / 32;
    for (var i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  var result = {};
  for (var k in props) if (k[0] !== '$') result[k] = props[k];
  return result;
}
function null_to_empty(value) {
  return value == null ? '' : value;
}
var is_client = typeof window !== 'undefined';
var now = is_client ? function () {
  return window.performance.now();
} : function () {
  return Date.now();
};
var raf = is_client ? function (cb) {
  return requestAnimationFrame(cb);
} : noop;
var tasks = new Set();
function run_tasks(now) {
  tasks.forEach(function (task) {
    if (!task.c(now)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
  var task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise(function (fulfill) {
      tasks.add(task = {
        c: callback,
        f: fulfill
      });
    }),
    abort: function abort() {
      tasks.delete(task);
    }
  };
}
function append(target, node) {
  target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
  var append_styles_to = get_root_for_style(target);
  if (!append_styles_to.getElementById(style_sheet_id)) {
    var style = element('style');
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}
function get_root_for_style(node) {
  if (!node) return document;
  var root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && root.host) {
    return root;
  }
  return node.ownerDocument;
}
function append_empty_stylesheet(node) {
  var style_element = element('style');
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element.sheet;
}
function append_stylesheet(node, style) {
  append(node.head || node, style);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
  for (var i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(' ');
}
function empty() {
  return text('');
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return function () {
    return node.removeEventListener(event, handler, options);
  };
}
function stop_propagation(fn) {
  return function (event) {
    event.stopPropagation();
    // @ts-ignore
    return fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
function to_number(value) {
  return value === '' ? null : +value;
}
function children(element) {
  return Array.from(element.childNodes);
}
function set_data(text, data) {
  data = '' + data;
  if (text.wholeText !== data) text.data = data;
}
function set_input_value(input, value) {
  input.value = value == null ? '' : value;
}
function select_option(select, value) {
  for (var i = 0; i < select.options.length; i += 1) {
    var option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  select.selectedIndex = -1; // no option should be selected
}
function select_value(select) {
  var selected_option = select.querySelector(':checked') || select.options[0];
  return selected_option && selected_option.__value;
}
function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$bubbles = _ref.bubbles,
    bubbles = _ref$bubbles === void 0 ? false : _ref$bubbles,
    _ref$cancelable = _ref.cancelable,
    cancelable = _ref$cancelable === void 0 ? false : _ref$cancelable;
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
var managed_styles = new Map();
var active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
  var hash = 5381;
  var i = str.length;
  while (i--) hash = (hash << 5) - hash ^ str.charCodeAt(i);
  return hash >>> 0;
}
function create_style_information(doc, node) {
  var info = {
    stylesheet: append_empty_stylesheet(node),
    rules: {}
  };
  managed_styles.set(doc, info);
  return info;
}
function create_rule(node, a, b, duration, delay, ease, fn) {
  var uid = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  var step = 16.666 / duration;
  var keyframes = '{\n';
  for (var p = 0; p <= 1; p += step) {
    var t = a + (b - a) * ease(p);
    keyframes += p * 100 + "%{".concat(fn(t, 1 - t), "}\n");
  }
  var rule = keyframes + "100% {".concat(fn(b, 1 - b), "}\n}");
  var name = "__svelte_".concat(hash(rule), "_").concat(uid);
  var doc = get_root_for_style(node);
  var _ref2 = managed_styles.get(doc) || create_style_information(doc, node),
    stylesheet = _ref2.stylesheet,
    rules = _ref2.rules;
  if (!rules[name]) {
    rules[name] = true;
    stylesheet.insertRule("@keyframes ".concat(name, " ").concat(rule), stylesheet.cssRules.length);
  }
  var animation = node.style.animation || '';
  node.style.animation = "".concat(animation ? "".concat(animation, ", ") : '').concat(name, " ").concat(duration, "ms linear ").concat(delay, "ms 1 both");
  active += 1;
  return name;
}
function delete_rule(node, name) {
  var previous = (node.style.animation || '').split(', ');
  var next = previous.filter(name ? function (anim) {
    return anim.indexOf(name) < 0;
  } // remove specific animation
  : function (anim) {
    return anim.indexOf('__svelte') === -1;
  } // remove all Svelte animations
  );
  var deleted = previous.length - next.length;
  if (deleted) {
    node.style.animation = next.join(', ');
    active -= deleted;
    if (!active) clear_rules();
  }
}
function clear_rules() {
  raf(function () {
    if (active) return;
    managed_styles.forEach(function (info) {
      var stylesheet = info.stylesheet;
      var i = stylesheet.cssRules.length;
      while (i--) stylesheet.deleteRule(i);
      info.rules = {};
    });
    managed_styles.clear();
  });
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error('Function called outside component initialization');
  return current_component;
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  var component = get_current_component();
  return function (type, detail) {
    var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref3$cancelable = _ref3.cancelable,
      cancelable = _ref3$cancelable === void 0 ? false : _ref3$cancelable;
    var callbacks = component.$$.callbacks[type];
    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      var event = custom_event(type, detail, {
        cancelable: cancelable
      });
      callbacks.slice().forEach(function (fn) {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
  var _this = this;
  var callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    // @ts-ignore
    callbacks.slice().forEach(function (fn) {
      return fn.call(_this, event);
    });
  }
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
var seen_callbacks = new Set();
var flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
  var saved_component = current_component;
  do {
    // first, call beforeUpdate functions
    // and update components
    while (flushidx < dirty_components.length) {
      var component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...
    for (var i = 0; i < render_callbacks.length; i += 1) {
      var callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    var dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var promise;
function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(function () {
      promise = null;
    });
  }
  return promise;
}
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event("".concat(direction ? 'intro' : 'outro').concat(kind)));
}
var outroing = new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(function () {
      outroing.delete(block);
      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
var null_transition = {
  duration: 0
};
function create_in_transition(node, fn, params) {
  var config = fn(node, params);
  var running = false;
  var animation_name;
  var task;
  var uid = 0;
  function cleanup() {
    if (animation_name) delete_rule(node, animation_name);
  }
  function go() {
    var _ref4 = config || null_transition,
      _ref4$delay = _ref4.delay,
      delay = _ref4$delay === void 0 ? 0 : _ref4$delay,
      _ref4$duration = _ref4.duration,
      duration = _ref4$duration === void 0 ? 300 : _ref4$duration,
      _ref4$easing = _ref4.easing,
      easing = _ref4$easing === void 0 ? identity : _ref4$easing,
      _ref4$tick = _ref4.tick,
      tick = _ref4$tick === void 0 ? noop : _ref4$tick,
      css = _ref4.css;
    if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
    tick(0, 1);
    var start_time = now() + delay;
    var end_time = start_time + duration;
    if (task) task.abort();
    running = true;
    add_render_callback(function () {
      return dispatch(node, true, 'start');
    });
    task = loop(function (now) {
      if (running) {
        if (now >= end_time) {
          tick(1, 0);
          dispatch(node, true, 'end');
          cleanup();
          return running = false;
        }
        if (now >= start_time) {
          var t = easing((now - start_time) / duration);
          tick(t, 1 - t);
        }
      }
      return running;
    });
  }
  var started = false;
  return {
    start: function start() {
      if (started) return;
      started = true;
      delete_rule(node);
      if (is_function(config)) {
        config = config();
        wait().then(go);
      } else {
        go();
      }
    },
    invalidate: function invalidate() {
      started = false;
    },
    end: function end() {
      if (running) {
        cleanup();
        running = false;
      }
    }
  };
}
function create_out_transition(node, fn, params) {
  var config = fn(node, params);
  var running = true;
  var animation_name;
  var group = outros;
  group.r += 1;
  function go() {
    var _ref5 = config || null_transition,
      _ref5$delay = _ref5.delay,
      delay = _ref5$delay === void 0 ? 0 : _ref5$delay,
      _ref5$duration = _ref5.duration,
      duration = _ref5$duration === void 0 ? 300 : _ref5$duration,
      _ref5$easing = _ref5.easing,
      easing = _ref5$easing === void 0 ? identity : _ref5$easing,
      _ref5$tick = _ref5.tick,
      tick = _ref5$tick === void 0 ? noop : _ref5$tick,
      css = _ref5.css;
    if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
    var start_time = now() + delay;
    var end_time = start_time + duration;
    add_render_callback(function () {
      return dispatch(node, false, 'start');
    });
    loop(function (now) {
      if (running) {
        if (now >= end_time) {
          tick(0, 1);
          dispatch(node, false, 'end');
          if (! --group.r) {
            // this will result in `end()` being called,
            // so we don't need to clean up here
            run_all(group.c);
          }
          return false;
        }
        if (now >= start_time) {
          var t = easing((now - start_time) / duration);
          tick(1 - t, t);
        }
      }
      return running;
    });
  }
  if (is_function(config)) {
    wait().then(function () {
      // @ts-ignore
      config = config();
      go();
    });
  } else {
    go();
  }
  return {
    end: function end(reset) {
      if (reset && config.tick) {
        config.tick(1, 0);
      }
      if (running) {
        if (animation_name) delete_rule(node, animation_name);
        running = false;
      }
    }
  };
}
function create_bidirectional_transition(node, fn, params, intro) {
  var config = fn(node, params);
  var t = intro ? 0 : 1;
  var running_program = null;
  var pending_program = null;
  var animation_name = null;
  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }
  function init(program, duration) {
    var d = program.b - t;
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d: d,
      duration: duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }
  function go(b) {
    var _ref6 = config || null_transition,
      _ref6$delay = _ref6.delay,
      delay = _ref6$delay === void 0 ? 0 : _ref6$delay,
      _ref6$duration = _ref6.duration,
      duration = _ref6$duration === void 0 ? 300 : _ref6$duration,
      _ref6$easing = _ref6.easing,
      easing = _ref6$easing === void 0 ? identity : _ref6$easing,
      _ref6$tick = _ref6.tick,
      tick = _ref6$tick === void 0 ? noop : _ref6$tick,
      css = _ref6.css;
    var program = {
      start: now() + delay,
      b: b
    };
    if (!b) {
      // @ts-ignore todo: improve typings
      program.group = outros;
      outros.r += 1;
    }
    if (running_program || pending_program) {
      pending_program = program;
    } else {
      // if this is an intro, and there's a delay, we need to do
      // an initial tick and/or apply CSS animation immediately
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }
      if (b) tick(0, 1);
      running_program = init(program, duration);
      add_render_callback(function () {
        return dispatch(node, b, 'start');
      });
      loop(function (now) {
        if (pending_program && now > pending_program.start) {
          running_program = init(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, 'start');
          if (css) {
            clear_animation();
            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
          }
        }
        if (running_program) {
          if (now >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, 'end');
            if (!pending_program) {
              // we're done
              if (running_program.b) {
                // intro — we can tidy up immediately
                clear_animation();
              } else {
                // outro — needs to be coordinated
                if (! --running_program.group.r) run_all(running_program.group.c);
              }
            }
            running_program = null;
          } else if (now >= running_program.start) {
            var p = now - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }
        return !!(running_program || pending_program);
      });
    }
  }
  return {
    run: function run(b) {
      if (is_function(config)) {
        wait().then(function () {
          // @ts-ignore
          config = config();
          go(b);
        });
      } else {
        go(b);
      }
    },
    end: function end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}
function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;
  while (i--) {
    var o = levels[i];
    var n = updates[i];
    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }
      for (var _key2 in n) {
        if (!accounted_for[_key2]) {
          update[_key2] = n[_key2];
          accounted_for[_key2] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (var _key3 in o) {
        accounted_for[_key3] = 1;
      }
    }
  }
  for (var _key4 in to_null_out) {
    if (!(_key4 in update)) update[_key4] = undefined;
  }
  return update;
}
function get_spread_object(spread_props) {
  return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  var _component$$$ = component.$$,
    fragment = _component$$$.fragment,
    on_mount = _component$$$.on_mount,
    on_destroy = _component$$$.on_destroy,
    after_update = _component$$$.after_update;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    // onMount happens before the initial afterUpdate
    add_render_callback(function () {
      var new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  var $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles) {
  var dirty = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [-1];
  var parent_component = current_component;
  set_current_component(component);
  var $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props: props,
    update: noop,
    not_equal: not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty: dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  var ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, function (i, ret) {
    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  // `false` as a special case of no DOM component
  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      var nodes = children(options.target);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
var SvelteComponent = /*#__PURE__*/function () {
  function SvelteComponent() {
    _classCallCheck2(this, SvelteComponent);
  }
  return _createClass2(SvelteComponent, [{
    key: "$destroy",
    value: function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
  }, {
    key: "$on",
    value: function $on(type, callback) {
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
  }, {
    key: "$set",
    value: function $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  }]);
}();
var subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var stop;
  var subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;
        var _iterator2 = _createForOfIteratorHelper2(subscribers),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var subscriber = _step2.value;
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        if (run_queue) {
          for (var i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run) {
    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return function () {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {
    set: set,
    update: update,
    subscribe: subscribe
  };
}
function cubicOut(t) {
  var f = t - 1.0;
  return f * f * f + 1.0;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function fly(node) {
  var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref7$delay = _ref7.delay,
    delay = _ref7$delay === void 0 ? 0 : _ref7$delay,
    _ref7$duration = _ref7.duration,
    duration = _ref7$duration === void 0 ? 400 : _ref7$duration,
    _ref7$easing = _ref7.easing,
    easing = _ref7$easing === void 0 ? cubicOut : _ref7$easing,
    _ref7$x = _ref7.x,
    x = _ref7$x === void 0 ? 0 : _ref7$x,
    _ref7$y = _ref7.y,
    y = _ref7$y === void 0 ? 0 : _ref7$y,
    _ref7$opacity = _ref7.opacity,
    opacity = _ref7$opacity === void 0 ? 0 : _ref7$opacity;
  var style = getComputedStyle(node);
  var target_opacity = +style.opacity;
  var transform = style.transform === 'none' ? '' : style.transform;
  var od = target_opacity * (1 - opacity);
  return {
    delay: delay,
    duration: duration,
    easing: easing,
    css: function css(t, u) {
      return "\n\t\t\ttransform: ".concat(transform, " translate(").concat((1 - t) * x, "px, ").concat((1 - t) * y, "px);\n\t\t\topacity: ").concat(target_opacity - od * u);
    }
  };
}
function crossfade(_a) {
  var fallback = _a.fallback,
    defaults = __rest(_a, ["fallback"]);
  var to_receive = new Map();
  var to_send = new Map();
  function crossfade(from, node, params) {
    var _assign = assign(assign({}, defaults), params),
      _assign$delay = _assign.delay,
      delay = _assign$delay === void 0 ? 0 : _assign$delay,
      _assign$duration = _assign.duration,
      duration = _assign$duration === void 0 ? function (d) {
        return Math.sqrt(d) * 30;
      } : _assign$duration,
      _assign$easing = _assign.easing,
      easing = _assign$easing === void 0 ? cubicOut : _assign$easing;
    var to = node.getBoundingClientRect();
    var dx = from.left - to.left;
    var dy = from.top - to.top;
    var dw = from.width / to.width;
    var dh = from.height / to.height;
    var d = Math.sqrt(dx * dx + dy * dy);
    var style = getComputedStyle(node);
    var transform = style.transform === 'none' ? '' : style.transform;
    var opacity = +style.opacity;
    return {
      delay: delay,
      duration: is_function(duration) ? duration(d) : duration,
      easing: easing,
      css: function css(t, u) {
        return "\n\t\t\t\topacity: ".concat(t * opacity, ";\n\t\t\t\ttransform-origin: top left;\n\t\t\t\ttransform: ").concat(transform, " translate(").concat(u * dx, "px,").concat(u * dy, "px) scale(").concat(t + (1 - t) * dw, ", ").concat(t + (1 - t) * dh, ");\n\t\t\t");
      }
    };
  }
  function transition(items, counterparts, intro) {
    return function (node, params) {
      items.set(params.key, {
        rect: node.getBoundingClientRect()
      });
      return function () {
        if (counterparts.has(params.key)) {
          var _counterparts$get = counterparts.get(params.key),
            rect = _counterparts$get.rect;
          counterparts.delete(params.key);
          return crossfade(rect, node, params);
        }
        // if the node is disappearing altogether
        // (i.e. wasn't claimed by the other list)
        // then we need to supply an outro
        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }
  return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
}

/* node_modules/svelte-icons/components/IconBase.svelte generated by Svelte v3.49.0 */

function add_css(target) {
  append_styles(target, "svelte-c8tyih", "svg.svelte-c8tyih{stroke:currentColor;fill:currentColor;stroke-width:0;width:100%;height:auto;max-height:100%}");
}

// (18:2) {#if title}
function create_if_block(ctx) {
  var title_1;
  var t;
  return {
    c: function c() {
      title_1 = svg_element("title");
      t = text(/*title*/ctx[0]);
    },
    m: function m(target, anchor) {
      insert(target, title_1, anchor);
      append(title_1, t);
    },
    p: function p(ctx, dirty) {
      if (dirty & /*title*/1) set_data(t, /*title*/ctx[0]);
    },
    d: function d(detaching) {
      if (detaching) detach(title_1);
    }
  };
}
function create_fragment(ctx) {
  var svg;
  var if_block_anchor;
  var current;
  var if_block = /*title*/ctx[0] && create_if_block(ctx);
  var default_slot_template = /*#slots*/ctx[3].default;
  var default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ctx[2], null);
  return {
    c: function c() {
      svg = svg_element("svg");
      if (if_block) if_block.c();
      if_block_anchor = empty();
      if (default_slot) default_slot.c();
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", /*viewBox*/ctx[1]);
      attr(svg, "class", "svelte-c8tyih");
    },
    m: function m(target, anchor) {
      insert(target, svg, anchor);
      if (if_block) if_block.m(svg, null);
      append(svg, if_block_anchor);
      if (default_slot) {
        default_slot.m(svg, null);
      }
      current = true;
    },
    p: function p(ctx, _ref8) {
      var _ref9 = _slicedToArray(_ref8, 1),
        dirty = _ref9[0];
      if (/*title*/ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(svg, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/4)) {
          update_slot_base(default_slot, default_slot_template, ctx, /*$$scope*/ctx[2], !current ? get_all_dirty_from_scope(/*$$scope*/ctx[2]) : get_slot_changes(default_slot_template, /*$$scope*/ctx[2], dirty, null), null);
        }
      }
      if (!current || dirty & /*viewBox*/2) {
        attr(svg, "viewBox", /*viewBox*/ctx[1]);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(svg);
      if (if_block) if_block.d();
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
    slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
    $$scope = $$props.$$scope;
  var _$$props$title = $$props.title,
    title = _$$props$title === void 0 ? null : _$$props$title;
  var viewBox = $$props.viewBox;
  $$self.$$set = function ($$props) {
    if ('title' in $$props) $$invalidate(0, title = $$props.title);
    if ('viewBox' in $$props) $$invalidate(1, viewBox = $$props.viewBox);
    if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
  };
  return [title, viewBox, $$scope, slots];
}
var IconBase = /*#__PURE__*/function (_SvelteComponent) {
  function IconBase(options) {
    var _this2;
    _classCallCheck2(this, IconBase);
    _this2 = _callSuper(this, IconBase);
    init(_this2, options, instance, create_fragment, safe_not_equal, {
      title: 0,
      viewBox: 1
    }, add_css);
    return _this2;
  }
  _inherits2(IconBase, _SvelteComponent);
  return _createClass2(IconBase);
}(SvelteComponent);
/* node_modules/svelte-icons/fa/FaChevronRight.svelte generated by Svelte v3.49.0 */
function create_default_slot(ctx) {
  var path;
  return {
    c: function c() {
      path = svg_element("path");
      attr(path, "d", "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z");
    },
    m: function m(target, anchor) {
      insert(target, path, anchor);
    },
    p: noop,
    d: function d(detaching) {
      if (detaching) detach(path);
    }
  };
}
function create_fragment$1(ctx) {
  var iconbase;
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 320 512"
  }, /*$$props*/ctx[0]];
  var iconbase_props = {
    $$slots: {
      default: [create_default_slot]
    },
    $$scope: {
      ctx: ctx
    }
  };
  for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }
  iconbase = new IconBase({
    props: iconbase_props
  });
  return {
    c: function c() {
      create_component(iconbase.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function p(ctx, _ref0) {
      var _ref1 = _slicedToArray(_ref0, 1),
        dirty = _ref1[0];
      var iconbase_changes = dirty & /*$$props*/1 ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(/*$$props*/ctx[0])]) : {};
      if (dirty & /*$$scope*/2) {
        iconbase_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }
      iconbase.$set(iconbase_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(iconbase, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  $$self.$$set = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };
  $$props = exclude_internal_props($$props);
  return [$$props];
}
var FaChevronRight = /*#__PURE__*/function (_SvelteComponent2) {
  function FaChevronRight(options) {
    var _this3;
    _classCallCheck2(this, FaChevronRight);
    _this3 = _callSuper(this, FaChevronRight);
    init(_this3, options, instance$1, create_fragment$1, safe_not_equal, {});
    return _this3;
  }
  _inherits2(FaChevronRight, _SvelteComponent2);
  return _createClass2(FaChevronRight);
}(SvelteComponent);
/* src/client/debug/Menu.svelte generated by Svelte v3.49.0 */
function add_css$1(target) {
  append_styles(target, "svelte-1xg9v5h", ".menu.svelte-1xg9v5h{display:flex;margin-top:43px;flex-direction:row-reverse;border:1px solid #ccc;border-radius:5px 5px 0 0;height:25px;line-height:25px;margin-right:-500px;transform-origin:bottom right;transform:rotate(-90deg) translate(0, -500px)}.menu-item.svelte-1xg9v5h{line-height:25px;cursor:pointer;border:0;background:#fefefe;color:#555;padding-left:15px;padding-right:15px;text-align:center}.menu-item.svelte-1xg9v5h:first-child{border-radius:0 5px 0 0}.menu-item.svelte-1xg9v5h:last-child{border-radius:5px 0 0 0}.menu-item.active.svelte-1xg9v5h{cursor:default;font-weight:bold;background:#ddd;color:#555}.menu-item.svelte-1xg9v5h:hover,.menu-item.svelte-1xg9v5h:focus{background:#eee;color:#555}");
}
function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[4] = list[i][0];
  child_ctx[5] = list[i][1].label;
  return child_ctx;
}

// (57:2) {#each Object.entries(panes) as [key, {label}
function create_each_block(ctx) {
  var button;
  var t0_value = /*label*/ctx[5] + "";
  var t0;
  var t1;
  var mounted;
  var dispose;
  function click_handler() {
    return /*click_handler*/ctx[3](/*key*/ctx[4]);
  }
  return {
    c: function c() {
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      attr(button, "class", "menu-item svelte-1xg9v5h");
      toggle_class(button, "active", /*pane*/ctx[0] == /*key*/ctx[4]);
    },
    m: function m(target, anchor) {
      insert(target, button, anchor);
      append(button, t0);
      append(button, t1);
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*panes*/2 && t0_value !== (t0_value = /*label*/ctx[5] + "")) set_data(t0, t0_value);
      if (dirty & /*pane, Object, panes*/3) {
        toggle_class(button, "active", /*pane*/ctx[0] == /*key*/ctx[4]);
      }
    },
    d: function d(detaching) {
      if (detaching) detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$2(ctx) {
  var nav;
  var each_value = Object.entries(/*panes*/ctx[1]);
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c: function c() {
      nav = element("nav");
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }
      attr(nav, "class", "menu svelte-1xg9v5h");
    },
    m: function m(target, anchor) {
      insert(target, nav, anchor);
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].m(nav, null);
      }
    },
    p: function p(ctx, _ref10) {
      var _ref11 = _slicedToArray(_ref10, 1),
        dirty = _ref11[0];
      if (dirty & /*pane, Object, panes, dispatch*/7) {
        each_value = Object.entries(/*panes*/ctx[1]);
        var _i3;
        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i3);
          if (each_blocks[_i3]) {
            each_blocks[_i3].p(child_ctx, dirty);
          } else {
            each_blocks[_i3] = create_each_block(child_ctx);
            each_blocks[_i3].c();
            each_blocks[_i3].m(nav, null);
          }
        }
        for (; _i3 < each_blocks.length; _i3 += 1) {
          each_blocks[_i3].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(nav);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  var pane = $$props.pane;
  var panes = $$props.panes;
  var dispatch = createEventDispatcher();
  var click_handler = function click_handler(key) {
    return dispatch('change', key);
  };
  $$self.$$set = function ($$props) {
    if ('pane' in $$props) $$invalidate(0, pane = $$props.pane);
    if ('panes' in $$props) $$invalidate(1, panes = $$props.panes);
  };
  return [pane, panes, dispatch, click_handler];
}
var Menu = /*#__PURE__*/function (_SvelteComponent3) {
  function Menu(options) {
    var _this4;
    _classCallCheck2(this, Menu);
    _this4 = _callSuper(this, Menu);
    init(_this4, options, instance$2, create_fragment$2, safe_not_equal, {
      pane: 0,
      panes: 1
    }, add_css$1);
    return _this4;
  }
  _inherits2(Menu, _SvelteComponent3);
  return _createClass2(Menu);
}(SvelteComponent);
var contextKey = {};

/* node_modules/svelte-json-tree-auto/src/JSONArrow.svelte generated by Svelte v3.49.0 */

function add_css$2(target) {
  append_styles(target, "svelte-1vyml86", ".container.svelte-1vyml86{display:inline-block;cursor:pointer;transform:translate(calc(0px - var(--li-identation)), -50%);position:absolute;top:50%;padding-right:100%}.arrow.svelte-1vyml86{transform-origin:25% 50%;position:relative;line-height:1.1em;font-size:0.75em;margin-left:0;transition:150ms;color:var(--arrow-sign);user-select:none;font-family:'Courier New', Courier, monospace}.expanded.svelte-1vyml86{transform:rotateZ(90deg) translateX(-3px)}");
}
function create_fragment$3(ctx) {
  var div1;
  var div0;
  var mounted;
  var dispose;
  return {
    c: function c() {
      div1 = element("div");
      div0 = element("div");
      div0.textContent = "\u25B6";
      attr(div0, "class", "arrow svelte-1vyml86");
      toggle_class(div0, "expanded", /*expanded*/ctx[0]);
      attr(div1, "class", "container svelte-1vyml86");
    },
    m: function m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      if (!mounted) {
        dispose = listen(div1, "click", /*click_handler*/ctx[1]);
        mounted = true;
      }
    },
    p: function p(ctx, _ref12) {
      var _ref13 = _slicedToArray(_ref12, 1),
        dirty = _ref13[0];
      if (dirty & /*expanded*/1) {
        toggle_class(div0, "expanded", /*expanded*/ctx[0]);
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(div1);
      mounted = false;
      dispose();
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  var expanded = $$props.expanded;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = function ($$props) {
    if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
  };
  return [expanded, click_handler];
}
var JSONArrow = /*#__PURE__*/function (_SvelteComponent4) {
  function JSONArrow(options) {
    var _this5;
    _classCallCheck2(this, JSONArrow);
    _this5 = _callSuper(this, JSONArrow);
    init(_this5, options, instance$3, create_fragment$3, safe_not_equal, {
      expanded: 0
    }, add_css$2);
    return _this5;
  }
  _inherits2(JSONArrow, _SvelteComponent4);
  return _createClass2(JSONArrow);
}(SvelteComponent);
/* node_modules/svelte-json-tree-auto/src/JSONKey.svelte generated by Svelte v3.49.0 */
function add_css$3(target) {
  append_styles(target, "svelte-1vlbacg", "label.svelte-1vlbacg{display:inline-block;color:var(--label-color);padding:0}.spaced.svelte-1vlbacg{padding-right:var(--li-colon-space)}");
}

// (16:0) {#if showKey && key}
function create_if_block$1(ctx) {
  var label;
  var span;
  var t0;
  var t1;
  var mounted;
  var dispose;
  return {
    c: function c() {
      label = element("label");
      span = element("span");
      t0 = text(/*key*/ctx[0]);
      t1 = text(/*colon*/ctx[2]);
      attr(label, "class", "svelte-1vlbacg");
      toggle_class(label, "spaced", /*isParentExpanded*/ctx[1]);
    },
    m: function m(target, anchor) {
      insert(target, label, anchor);
      append(label, span);
      append(span, t0);
      append(span, t1);
      if (!mounted) {
        dispose = listen(label, "click", /*click_handler*/ctx[5]);
        mounted = true;
      }
    },
    p: function p(ctx, dirty) {
      if (dirty & /*key*/1) set_data(t0, /*key*/ctx[0]);
      if (dirty & /*colon*/4) set_data(t1, /*colon*/ctx[2]);
      if (dirty & /*isParentExpanded*/2) {
        toggle_class(label, "spaced", /*isParentExpanded*/ctx[1]);
      }
    },
    d: function d(detaching) {
      if (detaching) detach(label);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$4(ctx) {
  var if_block_anchor;
  var if_block = /*showKey*/ctx[3] && /*key*/ctx[0] && create_if_block$1(ctx);
  return {
    c: function c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m: function m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p: function p(ctx, _ref14) {
      var _ref15 = _slicedToArray(_ref14, 1),
        dirty = _ref15[0];
      if (/*showKey*/ctx[3] && /*key*/ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$1(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  var showKey;
  var key = $$props.key,
    isParentExpanded = $$props.isParentExpanded,
    _$$props$isParentArra = $$props.isParentArray,
    isParentArray = _$$props$isParentArra === void 0 ? false : _$$props$isParentArra,
    _$$props$colon = $$props.colon,
    colon = _$$props$colon === void 0 ? ':' : _$$props$colon;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ('colon' in $$props) $$invalidate(2, colon = $$props.colon);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*isParentExpanded, isParentArray, key*/19) {
      $$invalidate(3, showKey = isParentExpanded || !isParentArray || key != +key);
    }
  };
  return [key, isParentExpanded, colon, showKey, isParentArray, click_handler];
}
var JSONKey = /*#__PURE__*/function (_SvelteComponent5) {
  function JSONKey(options) {
    var _this6;
    _classCallCheck2(this, JSONKey);
    _this6 = _callSuper(this, JSONKey);
    init(_this6, options, instance$4, create_fragment$4, safe_not_equal, {
      key: 0,
      isParentExpanded: 1,
      isParentArray: 4,
      colon: 2
    }, add_css$3);
    return _this6;
  }
  _inherits2(JSONKey, _SvelteComponent5);
  return _createClass2(JSONKey);
}(SvelteComponent);
/* node_modules/svelte-json-tree-auto/src/JSONNested.svelte generated by Svelte v3.49.0 */
function add_css$4(target) {
  append_styles(target, "svelte-rwxv37", "label.svelte-rwxv37{display:inline-block}.indent.svelte-rwxv37{padding-left:var(--li-identation)}.collapse.svelte-rwxv37{--li-display:inline;display:inline;font-style:italic}.comma.svelte-rwxv37{margin-left:-0.5em;margin-right:0.5em}label.svelte-rwxv37{position:relative}");
}
function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  child_ctx[20] = i;
  return child_ctx;
}

// (57:4) {#if expandable && isParentExpanded}
function create_if_block_3(ctx) {
  var jsonarrow;
  var current;
  jsonarrow = new JSONArrow({
    props: {
      expanded: /*expanded*/ctx[0]
    }
  });
  jsonarrow.$on("click", /*toggleExpand*/ctx[15]);
  return {
    c: function c() {
      create_component(jsonarrow.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(jsonarrow, target, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      var jsonarrow_changes = {};
      if (dirty & /*expanded*/1) jsonarrow_changes.expanded = /*expanded*/ctx[0];
      jsonarrow.$set(jsonarrow_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonarrow.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonarrow.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(jsonarrow, detaching);
    }
  };
}

// (75:4) {:else}
function create_else_block(ctx) {
  var span;
  return {
    c: function c() {
      span = element("span");
      span.textContent = "…";
    },
    m: function m(target, anchor) {
      insert(target, span, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(span);
    }
  };
}

// (63:4) {#if isParentExpanded}
function create_if_block$2(ctx) {
  var ul;
  var t;
  var current;
  var mounted;
  var dispose;
  var each_value = /*slicedKeys*/ctx[13];
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };
  var if_block = /*slicedKeys*/ctx[13].length < /*previewKeys*/ctx[7].length && create_if_block_1();
  return {
    c: function c() {
      ul = element("ul");
      for (var _i4 = 0; _i4 < each_blocks.length; _i4 += 1) {
        each_blocks[_i4].c();
      }
      t = space();
      if (if_block) if_block.c();
      attr(ul, "class", "svelte-rwxv37");
      toggle_class(ul, "collapse", ! /*expanded*/ctx[0]);
    },
    m: function m(target, anchor) {
      insert(target, ul, anchor);
      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].m(ul, null);
      }
      append(ul, t);
      if (if_block) if_block.m(ul, null);
      current = true;
      if (!mounted) {
        dispose = listen(ul, "click", /*expand*/ctx[16]);
        mounted = true;
      }
    },
    p: function p(ctx, dirty) {
      if (dirty & /*expanded, previewKeys, getKey, slicedKeys, isArray, getValue, getPreviewValue*/10129) {
        each_value = /*slicedKeys*/ctx[13];
        var _i6;
        for (_i6 = 0; _i6 < each_value.length; _i6 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i6);
          if (each_blocks[_i6]) {
            each_blocks[_i6].p(child_ctx, dirty);
            transition_in(each_blocks[_i6], 1);
          } else {
            each_blocks[_i6] = create_each_block$1(child_ctx);
            each_blocks[_i6].c();
            transition_in(each_blocks[_i6], 1);
            each_blocks[_i6].m(ul, t);
          }
        }
        group_outros();
        for (_i6 = each_value.length; _i6 < each_blocks.length; _i6 += 1) {
          out(_i6);
        }
        check_outros();
      }
      if (/*slicedKeys*/ctx[13].length < /*previewKeys*/ctx[7].length) {
        if (if_block) ;else {
          if_block = create_if_block_1();
          if_block.c();
          if_block.m(ul, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*expanded*/1) {
        toggle_class(ul, "collapse", ! /*expanded*/ctx[0]);
      }
    },
    i: function i(local) {
      if (current) return;
      for (var _i7 = 0; _i7 < each_value.length; _i7 += 1) {
        transition_in(each_blocks[_i7]);
      }
      current = true;
    },
    o: function o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        transition_out(each_blocks[_i8]);
      }
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(ul);
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
      mounted = false;
      dispose();
    }
  };
}

// (67:10) {#if !expanded && index < previewKeys.length - 1}
function create_if_block_2(ctx) {
  var span;
  return {
    c: function c() {
      span = element("span");
      span.textContent = ",";
      attr(span, "class", "comma svelte-rwxv37");
    },
    m: function m(target, anchor) {
      insert(target, span, anchor);
    },
    d: function d(detaching) {
      if (detaching) detach(span);
    }
  };
}

// (65:8) {#each slicedKeys as key, index}
function create_each_block$1(ctx) {
  var jsonnode;
  var t;
  var if_block_anchor;
  var current;
  jsonnode = new JSONNode({
    props: {
      key: /*getKey*/ctx[8](/*key*/ctx[12]),
      isParentExpanded: /*expanded*/ctx[0],
      isParentArray: /*isArray*/ctx[4],
      value: /*expanded*/ctx[0] ? /*getValue*/ctx[9](/*key*/ctx[12]) : /*getPreviewValue*/ctx[10](/*key*/ctx[12])
    }
  });
  var if_block = ! /*expanded*/ctx[0] && /*index*/ctx[20] < /*previewKeys*/ctx[7].length - 1 && create_if_block_2();
  return {
    c: function c() {
      create_component(jsonnode.$$.fragment);
      t = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m: function m(target, anchor) {
      mount_component(jsonnode, target, anchor);
      insert(target, t, anchor);
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      var jsonnode_changes = {};
      if (dirty & /*getKey, slicedKeys*/8448) jsonnode_changes.key = /*getKey*/ctx[8](/*key*/ctx[12]);
      if (dirty & /*expanded*/1) jsonnode_changes.isParentExpanded = /*expanded*/ctx[0];
      if (dirty & /*isArray*/16) jsonnode_changes.isParentArray = /*isArray*/ctx[4];
      if (dirty & /*expanded, getValue, slicedKeys, getPreviewValue*/9729) jsonnode_changes.value = /*expanded*/ctx[0] ? /*getValue*/ctx[9](/*key*/ctx[12]) : /*getPreviewValue*/ctx[10](/*key*/ctx[12]);
      jsonnode.$set(jsonnode_changes);
      if (! /*expanded*/ctx[0] && /*index*/ctx[20] < /*previewKeys*/ctx[7].length - 1) {
        if (if_block) ;else {
          if_block = create_if_block_2();
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonnode.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(jsonnode, detaching);
      if (detaching) detach(t);
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }
  };
}

// (71:8) {#if slicedKeys.length < previewKeys.length }
function create_if_block_1(ctx) {
  var span;
  return {
    c: function c() {
      span = element("span");
      span.textContent = "…";
    },
    m: function m(target, anchor) {
      insert(target, span, anchor);
    },
    d: function d(detaching) {
      if (detaching) detach(span);
    }
  };
}
function create_fragment$5(ctx) {
  var li;
  var label_1;
  var t0;
  var jsonkey;
  var t1;
  var span1;
  var span0;
  var t2;
  var t3;
  var t4;
  var current_block_type_index;
  var if_block1;
  var t5;
  var span2;
  var t6;
  var current;
  var mounted;
  var dispose;
  var if_block0 = /*expandable*/ctx[11] && /*isParentExpanded*/ctx[2] && create_if_block_3(ctx);
  jsonkey = new JSONKey({
    props: {
      key: /*key*/ctx[12],
      colon: /*context*/ctx[14].colon,
      isParentExpanded: /*isParentExpanded*/ctx[2],
      isParentArray: /*isParentArray*/ctx[3]
    }
  });
  jsonkey.$on("click", /*toggleExpand*/ctx[15]);
  var if_block_creators = [create_if_block$2, create_else_block];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if (/*isParentExpanded*/ctx[2]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c: function c() {
      li = element("li");
      label_1 = element("label");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span1 = element("span");
      span0 = element("span");
      t2 = text(/*label*/ctx[1]);
      t3 = text(/*bracketOpen*/ctx[5]);
      t4 = space();
      if_block1.c();
      t5 = space();
      span2 = element("span");
      t6 = text(/*bracketClose*/ctx[6]);
      attr(label_1, "class", "svelte-rwxv37");
      attr(li, "class", "svelte-rwxv37");
      toggle_class(li, "indent", /*isParentExpanded*/ctx[2]);
    },
    m: function m(target, anchor) {
      insert(target, li, anchor);
      append(li, label_1);
      if (if_block0) if_block0.m(label_1, null);
      append(label_1, t0);
      mount_component(jsonkey, label_1, null);
      append(label_1, t1);
      append(label_1, span1);
      append(span1, span0);
      append(span0, t2);
      append(span1, t3);
      append(li, t4);
      if_blocks[current_block_type_index].m(li, null);
      append(li, t5);
      append(li, span2);
      append(span2, t6);
      current = true;
      if (!mounted) {
        dispose = listen(span1, "click", /*toggleExpand*/ctx[15]);
        mounted = true;
      }
    },
    p: function p(ctx, _ref16) {
      var _ref17 = _slicedToArray(_ref16, 1),
        dirty = _ref17[0];
      if (/*expandable*/ctx[11] && /*isParentExpanded*/ctx[2]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty & /*expandable, isParentExpanded*/2052) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(label_1, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }
      var jsonkey_changes = {};
      if (dirty & /*key*/4096) jsonkey_changes.key = /*key*/ctx[12];
      if (dirty & /*isParentExpanded*/4) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ctx[2];
      if (dirty & /*isParentArray*/8) jsonkey_changes.isParentArray = /*isParentArray*/ctx[3];
      jsonkey.$set(jsonkey_changes);
      if (!current || dirty & /*label*/2) set_data(t2, /*label*/ctx[1]);
      if (!current || dirty & /*bracketOpen*/32) set_data(t3, /*bracketOpen*/ctx[5]);
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];
        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        } else {
          if_block1.p(ctx, dirty);
        }
        transition_in(if_block1, 1);
        if_block1.m(li, t5);
      }
      if (!current || dirty & /*bracketClose*/64) set_data(t6, /*bracketClose*/ctx[6]);
      if (dirty & /*isParentExpanded*/4) {
        toggle_class(li, "indent", /*isParentExpanded*/ctx[2]);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(jsonkey.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block0);
      transition_out(jsonkey.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(li);
      if (if_block0) if_block0.d();
      destroy_component(jsonkey);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  var slicedKeys;
  var key = $$props.key,
    keys = $$props.keys,
    _$$props$colon2 = $$props.colon,
    colon = _$$props$colon2 === void 0 ? ':' : _$$props$colon2,
    _$$props$label = $$props.label,
    label = _$$props$label === void 0 ? '' : _$$props$label,
    isParentExpanded = $$props.isParentExpanded,
    isParentArray = $$props.isParentArray,
    _$$props$isArray = $$props.isArray,
    isArray = _$$props$isArray === void 0 ? false : _$$props$isArray,
    bracketOpen = $$props.bracketOpen,
    bracketClose = $$props.bracketClose;
  var _$$props$previewKeys = $$props.previewKeys,
    previewKeys = _$$props$previewKeys === void 0 ? keys : _$$props$previewKeys;
  var _$$props$getKey = $$props.getKey,
    getKey = _$$props$getKey === void 0 ? function (key) {
      return key;
    } : _$$props$getKey;
  var _$$props$getValue = $$props.getValue,
    getValue = _$$props$getValue === void 0 ? function (key) {
      return key;
    } : _$$props$getValue;
  var _$$props$getPreviewVa = $$props.getPreviewValue,
    getPreviewValue = _$$props$getPreviewVa === void 0 ? getValue : _$$props$getPreviewVa;
  var _$$props$expanded = $$props.expanded,
    expanded = _$$props$expanded === void 0 ? false : _$$props$expanded,
    _$$props$expandable = $$props.expandable,
    expandable = _$$props$expandable === void 0 ? true : _$$props$expandable;
  var context = getContext(contextKey);
  setContext(contextKey, _objectSpread(_objectSpread({}, context), {}, {
    colon: colon
  }));
  function toggleExpand() {
    $$invalidate(0, expanded = !expanded);
  }
  function expand() {
    $$invalidate(0, expanded = true);
  }
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(12, key = $$props.key);
    if ('keys' in $$props) $$invalidate(17, keys = $$props.keys);
    if ('colon' in $$props) $$invalidate(18, colon = $$props.colon);
    if ('label' in $$props) $$invalidate(1, label = $$props.label);
    if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ('isArray' in $$props) $$invalidate(4, isArray = $$props.isArray);
    if ('bracketOpen' in $$props) $$invalidate(5, bracketOpen = $$props.bracketOpen);
    if ('bracketClose' in $$props) $$invalidate(6, bracketClose = $$props.bracketClose);
    if ('previewKeys' in $$props) $$invalidate(7, previewKeys = $$props.previewKeys);
    if ('getKey' in $$props) $$invalidate(8, getKey = $$props.getKey);
    if ('getValue' in $$props) $$invalidate(9, getValue = $$props.getValue);
    if ('getPreviewValue' in $$props) $$invalidate(10, getPreviewValue = $$props.getPreviewValue);
    if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
    if ('expandable' in $$props) $$invalidate(11, expandable = $$props.expandable);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*isParentExpanded*/4) {
      if (!isParentExpanded) {
        $$invalidate(0, expanded = false);
      }
    }
    if ($$self.$$.dirty & /*expanded, keys, previewKeys*/131201) {
      $$invalidate(13, slicedKeys = expanded ? keys : previewKeys.slice(0, 5));
    }
  };
  return [expanded, label, isParentExpanded, isParentArray, isArray, bracketOpen, bracketClose, previewKeys, getKey, getValue, getPreviewValue, expandable, key, slicedKeys, context, toggleExpand, expand, keys, colon];
}
var JSONNested = /*#__PURE__*/function (_SvelteComponent6) {
  function JSONNested(options) {
    var _this7;
    _classCallCheck2(this, JSONNested);
    _this7 = _callSuper(this, JSONNested);
    init(_this7, options, instance$5, create_fragment$5, safe_not_equal, {
      key: 12,
      keys: 17,
      colon: 18,
      label: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      isArray: 4,
      bracketOpen: 5,
      bracketClose: 6,
      previewKeys: 7,
      getKey: 8,
      getValue: 9,
      getPreviewValue: 10,
      expanded: 0,
      expandable: 11
    }, add_css$4);
    return _this7;
  }
  _inherits2(JSONNested, _SvelteComponent6);
  return _createClass2(JSONNested);
}(SvelteComponent);
/* node_modules/svelte-json-tree-auto/src/JSONObjectNode.svelte generated by Svelte v3.49.0 */
function create_fragment$6(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key: /*key*/ctx[0],
      expanded: /*expanded*/ctx[4],
      isParentExpanded: /*isParentExpanded*/ctx[1],
      isParentArray: /*isParentArray*/ctx[2],
      keys: /*keys*/ctx[5],
      previewKeys: /*keys*/ctx[5],
      getValue: /*getValue*/ctx[6],
      label: "" + (/*nodeType*/ctx[3] + " "),
      bracketOpen: '{',
      bracketClose: '}'
    }
  });
  return {
    c: function c() {
      create_component(jsonnested.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },
    p: function p(ctx, _ref18) {
      var _ref19 = _slicedToArray(_ref18, 1),
        dirty = _ref19[0];
      var jsonnested_changes = {};
      if (dirty & /*key*/1) jsonnested_changes.key = /*key*/ctx[0];
      if (dirty & /*expanded*/16) jsonnested_changes.expanded = /*expanded*/ctx[4];
      if (dirty & /*isParentExpanded*/2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ctx[1];
      if (dirty & /*isParentArray*/4) jsonnested_changes.isParentArray = /*isParentArray*/ctx[2];
      if (dirty & /*keys*/32) jsonnested_changes.keys = /*keys*/ctx[5];
      if (dirty & /*keys*/32) jsonnested_changes.previewKeys = /*keys*/ctx[5];
      if (dirty & /*nodeType*/8) jsonnested_changes.label = "" + (/*nodeType*/ctx[3] + " ");
      jsonnested.$set(jsonnested_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(jsonnested, detaching);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  var keys;
  var key = $$props.key,
    value = $$props.value,
    isParentExpanded = $$props.isParentExpanded,
    isParentArray = $$props.isParentArray,
    nodeType = $$props.nodeType;
  var _$$props$expanded2 = $$props.expanded,
    expanded = _$$props$expanded2 === void 0 ? true : _$$props$expanded2;
  function getValue(key) {
    return value[key];
  }
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(7, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
    if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*value*/128) {
      $$invalidate(5, keys = Object.getOwnPropertyNames(value));
    }
  };
  return [key, isParentExpanded, isParentArray, nodeType, expanded, keys, getValue, value];
}
var JSONObjectNode = /*#__PURE__*/function (_SvelteComponent7) {
  function JSONObjectNode(options) {
    var _this8;
    _classCallCheck2(this, JSONObjectNode);
    _this8 = _callSuper(this, JSONObjectNode);
    init(_this8, options, instance$6, create_fragment$6, safe_not_equal, {
      key: 0,
      value: 7,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3,
      expanded: 4
    });
    return _this8;
  }
  _inherits2(JSONObjectNode, _SvelteComponent7);
  return _createClass2(JSONObjectNode);
}(SvelteComponent);
/* node_modules/svelte-json-tree-auto/src/JSONArrayNode.svelte generated by Svelte v3.49.0 */
function create_fragment$7(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key: /*key*/ctx[0],
      expanded: /*expanded*/ctx[4],
      isParentExpanded: /*isParentExpanded*/ctx[2],
      isParentArray: /*isParentArray*/ctx[3],
      isArray: true,
      keys: /*keys*/ctx[5],
      previewKeys: /*previewKeys*/ctx[6],
      getValue: /*getValue*/ctx[7],
      label: "Array(" + /*value*/ctx[1].length + ")",
      bracketOpen: "[",
      bracketClose: "]"
    }
  });
  return {
    c: function c() {
      create_component(jsonnested.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },
    p: function p(ctx, _ref20) {
      var _ref21 = _slicedToArray(_ref20, 1),
        dirty = _ref21[0];
      var jsonnested_changes = {};
      if (dirty & /*key*/1) jsonnested_changes.key = /*key*/ctx[0];
      if (dirty & /*expanded*/16) jsonnested_changes.expanded = /*expanded*/ctx[4];
      if (dirty & /*isParentExpanded*/4) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ctx[2];
      if (dirty & /*isParentArray*/8) jsonnested_changes.isParentArray = /*isParentArray*/ctx[3];
      if (dirty & /*keys*/32) jsonnested_changes.keys = /*keys*/ctx[5];
      if (dirty & /*previewKeys*/64) jsonnested_changes.previewKeys = /*previewKeys*/ctx[6];
      if (dirty & /*value*/2) jsonnested_changes.label = "Array(" + /*value*/ctx[1].length + ")";
      jsonnested.$set(jsonnested_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(jsonnested, detaching);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  var keys;
  var previewKeys;
  var key = $$props.key,
    value = $$props.value,
    isParentExpanded = $$props.isParentExpanded,
    isParentArray = $$props.isParentArray;
  var _$$props$expanded3 = $$props.expanded,
    expanded = _$$props$expanded3 === void 0 ? JSON.stringify(value).length < 1024 : _$$props$expanded3;
  var filteredKey = new Set(['length']);
  function getValue(key) {
    return value[key];
  }
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*value*/2) {
      $$invalidate(5, keys = Object.getOwnPropertyNames(value));
    }
    if ($$self.$$.dirty & /*keys*/32) {
      $$invalidate(6, previewKeys = keys.filter(function (key) {
        return !filteredKey.has(key);
      }));
    }
  };
  return [key, value, isParentExpanded, isParentArray, expanded, keys, previewKeys, getValue];
}
var JSONArrayNode = /*#__PURE__*/function (_SvelteComponent8) {
  function JSONArrayNode(options) {
    var _this9;
    _classCallCheck2(this, JSONArrayNode);
    _this9 = _callSuper(this, JSONArrayNode);
    init(_this9, options, instance$7, create_fragment$7, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      expanded: 4
    });
    return _this9;
  }
  _inherits2(JSONArrayNode, _SvelteComponent8);
  return _createClass2(JSONArrayNode);
}(SvelteComponent);
/* node_modules/svelte-json-tree-auto/src/JSONIterableArrayNode.svelte generated by Svelte v3.49.0 */
function create_fragment$8(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key: /*key*/ctx[0],
      isParentExpanded: /*isParentExpanded*/ctx[1],
      isParentArray: /*isParentArray*/ctx[2],
      keys: /*keys*/ctx[4],
      getKey: getKey,
      getValue: getValue,
      isArray: true,
      label: "" + (/*nodeType*/ctx[3] + "(" + /*keys*/ctx[4].length + ")"),
      bracketOpen: '{',
      bracketClose: '}'
    }
  });
  return {
    c: function c() {
      create_component(jsonnested.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },
    p: function p(ctx, _ref22) {
      var _ref23 = _slicedToArray(_ref22, 1),
        dirty = _ref23[0];
      var jsonnested_changes = {};
      if (dirty & /*key*/1) jsonnested_changes.key = /*key*/ctx[0];
      if (dirty & /*isParentExpanded*/2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ctx[1];
      if (dirty & /*isParentArray*/4) jsonnested_changes.isParentArray = /*isParentArray*/ctx[2];
      if (dirty & /*keys*/16) jsonnested_changes.keys = /*keys*/ctx[4];
      if (dirty & /*nodeType, keys*/24) jsonnested_changes.label = "" + (/*nodeType*/ctx[3] + "(" + /*keys*/ctx[4].length + ")");
      jsonnested.$set(jsonnested_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(jsonnested, detaching);
    }
  };
}
function getKey(key) {
  return String(key[0]);
}
function getValue(key) {
  return key[1];
}
function instance$8($$self, $$props, $$invalidate) {
  var key = $$props.key,
    value = $$props.value,
    isParentExpanded = $$props.isParentExpanded,
    isParentArray = $$props.isParentArray,
    nodeType = $$props.nodeType;
  var keys = [];
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(5, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*value*/32) {
      {
        var result = [];
        var i = 0;
        var _iterator3 = _createForOfIteratorHelper2(value),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var entry = _step3.value;
            result.push([i++, entry]);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        $$invalidate(4, keys = result);
      }
    }
  };
  return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}
var JSONIterableArrayNode = /*#__PURE__*/function (_SvelteComponent9) {
  function JSONIterableArrayNode(options) {
    var _this0;
    _classCallCheck2(this, JSONIterableArrayNode);
    _this0 = _callSuper(this, JSONIterableArrayNode);
    init(_this0, options, instance$8, create_fragment$8, safe_not_equal, {
      key: 0,
      value: 5,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3
    });
    return _this0;
  }
  _inherits2(JSONIterableArrayNode, _SvelteComponent9);
  return _createClass2(JSONIterableArrayNode);
}(SvelteComponent);
var MapEntry = /*#__PURE__*/_createClass2(function MapEntry(key, value) {
  _classCallCheck2(this, MapEntry);
  this.key = key;
  this.value = value;
});
/* node_modules/svelte-json-tree-auto/src/JSONIterableMapNode.svelte generated by Svelte v3.49.0 */
function create_fragment$9(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      key: /*key*/ctx[0],
      isParentExpanded: /*isParentExpanded*/ctx[1],
      isParentArray: /*isParentArray*/ctx[2],
      keys: /*keys*/ctx[4],
      getKey: getKey$1,
      getValue: getValue$1,
      label: "" + (/*nodeType*/ctx[3] + "(" + /*keys*/ctx[4].length + ")"),
      colon: "",
      bracketOpen: '{',
      bracketClose: '}'
    }
  });
  return {
    c: function c() {
      create_component(jsonnested.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },
    p: function p(ctx, _ref24) {
      var _ref25 = _slicedToArray(_ref24, 1),
        dirty = _ref25[0];
      var jsonnested_changes = {};
      if (dirty & /*key*/1) jsonnested_changes.key = /*key*/ctx[0];
      if (dirty & /*isParentExpanded*/2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ctx[1];
      if (dirty & /*isParentArray*/4) jsonnested_changes.isParentArray = /*isParentArray*/ctx[2];
      if (dirty & /*keys*/16) jsonnested_changes.keys = /*keys*/ctx[4];
      if (dirty & /*nodeType, keys*/24) jsonnested_changes.label = "" + (/*nodeType*/ctx[3] + "(" + /*keys*/ctx[4].length + ")");
      jsonnested.$set(jsonnested_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(jsonnested, detaching);
    }
  };
}
function getKey$1(entry) {
  return entry[0];
}
function getValue$1(entry) {
  return entry[1];
}
function instance$9($$self, $$props, $$invalidate) {
  var key = $$props.key,
    value = $$props.value,
    isParentExpanded = $$props.isParentExpanded,
    isParentArray = $$props.isParentArray,
    nodeType = $$props.nodeType;
  var keys = [];
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(5, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*value*/32) {
      {
        var result = [];
        var i = 0;
        var _iterator4 = _createForOfIteratorHelper2(value),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var entry = _step4.value;
            result.push([i++, new MapEntry(entry[0], entry[1])]);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        $$invalidate(4, keys = result);
      }
    }
  };
  return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}
var JSONIterableMapNode = /*#__PURE__*/function (_SvelteComponent0) {
  function JSONIterableMapNode(options) {
    var _this1;
    _classCallCheck2(this, JSONIterableMapNode);
    _this1 = _callSuper(this, JSONIterableMapNode);
    init(_this1, options, instance$9, create_fragment$9, safe_not_equal, {
      key: 0,
      value: 5,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3
    });
    return _this1;
  }
  _inherits2(JSONIterableMapNode, _SvelteComponent0);
  return _createClass2(JSONIterableMapNode);
}(SvelteComponent);
/* node_modules/svelte-json-tree-auto/src/JSONMapEntryNode.svelte generated by Svelte v3.49.0 */
function create_fragment$a(ctx) {
  var jsonnested;
  var current;
  jsonnested = new JSONNested({
    props: {
      expanded: /*expanded*/ctx[4],
      isParentExpanded: /*isParentExpanded*/ctx[2],
      isParentArray: /*isParentArray*/ctx[3],
      key: /*isParentExpanded*/ctx[2] ? String(/*key*/ctx[0]) : /*value*/ctx[1].key,
      keys: /*keys*/ctx[5],
      getValue: /*getValue*/ctx[6],
      label: /*isParentExpanded*/ctx[2] ? 'Entry ' : '=> ',
      bracketOpen: '{',
      bracketClose: '}'
    }
  });
  return {
    c: function c() {
      create_component(jsonnested.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },
    p: function p(ctx, _ref26) {
      var _ref27 = _slicedToArray(_ref26, 1),
        dirty = _ref27[0];
      var jsonnested_changes = {};
      if (dirty & /*expanded*/16) jsonnested_changes.expanded = /*expanded*/ctx[4];
      if (dirty & /*isParentExpanded*/4) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ctx[2];
      if (dirty & /*isParentArray*/8) jsonnested_changes.isParentArray = /*isParentArray*/ctx[3];
      if (dirty & /*isParentExpanded, key, value*/7) jsonnested_changes.key = /*isParentExpanded*/ctx[2] ? String(/*key*/ctx[0]) : /*value*/ctx[1].key;
      if (dirty & /*isParentExpanded*/4) jsonnested_changes.label = /*isParentExpanded*/ctx[2] ? 'Entry ' : '=> ';
      jsonnested.$set(jsonnested_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(jsonnested, detaching);
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  var key = $$props.key,
    value = $$props.value,
    isParentExpanded = $$props.isParentExpanded,
    isParentArray = $$props.isParentArray;
  var _$$props$expanded4 = $$props.expanded,
    expanded = _$$props$expanded4 === void 0 ? false : _$$props$expanded4;
  var keys = ['key', 'value'];
  function getValue(key) {
    return value[key];
  }
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
  };
  return [key, value, isParentExpanded, isParentArray, expanded, keys, getValue];
}
var JSONMapEntryNode = /*#__PURE__*/function (_SvelteComponent1) {
  function JSONMapEntryNode(options) {
    var _this10;
    _classCallCheck2(this, JSONMapEntryNode);
    _this10 = _callSuper(this, JSONMapEntryNode);
    init(_this10, options, instance$a, create_fragment$a, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      expanded: 4
    });
    return _this10;
  }
  _inherits2(JSONMapEntryNode, _SvelteComponent1);
  return _createClass2(JSONMapEntryNode);
}(SvelteComponent);
/* node_modules/svelte-json-tree-auto/src/JSONValueNode.svelte generated by Svelte v3.49.0 */
function add_css$5(target) {
  append_styles(target, "svelte-3bjyvl", "li.svelte-3bjyvl{user-select:text;word-wrap:break-word;word-break:break-all}.indent.svelte-3bjyvl{padding-left:var(--li-identation)}.String.svelte-3bjyvl{color:var(--string-color)}.Date.svelte-3bjyvl{color:var(--date-color)}.Number.svelte-3bjyvl{color:var(--number-color)}.Boolean.svelte-3bjyvl{color:var(--boolean-color)}.Null.svelte-3bjyvl{color:var(--null-color)}.Undefined.svelte-3bjyvl{color:var(--undefined-color)}.Function.svelte-3bjyvl{color:var(--function-color);font-style:italic}.Symbol.svelte-3bjyvl{color:var(--symbol-color)}");
}
function create_fragment$b(ctx) {
  var li;
  var jsonkey;
  var t0;
  var span;
  var t1_value = (/*valueGetter*/ctx[2] ? /*valueGetter*/ctx[2](/*value*/ctx[1]) : /*value*/ctx[1]) + "";
  var t1;
  var span_class_value;
  var current;
  jsonkey = new JSONKey({
    props: {
      key: /*key*/ctx[0],
      colon: /*colon*/ctx[6],
      isParentExpanded: /*isParentExpanded*/ctx[3],
      isParentArray: /*isParentArray*/ctx[4]
    }
  });
  return {
    c: function c() {
      li = element("li");
      create_component(jsonkey.$$.fragment);
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      attr(span, "class", span_class_value = "" + (null_to_empty(/*nodeType*/ctx[5]) + " svelte-3bjyvl"));
      attr(li, "class", "svelte-3bjyvl");
      toggle_class(li, "indent", /*isParentExpanded*/ctx[3]);
    },
    m: function m(target, anchor) {
      insert(target, li, anchor);
      mount_component(jsonkey, li, null);
      append(li, t0);
      append(li, span);
      append(span, t1);
      current = true;
    },
    p: function p(ctx, _ref28) {
      var _ref29 = _slicedToArray(_ref28, 1),
        dirty = _ref29[0];
      var jsonkey_changes = {};
      if (dirty & /*key*/1) jsonkey_changes.key = /*key*/ctx[0];
      if (dirty & /*isParentExpanded*/8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ctx[3];
      if (dirty & /*isParentArray*/16) jsonkey_changes.isParentArray = /*isParentArray*/ctx[4];
      jsonkey.$set(jsonkey_changes);
      if ((!current || dirty & /*valueGetter, value*/6) && t1_value !== (t1_value = (/*valueGetter*/ctx[2] ? /*valueGetter*/ctx[2](/*value*/ctx[1]) : /*value*/ctx[1]) + "")) set_data(t1, t1_value);
      if (!current || dirty & /*nodeType*/32 && span_class_value !== (span_class_value = "" + (null_to_empty(/*nodeType*/ctx[5]) + " svelte-3bjyvl"))) {
        attr(span, "class", span_class_value);
      }
      if (dirty & /*isParentExpanded*/8) {
        toggle_class(li, "indent", /*isParentExpanded*/ctx[3]);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonkey.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonkey.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(li);
      destroy_component(jsonkey);
    }
  };
}
function instance$b($$self, $$props, $$invalidate) {
  var key = $$props.key,
    value = $$props.value,
    _$$props$valueGetter = $$props.valueGetter,
    valueGetter = _$$props$valueGetter === void 0 ? null : _$$props$valueGetter,
    isParentExpanded = $$props.isParentExpanded,
    isParentArray = $$props.isParentArray,
    nodeType = $$props.nodeType;
  var _getContext = getContext(contextKey),
    colon = _getContext.colon;
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
    if ('valueGetter' in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
    if ('isParentExpanded' in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ('nodeType' in $$props) $$invalidate(5, nodeType = $$props.nodeType);
  };
  return [key, value, valueGetter, isParentExpanded, isParentArray, nodeType, colon];
}
var JSONValueNode = /*#__PURE__*/function (_SvelteComponent10) {
  function JSONValueNode(options) {
    var _this11;
    _classCallCheck2(this, JSONValueNode);
    _this11 = _callSuper(this, JSONValueNode);
    init(_this11, options, instance$b, create_fragment$b, safe_not_equal, {
      key: 0,
      value: 1,
      valueGetter: 2,
      isParentExpanded: 3,
      isParentArray: 4,
      nodeType: 5
    }, add_css$5);
    return _this11;
  }
  _inherits2(JSONValueNode, _SvelteComponent10);
  return _createClass2(JSONValueNode);
}(SvelteComponent);
/* node_modules/svelte-json-tree-auto/src/ErrorNode.svelte generated by Svelte v3.49.0 */
function add_css$6(target) {
  append_styles(target, "svelte-1ca3gb2", "li.svelte-1ca3gb2{user-select:text;word-wrap:break-word;word-break:break-all}.indent.svelte-1ca3gb2{padding-left:var(--li-identation)}.collapse.svelte-1ca3gb2{--li-display:inline;display:inline;font-style:italic}");
}
function get_each_context$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  child_ctx[10] = i;
  return child_ctx;
}

// (40:2) {#if isParentExpanded}
function create_if_block_2$1(ctx) {
  var jsonarrow;
  var current;
  jsonarrow = new JSONArrow({
    props: {
      expanded: /*expanded*/ctx[0]
    }
  });
  jsonarrow.$on("click", /*toggleExpand*/ctx[7]);
  return {
    c: function c() {
      create_component(jsonarrow.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(jsonarrow, target, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      var jsonarrow_changes = {};
      if (dirty & /*expanded*/1) jsonarrow_changes.expanded = /*expanded*/ctx[0];
      jsonarrow.$set(jsonarrow_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonarrow.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonarrow.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(jsonarrow, detaching);
    }
  };
}

// (45:2) {#if isParentExpanded}
function create_if_block$3(ctx) {
  var ul;
  var current;
  var if_block = /*expanded*/ctx[0] && create_if_block_1$1(ctx);
  return {
    c: function c() {
      ul = element("ul");
      if (if_block) if_block.c();
      attr(ul, "class", "svelte-1ca3gb2");
      toggle_class(ul, "collapse", ! /*expanded*/ctx[0]);
    },
    m: function m(target, anchor) {
      insert(target, ul, anchor);
      if (if_block) if_block.m(ul, null);
      current = true;
    },
    p: function p(ctx, dirty) {
      if (/*expanded*/ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*expanded*/1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(ul, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
      if (dirty & /*expanded*/1) {
        toggle_class(ul, "collapse", ! /*expanded*/ctx[0]);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(ul);
      if (if_block) if_block.d();
    }
  };
}

// (47:6) {#if expanded}
function create_if_block_1$1(ctx) {
  var jsonnode;
  var t0;
  var li;
  var jsonkey;
  var t1;
  var span;
  var current;
  jsonnode = new JSONNode({
    props: {
      key: "message",
      value: /*value*/ctx[2].message
    }
  });
  jsonkey = new JSONKey({
    props: {
      key: "stack",
      colon: ":",
      isParentExpanded: /*isParentExpanded*/ctx[3]
    }
  });
  var each_value = /*stack*/ctx[5];
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  return {
    c: function c() {
      create_component(jsonnode.$$.fragment);
      t0 = space();
      li = element("li");
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span = element("span");
      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].c();
      }
      attr(li, "class", "svelte-1ca3gb2");
    },
    m: function m(target, anchor) {
      mount_component(jsonnode, target, anchor);
      insert(target, t0, anchor);
      insert(target, li, anchor);
      mount_component(jsonkey, li, null);
      append(li, t1);
      append(li, span);
      for (var _i0 = 0; _i0 < each_blocks.length; _i0 += 1) {
        each_blocks[_i0].m(span, null);
      }
      current = true;
    },
    p: function p(ctx, dirty) {
      var jsonnode_changes = {};
      if (dirty & /*value*/4) jsonnode_changes.value = /*value*/ctx[2].message;
      jsonnode.$set(jsonnode_changes);
      var jsonkey_changes = {};
      if (dirty & /*isParentExpanded*/8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ctx[3];
      jsonkey.$set(jsonkey_changes);
      if (dirty & /*stack*/32) {
        each_value = /*stack*/ctx[5];
        var _i1;
        for (_i1 = 0; _i1 < each_value.length; _i1 += 1) {
          var child_ctx = get_each_context$2(ctx, each_value, _i1);
          if (each_blocks[_i1]) {
            each_blocks[_i1].p(child_ctx, dirty);
          } else {
            each_blocks[_i1] = create_each_block$2(child_ctx);
            each_blocks[_i1].c();
            each_blocks[_i1].m(span, null);
          }
        }
        for (; _i1 < each_blocks.length; _i1 += 1) {
          each_blocks[_i1].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      transition_in(jsonkey.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonnode.$$.fragment, local);
      transition_out(jsonkey.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(jsonnode, detaching);
      if (detaching) detach(t0);
      if (detaching) detach(li);
      destroy_component(jsonkey);
      destroy_each(each_blocks, detaching);
    }
  };
}

// (52:12) {#each stack as line, index}
function create_each_block$2(ctx) {
  var span;
  var t_value = /*line*/ctx[8] + "";
  var t;
  var br;
  return {
    c: function c() {
      span = element("span");
      t = text(t_value);
      br = element("br");
      attr(span, "class", "svelte-1ca3gb2");
      toggle_class(span, "indent", /*index*/ctx[10] > 0);
    },
    m: function m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
      insert(target, br, anchor);
    },
    p: function p(ctx, dirty) {
      if (dirty & /*stack*/32 && t_value !== (t_value = /*line*/ctx[8] + "")) set_data(t, t_value);
    },
    d: function d(detaching) {
      if (detaching) detach(span);
      if (detaching) detach(br);
    }
  };
}
function create_fragment$c(ctx) {
  var li;
  var t0;
  var jsonkey;
  var t1;
  var span;
  var t2;
  var t3_value = (/*expanded*/ctx[0] ? '' : /*value*/ctx[2].message) + "";
  var t3;
  var t4;
  var current;
  var mounted;
  var dispose;
  var if_block0 = /*isParentExpanded*/ctx[3] && create_if_block_2$1(ctx);
  jsonkey = new JSONKey({
    props: {
      key: /*key*/ctx[1],
      colon: /*context*/ctx[6].colon,
      isParentExpanded: /*isParentExpanded*/ctx[3],
      isParentArray: /*isParentArray*/ctx[4]
    }
  });
  var if_block1 = /*isParentExpanded*/ctx[3] && create_if_block$3(ctx);
  return {
    c: function c() {
      li = element("li");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span = element("span");
      t2 = text("Error: ");
      t3 = text(t3_value);
      t4 = space();
      if (if_block1) if_block1.c();
      attr(li, "class", "svelte-1ca3gb2");
      toggle_class(li, "indent", /*isParentExpanded*/ctx[3]);
    },
    m: function m(target, anchor) {
      insert(target, li, anchor);
      if (if_block0) if_block0.m(li, null);
      append(li, t0);
      mount_component(jsonkey, li, null);
      append(li, t1);
      append(li, span);
      append(span, t2);
      append(span, t3);
      append(li, t4);
      if (if_block1) if_block1.m(li, null);
      current = true;
      if (!mounted) {
        dispose = listen(span, "click", /*toggleExpand*/ctx[7]);
        mounted = true;
      }
    },
    p: function p(ctx, _ref30) {
      var _ref31 = _slicedToArray(_ref30, 1),
        dirty = _ref31[0];
      if (/*isParentExpanded*/ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty & /*isParentExpanded*/8) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(li, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }
      var jsonkey_changes = {};
      if (dirty & /*key*/2) jsonkey_changes.key = /*key*/ctx[1];
      if (dirty & /*isParentExpanded*/8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ctx[3];
      if (dirty & /*isParentArray*/16) jsonkey_changes.isParentArray = /*isParentArray*/ctx[4];
      jsonkey.$set(jsonkey_changes);
      if ((!current || dirty & /*expanded, value*/5) && t3_value !== (t3_value = (/*expanded*/ctx[0] ? '' : /*value*/ctx[2].message) + "")) set_data(t3, t3_value);
      if (/*isParentExpanded*/ctx[3]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*isParentExpanded*/8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$3(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(li, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
      if (dirty & /*isParentExpanded*/8) {
        toggle_class(li, "indent", /*isParentExpanded*/ctx[3]);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(jsonkey.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block0);
      transition_out(jsonkey.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(li);
      if (if_block0) if_block0.d();
      destroy_component(jsonkey);
      if (if_block1) if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
function instance$c($$self, $$props, $$invalidate) {
  var stack;
  var key = $$props.key,
    value = $$props.value,
    isParentExpanded = $$props.isParentExpanded,
    isParentArray = $$props.isParentArray;
  var _$$props$expanded5 = $$props.expanded,
    expanded = _$$props$expanded5 === void 0 ? false : _$$props$expanded5;
  var context = getContext(contextKey);
  setContext(contextKey, _objectSpread(_objectSpread({}, context), {}, {
    colon: ':'
  }));
  function toggleExpand() {
    $$invalidate(0, expanded = !expanded);
  }
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(1, key = $$props.key);
    if ('value' in $$props) $$invalidate(2, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*value*/4) {
      $$invalidate(5, stack = value.stack.split('\n'));
    }
    if ($$self.$$.dirty & /*isParentExpanded*/8) {
      if (!isParentExpanded) {
        $$invalidate(0, expanded = false);
      }
    }
  };
  return [expanded, key, value, isParentExpanded, isParentArray, stack, context, toggleExpand];
}
var ErrorNode = /*#__PURE__*/function (_SvelteComponent11) {
  function ErrorNode(options) {
    var _this12;
    _classCallCheck2(this, ErrorNode);
    _this12 = _callSuper(this, ErrorNode);
    init(_this12, options, instance$c, create_fragment$c, safe_not_equal, {
      key: 1,
      value: 2,
      isParentExpanded: 3,
      isParentArray: 4,
      expanded: 0
    }, add_css$6);
    return _this12;
  }
  _inherits2(ErrorNode, _SvelteComponent11);
  return _createClass2(ErrorNode);
}(SvelteComponent);
function objType(obj) {
  var type = Object.prototype.toString.call(obj).slice(8, -1);
  if (type === 'Object') {
    if (typeof obj[Symbol.iterator] === 'function') {
      return 'Iterable';
    }
    return obj.constructor.name;
  }
  return type;
}

/* node_modules/svelte-json-tree-auto/src/JSONNode.svelte generated by Svelte v3.49.0 */

function create_fragment$d(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_value = /*componentType*/ctx[6];
  function switch_props(ctx) {
    return {
      props: {
        key: /*key*/ctx[0],
        value: /*value*/ctx[1],
        isParentExpanded: /*isParentExpanded*/ctx[2],
        isParentArray: /*isParentArray*/ctx[3],
        nodeType: /*nodeType*/ctx[4],
        valueGetter: /*valueGetter*/ctx[5]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c: function c() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function p(ctx, _ref32) {
      var _ref33 = _slicedToArray(_ref32, 1),
        dirty = _ref33[0];
      var switch_instance_changes = {};
      if (dirty & /*key*/1) switch_instance_changes.key = /*key*/ctx[0];
      if (dirty & /*value*/2) switch_instance_changes.value = /*value*/ctx[1];
      if (dirty & /*isParentExpanded*/4) switch_instance_changes.isParentExpanded = /*isParentExpanded*/ctx[2];
      if (dirty & /*isParentArray*/8) switch_instance_changes.isParentArray = /*isParentArray*/ctx[3];
      if (dirty & /*nodeType*/16) switch_instance_changes.nodeType = /*nodeType*/ctx[4];
      if (dirty & /*valueGetter*/32) switch_instance_changes.valueGetter = /*valueGetter*/ctx[5];
      if (switch_value !== (switch_value = /*componentType*/ctx[6])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
}
function instance$d($$self, $$props, $$invalidate) {
  var nodeType;
  var componentType;
  var valueGetter;
  var key = $$props.key,
    value = $$props.value,
    isParentExpanded = $$props.isParentExpanded,
    isParentArray = $$props.isParentArray;
  function getComponent(nodeType) {
    switch (nodeType) {
      case 'Object':
        return JSONObjectNode;
      case 'Error':
        return ErrorNode;
      case 'Array':
        return JSONArrayNode;
      case 'Iterable':
      case 'Map':
      case 'Set':
        return typeof value.set === 'function' ? JSONIterableMapNode : JSONIterableArrayNode;
      case 'MapEntry':
        return JSONMapEntryNode;
      default:
        return JSONValueNode;
    }
  }
  function getValueGetter(nodeType) {
    switch (nodeType) {
      case 'Object':
      case 'Error':
      case 'Array':
      case 'Iterable':
      case 'Map':
      case 'Set':
      case 'MapEntry':
      case 'Number':
        return undefined;
      case 'String':
        return function (raw) {
          return "\"".concat(raw, "\"");
        };
      case 'Boolean':
        return function (raw) {
          return raw ? 'true' : 'false';
        };
      case 'Date':
        return function (raw) {
          return raw.toISOString();
        };
      case 'Null':
        return function () {
          return 'null';
        };
      case 'Undefined':
        return function () {
          return 'undefined';
        };
      case 'Function':
      case 'Symbol':
        return function (raw) {
          return raw.toString();
        };
      default:
        return function () {
          return "<".concat(nodeType, ">");
        };
    }
  }
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*value*/2) {
      $$invalidate(4, nodeType = objType(value));
    }
    if ($$self.$$.dirty & /*nodeType*/16) {
      $$invalidate(6, componentType = getComponent(nodeType));
    }
    if ($$self.$$.dirty & /*nodeType*/16) {
      $$invalidate(5, valueGetter = getValueGetter(nodeType));
    }
  };
  return [key, value, isParentExpanded, isParentArray, nodeType, valueGetter, componentType];
}
var JSONNode = /*#__PURE__*/function (_SvelteComponent12) {
  function JSONNode(options) {
    var _this13;
    _classCallCheck2(this, JSONNode);
    _this13 = _callSuper(this, JSONNode);
    init(_this13, options, instance$d, create_fragment$d, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3
    });
    return _this13;
  }
  _inherits2(JSONNode, _SvelteComponent12);
  return _createClass2(JSONNode);
}(SvelteComponent);
/* node_modules/svelte-json-tree-auto/src/Root.svelte generated by Svelte v3.49.0 */
function add_css$7(target) {
  append_styles(target, "svelte-773n60", "ul.svelte-773n60{--string-color:var(--json-tree-string-color, #cb3f41);--symbol-color:var(--json-tree-symbol-color, #cb3f41);--boolean-color:var(--json-tree-boolean-color, #112aa7);--function-color:var(--json-tree-function-color, #112aa7);--number-color:var(--json-tree-number-color, #3029cf);--label-color:var(--json-tree-label-color, #871d8f);--arrow-color:var(--json-tree-arrow-color, #727272);--null-color:var(--json-tree-null-color, #8d8d8d);--undefined-color:var(--json-tree-undefined-color, #8d8d8d);--date-color:var(--json-tree-date-color, #8d8d8d);--li-identation:var(--json-tree-li-indentation, 1em);--li-line-height:var(--json-tree-li-line-height, 1.3);--li-colon-space:0.3em;font-size:var(--json-tree-font-size, 12px);font-family:var(--json-tree-font-family, 'Courier New', Courier, monospace)}ul.svelte-773n60 li{line-height:var(--li-line-height);display:var(--li-display, list-item);list-style:none}ul.svelte-773n60,ul.svelte-773n60 ul{padding:0;margin:0}");
}
function create_fragment$e(ctx) {
  var ul;
  var jsonnode;
  var current;
  jsonnode = new JSONNode({
    props: {
      key: /*key*/ctx[0],
      value: /*value*/ctx[1],
      isParentExpanded: true,
      isParentArray: false
    }
  });
  return {
    c: function c() {
      ul = element("ul");
      create_component(jsonnode.$$.fragment);
      attr(ul, "class", "svelte-773n60");
    },
    m: function m(target, anchor) {
      insert(target, ul, anchor);
      mount_component(jsonnode, ul, null);
      current = true;
    },
    p: function p(ctx, _ref34) {
      var _ref35 = _slicedToArray(_ref34, 1),
        dirty = _ref35[0];
      var jsonnode_changes = {};
      if (dirty & /*key*/1) jsonnode_changes.key = /*key*/ctx[0];
      if (dirty & /*value*/2) jsonnode_changes.value = /*value*/ctx[1];
      jsonnode.$set(jsonnode_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(jsonnode.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(ul);
      destroy_component(jsonnode);
    }
  };
}
function instance$e($$self, $$props, $$invalidate) {
  setContext(contextKey, {});
  var _$$props$key = $$props.key,
    key = _$$props$key === void 0 ? '' : _$$props$key,
    value = $$props.value;
  $$self.$$set = function ($$props) {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
  };
  return [key, value];
}
var Root = /*#__PURE__*/function (_SvelteComponent13) {
  function Root(options) {
    var _this14;
    _classCallCheck2(this, Root);
    _this14 = _callSuper(this, Root);
    init(_this14, options, instance$e, create_fragment$e, safe_not_equal, {
      key: 0,
      value: 1
    }, add_css$7);
    return _this14;
  }
  _inherits2(Root, _SvelteComponent13);
  return _createClass2(Root);
}(SvelteComponent);
/* src/client/debug/main/ClientSwitcher.svelte generated by Svelte v3.49.0 */
function add_css$8(target) {
  append_styles(target, "svelte-jvfq3i", ".svelte-jvfq3i{box-sizing:border-box}section.switcher.svelte-jvfq3i{position:sticky;bottom:0;transform:translateY(20px);margin:40px -20px 0;border-top:1px solid #999;padding:20px;background:#fff}label.svelte-jvfq3i{display:flex;align-items:baseline;gap:5px;font-weight:bold}select.svelte-jvfq3i{min-width:140px}");
}
function get_each_context$3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  child_ctx[9] = i;
  return child_ctx;
}

// (42:0) {#if debuggableClients.length > 1}
function create_if_block$4(ctx) {
  var section;
  var label;
  var t;
  var select;
  var mounted;
  var dispose;
  var each_value = /*debuggableClients*/ctx[1];
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }
  return {
    c: function c() {
      section = element("section");
      label = element("label");
      t = text("Client\n      \n      ");
      select = element("select");
      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].c();
      }
      attr(select, "id", selectId);
      attr(select, "class", "svelte-jvfq3i");
      if (/*selected*/ctx[2] === void 0) add_render_callback(function () {
        return /*select_change_handler*/ctx[6].call(select);
      });
      attr(label, "class", "svelte-jvfq3i");
      attr(section, "class", "switcher svelte-jvfq3i");
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      append(section, label);
      append(label, t);
      append(label, select);
      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].m(select, null);
      }
      select_option(select, /*selected*/ctx[2]);
      if (!mounted) {
        dispose = [listen(select, "change", /*handleSelection*/ctx[3]), listen(select, "change", /*select_change_handler*/ctx[6])];
        mounted = true;
      }
    },
    p: function p(ctx, dirty) {
      if (dirty & /*debuggableClients, JSON*/2) {
        each_value = /*debuggableClients*/ctx[1];
        var _i12;
        for (_i12 = 0; _i12 < each_value.length; _i12 += 1) {
          var child_ctx = get_each_context$3(ctx, each_value, _i12);
          if (each_blocks[_i12]) {
            each_blocks[_i12].p(child_ctx, dirty);
          } else {
            each_blocks[_i12] = create_each_block$3(child_ctx);
            each_blocks[_i12].c();
            each_blocks[_i12].m(select, null);
          }
        }
        for (; _i12 < each_blocks.length; _i12 += 1) {
          each_blocks[_i12].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & /*selected*/4) {
        select_option(select, /*selected*/ctx[2]);
      }
    },
    d: function d(detaching) {
      if (detaching) detach(section);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}

// (48:8) {#each debuggableClients as clientOption, index}
function create_each_block$3(ctx) {
  var option;
  var t0;
  var t1;
  var t2_value = JSON.stringify(/*clientOption*/ctx[7].playerID) + "";
  var t2;
  var t3;
  var t4_value = JSON.stringify(/*clientOption*/ctx[7].matchID) + "";
  var t4;
  var t5;
  var t6_value = /*clientOption*/ctx[7].game.name + "";
  var t6;
  var t7;
  var option_value_value;
  return {
    c: function c() {
      option = element("option");
      t0 = text(/*index*/ctx[9]);
      t1 = text(" —\n            playerID: ");
      t2 = text(t2_value);
      t3 = text(",\n            matchID: ");
      t4 = text(t4_value);
      t5 = text("\n            (");
      t6 = text(t6_value);
      t7 = text(")\n          ");
      option.__value = option_value_value = /*index*/ctx[9];
      option.value = option.__value;
      attr(option, "class", "svelte-jvfq3i");
    },
    m: function m(target, anchor) {
      insert(target, option, anchor);
      append(option, t0);
      append(option, t1);
      append(option, t2);
      append(option, t3);
      append(option, t4);
      append(option, t5);
      append(option, t6);
      append(option, t7);
    },
    p: function p(ctx, dirty) {
      if (dirty & /*debuggableClients*/2 && t2_value !== (t2_value = JSON.stringify(/*clientOption*/ctx[7].playerID) + "")) set_data(t2, t2_value);
      if (dirty & /*debuggableClients*/2 && t4_value !== (t4_value = JSON.stringify(/*clientOption*/ctx[7].matchID) + "")) set_data(t4, t4_value);
      if (dirty & /*debuggableClients*/2 && t6_value !== (t6_value = /*clientOption*/ctx[7].game.name + "")) set_data(t6, t6_value);
    },
    d: function d(detaching) {
      if (detaching) detach(option);
    }
  };
}
function create_fragment$f(ctx) {
  var if_block_anchor;
  var if_block = /*debuggableClients*/ctx[1].length > 1 && create_if_block$4(ctx);
  return {
    c: function c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m: function m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p: function p(ctx, _ref36) {
      var _ref37 = _slicedToArray(_ref36, 1),
        dirty = _ref37[0];
      if (/*debuggableClients*/ctx[1].length > 1) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$4(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }
  };
}
var selectId = 'bgio-debug-select-client';
function instance$f($$self, $$props, $$invalidate) {
  var client;
  var debuggableClients;
  var selected;
  var $clientManager,
    $$unsubscribe_clientManager = noop,
    $$subscribe_clientManager = function $$subscribe_clientManager() {
      return $$unsubscribe_clientManager(), $$unsubscribe_clientManager = subscribe(clientManager, function ($$value) {
        return $$invalidate(5, $clientManager = $$value);
      }), clientManager;
    };
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe_clientManager();
  });
  var clientManager = $$props.clientManager;
  $$subscribe_clientManager();
  var handleSelection = function handleSelection(e) {
    // Request to switch to the selected client.
    var selectedClient = debuggableClients[e.target.value];
    clientManager.switchToClient(selectedClient);

    // Maintain focus on the client select menu after switching clients.
    // Necessary because switching clients will usually trigger a mount/unmount.
    var select = document.getElementById(selectId);
    if (select) select.focus();
  };
  function select_change_handler() {
    selected = select_value(this);
    $$invalidate(2, selected), $$invalidate(1, debuggableClients), $$invalidate(4, client), $$invalidate(5, $clientManager);
  }
  $$self.$$set = function ($$props) {
    if ('clientManager' in $$props) $$subscribe_clientManager($$invalidate(0, clientManager = $$props.clientManager));
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*$clientManager*/32) {
      var _$clientManager;
      $$invalidate(4, (_$clientManager = $clientManager, client = _$clientManager.client, debuggableClients = _$clientManager.debuggableClients, _$clientManager), client, ($$invalidate(1, debuggableClients), $$invalidate(5, $clientManager)));
    }
    if ($$self.$$.dirty & /*debuggableClients, client*/18) {
      $$invalidate(2, selected = debuggableClients.indexOf(client));
    }
  };
  return [clientManager, debuggableClients, selected, handleSelection, client, $clientManager, select_change_handler];
}
var ClientSwitcher = /*#__PURE__*/function (_SvelteComponent14) {
  function ClientSwitcher(options) {
    var _this15;
    _classCallCheck2(this, ClientSwitcher);
    _this15 = _callSuper(this, ClientSwitcher);
    init(_this15, options, instance$f, create_fragment$f, safe_not_equal, {
      clientManager: 0
    }, add_css$8);
    return _this15;
  }
  _inherits2(ClientSwitcher, _SvelteComponent14);
  return _createClass2(ClientSwitcher);
}(SvelteComponent);
/* src/client/debug/main/Hotkey.svelte generated by Svelte v3.49.0 */
function add_css$9(target) {
  append_styles(target, "svelte-1vfj1mn", ".key.svelte-1vfj1mn.svelte-1vfj1mn{display:flex;flex-direction:row;align-items:center}button.svelte-1vfj1mn.svelte-1vfj1mn{cursor:pointer;min-width:10px;padding-left:5px;padding-right:5px;height:20px;line-height:20px;text-align:center;border:1px solid #ccc;box-shadow:1px 1px 1px #888;background:#eee;color:#444}button.svelte-1vfj1mn.svelte-1vfj1mn:hover{background:#ddd}.key.active.svelte-1vfj1mn button.svelte-1vfj1mn{background:#ddd;border:1px solid #999;box-shadow:none}label.svelte-1vfj1mn.svelte-1vfj1mn{margin-left:10px}");
}

// (78:2) {#if label}
function create_if_block$5(ctx) {
  var label_1;
  var t0;
  var t1;
  var span;
  var t2_value = "(shortcut: ".concat(/*value*/ctx[0], ")") + "";
  var t2;
  return {
    c: function c() {
      label_1 = element("label");
      t0 = text(/*label*/ctx[1]);
      t1 = space();
      span = element("span");
      t2 = text(t2_value);
      attr(span, "class", "screen-reader-only");
      attr(label_1, "for", /*id*/ctx[5]);
      attr(label_1, "class", "svelte-1vfj1mn");
    },
    m: function m(target, anchor) {
      insert(target, label_1, anchor);
      append(label_1, t0);
      append(label_1, t1);
      append(label_1, span);
      append(span, t2);
    },
    p: function p(ctx, dirty) {
      if (dirty & /*label*/2) set_data(t0, /*label*/ctx[1]);
      if (dirty & /*value*/1 && t2_value !== (t2_value = "(shortcut: ".concat(/*value*/ctx[0], ")") + "")) set_data(t2, t2_value);
    },
    d: function d(detaching) {
      if (detaching) detach(label_1);
    }
  };
}
function create_fragment$g(ctx) {
  var div;
  var button;
  var t0;
  var t1;
  var mounted;
  var dispose;
  var if_block = /*label*/ctx[1] && create_if_block$5(ctx);
  return {
    c: function c() {
      div = element("div");
      button = element("button");
      t0 = text(/*value*/ctx[0]);
      t1 = space();
      if (if_block) if_block.c();
      attr(button, "id", /*id*/ctx[5]);
      button.disabled = /*disable*/ctx[2];
      attr(button, "class", "svelte-1vfj1mn");
      attr(div, "class", "key svelte-1vfj1mn");
      toggle_class(div, "active", /*active*/ctx[3]);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      append(button, t0);
      append(div, t1);
      if (if_block) if_block.m(div, null);
      if (!mounted) {
        dispose = [listen(window, "keydown", /*Keypress*/ctx[7]), listen(button, "click", /*Activate*/ctx[6])];
        mounted = true;
      }
    },
    p: function p(ctx, _ref38) {
      var _ref39 = _slicedToArray(_ref38, 1),
        dirty = _ref39[0];
      if (dirty & /*value*/1) set_data(t0, /*value*/ctx[0]);
      if (dirty & /*disable*/4) {
        button.disabled = /*disable*/ctx[2];
      }
      if (/*label*/ctx[1]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$5(ctx);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*active*/8) {
        toggle_class(div, "active", /*active*/ctx[3]);
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(div);
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$g($$self, $$props, $$invalidate) {
  var $disableHotkeys;
  var value = $$props.value;
  var _$$props$onPress = $$props.onPress,
    onPress = _$$props$onPress === void 0 ? null : _$$props$onPress;
  var _$$props$label2 = $$props.label,
    label = _$$props$label2 === void 0 ? null : _$$props$label2;
  var _$$props$disable = $$props.disable,
    disable = _$$props$disable === void 0 ? false : _$$props$disable;
  var _getContext2 = getContext('hotkeys'),
    disableHotkeys = _getContext2.disableHotkeys;
  component_subscribe($$self, disableHotkeys, function (value) {
    return $$invalidate(9, $disableHotkeys = value);
  });
  var active = false;
  var id = "key-".concat(value);
  function Deactivate() {
    $$invalidate(3, active = false);
  }
  function Activate() {
    $$invalidate(3, active = true);
    setTimeout(Deactivate, 200);
    if (onPress) {
      setTimeout(onPress, 1);
    }
  }
  function Keypress(e) {
    if (!$disableHotkeys && !disable && !e.ctrlKey && !e.metaKey && e.key == value) {
      e.preventDefault();
      Activate();
    }
  }
  $$self.$$set = function ($$props) {
    if ('value' in $$props) $$invalidate(0, value = $$props.value);
    if ('onPress' in $$props) $$invalidate(8, onPress = $$props.onPress);
    if ('label' in $$props) $$invalidate(1, label = $$props.label);
    if ('disable' in $$props) $$invalidate(2, disable = $$props.disable);
  };
  return [value, label, disable, active, disableHotkeys, id, Activate, Keypress, onPress];
}
var Hotkey = /*#__PURE__*/function (_SvelteComponent15) {
  function Hotkey(options) {
    var _this16;
    _classCallCheck2(this, Hotkey);
    _this16 = _callSuper(this, Hotkey);
    init(_this16, options, instance$g, create_fragment$g, safe_not_equal, {
      value: 0,
      onPress: 8,
      label: 1,
      disable: 2
    }, add_css$9);
    return _this16;
  }
  _inherits2(Hotkey, _SvelteComponent15);
  return _createClass2(Hotkey);
}(SvelteComponent);
/* src/client/debug/main/InteractiveFunction.svelte generated by Svelte v3.49.0 */
function add_css$a(target) {
  append_styles(target, "svelte-1mppqmp", ".move.svelte-1mppqmp{display:flex;flex-direction:row;cursor:pointer;margin-left:10px;color:#666}.move.svelte-1mppqmp:hover{color:#333}.move.active.svelte-1mppqmp{color:#111;font-weight:bold}.arg-field.svelte-1mppqmp{outline:none;font-family:monospace}");
}
function create_fragment$h(ctx) {
  var div;
  var span0;
  var t0;
  var t1;
  var span1;
  var t3;
  var span2;
  var t4;
  var span3;
  var mounted;
  var dispose;
  return {
    c: function c() {
      div = element("div");
      span0 = element("span");
      t0 = text(/*name*/ctx[2]);
      t1 = space();
      span1 = element("span");
      span1.textContent = "(";
      t3 = space();
      span2 = element("span");
      t4 = space();
      span3 = element("span");
      span3.textContent = ")";
      attr(span2, "class", "arg-field svelte-1mppqmp");
      attr(span2, "contenteditable", "");
      attr(div, "class", "move svelte-1mppqmp");
      toggle_class(div, "active", /*active*/ctx[3]);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, span0);
      append(span0, t0);
      append(div, t1);
      append(div, span1);
      append(div, t3);
      append(div, span2);
      /*span2_binding*/
      ctx[6](span2);
      append(div, t4);
      append(div, span3);
      if (!mounted) {
        dispose = [listen(span2, "focus", function () {
          if (is_function(/*Activate*/ctx[0])) /*Activate*/ctx[0].apply(this, arguments);
        }), listen(span2, "blur", function () {
          if (is_function(/*Deactivate*/ctx[1])) /*Deactivate*/ctx[1].apply(this, arguments);
        }), listen(span2, "keypress", stop_propagation(keypress_handler)), listen(span2, "keydown", /*OnKeyDown*/ctx[5]), listen(div, "click", function () {
          if (is_function(/*Activate*/ctx[0])) /*Activate*/ctx[0].apply(this, arguments);
        })];
        mounted = true;
      }
    },
    p: function p(new_ctx, _ref40) {
      var _ref41 = _slicedToArray(_ref40, 1),
        dirty = _ref41[0];
      ctx = new_ctx;
      if (dirty & /*name*/4) set_data(t0, /*name*/ctx[2]);
      if (dirty & /*active*/8) {
        toggle_class(div, "active", /*active*/ctx[3]);
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(div);
      /*span2_binding*/
      ctx[6](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
var keypress_handler = function keypress_handler() {};
function instance$h($$self, $$props, $$invalidate) {
  var Activate = $$props.Activate;
  var Deactivate = $$props.Deactivate;
  var name = $$props.name;
  var active = $$props.active;
  var span;
  var dispatch = createEventDispatcher();
  function Submit() {
    try {
      var value = span.innerText;
      var argArray = new Function("return [".concat(value, "]"))();
      dispatch('submit', argArray);
    } catch (error) {
      dispatch('error', error);
    }
    $$invalidate(4, span.innerText = '', span);
  }
  function OnKeyDown(e) {
    if (e.key == 'Enter') {
      e.preventDefault();
      Submit();
    }
    if (e.key == 'Escape') {
      e.preventDefault();
      Deactivate();
    }
  }
  afterUpdate(function () {
    if (active) {
      span.focus();
    } else {
      span.blur();
    }
  });
  function span2_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](function () {
      span = $$value;
      $$invalidate(4, span);
    });
  }
  $$self.$$set = function ($$props) {
    if ('Activate' in $$props) $$invalidate(0, Activate = $$props.Activate);
    if ('Deactivate' in $$props) $$invalidate(1, Deactivate = $$props.Deactivate);
    if ('name' in $$props) $$invalidate(2, name = $$props.name);
    if ('active' in $$props) $$invalidate(3, active = $$props.active);
  };
  return [Activate, Deactivate, name, active, span, OnKeyDown, span2_binding];
}
var InteractiveFunction = /*#__PURE__*/function (_SvelteComponent16) {
  function InteractiveFunction(options) {
    var _this17;
    _classCallCheck2(this, InteractiveFunction);
    _this17 = _callSuper(this, InteractiveFunction);
    init(_this17, options, instance$h, create_fragment$h, safe_not_equal, {
      Activate: 0,
      Deactivate: 1,
      name: 2,
      active: 3
    }, add_css$a);
    return _this17;
  }
  _inherits2(InteractiveFunction, _SvelteComponent16);
  return _createClass2(InteractiveFunction);
}(SvelteComponent);
/* src/client/debug/main/Move.svelte generated by Svelte v3.49.0 */
function add_css$b(target) {
  append_styles(target, "svelte-smqssc", ".move-error.svelte-smqssc{color:#a00;font-weight:bold}.wrapper.svelte-smqssc{display:flex;flex-direction:row;align-items:center}");
}

// (65:2) {#if error}
function create_if_block$6(ctx) {
  var span;
  var t;
  return {
    c: function c() {
      span = element("span");
      t = text(/*error*/ctx[2]);
      attr(span, "class", "move-error svelte-smqssc");
    },
    m: function m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p: function p(ctx, dirty) {
      if (dirty & /*error*/4) set_data(t, /*error*/ctx[2]);
    },
    d: function d(detaching) {
      if (detaching) detach(span);
    }
  };
}
function create_fragment$i(ctx) {
  var div1;
  var div0;
  var hotkey;
  var t0;
  var interactivefunction;
  var t1;
  var current;
  hotkey = new Hotkey({
    props: {
      value: /*shortcut*/ctx[0],
      onPress: /*Activate*/ctx[4]
    }
  });
  interactivefunction = new InteractiveFunction({
    props: {
      Activate: /*Activate*/ctx[4],
      Deactivate: /*Deactivate*/ctx[5],
      name: /*name*/ctx[1],
      active: /*active*/ctx[3]
    }
  });
  interactivefunction.$on("submit", /*Submit*/ctx[6]);
  interactivefunction.$on("error", /*Error*/ctx[7]);
  var if_block = /*error*/ctx[2] && create_if_block$6(ctx);
  return {
    c: function c() {
      div1 = element("div");
      div0 = element("div");
      create_component(hotkey.$$.fragment);
      t0 = space();
      create_component(interactivefunction.$$.fragment);
      t1 = space();
      if (if_block) if_block.c();
      attr(div0, "class", "wrapper svelte-smqssc");
    },
    m: function m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      mount_component(hotkey, div0, null);
      append(div0, t0);
      mount_component(interactivefunction, div0, null);
      append(div1, t1);
      if (if_block) if_block.m(div1, null);
      current = true;
    },
    p: function p(ctx, _ref42) {
      var _ref43 = _slicedToArray(_ref42, 1),
        dirty = _ref43[0];
      var hotkey_changes = {};
      if (dirty & /*shortcut*/1) hotkey_changes.value = /*shortcut*/ctx[0];
      hotkey.$set(hotkey_changes);
      var interactivefunction_changes = {};
      if (dirty & /*name*/2) interactivefunction_changes.name = /*name*/ctx[1];
      if (dirty & /*active*/8) interactivefunction_changes.active = /*active*/ctx[3];
      interactivefunction.$set(interactivefunction_changes);
      if (/*error*/ctx[2]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$6(ctx);
          if_block.c();
          if_block.m(div1, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(hotkey.$$.fragment, local);
      transition_in(interactivefunction.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(hotkey.$$.fragment, local);
      transition_out(interactivefunction.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(div1);
      destroy_component(hotkey);
      destroy_component(interactivefunction);
      if (if_block) if_block.d();
    }
  };
}
function instance$i($$self, $$props, $$invalidate) {
  var shortcut = $$props.shortcut;
  var name = $$props.name;
  var fn = $$props.fn;
  var _getContext3 = getContext('hotkeys'),
    disableHotkeys = _getContext3.disableHotkeys;
  var error$1 = '';
  var active = false;
  function Activate() {
    disableHotkeys.set(true);
    $$invalidate(3, active = true);
  }
  function Deactivate() {
    disableHotkeys.set(false);
    $$invalidate(2, error$1 = '');
    $$invalidate(3, active = false);
  }
  function Submit(e) {
    $$invalidate(2, error$1 = '');
    Deactivate();
    fn.apply(this, e.detail);
  }
  function Error(e) {
    $$invalidate(2, error$1 = e.detail);
    (0, _turnOrder8cc4909b.e)(e.detail);
  }
  $$self.$$set = function ($$props) {
    if ('shortcut' in $$props) $$invalidate(0, shortcut = $$props.shortcut);
    if ('name' in $$props) $$invalidate(1, name = $$props.name);
    if ('fn' in $$props) $$invalidate(8, fn = $$props.fn);
  };
  return [shortcut, name, error$1, active, Activate, Deactivate, Submit, Error, fn];
}
var Move = /*#__PURE__*/function (_SvelteComponent17) {
  function Move(options) {
    var _this18;
    _classCallCheck2(this, Move);
    _this18 = _callSuper(this, Move);
    init(_this18, options, instance$i, create_fragment$i, safe_not_equal, {
      shortcut: 0,
      name: 1,
      fn: 8
    }, add_css$b);
    return _this18;
  }
  _inherits2(Move, _SvelteComponent17);
  return _createClass2(Move);
}(SvelteComponent);
/* src/client/debug/main/Controls.svelte generated by Svelte v3.49.0 */
function add_css$c(target) {
  append_styles(target, "svelte-9hauj9", "ul.svelte-9hauj9{padding-left:0}li.svelte-9hauj9{list-style:none;margin:0;margin-bottom:5px}");
}
function create_fragment$j(ctx) {
  var ul;
  var li0;
  var hotkey0;
  var t0;
  var li1;
  var hotkey1;
  var t1;
  var li2;
  var hotkey2;
  var t2;
  var li3;
  var hotkey3;
  var current;
  hotkey0 = new Hotkey({
    props: {
      value: "1",
      onPress: /*client*/ctx[0].reset,
      label: "reset"
    }
  });
  hotkey1 = new Hotkey({
    props: {
      value: "2",
      onPress: /*Save*/ctx[2],
      label: "save"
    }
  });
  hotkey2 = new Hotkey({
    props: {
      value: "3",
      onPress: /*Restore*/ctx[3],
      label: "restore"
    }
  });
  hotkey3 = new Hotkey({
    props: {
      value: ".",
      onPress: /*ToggleVisibility*/ctx[1],
      label: "hide"
    }
  });
  return {
    c: function c() {
      ul = element("ul");
      li0 = element("li");
      create_component(hotkey0.$$.fragment);
      t0 = space();
      li1 = element("li");
      create_component(hotkey1.$$.fragment);
      t1 = space();
      li2 = element("li");
      create_component(hotkey2.$$.fragment);
      t2 = space();
      li3 = element("li");
      create_component(hotkey3.$$.fragment);
      attr(li0, "class", "svelte-9hauj9");
      attr(li1, "class", "svelte-9hauj9");
      attr(li2, "class", "svelte-9hauj9");
      attr(li3, "class", "svelte-9hauj9");
      attr(ul, "id", "debug-controls");
      attr(ul, "class", "controls svelte-9hauj9");
    },
    m: function m(target, anchor) {
      insert(target, ul, anchor);
      append(ul, li0);
      mount_component(hotkey0, li0, null);
      append(ul, t0);
      append(ul, li1);
      mount_component(hotkey1, li1, null);
      append(ul, t1);
      append(ul, li2);
      mount_component(hotkey2, li2, null);
      append(ul, t2);
      append(ul, li3);
      mount_component(hotkey3, li3, null);
      current = true;
    },
    p: function p(ctx, _ref44) {
      var _ref45 = _slicedToArray(_ref44, 1),
        dirty = _ref45[0];
      var hotkey0_changes = {};
      if (dirty & /*client*/1) hotkey0_changes.onPress = /*client*/ctx[0].reset;
      hotkey0.$set(hotkey0_changes);
      var hotkey3_changes = {};
      if (dirty & /*ToggleVisibility*/2) hotkey3_changes.onPress = /*ToggleVisibility*/ctx[1];
      hotkey3.$set(hotkey3_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(hotkey0.$$.fragment, local);
      transition_in(hotkey1.$$.fragment, local);
      transition_in(hotkey2.$$.fragment, local);
      transition_in(hotkey3.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(hotkey0.$$.fragment, local);
      transition_out(hotkey1.$$.fragment, local);
      transition_out(hotkey2.$$.fragment, local);
      transition_out(hotkey3.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(ul);
      destroy_component(hotkey0);
      destroy_component(hotkey1);
      destroy_component(hotkey2);
      destroy_component(hotkey3);
    }
  };
}
function instance$j($$self, $$props, $$invalidate) {
  var client = $$props.client;
  var ToggleVisibility = $$props.ToggleVisibility;
  function Save() {
    // get state to persist and overwrite deltalog, _undo, and _redo
    var state = client.getState();
    var json = (0, _flatted.stringify)(_objectSpread(_objectSpread({}, state), {}, {
      _undo: [],
      _redo: [],
      deltalog: []
    }));
    window.localStorage.setItem('gamestate', json);
    window.localStorage.setItem('initialState', (0, _flatted.stringify)(client.initialState));
  }
  function Restore() {
    var gamestateJSON = window.localStorage.getItem('gamestate');
    var initialStateJSON = window.localStorage.getItem('initialState');
    if (gamestateJSON !== null && initialStateJSON !== null) {
      var gamestate = (0, _flatted.parse)(gamestateJSON);
      var initialState = (0, _flatted.parse)(initialStateJSON);
      client.store.dispatch((0, _turnOrder8cc4909b.s)({
        state: gamestate,
        initialState: initialState
      }));
    }
  }
  $$self.$$set = function ($$props) {
    if ('client' in $$props) $$invalidate(0, client = $$props.client);
    if ('ToggleVisibility' in $$props) $$invalidate(1, ToggleVisibility = $$props.ToggleVisibility);
  };
  return [client, ToggleVisibility, Save, Restore];
}
var Controls = /*#__PURE__*/function (_SvelteComponent18) {
  function Controls(options) {
    var _this19;
    _classCallCheck2(this, Controls);
    _this19 = _callSuper(this, Controls);
    init(_this19, options, instance$j, create_fragment$j, safe_not_equal, {
      client: 0,
      ToggleVisibility: 1
    }, add_css$c);
    return _this19;
  }
  _inherits2(Controls, _SvelteComponent18);
  return _createClass2(Controls);
}(SvelteComponent);
/* src/client/debug/main/PlayerInfo.svelte generated by Svelte v3.49.0 */
function add_css$d(target) {
  append_styles(target, "svelte-19aan9p", ".player-box.svelte-19aan9p{display:flex;flex-direction:row}.player.svelte-19aan9p{cursor:pointer;text-align:center;width:30px;height:30px;line-height:30px;background:#eee;border:3px solid #fefefe;box-sizing:content-box;padding:0}.player.current.svelte-19aan9p{background:#555;color:#eee;font-weight:bold}.player.active.svelte-19aan9p{border:3px solid #ff7f50}");
}
function get_each_context$4(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
}

// (59:2) {#each players as player}
function create_each_block$4(ctx) {
  var button;
  var t0_value = /*player*/ctx[7] + "";
  var t0;
  var t1;
  var button_aria_label_value;
  var mounted;
  var dispose;
  function click_handler() {
    return /*click_handler*/ctx[5](/*player*/ctx[7]);
  }
  return {
    c: function c() {
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      attr(button, "class", "player svelte-19aan9p");
      attr(button, "aria-label", button_aria_label_value = /*playerLabel*/ctx[4](/*player*/ctx[7]));
      toggle_class(button, "current", /*player*/ctx[7] == /*ctx*/ctx[0].currentPlayer);
      toggle_class(button, "active", /*player*/ctx[7] == /*playerID*/ctx[1]);
    },
    m: function m(target, anchor) {
      insert(target, button, anchor);
      append(button, t0);
      append(button, t1);
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*players*/4 && t0_value !== (t0_value = /*player*/ctx[7] + "")) set_data(t0, t0_value);
      if (dirty & /*players*/4 && button_aria_label_value !== (button_aria_label_value = /*playerLabel*/ctx[4](/*player*/ctx[7]))) {
        attr(button, "aria-label", button_aria_label_value);
      }
      if (dirty & /*players, ctx*/5) {
        toggle_class(button, "current", /*player*/ctx[7] == /*ctx*/ctx[0].currentPlayer);
      }
      if (dirty & /*players, playerID*/6) {
        toggle_class(button, "active", /*player*/ctx[7] == /*playerID*/ctx[1]);
      }
    },
    d: function d(detaching) {
      if (detaching) detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$k(ctx) {
  var div;
  var each_value = /*players*/ctx[2];
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
  }
  return {
    c: function c() {
      div = element("div");
      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
        each_blocks[_i13].c();
      }
      attr(div, "class", "player-box svelte-19aan9p");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        each_blocks[_i14].m(div, null);
      }
    },
    p: function p(ctx, _ref46) {
      var _ref47 = _slicedToArray(_ref46, 1),
        dirty = _ref47[0];
      if (dirty & /*playerLabel, players, ctx, playerID, OnClick*/31) {
        each_value = /*players*/ctx[2];
        var _i15;
        for (_i15 = 0; _i15 < each_value.length; _i15 += 1) {
          var child_ctx = get_each_context$4(ctx, each_value, _i15);
          if (each_blocks[_i15]) {
            each_blocks[_i15].p(child_ctx, dirty);
          } else {
            each_blocks[_i15] = create_each_block$4(child_ctx);
            each_blocks[_i15].c();
            each_blocks[_i15].m(div, null);
          }
        }
        for (; _i15 < each_blocks.length; _i15 += 1) {
          each_blocks[_i15].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$k($$self, $$props, $$invalidate) {
  var ctx = $$props.ctx;
  var playerID = $$props.playerID;
  var dispatch = createEventDispatcher();
  function OnClick(player) {
    if (player == playerID) {
      dispatch("change", {
        playerID: null
      });
    } else {
      dispatch("change", {
        playerID: player
      });
    }
  }
  function playerLabel(player) {
    var properties = [];
    if (player == ctx.currentPlayer) properties.push('current');
    if (player == playerID) properties.push('active');
    var label = "Player ".concat(player);
    if (properties.length) label += " (".concat(properties.join(', '), ")");
    return label;
  }
  var players;
  var click_handler = function click_handler(player) {
    return OnClick(player);
  };
  $$self.$$set = function ($$props) {
    if ('ctx' in $$props) $$invalidate(0, ctx = $$props.ctx);
    if ('playerID' in $$props) $$invalidate(1, playerID = $$props.playerID);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*ctx*/1) {
      $$invalidate(2, players = ctx ? _toConsumableArray(Array(ctx.numPlayers).keys()).map(function (i) {
        return i.toString();
      }) : []);
    }
  };
  return [ctx, playerID, players, OnClick, playerLabel, click_handler];
}
var PlayerInfo = /*#__PURE__*/function (_SvelteComponent19) {
  function PlayerInfo(options) {
    var _this20;
    _classCallCheck2(this, PlayerInfo);
    _this20 = _callSuper(this, PlayerInfo);
    init(_this20, options, instance$k, create_fragment$k, safe_not_equal, {
      ctx: 0,
      playerID: 1
    }, add_css$d);
    return _this20;
  }
  _inherits2(PlayerInfo, _SvelteComponent19);
  return _createClass2(PlayerInfo);
}(SvelteComponent);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function AssignShortcuts(moveNames, blacklist) {
  var shortcuts = {};
  var taken = {};
  var _iterator = _createForOfIteratorHelper(blacklist),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var c = _step.value;
      taken[c] = true;
    } // Try assigning the first char of each move as the shortcut.
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var t = taken;
  var canUseFirstChar = true;
  for (var name in moveNames) {
    var shortcut = name[0];
    if (t[shortcut]) {
      canUseFirstChar = false;
      break;
    }
    t[shortcut] = true;
    shortcuts[name] = shortcut;
  }
  if (canUseFirstChar) {
    return shortcuts;
  } // If those aren't unique, use a-z.

  t = taken;
  var next = 97;
  shortcuts = {};
  for (var _name in moveNames) {
    var _shortcut = String.fromCharCode(next);
    while (t[_shortcut]) {
      next++;
      _shortcut = String.fromCharCode(next);
    }
    t[_shortcut] = true;
    shortcuts[_name] = _shortcut;
  }
  return shortcuts;
}

/* src/client/debug/main/Main.svelte generated by Svelte v3.49.0 */

function add_css$e(target) {
  append_styles(target, "svelte-146sq5f", ".tree.svelte-146sq5f{--json-tree-font-family:monospace;--json-tree-font-size:14px;--json-tree-null-color:#757575}.label.svelte-146sq5f{margin-bottom:0;text-transform:none}h3.svelte-146sq5f{text-transform:uppercase}ul.svelte-146sq5f{padding-left:0}li.svelte-146sq5f{list-style:none;margin:0;margin-bottom:5px}");
}
function get_each_context$5(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[11] = list[i][0];
  child_ctx[12] = list[i][1];
  return child_ctx;
}

// (81:4) {#each Object.entries(moves) as [name, fn]}
function create_each_block$5(ctx) {
  var li;
  var move;
  var t;
  var current;
  move = new Move({
    props: {
      shortcut: /*shortcuts*/ctx[8][/*name*/ctx[11]],
      fn: /*fn*/ctx[12],
      name: /*name*/ctx[11]
    }
  });
  return {
    c: function c() {
      li = element("li");
      create_component(move.$$.fragment);
      t = space();
      attr(li, "class", "svelte-146sq5f");
    },
    m: function m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      append(li, t);
      current = true;
    },
    p: function p(ctx, dirty) {
      var move_changes = {};
      if (dirty & /*moves*/16) move_changes.shortcut = /*shortcuts*/ctx[8][/*name*/ctx[11]];
      if (dirty & /*moves*/16) move_changes.fn = /*fn*/ctx[12];
      if (dirty & /*moves*/16) move_changes.name = /*name*/ctx[11];
      move.$set(move_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }
  };
}

// (93:2) {#if ctx.activePlayers && events.endStage}
function create_if_block_2$2(ctx) {
  var li;
  var move;
  var current;
  move = new Move({
    props: {
      name: "endStage",
      shortcut: 7,
      fn: /*events*/ctx[5].endStage
    }
  });
  return {
    c: function c() {
      li = element("li");
      create_component(move.$$.fragment);
      attr(li, "class", "svelte-146sq5f");
    },
    m: function m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      current = true;
    },
    p: function p(ctx, dirty) {
      var move_changes = {};
      if (dirty & /*events*/32) move_changes.fn = /*events*/ctx[5].endStage;
      move.$set(move_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }
  };
}

// (98:2) {#if events.endTurn}
function create_if_block_1$2(ctx) {
  var li;
  var move;
  var current;
  move = new Move({
    props: {
      name: "endTurn",
      shortcut: 8,
      fn: /*events*/ctx[5].endTurn
    }
  });
  return {
    c: function c() {
      li = element("li");
      create_component(move.$$.fragment);
      attr(li, "class", "svelte-146sq5f");
    },
    m: function m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      current = true;
    },
    p: function p(ctx, dirty) {
      var move_changes = {};
      if (dirty & /*events*/32) move_changes.fn = /*events*/ctx[5].endTurn;
      move.$set(move_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }
  };
}

// (103:2) {#if ctx.phase && events.endPhase}
function create_if_block$7(ctx) {
  var li;
  var move;
  var current;
  move = new Move({
    props: {
      name: "endPhase",
      shortcut: 9,
      fn: /*events*/ctx[5].endPhase
    }
  });
  return {
    c: function c() {
      li = element("li");
      create_component(move.$$.fragment);
      attr(li, "class", "svelte-146sq5f");
    },
    m: function m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      current = true;
    },
    p: function p(ctx, dirty) {
      var move_changes = {};
      if (dirty & /*events*/32) move_changes.fn = /*events*/ctx[5].endPhase;
      move.$set(move_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }
  };
}
function create_fragment$l(ctx) {
  var section0;
  var h30;
  var t1;
  var controls;
  var t2;
  var section1;
  var h31;
  var t4;
  var playerinfo;
  var t5;
  var section2;
  var h32;
  var t7;
  var ul0;
  var t8;
  var section3;
  var h33;
  var t10;
  var ul1;
  var t11;
  var t12;
  var t13;
  var section4;
  var h34;
  var t15;
  var jsontree0;
  var t16;
  var section5;
  var h35;
  var t18;
  var jsontree1;
  var t19;
  var clientswitcher;
  var current;
  controls = new Controls({
    props: {
      client: /*client*/ctx[0],
      ToggleVisibility: /*ToggleVisibility*/ctx[2]
    }
  });
  playerinfo = new PlayerInfo({
    props: {
      ctx: /*ctx*/ctx[6],
      playerID: /*playerID*/ctx[3]
    }
  });
  playerinfo.$on("change", /*change_handler*/ctx[9]);
  var each_value = Object.entries(/*moves*/ctx[4]);
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
  }
  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };
  var if_block0 = /*ctx*/ctx[6].activePlayers && /*events*/ctx[5].endStage && create_if_block_2$2(ctx);
  var if_block1 = /*events*/ctx[5].endTurn && create_if_block_1$2(ctx);
  var if_block2 = /*ctx*/ctx[6].phase && /*events*/ctx[5].endPhase && create_if_block$7(ctx);
  jsontree0 = new Root({
    props: {
      value: /*G*/ctx[7]
    }
  });
  jsontree1 = new Root({
    props: {
      value: SanitizeCtx(/*ctx*/ctx[6])
    }
  });
  clientswitcher = new ClientSwitcher({
    props: {
      clientManager: /*clientManager*/ctx[1]
    }
  });
  return {
    c: function c() {
      section0 = element("section");
      h30 = element("h3");
      h30.textContent = "Controls";
      t1 = space();
      create_component(controls.$$.fragment);
      t2 = space();
      section1 = element("section");
      h31 = element("h3");
      h31.textContent = "Players";
      t4 = space();
      create_component(playerinfo.$$.fragment);
      t5 = space();
      section2 = element("section");
      h32 = element("h3");
      h32.textContent = "Moves";
      t7 = space();
      ul0 = element("ul");
      for (var _i16 = 0; _i16 < each_blocks.length; _i16 += 1) {
        each_blocks[_i16].c();
      }
      t8 = space();
      section3 = element("section");
      h33 = element("h3");
      h33.textContent = "Events";
      t10 = space();
      ul1 = element("ul");
      if (if_block0) if_block0.c();
      t11 = space();
      if (if_block1) if_block1.c();
      t12 = space();
      if (if_block2) if_block2.c();
      t13 = space();
      section4 = element("section");
      h34 = element("h3");
      h34.textContent = "G";
      t15 = space();
      create_component(jsontree0.$$.fragment);
      t16 = space();
      section5 = element("section");
      h35 = element("h3");
      h35.textContent = "ctx";
      t18 = space();
      create_component(jsontree1.$$.fragment);
      t19 = space();
      create_component(clientswitcher.$$.fragment);
      attr(h30, "class", "svelte-146sq5f");
      attr(h31, "class", "svelte-146sq5f");
      attr(h32, "class", "svelte-146sq5f");
      attr(ul0, "class", "svelte-146sq5f");
      attr(h33, "class", "svelte-146sq5f");
      attr(ul1, "class", "svelte-146sq5f");
      attr(h34, "class", "label svelte-146sq5f");
      attr(section4, "class", "tree svelte-146sq5f");
      attr(h35, "class", "label svelte-146sq5f");
      attr(section5, "class", "tree svelte-146sq5f");
    },
    m: function m(target, anchor) {
      insert(target, section0, anchor);
      append(section0, h30);
      append(section0, t1);
      mount_component(controls, section0, null);
      insert(target, t2, anchor);
      insert(target, section1, anchor);
      append(section1, h31);
      append(section1, t4);
      mount_component(playerinfo, section1, null);
      insert(target, t5, anchor);
      insert(target, section2, anchor);
      append(section2, h32);
      append(section2, t7);
      append(section2, ul0);
      for (var _i17 = 0; _i17 < each_blocks.length; _i17 += 1) {
        each_blocks[_i17].m(ul0, null);
      }
      insert(target, t8, anchor);
      insert(target, section3, anchor);
      append(section3, h33);
      append(section3, t10);
      append(section3, ul1);
      if (if_block0) if_block0.m(ul1, null);
      append(ul1, t11);
      if (if_block1) if_block1.m(ul1, null);
      append(ul1, t12);
      if (if_block2) if_block2.m(ul1, null);
      insert(target, t13, anchor);
      insert(target, section4, anchor);
      append(section4, h34);
      append(section4, t15);
      mount_component(jsontree0, section4, null);
      insert(target, t16, anchor);
      insert(target, section5, anchor);
      append(section5, h35);
      append(section5, t18);
      mount_component(jsontree1, section5, null);
      insert(target, t19, anchor);
      mount_component(clientswitcher, target, anchor);
      current = true;
    },
    p: function p(ctx, _ref48) {
      var _ref49 = _slicedToArray(_ref48, 1),
        dirty = _ref49[0];
      var controls_changes = {};
      if (dirty & /*client*/1) controls_changes.client = /*client*/ctx[0];
      if (dirty & /*ToggleVisibility*/4) controls_changes.ToggleVisibility = /*ToggleVisibility*/ctx[2];
      controls.$set(controls_changes);
      var playerinfo_changes = {};
      if (dirty & /*ctx*/64) playerinfo_changes.ctx = /*ctx*/ctx[6];
      if (dirty & /*playerID*/8) playerinfo_changes.playerID = /*playerID*/ctx[3];
      playerinfo.$set(playerinfo_changes);
      if (dirty & /*shortcuts, Object, moves*/272) {
        each_value = Object.entries(/*moves*/ctx[4]);
        var _i18;
        for (_i18 = 0; _i18 < each_value.length; _i18 += 1) {
          var child_ctx = get_each_context$5(ctx, each_value, _i18);
          if (each_blocks[_i18]) {
            each_blocks[_i18].p(child_ctx, dirty);
            transition_in(each_blocks[_i18], 1);
          } else {
            each_blocks[_i18] = create_each_block$5(child_ctx);
            each_blocks[_i18].c();
            transition_in(each_blocks[_i18], 1);
            each_blocks[_i18].m(ul0, null);
          }
        }
        group_outros();
        for (_i18 = each_value.length; _i18 < each_blocks.length; _i18 += 1) {
          out(_i18);
        }
        check_outros();
      }
      if (/*ctx*/ctx[6].activePlayers && /*events*/ctx[5].endStage) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty & /*ctx, events*/96) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$2(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(ul1, t11);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }
      if (/*events*/ctx[5].endTurn) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*events*/32) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(ul1, t12);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
      if (/*ctx*/ctx[6].phase && /*events*/ctx[5].endPhase) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
          if (dirty & /*ctx, events*/96) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$7(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(ul1, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, function () {
          if_block2 = null;
        });
        check_outros();
      }
      var jsontree0_changes = {};
      if (dirty & /*G*/128) jsontree0_changes.value = /*G*/ctx[7];
      jsontree0.$set(jsontree0_changes);
      var jsontree1_changes = {};
      if (dirty & /*ctx*/64) jsontree1_changes.value = SanitizeCtx(/*ctx*/ctx[6]);
      jsontree1.$set(jsontree1_changes);
      var clientswitcher_changes = {};
      if (dirty & /*clientManager*/2) clientswitcher_changes.clientManager = /*clientManager*/ctx[1];
      clientswitcher.$set(clientswitcher_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(controls.$$.fragment, local);
      transition_in(playerinfo.$$.fragment, local);
      for (var _i19 = 0; _i19 < each_value.length; _i19 += 1) {
        transition_in(each_blocks[_i19]);
      }
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      transition_in(jsontree0.$$.fragment, local);
      transition_in(jsontree1.$$.fragment, local);
      transition_in(clientswitcher.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(controls.$$.fragment, local);
      transition_out(playerinfo.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);
      for (var _i20 = 0; _i20 < each_blocks.length; _i20 += 1) {
        transition_out(each_blocks[_i20]);
      }
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      transition_out(jsontree0.$$.fragment, local);
      transition_out(jsontree1.$$.fragment, local);
      transition_out(clientswitcher.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(section0);
      destroy_component(controls);
      if (detaching) detach(t2);
      if (detaching) detach(section1);
      destroy_component(playerinfo);
      if (detaching) detach(t5);
      if (detaching) detach(section2);
      destroy_each(each_blocks, detaching);
      if (detaching) detach(t8);
      if (detaching) detach(section3);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (detaching) detach(t13);
      if (detaching) detach(section4);
      destroy_component(jsontree0);
      if (detaching) detach(t16);
      if (detaching) detach(section5);
      destroy_component(jsontree1);
      if (detaching) detach(t19);
      destroy_component(clientswitcher, detaching);
    }
  };
}
function SanitizeCtx(ctx) {
  var r = {};
  for (var key in ctx) {
    if (!key.startsWith('_')) {
      r[key] = ctx[key];
    }
  }
  return r;
}
function instance$l($$self, $$props, $$invalidate) {
  var client = $$props.client;
  var clientManager = $$props.clientManager;
  var ToggleVisibility = $$props.ToggleVisibility;
  var shortcuts = AssignShortcuts(client.moves, 'mlia');
  var _client = client,
    playerID = _client.playerID,
    moves = _client.moves,
    events = _client.events;
  var ctx = {};
  var G = {};
  var unsubscribe = client.subscribe(function (state) {
    var _state, _client2;
    if (state) $$invalidate(7, (_state = state, G = _state.G, ctx = _state.ctx, _state), G, $$invalidate(6, ctx));
    $$invalidate(3, (_client2 = client, playerID = _client2.playerID, moves = _client2.moves, events = _client2.events, _client2), playerID, $$invalidate(4, moves), $$invalidate(5, events));
  });
  onDestroy(unsubscribe);
  var change_handler = function change_handler(e) {
    return clientManager.switchPlayerID(e.detail.playerID);
  };
  $$self.$$set = function ($$props) {
    if ('client' in $$props) $$invalidate(0, client = $$props.client);
    if ('clientManager' in $$props) $$invalidate(1, clientManager = $$props.clientManager);
    if ('ToggleVisibility' in $$props) $$invalidate(2, ToggleVisibility = $$props.ToggleVisibility);
  };
  return [client, clientManager, ToggleVisibility, playerID, moves, events, ctx, G, shortcuts, change_handler];
}
var Main = /*#__PURE__*/function (_SvelteComponent20) {
  function Main(options) {
    var _this21;
    _classCallCheck2(this, Main);
    _this21 = _callSuper(this, Main);
    init(_this21, options, instance$l, create_fragment$l, safe_not_equal, {
      client: 0,
      clientManager: 1,
      ToggleVisibility: 2
    }, add_css$e);
    return _this21;
  }
  _inherits2(Main, _SvelteComponent20);
  return _createClass2(Main);
}(SvelteComponent);
/* src/client/debug/info/Item.svelte generated by Svelte v3.49.0 */
function add_css$f(target) {
  append_styles(target, "svelte-13qih23", ".item.svelte-13qih23.svelte-13qih23{padding:10px}.item.svelte-13qih23.svelte-13qih23:not(:first-child){border-top:1px dashed #aaa}.item.svelte-13qih23 div.svelte-13qih23{float:right;text-align:right}");
}
function create_fragment$m(ctx) {
  var div1;
  var strong;
  var t0;
  var t1;
  var div0;
  var t2_value = JSON.stringify(/*value*/ctx[1]) + "";
  var t2;
  return {
    c: function c() {
      div1 = element("div");
      strong = element("strong");
      t0 = text(/*name*/ctx[0]);
      t1 = space();
      div0 = element("div");
      t2 = text(t2_value);
      attr(div0, "class", "svelte-13qih23");
      attr(div1, "class", "item svelte-13qih23");
    },
    m: function m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, strong);
      append(strong, t0);
      append(div1, t1);
      append(div1, div0);
      append(div0, t2);
    },
    p: function p(ctx, _ref50) {
      var _ref51 = _slicedToArray(_ref50, 1),
        dirty = _ref51[0];
      if (dirty & /*name*/1) set_data(t0, /*name*/ctx[0]);
      if (dirty & /*value*/2 && t2_value !== (t2_value = JSON.stringify(/*value*/ctx[1]) + "")) set_data(t2, t2_value);
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(div1);
    }
  };
}
function instance$m($$self, $$props, $$invalidate) {
  var name = $$props.name;
  var value = $$props.value;
  $$self.$$set = function ($$props) {
    if ('name' in $$props) $$invalidate(0, name = $$props.name);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
  };
  return [name, value];
}
var Item = /*#__PURE__*/function (_SvelteComponent21) {
  function Item(options) {
    var _this22;
    _classCallCheck2(this, Item);
    _this22 = _callSuper(this, Item);
    init(_this22, options, instance$m, create_fragment$m, safe_not_equal, {
      name: 0,
      value: 1
    }, add_css$f);
    return _this22;
  }
  _inherits2(Item, _SvelteComponent21);
  return _createClass2(Item);
}(SvelteComponent);
/* src/client/debug/info/Info.svelte generated by Svelte v3.49.0 */
function add_css$g(target) {
  append_styles(target, "svelte-1yzq5o8", ".gameinfo.svelte-1yzq5o8{padding:10px}");
}

// (19:2) {#if client.multiplayer}
function create_if_block$8(ctx) {
  var item;
  var current;
  item = new Item({
    props: {
      name: "isConnected",
      value: /*$client*/ctx[1].isConnected
    }
  });
  return {
    c: function c() {
      create_component(item.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      var item_changes = {};
      if (dirty & /*$client*/2) item_changes.value = /*$client*/ctx[1].isConnected;
      item.$set(item_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(item, detaching);
    }
  };
}
function create_fragment$n(ctx) {
  var section;
  var item0;
  var t0;
  var item1;
  var t1;
  var item2;
  var t2;
  var current;
  item0 = new Item({
    props: {
      name: "matchID",
      value: /*client*/ctx[0].matchID
    }
  });
  item1 = new Item({
    props: {
      name: "playerID",
      value: /*client*/ctx[0].playerID
    }
  });
  item2 = new Item({
    props: {
      name: "isActive",
      value: /*$client*/ctx[1].isActive
    }
  });
  var if_block = /*client*/ctx[0].multiplayer && create_if_block$8(ctx);
  return {
    c: function c() {
      section = element("section");
      create_component(item0.$$.fragment);
      t0 = space();
      create_component(item1.$$.fragment);
      t1 = space();
      create_component(item2.$$.fragment);
      t2 = space();
      if (if_block) if_block.c();
      attr(section, "class", "gameinfo svelte-1yzq5o8");
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      mount_component(item0, section, null);
      append(section, t0);
      mount_component(item1, section, null);
      append(section, t1);
      mount_component(item2, section, null);
      append(section, t2);
      if (if_block) if_block.m(section, null);
      current = true;
    },
    p: function p(ctx, _ref52) {
      var _ref53 = _slicedToArray(_ref52, 1),
        dirty = _ref53[0];
      var item0_changes = {};
      if (dirty & /*client*/1) item0_changes.value = /*client*/ctx[0].matchID;
      item0.$set(item0_changes);
      var item1_changes = {};
      if (dirty & /*client*/1) item1_changes.value = /*client*/ctx[0].playerID;
      item1.$set(item1_changes);
      var item2_changes = {};
      if (dirty & /*$client*/2) item2_changes.value = /*$client*/ctx[1].isActive;
      item2.$set(item2_changes);
      if (/*client*/ctx[0].multiplayer) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*client*/1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$8(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(section, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(item0.$$.fragment, local);
      transition_in(item1.$$.fragment, local);
      transition_in(item2.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(item0.$$.fragment, local);
      transition_out(item1.$$.fragment, local);
      transition_out(item2.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(section);
      destroy_component(item0);
      destroy_component(item1);
      destroy_component(item2);
      if (if_block) if_block.d();
    }
  };
}
function instance$n($$self, $$props, $$invalidate) {
  var $client,
    $$unsubscribe_client = noop,
    $$subscribe_client = function $$subscribe_client() {
      return $$unsubscribe_client(), $$unsubscribe_client = subscribe(client, function ($$value) {
        return $$invalidate(1, $client = $$value);
      }), client;
    };
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe_client();
  });
  var client = $$props.client;
  $$subscribe_client();
  var clientManager = $$props.clientManager;
  var ToggleVisibility = $$props.ToggleVisibility;
  $$self.$$set = function ($$props) {
    if ('client' in $$props) $$subscribe_client($$invalidate(0, client = $$props.client));
    if ('clientManager' in $$props) $$invalidate(2, clientManager = $$props.clientManager);
    if ('ToggleVisibility' in $$props) $$invalidate(3, ToggleVisibility = $$props.ToggleVisibility);
  };
  return [client, $client, clientManager, ToggleVisibility];
}
var Info = /*#__PURE__*/function (_SvelteComponent22) {
  function Info(options) {
    var _this23;
    _classCallCheck2(this, Info);
    _this23 = _callSuper(this, Info);
    init(_this23, options, instance$n, create_fragment$n, safe_not_equal, {
      client: 0,
      clientManager: 2,
      ToggleVisibility: 3
    }, add_css$g);
    return _this23;
  }
  _inherits2(Info, _SvelteComponent22);
  return _createClass2(Info);
}(SvelteComponent);
/* src/client/debug/log/TurnMarker.svelte generated by Svelte v3.49.0 */
function add_css$h(target) {
  append_styles(target, "svelte-6eza86", ".turn-marker.svelte-6eza86{display:flex;justify-content:center;align-items:center;grid-column:1;background:#555;color:#eee;text-align:center;font-weight:bold;border:1px solid #888}");
}
function create_fragment$o(ctx) {
  var div;
  var t;
  return {
    c: function c() {
      div = element("div");
      t = text(/*turn*/ctx[0]);
      attr(div, "class", "turn-marker svelte-6eza86");
      attr(div, "style", /*style*/ctx[1]);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p: function p(ctx, _ref54) {
      var _ref55 = _slicedToArray(_ref54, 1),
        dirty = _ref55[0];
      if (dirty & /*turn*/1) set_data(t, /*turn*/ctx[0]);
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(div);
    }
  };
}
function instance$o($$self, $$props, $$invalidate) {
  var turn = $$props.turn;
  var numEvents = $$props.numEvents;
  var style = "grid-row: span ".concat(numEvents);
  $$self.$$set = function ($$props) {
    if ('turn' in $$props) $$invalidate(0, turn = $$props.turn);
    if ('numEvents' in $$props) $$invalidate(2, numEvents = $$props.numEvents);
  };
  return [turn, style, numEvents];
}
var TurnMarker = /*#__PURE__*/function (_SvelteComponent23) {
  function TurnMarker(options) {
    var _this24;
    _classCallCheck2(this, TurnMarker);
    _this24 = _callSuper(this, TurnMarker);
    init(_this24, options, instance$o, create_fragment$o, safe_not_equal, {
      turn: 0,
      numEvents: 2
    }, add_css$h);
    return _this24;
  }
  _inherits2(TurnMarker, _SvelteComponent23);
  return _createClass2(TurnMarker);
}(SvelteComponent);
/* src/client/debug/log/PhaseMarker.svelte generated by Svelte v3.49.0 */
function add_css$i(target) {
  append_styles(target, "svelte-1t4xap", ".phase-marker.svelte-1t4xap{grid-column:3;background:#555;border:1px solid #888;color:#eee;text-align:center;font-weight:bold;padding-top:10px;padding-bottom:10px;text-orientation:sideways;writing-mode:vertical-rl;line-height:30px;width:100%}");
}
function create_fragment$p(ctx) {
  var div;
  var t_value = (/*phase*/ctx[0] || '') + "";
  var t;
  return {
    c: function c() {
      div = element("div");
      t = text(t_value);
      attr(div, "class", "phase-marker svelte-1t4xap");
      attr(div, "style", /*style*/ctx[1]);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p: function p(ctx, _ref56) {
      var _ref57 = _slicedToArray(_ref56, 1),
        dirty = _ref57[0];
      if (dirty & /*phase*/1 && t_value !== (t_value = (/*phase*/ctx[0] || '') + "")) set_data(t, t_value);
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(div);
    }
  };
}
function instance$p($$self, $$props, $$invalidate) {
  var phase = $$props.phase;
  var numEvents = $$props.numEvents;
  var style = "grid-row: span ".concat(numEvents);
  $$self.$$set = function ($$props) {
    if ('phase' in $$props) $$invalidate(0, phase = $$props.phase);
    if ('numEvents' in $$props) $$invalidate(2, numEvents = $$props.numEvents);
  };
  return [phase, style, numEvents];
}
var PhaseMarker = /*#__PURE__*/function (_SvelteComponent24) {
  function PhaseMarker(options) {
    var _this25;
    _classCallCheck2(this, PhaseMarker);
    _this25 = _callSuper(this, PhaseMarker);
    init(_this25, options, instance$p, create_fragment$p, safe_not_equal, {
      phase: 0,
      numEvents: 2
    }, add_css$i);
    return _this25;
  }
  _inherits2(PhaseMarker, _SvelteComponent24);
  return _createClass2(PhaseMarker);
}(SvelteComponent);
/* src/client/debug/log/LogMetadata.svelte generated by Svelte v3.49.0 */
function create_fragment$q(ctx) {
  var div;
  return {
    c: function c() {
      div = element("div");
      div.textContent = "".concat(/*renderedMetadata*/ctx[0]);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(div);
    }
  };
}
function instance$q($$self, $$props, $$invalidate) {
  var metadata = $$props.metadata;
  var renderedMetadata = metadata !== undefined ? JSON.stringify(metadata, null, 4) : '';
  $$self.$$set = function ($$props) {
    if ('metadata' in $$props) $$invalidate(1, metadata = $$props.metadata);
  };
  return [renderedMetadata, metadata];
}
var LogMetadata = /*#__PURE__*/function (_SvelteComponent25) {
  function LogMetadata(options) {
    var _this26;
    _classCallCheck2(this, LogMetadata);
    _this26 = _callSuper(this, LogMetadata);
    init(_this26, options, instance$q, create_fragment$q, safe_not_equal, {
      metadata: 1
    });
    return _this26;
  }
  _inherits2(LogMetadata, _SvelteComponent25);
  return _createClass2(LogMetadata);
}(SvelteComponent);
/* src/client/debug/log/LogEvent.svelte generated by Svelte v3.49.0 */
function add_css$j(target) {
  append_styles(target, "svelte-vajd9z", ".log-event.svelte-vajd9z{grid-column:2;cursor:pointer;overflow:hidden;display:flex;flex-direction:column;justify-content:center;background:#fff;border:1px dotted #ccc;border-left:5px solid #ccc;padding:5px;text-align:center;color:#666;font-size:14px;min-height:25px;line-height:25px}.log-event.svelte-vajd9z:hover,.log-event.svelte-vajd9z:focus{border-style:solid;background:#eee}.log-event.pinned.svelte-vajd9z{border-style:solid;background:#eee;opacity:1}.args.svelte-vajd9z{text-align:left;white-space:pre-wrap}.player0.svelte-vajd9z{border-left-color:#ff851b}.player1.svelte-vajd9z{border-left-color:#7fdbff}.player2.svelte-vajd9z{border-left-color:#0074d9}.player3.svelte-vajd9z{border-left-color:#39cccc}.player4.svelte-vajd9z{border-left-color:#3d9970}.player5.svelte-vajd9z{border-left-color:#2ecc40}.player6.svelte-vajd9z{border-left-color:#01ff70}.player7.svelte-vajd9z{border-left-color:#ffdc00}.player8.svelte-vajd9z{border-left-color:#001f3f}.player9.svelte-vajd9z{border-left-color:#ff4136}.player10.svelte-vajd9z{border-left-color:#85144b}.player11.svelte-vajd9z{border-left-color:#f012be}.player12.svelte-vajd9z{border-left-color:#b10dc9}.player13.svelte-vajd9z{border-left-color:#111111}.player14.svelte-vajd9z{border-left-color:#aaaaaa}.player15.svelte-vajd9z{border-left-color:#dddddd}");
}

// (146:2) {:else}
function create_else_block$1(ctx) {
  var logmetadata;
  var current;
  logmetadata = new LogMetadata({
    props: {
      metadata: /*metadata*/ctx[2]
    }
  });
  return {
    c: function c() {
      create_component(logmetadata.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(logmetadata, target, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      var logmetadata_changes = {};
      if (dirty & /*metadata*/4) logmetadata_changes.metadata = /*metadata*/ctx[2];
      logmetadata.$set(logmetadata_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(logmetadata.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(logmetadata.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(logmetadata, detaching);
    }
  };
}

// (144:2) {#if metadataComponent}
function create_if_block$9(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_value = /*metadataComponent*/ctx[3];
  function switch_props(ctx) {
    return {
      props: {
        metadata: /*metadata*/ctx[2]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c: function c() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      var switch_instance_changes = {};
      if (dirty & /*metadata*/4) switch_instance_changes.metadata = /*metadata*/ctx[2];
      if (switch_value !== (switch_value = /*metadataComponent*/ctx[3])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
}
function create_fragment$r(ctx) {
  var button;
  var div;
  var t0;
  var t1;
  var t2;
  var t3;
  var t4;
  var current_block_type_index;
  var if_block;
  var button_class_value;
  var current;
  var mounted;
  var dispose;
  var if_block_creators = [create_if_block$9, create_else_block$1];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if (/*metadataComponent*/ctx[3]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c: function c() {
      button = element("button");
      div = element("div");
      t0 = text(/*actionType*/ctx[4]);
      t1 = text("(");
      t2 = text(/*renderedArgs*/ctx[6]);
      t3 = text(")");
      t4 = space();
      if_block.c();
      attr(div, "class", "args svelte-vajd9z");
      attr(button, "class", button_class_value = "log-event player" + /*playerID*/ctx[7] + " svelte-vajd9z");
      toggle_class(button, "pinned", /*pinned*/ctx[1]);
    },
    m: function m(target, anchor) {
      insert(target, button, anchor);
      append(button, div);
      append(div, t0);
      append(div, t1);
      append(div, t2);
      append(div, t3);
      append(button, t4);
      if_blocks[current_block_type_index].m(button, null);
      current = true;
      if (!mounted) {
        dispose = [listen(button, "click", /*click_handler*/ctx[9]), listen(button, "mouseenter", /*mouseenter_handler*/ctx[10]), listen(button, "focus", /*focus_handler*/ctx[11]), listen(button, "mouseleave", /*mouseleave_handler*/ctx[12]), listen(button, "blur", /*blur_handler*/ctx[13])];
        mounted = true;
      }
    },
    p: function p(ctx, _ref58) {
      var _ref59 = _slicedToArray(_ref58, 1),
        dirty = _ref59[0];
      if (!current || dirty & /*actionType*/16) set_data(t0, /*actionType*/ctx[4]);
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(button, null);
      }
      if (dirty & /*pinned*/2) {
        toggle_class(button, "pinned", /*pinned*/ctx[1]);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(button);
      if_blocks[current_block_type_index].d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$r($$self, $$props, $$invalidate) {
  var logIndex = $$props.logIndex;
  var action = $$props.action;
  var pinned = $$props.pinned;
  var metadata = $$props.metadata;
  var metadataComponent = $$props.metadataComponent;
  var dispatch = createEventDispatcher();
  var args = action.payload.args;
  var renderedArgs = Array.isArray(args) ? args.map(function (arg) {
    return JSON.stringify(arg, null, 2);
  }).join(',') : JSON.stringify(args, null, 2) || '';
  var playerID = action.payload.playerID;
  var actionType;
  switch (action.type) {
    case 'UNDO':
      actionType = 'undo';
      break;
    case 'REDO':
      actionType = 'redo';
    case 'GAME_EVENT':
    case 'MAKE_MOVE':
    default:
      actionType = action.payload.type;
      break;
  }
  var click_handler = function click_handler() {
    return dispatch('click', {
      logIndex: logIndex
    });
  };
  var mouseenter_handler = function mouseenter_handler() {
    return dispatch('mouseenter', {
      logIndex: logIndex
    });
  };
  var focus_handler = function focus_handler() {
    return dispatch('mouseenter', {
      logIndex: logIndex
    });
  };
  var mouseleave_handler = function mouseleave_handler() {
    return dispatch('mouseleave');
  };
  var blur_handler = function blur_handler() {
    return dispatch('mouseleave');
  };
  $$self.$$set = function ($$props) {
    if ('logIndex' in $$props) $$invalidate(0, logIndex = $$props.logIndex);
    if ('action' in $$props) $$invalidate(8, action = $$props.action);
    if ('pinned' in $$props) $$invalidate(1, pinned = $$props.pinned);
    if ('metadata' in $$props) $$invalidate(2, metadata = $$props.metadata);
    if ('metadataComponent' in $$props) $$invalidate(3, metadataComponent = $$props.metadataComponent);
  };
  return [logIndex, pinned, metadata, metadataComponent, actionType, dispatch, renderedArgs, playerID, action, click_handler, mouseenter_handler, focus_handler, mouseleave_handler, blur_handler];
}
var LogEvent = /*#__PURE__*/function (_SvelteComponent26) {
  function LogEvent(options) {
    var _this27;
    _classCallCheck2(this, LogEvent);
    _this27 = _callSuper(this, LogEvent);
    init(_this27, options, instance$r, create_fragment$r, safe_not_equal, {
      logIndex: 0,
      action: 8,
      pinned: 1,
      metadata: 2,
      metadataComponent: 3
    }, add_css$j);
    return _this27;
  }
  _inherits2(LogEvent, _SvelteComponent26);
  return _createClass2(LogEvent);
}(SvelteComponent);
/* node_modules/svelte-icons/fa/FaArrowAltCircleDown.svelte generated by Svelte v3.49.0 */
function create_default_slot$1(ctx) {
  var path;
  return {
    c: function c() {
      path = svg_element("path");
      attr(path, "d", "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z");
    },
    m: function m(target, anchor) {
      insert(target, path, anchor);
    },
    p: noop,
    d: function d(detaching) {
      if (detaching) detach(path);
    }
  };
}
function create_fragment$s(ctx) {
  var iconbase;
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 512 512"
  }, /*$$props*/ctx[0]];
  var iconbase_props = {
    $$slots: {
      default: [create_default_slot$1]
    },
    $$scope: {
      ctx: ctx
    }
  };
  for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }
  iconbase = new IconBase({
    props: iconbase_props
  });
  return {
    c: function c() {
      create_component(iconbase.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function p(ctx, _ref60) {
      var _ref61 = _slicedToArray(_ref60, 1),
        dirty = _ref61[0];
      var iconbase_changes = dirty & /*$$props*/1 ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(/*$$props*/ctx[0])]) : {};
      if (dirty & /*$$scope*/2) {
        iconbase_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }
      iconbase.$set(iconbase_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(iconbase, detaching);
    }
  };
}
function instance$s($$self, $$props, $$invalidate) {
  $$self.$$set = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };
  $$props = exclude_internal_props($$props);
  return [$$props];
}
var FaArrowAltCircleDown = /*#__PURE__*/function (_SvelteComponent27) {
  function FaArrowAltCircleDown(options) {
    var _this28;
    _classCallCheck2(this, FaArrowAltCircleDown);
    _this28 = _callSuper(this, FaArrowAltCircleDown);
    init(_this28, options, instance$s, create_fragment$s, safe_not_equal, {});
    return _this28;
  }
  _inherits2(FaArrowAltCircleDown, _SvelteComponent27);
  return _createClass2(FaArrowAltCircleDown);
}(SvelteComponent);
/* src/client/debug/mcts/Action.svelte generated by Svelte v3.49.0 */
function add_css$k(target) {
  append_styles(target, "svelte-1a7time", "div.svelte-1a7time{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:500px}");
}
function create_fragment$t(ctx) {
  var div;
  var t;
  return {
    c: function c() {
      div = element("div");
      t = text(/*text*/ctx[0]);
      attr(div, "alt", /*text*/ctx[0]);
      attr(div, "class", "svelte-1a7time");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p: function p(ctx, _ref62) {
      var _ref63 = _slicedToArray(_ref62, 1),
        dirty = _ref63[0];
      if (dirty & /*text*/1) set_data(t, /*text*/ctx[0]);
      if (dirty & /*text*/1) {
        attr(div, "alt", /*text*/ctx[0]);
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(div);
    }
  };
}
function instance$t($$self, $$props, $$invalidate) {
  var action = $$props.action;
  var text;
  $$self.$$set = function ($$props) {
    if ('action' in $$props) $$invalidate(1, action = $$props.action);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*action*/2) {
      {
        var _action$payload = action.payload,
          type = _action$payload.type,
          args = _action$payload.args;
        var argsFormatted = (args || []).join(',');
        $$invalidate(0, text = "".concat(type, "(").concat(argsFormatted, ")"));
      }
    }
  };
  return [text, action];
}
var Action = /*#__PURE__*/function (_SvelteComponent28) {
  function Action(options) {
    var _this29;
    _classCallCheck2(this, Action);
    _this29 = _callSuper(this, Action);
    init(_this29, options, instance$t, create_fragment$t, safe_not_equal, {
      action: 1
    }, add_css$k);
    return _this29;
  }
  _inherits2(Action, _SvelteComponent28);
  return _createClass2(Action);
}(SvelteComponent);
/* src/client/debug/mcts/Table.svelte generated by Svelte v3.49.0 */
function add_css$l(target) {
  append_styles(target, "svelte-ztcwsu", "table.svelte-ztcwsu.svelte-ztcwsu{font-size:12px;border-collapse:collapse;border:1px solid #ddd;padding:0}tr.svelte-ztcwsu.svelte-ztcwsu{cursor:pointer}tr.svelte-ztcwsu:hover td.svelte-ztcwsu{background:#eee}tr.selected.svelte-ztcwsu td.svelte-ztcwsu{background:#eee}td.svelte-ztcwsu.svelte-ztcwsu{padding:10px;height:10px;line-height:10px;font-size:12px;border:none}th.svelte-ztcwsu.svelte-ztcwsu{background:#888;color:#fff;padding:10px;text-align:center}");
}
function get_each_context$6(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  child_ctx[12] = i;
  return child_ctx;
}

// (86:2) {#each children as child, i}
function create_each_block$6(ctx) {
  var tr;
  var td0;
  var t0_value = /*child*/ctx[10].value + "";
  var t0;
  var t1;
  var td1;
  var t2_value = /*child*/ctx[10].visits + "";
  var t2;
  var t3;
  var td2;
  var action;
  var t4;
  var current;
  var mounted;
  var dispose;
  action = new Action({
    props: {
      action: /*child*/ctx[10].parentAction
    }
  });
  function click_handler() {
    return /*click_handler*/ctx[6](/*child*/ctx[10], /*i*/ctx[12]);
  }
  function mouseout_handler() {
    return /*mouseout_handler*/ctx[7](/*i*/ctx[12]);
  }
  function mouseover_handler() {
    return /*mouseover_handler*/ctx[8](/*child*/ctx[10], /*i*/ctx[12]);
  }
  return {
    c: function c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      t2 = text(t2_value);
      t3 = space();
      td2 = element("td");
      create_component(action.$$.fragment);
      t4 = space();
      attr(td0, "class", "svelte-ztcwsu");
      attr(td1, "class", "svelte-ztcwsu");
      attr(td2, "class", "svelte-ztcwsu");
      attr(tr, "class", "svelte-ztcwsu");
      toggle_class(tr, "clickable", /*children*/ctx[1].length > 0);
      toggle_class(tr, "selected", /*i*/ctx[12] === /*selectedIndex*/ctx[0]);
    },
    m: function m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      append(td1, t2);
      append(tr, t3);
      append(tr, td2);
      mount_component(action, td2, null);
      append(tr, t4);
      current = true;
      if (!mounted) {
        dispose = [listen(tr, "click", click_handler), listen(tr, "mouseout", mouseout_handler), listen(tr, "mouseover", mouseover_handler)];
        mounted = true;
      }
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty & /*children*/2) && t0_value !== (t0_value = /*child*/ctx[10].value + "")) set_data(t0, t0_value);
      if ((!current || dirty & /*children*/2) && t2_value !== (t2_value = /*child*/ctx[10].visits + "")) set_data(t2, t2_value);
      var action_changes = {};
      if (dirty & /*children*/2) action_changes.action = /*child*/ctx[10].parentAction;
      action.$set(action_changes);
      if (dirty & /*children*/2) {
        toggle_class(tr, "clickable", /*children*/ctx[1].length > 0);
      }
      if (dirty & /*selectedIndex*/1) {
        toggle_class(tr, "selected", /*i*/ctx[12] === /*selectedIndex*/ctx[0]);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(action.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(action.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(tr);
      destroy_component(action);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$u(ctx) {
  var table;
  var thead;
  var t5;
  var tbody;
  var current;
  var each_value = /*children*/ctx[1];
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
  }
  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };
  return {
    c: function c() {
      table = element("table");
      thead = element("thead");
      thead.innerHTML = "<th class=\"svelte-ztcwsu\">Value</th> \n    <th class=\"svelte-ztcwsu\">Visits</th> \n    <th class=\"svelte-ztcwsu\">Action</th>";
      t5 = space();
      tbody = element("tbody");
      for (var _i21 = 0; _i21 < each_blocks.length; _i21 += 1) {
        each_blocks[_i21].c();
      }
      attr(table, "class", "svelte-ztcwsu");
    },
    m: function m(target, anchor) {
      insert(target, table, anchor);
      append(table, thead);
      append(table, t5);
      append(table, tbody);
      for (var _i22 = 0; _i22 < each_blocks.length; _i22 += 1) {
        each_blocks[_i22].m(tbody, null);
      }
      current = true;
    },
    p: function p(ctx, _ref64) {
      var _ref65 = _slicedToArray(_ref64, 1),
        dirty = _ref65[0];
      if (dirty & /*children, selectedIndex, Select, Preview*/15) {
        each_value = /*children*/ctx[1];
        var _i23;
        for (_i23 = 0; _i23 < each_value.length; _i23 += 1) {
          var child_ctx = get_each_context$6(ctx, each_value, _i23);
          if (each_blocks[_i23]) {
            each_blocks[_i23].p(child_ctx, dirty);
            transition_in(each_blocks[_i23], 1);
          } else {
            each_blocks[_i23] = create_each_block$6(child_ctx);
            each_blocks[_i23].c();
            transition_in(each_blocks[_i23], 1);
            each_blocks[_i23].m(tbody, null);
          }
        }
        group_outros();
        for (_i23 = each_value.length; _i23 < each_blocks.length; _i23 += 1) {
          out(_i23);
        }
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      for (var _i24 = 0; _i24 < each_value.length; _i24 += 1) {
        transition_in(each_blocks[_i24]);
      }
      current = true;
    },
    o: function o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (var _i25 = 0; _i25 < each_blocks.length; _i25 += 1) {
        transition_out(each_blocks[_i25]);
      }
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(table);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$u($$self, $$props, $$invalidate) {
  var root = $$props.root;
  var _$$props$selectedInde = $$props.selectedIndex,
    selectedIndex = _$$props$selectedInde === void 0 ? null : _$$props$selectedInde;
  var dispatch = createEventDispatcher();
  var parents = [];
  var children = [];
  function Select(node, i) {
    dispatch('select', {
      node: node,
      selectedIndex: i
    });
  }
  function Preview(node, i) {
    if (selectedIndex === null) {
      dispatch('preview', {
        node: node
      });
    }
  }
  var click_handler = function click_handler(child, i) {
    return Select(child, i);
  };
  var mouseout_handler = function mouseout_handler(i) {
    return Preview(null);
  };
  var mouseover_handler = function mouseover_handler(child, i) {
    return Preview(child);
  };
  $$self.$$set = function ($$props) {
    if ('root' in $$props) $$invalidate(4, root = $$props.root);
    if ('selectedIndex' in $$props) $$invalidate(0, selectedIndex = $$props.selectedIndex);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*root, parents*/48) {
      {
        var t = root;
        $$invalidate(5, parents = []);
        while (t.parent) {
          var parent = t.parent;
          var _t$parentAction$paylo = t.parentAction.payload,
            type = _t$parentAction$paylo.type,
            args = _t$parentAction$paylo.args;
          var argsFormatted = (args || []).join(',');
          var arrowText = "".concat(type, "(").concat(argsFormatted, ")");
          parents.push({
            parent: parent,
            arrowText: arrowText
          });
          t = parent;
        }
        parents.reverse();
        $$invalidate(1, children = _toConsumableArray(root.children).sort(function (a, b) {
          return a.visits < b.visits ? 1 : -1;
        }).slice(0, 50));
      }
    }
  };
  return [selectedIndex, children, Select, Preview, root, parents, click_handler, mouseout_handler, mouseover_handler];
}
var Table = /*#__PURE__*/function (_SvelteComponent29) {
  function Table(options) {
    var _this30;
    _classCallCheck2(this, Table);
    _this30 = _callSuper(this, Table);
    init(_this30, options, instance$u, create_fragment$u, safe_not_equal, {
      root: 4,
      selectedIndex: 0
    }, add_css$l);
    return _this30;
  }
  _inherits2(Table, _SvelteComponent29);
  return _createClass2(Table);
}(SvelteComponent);
/* src/client/debug/mcts/MCTS.svelte generated by Svelte v3.49.0 */
function add_css$m(target) {
  append_styles(target, "svelte-1f0amz4", ".visualizer.svelte-1f0amz4{display:flex;flex-direction:column;align-items:center;padding:50px}.preview.svelte-1f0amz4{opacity:0.5}.icon.svelte-1f0amz4{color:#777;width:32px;height:32px;margin-bottom:20px}");
}
function get_each_context$7(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[9] = list[i].node;
  child_ctx[10] = list[i].selectedIndex;
  child_ctx[12] = i;
  return child_ctx;
}

// (50:4) {#if i !== 0}
function create_if_block_2$3(ctx) {
  var div;
  var arrow;
  var current;
  arrow = new FaArrowAltCircleDown({});
  return {
    c: function c() {
      div = element("div");
      create_component(arrow.$$.fragment);
      attr(div, "class", "icon svelte-1f0amz4");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      mount_component(arrow, div, null);
      current = true;
    },
    i: function i(local) {
      if (current) return;
      transition_in(arrow.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(arrow.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(div);
      destroy_component(arrow);
    }
  };
}

// (61:6) {:else}
function create_else_block$2(ctx) {
  var table;
  var current;
  function select_handler_1() {
    var _ctx;
    for (var _len2 = arguments.length, args = new Array(_len2), _key5 = 0; _key5 < _len2; _key5++) {
      args[_key5] = arguments[_key5];
    }
    return /*select_handler_1*/(_ctx = ctx)[7].apply(_ctx, [/*i*/ctx[12]].concat(args));
  }
  table = new Table({
    props: {
      root: /*node*/ctx[9],
      selectedIndex: /*selectedIndex*/ctx[10]
    }
  });
  table.$on("select", select_handler_1);
  return {
    c: function c() {
      create_component(table.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(table, target, anchor);
      current = true;
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
      var table_changes = {};
      if (dirty & /*nodes*/1) table_changes.root = /*node*/ctx[9];
      if (dirty & /*nodes*/1) table_changes.selectedIndex = /*selectedIndex*/ctx[10];
      table.$set(table_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(table, detaching);
    }
  };
}

// (57:6) {#if i === nodes.length - 1}
function create_if_block_1$3(ctx) {
  var table;
  var current;
  function select_handler() {
    var _ctx2;
    for (var _len3 = arguments.length, args = new Array(_len3), _key6 = 0; _key6 < _len3; _key6++) {
      args[_key6] = arguments[_key6];
    }
    return /*select_handler*/(_ctx2 = ctx)[5].apply(_ctx2, [/*i*/ctx[12]].concat(args));
  }
  function preview_handler() {
    var _ctx3;
    for (var _len4 = arguments.length, args = new Array(_len4), _key7 = 0; _key7 < _len4; _key7++) {
      args[_key7] = arguments[_key7];
    }
    return /*preview_handler*/(_ctx3 = ctx)[6].apply(_ctx3, [/*i*/ctx[12]].concat(args));
  }
  table = new Table({
    props: {
      root: /*node*/ctx[9]
    }
  });
  table.$on("select", select_handler);
  table.$on("preview", preview_handler);
  return {
    c: function c() {
      create_component(table.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(table, target, anchor);
      current = true;
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
      var table_changes = {};
      if (dirty & /*nodes*/1) table_changes.root = /*node*/ctx[9];
      table.$set(table_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(table, detaching);
    }
  };
}

// (49:2) {#each nodes as { node, selectedIndex }
function create_each_block$7(ctx) {
  var t;
  var section;
  var current_block_type_index;
  var if_block1;
  var current;
  var if_block0 = /*i*/ctx[12] !== 0 && create_if_block_2$3();
  var if_block_creators = [create_if_block_1$3, create_else_block$2];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if (/*i*/ctx[12] === /*nodes*/ctx[0].length - 1) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c: function c() {
      if (if_block0) if_block0.c();
      t = space();
      section = element("section");
      if_block1.c();
    },
    m: function m(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert(target, t, anchor);
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;
    },
    p: function p(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];
        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        } else {
          if_block1.p(ctx, dirty);
        }
        transition_in(if_block1, 1);
        if_block1.m(section, null);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d: function d(detaching) {
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach(t);
      if (detaching) detach(section);
      if_blocks[current_block_type_index].d();
    }
  };
}

// (69:2) {#if preview}
function create_if_block$a(ctx) {
  var div;
  var arrow;
  var t;
  var section;
  var table;
  var current;
  arrow = new FaArrowAltCircleDown({});
  table = new Table({
    props: {
      root: /*preview*/ctx[1]
    }
  });
  return {
    c: function c() {
      div = element("div");
      create_component(arrow.$$.fragment);
      t = space();
      section = element("section");
      create_component(table.$$.fragment);
      attr(div, "class", "icon svelte-1f0amz4");
      attr(section, "class", "preview svelte-1f0amz4");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      mount_component(arrow, div, null);
      insert(target, t, anchor);
      insert(target, section, anchor);
      mount_component(table, section, null);
      current = true;
    },
    p: function p(ctx, dirty) {
      var table_changes = {};
      if (dirty & /*preview*/2) table_changes.root = /*preview*/ctx[1];
      table.$set(table_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(arrow.$$.fragment, local);
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(arrow.$$.fragment, local);
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(div);
      destroy_component(arrow);
      if (detaching) detach(t);
      if (detaching) detach(section);
      destroy_component(table);
    }
  };
}
function create_fragment$v(ctx) {
  var div;
  var t;
  var current;
  var each_value = /*nodes*/ctx[0];
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
  }
  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };
  var if_block = /*preview*/ctx[1] && create_if_block$a(ctx);
  return {
    c: function c() {
      div = element("div");
      for (var _i26 = 0; _i26 < each_blocks.length; _i26 += 1) {
        each_blocks[_i26].c();
      }
      t = space();
      if (if_block) if_block.c();
      attr(div, "class", "visualizer svelte-1f0amz4");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      for (var _i27 = 0; _i27 < each_blocks.length; _i27 += 1) {
        each_blocks[_i27].m(div, null);
      }
      append(div, t);
      if (if_block) if_block.m(div, null);
      current = true;
    },
    p: function p(ctx, _ref66) {
      var _ref67 = _slicedToArray(_ref66, 1),
        dirty = _ref67[0];
      if (dirty & /*nodes, SelectNode, PreviewNode*/13) {
        each_value = /*nodes*/ctx[0];
        var _i28;
        for (_i28 = 0; _i28 < each_value.length; _i28 += 1) {
          var child_ctx = get_each_context$7(ctx, each_value, _i28);
          if (each_blocks[_i28]) {
            each_blocks[_i28].p(child_ctx, dirty);
            transition_in(each_blocks[_i28], 1);
          } else {
            each_blocks[_i28] = create_each_block$7(child_ctx);
            each_blocks[_i28].c();
            transition_in(each_blocks[_i28], 1);
            each_blocks[_i28].m(div, t);
          }
        }
        group_outros();
        for (_i28 = each_value.length; _i28 < each_blocks.length; _i28 += 1) {
          out(_i28);
        }
        check_outros();
      }
      if (/*preview*/ctx[1]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*preview*/2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$a(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      for (var _i29 = 0; _i29 < each_value.length; _i29 += 1) {
        transition_in(each_blocks[_i29]);
      }
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (var _i30 = 0; _i30 < each_blocks.length; _i30 += 1) {
        transition_out(each_blocks[_i30]);
      }
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(div);
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
    }
  };
}
function instance$v($$self, $$props, $$invalidate) {
  var metadata = $$props.metadata;
  var nodes = [];
  var preview = null;
  function SelectNode(_ref68, i) {
    var node = _ref68.node,
      selectedIndex = _ref68.selectedIndex;
    $$invalidate(1, preview = null);
    $$invalidate(0, nodes[i].selectedIndex = selectedIndex, nodes);
    $$invalidate(0, nodes = [].concat(_toConsumableArray(nodes.slice(0, i + 1)), [{
      node: node
    }]));
  }
  function PreviewNode(_ref69, i) {
    var node = _ref69.node;
    $$invalidate(1, preview = node);
  }
  var select_handler = function select_handler(i, e) {
    return SelectNode(e.detail, i);
  };
  var preview_handler = function preview_handler(i, e) {
    return PreviewNode(e.detail);
  };
  var select_handler_1 = function select_handler_1(i, e) {
    return SelectNode(e.detail, i);
  };
  $$self.$$set = function ($$props) {
    if ('metadata' in $$props) $$invalidate(4, metadata = $$props.metadata);
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*metadata*/16) {
      {
        $$invalidate(0, nodes = [{
          node: metadata
        }]);
      }
    }
  };
  return [nodes, preview, SelectNode, PreviewNode, metadata, select_handler, preview_handler, select_handler_1];
}
var MCTS = /*#__PURE__*/function (_SvelteComponent30) {
  function MCTS(options) {
    var _this31;
    _classCallCheck2(this, MCTS);
    _this31 = _callSuper(this, MCTS);
    init(_this31, options, instance$v, create_fragment$v, safe_not_equal, {
      metadata: 4
    }, add_css$m);
    return _this31;
  }
  _inherits2(MCTS, _SvelteComponent30);
  return _createClass2(MCTS);
}(SvelteComponent);
/* src/client/debug/log/Log.svelte generated by Svelte v3.49.0 */
function add_css$n(target) {
  append_styles(target, "svelte-1pq5e4b", ".gamelog.svelte-1pq5e4b{display:grid;grid-template-columns:30px 1fr 30px;grid-auto-rows:auto;grid-auto-flow:column}");
}
function get_each_context$8(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[16] = list[i].phase;
  child_ctx[18] = i;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[19] = list[i].action;
  child_ctx[20] = list[i].metadata;
  child_ctx[18] = i;
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[22] = list[i].turn;
  child_ctx[18] = i;
  return child_ctx;
}

// (136:4) {#if i in turnBoundaries}
function create_if_block_1$4(ctx) {
  var turnmarker;
  var current;
  turnmarker = new TurnMarker({
    props: {
      turn: /*turn*/ctx[22],
      numEvents: /*turnBoundaries*/ctx[3][/*i*/ctx[18]]
    }
  });
  return {
    c: function c() {
      create_component(turnmarker.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(turnmarker, target, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      var turnmarker_changes = {};
      if (dirty & /*renderedLogEntries*/2) turnmarker_changes.turn = /*turn*/ctx[22];
      if (dirty & /*turnBoundaries*/8) turnmarker_changes.numEvents = /*turnBoundaries*/ctx[3][/*i*/ctx[18]];
      turnmarker.$set(turnmarker_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(turnmarker.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(turnmarker.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(turnmarker, detaching);
    }
  };
}

// (135:2) {#each renderedLogEntries as { turn }
function create_each_block_2(ctx) {
  var if_block_anchor;
  var current;
  var if_block = /*i*/ctx[18] in /*turnBoundaries*/ctx[3] && create_if_block_1$4(ctx);
  return {
    c: function c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m: function m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      if (/*i*/ctx[18] in /*turnBoundaries*/ctx[3]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*turnBoundaries*/8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$4(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }
  };
}

// (141:2) {#each renderedLogEntries as { action, metadata }
function create_each_block_1(ctx) {
  var logevent;
  var current;
  logevent = new LogEvent({
    props: {
      pinned: /*i*/ctx[18] === /*pinned*/ctx[2],
      logIndex: /*i*/ctx[18],
      action: /*action*/ctx[19],
      metadata: /*metadata*/ctx[20]
    }
  });
  logevent.$on("click", /*OnLogClick*/ctx[5]);
  logevent.$on("mouseenter", /*OnMouseEnter*/ctx[6]);
  logevent.$on("mouseleave", /*OnMouseLeave*/ctx[7]);
  return {
    c: function c() {
      create_component(logevent.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(logevent, target, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      var logevent_changes = {};
      if (dirty & /*pinned*/4) logevent_changes.pinned = /*i*/ctx[18] === /*pinned*/ctx[2];
      if (dirty & /*renderedLogEntries*/2) logevent_changes.action = /*action*/ctx[19];
      if (dirty & /*renderedLogEntries*/2) logevent_changes.metadata = /*metadata*/ctx[20];
      logevent.$set(logevent_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(logevent.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(logevent.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(logevent, detaching);
    }
  };
}

// (153:4) {#if i in phaseBoundaries}
function create_if_block$b(ctx) {
  var phasemarker;
  var current;
  phasemarker = new PhaseMarker({
    props: {
      phase: /*phase*/ctx[16],
      numEvents: /*phaseBoundaries*/ctx[4][/*i*/ctx[18]]
    }
  });
  return {
    c: function c() {
      create_component(phasemarker.$$.fragment);
    },
    m: function m(target, anchor) {
      mount_component(phasemarker, target, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      var phasemarker_changes = {};
      if (dirty & /*renderedLogEntries*/2) phasemarker_changes.phase = /*phase*/ctx[16];
      if (dirty & /*phaseBoundaries*/16) phasemarker_changes.numEvents = /*phaseBoundaries*/ctx[4][/*i*/ctx[18]];
      phasemarker.$set(phasemarker_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(phasemarker.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(phasemarker.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(phasemarker, detaching);
    }
  };
}

// (152:2) {#each renderedLogEntries as { phase }
function create_each_block$8(ctx) {
  var if_block_anchor;
  var current;
  var if_block = /*i*/ctx[18] in /*phaseBoundaries*/ctx[4] && create_if_block$b(ctx);
  return {
    c: function c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m: function m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      if (/*i*/ctx[18] in /*phaseBoundaries*/ctx[4]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*phaseBoundaries*/16) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$b(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }
  };
}
function create_fragment$w(ctx) {
  var div;
  var t0;
  var t1;
  var current;
  var mounted;
  var dispose;
  var each_value_2 = /*renderedLogEntries*/ctx[1];
  var each_blocks_2 = [];
  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  var out = function out(i) {
    return transition_out(each_blocks_2[i], 1, 1, function () {
      each_blocks_2[i] = null;
    });
  };
  var each_value_1 = /*renderedLogEntries*/ctx[1];
  var each_blocks_1 = [];
  for (var _i31 = 0; _i31 < each_value_1.length; _i31 += 1) {
    each_blocks_1[_i31] = create_each_block_1(get_each_context_1(ctx, each_value_1, _i31));
  }
  var out_1 = function out_1(i) {
    return transition_out(each_blocks_1[i], 1, 1, function () {
      each_blocks_1[i] = null;
    });
  };
  var each_value = /*renderedLogEntries*/ctx[1];
  var each_blocks = [];
  for (var _i32 = 0; _i32 < each_value.length; _i32 += 1) {
    each_blocks[_i32] = create_each_block$8(get_each_context$8(ctx, each_value, _i32));
  }
  var out_2 = function out_2(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };
  return {
    c: function c() {
      div = element("div");
      for (var _i33 = 0; _i33 < each_blocks_2.length; _i33 += 1) {
        each_blocks_2[_i33].c();
      }
      t0 = space();
      for (var _i34 = 0; _i34 < each_blocks_1.length; _i34 += 1) {
        each_blocks_1[_i34].c();
      }
      t1 = space();
      for (var _i35 = 0; _i35 < each_blocks.length; _i35 += 1) {
        each_blocks[_i35].c();
      }
      attr(div, "class", "gamelog svelte-1pq5e4b");
      toggle_class(div, "pinned", /*pinned*/ctx[2]);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      for (var _i36 = 0; _i36 < each_blocks_2.length; _i36 += 1) {
        each_blocks_2[_i36].m(div, null);
      }
      append(div, t0);
      for (var _i37 = 0; _i37 < each_blocks_1.length; _i37 += 1) {
        each_blocks_1[_i37].m(div, null);
      }
      append(div, t1);
      for (var _i38 = 0; _i38 < each_blocks.length; _i38 += 1) {
        each_blocks[_i38].m(div, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(window, "keydown", /*OnKeyDown*/ctx[8]);
        mounted = true;
      }
    },
    p: function p(ctx, _ref70) {
      var _ref71 = _slicedToArray(_ref70, 1),
        dirty = _ref71[0];
      if (dirty & /*renderedLogEntries, turnBoundaries*/10) {
        each_value_2 = /*renderedLogEntries*/ctx[1];
        var _i39;
        for (_i39 = 0; _i39 < each_value_2.length; _i39 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i39);
          if (each_blocks_2[_i39]) {
            each_blocks_2[_i39].p(child_ctx, dirty);
            transition_in(each_blocks_2[_i39], 1);
          } else {
            each_blocks_2[_i39] = create_each_block_2(child_ctx);
            each_blocks_2[_i39].c();
            transition_in(each_blocks_2[_i39], 1);
            each_blocks_2[_i39].m(div, t0);
          }
        }
        group_outros();
        for (_i39 = each_value_2.length; _i39 < each_blocks_2.length; _i39 += 1) {
          out(_i39);
        }
        check_outros();
      }
      if (dirty & /*pinned, renderedLogEntries, OnLogClick, OnMouseEnter, OnMouseLeave*/230) {
        each_value_1 = /*renderedLogEntries*/ctx[1];
        var _i40;
        for (_i40 = 0; _i40 < each_value_1.length; _i40 += 1) {
          var _child_ctx = get_each_context_1(ctx, each_value_1, _i40);
          if (each_blocks_1[_i40]) {
            each_blocks_1[_i40].p(_child_ctx, dirty);
            transition_in(each_blocks_1[_i40], 1);
          } else {
            each_blocks_1[_i40] = create_each_block_1(_child_ctx);
            each_blocks_1[_i40].c();
            transition_in(each_blocks_1[_i40], 1);
            each_blocks_1[_i40].m(div, t1);
          }
        }
        group_outros();
        for (_i40 = each_value_1.length; _i40 < each_blocks_1.length; _i40 += 1) {
          out_1(_i40);
        }
        check_outros();
      }
      if (dirty & /*renderedLogEntries, phaseBoundaries*/18) {
        each_value = /*renderedLogEntries*/ctx[1];
        var _i41;
        for (_i41 = 0; _i41 < each_value.length; _i41 += 1) {
          var _child_ctx2 = get_each_context$8(ctx, each_value, _i41);
          if (each_blocks[_i41]) {
            each_blocks[_i41].p(_child_ctx2, dirty);
            transition_in(each_blocks[_i41], 1);
          } else {
            each_blocks[_i41] = create_each_block$8(_child_ctx2);
            each_blocks[_i41].c();
            transition_in(each_blocks[_i41], 1);
            each_blocks[_i41].m(div, null);
          }
        }
        group_outros();
        for (_i41 = each_value.length; _i41 < each_blocks.length; _i41 += 1) {
          out_2(_i41);
        }
        check_outros();
      }
      if (dirty & /*pinned*/4) {
        toggle_class(div, "pinned", /*pinned*/ctx[2]);
      }
    },
    i: function i(local) {
      if (current) return;
      for (var _i42 = 0; _i42 < each_value_2.length; _i42 += 1) {
        transition_in(each_blocks_2[_i42]);
      }
      for (var _i43 = 0; _i43 < each_value_1.length; _i43 += 1) {
        transition_in(each_blocks_1[_i43]);
      }
      for (var _i44 = 0; _i44 < each_value.length; _i44 += 1) {
        transition_in(each_blocks[_i44]);
      }
      current = true;
    },
    o: function o(local) {
      each_blocks_2 = each_blocks_2.filter(Boolean);
      for (var _i45 = 0; _i45 < each_blocks_2.length; _i45 += 1) {
        transition_out(each_blocks_2[_i45]);
      }
      each_blocks_1 = each_blocks_1.filter(Boolean);
      for (var _i46 = 0; _i46 < each_blocks_1.length; _i46 += 1) {
        transition_out(each_blocks_1[_i46]);
      }
      each_blocks = each_blocks.filter(Boolean);
      for (var _i47 = 0; _i47 < each_blocks.length; _i47 += 1) {
        transition_out(each_blocks[_i47]);
      }
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(div);
      destroy_each(each_blocks_2, detaching);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$w($$self, $$props, $$invalidate) {
  var $client,
    $$unsubscribe_client = noop,
    $$subscribe_client = function $$subscribe_client() {
      return $$unsubscribe_client(), $$unsubscribe_client = subscribe(client, function ($$value) {
        return $$invalidate(10, $client = $$value);
      }), client;
    };
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe_client();
  });
  var client = $$props.client;
  $$subscribe_client();
  var _getContext4 = getContext('secondaryPane'),
    secondaryPane = _getContext4.secondaryPane;
  var reducer = (0, _reducer24ea3e4c.C)({
    game: client.game
  });
  var initialState = client.getInitialState();
  var _$client = $client,
    log = _$client.log;
  var pinned = null;
  function rewind(logIndex) {
    var state = initialState;
    for (var i = 0; i < log.length; i++) {
      var _log$i = log[i],
        action = _log$i.action,
        automatic = _log$i.automatic;
      if (!automatic) {
        state = reducer(state, action);
        if (logIndex == 0) {
          break;
        }
        logIndex--;
      }
    }
    return {
      G: state.G,
      ctx: state.ctx,
      plugins: state.plugins
    };
  }
  function OnLogClick(e) {
    var logIndex = e.detail.logIndex;
    var state = rewind(logIndex);
    var renderedLogEntries = log.filter(function (e) {
      return !e.automatic;
    });
    client.overrideGameState(state);
    if (pinned == logIndex) {
      $$invalidate(2, pinned = null);
      secondaryPane.set(null);
    } else {
      $$invalidate(2, pinned = logIndex);
      var metadata = renderedLogEntries[logIndex].action.payload.metadata;
      if (metadata) {
        secondaryPane.set({
          component: MCTS,
          metadata: metadata
        });
      }
    }
  }
  function OnMouseEnter(e) {
    var logIndex = e.detail.logIndex;
    if (pinned === null) {
      var state = rewind(logIndex);
      client.overrideGameState(state);
    }
  }
  function OnMouseLeave() {
    if (pinned === null) {
      client.overrideGameState(null);
    }
  }
  function Reset() {
    $$invalidate(2, pinned = null);
    client.overrideGameState(null);
    secondaryPane.set(null);
  }
  onDestroy(Reset);
  function OnKeyDown(e) {
    // ESC.
    if (e.keyCode == 27) {
      Reset();
    }
  }
  var renderedLogEntries;
  var turnBoundaries = {};
  var phaseBoundaries = {};
  $$self.$$set = function ($$props) {
    if ('client' in $$props) $$subscribe_client($$invalidate(0, client = $$props.client));
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*$client, log, renderedLogEntries*/1538) {
      {
        $$invalidate(9, log = $client.log);
        $$invalidate(1, renderedLogEntries = log.filter(function (e) {
          return !e.automatic;
        }));
        var eventsInCurrentPhase = 0;
        var eventsInCurrentTurn = 0;
        $$invalidate(3, turnBoundaries = {});
        $$invalidate(4, phaseBoundaries = {});
        for (var i = 0; i < renderedLogEntries.length; i++) {
          var _renderedLogEntries$i = renderedLogEntries[i],
            action = _renderedLogEntries$i.action,
            payload = _renderedLogEntries$i.payload,
            turn = _renderedLogEntries$i.turn,
            phase = _renderedLogEntries$i.phase;
          eventsInCurrentTurn++;
          eventsInCurrentPhase++;
          if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].turn != turn) {
            $$invalidate(3, turnBoundaries[i] = eventsInCurrentTurn, turnBoundaries);
            eventsInCurrentTurn = 0;
          }
          if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].phase != phase) {
            $$invalidate(4, phaseBoundaries[i] = eventsInCurrentPhase, phaseBoundaries);
            eventsInCurrentPhase = 0;
          }
        }
      }
    }
  };
  return [client, renderedLogEntries, pinned, turnBoundaries, phaseBoundaries, OnLogClick, OnMouseEnter, OnMouseLeave, OnKeyDown, log, $client];
}
var Log = /*#__PURE__*/function (_SvelteComponent31) {
  function Log(options) {
    var _this32;
    _classCallCheck2(this, Log);
    _this32 = _callSuper(this, Log);
    init(_this32, options, instance$w, create_fragment$w, safe_not_equal, {
      client: 0
    }, add_css$n);
    return _this32;
  }
  _inherits2(Log, _SvelteComponent31);
  return _createClass2(Log);
}(SvelteComponent);
/* src/client/debug/ai/Options.svelte generated by Svelte v3.49.0 */
function add_css$o(target) {
  append_styles(target, "svelte-1fu900w", "label.svelte-1fu900w{color:#666}.option.svelte-1fu900w{margin-bottom:20px}.value.svelte-1fu900w{font-weight:bold;color:#000}input[type='checkbox'].svelte-1fu900w{vertical-align:middle}");
}
function get_each_context$9(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[6] = list[i][0];
  child_ctx[7] = list[i][1];
  child_ctx[8] = list;
  child_ctx[9] = i;
  return child_ctx;
}

// (44:47) 
function create_if_block_1$5(ctx) {
  var input;
  var input_id_value;
  var mounted;
  var dispose;
  function input_change_handler() {
    /*input_change_handler*/ctx[5].call(input, /*key*/ctx[6]);
  }
  return {
    c: function c() {
      input = element("input");
      attr(input, "id", input_id_value = /*makeID*/ctx[3](/*key*/ctx[6]));
      attr(input, "type", "checkbox");
      attr(input, "class", "svelte-1fu900w");
    },
    m: function m(target, anchor) {
      insert(target, input, anchor);
      input.checked = /*values*/ctx[1][/*key*/ctx[6]];
      if (!mounted) {
        dispose = [listen(input, "change", input_change_handler), listen(input, "change", /*OnChange*/ctx[2])];
        mounted = true;
      }
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*bot*/1 && input_id_value !== (input_id_value = /*makeID*/ctx[3](/*key*/ctx[6]))) {
        attr(input, "id", input_id_value);
      }
      if (dirty & /*values, Object, bot*/3) {
        input.checked = /*values*/ctx[1][/*key*/ctx[6]];
      }
    },
    d: function d(detaching) {
      if (detaching) detach(input);
      mounted = false;
      run_all(dispose);
    }
  };
}

// (41:4) {#if value.range}
function create_if_block$c(ctx) {
  var span;
  var t0_value = /*values*/ctx[1][/*key*/ctx[6]] + "";
  var t0;
  var t1;
  var input;
  var input_id_value;
  var input_min_value;
  var input_max_value;
  var mounted;
  var dispose;
  function input_change_input_handler() {
    /*input_change_input_handler*/ctx[4].call(input, /*key*/ctx[6]);
  }
  return {
    c: function c() {
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      input = element("input");
      attr(span, "class", "value svelte-1fu900w");
      attr(input, "id", input_id_value = /*makeID*/ctx[3](/*key*/ctx[6]));
      attr(input, "type", "range");
      attr(input, "min", input_min_value = /*value*/ctx[7].range.min);
      attr(input, "max", input_max_value = /*value*/ctx[7].range.max);
    },
    m: function m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      insert(target, t1, anchor);
      insert(target, input, anchor);
      set_input_value(input, /*values*/ctx[1][/*key*/ctx[6]]);
      if (!mounted) {
        dispose = [listen(input, "change", input_change_input_handler), listen(input, "input", input_change_input_handler), listen(input, "change", /*OnChange*/ctx[2])];
        mounted = true;
      }
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*values, bot*/3 && t0_value !== (t0_value = /*values*/ctx[1][/*key*/ctx[6]] + "")) set_data(t0, t0_value);
      if (dirty & /*bot*/1 && input_id_value !== (input_id_value = /*makeID*/ctx[3](/*key*/ctx[6]))) {
        attr(input, "id", input_id_value);
      }
      if (dirty & /*bot*/1 && input_min_value !== (input_min_value = /*value*/ctx[7].range.min)) {
        attr(input, "min", input_min_value);
      }
      if (dirty & /*bot*/1 && input_max_value !== (input_max_value = /*value*/ctx[7].range.max)) {
        attr(input, "max", input_max_value);
      }
      if (dirty & /*values, Object, bot*/3) {
        set_input_value(input, /*values*/ctx[1][/*key*/ctx[6]]);
      }
    },
    d: function d(detaching) {
      if (detaching) detach(span);
      if (detaching) detach(t1);
      if (detaching) detach(input);
      mounted = false;
      run_all(dispose);
    }
  };
}

// (37:0) {#each Object.entries(bot.opts()) as [key, value]}
function create_each_block$9(ctx) {
  var div;
  var label;
  var t0_value = /*key*/ctx[6] + "";
  var t0;
  var label_for_value;
  var t1;
  var t2;
  function select_block_type(ctx, dirty) {
    if (/*value*/ctx[7].range) return create_if_block$c;
    if (typeof /*value*/ctx[7].value === 'boolean') return create_if_block_1$5;
  }
  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type && current_block_type(ctx);
  return {
    c: function c() {
      div = element("div");
      label = element("label");
      t0 = text(t0_value);
      t1 = space();
      if (if_block) if_block.c();
      t2 = space();
      attr(label, "for", label_for_value = /*makeID*/ctx[3](/*key*/ctx[6]));
      attr(label, "class", "svelte-1fu900w");
      attr(div, "class", "option svelte-1fu900w");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, label);
      append(label, t0);
      append(div, t1);
      if (if_block) if_block.m(div, null);
      append(div, t2);
    },
    p: function p(ctx, dirty) {
      if (dirty & /*bot*/1 && t0_value !== (t0_value = /*key*/ctx[6] + "")) set_data(t0, t0_value);
      if (dirty & /*bot*/1 && label_for_value !== (label_for_value = /*makeID*/ctx[3](/*key*/ctx[6]))) {
        attr(label, "for", label_for_value);
      }
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if (if_block) if_block.d(1);
        if_block = current_block_type && current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(div, t2);
        }
      }
    },
    d: function d(detaching) {
      if (detaching) detach(div);
      if (if_block) {
        if_block.d();
      }
    }
  };
}
function create_fragment$x(ctx) {
  var each_1_anchor;
  var each_value = Object.entries(/*bot*/ctx[0].opts());
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
  }
  return {
    c: function c() {
      for (var _i48 = 0; _i48 < each_blocks.length; _i48 += 1) {
        each_blocks[_i48].c();
      }
      each_1_anchor = empty();
    },
    m: function m(target, anchor) {
      for (var _i49 = 0; _i49 < each_blocks.length; _i49 += 1) {
        each_blocks[_i49].m(target, anchor);
      }
      insert(target, each_1_anchor, anchor);
    },
    p: function p(ctx, _ref72) {
      var _ref73 = _slicedToArray(_ref72, 1),
        dirty = _ref73[0];
      if (dirty & /*makeID, Object, bot, values, OnChange*/15) {
        each_value = Object.entries(/*bot*/ctx[0].opts());
        var _i50;
        for (_i50 = 0; _i50 < each_value.length; _i50 += 1) {
          var child_ctx = get_each_context$9(ctx, each_value, _i50);
          if (each_blocks[_i50]) {
            each_blocks[_i50].p(child_ctx, dirty);
          } else {
            each_blocks[_i50] = create_each_block$9(child_ctx);
            each_blocks[_i50].c();
            each_blocks[_i50].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; _i50 < each_blocks.length; _i50 += 1) {
          each_blocks[_i50].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach(each_1_anchor);
    }
  };
}
function instance$x($$self, $$props, $$invalidate) {
  var bot = $$props.bot;
  var values = {};
  for (var _i51 = 0, _Object$entries = Object.entries(bot.opts()); _i51 < _Object$entries.length; _i51++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i51], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    values[key] = value.value;
  }
  function OnChange() {
    for (var _i52 = 0, _Object$entries2 = Object.entries(values); _i52 < _Object$entries2.length; _i52++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i52], 2),
        _key8 = _Object$entries2$_i[0],
        _value = _Object$entries2$_i[1];
      bot.setOpt(_key8, _value);
    }
  }
  var makeID = function makeID(key) {
    return 'ai-option-' + key;
  };
  function input_change_input_handler(key) {
    values[key] = to_number(this.value);
    $$invalidate(1, values);
  }
  function input_change_handler(key) {
    values[key] = this.checked;
    $$invalidate(1, values);
  }
  $$self.$$set = function ($$props) {
    if ('bot' in $$props) $$invalidate(0, bot = $$props.bot);
  };
  return [bot, values, OnChange, makeID, input_change_input_handler, input_change_handler];
}
var Options = /*#__PURE__*/function (_SvelteComponent32) {
  function Options(options) {
    var _this33;
    _classCallCheck2(this, Options);
    _this33 = _callSuper(this, Options);
    init(_this33, options, instance$x, create_fragment$x, safe_not_equal, {
      bot: 0
    }, add_css$o);
    return _this33;
  }
  _inherits2(Options, _SvelteComponent32);
  return _createClass2(Options);
}(SvelteComponent);
/* src/client/debug/ai/AI.svelte generated by Svelte v3.49.0 */
function add_css$p(target) {
  append_styles(target, "svelte-fn09gm", "ul.svelte-fn09gm{padding-left:0}li.svelte-fn09gm{list-style:none;margin:0;margin-bottom:5px}h3.svelte-fn09gm{text-transform:uppercase}label.svelte-fn09gm{color:#666}input[type='checkbox'].svelte-fn09gm{vertical-align:middle}");
}
function get_each_context$a(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
}

// (202:4) {:else}
function create_else_block$3(ctx) {
  var p0;
  var t1;
  var p1;
  return {
    c: function c() {
      p0 = element("p");
      p0.textContent = "No bots available.";
      t1 = space();
      p1 = element("p");
      p1.innerHTML = "Follow the instructions\n        <a href=\"https://boardgame.io/documentation/#/tutorial?id=bots\" target=\"_blank\">here</a>\n        to set up bots.";
    },
    m: function m(target, anchor) {
      insert(target, p0, anchor);
      insert(target, t1, anchor);
      insert(target, p1, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(p0);
      if (detaching) detach(t1);
      if (detaching) detach(p1);
    }
  };
}

// (200:4) {#if client.multiplayer}
function create_if_block_5(ctx) {
  var p;
  return {
    c: function c() {
      p = element("p");
      p.textContent = "The bot debugger is only available in singleplayer mode.";
    },
    m: function m(target, anchor) {
      insert(target, p, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) detach(p);
    }
  };
}

// (150:2) {#if client.game.ai && !client.multiplayer}
function create_if_block$d(ctx) {
  var section0;
  var h30;
  var t1;
  var ul;
  var li0;
  var hotkey0;
  var t2;
  var li1;
  var hotkey1;
  var t3;
  var li2;
  var hotkey2;
  var t4;
  var section1;
  var h31;
  var t6;
  var select;
  var t7;
  var show_if = Object.keys(/*bot*/ctx[7].opts()).length;
  var t8;
  var if_block1_anchor;
  var current;
  var mounted;
  var dispose;
  hotkey0 = new Hotkey({
    props: {
      value: "1",
      onPress: /*Reset*/ctx[13],
      label: "reset"
    }
  });
  hotkey1 = new Hotkey({
    props: {
      value: "2",
      onPress: /*Step*/ctx[11],
      label: "play"
    }
  });
  hotkey2 = new Hotkey({
    props: {
      value: "3",
      onPress: /*Simulate*/ctx[12],
      label: "simulate"
    }
  });
  var each_value = Object.keys(/*bots*/ctx[8]);
  var each_blocks = [];
  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
  }
  var if_block0 = show_if && create_if_block_4(ctx);
  var if_block1 = (/*botAction*/ctx[5] || /*iterationCounter*/ctx[3]) && create_if_block_1$6(ctx);
  return {
    c: function c() {
      section0 = element("section");
      h30 = element("h3");
      h30.textContent = "Controls";
      t1 = space();
      ul = element("ul");
      li0 = element("li");
      create_component(hotkey0.$$.fragment);
      t2 = space();
      li1 = element("li");
      create_component(hotkey1.$$.fragment);
      t3 = space();
      li2 = element("li");
      create_component(hotkey2.$$.fragment);
      t4 = space();
      section1 = element("section");
      h31 = element("h3");
      h31.textContent = "Bot";
      t6 = space();
      select = element("select");
      for (var _i53 = 0; _i53 < each_blocks.length; _i53 += 1) {
        each_blocks[_i53].c();
      }
      t7 = space();
      if (if_block0) if_block0.c();
      t8 = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      attr(h30, "class", "svelte-fn09gm");
      attr(li0, "class", "svelte-fn09gm");
      attr(li1, "class", "svelte-fn09gm");
      attr(li2, "class", "svelte-fn09gm");
      attr(ul, "class", "svelte-fn09gm");
      attr(h31, "class", "svelte-fn09gm");
      if (/*selectedBot*/ctx[4] === void 0) add_render_callback(function () {
        return /*select_change_handler*/ctx[17].call(select);
      });
    },
    m: function m(target, anchor) {
      insert(target, section0, anchor);
      append(section0, h30);
      append(section0, t1);
      append(section0, ul);
      append(ul, li0);
      mount_component(hotkey0, li0, null);
      append(ul, t2);
      append(ul, li1);
      mount_component(hotkey1, li1, null);
      append(ul, t3);
      append(ul, li2);
      mount_component(hotkey2, li2, null);
      insert(target, t4, anchor);
      insert(target, section1, anchor);
      append(section1, h31);
      append(section1, t6);
      append(section1, select);
      for (var _i54 = 0; _i54 < each_blocks.length; _i54 += 1) {
        each_blocks[_i54].m(select, null);
      }
      select_option(select, /*selectedBot*/ctx[4]);
      insert(target, t7, anchor);
      if (if_block0) if_block0.m(target, anchor);
      insert(target, t8, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [listen(select, "change", /*select_change_handler*/ctx[17]), listen(select, "change", /*ChangeBot*/ctx[10])];
        mounted = true;
      }
    },
    p: function p(ctx, dirty) {
      if (dirty & /*Object, bots*/256) {
        each_value = Object.keys(/*bots*/ctx[8]);
        var _i55;
        for (_i55 = 0; _i55 < each_value.length; _i55 += 1) {
          var child_ctx = get_each_context$a(ctx, each_value, _i55);
          if (each_blocks[_i55]) {
            each_blocks[_i55].p(child_ctx, dirty);
          } else {
            each_blocks[_i55] = create_each_block$a(child_ctx);
            each_blocks[_i55].c();
            each_blocks[_i55].m(select, null);
          }
        }
        for (; _i55 < each_blocks.length; _i55 += 1) {
          each_blocks[_i55].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & /*selectedBot, Object, bots*/272) {
        select_option(select, /*selectedBot*/ctx[4]);
      }
      if (dirty & /*bot*/128) show_if = Object.keys(/*bot*/ctx[7].opts()).length;
      if (show_if) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty & /*bot*/128) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t8.parentNode, t8);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }
      if (/*botAction*/ctx[5] || /*iterationCounter*/ctx[3]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_1$6(ctx);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(hotkey0.$$.fragment, local);
      transition_in(hotkey1.$$.fragment, local);
      transition_in(hotkey2.$$.fragment, local);
      transition_in(if_block0);
      current = true;
    },
    o: function o(local) {
      transition_out(hotkey0.$$.fragment, local);
      transition_out(hotkey1.$$.fragment, local);
      transition_out(hotkey2.$$.fragment, local);
      transition_out(if_block0);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(section0);
      destroy_component(hotkey0);
      destroy_component(hotkey1);
      destroy_component(hotkey2);
      if (detaching) detach(t4);
      if (detaching) detach(section1);
      destroy_each(each_blocks, detaching);
      if (detaching) detach(t7);
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach(t8);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach(if_block1_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}

// (169:8) {#each Object.keys(bots) as bot}
function create_each_block$a(ctx) {
  var option;
  var t_value = /*bot*/ctx[7] + "";
  var t;
  var option_value_value;
  return {
    c: function c() {
      option = element("option");
      t = text(t_value);
      option.__value = option_value_value = /*bot*/ctx[7];
      option.value = option.__value;
    },
    m: function m(target, anchor) {
      insert(target, option, anchor);
      append(option, t);
    },
    p: noop,
    d: function d(detaching) {
      if (detaching) detach(option);
    }
  };
}

// (175:4) {#if Object.keys(bot.opts()).length}
function create_if_block_4(ctx) {
  var section;
  var h3;
  var t1;
  var label;
  var t3;
  var input;
  var t4;
  var options;
  var current;
  var mounted;
  var dispose;
  options = new Options({
    props: {
      bot: /*bot*/ctx[7]
    }
  });
  return {
    c: function c() {
      section = element("section");
      h3 = element("h3");
      h3.textContent = "Options";
      t1 = space();
      label = element("label");
      label.textContent = "debug";
      t3 = space();
      input = element("input");
      t4 = space();
      create_component(options.$$.fragment);
      attr(h3, "class", "svelte-fn09gm");
      attr(label, "for", "ai-option-debug");
      attr(label, "class", "svelte-fn09gm");
      attr(input, "id", "ai-option-debug");
      attr(input, "type", "checkbox");
      attr(input, "class", "svelte-fn09gm");
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      append(section, h3);
      append(section, t1);
      append(section, label);
      append(section, t3);
      append(section, input);
      input.checked = /*debug*/ctx[1];
      append(section, t4);
      mount_component(options, section, null);
      current = true;
      if (!mounted) {
        dispose = [listen(input, "change", /*input_change_handler*/ctx[18]), listen(input, "change", /*OnDebug*/ctx[9])];
        mounted = true;
      }
    },
    p: function p(ctx, dirty) {
      if (dirty & /*debug*/2) {
        input.checked = /*debug*/ctx[1];
      }
      var options_changes = {};
      if (dirty & /*bot*/128) options_changes.bot = /*bot*/ctx[7];
      options.$set(options_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(options.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(options.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(section);
      destroy_component(options);
      mounted = false;
      run_all(dispose);
    }
  };
}

// (184:4) {#if botAction || iterationCounter}
function create_if_block_1$6(ctx) {
  var section;
  var h3;
  var t1;
  var t2;
  var if_block0 = /*progress*/ctx[2] && /*progress*/ctx[2] < 1.0 && create_if_block_3$1(ctx);
  var if_block1 = /*botAction*/ctx[5] && create_if_block_2$4(ctx);
  return {
    c: function c() {
      section = element("section");
      h3 = element("h3");
      h3.textContent = "Result";
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      attr(h3, "class", "svelte-fn09gm");
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      append(section, h3);
      append(section, t1);
      if (if_block0) if_block0.m(section, null);
      append(section, t2);
      if (if_block1) if_block1.m(section, null);
    },
    p: function p(ctx, dirty) {
      if (/*progress*/ctx[2] && /*progress*/ctx[2] < 1.0) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3$1(ctx);
          if_block0.c();
          if_block0.m(section, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (/*botAction*/ctx[5]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2$4(ctx);
          if_block1.c();
          if_block1.m(section, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    d: function d(detaching) {
      if (detaching) detach(section);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
}

// (187:6) {#if progress && progress < 1.0}
function create_if_block_3$1(ctx) {
  var progress_1;
  return {
    c: function c() {
      progress_1 = element("progress");
      progress_1.value = /*progress*/ctx[2];
    },
    m: function m(target, anchor) {
      insert(target, progress_1, anchor);
    },
    p: function p(ctx, dirty) {
      if (dirty & /*progress*/4) {
        progress_1.value = /*progress*/ctx[2];
      }
    },
    d: function d(detaching) {
      if (detaching) detach(progress_1);
    }
  };
}

// (191:6) {#if botAction}
function create_if_block_2$4(ctx) {
  var ul;
  var li0;
  var t0;
  var t1;
  var t2;
  var li1;
  var t3;
  var t4_value = JSON.stringify(/*botActionArgs*/ctx[6]) + "";
  var t4;
  return {
    c: function c() {
      ul = element("ul");
      li0 = element("li");
      t0 = text("Action: ");
      t1 = text(/*botAction*/ctx[5]);
      t2 = space();
      li1 = element("li");
      t3 = text("Args: ");
      t4 = text(t4_value);
      attr(li0, "class", "svelte-fn09gm");
      attr(li1, "class", "svelte-fn09gm");
      attr(ul, "class", "svelte-fn09gm");
    },
    m: function m(target, anchor) {
      insert(target, ul, anchor);
      append(ul, li0);
      append(li0, t0);
      append(li0, t1);
      append(ul, t2);
      append(ul, li1);
      append(li1, t3);
      append(li1, t4);
    },
    p: function p(ctx, dirty) {
      if (dirty & /*botAction*/32) set_data(t1, /*botAction*/ctx[5]);
      if (dirty & /*botActionArgs*/64 && t4_value !== (t4_value = JSON.stringify(/*botActionArgs*/ctx[6]) + "")) set_data(t4, t4_value);
    },
    d: function d(detaching) {
      if (detaching) detach(ul);
    }
  };
}
function create_fragment$y(ctx) {
  var section;
  var current_block_type_index;
  var if_block;
  var current;
  var mounted;
  var dispose;
  var if_block_creators = [create_if_block$d, create_if_block_5, create_else_block$3];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if (/*client*/ctx[0].game.ai && ! /*client*/ctx[0].multiplayer) return 0;
    if (/*client*/ctx[0].multiplayer) return 1;
    return 2;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c: function c() {
      section = element("section");
      if_block.c();
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;
      if (!mounted) {
        dispose = listen(window, "keydown", /*OnKeyDown*/ctx[14]);
        mounted = true;
      }
    },
    p: function p(ctx, _ref74) {
      var _ref75 = _slicedToArray(_ref74, 1),
        dirty = _ref75[0];
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(section, null);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(section);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }
  };
}
function instance$y($$self, $$props, $$invalidate) {
  var client = $$props.client;
  var clientManager = $$props.clientManager;
  var ToggleVisibility = $$props.ToggleVisibility;
  var _getContext5 = getContext('secondaryPane'),
    secondaryPane = _getContext5.secondaryPane;
  var bots = {
    'MCTS': _ai7998b00f.M,
    'Random': _ai7998b00f.R
  };
  var debug = false;
  var progress = null;
  var iterationCounter = 0;
  var metadata = null;
  var iterationCallback = function iterationCallback(_ref76) {
    var c = _ref76.iterationCounter,
      numIterations = _ref76.numIterations,
      m = _ref76.metadata;
    $$invalidate(3, iterationCounter = c);
    $$invalidate(2, progress = c / numIterations);
    metadata = m;
    if (debug && metadata) {
      secondaryPane.set({
        component: MCTS,
        metadata: metadata
      });
    }
  };
  function OnDebug() {
    if (debug && metadata) {
      secondaryPane.set({
        component: MCTS,
        metadata: metadata
      });
    } else {
      secondaryPane.set(null);
    }
  }
  var bot;
  if (client.game.ai) {
    bot = new _ai7998b00f.M({
      game: client.game,
      enumerate: client.game.ai.enumerate,
      iterationCallback: iterationCallback
    });
    bot.setOpt('async', true);
  }
  var selectedBot;
  var botAction;
  var botActionArgs;
  function ChangeBot() {
    var botConstructor = bots[selectedBot];
    $$invalidate(7, bot = new botConstructor({
      game: client.game,
      enumerate: client.game.ai.enumerate,
      iterationCallback: iterationCallback
    }));
    bot.setOpt('async', true);
    $$invalidate(5, botAction = null);
    metadata = null;
    secondaryPane.set(null);
    $$invalidate(3, iterationCounter = 0);
  }
  function Step$1() {
    return _Step$.apply(this, arguments);
  }
  function _Step$() {
    _Step$ = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            $$invalidate(5, botAction = null);
            metadata = null;
            $$invalidate(3, iterationCounter = 0);
            _context2.n = 1;
            return (0, _ai7998b00f.S)(client, bot);
          case 1:
            t = _context2.v;
            if (t) {
              $$invalidate(5, botAction = t.payload.type);
              $$invalidate(6, botActionArgs = t.payload.args);
            }
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return _Step$.apply(this, arguments);
  }
  function Simulate() {
    var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
    var sleepTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    $$invalidate(5, botAction = null);
    metadata = null;
    $$invalidate(3, iterationCounter = 0);
    var step = /*#__PURE__*/function () {
      var _ref77 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var i, action;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              i = 0;
            case 1:
              if (!(i < iterations)) {
                _context.n = 5;
                break;
              }
              _context.n = 2;
              return (0, _ai7998b00f.S)(client, bot);
            case 2:
              action = _context.v;
              if (action) {
                _context.n = 3;
                break;
              }
              return _context.a(3, 5);
            case 3:
              _context.n = 4;
              return new Promise(function (resolve) {
                return setTimeout(resolve, sleepTimeout);
              });
            case 4:
              i++;
              _context.n = 1;
              break;
            case 5:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function step() {
        return _ref77.apply(this, arguments);
      };
    }();
    return step();
  }
  function Exit() {
    client.overrideGameState(null);
    secondaryPane.set(null);
    $$invalidate(1, debug = false);
  }
  function Reset() {
    client.reset();
    $$invalidate(5, botAction = null);
    metadata = null;
    $$invalidate(3, iterationCounter = 0);
    Exit();
  }
  function OnKeyDown(e) {
    // ESC.
    if (e.keyCode == 27) {
      Exit();
    }
  }
  onDestroy(Exit);
  function select_change_handler() {
    selectedBot = select_value(this);
    $$invalidate(4, selectedBot);
    $$invalidate(8, bots);
  }
  function input_change_handler() {
    debug = this.checked;
    $$invalidate(1, debug);
  }
  $$self.$$set = function ($$props) {
    if ('client' in $$props) $$invalidate(0, client = $$props.client);
    if ('clientManager' in $$props) $$invalidate(15, clientManager = $$props.clientManager);
    if ('ToggleVisibility' in $$props) $$invalidate(16, ToggleVisibility = $$props.ToggleVisibility);
  };
  return [client, debug, progress, iterationCounter, selectedBot, botAction, botActionArgs, bot, bots, OnDebug, ChangeBot, Step$1, Simulate, Reset, OnKeyDown, clientManager, ToggleVisibility, select_change_handler, input_change_handler];
}
var AI = /*#__PURE__*/function (_SvelteComponent33) {
  function AI(options) {
    var _this34;
    _classCallCheck2(this, AI);
    _this34 = _callSuper(this, AI);
    init(_this34, options, instance$y, create_fragment$y, safe_not_equal, {
      client: 0,
      clientManager: 15,
      ToggleVisibility: 16
    }, add_css$p);
    return _this34;
  }
  _inherits2(AI, _SvelteComponent33);
  return _createClass2(AI);
}(SvelteComponent);
/* src/client/debug/Debug.svelte generated by Svelte v3.49.0 */
function add_css$q(target) {
  append_styles(target, "svelte-8ymctk", ".debug-panel.svelte-8ymctk.svelte-8ymctk{position:fixed;color:#555;font-family:monospace;right:0;top:0;height:100%;font-size:14px;opacity:0.9;z-index:99999}.panel.svelte-8ymctk.svelte-8ymctk{display:flex;position:relative;flex-direction:row;height:100%}.visibility-toggle.svelte-8ymctk.svelte-8ymctk{position:absolute;box-sizing:border-box;top:7px;border:1px solid #ccc;border-radius:5px;width:48px;height:48px;padding:8px;background:white;color:#555;box-shadow:0 0 5px rgba(0, 0, 0, 0.2)}.visibility-toggle.svelte-8ymctk.svelte-8ymctk:hover,.visibility-toggle.svelte-8ymctk.svelte-8ymctk:focus{background:#eee}.opener.svelte-8ymctk.svelte-8ymctk{right:10px}.closer.svelte-8ymctk.svelte-8ymctk{left:-326px}@keyframes svelte-8ymctk-rotateFromZero{from{transform:rotateZ(0deg)}to{transform:rotateZ(180deg)}}.icon.svelte-8ymctk.svelte-8ymctk{display:flex;height:100%;animation:svelte-8ymctk-rotateFromZero 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s 1\n      normal forwards}.closer.svelte-8ymctk .icon.svelte-8ymctk{animation-direction:reverse}.pane.svelte-8ymctk.svelte-8ymctk{flex-grow:2;overflow-x:hidden;overflow-y:scroll;background:#fefefe;padding:20px;border-left:1px solid #ccc;box-shadow:-1px 0 5px rgba(0, 0, 0, 0.2);box-sizing:border-box;width:280px}.secondary-pane.svelte-8ymctk.svelte-8ymctk{background:#fefefe;overflow-y:scroll}.debug-panel.svelte-8ymctk button,.debug-panel.svelte-8ymctk select{cursor:pointer;font-size:14px;font-family:monospace}.debug-panel.svelte-8ymctk select{background:#eee;border:1px solid #bbb;color:#555;padding:3px;border-radius:3px}.debug-panel.svelte-8ymctk section{margin-bottom:20px}.debug-panel.svelte-8ymctk .screen-reader-only{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}");
}

// (199:2) {:else}
function create_else_block$4(ctx) {
  var div1;
  var t0;
  var menu;
  var t1;
  var div0;
  var switch_instance;
  var t2;
  var div1_transition;
  var current;
  var if_block0 = /*showToggleButton*/ctx[10] && create_if_block_3$2(ctx);
  menu = new Menu({
    props: {
      panes: /*panes*/ctx[6],
      pane: /*pane*/ctx[2]
    }
  });
  menu.$on("change", /*MenuChange*/ctx[8]);
  var switch_value = /*panes*/ctx[6][/*pane*/ctx[2]].component;
  function switch_props(ctx) {
    return {
      props: {
        client: /*client*/ctx[4],
        clientManager: /*clientManager*/ctx[0],
        ToggleVisibility: /*ToggleVisibility*/ctx[9]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  var if_block1 = /*$secondaryPane*/ctx[5] && create_if_block_2$5(ctx);
  return {
    c: function c() {
      div1 = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(menu.$$.fragment);
      t1 = space();
      div0 = element("div");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      t2 = space();
      if (if_block1) if_block1.c();
      attr(div0, "class", "pane svelte-8ymctk");
      attr(div0, "role", "region");
      attr(div0, "aria-label", /*pane*/ctx[2]);
      attr(div0, "tabindex", "-1");
      attr(div1, "class", "panel svelte-8ymctk");
    },
    m: function m(target, anchor) {
      insert(target, div1, anchor);
      if (if_block0) if_block0.m(div1, null);
      append(div1, t0);
      mount_component(menu, div1, null);
      append(div1, t1);
      append(div1, div0);
      if (switch_instance) {
        mount_component(switch_instance, div0, null);
      }

      /*div0_binding*/
      ctx[16](div0);
      append(div1, t2);
      if (if_block1) if_block1.m(div1, null);
      current = true;
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
      if (/*showToggleButton*/ctx[10]) if_block0.p(ctx, dirty);
      var menu_changes = {};
      if (dirty & /*pane*/4) menu_changes.pane = /*pane*/ctx[2];
      menu.$set(menu_changes);
      var switch_instance_changes = {};
      if (dirty & /*client*/16) switch_instance_changes.client = /*client*/ctx[4];
      if (dirty & /*clientManager*/1) switch_instance_changes.clientManager = /*clientManager*/ctx[0];
      if (switch_value !== (switch_value = /*panes*/ctx[6][/*pane*/ctx[2]].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div0, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
      if (!current || dirty & /*pane*/4) {
        attr(div0, "aria-label", /*pane*/ctx[2]);
      }
      if (/*$secondaryPane*/ctx[5]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*$secondaryPane*/32) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2$5(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(menu.$$.fragment, local);
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      transition_in(if_block1);
      add_render_callback(function () {
        if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, _objectSpread({
          x: 400
        }, /*transitionOpts*/ctx[12]), true);
        div1_transition.run(1);
      });
      current = true;
    },
    o: function o(local) {
      transition_out(if_block0);
      transition_out(menu.$$.fragment, local);
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      transition_out(if_block1);
      if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, _objectSpread({
        x: 400
      }, /*transitionOpts*/ctx[12]), false);
      div1_transition.run(0);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(div1);
      if (if_block0) if_block0.d();
      destroy_component(menu);
      if (switch_instance) destroy_component(switch_instance);
      /*div0_binding*/
      ctx[16](null);
      if (if_block1) if_block1.d();
      if (detaching && div1_transition) div1_transition.end();
    }
  };
}

// (185:2) {#if !visible}
function create_if_block$e(ctx) {
  var if_block_anchor;
  var current;
  var if_block = /*showToggleButton*/ctx[10] && create_if_block_1$7(ctx);
  return {
    c: function c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m: function m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p: function p(ctx, dirty) {
      if (/*showToggleButton*/ctx[10]) if_block.p(ctx, dirty);
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }
  };
}

// (201:6) {#if showToggleButton}
function create_if_block_3$2(ctx) {
  var button;
  var span;
  var chevron;
  var button_intro;
  var button_outro;
  var current;
  var mounted;
  var dispose;
  chevron = new FaChevronRight({});
  return {
    c: function c() {
      button = element("button");
      span = element("span");
      create_component(chevron.$$.fragment);
      attr(span, "class", "icon svelte-8ymctk");
      attr(span, "aria-hidden", "true");
      attr(button, "class", "visibility-toggle closer svelte-8ymctk");
      attr(button, "title", "Hide Debug Panel");
    },
    m: function m(target, anchor) {
      insert(target, button, anchor);
      append(button, span);
      mount_component(chevron, span, null);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", /*ToggleVisibility*/ctx[9]);
        mounted = true;
      }
    },
    p: noop,
    i: function i(local) {
      if (current) return;
      transition_in(chevron.$$.fragment, local);
      add_render_callback(function () {
        if (button_outro) button_outro.end(1);
        button_intro = create_in_transition(button, /*receive*/ctx[14], {
          key: 'toggle'
        });
        button_intro.start();
      });
      current = true;
    },
    o: function o(local) {
      transition_out(chevron.$$.fragment, local);
      if (button_intro) button_intro.invalidate();
      button_outro = create_out_transition(button, /*send*/ctx[13], {
        key: 'toggle'
      });
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(button);
      destroy_component(chevron);
      if (detaching && button_outro) button_outro.end();
      mounted = false;
      dispose();
    }
  };
}

// (229:6) {#if $secondaryPane}
function create_if_block_2$5(ctx) {
  var div;
  var switch_instance;
  var current;
  var switch_value = /*$secondaryPane*/ctx[5].component;
  function switch_props(ctx) {
    return {
      props: {
        metadata: /*$secondaryPane*/ctx[5].metadata
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c: function c() {
      div = element("div");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      attr(div, "class", "secondary-pane svelte-8ymctk");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      if (switch_instance) {
        mount_component(switch_instance, div, null);
      }
      current = true;
    },
    p: function p(ctx, dirty) {
      var switch_instance_changes = {};
      if (dirty & /*$secondaryPane*/32) switch_instance_changes.metadata = /*$secondaryPane*/ctx[5].metadata;
      if (switch_value !== (switch_value = /*$secondaryPane*/ctx[5].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(div);
      if (switch_instance) destroy_component(switch_instance);
    }
  };
}

// (186:4) {#if showToggleButton}
function create_if_block_1$7(ctx) {
  var button;
  var span;
  var chevron;
  var button_intro;
  var button_outro;
  var current;
  var mounted;
  var dispose;
  chevron = new FaChevronRight({});
  return {
    c: function c() {
      button = element("button");
      span = element("span");
      create_component(chevron.$$.fragment);
      attr(span, "class", "icon svelte-8ymctk");
      attr(span, "aria-hidden", "true");
      attr(button, "class", "visibility-toggle opener svelte-8ymctk");
      attr(button, "title", "Show Debug Panel");
    },
    m: function m(target, anchor) {
      insert(target, button, anchor);
      append(button, span);
      mount_component(chevron, span, null);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", /*ToggleVisibility*/ctx[9]);
        mounted = true;
      }
    },
    p: noop,
    i: function i(local) {
      if (current) return;
      transition_in(chevron.$$.fragment, local);
      add_render_callback(function () {
        if (button_outro) button_outro.end(1);
        button_intro = create_in_transition(button, /*receive*/ctx[14], {
          key: 'toggle'
        });
        button_intro.start();
      });
      current = true;
    },
    o: function o(local) {
      transition_out(chevron.$$.fragment, local);
      if (button_intro) button_intro.invalidate();
      button_outro = create_out_transition(button, /*send*/ctx[13], {
        key: 'toggle'
      });
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(button);
      destroy_component(chevron);
      if (detaching && button_outro) button_outro.end();
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$z(ctx) {
  var section;
  var current_block_type_index;
  var if_block;
  var current;
  var mounted;
  var dispose;
  var if_block_creators = [create_if_block$e, create_else_block$4];
  var if_blocks = [];
  function select_block_type(ctx, dirty) {
    if (! /*visible*/ctx[3]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c: function c() {
      section = element("section");
      if_block.c();
      attr(section, "aria-label", "boardgame.io Debug Panel");
      attr(section, "class", "debug-panel svelte-8ymctk");
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;
      if (!mounted) {
        dispose = listen(window, "keypress", /*Keypress*/ctx[11]);
        mounted = true;
      }
    },
    p: function p(ctx, _ref78) {
      var _ref79 = _slicedToArray(_ref78, 1),
        dirty = _ref79[0];
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(section, null);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) detach(section);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }
  };
}
function instance$z($$self, $$props, $$invalidate) {
  var client;
  var $clientManager,
    $$unsubscribe_clientManager = noop,
    $$subscribe_clientManager = function $$subscribe_clientManager() {
      return $$unsubscribe_clientManager(), $$unsubscribe_clientManager = subscribe(clientManager, function ($$value) {
        return $$invalidate(15, $clientManager = $$value);
      }), clientManager;
    };
  var $secondaryPane;
  $$self.$$.on_destroy.push(function () {
    return $$unsubscribe_clientManager();
  });
  var clientManager = $$props.clientManager;
  $$subscribe_clientManager();
  var panes = {
    main: {
      label: 'Main',
      shortcut: 'm',
      component: Main
    },
    log: {
      label: 'Log',
      shortcut: 'l',
      component: Log
    },
    info: {
      label: 'Info',
      shortcut: 'i',
      component: Info
    },
    ai: {
      label: 'AI',
      shortcut: 'a',
      component: AI
    }
  };
  var disableHotkeys = writable(false);
  var secondaryPane = writable(null);
  component_subscribe($$self, secondaryPane, function (value) {
    return $$invalidate(5, $secondaryPane = value);
  });
  setContext('hotkeys', {
    disableHotkeys: disableHotkeys
  });
  setContext('secondaryPane', {
    secondaryPane: secondaryPane
  });
  var paneDiv;
  var pane = 'main';
  function MenuChange(e) {
    $$invalidate(2, pane = e.detail);
    paneDiv.focus();
  }

  // Toggle debugger visibilty
  function ToggleVisibility() {
    $$invalidate(3, visible = !visible);
  }
  var debugOpt = $clientManager.client.debugOpt;
  var visible = !debugOpt || !debugOpt.collapseOnLoad;
  var showToggleButton = !debugOpt || !debugOpt.hideToggleButton;
  function Keypress(e) {
    if (e.key == '.') {
      ToggleVisibility();
      return;
    }

    // Set displayed pane
    if (!visible) return;
    Object.entries(panes).forEach(function (_ref80) {
      var _ref81 = _slicedToArray(_ref80, 2),
        key = _ref81[0],
        shortcut = _ref81[1].shortcut;
      if (e.key == shortcut) {
        $$invalidate(2, pane = key);
      }
    });
  }
  var transitionOpts = {
    duration: 150,
    easing: cubicOut
  };
  var _crossfade = crossfade(transitionOpts),
    _crossfade2 = _slicedToArray(_crossfade, 2),
    send = _crossfade2[0],
    receive = _crossfade2[1];
  function div0_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](function () {
      paneDiv = $$value;
      $$invalidate(1, paneDiv);
    });
  }
  $$self.$$set = function ($$props) {
    if ('clientManager' in $$props) $$subscribe_clientManager($$invalidate(0, clientManager = $$props.clientManager));
  };
  $$self.$$.update = function () {
    if ($$self.$$.dirty & /*$clientManager*/32768) {
      $$invalidate(4, client = $clientManager.client);
    }
  };
  return [clientManager, paneDiv, pane, visible, client, $secondaryPane, panes, secondaryPane, MenuChange, ToggleVisibility, showToggleButton, Keypress, transitionOpts, send, receive, $clientManager, div0_binding];
}
var Debug = exports.D = /*#__PURE__*/function (_SvelteComponent34) {
  function Debug(options) {
    var _this35;
    _classCallCheck2(this, Debug);
    _this35 = _callSuper(this, Debug);
    init(_this35, options, instance$z, create_fragment$z, safe_not_equal, {
      clientManager: 0
    }, add_css$q);
    return _this35;
  }
  _inherits2(Debug, _SvelteComponent34);
  return _createClass2(Debug);
}(SvelteComponent);
},{"./turn-order-8cc4909b.js":"node_modules/boardgame.io/dist/esm/turn-order-8cc4909b.js","./reducer-24ea3e4c.js":"node_modules/boardgame.io/dist/esm/reducer-24ea3e4c.js","flatted":"node_modules/flatted/esm/index.js","./ai-7998b00f.js":"node_modules/boardgame.io/dist/esm/ai-7998b00f.js"}],"node_modules/@babel/runtime/helpers/esm/typeof.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _typeof;
function _typeof(o) {
  "@babel/helpers - typeof";

  return exports.default = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
},{}],"node_modules/@babel/runtime/helpers/esm/toPrimitive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toPrimitive;
var _typeof2 = _interopRequireDefault(require("./typeof.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function toPrimitive(t, r) {
  if ("object" != (0, _typeof2.default)(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0, _typeof2.default)(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
},{"./typeof.js":"node_modules/@babel/runtime/helpers/esm/typeof.js"}],"node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toPropertyKey;
var _typeof2 = _interopRequireDefault(require("./typeof.js"));
var _toPrimitive = _interopRequireDefault(require("./toPrimitive.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function toPropertyKey(t) {
  var i = (0, _toPrimitive.default)(t, "string");
  return "symbol" == (0, _typeof2.default)(i) ? i : i + "";
}
},{"./typeof.js":"node_modules/@babel/runtime/helpers/esm/typeof.js","./toPrimitive.js":"node_modules/@babel/runtime/helpers/esm/toPrimitive.js"}],"node_modules/@babel/runtime/helpers/esm/defineProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _defineProperty;
var _toPropertyKey = _interopRequireDefault(require("./toPropertyKey.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) {
  return (r = (0, _toPropertyKey.default)(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
},{"./toPropertyKey.js":"node_modules/@babel/runtime/helpers/esm/toPropertyKey.js"}],"node_modules/@babel/runtime/helpers/esm/objectSpread2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _objectSpread2;
var _defineProperty = _interopRequireDefault(require("./defineProperty.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0, _defineProperty.default)(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
},{"./defineProperty.js":"node_modules/@babel/runtime/helpers/esm/defineProperty.js"}],"node_modules/redux/es/redux.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__DO_NOT_USE__ActionTypes = void 0;
exports.applyMiddleware = applyMiddleware;
exports.bindActionCreators = bindActionCreators;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.createStore = createStore;
exports.legacy_createStore = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};
var ActionTypes = exports.__DO_NOT_USE__ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;
  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }
  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);
  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other

  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}
function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}
function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}
function kindOf(val) {
  var typeOfVal = typeof val;
  if ("development" !== 'production') {
    typeOfVal = miniKindOf(val);
  }
  return typeOfVal;
}

/**
 * @deprecated
 *
 * **We recommend using the `configureStore` method
 * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
 *
 * Redux Toolkit is our recommended approach for writing Redux logic today,
 * including store setup, reducers, data fetching, and more.
 *
 * **For more details, please read this Redux docs page:**
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * `configureStore` from Redux Toolkit is an improved version of `createStore` that
 * simplifies setup and helps avoid common bugs.
 *
 * You should not be using the `redux` core package by itself today, except for learning purposes.
 * The `createStore` method from the core `redux` package will not be removed, but we encourage
 * all users to migrate to using Redux Toolkit for all Redux code.
 *
 * If you want to use `createStore` without this visual deprecation warning, use
 * the `legacy_createStore` import instead:
 *
 * `import { legacy_createStore as createStore} from 'redux'`
 *
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error("development" === "production" ? formatProdErrorMessage(0) : 'It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.');
  }
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error("development" === "production" ? formatProdErrorMessage(1) : "Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  if (typeof reducer !== 'function') {
    throw new Error("development" === "production" ? formatProdErrorMessage(2) : "Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
  }
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */

  function getState() {
    if (isDispatching) {
      throw new Error("development" === "production" ? formatProdErrorMessage(3) : 'You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }
    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error("development" === "production" ? formatProdErrorMessage(4) : "Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
    }
    if (isDispatching) {
      throw new Error("development" === "production" ? formatProdErrorMessage(5) : 'You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error("development" === "production" ? formatProdErrorMessage(6) : 'You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error("development" === "production" ? formatProdErrorMessage(7) : "Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    }
    if (typeof action.type === 'undefined') {
      throw new Error("development" === "production" ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }
    if (isDispatching) {
      throw new Error("development" === "production" ? formatProdErrorMessage(9) : 'Reducers may not dispatch actions.');
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */

  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error("development" === "production" ? formatProdErrorMessage(10) : "Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
    }
    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */

  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error("development" === "production" ? formatProdErrorMessage(11) : "Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.

  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
/**
 * Creates a Redux store that holds the state tree.
 *
 * **We recommend using `configureStore` from the
 * `@reduxjs/toolkit` package**, which replaces `createStore`:
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

var legacy_createStore = exports.legacy_createStore = createStore;

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */

  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty
}
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }
  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }
  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;
  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });
    if (typeof initialState === 'undefined') {
      throw new Error("development" === "production" ? formatProdErrorMessage(12) : "The slice reducer for key \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }
    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("development" === "production" ? formatProdErrorMessage(13) : "The slice reducer for key \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle '" + ActionTypes.INIT + "' or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;
  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error("development" === "production" ? formatProdErrorMessage(14) : "When called with an action of type " + (actionType ? "\"" + String(actionType) + "\"" : '(unknown type)') + ", the slice reducer for key \"" + _key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.");
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("development" === "production" ? formatProdErrorMessage(16) : "bindActionCreators expected an object or a function, but instead received: '" + kindOf(actionCreators) + "'. " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }
  var boundActionCreators = {};
  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);
      var _dispatch = function dispatch() {
        throw new Error("development" === "production" ? formatProdErrorMessage(15) : 'Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };
      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}
},{"@babel/runtime/helpers/esm/objectSpread2":"node_modules/@babel/runtime/helpers/esm/objectSpread2.js"}],"node_modules/boardgame.io/dist/esm/initialize-7316768f.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I = InitializeGame;
var _turnOrder8cc4909b = require("./turn-order-8cc4909b.js");
var _reducer24ea3e4c = require("./reducer-24ea3e4c.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Creates the initial game state.
 */
function InitializeGame(_ref) {
  var game = _ref.game,
    numPlayers = _ref.numPlayers,
    setupData = _ref.setupData;
  game = (0, _reducer24ea3e4c.P)(game);
  if (!numPlayers) {
    numPlayers = 2;
  }
  var ctx = game.flow.ctx(numPlayers);
  var state = {
    // User managed state.
    G: {},
    // Framework managed state.
    ctx: ctx,
    // Plugin related state.
    plugins: {}
  };
  // Run plugins over initial state.
  state = (0, _turnOrder8cc4909b.t)(state, {
    game: game
  });
  state = (0, _turnOrder8cc4909b.E)(state, {
    game: game,
    playerID: undefined
  });
  var pluginAPIs = (0, _turnOrder8cc4909b.a)(state);
  state.G = game.setup(_objectSpread(_objectSpread({}, pluginAPIs), {}, {
    ctx: state.ctx
  }), setupData);
  var initial = _objectSpread(_objectSpread({}, state), {}, {
    // List of {G, ctx} pairs that can be undone.
    _undo: [],
    // List of {G, ctx} pairs that can be redone.
    _redo: [],
    // A monotonically non-decreasing ID to ensure that
    // state updates are only allowed from clients that
    // are at the same version that the server.
    _stateID: 0
  });
  initial = game.flow.init(initial);
  // Initialize undo stack.
  var _FlushAndValidate = (0, _turnOrder8cc4909b.q)(initial, {
    game: game
  });
  var _FlushAndValidate2 = _slicedToArray(_FlushAndValidate, 1);
  initial = _FlushAndValidate2[0];
  if (!game.disableUndo) {
    initial._undo = [{
      G: initial.G,
      ctx: initial.ctx,
      plugins: initial.plugins
    }];
  }
  return initial;
}
},{"./turn-order-8cc4909b.js":"node_modules/boardgame.io/dist/esm/turn-order-8cc4909b.js","./reducer-24ea3e4c.js":"node_modules/boardgame.io/dist/esm/reducer-24ea3e4c.js"}],"node_modules/boardgame.io/dist/esm/transport-ce07b771.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.T = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var Transport = exports.T = /*#__PURE__*/function () {
  function Transport(_ref) {
    var transportDataCallback = _ref.transportDataCallback,
      gameName = _ref.gameName,
      playerID = _ref.playerID,
      matchID = _ref.matchID,
      credentials = _ref.credentials,
      numPlayers = _ref.numPlayers;
    _classCallCheck(this, Transport);
    /** Callback to let the client know when the connection status has changed. */
    this.connectionStatusCallback = function () {};
    this.isConnected = false;
    this.transportDataCallback = transportDataCallback;
    this.gameName = gameName || 'default';
    this.playerID = playerID || null;
    this.matchID = matchID || 'default';
    this.credentials = credentials;
    this.numPlayers = numPlayers || 2;
  }
  /** Subscribe to connection state changes. */
  return _createClass(Transport, [{
    key: "subscribeToConnectionStatus",
    value: function subscribeToConnectionStatus(fn) {
      this.connectionStatusCallback = fn;
    }
    /** Transport implementations should call this when they connect/disconnect. */
  }, {
    key: "setConnectionStatus",
    value: function setConnectionStatus(isConnected) {
      this.isConnected = isConnected;
      this.connectionStatusCallback();
    }
    /** Transport implementations should call this when they receive data from a master. */
  }, {
    key: "notifyClient",
    value: function notifyClient(data) {
      this.transportDataCallback(data);
    }
  }]);
}();
},{}],"node_modules/boardgame.io/dist/esm/client-f7f02b82.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.C = Client;
var _nonSecure = require("nanoid/non-secure");
var _Debug8242c26e = require("./Debug-8242c26e.js");
var _redux = require("redux");
var _turnOrder8cc4909b = require("./turn-order-8cc4909b.js");
var _reducer24ea3e4c = require("./reducer-24ea3e4c.js");
var _initialize7316768f = require("./initialize-7316768f.js");
var _transportCe07b = require("./transport-ce07b771.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * This class doesn’t do anything, but simplifies the client class by providing
 * dummy functions to call, so we don’t need to mock them in the client.
 */
var DummyImpl = /*#__PURE__*/function (_Transport) {
  function DummyImpl() {
    _classCallCheck(this, DummyImpl);
    return _callSuper(this, DummyImpl, arguments);
  }
  _inherits(DummyImpl, _Transport);
  return _createClass(DummyImpl, [{
    key: "connect",
    value: function connect() {}
  }, {
    key: "disconnect",
    value: function disconnect() {}
  }, {
    key: "sendAction",
    value: function sendAction() {}
  }, {
    key: "sendChatMessage",
    value: function sendChatMessage() {}
  }, {
    key: "requestSync",
    value: function requestSync() {}
  }, {
    key: "updateCredentials",
    value: function updateCredentials() {}
  }, {
    key: "updateMatchID",
    value: function updateMatchID() {}
  }, {
    key: "updatePlayerID",
    value: function updatePlayerID() {}
  }]);
}(_transportCe07b.T);
var DummyTransport = function DummyTransport(opts) {
  return new DummyImpl(opts);
};

/**
 * Class to manage boardgame.io clients and limit debug panel rendering.
 */
var ClientManager = /*#__PURE__*/function () {
  function ClientManager() {
    _classCallCheck(this, ClientManager);
    this.debugPanel = null;
    this.currentClient = null;
    this.clients = new Map();
    this.subscribers = new Map();
  }
  /**
   * Register a client with the client manager.
   */
  return _createClass(ClientManager, [{
    key: "register",
    value: function register(client) {
      // Add client to clients map.
      this.clients.set(client, client);
      // Mount debug for this client (no-op if another debug is already mounted).
      this.mountDebug(client);
      this.notifySubscribers();
    }
    /**
     * Unregister a client from the client manager.
     */
  }, {
    key: "unregister",
    value: function unregister(client) {
      // Remove client from clients map.
      this.clients.delete(client);
      if (this.currentClient === client) {
        // If the removed client owned the debug panel, unmount it.
        this.unmountDebug();
        // Mount debug panel for next available client.
        var _iterator = _createForOfIteratorHelper(this.clients),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 1),
              _client = _step$value[0];
            if (this.debugPanel) break;
            this.mountDebug(_client);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      this.notifySubscribers();
    }
    /**
     * Subscribe to the client manager state.
     * Calls the passed callback each time the current client changes or a client
     * registers/unregisters.
     * Returns a function to unsubscribe from the state updates.
     */
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      var _this = this;
      var id = Symbol();
      this.subscribers.set(id, callback);
      callback(this.getState());
      return function () {
        _this.subscribers.delete(id);
      };
    }
    /**
     * Switch to a client with a matching playerID.
     */
  }, {
    key: "switchPlayerID",
    value: function switchPlayerID(playerID) {
      // For multiplayer clients, try switching control to a different client
      // that is using the same transport layer.
      if (this.currentClient.multiplayer) {
        var _iterator2 = _createForOfIteratorHelper(this.clients),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _slicedToArray(_step2.value, 1),
              client = _step2$value[0];
            if (client.playerID === playerID && client.debugOpt !== false && client.multiplayer === this.currentClient.multiplayer) {
              this.switchToClient(client);
              return;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      // If no client matches, update the playerID for the current client.
      this.currentClient.updatePlayerID(playerID);
      this.notifySubscribers();
    }
    /**
     * Set the passed client as the active client for debugging.
     */
  }, {
    key: "switchToClient",
    value: function switchToClient(client) {
      if (client === this.currentClient) return;
      this.unmountDebug();
      this.mountDebug(client);
      this.notifySubscribers();
    }
    /**
     * Notify all subscribers of changes to the client manager state.
     */
  }, {
    key: "notifySubscribers",
    value: function notifySubscribers() {
      var arg = this.getState();
      this.subscribers.forEach(function (cb) {
        cb(arg);
      });
    }
    /**
     * Get the client manager state.
     */
  }, {
    key: "getState",
    value: function getState() {
      return {
        client: this.currentClient,
        debuggableClients: this.getDebuggableClients()
      };
    }
    /**
     * Get an array of the registered clients that haven’t disabled the debug panel.
     */
  }, {
    key: "getDebuggableClients",
    value: function getDebuggableClients() {
      return _toConsumableArray(this.clients.values()).filter(function (client) {
        return client.debugOpt !== false;
      });
    }
    /**
     * Mount the debug panel using the passed client.
     */
  }, {
    key: "mountDebug",
    value: function mountDebug(client) {
      if (client.debugOpt === false || this.debugPanel !== null || typeof document === 'undefined') {
        return;
      }
      var DebugImpl;
      var target = document.body;
      if ("development" !== 'production') {
        DebugImpl = _Debug8242c26e.D;
      }
      if (client.debugOpt && client.debugOpt !== true) {
        DebugImpl = client.debugOpt.impl || DebugImpl;
        target = client.debugOpt.target || target;
      }
      if (DebugImpl) {
        this.currentClient = client;
        this.debugPanel = new DebugImpl({
          target: target,
          props: {
            clientManager: this
          }
        });
      }
    }
    /**
     * Unmount the debug panel.
     */
  }, {
    key: "unmountDebug",
    value: function unmountDebug() {
      this.debugPanel.$destroy();
      this.debugPanel = null;
      this.currentClient = null;
    }
  }]);
}();
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Global client manager instance that all clients register with.
 */
var GlobalClientManager = new ClientManager();
/**
 * Standardise the passed playerID, using currentPlayer if appropriate.
 */
function assumedPlayerID(playerID, store, multiplayer) {
  // In singleplayer mode, if the client does not have a playerID
  // associated with it, we attach the currentPlayer as playerID.
  if (!multiplayer && (playerID === null || playerID === undefined)) {
    var state = store.getState();
    playerID = state.ctx.currentPlayer;
  }
  return playerID;
}
/**
 * createDispatchers
 *
 * Create action dispatcher wrappers with bound playerID and credentials
 */
function createDispatchers(storeActionType, innerActionNames, store, playerID, credentials, multiplayer) {
  var dispatchers = {};
  var _iterator3 = _createForOfIteratorHelper(innerActionNames),
    _step3;
  try {
    var _loop = function _loop() {
      var name = _step3.value;
      dispatchers[name] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var action = _turnOrder8cc4909b.A[storeActionType](name, args, assumedPlayerID(playerID, store, multiplayer), credentials);
        store.dispatch(action);
      };
    };
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return dispatchers;
}
// Creates a set of dispatchers to make moves.
var createMoveDispatchers = createDispatchers.bind(null, 'makeMove');
// Creates a set of dispatchers to dispatch game flow events.
var createEventDispatchers = createDispatchers.bind(null, 'gameEvent');
// Creates a set of dispatchers to dispatch actions to plugins.
var createPluginDispatchers = createDispatchers.bind(null, 'plugin');
/**
 * Implementation of Client (see below).
 */
var _ClientImpl = /*#__PURE__*/function () {
  function _ClientImpl(_ref) {
    var _this2 = this;
    var game = _ref.game,
      debug = _ref.debug,
      numPlayers = _ref.numPlayers,
      multiplayer = _ref.multiplayer,
      matchID = _ref.matchID,
      playerID = _ref.playerID,
      credentials = _ref.credentials,
      enhancer = _ref.enhancer;
    _classCallCheck(this, _ClientImpl);
    this.game = (0, _reducer24ea3e4c.P)(game);
    this.playerID = playerID;
    this.matchID = matchID || 'default';
    this.credentials = credentials;
    this.multiplayer = multiplayer;
    this.debugOpt = debug;
    this.manager = GlobalClientManager;
    this.gameStateOverride = null;
    this.subscribers = {};
    this._running = false;
    this.reducer = (0, _reducer24ea3e4c.C)({
      game: this.game,
      isClient: multiplayer !== undefined
    });
    this.initialState = null;
    if (!multiplayer) {
      this.initialState = (0, _initialize7316768f.I)({
        game: this.game,
        numPlayers: numPlayers
      });
    }
    this.reset = function () {
      _this2.store.dispatch((0, _turnOrder8cc4909b.u)(_this2.initialState));
    };
    this.undo = function () {
      var undo$1 = (0, _turnOrder8cc4909b.v)(assumedPlayerID(_this2.playerID, _this2.store, _this2.multiplayer), _this2.credentials);
      _this2.store.dispatch(undo$1);
    };
    this.redo = function () {
      var redo$1 = (0, _turnOrder8cc4909b.w)(assumedPlayerID(_this2.playerID, _this2.store, _this2.multiplayer), _this2.credentials);
      _this2.store.dispatch(redo$1);
    };
    this.log = [];
    /**
     * Middleware that manages the log object.
     * Reducers generate deltalogs, which are log events
     * that are the result of application of a single action.
     * The master may also send back a deltalog or the entire
     * log depending on the type of request.
     * The middleware below takes care of all these cases while
     * managing the log object.
     */
    var LogMiddleware = function LogMiddleware(store) {
      return function (next) {
        return function (action) {
          var result = next(action);
          var state = store.getState();
          switch (action.type) {
            case _turnOrder8cc4909b.M:
            case _turnOrder8cc4909b.o:
            case _turnOrder8cc4909b.j:
            case _turnOrder8cc4909b.R:
              {
                var deltalog = state.deltalog;
                _this2.log = [].concat(_toConsumableArray(_this2.log), _toConsumableArray(deltalog));
                break;
              }
            case _turnOrder8cc4909b.m:
              {
                _this2.log = [];
                break;
              }
            case _turnOrder8cc4909b.P:
            case _turnOrder8cc4909b.l:
              {
                var id = -1;
                if (_this2.log.length > 0) {
                  id = _this2.log[_this2.log.length - 1]._stateID;
                }
                var _deltalog = action.deltalog || [];
                // Filter out actions that are already present
                // in the current log. This may occur when the
                // client adds an entry to the log followed by
                // the update from the master here.
                _deltalog = _deltalog.filter(function (l) {
                  return l._stateID > id;
                });
                _this2.log = [].concat(_toConsumableArray(_this2.log), _toConsumableArray(_deltalog));
                break;
              }
            case _turnOrder8cc4909b.k:
              {
                _this2.initialState = action.initialState;
                _this2.log = action.log || [];
                break;
              }
          }
          return result;
        };
      };
    };
    /**
     * Middleware that intercepts actions and sends them to the master,
     * which keeps the authoritative version of the state.
     */
    var TransportMiddleware = function TransportMiddleware(store) {
      return function (next) {
        return function (action) {
          var baseState = store.getState();
          var result = next(action);
          if (!('clientOnly' in action) && action.type !== _turnOrder8cc4909b.p) {
            _this2.transport.sendAction(baseState, action);
          }
          return result;
        };
      };
    };
    /**
     * Middleware that intercepts actions and invokes the subscription callback.
     */
    var SubscriptionMiddleware = function SubscriptionMiddleware() {
      return function (next) {
        return function (action) {
          var result = next(action);
          _this2.notifySubscribers();
          return result;
        };
      };
    };
    var middleware = (0, _redux.applyMiddleware)(_reducer24ea3e4c.T, SubscriptionMiddleware, TransportMiddleware, LogMiddleware);
    enhancer = enhancer !== undefined ? (0, _redux.compose)(middleware, enhancer) : middleware;
    this.store = (0, _redux.createStore)(this.reducer, this.initialState, enhancer);
    if (!multiplayer) multiplayer = DummyTransport;
    this.transport = multiplayer({
      transportDataCallback: function transportDataCallback(data) {
        return _this2.receiveTransportData(data);
      },
      gameKey: game,
      game: this.game,
      matchID: matchID,
      playerID: playerID,
      credentials: credentials,
      gameName: this.game.name,
      numPlayers: numPlayers
    });
    this.createDispatchers();
    this.chatMessages = [];
    this.sendChatMessage = function (payload) {
      _this2.transport.sendChatMessage(_this2.matchID, {
        id: (0, _nonSecure.nanoid)(7),
        sender: _this2.playerID,
        payload: payload
      });
    };
  }
  /** Handle incoming match data from a multiplayer transport. */
  return _createClass(_ClientImpl, [{
    key: "receiveMatchData",
    value: function receiveMatchData(matchData) {
      this.matchData = matchData;
      this.notifySubscribers();
    }
    /** Handle an incoming chat message from a multiplayer transport. */
  }, {
    key: "receiveChatMessage",
    value: function receiveChatMessage(message) {
      this.chatMessages = [].concat(_toConsumableArray(this.chatMessages), [message]);
      this.notifySubscribers();
    }
    /** Handle all incoming updates from a multiplayer transport. */
  }, {
    key: "receiveTransportData",
    value: function receiveTransportData(data) {
      var _data$args = _slicedToArray(data.args, 1),
        matchID = _data$args[0];
      if (matchID !== this.matchID) return;
      switch (data.type) {
        case 'sync':
          {
            var _data$args2 = _slicedToArray(data.args, 2),
              syncInfo = _data$args2[1];
            var action = (0, _turnOrder8cc4909b.s)(syncInfo);
            this.receiveMatchData(syncInfo.filteredMetadata);
            this.store.dispatch(action);
            break;
          }
        case 'update':
          {
            var _data$args3 = _slicedToArray(data.args, 3),
              state = _data$args3[1],
              deltalog = _data$args3[2];
            var currentState = this.store.getState();
            if (state._stateID >= currentState._stateID) {
              var _action = (0, _turnOrder8cc4909b.z)(state, deltalog);
              this.store.dispatch(_action);
            }
            break;
          }
        case 'patch':
          {
            var _data$args4 = _slicedToArray(data.args, 5),
              prevStateID = _data$args4[1],
              stateID = _data$args4[2],
              patch$1 = _data$args4[3],
              _deltalog2 = _data$args4[4];
            var currentStateID = this.store.getState()._stateID;
            if (prevStateID !== currentStateID) break;
            var _action2 = (0, _turnOrder8cc4909b.y)(prevStateID, stateID, patch$1, _deltalog2);
            this.store.dispatch(_action2);
            // Emit sync if patch apply failed.
            if (this.store.getState()._stateID === currentStateID) {
              this.transport.requestSync();
            }
            break;
          }
        case 'matchData':
          {
            var _data$args5 = _slicedToArray(data.args, 2),
              matchData = _data$args5[1];
            this.receiveMatchData(matchData);
            break;
          }
        case 'chat':
          {
            var _data$args6 = _slicedToArray(data.args, 2),
              chatMessage = _data$args6[1];
            this.receiveChatMessage(chatMessage);
            break;
          }
      }
    }
  }, {
    key: "notifySubscribers",
    value: function notifySubscribers() {
      var _this3 = this;
      Object.values(this.subscribers).forEach(function (fn) {
        return fn(_this3.getState());
      });
    }
  }, {
    key: "overrideGameState",
    value: function overrideGameState(state) {
      this.gameStateOverride = state;
      this.notifySubscribers();
    }
  }, {
    key: "start",
    value: function start() {
      this.transport.connect();
      this._running = true;
      this.manager.register(this);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.transport.disconnect();
      this._running = false;
      this.manager.unregister(this);
    }
  }, {
    key: "subscribe",
    value: function subscribe(fn) {
      var _this4 = this;
      var id = Object.keys(this.subscribers).length;
      this.subscribers[id] = fn;
      this.transport.subscribeToConnectionStatus(function () {
        return _this4.notifySubscribers();
      });
      if (this._running || !this.multiplayer) {
        fn(this.getState());
      }
      // Return a handle that allows the caller to unsubscribe.
      return function () {
        delete _this4.subscribers[id];
      };
    }
  }, {
    key: "getInitialState",
    value: function getInitialState() {
      return this.initialState;
    }
  }, {
    key: "getState",
    value: function getState() {
      var state = this.store.getState();
      if (this.gameStateOverride !== null) {
        state = this.gameStateOverride;
      }
      // This is the state before a sync with the game master.
      if (state === null) {
        return state;
      }
      // isActive.
      var isActive = true;
      var isPlayerActive = this.game.flow.isPlayerActive(state.G, state.ctx, this.playerID);
      if (this.multiplayer && !isPlayerActive) {
        isActive = false;
      }
      if (!this.multiplayer && this.playerID !== null && this.playerID !== undefined && !isPlayerActive) {
        isActive = false;
      }
      if (state.ctx.gameover !== undefined) {
        isActive = false;
      }
      // Secrets are normally stripped on the server,
      // but we also strip them here so that game developers
      // can see their effects while prototyping.
      // Do not strip again if this is a multiplayer game
      // since the server has already stripped secret info. (issue #818)
      if (!this.multiplayer) {
        state = _objectSpread(_objectSpread({}, state), {}, {
          G: this.game.playerView({
            G: state.G,
            ctx: state.ctx,
            playerID: this.playerID
          }),
          plugins: (0, _turnOrder8cc4909b.x)(state, this)
        });
      }
      // Combine into return value.
      return _objectSpread(_objectSpread({}, state), {}, {
        log: this.log,
        isActive: isActive,
        isConnected: this.transport.isConnected
      });
    }
  }, {
    key: "createDispatchers",
    value: function createDispatchers() {
      this.moves = createMoveDispatchers(this.game.moveNames, this.store, this.playerID, this.credentials, this.multiplayer);
      this.events = createEventDispatchers(this.game.flow.enabledEventNames, this.store, this.playerID, this.credentials, this.multiplayer);
      this.plugins = createPluginDispatchers(this.game.pluginNames, this.store, this.playerID, this.credentials, this.multiplayer);
    }
  }, {
    key: "updatePlayerID",
    value: function updatePlayerID(playerID) {
      this.playerID = playerID;
      this.createDispatchers();
      this.transport.updatePlayerID(playerID);
      this.notifySubscribers();
    }
  }, {
    key: "updateMatchID",
    value: function updateMatchID(matchID) {
      this.matchID = matchID;
      this.createDispatchers();
      this.transport.updateMatchID(matchID);
      this.notifySubscribers();
    }
  }, {
    key: "updateCredentials",
    value: function updateCredentials(credentials) {
      this.credentials = credentials;
      this.createDispatchers();
      this.transport.updateCredentials(credentials);
      this.notifySubscribers();
    }
  }]);
}();
/**
 * Client
 *
 * boardgame.io JS client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to a falsy value or a transportFactory, e.g., SocketIO()
 * @param {...object} matchID - The matchID that you want to connect to.
 * @param {...object} playerID - The playerID associated with this client.
 * @param {...string} credentials - The authentication credentials associated with this client.
 *
 * Returns:
 *   A JS object that provides an API to interact with the
 *   game by dispatching moves and events.
 */
function Client(opts) {
  return new _ClientImpl(opts);
}
},{"nanoid/non-secure":"node_modules/nanoid/non-secure/index.js","./Debug-8242c26e.js":"node_modules/boardgame.io/dist/esm/Debug-8242c26e.js","redux":"node_modules/redux/es/redux.js","./turn-order-8cc4909b.js":"node_modules/boardgame.io/dist/esm/turn-order-8cc4909b.js","./reducer-24ea3e4c.js":"node_modules/boardgame.io/dist/esm/reducer-24ea3e4c.js","./initialize-7316768f.js":"node_modules/boardgame.io/dist/esm/initialize-7316768f.js","./transport-ce07b771.js":"node_modules/boardgame.io/dist/esm/transport-ce07b771.js"}],"node_modules/boardgame.io/dist/esm/client-5f57c3f2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.a = exports.L = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var assertString = function assertString(str, label) {
  if (!str || typeof str !== 'string') {
    throw new Error("Expected ".concat(label, " string, got \"").concat(str, "\"."));
  }
};
var assertGameName = function assertGameName(name) {
  return assertString(name, 'game name');
};
var assertMatchID = function assertMatchID(id) {
  return assertString(id, 'match ID');
};
var validateBody = function validateBody(body, schema) {
  if (!body) throw new Error("Expected body, got \u201C".concat(body, "\u201D."));
  for (var key in schema) {
    var propSchema = schema[key];
    var types = Array.isArray(propSchema) ? propSchema : [propSchema];
    var received = body[key];
    if (!types.includes(_typeof(received))) {
      var union = types.join('|');
      throw new TypeError("Expected body.".concat(key, " to be of type ").concat(union, ", got \u201C").concat(received, "\u201D."));
    }
  }
};
var LobbyClientError = exports.a = /*#__PURE__*/function (_Error) {
  function LobbyClientError(message, details) {
    var _this;
    _classCallCheck(this, LobbyClientError);
    _this = _callSuper(this, LobbyClientError, [message]);
    _this.details = details;
    return _this;
  }
  _inherits(LobbyClientError, _Error);
  return _createClass(LobbyClientError);
}(/*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Create a boardgame.io Lobby API client.
 * @param server The API’s base URL, e.g. `http://localhost:8000`.
 */
var LobbyClient = exports.L = /*#__PURE__*/function () {
  function LobbyClient() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$server = _ref.server,
      server = _ref$server === void 0 ? '' : _ref$server;
    _classCallCheck(this, LobbyClient);
    // strip trailing slash if passed
    this.server = server.replace(/\/$/, '');
  }
  return _createClass(LobbyClient, [{
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(route, init) {
        var response, details, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.n = 1;
              return fetch(this.server + route, init);
            case 1:
              response = _context.v;
              if (response.ok) {
                _context.n = 9;
                break;
              }
              _context.p = 2;
              _context.n = 3;
              return response.clone().json();
            case 3:
              details = _context.v;
              _context.n = 8;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              _context.p = 5;
              _context.n = 6;
              return response.text();
            case 6:
              details = _context.v;
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t2 = _context.v;
              details = _t2.message;
            case 8:
              throw new LobbyClientError("HTTP status ".concat(response.status), details);
            case 9:
              return _context.a(2, response.json());
          }
        }, _callee, this, [[5, 7], [2, 4]]);
      }));
      function request(_x, _x2) {
        return _request.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(route, opts) {
        var init;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              init = {
                method: 'post',
                body: JSON.stringify(opts.body),
                headers: {
                  'Content-Type': 'application/json'
                }
              };
              if (opts.init) init = _objectSpread(_objectSpread(_objectSpread({}, init), opts.init), {}, {
                headers: _objectSpread(_objectSpread({}, init.headers), opts.init.headers)
              });
              return _context2.a(2, this.request(route, init));
          }
        }, _callee2, this);
      }));
      function post(_x3, _x4) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
    /**
     * Get a list of the game names available on this server.
     * @param  init Optional RequestInit interface to override defaults.
     * @return Array of game names.
     *
     * @example
     * lobbyClient.listGames()
     *   .then(console.log); // => ['chess', 'tic-tac-toe']
     */
  }, {
    key: "listGames",
    value: (function () {
      var _listGames = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(init) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2, this.request('/games', init));
          }
        }, _callee3, this);
      }));
      function listGames(_x5) {
        return _listGames.apply(this, arguments);
      }
      return listGames;
    }()
    /**
     * Get a list of the matches for a specific game type on the server.
     * @param  gameName The game to list for, e.g. 'tic-tac-toe'.
     * @param  where    Options to filter matches by update time or gameover state
     * @param  init     Optional RequestInit interface to override defaults.
     * @return Array of match metadata objects.
     *
     * @example
     * lobbyClient.listMatches('tic-tac-toe', where: { isGameover: false })
     *   .then(data => console.log(data.matches));
     * // => [
     * //   {
     * //     matchID: 'xyz',
     * //     gameName: 'tic-tac-toe',
     * //     players: [{ id: 0, name: 'Alice' }, { id: 1 }]
     * //   },
     * //   ...
     * // ]
     */
    )
  }, {
    key: "listMatches",
    value: (function () {
      var _listMatches = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(gameName, where, init) {
        var query, queries, isGameover, updatedBefore, updatedAfter;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              assertGameName(gameName);
              query = '';
              if (where) {
                queries = [];
                isGameover = where.isGameover, updatedBefore = where.updatedBefore, updatedAfter = where.updatedAfter;
                if (isGameover !== undefined) queries.push("isGameover=".concat(isGameover));
                if (updatedBefore) queries.push("updatedBefore=".concat(updatedBefore));
                if (updatedAfter) queries.push("updatedAfter=".concat(updatedAfter));
                if (queries.length > 0) query = '?' + queries.join('&');
              }
              return _context4.a(2, this.request("/games/".concat(gameName).concat(query), init));
          }
        }, _callee4, this);
      }));
      function listMatches(_x6, _x7, _x8) {
        return _listMatches.apply(this, arguments);
      }
      return listMatches;
    }()
    /**
     * Get metadata for a specific match.
     * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
     * @param  matchID  Match ID for the match to fetch.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return A match metadata object.
     *
     * @example
     * lobbyClient.getMatch('tic-tac-toe', 'xyz').then(console.log);
     * // => {
     * //   matchID: 'xyz',
     * //   gameName: 'tic-tac-toe',
     * //   players: [{ id: 0, name: 'Alice' }, { id: 1 }]
     * // }
     */
    )
  }, {
    key: "getMatch",
    value: (function () {
      var _getMatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(gameName, matchID, init) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              assertGameName(gameName);
              assertMatchID(matchID);
              return _context5.a(2, this.request("/games/".concat(gameName, "/").concat(matchID), init));
          }
        }, _callee5, this);
      }));
      function getMatch(_x9, _x0, _x1) {
        return _getMatch.apply(this, arguments);
      }
      return getMatch;
    }()
    /**
     * Create a new match for a specific game type.
     * @param  gameName The game to create a match for, e.g. 'tic-tac-toe'.
     * @param  body     Options required to configure match creation.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return An object containing the created `matchID`.
     *
     * @example
     * lobbyClient.createMatch('tic-tac-toe', { numPlayers: 2 })
     *   .then(console.log);
     * // => { matchID: 'xyz' }
     */
    )
  }, {
    key: "createMatch",
    value: (function () {
      var _createMatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(gameName, body, init) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              assertGameName(gameName);
              validateBody(body, {
                numPlayers: 'number'
              });
              return _context6.a(2, this.post("/games/".concat(gameName, "/create"), {
                body: body,
                init: init
              }));
          }
        }, _callee6, this);
      }));
      function createMatch(_x10, _x11, _x12) {
        return _createMatch.apply(this, arguments);
      }
      return createMatch;
    }()
    /**
     * Join a match using its matchID.
     * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
     * @param  matchID  Match ID for the match to join.
     * @param  body     Options required to join match.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return Object containing `playerCredentials` for the player who joined.
     *
     * @example
     * lobbyClient.joinMatch('tic-tac-toe', 'xyz', {
     *   playerID: '1',
     *   playerName: 'Bob',
     * }).then(console.log);
     * // => { playerID: '1', playerCredentials: 'random-string' }
     */
    )
  }, {
    key: "joinMatch",
    value: (function () {
      var _joinMatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(gameName, matchID, body, init) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              assertGameName(gameName);
              assertMatchID(matchID);
              validateBody(body, {
                playerID: ['string', 'undefined'],
                playerName: 'string'
              });
              return _context7.a(2, this.post("/games/".concat(gameName, "/").concat(matchID, "/join"), {
                body: body,
                init: init
              }));
          }
        }, _callee7, this);
      }));
      function joinMatch(_x13, _x14, _x15, _x16) {
        return _joinMatch.apply(this, arguments);
      }
      return joinMatch;
    }()
    /**
     * Leave a previously joined match.
     * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
     * @param  matchID  Match ID for the match to leave.
     * @param  body     Options required to leave match.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return Promise resolves if successful.
     *
     * @example
     * lobbyClient.leaveMatch('tic-tac-toe', 'xyz', {
     *   playerID: '1',
     *   credentials: 'credentials-returned-when-joining',
     * })
     *   .then(() => console.log('Left match.'))
     *   .catch(error => console.error('Error leaving match', error));
     */
    )
  }, {
    key: "leaveMatch",
    value: (function () {
      var _leaveMatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(gameName, matchID, body, init) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              assertGameName(gameName);
              assertMatchID(matchID);
              validateBody(body, {
                playerID: 'string',
                credentials: 'string'
              });
              _context8.n = 1;
              return this.post("/games/".concat(gameName, "/").concat(matchID, "/leave"), {
                body: body,
                init: init
              });
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function leaveMatch(_x17, _x18, _x19, _x20) {
        return _leaveMatch.apply(this, arguments);
      }
      return leaveMatch;
    }()
    /**
     * Update a player’s name or custom metadata.
     * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
     * @param  matchID  Match ID for the match to update.
     * @param  body     Options required to update player.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return Promise resolves if successful.
     *
     * @example
     * lobbyClient.updatePlayer('tic-tac-toe', 'xyz', {
     *   playerID: '0',
     *   credentials: 'credentials-returned-when-joining',
     *   newName: 'Al',
     * })
     *   .then(() => console.log('Updated player data.'))
     *   .catch(error => console.error('Error updating data', error));
     */
    )
  }, {
    key: "updatePlayer",
    value: (function () {
      var _updatePlayer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(gameName, matchID, body, init) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              assertGameName(gameName);
              assertMatchID(matchID);
              validateBody(body, {
                playerID: 'string',
                credentials: 'string'
              });
              _context9.n = 1;
              return this.post("/games/".concat(gameName, "/").concat(matchID, "/update"), {
                body: body,
                init: init
              });
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function updatePlayer(_x21, _x22, _x23, _x24) {
        return _updatePlayer.apply(this, arguments);
      }
      return updatePlayer;
    }()
    /**
     * Create a new match based on the configuration of the current match.
     * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
     * @param  matchID  Match ID for the match to play again.
     * @param  body     Options required to configure match.
     * @param  init     Optional RequestInit interface to override defaults.
     * @return Object containing `nextMatchID`.
     *
     * @example
     * lobbyClient.playAgain('tic-tac-toe', 'xyz', {
     *   playerID: '0',
     *   credentials: 'credentials-returned-when-joining',
     * })
     *   .then(({ nextMatchID }) => {
     *     return lobbyClient.joinMatch('tic-tac-toe', nextMatchID, {
     *       playerID: '0',
     *       playerName: 'Al',
     *     })
     *   })
     *   .then({ playerCredentials } => {
     *     console.log(playerCredentials);
     *   })
     *   .catch(console.error);
     */
    )
  }, {
    key: "playAgain",
    value: (function () {
      var _playAgain = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(gameName, matchID, body, init) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              assertGameName(gameName);
              assertMatchID(matchID);
              validateBody(body, {
                playerID: 'string',
                credentials: 'string'
              });
              return _context0.a(2, this.post("/games/".concat(gameName, "/").concat(matchID, "/playAgain"), {
                body: body,
                init: init
              }));
          }
        }, _callee0, this);
      }));
      function playAgain(_x25, _x26, _x27, _x28) {
        return _playAgain.apply(this, arguments);
      }
      return playAgain;
    }())
  }]);
}();
},{}],"node_modules/boardgame.io/dist/esm/client.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Client", {
  enumerable: true,
  get: function () {
    return _clientF7f02b.C;
  }
});
Object.defineProperty(exports, "LobbyClient", {
  enumerable: true,
  get: function () {
    return _client5f57c3f.L;
  }
});
Object.defineProperty(exports, "LobbyClientError", {
  enumerable: true,
  get: function () {
    return _client5f57c3f.a;
  }
});
require("nanoid/non-secure");
require("./Debug-8242c26e.js");
require("redux");
require("./turn-order-8cc4909b.js");
require("immer");
require("./plugin-random-087f861e.js");
require("lodash.isplainobject");
require("./reducer-24ea3e4c.js");
require("rfc6902");
require("./initialize-7316768f.js");
require("./transport-ce07b771.js");
var _clientF7f02b = require("./client-f7f02b82.js");
require("flatted");
require("setimmediate");
require("./ai-7998b00f.js");
var _client5f57c3f = require("./client-5f57c3f2.js");
},{"nanoid/non-secure":"node_modules/nanoid/non-secure/index.js","./Debug-8242c26e.js":"node_modules/boardgame.io/dist/esm/Debug-8242c26e.js","redux":"node_modules/redux/es/redux.js","./turn-order-8cc4909b.js":"node_modules/boardgame.io/dist/esm/turn-order-8cc4909b.js","immer":"node_modules/immer/dist/immer.esm.js","./plugin-random-087f861e.js":"node_modules/boardgame.io/dist/esm/plugin-random-087f861e.js","lodash.isplainobject":"node_modules/lodash.isplainobject/index.js","./reducer-24ea3e4c.js":"node_modules/boardgame.io/dist/esm/reducer-24ea3e4c.js","rfc6902":"node_modules/rfc6902/index.js","./initialize-7316768f.js":"node_modules/boardgame.io/dist/esm/initialize-7316768f.js","./transport-ce07b771.js":"node_modules/boardgame.io/dist/esm/transport-ce07b771.js","./client-f7f02b82.js":"node_modules/boardgame.io/dist/esm/client-f7f02b82.js","flatted":"node_modules/flatted/esm/index.js","setimmediate":"node_modules/setimmediate/setImmediate.js","./ai-7998b00f.js":"node_modules/boardgame.io/dist/esm/ai-7998b00f.js","./client-5f57c3f2.js":"node_modules/boardgame.io/dist/esm/client-5f57c3f2.js"}],"node_modules/boardgame.io/dist/cjs/plugin-random-7425844d.js":[function(require,module,exports) {
'use strict';

// Inlined version of Alea from https://github.com/davidbau/seedrandom.
// Converted to Typescript October 2020.
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Alea = /*#__PURE__*/function () {
  function Alea(seed) {
    _classCallCheck(this, Alea);
    var mash = Mash();
    // Apply the seeding algorithm from Baagoe.
    this.c = 1;
    this.s0 = mash(' ');
    this.s1 = mash(' ');
    this.s2 = mash(' ');
    this.s0 -= mash(seed);
    if (this.s0 < 0) {
      this.s0 += 1;
    }
    this.s1 -= mash(seed);
    if (this.s1 < 0) {
      this.s1 += 1;
    }
    this.s2 -= mash(seed);
    if (this.s2 < 0) {
      this.s2 += 1;
    }
  }
  return _createClass(Alea, [{
    key: "next",
    value: function next() {
      var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32
      this.s0 = this.s1;
      this.s1 = this.s2;
      return this.s2 = t - (this.c = Math.trunc(t));
    }
  }]);
}();
function Mash() {
  var n = 0xefc8249d;
  var mash = function mash(data) {
    var str = data.toString();
    for (var i = 0; i < str.length; i++) {
      n += str.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };
  return mash;
}
function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}
function alea(seed, state) {
  var xg = new Alea(seed);
  var prng = xg.next.bind(xg);
  if (state) copy(state, xg);
  prng.state = function () {
    return copy(xg, {});
  };
  return prng;
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Random
 *
 * Calls that require a pseudorandom number generator.
 * Uses a seed from ctx, and also persists the PRNG
 * state in ctx so that moves can stay pure.
 */
var Random = /*#__PURE__*/function () {
  /**
   * constructor
   * @param {object} ctx - The ctx object to initialize from.
   */
  function Random(state) {
    _classCallCheck(this, Random);
    // If we are on the client, the seed is not present.
    // Just use a temporary seed to execute the move without
    // crashing it. The move state itself is discarded,
    // so the actual value doesn't matter.
    this.state = state || {
      seed: '0'
    };
    this.used = false;
  }
  /**
   * Generates a new seed from the current date / time.
   */
  return _createClass(Random, [{
    key: "isUsed",
    value: function isUsed() {
      return this.used;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
    /**
     * Generate a random number.
     */
  }, {
    key: "_random",
    value: function _random() {
      this.used = true;
      var R = this.state;
      var seed = R.prngstate ? '' : R.seed;
      var rand = alea(seed, R.prngstate);
      var number = rand();
      this.state = _objectSpread(_objectSpread({}, R), {}, {
        prngstate: rand.state()
      });
      return number;
    }
  }, {
    key: "api",
    value: function api() {
      var random = this._random.bind(this);
      var SpotValue = {
        D4: 4,
        D6: 6,
        D8: 8,
        D10: 10,
        D12: 12,
        D20: 20
      };
      // Generate functions for predefined dice values D4 - D20.
      var predefined = {};
      var _loop = function _loop() {
        var spotvalue = SpotValue[key];
        predefined[key] = function (diceCount) {
          return diceCount === undefined ? Math.floor(random() * spotvalue) + 1 : Array.from({
            length: diceCount
          }).map(function () {
            return Math.floor(random() * spotvalue) + 1;
          });
        };
      };
      for (var key in SpotValue) {
        _loop();
      }
      function Die() {
        var spotvalue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
        var diceCount = arguments.length > 1 ? arguments[1] : undefined;
        return diceCount === undefined ? Math.floor(random() * spotvalue) + 1 : Array.from({
          length: diceCount
        }).map(function () {
          return Math.floor(random() * spotvalue) + 1;
        });
      }
      return _objectSpread(_objectSpread({}, predefined), {}, {
        /**
         * Roll a die of specified spot value.
         *
         * @param {number} spotvalue - The die dimension (default: 6).
         * @param {number} diceCount - number of dice to throw.
         *                             if not defined, defaults to 1 and returns the value directly.
         *                             if defined, returns an array containing the random dice values.
         */
        Die: Die,
        /**
         * Generate a random number between 0 and 1.
         */
        Number: function Number() {
          return random();
        },
        /**
         * Shuffle an array.
         *
         * @param {Array} deck - The array to shuffle. Does not mutate
         *                       the input, but returns the shuffled array.
         */
        Shuffle: function Shuffle(deck) {
          var clone = _toConsumableArray(deck);
          var sourceIndex = deck.length;
          var destinationIndex = 0;
          var shuffled = Array.from({
            length: sourceIndex
          });
          while (sourceIndex) {
            var randomIndex = Math.trunc(sourceIndex * random());
            shuffled[destinationIndex++] = clone[randomIndex];
            clone[randomIndex] = clone[--sourceIndex];
          }
          return shuffled;
        },
        _private: this
      });
    }
  }], [{
    key: "seed",
    value: function seed() {
      return Date.now().toString(36).slice(-10);
    }
  }]);
}();
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var RandomPlugin = {
  name: 'random',
  noClient: function noClient(_ref) {
    var api = _ref.api;
    return api._private.isUsed();
  },
  flush: function flush(_ref2) {
    var api = _ref2.api;
    return api._private.getState();
  },
  api: function api(_ref3) {
    var data = _ref3.data;
    var random = new Random(data);
    return random.api();
  },
  setup: function setup(_ref4) {
    var game = _ref4.game;
    var seed = game.seed;
    if (seed === undefined) {
      seed = Random.seed();
    }
    return {
      seed: seed
    };
  },
  playerView: function playerView() {
    return undefined;
  }
};
exports.RandomPlugin = RandomPlugin;
exports.alea = alea;
},{}],"node_modules/boardgame.io/dist/cjs/turn-order-4ab12333.js":[function(require,module,exports) {
'use strict';

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _interopDefault(ex) {
  return ex && _typeof(ex) === 'object' && 'default' in ex ? ex['default'] : ex;
}
var produce = _interopDefault(require('immer'));
var pluginRandom = require('./plugin-random-7425844d.js');
var isPlainObject = _interopDefault(require('lodash.isplainobject'));

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var MAKE_MOVE = 'MAKE_MOVE';
var GAME_EVENT = 'GAME_EVENT';
var REDO = 'REDO';
var RESET = 'RESET';
var SYNC = 'SYNC';
var UNDO = 'UNDO';
var UPDATE = 'UPDATE';
var PATCH = 'PATCH';
var PLUGIN = 'PLUGIN';
var STRIP_TRANSIENTS = 'STRIP_TRANSIENTS';

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Generate a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var makeMove = function makeMove(type, args, playerID, credentials) {
  return {
    type: MAKE_MOVE,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Generate a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var gameEvent = function gameEvent(type, args, playerID, credentials) {
  return {
    type: GAME_EVENT,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Generate an automatic game event that is a side-effect of a move.
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var automaticGameEvent = function automaticGameEvent(type, args, playerID, credentials) {
  return {
    type: GAME_EVENT,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    },
    automatic: true
  };
};
var sync = function sync(info) {
  return {
    type: SYNC,
    state: info.state,
    log: info.log,
    initialState: info.initialState,
    clientOnly: true
  };
};
/**
 * Used to update the Redux store's state with patch in response to
 * an action coming from another player.
 * @param prevStateID previous stateID
 * @param stateID stateID after this patch
 * @param {Operation[]} patch - The patch to apply.
 * @param {LogEntry[]} deltalog - A log delta.
 */
var patch = function patch(prevStateID, stateID, _patch, deltalog) {
  return {
    type: PATCH,
    prevStateID: prevStateID,
    stateID: stateID,
    patch: _patch,
    deltalog: deltalog,
    clientOnly: true
  };
};
/**
 * Used to update the Redux store's state in response to
 * an action coming from another player.
 * @param {object} state - The state to restore.
 * @param {Array} deltalog - A log delta.
 */
var update = function update(state, deltalog) {
  return {
    type: UPDATE,
    state: state,
    deltalog: deltalog,
    clientOnly: true
  };
};
/**
 * Used to reset the game state.
 * @param {object} state - The initial state.
 */
var reset = function reset(state) {
  return {
    type: RESET,
    state: state,
    clientOnly: true
  };
};
/**
 * Used to undo the last move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var undo = function undo(playerID, credentials) {
  return {
    type: UNDO,
    payload: {
      type: null,
      args: null,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Used to redo the last undone move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var redo = function redo(playerID, credentials) {
  return {
    type: REDO,
    payload: {
      type: null,
      args: null,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Allows plugins to define their own actions and intercept them.
 */
var plugin = function plugin(type, args, playerID, credentials) {
  return {
    type: PLUGIN,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Private action used to strip transient metadata (e.g. errors) from the game
 * state.
 */
var stripTransients = function stripTransients() {
  return {
    type: STRIP_TRANSIENTS
  };
};
var ActionCreators = /*#__PURE__*/Object.freeze({
  __proto__: null,
  makeMove: makeMove,
  gameEvent: gameEvent,
  automaticGameEvent: automaticGameEvent,
  sync: sync,
  patch: patch,
  update: update,
  reset: reset,
  undo: undo,
  redo: redo,
  plugin: plugin,
  stripTransients: stripTransients
});

/**
 * Moves can return this when they want to indicate
 * that the combination of arguments is illegal and
 * the move ought to be discarded.
 */
var INVALID_MOVE = 'INVALID_MOVE';

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Plugin that allows using Immer to make immutable changes
 * to G by just mutating it.
 */
var ImmerPlugin = {
  name: 'plugin-immer',
  fnWrap: function fnWrap(move) {
    return function (context) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var isInvalid = false;
      var newG = produce(context.G, function (G) {
        var result = move.apply(void 0, [_objectSpread(_objectSpread({}, context), {}, {
          G: G
        })].concat(args));
        if (result === INVALID_MOVE) {
          isInvalid = true;
          return;
        }
        return result;
      });
      if (isInvalid) return INVALID_MOVE;
      return newG;
    };
  }
};
(function (GameMethod) {
  GameMethod["MOVE"] = "MOVE";
  GameMethod["GAME_ON_END"] = "GAME_ON_END";
  GameMethod["PHASE_ON_BEGIN"] = "PHASE_ON_BEGIN";
  GameMethod["PHASE_ON_END"] = "PHASE_ON_END";
  GameMethod["TURN_ON_BEGIN"] = "TURN_ON_BEGIN";
  GameMethod["TURN_ON_MOVE"] = "TURN_ON_MOVE";
  GameMethod["TURN_ON_END"] = "TURN_ON_END";
})(exports.GameMethod || (exports.GameMethod = {}));

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var Errors;
(function (Errors) {
  Errors["CalledOutsideHook"] = "Events must be called from moves or the `onBegin`, `onEnd`, and `onMove` hooks.\nThis error probably means you called an event from other game code, like an `endIf` trigger or one of the `turn.order` methods.";
  Errors["EndTurnInOnEnd"] = "`endTurn` is disallowed in `onEnd` hooks \u2014 the turn is already ending.";
  Errors["MaxTurnEndings"] = "Maximum number of turn endings exceeded for this update.\nThis likely means game code is triggering an infinite loop.";
  Errors["PhaseEventInOnEnd"] = "`setPhase` & `endPhase` are disallowed in a phase\u2019s `onEnd` hook \u2014 the phase is already ending.\nIf you\u2019re trying to dynamically choose the next phase when a phase ends, use the phase\u2019s `next` trigger.";
  Errors["StageEventInOnEnd"] = "`setStage`, `endStage` & `setActivePlayers` are disallowed in `onEnd` hooks.";
  Errors["StageEventInPhaseBegin"] = "`setStage`, `endStage` & `setActivePlayers` are disallowed in a phase\u2019s `onBegin` hook.\nUse `setActivePlayers` in a `turn.onBegin` hook or declare stages with `turn.activePlayers` instead.";
  Errors["StageEventInTurnBegin"] = "`setStage` & `endStage` are disallowed in `turn.onBegin`.\nUse `setActivePlayers` or declare stages with `turn.activePlayers` instead.";
})(Errors || (Errors = {}));
/**
 * Events
 */
var Events = /*#__PURE__*/function () {
  function Events(flow, ctx, playerID) {
    _classCallCheck(this, Events);
    this.flow = flow;
    this.playerID = playerID;
    this.dispatch = [];
    this.initialTurn = ctx.turn;
    this.updateTurnContext(ctx, undefined);
    // This is an arbitrarily large upper threshold, which could be made
    // configurable via a game option if the need arises.
    this.maxEndedTurnsPerAction = ctx.numPlayers * 100;
  }
  return _createClass(Events, [{
    key: "api",
    value: function api() {
      var _this = this;
      var events = {
        _private: this
      };
      var _iterator = _createForOfIteratorHelper(this.flow.eventNames),
        _step;
      try {
        var _loop = function _loop() {
          var type = _step.value;
          events[type] = function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            _this.dispatch.push({
              type: type,
              args: args,
              phase: _this.currentPhase,
              turn: _this.currentTurn,
              calledFrom: _this.currentMethod,
              // Used to capture a stack trace in case it is needed later.
              error: new Error('Events Plugin Error')
            });
          };
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return events;
    }
  }, {
    key: "isUsed",
    value: function isUsed() {
      return this.dispatch.length > 0;
    }
  }, {
    key: "updateTurnContext",
    value: function updateTurnContext(ctx, methodType) {
      this.currentPhase = ctx.phase;
      this.currentTurn = ctx.turn;
      this.currentMethod = methodType;
    }
  }, {
    key: "unsetCurrentMethod",
    value: function unsetCurrentMethod() {
      this.currentMethod = undefined;
    }
    /**
     * Updates ctx with the triggered events.
     * @param {object} state - The state object { G, ctx }.
     */
  }, {
    key: "update",
    value: function update(state) {
      var initialState = state;
      var stateWithError = function stateWithError(_ref, message) {
        var stack = _ref.stack;
        return _objectSpread(_objectSpread({}, initialState), {}, {
          plugins: _objectSpread(_objectSpread({}, initialState.plugins), {}, {
            events: _objectSpread(_objectSpread({}, initialState.plugins.events), {}, {
              data: {
                error: message + '\n' + stack
              }
            })
          })
        });
      };
      EventQueue: for (var i = 0; i < this.dispatch.length; i++) {
        var event = this.dispatch[i];
        var turnHasEnded = event.turn !== state.ctx.turn;
        // This protects against potential infinite loops if specific events are called on hooks.
        // The moment we exceed the defined threshold, we just bail out of all phases.
        var endedTurns = this.currentTurn - this.initialTurn;
        if (endedTurns >= this.maxEndedTurnsPerAction) {
          return stateWithError(event.error, Errors.MaxTurnEndings);
        }
        if (event.calledFrom === undefined) {
          return stateWithError(event.error, Errors.CalledOutsideHook);
        }
        // Stop processing events once the game has finished.
        if (state.ctx.gameover) break EventQueue;
        switch (event.type) {
          case 'endStage':
          case 'setStage':
          case 'setActivePlayers':
            {
              switch (event.calledFrom) {
                // Disallow all stage events in onEnd and phase.onBegin hooks.
                case exports.GameMethod.TURN_ON_END:
                case exports.GameMethod.PHASE_ON_END:
                  return stateWithError(event.error, Errors.StageEventInOnEnd);
                case exports.GameMethod.PHASE_ON_BEGIN:
                  return stateWithError(event.error, Errors.StageEventInPhaseBegin);
                // Disallow setStage & endStage in turn.onBegin hooks.
                case exports.GameMethod.TURN_ON_BEGIN:
                  if (event.type === 'setActivePlayers') break;
                  return stateWithError(event.error, Errors.StageEventInTurnBegin);
              }
              // If the turn already ended, don't try to process stage events.
              if (turnHasEnded) continue EventQueue;
              break;
            }
          case 'endTurn':
            {
              if (event.calledFrom === exports.GameMethod.TURN_ON_END || event.calledFrom === exports.GameMethod.PHASE_ON_END) {
                return stateWithError(event.error, Errors.EndTurnInOnEnd);
              }
              // If the turn already ended some other way,
              // don't try to end the turn again.
              if (turnHasEnded) continue EventQueue;
              break;
            }
          case 'endPhase':
          case 'setPhase':
            {
              if (event.calledFrom === exports.GameMethod.PHASE_ON_END) {
                return stateWithError(event.error, Errors.PhaseEventInOnEnd);
              }
              // If the phase already ended some other way,
              // don't try to end the phase again.
              if (event.phase !== state.ctx.phase) continue EventQueue;
              break;
            }
        }
        var action = automaticGameEvent(event.type, event.args, this.playerID);
        state = this.flow.processEvent(state, action);
      }
      return state;
    }
  }]);
}();
/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var EventsPlugin = {
  name: 'events',
  noClient: function noClient(_ref2) {
    var api = _ref2.api;
    return api._private.isUsed();
  },
  isInvalid: function isInvalid(_ref3) {
    var data = _ref3.data;
    return data.error || false;
  },
  // Update the events plugin’s internal turn context each time a move
  // or hook is called. This allows events called after turn or phase
  // endings to dispatch the current turn and phase correctly.
  fnWrap: function fnWrap(method, methodType) {
    return function (context) {
      var api = context.events;
      if (api) api._private.updateTurnContext(context.ctx, methodType);
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      var G = method.apply(void 0, [context].concat(args));
      if (api) api._private.unsetCurrentMethod();
      return G;
    };
  },
  dangerouslyFlushRawState: function dangerouslyFlushRawState(_ref4) {
    var state = _ref4.state,
      api = _ref4.api;
    return api._private.update(state);
  },
  api: function api(_ref5) {
    var game = _ref5.game,
      ctx = _ref5.ctx,
      playerID = _ref5.playerID;
    return new Events(game.flow, ctx, playerID).api();
  }
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Plugin that makes it possible to add metadata to log entries.
 * During a move, you can set metadata using ctx.log.setMetadata and it will be
 * available on the log entry for that move.
 */
var LogPlugin = {
  name: 'log',
  flush: function flush() {
    return {};
  },
  api: function api(_ref6) {
    var data = _ref6.data;
    return {
      setMetadata: function setMetadata(metadata) {
        data.metadata = metadata;
      }
    };
  },
  setup: function setup() {
    return {};
  }
};

/**
 * Check if a value can be serialized (e.g. using `JSON.stringify`).
 * Adapted from: https://stackoverflow.com/a/30712764/3829557
 */
function isSerializable(value) {
  // Primitives are OK.
  if (value === undefined || value === null || typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
    return true;
  }
  // A non-primitive value that is neither a POJO or an array cannot be serialized.
  if (!isPlainObject(value) && !Array.isArray(value)) {
    return false;
  }
  // Recurse entries if the value is an object or array.
  for (var key in value) {
    if (!isSerializable(value[key])) return false;
  }
  return true;
}
/**
 * Plugin that checks whether state is serializable, in order to avoid
 * network serialization bugs.
 */
var SerializablePlugin = {
  name: 'plugin-serializable',
  fnWrap: function fnWrap(move) {
    return function (context) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      var result = move.apply(void 0, [context].concat(args));
      // Check state in non-production environments.
      if ("development" !== 'production' && !isSerializable(result)) {
        throw new Error('Move state is not JSON-serialiazable.\n' + 'See https://boardgame.io/documentation/#/?id=state for more information.');
      }
      return result;
    };
  }
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var production = "development" === 'production';
var logfn = production ? function () {} : function () {
  var _console;
  return (_console = console).log.apply(_console, arguments);
};
var errorfn = function errorfn() {
  var _console2;
  return (_console2 = console).error.apply(_console2, arguments);
};
function info(msg) {
  logfn("INFO: ".concat(msg));
}
function error(error) {
  errorfn('ERROR:', error);
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * List of plugins that are always added.
 */
var CORE_PLUGINS = [ImmerPlugin, pluginRandom.RandomPlugin, LogPlugin, SerializablePlugin];
var DEFAULT_PLUGINS = [].concat(CORE_PLUGINS, [EventsPlugin]);
/**
 * Allow plugins to intercept actions and process them.
 */
var ProcessAction = function ProcessAction(state, action, opts) {
  // TODO(#723): Extend error handling to plugins.
  opts.game.plugins.filter(function (plugin) {
    return plugin.action !== undefined;
  }).filter(function (plugin) {
    return plugin.name === action.payload.type;
  }).forEach(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name] || {
      data: {}
    };
    var data = plugin.action(pluginState.data, action.payload);
    state = _objectSpread(_objectSpread({}, state), {}, {
      plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty({}, name, _objectSpread(_objectSpread({}, pluginState), {}, {
        data: data
      })))
    });
  });
  return state;
};
/**
 * The APIs created by various plugins are stored in the plugins
 * section of the state object:
 *
 * {
 *   G: {},
 *   ctx: {},
 *   plugins: {
 *     plugin-a: {
 *       data: {},  // this is generated by the plugin at Setup / Flush.
 *       api: {},   // this is ephemeral and generated by Enhance.
 *     }
 *   }
 * }
 *
 * This function retrieves plugin APIs and returns them as an object
 * for consumption as used by move contexts.
 */
var GetAPIs = function GetAPIs(_ref7) {
  var plugins = _ref7.plugins;
  return Object.entries(plugins || {}).reduce(function (apis, _ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      name = _ref9[0],
      api = _ref9[1].api;
    apis[name] = api;
    return apis;
  }, {});
};
/**
 * Applies the provided plugins to the given move / flow function.
 *
 * @param methodToWrap - The move function or hook to apply the plugins to.
 * @param methodType - The type of the move or hook being wrapped.
 * @param plugins - The list of plugins.
 */
var FnWrap = function FnWrap(methodToWrap, methodType, plugins) {
  return [].concat(CORE_PLUGINS, _toConsumableArray(plugins), [EventsPlugin]).filter(function (plugin) {
    return plugin.fnWrap !== undefined;
  }).reduce(function (method, _ref0) {
    var fnWrap = _ref0.fnWrap;
    return fnWrap(method, methodType);
  }, methodToWrap);
};
/**
 * Allows the plugin to generate its initial state.
 */
var Setup = function Setup(state, opts) {
  [].concat(_toConsumableArray(DEFAULT_PLUGINS), _toConsumableArray(opts.game.plugins)).filter(function (plugin) {
    return plugin.setup !== undefined;
  }).forEach(function (plugin) {
    var name = plugin.name;
    var data = plugin.setup({
      G: state.G,
      ctx: state.ctx,
      game: opts.game
    });
    state = _objectSpread(_objectSpread({}, state), {}, {
      plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty({}, name, {
        data: data
      }))
    });
  });
  return state;
};
/**
 * Invokes the plugin before a move or event.
 * The API that the plugin generates is stored inside
 * the `plugins` section of the state (which is subsequently
 * merged into ctx).
 */
var Enhance = function Enhance(state, opts) {
  [].concat(_toConsumableArray(DEFAULT_PLUGINS), _toConsumableArray(opts.game.plugins)).filter(function (plugin) {
    return plugin.api !== undefined;
  }).forEach(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name] || {
      data: {}
    };
    var api = plugin.api({
      G: state.G,
      ctx: state.ctx,
      data: pluginState.data,
      game: opts.game,
      playerID: opts.playerID
    });
    state = _objectSpread(_objectSpread({}, state), {}, {
      plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty({}, name, _objectSpread(_objectSpread({}, pluginState), {}, {
        api: api
      })))
    });
  });
  return state;
};
/**
 * Allows plugins to update their state after a move / event.
 */
var Flush = function Flush(state, opts) {
  // We flush the events plugin first, then custom plugins and the core plugins.
  // This means custom plugins cannot use the events API but will be available in event hooks.
  // Note that plugins are flushed in reverse, to allow custom plugins calling each other.
  [].concat(CORE_PLUGINS, _toConsumableArray(opts.game.plugins), [EventsPlugin]).reverse().forEach(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name] || {
      data: {}
    };
    if (plugin.flush) {
      var newData = plugin.flush({
        G: state.G,
        ctx: state.ctx,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
      state = _objectSpread(_objectSpread({}, state), {}, {
        plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty({}, plugin.name, {
          data: newData
        }))
      });
    } else if (plugin.dangerouslyFlushRawState) {
      state = plugin.dangerouslyFlushRawState({
        state: state,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
      // Remove everything other than data.
      var data = state.plugins[name].data;
      state = _objectSpread(_objectSpread({}, state), {}, {
        plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty({}, plugin.name, {
          data: data
        }))
      });
    }
  });
  return state;
};
/**
 * Allows plugins to indicate if they should not be materialized on the client.
 * This will cause the client to discard the state update and wait for the
 * master instead.
 */
var NoClient = function NoClient(state, opts) {
  return [].concat(_toConsumableArray(DEFAULT_PLUGINS), _toConsumableArray(opts.game.plugins)).filter(function (plugin) {
    return plugin.noClient !== undefined;
  }).map(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name];
    if (pluginState) {
      return plugin.noClient({
        G: state.G,
        ctx: state.ctx,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
    }
    return false;
  }).includes(true);
};
/**
 * Allows plugins to indicate if the entire action should be thrown out
 * as invalid. This will cancel the entire state update.
 */
var IsInvalid = function IsInvalid(state, opts) {
  var firstInvalidReturn = [].concat(_toConsumableArray(DEFAULT_PLUGINS), _toConsumableArray(opts.game.plugins)).filter(function (plugin) {
    return plugin.isInvalid !== undefined;
  }).map(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name];
    var message = plugin.isInvalid({
      G: state.G,
      ctx: state.ctx,
      game: opts.game,
      data: pluginState && pluginState.data
    });
    return message ? {
      plugin: name,
      message: message
    } : false;
  }).find(function (value) {
    return value;
  });
  return firstInvalidReturn || false;
};
/**
 * Update plugin state after move/event & check if plugins consider the update to be valid.
 * @returns Tuple of `[updatedState]` or `[originalState, invalidError]`.
 */
var FlushAndValidate = function FlushAndValidate(state, opts) {
  var updatedState = Flush(state, opts);
  var isInvalid = IsInvalid(updatedState, opts);
  if (!isInvalid) return [updatedState];
  var plugin = isInvalid.plugin,
    message = isInvalid.message;
  error("".concat(plugin, " plugin declared action invalid:\n").concat(message));
  return [state, isInvalid];
};
/**
 * Allows plugins to customize their data for specific players.
 * For example, a plugin may want to share no data with the client, or
 * want to keep some player data secret from opponents.
 */
var PlayerView = function PlayerView(_ref1, _ref10) {
  var G = _ref1.G,
    ctx = _ref1.ctx,
    _ref1$plugins = _ref1.plugins,
    plugins = _ref1$plugins === void 0 ? {} : _ref1$plugins;
  var game = _ref10.game,
    playerID = _ref10.playerID;
  [].concat(_toConsumableArray(DEFAULT_PLUGINS), _toConsumableArray(game.plugins)).forEach(function (_ref11) {
    var name = _ref11.name,
      playerView = _ref11.playerView;
    if (!playerView) return;
    var _ref12 = plugins[name] || {
        data: {}
      },
      data = _ref12.data;
    var newData = playerView({
      G: G,
      ctx: ctx,
      game: game,
      data: data,
      playerID: playerID
    });
    plugins = _objectSpread(_objectSpread({}, plugins), {}, _defineProperty({}, name, {
      data: newData
    }));
  });
  return plugins;
};

/**
 * Adjust the given options to use the new minMoves/maxMoves if a legacy moveLimit was given
 * @param options The options object to apply backwards compatibility to
 * @param enforceMinMoves Use moveLimit to set both minMoves and maxMoves
 */
function supportDeprecatedMoveLimit(options) {
  var enforceMinMoves = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (options.moveLimit) {
    if (enforceMinMoves) {
      options.minMoves = options.moveLimit;
    }
    options.maxMoves = options.moveLimit;
    delete options.moveLimit;
  }
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function SetActivePlayers(ctx, arg) {
  var activePlayers = {};
  var _prevActivePlayers = [];
  var _nextActivePlayers = null;
  var _activePlayersMinMoves = {};
  var _activePlayersMaxMoves = {};
  if (Array.isArray(arg)) {
    // support a simple array of player IDs as active players
    var value = {};
    arg.forEach(function (v) {
      return value[v] = Stage.NULL;
    });
    activePlayers = value;
  } else {
    // process active players argument object
    // stages previously did not enforce minMoves, this behaviour is kept intentionally
    supportDeprecatedMoveLimit(arg);
    if (arg.next) {
      _nextActivePlayers = arg.next;
    }
    if (arg.revert) {
      _prevActivePlayers = [].concat(_toConsumableArray(ctx._prevActivePlayers), [{
        activePlayers: ctx.activePlayers,
        _activePlayersMinMoves: ctx._activePlayersMinMoves,
        _activePlayersMaxMoves: ctx._activePlayersMaxMoves,
        _activePlayersNumMoves: ctx._activePlayersNumMoves
      }]);
    }
    if (arg.currentPlayer !== undefined) {
      ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, ctx.currentPlayer, arg.currentPlayer);
    }
    if (arg.others !== undefined) {
      for (var i = 0; i < ctx.playOrder.length; i++) {
        var id = ctx.playOrder[i];
        if (id !== ctx.currentPlayer) {
          ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, id, arg.others);
        }
      }
    }
    if (arg.all !== undefined) {
      for (var _i = 0; _i < ctx.playOrder.length; _i++) {
        var _id = ctx.playOrder[_i];
        ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, _id, arg.all);
      }
    }
    if (arg.value) {
      for (var _id2 in arg.value) {
        ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, _id2, arg.value[_id2]);
      }
    }
    if (arg.minMoves) {
      for (var _id3 in activePlayers) {
        if (_activePlayersMinMoves[_id3] === undefined) {
          _activePlayersMinMoves[_id3] = arg.minMoves;
        }
      }
    }
    if (arg.maxMoves) {
      for (var _id4 in activePlayers) {
        if (_activePlayersMaxMoves[_id4] === undefined) {
          _activePlayersMaxMoves[_id4] = arg.maxMoves;
        }
      }
    }
  }
  if (Object.keys(activePlayers).length === 0) {
    activePlayers = null;
  }
  if (Object.keys(_activePlayersMinMoves).length === 0) {
    _activePlayersMinMoves = null;
  }
  if (Object.keys(_activePlayersMaxMoves).length === 0) {
    _activePlayersMaxMoves = null;
  }
  var _activePlayersNumMoves = {};
  for (var _id5 in activePlayers) {
    _activePlayersNumMoves[_id5] = 0;
  }
  return _objectSpread(_objectSpread({}, ctx), {}, {
    activePlayers: activePlayers,
    _activePlayersMinMoves: _activePlayersMinMoves,
    _activePlayersMaxMoves: _activePlayersMaxMoves,
    _activePlayersNumMoves: _activePlayersNumMoves,
    _prevActivePlayers: _prevActivePlayers,
    _nextActivePlayers: _nextActivePlayers
  });
}
/**
 * Update activePlayers, setting it to previous, next or null values
 * when it becomes empty.
 * @param ctx
 */
function UpdateActivePlayersOnceEmpty(ctx) {
  var _ctx = ctx,
    activePlayers = _ctx.activePlayers,
    _activePlayersMinMoves = _ctx._activePlayersMinMoves,
    _activePlayersMaxMoves = _ctx._activePlayersMaxMoves,
    _activePlayersNumMoves = _ctx._activePlayersNumMoves,
    _prevActivePlayers = _ctx._prevActivePlayers,
    _nextActivePlayers = _ctx._nextActivePlayers;
  if (activePlayers && Object.keys(activePlayers).length === 0) {
    if (_nextActivePlayers) {
      ctx = SetActivePlayers(ctx, _nextActivePlayers);
      var _ctx2 = ctx;
      activePlayers = _ctx2.activePlayers;
      _activePlayersMinMoves = _ctx2._activePlayersMinMoves;
      _activePlayersMaxMoves = _ctx2._activePlayersMaxMoves;
      _activePlayersNumMoves = _ctx2._activePlayersNumMoves;
      _prevActivePlayers = _ctx2._prevActivePlayers;
    } else if (_prevActivePlayers.length > 0) {
      var lastIndex = _prevActivePlayers.length - 1;
      var _prevActivePlayers$la = _prevActivePlayers[lastIndex];
      activePlayers = _prevActivePlayers$la.activePlayers;
      _activePlayersMinMoves = _prevActivePlayers$la._activePlayersMinMoves;
      _activePlayersMaxMoves = _prevActivePlayers$la._activePlayersMaxMoves;
      _activePlayersNumMoves = _prevActivePlayers$la._activePlayersNumMoves;
      _prevActivePlayers = _prevActivePlayers.slice(0, lastIndex);
    } else {
      activePlayers = null;
      _activePlayersMinMoves = null;
      _activePlayersMaxMoves = null;
    }
  }
  return _objectSpread(_objectSpread({}, ctx), {}, {
    activePlayers: activePlayers,
    _activePlayersMinMoves: _activePlayersMinMoves,
    _activePlayersMaxMoves: _activePlayersMaxMoves,
    _activePlayersNumMoves: _activePlayersNumMoves,
    _prevActivePlayers: _prevActivePlayers
  });
}
/**
 * Apply an active player argument to the given player ID
 * @param {Object} activePlayers
 * @param {Object} _activePlayersMinMoves
 * @param {Object} _activePlayersMaxMoves
 * @param {String} playerID The player to apply the parameter to
 * @param {(String|Object)} arg An active player argument
 */
function ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, playerID, arg) {
  if (_typeof(arg) !== 'object' || arg === Stage.NULL) {
    arg = {
      stage: arg
    };
  }
  if (arg.stage !== undefined) {
    // stages previously did not enforce minMoves, this behaviour is kept intentionally
    supportDeprecatedMoveLimit(arg);
    activePlayers[playerID] = arg.stage;
    if (arg.minMoves) _activePlayersMinMoves[playerID] = arg.minMoves;
    if (arg.maxMoves) _activePlayersMaxMoves[playerID] = arg.maxMoves;
  }
}
/**
 * Converts a playOrderPos index into its value in playOrder.
 * @param {Array} playOrder - An array of player ID's.
 * @param {number} playOrderPos - An index into the above.
 */
function getCurrentPlayer(playOrder, playOrderPos) {
  // convert to string in case playOrder is set to number[]
  return playOrder[playOrderPos] + '';
}
/**
 * Called at the start of a turn to initialize turn order state.
 *
 * TODO: This is called inside StartTurn, which is called from
 * both UpdateTurn and StartPhase (so it's called at the beginning
 * of a new phase as well as between turns). We should probably
 * split it into two.
 */
function InitTurnOrderState(state, turn) {
  var G = state.G,
    ctx = state.ctx;
  var _ctx3 = ctx,
    numPlayers = _ctx3.numPlayers;
  var pluginAPIs = GetAPIs(state);
  var context = _objectSpread(_objectSpread({}, pluginAPIs), {}, {
    G: G,
    ctx: ctx
  });
  var order = turn.order;
  var playOrder = _toConsumableArray(Array.from({
    length: numPlayers
  })).map(function (_, i) {
    return i + '';
  });
  if (order.playOrder !== undefined) {
    playOrder = order.playOrder(context);
  }
  var playOrderPos = order.first(context);
  var posType = _typeof(playOrderPos);
  if (posType !== 'number') {
    error("invalid value returned by turn.order.first \u2014 expected number got ".concat(posType, " \u201C").concat(playOrderPos, "\u201D."));
  }
  var currentPlayer = getCurrentPlayer(playOrder, playOrderPos);
  ctx = _objectSpread(_objectSpread({}, ctx), {}, {
    currentPlayer: currentPlayer,
    playOrderPos: playOrderPos,
    playOrder: playOrder
  });
  ctx = SetActivePlayers(ctx, turn.activePlayers || {});
  return ctx;
}
/**
 * Called at the end of each turn to update the turn order state.
 * @param {object} G - The game object G.
 * @param {object} ctx - The game object ctx.
 * @param {object} turn - A turn object for this phase.
 * @param {string} endTurnArg - An optional argument to endTurn that
                                may specify the next player.
 */
function UpdateTurnOrderState(state, currentPlayer, turn, endTurnArg) {
  var order = turn.order;
  var G = state.G,
    ctx = state.ctx;
  var playOrderPos = ctx.playOrderPos;
  var endPhase = false;
  if (endTurnArg && endTurnArg !== true) {
    if (_typeof(endTurnArg) !== 'object') {
      error("invalid argument to endTurn: ".concat(endTurnArg));
    }
    Object.keys(endTurnArg).forEach(function (arg) {
      switch (arg) {
        case 'remove':
          currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
          break;
        case 'next':
          playOrderPos = ctx.playOrder.indexOf(endTurnArg.next);
          currentPlayer = endTurnArg.next;
          break;
        default:
          error("invalid argument to endTurn: ".concat(arg));
      }
    });
  } else {
    var pluginAPIs = GetAPIs(state);
    var context = _objectSpread(_objectSpread({}, pluginAPIs), {}, {
      G: G,
      ctx: ctx
    });
    var t = order.next(context);
    var type = _typeof(t);
    if (t !== undefined && type !== 'number') {
      error("invalid value returned by turn.order.next \u2014 expected number or undefined got ".concat(type, " \u201C").concat(t, "\u201D."));
    }
    if (t === undefined) {
      endPhase = true;
    } else {
      playOrderPos = t;
      currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
    }
  }
  ctx = _objectSpread(_objectSpread({}, ctx), {}, {
    playOrderPos: playOrderPos,
    currentPlayer: currentPlayer
  });
  return {
    endPhase: endPhase,
    ctx: ctx
  };
}
/**
 * Set of different turn orders possible in a phase.
 * These are meant to be passed to the `turn` setting
 * in the flow objects.
 *
 * Each object defines the first player when the phase / game
 * begins, and also a function `next` to determine who the
 * next player is when the turn ends.
 *
 * The phase ends if next() returns undefined.
 */
var TurnOrder = {
  /**
   * DEFAULT
   *
   * The default round-robin turn order.
   */
  DEFAULT: {
    first: function first(_ref13) {
      var ctx = _ref13.ctx;
      return ctx.turn === 0 ? ctx.playOrderPos : (ctx.playOrderPos + 1) % ctx.playOrder.length;
    },
    next: function next(_ref14) {
      var ctx = _ref14.ctx;
      return (ctx.playOrderPos + 1) % ctx.playOrder.length;
    }
  },
  /**
   * RESET
   *
   * Similar to DEFAULT, but starts from 0 each time.
   */
  RESET: {
    first: function first() {
      return 0;
    },
    next: function next(_ref15) {
      var ctx = _ref15.ctx;
      return (ctx.playOrderPos + 1) % ctx.playOrder.length;
    }
  },
  /**
   * CONTINUE
   *
   * Similar to DEFAULT, but starts with the player who ended the last phase.
   */
  CONTINUE: {
    first: function first(_ref16) {
      var ctx = _ref16.ctx;
      return ctx.playOrderPos;
    },
    next: function next(_ref17) {
      var ctx = _ref17.ctx;
      return (ctx.playOrderPos + 1) % ctx.playOrder.length;
    }
  },
  /**
   * ONCE
   *
   * Another round-robin turn order, but goes around just once.
   * The phase ends after all players have played.
   */
  ONCE: {
    first: function first() {
      return 0;
    },
    next: function next(_ref18) {
      var ctx = _ref18.ctx;
      if (ctx.playOrderPos < ctx.playOrder.length - 1) {
        return ctx.playOrderPos + 1;
      }
    }
  },
  /**
   * CUSTOM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase.
   *
   * @param {Array} playOrder - The play order.
   */
  CUSTOM: function CUSTOM(_playOrder) {
    return {
      playOrder: function playOrder() {
        return _playOrder;
      },
      first: function first() {
        return 0;
      },
      next: function next(_ref19) {
        var ctx = _ref19.ctx;
        return (ctx.playOrderPos + 1) % ctx.playOrder.length;
      }
    };
  },
  /**
   * CUSTOM_FROM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase to a value specified by a field
   * in G.
   *
   * @param {string} playOrderField - Field in G.
   */
  CUSTOM_FROM: function CUSTOM_FROM(playOrderField) {
    return {
      playOrder: function playOrder(_ref20) {
        var G = _ref20.G;
        return G[playOrderField];
      },
      first: function first() {
        return 0;
      },
      next: function next(_ref21) {
        var ctx = _ref21.ctx;
        return (ctx.playOrderPos + 1) % ctx.playOrder.length;
      }
    };
  }
};
var Stage = {
  NULL: null
};
var ActivePlayers = {
  /**
   * ALL
   *
   * The turn stays with one player, but any player can play (in any order)
   * until the phase ends.
   */
  ALL: {
    all: Stage.NULL
  },
  /**
   * ALL_ONCE
   *
   * The turn stays with one player, but any player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every player in the game.
   */
  ALL_ONCE: {
    all: Stage.NULL,
    minMoves: 1,
    maxMoves: 1
  },
  /**
   * OTHERS
   *
   * The turn stays with one player, and every *other* player can play (in any order)
   * until the phase ends.
   */
  OTHERS: {
    others: Stage.NULL
  },
  /**
   * OTHERS_ONCE
   *
   * The turn stays with one player, and every *other* player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every *other* player in the game.
   */
  OTHERS_ONCE: {
    others: Stage.NULL,
    minMoves: 1,
    maxMoves: 1
  }
};
exports.ActionCreators = ActionCreators;
exports.ActivePlayers = ActivePlayers;
exports.Enhance = Enhance;
exports.FlushAndValidate = FlushAndValidate;
exports.FnWrap = FnWrap;
exports.GAME_EVENT = GAME_EVENT;
exports.GetAPIs = GetAPIs;
exports.INVALID_MOVE = INVALID_MOVE;
exports.InitTurnOrderState = InitTurnOrderState;
exports.MAKE_MOVE = MAKE_MOVE;
exports.NoClient = NoClient;
exports.PATCH = PATCH;
exports.PLUGIN = PLUGIN;
exports.PlayerView = PlayerView;
exports.ProcessAction = ProcessAction;
exports.REDO = REDO;
exports.RESET = RESET;
exports.STRIP_TRANSIENTS = STRIP_TRANSIENTS;
exports.SYNC = SYNC;
exports.SetActivePlayers = SetActivePlayers;
exports.Setup = Setup;
exports.Stage = Stage;
exports.TurnOrder = TurnOrder;
exports.UNDO = UNDO;
exports.UPDATE = UPDATE;
exports.UpdateActivePlayersOnceEmpty = UpdateActivePlayersOnceEmpty;
exports.UpdateTurnOrderState = UpdateTurnOrderState;
exports.error = error;
exports.gameEvent = gameEvent;
exports.info = info;
exports.makeMove = makeMove;
exports.patch = patch;
exports.redo = redo;
exports.reset = reset;
exports.stripTransients = stripTransients;
exports.supportDeprecatedMoveLimit = supportDeprecatedMoveLimit;
exports.sync = sync;
exports.undo = undo;
exports.update = update;
},{"immer":"node_modules/immer/dist/immer.esm.js","./plugin-random-7425844d.js":"node_modules/boardgame.io/dist/cjs/plugin-random-7425844d.js","lodash.isplainobject":"node_modules/lodash.isplainobject/index.js"}],"node_modules/boardgame.io/dist/cjs/core.js":[function(require,module,exports) {
'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, '__esModule', {
  value: true
});
var turnOrder = require('./turn-order-4ab12333.js');
require('immer');
require('./plugin-random-7425844d.js');
require('lodash.isplainobject');

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * PlayerView reducers.
 */
var PlayerView = {
  /**
   * STRIP_SECRETS
   *
   * Reducer which removes a key named `secret` and
   * removes all the keys in `players`, except for the one
   * corresponding to the current playerID.
   */
  STRIP_SECRETS: function STRIP_SECRETS(_ref) {
    var G = _ref.G,
      playerID = _ref.playerID;
    var r = _objectSpread({}, G);
    if (r.secret !== undefined) {
      delete r.secret;
    }
    if (r.players) {
      r.players = playerID ? _defineProperty({}, playerID, r.players[playerID]) : {};
    }
    return r;
  }
};
exports.ActivePlayers = turnOrder.ActivePlayers;
Object.defineProperty(exports, 'GameMethod', {
  enumerable: true,
  get: function get() {
    return turnOrder.GameMethod;
  }
});
exports.INVALID_MOVE = turnOrder.INVALID_MOVE;
exports.Stage = turnOrder.Stage;
exports.TurnOrder = turnOrder.TurnOrder;
exports.PlayerView = PlayerView;
},{"./turn-order-4ab12333.js":"node_modules/boardgame.io/dist/cjs/turn-order-4ab12333.js","immer":"node_modules/immer/dist/immer.esm.js","./plugin-random-7425844d.js":"node_modules/boardgame.io/dist/cjs/plugin-random-7425844d.js","lodash.isplainobject":"node_modules/lodash.isplainobject/index.js"}],"src/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TicTacToe = void 0;
var _core = require("boardgame.io/dist/cjs/core.js");
// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  var positions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  var isRowComplete = function isRowComplete(row) {
    var symbols = row.map(function (i) {
      return cells[i];
    });
    return symbols.every(function (i) {
      return i !== null && i === symbols[0];
    });
  };
  return positions.map(isRowComplete).some(function (i) {
    return i === true;
  });
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter(function (c) {
    return c === null;
  }).length === 0;
}
var TicTacToe = exports.TicTacToe = {
  setup: function setup() {
    return {
      cells: Array(9).fill(null)
    };
  },
  turn: {
    minMoves: 1,
    maxMoves: 1
  },
  moves: {
    clickCell: function clickCell(_ref, id) {
      var G = _ref.G,
        playerID = _ref.playerID;
      if (G.cells[id] !== null) {
        return _core.INVALID_MOVE;
      }
      G.cells[id] = playerID;
    }
  },
  endIf: function endIf(_ref2) {
    var G = _ref2.G,
      ctx = _ref2.ctx;
    if (IsVictory(G.cells)) {
      return {
        winner: ctx.currentPlayer
      };
    }
    if (IsDraw(G.cells)) {
      return {
        draw: true
      };
    }
  }
};
},{"boardgame.io/dist/cjs/core.js":"node_modules/boardgame.io/dist/cjs/core.js"}],"node_modules/boardgame.io/dist/esm/util-991e76bb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.c = exports.S = exports.A = void 0;
exports.i = isSynchronous;
var _initialize7316768f = require("./initialize-7316768f.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Type;
(function (Type) {
  Type[Type["SYNC"] = 0] = "SYNC";
  Type[Type["ASYNC"] = 1] = "ASYNC";
})(Type || (Type = {}));
/**
 * Type guard that checks if a storage implementation is synchronous.
 */
function isSynchronous(storageAPI) {
  return storageAPI.type() === Type.SYNC;
}
var Async = exports.A = /*#__PURE__*/function () {
  function Async() {
    _classCallCheck(this, Async);
  }
  return _createClass(Async, [{
    key: "type",
    value: /* istanbul ignore next */
    function type() {
      /* istanbul ignore next */
      return Type.ASYNC;
    }
    /**
     * Create a new match.
     *
     * This might just need to call setState and setMetadata in
     * most implementations.
     *
     * However, it exists as a separate call so that the
     * implementation can provision things differently when
     * a match is created.  For example, it might stow away the
     * initial match state in a separate field for easier retrieval.
     */
    /* istanbul ignore next */
  }, {
    key: "createMatch",
    value: (function () {
      var _createMatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(matchID, opts) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this.createGame) {
                _context.n = 1;
                break;
              }
              console.warn('The database connector does not implement a createMatch method.', '\nUsing the deprecated createGame method instead.');
              return _context.a(2, this.createGame(matchID, opts));
            case 1:
              console.error('The database connector does not implement a createMatch method.');
            case 2:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function createMatch(_x, _x2) {
        return _createMatch.apply(this, arguments);
      }
      return createMatch;
    }()
    /**
     * Return all matches.
     */
    /* istanbul ignore next */
    )
  }, {
    key: "listMatches",
    value: (function () {
      var _listMatches = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(opts) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!this.listGames) {
                _context2.n = 1;
                break;
              }
              console.warn('The database connector does not implement a listMatches method.', '\nUsing the deprecated listGames method instead.');
              return _context2.a(2, this.listGames(opts));
            case 1:
              console.error('The database connector does not implement a listMatches method.');
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function listMatches(_x3) {
        return _listMatches.apply(this, arguments);
      }
      return listMatches;
    }())
  }]);
}();
var Sync = exports.S = /*#__PURE__*/function () {
  function Sync() {
    _classCallCheck(this, Sync);
  }
  return _createClass(Sync, [{
    key: "type",
    value: function type() {
      return Type.SYNC;
    }
    /**
     * Connect.
     */
  }, {
    key: "connect",
    value: function connect() {
      return;
    }
    /**
     * Create a new match.
     *
     * This might just need to call setState and setMetadata in
     * most implementations.
     *
     * However, it exists as a separate call so that the
     * implementation can provision things differently when
     * a match is created.  For example, it might stow away the
     * initial match state in a separate field for easier retrieval.
     */
    /* istanbul ignore next */
  }, {
    key: "createMatch",
    value: function createMatch(matchID, opts) {
      if (this.createGame) {
        console.warn('The database connector does not implement a createMatch method.', '\nUsing the deprecated createGame method instead.');
        return this.createGame(matchID, opts);
      } else {
        console.error('The database connector does not implement a createMatch method.');
      }
    }
    /**
     * Return all matches.
     */
    /* istanbul ignore next */
  }, {
    key: "listMatches",
    value: function listMatches(opts) {
      if (this.listGames) {
        console.warn('The database connector does not implement a listMatches method.', '\nUsing the deprecated listGames method instead.');
        return this.listGames(opts);
      } else {
        console.error('The database connector does not implement a listMatches method.');
      }
    }
  }]);
}();
/**
 * Creates a new match metadata object.
 */
var createMetadata = function createMetadata(_ref) {
  var game = _ref.game,
    unlisted = _ref.unlisted,
    setupData = _ref.setupData,
    numPlayers = _ref.numPlayers;
  var metadata = {
    gameName: game.name,
    unlisted: !!unlisted,
    players: {},
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  if (setupData !== undefined) metadata.setupData = setupData;
  for (var playerIndex = 0; playerIndex < numPlayers; playerIndex++) {
    metadata.players[playerIndex] = {
      id: playerIndex
    };
  }
  return metadata;
};
/**
 * Creates initial state and metadata for a new match.
 * If the provided `setupData` doesn’t pass the game’s validation,
 * an error object is returned instead.
 */
var createMatch = exports.c = function createMatch(_ref2) {
  var game = _ref2.game,
    numPlayers = _ref2.numPlayers,
    setupData = _ref2.setupData,
    unlisted = _ref2.unlisted;
  if (!numPlayers || typeof numPlayers !== 'number') numPlayers = 2;
  var setupDataError = game.validateSetupData && game.validateSetupData(setupData, numPlayers);
  if (setupDataError !== undefined) return {
    setupDataError: setupDataError
  };
  var metadata = createMetadata({
    game: game,
    numPlayers: numPlayers,
    setupData: setupData,
    unlisted: unlisted
  });
  var initialState = (0, _initialize7316768f.I)({
    game: game,
    numPlayers: numPlayers,
    setupData: setupData
  });
  return {
    metadata: metadata,
    initialState: initialState
  };
};
},{"./initialize-7316768f.js":"node_modules/boardgame.io/dist/esm/initialize-7316768f.js"}],"node_modules/boardgame.io/dist/esm/master-17425f07.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.M = void 0;
var _redux = require("redux");
var _turnOrder8cc4909b = require("./turn-order-8cc4909b.js");
var _reducer24ea3e4c = require("./reducer-24ea3e4c.js");
var _util991e76bb = require("./util-991e76bb.js");
var _excluded = ["credentials"],
  _excluded2 = ["credentials"],
  _excluded3 = ["deltalog"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Filter match data to get a player metadata object with credentials stripped.
 */
var filterMatchData = function filterMatchData(matchData) {
  return Object.values(matchData.players).map(function (player) {
    var credentials = player.credentials,
      filteredData = _objectWithoutProperties(player, _excluded);
    return filteredData;
  });
};
/**
 * Remove player credentials from action payload
 */
var stripCredentialsFromAction = function stripCredentialsFromAction(action) {
  var _action$payload = action.payload,
    credentials = _action$payload.credentials,
    payload = _objectWithoutProperties(_action$payload, _excluded2);
  return _objectSpread(_objectSpread({}, action), {}, {
    payload: payload
  });
};
/**
 * Master
 *
 * Class that runs the game and maintains the authoritative state.
 * It uses the transportAPI to communicate with clients and the
 * storageAPI to communicate with the database.
 */
var Master = exports.M = /*#__PURE__*/function () {
  function Master(game, storageAPI, transportAPI, auth) {
    _classCallCheck(this, Master);
    this.game = (0, _reducer24ea3e4c.P)(game);
    this.storageAPI = storageAPI;
    this.transportAPI = transportAPI;
    this.subscribeCallback = function () {};
    this.auth = auth;
  }
  return _createClass(Master, [{
    key: "subscribe",
    value: function subscribe(fn) {
      this.subscribeCallback = fn;
    }
    /**
     * Called on each move / event made by the client.
     * Computes the new value of the game state and returns it
     * along with a deltalog.
     */
  }, {
    key: "onUpdate",
    value: (function () {
      var _onUpdate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(credAction, stateID, matchID, playerID) {
        var metadata, _this$storageAPI$fetc, _yield$this$storageAP, isAuthentic, action, key, state, _this$storageAPI$fetc2, _yield$this$storageAP2, reducer, middleware, store, hasActivePlayers, isCurrentPlayer, move, prevState, _state, deltalog, stateWithoutDeltalog, newMetadata, writes;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(!credAction || !credAction.payload)) {
                _context.n = 1;
                break;
              }
              return _context.a(2, {
                error: 'missing action or action payload'
              });
            case 1:
              if (!(0, _util991e76bb.i)(this.storageAPI)) {
                _context.n = 2;
                break;
              }
              _this$storageAPI$fetc = this.storageAPI.fetch(matchID, {
                metadata: true
              });
              metadata = _this$storageAPI$fetc.metadata;
              _context.n = 4;
              break;
            case 2:
              _context.n = 3;
              return this.storageAPI.fetch(matchID, {
                metadata: true
              });
            case 3:
              _yield$this$storageAP = _context.v;
              metadata = _yield$this$storageAP.metadata;
            case 4:
              if (!this.auth) {
                _context.n = 6;
                break;
              }
              _context.n = 5;
              return this.auth.authenticateCredentials({
                playerID: playerID,
                credentials: credAction.payload.credentials,
                metadata: metadata
              });
            case 5:
              isAuthentic = _context.v;
              if (isAuthentic) {
                _context.n = 6;
                break;
              }
              return _context.a(2, {
                error: 'unauthorized action'
              });
            case 6:
              action = stripCredentialsFromAction(credAction);
              key = matchID;
              if (!(0, _util991e76bb.i)(this.storageAPI)) {
                _context.n = 7;
                break;
              }
              _this$storageAPI$fetc2 = this.storageAPI.fetch(key, {
                state: true
              });
              state = _this$storageAPI$fetc2.state;
              _context.n = 9;
              break;
            case 7:
              _context.n = 8;
              return this.storageAPI.fetch(key, {
                state: true
              });
            case 8:
              _yield$this$storageAP2 = _context.v;
              state = _yield$this$storageAP2.state;
            case 9:
              if (!(state === undefined)) {
                _context.n = 10;
                break;
              }
              (0, _turnOrder8cc4909b.e)("game not found, matchID=[".concat(key, "]"));
              return _context.a(2, {
                error: 'game not found'
              });
            case 10:
              if (!(state.ctx.gameover !== undefined)) {
                _context.n = 11;
                break;
              }
              (0, _turnOrder8cc4909b.e)("game over - matchID=[".concat(key, "] - playerID=[").concat(playerID, "]") + " - action[".concat(action.payload.type, "]"));
              return _context.a(2);
            case 11:
              reducer = (0, _reducer24ea3e4c.C)({
                game: this.game
              });
              middleware = (0, _redux.applyMiddleware)(_reducer24ea3e4c.T);
              store = (0, _redux.createStore)(reducer, state, middleware); // Only allow UNDO / REDO if there is exactly one player
              // that can make moves right now and the person doing the
              // action is that player.
              if (!(action.type == _turnOrder8cc4909b.j || action.type == _turnOrder8cc4909b.R)) {
                _context.n = 12;
                break;
              }
              hasActivePlayers = state.ctx.activePlayers !== null;
              isCurrentPlayer = state.ctx.currentPlayer === playerID;
              if (!(
              // If activePlayers is empty, non-current players can’t undo.
              !hasActivePlayers && !isCurrentPlayer ||
              // If player is not active or multiple players are active, can’t undo.
              hasActivePlayers && (state.ctx.activePlayers[playerID] === undefined || Object.keys(state.ctx.activePlayers).length > 1))) {
                _context.n = 12;
                break;
              }
              (0, _turnOrder8cc4909b.e)("playerID=[".concat(playerID, "] cannot undo / redo right now"));
              return _context.a(2);
            case 12:
              if (this.game.flow.isPlayerActive(state.G, state.ctx, playerID)) {
                _context.n = 13;
                break;
              }
              (0, _turnOrder8cc4909b.e)("player not active - playerID=[".concat(playerID, "]") + " - action[".concat(action.payload.type, "]"));
              return _context.a(2);
            case 13:
              // Get move for further checks
              move = action.type == _turnOrder8cc4909b.M ? this.game.flow.getMove(state.ctx, action.payload.type, playerID) : null; // Check whether the player is allowed to make the move.
              if (!(action.type == _turnOrder8cc4909b.M && !move)) {
                _context.n = 14;
                break;
              }
              (0, _turnOrder8cc4909b.e)("move not processed - canPlayerMakeMove=false - playerID=[".concat(playerID, "]") + " - action[".concat(action.payload.type, "]"));
              return _context.a(2);
            case 14:
              if (!(state._stateID !== stateID && !(move && (0, _reducer24ea3e4c.I)(move) && move.ignoreStaleStateID))) {
                _context.n = 15;
                break;
              }
              (0, _turnOrder8cc4909b.e)("invalid stateID, was=[".concat(stateID, "], expected=[").concat(state._stateID, "]") + " - playerID=[".concat(playerID, "] - action[").concat(action.payload.type, "]"));
              return _context.a(2);
            case 15:
              prevState = store.getState(); // Update server's version of the store.
              store.dispatch(action);
              state = store.getState();
              this.subscribeCallback({
                state: state,
                action: action,
                matchID: matchID
              });
              if (this.game.deltaState) {
                this.transportAPI.sendAll({
                  type: 'patch',
                  args: [matchID, stateID, prevState, state]
                });
              } else {
                this.transportAPI.sendAll({
                  type: 'update',
                  args: [matchID, state]
                });
              }
              _state = state, deltalog = _state.deltalog, stateWithoutDeltalog = _objectWithoutProperties(_state, _excluded3);
              if (metadata && (metadata.gameover === undefined || metadata.gameover === null)) {
                newMetadata = _objectSpread(_objectSpread({}, metadata), {}, {
                  updatedAt: Date.now()
                });
                if (state.ctx.gameover !== undefined) {
                  newMetadata.gameover = state.ctx.gameover;
                }
              }
              if (!(0, _util991e76bb.i)(this.storageAPI)) {
                _context.n = 16;
                break;
              }
              this.storageAPI.setState(key, stateWithoutDeltalog, deltalog);
              if (newMetadata) this.storageAPI.setMetadata(key, newMetadata);
              _context.n = 17;
              break;
            case 16:
              writes = [this.storageAPI.setState(key, stateWithoutDeltalog, deltalog)];
              if (newMetadata) {
                writes.push(this.storageAPI.setMetadata(key, newMetadata));
              }
              _context.n = 17;
              return Promise.all(writes);
            case 17:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function onUpdate(_x, _x2, _x3, _x4) {
        return _onUpdate.apply(this, arguments);
      }
      return onUpdate;
    }()
    /**
     * Called when the client connects / reconnects.
     * Returns the latest game state and the entire log.
     */
    )
  }, {
    key: "onSync",
    value: (function () {
      var _onSync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(matchID, playerID, credentials) {
        var numPlayers,
          key,
          fetchOpts,
          fetchResult,
          state,
          initialState,
          log,
          metadata,
          isAuthentic,
          match,
          filteredMetadata,
          syncInfo,
          _args2 = arguments,
          _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              numPlayers = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 2;
              key = matchID;
              fetchOpts = {
                state: true,
                metadata: true,
                log: true,
                initialState: true
              };
              if (!(0, _util991e76bb.i)(this.storageAPI)) {
                _context2.n = 1;
                break;
              }
              _t = this.storageAPI.fetch(key, fetchOpts);
              _context2.n = 3;
              break;
            case 1:
              _context2.n = 2;
              return this.storageAPI.fetch(key, fetchOpts);
            case 2:
              _t = _context2.v;
            case 3:
              fetchResult = _t;
              state = fetchResult.state, initialState = fetchResult.initialState, log = fetchResult.log, metadata = fetchResult.metadata;
              if (!(this.auth && playerID !== undefined && playerID !== null)) {
                _context2.n = 5;
                break;
              }
              _context2.n = 4;
              return this.auth.authenticateCredentials({
                playerID: playerID,
                credentials: credentials,
                metadata: metadata
              });
            case 4:
              isAuthentic = _context2.v;
              if (isAuthentic) {
                _context2.n = 5;
                break;
              }
              return _context2.a(2, {
                error: 'unauthorized'
              });
            case 5:
              if (!(state === undefined)) {
                _context2.n = 8;
                break;
              }
              match = (0, _util991e76bb.c)({
                game: this.game,
                unlisted: true,
                numPlayers: numPlayers,
                setupData: undefined
              });
              if (!('setupDataError' in match)) {
                _context2.n = 6;
                break;
              }
              return _context2.a(2, {
                error: 'game requires setupData'
              });
            case 6:
              initialState = state = match.initialState;
              metadata = match.metadata;
              this.subscribeCallback({
                state: state,
                matchID: matchID
              });
              if (!(0, _util991e76bb.i)(this.storageAPI)) {
                _context2.n = 7;
                break;
              }
              this.storageAPI.createMatch(key, {
                initialState: initialState,
                metadata: metadata
              });
              _context2.n = 8;
              break;
            case 7:
              _context2.n = 8;
              return this.storageAPI.createMatch(key, {
                initialState: initialState,
                metadata: metadata
              });
            case 8:
              filteredMetadata = metadata ? filterMatchData(metadata) : undefined;
              syncInfo = {
                state: state,
                log: log,
                filteredMetadata: filteredMetadata,
                initialState: initialState
              };
              this.transportAPI.send({
                playerID: playerID,
                type: 'sync',
                args: [matchID, syncInfo]
              });
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function onSync(_x5, _x6, _x7) {
        return _onSync.apply(this, arguments);
      }
      return onSync;
    }()
    /**
     * Called when a client connects or disconnects.
     * Updates and sends out metadata to reflect the player’s connection status.
     */
    )
  }, {
    key: "onConnectionChange",
    value: (function () {
      var _onConnectionChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(matchID, playerID, credentials, connected) {
        var key, metadata, _this$storageAPI$fetc3, _yield$this$storageAP3, isAuthentic, filteredMetadata;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              key = matchID; // Ignore changes for clients without a playerID, e.g. spectators.
              if (!(playerID === undefined || playerID === null)) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              if (!(0, _util991e76bb.i)(this.storageAPI)) {
                _context3.n = 2;
                break;
              }
              _this$storageAPI$fetc3 = this.storageAPI.fetch(key, {
                metadata: true
              });
              metadata = _this$storageAPI$fetc3.metadata;
              _context3.n = 4;
              break;
            case 2:
              _context3.n = 3;
              return this.storageAPI.fetch(key, {
                metadata: true
              });
            case 3:
              _yield$this$storageAP3 = _context3.v;
              metadata = _yield$this$storageAP3.metadata;
            case 4:
              if (!(metadata === undefined)) {
                _context3.n = 5;
                break;
              }
              (0, _turnOrder8cc4909b.e)("metadata not found for matchID=[".concat(key, "]"));
              return _context3.a(2, {
                error: 'metadata not found'
              });
            case 5:
              if (!(metadata.players[playerID] === undefined)) {
                _context3.n = 6;
                break;
              }
              (0, _turnOrder8cc4909b.e)("Player not in the match, matchID=[".concat(key, "] playerID=[").concat(playerID, "]"));
              return _context3.a(2, {
                error: 'player not in the match'
              });
            case 6:
              if (!this.auth) {
                _context3.n = 8;
                break;
              }
              _context3.n = 7;
              return this.auth.authenticateCredentials({
                playerID: playerID,
                credentials: credentials,
                metadata: metadata
              });
            case 7:
              isAuthentic = _context3.v;
              if (isAuthentic) {
                _context3.n = 8;
                break;
              }
              return _context3.a(2, {
                error: 'unauthorized'
              });
            case 8:
              metadata.players[playerID].isConnected = connected;
              filteredMetadata = filterMatchData(metadata);
              this.transportAPI.sendAll({
                type: 'matchData',
                args: [matchID, filteredMetadata]
              });
              if (!(0, _util991e76bb.i)(this.storageAPI)) {
                _context3.n = 9;
                break;
              }
              this.storageAPI.setMetadata(key, metadata);
              _context3.n = 10;
              break;
            case 9:
              _context3.n = 10;
              return this.storageAPI.setMetadata(key, metadata);
            case 10:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function onConnectionChange(_x8, _x9, _x0, _x1) {
        return _onConnectionChange.apply(this, arguments);
      }
      return onConnectionChange;
    }())
  }, {
    key: "onChatMessage",
    value: function () {
      var _onChatMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(matchID, chatMessage, credentials) {
        var key, _yield$this$storageAP4, metadata, isAuthentic;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              key = matchID;
              if (!this.auth) {
                _context4.n = 4;
                break;
              }
              _context4.n = 1;
              return this.storageAPI.fetch(key, {
                metadata: true
              });
            case 1:
              _yield$this$storageAP4 = _context4.v;
              metadata = _yield$this$storageAP4.metadata;
              if (chatMessage && typeof chatMessage.sender === 'string') {
                _context4.n = 2;
                break;
              }
              return _context4.a(2, {
                error: 'unauthorized'
              });
            case 2:
              _context4.n = 3;
              return this.auth.authenticateCredentials({
                playerID: chatMessage.sender,
                credentials: credentials,
                metadata: metadata
              });
            case 3:
              isAuthentic = _context4.v;
              if (isAuthentic) {
                _context4.n = 4;
                break;
              }
              return _context4.a(2, {
                error: 'unauthorized'
              });
            case 4:
              this.transportAPI.sendAll({
                type: 'chat',
                args: [matchID, chatMessage]
              });
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function onChatMessage(_x10, _x11, _x12) {
        return _onChatMessage.apply(this, arguments);
      }
      return onChatMessage;
    }()
  }]);
}();
},{"redux":"node_modules/redux/es/redux.js","./turn-order-8cc4909b.js":"node_modules/boardgame.io/dist/esm/turn-order-8cc4909b.js","./reducer-24ea3e4c.js":"node_modules/boardgame.io/dist/esm/reducer-24ea3e4c.js","./util-991e76bb.js":"node_modules/boardgame.io/dist/esm/util-991e76bb.js"}],"node_modules/boardgame.io/dist/esm/filter-player-view-43ed49b0.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.g = void 0;
var _turnOrder8cc4909b = require("./turn-order-8cc4909b.js");
var _rfc = require("rfc6902");
var _excluded = ["redact"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var applyPlayerView = function applyPlayerView(game, playerID, state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    G: game.playerView({
      G: state.G,
      ctx: state.ctx,
      playerID: playerID
    }),
    plugins: (0, _turnOrder8cc4909b.x)(state, {
      playerID: playerID,
      game: game
    }),
    deltalog: undefined,
    _undo: [],
    _redo: []
  });
};
/** Gets a function that filters the TransportData for a given player and game. */
var getFilterPlayerView = exports.g = function getFilterPlayerView(game) {
  return function (playerID, payload) {
    switch (payload.type) {
      case 'patch':
        {
          var _payload$args = _slicedToArray(payload.args, 4),
            matchID = _payload$args[0],
            stateID = _payload$args[1],
            prevState = _payload$args[2],
            state = _payload$args[3];
          var log = redactLog(state.deltalog, playerID);
          var filteredState = applyPlayerView(game, playerID, state);
          var newStateID = state._stateID;
          var prevFilteredState = applyPlayerView(game, playerID, prevState);
          var patch = (0, _rfc.createPatch)(prevFilteredState, filteredState);
          return {
            type: 'patch',
            args: [matchID, stateID, newStateID, patch, log]
          };
        }
      case 'update':
        {
          var _payload$args2 = _slicedToArray(payload.args, 2),
            _matchID = _payload$args2[0],
            _state = _payload$args2[1];
          var _log = redactLog(_state.deltalog, playerID);
          var _filteredState = applyPlayerView(game, playerID, _state);
          return {
            type: 'update',
            args: [_matchID, _filteredState, _log]
          };
        }
      case 'sync':
        {
          var _payload$args3 = _slicedToArray(payload.args, 2),
            _matchID2 = _payload$args3[0],
            syncInfo = _payload$args3[1];
          var _filteredState2 = applyPlayerView(game, playerID, syncInfo.state);
          var _log2 = redactLog(syncInfo.log, playerID);
          var newSyncInfo = _objectSpread(_objectSpread({}, syncInfo), {}, {
            state: _filteredState2,
            log: _log2
          });
          return {
            type: 'sync',
            args: [_matchID2, newSyncInfo]
          };
        }
      default:
        {
          return payload;
        }
    }
  };
};
/**
 * Redact the log.
 *
 * @param {Array} log - The game log (or deltalog).
 * @param {String} playerID - The playerID that this log is
 *                            to be sent to.
 */
function redactLog(log, playerID) {
  if (log === undefined) {
    return log;
  }
  return log.map(function (logEvent) {
    // filter for all other players and spectators.
    if (playerID !== null && +playerID === +logEvent.action.payload.playerID) {
      return logEvent;
    }
    if (logEvent.redact !== true) {
      return logEvent;
    }
    var payload = _objectSpread(_objectSpread({}, logEvent.action.payload), {}, {
      args: null
    });
    var filteredEvent = _objectSpread(_objectSpread({}, logEvent), {}, {
      action: _objectSpread(_objectSpread({}, logEvent.action), {}, {
        payload: payload
      })
    });
    var redact = filteredEvent.redact,
      remaining = _objectWithoutProperties(filteredEvent, _excluded);
    return remaining;
  });
}
},{"./turn-order-8cc4909b.js":"node_modules/boardgame.io/dist/esm/turn-order-8cc4909b.js","rfc6902":"node_modules/rfc6902/index.js"}],"node_modules/engine.io-parser/build/esm/commons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PACKET_TYPES_REVERSE = exports.PACKET_TYPES = exports.ERROR_PACKET = void 0;
const PACKET_TYPES = exports.PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = exports.PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = exports.ERROR_PACKET = {
  type: "error",
  data: "parser error"
};
},{}],"node_modules/engine.io-parser/build/esm/encodePacket.browser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodePacket = void 0;
exports.encodePacketToBinary = encodePacketToBinary;
var _commons = require("./commons.js");
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({
  type,
  data
}, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  // plain string
  return callback(_commons.PACKET_TYPES[type] + (data || ""));
};
exports.encodePacket = encodePacket;
const encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const content = fileReader.result.split(",")[1];
    callback("b" + (content || ""));
  };
  return fileReader.readAsDataURL(data);
};
function toArray(data) {
  if (data instanceof Uint8Array) {
    return data;
  } else if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  } else {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
}
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
  if (withNativeBlob && packet.data instanceof Blob) {
    return packet.data.arrayBuffer().then(toArray).then(callback);
  } else if (withNativeArrayBuffer && (packet.data instanceof ArrayBuffer || isView(packet.data))) {
    return callback(toArray(packet.data));
  }
  encodePacket(packet, false, encoded => {
    if (!TEXT_ENCODER) {
      TEXT_ENCODER = new TextEncoder();
    }
    callback(TEXT_ENCODER.encode(encoded));
  });
}
},{"./commons.js":"node_modules/engine.io-parser/build/esm/commons.js"}],"node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = exports.decode = void 0;
// imported from https://github.com/socketio/base64-arraybuffer
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
const encode = arraybuffer => {
  let bytes = new Uint8Array(arraybuffer),
    i,
    len = bytes.length,
    base64 = '';
  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base64 += chars[bytes[i + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + '=';
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '==';
  }
  return base64;
};
exports.encode = encode;
const decode = base64 => {
  let bufferLength = base64.length * 0.75,
    len = base64.length,
    i,
    p = 0,
    encoded1,
    encoded2,
    encoded3,
    encoded4;
  if (base64[base64.length - 1] === '=') {
    bufferLength--;
    if (base64[base64.length - 2] === '=') {
      bufferLength--;
    }
  }
  const arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)];
    encoded2 = lookup[base64.charCodeAt(i + 1)];
    encoded3 = lookup[base64.charCodeAt(i + 2)];
    encoded4 = lookup[base64.charCodeAt(i + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};
exports.decode = decode;
},{}],"node_modules/engine.io-parser/build/esm/decodePacket.browser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodePacket = void 0;
var _commons = require("./commons.js");
var _base64Arraybuffer = require("./contrib/base64-arraybuffer.js");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = _commons.PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return _commons.ERROR_PACKET;
  }
  return encodedPacket.length > 1 ? {
    type: _commons.PACKET_TYPES_REVERSE[type],
    data: encodedPacket.substring(1)
  } : {
    type: _commons.PACKET_TYPES_REVERSE[type]
  };
};
exports.decodePacket = decodePacket;
const decodeBase64Packet = (data, binaryType) => {
  if (withNativeArrayBuffer) {
    const decoded = (0, _base64Arraybuffer.decode)(data);
    return mapBinary(decoded, binaryType);
  } else {
    return {
      base64: true,
      data
    }; // fallback for old browsers
  }
};
const mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      if (data instanceof Blob) {
        // from WebSocket + binaryType "blob"
        return data;
      } else {
        // from HTTP long-polling or WebTransport
        return new Blob([data]);
      }
    case "arraybuffer":
    default:
      if (data instanceof ArrayBuffer) {
        // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
        return data;
      } else {
        // from WebTransport (Uint8Array)
        return data.buffer;
      }
  }
};
},{"./commons.js":"node_modules/engine.io-parser/build/esm/commons.js","./contrib/base64-arraybuffer.js":"node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js"}],"node_modules/engine.io-parser/build/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPacketDecoderStream = createPacketDecoderStream;
exports.createPacketEncoderStream = createPacketEncoderStream;
Object.defineProperty(exports, "decodePacket", {
  enumerable: true,
  get: function () {
    return _decodePacket.decodePacket;
  }
});
exports.decodePayload = void 0;
Object.defineProperty(exports, "encodePacket", {
  enumerable: true,
  get: function () {
    return _encodePacket.encodePacket;
  }
});
exports.protocol = exports.encodePayload = void 0;
var _encodePacket = require("./encodePacket.js");
var _decodePacket = require("./decodePacket.js");
var _commons = require("./commons.js");
const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
  // some packets may be added to the array while encoding, so the initial length must be saved
  const length = packets.length;
  const encodedPackets = new Array(length);
  let count = 0;
  packets.forEach((packet, i) => {
    // force base64 encoding for binary packets
    (0, _encodePacket.encodePacket)(packet, false, encodedPacket => {
      encodedPackets[i] = encodedPacket;
      if (++count === length) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};
exports.encodePayload = encodePayload;
const decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i = 0; i < encodedPackets.length; i++) {
    const decodedPacket = (0, _decodePacket.decodePacket)(encodedPackets[i], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};
exports.decodePayload = decodePayload;
function createPacketEncoderStream() {
  return new TransformStream({
    transform(packet, controller) {
      (0, _encodePacket.encodePacketToBinary)(packet, encodedPacket => {
        const payloadLength = encodedPacket.length;
        let header;
        // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
        if (payloadLength < 126) {
          header = new Uint8Array(1);
          new DataView(header.buffer).setUint8(0, payloadLength);
        } else if (payloadLength < 65536) {
          header = new Uint8Array(3);
          const view = new DataView(header.buffer);
          view.setUint8(0, 126);
          view.setUint16(1, payloadLength);
        } else {
          header = new Uint8Array(9);
          const view = new DataView(header.buffer);
          view.setUint8(0, 127);
          view.setBigUint64(1, BigInt(payloadLength));
        }
        // first bit indicates whether the payload is plain text (0) or binary (1)
        if (packet.data && typeof packet.data !== "string") {
          header[0] |= 0x80;
        }
        controller.enqueue(header);
        controller.enqueue(encodedPacket);
      });
    }
  });
}
let TEXT_DECODER;
function totalLength(chunks) {
  return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
  if (chunks[0].length === size) {
    return chunks.shift();
  }
  const buffer = new Uint8Array(size);
  let j = 0;
  for (let i = 0; i < size; i++) {
    buffer[i] = chunks[0][j++];
    if (j === chunks[0].length) {
      chunks.shift();
      j = 0;
    }
  }
  if (chunks.length && j < chunks[0].length) {
    chunks[0] = chunks[0].slice(j);
  }
  return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
  if (!TEXT_DECODER) {
    TEXT_DECODER = new TextDecoder();
  }
  const chunks = [];
  let state = 0 /* State.READ_HEADER */;
  let expectedLength = -1;
  let isBinary = false;
  return new TransformStream({
    transform(chunk, controller) {
      chunks.push(chunk);
      while (true) {
        if (state === 0 /* State.READ_HEADER */) {
          if (totalLength(chunks) < 1) {
            break;
          }
          const header = concatChunks(chunks, 1);
          isBinary = (header[0] & 0x80) === 0x80;
          expectedLength = header[0] & 0x7f;
          if (expectedLength < 126) {
            state = 3 /* State.READ_PAYLOAD */;
          } else if (expectedLength === 126) {
            state = 1 /* State.READ_EXTENDED_LENGTH_16 */;
          } else {
            state = 2 /* State.READ_EXTENDED_LENGTH_64 */;
          }
        } else if (state === 1 /* State.READ_EXTENDED_LENGTH_16 */) {
          if (totalLength(chunks) < 2) {
            break;
          }
          const headerArray = concatChunks(chunks, 2);
          expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
          state = 3 /* State.READ_PAYLOAD */;
        } else if (state === 2 /* State.READ_EXTENDED_LENGTH_64 */) {
          if (totalLength(chunks) < 8) {
            break;
          }
          const headerArray = concatChunks(chunks, 8);
          const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
          const n = view.getUint32(0);
          if (n > Math.pow(2, 53 - 32) - 1) {
            // the maximum safe integer in JavaScript is 2^53 - 1
            controller.enqueue(_commons.ERROR_PACKET);
            break;
          }
          expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
          state = 3 /* State.READ_PAYLOAD */;
        } else {
          if (totalLength(chunks) < expectedLength) {
            break;
          }
          const data = concatChunks(chunks, expectedLength);
          controller.enqueue((0, _decodePacket.decodePacket)(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
          state = 0 /* State.READ_HEADER */;
        }
        if (expectedLength === 0 || expectedLength > maxPayload) {
          controller.enqueue(_commons.ERROR_PACKET);
          break;
        }
      }
    }
  });
}
const protocol = exports.protocol = 4;
},{"./encodePacket.js":"node_modules/engine.io-parser/build/esm/encodePacket.browser.js","./decodePacket.js":"node_modules/engine.io-parser/build/esm/decodePacket.browser.js","./commons.js":"node_modules/engine.io-parser/build/esm/commons.js"}],"node_modules/@socket.io/component-emitter/lib/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Emitter = Emitter;
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }
  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1),
    callbacks = this._callbacks['$' + event];
  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }
  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};
},{}],"node_modules/engine.io-client/build/esm/globals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCookieJar = createCookieJar;
exports.nextTick = exports.globalThisShim = exports.defaultBinaryType = void 0;
const nextTick = exports.nextTick = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return cb => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
const globalThisShim = exports.globalThisShim = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();
const defaultBinaryType = exports.defaultBinaryType = "arraybuffer";
function createCookieJar() {}
},{}],"node_modules/engine.io-client/build/esm/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byteLength = byteLength;
exports.installTimerFunctions = installTimerFunctions;
exports.pick = pick;
exports.randomString = randomString;
var _globalsNode = require("./globals.node.js");
function pick(obj, ...attr) {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = _globalsNode.globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = _globalsNode.globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(_globalsNode.globalThisShim);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(_globalsNode.globalThisShim);
  } else {
    obj.setTimeoutFn = _globalsNode.globalThisShim.setTimeout.bind(_globalsNode.globalThisShim);
    obj.clearTimeoutFn = _globalsNode.globalThisShim.clearTimeout.bind(_globalsNode.globalThisShim);
  }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
function byteLength(obj) {
  if (typeof obj === "string") {
    return utf8Length(obj);
  }
  // arraybuffer or blob
  return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
  let c = 0,
    length = 0;
  for (let i = 0, l = str.length; i < l; i++) {
    c = str.charCodeAt(i);
    if (c < 0x80) {
      length += 1;
    } else if (c < 0x800) {
      length += 2;
    } else if (c < 0xd800 || c >= 0xe000) {
      length += 3;
    } else {
      i++;
      length += 4;
    }
  }
  return length;
}
/**
 * Generates a random 8-characters string.
 */
function randomString() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
},{"./globals.node.js":"node_modules/engine.io-client/build/esm/globals.js"}],"node_modules/engine.io-client/build/esm/contrib/parseqs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = decode;
exports.encode = encode;
// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
function encode(obj) {
  let str = '';
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }
  return str;
}
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */
function decode(qs) {
  let qry = {};
  let pairs = qs.split('&');
  for (let i = 0, l = pairs.length; i < l; i++) {
    let pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
}
},{}],"node_modules/engine.io-client/build/esm/transport.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransportError = exports.Transport = void 0;
var _engine = require("engine.io-parser");
var _componentEmitter = require("@socket.io/component-emitter");
var _util = require("./util.js");
var _parseqs = require("./contrib/parseqs.js");
class TransportError extends Error {
  constructor(reason, description, context) {
    super(reason);
    this.description = description;
    this.context = context;
    this.type = "TransportError";
  }
}
exports.TransportError = TransportError;
class Transport extends _componentEmitter.Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(opts) {
    super();
    this.writable = false;
    (0, _util.installTimerFunctions)(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.socket = opts.socket;
    this.supportsBinary = !opts.forceBase64;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(reason, description, context) {
    super.emitReserved("error", new TransportError(reason, description, context));
    return this;
  }
  /**
   * Opens the transport.
   */
  open() {
    this.readyState = "opening";
    this.doOpen();
    return this;
  }
  /**
   * Closes the transport.
   */
  close() {
    if (this.readyState === "opening" || this.readyState === "open") {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(packets) {
    if (this.readyState === "open") {
      this.write(packets);
    } else {
      // this might happen if the transport was silently closed in the beforeunload event handler
    }
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(data) {
    const packet = (0, _engine.decodePacket)(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(packet) {
    super.emitReserved("packet", packet);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(details) {
    this.readyState = "closed";
    super.emitReserved("close", details);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(onPause) {}
  createUri(schema, query = {}) {
    return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
  }
  _hostname() {
    const hostname = this.opts.hostname;
    return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
  }
  _port() {
    if (this.opts.port && (this.opts.secure && Number(this.opts.port) !== 443 || !this.opts.secure && Number(this.opts.port) !== 80)) {
      return ":" + this.opts.port;
    } else {
      return "";
    }
  }
  _query(query) {
    const encodedQuery = (0, _parseqs.encode)(query);
    return encodedQuery.length ? "?" + encodedQuery : "";
  }
}
exports.Transport = Transport;
},{"engine.io-parser":"node_modules/engine.io-parser/build/esm/index.js","@socket.io/component-emitter":"node_modules/@socket.io/component-emitter/lib/esm/index.js","./util.js":"node_modules/engine.io-client/build/esm/util.js","./contrib/parseqs.js":"node_modules/engine.io-client/build/esm/contrib/parseqs.js"}],"node_modules/engine.io-client/build/esm/transports/polling.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Polling = void 0;
var _transport = require("../transport.js");
var _util = require("../util.js");
var _engine = require("engine.io-parser");
class Polling extends _transport.Transport {
  constructor() {
    super(...arguments);
    this._polling = false;
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this._poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this._polling || !this.writable) {
      let total = 0;
      if (this._polling) {
        total++;
        this.once("pollComplete", function () {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function () {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  _poll() {
    this._polling = true;
    this.doPoll();
    this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(data) {
    const callback = packet => {
      // if its the first message we consider the transport open
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      }
      // if its a close packet, we close the ongoing requests
      if ("close" === packet.type) {
        this.onClose({
          description: "transport closed by the server"
        });
        return false;
      }
      // otherwise bypass onData and handle the message
      this.onPacket(packet);
    };
    // decode payload
    (0, _engine.decodePayload)(data, this.socket.binaryType).forEach(callback);
    // if an event did not trigger closing
    if ("closed" !== this.readyState) {
      // if we got data we're not polling
      this._polling = false;
      this.emitReserved("pollComplete");
      if ("open" === this.readyState) {
        this._poll();
      } else {}
    }
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const close = () => {
      this.write([{
        type: "close"
      }]);
    };
    if ("open" === this.readyState) {
      close();
    } else {
      // in case we're trying to close while
      // handshaking is in progress (GH-164)
      this.once("open", close);
    }
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(packets) {
    this.writable = false;
    (0, _engine.encodePayload)(packets, data => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "https" : "http";
    const query = this.query || {};
    // cache busting is forced
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = (0, _util.randomString)();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
}
exports.Polling = Polling;
},{"../transport.js":"node_modules/engine.io-client/build/esm/transport.js","../util.js":"node_modules/engine.io-client/build/esm/util.js","engine.io-parser":"node_modules/engine.io-parser/build/esm/index.js"}],"node_modules/engine.io-client/build/esm/contrib/has-cors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasCORS = void 0;
// imported from https://github.com/component/has-cors
let value = false;
try {
  value = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
}
const hasCORS = exports.hasCORS = value;
},{}],"node_modules/engine.io-client/build/esm/transports/polling-xhr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XHR = exports.Request = exports.BaseXHR = void 0;
var _polling = require("./polling.js");
var _componentEmitter = require("@socket.io/component-emitter");
var _util = require("../util.js");
var _globalsNode = require("../globals.node.js");
var _hasCors = require("../contrib/has-cors.js");
function empty() {}
class BaseXHR extends _polling.Polling {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(opts) {
    super(opts);
    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;
      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
    }
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data: data
    });
    req.on("success", fn);
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr post error", xhrStatus, context);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr poll error", xhrStatus, context);
    });
    this.pollXhr = req;
  }
}
exports.BaseXHR = BaseXHR;
class Request extends _componentEmitter.Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(createRequest, uri, opts) {
    super();
    this.createRequest = createRequest;
    (0, _util.installTimerFunctions)(this, opts);
    this._opts = opts;
    this._method = opts.method || "GET";
    this._uri = uri;
    this._data = undefined !== opts.data ? opts.data : null;
    this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var _a;
    const opts = (0, _util.pick)(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this._opts.xd;
    const xhr = this._xhr = this.createRequest(opts);
    try {
      xhr.open(this._method, this._uri, true);
      try {
        if (this._opts.extraHeaders) {
          // @ts-ignore
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i in this._opts.extraHeaders) {
            if (this._opts.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}
      if ("POST" === this._method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {}
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {}
      (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
      // ie6 check
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this._opts.withCredentials;
      }
      if (this._opts.requestTimeout) {
        xhr.timeout = this._opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        var _a;
        if (xhr.readyState === 3) {
          (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(
          // @ts-ignore
          xhr.getResponseHeader("set-cookie"));
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          this._onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          this.setTimeoutFn(() => {
            this._onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this._data);
    } catch (e) {
      // Need to defer since .create() is called directly from the constructor
      // and thus the 'error' event can only be only bound *after* this exception
      // occurs.  Therefore, also, we cannot throw here at all.
      this.setTimeoutFn(() => {
        this._onError(e);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this._index = Request.requestsCount++;
      Request.requests[this._index] = this;
    }
  }
  /**
   * Called upon error.
   *
   * @private
   */
  _onError(err) {
    this.emitReserved("error", err, this._xhr);
    this._cleanup(true);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  _cleanup(fromError) {
    if ("undefined" === typeof this._xhr || null === this._xhr) {
      return;
    }
    this._xhr.onreadystatechange = empty;
    if (fromError) {
      try {
        this._xhr.abort();
      } catch (e) {}
    }
    if (typeof document !== "undefined") {
      delete Request.requests[this._index];
    }
    this._xhr = null;
  }
  /**
   * Called upon load.
   *
   * @private
   */
  _onLoad() {
    const data = this._xhr.responseText;
    if (data !== null) {
      this.emitReserved("data", data);
      this.emitReserved("success");
      this._cleanup();
    }
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this._cleanup();
  }
}
exports.Request = Request;
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
  // @ts-ignore
  if (typeof attachEvent === "function") {
    // @ts-ignore
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in _globalsNode.globalThisShim ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}
function unloadHandler() {
  for (let i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}
const hasXHR2 = function () {
  const xhr = newRequest({
    xdomain: false
  });
  return xhr && xhr.responseType !== null;
}();
/**
 * HTTP long-polling based on the built-in `XMLHttpRequest` object.
 *
 * Usage: browser
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */
class XHR extends BaseXHR {
  constructor(opts) {
    super(opts);
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
  }
  request(opts = {}) {
    Object.assign(opts, {
      xd: this.xd
    }, this.opts);
    return new Request(newRequest, this.uri(), opts);
  }
}
exports.XHR = XHR;
function newRequest(opts) {
  const xdomain = opts.xdomain;
  // XMLHttpRequest can be disabled on IE
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || _hasCors.hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}
  if (!xdomain) {
    try {
      return new _globalsNode.globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {}
  }
}
},{"./polling.js":"node_modules/engine.io-client/build/esm/transports/polling.js","@socket.io/component-emitter":"node_modules/@socket.io/component-emitter/lib/esm/index.js","../util.js":"node_modules/engine.io-client/build/esm/util.js","../globals.node.js":"node_modules/engine.io-client/build/esm/globals.js","../contrib/has-cors.js":"node_modules/engine.io-client/build/esm/contrib/has-cors.js"}],"node_modules/engine.io-client/build/esm/transports/websocket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WS = exports.BaseWS = void 0;
var _transport = require("../transport.js");
var _util = require("../util.js");
var _engine = require("engine.io-parser");
var _globalsNode = require("../globals.node.js");
// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class BaseWS extends _transport.Transport {
  get name() {
    return "websocket";
  }
  doOpen() {
    const uri = this.uri();
    const protocols = this.opts.protocols;
    // React Native only supports the 'headers' option, and will print a warning if anything else is passed
    const opts = isReactNative ? {} : (0, _util.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = this.createSocket(uri, protocols, opts);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this.ws.binaryType = this.socket.binaryType;
    this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = closeEvent => this.onClose({
      description: "websocket connection closed",
      context: closeEvent
    });
    this.ws.onmessage = ev => this.onData(ev.data);
    this.ws.onerror = e => this.onError("websocket error", e);
  }
  write(packets) {
    this.writable = false;
    // encodePacket efficient as it uses WS framing
    // no need for encodePayload
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;
      (0, _engine.encodePacket)(packet, this.supportsBinary, data => {
        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          this.doWrite(packet, data);
        } catch (e) {}
        if (lastPacket) {
          // fake drain
          // defer to next tick to allow Socket to clear writeBuffer
          (0, _globalsNode.nextTick)(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.onerror = () => {};
      this.ws.close();
      this.ws = null;
    }
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "wss" : "ws";
    const query = this.query || {};
    // append timestamp to URI
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = (0, _util.randomString)();
    }
    // communicate binary support capabilities
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
}
exports.BaseWS = BaseWS;
const WebSocketCtor = _globalsNode.globalThisShim.WebSocket || _globalsNode.globalThisShim.MozWebSocket;
/**
 * WebSocket transport based on the built-in `WebSocket` object.
 *
 * Usage: browser, Node.js (since v21), Deno, Bun
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 * @see https://caniuse.com/mdn-api_websocket
 * @see https://nodejs.org/api/globals.html#websocket
 */
class WS extends BaseWS {
  createSocket(uri, protocols, opts) {
    return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
  }
  doWrite(_packet, data) {
    this.ws.send(data);
  }
}
exports.WS = WS;
},{"../transport.js":"node_modules/engine.io-client/build/esm/transport.js","../util.js":"node_modules/engine.io-client/build/esm/util.js","engine.io-parser":"node_modules/engine.io-parser/build/esm/index.js","../globals.node.js":"node_modules/engine.io-client/build/esm/globals.js"}],"node_modules/engine.io-client/build/esm/transports/webtransport.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WT = void 0;
var _transport = require("../transport.js");
var _globalsNode = require("../globals.node.js");
var _engine = require("engine.io-parser");
/**
 * WebTransport transport based on the built-in `WebTransport` object.
 *
 * Usage: browser, Node.js (with the `@fails-components/webtransport` package)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
 * @see https://caniuse.com/webtransport
 */
class WT extends _transport.Transport {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      // @ts-ignore
      this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this._transport.closed.then(() => {
      this.onClose();
    }).catch(err => {
      this.onError("webtransport error", err);
    });
    // note: we could have used async/await, but that would require some additional polyfills
    this._transport.ready.then(() => {
      this._transport.createBidirectionalStream().then(stream => {
        const decoderStream = (0, _engine.createPacketDecoderStream)(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
        const reader = stream.readable.pipeThrough(decoderStream).getReader();
        const encoderStream = (0, _engine.createPacketEncoderStream)();
        encoderStream.readable.pipeTo(stream.writable);
        this._writer = encoderStream.writable.getWriter();
        const read = () => {
          reader.read().then(({
            done,
            value
          }) => {
            if (done) {
              return;
            }
            this.onPacket(value);
            read();
          }).catch(err => {});
        };
        read();
        const packet = {
          type: "open"
        };
        if (this.query.sid) {
          packet.data = `{"sid":"${this.query.sid}"}`;
        }
        this._writer.write(packet).then(() => this.onOpen());
      });
    });
  }
  write(packets) {
    this.writable = false;
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;
      this._writer.write(packet).then(() => {
        if (lastPacket) {
          (0, _globalsNode.nextTick)(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    var _a;
    (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
  }
}
exports.WT = WT;
},{"../transport.js":"node_modules/engine.io-client/build/esm/transport.js","../globals.node.js":"node_modules/engine.io-client/build/esm/globals.js","engine.io-parser":"node_modules/engine.io-parser/build/esm/index.js"}],"node_modules/engine.io-client/build/esm/transports/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transports = void 0;
var _pollingXhrNode = require("./polling-xhr.node.js");
var _websocketNode = require("./websocket.node.js");
var _webtransport = require("./webtransport.js");
const transports = exports.transports = {
  websocket: _websocketNode.WS,
  webtransport: _webtransport.WT,
  polling: _pollingXhrNode.XHR
};
},{"./polling-xhr.node.js":"node_modules/engine.io-client/build/esm/transports/polling-xhr.js","./websocket.node.js":"node_modules/engine.io-client/build/esm/transports/websocket.js","./webtransport.js":"node_modules/engine.io-client/build/esm/transports/webtransport.js"}],"node_modules/engine.io-client/build/esm/contrib/parseuri.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
function parse(str) {
  if (str.length > 8000) {
    throw "URI too long";
  }
  const src = str,
    b = str.indexOf('['),
    e = str.indexOf(']');
  if (b != -1 && e != -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
  }
  let m = re.exec(str || ''),
    uri = {},
    i = 14;
  while (i--) {
    uri[parts[i]] = m[i] || '';
  }
  if (b != -1 && e != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
    uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames(uri, uri['path']);
  uri.queryKey = queryKey(uri, uri['query']);
  return uri;
}
function pathNames(obj, path) {
  const regx = /\/{2,9}/g,
    names = path.replace(regx, "/").split("/");
  if (path.slice(0, 1) == '/' || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.slice(-1) == '/') {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey(uri, query) {
  const data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}
},{}],"node_modules/engine.io-client/build/esm/socket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketWithoutUpgrade = exports.SocketWithUpgrade = exports.Socket = void 0;
var _index = require("./transports/index.js");
var _util = require("./util.js");
var _parseqs = require("./contrib/parseqs.js");
var _parseuri = require("./contrib/parseuri.js");
var _componentEmitter = require("@socket.io/component-emitter");
var _engine = require("engine.io-parser");
var _globalsNode = require("./globals.node.js");
const withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
const OFFLINE_EVENT_LISTENERS = [];
if (withEventListeners) {
  // within a ServiceWorker, any event handler for the 'offline' event must be added on the initial evaluation of the
  // script, so we create one single event listener here which will forward the event to the socket instances
  addEventListener("offline", () => {
    OFFLINE_EVENT_LISTENERS.forEach(listener => listener());
  }, false);
}
/**
 * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
 * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
 *
 * This class comes without upgrade mechanism, which means that it will keep the first low-level transport that
 * successfully establishes the connection.
 *
 * In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
 *
 * @example
 * import { SocketWithoutUpgrade, WebSocket } from "engine.io-client";
 *
 * const socket = new SocketWithoutUpgrade({
 *   transports: [WebSocket]
 * });
 *
 * socket.on("open", () => {
 *   socket.send("hello");
 * });
 *
 * @see SocketWithUpgrade
 * @see Socket
 */
class SocketWithoutUpgrade extends _componentEmitter.Emitter {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(uri, opts) {
    super();
    this.binaryType = _globalsNode.defaultBinaryType;
    this.writeBuffer = [];
    this._prevBufferLen = 0;
    this._pingInterval = -1;
    this._pingTimeout = -1;
    this._maxPayload = -1;
    /**
     * The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
     * callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
     */
    this._pingTimeoutTime = Infinity;
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }
    if (uri) {
      const parsedUri = (0, _parseuri.parse)(uri);
      opts.hostname = parsedUri.host;
      opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
      opts.port = parsedUri.port;
      if (parsedUri.query) opts.query = parsedUri.query;
    } else if (opts.host) {
      opts.hostname = (0, _parseuri.parse)(opts.host).host;
    }
    (0, _util.installTimerFunctions)(this, opts);
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = [];
    this._transportsByName = {};
    opts.transports.forEach(t => {
      const transportName = t.prototype.name;
      this.transports.push(transportName);
      this._transportsByName[transportName] = t;
    });
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      addTrailingSlash: true,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: false
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
    if (typeof this.opts.query === "string") {
      this.opts.query = (0, _parseqs.decode)(this.opts.query);
    }
    if (withEventListeners) {
      if (this.opts.closeOnBeforeunload) {
        // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
        // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
        // closed/reloaded)
        this._beforeunloadEventListener = () => {
          if (this.transport) {
            // silently close the transport
            this.transport.removeAllListeners();
            this.transport.close();
          }
        };
        addEventListener("beforeunload", this._beforeunloadEventListener, false);
      }
      if (this.hostname !== "localhost") {
        this._offlineEventListener = () => {
          this._onClose("transport close", {
            description: "network connection lost"
          });
        };
        OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
      }
    }
    if (this.opts.withCredentials) {
      this._cookieJar = (0, _globalsNode.createCookieJar)();
    }
    this._open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(name) {
    const query = Object.assign({}, this.opts.query);
    // append engine.io protocol identifier
    query.EIO = _engine.protocol;
    // transport name
    query.transport = name;
    // session id if we already have one
    if (this.id) query.sid = this.id;
    const opts = Object.assign({}, this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[name]);
    return new this._transportsByName[name](opts);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  _open() {
    if (this.transports.length === 0) {
      // Emit error on next tick so it can be listened to
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const transportName = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
    this.readyState = "opening";
    const transport = this.createTransport(transportName);
    transport.open();
    this.setTransport(transport);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    // set up transport
    this.transport = transport;
    // set up transport listeners
    transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", reason => this._onClose("transport close", reason));
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open";
    SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emitReserved("open");
    this.flush();
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  _onPacket(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.emitReserved("packet", packet);
      // Socket is live - any packet counts
      this.emitReserved("heartbeat");
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this._sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          this._resetPingTimeout();
          break;
        case "error":
          const err = new Error("server error");
          // @ts-ignore
          err.code = packet.data;
          this._onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    } else {}
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this._pingInterval = data.pingInterval;
    this._pingTimeout = data.pingTimeout;
    this._maxPayload = data.maxPayload;
    this.onOpen();
    // In case open handler closes socket
    if ("closed" === this.readyState) return;
    this._resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const delay = this._pingInterval + this._pingTimeout;
    this._pingTimeoutTime = Date.now() + delay;
    this._pingTimeoutTimer = this.setTimeoutFn(() => {
      this._onClose("ping timeout");
    }, delay);
    if (this.opts.autoUnref) {
      this._pingTimeoutTimer.unref();
    }
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  _onDrain() {
    this.writeBuffer.splice(0, this._prevBufferLen);
    // setting prevBufferLen = 0 is very important
    // for example, when upgrading, upgrade packet is sent over,
    // and a nonzero prevBufferLen could cause problems on `drain`
    this._prevBufferLen = 0;
    if (0 === this.writeBuffer.length) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const packets = this._getWritablePackets();
      this.transport.send(packets);
      // keep track of current length of writeBuffer
      // splice writeBuffer and callbackBuffer on `drain`
      this._prevBufferLen = packets.length;
      this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  _getWritablePackets() {
    const shouldCheckPayloadSize = this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
    if (!shouldCheckPayloadSize) {
      return this.writeBuffer;
    }
    let payloadSize = 1; // first packet type
    for (let i = 0; i < this.writeBuffer.length; i++) {
      const data = this.writeBuffer[i].data;
      if (data) {
        payloadSize += (0, _util.byteLength)(data);
      }
      if (i > 0 && payloadSize > this._maxPayload) {
        return this.writeBuffer.slice(0, i);
      }
      payloadSize += 2; // separator + packet type
    }
    return this.writeBuffer;
  }
  /**
   * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
   *
   * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
   * `write()` method then the message would not be buffered by the Socket.IO client.
   *
   * @return {boolean}
   * @private
   */
  /* private */
  _hasPingExpired() {
    if (!this._pingTimeoutTime) return true;
    const hasExpired = Date.now() > this._pingTimeoutTime;
    if (hasExpired) {
      this._pingTimeoutTime = 0;
      (0, _globalsNode.nextTick)(() => {
        this._onClose("ping timeout");
      }, this.setTimeoutFn);
    }
    return hasExpired;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  write(msg, options, fn) {
    this._sendPacket("message", msg, options, fn);
    return this;
  }
  /**
   * Sends a message. Alias of {@link Socket#write}.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  send(msg, options, fn) {
    this._sendPacket("message", msg, options, fn);
    return this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  _sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = undefined;
    }
    if ("function" === typeof options) {
      fn = options;
      options = null;
    }
    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }
    options = options || {};
    options.compress = false !== options.compress;
    const packet = {
      type: type,
      data: data,
      options: options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn) this.once("flush", fn);
    this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const close = () => {
      this._onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  _onError(err) {
    SocketWithoutUpgrade.priorWebsocketSuccess = false;
    if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
      this.transports.shift();
      return this._open();
    }
    this.emitReserved("error", err);
    this._onClose("transport error", err);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  _onClose(reason, description) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      // clear timers
      this.clearTimeoutFn(this._pingTimeoutTimer);
      // stop event from firing again for transport
      this.transport.removeAllListeners("close");
      // ensure transport won't stay open
      this.transport.close();
      // ignore further transport communication
      this.transport.removeAllListeners();
      if (withEventListeners) {
        if (this._beforeunloadEventListener) {
          removeEventListener("beforeunload", this._beforeunloadEventListener, false);
        }
        if (this._offlineEventListener) {
          const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
          if (i !== -1) {
            OFFLINE_EVENT_LISTENERS.splice(i, 1);
          }
        }
      }
      // set ready state
      this.readyState = "closed";
      // clear session id
      this.id = null;
      // emit close event
      this.emitReserved("close", reason, description);
      // clean buffers after, so users can still
      // grab the buffers on `close` event
      this.writeBuffer = [];
      this._prevBufferLen = 0;
    }
  }
}
exports.SocketWithoutUpgrade = SocketWithoutUpgrade;
SocketWithoutUpgrade.protocol = _engine.protocol;
/**
 * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
 * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
 *
 * This class comes with an upgrade mechanism, which means that once the connection is established with the first
 * low-level transport, it will try to upgrade to a better transport.
 *
 * In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
 *
 * @example
 * import { SocketWithUpgrade, WebSocket } from "engine.io-client";
 *
 * const socket = new SocketWithUpgrade({
 *   transports: [WebSocket]
 * });
 *
 * socket.on("open", () => {
 *   socket.send("hello");
 * });
 *
 * @see SocketWithoutUpgrade
 * @see Socket
 */
class SocketWithUpgrade extends SocketWithoutUpgrade {
  constructor() {
    super(...arguments);
    this._upgrades = [];
  }
  onOpen() {
    super.onOpen();
    if ("open" === this.readyState && this.opts.upgrade) {
      for (let i = 0; i < this._upgrades.length; i++) {
        this._probe(this._upgrades[i]);
      }
    }
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  _probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    SocketWithoutUpgrade.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed) return;
      transport.send([{
        type: "ping",
        data: "probe"
      }]);
      transport.once("packet", msg => {
        if (failed) return;
        if ("pong" === msg.type && "probe" === msg.data) {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport) return;
          SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === transport.name;
          this.transport.pause(() => {
            if (failed) return;
            if ("closed" === this.readyState) return;
            cleanup();
            this.setTransport(transport);
            transport.send([{
              type: "upgrade"
            }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          // @ts-ignore
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed) return;
      // Any callback called by transport should be ignored since now
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    // Handle any error that happens while probing
    const onerror = err => {
      const error = new Error("probe error: " + err);
      // @ts-ignore
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    // When the socket is closed while we're probing
    function onclose() {
      onerror("socket closed");
    }
    // When the socket is upgraded while we're probing
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    // Remove all listeners on the transport and on self
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
      // favor WebTransport
      this.setTimeoutFn(() => {
        if (!failed) {
          transport.open();
        }
      }, 200);
    } else {
      transport.open();
    }
  }
  onHandshake(data) {
    this._upgrades = this._filterUpgrades(data.upgrades);
    super.onHandshake(data);
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  _filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    for (let i = 0; i < upgrades.length; i++) {
      if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
    }
    return filteredUpgrades;
  }
}
/**
 * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
 * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
 *
 * This class comes with an upgrade mechanism, which means that once the connection is established with the first
 * low-level transport, it will try to upgrade to a better transport.
 *
 * @example
 * import { Socket } from "engine.io-client";
 *
 * const socket = new Socket();
 *
 * socket.on("open", () => {
 *   socket.send("hello");
 * });
 *
 * @see SocketWithoutUpgrade
 * @see SocketWithUpgrade
 */
exports.SocketWithUpgrade = SocketWithUpgrade;
class Socket extends SocketWithUpgrade {
  constructor(uri, opts = {}) {
    const o = typeof uri === "object" ? uri : opts;
    if (!o.transports || o.transports && typeof o.transports[0] === "string") {
      o.transports = (o.transports || ["polling", "websocket", "webtransport"]).map(transportName => _index.transports[transportName]).filter(t => !!t);
    }
    super(uri, o);
  }
}
exports.Socket = Socket;
},{"./transports/index.js":"node_modules/engine.io-client/build/esm/transports/index.js","./util.js":"node_modules/engine.io-client/build/esm/util.js","./contrib/parseqs.js":"node_modules/engine.io-client/build/esm/contrib/parseqs.js","./contrib/parseuri.js":"node_modules/engine.io-client/build/esm/contrib/parseuri.js","@socket.io/component-emitter":"node_modules/@socket.io/component-emitter/lib/esm/index.js","engine.io-parser":"node_modules/engine.io-parser/build/esm/index.js","./globals.node.js":"node_modules/engine.io-client/build/esm/globals.js"}],"node_modules/engine.io-client/build/esm/transports/polling-fetch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fetch = void 0;
var _polling = require("./polling.js");
/**
 * HTTP long-polling based on the built-in `fetch()` method.
 *
 * Usage: browser, Node.js (since v18), Deno, Bun
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch
 * @see https://caniuse.com/fetch
 * @see https://nodejs.org/api/globals.html#fetch
 */
class Fetch extends _polling.Polling {
  doPoll() {
    this._fetch().then(res => {
      if (!res.ok) {
        return this.onError("fetch read error", res.status, res);
      }
      res.text().then(data => this.onData(data));
    }).catch(err => {
      this.onError("fetch read error", err);
    });
  }
  doWrite(data, callback) {
    this._fetch(data).then(res => {
      if (!res.ok) {
        return this.onError("fetch write error", res.status, res);
      }
      callback();
    }).catch(err => {
      this.onError("fetch write error", err);
    });
  }
  _fetch(data) {
    var _a;
    const isPost = data !== undefined;
    const headers = new Headers(this.opts.extraHeaders);
    if (isPost) {
      headers.set("content-type", "text/plain;charset=UTF-8");
    }
    (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.appendCookies(headers);
    return fetch(this.uri(), {
      method: isPost ? "POST" : "GET",
      body: isPost ? data : null,
      headers,
      credentials: this.opts.withCredentials ? "include" : "omit"
    }).then(res => {
      var _a;
      // @ts-ignore getSetCookie() was added in Node.js v19.7.0
      (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(res.headers.getSetCookie());
      return res;
    });
  }
}
exports.Fetch = Fetch;
},{"./polling.js":"node_modules/engine.io-client/build/esm/transports/polling.js"}],"node_modules/engine.io-client/build/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Fetch", {
  enumerable: true,
  get: function () {
    return _pollingFetch.Fetch;
  }
});
Object.defineProperty(exports, "NodeWebSocket", {
  enumerable: true,
  get: function () {
    return _websocketNode.WS;
  }
});
Object.defineProperty(exports, "NodeXHR", {
  enumerable: true,
  get: function () {
    return _pollingXhrNode.XHR;
  }
});
Object.defineProperty(exports, "Socket", {
  enumerable: true,
  get: function () {
    return _socket.Socket;
  }
});
Object.defineProperty(exports, "SocketWithUpgrade", {
  enumerable: true,
  get: function () {
    return _socket.SocketWithUpgrade;
  }
});
Object.defineProperty(exports, "SocketWithoutUpgrade", {
  enumerable: true,
  get: function () {
    return _socket.SocketWithoutUpgrade;
  }
});
Object.defineProperty(exports, "Transport", {
  enumerable: true,
  get: function () {
    return _transport.Transport;
  }
});
Object.defineProperty(exports, "TransportError", {
  enumerable: true,
  get: function () {
    return _transport.TransportError;
  }
});
Object.defineProperty(exports, "WebSocket", {
  enumerable: true,
  get: function () {
    return _websocket.WS;
  }
});
Object.defineProperty(exports, "WebTransport", {
  enumerable: true,
  get: function () {
    return _webtransport.WT;
  }
});
Object.defineProperty(exports, "XHR", {
  enumerable: true,
  get: function () {
    return _pollingXhr.XHR;
  }
});
Object.defineProperty(exports, "installTimerFunctions", {
  enumerable: true,
  get: function () {
    return _util.installTimerFunctions;
  }
});
Object.defineProperty(exports, "nextTick", {
  enumerable: true,
  get: function () {
    return _globalsNode.nextTick;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parseuri.parse;
  }
});
exports.protocol = void 0;
Object.defineProperty(exports, "transports", {
  enumerable: true,
  get: function () {
    return _index.transports;
  }
});
var _socket = require("./socket.js");
var _transport = require("./transport.js");
var _index = require("./transports/index.js");
var _util = require("./util.js");
var _parseuri = require("./contrib/parseuri.js");
var _globalsNode = require("./globals.node.js");
var _pollingFetch = require("./transports/polling-fetch.js");
var _pollingXhrNode = require("./transports/polling-xhr.node.js");
var _pollingXhr = require("./transports/polling-xhr.js");
var _websocketNode = require("./transports/websocket.node.js");
var _websocket = require("./transports/websocket.js");
var _webtransport = require("./transports/webtransport.js");
const protocol = exports.protocol = _socket.Socket.protocol;
},{"./socket.js":"node_modules/engine.io-client/build/esm/socket.js","./transport.js":"node_modules/engine.io-client/build/esm/transport.js","./transports/index.js":"node_modules/engine.io-client/build/esm/transports/index.js","./util.js":"node_modules/engine.io-client/build/esm/util.js","./contrib/parseuri.js":"node_modules/engine.io-client/build/esm/contrib/parseuri.js","./globals.node.js":"node_modules/engine.io-client/build/esm/globals.js","./transports/polling-fetch.js":"node_modules/engine.io-client/build/esm/transports/polling-fetch.js","./transports/polling-xhr.node.js":"node_modules/engine.io-client/build/esm/transports/polling-xhr.js","./transports/polling-xhr.js":"node_modules/engine.io-client/build/esm/transports/polling-xhr.js","./transports/websocket.node.js":"node_modules/engine.io-client/build/esm/transports/websocket.js","./transports/websocket.js":"node_modules/engine.io-client/build/esm/transports/websocket.js","./transports/webtransport.js":"node_modules/engine.io-client/build/esm/transports/webtransport.js"}],"node_modules/socket.io-client/build/esm/url.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = url;
var _engine = require("engine.io-client");
/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
  let obj = uri;
  // default to window.location
  loc = loc || typeof location !== "undefined" && location;
  if (null == uri) uri = loc.protocol + "//" + loc.host;
  // relative path support
  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if ("undefined" !== typeof loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    // parse
    obj = (0, _engine.parse)(uri);
  }
  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  // define unique id
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  // define href
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}
},{"engine.io-client":"node_modules/engine.io-client/build/esm/index.js"}],"node_modules/socket.io-parser/build/esm/is-binary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasBinary = hasBinary;
exports.isBinary = isBinary;
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = obj => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
  return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}
},{}],"node_modules/socket.io-parser/build/esm/binary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deconstructPacket = deconstructPacket;
exports.reconstructPacket = reconstructPacket;
var _isBinary = require("./is-binary.js");
/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {
    packet: pack,
    buffers: buffers
  };
}
function _deconstructPacket(data, buffers) {
  if (!data) return data;
  if ((0, _isBinary.isBinary)(data)) {
    const placeholder = {
      _placeholder: true,
      num: buffers.length
    };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);
    for (let i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }
    return newData;
  }
  return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  delete packet.attachments; // no longer useful
  return packet;
}
function _reconstructPacket(data, buffers) {
  if (!data) return data;
  if (data && data._placeholder === true) {
    const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
    if (isIndexValid) {
      return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    } else {
      throw new Error("illegal attachments");
    }
  } else if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }
  return data;
}
},{"./is-binary.js":"node_modules/socket.io-parser/build/esm/is-binary.js"}],"node_modules/socket.io-parser/build/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PacketType = exports.Encoder = exports.Decoder = void 0;
exports.isPacketValid = isPacketValid;
exports.protocol = void 0;
var _componentEmitter = require("@socket.io/component-emitter");
var _binary = require("./binary.js");
var _isBinary = require("./is-binary.js");
/**
 * These strings must not be used as event names, as they have a special meaning.
 */
const RESERVED_EVENTS = ["connect",
// used on the client side
"connect_error",
// used on the client side
"disconnect",
// used on both sides
"disconnecting",
// used on the server side
"newListener",
// used by the Node.js EventEmitter
"removeListener" // used by the Node.js EventEmitter
];
/**
 * Protocol version.
 *
 * @public
 */
const protocol = exports.protocol = 5;
var PacketType;
(function (PacketType) {
  PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
  PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType[PacketType["EVENT"] = 2] = "EVENT";
  PacketType[PacketType["ACK"] = 3] = "ACK";
  PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (exports.PacketType = PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(replacer) {
    this.replacer = replacer;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if ((0, _isBinary.hasBinary)(obj)) {
        return this.encodeAsBinary({
          type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
          nsp: obj.nsp,
          data: obj.data,
          id: obj.id
        });
      }
    }
    return [this.encodeAsString(obj)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(obj) {
    // first is type
    let str = "" + obj.type;
    // attachments if we have them
    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    }
    // if we have a namespace other than `/`
    // we append it followed by a comma `,`
    if (obj.nsp && "/" !== obj.nsp) {
      str += obj.nsp + ",";
    }
    // immediately followed by the id
    if (null != obj.id) {
      str += obj.id;
    }
    // json data
    if (null != obj.data) {
      str += JSON.stringify(obj.data, this.replacer);
    }
    return str;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(obj) {
    const deconstruction = (0, _binary.deconstructPacket)(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack); // add packet info to beginning of data list
    return buffers; // write all the buffers
  }
}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
exports.Encoder = Encoder;
class Decoder extends _componentEmitter.Emitter {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(reviver) {
    super();
    this.reviver = reviver;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(obj) {
    let packet;
    if (typeof obj === "string") {
      if (this.reconstructor) {
        throw new Error("got plaintext data when reconstructing a packet");
      }
      packet = this.decodeString(obj);
      const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
      if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
        packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
        // binary packet's json
        this.reconstructor = new BinaryReconstructor(packet);
        // no attachments, labeled binary but no binary data to follow
        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        // non-binary full packet
        super.emitReserved("decoded", packet);
      }
    } else if ((0, _isBinary.isBinary)(obj) || obj.base64) {
      // raw binary data
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          // received final buffer
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(str) {
    let i = 0;
    // look up type
    const p = {
      type: Number(str.charAt(0))
    };
    if (PacketType[p.type] === undefined) {
      throw new Error("unknown packet type " + p.type);
    }
    // look up attachments if type binary
    if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
      const start = i + 1;
      while (str.charAt(++i) !== "-" && i != str.length) {}
      const buf = str.substring(start, i);
      if (buf != Number(buf) || str.charAt(i) !== "-") {
        throw new Error("Illegal attachments");
      }
      p.attachments = Number(buf);
    }
    // look up namespace (if any)
    if ("/" === str.charAt(i + 1)) {
      const start = i + 1;
      while (++i) {
        const c = str.charAt(i);
        if ("," === c) break;
        if (i === str.length) break;
      }
      p.nsp = str.substring(start, i);
    } else {
      p.nsp = "/";
    }
    // look up id
    const next = str.charAt(i + 1);
    if ("" !== next && Number(next) == next) {
      const start = i + 1;
      while (++i) {
        const c = str.charAt(i);
        if (null == c || Number(c) != c) {
          --i;
          break;
        }
        if (i === str.length) break;
      }
      p.id = Number(str.substring(start, i + 1));
    }
    // look up json data
    if (str.charAt(++i)) {
      const payload = this.tryParse(str.substr(i));
      if (Decoder.isPayloadValid(p.type, payload)) {
        p.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }
    return p;
  }
  tryParse(str) {
    try {
      return JSON.parse(str, this.reviver);
    } catch (e) {
      return false;
    }
  }
  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return isObject(payload);
      case PacketType.DISCONNECT:
        return payload === undefined;
      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || isObject(payload);
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
      this.reconstructor = null;
    }
  }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
exports.Decoder = Decoder;
class BinaryReconstructor {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) {
      // done with buffer list
      const packet = (0, _binary.reconstructPacket)(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }
}
function isNamespaceValid(nsp) {
  return typeof nsp === "string";
}
// see https://caniuse.com/mdn-javascript_builtins_number_isinteger
const isInteger = Number.isInteger || function (value) {
  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
function isAckIdValid(id) {
  return id === undefined || isInteger(id);
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function isDataValid(type, payload) {
  switch (type) {
    case PacketType.CONNECT:
      return payload === undefined || isObject(payload);
    case PacketType.DISCONNECT:
      return payload === undefined;
    case PacketType.EVENT:
      return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
    case PacketType.ACK:
      return Array.isArray(payload);
    case PacketType.CONNECT_ERROR:
      return typeof payload === "string" || isObject(payload);
    default:
      return false;
  }
}
function isPacketValid(packet) {
  return isNamespaceValid(packet.nsp) && isAckIdValid(packet.id) && isDataValid(packet.type, packet.data);
}
},{"@socket.io/component-emitter":"node_modules/@socket.io/component-emitter/lib/esm/index.js","./binary.js":"node_modules/socket.io-parser/build/esm/binary.js","./is-binary.js":"node_modules/socket.io-parser/build/esm/is-binary.js"}],"node_modules/socket.io-client/build/esm/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}
},{}],"node_modules/socket.io-client/build/esm/socket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Socket = void 0;
var _socket = require("socket.io-parser");
var _on = require("./on.js");
var _componentEmitter = require("@socket.io/component-emitter");
/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */
class Socket extends _componentEmitter.Emitter {
  /**
   * `Socket` constructor.
   */
  constructor(io, nsp, opts) {
    super();
    /**
     * Whether the socket is currently connected to the server.
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.connected); // true
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.connected); // false
     * });
     */
    this.connected = false;
    /**
     * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
     * be transmitted by the server.
     */
    this.recovered = false;
    /**
     * Buffer for packets received before the CONNECT packet
     */
    this.receiveBuffer = [];
    /**
     * Buffer for packets that will be sent once the socket is connected
     */
    this.sendBuffer = [];
    /**
     * The queue of packets to be sent with retry in case of failure.
     *
     * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
     * @private
     */
    this._queue = [];
    /**
     * A sequence to generate the ID of the {@link QueuedPacket}.
     * @private
     */
    this._queueSeq = 0;
    this.ids = 0;
    /**
     * A map containing acknowledgement handlers.
     *
     * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
     *
     * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
     * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
     * - `const value = await socket.emitWithAck("test")`
     *
     * From those that don't:
     *
     * - `socket.emit("test", (value) => { ... });`
     *
     * In the first case, the handlers will be called with an error when:
     *
     * - the timeout is reached
     * - the socket gets disconnected
     *
     * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
     * an acknowledgement from the server.
     *
     * @private
     */
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    this._opts = Object.assign({}, opts);
    if (this.io._autoConnect) this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs) return;
    const io = this.io;
    this.subs = [(0, _on.on)(io, "open", this.onopen.bind(this)), (0, _on.on)(io, "packet", this.onpacket.bind(this)), (0, _on.on)(io, "error", this.onerror.bind(this)), (0, _on.on)(io, "close", this.onclose.bind(this))];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    if (this.connected) return this;
    this.subEvents();
    if (!this.io["_reconnecting"]) this.io.open(); // ensure open
    if ("open" === this.io._readyState) this.onopen();
    return this;
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(ev, ...args) {
    var _a, _b, _c;
    if (RESERVED_EVENTS.hasOwnProperty(ev)) {
      throw new Error('"' + ev.toString() + '" is a reserved event name');
    }
    args.unshift(ev);
    if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
      this._addToQueue(args);
      return this;
    }
    const packet = {
      type: _socket.PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    // event ack callback
    if ("function" === typeof args[args.length - 1]) {
      const id = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id, ack);
      packet.id = id;
    }
    const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
    const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
    const discardPacket = this.flags.volatile && !isTransportWritable;
    if (discardPacket) {} else if (isConnected) {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  /**
   * @private
   */
  _registerAckCallback(id, ack) {
    var _a;
    const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
    if (timeout === undefined) {
      this.acks[id] = ack;
      return;
    }
    // @ts-ignore
    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id];
      for (let i = 0; i < this.sendBuffer.length; i++) {
        if (this.sendBuffer[i].id === id) {
          this.sendBuffer.splice(i, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout);
    const fn = (...args) => {
      // @ts-ignore
      this.io.clearTimeoutFn(timer);
      ack.apply(this, args);
    };
    fn.withError = true;
    this.acks[id] = fn;
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(ev, ...args) {
    return new Promise((resolve, reject) => {
      const fn = (arg1, arg2) => {
        return arg1 ? reject(arg1) : resolve(arg2);
      };
      fn.withError = true;
      args.push(fn);
      this.emit(ev, ...args);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(args) {
    let ack;
    if (typeof args[args.length - 1] === "function") {
      ack = args.pop();
    }
    const packet = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: false,
      args,
      flags: Object.assign({
        fromQueue: true
      }, this.flags)
    };
    args.push((err, ...responseArgs) => {
      if (packet !== this._queue[0]) {}
      const hasError = err !== null;
      if (hasError) {
        if (packet.tryCount > this._opts.retries) {
          this._queue.shift();
          if (ack) {
            ack(err);
          }
        }
      } else {
        this._queue.shift();
        if (ack) {
          ack(null, ...responseArgs);
        }
      }
      packet.pending = false;
      return this._drainQueue();
    });
    this._queue.push(packet);
    this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(force = false) {
    if (!this.connected || this._queue.length === 0) {
      return;
    }
    const packet = this._queue[0];
    if (packet.pending && !force) {
      return;
    }
    packet.pending = true;
    packet.tryCount++;
    this.flags = packet.flags;
    this.emit.apply(this, packet.args);
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    if (typeof this.auth == "function") {
      this.auth(data => {
        this._sendConnectPacket(data);
      });
    } else {
      this._sendConnectPacket(this.auth);
    }
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(data) {
    this.packet({
      type: _socket.PacketType.CONNECT,
      data: this._pid ? Object.assign({
        pid: this._pid,
        offset: this._lastOffset
      }, data) : data
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(reason, description) {
    this.connected = false;
    delete this.id;
    this.emitReserved("disconnect", reason, description);
    this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach(id => {
      const isBuffered = this.sendBuffer.some(packet => String(packet.id) === id);
      if (!isBuffered) {
        // note: handlers that do not accept an error as first argument are ignored here
        const ack = this.acks[id];
        delete this.acks[id];
        if (ack.withError) {
          ack.call(this, new Error("socket has been disconnected"));
        }
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace) return;
    switch (packet.type) {
      case _socket.PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          this.onconnect(packet.data.sid, packet.data.pid);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case _socket.PacketType.EVENT:
      case _socket.PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;
      case _socket.PacketType.ACK:
      case _socket.PacketType.BINARY_ACK:
        this.onack(packet);
        break;
      case _socket.PacketType.DISCONNECT:
        this.ondisconnect();
        break;
      case _socket.PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        // @ts-ignore
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(packet) {
    const args = packet.data || [];
    if (null != packet.id) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
    if (this._pid && args.length && typeof args[args.length - 1] === "string") {
      this._lastOffset = args[args.length - 1];
    }
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(id) {
    const self = this;
    let sent = false;
    return function (...args) {
      // prevent double callbacks
      if (sent) return;
      sent = true;
      self.packet({
        type: _socket.PacketType.ACK,
        id: id,
        data: args
      });
    };
  }
  /**
   * Called upon a server acknowledgement.
   *
   * @param packet
   * @private
   */
  onack(packet) {
    const ack = this.acks[packet.id];
    if (typeof ack !== "function") {
      return;
    }
    delete this.acks[packet.id];
    // @ts-ignore FIXME ack is incorrectly inferred as 'never'
    if (ack.withError) {
      packet.data.unshift(null);
    }
    // @ts-ignore
    ack.apply(this, packet.data);
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(id, pid) {
    this.id = id;
    this.recovered = pid && this._pid === pid;
    this._pid = pid; // defined only if connection state recovery is enabled
    this.connected = true;
    this.emitBuffered();
    this._drainQueue(true);
    this.emitReserved("connect");
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach(args => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach(packet => {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    });
    this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    if (this.subs) {
      // clean subscriptions to avoid reconnections
      this.subs.forEach(subDestroy => subDestroy());
      this.subs = undefined;
    }
    this.io["_destroy"](this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    if (this.connected) {
      this.packet({
        type: _socket.PacketType.DISCONNECT
      });
    }
    // remove socket from pool
    this.destroy();
    if (this.connected) {
      // fire events
      this.onclose("io client disconnect");
    }
    return this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(listener) {
    if (!this._anyOutgoingListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyOutgoingListeners;
      for (let i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
          return this;
        }
      }
    } else {
      this._anyOutgoingListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(packet) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const listeners = this._anyOutgoingListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, packet.data);
      }
    }
  }
}
exports.Socket = Socket;
},{"socket.io-parser":"node_modules/socket.io-parser/build/esm/index.js","./on.js":"node_modules/socket.io-client/build/esm/on.js","@socket.io/component-emitter":"node_modules/@socket.io/component-emitter/lib/esm/index.js"}],"node_modules/socket.io-client/build/esm/contrib/backo2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Backoff = Backoff;
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
  this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
  this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
  this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};
},{}],"node_modules/socket.io-client/build/esm/manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Manager = void 0;
var _engine = require("engine.io-client");
var _socket = require("./socket.js");
var parser = _interopRequireWildcard(require("socket.io-parser"));
var _on = require("./on.js");
var _backo = require("./contrib/backo2.js");
var _componentEmitter = require("@socket.io/component-emitter");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
class Manager extends _componentEmitter.Emitter {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = undefined;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    (0, _engine.installTimerFunctions)(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1000);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new _backo.Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 20000 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || parser;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect) this.open();
  }
  reconnection(v) {
    if (!arguments.length) return this._reconnection;
    this._reconnection = !!v;
    if (!v) {
      this.skipReconnect = true;
    }
    return this;
  }
  reconnectionAttempts(v) {
    if (v === undefined) return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  }
  reconnectionDelay(v) {
    var _a;
    if (v === undefined) return this._reconnectionDelay;
    this._reconnectionDelay = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
    return this;
  }
  randomizationFactor(v) {
    var _a;
    if (v === undefined) return this._randomizationFactor;
    this._randomizationFactor = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
    return this;
  }
  reconnectionDelayMax(v) {
    var _a;
    if (v === undefined) return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
    return this;
  }
  timeout(v) {
    if (!arguments.length) return this._timeout;
    this._timeout = v;
    return this;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    // Only try to reconnect if it's the first time we're connecting
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      // keeps reconnection from firing twice for the same reconnection loop
      this.reconnect();
    }
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(fn) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new _engine.Socket(this.uri, this.opts);
    const socket = this.engine;
    const self = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    // emit `open`
    const openSubDestroy = (0, _on.on)(socket, "open", function () {
      self.onopen();
      fn && fn();
    });
    const onError = err => {
      this.cleanup();
      this._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        // Only do this if there is no fn to handle the error
        this.maybeReconnectOnOpen();
      }
    };
    // emit `error`
    const errorSub = (0, _on.on)(socket, "error", onError);
    if (false !== this._timeout) {
      const timeout = this._timeout;
      // set timer
      const timer = this.setTimeoutFn(() => {
        openSubDestroy();
        onError(new Error("timeout"));
        socket.close();
      }, timeout);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(fn) {
    return this.open(fn);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    // clear old subs
    this.cleanup();
    // mark as open
    this._readyState = "open";
    this.emitReserved("open");
    // add new subs
    const socket = this.engine;
    this.subs.push((0, _on.on)(socket, "ping", this.onping.bind(this)), (0, _on.on)(socket, "data", this.ondata.bind(this)), (0, _on.on)(socket, "error", this.onerror.bind(this)), (0, _on.on)(socket, "close", this.onclose.bind(this)),
    // @ts-ignore
    (0, _on.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(data) {
    try {
      this.decoder.add(data);
    } catch (e) {
      this.onclose("parse error", e);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(packet) {
    // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
    (0, _engine.nextTick)(() => {
      this.emitReserved("packet", packet);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(err) {
    this.emitReserved("error", err);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(nsp, opts) {
    let socket = this.nsps[nsp];
    if (!socket) {
      socket = new _socket.Socket(this, nsp, opts);
      this.nsps[nsp] = socket;
    } else if (this._autoConnect && !socket.active) {
      socket.connect();
    }
    return socket;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(socket) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket = this.nsps[nsp];
      if (socket.active) {
        return;
      }
    }
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i = 0; i < encodedPackets.length; i++) {
      this.engine.write(encodedPackets[i], packet.options);
    }
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach(subDestroy => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called when:
   *
   * - the low-level engine is closed
   * - the parser encountered a badly formatted packet
   * - all sockets are disconnected
   *
   * @private
   */
  onclose(reason, description) {
    var _a;
    this.cleanup();
    (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason, description);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const self = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self.skipReconnect) return;
        this.emitReserved("reconnect_attempt", self.backoff.attempts);
        // check again for the case socket closed in above events
        if (self.skipReconnect) return;
        self.open(err => {
          if (err) {
            self._reconnecting = false;
            self.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
}
exports.Manager = Manager;
},{"engine.io-client":"node_modules/engine.io-client/build/esm/index.js","./socket.js":"node_modules/socket.io-client/build/esm/socket.js","socket.io-parser":"node_modules/socket.io-parser/build/esm/index.js","./on.js":"node_modules/socket.io-client/build/esm/on.js","./contrib/backo2.js":"node_modules/socket.io-client/build/esm/contrib/backo2.js","@socket.io/component-emitter":"node_modules/@socket.io/component-emitter/lib/esm/index.js"}],"node_modules/socket.io-client/build/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Fetch", {
  enumerable: true,
  get: function () {
    return _engine.Fetch;
  }
});
Object.defineProperty(exports, "Manager", {
  enumerable: true,
  get: function () {
    return _manager.Manager;
  }
});
Object.defineProperty(exports, "NodeWebSocket", {
  enumerable: true,
  get: function () {
    return _engine.NodeWebSocket;
  }
});
Object.defineProperty(exports, "NodeXHR", {
  enumerable: true,
  get: function () {
    return _engine.NodeXHR;
  }
});
Object.defineProperty(exports, "Socket", {
  enumerable: true,
  get: function () {
    return _socket.Socket;
  }
});
Object.defineProperty(exports, "WebSocket", {
  enumerable: true,
  get: function () {
    return _engine.WebSocket;
  }
});
Object.defineProperty(exports, "WebTransport", {
  enumerable: true,
  get: function () {
    return _engine.WebTransport;
  }
});
Object.defineProperty(exports, "XHR", {
  enumerable: true,
  get: function () {
    return _engine.XHR;
  }
});
exports.default = exports.connect = exports.io = lookup;
Object.defineProperty(exports, "protocol", {
  enumerable: true,
  get: function () {
    return _socket2.protocol;
  }
});
var _url = require("./url.js");
var _manager = require("./manager.js");
var _socket = require("./socket.js");
var _socket2 = require("socket.io-parser");
var _engine = require("engine.io-client");
/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};
  const parsed = (0, _url.url)(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id] && path in cache[id]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
  let io;
  if (newConnection) {
    io = new _manager.Manager(source, opts);
  } else {
    if (!cache[id]) {
      cache[id] = new _manager.Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
  Manager: _manager.Manager,
  Socket: _socket.Socket,
  io: lookup,
  connect: lookup
});
/**
 * Protocol version.
 *
 * @public
 */

/**
 * Expose constructors for standalone build.
 *
 * @public
 */
},{"./url.js":"node_modules/socket.io-client/build/esm/url.js","./manager.js":"node_modules/socket.io-client/build/esm/manager.js","./socket.js":"node_modules/socket.io-client/build/esm/socket.js","socket.io-parser":"node_modules/socket.io-parser/build/esm/index.js","engine.io-client":"node_modules/engine.io-client/build/esm/index.js"}],"node_modules/boardgame.io/dist/esm/socketio-a82b84e4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.L = Local;
exports.S = SocketIO;
var _transportCe07b = require("./transport-ce07b771.js");
var _util991e76bb = require("./util-991e76bb.js");
var _master17425f = require("./master-17425f07.js");
var _filterPlayerView43ed49b = require("./filter-player-view-43ed49b0.js");
var _socket = _interopRequireDefault(require("socket.io-client"));
var _excluded = ["playerID"],
  _excluded2 = ["master"],
  _excluded3 = ["socket", "socketOpts", "server"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * InMemory data storage.
 */
var InMemory = /*#__PURE__*/function (_Sync) {
  /**
   * Creates a new InMemory storage.
   */
  function InMemory() {
    var _this;
    _classCallCheck(this, InMemory);
    _this = _callSuper(this, InMemory);
    _this.state = new Map();
    _this.initial = new Map();
    _this.metadata = new Map();
    _this.log = new Map();
    return _this;
  }
  /**
   * Create a new match.
   *
   * @override
   */
  _inherits(InMemory, _Sync);
  return _createClass(InMemory, [{
    key: "createMatch",
    value: function createMatch(matchID, opts) {
      this.initial.set(matchID, opts.initialState);
      this.setState(matchID, opts.initialState);
      this.setMetadata(matchID, opts.metadata);
    }
    /**
     * Write the match metadata to the in-memory object.
     */
  }, {
    key: "setMetadata",
    value: function setMetadata(matchID, metadata) {
      this.metadata.set(matchID, metadata);
    }
    /**
     * Write the match state to the in-memory object.
     */
  }, {
    key: "setState",
    value: function setState(matchID, state, deltalog) {
      if (deltalog && deltalog.length > 0) {
        var log = this.log.get(matchID) || [];
        this.log.set(matchID, [].concat(_toConsumableArray(log), _toConsumableArray(deltalog)));
      }
      this.state.set(matchID, state);
    }
    /**
     * Fetches state for a particular matchID.
     */
  }, {
    key: "fetch",
    value: function fetch(matchID, opts) {
      var result = {};
      if (opts.state) {
        result.state = this.state.get(matchID);
      }
      if (opts.metadata) {
        result.metadata = this.metadata.get(matchID);
      }
      if (opts.log) {
        result.log = this.log.get(matchID) || [];
      }
      if (opts.initialState) {
        result.initialState = this.initial.get(matchID);
      }
      return result;
    }
    /**
     * Remove the match state from the in-memory object.
     */
  }, {
    key: "wipe",
    value: function wipe(matchID) {
      this.state.delete(matchID);
      this.metadata.delete(matchID);
    }
    /**
     * Return all keys.
     *
     * @override
     */
  }, {
    key: "listMatches",
    value: function listMatches(opts) {
      return _toConsumableArray(this.metadata.entries()).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          metadata = _ref2[1];
        if (!opts) {
          return true;
        }
        if (opts.gameName !== undefined && metadata.gameName !== opts.gameName) {
          return false;
        }
        if (opts.where !== undefined) {
          if (opts.where.isGameover !== undefined) {
            var isGameover = metadata.gameover !== undefined;
            if (isGameover !== opts.where.isGameover) {
              return false;
            }
          }
          if (opts.where.updatedBefore !== undefined && metadata.updatedAt >= opts.where.updatedBefore) {
            return false;
          }
          if (opts.where.updatedAfter !== undefined && metadata.updatedAt <= opts.where.updatedAfter) {
            return false;
          }
        }
        return true;
      }).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
          key = _ref4[0];
        return key;
      });
    }
  }]);
}(_util991e76bb.S);
var WithLocalStorageMap = /*#__PURE__*/function (_Map) {
  function WithLocalStorageMap(key) {
    var _this2;
    _classCallCheck(this, WithLocalStorageMap);
    _this2 = _callSuper(this, WithLocalStorageMap);
    _this2.key = key;
    var cache = JSON.parse(localStorage.getItem(_this2.key)) || [];
    cache.forEach(function (entry) {
      var _this3;
      return (_this3 = _this2).set.apply(_this3, _toConsumableArray(entry));
    });
    return _this2;
  }
  _inherits(WithLocalStorageMap, _Map);
  return _createClass(WithLocalStorageMap, [{
    key: "sync",
    value: function sync() {
      var entries = _toConsumableArray(this.entries());
      localStorage.setItem(this.key, JSON.stringify(entries));
    }
  }, {
    key: "set",
    value: function set(key, value) {
      _superPropGet(WithLocalStorageMap, "set", this, 3)([key, value]);
      this.sync();
      return this;
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      var result = _superPropGet(WithLocalStorageMap, "delete", this, 3)([key]);
      this.sync();
      return result;
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(Map));
/**
 * locaStorage data storage.
 */
var LocalStorage = /*#__PURE__*/function (_InMemory) {
  function LocalStorage() {
    var _this4;
    var storagePrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bgio';
    _classCallCheck(this, LocalStorage);
    _this4 = _callSuper(this, LocalStorage);
    var StorageMap = function StorageMap(stateKey) {
      return new WithLocalStorageMap("".concat(storagePrefix, "_").concat(stateKey));
    };
    _this4.state = StorageMap('state');
    _this4.initial = StorageMap('initial');
    _this4.metadata = StorageMap('metadata');
    _this4.log = StorageMap('log');
    return _this4;
  }
  _inherits(LocalStorage, _InMemory);
  return _createClass(LocalStorage);
}(InMemory);
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Returns null if it is not a bot's turn.
 * Otherwise, returns a playerID of a bot that may play now.
 */
function GetBotPlayer(state, bots) {
  if (state.ctx.gameover !== undefined) {
    return null;
  }
  if (state.ctx.activePlayers) {
    for (var _i = 0, _Object$keys = Object.keys(bots); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      if (key in state.ctx.activePlayers) {
        return key;
      }
    }
  } else if (state.ctx.currentPlayer in bots) {
    return state.ctx.currentPlayer;
  }
  return null;
}
/**
 * Creates a local version of the master that the client
 * can interact with.
 */
var LocalMaster = /*#__PURE__*/function (_Master) {
  function LocalMaster(_ref5) {
    var _this5;
    var game = _ref5.game,
      bots = _ref5.bots,
      storageKey = _ref5.storageKey,
      persist = _ref5.persist;
    _classCallCheck(this, LocalMaster);
    var clientCallbacks = {};
    var initializedBots = {};
    if (game && game.ai && bots) {
      for (var playerID in bots) {
        var bot = bots[playerID];
        initializedBots[playerID] = new bot({
          game: game,
          enumerate: game.ai.enumerate,
          seed: game.seed
        });
      }
    }
    var send = function send(_ref6) {
      var playerID = _ref6.playerID,
        data = _objectWithoutProperties(_ref6, _excluded);
      var callback = clientCallbacks[playerID];
      if (callback !== undefined) {
        callback(filterPlayerView(playerID, data));
      }
    };
    var filterPlayerView = (0, _filterPlayerView43ed49b.g)(game);
    var transportAPI = {
      send: send,
      sendAll: function sendAll(payload) {
        for (var _playerID in clientCallbacks) {
          send(_objectSpread({
            playerID: _playerID
          }, payload));
        }
      }
    };
    var storage = persist ? new LocalStorage(storageKey) : new InMemory();
    _this5 = _callSuper(this, LocalMaster, [game, storage, transportAPI]);
    _this5.connect = function (playerID, callback) {
      clientCallbacks[playerID] = callback;
    };
    _this5.subscribe(function (_ref7) {
      var state = _ref7.state,
        matchID = _ref7.matchID;
      if (!bots) {
        return;
      }
      var botPlayer = GetBotPlayer(state, initializedBots);
      if (botPlayer !== null) {
        setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var botAction;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return initializedBots[botPlayer].play(state, botPlayer);
              case 1:
                botAction = _context.v;
                _context.n = 2;
                return _this5.onUpdate(botAction.action, state._stateID, matchID, botAction.action.payload.playerID);
              case 2:
                return _context.a(2);
            }
          }, _callee);
        })), 100);
      }
    });
    return _this5;
  }
  _inherits(LocalMaster, _Master);
  return _createClass(LocalMaster);
}(_master17425f.M);
/**
 * Local
 *
 * Transport interface that embeds a GameMaster within it
 * that you can connect multiple clients to.
 */
var LocalTransport = /*#__PURE__*/function (_Transport) {
  /**
   * Creates a new Mutiplayer instance.
   * @param {string} matchID - The game ID to connect to.
   * @param {string} playerID - The player ID associated with this client.
   * @param {string} gameName - The game type (the `name` field in `Game`).
   * @param {string} numPlayers - The number of players.
   */
  function LocalTransport(_ref9) {
    var _this6;
    var master = _ref9.master,
      opts = _objectWithoutProperties(_ref9, _excluded2);
    _classCallCheck(this, LocalTransport);
    _this6 = _callSuper(this, LocalTransport, [opts]);
    _this6.master = master;
    return _this6;
  }
  _inherits(LocalTransport, _Transport);
  return _createClass(LocalTransport, [{
    key: "sendChatMessage",
    value: function sendChatMessage(matchID, chatMessage) {
      var _this$master;
      var args = [matchID, chatMessage, this.credentials];
      (_this$master = this.master).onChatMessage.apply(_this$master, args);
    }
  }, {
    key: "sendAction",
    value: function sendAction(state, action) {
      this.master.onUpdate(action, state._stateID, this.matchID, this.playerID);
    }
  }, {
    key: "requestSync",
    value: function requestSync() {
      this.master.onSync(this.matchID, this.playerID, this.credentials, this.numPlayers);
    }
  }, {
    key: "connect",
    value: function connect() {
      var _this7 = this;
      this.setConnectionStatus(true);
      this.master.connect(this.playerID, function (data) {
        return _this7.notifyClient(data);
      });
      this.requestSync();
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.setConnectionStatus(false);
    }
  }, {
    key: "updateMatchID",
    value: function updateMatchID(id) {
      this.matchID = id;
      this.connect();
    }
  }, {
    key: "updatePlayerID",
    value: function updatePlayerID(id) {
      this.playerID = id;
      this.connect();
    }
  }, {
    key: "updateCredentials",
    value: function updateCredentials(credentials) {
      this.credentials = credentials;
      this.connect();
    }
  }]);
}(_transportCe07b.T);
/**
 * Global map storing local master instances.
 */
var localMasters = new Map();
/**
 * Create a local transport.
 */
function Local() {
  var _ref0 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    bots = _ref0.bots,
    persist = _ref0.persist,
    storageKey = _ref0.storageKey;
  return function (transportOpts) {
    var gameKey = transportOpts.gameKey,
      game = transportOpts.game;
    var master;
    var instance = localMasters.get(gameKey);
    if (instance && instance.bots === bots && instance.storageKey === storageKey && instance.persist === persist) {
      master = instance.master;
    }
    if (!master) {
      master = new LocalMaster({
        game: game,
        bots: bots,
        persist: persist,
        storageKey: storageKey
      });
      localMasters.set(gameKey, {
        master: master,
        bots: bots,
        persist: persist,
        storageKey: storageKey
      });
    }
    return new LocalTransport(_objectSpread({
      master: master
    }, transportOpts));
  };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var io = _socket.default;
/**
 * SocketIO
 *
 * Transport interface that interacts with the Master via socket.io.
 */
var SocketIOTransport = /*#__PURE__*/function (_Transport2) {
  /**
   * Creates a new Multiplayer instance.
   * @param {object} socket - Override for unit tests.
   * @param {object} socketOpts - Options to pass to socket.io.
   * @param {object} store - Redux store
   * @param {string} matchID - The game ID to connect to.
   * @param {string} playerID - The player ID associated with this client.
   * @param {string} credentials - Authentication credentials
   * @param {string} gameName - The game type (the `name` field in `Game`).
   * @param {string} numPlayers - The number of players.
   * @param {string} server - The game server in the form of 'hostname:port'. Defaults to the server serving the client if not provided.
   */
  function SocketIOTransport(_ref1) {
    var _this8;
    var socket = _ref1.socket,
      socketOpts = _ref1.socketOpts,
      server = _ref1.server,
      opts = _objectWithoutProperties(_ref1, _excluded3);
    _classCallCheck(this, SocketIOTransport);
    _this8 = _callSuper(this, SocketIOTransport, [opts]);
    _this8.server = server;
    _this8.socket = socket;
    _this8.socketOpts = socketOpts;
    return _this8;
  }
  _inherits(SocketIOTransport, _Transport2);
  return _createClass(SocketIOTransport, [{
    key: "sendAction",
    value: function sendAction(state, action) {
      var _this$socket;
      var args = [action, state._stateID, this.matchID, this.playerID];
      (_this$socket = this.socket).emit.apply(_this$socket, ['update'].concat(args));
    }
  }, {
    key: "sendChatMessage",
    value: function sendChatMessage(matchID, chatMessage) {
      var _this$socket2;
      var args = [matchID, chatMessage, this.credentials];
      (_this$socket2 = this.socket).emit.apply(_this$socket2, ['chat'].concat(args));
    }
  }, {
    key: "connect",
    value: function connect() {
      var _this9 = this;
      if (!this.socket) {
        if (this.server) {
          var server = this.server;
          if (server.search(/^https?:\/\//) == -1) {
            server = 'http://' + this.server;
          }
          if (server.slice(-1) != '/') {
            // add trailing slash if not already present
            server = server + '/';
          }
          this.socket = io(server + this.gameName, this.socketOpts);
        } else {
          this.socket = io('/' + this.gameName, this.socketOpts);
        }
      }
      // Called when another player makes a move and the
      // master broadcasts the update as a patch to other clients (including
      // this one).
      this.socket.on('patch', function (matchID, prevStateID, stateID, patch, deltalog) {
        _this9.notifyClient({
          type: 'patch',
          args: [matchID, prevStateID, stateID, patch, deltalog]
        });
      });
      // Called when another player makes a move and the
      // master broadcasts the update to other clients (including
      // this one).
      this.socket.on('update', function (matchID, state, deltalog) {
        _this9.notifyClient({
          type: 'update',
          args: [matchID, state, deltalog]
        });
      });
      // Called when the client first connects to the master
      // and requests the current game state.
      this.socket.on('sync', function (matchID, syncInfo) {
        _this9.notifyClient({
          type: 'sync',
          args: [matchID, syncInfo]
        });
      });
      // Called when new player joins the match or changes
      // it's connection status
      this.socket.on('matchData', function (matchID, matchData) {
        _this9.notifyClient({
          type: 'matchData',
          args: [matchID, matchData]
        });
      });
      this.socket.on('chat', function (matchID, chatMessage) {
        _this9.notifyClient({
          type: 'chat',
          args: [matchID, chatMessage]
        });
      });
      // Keep track of connection status.
      this.socket.on('connect', function () {
        // Initial sync to get game state.
        _this9.requestSync();
        _this9.setConnectionStatus(true);
      });
      this.socket.on('disconnect', function () {
        _this9.setConnectionStatus(false);
      });
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.socket.close();
      this.socket = null;
      this.setConnectionStatus(false);
    }
  }, {
    key: "requestSync",
    value: function requestSync() {
      if (this.socket) {
        var _this$socket3;
        var args = [this.matchID, this.playerID, this.credentials, this.numPlayers];
        (_this$socket3 = this.socket).emit.apply(_this$socket3, ['sync'].concat(args));
      }
    }
  }, {
    key: "updateMatchID",
    value: function updateMatchID(id) {
      this.matchID = id;
      this.requestSync();
    }
  }, {
    key: "updatePlayerID",
    value: function updatePlayerID(id) {
      this.playerID = id;
      this.requestSync();
    }
  }, {
    key: "updateCredentials",
    value: function updateCredentials(credentials) {
      this.credentials = credentials;
      this.requestSync();
    }
  }]);
}(_transportCe07b.T);
function SocketIO() {
  var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    server = _ref10.server,
    socketOpts = _ref10.socketOpts;
  return function (transportOpts) {
    return new SocketIOTransport(_objectSpread({
      server: server,
      socketOpts: socketOpts
    }, transportOpts));
  };
}
},{"./transport-ce07b771.js":"node_modules/boardgame.io/dist/esm/transport-ce07b771.js","./util-991e76bb.js":"node_modules/boardgame.io/dist/esm/util-991e76bb.js","./master-17425f07.js":"node_modules/boardgame.io/dist/esm/master-17425f07.js","./filter-player-view-43ed49b0.js":"node_modules/boardgame.io/dist/esm/filter-player-view-43ed49b0.js","socket.io-client":"node_modules/socket.io-client/build/esm/index.js"}],"node_modules/boardgame.io/dist/esm/multiplayer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Local", {
  enumerable: true,
  get: function () {
    return _socketioA82b84e.L;
  }
});
Object.defineProperty(exports, "SocketIO", {
  enumerable: true,
  get: function () {
    return _socketioA82b84e.S;
  }
});
require("redux");
require("./turn-order-8cc4909b.js");
require("immer");
require("./plugin-random-087f861e.js");
require("lodash.isplainobject");
require("./reducer-24ea3e4c.js");
require("rfc6902");
require("./initialize-7316768f.js");
require("./transport-ce07b771.js");
require("./util-991e76bb.js");
var _socketioA82b84e = require("./socketio-a82b84e4.js");
require("./master-17425f07.js");
require("./filter-player-view-43ed49b0.js");
require("socket.io-client");
},{"redux":"node_modules/redux/es/redux.js","./turn-order-8cc4909b.js":"node_modules/boardgame.io/dist/esm/turn-order-8cc4909b.js","immer":"node_modules/immer/dist/immer.esm.js","./plugin-random-087f861e.js":"node_modules/boardgame.io/dist/esm/plugin-random-087f861e.js","lodash.isplainobject":"node_modules/lodash.isplainobject/index.js","./reducer-24ea3e4c.js":"node_modules/boardgame.io/dist/esm/reducer-24ea3e4c.js","rfc6902":"node_modules/rfc6902/index.js","./initialize-7316768f.js":"node_modules/boardgame.io/dist/esm/initialize-7316768f.js","./transport-ce07b771.js":"node_modules/boardgame.io/dist/esm/transport-ce07b771.js","./util-991e76bb.js":"node_modules/boardgame.io/dist/esm/util-991e76bb.js","./socketio-a82b84e4.js":"node_modules/boardgame.io/dist/esm/socketio-a82b84e4.js","./master-17425f07.js":"node_modules/boardgame.io/dist/esm/master-17425f07.js","./filter-player-view-43ed49b0.js":"node_modules/boardgame.io/dist/esm/filter-player-view-43ed49b0.js","socket.io-client":"node_modules/socket.io-client/build/esm/index.js"}],"src/App.js":[function(require,module,exports) {
"use strict";

var _client = require("boardgame.io/client");
var _Game = require("./Game");
var _multiplayer = require("boardgame.io/multiplayer");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TicTacToeClient = /*#__PURE__*/function () {
  function TicTacToeClient(rootElement) {
    var _this = this;
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      playerID = _ref.playerID;
    _classCallCheck(this, TicTacToeClient);
    this.client = (0, _client.Client)({
      game: _Game.TicTacToe,
      multiplayer: (0, _multiplayer.SocketIO)({
        server: 'localhost:8000'
      }),
      playerID: playerID
    });
    this.client.start();
    this.rootElement = rootElement;
    this.createBoard();
    this.attachListeners();
    this.client.subscribe(function (state) {
      return _this.update(state);
    });
  }
  return _createClass(TicTacToeClient, [{
    key: "createBoard",
    value: function createBoard() {
      // Create cells in rows for the Tic-Tac-Toe board.
      var rows = [];
      for (var i = 0; i < 3; i++) {
        var cells = [];
        for (var j = 0; j < 3; j++) {
          var id = 3 * i + j;
          cells.push("<td class=\"cell\" data-id=\"".concat(id, "\"></td>"));
        }
        rows.push("<tr>".concat(cells.join(''), "</tr>"));
      }

      // Add the HTML to our app <div>.
      // We’ll use the empty <p> to display the game winner later.
      this.rootElement.innerHTML = "\n      <table>".concat(rows.join(''), "</table>\n      <p class=\"winner\"></p>\n    ");
    }
  }, {
    key: "attachListeners",
    value: function attachListeners() {
      var _this2 = this;
      // This event handler will read the cell id from a cell’s
      // `data-id` attribute and make the `clickCell` move.
      var handleCellClick = function handleCellClick(event) {
        var id = parseInt(event.target.dataset.id);
        _this2.client.moves.clickCell(id);
      };
      // Attach the event listener to each of the board cells.
      var cells = this.rootElement.querySelectorAll('.cell');
      cells.forEach(function (cell) {
        cell.onclick = handleCellClick;
      });
    }
  }, {
    key: "update",
    value: function update(state) {
      // If the state is null, return.
      if (state === null) return;
      // Get all the board cells.
      var cells = this.rootElement.querySelectorAll('.cell');
      // Update cells to display the values in game state.
      cells.forEach(function (cell) {
        var cellId = parseInt(cell.dataset.id);
        var cellValue = state.G.cells[cellId];
        cell.textContent = cellValue !== null ? cellValue : '';
      });
      // Get the gameover message element.
      var messageEl = this.rootElement.querySelector('.winner');
      // Update the element to show a winner if any.
      if (state.ctx.gameover) {
        messageEl.textContent = state.ctx.gameover.winner !== undefined ? 'Winner: ' + state.ctx.gameover.winner : 'Draw!';
      } else {
        messageEl.textContent = '';
      }
    }
  }]);
}();
var appElement = document.getElementById('app');
var app = new TicTacToeClient(appElement);
},{"boardgame.io/client":"node_modules/boardgame.io/dist/esm/client.js","./Game":"src/Game.js","boardgame.io/multiplayer":"node_modules/boardgame.io/dist/esm/multiplayer.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54088" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/App.js"], null)
//# sourceMappingURL=/App.f684dadd.js.map