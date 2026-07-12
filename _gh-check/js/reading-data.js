/* reading-data.js — тексты раздела «Чтение» из пособия «Цаһан толһа» (Очра Номт; перенабор А. Оргаева).
   У каждого фрагмента три поля:
     td — письмо Тодо (позиционная кодировка под шрифт BarinTodo, отображается вертикально);
     km — современная калмыцкая форма (кириллица; есть в «Кратких выражениях»);
     tr — транслитерация (научная латиница; первый проход — можно править вручную);
     ru — перевод на русский (черновой; пустая строка '' = не заполнено, показывается как «—»).

   Схема транслитерации (код BarinTodo -> латиница), на случай правок tr:
     гласные: a e i o u, q/[=ö, w/]=ü, =/{ — округлые в «арке» (ö/ü), A/I/... — конечные формы
     согласные: H/x=x, h/v/V=γ, C=č, S=š, j=ǰ, Y/X=ƞ(ң), T=d, G/g=g, K/k=k …
     служебные знаки ' ` - _ / \ ; опущены; ` в начале строки — бирга, : — конечная пунктуация. */
/* Загадки (riddles) — отдельный источник (Zagadki.xlsx), набраны в кодировке шрифта
   'TodoPozdneyev' (та же, что у «Кратких выражений»), а не BarinTodo, как остальные вкладки.
   Формат записи: { q: {td, tr, km}, ru, a: {td, tr, km, ru} } — td/tr/km вопроса и отдельно
   ответа (отгадки); ru на верхнем уровне — перевод вопроса, a.ru — перевод отгадки. */
