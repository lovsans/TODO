/* copybook.js — прописи: листы, рисование пером, жесты, зум, сохранение. */

    const CB_TABLE_LEFT = 0.11, CB_TABLE_RIGHT = 0.89;

    const cbState = {
        tool: 'pen', color: '#0d9488', penSize: 5, eraseSize: 26,
        sheet: 1, scale: 1, tx: 0, ty: 0, minScale: 1, sampleOpacity: 1
    };
    const cbSheets = {};            // n -> {canvas, ctx, img, states:[], redo:[]}
    const cbPointers = new Map();
    let cbDrawing = false, cbGesture = null;
    let cbDrawId = null;          // id пальца, которым рисуем
    let cbMultiTouch = false;     // в текущем касании были 2+ пальца — рисование заблокировано
    let cbPendingDown = null;     // точка касания первого пальца (старт штриха по первому движению)

    function renderCopybook() {
        const sheets = [1, 2, 3];
        const colors = [['#0d9488','бирюзовый'], ['#1c1917','чёрный'], ['#dc2626','красный'], ['#2563eb','синий']];
        const sizes = [['Тонкое', 3], ['Среднее', 6], ['Толстое', 11]];
        return `
        <div class="cb-wrap">
            <div class="about-kicker">Пропись</div>
            <h2 class="about-title">Пропись для ясного письма</h2>
            <p class="about-lead">Обводите серые буквы и ведите по направляющим. На телефоне: <b>один палец — рисовать</b>, <b>два пальца — двигать и масштабировать</b> лист. Можно отменять штрихи, тренировать отдельную букву и сохранять лист картинкой.</p>
            <div class="cb-tabs">
                ${sheets.map(n => `<button class="cb-tab ${n===1?'active':''}" data-sheet="${n}" onclick="cbShowSheet(${n})">${cbSheetTitles[n]}</button>`).join('')}
            </div>
            <div class="cb-letterbar" id="cb-letterbar"></div>
            <div class="cb-board" id="cb-board">
                <div class="cb-toolbar" id="cb-toolbar">
                    <div class="cb-toolgrp">
                        ${colors.map((c,i) => `<button class="cb-color ${i===0?'active':''}" title="${c[1]}" style="background:${c[0]}" onclick="cbSetColor(this,'${c[0]}')"></button>`).join('')}
                    </div>
                    <div class="cb-toolgrp">
                        <button class="cb-tool-btn cb-tool-on" id="cb-pen" onclick="cbSetTool('pen')">✎ Перо</button>
                        <button class="cb-tool-btn" id="cb-eraser" onclick="cbSetTool('eraser')">⌫ Ластик</button>
                    </div>
                    <div class="cb-toolgrp">
                        <span class="cb-tool-label">Размер</span>
                        ${sizes.map((s,i) => `<button class="cb-size ${i===1?'active':''}" data-size="${s[1]}" onclick="cbSetSize(this,${s[1]})">${s[0]}</button>`).join('')}
                    </div>
                    <div class="cb-toolgrp">
                        <button class="cb-tool-btn" id="cb-undo" onclick="cbUndo()" title="Отменить">↶ Отменить</button>
                        <button class="cb-tool-btn" id="cb-redo" onclick="cbRedo()" title="Вернуть">↷</button>
                        <button class="cb-tool-btn cb-clear" onclick="cbClear()">Очистить</button>
                    </div>
                    <div class="cb-toolgrp">
                        <span class="cb-tool-label">Образец</span>
                        <input type="range" class="cb-range" id="cb-sample" min="0" max="100" value="100" oninput="cbSetSample(this.value)" aria-label="Яркость образца">
                    </div>
                    <div class="cb-toolgrp cb-zoom-group">
                        <button class="cb-tool-btn cb-zoombtn" onclick="cbZoomBtn(-1)" aria-label="Уменьшить">−</button>
                        <span class="cb-zoom-label" id="cb-zoom-label">100%</span>
                        <button class="cb-tool-btn cb-zoombtn" onclick="cbZoomBtn(1)" aria-label="Увеличить">＋</button>
                        <button class="cb-tool-btn" id="cb-fit" onclick="cbFit()" title="Показать весь лист">Сброс</button>
                    </div>
                    <div class="cb-toolgrp">
                        <button class="cb-tool-btn" id="cb-save" onclick="cbDownload()">⤓ Скачать</button>
                        <button class="cb-tool-btn" id="cb-save-pdf" onclick="cbDownloadPDF()">⤓ PDF (все листы)</button>
                        <button class="cb-tool-btn cb-expand" id="cb-expand" onclick="cbToggleZoom()">⤢ Развернуть</button>
                    </div>
                </div>
                <div class="cb-viewport" id="cb-viewport">
                    <div class="cb-pan" id="cb-pan">
                        ${sheets.map(n => `
                            <div class="cb-stage ${n===1?'active':''}" data-sheet="${n}">
                                <img class="cb-img" src="${copybookImages[n]}" alt="Пропись, лист ${n}" draggable="false">
                                <canvas class="cb-canvas"></canvas>
                            </div>`).join('')}
                    </div>
                    <div class="cb-hint" id="cb-hint">
                        <div class="cb-hint-box">
                            <div class="cb-hint-title">Как пользоваться</div>
                            <div class="cb-hint-row">✎ Один палец / мышь — обводить букву</div>
                            <div class="cb-hint-row">✌ Два пальца — двигать и масштабировать лист</div>
                            <div class="cb-hint-row">＋ / − или «Буква» — увеличить нужное место</div>
                            <div class="cb-hint-row">↶ — отменить штрих · ⤓ — сохранить картинкой</div>
                            <button class="cb-tool-btn cb-hint-ok" onclick="cbCloseHint()">Понятно</button>
                        </div>
                    </div>
                </div>
            </div>
            <p class="about-source">Пропись: TodoBiciglel. Прогресс сохраняется в этом браузере.</p>
        </div>`;
    }

    function cbCur() { return cbSheets[cbState.sheet]; }

    function cbClampPan() {
        const vpEl = document.getElementById('cb-viewport'); if (!vpEl) return;
        const vp = vpEl.getBoundingClientRect(); if (!vp.width) return;
        const st = cbCur();
        const aspect = (st && st.img.naturalWidth) ? st.img.naturalHeight / st.img.naturalWidth : 1.414;
        const cw = vp.width * cbState.scale;
        const ch = vp.width * aspect * cbState.scale;
        if (cw <= vp.width) cbState.tx = (vp.width - cw) / 2;
        else cbState.tx = Math.min(0, Math.max(vp.width - cw, cbState.tx));
        if (ch <= vp.height) cbState.ty = (vp.height - ch) / 2;
        else cbState.ty = Math.min(0, Math.max(vp.height - ch, cbState.ty));
    }
    function cbApplyTransform() {
        cbClampPan();
        const pan = document.getElementById('cb-pan');
        if (pan) pan.style.transform = `translate(${cbState.tx}px, ${cbState.ty}px) scale(${cbState.scale})`;
        const lbl = document.getElementById('cb-zoom-label');
        if (lbl) lbl.textContent = Math.round(cbState.scale * 100) + '%';
    }
    function cbFit() {
        const vpEl = document.getElementById('cb-viewport'); if (!vpEl) return;
        const vp = vpEl.getBoundingClientRect(); if (!vp.width) return;
        const st = cbCur();
        const aspect = (st && st.img.naturalWidth) ? st.img.naturalHeight / st.img.naturalWidth : 1.414;
        const sheetH = vp.width * aspect;                       // высота при масштабе 1 (по ширине окна)
        cbState.minScale = Math.min(1, vp.height / sheetH);     // можно уменьшить до показа всего листа
        cbState.scale = 1;                                      // по умолчанию — крупно, лист по ширине
        cbState.tx = 0; cbState.ty = 0;
        cbApplyTransform();
    }
    function cbWholeSheet() {                                   // показать весь лист целиком
        cbState.scale = cbState.minScale || 1;
        cbApplyTransform();
    }

    function cbZoomAt(px, py, factor) {
        const lo = cbState.minScale || 0.3, hi = 6;
        const ns = Math.min(hi, Math.max(lo, cbState.scale * factor));
        cbState.tx = px - (px - cbState.tx) * (ns / cbState.scale);
        cbState.ty = py - (py - cbState.ty) * (ns / cbState.scale);
        cbState.scale = ns;
        cbApplyTransform();
    }
    function cbZoomBtn(dir) {
        const vp = document.getElementById('cb-viewport').getBoundingClientRect();
        cbZoomAt(vp.width / 2, vp.height / 2, dir > 0 ? 1.3 : 1 / 1.3);
    }
    function cbFocusLetter(i) {
        const vp = document.getElementById('cb-viewport').getBoundingClientRect();
        const letters = cbSheetLetters[cbState.sheet] || [];
        const nL = letters.length || 10;
        const colFrac = CB_TABLE_LEFT + (i + 0.5) / nL * (CB_TABLE_RIGHT - CB_TABLE_LEFT);
        cbState.scale = 2.6;
        cbState.tx = vp.width / 2 - colFrac * vp.width * cbState.scale;
        cbState.ty = 0;
        cbApplyTransform();
    }

    function cbRenderLetterbar() {
        const bar = document.getElementById('cb-letterbar');
        if (!bar) return;
        const letters = cbSheetLetters[cbState.sheet] || [];
        bar.innerHTML = '<span class="cb-tool-label">Тренировать букву:</span>' +
            letters.map((L, i) => `<button class="cb-letter" onclick="cbFocusLetter(${i})">${L}</button>`).join('') +
            '<button class="cb-letter cb-letter-all" onclick="cbWholeSheet()">весь лист</button>';
    }

    function cbSetColor(btn, color) {
        cbState.color = color; cbState.tool = 'pen';
        document.querySelectorAll('.cb-color').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        cbUpdateToolUI();
    }
    function cbSetTool(t) { cbState.tool = t; cbUpdateToolUI(); }
    function cbSetSize(btn, size) {
        if (cbState.tool === 'eraser') cbState.eraseSize = size * 4; else cbState.penSize = size;
        document.querySelectorAll('.cb-size').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    function cbUpdateToolUI() {
        const pen = document.getElementById('cb-pen'), er = document.getElementById('cb-eraser');
        if (pen) pen.classList.toggle('cb-tool-on', cbState.tool === 'pen');
        if (er) er.classList.toggle('cb-tool-on', cbState.tool === 'eraser');
        document.querySelectorAll('.cb-color').forEach(b => b.classList.toggle('cb-dim', cbState.tool === 'eraser'));
    }
    function cbSetSample(v) {
        cbState.sampleOpacity = v / 100;
        const st = cbCur(); if (st) st.img.style.opacity = cbState.sampleOpacity;
    }

    // ---- история / автосохранение ----
    function cbAutosave(st) {
        try {
            const cur = st.states[st.states.length - 1];
            if (cur) localStorage.setItem('todo-cb-' + st.n, cur);
            else localStorage.removeItem('todo-cb-' + st.n);
        } catch (e) {}
    }
    function cbRestoreURL(st, url) {
        st.ctx.clearRect(0, 0, st.canvas.width, st.canvas.height);
        if (!url) return;
        const im = new Image();
        im.onload = () => { st.ctx.clearRect(0, 0, st.canvas.width, st.canvas.height); st.ctx.drawImage(im, 0, 0, st.canvas.width, st.canvas.height); };
        im.src = url;
    }
    function cbUpdateHist() {
        const st = cbCur(); if (!st) return;
        const u = document.getElementById('cb-undo'), r = document.getElementById('cb-redo');
        if (u) u.disabled = st.states.length <= 1;
        if (r) r.disabled = st.redo.length === 0;
    }
    function cbUndo() {
        const st = cbCur(); if (!st || st.states.length <= 1) return;
        st.redo.push(st.states.pop());
        cbRestoreURL(st, st.states[st.states.length - 1]);
        cbAutosave(st); cbUpdateHist();
    }
    function cbRedo() {
        const st = cbCur(); if (!st || !st.redo.length) return;
        const url = st.redo.pop(); st.states.push(url);
        cbRestoreURL(st, url); cbAutosave(st); cbUpdateHist();
    }
    function cbClear() {
        const st = cbCur(); if (!st) return;
        st.ctx.clearRect(0, 0, st.canvas.width, st.canvas.height);
        st.states.push(null); if (st.states.length > 30) st.states.shift();
        st.redo.length = 0; cbAutosave(st); cbUpdateHist();
    }
    function cbDownload() {
        const st = cbCur(); if (!st) return;
        const w = st.canvas.width, h = st.canvas.height;
        const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h;
        const t = tmp.getContext('2d');
        t.fillStyle = '#ffffff'; t.fillRect(0, 0, w, h);
        t.globalAlpha = cbState.sampleOpacity; t.drawImage(st.img, 0, 0, w, h); t.globalAlpha = 1;
        t.drawImage(st.canvas, 0, 0, w, h);
        const a = document.createElement('a');
        a.download = 'propis-list-' + st.n + '.png';
        a.href = tmp.toDataURL('image/png'); a.click();
    }

    function cbSheetImageData(n) {
        const st = cbSheets[n];
        if (!st || !st.img || !st.img.naturalWidth) return null;
        const w = st.canvas.width, h = st.canvas.height;
        const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h;
        const t = tmp.getContext('2d');
        t.fillStyle = '#ffffff'; t.fillRect(0, 0, w, h);
        t.globalAlpha = cbState.sampleOpacity; t.drawImage(st.img, 0, 0, w, h); t.globalAlpha = 1;
        t.drawImage(st.canvas, 0, 0, w, h);
        return { dataUrl: tmp.toDataURL('image/jpeg', 0.92), w, h };
    }
    function loadJspdf() {
        if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf);
        return new Promise(function (resolve, reject) {
            const s = document.createElement('script');
            s.src = 'js/vendor/jspdf.umd.min.js';
            s.onload = function () { resolve(window.jspdf); };
            s.onerror = function () { reject(new Error('jspdf load failed')); };
            document.head.appendChild(s);
        });
    }

    function cbDownloadPDF() {
        const btn = document.getElementById('cb-save-pdf');
        if (btn) { btn.disabled = true; btn.textContent = '⏳ Готовим PDF…'; }
        loadJspdf().then(function (jspdfMod) {
            if (!jspdfMod || !jspdfMod.jsPDF) throw new Error('jspdf missing');
            const { jsPDF } = jspdfMod;
            const pages = [1, 2, 3].map(cbSheetImageData).filter(Boolean);
            if (!pages.length) return;
            let doc = null;
            pages.forEach(p => {
                const orient = p.h >= p.w ? 'p' : 'l';
                if (!doc) doc = new jsPDF({ orientation: orient, unit: 'px', format: [p.w, p.h], compress: true });
                else doc.addPage([p.w, p.h], orient);
                doc.addImage(p.dataUrl, 'JPEG', 0, 0, p.w, p.h);
            });
            if (doc) doc.save('todo-propis.pdf');
        }).catch(function () {
            alert('Модуль PDF не загрузился. Проверьте, что файл js/vendor/jspdf.umd.min.js доступен.');
        }).finally(function () {
            if (btn) { btn.disabled = false; btn.textContent = '⤓ PDF (все листы)'; }
        });
    }

    // ---- рисование ----
    function cbCanvasPoint(e, st) {
        const r = st.canvas.getBoundingClientRect();
        const w = r.width || 1, h = r.height || 1;
        return { x: (e.clientX - r.left) / w * st.canvas.width,
                 y: (e.clientY - r.top) / h * st.canvas.height };
    }
    function cbStrokeStyle(st) {
        const ctx = st.ctx, r = st.canvas.getBoundingClientRect();
        const k = r.width ? st.canvas.width / r.width : 1;
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        if (cbState.tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.lineWidth = cbState.eraseSize * k;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = cbState.color;
            ctx.lineWidth = cbState.penSize * k;
        }
    }
    function cbStartStroke(pt) {
        const st = cbCur(); if (!st) return;
        cbDrawing = true; st._pts = [pt];
        cbStrokeStyle(st);
        const ctx = st.ctx, r = Math.max(ctx.lineWidth / 2, 1);
        ctx.fillStyle = cbState.tool === 'eraser' ? 'rgba(0,0,0,1)' : cbState.color;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2); ctx.fill();
    }
    function cbDrawMove(e) {
        const st = cbCur(); if (!st || !cbDrawing) return;
        const p = cbCanvasPoint(e, st); st._pts.push(p);
        const pts = st._pts; cbStrokeStyle(st); const ctx = st.ctx;
        const n = pts.length;
        if (n === 2) {
            ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); ctx.lineTo(pts[1].x, pts[1].y); ctx.stroke();
        } else if (n >= 3) {
            const p0 = pts[n-3], p1 = pts[n-2], p2 = pts[n-1];
            const m1 = { x: (p0.x+p1.x)/2, y: (p0.y+p1.y)/2 };
            const m2 = { x: (p1.x+p2.x)/2, y: (p1.y+p2.y)/2 };
            ctx.beginPath(); ctx.moveTo(m1.x, m1.y); ctx.quadraticCurveTo(p1.x, p1.y, m2.x, m2.y); ctx.stroke();
        }
    }
    function cbEndStroke() {
        const st = cbCur(); if (!st || !cbDrawing) return;
        cbDrawing = false; st._pts = null;
        st.states.push(st.canvas.toDataURL('image/png'));
        if (st.states.length > 30) st.states.shift();
        st.redo.length = 0; cbAutosave(st); cbUpdateHist();
    }
    function cbAbortStroke() {
        const st = cbCur(); if (!st) return;
        cbDrawing = false; st._pts = null;
        cbRestoreURL(st, st.states[st.states.length - 1]); // вернуть к последнему сохранённому
    }

    // ---- жесты (1 палец рисует, 2 — pan+zoom) ----
    function cbDist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
    function cbMid(a, b) { return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }
    function cbStartGesture() {
        const ps = [...cbPointers.values()];
        cbGesture = {
            startDist: cbDist(ps[0], ps[1]),
            startScale: cbState.scale,
            startMid: cbMid(ps[0], ps[1]),
            startTx: cbState.tx, startTy: cbState.ty
        };
    }
    function cbUpdateGesture() {
        const ps = [...cbPointers.values()]; if (ps.length < 2 || !cbGesture) return;
        const vp = document.getElementById('cb-viewport').getBoundingClientRect();
        const curDist = cbDist(ps[0], ps[1]), curMid = cbMid(ps[0], ps[1]);
        const lo = cbState.minScale || 0.3;
        const ns = Math.min(6, Math.max(lo, cbGesture.startScale * (curDist / cbGesture.startDist)));
        const fx = cbGesture.startMid.x - vp.left, fy = cbGesture.startMid.y - vp.top;
        const dx = curMid.x - cbGesture.startMid.x, dy = curMid.y - cbGesture.startMid.y;
        cbState.tx = (cbGesture.startTx - fx) * (ns / cbGesture.startScale) + fx + dx;
        cbState.ty = (cbGesture.startTy - fy) * (ns / cbGesture.startScale) + fy + dy;
        cbState.scale = ns;
        cbApplyTransform();
    }

    function cbPtrDown(e) {
        if (!cbCur()) ensureCopybookInit();
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        cbDismissHint();
        const vp = e.currentTarget;
        cbPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (cbPointers.size >= 2) {
            cbMultiTouch = true;
            if (cbDrawing) cbAbortStroke();
            cbDrawing = false; cbDrawId = null; cbPendingDown = null;
            cbStartGesture();
        } else {
            const st = cbCur();
            cbDrawId = e.pointerId;
            if (st && (e.pointerType === 'mouse' || e.pointerType === 'pen')) {
                cbStartStroke(cbCanvasPoint(e, st));
            } else {
                cbPendingDown = st ? cbCanvasPoint(e, st) : null;
            }
        }
        if (e.pointerType === 'touch') {
            try { vp.setPointerCapture(e.pointerId); } catch (err) {}
        }
        e.preventDefault();
    }
    function cbPtrMove(e) {
        if (!cbPointers.has(e.pointerId)) return;
        cbPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (cbPointers.size >= 2) {
            if (!cbGesture) cbStartGesture();
            cbUpdateGesture();
        } else if (cbPointers.size === 1 && !cbMultiTouch && e.pointerId === cbDrawId) {
            if (!cbDrawing) {
                if (cbPendingDown) cbStartStroke(cbPendingDown);
                cbPendingDown = null;
            }
            if (cbDrawing) cbDrawMove(e);
        }
        e.preventDefault();
    }
    function cbPtrUp(e) {
        if (!cbPointers.has(e.pointerId)) return;
        const vp = document.getElementById('cb-viewport');
        if (vp && e.pointerType === 'touch') {
            try { vp.releasePointerCapture(e.pointerId); } catch (err) {}
        }
        cbPointers.delete(e.pointerId);
        if (cbGesture && cbPointers.size < 2) cbGesture = null;
        if (cbDrawing && (e.pointerId === cbDrawId || cbPointers.size === 0)) cbEndStroke();
        if (cbPointers.size === 0) { cbMultiTouch = false; cbDrawId = null; cbPendingDown = null; }
    }

    function cbShowSheet(n) {
        cbState.sheet = n;
        document.querySelectorAll('.cb-stage').forEach(s => s.classList.toggle('active', +s.dataset.sheet === n));
        document.querySelectorAll('.cb-tab').forEach(t => t.classList.toggle('active', +t.dataset.sheet === n));
        const st = cbCur(); if (st) st.img.style.opacity = cbState.sampleOpacity;
        cbFit(); cbRenderLetterbar(); cbUpdateHist();
    }

    function cbToggleZoom() {
        const board = document.getElementById('cb-board');
        if (!board) return;
        const zoomed = board.classList.toggle('zoomed');
        document.body.style.overflow = zoomed ? 'hidden' : '';
        const exp = document.getElementById('cb-expand');
        if (exp) exp.textContent = zoomed ? '✕ Свернуть' : '⤢ Развернуть';
        requestAnimationFrame(() => requestAnimationFrame(cbFit));
    }

    function cbCloseHint() {
        const h = document.getElementById('cb-hint');
        if (h) h.classList.add('cb-hidden');
        try { localStorage.setItem('todo-cb-hint', '1'); } catch (e) {}
    }
    function cbDismissHint() {
        const h = document.getElementById('cb-hint');
        if (h && !h.classList.contains('cb-hidden')) cbCloseHint();
    }

    function ensureCopybookInit() {
        const viewport = document.getElementById('cb-viewport');
        if (!viewport) return;
        initCopybook();
    }

    function initCopybook() {
        const viewport = document.getElementById('cb-viewport');
        if (!viewport) return;
        document.querySelectorAll('.cb-stage').forEach(stage => {
            const n = +stage.dataset.sheet;
            if (cbSheets[n]) return;
            const img = stage.querySelector('.cb-img');
            const canvas = stage.querySelector('.cb-canvas');
            if (!img || !canvas) return;
            const ctx = canvas.getContext('2d');
            const rec = { n, canvas, ctx, img, states: [null], redo: [] };
            cbSheets[n] = rec;
            function fit() {
                const w = img.naturalWidth || 1400, h = img.naturalHeight || 1980;
                if (canvas.width !== w) { canvas.width = w; canvas.height = h; }
                let saved = null;
                try { saved = localStorage.getItem('todo-cb-' + n); } catch (e) {}
                if (saved) { rec.states = [saved]; cbRestoreURL(rec, saved); }
                if (n === cbState.sheet) cbUpdateHist();
            }
            if (img.complete && img.naturalWidth) fit(); else img.addEventListener('load', fit);
        });
        if (!viewport.dataset.cbListeners) {
            viewport.dataset.cbListeners = '1';
            const ptrOpts = { passive: false, capture: true };
            viewport.addEventListener('pointerdown', cbPtrDown, ptrOpts);
            viewport.addEventListener('pointermove', cbPtrMove, ptrOpts);
            viewport.addEventListener('pointerup', cbPtrUp, ptrOpts);
            viewport.addEventListener('pointercancel', cbPtrUp, ptrOpts);
            viewport.addEventListener('wheel', e => {
                const vp = viewport.getBoundingClientRect();
                if (e.ctrlKey || e.metaKey) {              // масштаб у курсора
                    cbZoomAt(e.clientX - vp.left, e.clientY - vp.top, e.deltaY < 0 ? 1.18 : 1 / 1.18);
                    e.preventDefault();
                    return;
                }
                const oldTy = cbState.ty, oldTx = cbState.tx;   // прокрутка колесом
                cbState.ty -= e.deltaY;
                if (e.deltaX) cbState.tx -= e.deltaX;
                cbApplyTransform();
                if (cbState.ty !== oldTy || cbState.tx !== oldTx) e.preventDefault(); // на границе — отдаём прокрутку странице
            }, { passive: false });
        }
        cbRenderLetterbar();
        cbUpdateToolUI();
        if (!viewport.dataset.cbResize) {
            viewport.dataset.cbResize = '1';
            window.addEventListener('resize', () => {
                const sec = document.getElementById('section-copybook');
                if (sec && sec.classList.contains('active')) requestAnimationFrame(cbFit);
            });
        }
        let seen = null; try { seen = localStorage.getItem('todo-cb-hint'); } catch (e) {}
        if (seen) { const h = document.getElementById('cb-hint'); if (h) h.classList.add('cb-hidden'); }
    }
