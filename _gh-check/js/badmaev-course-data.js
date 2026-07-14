/* badmaev-course-data.js — побуквенный маршрут по А. В. Бадмаеву, 1971 */

const BADMAEV_PARTS = [
    { id: 'vowels', title: 'Гласные', from: 0, to: 6 },
    { id: 'nasals', title: 'Н · Ң', from: 7, to: 8 },
    { id: 'h-group', title: 'Х · Һ', from: 9, to: 10 },
    { id: 'round', title: 'Б · п-галики', from: 11, to: 13 },
    { id: 'body', title: 'С · Ш · Т · Д · Л · М', from: 14, to: 19 },
    { id: 'affricates', title: 'Ц · Ч · З · Җ · Й', from: 20, to: 24 },
    { id: 'velars', title: 'К · Г · Р · В · х¹', from: 25, to: 29 }
];

const VOWELS_DRILL = ['а', 'э', 'и', 'о', 'у', 'ө', 'ү'];

function bcSyllables(cons, extra) {
    const base = VOWELS_DRILL.map(v => cons + v);
    return extra ? base.concat(extra) : base;
}

const BADMAEV_LESSONS = [
    {
        id: 'a', part: 'vowels', page: 3, idx: 0, letter: 'а', capital: 'А',
        title: 'А, а', combinations: ['а'],
        note: 'Начертание конечной «а» бывает двух видов: с росчерком влево пишется после согласных б, к и галиков (Бамба, така, сутра); в остальных случаях — обычное конечное начертание.'
    },
    {
        id: 'e', part: 'vowels', page: 4, idx: 1, letter: 'э', capital: 'Э',
        title: 'Э, э (Е, е)', combinations: ['аэ', 'эа', 'ээ'],
        note: 'В середине и в конце слова «э» изображается одинаково. Иногда каллиграфисты для красоты придавали конечной букве небольшой изгиб влево.'
    },
    {
        id: 'i', part: 'vowels', page: 5, idx: 2, letter: 'и', capital: 'И',
        title: 'И, и', combinations: ['аи', 'эи', 'ии'],
        note: 'С зубчиком «и» в середине пишется после любой гласной. Особое конечное начертание — после б, г, к (шаби, гэрииги); в остальных случаях — обычная конечная форма.'
    },
    {
        id: 'o', part: 'vowels', page: 6, idx: 3, letter: 'о', capital: 'О',
        title: 'О, о', combinations: ['ао', 'ои', 'оэ'],
        note: 'В середине и в конце «о» пишется без зубца, характерного для начальной буквы. Конечная иногда имеет небольшой изгиб влево.'
    },
    {
        id: 'u', part: 'vowels', page: 7, idx: 4, letter: 'у', capital: 'У',
        title: 'У, у', combinations: ['уа', 'уи', 'оу', 'уу'],
        note: 'Диакритические знаки расставляют после написания всего слова: снизу вверх по ходу часовой стрелки (как в слове «хальмг»).'
    },
    {
        id: 'oe', part: 'vowels', page: 8, idx: 5, letter: 'ө', capital: 'Ө',
        title: 'Ө, ө', combinations: ['өэ', 'өи', 'өө', 'иө', 'эө'],
        note: 'Напоминает «о», но с диакритическим знаком в правом верхнем углу. В середине и в конце пишется без короны.'
    },
    {
        id: 'ue', part: 'vowels', page: 9, idx: 6, letter: 'ү', capital: 'Ү',
        title: 'Ү, ү', combinations: ['үө', 'өү', 'үү', 'үйи', 'үи'],
        note: 'Читается как «у», но без нижней черты слева. Долгий «ү» в поздних рукописях передаётся удвоением буквы.'
    },
    {
        id: 'n', part: 'nasals', page: 10, idx: 21, letter: 'н', capital: 'Н',
        title: 'Н, н', combinations: ['на', 'нэ', 'ни', 'но', 'ну', 'нө', 'нү'],
        syllables: ['на', 'нэ', 'ни', 'но', 'ну', 'нө', 'нү', 'энэ'],
        words: [
            { todo: 'ану', modern: 'ану' },
            { todo: 'ину', modern: 'нь', alt: 'инү' },
            { todo: 'уну', modern: 'уну' },
            { todo: 'нана', modern: 'Нана' },
            { todo: 'онон', modern: 'үнн' },
            { todo: 'үнэн', modern: 'үнн' },
            { todo: 'нина', modern: 'Нина' }
        ],
        note: 'Перед гласной в середине слова ставится точка (онон, үнэн, энэ); перед согласной точки нет (генден). В конце после гласной читается «н», после согласной — «а» (сара).'
    },
    {
        id: 'ng', part: 'nasals', page: 11, idx: 22, letter: 'ң', capital: 'Ң',
        title: 'Ң, ң', combinations: ['аң', 'эң', 'өң', 'иң', 'уң', 'оң', 'үң', 'нөң', 'нүң'],
        syllables: ['аң', 'эң', 'өң', 'иң', 'уң', 'оң', 'үң', 'нөң', 'нүң'],
        noInitial: true,
        note: 'В начале слова не употребляется. Знак состоит из «н» и «г»; перед согласной точка перед «н» не ставится.'
    },
    {
        id: 'x', part: 'h-group', page: 12, idx: 23, letter: 'х', capital: 'Х',
        title: 'Х, х', combinations: ['ха', 'ху'],
        syllables: ['ха', 'ху'],
        words: [
            { todo: 'аха', modern: 'ах' },
            { todo: 'хаан', modern: 'хан' },
            { todo: 'ухаан', modern: 'ухан' },
            { todo: 'хоино', modern: 'хөөн' },
            { todo: 'хоңхо', modern: 'хоңх' },
            { todo: 'аңхуун', modern: 'аңхун' },
            { todo: 'нахуу', modern: 'наху' }
        ],
        noFinal: true,
        note: 'По слоговому методу в конце слова «х» не пишут — всегда открытый слог. Относится к твёрдым согласным: хуби, хари, хонин, а не хүв, хөн.'
    },
    {
        id: 'h', part: 'h-group', page: 13, idx: 24, letter: 'һ', capital: 'Һ',
        title: 'Һ, һ', combinations: ['һа', 'һо', 'һу'],
        syllables: ['һа', 'һо', 'һу'],
        words: [
            { todo: 'аһа', modern: 'аһ' },
            { todo: 'һаң', modern: 'һаң' },
            { todo: 'һаһай', modern: 'һаһа' },
            { todo: 'һахай', modern: 'һаха' },
            { todo: 'һунун', modern: 'һунн' },
            { todo: 'унуһун', modern: 'унһн' },
            { todo: 'уһааху', modern: 'уһах' }
        ],
        noFinal: true,
        note: 'От «х» отличается кружочком вместо двух точек. Как и «х», только с гласными твёрдого ряда (а, о, у); в начале и в середине слова.'
    },
    {
        id: 'b', part: 'round', page: 14, idx: 25, letter: 'б', capital: 'Б',
        title: 'Б, б', combinations: ['ба', 'бэ', 'би', 'бо', 'бу', 'бө', 'бү'],
        syllables: ['ба', 'бэ', 'би', 'бо', 'бу', 'бө', 'бү', 'обоо'],
        words: [
            { todo: 'аба', modern: 'ав' },
            { todo: 'абаһа', modern: 'авһ' },
            { todo: 'бэбээ', modern: 'Бебә' },
            { todo: 'буһу', modern: 'буһ' },
            { todo: 'буху', modern: 'бух' },
            { todo: 'баһа', modern: 'баһ' },
            { todo: 'буи', modern: 'ва' },
            { todo: 'аб', modern: 'ав' },
            { todo: 'эб', modern: 'эв' }
        ],
        note: 'Круглая согласная без вертикальной «основы»: гласные прибавляются непосредственно. Перед круглыми гласными — широкая форма, перед остальными — узкая.'
    },
    {
        id: 'pb-galik', part: 'round', page: 16, idx: 27, letter: 'п', capital: 'П',
        title: 'П, п (галик б)', combinations: ['по', 'пу', 'пө', 'пү', 'па', 'пи'],
        syllables: ['по', 'пу', 'пө', 'пү'],
        isGalik: true,
        noFinal: true,
        note: 'Галик для заимствований из тибетского и санскрита; читается как «б». Круглая форма перед о, у, ө, ү.'
    },
    {
        id: 'pf-galik', part: 'round', page: 17, idx: 29, letter: 'п', capital: 'П',
        title: 'П, п (галик ф)', combinations: ['фо', 'фу', 'фа', 'фи'],
        syllables: ['фо', 'фу'],
        isGalik: true,
        noFinal: true,
        note: 'Галик для заимствований; читается как «п» / «ф». В позднее время — слова через русский язык (февраль, Петр).'
    },
    {
        id: 's', part: 'body', page: 18, idx: 31, letter: 'с', capital: 'С',
        title: 'С, с', combinations: bcSyllables('с'),
        syllables: bcSyllables('с'),
        words: [{ todo: 'сара', modern: 'сар' }],
        note: 'Перед «и» всегда читается как «ш». Может стоять в конце слова (барс, арслан).'
    },
    {
        id: 'sh', part: 'body', page: 19, idx: 32, letter: 'ш', capital: 'Ш',
        title: 'Ш, ш', combinations: bcSyllables('ш'),
        syllables: bcSyllables('ш'),
        note: 'От «с» отличается двумя точками справа. Среднее и конечное начертание совпадают.'
    },
    {
        id: 't', part: 'body', page: 20, idx: 33, letter: 'т', capital: 'Т',
        title: 'Т, т', combinations: bcSyllables('т'),
        syllables: bcSyllables('т'),
        noFinal: true,
        note: 'Слогообразующая: после «т» обязательно следует гласная, в конце литературного слова не встречается.'
    },
    {
        id: 'd', part: 'body', page: 21, idx: 34, letter: 'д', capital: 'Д',
        title: 'Д, д', combinations: bcSyllables('д'),
        syllables: bcSyllables('д'),
        note: 'Во всех трёх положениях начертание одинаковое. Может быть второй согласной в конце (хард-нирд).'
    },
    {
        id: 'l', part: 'body', page: 22, idx: 35, letter: 'л', capital: 'Л',
        title: 'Л, л', combinations: bcSyllables('л'),
        syllables: bcSyllables('л'),
        note: 'В середине и в конце написание совпадает; черта уходит вверх справа от линии-основы.'
    },
    {
        id: 'm', part: 'body', page: 23, idx: 36, letter: 'м', capital: 'М',
        title: 'М, м', combinations: bcSyllables('м'),
        syllables: bcSyllables('м'),
        note: 'В середине и в конце написание совпадает; в конце после гласной — особый конечный знак.'
    },
    {
        id: 'ts', part: 'affricates', page: 24, idx: 37, letter: 'ц', capital: 'Ц',
        title: 'Ц, ц', combinations: bcSyllables('ц'),
        syllables: bcSyllables('ц'),
        noFinal: true,
        note: 'Перед «и» передаёт «ч» (цидал = чидл). В кириллице часто записывается как «ч».'
    },
    {
        id: 'ch', part: 'affricates', page: 25, idx: 38, letter: 'ч', capital: 'Ч',
        title: 'Ч, ч (галик)', combinations: bcSyllables('ч'),
        syllables: bcSyllables('ч'),
        isGalik: true,
        noFinal: true,
        note: 'Изначально для заимствований; позже — звук «ч» в калмыцких словах (чон, чавч).'
    },
    {
        id: 'z', part: 'affricates', page: 26, idx: 39, letter: 'з', capital: 'З',
        title: 'З, з', combinations: bcSyllables('з'),
        syllables: bcSyllables('з'),
        noFinal: true,
        note: 'Перед «и» читается как «җ», хотя пишется «з». В конце слова не употребляется.'
    },
    {
        id: 'zh', part: 'affricates', page: 27, idx: 43, letter: 'җ', capital: 'Җ',
        title: 'Җ, җ (галик)', combinations: bcSyllables('җ'),
        syllables: bcSyllables('җ'),
        isGalik: true,
        noFinal: true,
        note: 'Галик для тибетско-санскритских слов; позже — звук «җ» в исконных словах (җил, җала).'
    },
    {
        id: 'y', part: 'affricates', page: 28, idx: 44, letter: 'й', capital: 'Й',
        title: 'Й, й', combinations: ['айи', 'эйи', 'ийи', 'ойи', 'уйи', 'өйи', 'үйи'],
        syllables: ['айи', 'эйи', 'ийи', 'ойи', 'уйи', 'өйи', 'үйи'],
        noFinal: true,
        note: 'В конце слова не встречается. В дифтонгах записывается по правилам раздела «Дифтонги».'
    },
    {
        id: 'k', part: 'velars', page: 29, idx: 45, letter: 'к', capital: 'К',
        title: 'К, к', combinations: ['ка', 'ко', 'ку', 'кэ', 'ки', 'кө', 'кү'],
        syllables: ['ка', 'ко', 'ку'],
        noFinal: true,
        note: 'Круглая форма только с гласными твёрдого ряда (а, о, у). На конце слова заменяется знаком «аг».'
    },
    {
        id: 'g', part: 'velars', page: 30, idx: 49, letter: 'г', capital: 'Г',
        title: 'Г, г', combinations: ['гэ', 'ги', 'гө', 'гү', 'го', 'гу', 'га'],
        syllables: ['гэ', 'ги', 'гө', 'гү'],
        noFinal: true,
        note: 'Круглая «г» — с о, у, ө, ү; узкая — с а, э, и. На конце — знак «аг».'
    },
    {
        id: 'r', part: 'velars', page: 31, idx: 52, letter: 'р', capital: 'Р',
        title: 'Р, р', combinations: bcSyllables('р'),
        syllables: bcSyllables('р'),
        note: 'Может занимать любую позицию в слове, в том числе конец (гарь, һар).'
    },
    {
        id: 'v', part: 'velars', page: 32, idx: 53, letter: 'в', capital: 'В',
        title: 'В, в', combinations: bcSyllables('в'),
        syllables: bcSyllables('в'),
        note: 'В старой орфографии встречалась редко; чаще «б» перед гласной читалась как [в].'
    },
    {
        id: 'xh', part: 'velars', page: 33, idx: 54, letter: 'х', capital: 'Х',
        title: 'Х, х (мягкий, галик)', combinations: ['хи', 'хэ', 'хө', 'хү'],
        syllables: ['хи', 'хэ'],
        isGalik: true,
        noFinal: true,
        note: 'Галик для придыхания в заимствованиях и для переднерядных сочетаний в поздней орфографии.'
    }
];

const BADMAEV_STEPS = ['Формы', 'Соединения', 'Написание', 'Разбор', 'Проверка'];