const readingData = {
  "expr": [
    {
      "td": "бОро ъазирһА",
      "km": "бор аҗрһ",
      "tr": "boro aǰirγa",
      "ru": "серый жеребец"
    },
    {
      "td": "бОрощцИ  гюүА",
      "km": "боргч гүн",
      "tr": "boroqči güün",
      "ru": "серая кобылица"
    },
    {
      "td": "ХарА ЕориА",
      "km": "хар мөрн",
      "tr": "xara morin",
      "ru": "вороной конь"
    },
    {
      "td": "ХарА йамаьА",
      "km": "хар яман",
      "tr": "xara yamān",
      "ru": "чёрная коза"
    },
    {
      "td": "ХарА ХуцУ",
      "km": "хар хуц",
      "tr": "xara xucu",
      "ru": "чёрный баран"
    },
    {
      "td": "ХаращцИ ХойиА",
      "km": "харгч хөн",
      "tr": "xaraqči xoyin",
      "ru": "чёрная овца"
    },
    {
      "td": "цаһаьА ХойиА",
      "km": "цаһан хөн",
      "tr": "caγān xoyin",
      "ru": "белый баран"
    },
    {
      "td": "ъулаьА бяхУ",
      "km": "улан бух",
      "tr": "ulān buxu",
      "ru": "красный бык"
    },
    {
      "td": "ъулаьщцИ ъүкюР",
      "km": "улагчн үкр",
      "tr": "ulāqči ükür",
      "ru": "красная корова"
    },
    {
      "td": "шарһА ъүрэь",
      "km": "шарһ үрә",
      "tr": "šarγa ürē",
      "ru": "соловый трёхгодовалый конь"
    },
    {
      "td": "шарһащцИ  bайисаА",
      "km": "шарһгч бәәсн",
      "tr": "šarγaqči bayisan",
      "ru": "соловая трёхлетняя кобылица"
    },
    {
      "td": "сэриүА  сал__CиА",
      "km": "серүн салькн",
      "tr": "seriün salkin",
      "ru": "прохладный ветер"
    },
    {
      "td": "ЕуҮ   кюүА",
      "km": "му күн",
      "tr": "muü küün",
      "ru": "плохой человек"
    },
    {
      "td": "сайиА ъиниЩ",
      "km": "сән иньг",
      "tr": "sayin iniq",
      "ru": "хороший друг"
    },
    {
      "td": "сайихаА gэР",
      "km": "сәәхн гер",
      "tr": "sayixan ger",
      "ru": "красивый дом"
    },
    {
      "td": "сайиbаР  залуҮ",
      "km": "сәәвр залу",
      "tr": "sayibar zaluu",
      "ru": "хороший мужчина"
    },
    {
      "td": "ЕаштаЩ кюүА",
      "km": "маштг күн",
      "tr": "maštaq küün",
      "ru": "человек низкого роста"
    },
    {
      "td": "ъутУ ЕодоА",
      "km": "ут модн",
      "tr": "utu modon",
      "ru": "длинное бревно"
    },
    {
      "td": "ъахархаА бярь___А",
      "km": "ахрхн бура",
      "tr": "axarxan burā",
      "ru": "короткий прут"
    },
    {
      "td": "ъахархаА ҺаР",
      "km": "ахрхн һар",
      "tr": "axarxan γar",
      "ru": "короткая рука"
    },
    {
      "td": "ѣэщшИ ҺазаР",
      "km": "тегш һазр",
      "tr": "teqši γazar",
      "ru": "ровная земля"
    },
    {
      "td": "ѣиниgэР кюүА",
      "km": "тиньгр күн",
      "tr": "tiniger küün",
      "ru": "спокойный человек"
    }
  ],
  "riddles": [
    {
      "q": {
        "td": "НарихаА ХарА ЕориА НайимаА ѣүмүА ѣамһтаИ .",
        "tr": "narixan xara morin nayiman tümün tamγatai.",
        "km": "нәрхн хар мөрн нәәмн түмн тамһта."
      },
      "ru": "худенький вороной конь с 80000 тавро.",
      "a": {
        "td": "ХуйираИ",
        "tr": "xuyirai",
        "km": "хүүрә",
        "ru": "напильник."
      }
    },
    {
      "q": {
        "td": "ѣөмөР ҺахаИ ъолсоА сүүлтэИ .",
        "tr": "tömör γaxai olson süültei.",
        "km": "төмр һаха олсн сүүлтә."
      },
      "ru": "железная свинья с хвостом из конопли.",
      "a": {
        "td": "зөүА",
        "tr": "zöün",
        "km": "зүн",
        "ru": "игла."
      }
    },
    {
      "q": {
        "td": "ҺаЛ шиЛ НидүтэИ ҺанцаьраА гюүдэЩ bаь__туР .",
        "tr": "γal šil nidütei γancāran guüdeq bātur.",
        "km": "һал шил нүдтә һанцарн гүүдг баатр."
      },
      "ru": "богатырь с горящими стекловидными глазами, любящий бегать в одиночку.",
      "a": {
        "td": "циноь",
        "tr": "cinō",
        "km": "чон",
        "ru": "волк"
      }
    },
    {
      "q": {
        "td": "дэь__рэ__ьсҮ ъунусуА дэрсэА ХурсуА  дөрбӨА кӨлнИ ЕайиһаЩ ѣайиһаЩ .",
        "tr": "deresü unusun dersen xursun dörbön kölni mayiγaq .",
        "km": "деерәс унсн дерсн хурсн көлнь мәәһг-тәәһг."
      },
      "ru": "у сыра упавшего с неба четыре ноги кривые.",
      "a": {
        "td": "ЕэCэлэИ",
        "tr": "mekelei",
        "km": "меклә",
        "ru": "лягушка"
      }
    },
    {
      "q": {
        "td": "зудийиА Хойино зуүА  даbхаР дэbэлтэИ .",
        "tr": "zudiyin xoyino zuun dabxar debeltei.",
        "km": "зудын хөөн зун давхр девлтә."
      },
      "ru": "после дзута, в сто шуб одета.",
      "a": {
        "td": "ЕаңcирсаА",
        "tr": "maŋgirsan",
        "km": "мәңһрсн",
        "ru": "лук"
      }
    },
    {
      "q": {
        "td": "ъарbаһаР сарbаһаР ЕодоА ъарbаА ХойоР ъацатаИ ,  ъацА бОлһоА Һуциьһад ХамтаһасутаИ .",
        "tr": "arbaγar sarbaγar modon arban xoyor acatai, aca bolγon γucīγad xamtaγasutai.",
        "km": "арвһр-сарвһр модн арвн хойр ацта, ац болһн һучаһад хамтхаста."
      },
      "ru": "на ветвистом дереве двенадцать ветвей, на каждой ветке по тридцать листьев.",
      "a": {
        "td": "зиЛ, саР, ъөдөР",
        "tr": "ǰil, sar, ӧdӧr",
        "km": "җил, сар, өдр",
        "ru": "год, месяц, день"
      }
    },
    {
      "q": {
        "td": "кӨкӨ бОро Еорийиgы ъунузИ ъэсэ бОлзИ ,  кӨгӨЛ ъиштэИ Еалиь__gы bаризИ ъэсэ бОлзИ .",
        "tr": "kökö boro möriyigi unuǰi ese bolǰi,kögöl ištei malīgi bariǰi ese bolǰi.",
        "km": "көк бор мөриг унҗ эс болҗ, көгл иштә маляг бәрҗ эс болҗ."
      },
      "ru": "невзможно сесть на сивого коня , невзможно удержать в руке, плеть с терновой рукоятью.",
      "a": {
        "td": "циноь , ЕоһоИ",
        "tr": "cinō, moγoi",
        "km": "чон, моһа",
        "ru": "волк, змея"
      }
    },
    {
      "q": {
        "td": "циадаһаА цишCизИ , циCинИ ЕошCизИ .",
        "tr": "čindaγan čiškiǰi,čikiyini moškiǰi.",
        "km": "чиндһн чишкҗ, чикнь мошкҗ (домбрт көг орулх)."
      },
      "ru": "начали крутить за уши - кролик завизжал (настраивать домбру)",
      "a": {
        "td": "домбяР",
        "tr": "dombur",
        "km": "домбр",
        "ru": "домбра"
      }
    },
    {
      "q": {
        "td": "ъуйудаЛ ъүgэИ зүүдүЛ .",
        "tr": "uyudal ügei züüdül.",
        "km": "уйдл уга зүүдл"
      },
      "ru": "шитьё без шва",
      "a": {
        "td": "ъүкярийиА цоьхоР",
        "tr": "üküriyin cōxor",
        "km": "үкрин цоохр",
        "ru": "пежины коровы"
      }
    }
  ],
  "proverbs": [
    {
      "lines": [
        {
          "td": "K=-giyiA 'q-rq K=-,",
          "tr": "kögiyia örö kö,"
        },
        {
          "td": "'q-K=nI 'q-rq 'qK=A.",
          "tr": "ököni örö ököa."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "K[wA B[EhU b;va-saA,",
          "tr": "kuüa bueγu bγasaa,"
        },
        {
          "td": "K[Ew/ B[EhU 'unuvuna-saA.",
          "tr": "kueü bueγu unuγunasaa."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "bijiyiA 'wnwR",
          "tr": "biǰiyia ünür"
        },
        {
          "td": "bijidU Pede/dede/ 'wgeI.",
          "tr": "biǰidu pededede ügei."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "PuW K[wA SodoA K=xeI,",
          "tr": "puü kuüa šodoa köxei,"
        },
        {
          "td": "sayiA K[wA sayib;R DoraI.",
          "tr": "sayia kuüa sayibr dorai."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "zama/ sayitayidU zavasaA Hurda/,",
          "tr": "zama sayitayidu zaγasaa xurda,"
        },
        {
          "td": "zaX sayitayidU K[wA Hurda/.",
          "tr": "zaƞ sayitayidu kuüa xurda."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "PeK[dW 'wge kele,",
          "tr": "pekudü üge kele,"
        },
        {
          "td": "PergeadW K=re-se xahA.",
          "tr": "pergeadü körese xaγa."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "deged ceceA bije-A b;rda/,",
          "tr": "deged cecea biǰea brda,"
        },
        {
          "td": "degeleI geR 'qrbe-A b;rda/.",
          "tr": "degelei ger örbea brda."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "Hoyitoki-A sana/saA zaluW ceceA,",
          "tr": "xoyitokia sanasaa zaluü cecea,"
        },
        {
          "td": "HuwCa-A Hataha/saA b;-b:aI ceceA.",
          "tr": "xuüčaa xataγasaa bb·ai cecea."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "serwwL 'wge-dW",
          "tr": "serüül ügedü"
        },
        {
          "td": "'erwwL 'wgeI.",
          "tr": "erüül ügei."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "HobtU 'wnwA 'wgeI,",
          "tr": "xobtu ünüa ügei,"
        },
        {
          "td": "HuduTdU sayiA 'wgeI.",
          "tr": "xududdu sayia ügei."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "'uwlU 'qrG=Eq CidaltaI B[EB[ Cigi\\",
          "tr": "uülu örgöeö čidaltai buebu čigi"
        },
        {
          "td": "'usuadU b;-mA Vari/.",
          "tr": "usuadu bma γari."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "'erG[W K[wA",
          "tr": "erguü kuüa"
        },
        {
          "td": "'ere 'eme HojoriyiA Ho-roadU.",
          "tr": "ere eme xoǰoriyia xoroadu."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "'erkeA 'erG[W 'eme-A Pa/tada/,",
          "tr": "erkea erguü emea patada,"
        },
        {
          "td": "duadU 'erG[W Sqre-A Pa/tada/,",
          "tr": "duadu erguü šörea patada,"
        },
        {
          "td": "'ada/ 'erG[W bije-A Pa/tada/.",
          "tr": "ada erguü biǰea patada."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "Haw\\ 'wgeI K[wA",
          "tr": "xaü ügei kuüa"
        },
        {
          "td": "Haacaada-A B]ruwtaI.",
          "tr": "xaacaadaa büruütai."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "CikiA HuduTCI,",
          "tr": "čikia xududči,"
        },
        {
          "td": "NwdwA 'wnwCI.",
          "tr": "nüdüa ünüči."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "toTvaI B[rwA B[EhuTaI",
          "tr": "todγai burüa bueγudai"
        },
        {
          "td": "Hoto Cigi\\ 'oTdohU.",
          "tr": "xoto čigi oddoγu."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "'uwR bije zob;-da/,",
          "tr": "uür biǰe zobda,"
        },
        {
          "td": "'uwTW SqrI zob;-da/.",
          "tr": "uüdü šöri zobda."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "DorayidU 'q-K=A 'wgeI,",
          "tr": "dorayidu ököa ügei,"
        },
        {
          "td": "'ali-dU 'amaR 'wgeI.",
          "tr": "alidu amar ügei."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "K[wK[d K[wA suwA Darvada/,",
          "tr": "kuükud kuüa suüa darγada,"
        },
        {
          "td": "zaluW K[wA joB[A Darvada/.",
          "tr": "zaluü kuüa ǰobua darγada."
        }
      ],
      "ru": ""
    },
    {
      "lines": [
        {
          "td": "'wswnI 'utU,",
          "tr": "üsüni utu,"
        },
        {
          "td": "'uha-nI 'ahaR.",
          "tr": "uγani aγar."
        }
      ],
      "ru": ""
    }
  ],
  "songs": [
    {
      "title": "Песня I",
      "stanzas": [
        {
          "lines": [
            {
              "td": "`, zuW gede/ VazaR",
              "tr": ", zuü gede γazar"
            },
            {
              "td": "zurva-A saraI VazaR OA,",
              "tr": "zurγaa sarai γazar oa,"
            },
            {
              "td": "zuwrki\\ zabsariyiA dayisiyigi\\",
              "tr": "zuürki zabsariyia dayisiyigi"
            },
            {
              "td": "zuY>;QiyiA gege-A 'ayiTdatuvaI.",
              "tr": "zuƞöiyia gegea ayiddatuγai."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "K=K= 'uwriyiA K=bedW",
              "tr": "kökö uüriyia köbedü"
            },
            {
              "td": "K=EG= bije-A 'amra-jA,",
              "tr": "köegö biǰea amraǰa,"
            },
            {
              "td": "K[rw/ de-dW xwte-adW",
              "tr": "kurü dedü xüteadü"
            },
            {
              "td": "K[rCI Hamda-A Sqrgiyije.",
              "tr": "kurči xamdaa šörgiyiǰe."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "xaraaDinaI jozuwrtU",
              "tr": "xaraadinai ǰozuürtu"
            },
            {
              "td": "xaY:aI 'a/tA b;yirxinaI,",
              "tr": "xaƞ·ai ata byirxinai,"
            },
            {
              "td": "xalvada/ de-dW xwte-adW",
              "tr": "xalγada dedü xüteadü"
            },
            {
              "td": "xamdaA K[rCI Sqrgiyije.",
              "tr": "xamdaa kurči šörgiyiǰe."
            }
          ],
          "ru": ""
        }
      ]
    },
    {
      "title": "Песня II",
      "stanzas": [
        {
          "lines": [
            {
              "td": "`, B]za-b;\\ tohom_taI co-hoR NohaI",
              "tr": ", büzab toγomtai coγor noγai"
            },
            {
              "td": "B]ri-tiyiA tuwTayiTayinI Ha-dunaI",
              "tr": "büritiyia tuüdayidayini xadunai"
            },
            {
              "td": "B]juA kixi/teI serme-A zayisaX",
              "tr": "büǰua kixitei sermea zayisaƞ"
            },
            {
              "td": "B]rhaniyina-A 'oroadunI tqrqtwgeI.",
              "tr": "bürγaniyinaa oroaduni törötügei."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "saR tqTteI sa-taL SqriA",
              "tr": "sar tödtei satal šöria"
            },
            {
              "td": "sarB]wTiataA ja-ramdunI jal>;da-d",
              "tr": "sarbüüdiataa ǰaramduni ǰaldad"
            },
            {
              "td": "sayiham_xi/ b;yidaltaI serme-A zayisaX",
              "tr": "sayiγamxi byidaltai sermea zayisaƞ"
            },
            {
              "td": "sayiniyina-A 'oroadunI tqrqtwgeI.",
              "tr": "sayiniyinaa oroaduni törötügei."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "'ibege Cibege SodoadunI",
              "tr": "ibege čibege šodoaduni"
            },
            {
              "td": "'iki\\ ze-rdenI jal>;da-d",
              "tr": "iki zerdeni ǰaldad"
            },
            {
              "td": "'ikim_xi/ b;yidaltaI serme-A zayisaX",
              "tr": "ikimxi byidaltai sermea zayisaƞ"
            },
            {
              "td": "'ikiCwwdiyige-A javatuvaI ge/seA B].",
              "tr": "ikičüüdiyigea ǰaγatuγai gesea bü."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "b;/ b;/ SodoadunI",
              "tr": "b b šodoaduni"
            },
            {
              "td": "b;vA ze-rdenI jal>;da-d",
              "tr": "bγa zerdeni ǰaldad"
            },
            {
              "td": "b;vam_xi/ b;yidaltaI serme-A zayisaX",
              "tr": "bγamxi byidaltai sermea zayisaƞ"
            },
            {
              "td": "b;vaCwwdiyige-A javatuvaI ge/seA B].",
              "tr": "bγačüüdiyigea ǰaγatuγai gesea bü."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "sariyiA saruwL B[Eb;\\ CigiA",
              "tr": "sariyia saruül bueb čigia"
            },
            {
              "td": "'qdqrleI 'adalI B[Ehux OA,",
              "tr": "ödörlei adali bueγux oa,"
            },
            {
              "td": "sayiduwd 'oToA B[Eb;\\ CigiA",
              "tr": "sayiduüd odoa bueb čigia"
            },
            {
              "td": "serme-aleI 'adalI B[Ehux OA.",
              "tr": "sermealei adali bueγux oa."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "caI xiYgiA B[Eb;\\ CigiA",
              "tr": "cai xiƞgia bueb čigia"
            },
            {
              "td": "'ide-neI de-DI B[EnaI OA,",
              "tr": "idenei dedi buenai oa,"
            },
            {
              "td": "ca-saA Nim_geA B[Eb;\\ CigiA",
              "tr": "casaa nimgea bueb čigia"
            },
            {
              "td": "NomiyiA K=EG=A B[EnaI OA.",
              "tr": "nomiyia köegöa buenai oa."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "'o/torvuW 'qadqR B[Eb;\\ CigiA",
              "tr": "otorγuü öadör bueb čigia"
            },
            {
              "td": "'orda/ B[ra-nI tqrG=A OA,",
              "tr": "orda burani törgöa oa,"
            },
            {
              "td": "'orCiTaX keme-A B[Eb;\\ CigiA",
              "tr": "orčidaƞ kemea bueb čigia"
            },
            {
              "td": "'wK[kiyiA ca/nI tqrG=A OA.",
              "tr": "ükukiyia cani törgöa oa."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "'a/CI 'elbe/ B[Eb;\\ CigiA",
              "tr": "ači elbe bueb čigia"
            },
            {
              "td": "'a-vadU 'ew\\ B[Ehux OA,",
              "tr": "aγadu eü bueγux oa,"
            },
            {
              "td": "'ahanaR 'oToA B[Eb;\\ CigiA",
              "tr": "aγanar odoa bueb čigia"
            },
            {
              "td": "'a-b;laI 'adalI B[Ehux OA.",
              "tr": "ablai adali bueγux oa."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "'elmeA 'elbe/ B[Eb;\\ CigiA",
              "tr": "elmea elbe bueb čigia"
            },
            {
              "td": "'eme-EdW B[wrw/ B[Ehux OA,",
              "tr": "emeedü buürü bueγux oa,"
            },
            {
              "td": "'e/CineR 'oToA B[Eb;\\ CigiA",
              "tr": "ečiner odoa bueb čigia"
            },
            {
              "td": "'e-DilaI 'adalI B[Ehux OA.",
              "tr": "edilai adali bueγux oa."
            }
          ],
          "ru": ""
        }
      ]
    },
    {
      "title": "Песня III",
      "stanzas": [
        {
          "lines": [
            {
              "td": "`, zuwA PiY:anaI b;yixiY{I",
              "tr": ", zuüa piƞ·anai byixiƞüi"
            },
            {
              "td": "zuw<]biyina-A VazartunI doY\"ayiva-d,",
              "tr": "zuüübiyinaa γazartuni doƞayiγad,"
            },
            {
              "td": "zuru/ B[Eo/saA dorDI NojoA",
              "tr": "zuru bueosaa dordi noǰoa"
            },
            {
              "td": "zuY>;QiyiA gege-adW tqriI tA.",
              "tr": "zuƞöiyia gegeadü törii ta."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "B]wTim_Da-R 'qsK=/seA PaEmuwdnI",
              "tr": "büüdimdar öskösea paemuüdni"
            },
            {
              "td": "B]EhayiCiyiA taxuwva-R Nidexile-d,",
              "tr": "büeγayičiyia taxuüγar nidexiled,"
            },
            {
              "td": "B]juA kixi/teA dorDI NojoA",
              "tr": "büǰua kixitea dordi noǰoa"
            },
            {
              "td": "B]rhayiyina-A 'oroadunI tqriI tA.",
              "tr": "bürγayiyinaa oroaduni törii ta."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "'e/ce sahaltaI dorDI NojoA",
              "tr": "ece saγaltai dordi noǰoa"
            },
            {
              "td": "'erme-_liyiA sayiduwdlayinI HalcanaI,",
              "tr": "ermeliyia sayiduüdlayini xalcanai,"
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "B[Eod sopotaI brauniX fistuwL",
              "tr": "bueod sopotai brauniƞ fistuül"
            },
            {
              "td": "B]ECiX Vazara-rnI HarvanaI,",
              "tr": "büečiƞ γazararni xarγanai,"
            },
            {
              "td": "B]juA kixi/teA dorDI NojoA",
              "tr": "büǰua kixitea dordi noǰoa"
            },
            {
              "td": "B]rhayiyina-A 'oroadunI tqriI tA.",
              "tr": "bürγayiyinaa oroaduni törii ta."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "'altaA >;lf;-/taI taCa-Y>;nI",
              "tr": "altaa lftai tačaƞni"
            },
            {
              "td": "'arastobiyiA 'uwTiaca-R DirDiY{e-d,",
              "tr": "arastobiyia uüdiacar dirdiƞüed,"
            },
            {
              "td": "'a-b;\\ B[Eo/saA dorDI NojoA",
              "tr": "ab bueosaa dordi noǰoa"
            },
            {
              "td": "'alb;tiyiva-A javatuvaI ge/seA B].",
              "tr": "albtiyiγaa ǰaγatuγai gesea bü."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "xabxaDI 'urvu/saA sadnI",
              "tr": "xabxadi urγusaa sadni"
            },
            {
              "td": "xaY:aI B[EDI K=K]rneI,",
              "tr": "xaƞ·ai buedi kökürnei,"
            },
            {
              "td": "sayiham_xi/ b;yidaltaI dorDI NojoA",
              "tr": "sayiγamxi byidaltai dordi noǰoa"
            },
            {
              "td": "sayiniyina-A 'oroadU tqriI tA.",
              "tr": "sayiniyinaa oroadu törii ta."
            }
          ],
          "ru": ""
        },
        {
          "lines": [
            {
              "td": "dqrB=A PiY:anaI soB[rvonI",
              "tr": "dörböa piƞ·anai soburγoni"
            },
            {
              "td": "dqrB=A duadA dwYgege-d,",
              "tr": "dörböa duada düƞgeged,"
            },
            {
              "td": "dqle-A dwYgegeR PanaI NojoA",
              "tr": "dölea düƞgeger panai noǰoa"
            },
            {
              "td": "dqrB=diyigi\\ javatuvaI ge/seA B].",
              "tr": "dörbödiyigi ǰaγatuγai gesea bü."
            }
          ],
          "ru": ""
        }
      ]
    }
  ],
  "blessing": {
    "lines": [
      {
        "td": "`, 'qadqR 'iki\\ doB[A de-re gere-A b;riDI,",
        "tr": ", öadör iki dobua dere gerea bridi,"
      },
      {
        "td": "'qrG=A 'iki\\ xiyirI de-re zeTe-A tataDI,",
        "tr": "örgöa iki xiyiri dere zedea tatadi,"
      },
      {
        "td": "HoyivuwR joB[/saada-A HoI Hurv-A 'q/CI,",
        "tr": "xoyiγuür ǰobusaadaa xoi xurγa öči,"
      },
      {
        "td": "'qmne-G[wR joB[/saada-A 'unuhU da-vA 'q/CI,",
        "tr": "ömneguür ǰobusaadaa unuγu daγa öči,"
      },
      {
        "td": "'arda-vuwR joB[/saada-A 'ayira/ Cige-ge-A 'q/CI,",
        "tr": "ardaγuür ǰobusaadaa ayira čigegea öči,"
      },
      {
        "td": "'qmne-G[wR joB[/saada-A 'q-K= tosa-A 'q/CI,",
        "tr": "ömneguür ǰobusaadaa ökö tosaa öči,"
      },
      {
        "td": "dotoR Puwtiyigi\\ Noma-raA HaY:a-DI,",
        "tr": "dotor puütiyigi nomaraa xaƞ·adi,"
      },
      {
        "td": "Vaza-dU Puwtiyigi\\ 'q/Tqge-reA HaY:a-DI,",
        "tr": "γazadu puütiyigi ödögerea xaƞ·adi,"
      },
      {
        "td": "B]rhanaI 'qmnq tolvayiva-A tabiDI,",
        "tr": "bürγanai ömnö tolγayiγaa tabidi,"
      },
      {
        "td": "B]junI 'qmnq K[Ee-A DiyiDI,",
        "tr": "büǰuni ömnö kueea diyidi,"
      },
      {
        "td": "'ezeA Nojoada-A HayirtaI B[EDI,",
        "tr": "ezea noǰoadaa xayirtai buedi,"
      },
      {
        "td": "'eme-EteI Sqre-R xaY{uwTDI,",
        "tr": "emeetei šörer xaƞüuüddi,"
      },
      {
        "td": "Ha-A Nojoada-A HayirtaI B[EDI,",
        "tr": "xaa noǰoadaa xayirtai buedi,"
      },
      {
        "td": "VazartaU Sqre-R xaY{uwTDI,",
        "tr": "γazartau šörer xaƞüuüddi,"
      },
      {
        "td": "'ora-R dwwrwX 'o<[taI B[EDI,",
        "tr": "orar düürüƞ outai buedi,"
      },
      {
        "td": "K=aDilge-R dwwrwX K=B[wdteI B[EDI,",
        "tr": "köadilger düürüƞ köbuüdtei buedi,"
      },
      {
        "td": "DirvatuA.",
        "tr": "dirγatua."
      }
    ],
    "ru": ""
  },
  "tale": [
    {
      "td": "`, keze-neI HatuwCI Ha-A gede/ Ha-A b;yiDI, tere Ha-gi\\ Nege 'uha-taI 'qbG=A B[W dahuwTa-d Pekele-R 'odnaI, tere HojoR 'qbG=neI NegeA HarA sahaltaI cava-A 'wsteI, Na-dakinI cava-A sahaL taI HarA 'wsteI b;yiDI, Ha-A tere VorB[A 'qbG=neI Negene-swnI sahalCiA cava-A 'wswaCiA HarA B[EdimA geDI surhuTaI terenI 'uCirtaI geneI, SqriA b;-b:aI 'utuhA VorB[A SuW tqle-adW 'uwrTa-d sahala-A 'imre b;yitaL cayiDI 'odb;\\, daruwki\\ Nege 'qbgiyinI sahalCiA HarA 'wswaCiA cava-A B[EdimA geDI surhuTaI tere 'uCirtaI geneI, sahalaM 'wswne-swM di/ HoriA tab;A NasaA dwW tege-d cava-hU B[Ea-d 'wgeI geneI, VorB[da/CI Nege sahaL 'wgeI 'qbG=ne-sW CI juwA DuTvada/ K[wA B= CI geDI surhuTaI 'uCirtaI geneI, 'a-b;-A dura-DI Varda/ B[Eb;\\ CigiA 'e-DiM 'q-Ee-d b;yi/CI B= ge-d sahaL 'wgeI B[Eb;\\ bi\\ geneI, tege-d HatuwCI Ha-A tere VorB[A 'qbG=neI 'oTopvayidunI Hana-d tedeadW Nege tuTmU 'altA 'q/neI, 'qbG=d 'alta-A 'ab;-d HariDI joB[taL 'arda-sunI Ha-naI twxwmwL tere HanaI 'q/seA tulmU 'altA Haramna-d K[ceDI 'ire-d 'orCilaX jama-ra-A CigeI 'qadqR B= geDI surhuTaI sahaL 'wgeI 'qbG=neI HojoR 'qbG=ne-swA taCI 'wTde-d kelK[de-A Nege duwnaI geDI PedeneI bi\\ geneI, tere juwA ge-d tiyime b;vA B[EnaI geK[EeI teYgere-sW Vara/saA duwA VazartU sonoso/danaI, Vazara-sU Vara/saA duwA teYgertW sonoso/dada/ DI, tege-d tiyime geDI PedeneI bi\\ geneI, NaraA Varha-sU 'ab;A NaraA suwhU K[rtwL jama-ra-A HoTo VazaR B= geDI twxwpwL Nege 'qdqreI VazaR geDI PedeneI bi\\ geneI, tere juwA ge-d tiyime biCikeA B[EnaI geK[EeI NaraA 'wrwwA VarCI job;-d zuwrU HonoL 'wgeI di/ 'ashaA 'ireDI suwnaI, tege-d tiyime geDI PedeneI bi\\ geneI, 'orCiTaYgiyiA selge-A ge/seA jama-ra-A B[Eda/ B= geDI twxwpwL surhuTaI, 'aI SqA 'od-A bideA VorB[A 'wnwwgiyiCiA K[wadwDI joB[EaI bideA, 'asA Sqre-A 'oda-d sura-d 'irneI bi\\ geDi SqriyinI 'abCi>;-d tedwwkeA VarCI 'or>;-d dakiA 'ire-d kelK[de-A, CI twxwpwL keze-dW B[Eb;\\ CigiA ke-re K=EG=A 'wgeI 'uduA 'wgeI 'iyigeDI Ha/saDI 'wTdwB[ bi\\ geDI sahaL CI geneI, twxwpwL 'wgeI geneI, tiyiK[Ee-nI Ne- twxwpwL 'orCilaYgiyiA selge-A ge/seA jupuA 'iyime B[EdimaA geDI kele-d SqriyinI 'qG=L 'wgeI dobtoTa-d joB[DI 'odnaI..",
      "tr": ", kezenei xatuüči xaa gede xaa byidi, tere xagi nege uγatai öbgöa buü daγuüdad pekeler odnai, tere xoǰor öbgönei negea xara saγaltai caγaa üstei, nadakini caγaa saγal tai xara üstei byidi, xaa tere γorbua öbgönei negenesüni saγalčia caγaa üsüačia xara buedima gedi surγudai tereni učirtai genei, šöria bb·ai utuγa γorbua šuü töleadü uürdad saγalaa imre byital cayidi odb, daruüki nege öbgiyini saγalčia xara üsüačia caγaa buedima gedi surγudai tere učirtai genei, saγalam üsünesüm di xoria taba nasaa düü teged caγaγu buead ügei genei, γorbudači nege saγal ügei öbgönesü či ǰuüa dudγada kuüa bö či gedi surγudai učirtai genei, aba duradi γarda bueb čigia edim öeed byiči bö ged saγal ügei bueb bi genei, teged xatuüči xaa tere γorbua öbgönei odopγayiduni xanad tedeadü nege tudmu alta önei, öbgöd altaa abd xaridi ǰobutal ardasuni xanai tüxümül tere xanai ösea tulmu alta xaramnad kucedi ired orčilaƞ ǰamaraa čigei öadör bö gedi surγudai saγal ügei öbgönei xoǰor öbgönesüa tači üdded kelkudea nege duünai gedi pedenei bi genei, tere ǰuüa ged tiyime bγa buenai gekueei teƞgeresü γarasaa duüa γazartu sonosodanai, γazarasu γarasaa duüa teƞgertü sonosodada di, teged tiyime gedi pedenei bi genei, naraa γarγasu aba naraa suüγu kurtül ǰamaraa xodo γazar bö gedi tüxüpül nege ödörei γazar gedi pedenei bi genei, tere ǰuüa ged tiyime bičikea buenai gekueei naraa ürüüa γarči ǰobd zuüru xonol ügei di asγaa iredi suünai, teged tiyime gedi pedenei bi genei, orčidaƞgiyia selgea gesea ǰamaraa bueda bö gedi tüxüpül surγudai, ai šöa oda bidea γorbua ünüügiyičia kuüadüdi ǰobueai bidea, asa šörea odad surad irnei bi gedi šöriyini abčid tedüükea γarči ord dakia ired kelkudea, či tüxüpül kezedü bueb čigia kere köegöa ügei udua ügei iyigedi xasadi üddübu bi gedi saγal či genei, tüxüpül ügei genei, tiyikueeni ne tüxüpül orčilaƞgiyia selgea gesea ǰupua iyime buedimaa gedi keled šöriyini ögöl ügei dobtodad ǰobudi odnai..",
      "ru": ""
    },
    {
      "td": "`, B]rhanI daruW 'ecege 'ekiyiA 'aCI PaxI 'iki\\ SqA, tere 'uCira-R 'wK[A 'wK[teTe-A tedeniyigi\\ K[adwTeA takihU kere/teI, 'qmne-swnI xwrwwA 'wge keleL 'wge sedkeliyinI berteL 'wgeI b;yihU, tedenI sedkiL berte-A 'q-EwwlswA 'wrwadW B]rhaA 'utU NasA B[EoA kixi/ Cigi\\ HayiralxI 'wgeI SqA. , . kemerDe-A CI 'ecege 'eke-A K[adwTwL 'wgeI b;yihuTaI CinI K=B[wd CinI Cama-sU 'wTG[wrle-d K=/xirK[ NasaadU CinI bijiyiCiA 'asaraDI 'qrG=L 'wgeI zoB[E_oX 'wzwwTwA Vuada-hU SqA. twwke-A PartaL 'wgeI sanaA K=/xiA 'eke 'ecege-A K[adwTwA takihU.",
      "tr": ", bürγani daruü ecege ekiyia ači paxi iki šöa, tere učirar ükua ükutedea tedeniyigi kuadüdea takiγu keretei, ömnesüni xürüüa üge kelel üge sedkeliyini bertel ügei byiγu, tedeni sedkil bertea öeüülsüa ürüadü bürγaa utu nasa bueoa kixi čigi xayiralxi ügei šöa. , . kemerdea či ecege ekea kuadüdül ügei byiγudai čini köbuüd čini čamasu üdguürled köxirku nasaadu čini biǰiyičia asaradi örgöl ügei zobueoƞ üzüüdüa γuadaγu šöa. tüükea partal ügei sanaa köxia eke ecegea kuadüdüa takiγu.",
      "ru": ""
    },
    {
      "td": "`, NasaA b;vA ca/tU zwrK[adW zqB[wrI 'wgeI, CidaL Ciyiri/, bije sergeleX B[Eda/ 'uCira-R 'ene zaluW b;vA cagiyigi\\ NasanI Hab;R geDI Nere-dede/, tere xalta-va-R ca/ 'wre-DI zalhuwruL 'wgeI surva-EI 'erdeM suruDI 'uh-A bilige-A delgerwwTK[ kere/teI, b;vada-A 'ese suru/siyigi\\ K=/sireDI 'ire-d surhudU PaxI berke SqA, 'od-A suru/saA HoyinayiA tustaI, 'wTG[wrnI tara-CI Hab;rtU juW tarinaI twwge-A zudU B[EoA NamartU Hura-DI 'qB=EiyiA teDe-L kede/ PetW b;avada-A suru/saA NoM surva-EiyiA NilCiyigi\\ K=/xirDI Nasaada-A 'edelde/ SqA..",
      "tr": ", nasaa bγa catu zürkuadü zöbuüri ügei, čidal čiyiri, biǰe sergeleƞ bueda učirar ene zaluü bγa cagiyigi nasani xabr gedi neredede, tere xaltaγar ca üredi zalγuürul ügei surγaei erdem surudi uγa biligea delgerüüdku keretei, bγadaa ese surusiyigi kösiredi ired surγudu paxi berke šöa, oda surusaa xoyinayia tustai, üdguürni tarači xabrtu ǰuü tarinai tüügea zudu bueoa namartu xuradi öböeiyia tedel kede petü baγadaa surusaa nom surγaeiyia nilčiyigi köxirdi nasaadaa edelde šöa..",
      "ru": ""
    },
    {
      "td": "` @'o sayiA 'apuvuwTaX B[EtuvaI.",
      "tr": "o sayia apuγuüdaƞ buetuγai.",
      "ru": ""
    }
  ]
};
