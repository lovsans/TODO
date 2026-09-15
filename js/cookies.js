/* Баннер согласия на cookie / локальное хранение. */
(function () {
    if (window.self !== window.top) return;

    var KEY = 'todo-cookie-consent';
    var COOKIE = 'todo-consent';

    function readChoice() {
        try {
            var v = localStorage.getItem(KEY);
            if (v === 'accepted' || v === 'necessary') return v;
        } catch (e) {}
        return '';
    }

    function writeChoice(choice) {
        try { localStorage.setItem(KEY, choice); } catch (e) {}
        try {
            document.cookie = COOKIE + '=' + choice + '; Max-Age=31536000; Path=/; SameSite=Lax';
        } catch (e) {}
    }

    function hide(el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
        document.documentElement.classList.remove('cookie-banner-open');
    }

    function show() {
        if (readChoice() || document.getElementById('cookie-banner')) return;

        var bar = document.createElement('div');
        bar.id = 'cookie-banner';
        bar.className = 'cookie-banner';
        bar.setAttribute('role', 'dialog');
        bar.setAttribute('aria-labelledby', 'cookie-banner-title');
        bar.setAttribute('aria-describedby', 'cookie-banner-text');

        var inner = document.createElement('div');
        inner.className = 'cookie-banner-inner';

        var copy = document.createElement('div');
        copy.className = 'cookie-banner-copy';

        var title = document.createElement('p');
        title.id = 'cookie-banner-title';
        title.className = 'cookie-banner-title';
        title.textContent = 'Файлы cookie';

        var text = document.createElement('p');
        text.id = 'cookie-banner-text';
        text.className = 'cookie-banner-text';
        text.appendChild(document.createTextNode(
            'Сайт запоминает тему, прогресс и настройки в вашем браузере. Рекламных и аналитических cookie нет. Подробнее — в разделе '
        ));
        var link = document.createElement('a');
        link.href = 'privacy.html#storage';
        link.textContent = 'локального хранения';
        text.appendChild(link);
        text.appendChild(document.createTextNode('.'));

        copy.appendChild(title);
        copy.appendChild(text);

        var actions = document.createElement('div');
        actions.className = 'cookie-banner-actions';

        var accept = document.createElement('button');
        accept.type = 'button';
        accept.className = 'cookie-banner-btn cookie-banner-btn-accept';
        accept.textContent = 'Принять cookies';

        var necessary = document.createElement('button');
        necessary.type = 'button';
        necessary.className = 'cookie-banner-btn cookie-banner-btn-necessary';
        necessary.textContent = 'Только необходимые';

        accept.addEventListener('click', function () {
            writeChoice('accepted');
            hide(bar);
        });
        necessary.addEventListener('click', function () {
            writeChoice('necessary');
            hide(bar);
        });

        actions.appendChild(accept);
        actions.appendChild(necessary);
        inner.appendChild(copy);
        inner.appendChild(actions);
        bar.appendChild(inner);

        document.documentElement.classList.add('cookie-banner-open');
        document.body.appendChild(bar);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', show);
    } else {
        show();
    }
})();
