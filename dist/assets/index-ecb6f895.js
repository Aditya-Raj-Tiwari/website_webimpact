;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i)
  new MutationObserver((i) => {
    for (const a of i)
      if (a.type === 'childList')
        for (const o of a.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && r(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(i) {
    const a = {}
    return (
      i.integrity && (a.integrity = i.integrity),
      i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (a.credentials = 'include')
        : i.crossOrigin === 'anonymous'
        ? (a.credentials = 'omit')
        : (a.credentials = 'same-origin'),
      a
    )
  }
  function r(i) {
    if (i.ep) return
    i.ep = !0
    const a = n(i)
    fetch(i.href, a)
  }
})()
function Di(e, t) {
  const n = Object.create(null),
    r = e.split(',')
  for (let i = 0; i < r.length; i++) n[r[i]] = !0
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i]
}
function Hi(e) {
  if (D(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        i = ve(r) ? Ll(r) : Hi(r)
      if (i) for (const a in i) t[a] = i[a]
    }
    return t
  } else {
    if (ve(e)) return e
    if (fe(e)) return e
  }
}
const Nl = /;(?![^(]*\))/g,
  Fl = /:([^]+)/,
  zl = /\/\*.*?\*\//gs
function Ll(e) {
  const t = {}
  return (
    e
      .replace(zl, '')
      .split(Nl)
      .forEach((n) => {
        if (n) {
          const r = n.split(Fl)
          r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
      }),
    t
  )
}
function ge(e) {
  let t = ''
  if (ve(e)) t = e
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const r = ge(e[n])
      r && (t += r + ' ')
    }
  else if (fe(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const jl = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Ul = Di(jl)
function Jo(e) {
  return !!e || e === ''
}
const ae = {},
  Jt = [],
  De = () => {},
  Bl = () => !1,
  Kl = /^on[^a-z]/,
  Ir = (e) => Kl.test(e),
  Wi = (e) => e.startsWith('onUpdate:'),
  xe = Object.assign,
  Qi = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  Dl = Object.prototype.hasOwnProperty,
  V = (e, t) => Dl.call(e, t),
  D = Array.isArray,
  Cn = (e) => Rr(e) === '[object Map]',
  Hl = (e) => Rr(e) === '[object Set]',
  W = (e) => typeof e == 'function',
  ve = (e) => typeof e == 'string',
  Yi = (e) => typeof e == 'symbol',
  fe = (e) => e !== null && typeof e == 'object',
  Xo = (e) => fe(e) && W(e.then) && W(e.catch),
  Wl = Object.prototype.toString,
  Rr = (e) => Wl.call(e),
  Ql = (e) => Rr(e).slice(8, -1),
  Yl = (e) => Rr(e) === '[object Object]',
  Gi = (e) => ve(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  dr = Di(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  Tr = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  Gl = /-(\w)/g,
  en = Tr((e) => e.replace(Gl, (t, n) => (n ? n.toUpperCase() : ''))),
  Vl = /\B([A-Z])/g,
  un = Tr((e) => e.replace(Vl, '-$1').toLowerCase()),
  qo = Tr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Jr = Tr((e) => (e ? `on${qo(e)}` : '')),
  Nn = (e, t) => !Object.is(e, t),
  Xr = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  yr = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  Jl = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let _a
const Xl = () =>
  _a ||
  (_a =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {})
let Le
class Zo {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Le),
      !t && Le && (this.index = (Le.scopes || (Le.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = Le
      try {
        return (Le = this), t()
      } finally {
        Le = n
      }
    }
  }
  on() {
    Le = this
  }
  off() {
    Le = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, r
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop()
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]()
      if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0)
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop()
        i && i !== this && ((this.parent.scopes[this.index] = i), (i.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function ql(e) {
  return new Zo(e)
}
function Zl(e, t = Le) {
  t && t.active && t.effects.push(e)
}
function $l() {
  return Le
}
const Vi = (e) => {
    const t = new Set(e)
    return (t.w = 0), (t.n = 0), t
  },
  $o = (e) => (e.w & bt) > 0,
  es = (e) => (e.n & bt) > 0,
  ec = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= bt
  },
  tc = (e) => {
    const { deps: t } = e
    if (t.length) {
      let n = 0
      for (let r = 0; r < t.length; r++) {
        const i = t[r]
        $o(i) && !es(i) ? i.delete(e) : (t[n++] = i), (i.w &= ~bt), (i.n &= ~bt)
      }
      t.length = n
    }
  },
  ui = new WeakMap()
let An = 0,
  bt = 1
const di = 30
let je
const Rt = Symbol(''),
  mi = Symbol('')
class Ji {
  constructor(t, n = null, r) {
    ;(this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Zl(this, r)
  }
  run() {
    if (!this.active) return this.fn()
    let t = je,
      n = gt
    for (; t; ) {
      if (t === this) return
      t = t.parent
    }
    try {
      return (
        (this.parent = je),
        (je = this),
        (gt = !0),
        (bt = 1 << ++An),
        An <= di ? ec(this) : Ia(this),
        this.fn()
      )
    } finally {
      An <= di && tc(this),
        (bt = 1 << --An),
        (je = this.parent),
        (gt = n),
        (this.parent = void 0),
        this.deferStop && this.stop()
    }
  }
  stop() {
    je === this
      ? (this.deferStop = !0)
      : this.active && (Ia(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function Ia(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let gt = !0
const ts = []
function dn() {
  ts.push(gt), (gt = !1)
}
function mn() {
  const e = ts.pop()
  gt = e === void 0 ? !0 : e
}
function Se(e, t, n) {
  if (gt && je) {
    let r = ui.get(e)
    r || ui.set(e, (r = new Map()))
    let i = r.get(n)
    i || r.set(n, (i = Vi())), ns(i)
  }
}
function ns(e, t) {
  let n = !1
  An <= di ? es(e) || ((e.n |= bt), (n = !$o(e))) : (n = !e.has(je)),
    n && (e.add(je), je.deps.push(e))
}
function it(e, t, n, r, i, a) {
  const o = ui.get(e)
  if (!o) return
  let s = []
  if (t === 'clear') s = [...o.values()]
  else if (n === 'length' && D(e)) {
    const l = Number(r)
    o.forEach((f, c) => {
      ;(c === 'length' || c >= l) && s.push(f)
    })
  } else
    switch ((n !== void 0 && s.push(o.get(n)), t)) {
      case 'add':
        D(e) ? Gi(n) && s.push(o.get('length')) : (s.push(o.get(Rt)), Cn(e) && s.push(o.get(mi)))
        break
      case 'delete':
        D(e) || (s.push(o.get(Rt)), Cn(e) && s.push(o.get(mi)))
        break
      case 'set':
        Cn(e) && s.push(o.get(Rt))
        break
    }
  if (s.length === 1) s[0] && hi(s[0])
  else {
    const l = []
    for (const f of s) f && l.push(...f)
    hi(Vi(l))
  }
}
function hi(e, t) {
  const n = D(e) ? e : [...e]
  for (const r of n) r.computed && Ra(r)
  for (const r of n) r.computed || Ra(r)
}
function Ra(e, t) {
  ;(e !== je || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const nc = Di('__proto__,__v_isRef,__isVue'),
  rs = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Yi)
  ),
  rc = Xi(),
  ic = Xi(!1, !0),
  ac = Xi(!0),
  Ta = oc()
function oc() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const r = J(this)
        for (let a = 0, o = this.length; a < o; a++) Se(r, 'get', a + '')
        const i = r[t](...n)
        return i === -1 || i === !1 ? r[t](...n.map(J)) : i
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        dn()
        const r = J(this)[t].apply(this, n)
        return mn(), r
      }
    }),
    e
  )
}
function sc(e) {
  const t = J(this)
  return Se(t, 'has', e), t.hasOwnProperty(e)
}
function Xi(e = !1, t = !1) {
  return function (r, i, a) {
    if (i === '__v_isReactive') return !e
    if (i === '__v_isReadonly') return e
    if (i === '__v_isShallow') return t
    if (i === '__v_raw' && a === (e ? (t ? Ec : ls) : t ? ss : os).get(r)) return r
    const o = D(r)
    if (!e) {
      if (o && V(Ta, i)) return Reflect.get(Ta, i, a)
      if (i === 'hasOwnProperty') return sc
    }
    const s = Reflect.get(r, i, a)
    return (Yi(i) ? rs.has(i) : nc(i)) || (e || Se(r, 'get', i), t)
      ? s
      : ye(s)
      ? o && Gi(i)
        ? s
        : s.value
      : fe(s)
      ? e
        ? cs(s)
        : Yn(s)
      : s
  }
}
const lc = is(),
  cc = is(!0)
function is(e = !1) {
  return function (n, r, i, a) {
    let o = n[r]
    if (tn(o) && ye(o) && !ye(i)) return !1
    if (!e && (!Ar(i) && !tn(i) && ((o = J(o)), (i = J(i))), !D(n) && ye(o) && !ye(i)))
      return (o.value = i), !0
    const s = D(n) && Gi(r) ? Number(r) < n.length : V(n, r),
      l = Reflect.set(n, r, i, a)
    return n === J(a) && (s ? Nn(i, o) && it(n, 'set', r, i) : it(n, 'add', r, i)), l
  }
}
function fc(e, t) {
  const n = V(e, t)
  e[t]
  const r = Reflect.deleteProperty(e, t)
  return r && n && it(e, 'delete', t, void 0), r
}
function uc(e, t) {
  const n = Reflect.has(e, t)
  return (!Yi(t) || !rs.has(t)) && Se(e, 'has', t), n
}
function dc(e) {
  return Se(e, 'iterate', D(e) ? 'length' : Rt), Reflect.ownKeys(e)
}
const as = { get: rc, set: lc, deleteProperty: fc, has: uc, ownKeys: dc },
  mc = {
    get: ac,
    set(e, t) {
      return !0
    },
    deleteProperty(e, t) {
      return !0
    }
  },
  hc = xe({}, as, { get: ic, set: cc }),
  qi = (e) => e,
  Mr = (e) => Reflect.getPrototypeOf(e)
function qn(e, t, n = !1, r = !1) {
  e = e.__v_raw
  const i = J(e),
    a = J(t)
  n || (t !== a && Se(i, 'get', t), Se(i, 'get', a))
  const { has: o } = Mr(i),
    s = r ? qi : n ? ta : Fn
  if (o.call(i, t)) return s(e.get(t))
  if (o.call(i, a)) return s(e.get(a))
  e !== i && e.get(t)
}
function Zn(e, t = !1) {
  const n = this.__v_raw,
    r = J(n),
    i = J(e)
  return (
    t || (e !== i && Se(r, 'has', e), Se(r, 'has', i)), e === i ? n.has(e) : n.has(e) || n.has(i)
  )
}
function $n(e, t = !1) {
  return (e = e.__v_raw), !t && Se(J(e), 'iterate', Rt), Reflect.get(e, 'size', e)
}
function Ma(e) {
  e = J(e)
  const t = J(this)
  return Mr(t).has.call(t, e) || (t.add(e), it(t, 'add', e, e)), this
}
function Na(e, t) {
  t = J(t)
  const n = J(this),
    { has: r, get: i } = Mr(n)
  let a = r.call(n, e)
  a || ((e = J(e)), (a = r.call(n, e)))
  const o = i.call(n, e)
  return n.set(e, t), a ? Nn(t, o) && it(n, 'set', e, t) : it(n, 'add', e, t), this
}
function Fa(e) {
  const t = J(this),
    { has: n, get: r } = Mr(t)
  let i = n.call(t, e)
  i || ((e = J(e)), (i = n.call(t, e))), r && r.call(t, e)
  const a = t.delete(e)
  return i && it(t, 'delete', e, void 0), a
}
function za() {
  const e = J(this),
    t = e.size !== 0,
    n = e.clear()
  return t && it(e, 'clear', void 0, void 0), n
}
function er(e, t) {
  return function (r, i) {
    const a = this,
      o = a.__v_raw,
      s = J(o),
      l = t ? qi : e ? ta : Fn
    return !e && Se(s, 'iterate', Rt), o.forEach((f, c) => r.call(i, l(f), l(c), a))
  }
}
function tr(e, t, n) {
  return function (...r) {
    const i = this.__v_raw,
      a = J(i),
      o = Cn(a),
      s = e === 'entries' || (e === Symbol.iterator && o),
      l = e === 'keys' && o,
      f = i[e](...r),
      c = n ? qi : t ? ta : Fn
    return (
      !t && Se(a, 'iterate', l ? mi : Rt),
      {
        next() {
          const { value: d, done: h } = f.next()
          return h ? { value: d, done: h } : { value: s ? [c(d[0]), c(d[1])] : c(d), done: h }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function ut(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this
  }
}
function pc() {
  const e = {
      get(a) {
        return qn(this, a)
      },
      get size() {
        return $n(this)
      },
      has: Zn,
      add: Ma,
      set: Na,
      delete: Fa,
      clear: za,
      forEach: er(!1, !1)
    },
    t = {
      get(a) {
        return qn(this, a, !1, !0)
      },
      get size() {
        return $n(this)
      },
      has: Zn,
      add: Ma,
      set: Na,
      delete: Fa,
      clear: za,
      forEach: er(!1, !0)
    },
    n = {
      get(a) {
        return qn(this, a, !0)
      },
      get size() {
        return $n(this, !0)
      },
      has(a) {
        return Zn.call(this, a, !0)
      },
      add: ut('add'),
      set: ut('set'),
      delete: ut('delete'),
      clear: ut('clear'),
      forEach: er(!0, !1)
    },
    r = {
      get(a) {
        return qn(this, a, !0, !0)
      },
      get size() {
        return $n(this, !0)
      },
      has(a) {
        return Zn.call(this, a, !0)
      },
      add: ut('add'),
      set: ut('set'),
      delete: ut('delete'),
      clear: ut('clear'),
      forEach: er(!0, !0)
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((a) => {
      ;(e[a] = tr(a, !1, !1)),
        (n[a] = tr(a, !0, !1)),
        (t[a] = tr(a, !1, !0)),
        (r[a] = tr(a, !0, !0))
    }),
    [e, n, t, r]
  )
}
const [gc, vc, bc, yc] = pc()
function Zi(e, t) {
  const n = t ? (e ? yc : bc) : e ? vc : gc
  return (r, i, a) =>
    i === '__v_isReactive'
      ? !e
      : i === '__v_isReadonly'
      ? e
      : i === '__v_raw'
      ? r
      : Reflect.get(V(n, i) && i in r ? n : r, i, a)
}
const Ac = { get: Zi(!1, !1) },
  wc = { get: Zi(!1, !0) },
  xc = { get: Zi(!0, !1) },
  os = new WeakMap(),
  ss = new WeakMap(),
  ls = new WeakMap(),
  Ec = new WeakMap()
function kc(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function Cc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : kc(Ql(e))
}
function Yn(e) {
  return tn(e) ? e : $i(e, !1, as, Ac, os)
}
function Pc(e) {
  return $i(e, !1, hc, wc, ss)
}
function cs(e) {
  return $i(e, !0, mc, xc, ls)
}
function $i(e, t, n, r, i) {
  if (!fe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const a = i.get(e)
  if (a) return a
  const o = Cc(e)
  if (o === 0) return e
  const s = new Proxy(e, o === 2 ? r : n)
  return i.set(e, s), s
}
function Xt(e) {
  return tn(e) ? Xt(e.__v_raw) : !!(e && e.__v_isReactive)
}
function tn(e) {
  return !!(e && e.__v_isReadonly)
}
function Ar(e) {
  return !!(e && e.__v_isShallow)
}
function fs(e) {
  return Xt(e) || tn(e)
}
function J(e) {
  const t = e && e.__v_raw
  return t ? J(t) : e
}
function ea(e) {
  return yr(e, '__v_skip', !0), e
}
const Fn = (e) => (fe(e) ? Yn(e) : e),
  ta = (e) => (fe(e) ? cs(e) : e)
function us(e) {
  gt && je && ((e = J(e)), ns(e.dep || (e.dep = Vi())))
}
function ds(e, t) {
  e = J(e)
  const n = e.dep
  n && hi(n)
}
function ye(e) {
  return !!(e && e.__v_isRef === !0)
}
function Tt(e) {
  return ms(e, !1)
}
function Sc(e) {
  return ms(e, !0)
}
function ms(e, t) {
  return ye(e) ? e : new Oc(e, t)
}
class Oc {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : J(t)),
      (this._value = n ? t : Fn(t))
  }
  get value() {
    return us(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || Ar(t) || tn(t)
    ;(t = n ? t : J(t)),
      Nn(t, this._rawValue) && ((this._rawValue = t), (this._value = n ? t : Fn(t)), ds(this))
  }
}
function te(e) {
  return ye(e) ? e.value : e
}
const _c = {
  get: (e, t, n) => te(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const i = e[t]
    return ye(i) && !ye(n) ? ((i.value = n), !0) : Reflect.set(e, t, n, r)
  }
}
function hs(e) {
  return Xt(e) ? e : new Proxy(e, _c)
}
var ps
class Ic {
  constructor(t, n, r, i) {
    ;(this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[ps] = !1),
      (this._dirty = !0),
      (this.effect = new Ji(t, () => {
        this._dirty || ((this._dirty = !0), ds(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !i),
      (this.__v_isReadonly = r)
  }
  get value() {
    const t = J(this)
    return (
      us(t), (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())), t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
}
ps = '__v_isReadonly'
function Rc(e, t, n = !1) {
  let r, i
  const a = W(e)
  return a ? ((r = e), (i = De)) : ((r = e.get), (i = e.set)), new Ic(r, i, a || !i, n)
}
function vt(e, t, n, r) {
  let i
  try {
    i = r ? e(...r) : e()
  } catch (a) {
    Nr(a, t, n)
  }
  return i
}
function He(e, t, n, r) {
  if (W(e)) {
    const a = vt(e, t, n, r)
    return (
      a &&
        Xo(a) &&
        a.catch((o) => {
          Nr(o, t, n)
        }),
      a
    )
  }
  const i = []
  for (let a = 0; a < e.length; a++) i.push(He(e[a], t, n, r))
  return i
}
function Nr(e, t, n, r = !0) {
  const i = t ? t.vnode : null
  if (t) {
    let a = t.parent
    const o = t.proxy,
      s = n
    for (; a; ) {
      const f = a.ec
      if (f) {
        for (let c = 0; c < f.length; c++) if (f[c](e, o, s) === !1) return
      }
      a = a.parent
    }
    const l = t.appContext.config.errorHandler
    if (l) {
      vt(l, null, 10, [e, o, s])
      return
    }
  }
  Tc(e, n, i, r)
}
function Tc(e, t, n, r = !0) {
  console.error(e)
}
let zn = !1,
  pi = !1
const be = []
let qe = 0
const qt = []
let tt = null,
  St = 0
const gs = Promise.resolve()
let na = null
function vs(e) {
  const t = na || gs
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Mc(e) {
  let t = qe + 1,
    n = be.length
  for (; t < n; ) {
    const r = (t + n) >>> 1
    Ln(be[r]) < e ? (t = r + 1) : (n = r)
  }
  return t
}
function ra(e) {
  ;(!be.length || !be.includes(e, zn && e.allowRecurse ? qe + 1 : qe)) &&
    (e.id == null ? be.push(e) : be.splice(Mc(e.id), 0, e), bs())
}
function bs() {
  !zn && !pi && ((pi = !0), (na = gs.then(As)))
}
function Nc(e) {
  const t = be.indexOf(e)
  t > qe && be.splice(t, 1)
}
function Fc(e) {
  D(e) ? qt.push(...e) : (!tt || !tt.includes(e, e.allowRecurse ? St + 1 : St)) && qt.push(e), bs()
}
function La(e, t = zn ? qe + 1 : 0) {
  for (; t < be.length; t++) {
    const n = be[t]
    n && n.pre && (be.splice(t, 1), t--, n())
  }
}
function ys(e) {
  if (qt.length) {
    const t = [...new Set(qt)]
    if (((qt.length = 0), tt)) {
      tt.push(...t)
      return
    }
    for (tt = t, tt.sort((n, r) => Ln(n) - Ln(r)), St = 0; St < tt.length; St++) tt[St]()
    ;(tt = null), (St = 0)
  }
}
const Ln = (e) => (e.id == null ? 1 / 0 : e.id),
  zc = (e, t) => {
    const n = Ln(e) - Ln(t)
    if (n === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return n
  }
function As(e) {
  ;(pi = !1), (zn = !0), be.sort(zc)
  const t = De
  try {
    for (qe = 0; qe < be.length; qe++) {
      const n = be[qe]
      n && n.active !== !1 && vt(n, null, 14)
    }
  } finally {
    ;(qe = 0), (be.length = 0), ys(), (zn = !1), (na = null), (be.length || qt.length) && As()
  }
}
function Lc(e, t, ...n) {
  if (e.isUnmounted) return
  const r = e.vnode.props || ae
  let i = n
  const a = t.startsWith('update:'),
    o = a && t.slice(7)
  if (o && o in r) {
    const c = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: d, trim: h } = r[c] || ae
    h && (i = n.map((g) => (ve(g) ? g.trim() : g))), d && (i = n.map(Jl))
  }
  let s,
    l = r[(s = Jr(t))] || r[(s = Jr(en(t)))]
  !l && a && (l = r[(s = Jr(un(t)))]), l && He(l, e, 6, i)
  const f = r[s + 'Once']
  if (f) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[s]) return
    ;(e.emitted[s] = !0), He(f, e, 6, i)
  }
}
function ws(e, t, n = !1) {
  const r = t.emitsCache,
    i = r.get(e)
  if (i !== void 0) return i
  const a = e.emits
  let o = {},
    s = !1
  if (!W(e)) {
    const l = (f) => {
      const c = ws(f, t, !0)
      c && ((s = !0), xe(o, c))
    }
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l)
  }
  return !a && !s
    ? (fe(e) && r.set(e, null), null)
    : (D(a) ? a.forEach((l) => (o[l] = null)) : xe(o, a), fe(e) && r.set(e, o), o)
}
function Fr(e, t) {
  return !e || !Ir(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      V(e, t[0].toLowerCase() + t.slice(1)) || V(e, un(t)) || V(e, t))
}
let Ze = null,
  zr = null
function wr(e) {
  const t = Ze
  return (Ze = e), (zr = (e && e.type.__scopeId) || null), t
}
function jc(e) {
  zr = e
}
function Uc() {
  zr = null
}
function wn(e, t = Ze, n) {
  if (!t || e._n) return e
  const r = (...i) => {
    r._d && Qa(-1)
    const a = wr(t)
    let o
    try {
      o = e(...i)
    } finally {
      wr(a), r._d && Qa(1)
    }
    return o
  }
  return (r._n = !0), (r._c = !0), (r._d = !0), r
}
function qr(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: i,
    props: a,
    propsOptions: [o],
    slots: s,
    attrs: l,
    emit: f,
    render: c,
    renderCache: d,
    data: h,
    setupState: g,
    ctx: P,
    inheritAttrs: I
  } = e
  let z, b
  const w = wr(e)
  try {
    if (n.shapeFlag & 4) {
      const B = i || r
      ;(z = Xe(c.call(B, B, d, a, g, h, P))), (b = l)
    } else {
      const B = t
      ;(z = Xe(B.length > 1 ? B(a, { attrs: l, slots: s, emit: f }) : B(a, null))),
        (b = t.props ? l : Bc(l))
    }
  } catch (B) {
    ;(On.length = 0), Nr(B, e, 1), (z = me(Nt))
  }
  let S = z
  if (b && I !== !1) {
    const B = Object.keys(b),
      { shapeFlag: Q } = S
    B.length && Q & 7 && (o && B.some(Wi) && (b = Kc(b, o)), (S = rn(S, b)))
  }
  return (
    n.dirs && ((S = rn(S)), (S.dirs = S.dirs ? S.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (S.transition = n.transition),
    (z = S),
    wr(w),
    z
  )
}
const Bc = (e) => {
    let t
    for (const n in e) (n === 'class' || n === 'style' || Ir(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  Kc = (e, t) => {
    const n = {}
    for (const r in e) (!Wi(r) || !(r.slice(9) in t)) && (n[r] = e[r])
    return n
  }
function Dc(e, t, n) {
  const { props: r, children: i, component: a } = e,
    { props: o, children: s, patchFlag: l } = t,
    f = a.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && l >= 0) {
    if (l & 1024) return !0
    if (l & 16) return r ? ja(r, o, f) : !!o
    if (l & 8) {
      const c = t.dynamicProps
      for (let d = 0; d < c.length; d++) {
        const h = c[d]
        if (o[h] !== r[h] && !Fr(f, h)) return !0
      }
    }
  } else
    return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? (o ? ja(r, o, f) : !0) : !!o
  return !1
}
function ja(e, t, n) {
  const r = Object.keys(t)
  if (r.length !== Object.keys(e).length) return !0
  for (let i = 0; i < r.length; i++) {
    const a = r[i]
    if (t[a] !== e[a] && !Fr(n, a)) return !0
  }
  return !1
}
function Hc({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent)
}
const Wc = (e) => e.__isSuspense
function Qc(e, t) {
  t && t.pendingBranch ? (D(e) ? t.effects.push(...e) : t.effects.push(e)) : Fc(e)
}
function mr(e, t) {
  if (he) {
    let n = he.provides
    const r = he.parent && he.parent.provides
    r === n && (n = he.provides = Object.create(r)), (n[e] = t)
  }
}
function rt(e, t, n = !1) {
  const r = he || Ze
  if (r) {
    const i =
      r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides
    if (i && e in i) return i[e]
    if (arguments.length > 1) return n && W(t) ? t.call(r.proxy) : t
  }
}
const nr = {}
function Pn(e, t, n) {
  return xs(e, t, n)
}
function xs(e, t, { immediate: n, deep: r, flush: i, onTrack: a, onTrigger: o } = ae) {
  const s = $l() === (he == null ? void 0 : he.scope) ? he : null
  let l,
    f = !1,
    c = !1
  if (
    (ye(e)
      ? ((l = () => e.value), (f = Ar(e)))
      : Xt(e)
      ? ((l = () => e), (r = !0))
      : D(e)
      ? ((c = !0),
        (f = e.some((S) => Xt(S) || Ar(S))),
        (l = () =>
          e.map((S) => {
            if (ye(S)) return S.value
            if (Xt(S)) return Qt(S)
            if (W(S)) return vt(S, s, 2)
          })))
      : W(e)
      ? t
        ? (l = () => vt(e, s, 2))
        : (l = () => {
            if (!(s && s.isUnmounted)) return d && d(), He(e, s, 3, [h])
          })
      : (l = De),
    t && r)
  ) {
    const S = l
    l = () => Qt(S())
  }
  let d,
    h = (S) => {
      d = b.onStop = () => {
        vt(S, s, 4)
      }
    },
    g
  if (Un)
    if (((h = De), t ? n && He(t, s, 3, [l(), c ? [] : void 0, h]) : l(), i === 'sync')) {
      const S = jf()
      g = S.__watcherHandles || (S.__watcherHandles = [])
    } else return De
  let P = c ? new Array(e.length).fill(nr) : nr
  const I = () => {
    if (b.active)
      if (t) {
        const S = b.run()
        ;(r || f || (c ? S.some((B, Q) => Nn(B, P[Q])) : Nn(S, P))) &&
          (d && d(), He(t, s, 3, [S, P === nr ? void 0 : c && P[0] === nr ? [] : P, h]), (P = S))
      } else b.run()
  }
  I.allowRecurse = !!t
  let z
  i === 'sync'
    ? (z = I)
    : i === 'post'
    ? (z = () => Ce(I, s && s.suspense))
    : ((I.pre = !0), s && (I.id = s.uid), (z = () => ra(I)))
  const b = new Ji(l, z)
  t ? (n ? I() : (P = b.run())) : i === 'post' ? Ce(b.run.bind(b), s && s.suspense) : b.run()
  const w = () => {
    b.stop(), s && s.scope && Qi(s.scope.effects, b)
  }
  return g && g.push(w), w
}
function Yc(e, t, n) {
  const r = this.proxy,
    i = ve(e) ? (e.includes('.') ? Es(r, e) : () => r[e]) : e.bind(r, r)
  let a
  W(t) ? (a = t) : ((a = t.handler), (n = t))
  const o = he
  an(this)
  const s = xs(i, a.bind(r), n)
  return o ? an(o) : Mt(), s
}
function Es(e, t) {
  const n = t.split('.')
  return () => {
    let r = e
    for (let i = 0; i < n.length && r; i++) r = r[n[i]]
    return r
  }
}
function Qt(e, t) {
  if (!fe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e
  if ((t.add(e), ye(e))) Qt(e.value, t)
  else if (D(e)) for (let n = 0; n < e.length; n++) Qt(e[n], t)
  else if (Hl(e) || Cn(e))
    e.forEach((n) => {
      Qt(n, t)
    })
  else if (Yl(e)) for (const n in e) Qt(e[n], t)
  return e
}
function hn(e) {
  return W(e) ? { setup: e, name: e.name } : e
}
const hr = (e) => !!e.type.__asyncLoader,
  ks = (e) => e.type.__isKeepAlive
function Gc(e, t) {
  Cs(e, 'a', t)
}
function Vc(e, t) {
  Cs(e, 'da', t)
}
function Cs(e, t, n = he) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let i = n
      for (; i; ) {
        if (i.isDeactivated) return
        i = i.parent
      }
      return e()
    })
  if ((Lr(t, r, n), n)) {
    let i = n.parent
    for (; i && i.parent; ) ks(i.parent.vnode) && Jc(r, t, n, i), (i = i.parent)
  }
}
function Jc(e, t, n, r) {
  const i = Lr(t, e, r, !0)
  Ps(() => {
    Qi(r[t], i)
  }, n)
}
function Lr(e, t, n = he, r = !1) {
  if (n) {
    const i = n[e] || (n[e] = []),
      a =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return
          dn(), an(n)
          const s = He(t, n, e, o)
          return Mt(), mn(), s
        })
    return r ? i.unshift(a) : i.push(a), a
  }
}
const lt =
    (e) =>
    (t, n = he) =>
      (!Un || e === 'sp') && Lr(e, (...r) => t(...r), n),
  Xc = lt('bm'),
  ia = lt('m'),
  qc = lt('bu'),
  Zc = lt('u'),
  $c = lt('bum'),
  Ps = lt('um'),
  ef = lt('sp'),
  tf = lt('rtg'),
  nf = lt('rtc')
function rf(e, t = he) {
  Lr('ec', e, t)
}
function kt(e, t, n, r) {
  const i = e.dirs,
    a = t && t.dirs
  for (let o = 0; o < i.length; o++) {
    const s = i[o]
    a && (s.oldValue = a[o].value)
    let l = s.dir[r]
    l && (dn(), He(l, n, 8, [e.el, s, e, t]), mn())
  }
}
const af = Symbol(),
  gi = (e) => (e ? (js(e) ? la(e) || e.proxy : gi(e.parent)) : null),
  Sn = xe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => gi(e.parent),
    $root: (e) => gi(e.root),
    $emit: (e) => e.emit,
    $options: (e) => aa(e),
    $forceUpdate: (e) => e.f || (e.f = () => ra(e.update)),
    $nextTick: (e) => e.n || (e.n = vs.bind(e.proxy)),
    $watch: (e) => Yc.bind(e)
  }),
  Zr = (e, t) => e !== ae && !e.__isScriptSetup && V(e, t),
  of = {
    get({ _: e }, t) {
      const { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: l } = e
      let f
      if (t[0] !== '$') {
        const g = o[t]
        if (g !== void 0)
          switch (g) {
            case 1:
              return r[t]
            case 2:
              return i[t]
            case 4:
              return n[t]
            case 3:
              return a[t]
          }
        else {
          if (Zr(r, t)) return (o[t] = 1), r[t]
          if (i !== ae && V(i, t)) return (o[t] = 2), i[t]
          if ((f = e.propsOptions[0]) && V(f, t)) return (o[t] = 3), a[t]
          if (n !== ae && V(n, t)) return (o[t] = 4), n[t]
          vi && (o[t] = 0)
        }
      }
      const c = Sn[t]
      let d, h
      if (c) return t === '$attrs' && Se(e, 'get', t), c(e)
      if ((d = s.__cssModules) && (d = d[t])) return d
      if (n !== ae && V(n, t)) return (o[t] = 4), n[t]
      if (((h = l.config.globalProperties), V(h, t))) return h[t]
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: i, ctx: a } = e
      return Zr(i, t)
        ? ((i[t] = n), !0)
        : r !== ae && V(r, t)
        ? ((r[t] = n), !0)
        : V(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((a[t] = n), !0)
    },
    has(
      { _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: a } },
      o
    ) {
      let s
      return (
        !!n[o] ||
        (e !== ae && V(e, o)) ||
        Zr(t, o) ||
        ((s = a[0]) && V(s, o)) ||
        V(r, o) ||
        V(Sn, o) ||
        V(i.config.globalProperties, o)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null ? (e._.accessCache[t] = 0) : V(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    }
  }
let vi = !0
function sf(e) {
  const t = aa(e),
    n = e.proxy,
    r = e.ctx
  ;(vi = !1), t.beforeCreate && Ua(t.beforeCreate, e, 'bc')
  const {
    data: i,
    computed: a,
    methods: o,
    watch: s,
    provide: l,
    inject: f,
    created: c,
    beforeMount: d,
    mounted: h,
    beforeUpdate: g,
    updated: P,
    activated: I,
    deactivated: z,
    beforeDestroy: b,
    beforeUnmount: w,
    destroyed: S,
    unmounted: B,
    render: Q,
    renderTracked: ie,
    renderTriggered: le,
    errorCaptured: Oe,
    serverPrefetch: Ae,
    expose: Re,
    inheritAttrs: ft,
    components: Qe,
    directives: Bt,
    filters: xt
  } = t
  if ((f && lf(f, r, null, e.appContext.config.unwrapInjectedRef), o))
    for (const $ in o) {
      const q = o[$]
      W(q) && (r[$] = q.bind(n))
    }
  if (i) {
    const $ = i.call(n, n)
    fe($) && (e.data = Yn($))
  }
  if (((vi = !0), a))
    for (const $ in a) {
      const q = a[$],
        Ne = W(q) ? q.bind(n, n) : W(q.get) ? q.get.bind(n, n) : De,
        Et = !W(q) && W(q.set) ? q.set.bind(n) : De,
        Fe = se({ get: Ne, set: Et })
      Object.defineProperty(r, $, {
        enumerable: !0,
        configurable: !0,
        get: () => Fe.value,
        set: (Ee) => (Fe.value = Ee)
      })
    }
  if (s) for (const $ in s) Ss(s[$], r, n, $)
  if (l) {
    const $ = W(l) ? l.call(n) : l
    Reflect.ownKeys($).forEach((q) => {
      mr(q, $[q])
    })
  }
  c && Ua(c, e, 'c')
  function ue($, q) {
    D(q) ? q.forEach((Ne) => $(Ne.bind(n))) : q && $(q.bind(n))
  }
  if (
    (ue(Xc, d),
    ue(ia, h),
    ue(qc, g),
    ue(Zc, P),
    ue(Gc, I),
    ue(Vc, z),
    ue(rf, Oe),
    ue(nf, ie),
    ue(tf, le),
    ue($c, w),
    ue(Ps, B),
    ue(ef, Ae),
    D(Re))
  )
    if (Re.length) {
      const $ = e.exposed || (e.exposed = {})
      Re.forEach((q) => {
        Object.defineProperty($, q, { get: () => n[q], set: (Ne) => (n[q] = Ne) })
      })
    } else e.exposed || (e.exposed = {})
  Q && e.render === De && (e.render = Q),
    ft != null && (e.inheritAttrs = ft),
    Qe && (e.components = Qe),
    Bt && (e.directives = Bt)
}
function lf(e, t, n = De, r = !1) {
  D(e) && (e = bi(e))
  for (const i in e) {
    const a = e[i]
    let o
    fe(a)
      ? 'default' in a
        ? (o = rt(a.from || i, a.default, !0))
        : (o = rt(a.from || i))
      : (o = rt(a)),
      ye(o) && r
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (s) => (o.value = s)
          })
        : (t[i] = o)
  }
}
function Ua(e, t, n) {
  He(D(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Ss(e, t, n, r) {
  const i = r.includes('.') ? Es(n, r) : () => n[r]
  if (ve(e)) {
    const a = t[e]
    W(a) && Pn(i, a)
  } else if (W(e)) Pn(i, e.bind(n))
  else if (fe(e))
    if (D(e)) e.forEach((a) => Ss(a, t, n, r))
    else {
      const a = W(e.handler) ? e.handler.bind(n) : t[e.handler]
      W(a) && Pn(i, a, e)
    }
}
function aa(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: i,
      optionsCache: a,
      config: { optionMergeStrategies: o }
    } = e.appContext,
    s = a.get(t)
  let l
  return (
    s
      ? (l = s)
      : !i.length && !n && !r
      ? (l = t)
      : ((l = {}), i.length && i.forEach((f) => xr(l, f, o, !0)), xr(l, t, o)),
    fe(t) && a.set(t, l),
    l
  )
}
function xr(e, t, n, r = !1) {
  const { mixins: i, extends: a } = t
  a && xr(e, a, n, !0), i && i.forEach((o) => xr(e, o, n, !0))
  for (const o in t)
    if (!(r && o === 'expose')) {
      const s = cf[o] || (n && n[o])
      e[o] = s ? s(e[o], t[o]) : t[o]
    }
  return e
}
const cf = {
  data: Ba,
  props: Pt,
  emits: Pt,
  methods: Pt,
  computed: Pt,
  beforeCreate: we,
  created: we,
  beforeMount: we,
  mounted: we,
  beforeUpdate: we,
  updated: we,
  beforeDestroy: we,
  beforeUnmount: we,
  destroyed: we,
  unmounted: we,
  activated: we,
  deactivated: we,
  errorCaptured: we,
  serverPrefetch: we,
  components: Pt,
  directives: Pt,
  watch: uf,
  provide: Ba,
  inject: ff
}
function Ba(e, t) {
  return t
    ? e
      ? function () {
          return xe(W(e) ? e.call(this, this) : e, W(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function ff(e, t) {
  return Pt(bi(e), bi(t))
}
function bi(e) {
  if (D(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function we(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Pt(e, t) {
  return e ? xe(xe(Object.create(null), e), t) : t
}
function uf(e, t) {
  if (!e) return t
  if (!t) return e
  const n = xe(Object.create(null), e)
  for (const r in t) n[r] = we(e[r], t[r])
  return n
}
function df(e, t, n, r = !1) {
  const i = {},
    a = {}
  yr(a, Br, 1), (e.propsDefaults = Object.create(null)), Os(e, t, i, a)
  for (const o in e.propsOptions[0]) o in i || (i[o] = void 0)
  n ? (e.props = r ? i : Pc(i)) : e.type.props ? (e.props = i) : (e.props = a), (e.attrs = a)
}
function mf(e, t, n, r) {
  const {
      props: i,
      attrs: a,
      vnode: { patchFlag: o }
    } = e,
    s = J(i),
    [l] = e.propsOptions
  let f = !1
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const c = e.vnode.dynamicProps
      for (let d = 0; d < c.length; d++) {
        let h = c[d]
        if (Fr(e.emitsOptions, h)) continue
        const g = t[h]
        if (l)
          if (V(a, h)) g !== a[h] && ((a[h] = g), (f = !0))
          else {
            const P = en(h)
            i[P] = yi(l, s, P, g, e, !1)
          }
        else g !== a[h] && ((a[h] = g), (f = !0))
      }
    }
  } else {
    Os(e, t, i, a) && (f = !0)
    let c
    for (const d in s)
      (!t || (!V(t, d) && ((c = un(d)) === d || !V(t, c)))) &&
        (l
          ? n && (n[d] !== void 0 || n[c] !== void 0) && (i[d] = yi(l, s, d, void 0, e, !0))
          : delete i[d])
    if (a !== s) for (const d in a) (!t || !V(t, d)) && (delete a[d], (f = !0))
  }
  f && it(e, 'set', '$attrs')
}
function Os(e, t, n, r) {
  const [i, a] = e.propsOptions
  let o = !1,
    s
  if (t)
    for (let l in t) {
      if (dr(l)) continue
      const f = t[l]
      let c
      i && V(i, (c = en(l)))
        ? !a || !a.includes(c)
          ? (n[c] = f)
          : ((s || (s = {}))[c] = f)
        : Fr(e.emitsOptions, l) || ((!(l in r) || f !== r[l]) && ((r[l] = f), (o = !0)))
    }
  if (a) {
    const l = J(n),
      f = s || ae
    for (let c = 0; c < a.length; c++) {
      const d = a[c]
      n[d] = yi(i, l, d, f[d], e, !V(f, d))
    }
  }
  return o
}
function yi(e, t, n, r, i, a) {
  const o = e[n]
  if (o != null) {
    const s = V(o, 'default')
    if (s && r === void 0) {
      const l = o.default
      if (o.type !== Function && W(l)) {
        const { propsDefaults: f } = i
        n in f ? (r = f[n]) : (an(i), (r = f[n] = l.call(null, t)), Mt())
      } else r = l
    }
    o[0] && (a && !s ? (r = !1) : o[1] && (r === '' || r === un(n)) && (r = !0))
  }
  return r
}
function _s(e, t, n = !1) {
  const r = t.propsCache,
    i = r.get(e)
  if (i) return i
  const a = e.props,
    o = {},
    s = []
  let l = !1
  if (!W(e)) {
    const c = (d) => {
      l = !0
      const [h, g] = _s(d, t, !0)
      xe(o, h), g && s.push(...g)
    }
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c)
  }
  if (!a && !l) return fe(e) && r.set(e, Jt), Jt
  if (D(a))
    for (let c = 0; c < a.length; c++) {
      const d = en(a[c])
      Ka(d) && (o[d] = ae)
    }
  else if (a)
    for (const c in a) {
      const d = en(c)
      if (Ka(d)) {
        const h = a[c],
          g = (o[d] = D(h) || W(h) ? { type: h } : Object.assign({}, h))
        if (g) {
          const P = Wa(Boolean, g.type),
            I = Wa(String, g.type)
          ;(g[0] = P > -1), (g[1] = I < 0 || P < I), (P > -1 || V(g, 'default')) && s.push(d)
        }
      }
    }
  const f = [o, s]
  return fe(e) && r.set(e, f), f
}
function Ka(e) {
  return e[0] !== '$'
}
function Da(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/)
  return t ? t[2] : e === null ? 'null' : ''
}
function Ha(e, t) {
  return Da(e) === Da(t)
}
function Wa(e, t) {
  return D(t) ? t.findIndex((n) => Ha(n, e)) : W(t) && Ha(t, e) ? 0 : -1
}
const Is = (e) => e[0] === '_' || e === '$stable',
  oa = (e) => (D(e) ? e.map(Xe) : [Xe(e)]),
  hf = (e, t, n) => {
    if (t._n) return t
    const r = wn((...i) => oa(t(...i)), n)
    return (r._c = !1), r
  },
  Rs = (e, t, n) => {
    const r = e._ctx
    for (const i in e) {
      if (Is(i)) continue
      const a = e[i]
      if (W(a)) t[i] = hf(i, a, r)
      else if (a != null) {
        const o = oa(a)
        t[i] = () => o
      }
    }
  },
  Ts = (e, t) => {
    const n = oa(t)
    e.slots.default = () => n
  },
  pf = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._
      n ? ((e.slots = J(t)), yr(t, '_', n)) : Rs(t, (e.slots = {}))
    } else (e.slots = {}), t && Ts(e, t)
    yr(e.slots, Br, 1)
  },
  gf = (e, t, n) => {
    const { vnode: r, slots: i } = e
    let a = !0,
      o = ae
    if (r.shapeFlag & 32) {
      const s = t._
      s
        ? n && s === 1
          ? (a = !1)
          : (xe(i, t), !n && s === 1 && delete i._)
        : ((a = !t.$stable), Rs(t, i)),
        (o = t)
    } else t && (Ts(e, t), (o = { default: 1 }))
    if (a) for (const s in i) !Is(s) && !(s in o) && delete i[s]
  }
function Ms() {
  return {
    app: null,
    config: {
      isNativeTag: Bl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let vf = 0
function bf(e, t) {
  return function (r, i = null) {
    W(r) || (r = Object.assign({}, r)), i != null && !fe(i) && (i = null)
    const a = Ms(),
      o = new Set()
    let s = !1
    const l = (a.app = {
      _uid: vf++,
      _component: r,
      _props: i,
      _container: null,
      _context: a,
      _instance: null,
      version: Uf,
      get config() {
        return a.config
      },
      set config(f) {},
      use(f, ...c) {
        return (
          o.has(f) ||
            (f && W(f.install) ? (o.add(f), f.install(l, ...c)) : W(f) && (o.add(f), f(l, ...c))),
          l
        )
      },
      mixin(f) {
        return a.mixins.includes(f) || a.mixins.push(f), l
      },
      component(f, c) {
        return c ? ((a.components[f] = c), l) : a.components[f]
      },
      directive(f, c) {
        return c ? ((a.directives[f] = c), l) : a.directives[f]
      },
      mount(f, c, d) {
        if (!s) {
          const h = me(r, i)
          return (
            (h.appContext = a),
            c && t ? t(h, f) : e(h, f, d),
            (s = !0),
            (l._container = f),
            (f.__vue_app__ = l),
            la(h.component) || h.component.proxy
          )
        }
      },
      unmount() {
        s && (e(null, l._container), delete l._container.__vue_app__)
      },
      provide(f, c) {
        return (a.provides[f] = c), l
      }
    })
    return l
  }
}
function Ai(e, t, n, r, i = !1) {
  if (D(e)) {
    e.forEach((h, g) => Ai(h, t && (D(t) ? t[g] : t), n, r, i))
    return
  }
  if (hr(r) && !i) return
  const a = r.shapeFlag & 4 ? la(r.component) || r.component.proxy : r.el,
    o = i ? null : a,
    { i: s, r: l } = e,
    f = t && t.r,
    c = s.refs === ae ? (s.refs = {}) : s.refs,
    d = s.setupState
  if (
    (f != null &&
      f !== l &&
      (ve(f) ? ((c[f] = null), V(d, f) && (d[f] = null)) : ye(f) && (f.value = null)),
    W(l))
  )
    vt(l, s, 12, [o, c])
  else {
    const h = ve(l),
      g = ye(l)
    if (h || g) {
      const P = () => {
        if (e.f) {
          const I = h ? (V(d, l) ? d[l] : c[l]) : l.value
          i
            ? D(I) && Qi(I, a)
            : D(I)
            ? I.includes(a) || I.push(a)
            : h
            ? ((c[l] = [a]), V(d, l) && (d[l] = c[l]))
            : ((l.value = [a]), e.k && (c[e.k] = l.value))
        } else h ? ((c[l] = o), V(d, l) && (d[l] = o)) : g && ((l.value = o), e.k && (c[e.k] = o))
      }
      o ? ((P.id = -1), Ce(P, n)) : P()
    }
  }
}
const Ce = Qc
function yf(e) {
  return Af(e)
}
function Af(e, t) {
  const n = Xl()
  n.__VUE__ = !0
  const {
      insert: r,
      remove: i,
      patchProp: a,
      createElement: o,
      createText: s,
      createComment: l,
      setText: f,
      setElementText: c,
      parentNode: d,
      nextSibling: h,
      setScopeId: g = De,
      insertStaticContent: P
    } = e,
    I = (u, m, p, v = null, A = null, k = null, R = !1, E = null, O = !!m.dynamicChildren) => {
      if (u === m) return
      u && !bn(u, m) && ((v = _(u)), Ee(u, A, k, !0), (u = null)),
        m.patchFlag === -2 && ((O = !1), (m.dynamicChildren = null))
      const { type: x, ref: j, shapeFlag: N } = m
      switch (x) {
        case jr:
          z(u, m, p, v)
          break
        case Nt:
          b(u, m, p, v)
          break
        case pr:
          u == null && w(m, p, v, R)
          break
        case Je:
          Qe(u, m, p, v, A, k, R, E, O)
          break
        default:
          N & 1
            ? Q(u, m, p, v, A, k, R, E, O)
            : N & 6
            ? Bt(u, m, p, v, A, k, R, E, O)
            : (N & 64 || N & 128) && x.process(u, m, p, v, A, k, R, E, O, G)
      }
      j != null && A && Ai(j, u && u.ref, k, m || u, !m)
    },
    z = (u, m, p, v) => {
      if (u == null) r((m.el = s(m.children)), p, v)
      else {
        const A = (m.el = u.el)
        m.children !== u.children && f(A, m.children)
      }
    },
    b = (u, m, p, v) => {
      u == null ? r((m.el = l(m.children || '')), p, v) : (m.el = u.el)
    },
    w = (u, m, p, v) => {
      ;[u.el, u.anchor] = P(u.children, m, p, v, u.el, u.anchor)
    },
    S = ({ el: u, anchor: m }, p, v) => {
      let A
      for (; u && u !== m; ) (A = h(u)), r(u, p, v), (u = A)
      r(m, p, v)
    },
    B = ({ el: u, anchor: m }) => {
      let p
      for (; u && u !== m; ) (p = h(u)), i(u), (u = p)
      i(m)
    },
    Q = (u, m, p, v, A, k, R, E, O) => {
      ;(R = R || m.type === 'svg'), u == null ? ie(m, p, v, A, k, R, E, O) : Ae(u, m, A, k, R, E, O)
    },
    ie = (u, m, p, v, A, k, R, E) => {
      let O, x
      const { type: j, props: N, shapeFlag: U, transition: K, dirs: Y } = u
      if (
        ((O = u.el = o(u.type, k, N && N.is, N)),
        U & 8
          ? c(O, u.children)
          : U & 16 && Oe(u.children, O, null, v, A, k && j !== 'foreignObject', R, E),
        Y && kt(u, null, v, 'created'),
        le(O, u, u.scopeId, R, v),
        N)
      ) {
        for (const Z in N) Z !== 'value' && !dr(Z) && a(O, Z, null, N[Z], k, u.children, v, A, T)
        'value' in N && a(O, 'value', null, N.value), (x = N.onVnodeBeforeMount) && Ge(x, v, u)
      }
      Y && kt(u, null, v, 'beforeMount')
      const ee = (!A || (A && !A.pendingBranch)) && K && !K.persisted
      ee && K.beforeEnter(O),
        r(O, m, p),
        ((x = N && N.onVnodeMounted) || ee || Y) &&
          Ce(() => {
            x && Ge(x, v, u), ee && K.enter(O), Y && kt(u, null, v, 'mounted')
          }, A)
    },
    le = (u, m, p, v, A) => {
      if ((p && g(u, p), v)) for (let k = 0; k < v.length; k++) g(u, v[k])
      if (A) {
        let k = A.subTree
        if (m === k) {
          const R = A.vnode
          le(u, R, R.scopeId, R.slotScopeIds, A.parent)
        }
      }
    },
    Oe = (u, m, p, v, A, k, R, E, O = 0) => {
      for (let x = O; x < u.length; x++) {
        const j = (u[x] = E ? ht(u[x]) : Xe(u[x]))
        I(null, j, m, p, v, A, k, R, E)
      }
    },
    Ae = (u, m, p, v, A, k, R) => {
      const E = (m.el = u.el)
      let { patchFlag: O, dynamicChildren: x, dirs: j } = m
      O |= u.patchFlag & 16
      const N = u.props || ae,
        U = m.props || ae
      let K
      p && Ct(p, !1),
        (K = U.onVnodeBeforeUpdate) && Ge(K, p, m, u),
        j && kt(m, u, p, 'beforeUpdate'),
        p && Ct(p, !0)
      const Y = A && m.type !== 'foreignObject'
      if (
        (x ? Re(u.dynamicChildren, x, E, p, v, Y, k) : R || q(u, m, E, null, p, v, Y, k, !1), O > 0)
      ) {
        if (O & 16) ft(E, m, N, U, p, v, A)
        else if (
          (O & 2 && N.class !== U.class && a(E, 'class', null, U.class, A),
          O & 4 && a(E, 'style', N.style, U.style, A),
          O & 8)
        ) {
          const ee = m.dynamicProps
          for (let Z = 0; Z < ee.length; Z++) {
            const de = ee[Z],
              ze = N[de],
              Dt = U[de]
            ;(Dt !== ze || de === 'value') && a(E, de, ze, Dt, A, u.children, p, v, T)
          }
        }
        O & 1 && u.children !== m.children && c(E, m.children)
      } else !R && x == null && ft(E, m, N, U, p, v, A)
      ;((K = U.onVnodeUpdated) || j) &&
        Ce(() => {
          K && Ge(K, p, m, u), j && kt(m, u, p, 'updated')
        }, v)
    },
    Re = (u, m, p, v, A, k, R) => {
      for (let E = 0; E < m.length; E++) {
        const O = u[E],
          x = m[E],
          j = O.el && (O.type === Je || !bn(O, x) || O.shapeFlag & 70) ? d(O.el) : p
        I(O, x, j, null, v, A, k, R, !0)
      }
    },
    ft = (u, m, p, v, A, k, R) => {
      if (p !== v) {
        if (p !== ae)
          for (const E in p) !dr(E) && !(E in v) && a(u, E, p[E], null, R, m.children, A, k, T)
        for (const E in v) {
          if (dr(E)) continue
          const O = v[E],
            x = p[E]
          O !== x && E !== 'value' && a(u, E, x, O, R, m.children, A, k, T)
        }
        'value' in v && a(u, 'value', p.value, v.value)
      }
    },
    Qe = (u, m, p, v, A, k, R, E, O) => {
      const x = (m.el = u ? u.el : s('')),
        j = (m.anchor = u ? u.anchor : s(''))
      let { patchFlag: N, dynamicChildren: U, slotScopeIds: K } = m
      K && (E = E ? E.concat(K) : K),
        u == null
          ? (r(x, p, v), r(j, p, v), Oe(m.children, p, j, A, k, R, E, O))
          : N > 0 && N & 64 && U && u.dynamicChildren
          ? (Re(u.dynamicChildren, U, p, A, k, R, E),
            (m.key != null || (A && m === A.subTree)) && Ns(u, m, !0))
          : q(u, m, p, j, A, k, R, E, O)
    },
    Bt = (u, m, p, v, A, k, R, E, O) => {
      ;(m.slotScopeIds = E),
        u == null
          ? m.shapeFlag & 512
            ? A.ctx.activate(m, p, v, R, O)
            : xt(m, p, v, A, k, R, O)
          : gn(u, m, O)
    },
    xt = (u, m, p, v, A, k, R) => {
      const E = (u.component = Rf(u, v, A))
      if ((ks(u) && (E.ctx.renderer = G), Tf(E), E.asyncDep)) {
        if ((A && A.registerDep(E, ue), !u.el)) {
          const O = (E.subTree = me(Nt))
          b(null, O, m, p)
        }
        return
      }
      ue(E, u, m, p, A, k, R)
    },
    gn = (u, m, p) => {
      const v = (m.component = u.component)
      if (Dc(u, m, p))
        if (v.asyncDep && !v.asyncResolved) {
          $(v, m, p)
          return
        } else (v.next = m), Nc(v.update), v.update()
      else (m.el = u.el), (v.vnode = m)
    },
    ue = (u, m, p, v, A, k, R) => {
      const E = () => {
          if (u.isMounted) {
            let { next: j, bu: N, u: U, parent: K, vnode: Y } = u,
              ee = j,
              Z
            Ct(u, !1),
              j ? ((j.el = Y.el), $(u, j, R)) : (j = Y),
              N && Xr(N),
              (Z = j.props && j.props.onVnodeBeforeUpdate) && Ge(Z, K, j, Y),
              Ct(u, !0)
            const de = qr(u),
              ze = u.subTree
            ;(u.subTree = de),
              I(ze, de, d(ze.el), _(ze), u, A, k),
              (j.el = de.el),
              ee === null && Hc(u, de.el),
              U && Ce(U, A),
              (Z = j.props && j.props.onVnodeUpdated) && Ce(() => Ge(Z, K, j, Y), A)
          } else {
            let j
            const { el: N, props: U } = m,
              { bm: K, m: Y, parent: ee } = u,
              Z = hr(m)
            if (
              (Ct(u, !1),
              K && Xr(K),
              !Z && (j = U && U.onVnodeBeforeMount) && Ge(j, ee, m),
              Ct(u, !0),
              N && H)
            ) {
              const de = () => {
                ;(u.subTree = qr(u)), H(N, u.subTree, u, A, null)
              }
              Z ? m.type.__asyncLoader().then(() => !u.isUnmounted && de()) : de()
            } else {
              const de = (u.subTree = qr(u))
              I(null, de, p, v, u, A, k), (m.el = de.el)
            }
            if ((Y && Ce(Y, A), !Z && (j = U && U.onVnodeMounted))) {
              const de = m
              Ce(() => Ge(j, ee, de), A)
            }
            ;(m.shapeFlag & 256 || (ee && hr(ee.vnode) && ee.vnode.shapeFlag & 256)) &&
              u.a &&
              Ce(u.a, A),
              (u.isMounted = !0),
              (m = p = v = null)
          }
        },
        O = (u.effect = new Ji(E, () => ra(x), u.scope)),
        x = (u.update = () => O.run())
      ;(x.id = u.uid), Ct(u, !0), x()
    },
    $ = (u, m, p) => {
      m.component = u
      const v = u.vnode.props
      ;(u.vnode = m), (u.next = null), mf(u, m.props, v, p), gf(u, m.children, p), dn(), La(), mn()
    },
    q = (u, m, p, v, A, k, R, E, O = !1) => {
      const x = u && u.children,
        j = u ? u.shapeFlag : 0,
        N = m.children,
        { patchFlag: U, shapeFlag: K } = m
      if (U > 0) {
        if (U & 128) {
          Et(x, N, p, v, A, k, R, E, O)
          return
        } else if (U & 256) {
          Ne(x, N, p, v, A, k, R, E, O)
          return
        }
      }
      K & 8
        ? (j & 16 && T(x, A, k), N !== x && c(p, N))
        : j & 16
        ? K & 16
          ? Et(x, N, p, v, A, k, R, E, O)
          : T(x, A, k, !0)
        : (j & 8 && c(p, ''), K & 16 && Oe(N, p, v, A, k, R, E, O))
    },
    Ne = (u, m, p, v, A, k, R, E, O) => {
      ;(u = u || Jt), (m = m || Jt)
      const x = u.length,
        j = m.length,
        N = Math.min(x, j)
      let U
      for (U = 0; U < N; U++) {
        const K = (m[U] = O ? ht(m[U]) : Xe(m[U]))
        I(u[U], K, p, null, A, k, R, E, O)
      }
      x > j ? T(u, A, k, !0, !1, N) : Oe(m, p, v, A, k, R, E, O, N)
    },
    Et = (u, m, p, v, A, k, R, E, O) => {
      let x = 0
      const j = m.length
      let N = u.length - 1,
        U = j - 1
      for (; x <= N && x <= U; ) {
        const K = u[x],
          Y = (m[x] = O ? ht(m[x]) : Xe(m[x]))
        if (bn(K, Y)) I(K, Y, p, null, A, k, R, E, O)
        else break
        x++
      }
      for (; x <= N && x <= U; ) {
        const K = u[N],
          Y = (m[U] = O ? ht(m[U]) : Xe(m[U]))
        if (bn(K, Y)) I(K, Y, p, null, A, k, R, E, O)
        else break
        N--, U--
      }
      if (x > N) {
        if (x <= U) {
          const K = U + 1,
            Y = K < j ? m[K].el : v
          for (; x <= U; ) I(null, (m[x] = O ? ht(m[x]) : Xe(m[x])), p, Y, A, k, R, E, O), x++
        }
      } else if (x > U) for (; x <= N; ) Ee(u[x], A, k, !0), x++
      else {
        const K = x,
          Y = x,
          ee = new Map()
        for (x = Y; x <= U; x++) {
          const _e = (m[x] = O ? ht(m[x]) : Xe(m[x]))
          _e.key != null && ee.set(_e.key, x)
        }
        let Z,
          de = 0
        const ze = U - Y + 1
        let Dt = !1,
          Pa = 0
        const vn = new Array(ze)
        for (x = 0; x < ze; x++) vn[x] = 0
        for (x = K; x <= N; x++) {
          const _e = u[x]
          if (de >= ze) {
            Ee(_e, A, k, !0)
            continue
          }
          let Ye
          if (_e.key != null) Ye = ee.get(_e.key)
          else
            for (Z = Y; Z <= U; Z++)
              if (vn[Z - Y] === 0 && bn(_e, m[Z])) {
                Ye = Z
                break
              }
          Ye === void 0
            ? Ee(_e, A, k, !0)
            : ((vn[Ye - Y] = x + 1),
              Ye >= Pa ? (Pa = Ye) : (Dt = !0),
              I(_e, m[Ye], p, null, A, k, R, E, O),
              de++)
        }
        const Sa = Dt ? wf(vn) : Jt
        for (Z = Sa.length - 1, x = ze - 1; x >= 0; x--) {
          const _e = Y + x,
            Ye = m[_e],
            Oa = _e + 1 < j ? m[_e + 1].el : v
          vn[x] === 0
            ? I(null, Ye, p, Oa, A, k, R, E, O)
            : Dt && (Z < 0 || x !== Sa[Z] ? Fe(Ye, p, Oa, 2) : Z--)
        }
      }
    },
    Fe = (u, m, p, v, A = null) => {
      const { el: k, type: R, transition: E, children: O, shapeFlag: x } = u
      if (x & 6) {
        Fe(u.component.subTree, m, p, v)
        return
      }
      if (x & 128) {
        u.suspense.move(m, p, v)
        return
      }
      if (x & 64) {
        R.move(u, m, p, G)
        return
      }
      if (R === Je) {
        r(k, m, p)
        for (let N = 0; N < O.length; N++) Fe(O[N], m, p, v)
        r(u.anchor, m, p)
        return
      }
      if (R === pr) {
        S(u, m, p)
        return
      }
      if (v !== 2 && x & 1 && E)
        if (v === 0) E.beforeEnter(k), r(k, m, p), Ce(() => E.enter(k), A)
        else {
          const { leave: N, delayLeave: U, afterLeave: K } = E,
            Y = () => r(k, m, p),
            ee = () => {
              N(k, () => {
                Y(), K && K()
              })
            }
          U ? U(k, Y, ee) : ee()
        }
      else r(k, m, p)
    },
    Ee = (u, m, p, v = !1, A = !1) => {
      const {
        type: k,
        props: R,
        ref: E,
        children: O,
        dynamicChildren: x,
        shapeFlag: j,
        patchFlag: N,
        dirs: U
      } = u
      if ((E != null && Ai(E, null, p, u, !0), j & 256)) {
        m.ctx.deactivate(u)
        return
      }
      const K = j & 1 && U,
        Y = !hr(u)
      let ee
      if ((Y && (ee = R && R.onVnodeBeforeUnmount) && Ge(ee, m, u), j & 6)) y(u.component, p, v)
      else {
        if (j & 128) {
          u.suspense.unmount(p, v)
          return
        }
        K && kt(u, null, m, 'beforeUnmount'),
          j & 64
            ? u.type.remove(u, m, p, A, G, v)
            : x && (k !== Je || (N > 0 && N & 64))
            ? T(x, m, p, !1, !0)
            : ((k === Je && N & 384) || (!A && j & 16)) && T(O, m, p),
          v && Kt(u)
      }
      ;((Y && (ee = R && R.onVnodeUnmounted)) || K) &&
        Ce(() => {
          ee && Ge(ee, m, u), K && kt(u, null, m, 'unmounted')
        }, p)
    },
    Kt = (u) => {
      const { type: m, el: p, anchor: v, transition: A } = u
      if (m === Je) {
        Xn(p, v)
        return
      }
      if (m === pr) {
        B(u)
        return
      }
      const k = () => {
        i(p), A && !A.persisted && A.afterLeave && A.afterLeave()
      }
      if (u.shapeFlag & 1 && A && !A.persisted) {
        const { leave: R, delayLeave: E } = A,
          O = () => R(p, k)
        E ? E(u.el, k, O) : O()
      } else k()
    },
    Xn = (u, m) => {
      let p
      for (; u !== m; ) (p = h(u)), i(u), (u = p)
      i(m)
    },
    y = (u, m, p) => {
      const { bum: v, scope: A, update: k, subTree: R, um: E } = u
      v && Xr(v),
        A.stop(),
        k && ((k.active = !1), Ee(R, u, m, p)),
        E && Ce(E, m),
        Ce(() => {
          u.isUnmounted = !0
        }, m),
        m &&
          m.pendingBranch &&
          !m.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === m.pendingId &&
          (m.deps--, m.deps === 0 && m.resolve())
    },
    T = (u, m, p, v = !1, A = !1, k = 0) => {
      for (let R = k; R < u.length; R++) Ee(u[R], m, p, v, A)
    },
    _ = (u) =>
      u.shapeFlag & 6
        ? _(u.component.subTree)
        : u.shapeFlag & 128
        ? u.suspense.next()
        : h(u.anchor || u.el),
    L = (u, m, p) => {
      u == null
        ? m._vnode && Ee(m._vnode, null, null, !0)
        : I(m._vnode || null, u, m, null, null, null, p),
        La(),
        ys(),
        (m._vnode = u)
    },
    G = { p: I, um: Ee, m: Fe, r: Kt, mt: xt, mc: Oe, pc: q, pbc: Re, n: _, o: e }
  let oe, H
  return t && ([oe, H] = t(G)), { render: L, hydrate: oe, createApp: bf(L, oe) }
}
function Ct({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function Ns(e, t, n = !1) {
  const r = e.children,
    i = t.children
  if (D(r) && D(i))
    for (let a = 0; a < r.length; a++) {
      const o = r[a]
      let s = i[a]
      s.shapeFlag & 1 &&
        !s.dynamicChildren &&
        ((s.patchFlag <= 0 || s.patchFlag === 32) && ((s = i[a] = ht(i[a])), (s.el = o.el)),
        n || Ns(o, s)),
        s.type === jr && (s.el = o.el)
    }
}
function wf(e) {
  const t = e.slice(),
    n = [0]
  let r, i, a, o, s
  const l = e.length
  for (r = 0; r < l; r++) {
    const f = e[r]
    if (f !== 0) {
      if (((i = n[n.length - 1]), e[i] < f)) {
        ;(t[r] = i), n.push(r)
        continue
      }
      for (a = 0, o = n.length - 1; a < o; ) (s = (a + o) >> 1), e[n[s]] < f ? (a = s + 1) : (o = s)
      f < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), (n[a] = r))
    }
  }
  for (a = n.length, o = n[a - 1]; a-- > 0; ) (n[a] = o), (o = t[o])
  return n
}
const xf = (e) => e.__isTeleport,
  Je = Symbol(void 0),
  jr = Symbol(void 0),
  Nt = Symbol(void 0),
  pr = Symbol(void 0),
  On = []
let Be = null
function nn(e = !1) {
  On.push((Be = e ? null : []))
}
function Ef() {
  On.pop(), (Be = On[On.length - 1] || null)
}
let jn = 1
function Qa(e) {
  jn += e
}
function Fs(e) {
  return (e.dynamicChildren = jn > 0 ? Be || Jt : null), Ef(), jn > 0 && Be && Be.push(e), e
}
function Ur(e, t, n, r, i, a) {
  return Fs(C(e, t, n, r, i, a, !0))
}
function zs(e, t, n, r, i) {
  return Fs(me(e, t, n, r, i, !0))
}
function wi(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function bn(e, t) {
  return e.type === t.type && e.key === t.key
}
const Br = '__vInternal',
  Ls = ({ key: e }) => e ?? null,
  gr = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null ? (ve(e) || ye(e) || W(e) ? { i: Ze, r: e, k: t, f: !!n } : e) : null
function C(e, t = null, n = null, r = 0, i = null, a = e === Je ? 0 : 1, o = !1, s = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ls(t),
    ref: t && gr(t),
    scopeId: zr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ze
  }
  return (
    s ? (sa(l, n), a & 128 && e.normalize(l)) : n && (l.shapeFlag |= ve(n) ? 8 : 16),
    jn > 0 && !o && Be && (l.patchFlag > 0 || a & 6) && l.patchFlag !== 32 && Be.push(l),
    l
  )
}
const me = kf
function kf(e, t = null, n = null, r = 0, i = null, a = !1) {
  if (((!e || e === af) && (e = Nt), wi(e))) {
    const s = rn(e, t, !0)
    return (
      n && sa(s, n),
      jn > 0 && !a && Be && (s.shapeFlag & 6 ? (Be[Be.indexOf(e)] = s) : Be.push(s)),
      (s.patchFlag |= -2),
      s
    )
  }
  if ((zf(e) && (e = e.__vccOpts), t)) {
    t = Cf(t)
    let { class: s, style: l } = t
    s && !ve(s) && (t.class = ge(s)),
      fe(l) && (fs(l) && !D(l) && (l = xe({}, l)), (t.style = Hi(l)))
  }
  const o = ve(e) ? 1 : Wc(e) ? 128 : xf(e) ? 64 : fe(e) ? 4 : W(e) ? 2 : 0
  return C(e, t, n, r, i, o, a, !0)
}
function Cf(e) {
  return e ? (fs(e) || Br in e ? xe({}, e) : e) : null
}
function rn(e, t, n = !1) {
  const { props: r, ref: i, patchFlag: a, children: o } = e,
    s = t ? Of(r || {}, t) : r
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && Ls(s),
    ref: t && t.ref ? (n && i ? (D(i) ? i.concat(gr(t)) : [i, gr(t)]) : gr(t)) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Je ? (a === -1 ? 16 : a | 16) : a,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && rn(e.ssContent),
    ssFallback: e.ssFallback && rn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  }
}
function Te(e = ' ', t = 0) {
  return me(jr, null, e, t)
}
function Pf(e, t) {
  const n = me(pr, null, e)
  return (n.staticCount = t), n
}
function Sf(e = '', t = !1) {
  return t ? (nn(), zs(Nt, null, e)) : me(Nt, null, e)
}
function Xe(e) {
  return e == null || typeof e == 'boolean'
    ? me(Nt)
    : D(e)
    ? me(Je, null, e.slice())
    : typeof e == 'object'
    ? ht(e)
    : me(jr, null, String(e))
}
function ht(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : rn(e)
}
function sa(e, t) {
  let n = 0
  const { shapeFlag: r } = e
  if (t == null) t = null
  else if (D(t)) n = 16
  else if (typeof t == 'object')
    if (r & 65) {
      const i = t.default
      i && (i._c && (i._d = !1), sa(e, i()), i._c && (i._d = !0))
      return
    } else {
      n = 32
      const i = t._
      !i && !(Br in t)
        ? (t._ctx = Ze)
        : i === 3 && Ze && (Ze.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    W(t)
      ? ((t = { default: t, _ctx: Ze }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Te(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Of(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    for (const i in r)
      if (i === 'class') t.class !== r.class && (t.class = ge([t.class, r.class]))
      else if (i === 'style') t.style = Hi([t.style, r.style])
      else if (Ir(i)) {
        const a = t[i],
          o = r[i]
        o && a !== o && !(D(a) && a.includes(o)) && (t[i] = a ? [].concat(a, o) : o)
      } else i !== '' && (t[i] = r[i])
  }
  return t
}
function Ge(e, t, n, r = null) {
  He(e, t, 7, [n, r])
}
const _f = Ms()
let If = 0
function Rf(e, t, n) {
  const r = e.type,
    i = (t ? t.appContext : e.appContext) || _f,
    a = {
      uid: If++,
      vnode: e,
      type: r,
      parent: t,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Zo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: _s(r, i),
      emitsOptions: ws(r, i),
      emit: null,
      emitted: null,
      propsDefaults: ae,
      inheritAttrs: r.inheritAttrs,
      ctx: ae,
      data: ae,
      props: ae,
      attrs: ae,
      slots: ae,
      refs: ae,
      setupState: ae,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    }
  return (
    (a.ctx = { _: a }), (a.root = t ? t.root : a), (a.emit = Lc.bind(null, a)), e.ce && e.ce(a), a
  )
}
let he = null
const an = (e) => {
    ;(he = e), e.scope.on()
  },
  Mt = () => {
    he && he.scope.off(), (he = null)
  }
function js(e) {
  return e.vnode.shapeFlag & 4
}
let Un = !1
function Tf(e, t = !1) {
  Un = t
  const { props: n, children: r } = e.vnode,
    i = js(e)
  df(e, n, i, t), pf(e, r)
  const a = i ? Mf(e, t) : void 0
  return (Un = !1), a
}
function Mf(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = ea(new Proxy(e.ctx, of)))
  const { setup: r } = n
  if (r) {
    const i = (e.setupContext = r.length > 1 ? Ff(e) : null)
    an(e), dn()
    const a = vt(r, e, 0, [e.props, i])
    if ((mn(), Mt(), Xo(a))) {
      if ((a.then(Mt, Mt), t))
        return a
          .then((o) => {
            Ya(e, o, t)
          })
          .catch((o) => {
            Nr(o, e, 0)
          })
      e.asyncDep = a
    } else Ya(e, a, t)
  } else Us(e, t)
}
function Ya(e, t, n) {
  W(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : fe(t) && (e.setupState = hs(t)),
    Us(e, n)
}
let Ga
function Us(e, t, n) {
  const r = e.type
  if (!e.render) {
    if (!t && Ga && !r.render) {
      const i = r.template || aa(e).template
      if (i) {
        const { isCustomElement: a, compilerOptions: o } = e.appContext.config,
          { delimiters: s, compilerOptions: l } = r,
          f = xe(xe({ isCustomElement: a, delimiters: s }, o), l)
        r.render = Ga(i, f)
      }
    }
    e.render = r.render || De
  }
  an(e), dn(), sf(e), mn(), Mt()
}
function Nf(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Se(e, 'get', '$attrs'), t[n]
    }
  })
}
function Ff(e) {
  const t = (r) => {
    e.exposed = r || {}
  }
  let n
  return {
    get attrs() {
      return n || (n = Nf(e))
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  }
}
function la(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(hs(ea(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n]
          if (n in Sn) return Sn[n](e)
        },
        has(t, n) {
          return n in t || n in Sn
        }
      }))
    )
}
function zf(e) {
  return W(e) && '__vccOpts' in e
}
const se = (e, t) => Rc(e, t, Un)
function Kr(e, t, n) {
  const r = arguments.length
  return r === 2
    ? fe(t) && !D(t)
      ? wi(t)
        ? me(e, null, [t])
        : me(e, t)
      : me(e, null, t)
    : (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && wi(n) && (n = [n]),
      me(e, t, n))
}
const Lf = Symbol(''),
  jf = () => rt(Lf),
  Uf = '3.2.47',
  Bf = 'http://www.w3.org/2000/svg',
  Ot = typeof document < 'u' ? document : null,
  Va = Ot && Ot.createElement('template'),
  Kf = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, r) => {
      const i = t ? Ot.createElementNS(Bf, e) : Ot.createElement(e, n ? { is: n } : void 0)
      return e === 'select' && r && r.multiple != null && i.setAttribute('multiple', r.multiple), i
    },
    createText: (e) => Ot.createTextNode(e),
    createComment: (e) => Ot.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ot.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, r, i, a) {
      const o = n ? n.previousSibling : t.lastChild
      if (i && (i === a || i.nextSibling))
        for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)); );
      else {
        Va.innerHTML = r ? `<svg>${e}</svg>` : e
        const s = Va.content
        if (r) {
          const l = s.firstChild
          for (; l.firstChild; ) s.appendChild(l.firstChild)
          s.removeChild(l)
        }
        t.insertBefore(s, n)
      }
      return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  }
function Df(e, t, n) {
  const r = e._vtc
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t)
}
function Hf(e, t, n) {
  const r = e.style,
    i = ve(n)
  if (n && !i) {
    if (t && !ve(t)) for (const a in t) n[a] == null && xi(r, a, '')
    for (const a in n) xi(r, a, n[a])
  } else {
    const a = r.display
    i ? t !== n && (r.cssText = n) : t && e.removeAttribute('style'), '_vod' in e && (r.display = a)
  }
}
const Ja = /\s*!important$/
function xi(e, t, n) {
  if (D(n)) n.forEach((r) => xi(e, t, r))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const r = Wf(e, t)
    Ja.test(n) ? e.setProperty(un(r), n.replace(Ja, ''), 'important') : (e[r] = n)
  }
}
const Xa = ['Webkit', 'Moz', 'ms'],
  $r = {}
function Wf(e, t) {
  const n = $r[t]
  if (n) return n
  let r = en(t)
  if (r !== 'filter' && r in e) return ($r[t] = r)
  r = qo(r)
  for (let i = 0; i < Xa.length; i++) {
    const a = Xa[i] + r
    if (a in e) return ($r[t] = a)
  }
  return t
}
const qa = 'http://www.w3.org/1999/xlink'
function Qf(e, t, n, r, i) {
  if (r && t.startsWith('xlink:'))
    n == null ? e.removeAttributeNS(qa, t.slice(6, t.length)) : e.setAttributeNS(qa, t, n)
  else {
    const a = Ul(t)
    n == null || (a && !Jo(n)) ? e.removeAttribute(t) : e.setAttribute(t, a ? '' : n)
  }
}
function Yf(e, t, n, r, i, a, o) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && o(r, i, a), (e[t] = n ?? '')
    return
  }
  if (t === 'value' && e.tagName !== 'PROGRESS' && !e.tagName.includes('-')) {
    e._value = n
    const l = n ?? ''
    ;(e.value !== l || e.tagName === 'OPTION') && (e.value = l), n == null && e.removeAttribute(t)
    return
  }
  let s = !1
  if (n === '' || n == null) {
    const l = typeof e[t]
    l === 'boolean'
      ? (n = Jo(n))
      : n == null && l === 'string'
      ? ((n = ''), (s = !0))
      : l === 'number' && ((n = 0), (s = !0))
  }
  try {
    e[t] = n
  } catch {}
  s && e.removeAttribute(t)
}
function Gf(e, t, n, r) {
  e.addEventListener(t, n, r)
}
function Vf(e, t, n, r) {
  e.removeEventListener(t, n, r)
}
function Jf(e, t, n, r, i = null) {
  const a = e._vei || (e._vei = {}),
    o = a[t]
  if (r && o) o.value = r
  else {
    const [s, l] = Xf(t)
    if (r) {
      const f = (a[t] = $f(r, i))
      Gf(e, s, f, l)
    } else o && (Vf(e, s, o, l), (a[t] = void 0))
  }
}
const Za = /(?:Once|Passive|Capture)$/
function Xf(e) {
  let t
  if (Za.test(e)) {
    t = {}
    let r
    for (; (r = e.match(Za)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : un(e.slice(2)), t]
}
let ei = 0
const qf = Promise.resolve(),
  Zf = () => ei || (qf.then(() => (ei = 0)), (ei = Date.now()))
function $f(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now()
    else if (r._vts <= n.attached) return
    He(eu(r, n.value), t, 5, [r])
  }
  return (n.value = e), (n.attached = Zf()), n
}
function eu(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((r) => (i) => !i._stopped && r && r(i))
    )
  } else return t
}
const $a = /^on[a-z]/,
  tu = (e, t, n, r, i = !1, a, o, s, l) => {
    t === 'class'
      ? Df(e, r, i)
      : t === 'style'
      ? Hf(e, n, r)
      : Ir(t)
      ? Wi(t) || Jf(e, t, n, r, o)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : nu(e, t, r, i)
        )
      ? Yf(e, t, r, a, o, s, l)
      : (t === 'true-value' ? (e._trueValue = r) : t === 'false-value' && (e._falseValue = r),
        Qf(e, t, r, i))
  }
function nu(e, t, n, r) {
  return r
    ? !!(t === 'innerHTML' || t === 'textContent' || (t in e && $a.test(t) && W(n)))
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      ($a.test(t) && ve(n))
    ? !1
    : t in e
}
const ru = xe({ patchProp: tu }, Kf)
let eo
function iu() {
  return eo || (eo = yf(ru))
}
const au = (...e) => {
  const t = iu().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (r) => {
      const i = ou(r)
      if (!i) return
      const a = t._component
      !W(a) && !a.render && !a.template && (a.template = i.innerHTML), (i.innerHTML = '')
      const o = n(i, !1, i instanceof SVGElement)
      return (
        i instanceof Element && (i.removeAttribute('v-cloak'), i.setAttribute('data-v-app', '')), o
      )
    }),
    t
  )
}
function ou(e) {
  return ve(e) ? document.querySelector(e) : e
}
var su = !1
/*!
 * pinia v2.0.33
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const lu = Symbol()
var to
;(function (e) {
  ;(e.direct = 'direct'), (e.patchObject = 'patch object'), (e.patchFunction = 'patch function')
})(to || (to = {}))
function cu() {
  const e = ql(!0),
    t = e.run(() => Tt({}))
  let n = [],
    r = []
  const i = ea({
    install(a) {
      ;(i._a = a),
        a.provide(lu, i),
        (a.config.globalProperties.$pinia = i),
        r.forEach((o) => n.push(o)),
        (r = [])
    },
    use(a) {
      return !this._a && !su ? r.push(a) : n.push(a), this
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t
  })
  return i
}
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const Wt = typeof window < 'u'
function fu(e) {
  return e.__esModule || e[Symbol.toStringTag] === 'Module'
}
const X = Object.assign
function ti(e, t) {
  const n = {}
  for (const r in t) {
    const i = t[r]
    n[r] = We(i) ? i.map(e) : e(i)
  }
  return n
}
const _n = () => {},
  We = Array.isArray,
  uu = /\/$/,
  du = (e) => e.replace(uu, '')
function ni(e, t, n = '/') {
  let r,
    i = {},
    a = '',
    o = ''
  const s = t.indexOf('#')
  let l = t.indexOf('?')
  return (
    s < l && s >= 0 && (l = -1),
    l > -1 && ((r = t.slice(0, l)), (a = t.slice(l + 1, s > -1 ? s : t.length)), (i = e(a))),
    s > -1 && ((r = r || t.slice(0, s)), (o = t.slice(s, t.length))),
    (r = gu(r ?? t, n)),
    { fullPath: r + (a && '?') + a + o, path: r, query: i, hash: o }
  )
}
function mu(e, t) {
  const n = t.query ? e(t.query) : ''
  return t.path + (n && '?') + n + (t.hash || '')
}
function no(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || '/'
}
function hu(e, t, n) {
  const r = t.matched.length - 1,
    i = n.matched.length - 1
  return (
    r > -1 &&
    r === i &&
    on(t.matched[r], n.matched[i]) &&
    Bs(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  )
}
function on(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function Bs(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const n in e) if (!pu(e[n], t[n])) return !1
  return !0
}
function pu(e, t) {
  return We(e) ? ro(e, t) : We(t) ? ro(t, e) : e === t
}
function ro(e, t) {
  return We(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t
}
function gu(e, t) {
  if (e.startsWith('/')) return e
  if (!e) return t
  const n = t.split('/'),
    r = e.split('/')
  let i = n.length - 1,
    a,
    o
  for (a = 0; a < r.length; a++)
    if (((o = r[a]), o !== '.'))
      if (o === '..') i > 1 && i--
      else break
  return n.slice(0, i).join('/') + '/' + r.slice(a - (a === r.length ? 1 : 0)).join('/')
}
var Bn
;(function (e) {
  ;(e.pop = 'pop'), (e.push = 'push')
})(Bn || (Bn = {}))
var In
;(function (e) {
  ;(e.back = 'back'), (e.forward = 'forward'), (e.unknown = '')
})(In || (In = {}))
function vu(e) {
  if (!e)
    if (Wt) {
      const t = document.querySelector('base')
      ;(e = (t && t.getAttribute('href')) || '/'), (e = e.replace(/^\w+:\/\/[^\/]+/, ''))
    } else e = '/'
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), du(e)
}
const bu = /^[^#]+#/
function yu(e, t) {
  return e.replace(bu, '#') + t
}
function Au(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect()
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0)
  }
}
const Dr = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function wu(e) {
  let t
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      i =
        typeof n == 'string'
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n
    if (!i) return
    t = Au(i, e)
  } else t = e
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      )
}
function io(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const Ei = new Map()
function xu(e, t) {
  Ei.set(e, t)
}
function Eu(e) {
  const t = Ei.get(e)
  return Ei.delete(e), t
}
let ku = () => location.protocol + '//' + location.host
function Ks(e, t) {
  const { pathname: n, search: r, hash: i } = t,
    a = e.indexOf('#')
  if (a > -1) {
    let s = i.includes(e.slice(a)) ? e.slice(a).length : 1,
      l = i.slice(s)
    return l[0] !== '/' && (l = '/' + l), no(l, '')
  }
  return no(n, e) + r + i
}
function Cu(e, t, n, r) {
  let i = [],
    a = [],
    o = null
  const s = ({ state: h }) => {
    const g = Ks(e, location),
      P = n.value,
      I = t.value
    let z = 0
    if (h) {
      if (((n.value = g), (t.value = h), o && o === P)) {
        o = null
        return
      }
      z = I ? h.position - I.position : 0
    } else r(g)
    i.forEach((b) => {
      b(n.value, P, {
        delta: z,
        type: Bn.pop,
        direction: z ? (z > 0 ? In.forward : In.back) : In.unknown
      })
    })
  }
  function l() {
    o = n.value
  }
  function f(h) {
    i.push(h)
    const g = () => {
      const P = i.indexOf(h)
      P > -1 && i.splice(P, 1)
    }
    return a.push(g), g
  }
  function c() {
    const { history: h } = window
    h.state && h.replaceState(X({}, h.state, { scroll: Dr() }), '')
  }
  function d() {
    for (const h of a) h()
    ;(a = []),
      window.removeEventListener('popstate', s),
      window.removeEventListener('beforeunload', c)
  }
  return (
    window.addEventListener('popstate', s),
    window.addEventListener('beforeunload', c),
    { pauseListeners: l, listen: f, destroy: d }
  )
}
function ao(e, t, n, r = !1, i = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: i ? Dr() : null
  }
}
function Pu(e) {
  const { history: t, location: n } = window,
    r = { value: Ks(e, n) },
    i = { value: t.state }
  i.value ||
    a(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
      },
      !0
    )
  function a(l, f, c) {
    const d = e.indexOf('#'),
      h = d > -1 ? (n.host && document.querySelector('base') ? e : e.slice(d)) + l : ku() + e + l
    try {
      t[c ? 'replaceState' : 'pushState'](f, '', h), (i.value = f)
    } catch (g) {
      console.error(g), n[c ? 'replace' : 'assign'](h)
    }
  }
  function o(l, f) {
    const c = X({}, t.state, ao(i.value.back, l, i.value.forward, !0), f, {
      position: i.value.position
    })
    a(l, c, !0), (r.value = l)
  }
  function s(l, f) {
    const c = X({}, i.value, t.state, { forward: l, scroll: Dr() })
    a(c.current, c, !0)
    const d = X({}, ao(r.value, l, null), { position: c.position + 1 }, f)
    a(l, d, !1), (r.value = l)
  }
  return { location: r, state: i, push: s, replace: o }
}
function Su(e) {
  e = vu(e)
  const t = Pu(e),
    n = Cu(e, t.state, t.location, t.replace)
  function r(a, o = !0) {
    o || n.pauseListeners(), history.go(a)
  }
  const i = X({ location: '', base: e, go: r, createHref: yu.bind(null, e) }, t, n)
  return (
    Object.defineProperty(i, 'location', { enumerable: !0, get: () => t.location.value }),
    Object.defineProperty(i, 'state', { enumerable: !0, get: () => t.state.value }),
    i
  )
}
function Ou(e) {
  return typeof e == 'string' || (e && typeof e == 'object')
}
function Ds(e) {
  return typeof e == 'string' || typeof e == 'symbol'
}
const dt = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0
  },
  Hs = Symbol('')
var oo
;(function (e) {
  ;(e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated')
})(oo || (oo = {}))
function sn(e, t) {
  return X(new Error(), { type: e, [Hs]: !0 }, t)
}
function et(e, t) {
  return e instanceof Error && Hs in e && (t == null || !!(e.type & t))
}
const so = '[^/]+?',
  _u = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Iu = /[.+*?^${}()[\]/\\]/g
function Ru(e, t) {
  const n = X({}, _u, t),
    r = []
  let i = n.start ? '^' : ''
  const a = []
  for (const f of e) {
    const c = f.length ? [] : [90]
    n.strict && !f.length && (i += '/')
    for (let d = 0; d < f.length; d++) {
      const h = f[d]
      let g = 40 + (n.sensitive ? 0.25 : 0)
      if (h.type === 0) d || (i += '/'), (i += h.value.replace(Iu, '\\$&')), (g += 40)
      else if (h.type === 1) {
        const { value: P, repeatable: I, optional: z, regexp: b } = h
        a.push({ name: P, repeatable: I, optional: z })
        const w = b || so
        if (w !== so) {
          g += 10
          try {
            new RegExp(`(${w})`)
          } catch (B) {
            throw new Error(`Invalid custom RegExp for param "${P}" (${w}): ` + B.message)
          }
        }
        let S = I ? `((?:${w})(?:/(?:${w}))*)` : `(${w})`
        d || (S = z && f.length < 2 ? `(?:/${S})` : '/' + S),
          z && (S += '?'),
          (i += S),
          (g += 20),
          z && (g += -8),
          I && (g += -20),
          w === '.*' && (g += -50)
      }
      c.push(g)
    }
    r.push(c)
  }
  if (n.strict && n.end) {
    const f = r.length - 1
    r[f][r[f].length - 1] += 0.7000000000000001
  }
  n.strict || (i += '/?'), n.end ? (i += '$') : n.strict && (i += '(?:/|$)')
  const o = new RegExp(i, n.sensitive ? '' : 'i')
  function s(f) {
    const c = f.match(o),
      d = {}
    if (!c) return null
    for (let h = 1; h < c.length; h++) {
      const g = c[h] || '',
        P = a[h - 1]
      d[P.name] = g && P.repeatable ? g.split('/') : g
    }
    return d
  }
  function l(f) {
    let c = '',
      d = !1
    for (const h of e) {
      ;(!d || !c.endsWith('/')) && (c += '/'), (d = !1)
      for (const g of h)
        if (g.type === 0) c += g.value
        else if (g.type === 1) {
          const { value: P, repeatable: I, optional: z } = g,
            b = P in f ? f[P] : ''
          if (We(b) && !I)
            throw new Error(
              `Provided param "${P}" is an array but it is not repeatable (* or + modifiers)`
            )
          const w = We(b) ? b.join('/') : b
          if (!w)
            if (z) h.length < 2 && (c.endsWith('/') ? (c = c.slice(0, -1)) : (d = !0))
            else throw new Error(`Missing required param "${P}"`)
          c += w
        }
    }
    return c || '/'
  }
  return { re: o, score: r, keys: a, parse: s, stringify: l }
}
function Tu(e, t) {
  let n = 0
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n]
    if (r) return r
    n++
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0
}
function Mu(e, t) {
  let n = 0
  const r = e.score,
    i = t.score
  for (; n < r.length && n < i.length; ) {
    const a = Tu(r[n], i[n])
    if (a) return a
    n++
  }
  if (Math.abs(i.length - r.length) === 1) {
    if (lo(r)) return 1
    if (lo(i)) return -1
  }
  return i.length - r.length
}
function lo(e) {
  const t = e[e.length - 1]
  return e.length > 0 && t[t.length - 1] < 0
}
const Nu = { type: 0, value: '' },
  Fu = /[a-zA-Z0-9_]/
function zu(e) {
  if (!e) return [[]]
  if (e === '/') return [[Nu]]
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`)
  function t(g) {
    throw new Error(`ERR (${n})/"${f}": ${g}`)
  }
  let n = 0,
    r = n
  const i = []
  let a
  function o() {
    a && i.push(a), (a = [])
  }
  let s = 0,
    l,
    f = '',
    c = ''
  function d() {
    f &&
      (n === 0
        ? a.push({ type: 0, value: f })
        : n === 1 || n === 2 || n === 3
        ? (a.length > 1 &&
            (l === '*' || l === '+') &&
            t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`),
          a.push({
            type: 1,
            value: f,
            regexp: c,
            repeatable: l === '*' || l === '+',
            optional: l === '*' || l === '?'
          }))
        : t('Invalid state to consume buffer'),
      (f = ''))
  }
  function h() {
    f += l
  }
  for (; s < e.length; ) {
    if (((l = e[s++]), l === '\\' && n !== 2)) {
      ;(r = n), (n = 4)
      continue
    }
    switch (n) {
      case 0:
        l === '/' ? (f && d(), o()) : l === ':' ? (d(), (n = 1)) : h()
        break
      case 4:
        h(), (n = r)
        break
      case 1:
        l === '('
          ? (n = 2)
          : Fu.test(l)
          ? h()
          : (d(), (n = 0), l !== '*' && l !== '?' && l !== '+' && s--)
        break
      case 2:
        l === ')' ? (c[c.length - 1] == '\\' ? (c = c.slice(0, -1) + l) : (n = 3)) : (c += l)
        break
      case 3:
        d(), (n = 0), l !== '*' && l !== '?' && l !== '+' && s--, (c = '')
        break
      default:
        t('Unknown state')
        break
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${f}"`), d(), o(), i
}
function Lu(e, t, n) {
  const r = Ru(zu(e.path), n),
    i = X(r, { record: e, parent: t, children: [], alias: [] })
  return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i
}
function ju(e, t) {
  const n = [],
    r = new Map()
  t = uo({ strict: !1, end: !0, sensitive: !1 }, t)
  function i(c) {
    return r.get(c)
  }
  function a(c, d, h) {
    const g = !h,
      P = Uu(c)
    P.aliasOf = h && h.record
    const I = uo(t, c),
      z = [P]
    if ('alias' in c) {
      const S = typeof c.alias == 'string' ? [c.alias] : c.alias
      for (const B of S)
        z.push(
          X({}, P, {
            components: h ? h.record.components : P.components,
            path: B,
            aliasOf: h ? h.record : P
          })
        )
    }
    let b, w
    for (const S of z) {
      const { path: B } = S
      if (d && B[0] !== '/') {
        const Q = d.record.path,
          ie = Q[Q.length - 1] === '/' ? '' : '/'
        S.path = d.record.path + (B && ie + B)
      }
      if (
        ((b = Lu(S, d, I)),
        h
          ? h.alias.push(b)
          : ((w = w || b), w !== b && w.alias.push(b), g && c.name && !fo(b) && o(c.name)),
        P.children)
      ) {
        const Q = P.children
        for (let ie = 0; ie < Q.length; ie++) a(Q[ie], b, h && h.children[ie])
      }
      ;(h = h || b),
        ((b.record.components && Object.keys(b.record.components).length) ||
          b.record.name ||
          b.record.redirect) &&
          l(b)
    }
    return w
      ? () => {
          o(w)
        }
      : _n
  }
  function o(c) {
    if (Ds(c)) {
      const d = r.get(c)
      d && (r.delete(c), n.splice(n.indexOf(d), 1), d.children.forEach(o), d.alias.forEach(o))
    } else {
      const d = n.indexOf(c)
      d > -1 &&
        (n.splice(d, 1),
        c.record.name && r.delete(c.record.name),
        c.children.forEach(o),
        c.alias.forEach(o))
    }
  }
  function s() {
    return n
  }
  function l(c) {
    let d = 0
    for (
      ;
      d < n.length && Mu(c, n[d]) >= 0 && (c.record.path !== n[d].record.path || !Ws(c, n[d]));

    )
      d++
    n.splice(d, 0, c), c.record.name && !fo(c) && r.set(c.record.name, c)
  }
  function f(c, d) {
    let h,
      g = {},
      P,
      I
    if ('name' in c && c.name) {
      if (((h = r.get(c.name)), !h)) throw sn(1, { location: c })
      ;(I = h.record.name),
        (g = X(
          co(
            d.params,
            h.keys.filter((w) => !w.optional).map((w) => w.name)
          ),
          c.params &&
            co(
              c.params,
              h.keys.map((w) => w.name)
            )
        )),
        (P = h.stringify(g))
    } else if ('path' in c)
      (P = c.path), (h = n.find((w) => w.re.test(P))), h && ((g = h.parse(P)), (I = h.record.name))
    else {
      if (((h = d.name ? r.get(d.name) : n.find((w) => w.re.test(d.path))), !h))
        throw sn(1, { location: c, currentLocation: d })
      ;(I = h.record.name), (g = X({}, d.params, c.params)), (P = h.stringify(g))
    }
    const z = []
    let b = h
    for (; b; ) z.unshift(b.record), (b = b.parent)
    return { name: I, path: P, params: g, matched: z, meta: Ku(z) }
  }
  return (
    e.forEach((c) => a(c)),
    { addRoute: a, resolve: f, removeRoute: o, getRoutes: s, getRecordMatcher: i }
  )
}
function co(e, t) {
  const n = {}
  for (const r of t) r in e && (n[r] = e[r])
  return n
}
function Uu(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Bu(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: 'components' in e ? e.components || null : e.component && { default: e.component }
  }
}
function Bu(e) {
  const t = {},
    n = e.props || !1
  if ('component' in e) t.default = n
  else for (const r in e.components) t[r] = typeof n == 'boolean' ? n : n[r]
  return t
}
function fo(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function Ku(e) {
  return e.reduce((t, n) => X(t, n.meta), {})
}
function uo(e, t) {
  const n = {}
  for (const r in e) n[r] = r in t ? t[r] : e[r]
  return n
}
function Ws(e, t) {
  return t.children.some((n) => n === e || Ws(e, n))
}
const Qs = /#/g,
  Du = /&/g,
  Hu = /\//g,
  Wu = /=/g,
  Qu = /\?/g,
  Ys = /\+/g,
  Yu = /%5B/g,
  Gu = /%5D/g,
  Gs = /%5E/g,
  Vu = /%60/g,
  Vs = /%7B/g,
  Ju = /%7C/g,
  Js = /%7D/g,
  Xu = /%20/g
function ca(e) {
  return encodeURI('' + e)
    .replace(Ju, '|')
    .replace(Yu, '[')
    .replace(Gu, ']')
}
function qu(e) {
  return ca(e).replace(Vs, '{').replace(Js, '}').replace(Gs, '^')
}
function ki(e) {
  return ca(e)
    .replace(Ys, '%2B')
    .replace(Xu, '+')
    .replace(Qs, '%23')
    .replace(Du, '%26')
    .replace(Vu, '`')
    .replace(Vs, '{')
    .replace(Js, '}')
    .replace(Gs, '^')
}
function Zu(e) {
  return ki(e).replace(Wu, '%3D')
}
function $u(e) {
  return ca(e).replace(Qs, '%23').replace(Qu, '%3F')
}
function ed(e) {
  return e == null ? '' : $u(e).replace(Hu, '%2F')
}
function Er(e) {
  try {
    return decodeURIComponent('' + e)
  } catch {}
  return '' + e
}
function td(e) {
  const t = {}
  if (e === '' || e === '?') return t
  const r = (e[0] === '?' ? e.slice(1) : e).split('&')
  for (let i = 0; i < r.length; ++i) {
    const a = r[i].replace(Ys, ' '),
      o = a.indexOf('='),
      s = Er(o < 0 ? a : a.slice(0, o)),
      l = o < 0 ? null : Er(a.slice(o + 1))
    if (s in t) {
      let f = t[s]
      We(f) || (f = t[s] = [f]), f.push(l)
    } else t[s] = l
  }
  return t
}
function mo(e) {
  let t = ''
  for (let n in e) {
    const r = e[n]
    if (((n = Zu(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n)
      continue
    }
    ;(We(r) ? r.map((a) => a && ki(a)) : [r && ki(r)]).forEach((a) => {
      a !== void 0 && ((t += (t.length ? '&' : '') + n), a != null && (t += '=' + a))
    })
  }
  return t
}
function nd(e) {
  const t = {}
  for (const n in e) {
    const r = e[n]
    r !== void 0 &&
      (t[n] = We(r) ? r.map((i) => (i == null ? null : '' + i)) : r == null ? r : '' + r)
  }
  return t
}
const rd = Symbol(''),
  ho = Symbol(''),
  fa = Symbol(''),
  Xs = Symbol(''),
  Ci = Symbol('')
function yn() {
  let e = []
  function t(r) {
    return (
      e.push(r),
      () => {
        const i = e.indexOf(r)
        i > -1 && e.splice(i, 1)
      }
    )
  }
  function n() {
    e = []
  }
  return { add: t, list: () => e, reset: n }
}
function pt(e, t, n, r, i) {
  const a = r && (r.enterCallbacks[i] = r.enterCallbacks[i] || [])
  return () =>
    new Promise((o, s) => {
      const l = (d) => {
          d === !1
            ? s(sn(4, { from: n, to: t }))
            : d instanceof Error
            ? s(d)
            : Ou(d)
            ? s(sn(2, { from: t, to: d }))
            : (a && r.enterCallbacks[i] === a && typeof d == 'function' && a.push(d), o())
        },
        f = e.call(r && r.instances[i], t, n, l)
      let c = Promise.resolve(f)
      e.length < 3 && (c = c.then(l)), c.catch((d) => s(d))
    })
}
function ri(e, t, n, r) {
  const i = []
  for (const a of e)
    for (const o in a.components) {
      let s = a.components[o]
      if (!(t !== 'beforeRouteEnter' && !a.instances[o]))
        if (id(s)) {
          const f = (s.__vccOpts || s)[t]
          f && i.push(pt(f, n, r, a, o))
        } else {
          let l = s()
          i.push(() =>
            l.then((f) => {
              if (!f)
                return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${a.path}"`))
              const c = fu(f) ? f.default : f
              a.components[o] = c
              const h = (c.__vccOpts || c)[t]
              return h && pt(h, n, r, a, o)()
            })
          )
        }
    }
  return i
}
function id(e) {
  return typeof e == 'object' || 'displayName' in e || 'props' in e || '__vccOpts' in e
}
function po(e) {
  const t = rt(fa),
    n = rt(Xs),
    r = se(() => t.resolve(te(e.to))),
    i = se(() => {
      const { matched: l } = r.value,
        { length: f } = l,
        c = l[f - 1],
        d = n.matched
      if (!c || !d.length) return -1
      const h = d.findIndex(on.bind(null, c))
      if (h > -1) return h
      const g = go(l[f - 2])
      return f > 1 && go(c) === g && d[d.length - 1].path !== g
        ? d.findIndex(on.bind(null, l[f - 2]))
        : h
    }),
    a = se(() => i.value > -1 && sd(n.params, r.value.params)),
    o = se(() => i.value > -1 && i.value === n.matched.length - 1 && Bs(n.params, r.value.params))
  function s(l = {}) {
    return od(l) ? t[te(e.replace) ? 'replace' : 'push'](te(e.to)).catch(_n) : Promise.resolve()
  }
  return { route: r, href: se(() => r.value.href), isActive: a, isExactActive: o, navigate: s }
}
const ad = hn({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' }
    },
    useLink: po,
    setup(e, { slots: t }) {
      const n = Yn(po(e)),
        { options: r } = rt(fa),
        i = se(() => ({
          [vo(e.activeClass, r.linkActiveClass, 'router-link-active')]: n.isActive,
          [vo(e.exactActiveClass, r.linkExactActiveClass, 'router-link-exact-active')]:
            n.isExactActive
        }))
      return () => {
        const a = t.default && t.default(n)
        return e.custom
          ? a
          : Kr(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: i.value
              },
              a
            )
      }
    }
  }),
  xn = ad
function od(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target')
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}
function sd(e, t) {
  for (const n in t) {
    const r = t[n],
      i = e[n]
    if (typeof r == 'string') {
      if (r !== i) return !1
    } else if (!We(i) || i.length !== r.length || r.some((a, o) => a !== i[o])) return !1
  }
  return !0
}
function go(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ''
}
const vo = (e, t, n) => e ?? t ?? n,
  ld = hn({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = rt(Ci),
        i = se(() => e.route || r.value),
        a = rt(ho, 0),
        o = se(() => {
          let f = te(a)
          const { matched: c } = i.value
          let d
          for (; (d = c[f]) && !d.components; ) f++
          return f
        }),
        s = se(() => i.value.matched[o.value])
      mr(
        ho,
        se(() => o.value + 1)
      ),
        mr(rd, s),
        mr(Ci, i)
      const l = Tt()
      return (
        Pn(
          () => [l.value, s.value, e.name],
          ([f, c, d], [h, g, P]) => {
            c &&
              ((c.instances[d] = f),
              g &&
                g !== c &&
                f &&
                f === h &&
                (c.leaveGuards.size || (c.leaveGuards = g.leaveGuards),
                c.updateGuards.size || (c.updateGuards = g.updateGuards))),
              f && c && (!g || !on(c, g) || !h) && (c.enterCallbacks[d] || []).forEach((I) => I(f))
          },
          { flush: 'post' }
        ),
        () => {
          const f = i.value,
            c = e.name,
            d = s.value,
            h = d && d.components[c]
          if (!h) return bo(n.default, { Component: h, route: f })
          const g = d.props[c],
            P = g ? (g === !0 ? f.params : typeof g == 'function' ? g(f) : g) : null,
            z = Kr(
              h,
              X({}, P, t, {
                onVnodeUnmounted: (b) => {
                  b.component.isUnmounted && (d.instances[c] = null)
                },
                ref: l
              })
            )
          return bo(n.default, { Component: z, route: f }) || z
        }
      )
    }
  })
function bo(e, t) {
  if (!e) return null
  const n = e(t)
  return n.length === 1 ? n[0] : n
}
const qs = ld
function cd(e) {
  const t = ju(e.routes, e),
    n = e.parseQuery || td,
    r = e.stringifyQuery || mo,
    i = e.history,
    a = yn(),
    o = yn(),
    s = yn(),
    l = Sc(dt)
  let f = dt
  Wt && e.scrollBehavior && 'scrollRestoration' in history && (history.scrollRestoration = 'manual')
  const c = ti.bind(null, (y) => '' + y),
    d = ti.bind(null, ed),
    h = ti.bind(null, Er)
  function g(y, T) {
    let _, L
    return Ds(y) ? ((_ = t.getRecordMatcher(y)), (L = T)) : (L = y), t.addRoute(L, _)
  }
  function P(y) {
    const T = t.getRecordMatcher(y)
    T && t.removeRoute(T)
  }
  function I() {
    return t.getRoutes().map((y) => y.record)
  }
  function z(y) {
    return !!t.getRecordMatcher(y)
  }
  function b(y, T) {
    if (((T = X({}, T || l.value)), typeof y == 'string')) {
      const u = ni(n, y, T.path),
        m = t.resolve({ path: u.path }, T),
        p = i.createHref(u.fullPath)
      return X(u, m, { params: h(m.params), hash: Er(u.hash), redirectedFrom: void 0, href: p })
    }
    let _
    if ('path' in y) _ = X({}, y, { path: ni(n, y.path, T.path).path })
    else {
      const u = X({}, y.params)
      for (const m in u) u[m] == null && delete u[m]
      ;(_ = X({}, y, { params: d(y.params) })), (T.params = d(T.params))
    }
    const L = t.resolve(_, T),
      G = y.hash || ''
    L.params = c(h(L.params))
    const oe = mu(r, X({}, y, { hash: qu(G), path: L.path })),
      H = i.createHref(oe)
    return X({ fullPath: oe, hash: G, query: r === mo ? nd(y.query) : y.query || {} }, L, {
      redirectedFrom: void 0,
      href: H
    })
  }
  function w(y) {
    return typeof y == 'string' ? ni(n, y, l.value.path) : X({}, y)
  }
  function S(y, T) {
    if (f !== y) return sn(8, { from: T, to: y })
  }
  function B(y) {
    return le(y)
  }
  function Q(y) {
    return B(X(w(y), { replace: !0 }))
  }
  function ie(y) {
    const T = y.matched[y.matched.length - 1]
    if (T && T.redirect) {
      const { redirect: _ } = T
      let L = typeof _ == 'function' ? _(y) : _
      return (
        typeof L == 'string' &&
          ((L = L.includes('?') || L.includes('#') ? (L = w(L)) : { path: L }), (L.params = {})),
        X({ query: y.query, hash: y.hash, params: 'path' in L ? {} : y.params }, L)
      )
    }
  }
  function le(y, T) {
    const _ = (f = b(y)),
      L = l.value,
      G = y.state,
      oe = y.force,
      H = y.replace === !0,
      u = ie(_)
    if (u)
      return le(
        X(w(u), { state: typeof u == 'object' ? X({}, G, u.state) : G, force: oe, replace: H }),
        T || _
      )
    const m = _
    m.redirectedFrom = T
    let p
    return (
      !oe && hu(r, L, _) && ((p = sn(16, { to: m, from: L })), Et(L, L, !0, !1)),
      (p ? Promise.resolve(p) : Ae(m, L))
        .catch((v) => (et(v) ? (et(v, 2) ? v : Ne(v)) : $(v, m, L)))
        .then((v) => {
          if (v) {
            if (et(v, 2))
              return le(
                X({ replace: H }, w(v.to), {
                  state: typeof v.to == 'object' ? X({}, G, v.to.state) : G,
                  force: oe
                }),
                T || m
              )
          } else v = ft(m, L, !0, H, G)
          return Re(m, L, v), v
        })
    )
  }
  function Oe(y, T) {
    const _ = S(y, T)
    return _ ? Promise.reject(_) : Promise.resolve()
  }
  function Ae(y, T) {
    let _
    const [L, G, oe] = fd(y, T)
    _ = ri(L.reverse(), 'beforeRouteLeave', y, T)
    for (const u of L)
      u.leaveGuards.forEach((m) => {
        _.push(pt(m, y, T))
      })
    const H = Oe.bind(null, y, T)
    return (
      _.push(H),
      Ht(_)
        .then(() => {
          _ = []
          for (const u of a.list()) _.push(pt(u, y, T))
          return _.push(H), Ht(_)
        })
        .then(() => {
          _ = ri(G, 'beforeRouteUpdate', y, T)
          for (const u of G)
            u.updateGuards.forEach((m) => {
              _.push(pt(m, y, T))
            })
          return _.push(H), Ht(_)
        })
        .then(() => {
          _ = []
          for (const u of y.matched)
            if (u.beforeEnter && !T.matched.includes(u))
              if (We(u.beforeEnter)) for (const m of u.beforeEnter) _.push(pt(m, y, T))
              else _.push(pt(u.beforeEnter, y, T))
          return _.push(H), Ht(_)
        })
        .then(
          () => (
            y.matched.forEach((u) => (u.enterCallbacks = {})),
            (_ = ri(oe, 'beforeRouteEnter', y, T)),
            _.push(H),
            Ht(_)
          )
        )
        .then(() => {
          _ = []
          for (const u of o.list()) _.push(pt(u, y, T))
          return _.push(H), Ht(_)
        })
        .catch((u) => (et(u, 8) ? u : Promise.reject(u)))
    )
  }
  function Re(y, T, _) {
    for (const L of s.list()) L(y, T, _)
  }
  function ft(y, T, _, L, G) {
    const oe = S(y, T)
    if (oe) return oe
    const H = T === dt,
      u = Wt ? history.state : {}
    _ &&
      (L || H
        ? i.replace(y.fullPath, X({ scroll: H && u && u.scroll }, G))
        : i.push(y.fullPath, G)),
      (l.value = y),
      Et(y, T, _, H),
      Ne()
  }
  let Qe
  function Bt() {
    Qe ||
      (Qe = i.listen((y, T, _) => {
        if (!Xn.listening) return
        const L = b(y),
          G = ie(L)
        if (G) {
          le(X(G, { replace: !0 }), L).catch(_n)
          return
        }
        f = L
        const oe = l.value
        Wt && xu(io(oe.fullPath, _.delta), Dr()),
          Ae(L, oe)
            .catch((H) =>
              et(H, 12)
                ? H
                : et(H, 2)
                ? (le(H.to, L)
                    .then((u) => {
                      et(u, 20) && !_.delta && _.type === Bn.pop && i.go(-1, !1)
                    })
                    .catch(_n),
                  Promise.reject())
                : (_.delta && i.go(-_.delta, !1), $(H, L, oe))
            )
            .then((H) => {
              ;(H = H || ft(L, oe, !1)),
                H &&
                  (_.delta && !et(H, 8)
                    ? i.go(-_.delta, !1)
                    : _.type === Bn.pop && et(H, 20) && i.go(-1, !1)),
                Re(L, oe, H)
            })
            .catch(_n)
      }))
  }
  let xt = yn(),
    gn = yn(),
    ue
  function $(y, T, _) {
    Ne(y)
    const L = gn.list()
    return L.length ? L.forEach((G) => G(y, T, _)) : console.error(y), Promise.reject(y)
  }
  function q() {
    return ue && l.value !== dt
      ? Promise.resolve()
      : new Promise((y, T) => {
          xt.add([y, T])
        })
  }
  function Ne(y) {
    return ue || ((ue = !y), Bt(), xt.list().forEach(([T, _]) => (y ? _(y) : T())), xt.reset()), y
  }
  function Et(y, T, _, L) {
    const { scrollBehavior: G } = e
    if (!Wt || !G) return Promise.resolve()
    const oe =
      (!_ && Eu(io(y.fullPath, 0))) || ((L || !_) && history.state && history.state.scroll) || null
    return vs()
      .then(() => G(y, T, oe))
      .then((H) => H && wu(H))
      .catch((H) => $(H, y, T))
  }
  const Fe = (y) => i.go(y)
  let Ee
  const Kt = new Set(),
    Xn = {
      currentRoute: l,
      listening: !0,
      addRoute: g,
      removeRoute: P,
      hasRoute: z,
      getRoutes: I,
      resolve: b,
      options: e,
      push: B,
      replace: Q,
      go: Fe,
      back: () => Fe(-1),
      forward: () => Fe(1),
      beforeEach: a.add,
      beforeResolve: o.add,
      afterEach: s.add,
      onError: gn.add,
      isReady: q,
      install(y) {
        const T = this
        y.component('RouterLink', xn),
          y.component('RouterView', qs),
          (y.config.globalProperties.$router = T),
          Object.defineProperty(y.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => te(l)
          }),
          Wt && !Ee && l.value === dt && ((Ee = !0), B(i.location).catch((G) => {}))
        const _ = {}
        for (const G in dt) _[G] = se(() => l.value[G])
        y.provide(fa, T), y.provide(Xs, Yn(_)), y.provide(Ci, l)
        const L = y.unmount
        Kt.add(y),
          (y.unmount = function () {
            Kt.delete(y),
              Kt.size < 1 &&
                ((f = dt), Qe && Qe(), (Qe = null), (l.value = dt), (Ee = !1), (ue = !1)),
              L()
          })
      }
    }
  return Xn
}
function Ht(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve())
}
function fd(e, t) {
  const n = [],
    r = [],
    i = [],
    a = Math.max(t.matched.length, e.matched.length)
  for (let o = 0; o < a; o++) {
    const s = t.matched[o]
    s && (e.matched.find((f) => on(f, s)) ? r.push(s) : n.push(s))
    const l = e.matched[o]
    l && (t.matched.find((f) => on(f, l)) || i.push(l))
  }
  return [n, r, i]
}
const ii = '/website_webimpact/assets/webimpact-logo-5d08b375.png',
  ud = '/website_webimpact/assets/webimpact-logo-half-19dd835c.png',
  dd =
    'data:image/png;base64,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',
  md =
    'data:image/png;base64,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',
  hd =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAiASURBVHgB1Zt7cFR3Fce/53d372bDK4Eku0QeobxFq0AGURmlYtVpR8fWIQIpIZs4Op0K41v4AwyMCLX1MZZSUfLgNUQYy+BYaFFHUcSWQgstj/AqkQAJUHk0JY/dvfd47ioUSkiy97HZfGZ27mPv3fs75/5+53cevyV4TEE1Z5iECTEDk5XCeNkPETDURxjEYF1TkFPUEjNxrb+PrzHRiQ9kxOryg3RsQe6h/YWFhTF4CMED8p/loWYGZjHhC3L4Mfn0gQ0GBrhdV+aegUF6vmh4dMfjE4P1cBnXFDBqBweaL+IR2f0GGNPhMkGNo60G1eRnxla/Pks/BJdwrID8NZxp+vFNBr4rh3lIAQENfw7r8WX7Zvv/AYc4UkBeJT8i4/qXzBiGHiDo461tBv2gKUL1sIktBeRUcr4iVMnNn0cPI+1olXYsvRChJ2GDpBUQquYvkokqMXA5SCMCiv8ZN2n2hTJqSOY+lczFeVW8RAzcH9JNeIt2kz5pgvdMqI1+JJn7fN26ipnyavAMMZ5AipCu3SKbSxrhHbExV+RVtWhAwicwAU38Bl18iT7Spr5yKjfOyGPQsOvt/u1yXNDd53SpgIoKVqurUEmEUnhD3K/hKJv4l9JwsH8Ab8ZNnKmbhSYiGWzdpIJZ7dqGHD0D+jl0ny5tQF41r3L7zcvbbdYVvyROzvN94s07D0ayr6GH6LQHiPAVbgqfoeGwbJ67EceGxohqRhpwzx4QruJ54tzUwAVkHJ/sr2Nh3RxsA4lK04gOFRCu5gKx9vukpblw9uNxvw8r87IaVxz4Un4L0pAOh4AIvgkOhZdxXi+R3lcbSmhfUhNzirlLAaEa/rrMM5+AA8Q9Piz2+6Fz8yidZU9wxxDI+y2HSMMrsjscNpEfPJ6TgU8fnkMX0Qu4wxMkhQVwILxQLz/4YG8R3uJWDwit5zzEE9OU3bFvDOuLGa8W0W70Im71AI4nkhm2DZ9Pw5reJrzFLQVIV/g+bOInvtIex3L0QhKzgCQ2Pi6bkbCJJDLXv11OF+AyozbwJMPEjCjjfgKPjzFlyRvT5asWmWavyvY/MuOcUGwc1TTtUEkxXq8giifzjIQNkDB3tew8Dpv0CWDMW8V0Ei5x30aeEY3jxxLxTU3mPlHKDdnsFf9ji3xe+PdcauzqnoQCQpV8TPbGwQY+hYPnS2kiXGLYOl7ZbuCHcIj0jFYJo9f6Taxs6KR3qvBz4vbaFN5CwmTHicmbDKnhpW4Ib2GaCIoC5rPGh4dWG9+513VKMrofhQMkwtsHF5i4hT8oXX4JXCZmUnaU1c8K1vFf8qt46Pu/VzJWpsABYv3PwgUu3cB8eEirgc8YwN/vr+UP3X5eScolqRza++mrxd6FC0g7JsB7Ci634JXRNfHZN0+I4cQgOCCT2JXanV8hJQkSUXTmO6a24b4NnFCCkgyvo6LGdZCtut9dMPYjdWg3YnhGCrfiVzCy4YBozD8ULjAuq3WtBm5H6hgkHtNcyxXW4QCf374HeTu7vpzZoPv4J0ghUpefmFRhpCPEYyuES9SXaMuk8LkOKUJjM9NSQBscIHP39IojRxz1ott5Ori1XOoETyEFGFCtJG7wefEE8+EAmUo+1Rgh1zxCi8GV/BXpok8jiSpPsogT93Mlwl+BQ4IayuAyjeX0++rwqXEyS5X4Fb8MDzAM8yJJCnyz+Myz4ACZSlr8ARpytpiuwiPGb+LRMQNl78bwqChlDFygr45HldTk3oJDTFBmLGp+Gx5yTMLtUyW0qKmcxvbzYbpEoRu1/4W/tlExnFGSBXZlvY0UkL81cTM7siXdRRSxW0LwuWMCzQXWEJEq8WtIErFb0Qc+jCOU+yyHVRBdJg66Q1Bha30pFaEHGLcpOvlau3++hOdFJiPY1fWigN1iuKery09QkxzXwQVaTcwctSlejB6grlg/0FRGpboPIwcGTCv+P93Z9QGYf7O2CUdIypXb4RLNbdqvxtWyK0bKDlYa7Fix9ouLZTRKpJsjAnY4xHVl7LC2iZRYbiVPUy5mdoTTGvBAsut1vGL0Zn64LcqLowZZizatF37CMqbWfqIHXC6nPRIUvQH3GCnJh792lIHpCU7Ophca5qmpA3TjIZk5XuuXYW65+d17hRGZVuAuI8VC75lcy5OQJpx4zLfzQoQmX21TP7157lZpLHsNDxADUi9nsuAuUbHMS5psruPzmjurw9W8WMbHMniAdL2DA9BedCyS4Vr9wA3uUEBOJfcT43Vczg6GN4hpSKw4W+Fkeaub3LVEJlzJRTJ2fwcPkYdGrfVHAcaTZ8vJsSvusC13I0rY+f+1/p6ja9ium/Ffn474X0QP0KECcsSn11oT/nUIqWqIzM3ZurnxekzVpNJ/uOcyufxK/pxBeBEe/avkXsjQMDTiP1Gc1i//LLZFRpCjjFVXdCpcqJoXSotWoIeQkPdS3MSWIXr0NwceC7wJD+jy7Q6u5hUSXS1ED+Mn7JV2rDofQS25uNiyW907XMVPyRO/h/SgPujHytLxjRsqCp0vvuz2+JbU2TJJnS1G+lAvnuvShhKqgQOSMnChKl4km+VIsWHsDHGq3ggpzDw0j07ABkkLEl7LUyRwshylAqQP0UF+TDg6l04hSZKuDDV9jfbFNUyTOyuRBkiM0aIrc6Ed4S0cdeVwDT8sWeVV6KHeIHHLHyVDvOB4CZ2BTVwZy2IgS8Vf+BGnShGEXWKQl14qo71wiKvGLLyeZyKOcvbm/4TXgj7UGgaqGiL0KlzCE2s+eC0PN/14UEmWWN7UNFFIJmwgJbcbeUHj5XCQX5qUG9tcMTUzmf9DdQvvpzNmFarBFJ+k7iXCHC/HY02mLHFzsxVxkKwlfVKkkOLG24ZJ5/rpZpMYtrrCrLb9i8ZeOjpixAhPY4H/Amzw3bWhDRsfAAAAAElFTkSuQmCC',
  pd =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAA3CAYAAACrbNxuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARSSURBVHgB7ZtraBxFHMD/s3u792hel0t69NKaNAoNFK8W+jCk4IdCg4pVqIJffFAFQfwmiCBCQOsHRSk1SuKjYkMK1VaCVUj7xX6wcEYjJTUFQZsmTdreXS/3yO7e7WumuxeuJGUvmbscSZub33F3uzNze7e/ndn/3O4MggVs29kV0gztMCB0CBH0MCZ4A4IqAXEaATLDIzTkEYRj46O/Ty3KLiw89NiuLh5zg0CgFaocAnATYXh3YnzkRCEtL+qRHbt2Ysydswo0A6OAgXl4bvLSyK/2Ctrc2ekVZPOKpbENGPeSUEWz48bo6G1OVMxXmKSiBDw6/5a9wAEhB4GxBOSQ/coRQB3AWIK8H2TXKD8wikIIuMLhsM+1oIdQEdxu0WzZtEkulp9Kp8XZZMrT6G/INdTXa1AGiWTSnU5n3Pbyls2hOcElEKdy6bk5IZGY9cIKMc1G5IIKs71jm3l64Ju6YvnvH/nYHDx1Bj547x3Xkwf2e6AMPv28T/vi6++gpqZGHT5zUvR6vW6ncke/7JeO9R2HSsABgwomihImihImipKKn8xpic8mzanrM7iwbkUvDiHn4KJpun4rGrsb2VKZDIFVZs1E9Xz0yaJI9U/kQsLn8wacyl4aG8+9ePiNWlhDWNOjhImihImihImihImihImihImihImihImihImihImihImihImihImipKTLLBubAhJCzm5lWRElRRZhnUItKrix2bh4/qyH45wvrvV+dRw+6+2H9QprepQwUZQwUZQwUZQwUZQwUZQwUZRUTJTX49Htd95iqXJk1W9dVgbqDqeJMc4PLC4ynurZp7vNH4d+QQef6rbHPPmKbUfT1FUbur61tc3oenx35m4CIejiH3+VdSOVWpSu60TVdKvmOA5FgqZAwDP800nbpG+p7UiSkluuTKWwDl6D9VyU1h7eC+VA3fRkWRaSqdRyYpetLZPXp3l4AKEWZRgmd3n8igwrQMlm1Ylrk+tblM3Q2XMrOvl/P/iDnlPVNRsYshJK2vHzv12o+fe//1UogxvRqD5w6nRZYzbvB0o6usSK7c+/9Dr35muvZrv3P8G3hEIgioKIEHIqa2ZzOTMai+PIn6PQ9+0J/lY0VvT7TGzHVWI45hGjaKfC/oz1pGvO8z+zrBqN2h/dEytnspAtp76uTvP7G/ja2g2qWxTtfUW6bnBKVhEVJYvmJMWUZEkkFJ2npka/zvMux2CgaipJpTOCU16wudmAEojG4yWL8uFWN9oa3hOxukflxczqYHri8sgWzjqEw8AoDpn3w5m6u9+SJQHDCYPnyVF7gU/fnpL8wRa7t3wAKj3f40EHod6rY/OzQPPRIhmbifiDIeu/HNpXSKtyiPUY8GHf2/H4tfx8nUU1qH3H3n0E4yNWcqe1KkD1YVpC/iaI+3BiLPLzwgynpobatu8OAuFbEW+6oRqwOhgGB1kBcPTlF56Z7unpwfcWuQNFVH0OHSZ68wAAAABJRU5ErkJggg==',
  gd =
    'data:image/png;base64,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',
  vd =
    'data:image/png;base64,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'
const bd = (e, t) => {
    const n = e.__vccOpts || e
    for (const [r, i] of t) n[r] = i
    return n
  },
  Me = (e) => (jc('data-v-ae6ae1b9'), (e = e()), Uc(), e),
  yd = { ref: 'dropdown', class: 'services absolute flex items-center overflow-hidden' },
  Ad = { class: 'container relative grid grid-cols-8 gap-20' },
  wd = { class: 'first-col justify-start flex flex-col gap-y-menuitem col-start-1 col-end-4' },
  xd = Me(() => C('span', { class: 'font-normal text-gray-500 dark:text-gray-400' }, 'awi', -1)),
  Ed = Me(() =>
    C(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '50',
        height: '55',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: '#C3CFD9',
        'stroke-width': '1',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      [C('path', { d: 'M9 18l6-6-6-6' })],
      -1
    )
  ),
  kd = Me(() =>
    C(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '50',
        height: '55',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: '#C3CFD9',
        'stroke-width': '1',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      [C('path', { d: 'M9 18l6-6-6-6' })],
      -1
    )
  ),
  Cd = Me(() =>
    C(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '50',
        height: '55',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: '#C3CFD9',
        'stroke-width': '1',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      [C('path', { d: 'M9 18l6-6-6-6' })],
      -1
    )
  ),
  Pd = Me(() =>
    C(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '50',
        height: '55',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: '#C3CFD9',
        'stroke-width': '1',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      [C('path', { d: 'M9 18l6-6-6-6' })],
      -1
    )
  ),
  Sd = Me(() =>
    C(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '50',
        height: '55',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: '#C3CFD9',
        'stroke-width': '1',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      [C('path', { d: 'M9 18l6-6-6-6' })],
      -1
    )
  ),
  Od = {
    class:
      'items-box w-full col-start-4 col-end-12 grid grid-cols-3 gap-4 h-screen place-items-center'
  },
  _d = { class: 'bg-gray-300 text-center flex flex-col justify-center items-center' },
  Id = ['src'],
  Rd = Me(() =>
    C(
      'p',
      { class: 'text-menuGrey hover:text-menuHeaderGrey hover:font-bold' },
      'plentymarkets',
      -1
    )
  ),
  Td = { class: 'p-4 bg-gray-300 text-center flex flex-col justify-center items-center' },
  Md = ['src'],
  Nd = Me(() =>
    C('p', { class: 'text-menuGrey hover:text-menuHeaderGrey hover:font-bold' }, 'Shopify', -1)
  ),
  Fd = { class: 'bg-gray-300 text-center flex flex-col justify-center items-center' },
  zd = ['src'],
  Ld = Me(() =>
    C('p', { class: 'text-menuGrey hover:text-menuHeaderGrey hover:font-bold' }, 'Shopware', -1)
  ),
  jd = { class: 'bg-gray-300 text-center flex flex-col justify-center items-center' },
  Ud = ['src'],
  Bd = Me(() =>
    C('p', { class: 'text-menuGrey hover:text-menuHeaderGrey hover:font-bold' }, 'JTL', -1)
  ),
  Kd = { class: 'bg-gray-300 text-center flex flex-col justify-center items-center' },
  Dd = ['src'],
  Hd = Me(() =>
    C('p', { class: 'text-menuGrey hover:text-menuHeaderGrey hover:font-bold' }, 'MIRAKL', -1)
  ),
  Wd = { class: 'bg-gray-300 text-center flex flex-col justify-center items-center' },
  Qd = ['src'],
  Yd = Me(() =>
    C('p', { class: 'text-menuGrey hover:text-menuHeaderGrey hover:font-bold' }, 'WooCommerce', -1)
  ),
  Gd = {
    __name: 'ServicesNav',
    setup(e) {
      const t = Tt(0),
        n = (i) => {
          const a = i.currentTarget,
            o = [...a.parentElement.children].indexOf(a)
          t.value = o
        },
        r = (i) => (t.value === i ? 'active' : '')
      return (i, a) => (
        nn(),
        Ur(
          'div',
          yd,
          [
            C('div', Ad, [
              C('div', wd, [
                C(
                  'a',
                  {
                    onClick: a[0] || (a[0] = (o) => n(o)),
                    class: ge([
                      'cursor-pointer',
                      'text-2xl 2xl:text-3xl',
                      'text-gray-500',
                      'font-normal',
                      'services_headers',
                      'pt-6',
                      'd-flex',
                      'align-items-center',
                      'flex-row',
                      r(0)
                    ])
                  },
                  [Te(' Shopsysteme & W'), xd, Ed],
                  2
                ),
                C(
                  'a',
                  {
                    onClick: a[1] || (a[1] = (o) => n(o)),
                    class: ge([
                      'cursor-pointer',
                      'text-2xl 2xl:text-3xl',
                      'text-gray-500',
                      'font-normal',
                      'services_headers',
                      r(1)
                    ])
                  },
                  [Te(' Multichannel '), kd],
                  2
                ),
                C(
                  'a',
                  {
                    onClick: a[2] || (a[2] = (o) => n(o)),
                    class: ge([
                      'cursor-pointer',
                      'text-2xl 2xl:text-3xl',
                      'text-gray-500',
                      'font-normal',
                      'services_headers',
                      r(2)
                    ])
                  },
                  [Te(' Consulting '), Cd],
                  2
                ),
                C(
                  'a',
                  {
                    onClick: a[3] || (a[3] = (o) => n(o)),
                    class: ge([
                      'cursor-pointer',
                      'text-2xl 2xl:text-3xl',
                      'text-gray-500',
                      'font-normal',
                      'services_headers',
                      r(3)
                    ])
                  },
                  [Te(' Development '), Pd],
                  2
                ),
                C(
                  'a',
                  {
                    onClick: a[4] || (a[4] = (o) => n(o)),
                    class: ge([
                      'cursor-pointer',
                      'text-2xl 2xl:text-3xl',
                      'text-gray-500',
                      'font-normal',
                      'services_headers',
                      r(4)
                    ])
                  },
                  [Te(' Marketing & Design '), Sd],
                  2
                )
              ]),
              C('div', Od, [
                C('div', _d, [
                  C('img', { src: te(dd), class: 'w-16 h-16 mb-6', alt: '' }, null, 8, Id),
                  Rd
                ]),
                C('div', Td, [
                  C('img', { src: te(md), class: 'w-16 h-16 mb-6', alt: '' }, null, 8, Md),
                  Nd
                ]),
                C('div', Fd, [
                  C('img', { src: te(hd), class: 'w-16 h-16 mb-6', alt: 'shopware' }, null, 8, zd),
                  Ld
                ]),
                C('div', jd, [
                  C('img', { src: te(pd), class: 'w-16 h-16 mb-6', alt: 'jtl' }, null, 8, Ud),
                  Bd
                ]),
                C('div', Kd, [
                  C('img', { src: te(gd), class: 'w-16 h-16 mb-6', alt: 'mirakl' }, null, 8, Dd),
                  Hd
                ]),
                C('div', Wd, [
                  C('img', { src: te(vd), class: 'w-16 h-16 mb-6', alt: '' }, null, 8, Qd),
                  Yd
                ])
              ])
            ])
          ],
          512
        )
      )
    }
  },
  yo = bd(Gd, [['__scopeId', 'data-v-ae6ae1b9']]),
  Zs = new Set(),
  Pe = new WeakMap(),
  Zt = new WeakMap(),
  Ft = new WeakMap(),
  Pi = new WeakMap(),
  Vd = new WeakMap(),
  ln = new WeakMap(),
  kr = new WeakMap(),
  En = new WeakSet()
let zt
const nt = '__aa_tgt',
  Si = '__aa_del',
  Jd = (e) => {
    const t = em(e)
    t && t.forEach((n) => tm(n))
  },
  Xd = (e) => {
    e.forEach((t) => {
      t.target === zt && Zd(), Pe.has(t.target) && Ut(t.target)
    })
  }
function qd(e) {
  const t = Pi.get(e)
  t == null || t.disconnect()
  let n = Pe.get(e),
    r = 0
  const i = 5
  n || ((n = cn(e)), Pe.set(e, n))
  const { offsetWidth: a, offsetHeight: o } = zt,
    l = [n.top - i, a - (n.left + i + n.width), o - (n.top + i + n.height), n.left - i]
      .map((c) => `${-1 * Math.floor(c)}px`)
      .join(' '),
    f = new IntersectionObserver(
      () => {
        ++r > 1 && Ut(e)
      },
      { root: zt, threshold: 1, rootMargin: l }
    )
  f.observe(e), Pi.set(e, f)
}
function Ut(e) {
  clearTimeout(kr.get(e))
  const t = Hr(e),
    n = typeof t == 'function' ? 500 : t.duration
  kr.set(
    e,
    setTimeout(async () => {
      const r = Ft.get(e)
      try {
        await (r == null ? void 0 : r.finished), Pe.set(e, cn(e)), qd(e)
      } catch {}
    }, n)
  )
}
function Zd() {
  clearTimeout(kr.get(zt)),
    kr.set(
      zt,
      setTimeout(() => {
        Zs.forEach((e) => nl(e, (t) => $s(() => Ut(t))))
      }, 100)
    )
}
function $d(e) {
  setTimeout(() => {
    Vd.set(
      e,
      setInterval(() => $s(Ut.bind(null, e)), 2e3)
    )
  }, Math.round(2e3 * Math.random()))
}
function $s(e) {
  typeof requestIdleCallback == 'function'
    ? requestIdleCallback(() => e())
    : requestAnimationFrame(() => e())
}
let Oi, Yt
typeof window < 'u' &&
  ((zt = document.documentElement),
  (Oi = new MutationObserver(Jd)),
  (Yt = new ResizeObserver(Xd)),
  Yt.observe(zt))
function em(e) {
  return e
    .reduce((r, i) => [...r, ...Array.from(i.addedNodes), ...Array.from(i.removedNodes)], [])
    .every((r) => r.nodeName === '#comment')
    ? !1
    : e.reduce((r, i) => {
        if (r === !1) return !1
        if (i.target instanceof Element) {
          if ((ai(i.target), !r.has(i.target))) {
            r.add(i.target)
            for (let a = 0; a < i.target.children.length; a++) {
              const o = i.target.children.item(a)
              if (o) {
                if (Si in o) return !1
                ai(i.target, o), r.add(o)
              }
            }
          }
          if (i.removedNodes.length)
            for (let a = 0; a < i.removedNodes.length; a++) {
              const o = i.removedNodes[a]
              if (Si in o) return !1
              o instanceof Element &&
                (r.add(o), ai(i.target, o), Zt.set(o, [i.previousSibling, i.nextSibling]))
            }
        }
        return r
      }, new Set())
}
function ai(e, t) {
  !t && !(nt in e)
    ? Object.defineProperty(e, nt, { value: e })
    : t && !(nt in t) && Object.defineProperty(t, nt, { value: e })
}
function tm(e) {
  var t
  const n = e.isConnected,
    r = Pe.has(e)
  n && Zt.has(e) && Zt.delete(e),
    Ft.has(e) && ((t = Ft.get(e)) === null || t === void 0 || t.cancel()),
    r && n ? nm(e) : r && !n ? im(e) : rm(e)
}
function Ve(e) {
  return Number(e.replace(/[^0-9.\-]/g, ''))
}
function cn(e) {
  const t = e.getBoundingClientRect()
  return {
    top: t.top + window.scrollY,
    left: t.left + window.scrollX,
    width: t.width,
    height: t.height
  }
}
function el(e, t, n) {
  let r = t.width,
    i = t.height,
    a = n.width,
    o = n.height
  const s = getComputedStyle(e)
  if (s.getPropertyValue('box-sizing') === 'content-box') {
    const f =
        Ve(s.paddingTop) + Ve(s.paddingBottom) + Ve(s.borderTopWidth) + Ve(s.borderBottomWidth),
      c = Ve(s.paddingLeft) + Ve(s.paddingRight) + Ve(s.borderRightWidth) + Ve(s.borderLeftWidth)
    ;(r -= c), (a -= c), (i -= f), (o -= f)
  }
  return [r, a, i, o].map(Math.round)
}
function Hr(e) {
  return nt in e && ln.has(e[nt]) ? ln.get(e[nt]) : { duration: 250, easing: 'ease-in-out' }
}
function tl(e) {
  if (nt in e) return e[nt]
}
function ua(e) {
  const t = tl(e)
  return t ? En.has(t) : !1
}
function nl(e, ...t) {
  t.forEach((n) => n(e, ln.has(e)))
  for (let n = 0; n < e.children.length; n++) {
    const r = e.children.item(n)
    r && t.forEach((i) => i(r, ln.has(r)))
  }
}
function nm(e) {
  const t = Pe.get(e),
    n = cn(e)
  if (!ua(e)) return Pe.set(e, n)
  let r
  if (!t) return
  const i = Hr(e)
  if (typeof i != 'function') {
    const a = t.left - n.left,
      o = t.top - n.top,
      [s, l, f, c] = el(e, t, n),
      d = { transform: `translate(${a}px, ${o}px)` },
      h = { transform: 'translate(0, 0)' }
    s !== l && ((d.width = `${s}px`), (h.width = `${l}px`)),
      f !== c && ((d.height = `${f}px`), (h.height = `${c}px`)),
      (r = e.animate([d, h], { duration: i.duration, easing: i.easing }))
  } else (r = new Animation(i(e, 'remain', t, n))), r.play()
  Ft.set(e, r), Pe.set(e, n), r.addEventListener('finish', Ut.bind(null, e))
}
function rm(e) {
  const t = cn(e)
  Pe.set(e, t)
  const n = Hr(e)
  if (!ua(e)) return
  let r
  typeof n != 'function'
    ? (r = e.animate(
        [
          { transform: 'scale(.98)', opacity: 0 },
          { transform: 'scale(0.98)', opacity: 0, offset: 0.5 },
          { transform: 'scale(1)', opacity: 1 }
        ],
        { duration: n.duration * 1.5, easing: 'ease-in' }
      ))
    : ((r = new Animation(n(e, 'add', t))), r.play()),
    Ft.set(e, r),
    r.addEventListener('finish', Ut.bind(null, e))
}
function im(e) {
  var t
  if (!Zt.has(e) || !Pe.has(e)) return
  const [n, r] = Zt.get(e)
  Object.defineProperty(e, Si, { value: !0 }),
    r && r.parentNode && r.parentNode instanceof Element
      ? r.parentNode.insertBefore(e, r)
      : n && n.parentNode
      ? n.parentNode.appendChild(e)
      : (t = tl(e)) === null || t === void 0 || t.appendChild(e)
  function i() {
    var h
    e.remove(),
      Pe.delete(e),
      Zt.delete(e),
      Ft.delete(e),
      (h = Pi.get(e)) === null || h === void 0 || h.disconnect()
  }
  if (!ua(e)) return i()
  const [a, o, s, l] = am(e),
    f = Hr(e),
    c = Pe.get(e)
  let d
  Object.assign(e.style, {
    position: 'absolute',
    top: `${a}px`,
    left: `${o}px`,
    width: `${s}px`,
    height: `${l}px`,
    margin: 0,
    pointerEvents: 'none',
    transformOrigin: 'center',
    zIndex: 100
  }),
    typeof f != 'function'
      ? (d = e.animate(
          [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(.98)', opacity: 0 }
          ],
          { duration: f.duration, easing: 'ease-out' }
        ))
      : ((d = new Animation(f(e, 'remove', c))), d.play()),
    Ft.set(e, d),
    d.addEventListener('finish', i)
}
function am(e) {
  const t = Pe.get(e),
    [n, , r] = el(e, t, cn(e))
  let i = e.parentElement
  for (; i && (getComputedStyle(i).position === 'static' || i instanceof HTMLBodyElement); )
    i = i.parentElement
  i || (i = document.body)
  const a = getComputedStyle(i),
    o = Pe.get(i) || cn(i),
    s = Math.round(t.top - o.top) - Ve(a.borderTopWidth),
    l = Math.round(t.left - o.left) - Ve(a.borderLeftWidth)
  return [s, l, n, r]
}
function rl(e, t = {}) {
  return (
    Oi &&
      Yt &&
      ((window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        typeof t != 'function' &&
        !t.disrespectUserMotionPreference) ||
        (En.add(e),
        getComputedStyle(e).position === 'static' &&
          Object.assign(e.style, { position: 'relative' }),
        nl(e, Ut, $d, (i) => (Yt == null ? void 0 : Yt.observe(i))),
        typeof t == 'function'
          ? ln.set(e, t)
          : ln.set(e, { duration: 250, easing: 'ease-in-out', ...t }),
        Oi.observe(e, { childList: !0 }),
        Zs.add(e))),
    Object.freeze({
      parent: e,
      enable: () => {
        En.add(e)
      },
      disable: () => {
        En.delete(e)
      },
      isEnabled: () => En.has(e)
    })
  )
}
const om = {
  mounted: (e, t) => {
    rl(e, t.value || {})
  }
}
const sm = { class: 'header border-b-2 border-webimpactGray' },
  lm = { class: 'bg-white-900' },
  cm = { class: 'container mx-auto flex flex-row items-center justify-between menu-index' },
  fm = { class: 'flex flex-row align-middle company-logo' },
  um = ['src'],
  dm = { class: 'flex flex-row justify-center header-list' },
  mm = Pf(
    '<ul class="flex flex-row justify-center items-center contact"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="19" viewBox="0 0 5 3"><desc>Flag of Germany</desc><rect id="black_stripe" width="5" height="3" y="0" x="0" fill="#000"></rect><rect id="red_stripe" width="5" height="2" y="1" x="0" fill="#D00"></rect><rect id="gold_stripe" width="5" height="1" y="2" x="0" fill="#FFCE00"></rect></svg><span class="pl-3 font-bold"> 02974 77 999 99¹ </span></ul>',
    1
  ),
  hm = {
    __name: 'GlobalNav',
    setup(e) {
      const t = Tt()
      ia(() => {
        rl(t.value)
      })
      const n = Tt(''),
        r = Tt(ii),
        i = (a) => {
          if (n.value === 'ServicesNav' && a === 'ServicesNav') {
            ;(r.value = ii), (n.value = '')
            return
          }
          ;(n.value = a),
            console.log(n.value),
            (r.value = ii),
            a === 'ServicesNav' && (r.value = ud)
        }
      return (
        hn({ components: { ServicesNav: yo } }),
        (a, o) => (
          nn(),
          Ur(
            'header',
            { ref_key: 'dropdown', ref: t },
            [
              C('div', sm, [
                C('nav', lm, [
                  C('div', cm, [
                    C('ul', fm, [
                      C('li', null, [
                        me(
                          te(xn),
                          {
                            to: '/',
                            class: 'text-black-900 px-3 py-2',
                            onClick: o[0] || (o[0] = () => i(''))
                          },
                          {
                            default: wn(() => [
                              C('img', { class: 'h-60 w-100', src: r.value, alt: '' }, null, 8, um)
                            ]),
                            _: 1
                          }
                        )
                      ])
                    ]),
                    C('ul', dm, [
                      C(
                        'li',
                        { class: ge({ 'active-li': n.value === 'ServicesNav' }) },
                        [
                          C(
                            'a',
                            {
                              onClick: o[1] || (o[1] = () => i('ServicesNav')),
                              class: 'text-menuHeaderGrey px-3 py-2'
                            },
                            ' Leistungen '
                          )
                        ],
                        2
                      ),
                      C(
                        'li',
                        { class: ge({ 'active-li': n.value === 'AgneturNav' }) },
                        [
                          me(
                            te(xn),
                            {
                              onClick: o[2] || (o[2] = (s) => i('AgneturNav')),
                              to: '/agetur',
                              class: 'text-menuHeaderGrey px-3 py-2'
                            },
                            { default: wn(() => [Te(' Agentur ')]), _: 1 }
                          )
                        ],
                        2
                      ),
                      C(
                        'li',
                        { class: ge({ 'active-li': n.value === 'KundenNav' }) },
                        [
                          me(
                            te(xn),
                            {
                              to: '/contact',
                              class: 'text-menuHeaderGrey px-3 py-2',
                              onClick: o[3] || (o[3] = () => i('KundenNav'))
                            },
                            { default: wn(() => [Te(' Unsere Kunden ')]), _: 1 }
                          )
                        ],
                        2
                      ),
                      C(
                        'li',
                        { class: ge({ 'active-li': n.value === 'KontaktNav' }) },
                        [
                          me(
                            te(xn),
                            {
                              to: '/contact',
                              class: 'text-menuHeaderGrey px-3 py-2',
                              onClick: o[4] || (o[4] = () => i('KontaktNav'))
                            },
                            { default: wn(() => [Te(' Kontakt ')]), _: 1 }
                          )
                        ],
                        2
                      )
                    ]),
                    mm
                  ])
                ])
              ]),
              n.value === 'ServicesNav' ? (nn(), zs(yo, { key: 0 })) : Sf('', !0)
            ],
            512
          )
        )
      )
    }
  },
  pm = C('footer', null, null, -1),
  gm = {
    __name: 'App',
    setup(e) {
      return (t, n) => (nn(), Ur(Je, null, [me(hm), me(te(qs)), pm], 64))
    }
  },
  vm = 'modulepreload',
  bm = function (e) {
    return '/website_webimpact/' + e
  },
  Ao = {},
  oi = function (t, n, r) {
    if (!n || n.length === 0) return t()
    const i = document.getElementsByTagName('link')
    return Promise.all(
      n.map((a) => {
        if (((a = bm(a)), a in Ao)) return
        Ao[a] = !0
        const o = a.endsWith('.css'),
          s = o ? '[rel="stylesheet"]' : ''
        if (!!r)
          for (let c = i.length - 1; c >= 0; c--) {
            const d = i[c]
            if (d.href === a && (!o || d.rel === 'stylesheet')) return
          }
        else if (document.querySelector(`link[href="${a}"]${s}`)) return
        const f = document.createElement('link')
        if (
          ((f.rel = o ? 'stylesheet' : vm),
          o || ((f.as = 'script'), (f.crossOrigin = '')),
          (f.href = a),
          document.head.appendChild(f),
          o)
        )
          return new Promise((c, d) => {
            f.addEventListener('load', c),
              f.addEventListener('error', () => d(new Error(`Unable to preload CSS for ${a}`)))
          })
      })
    ).then(() => t())
  },
  ym = '/website_webimpact/assets/temp-homepage-img-05955812.png',
  wo = '/website_webimpact/assets/dot-pattern-bg-14aabaf6.png',
  Am = '/website_webimpact/assets/Plentymarkets_Zertifikat-af61d862.svg',
  wm = '/website_webimpact/assets/Plentymarkets _Zertifikat_1-ec467e2a.svg',
  xm = '/website_webimpact/assets/Plentymarkets Zertifikat_2-657f4b01.svg',
  Em = '/website_webimpact/assets/Plentymarkets Zertifikat_3-498e3ac6.svg',
  km = '/website_webimpact/assets/Plentymarkets Zertifikat_number-82a78314.svg'
const Cm = { class: 'h-[32rem] flex flex-col justify-center items-start first-sub-child' },
  Pm = C('h1', { class: 'text-7xl mb-3 font-bold tracking-wider' }, 'Optimieren', -1),
  Sm = C('h1', { class: 'text-7xl mb-3 font-bold tracking-wider' }, 'Sie Ihr', -1),
  Om = C('h1', { class: 'text-7xl mb-5 font-bold tracking-wider' }, 'Geschäft.', -1),
  _m = C(
    'p',
    { class: 'w-3/4 text-menuGrey' },
    [
      Te(' Wir helfen Ihnen Potentiale ihres eCommerce '),
      C('br'),
      Te(' Geschäfts zu erkennen, um Ihr System sowie Ihre '),
      C('br'),
      Te('Prozesse effizient zu optimieren. ')
    ],
    -1
  ),
  Im = C(
    'button',
    { class: 'text-xl rounded-md text-menuHeaderGrey font-semibold' },
    ' Jetzt Kontaktieren ',
    -1
  ),
  Rm = { class: 'h-[16rem] second-sub-child flex flex-col justify-center items-center pt-32' },
  Tm = C(
    'p',
    { class: 'text-menuGrey text-xl mb-10' },
    'Vollzertifizierter plentymarkets Expert Partner',
    -1
  ),
  Mm = { class: 'flex flex-row justify-center' },
  Nm = ['src'],
  Fm = ['src'],
  zm = ['src'],
  Lm = ['src'],
  jm = ['src'],
  Um = { class: 'second-child' },
  Bm = { class: 'h-[20rem] bg-bgMenuGridRed second-sub-child' },
  Km = ['src'],
  Dm = ['src'],
  Hm = { class: 'h-[28rem] relative' },
  Wm = ['src'],
  Qm = C('div', { class: 'hr first' }, null, -1),
  Ym = C('div', { class: 'hr second' }, null, -1),
  Gm = {
    __name: 'HomeView',
    setup(e) {
      const t = Tt(!1)
      return (
        ia(() => {
          t.value = !0
        }),
        (n, r) => (
          nn(),
          Ur('main', null, [
            C(
              'div',
              { class: ge(['grid grid-cols-2', { 'animate-item': t.value }]) },
              [
                C(
                  'div',
                  { class: ge(['first-child', { 'animate-item-first-div': t.value }]) },
                  [
                    C('div', Cm, [
                      Pm,
                      Sm,
                      Om,
                      C(
                        'div',
                        { class: ge(['hr first', { 'animate-item-hr': t.value }]) },
                        null,
                        2
                      ),
                      _m,
                      C(
                        'div',
                        { class: ge(['hr second', { 'animate-item-second-div': t.value }]) },
                        null,
                        2
                      ),
                      Im
                    ]),
                    C('div', Rm, [
                      Tm,
                      C('div', Mm, [
                        C('img', { src: te(Am), alt: '' }, null, 8, Nm),
                        C('img', { src: te(wm), alt: '' }, null, 8, Fm),
                        C('img', { src: te(xm), alt: '' }, null, 8, zm),
                        C('img', { src: te(Em), alt: '' }, null, 8, Lm),
                        C('img', { src: te(km), alt: '', class: 'ml-12' }, null, 8, jm)
                      ])
                    ])
                  ],
                  2
                ),
                C('div', Um, [
                  C('div', Bm, [
                    C(
                      'img',
                      {
                        class: ge(['hero', { 'animate-item-img-hero': t.value }]),
                        src: te(ym),
                        alt: ''
                      },
                      null,
                      10,
                      Km
                    ),
                    C('img', { src: te(wo), alt: '' }, null, 8, Dm)
                  ]),
                  C('div', Hm, [
                    C(
                      'img',
                      { src: te(wo), alt: '', class: ge({ 'animate-item-second-div': t.value }) },
                      null,
                      10,
                      Wm
                    ),
                    Qm,
                    Ym
                  ])
                ])
              ],
              2
            )
          ])
        )
      )
    }
  },
  Vm = cd({
    history: Su('/website_webimpact/'),
    routes: [
      { path: '/', name: 'home', component: Gm },
      {
        path: '/about',
        name: 'about',
        component: () => oi(() => import('./AboutView-e4916444.js'), [])
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => oi(() => import('./ContactView-3a69a2f5.js'), [])
      },
      {
        path: '/agetur',
        name: 'agetur',
        component: () => oi(() => import('./AgenturView-b13c60b4.js'), [])
      }
    ]
  })
function xo(e, t) {
  var n = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e)
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      n.push.apply(n, r)
  }
  return n
}
function M(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? xo(Object(n), !0).forEach(function (r) {
          pe(e, r, n[r])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : xo(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
  }
  return e
}
function Cr(e) {
  return (
    (Cr =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Cr(e)
  )
}
function Jm(e, t) {
  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
}
function Eo(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n]
    ;(r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r)
  }
}
function Xm(e, t, n) {
  return (
    t && Eo(e.prototype, t),
    n && Eo(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function pe(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  )
}
function da(e, t) {
  return Zm(e) || eh(e, t) || il(e, t) || nh()
}
function Gn(e) {
  return qm(e) || $m(e) || il(e) || th()
}
function qm(e) {
  if (Array.isArray(e)) return _i(e)
}
function Zm(e) {
  if (Array.isArray(e)) return e
}
function $m(e) {
  if ((typeof Symbol < 'u' && e[Symbol.iterator] != null) || e['@@iterator'] != null)
    return Array.from(e)
}
function eh(e, t) {
  var n = e == null ? null : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (n != null) {
    var r = [],
      i = !0,
      a = !1,
      o,
      s
    try {
      for (
        n = n.call(e);
        !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t));
        i = !0
      );
    } catch (l) {
      ;(a = !0), (s = l)
    } finally {
      try {
        !i && n.return != null && n.return()
      } finally {
        if (a) throw s
      }
    }
    return r
  }
}
function il(e, t) {
  if (e) {
    if (typeof e == 'string') return _i(e, t)
    var n = Object.prototype.toString.call(e).slice(8, -1)
    if ((n === 'Object' && e.constructor && (n = e.constructor.name), n === 'Map' || n === 'Set'))
      return Array.from(e)
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _i(e, t)
  }
}
function _i(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
  return r
}
function th() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function nh() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
var ko = function () {},
  ma = {},
  al = {},
  ol = null,
  sl = { mark: ko, measure: ko }
try {
  typeof window < 'u' && (ma = window),
    typeof document < 'u' && (al = document),
    typeof MutationObserver < 'u' && (ol = MutationObserver),
    typeof performance < 'u' && (sl = performance)
} catch {}
var rh = ma.navigator || {},
  Co = rh.userAgent,
  Po = Co === void 0 ? '' : Co,
  yt = ma,
  re = al,
  So = ol,
  rr = sl
yt.document
var ct =
    !!re.documentElement &&
    !!re.head &&
    typeof re.addEventListener == 'function' &&
    typeof re.createElement == 'function',
  ll = ~Po.indexOf('MSIE') || ~Po.indexOf('Trident/'),
  ir,
  ar,
  or,
  sr,
  lr,
  at = '___FONT_AWESOME___',
  Ii = 16,
  cl = 'fa',
  fl = 'svg-inline--fa',
  Lt = 'data-fa-i2svg',
  Ri = 'data-fa-pseudo-element',
  ih = 'data-fa-pseudo-element-pending',
  ha = 'data-prefix',
  pa = 'data-icon',
  Oo = 'fontawesome-i2svg',
  ah = 'async',
  oh = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'],
  ul = (function () {
    try {
      return !0
    } catch {
      return !1
    }
  })(),
  ne = 'classic',
  ce = 'sharp',
  ga = [ne, ce]
function Vn(e) {
  return new Proxy(e, {
    get: function (n, r) {
      return r in n ? n[r] : n[ne]
    }
  })
}
var Kn = Vn(
    ((ir = {}),
    pe(ir, ne, {
      fa: 'solid',
      fas: 'solid',
      'fa-solid': 'solid',
      far: 'regular',
      'fa-regular': 'regular',
      fal: 'light',
      'fa-light': 'light',
      fat: 'thin',
      'fa-thin': 'thin',
      fad: 'duotone',
      'fa-duotone': 'duotone',
      fab: 'brands',
      'fa-brands': 'brands',
      fak: 'kit',
      'fa-kit': 'kit'
    }),
    pe(ir, ce, {
      fa: 'solid',
      fass: 'solid',
      'fa-solid': 'solid',
      fasr: 'regular',
      'fa-regular': 'regular',
      fasl: 'light',
      'fa-light': 'light'
    }),
    ir)
  ),
  Dn = Vn(
    ((ar = {}),
    pe(ar, ne, {
      solid: 'fas',
      regular: 'far',
      light: 'fal',
      thin: 'fat',
      duotone: 'fad',
      brands: 'fab',
      kit: 'fak'
    }),
    pe(ar, ce, { solid: 'fass', regular: 'fasr', light: 'fasl' }),
    ar)
  ),
  Hn = Vn(
    ((or = {}),
    pe(or, ne, {
      fab: 'fa-brands',
      fad: 'fa-duotone',
      fak: 'fa-kit',
      fal: 'fa-light',
      far: 'fa-regular',
      fas: 'fa-solid',
      fat: 'fa-thin'
    }),
    pe(or, ce, { fass: 'fa-solid', fasr: 'fa-regular', fasl: 'fa-light' }),
    or)
  ),
  sh = Vn(
    ((sr = {}),
    pe(sr, ne, {
      'fa-brands': 'fab',
      'fa-duotone': 'fad',
      'fa-kit': 'fak',
      'fa-light': 'fal',
      'fa-regular': 'far',
      'fa-solid': 'fas',
      'fa-thin': 'fat'
    }),
    pe(sr, ce, { 'fa-solid': 'fass', 'fa-regular': 'fasr', 'fa-light': 'fasl' }),
    sr)
  ),
  lh = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,
  dl = 'fa-layers-text',
  ch = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,
  fh = Vn(
    ((lr = {}),
    pe(lr, ne, { 900: 'fas', 400: 'far', normal: 'far', 300: 'fal', 100: 'fat' }),
    pe(lr, ce, { 900: 'fass', 400: 'fasr', 300: 'fasl' }),
    lr)
  ),
  ml = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  uh = ml.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
  dh = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'],
  _t = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  },
  Wn = new Set()
Object.keys(Dn[ne]).map(Wn.add.bind(Wn))
Object.keys(Dn[ce]).map(Wn.add.bind(Wn))
var mh = []
    .concat(ga, Gn(Wn), [
      '2xs',
      'xs',
      'sm',
      'lg',
      'xl',
      '2xl',
      'beat',
      'border',
      'fade',
      'beat-fade',
      'bounce',
      'flip-both',
      'flip-horizontal',
      'flip-vertical',
      'flip',
      'fw',
      'inverse',
      'layers-counter',
      'layers-text',
      'layers',
      'li',
      'pull-left',
      'pull-right',
      'pulse',
      'rotate-180',
      'rotate-270',
      'rotate-90',
      'rotate-by',
      'shake',
      'spin-pulse',
      'spin-reverse',
      'spin',
      'stack-1x',
      'stack-2x',
      'stack',
      'ul',
      _t.GROUP,
      _t.SWAP_OPACITY,
      _t.PRIMARY,
      _t.SECONDARY
    ])
    .concat(
      ml.map(function (e) {
        return ''.concat(e, 'x')
      })
    )
    .concat(
      uh.map(function (e) {
        return 'w-'.concat(e)
      })
    ),
  Rn = yt.FontAwesomeConfig || {}
function hh(e) {
  var t = re.querySelector('script[' + e + ']')
  if (t) return t.getAttribute(e)
}
function ph(e) {
  return e === '' ? !0 : e === 'false' ? !1 : e === 'true' ? !0 : e
}
if (re && typeof re.querySelector == 'function') {
  var gh = [
    ['data-family-prefix', 'familyPrefix'],
    ['data-css-prefix', 'cssPrefix'],
    ['data-family-default', 'familyDefault'],
    ['data-style-default', 'styleDefault'],
    ['data-replacement-class', 'replacementClass'],
    ['data-auto-replace-svg', 'autoReplaceSvg'],
    ['data-auto-add-css', 'autoAddCss'],
    ['data-auto-a11y', 'autoA11y'],
    ['data-search-pseudo-elements', 'searchPseudoElements'],
    ['data-observe-mutations', 'observeMutations'],
    ['data-mutate-approach', 'mutateApproach'],
    ['data-keep-original-source', 'keepOriginalSource'],
    ['data-measure-performance', 'measurePerformance'],
    ['data-show-missing-icons', 'showMissingIcons']
  ]
  gh.forEach(function (e) {
    var t = da(e, 2),
      n = t[0],
      r = t[1],
      i = ph(hh(n))
    i != null && (Rn[r] = i)
  })
}
var hl = {
  styleDefault: 'solid',
  familyDefault: 'classic',
  cssPrefix: cl,
  replacementClass: fl,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: 'async',
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
}
Rn.familyPrefix && (Rn.cssPrefix = Rn.familyPrefix)
var fn = M(M({}, hl), Rn)
fn.autoReplaceSvg || (fn.observeMutations = !1)
var F = {}
Object.keys(hl).forEach(function (e) {
  Object.defineProperty(F, e, {
    enumerable: !0,
    set: function (n) {
      ;(fn[e] = n),
        Tn.forEach(function (r) {
          return r(F)
        })
    },
    get: function () {
      return fn[e]
    }
  })
})
Object.defineProperty(F, 'familyPrefix', {
  enumerable: !0,
  set: function (t) {
    ;(fn.cssPrefix = t),
      Tn.forEach(function (n) {
        return n(F)
      })
  },
  get: function () {
    return fn.cssPrefix
  }
})
yt.FontAwesomeConfig = F
var Tn = []
function vh(e) {
  return (
    Tn.push(e),
    function () {
      Tn.splice(Tn.indexOf(e), 1)
    }
  )
}
var mt = Ii,
  $e = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 }
function bh(e) {
  if (!(!e || !ct)) {
    var t = re.createElement('style')
    t.setAttribute('type', 'text/css'), (t.innerHTML = e)
    for (var n = re.head.childNodes, r = null, i = n.length - 1; i > -1; i--) {
      var a = n[i],
        o = (a.tagName || '').toUpperCase()
      ;['STYLE', 'LINK'].indexOf(o) > -1 && (r = a)
    }
    return re.head.insertBefore(t, r), e
  }
}
var yh = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function Qn() {
  for (var e = 12, t = ''; e-- > 0; ) t += yh[(Math.random() * 62) | 0]
  return t
}
function pn(e) {
  for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n]
  return t
}
function va(e) {
  return e.classList
    ? pn(e.classList)
    : (e.getAttribute('class') || '').split(' ').filter(function (t) {
        return t
      })
}
function pl(e) {
  return ''
    .concat(e)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
function Ah(e) {
  return Object.keys(e || {})
    .reduce(function (t, n) {
      return t + ''.concat(n, '="').concat(pl(e[n]), '" ')
    }, '')
    .trim()
}
function Wr(e) {
  return Object.keys(e || {}).reduce(function (t, n) {
    return t + ''.concat(n, ': ').concat(e[n].trim(), ';')
  }, '')
}
function ba(e) {
  return (
    e.size !== $e.size ||
    e.x !== $e.x ||
    e.y !== $e.y ||
    e.rotate !== $e.rotate ||
    e.flipX ||
    e.flipY
  )
}
function wh(e) {
  var t = e.transform,
    n = e.containerWidth,
    r = e.iconWidth,
    i = { transform: 'translate('.concat(n / 2, ' 256)') },
    a = 'translate('.concat(t.x * 32, ', ').concat(t.y * 32, ') '),
    o = 'scale('
      .concat((t.size / 16) * (t.flipX ? -1 : 1), ', ')
      .concat((t.size / 16) * (t.flipY ? -1 : 1), ') '),
    s = 'rotate('.concat(t.rotate, ' 0 0)'),
    l = { transform: ''.concat(a, ' ').concat(o, ' ').concat(s) },
    f = { transform: 'translate('.concat((r / 2) * -1, ' -256)') }
  return { outer: i, inner: l, path: f }
}
function xh(e) {
  var t = e.transform,
    n = e.width,
    r = n === void 0 ? Ii : n,
    i = e.height,
    a = i === void 0 ? Ii : i,
    o = e.startCentered,
    s = o === void 0 ? !1 : o,
    l = ''
  return (
    s && ll
      ? (l += 'translate('.concat(t.x / mt - r / 2, 'em, ').concat(t.y / mt - a / 2, 'em) '))
      : s
      ? (l += 'translate(calc(-50% + '
          .concat(t.x / mt, 'em), calc(-50% + ')
          .concat(t.y / mt, 'em)) '))
      : (l += 'translate('.concat(t.x / mt, 'em, ').concat(t.y / mt, 'em) ')),
    (l += 'scale('
      .concat((t.size / mt) * (t.flipX ? -1 : 1), ', ')
      .concat((t.size / mt) * (t.flipY ? -1 : 1), ') ')),
    (l += 'rotate('.concat(t.rotate, 'deg) ')),
    l
  )
}
var Eh = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`
function gl() {
  var e = cl,
    t = fl,
    n = F.cssPrefix,
    r = F.replacementClass,
    i = Eh
  if (n !== e || r !== t) {
    var a = new RegExp('\\.'.concat(e, '\\-'), 'g'),
      o = new RegExp('\\--'.concat(e, '\\-'), 'g'),
      s = new RegExp('\\.'.concat(t), 'g')
    i = i.replace(a, '.'.concat(n, '-')).replace(o, '--'.concat(n, '-')).replace(s, '.'.concat(r))
  }
  return i
}
var _o = !1
function si() {
  F.autoAddCss && !_o && (bh(gl()), (_o = !0))
}
var kh = {
    mixout: function () {
      return { dom: { css: gl, insertCss: si } }
    },
    hooks: function () {
      return {
        beforeDOMElementCreation: function () {
          si()
        },
        beforeI2svg: function () {
          si()
        }
      }
    }
  },
  ot = yt || {}
ot[at] || (ot[at] = {})
ot[at].styles || (ot[at].styles = {})
ot[at].hooks || (ot[at].hooks = {})
ot[at].shims || (ot[at].shims = [])
var Ke = ot[at],
  vl = [],
  Ch = function e() {
    re.removeEventListener('DOMContentLoaded', e),
      (Pr = 1),
      vl.map(function (t) {
        return t()
      })
  },
  Pr = !1
ct &&
  ((Pr = (re.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(re.readyState)),
  Pr || re.addEventListener('DOMContentLoaded', Ch))
function Ph(e) {
  ct && (Pr ? setTimeout(e, 0) : vl.push(e))
}
function Jn(e) {
  var t = e.tag,
    n = e.attributes,
    r = n === void 0 ? {} : n,
    i = e.children,
    a = i === void 0 ? [] : i
  return typeof e == 'string'
    ? pl(e)
    : '<'.concat(t, ' ').concat(Ah(r), '>').concat(a.map(Jn).join(''), '</').concat(t, '>')
}
function Io(e, t, n) {
  if (e && e[t] && e[t][n]) return { prefix: t, iconName: n, icon: e[t][n] }
}
var Sh = function (t, n) {
    return function (r, i, a, o) {
      return t.call(n, r, i, a, o)
    }
  },
  li = function (t, n, r, i) {
    var a = Object.keys(t),
      o = a.length,
      s = i !== void 0 ? Sh(n, i) : n,
      l,
      f,
      c
    for (r === void 0 ? ((l = 1), (c = t[a[0]])) : ((l = 0), (c = r)); l < o; l++)
      (f = a[l]), (c = s(c, t[f], f, t))
    return c
  }
function Oh(e) {
  for (var t = [], n = 0, r = e.length; n < r; ) {
    var i = e.charCodeAt(n++)
    if (i >= 55296 && i <= 56319 && n < r) {
      var a = e.charCodeAt(n++)
      ;(a & 64512) == 56320 ? t.push(((i & 1023) << 10) + (a & 1023) + 65536) : (t.push(i), n--)
    } else t.push(i)
  }
  return t
}
function Ti(e) {
  var t = Oh(e)
  return t.length === 1 ? t[0].toString(16) : null
}
function _h(e, t) {
  var n = e.length,
    r = e.charCodeAt(t),
    i
  return r >= 55296 &&
    r <= 56319 &&
    n > t + 1 &&
    ((i = e.charCodeAt(t + 1)), i >= 56320 && i <= 57343)
    ? (r - 55296) * 1024 + i - 56320 + 65536
    : r
}
function Ro(e) {
  return Object.keys(e).reduce(function (t, n) {
    var r = e[n],
      i = !!r.icon
    return i ? (t[r.iconName] = r.icon) : (t[n] = r), t
  }, {})
}
function Mi(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    r = n.skipHooks,
    i = r === void 0 ? !1 : r,
    a = Ro(t)
  typeof Ke.hooks.addPack == 'function' && !i
    ? Ke.hooks.addPack(e, Ro(t))
    : (Ke.styles[e] = M(M({}, Ke.styles[e] || {}), a)),
    e === 'fas' && Mi('fa', t)
}
var cr,
  fr,
  ur,
  Gt = Ke.styles,
  Ih = Ke.shims,
  Rh = ((cr = {}), pe(cr, ne, Object.values(Hn[ne])), pe(cr, ce, Object.values(Hn[ce])), cr),
  ya = null,
  bl = {},
  yl = {},
  Al = {},
  wl = {},
  xl = {},
  Th = ((fr = {}), pe(fr, ne, Object.keys(Kn[ne])), pe(fr, ce, Object.keys(Kn[ce])), fr)
function Mh(e) {
  return ~mh.indexOf(e)
}
function Nh(e, t) {
  var n = t.split('-'),
    r = n[0],
    i = n.slice(1).join('-')
  return r === e && i !== '' && !Mh(i) ? i : null
}
var El = function () {
  var t = function (a) {
    return li(
      Gt,
      function (o, s, l) {
        return (o[l] = li(s, a, {})), o
      },
      {}
    )
  }
  ;(bl = t(function (i, a, o) {
    if ((a[3] && (i[a[3]] = o), a[2])) {
      var s = a[2].filter(function (l) {
        return typeof l == 'number'
      })
      s.forEach(function (l) {
        i[l.toString(16)] = o
      })
    }
    return i
  })),
    (yl = t(function (i, a, o) {
      if (((i[o] = o), a[2])) {
        var s = a[2].filter(function (l) {
          return typeof l == 'string'
        })
        s.forEach(function (l) {
          i[l] = o
        })
      }
      return i
    })),
    (xl = t(function (i, a, o) {
      var s = a[2]
      return (
        (i[o] = o),
        s.forEach(function (l) {
          i[l] = o
        }),
        i
      )
    }))
  var n = 'far' in Gt || F.autoFetchSvg,
    r = li(
      Ih,
      function (i, a) {
        var o = a[0],
          s = a[1],
          l = a[2]
        return (
          s === 'far' && !n && (s = 'fas'),
          typeof o == 'string' && (i.names[o] = { prefix: s, iconName: l }),
          typeof o == 'number' && (i.unicodes[o.toString(16)] = { prefix: s, iconName: l }),
          i
        )
      },
      { names: {}, unicodes: {} }
    )
  ;(Al = r.names), (wl = r.unicodes), (ya = Qr(F.styleDefault, { family: F.familyDefault }))
}
vh(function (e) {
  ya = Qr(e.styleDefault, { family: F.familyDefault })
})
El()
function Aa(e, t) {
  return (bl[e] || {})[t]
}
function Fh(e, t) {
  return (yl[e] || {})[t]
}
function It(e, t) {
  return (xl[e] || {})[t]
}
function kl(e) {
  return Al[e] || { prefix: null, iconName: null }
}
function zh(e) {
  var t = wl[e],
    n = Aa('fas', e)
  return t || (n ? { prefix: 'fas', iconName: n } : null) || { prefix: null, iconName: null }
}
function At() {
  return ya
}
var wa = function () {
  return { prefix: null, iconName: null, rest: [] }
}
function Qr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = t.family,
    r = n === void 0 ? ne : n,
    i = Kn[r][e],
    a = Dn[r][e] || Dn[r][i],
    o = e in Ke.styles ? e : null
  return a || o || null
}
var To = ((ur = {}), pe(ur, ne, Object.keys(Hn[ne])), pe(ur, ce, Object.keys(Hn[ce])), ur)
function Yr(e) {
  var t,
    n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = n.skipLookups,
    i = r === void 0 ? !1 : r,
    a =
      ((t = {}),
      pe(t, ne, ''.concat(F.cssPrefix, '-').concat(ne)),
      pe(t, ce, ''.concat(F.cssPrefix, '-').concat(ce)),
      t),
    o = null,
    s = ne
  ;(e.includes(a[ne]) ||
    e.some(function (f) {
      return To[ne].includes(f)
    })) &&
    (s = ne),
    (e.includes(a[ce]) ||
      e.some(function (f) {
        return To[ce].includes(f)
      })) &&
      (s = ce)
  var l = e.reduce(function (f, c) {
    var d = Nh(F.cssPrefix, c)
    if (
      (Gt[c]
        ? ((c = Rh[s].includes(c) ? sh[s][c] : c), (o = c), (f.prefix = c))
        : Th[s].indexOf(c) > -1
        ? ((o = c), (f.prefix = Qr(c, { family: s })))
        : d
        ? (f.iconName = d)
        : c !== F.replacementClass && c !== a[ne] && c !== a[ce] && f.rest.push(c),
      !i && f.prefix && f.iconName)
    ) {
      var h = o === 'fa' ? kl(f.iconName) : {},
        g = It(f.prefix, f.iconName)
      h.prefix && (o = null),
        (f.iconName = h.iconName || g || f.iconName),
        (f.prefix = h.prefix || f.prefix),
        f.prefix === 'far' && !Gt.far && Gt.fas && !F.autoFetchSvg && (f.prefix = 'fas')
    }
    return f
  }, wa())
  return (
    (e.includes('fa-brands') || e.includes('fab')) && (l.prefix = 'fab'),
    (e.includes('fa-duotone') || e.includes('fad')) && (l.prefix = 'fad'),
    !l.prefix &&
      s === ce &&
      (Gt.fass || F.autoFetchSvg) &&
      ((l.prefix = 'fass'), (l.iconName = It(l.prefix, l.iconName) || l.iconName)),
    (l.prefix === 'fa' || o === 'fa') && (l.prefix = At() || 'fas'),
    l
  )
}
var Lh = (function () {
    function e() {
      Jm(this, e), (this.definitions = {})
    }
    return (
      Xm(e, [
        {
          key: 'add',
          value: function () {
            for (var n = this, r = arguments.length, i = new Array(r), a = 0; a < r; a++)
              i[a] = arguments[a]
            var o = i.reduce(this._pullDefinitions, {})
            Object.keys(o).forEach(function (s) {
              ;(n.definitions[s] = M(M({}, n.definitions[s] || {}), o[s])), Mi(s, o[s])
              var l = Hn[ne][s]
              l && Mi(l, o[s]), El()
            })
          }
        },
        {
          key: 'reset',
          value: function () {
            this.definitions = {}
          }
        },
        {
          key: '_pullDefinitions',
          value: function (n, r) {
            var i = r.prefix && r.iconName && r.icon ? { 0: r } : r
            return (
              Object.keys(i).map(function (a) {
                var o = i[a],
                  s = o.prefix,
                  l = o.iconName,
                  f = o.icon,
                  c = f[2]
                n[s] || (n[s] = {}),
                  c.length > 0 &&
                    c.forEach(function (d) {
                      typeof d == 'string' && (n[s][d] = f)
                    }),
                  (n[s][l] = f)
              }),
              n
            )
          }
        }
      ]),
      e
    )
  })(),
  Mo = [],
  Vt = {},
  $t = {},
  jh = Object.keys($t)
function Uh(e, t) {
  var n = t.mixoutsTo
  return (
    (Mo = e),
    (Vt = {}),
    Object.keys($t).forEach(function (r) {
      jh.indexOf(r) === -1 && delete $t[r]
    }),
    Mo.forEach(function (r) {
      var i = r.mixout ? r.mixout() : {}
      if (
        (Object.keys(i).forEach(function (o) {
          typeof i[o] == 'function' && (n[o] = i[o]),
            Cr(i[o]) === 'object' &&
              Object.keys(i[o]).forEach(function (s) {
                n[o] || (n[o] = {}), (n[o][s] = i[o][s])
              })
        }),
        r.hooks)
      ) {
        var a = r.hooks()
        Object.keys(a).forEach(function (o) {
          Vt[o] || (Vt[o] = []), Vt[o].push(a[o])
        })
      }
      r.provides && r.provides($t)
    }),
    n
  )
}
function Ni(e, t) {
  for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    r[i - 2] = arguments[i]
  var a = Vt[e] || []
  return (
    a.forEach(function (o) {
      t = o.apply(null, [t].concat(r))
    }),
    t
  )
}
function jt(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r]
  var i = Vt[e] || []
  i.forEach(function (a) {
    a.apply(null, n)
  })
}
function st() {
  var e = arguments[0],
    t = Array.prototype.slice.call(arguments, 1)
  return $t[e] ? $t[e].apply(null, t) : void 0
}
function Fi(e) {
  e.prefix === 'fa' && (e.prefix = 'fas')
  var t = e.iconName,
    n = e.prefix || At()
  if (t) return (t = It(n, t) || t), Io(Cl.definitions, n, t) || Io(Ke.styles, n, t)
}
var Cl = new Lh(),
  Bh = function () {
    ;(F.autoReplaceSvg = !1), (F.observeMutations = !1), jt('noAuto')
  },
  Kh = {
    i2svg: function () {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
      return ct
        ? (jt('beforeI2svg', t), st('pseudoElements2svg', t), st('i2svg', t))
        : Promise.reject('Operation requires a DOM of some kind.')
    },
    watch: function () {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
        n = t.autoReplaceSvgRoot
      F.autoReplaceSvg === !1 && (F.autoReplaceSvg = !0),
        (F.observeMutations = !0),
        Ph(function () {
          Hh({ autoReplaceSvgRoot: n }), jt('watch', t)
        })
    }
  },
  Dh = {
    icon: function (t) {
      if (t === null) return null
      if (Cr(t) === 'object' && t.prefix && t.iconName)
        return { prefix: t.prefix, iconName: It(t.prefix, t.iconName) || t.iconName }
      if (Array.isArray(t) && t.length === 2) {
        var n = t[1].indexOf('fa-') === 0 ? t[1].slice(3) : t[1],
          r = Qr(t[0])
        return { prefix: r, iconName: It(r, n) || n }
      }
      if (typeof t == 'string' && (t.indexOf(''.concat(F.cssPrefix, '-')) > -1 || t.match(lh))) {
        var i = Yr(t.split(' '), { skipLookups: !0 })
        return { prefix: i.prefix || At(), iconName: It(i.prefix, i.iconName) || i.iconName }
      }
      if (typeof t == 'string') {
        var a = At()
        return { prefix: a, iconName: It(a, t) || t }
      }
    }
  },
  Ie = {
    noAuto: Bh,
    config: F,
    dom: Kh,
    parse: Dh,
    library: Cl,
    findIconDefinition: Fi,
    toHtml: Jn
  },
  Hh = function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      n = t.autoReplaceSvgRoot,
      r = n === void 0 ? re : n
    ;(Object.keys(Ke.styles).length > 0 || F.autoFetchSvg) &&
      ct &&
      F.autoReplaceSvg &&
      Ie.dom.i2svg({ node: r })
  }
function Gr(e, t) {
  return (
    Object.defineProperty(e, 'abstract', { get: t }),
    Object.defineProperty(e, 'html', {
      get: function () {
        return e.abstract.map(function (r) {
          return Jn(r)
        })
      }
    }),
    Object.defineProperty(e, 'node', {
      get: function () {
        if (ct) {
          var r = re.createElement('div')
          return (r.innerHTML = e.html), r.children
        }
      }
    }),
    e
  )
}
function Wh(e) {
  var t = e.children,
    n = e.main,
    r = e.mask,
    i = e.attributes,
    a = e.styles,
    o = e.transform
  if (ba(o) && n.found && !r.found) {
    var s = n.width,
      l = n.height,
      f = { x: s / l / 2, y: 0.5 }
    i.style = Wr(
      M(
        M({}, a),
        {},
        { 'transform-origin': ''.concat(f.x + o.x / 16, 'em ').concat(f.y + o.y / 16, 'em') }
      )
    )
  }
  return [{ tag: 'svg', attributes: i, children: t }]
}
function Qh(e) {
  var t = e.prefix,
    n = e.iconName,
    r = e.children,
    i = e.attributes,
    a = e.symbol,
    o = a === !0 ? ''.concat(t, '-').concat(F.cssPrefix, '-').concat(n) : a
  return [
    {
      tag: 'svg',
      attributes: { style: 'display: none;' },
      children: [{ tag: 'symbol', attributes: M(M({}, i), {}, { id: o }), children: r }]
    }
  ]
}
function xa(e) {
  var t = e.icons,
    n = t.main,
    r = t.mask,
    i = e.prefix,
    a = e.iconName,
    o = e.transform,
    s = e.symbol,
    l = e.title,
    f = e.maskId,
    c = e.titleId,
    d = e.extra,
    h = e.watchable,
    g = h === void 0 ? !1 : h,
    P = r.found ? r : n,
    I = P.width,
    z = P.height,
    b = i === 'fak',
    w = [F.replacementClass, a ? ''.concat(F.cssPrefix, '-').concat(a) : '']
      .filter(function (Ae) {
        return d.classes.indexOf(Ae) === -1
      })
      .filter(function (Ae) {
        return Ae !== '' || !!Ae
      })
      .concat(d.classes)
      .join(' '),
    S = {
      children: [],
      attributes: M(
        M({}, d.attributes),
        {},
        {
          'data-prefix': i,
          'data-icon': a,
          class: w,
          role: d.attributes.role || 'img',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 '.concat(I, ' ').concat(z)
        }
      )
    },
    B = b && !~d.classes.indexOf('fa-fw') ? { width: ''.concat((I / z) * 16 * 0.0625, 'em') } : {}
  g && (S.attributes[Lt] = ''),
    l &&
      (S.children.push({
        tag: 'title',
        attributes: { id: S.attributes['aria-labelledby'] || 'title-'.concat(c || Qn()) },
        children: [l]
      }),
      delete S.attributes.title)
  var Q = M(
      M({}, S),
      {},
      {
        prefix: i,
        iconName: a,
        main: n,
        mask: r,
        maskId: f,
        transform: o,
        symbol: s,
        styles: M(M({}, B), d.styles)
      }
    ),
    ie =
      r.found && n.found
        ? st('generateAbstractMask', Q) || { children: [], attributes: {} }
        : st('generateAbstractIcon', Q) || { children: [], attributes: {} },
    le = ie.children,
    Oe = ie.attributes
  return (Q.children = le), (Q.attributes = Oe), s ? Qh(Q) : Wh(Q)
}
function No(e) {
  var t = e.content,
    n = e.width,
    r = e.height,
    i = e.transform,
    a = e.title,
    o = e.extra,
    s = e.watchable,
    l = s === void 0 ? !1 : s,
    f = M(M(M({}, o.attributes), a ? { title: a } : {}), {}, { class: o.classes.join(' ') })
  l && (f[Lt] = '')
  var c = M({}, o.styles)
  ba(i) &&
    ((c.transform = xh({ transform: i, startCentered: !0, width: n, height: r })),
    (c['-webkit-transform'] = c.transform))
  var d = Wr(c)
  d.length > 0 && (f.style = d)
  var h = []
  return (
    h.push({ tag: 'span', attributes: f, children: [t] }),
    a && h.push({ tag: 'span', attributes: { class: 'sr-only' }, children: [a] }),
    h
  )
}
function Yh(e) {
  var t = e.content,
    n = e.title,
    r = e.extra,
    i = M(M(M({}, r.attributes), n ? { title: n } : {}), {}, { class: r.classes.join(' ') }),
    a = Wr(r.styles)
  a.length > 0 && (i.style = a)
  var o = []
  return (
    o.push({ tag: 'span', attributes: i, children: [t] }),
    n && o.push({ tag: 'span', attributes: { class: 'sr-only' }, children: [n] }),
    o
  )
}
var ci = Ke.styles
function zi(e) {
  var t = e[0],
    n = e[1],
    r = e.slice(4),
    i = da(r, 1),
    a = i[0],
    o = null
  return (
    Array.isArray(a)
      ? (o = {
          tag: 'g',
          attributes: { class: ''.concat(F.cssPrefix, '-').concat(_t.GROUP) },
          children: [
            {
              tag: 'path',
              attributes: {
                class: ''.concat(F.cssPrefix, '-').concat(_t.SECONDARY),
                fill: 'currentColor',
                d: a[0]
              }
            },
            {
              tag: 'path',
              attributes: {
                class: ''.concat(F.cssPrefix, '-').concat(_t.PRIMARY),
                fill: 'currentColor',
                d: a[1]
              }
            }
          ]
        })
      : (o = { tag: 'path', attributes: { fill: 'currentColor', d: a } }),
    { found: !0, width: t, height: n, icon: o }
  )
}
var Gh = { found: !1, width: 512, height: 512 }
function Vh(e, t) {
  !ul &&
    !F.showMissingIcons &&
    e &&
    console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'))
}
function Li(e, t) {
  var n = t
  return (
    t === 'fa' && F.styleDefault !== null && (t = At()),
    new Promise(function (r, i) {
      if ((st('missingIconAbstract'), n === 'fa')) {
        var a = kl(e) || {}
        ;(e = a.iconName || e), (t = a.prefix || t)
      }
      if (e && t && ci[t] && ci[t][e]) {
        var o = ci[t][e]
        return r(zi(o))
      }
      Vh(e, t),
        r(
          M(M({}, Gh), {}, { icon: F.showMissingIcons && e ? st('missingIconAbstract') || {} : {} })
        )
    })
  )
}
var Fo = function () {},
  ji = F.measurePerformance && rr && rr.mark && rr.measure ? rr : { mark: Fo, measure: Fo },
  kn = 'FA "6.4.0"',
  Jh = function (t) {
    return (
      ji.mark(''.concat(kn, ' ').concat(t, ' begins')),
      function () {
        return Pl(t)
      }
    )
  },
  Pl = function (t) {
    ji.mark(''.concat(kn, ' ').concat(t, ' ends')),
      ji.measure(
        ''.concat(kn, ' ').concat(t),
        ''.concat(kn, ' ').concat(t, ' begins'),
        ''.concat(kn, ' ').concat(t, ' ends')
      )
  },
  Ea = { begin: Jh, end: Pl },
  vr = function () {}
function zo(e) {
  var t = e.getAttribute ? e.getAttribute(Lt) : null
  return typeof t == 'string'
}
function Xh(e) {
  var t = e.getAttribute ? e.getAttribute(ha) : null,
    n = e.getAttribute ? e.getAttribute(pa) : null
  return t && n
}
function qh(e) {
  return e && e.classList && e.classList.contains && e.classList.contains(F.replacementClass)
}
function Zh() {
  if (F.autoReplaceSvg === !0) return br.replace
  var e = br[F.autoReplaceSvg]
  return e || br.replace
}
function $h(e) {
  return re.createElementNS('http://www.w3.org/2000/svg', e)
}
function ep(e) {
  return re.createElement(e)
}
function Sl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = t.ceFn,
    r = n === void 0 ? (e.tag === 'svg' ? $h : ep) : n
  if (typeof e == 'string') return re.createTextNode(e)
  var i = r(e.tag)
  Object.keys(e.attributes || []).forEach(function (o) {
    i.setAttribute(o, e.attributes[o])
  })
  var a = e.children || []
  return (
    a.forEach(function (o) {
      i.appendChild(Sl(o, { ceFn: r }))
    }),
    i
  )
}
function tp(e) {
  var t = ' '.concat(e.outerHTML, ' ')
  return (t = ''.concat(t, 'Font Awesome fontawesome.com ')), t
}
var br = {
  replace: function (t) {
    var n = t[0]
    if (n.parentNode)
      if (
        (t[1].forEach(function (i) {
          n.parentNode.insertBefore(Sl(i), n)
        }),
        n.getAttribute(Lt) === null && F.keepOriginalSource)
      ) {
        var r = re.createComment(tp(n))
        n.parentNode.replaceChild(r, n)
      } else n.remove()
  },
  nest: function (t) {
    var n = t[0],
      r = t[1]
    if (~va(n).indexOf(F.replacementClass)) return br.replace(t)
    var i = new RegExp(''.concat(F.cssPrefix, '-.*'))
    if ((delete r[0].attributes.id, r[0].attributes.class)) {
      var a = r[0].attributes.class.split(' ').reduce(
        function (s, l) {
          return l === F.replacementClass || l.match(i) ? s.toSvg.push(l) : s.toNode.push(l), s
        },
        { toNode: [], toSvg: [] }
      )
      ;(r[0].attributes.class = a.toSvg.join(' ')),
        a.toNode.length === 0
          ? n.removeAttribute('class')
          : n.setAttribute('class', a.toNode.join(' '))
    }
    var o = r.map(function (s) {
      return Jn(s)
    }).join(`
`)
    n.setAttribute(Lt, ''), (n.innerHTML = o)
  }
}
function Lo(e) {
  e()
}
function Ol(e, t) {
  var n = typeof t == 'function' ? t : vr
  if (e.length === 0) n()
  else {
    var r = Lo
    F.mutateApproach === ah && (r = yt.requestAnimationFrame || Lo),
      r(function () {
        var i = Zh(),
          a = Ea.begin('mutate')
        e.map(i), a(), n()
      })
  }
}
var ka = !1
function _l() {
  ka = !0
}
function Ui() {
  ka = !1
}
var Sr = null
function jo(e) {
  if (So && F.observeMutations) {
    var t = e.treeCallback,
      n = t === void 0 ? vr : t,
      r = e.nodeCallback,
      i = r === void 0 ? vr : r,
      a = e.pseudoElementsCallback,
      o = a === void 0 ? vr : a,
      s = e.observeMutationsRoot,
      l = s === void 0 ? re : s
    ;(Sr = new So(function (f) {
      if (!ka) {
        var c = At()
        pn(f).forEach(function (d) {
          if (
            (d.type === 'childList' &&
              d.addedNodes.length > 0 &&
              !zo(d.addedNodes[0]) &&
              (F.searchPseudoElements && o(d.target), n(d.target)),
            d.type === 'attributes' &&
              d.target.parentNode &&
              F.searchPseudoElements &&
              o(d.target.parentNode),
            d.type === 'attributes' && zo(d.target) && ~dh.indexOf(d.attributeName))
          )
            if (d.attributeName === 'class' && Xh(d.target)) {
              var h = Yr(va(d.target)),
                g = h.prefix,
                P = h.iconName
              d.target.setAttribute(ha, g || c), P && d.target.setAttribute(pa, P)
            } else qh(d.target) && i(d.target)
        })
      }
    })),
      ct && Sr.observe(l, { childList: !0, attributes: !0, characterData: !0, subtree: !0 })
  }
}
function np() {
  Sr && Sr.disconnect()
}
function rp(e) {
  var t = e.getAttribute('style'),
    n = []
  return (
    t &&
      (n = t.split(';').reduce(function (r, i) {
        var a = i.split(':'),
          o = a[0],
          s = a.slice(1)
        return o && s.length > 0 && (r[o] = s.join(':').trim()), r
      }, {})),
    n
  )
}
function ip(e) {
  var t = e.getAttribute('data-prefix'),
    n = e.getAttribute('data-icon'),
    r = e.innerText !== void 0 ? e.innerText.trim() : '',
    i = Yr(va(e))
  return (
    i.prefix || (i.prefix = At()),
    t && n && ((i.prefix = t), (i.iconName = n)),
    (i.iconName && i.prefix) ||
      (i.prefix &&
        r.length > 0 &&
        (i.iconName = Fh(i.prefix, e.innerText) || Aa(i.prefix, Ti(e.innerText))),
      !i.iconName &&
        F.autoFetchSvg &&
        e.firstChild &&
        e.firstChild.nodeType === Node.TEXT_NODE &&
        (i.iconName = e.firstChild.data)),
    i
  )
}
function ap(e) {
  var t = pn(e.attributes).reduce(function (i, a) {
      return i.name !== 'class' && i.name !== 'style' && (i[a.name] = a.value), i
    }, {}),
    n = e.getAttribute('title'),
    r = e.getAttribute('data-fa-title-id')
  return (
    F.autoA11y &&
      (n
        ? (t['aria-labelledby'] = ''.concat(F.replacementClass, '-title-').concat(r || Qn()))
        : ((t['aria-hidden'] = 'true'), (t.focusable = 'false'))),
    t
  )
}
function op() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: $e,
    symbol: !1,
    mask: { iconName: null, prefix: null, rest: [] },
    maskId: null,
    extra: { classes: [], styles: {}, attributes: {} }
  }
}
function Uo(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { styleParser: !0 },
    n = ip(e),
    r = n.iconName,
    i = n.prefix,
    a = n.rest,
    o = ap(e),
    s = Ni('parseNodeAttributes', {}, e),
    l = t.styleParser ? rp(e) : []
  return M(
    {
      iconName: r,
      title: e.getAttribute('title'),
      titleId: e.getAttribute('data-fa-title-id'),
      prefix: i,
      transform: $e,
      mask: { iconName: null, prefix: null, rest: [] },
      maskId: null,
      symbol: !1,
      extra: { classes: a, styles: l, attributes: o }
    },
    s
  )
}
var sp = Ke.styles
function Il(e) {
  var t = F.autoReplaceSvg === 'nest' ? Uo(e, { styleParser: !1 }) : Uo(e)
  return ~t.extra.classes.indexOf(dl)
    ? st('generateLayersText', e, t)
    : st('generateSvgReplacementMutation', e, t)
}
var wt = new Set()
ga.map(function (e) {
  wt.add('fa-'.concat(e))
})
Object.keys(Kn[ne]).map(wt.add.bind(wt))
Object.keys(Kn[ce]).map(wt.add.bind(wt))
wt = Gn(wt)
function Bo(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null
  if (!ct) return Promise.resolve()
  var n = re.documentElement.classList,
    r = function (d) {
      return n.add(''.concat(Oo, '-').concat(d))
    },
    i = function (d) {
      return n.remove(''.concat(Oo, '-').concat(d))
    },
    a = F.autoFetchSvg
      ? wt
      : ga
          .map(function (c) {
            return 'fa-'.concat(c)
          })
          .concat(Object.keys(sp))
  a.includes('fa') || a.push('fa')
  var o = ['.'.concat(dl, ':not([').concat(Lt, '])')]
    .concat(
      a.map(function (c) {
        return '.'.concat(c, ':not([').concat(Lt, '])')
      })
    )
    .join(', ')
  if (o.length === 0) return Promise.resolve()
  var s = []
  try {
    s = pn(e.querySelectorAll(o))
  } catch {}
  if (s.length > 0) r('pending'), i('complete')
  else return Promise.resolve()
  var l = Ea.begin('onTree'),
    f = s.reduce(function (c, d) {
      try {
        var h = Il(d)
        h && c.push(h)
      } catch (g) {
        ul || (g.name === 'MissingIcon' && console.error(g))
      }
      return c
    }, [])
  return new Promise(function (c, d) {
    Promise.all(f)
      .then(function (h) {
        Ol(h, function () {
          r('active'), r('complete'), i('pending'), typeof t == 'function' && t(), l(), c()
        })
      })
      .catch(function (h) {
        l(), d(h)
      })
  })
}
function lp(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null
  Il(e).then(function (n) {
    n && Ol([n], t)
  })
}
function cp(e) {
  return function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = (t || {}).icon ? t : Fi(t || {}),
      i = n.mask
    return i && (i = (i || {}).icon ? i : Fi(i || {})), e(r, M(M({}, n), {}, { mask: i }))
  }
}
var fp = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = n.transform,
      i = r === void 0 ? $e : r,
      a = n.symbol,
      o = a === void 0 ? !1 : a,
      s = n.mask,
      l = s === void 0 ? null : s,
      f = n.maskId,
      c = f === void 0 ? null : f,
      d = n.title,
      h = d === void 0 ? null : d,
      g = n.titleId,
      P = g === void 0 ? null : g,
      I = n.classes,
      z = I === void 0 ? [] : I,
      b = n.attributes,
      w = b === void 0 ? {} : b,
      S = n.styles,
      B = S === void 0 ? {} : S
    if (t) {
      var Q = t.prefix,
        ie = t.iconName,
        le = t.icon
      return Gr(M({ type: 'icon' }, t), function () {
        return (
          jt('beforeDOMElementCreation', { iconDefinition: t, params: n }),
          F.autoA11y &&
            (h
              ? (w['aria-labelledby'] = ''.concat(F.replacementClass, '-title-').concat(P || Qn()))
              : ((w['aria-hidden'] = 'true'), (w.focusable = 'false'))),
          xa({
            icons: {
              main: zi(le),
              mask: l ? zi(l.icon) : { found: !1, width: null, height: null, icon: {} }
            },
            prefix: Q,
            iconName: ie,
            transform: M(M({}, $e), i),
            symbol: o,
            title: h,
            maskId: c,
            titleId: P,
            extra: { attributes: w, styles: B, classes: z }
          })
        )
      })
    }
  },
  up = {
    mixout: function () {
      return { icon: cp(fp) }
    },
    hooks: function () {
      return {
        mutationObserverCallbacks: function (n) {
          return (n.treeCallback = Bo), (n.nodeCallback = lp), n
        }
      }
    },
    provides: function (t) {
      ;(t.i2svg = function (n) {
        var r = n.node,
          i = r === void 0 ? re : r,
          a = n.callback,
          o = a === void 0 ? function () {} : a
        return Bo(i, o)
      }),
        (t.generateSvgReplacementMutation = function (n, r) {
          var i = r.iconName,
            a = r.title,
            o = r.titleId,
            s = r.prefix,
            l = r.transform,
            f = r.symbol,
            c = r.mask,
            d = r.maskId,
            h = r.extra
          return new Promise(function (g, P) {
            Promise.all([
              Li(i, s),
              c.iconName
                ? Li(c.iconName, c.prefix)
                : Promise.resolve({ found: !1, width: 512, height: 512, icon: {} })
            ])
              .then(function (I) {
                var z = da(I, 2),
                  b = z[0],
                  w = z[1]
                g([
                  n,
                  xa({
                    icons: { main: b, mask: w },
                    prefix: s,
                    iconName: i,
                    transform: l,
                    symbol: f,
                    maskId: d,
                    title: a,
                    titleId: o,
                    extra: h,
                    watchable: !0
                  })
                ])
              })
              .catch(P)
          })
        }),
        (t.generateAbstractIcon = function (n) {
          var r = n.children,
            i = n.attributes,
            a = n.main,
            o = n.transform,
            s = n.styles,
            l = Wr(s)
          l.length > 0 && (i.style = l)
          var f
          return (
            ba(o) &&
              (f = st('generateAbstractTransformGrouping', {
                main: a,
                transform: o,
                containerWidth: a.width,
                iconWidth: a.width
              })),
            r.push(f || a.icon),
            { children: r, attributes: i }
          )
        })
    }
  },
  dp = {
    mixout: function () {
      return {
        layer: function (n) {
          var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            i = r.classes,
            a = i === void 0 ? [] : i
          return Gr({ type: 'layer' }, function () {
            jt('beforeDOMElementCreation', { assembler: n, params: r })
            var o = []
            return (
              n(function (s) {
                Array.isArray(s)
                  ? s.map(function (l) {
                      o = o.concat(l.abstract)
                    })
                  : (o = o.concat(s.abstract))
              }),
              [
                {
                  tag: 'span',
                  attributes: {
                    class: [''.concat(F.cssPrefix, '-layers')].concat(Gn(a)).join(' ')
                  },
                  children: o
                }
              ]
            )
          })
        }
      }
    }
  },
  mp = {
    mixout: function () {
      return {
        counter: function (n) {
          var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            i = r.title,
            a = i === void 0 ? null : i,
            o = r.classes,
            s = o === void 0 ? [] : o,
            l = r.attributes,
            f = l === void 0 ? {} : l,
            c = r.styles,
            d = c === void 0 ? {} : c
          return Gr({ type: 'counter', content: n }, function () {
            return (
              jt('beforeDOMElementCreation', { content: n, params: r }),
              Yh({
                content: n.toString(),
                title: a,
                extra: {
                  attributes: f,
                  styles: d,
                  classes: [''.concat(F.cssPrefix, '-layers-counter')].concat(Gn(s))
                }
              })
            )
          })
        }
      }
    }
  },
  hp = {
    mixout: function () {
      return {
        text: function (n) {
          var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            i = r.transform,
            a = i === void 0 ? $e : i,
            o = r.title,
            s = o === void 0 ? null : o,
            l = r.classes,
            f = l === void 0 ? [] : l,
            c = r.attributes,
            d = c === void 0 ? {} : c,
            h = r.styles,
            g = h === void 0 ? {} : h
          return Gr({ type: 'text', content: n }, function () {
            return (
              jt('beforeDOMElementCreation', { content: n, params: r }),
              No({
                content: n,
                transform: M(M({}, $e), a),
                title: s,
                extra: {
                  attributes: d,
                  styles: g,
                  classes: [''.concat(F.cssPrefix, '-layers-text')].concat(Gn(f))
                }
              })
            )
          })
        }
      }
    },
    provides: function (t) {
      t.generateLayersText = function (n, r) {
        var i = r.title,
          a = r.transform,
          o = r.extra,
          s = null,
          l = null
        if (ll) {
          var f = parseInt(getComputedStyle(n).fontSize, 10),
            c = n.getBoundingClientRect()
          ;(s = c.width / f), (l = c.height / f)
        }
        return (
          F.autoA11y && !i && (o.attributes['aria-hidden'] = 'true'),
          Promise.resolve([
            n,
            No({
              content: n.innerHTML,
              width: s,
              height: l,
              transform: a,
              title: i,
              extra: o,
              watchable: !0
            })
          ])
        )
      }
    }
  },
  pp = new RegExp('"', 'ug'),
  Ko = [1105920, 1112319]
function gp(e) {
  var t = e.replace(pp, ''),
    n = _h(t, 0),
    r = n >= Ko[0] && n <= Ko[1],
    i = t.length === 2 ? t[0] === t[1] : !1
  return { value: Ti(i ? t[0] : t), isSecondary: r || i }
}
function Do(e, t) {
  var n = ''.concat(ih).concat(t.replace(':', '-'))
  return new Promise(function (r, i) {
    if (e.getAttribute(n) !== null) return r()
    var a = pn(e.children),
      o = a.filter(function (le) {
        return le.getAttribute(Ri) === t
      })[0],
      s = yt.getComputedStyle(e, t),
      l = s.getPropertyValue('font-family').match(ch),
      f = s.getPropertyValue('font-weight'),
      c = s.getPropertyValue('content')
    if (o && !l) return e.removeChild(o), r()
    if (l && c !== 'none' && c !== '') {
      var d = s.getPropertyValue('content'),
        h = ~['Sharp'].indexOf(l[2]) ? ce : ne,
        g = ~['Solid', 'Regular', 'Light', 'Thin', 'Duotone', 'Brands', 'Kit'].indexOf(l[2])
          ? Dn[h][l[2].toLowerCase()]
          : fh[h][f],
        P = gp(d),
        I = P.value,
        z = P.isSecondary,
        b = l[0].startsWith('FontAwesome'),
        w = Aa(g, I),
        S = w
      if (b) {
        var B = zh(I)
        B.iconName && B.prefix && ((w = B.iconName), (g = B.prefix))
      }
      if (w && !z && (!o || o.getAttribute(ha) !== g || o.getAttribute(pa) !== S)) {
        e.setAttribute(n, S), o && e.removeChild(o)
        var Q = op(),
          ie = Q.extra
        ;(ie.attributes[Ri] = t),
          Li(w, g)
            .then(function (le) {
              var Oe = xa(
                  M(
                    M({}, Q),
                    {},
                    {
                      icons: { main: le, mask: wa() },
                      prefix: g,
                      iconName: S,
                      extra: ie,
                      watchable: !0
                    }
                  )
                ),
                Ae = re.createElement('svg')
              t === '::before' ? e.insertBefore(Ae, e.firstChild) : e.appendChild(Ae),
                (Ae.outerHTML = Oe.map(function (Re) {
                  return Jn(Re)
                }).join(`
`)),
                e.removeAttribute(n),
                r()
            })
            .catch(i)
      } else r()
    } else r()
  })
}
function vp(e) {
  return Promise.all([Do(e, '::before'), Do(e, '::after')])
}
function bp(e) {
  return (
    e.parentNode !== document.head &&
    !~oh.indexOf(e.tagName.toUpperCase()) &&
    !e.getAttribute(Ri) &&
    (!e.parentNode || e.parentNode.tagName !== 'svg')
  )
}
function Ho(e) {
  if (ct)
    return new Promise(function (t, n) {
      var r = pn(e.querySelectorAll('*')).filter(bp).map(vp),
        i = Ea.begin('searchPseudoElements')
      _l(),
        Promise.all(r)
          .then(function () {
            i(), Ui(), t()
          })
          .catch(function () {
            i(), Ui(), n()
          })
    })
}
var yp = {
    hooks: function () {
      return {
        mutationObserverCallbacks: function (n) {
          return (n.pseudoElementsCallback = Ho), n
        }
      }
    },
    provides: function (t) {
      t.pseudoElements2svg = function (n) {
        var r = n.node,
          i = r === void 0 ? re : r
        F.searchPseudoElements && Ho(i)
      }
    }
  },
  Wo = !1,
  Ap = {
    mixout: function () {
      return {
        dom: {
          unwatch: function () {
            _l(), (Wo = !0)
          }
        }
      }
    },
    hooks: function () {
      return {
        bootstrap: function () {
          jo(Ni('mutationObserverCallbacks', {}))
        },
        noAuto: function () {
          np()
        },
        watch: function (n) {
          var r = n.observeMutationsRoot
          Wo ? Ui() : jo(Ni('mutationObserverCallbacks', { observeMutationsRoot: r }))
        }
      }
    }
  },
  Qo = function (t) {
    var n = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 }
    return t
      .toLowerCase()
      .split(' ')
      .reduce(function (r, i) {
        var a = i.toLowerCase().split('-'),
          o = a[0],
          s = a.slice(1).join('-')
        if (o && s === 'h') return (r.flipX = !0), r
        if (o && s === 'v') return (r.flipY = !0), r
        if (((s = parseFloat(s)), isNaN(s))) return r
        switch (o) {
          case 'grow':
            r.size = r.size + s
            break
          case 'shrink':
            r.size = r.size - s
            break
          case 'left':
            r.x = r.x - s
            break
          case 'right':
            r.x = r.x + s
            break
          case 'up':
            r.y = r.y - s
            break
          case 'down':
            r.y = r.y + s
            break
          case 'rotate':
            r.rotate = r.rotate + s
            break
        }
        return r
      }, n)
  },
  wp = {
    mixout: function () {
      return {
        parse: {
          transform: function (n) {
            return Qo(n)
          }
        }
      }
    },
    hooks: function () {
      return {
        parseNodeAttributes: function (n, r) {
          var i = r.getAttribute('data-fa-transform')
          return i && (n.transform = Qo(i)), n
        }
      }
    },
    provides: function (t) {
      t.generateAbstractTransformGrouping = function (n) {
        var r = n.main,
          i = n.transform,
          a = n.containerWidth,
          o = n.iconWidth,
          s = { transform: 'translate('.concat(a / 2, ' 256)') },
          l = 'translate('.concat(i.x * 32, ', ').concat(i.y * 32, ') '),
          f = 'scale('
            .concat((i.size / 16) * (i.flipX ? -1 : 1), ', ')
            .concat((i.size / 16) * (i.flipY ? -1 : 1), ') '),
          c = 'rotate('.concat(i.rotate, ' 0 0)'),
          d = { transform: ''.concat(l, ' ').concat(f, ' ').concat(c) },
          h = { transform: 'translate('.concat((o / 2) * -1, ' -256)') },
          g = { outer: s, inner: d, path: h }
        return {
          tag: 'g',
          attributes: M({}, g.outer),
          children: [
            {
              tag: 'g',
              attributes: M({}, g.inner),
              children: [
                {
                  tag: r.icon.tag,
                  children: r.icon.children,
                  attributes: M(M({}, r.icon.attributes), g.path)
                }
              ]
            }
          ]
        }
      }
    }
  },
  fi = { x: 0, y: 0, width: '100%', height: '100%' }
function Yo(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = 'black'), e
}
function xp(e) {
  return e.tag === 'g' ? e.children : [e]
}
var Ep = {
    hooks: function () {
      return {
        parseNodeAttributes: function (n, r) {
          var i = r.getAttribute('data-fa-mask'),
            a = i
              ? Yr(
                  i.split(' ').map(function (o) {
                    return o.trim()
                  })
                )
              : wa()
          return (
            a.prefix || (a.prefix = At()),
            (n.mask = a),
            (n.maskId = r.getAttribute('data-fa-mask-id')),
            n
          )
        }
      }
    },
    provides: function (t) {
      t.generateAbstractMask = function (n) {
        var r = n.children,
          i = n.attributes,
          a = n.main,
          o = n.mask,
          s = n.maskId,
          l = n.transform,
          f = a.width,
          c = a.icon,
          d = o.width,
          h = o.icon,
          g = wh({ transform: l, containerWidth: d, iconWidth: f }),
          P = { tag: 'rect', attributes: M(M({}, fi), {}, { fill: 'white' }) },
          I = c.children ? { children: c.children.map(Yo) } : {},
          z = {
            tag: 'g',
            attributes: M({}, g.inner),
            children: [Yo(M({ tag: c.tag, attributes: M(M({}, c.attributes), g.path) }, I))]
          },
          b = { tag: 'g', attributes: M({}, g.outer), children: [z] },
          w = 'mask-'.concat(s || Qn()),
          S = 'clip-'.concat(s || Qn()),
          B = {
            tag: 'mask',
            attributes: M(
              M({}, fi),
              {},
              { id: w, maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse' }
            ),
            children: [P, b]
          },
          Q = {
            tag: 'defs',
            children: [{ tag: 'clipPath', attributes: { id: S }, children: xp(h) }, B]
          }
        return (
          r.push(Q, {
            tag: 'rect',
            attributes: M(
              {
                fill: 'currentColor',
                'clip-path': 'url(#'.concat(S, ')'),
                mask: 'url(#'.concat(w, ')')
              },
              fi
            )
          }),
          { children: r, attributes: i }
        )
      }
    }
  },
  kp = {
    provides: function (t) {
      var n = !1
      yt.matchMedia && (n = yt.matchMedia('(prefers-reduced-motion: reduce)').matches),
        (t.missingIconAbstract = function () {
          var r = [],
            i = { fill: 'currentColor' },
            a = { attributeType: 'XML', repeatCount: 'indefinite', dur: '2s' }
          r.push({
            tag: 'path',
            attributes: M(
              M({}, i),
              {},
              {
                d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
              }
            )
          })
          var o = M(M({}, a), {}, { attributeName: 'opacity' }),
            s = {
              tag: 'circle',
              attributes: M(M({}, i), {}, { cx: '256', cy: '364', r: '28' }),
              children: []
            }
          return (
            n ||
              s.children.push(
                {
                  tag: 'animate',
                  attributes: M(M({}, a), {}, { attributeName: 'r', values: '28;14;28;28;14;28;' })
                },
                { tag: 'animate', attributes: M(M({}, o), {}, { values: '1;0;1;1;0;1;' }) }
              ),
            r.push(s),
            r.push({
              tag: 'path',
              attributes: M(
                M({}, i),
                {},
                {
                  opacity: '1',
                  d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
                }
              ),
              children: n
                ? []
                : [{ tag: 'animate', attributes: M(M({}, o), {}, { values: '1;0;0;0;0;1;' }) }]
            }),
            n ||
              r.push({
                tag: 'path',
                attributes: M(
                  M({}, i),
                  {},
                  {
                    opacity: '0',
                    d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
                  }
                ),
                children: [
                  { tag: 'animate', attributes: M(M({}, o), {}, { values: '0;0;1;1;0;0;' }) }
                ]
              }),
            { tag: 'g', attributes: { class: 'missing' }, children: r }
          )
        })
    }
  },
  Cp = {
    hooks: function () {
      return {
        parseNodeAttributes: function (n, r) {
          var i = r.getAttribute('data-fa-symbol'),
            a = i === null ? !1 : i === '' ? !0 : i
          return (n.symbol = a), n
        }
      }
    }
  },
  Pp = [kh, up, dp, mp, hp, yp, Ap, wp, Ep, kp, Cp]
Uh(Pp, { mixoutsTo: Ie })
Ie.noAuto
var Rl = Ie.config,
  Sp = Ie.library
Ie.dom
var Or = Ie.parse
Ie.findIconDefinition
Ie.toHtml
var Op = Ie.icon
Ie.layer
var _p = Ie.text
Ie.counter
var Ip = {
  prefix: 'fas',
  iconName: 'phone',
  icon: [
    512,
    512,
    [128222, 128379],
    'f095',
    'M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z'
  ]
}
const Rp = {
  install(e) {
    e.directive('auto-animate', om)
  }
}
function Go(e, t) {
  var n = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e)
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      n.push.apply(n, r)
  }
  return n
}
function Ue(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Go(Object(n), !0).forEach(function (r) {
          ke(e, r, n[r])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Go(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
  }
  return e
}
function _r(e) {
  return (
    (_r =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    _r(e)
  )
}
function ke(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  )
}
function Tp(e, t) {
  if (e == null) return {}
  var n = {},
    r = Object.keys(e),
    i,
    a
  for (a = 0; a < r.length; a++) (i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i])
  return n
}
function Mp(e, t) {
  if (e == null) return {}
  var n = Tp(e, t),
    r,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r])
  }
  return n
}
function Bi(e) {
  return Np(e) || Fp(e) || zp(e) || Lp()
}
function Np(e) {
  if (Array.isArray(e)) return Ki(e)
}
function Fp(e) {
  if ((typeof Symbol < 'u' && e[Symbol.iterator] != null) || e['@@iterator'] != null)
    return Array.from(e)
}
function zp(e, t) {
  if (e) {
    if (typeof e == 'string') return Ki(e, t)
    var n = Object.prototype.toString.call(e).slice(8, -1)
    if ((n === 'Object' && e.constructor && (n = e.constructor.name), n === 'Map' || n === 'Set'))
      return Array.from(e)
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ki(e, t)
  }
}
function Ki(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
  return r
}
function Lp() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
var jp =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {},
  Tl = { exports: {} }
;(function (e) {
  ;(function (t) {
    var n = function (b, w, S) {
        if (!f(w) || d(w) || h(w) || g(w) || l(w)) return w
        var B,
          Q = 0,
          ie = 0
        if (c(w)) for (B = [], ie = w.length; Q < ie; Q++) B.push(n(b, w[Q], S))
        else {
          B = {}
          for (var le in w)
            Object.prototype.hasOwnProperty.call(w, le) && (B[b(le, S)] = n(b, w[le], S))
        }
        return B
      },
      r = function (b, w) {
        w = w || {}
        var S = w.separator || '_',
          B = w.split || /(?=[A-Z])/
        return b.split(B).join(S)
      },
      i = function (b) {
        return P(b)
          ? b
          : ((b = b.replace(/[\-_\s]+(.)?/g, function (w, S) {
              return S ? S.toUpperCase() : ''
            })),
            b.substr(0, 1).toLowerCase() + b.substr(1))
      },
      a = function (b) {
        var w = i(b)
        return w.substr(0, 1).toUpperCase() + w.substr(1)
      },
      o = function (b, w) {
        return r(b, w).toLowerCase()
      },
      s = Object.prototype.toString,
      l = function (b) {
        return typeof b == 'function'
      },
      f = function (b) {
        return b === Object(b)
      },
      c = function (b) {
        return s.call(b) == '[object Array]'
      },
      d = function (b) {
        return s.call(b) == '[object Date]'
      },
      h = function (b) {
        return s.call(b) == '[object RegExp]'
      },
      g = function (b) {
        return s.call(b) == '[object Boolean]'
      },
      P = function (b) {
        return (b = b - 0), b === b
      },
      I = function (b, w) {
        var S = w && 'process' in w ? w.process : w
        return typeof S != 'function'
          ? b
          : function (B, Q) {
              return S(B, b, Q)
            }
      },
      z = {
        camelize: i,
        decamelize: o,
        pascalize: a,
        depascalize: o,
        camelizeKeys: function (b, w) {
          return n(I(i, w), b)
        },
        decamelizeKeys: function (b, w) {
          return n(I(o, w), b, w)
        },
        pascalizeKeys: function (b, w) {
          return n(I(a, w), b)
        },
        depascalizeKeys: function () {
          return this.decamelizeKeys.apply(this, arguments)
        }
      }
    e.exports ? (e.exports = z) : (t.humps = z)
  })(jp)
})(Tl)
var Up = Tl.exports,
  Bp = ['class', 'style']
function Kp(e) {
  return e
    .split(';')
    .map(function (t) {
      return t.trim()
    })
    .filter(function (t) {
      return t
    })
    .reduce(function (t, n) {
      var r = n.indexOf(':'),
        i = Up.camelize(n.slice(0, r)),
        a = n.slice(r + 1).trim()
      return (t[i] = a), t
    }, {})
}
function Dp(e) {
  return e.split(/\s+/).reduce(function (t, n) {
    return (t[n] = !0), t
  }, {})
}
function Ca(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
  if (typeof e == 'string') return e
  var r = (e.children || []).map(function (l) {
      return Ca(l)
    }),
    i = Object.keys(e.attributes || {}).reduce(
      function (l, f) {
        var c = e.attributes[f]
        switch (f) {
          case 'class':
            l.class = Dp(c)
            break
          case 'style':
            l.style = Kp(c)
            break
          default:
            l.attrs[f] = c
        }
        return l
      },
      { attrs: {}, class: {}, style: {} }
    )
  n.class
  var a = n.style,
    o = a === void 0 ? {} : a,
    s = Mp(n, Bp)
  return Kr(
    e.tag,
    Ue(Ue(Ue({}, t), {}, { class: i.class, style: Ue(Ue({}, i.style), o) }, i.attrs), s),
    r
  )
}
var Ml = !1
try {
  Ml = !0
} catch {}
function Hp() {
  if (!Ml && console && typeof console.error == 'function') {
    var e
    ;(e = console).error.apply(e, arguments)
  }
}
function Mn(e, t) {
  return (Array.isArray(t) && t.length > 0) || (!Array.isArray(t) && t) ? ke({}, e, t) : {}
}
function Wp(e) {
  var t,
    n =
      ((t = {
        'fa-spin': e.spin,
        'fa-pulse': e.pulse,
        'fa-fw': e.fixedWidth,
        'fa-border': e.border,
        'fa-li': e.listItem,
        'fa-inverse': e.inverse,
        'fa-flip': e.flip === !0,
        'fa-flip-horizontal': e.flip === 'horizontal' || e.flip === 'both',
        'fa-flip-vertical': e.flip === 'vertical' || e.flip === 'both'
      }),
      ke(t, 'fa-'.concat(e.size), e.size !== null),
      ke(t, 'fa-rotate-'.concat(e.rotation), e.rotation !== null),
      ke(t, 'fa-pull-'.concat(e.pull), e.pull !== null),
      ke(t, 'fa-swap-opacity', e.swapOpacity),
      ke(t, 'fa-bounce', e.bounce),
      ke(t, 'fa-shake', e.shake),
      ke(t, 'fa-beat', e.beat),
      ke(t, 'fa-fade', e.fade),
      ke(t, 'fa-beat-fade', e.beatFade),
      ke(t, 'fa-flash', e.flash),
      ke(t, 'fa-spin-pulse', e.spinPulse),
      ke(t, 'fa-spin-reverse', e.spinReverse),
      t)
  return Object.keys(n)
    .map(function (r) {
      return n[r] ? r : null
    })
    .filter(function (r) {
      return r
    })
}
function Vo(e) {
  if (e && _r(e) === 'object' && e.prefix && e.iconName && e.icon) return e
  if (Or.icon) return Or.icon(e)
  if (e === null) return null
  if (_r(e) === 'object' && e.prefix && e.iconName) return e
  if (Array.isArray(e) && e.length === 2) return { prefix: e[0], iconName: e[1] }
  if (typeof e == 'string') return { prefix: 'fas', iconName: e }
}
var Qp = hn({
  name: 'FontAwesomeIcon',
  props: {
    border: { type: Boolean, default: !1 },
    fixedWidth: { type: Boolean, default: !1 },
    flip: {
      type: [Boolean, String],
      default: !1,
      validator: function (t) {
        return [!0, !1, 'horizontal', 'vertical', 'both'].indexOf(t) > -1
      }
    },
    icon: { type: [Object, Array, String], required: !0 },
    mask: { type: [Object, Array, String], default: null },
    listItem: { type: Boolean, default: !1 },
    pull: {
      type: String,
      default: null,
      validator: function (t) {
        return ['right', 'left'].indexOf(t) > -1
      }
    },
    pulse: { type: Boolean, default: !1 },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function (t) {
        return [90, 180, 270].indexOf(Number.parseInt(t, 10)) > -1
      }
    },
    swapOpacity: { type: Boolean, default: !1 },
    size: {
      type: String,
      default: null,
      validator: function (t) {
        return (
          [
            '2xs',
            'xs',
            'sm',
            'lg',
            'xl',
            '2xl',
            '1x',
            '2x',
            '3x',
            '4x',
            '5x',
            '6x',
            '7x',
            '8x',
            '9x',
            '10x'
          ].indexOf(t) > -1
        )
      }
    },
    spin: { type: Boolean, default: !1 },
    transform: { type: [String, Object], default: null },
    symbol: { type: [Boolean, String], default: !1 },
    title: { type: String, default: null },
    inverse: { type: Boolean, default: !1 },
    bounce: { type: Boolean, default: !1 },
    shake: { type: Boolean, default: !1 },
    beat: { type: Boolean, default: !1 },
    fade: { type: Boolean, default: !1 },
    beatFade: { type: Boolean, default: !1 },
    flash: { type: Boolean, default: !1 },
    spinPulse: { type: Boolean, default: !1 },
    spinReverse: { type: Boolean, default: !1 }
  },
  setup: function (t, n) {
    var r = n.attrs,
      i = se(function () {
        return Vo(t.icon)
      }),
      a = se(function () {
        return Mn('classes', Wp(t))
      }),
      o = se(function () {
        return Mn(
          'transform',
          typeof t.transform == 'string' ? Or.transform(t.transform) : t.transform
        )
      }),
      s = se(function () {
        return Mn('mask', Vo(t.mask))
      }),
      l = se(function () {
        return Op(
          i.value,
          Ue(Ue(Ue(Ue({}, a.value), o.value), s.value), {}, { symbol: t.symbol, title: t.title })
        )
      })
    Pn(
      l,
      function (c) {
        if (!c) return Hp('Could not find one or more icon(s)', i.value, s.value)
      },
      { immediate: !0 }
    )
    var f = se(function () {
      return l.value ? Ca(l.value.abstract[0], {}, r) : null
    })
    return function () {
      return f.value
    }
  }
})
hn({
  name: 'FontAwesomeLayers',
  props: { fixedWidth: { type: Boolean, default: !1 } },
  setup: function (t, n) {
    var r = n.slots,
      i = Rl.familyPrefix,
      a = se(function () {
        return [''.concat(i, '-layers')].concat(Bi(t.fixedWidth ? [''.concat(i, '-fw')] : []))
      })
    return function () {
      return Kr('div', { class: a.value }, r.default ? r.default() : [])
    }
  }
})
hn({
  name: 'FontAwesomeLayersText',
  props: {
    value: { type: [String, Number], default: '' },
    transform: { type: [String, Object], default: null },
    counter: { type: Boolean, default: !1 },
    position: {
      type: String,
      default: null,
      validator: function (t) {
        return ['bottom-left', 'bottom-right', 'top-left', 'top-right'].indexOf(t) > -1
      }
    }
  },
  setup: function (t, n) {
    var r = n.attrs,
      i = Rl.familyPrefix,
      a = se(function () {
        return Mn(
          'classes',
          [].concat(
            Bi(t.counter ? [''.concat(i, '-layers-counter')] : []),
            Bi(t.position ? [''.concat(i, '-layers-').concat(t.position)] : [])
          )
        )
      }),
      o = se(function () {
        return Mn(
          'transform',
          typeof t.transform == 'string' ? Or.transform(t.transform) : t.transform
        )
      }),
      s = se(function () {
        var f = _p(t.value.toString(), Ue(Ue({}, o.value), a.value)),
          c = f.abstract
        return (
          t.counter &&
            (c[0].attributes.class = c[0].attributes.class.replace('fa-layers-text', '')),
          c[0]
        )
      }),
      l = se(function () {
        return Ca(s.value, {}, r)
      })
    return function () {
      return l.value
    }
  }
})
Sp.add(Ip)
const Vr = au(gm).component('font-awesome-icon', Qp)
Vr.use(cu())
Vr.use(Vm)
Vr.use(Rp)
Vr.mount('#app')
export { bd as _, C as a, Ur as c, nn as o }
