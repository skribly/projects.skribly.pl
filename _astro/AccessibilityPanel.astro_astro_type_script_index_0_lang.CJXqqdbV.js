import { a as e, i as t, n, r, t as i } from "./cookie.Bm5aWS5f.js";
import { t as a } from "./motion.DMAhcwwu.js";
var o = `sk-a11y`, s = [
	100,
	110,
	120,
	130,
	140
], c = [
	`grayscale`,
	`contrast`,
	`invert`,
	`light`
], l = [
	`links`,
	`font`,
	`motion`,
	`focus`
], u = new Set([...c, ...l]);
function d() {
	return {
		size: 100,
		on: []
	};
}
function f(e) {
	return s.includes(e);
}
function p(e) {
	return typeof e == `string` && u.has(e);
}
function m(e) {
	if (!e) return null;
	try {
		let t = JSON.parse(e);
		if (!t || typeof t != `object`) return null;
		let { size: n, on: r } = t, i = Array.isArray(r) ? r.filter(p) : [], a = i.filter((e) => c.includes(e));
		return {
			size: f(n) ? n : 100,
			on: [...new Set(i.filter((e) => !a.slice(1).includes(e)))]
		};
	} catch {
		return null;
	}
}
function h(e) {
	return JSON.stringify({
		size: e.size,
		on: e.on
	});
}
function g(e, t) {
	return m(n(e, `sk-a11y`)) ?? m(r(t, `sk-a11y`)) ?? d();
}
function _(e, t) {
	if (e.on.includes(t)) return {
		...e,
		on: e.on.filter((e) => e !== t)
	};
	let n = c.includes(t) ? e.on.filter((e) => !c.includes(e)) : e.on;
	return {
		...e,
		on: [...n, t]
	};
}
function v(e, t) {
	let n = s[s.indexOf(e.size) + t];
	return n ? {
		...e,
		size: n
	} : e;
}
function y(e) {
	let t = e.on.map((e) => `sk-a11y-${e}`);
	return e.size !== 100 && t.push(`sk-a11y-size-${e.size}`), e.on.includes(`motion`) && t.push(`a11y-reduce-motion`), e.on.includes(`focus`) && t.push(`a11y-strong-focus`), t;
}
function b(e, t) {
	e.className = [...[...e.classList].filter((e) => !e.startsWith(`sk-a11y-`) && e !== `a11y-reduce-motion` && e !== `a11y-strong-focus`), ...y(t)].join(` `);
}
function x(n, r = document, a = i(r.defaultView ?? void 0)) {
	let s = h(n);
	t(r, o, s), e(a, o, s);
}
function S(e, t = document) {
	if (`skReady` in e.dataset) return;
	e.dataset.skReady = ``;
	let n = t.documentElement, r = i(t.defaultView ?? void 0), o = g(t.cookie, r), c = null, l = () => [...t.querySelectorAll(`[data-sk-a11y-open][aria-controls="${e.id}"]`)], u = e.querySelector(`[data-sk-a11y-title]`), f = e.querySelector(`[data-sk-a11y-size]`), m = e.querySelector(`[data-sk-a11y-step="-1"]`), h = e.querySelector(`[data-sk-a11y-step="1"]`), y = [...e.querySelectorAll(`[data-sk-a11y-option]`)], S = () => {
		f && (f.textContent = `${o.size}%`), m && (m.disabled = o.size === s[0]), h && (h.disabled = o.size === s[s.length - 1]);
		for (let e of y) {
			let t = e.dataset.skA11yOption;
			e.setAttribute(`aria-pressed`, String(p(t) && o.on.includes(t)));
		}
	}, C = (e) => {
		let i = o.on.includes(`motion`);
		o = e, b(n, o), x(o, t, r), S(), i !== o.on.includes(`motion`) && t.defaultView?.dispatchEvent(new CustomEvent(a));
	}, w = (t, n) => {
		e.hidden = !t;
		for (let e of l()) e.setAttribute(`aria-expanded`, String(t));
		t ? u?.focus() : n && c?.focus();
	};
	for (let t of l()) t.addEventListener(`click`, (n) => {
		n.stopPropagation(), c = t, w(e.hidden !== !1, !1);
	});
	e.querySelector(`[data-sk-a11y-close]`)?.addEventListener(`click`, () => w(!1, !0)), m?.addEventListener(`click`, () => C(v(o, -1))), h?.addEventListener(`click`, () => C(v(o, 1)));
	for (let e of y) e.addEventListener(`click`, () => {
		let t = e.dataset.skA11yOption;
		p(t) && C(_(o, t));
	});
	e.querySelector(`[data-sk-a11y-reset]`)?.addEventListener(`click`, () => C(d())), t.addEventListener(`keydown`, (t) => {
		t.key === `Escape` && !e.hidden && w(!1, !0);
	}), t.addEventListener(`click`, (t) => {
		!e.hidden && t.target instanceof Node && !e.contains(t.target) && w(!1, !1);
	}), b(n, o), S();
}
var C = document.querySelector(`[data-sk-a11y-panel]`);
C && S(C);
