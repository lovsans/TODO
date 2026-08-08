/* audio.js — озвучка букв и слогов.
   Файлы: audio/vowels|long_vowels|diphthongs|consonants|galik|syllables/…
   slug: ö→oe, ü→ue, ң→ng, һ→gh, š→sh; k1n/k2n/g1n — узкие формы. */

(function () {
    const LETTER_AUDIO = {
        // гласные
        0: 'audio/vowels/a.mp3',
        1: 'audio/vowels/e.mp3',
        2: 'audio/vowels/i.mp3',
        3: 'audio/vowels/o.mp3',
        4: 'audio/vowels/u.mp3',
        5: 'audio/vowels/oe.mp3',
        6: 'audio/vowels/ue.mp3',
        // долгие гласные
        7: 'audio/long_vowels/aa.mp3',
        8: 'audio/long_vowels/ee.mp3',
        9: 'audio/long_vowels/ii.mp3',
        10: 'audio/long_vowels/oo.mp3',
        11: 'audio/long_vowels/uu.mp3',
        12: 'audio/long_vowels/oee.mp3',
        13: 'audio/long_vowels/oeu.mp3',
        // дифтонги
        14: 'audio/diphthongs/ayi.mp3',
        15: 'audio/diphthongs/eyi.mp3',
        16: 'audio/diphthongs/iyi.mp3',
        17: 'audio/diphthongs/oyi.mp3',
        18: 'audio/diphthongs/uyi.mp3',
        19: 'audio/diphthongs/oeyi.mp3',
        20: 'audio/diphthongs/ueyi.mp3',
        // согласные (порядок атласа; галики отдельно)
        21: 'audio/consonants/n.mp3',
        22: 'audio/consonants/ng.mp3',
        23: 'audio/consonants/x.mp3',
        24: 'audio/consonants/gh.mp3',
        25: 'audio/consonants/b1.mp3',
        26: 'audio/consonants/b2.mp3',
        31: 'audio/consonants/s.mp3',
        32: 'audio/consonants/sh.mp3',
        33: 'audio/consonants/t.mp3',
        34: 'audio/consonants/d.mp3',
        35: 'audio/consonants/l.mp3',
        36: 'audio/consonants/m.mp3',
        37: 'audio/consonants/c.mp3',
        39: 'audio/consonants/z.mp3',
        44: 'audio/consonants/y.mp3',
        45: 'audio/consonants/k1.mp3',
        46: 'audio/consonants/k1n.mp3',
        47: 'audio/consonants/k2.mp3',
        48: 'audio/consonants/k2n.mp3',
        49: 'audio/consonants/g1.mp3',
        50: 'audio/consonants/g1n.mp3',
        51: 'audio/consonants/q.mp3',
        52: 'audio/consonants/r.mp3',
        53: 'audio/consonants/v.mp3',
        // специальные (откидная а ← гласная №1; конечная и ← гласная №3)
        55: 'audio/vowels/a.mp3',
        56: 'audio/vowels/i.mp3',
        // элементы письма
        57: 'audio/elements/nurhun.mp3',
        58: 'audio/elements/udan.mp3',
        59: 'audio/elements/titm.mp3',
        60: 'audio/elements/aran.mp3',
        61: 'audio/elements/neg_ceq.mp3',
        62: 'audio/elements/xoyor_ceq.mp3',
        63: 'audio/elements/togrg_ceq.mp3',
        64: 'audio/elements/uru_tatasn.mp3',
        65: 'audio/elements/kuchlg.mp3',
        // цифры 0–9
        66: 'audio/numbers/0.mp3',
        67: 'audio/numbers/1.mp3',
        68: 'audio/numbers/2.mp3',
        69: 'audio/numbers/3.mp3',
        70: 'audio/numbers/4.mp3',
        71: 'audio/numbers/5.mp3',
        72: 'audio/numbers/6.mp3',
        73: 'audio/numbers/7.mp3',
        74: 'audio/numbers/8.mp3',
        75: 'audio/numbers/9.mp3',
        // пунктуация
        76: 'audio/punctuation/birga.mp3',
        77: 'audio/punctuation/point4.mp3',
        78: 'audio/punctuation/comma.mp3',
        79: 'audio/punctuation/colon.mp3',
        // галики
        27: 'audio/galik/pb1.mp3',
        28: 'audio/galik/pb2.mp3',
        29: 'audio/galik/pf1.mp3',
        30: 'audio/galik/pf2.mp3',
        38: 'audio/galik/ch.mp3',
        40: 'audio/galik/z1.mp3',
        41: 'audio/galik/z2.mp3',
        42: 'audio/galik/z3.mp3',
        43: 'audio/galik/j.mp3',
        54: 'audio/galik/xh.mp3',
        // слоги: Н-ряд
        80: 'audio/syllables/na.mp3',
        81: 'audio/syllables/ne.mp3',
        82: 'audio/syllables/ni.mp3',
        83: 'audio/syllables/no.mp3',
        84: 'audio/syllables/nu.mp3',
        85: 'audio/syllables/noe.mp3',
        86: 'audio/syllables/nue.mp3',
        // слоги: гласная / Н + «ң»
        87: 'audio/syllables/ang.mp3',
        88: 'audio/syllables/eng.mp3',
        89: 'audio/syllables/ing.mp3',
        90: 'audio/syllables/ong.mp3',
        91: 'audio/syllables/ung.mp3',
        92: 'audio/syllables/oeng.mp3',
        93: 'audio/syllables/ueng.mp3',
        94: 'audio/syllables/noeng.mp3',
        95: 'audio/syllables/nueng.mp3',
        // слоги: Х/Һ … Д (слоги1)
        96: 'audio/syllables/xa.mp3',
        97: 'audio/syllables/xo.mp3',
        98: 'audio/syllables/xu.mp3',
        99: 'audio/syllables/gha.mp3',
        100: 'audio/syllables/gho.mp3',
        101: 'audio/syllables/ghu.mp3',
        102: 'audio/syllables/ba.mp3',
        103: 'audio/syllables/be.mp3',
        104: 'audio/syllables/bi.mp3',
        105: 'audio/syllables/bo.mp3',
        106: 'audio/syllables/bu.mp3',
        107: 'audio/syllables/boe.mp3',
        108: 'audio/syllables/bue.mp3',
        109: 'audio/syllables/pa.mp3',
        110: 'audio/syllables/pe.mp3',
        111: 'audio/syllables/pi.mp3',
        112: 'audio/syllables/po.mp3',
        113: 'audio/syllables/pu.mp3',
        114: 'audio/syllables/poe.mp3',
        115: 'audio/syllables/pue.mp3',
        116: 'audio/syllables/fa.mp3',
        117: 'audio/syllables/fe.mp3',
        118: 'audio/syllables/fi.mp3',
        119: 'audio/syllables/fo.mp3',
        120: 'audio/syllables/fu.mp3',
        121: 'audio/syllables/foe.mp3',
        122: 'audio/syllables/fue.mp3',
        123: 'audio/syllables/sa.mp3',
        124: 'audio/syllables/se.mp3',
        125: 'audio/syllables/si.mp3',
        126: 'audio/syllables/so.mp3',
        127: 'audio/syllables/su.mp3',
        128: 'audio/syllables/soe.mp3',
        129: 'audio/syllables/sue.mp3',
        130: 'audio/syllables/sha.mp3',
        131: 'audio/syllables/she.mp3',
        132: 'audio/syllables/shi.mp3',
        133: 'audio/syllables/sho.mp3',
        134: 'audio/syllables/shu.mp3',
        135: 'audio/syllables/shoe.mp3',
        136: 'audio/syllables/shue.mp3',
        137: 'audio/syllables/ta.mp3',
        138: 'audio/syllables/te.mp3',
        139: 'audio/syllables/ti.mp3',
        140: 'audio/syllables/to.mp3',
        141: 'audio/syllables/tu.mp3',
        142: 'audio/syllables/toe.mp3',
        143: 'audio/syllables/tue.mp3',
        144: 'audio/syllables/da.mp3',
        145: 'audio/syllables/de.mp3',
        146: 'audio/syllables/di.mp3',
        147: 'audio/syllables/do.mp3',
        148: 'audio/syllables/du.mp3',
        149: 'audio/syllables/doe.mp3',
        150: 'audio/syllables/due.mp3',
        // слоги: Л … Х (слоги 2)
        151: 'audio/syllables/la.mp3',
        152: 'audio/syllables/le.mp3',
        153: 'audio/syllables/li.mp3',
        154: 'audio/syllables/lo.mp3',
        155: 'audio/syllables/lu.mp3',
        156: 'audio/syllables/loe.mp3',
        157: 'audio/syllables/lue.mp3',
        158: 'audio/syllables/ma.mp3',
        159: 'audio/syllables/me.mp3',
        160: 'audio/syllables/mi.mp3',
        161: 'audio/syllables/mo.mp3',
        162: 'audio/syllables/mu.mp3',
        163: 'audio/syllables/moe.mp3',
        164: 'audio/syllables/mue.mp3',
        165: 'audio/syllables/ca.mp3',
        166: 'audio/syllables/ce.mp3',
        167: 'audio/syllables/chi.mp3',
        168: 'audio/syllables/co.mp3',
        169: 'audio/syllables/cu.mp3',
        170: 'audio/syllables/coe.mp3',
        171: 'audio/syllables/cue.mp3',
        172: 'audio/syllables/za.mp3',
        173: 'audio/syllables/ze.mp3',
        174: 'audio/syllables/zi.mp3',
        175: 'audio/syllables/zo.mp3',
        176: 'audio/syllables/zu.mp3',
        177: 'audio/syllables/zoe.mp3',
        178: 'audio/syllables/zue.mp3',
        179: 'audio/syllables/ja.mp3',
        180: 'audio/syllables/je.mp3',
        181: 'audio/syllables/ji.mp3',
        182: 'audio/syllables/jo.mp3',
        183: 'audio/syllables/ju.mp3',
        184: 'audio/syllables/joe.mp3',
        185: 'audio/syllables/jue.mp3',
        186: 'audio/syllables/ya.mp3',
        187: 'audio/syllables/ye.mp3',
        188: 'audio/syllables/yi.mp3',
        189: 'audio/syllables/yo.mp3',
        190: 'audio/syllables/yu.mp3',
        191: 'audio/syllables/yoe.mp3',
        192: 'audio/syllables/yue.mp3',
        193: 'audio/syllables/ka.mp3',
        194: 'audio/syllables/ko.mp3',
        195: 'audio/syllables/ku.mp3',
        196: 'audio/syllables/ke.mp3',
        197: 'audio/syllables/ki.mp3',
        198: 'audio/syllables/koe.mp3',
        199: 'audio/syllables/kue.mp3',
        200: 'audio/syllables/ge.mp3',
        201: 'audio/syllables/gi.mp3',
        202: 'audio/syllables/goe.mp3',
        203: 'audio/syllables/gue.mp3',
        204: 'audio/syllables/ra.mp3',
        205: 'audio/syllables/re.mp3',
        206: 'audio/syllables/ri.mp3',
        207: 'audio/syllables/ro.mp3',
        208: 'audio/syllables/ru.mp3',
        209: 'audio/syllables/roe.mp3',
        210: 'audio/syllables/rue.mp3',
        211: 'audio/syllables/va.mp3',
        212: 'audio/syllables/ve.mp3',
        213: 'audio/syllables/vi.mp3',
        214: 'audio/syllables/vo.mp3',
        215: 'audio/syllables/vu.mp3',
        216: 'audio/syllables/voe.mp3',
        217: 'audio/syllables/vue.mp3',
        218: 'audio/syllables/ha.mp3',
        219: 'audio/syllables/he.mp3',
        220: 'audio/syllables/hi.mp3',
        221: 'audio/syllables/ho.mp3',
        222: 'audio/syllables/hu.mp3',
        223: 'audio/syllables/hoe.mp3',
        224: 'audio/syllables/hue.mp3'
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
        return 'audio/words/w' + num + '.mp3';
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
        return 'audio/reading/expr/e' + String(n + 1).padStart(2, '0') + '.mp3';
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
        return 'audio/reading/riddles/r' + String(n + 1).padStart(2, '0') + p + '.mp3';
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
        return 'audio/compose/c' + String(n + 1).padStart(2, '0') + '.mp3';
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
