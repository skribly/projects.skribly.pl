import { n as e } from "./strings.BvOM_5XB.js";
var t = `table`, n = 0;
function r(e) {
	return e.documentElement.lang.toLowerCase().startsWith(`pl`) ? `pl` : `en`;
}
function i(e) {
	if (!(e instanceof HTMLTableElement) || e.closest(`[data-sk-table="off"], astro-island, .sk-table--stack`) || `skTableReady` in e.dataset) return !1;
	let t = e.rows[0];
	return t !== void 0 && t.cells.length >= 2;
}
function a(e) {
	let t = Array.from(e.tBodies).flatMap((e) => Array.from(e.rows));
	return t.length > 0 && t.every((e) => e.cells[0]?.tagName === `TH`);
}
function o(e) {
	let t = e;
	for (let e = 0; t && e < 4; e += 1) {
		let e = t.previousElementSibling;
		for (; e;) {
			if (/^H[1-6]$/.test(e.tagName)) return e.textContent?.trim() || null;
			e = e.previousElementSibling;
		}
		t = t.parentElement;
	}
	return null;
}
function s(e) {
	let t = e.dataset.skTable;
	return t === `cards` || t === `priority` ? t : `scroll`;
}
function c(e) {
	return Array.from(e.rows).map((e) => Array.from(e.cells));
}
function l(e) {
	let t = e.tHead?.rows[0];
	if (!t) return;
	let n = Array.from(t.cells).map((e) => e.textContent?.trim() ?? ``);
	e.setAttribute(`role`, `table`);
	for (let t of [
		e.tHead,
		...Array.from(e.tBodies),
		e.tFoot
	]) if (t) {
		t.setAttribute(`role`, `rowgroup`);
		for (let r of Array.from(t.rows)) r.setAttribute(`role`, `row`), Array.from(r.cells).forEach((r, i) => {
			let a = r.tagName === `TH`;
			r.setAttribute(`role`, t === e.tHead ? `columnheader` : a ? `rowheader` : `cell`), t !== e.tHead && !(a && i === 0) && n[i] && r.setAttribute(`data-label`, n[i]);
		});
	}
}
function u(e) {
	let t = e.tHead?.rows[0];
	if (!t) return [];
	let n = Array.from(t.cells).filter((e) => e.dataset.skPriority === `low`), r = n.map((e) => e.cellIndex);
	for (let t of c(e)) for (let e of r) t[e]?.setAttribute(`data-sk-priority`, `low`);
	return n;
}
function d(e, t, n, r, i) {
	let a = e.rows[0]?.cells.length ?? 0, o = n.createElement(`div`);
	o.className = `sk-table-scroll__tools`;
	let s = n.createElement(`fieldset`);
	s.className = `sk-table-scroll__panel`, s.id = `sk-table-columns-${r}`, s.hidden = !0;
	let l = n.createElement(`legend`);
	l.textContent = i.columns, s.append(l);
	let u = n.createElement(`button`);
	u.type = `button`, u.className = `sk-button sk-button--outline sk-button--sm`, u.setAttribute(`aria-controls`, s.id), u.setAttribute(`aria-expanded`, `false`);
	let d = () => {
		let e = t.filter((e) => !e.hasAttribute(`data-sk-shown`)).length;
		u.textContent = `${i.columns} · ${i.count(a - e, a)}`;
	};
	u.addEventListener(`click`, () => {
		s.hidden = !s.hidden, u.setAttribute(`aria-expanded`, String(!s.hidden));
	});
	for (let r of t) {
		let t = n.createElement(`label`), i = n.createElement(`input`);
		i.type = `checkbox`, i.addEventListener(`change`, () => {
			for (let t of c(e)) t[r.cellIndex]?.toggleAttribute(`data-sk-shown`, i.checked);
			d();
		}), t.append(i, n.createTextNode(r.textContent?.trim() ?? ``)), s.append(t);
	}
	return d(), o.append(u, s), o;
}
function f(e, t) {
	let n = e.parentElement;
	if (n && n.matches(`.sk-table-wrap, .table-scroll, [data-scroll], .sk-table-scroll__box`) && n.children.length === 1) return n;
	let r = t.createElement(`div`);
	return r.className = `sk-table-scroll__box`, e.replaceWith(r), r.append(e), r;
}
function p(t, i = window, c = {}) {
	let p = i.document, m = e(r(p), c);
	t.dataset.skTableReady = ``, n += 1;
	let h = f(t, p), g = p.createElement(`div`);
	g.className = `sk-table-scroll`, h.replaceWith(g), g.append(h), h.classList.add(`sk-table-scroll__box`);
	let _ = p.createElement(`p`);
	_.className = `sk-table-scroll__hint`, _.id = `sk-table-hint-${n}`, _.textContent = m.tableHint, _.hidden = !0, g.before(_);
	let v = s(t);
	if (v !== `scroll` && (t.dataset.skPhone = v), v === `cards` && l(t), v === `priority`) {
		let e = u(t);
		e.length > 0 && g.before(d(t, e, p, n, {
			columns: m.tableColumns,
			count: (e, t) => m.tableColumnsCount.replace(`{shown}`, String(e)).replace(`{total}`, String(t))
		}));
	}
	a(t) && v !== `cards` && (t.dataset.skTableSticky = ``);
	let y = h.getAttribute(`aria-label`) ?? h.getAttribute(`aria-labelledby`), b = t.caption;
	b && !b.id && (b.id = `sk-table-caption-${n}`);
	let x = o(g), S = !1, C = 0, w = () => {
		C = 0;
		let e = getComputedStyle(h).direction === `rtl`, t = h.scrollWidth - h.clientWidth, n = Math.abs(h.scrollLeft), r = t > 1;
		g.toggleAttribute(`data-sk-table-overflow`, r);
		let i = r && n > 1, a = r && n < t - 1;
		g.toggleAttribute(`data-sk-table-start`, e ? a : i), g.toggleAttribute(`data-sk-table-end`, e ? i : a), _.hidden = !r, _.style.visibility = S ? `hidden` : ``, r ? (h.tabIndex = 0, h.hasAttribute(`role`) || h.setAttribute(`role`, `region`), y || (b ? h.setAttribute(`aria-labelledby`, b.id) : h.setAttribute(`aria-label`, x ?? m.tableLabel)), h.setAttribute(`aria-describedby`, _.id)) : (h.removeAttribute(`tabindex`), h.removeAttribute(`aria-describedby`), y || (h.removeAttribute(`role`), h.removeAttribute(`aria-label`), h.removeAttribute(`aria-labelledby`)));
	}, T = () => {
		C === 0 && (C = i.requestAnimationFrame(w));
	};
	if (h.addEventListener(`scroll`, () => {
		S = !0, T();
	}, { passive: !0 }), typeof ResizeObserver == `function`) {
		let e = new ResizeObserver(T);
		e.observe(h), e.observe(t);
	}
	i.addEventListener(`resize`, T, { passive: !0 }), w();
}
function m(e = window, n = {}) {
	for (let r of e.document.querySelectorAll(t)) i(r) && p(r, e, n);
}
m(window);
