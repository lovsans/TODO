/* audio.js — озвучка букв и слогов.
   Файлы: audio/vowels|long_vowels|diphthongs|consonants|galik|syllables/…
   slug: ö→oe, ü→ue, ң→ng, һ→gh, š→sh; k1n/k2n/g1n — узкие формы. */

(function () {
    const LETTER_AUDIO = {
        // гласные
        0: 'audio/vowels/a.m4a',
        1: 'audio/vowels/e.m4a',
        2: 'audio/vowels/i.m4a',
        3: 'audio/vowels/o.m4a',
        4: 'audio/vowels/u.m4a',
        5: 'audio/vowels/oe.m4a',
        6: 'audio/vowels/ue.m4a',
        // долгие гласные
        7: 'audio/long_vowels/aa.m4a',
        8: 'audio/long_vowels/ee.m4a',
        9: 'audio/long_vowels/ii.m4a',
        10: 'audio/long_vowels/oo.m4a',
        11: 'audio/long_vowels/uu.m4a',
        12: 'audio/long_vowels/oee.m4a',
        13: 'audio/long_vowels/oeu.m4a',
        // дифтонги
        14: 'audio/diphthongs/ayi.m4a',
        15: 'audio/diphthongs/eyi.m4a',
        16: 'audio/diphthongs/iyi.m4a',
        17: 'audio/diphthongs/oyi.m4a',
        18: 'audio/diphthongs/uyi.m4a',
        19: 'audio/diphthongs/oeyi.m4a',
        20: 'audio/diphthongs/ueyi.m4a',
        // согласные (порядок атласа; галики отдельно)
        21: 'audio/consonants/n.m4a',
        22: 'audio/consonants/ng.m4a',
        23: 'audio/consonants/x.m4a',
        24: 'audio/consonants/gh.m4a',
        25: 'audio/consonants/b1.m4a',
        26: 'audio/consonants/b2.m4a',
        31: 'audio/consonants/s.m4a',
        32: 'audio/consonants/sh.m4a',
        33: 'audio/consonants/t.m4a',
        34: 'audio/consonants/d.m4a',
        35: 'audio/consonants/l.m4a',
        36: 'audio/consonants/m.m4a',
        37: 'audio/consonants/c.m4a',
        39: 'audio/consonants/z.m4a',
        44: 'audio/consonants/y.m4a',
        45: 'audio/consonants/k1.m4a',
        46: 'audio/consonants/k1n.m4a',
        47: 'audio/consonants/k2.m4a',
        48: 'audio/consonants/k2n.m4a',
        49: 'audio/consonants/g1.m4a',
        50: 'audio/consonants/g1n.m4a',
        51: 'audio/consonants/q.m4a',
        52: 'audio/consonants/r.m4a',
        53: 'audio/consonants/v.m4a',
        // специальные (откидная а ← гласная №1; конечная и ← гласная №3)
        55: 'audio/vowels/a.m4a',
        56: 'audio/vowels/i.m4a',
        // элементы письма
        57: 'audio/elements/nurhun.m4a',
        58: 'audio/elements/udan.m4a',
        59: 'audio/elements/titm.m4a',
        60: 'audio/elements/aran.m4a',
        61: 'audio/elements/neg_ceq.m4a',
        62: 'audio/elements/xoyor_ceq.m4a',
        63: 'audio/elements/togrg_ceq.m4a',
        64: 'audio/elements/uru_tatasn.m4a',
        65: 'audio/elements/kuchlg.m4a',
        // цифры 0–9
        66: 'audio/numbers/0.m4a',
        67: 'audio/numbers/1.m4a',
        68: 'audio/numbers/2.m4a',
        69: 'audio/numbers/3.m4a',
        70: 'audio/numbers/4.m4a',
        71: 'audio/numbers/5.m4a',
        72: 'audio/numbers/6.m4a',
        73: 'audio/numbers/7.m4a',
        74: 'audio/numbers/8.m4a',
        75: 'audio/numbers/9.m4a',
        // пунктуация
        76: 'audio/punctuation/birga.m4a',
        77: 'audio/punctuation/point4.m4a',
        78: 'audio/punctuation/comma.m4a',
        79: 'audio/punctuation/colon.m4a',
        // галики
        27: 'audio/galik/pb1.m4a',
        28: 'audio/galik/pb2.m4a',
        29: 'audio/galik/pf1.m4a',
        30: 'audio/galik/pf2.m4a',
        38: 'audio/galik/ch.m4a',
        40: 'audio/galik/z1.m4a',
        41: 'audio/galik/z2.m4a',
        42: 'audio/galik/z3.m4a',
        43: 'audio/galik/j.m4a',
        54: 'audio/galik/xh.m4a',
        // слоги: Н-ряд
        80: 'audio/syllables/na.m4a',
        81: 'audio/syllables/ne.m4a',
        82: 'audio/syllables/ni.m4a',
        83: 'audio/syllables/no.m4a',
        84: 'audio/syllables/nu.m4a',
        85: 'audio/syllables/noe.m4a',
        86: 'audio/syllables/nue.m4a',
        // слоги: гласная / Н + «ң»
        87: 'audio/syllables/ang.m4a',
        88: 'audio/syllables/eng.m4a',
        89: 'audio/syllables/ing.m4a',
        90: 'audio/syllables/ong.m4a',
        91: 'audio/syllables/ung.m4a',
        92: 'audio/syllables/oeng.m4a',
        93: 'audio/syllables/ueng.m4a',
        94: 'audio/syllables/noeng.m4a',
        95: 'audio/syllables/nueng.m4a',
        // слоги: Х/Һ … Д (слоги1)
        96: 'audio/syllables/xa.m4a',
        97: 'audio/syllables/xo.m4a',
        98: 'audio/syllables/xu.m4a',
        99: 'audio/syllables/gha.m4a',
        100: 'audio/syllables/gho.m4a',
        101: 'audio/syllables/ghu.m4a',
        102: 'audio/syllables/ba.m4a',
        103: 'audio/syllables/be.m4a',
        104: 'audio/syllables/bi.m4a',
        105: 'audio/syllables/bo.m4a',
        106: 'audio/syllables/bu.m4a',
        107: 'audio/syllables/boe.m4a',
        108: 'audio/syllables/bue.m4a',
        109: 'audio/syllables/pa.m4a',
        110: 'audio/syllables/pe.m4a',
        111: 'audio/syllables/pi.m4a',
        112: 'audio/syllables/po.m4a',
        113: 'audio/syllables/pu.m4a',
        114: 'audio/syllables/poe.m4a',
        115: 'audio/syllables/pue.m4a',
        116: 'audio/syllables/fa.m4a',
        117: 'audio/syllables/fe.m4a',
        118: 'audio/syllables/fi.m4a',
        119: 'audio/syllables/fo.m4a',
        120: 'audio/syllables/fu.m4a',
        121: 'audio/syllables/foe.m4a',
        122: 'audio/syllables/fue.m4a',
        123: 'audio/syllables/sa.m4a',
        124: 'audio/syllables/se.m4a',
        125: 'audio/syllables/si.m4a',
        126: 'audio/syllables/so.m4a',
        127: 'audio/syllables/su.m4a',
        128: 'audio/syllables/soe.m4a',
        129: 'audio/syllables/sue.m4a',
        130: 'audio/syllables/sha.m4a',
        131: 'audio/syllables/she.m4a',
        132: 'audio/syllables/shi.m4a',
        133: 'audio/syllables/sho.m4a',
        134: 'audio/syllables/shu.m4a',
        135: 'audio/syllables/shoe.m4a',
        136: 'audio/syllables/shue.m4a',
        137: 'audio/syllables/ta.m4a',
        138: 'audio/syllables/te.m4a',
        139: 'audio/syllables/ti.m4a',
        140: 'audio/syllables/to.m4a',
        141: 'audio/syllables/tu.m4a',
        142: 'audio/syllables/toe.m4a',
        143: 'audio/syllables/tue.m4a',
        144: 'audio/syllables/da.m4a',
        145: 'audio/syllables/de.m4a',
        146: 'audio/syllables/di.m4a',
        147: 'audio/syllables/do.m4a',
        148: 'audio/syllables/du.m4a',
        149: 'audio/syllables/doe.m4a',
        150: 'audio/syllables/due.m4a',
        // слоги: Л … Х (слоги 2)
        151: 'audio/syllables/la.m4a',
        152: 'audio/syllables/le.m4a',
        153: 'audio/syllables/li.m4a',
        154: 'audio/syllables/lo.m4a',
        155: 'audio/syllables/lu.m4a',
        156: 'audio/syllables/loe.m4a',
        157: 'audio/syllables/lue.m4a',
        158: 'audio/syllables/ma.m4a',
        159: 'audio/syllables/me.m4a',
        160: 'audio/syllables/mi.m4a',
        161: 'audio/syllables/mo.m4a',
        162: 'audio/syllables/mu.m4a',
        163: 'audio/syllables/moe.m4a',
        164: 'audio/syllables/mue.m4a',
        165: 'audio/syllables/ca.m4a',
        166: 'audio/syllables/ce.m4a',
        167: 'audio/syllables/chi.m4a',
        168: 'audio/syllables/co.m4a',
        169: 'audio/syllables/cu.m4a',
        170: 'audio/syllables/coe.m4a',
        171: 'audio/syllables/cue.m4a',
        172: 'audio/syllables/za.m4a',
        173: 'audio/syllables/ze.m4a',
        174: 'audio/syllables/zi.m4a',
        175: 'audio/syllables/zo.m4a',
        176: 'audio/syllables/zu.m4a',
        177: 'audio/syllables/zoe.m4a',
        178: 'audio/syllables/zue.m4a',
        179: 'audio/syllables/ja.m4a',
        180: 'audio/syllables/je.m4a',
        181: 'audio/syllables/ji.m4a',
        182: 'audio/syllables/jo.m4a',
        183: 'audio/syllables/ju.m4a',
        184: 'audio/syllables/joe.m4a',
        185: 'audio/syllables/jue.m4a',
        186: 'audio/syllables/ya.m4a',
        187: 'audio/syllables/ye.m4a',
        188: 'audio/syllables/yi.m4a',
        189: 'audio/syllables/yo.m4a',
        190: 'audio/syllables/yu.m4a',
        191: 'audio/syllables/yoe.m4a',
        192: 'audio/syllables/yue.m4a',
        193: 'audio/syllables/ka.m4a',
        194: 'audio/syllables/ko.m4a',
        195: 'audio/syllables/ku.m4a',
        196: 'audio/syllables/ke.m4a',
        197: 'audio/syllables/ki.m4a',
        198: 'audio/syllables/koe.m4a',
        199: 'audio/syllables/kue.m4a',
        200: 'audio/syllables/ge.m4a',
        201: 'audio/syllables/gi.m4a',
        202: 'audio/syllables/goe.m4a',
        203: 'audio/syllables/gue.m4a',
        204: 'audio/syllables/ra.m4a',
        205: 'audio/syllables/re.m4a',
        206: 'audio/syllables/ri.m4a',
        207: 'audio/syllables/ro.m4a',
        208: 'audio/syllables/ru.m4a',
        209: 'audio/syllables/roe.m4a',
        210: 'audio/syllables/rue.m4a',
        211: 'audio/syllables/va.m4a',
        212: 'audio/syllables/ve.m4a',
        213: 'audio/syllables/vi.m4a',
        214: 'audio/syllables/vo.m4a',
        215: 'audio/syllables/vu.m4a',
        216: 'audio/syllables/voe.m4a',
        217: 'audio/syllables/vue.m4a',
        218: 'audio/syllables/ha.m4a',
        219: 'audio/syllables/he.m4a',
        220: 'audio/syllables/hi.m4a',
        221: 'audio/syllables/ho.m4a',
        222: 'audio/syllables/hu.m4a',
        223: 'audio/syllables/hoe.m4a',
        224: 'audio/syllables/hue.m4a'
    };

    let currentAudio = null;
    let currentBtn = null;

    function letterAudioUrl(c) {
        if (!c) return null;
        if (c.audio) return c.audio;
        if (Object.prototype.hasOwnProperty.call(LETTER_AUDIO, c.idx)) return LETTER_AUDIO[c.idx];
        return null;
    }

    function letterHasAudio(c) {
        return !!letterAudioUrl(c);
    }

    function clearPlayingState() {
        if (currentBtn) {
            currentBtn.classList.remove('is-playing');
            currentBtn.setAttribute('aria-pressed', 'false');
            const icon = currentBtn.querySelector('.audio-play-icon');
            if (icon) icon.textContent = '▶';
            currentBtn = null;
        }
        if (currentAudio) {
            try { currentAudio.pause(); } catch (e) {}
            currentAudio = null;
        }
    }

    function playLetterAudio(idx, ev) {
        if (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        }
        const c = (typeof charData !== 'undefined') ? charData[idx] : null;
        const url = letterAudioUrl(c);
        if (!url) return;
        playAudioUrl(url, (ev && ev.currentTarget) || null);
    }

    const WORD_AUDIO_COUNT = 29;

    function wordAudioUrl(wi) {
        const n = Number(wi);
        if (!Number.isFinite(n) || n < 0 || n >= WORD_AUDIO_COUNT) return null;
        const num = String(n + 1).padStart(2, '0');
        return 'audio/words/w' + num + '.m4a';
    }

    function wordHasAudio(wi) {
        return !!wordAudioUrl(wi);
    }

    function playWordAudio(wi, ev) {
        if (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        }
        const url = wordAudioUrl(wi);
        if (!url) return;
        playAudioUrl(url, (ev && ev.currentTarget) || null);
    }

    function playAudioUrl(url, btn) {
        // повторный клик по той же кнопке — стоп
        if (btn && currentBtn === btn && currentAudio && !currentAudio.paused) {
            clearPlayingState();
            return;
        }

        clearPlayingState();

        const audio = new Audio(url);
        currentAudio = audio;
        if (btn) {
            currentBtn = btn;
            btn.classList.add('is-playing');
            btn.setAttribute('aria-pressed', 'true');
            const icon = btn.querySelector('.audio-play-icon');
            if (icon) icon.textContent = '⏸';
        }

        const done = function () {
            if (currentAudio === audio) clearPlayingState();
        };
        audio.addEventListener('ended', done);
        audio.addEventListener('error', function () {
            if (btn) {
                btn.classList.remove('is-playing');
                btn.classList.add('is-missing');
                btn.setAttribute('aria-pressed', 'false');
                const icon = btn.querySelector('.audio-play-icon');
                if (icon) icon.textContent = '▶';
                setTimeout(function () { btn.classList.remove('is-missing'); }, 1400);
            }
            if (currentAudio === audio) {
                currentAudio = null;
                currentBtn = null;
            }
            console.warn('[audio] не удалось воспроизвести:', url);
        });

        const p = audio.play();
        if (p && typeof p.catch === 'function') {
            p.catch(function () {
                if (btn) {
                    btn.classList.remove('is-playing');
                    btn.setAttribute('aria-pressed', 'false');
                    const icon = btn.querySelector('.audio-play-icon');
                    if (icon) icon.textContent = '▶';
                }
                if (currentAudio === audio) {
                    currentAudio = null;
                    currentBtn = null;
                }
            });
        }
    }

    function audioPlayBtnHtml(idx, extraClass) {
        const c = (typeof charData !== 'undefined') ? charData[idx] : null;
        if (!letterHasAudio(c)) return '';
        const label = (c && c.cyrillic != null)
            ? 'Слушать произношение: ' + String(c.cyrillic).split(',')[0].trim()
            : 'Слушать произношение';
        const cls = 'audio-play-btn' + (extraClass ? ' ' + extraClass : '');
        return `<button type="button" class="${cls}" onclick="playLetterAudio(${idx}, event)"` +
            ` aria-label="${escapeHtml(label)}" aria-pressed="false" title="Слушать">` +
            `<span class="audio-play-icon" aria-hidden="true">▶</span></button>`;
    }

    function wordAudioBtnHtml(wi, extraClass) {
        if (!wordHasAudio(wi)) return '';
        const cls = 'audio-play-btn' + (extraClass ? ' ' + extraClass : '');
        return `<button type="button" class="${cls}" onclick="playWordAudio(${wi}, event)"` +
            ` aria-label="Слушать слово" aria-pressed="false" title="Слушать">` +
            `<span class="audio-play-icon" aria-hidden="true">▶</span></button>`;
    }

    const EXPR_AUDIO_COUNT = 22;

    function exprAudioUrl(ei) {
        const n = Number(ei);
        if (!Number.isFinite(n) || n < 0 || n >= EXPR_AUDIO_COUNT) return null;
        return 'audio/reading/expr/e' + String(n + 1).padStart(2, '0') + '.m4a';
    }

    function exprHasAudio(ei) {
        return !!exprAudioUrl(ei);
    }

    function playExprAudio(ei, ev) {
        if (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        }
        const url = exprAudioUrl(ei);
        if (!url) return;
        playAudioUrl(url, (ev && ev.currentTarget) || null);
    }

    function exprAudioBtnHtml(ei, extraClass) {
        if (!exprHasAudio(ei)) return '';
        const cls = 'audio-play-btn' + (extraClass ? ' ' + extraClass : '');
        return `<button type="button" class="${cls}" onclick="playExprAudio(${ei}, event)"` +
            ` aria-label="Слушать выражение" aria-pressed="false" title="Слушать">` +
            `<span class="audio-play-icon" aria-hidden="true">▶</span></button>`;
    }

    const RIDDLE_AUDIO_COUNT = 9;

    function riddleAudioUrl(ri, part) {
        const n = Number(ri);
        if (!Number.isFinite(n) || n < 0 || n >= RIDDLE_AUDIO_COUNT) return null;
        const p = (part === 'a') ? 'a' : 'q';
        return 'audio/reading/riddles/r' + String(n + 1).padStart(2, '0') + p + '.m4a';
    }

    function riddleHasAudio(ri, part) {
        return !!riddleAudioUrl(ri, part);
    }

    function playRiddleAudio(ri, part, ev) {
        if (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        }
        const url = riddleAudioUrl(ri, part);
        if (!url) return;
        playAudioUrl(url, (ev && ev.currentTarget) || null);
    }

    function riddleAudioBtnHtml(ri, part, extraClass) {
        if (!riddleHasAudio(ri, part)) return '';
        const label = part === 'a' ? 'Слушать отгадку' : 'Слушать загадку';
        const cls = 'audio-play-btn' + (extraClass ? ' ' + extraClass : '');
        const p = (part === 'a') ? 'a' : 'q';
        return `<button type="button" class="${cls}" onclick="playRiddleAudio(${ri}, '${p}', event)"` +
            ` aria-label="${label}" aria-pressed="false" title="${label}">` +
            `<span class="audio-play-icon" aria-hidden="true">▶</span></button>`;
    }

    const COMPOSE_AUDIO_COUNT = 54;

    function composeAudioUrl(ci) {
        const n = Number(ci);
        if (!Number.isFinite(n) || n < 0 || n >= COMPOSE_AUDIO_COUNT) return null;
        return 'audio/compose/c' + String(n + 1).padStart(2, '0') + '.m4a';
    }

    function composeHasAudio(ci) {
        return !!composeAudioUrl(ci);
    }

    function playComposeAudio(ci, ev) {
        if (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        }
        const url = composeAudioUrl(ci);
        if (!url) return;
        playAudioUrl(url, (ev && ev.currentTarget) || null);
    }

    function composeAudioBtnHtml(ci, extraClass) {
        if (!composeHasAudio(ci)) return '';
        const cls = 'audio-play-btn' + (extraClass ? ' ' + extraClass : '');
        return `<button type="button" class="${cls}" onclick="playComposeAudio(${ci}, event)"` +
            ` aria-label="Слушать слово" aria-pressed="false" title="Слушать">` +
            `<span class="audio-play-icon" aria-hidden="true">▶</span></button>`;
    }

    window.letterAudioUrl = letterAudioUrl;
    window.letterHasAudio = letterHasAudio;
    window.playLetterAudio = playLetterAudio;
    window.playWordAudio = playWordAudio;
    window.wordHasAudio = wordHasAudio;
    window.playExprAudio = playExprAudio;
    window.exprHasAudio = exprHasAudio;
    window.playRiddleAudio = playRiddleAudio;
    window.riddleHasAudio = riddleHasAudio;
    window.playComposeAudio = playComposeAudio;
    window.composeHasAudio = composeHasAudio;
    window.stopLetterAudio = clearPlayingState;
    window.audioPlayBtnHtml = audioPlayBtnHtml;
    window.wordAudioBtnHtml = wordAudioBtnHtml;
    window.exprAudioBtnHtml = exprAudioBtnHtml;
    window.riddleAudioBtnHtml = riddleAudioBtnHtml;
    window.composeAudioBtnHtml = composeAudioBtnHtml;
})();
