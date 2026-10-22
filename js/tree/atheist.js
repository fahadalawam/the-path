export const atheistNodes = {
  "atheist_universe": {
    "id": "atheist_universe",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Does the universe exist?",
        "subtitle": "Let's start from the very beginning — the most basic fact."
      },
      "ar": {
        "question": "هل يوجد الكون؟",
        "subtitle": "لنبدأ من البداية المطلقة — الحقيقة الأكثر أساسية."
      }
    },
    "options": [
      {
        "label": {
          "en": "Yes, obviously",
          "ar": "نعم، بالطبع"
        },
        "next": "atheist_beginning"
      },
      {
        "label": {
          "en": "Reality itself might not exist",
          "ar": "لست متأكدًا من أن الواقع حقيقي"
        },
        "next": "atheist_reality_doubt"
      }
    ],
    "evidence": null,
    "steps": [],
    "showContact": false,
    "notes": ""
  },
  "atheist_reality_doubt": {
    "id": "atheist_reality_doubt",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Even your doubt is proof that something is real."
      },
      "ar": {
        "question": "حتى شكّك دليلٌ على أن ثمة شيئًا حقيقيًا."
      }
    },
    "evidence": {
      "title": {
        "en": "The one thing you cannot doubt",
        "ar": "الشيء الوحيد الذي لا يمكنك الشك فيه"
      },
      "points": [
        {
          "id": "rd1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "René Descartes tried to doubt everything he could: his senses, the physical world, even simple sums like two plus three. One thing survived the doubt. While he was thinking, he had to exist. It is usually summed up as “I think, therefore I am.”",
                "ar": "حاول رينيه ديكارت أن يشكّ في كل ما استطاع: حواسه، والعالم المادي، وحتى أبسط العمليات الحسابية كجمع اثنين وثلاثة. وبقي شيء واحد صامدًا أمام الشك: ما دام يفكّر فلا بد أنه موجود. وتُلخَّص الفكرة عادةً في عبارة «أنا أفكر، إذن أنا موجود»."
              }
            },
            {
              "type": "text",
              "content": {
                "en": "This doesn't mean we have perfect knowledge of reality. It means that something exists — including you, your experience, and the act of questioning. That's enough to build on.",
                "ar": "هذا لا يعني أن لدينا معرفة كاملة بالواقع. بل يعني أن شيئًا ما موجود — بما فيه أنت، وتجربتك، وفعل التساؤل ذاته. وهذا يكفي كأساس نبني عليه."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Stanford Encyclopedia of Philosophy: Descartes’ Epistemology",
                "ar": "موسوعة ستانفورد للفلسفة: نظرية المعرفة عند ديكارت"
              },
              "url": "https://plato.stanford.edu/entries/descartes-epistemology/",
              "linkType": "article"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "Maybe we're living in a simulation",
          "ar": "ربما نحن نعيش داخل محاكاة حاسوبية"
        },
        "next": "atheist_reality_simulation"
      },
      {
        "label": {
          "en": "I just can't be certain about anything",
          "ar": "لا أستطيع الجزم بأي شيء"
        },
        "next": "atheist_reality_skeptic"
      },
      {
        "label": {
          "en": "Fair point — let's continue",
          "ar": "نقطة وجيهة — لنكمل"
        },
        "next": "atheist_beginning"
      }
    ]
  },
  "atheist_reality_simulation": {
    "id": "atheist_reality_simulation",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "If we're in a simulation, that confirms a Creator — it doesn't remove one."
      },
      "ar": {
        "question": "إن كنا داخل محاكاة، فهذا يُثبت وجود خالق — لا يلغيه."
      }
    },
    "evidence": {
      "title": {
        "en": "Simulation theory and the question of origins",
        "ar": "نظرية المحاكاة وسؤال الأصول"
      },
      "points": [
        {
          "id": "rs1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "In 2003 the philosopher Nick Bostrom argued that at least one of three things is true, and one of them is that “we are almost certainly living in a computer simulation.” But notice what that would mean: the simulation had to be designed by someone. That designer is real, exists outside our reality, and brought our reality into being. The simulation idea doesn’t remove a Creator. It describes one.",
                "ar": "في عام 2003 جادل الفيلسوف نيك بوستروم بأن واحدًا على الأقل من ثلاثة احتمالات صحيح، أحدها أنه «من شبه المؤكد أننا نعيش داخل محاكاة حاسوبية». لكن لاحظ ما يعنيه ذلك: المحاكاة لا بد أن يكون قد صممها أحد. ذلك المصمم حقيقي، وموجود خارج واقعنا، وهو الذي أوجد واقعنا. ففكرة المحاكاة لا تلغي الخالق، بل تصفه."
              }
            },
            {
              "type": "text",
              "content": {
                "en": "The simulation hypothesis also pushes the question back rather than answering it. Who created the civilisation that runs the simulation? What are the physical laws of their reality? You still need a first cause — an uncaused originator — at some level. Moving the origin of our universe one level up doesn't escape the need for an ultimate beginning.",
                "ar": "كما أن فرضية المحاكاة تؤجل السؤال بدلاً من الإجابة عليه. من أوجد الحضارة التي تُشغّل المحاكاة؟ ما قوانين الفيزياء في واقعهم؟ لا تزال بحاجة إلى سبب أول — مُوجِد غير مُوجَد — في مستوى ما. إن نقل أصل كوننا مستوى واحداً للأعلى لا يُعفينا من الحاجة إلى بداية مطلقة."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Nick Bostrom, Philosophical Quarterly (2003)",
                "ar": "نيك بوستروم، مجلة Philosophical Quarterly ‏(2003)"
              },
              "url": "https://simulation-argument.com/simulation.html",
              "linkType": "study"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "That makes sense — let's keep going",
          "ar": "هذا منطقي — لنكمل"
        },
        "next": "atheist_beginning"
      }
    ]
  },
  "atheist_reality_skeptic": {
    "id": "atheist_reality_skeptic",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Total skepticism is a position no one actually lives by."
      },
      "ar": {
        "question": "الشك المطلق موقفٌ لا يعيش به أحد فعلًا."
      }
    },
    "evidence": {
      "title": {
        "en": "The gap between theory and practice",
        "ar": "الفجوة بين النظرية والتطبيق"
      },
      "points": [
        {
          "id": "rsk1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "The ancient skeptics faced a famous objection, known as the apraxia charge: without beliefs, how can anyone act? If you truly can’t know whether fire burns, why not touch it?",
                "ar": "واجه الشكّاك القدامى اعتراضًا مشهورًا يُعرف بـ«تهمة انعدام الفعل»: كيف يتصرف الإنسان من غير أن يعتقد شيئًا؟ فإن كنت لا تستطيع حقًا أن تعرف هل تحرق النار، فلماذا لا تلمسها؟"
              }
            },
            {
              "type": "text",
              "content": {
                "en": "The philosopher David Hume admitted that his own doubts did not survive ordinary life:",
                "ar": "واعترف الفيلسوف ديفيد هيوم بأن شكوكه هو نفسه لم تصمد أمام الحياة اليومية:"
              }
            },
            {
              "type": "quote",
              "content": {
                "en": "I dine, I play a game of back-gammon, I converse, and am merry with my friends; and when after three or four hour's amusement, I wou'd return to these speculations, they appear so cold, and strain'd, and ridiculous, that I cannot find in my heart to enter into them any farther.",
                "ar": "أتناول العشاء، وألعب الطاولة، وأتحدث وأمرح مع أصدقائي؛ وحين أعود إلى هذه التأملات بعد ثلاث ساعات أو أربع من التسلية، تبدو لي باردة ومتكلَّفة ومضحكة، حتى إنني لا أجد في نفسي رغبة في الخوض فيها أكثر."
              },
              "source": {
                "en": "David Hume, A Treatise of Human Nature (1739), 1.4.7",
                "ar": "ديفيد هيوم، رسالة في الطبيعة البشرية (1739)، 1.4.7"
              }
            },
            {
              "type": "text",
              "content": {
                "en": "You avoid cars, trust floors to hold you, expect the sun to rise. These aren't leaps of faith — they're rational inferences from consistent experience. The consistency of reality is itself evidence worth examining. A reality that behaves according to stable, mathematical laws points to something deeper than randomness.",
                "ar": "أنت تتجنب السيارات، وتثق بأن الأرضية ستحملك، وتتوقع شروق الشمس. هذه ليست قفزات إيمانية — بل استنتاجات عقلانية من تجربة متسقة. إن اتساق الواقع ذاته دليل يستحق التأمل. فواقع يسير وفق قوانين ثابتة رياضية يُشير إلى شيء أعمق من العشوائية."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Stanford Encyclopedia of Philosophy: Ancient Skepticism",
                "ar": "موسوعة ستانفورد للفلسفة: الشكّ في الفلسفة القديمة"
              },
              "url": "https://plato.stanford.edu/entries/skepticism-ancient/",
              "linkType": "article"
            },
            {
              "type": "link",
              "label": {
                "en": "David Hume, A Treatise of Human Nature, 1.4.7",
                "ar": "ديفيد هيوم، رسالة في الطبيعة البشرية، 1.4.7"
              },
              "url": "https://davidhume.org/texts/t/1/4/7",
              "linkType": "book"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "That's fair — let's continue",
          "ar": "هذا معقول — لنكمل"
        },
        "next": "atheist_beginning"
      }
    ]
  },
  "atheist_beginning": {
    "id": "atheist_beginning",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Did the universe have a beginning?",
        "subtitle": "Or has it always existed, with no starting point?"
      },
      "ar": {
        "question": "هل كان للكون بداية؟",
        "subtitle": "أم أنه موجود منذ الأزل دون نقطة انطلاق؟"
      }
    },
    "options": [
      {
        "label": {
          "en": "Yes, it had a beginning",
          "ar": "نعم، كانت له بداية"
        },
        "next": "atheist_cause"
      },
      {
        "label": {
          "en": "No, it always existed",
          "ar": "لا، لقد كان موجودًا دائمًا"
        },
        "next": "atheist_eternal_rebuttal"
      },
      {
        "label": {
          "en": "Science hasn't determined that yet",
          "ar": "لم يحسم العلم ذلك بعد"
        },
        "next": "atheist_science_beginning"
      }
    ],
    "evidence": {
      "title": {
        "en": "What does the evidence say?",
        "ar": "ماذا تقول الأدلة؟"
      },
      "points": [
        {
          "id": "e1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "ESA’s Planck mission measured the age of the universe at about 13.8 billion years.",
                "ar": "قاست بعثة بلانك التابعة لوكالة الفضاء الأوروبية عمر الكون بنحو 13.8 مليار سنة."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "ESA: Planck reveals an almost perfect Universe (2013)",
                "ar": "وكالة الفضاء الأوروبية: بلانك يكشف كونًا شبه مثالي (2013)"
              },
              "url": "https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_reveals_an_almost_perfect_Universe",
              "linkType": "article"
            },
            {
              "type": "link",
              "label": {
                "en": "NASA: Universe overview",
                "ar": "ناسا: نظرة عامة على الكون"
              },
              "url": "https://science.nasa.gov/universe/overview/",
              "linkType": "article"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        },
        {
          "id": "e3",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "In 2003 the physicists Arvind Borde, Alan Guth and Alexander Vilenkin showed that a universe which is inflating, or “just expanding sufficiently fast,” “must be incomplete in null and timelike past directions.” In plain words: its history cannot run back forever.",
                "ar": "في عام 2003 بيّن الفيزيائيون أرفيند بورد وآلان غوث وألكسندر فيلنكين أن الكون الذي يتضخم، أو الذي «يتمدد بسرعة كافية فحسب»، لا بد أن يكون «غير مكتمل في الاتجاهات الماضية». وبعبارة بسيطة: لا يمكن أن يمتد تاريخه إلى الوراء بلا نهاية."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Borde, Guth and Vilenkin, “Inflationary spacetimes are not past-complete”",
                "ar": "بورد وغوث وفيلنكين: «الأزمنة-المكانية التضخمية ليست مكتملة في الماضي»"
              },
              "url": "https://arxiv.org/abs/gr-qc/0110012",
              "linkType": "study"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "steps": [],
    "showContact": false,
    "notes": ""
  },
  "atheist_eternal_rebuttal": {
    "id": "atheist_eternal_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "The universe always existed — let's examine that."
      },
      "ar": {
        "question": "الكون موجود منذ الأزل — لنفحص هذا الادعاء."
      }
    },
    "evidence": {
      "title": {
        "en": "Why this doesn't hold",
        "ar": "لماذا لا يصمد هذا الرأي"
      },
      "points": [
        {
          "id": "r1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "An eternal universe would have no age. Yet ESA’s Planck mission measured the universe’s age at about 13.8 billion years.",
                "ar": "الكون الأزلي لا عمر له. لكن بعثة بلانك التابعة لوكالة الفضاء الأوروبية قاست عمر الكون بنحو 13.8 مليار سنة."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "ESA: Planck reveals an almost perfect Universe (2013)",
                "ar": "وكالة الفضاء الأوروبية: بلانك يكشف كونًا شبه مثالي (2013)"
              },
              "url": "https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_reveals_an_almost_perfect_Universe",
              "linkType": "article"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        },
        {
          "id": "r2",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "What about models in which the universe has been inflating forever? Borde, Guth and Vilenkin showed that a universe which is inflating, or just expanding fast enough, cannot run back into the past forever.",
                "ar": "وماذا عن النماذج التي يتضخم فيها الكون منذ الأزل؟ بيّن بورد وغوث وفيلنكين أن الكون الذي يتضخم، أو يتمدد بسرعة كافية فحسب، لا يمكن أن يمتد إلى الماضي بلا نهاية."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Borde, Guth and Vilenkin, “Inflationary spacetimes are not past-complete”",
                "ar": "بورد وغوث وفيلنكين: «الأزمنة-المكانية التضخمية ليست مكتملة في الماضي»"
              },
              "url": "https://arxiv.org/abs/gr-qc/0110012",
              "linkType": "study"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "OK, let's say it had a beginning — then what?",
          "ar": "حسنًا، لنفترض أن له بداية — ماذا يعني ذلك؟"
        },
        "next": "atheist_cause"
      }
    ]
  },
  "atheist_science_beginning": {
    "id": "atheist_science_beginning",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Science actually has a strong answer here."
      },
      "ar": {
        "question": "العلم في الواقع لديه إجابة راسخة هنا."
      }
    },
    "evidence": {
      "title": {
        "en": "What the evidence shows",
        "ar": "ما تكشفه الأدلة"
      },
      "points": [
        {
          "id": "s1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "ESA’s Planck mission measured the universe’s age at about 13.8 billion years, and Borde, Guth and Vilenkin showed that a universe expanding fast enough cannot run back into the past forever.",
                "ar": "قاست بعثة بلانك التابعة لوكالة الفضاء الأوروبية عمر الكون بنحو 13.8 مليار سنة، وبيّن بورد وغوث وفيلنكين أن الكون الذي يتمدد بسرعة كافية لا يمكن أن يمتد إلى الماضي بلا نهاية."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "ESA: Planck reveals an almost perfect Universe (2013)",
                "ar": "وكالة الفضاء الأوروبية: بلانك يكشف كونًا شبه مثالي (2013)"
              },
              "url": "https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_reveals_an_almost_perfect_Universe",
              "linkType": "article"
            },
            {
              "type": "link",
              "label": {
                "en": "Borde, Guth and Vilenkin, “Inflationary spacetimes are not past-complete”",
                "ar": "بورد وغوث وفيلنكين: «الأزمنة-المكانية التضخمية ليست مكتملة في الماضي»"
              },
              "url": "https://arxiv.org/abs/gr-qc/0110012",
              "linkType": "study"
            },
            {
              "type": "link",
              "label": {
                "en": "Stanford Encyclopedia of Philosophy: Cosmology and Theology",
                "ar": "موسوعة ستانفورد للفلسفة: علم الكونيات واللاهوت"
              },
              "url": "https://plato.stanford.edu/entries/cosmology-theology/",
              "linkType": "article"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "Alright — so it had a beginning. What follows?",
          "ar": "حسنًا — إذن كانت له بداية. ما الذي يترتب على ذلك؟"
        },
        "next": "atheist_cause"
      }
    ]
  },
  "atheist_cause": {
    "id": "atheist_cause",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Does everything that begins to exist have a cause?",
        "subtitle": "Has anything ever come into existence from absolutely nothing, with no cause whatsoever?"
      },
      "ar": {
        "question": "هل لكل شيء يبدأ في الوجود سبب؟",
        "subtitle": "هل جاء شيء قط إلى الوجود من العدم المطلق، دون أي سبب على الإطلاق؟"
      }
    },
    "options": [
      {
        "label": {
          "en": "Yes, everything that begins has a cause",
          "ar": "نعم، لكل ما يبدأ سبب"
        },
        "next": "atheist_creator_exists"
      },
      {
        "label": {
          "en": "No — quantum physics shows things can appear from nothing",
          "ar": "لا — تُثبت فيزياء الكم أن الأشياء يمكن أن تظهر من العدم"
        },
        "next": "atheist_quantum_rebuttal"
      },
      {
        "label": {
          "en": "Maybe the universe caused itself",
          "ar": "ربما أوجد الكون نفسه"
        },
        "next": "atheist_self_cause_rebuttal"
      }
    ],
    "evidence": null,
    "steps": [],
    "showContact": false,
    "notes": ""
  },
  "atheist_quantum_rebuttal": {
    "id": "atheist_quantum_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Quantum events still have causes."
      },
      "ar": {
        "question": "الأحداث الكمية لا تزال لها أسباب."
      }
    },
    "evidence": {
      "title": {
        "en": "What quantum physics actually says",
        "ar": "ما تقوله فيزياء الكم فعلًا"
      },
      "points": [
        {
          "id": "q1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Virtual particles don’t come from “nothing.” They come from a quantum vacuum, a state of physical fields that follows physical laws. Nothing means no space, no time, no energy and no laws.",
                "ar": "الجسيمات الافتراضية لا تأتي من «العدم»، بل من الفراغ الكمي، وهو حالة من الحقول الفيزيائية تخضع لقوانين فيزيائية. أما العدم فيعني: لا مكان، ولا زمان، ولا طاقة، ولا قوانين."
              }
            },
            {
              "type": "text",
              "content": {
                "en": "When the physicist Lawrence Krauss wrote A Universe from Nothing, the philosopher of physics David Albert, of Columbia University, made this point in his review in The New York Times:",
                "ar": "حين ألّف الفيزيائي لورانس كراوس كتابه «كون من لا شيء»، كتب الفيلسوف ديفيد ألبرت، أستاذ الفلسفة في جامعة كولومبيا، في مراجعته للكتاب في صحيفة نيويورك تايمز:"
              }
            },
            {
              "type": "quote",
              "content": {
                "en": "Relativistic-quantum-field-theoretical vacuum states — no less than giraffes or refrigerators or solar systems — are particular arrangements of elementary physical stuff.",
                "ar": "حالات الفراغ في نظرية الحقول الكمومية النسبية، شأنها شأن الزرافات والثلاجات والمجموعات الشمسية، ترتيبات معيّنة لمادة فيزيائية أولية."
              },
              "source": {
                "en": "David Albert, The New York Times, 2012",
                "ar": "ديفيد ألبرت، نيويورك تايمز، 2012"
              }
            },
            {
              "type": "link",
              "label": {
                "en": "David Albert’s review of the book, The New York Times (2012)",
                "ar": "مراجعة ديفيد ألبرت للكتاب، نيويورك تايمز (2012)"
              },
              "url": "https://www.nytimes.com/2012/03/25/books/review/a-universe-from-nothing-by-lawrence-m-krauss.html",
              "linkType": "article"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "That makes sense — so everything has a cause",
          "ar": "هذا منطقي — إذن لكل شيء سبب"
        },
        "next": "atheist_creator_exists"
      }
    ]
  },
  "atheist_self_cause_rebuttal": {
    "id": "atheist_self_cause_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Can something cause itself?"
      },
      "ar": {
        "question": "هل يمكن لشيء أن يكون سببًا لوجوده؟"
      }
    },
    "evidence": {
      "title": {
        "en": "The logical problem",
        "ar": "الإشكالية المنطقية"
      },
      "points": [
        {
          "id": "sc1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "For the universe to cause itself, it would have to exist before it existed — a logical contradiction. A thing cannot act before it is.",
                "ar": "حتى يكون الكون سببًا لوجوده، كان يجب أن يكون موجودًا قبل أن يوجد — وهذا تناقض منطقي صريح. لا يمكن لشيء أن يؤثّر قبل أن يكون."
              }
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "Fair point — let's continue",
          "ar": "نقطة وجيهة — لنكمل"
        },
        "next": "atheist_creator_exists"
      }
    ]
  },
  "atheist_creator_exists": {
    "id": "atheist_creator_exists",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "So — the universe began, and everything that begins has a cause. What caused the universe?",
        "subtitle": "The cause must exist outside space, time, matter and energy — since it created all of those."
      },
      "ar": {
        "question": "إذن — الكون كانت له بداية، وكل ما يبدأ له سبب. فما الذي أوجد الكون؟",
        "subtitle": "يجب أن يكون السبب خارج نطاق الزمان والمكان والمادة والطاقة — إذ هو الذي خلق كل هذه الأشياء."
      }
    },
    "options": [
      {
        "label": {
          "en": "There must be a cause — a Creator",
          "ar": "لا بد من سبب — خالق"
        },
        "next": "atheist_one_or_many"
      },
      {
        "label": {
          "en": "Maybe it was an infinite chain of causes",
          "ar": "ربما كانت سلسلة لا نهائية من الأسباب"
        },
        "next": "atheist_infinite_regress"
      },
      {
        "label": {
          "en": "We just don't know",
          "ar": "نحن ببساطة لا نعرف"
        },
        "next": "atheist_we_dont_know"
      },
      {
        "label": {
          "en": "Maybe it's all a simulation"
        },
        "next": "atheist_simulation"
      }
    ],
    "evidence": {
      "title": {
        "en": "What must this cause be like?",
        "ar": "كيف يجب أن يكون هذا السبب؟"
      },
      "points": [
        {
          "id": "c1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "The cause must be: outside of time (eternal), outside of space (non-physical), enormously powerful, and must have a will — since it chose to create at a specific moment.",
                "ar": "يجب أن يكون السبب: خارج الزمان (أزليًا)، خارج المكان (غير مادي)، بالغ القدرة، وذا إرادة — إذ اختار الخلق في لحظة بعينها."
              }
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "steps": [],
    "showContact": false,
    "notes": ""
  },
  "atheist_simulation": {
    "id": "atheist_simulation",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "A simulation still needs a simulator."
      },
      "ar": {
        "question": "المحاكاة لا تزال تحتاج إلى من يُحاكي."
      }
    },
    "options": [
      {
        "label": {
          "en": "That makes sense — let's continue",
          "ar": "هذا منطقي — لنكمل"
        },
        "next": "atheist_one_or_many"
      }
    ],
    "evidence": {
      "title": {
        "en": "The simulation doesn't escape the question",
        "ar": "المحاكاة لا تهرب من السؤال"
      },
      "points": [
        {
          "id": "sim1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Even if our universe is a simulation, something had to run it. That simulator exists outside our space, time, and matter — and chose to create our universe at a specific moment. That's exactly the description of what we call a Creator.",
                "ar": "حتى لو كان كوننا محاكاةً، فلا بد من شيء يُشغّلها. ذلك المحاكي موجود خارج زماننا ومكاننا ومادتنا — واختار إيجاد كوننا في لحظة بعينها. هذا بالضبط ما نُسميه الخالق."
              }
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        },
        {
          "id": "sim2",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "You can keep asking 'who simulated the simulator?' — but at some point, there must be a first, uncaused cause. Something that exists by its own nature, with no need for a prior cause. That's the very definition of God.",
                "ar": "يمكنك الاستمرار في السؤال 'من حاكى المحاكي؟' — لكن في نقطة ما، لا بد من سبب أول غير مُسبَّب. شيء يوجد بطبيعته ذاتها، دون الحاجة إلى سبب سابق. وهذا بالذات تعريف الله."
              }
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "steps": [],
    "showContact": false,
    "notes": ""
  },
  "atheist_infinite_regress": {
    "id": "atheist_infinite_regress",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "An infinite chain of causes doesn't work."
      },
      "ar": {
        "question": "سلسلة الأسباب اللانهائية لا تنجح."
      }
    },
    "evidence": {
      "title": {
        "en": "Why infinite regress fails",
        "ar": "لماذا يفشل التسلسل اللانهائي"
      },
      "points": [
        {
          "id": "ir1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "An infinite regress never explains anything — it postpones the question forever. Think of it like a train: if there's no engine, no number of carriages can move.",
                "ar": "التسلسل اللانهائي لا يُفسّر شيئًا أبدًا — بل يؤجل السؤال إلى ما لا نهاية. فكّر في الأمر كقطار: إن لم يكن ثمة محرك، فلن تتحرك أي عربة مهما بلغ عددها."
              }
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "What caused the universe?",
          "ar": "ما الذي أوجد الكون؟"
        },
        "next": "atheist_creator_exists"
      }
    ]
  },
  "atheist_we_dont_know": {
    "id": "atheist_we_dont_know",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "'We don't know' is honest — but let's follow the evidence."
      },
      "ar": {
        "question": "'لا نعرف' موقف صادق — لكن دعنا نتتبع الأدلة."
      }
    },
    "evidence": {
      "title": {
        "en": "From 'we don't know' to 'we can reason'",
        "ar": "من 'لا نعرف' إلى 'يمكننا الاستنتاج'"
      },
      "points": [
        {
          "id": "wdk1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "“We don’t know” is different from “there is no answer.” The evidence points toward a cause that is timeless, spaceless and enormously powerful, which is what believers mean by God.",
                "ar": "«لا نعرف» تختلف عن «لا توجد إجابة». تشير الأدلة إلى سبب خارج الزمان والمكان، بالغ القدرة، وهذا ما يعنيه المؤمنون بالله."
              }
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "Let's follow the evidence and see where it leads",
          "ar": "لنتتبع الأدلة ونرى إلى أين تقودنا"
        },
        "next": "atheist_one_or_many"
      }
    ]
  },
  "atheist_one_or_many": {
    "id": "atheist_one_or_many",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Could there be multiple creators rather than one?",
        "subtitle": "The universe operates under one consistent set of physical laws — everywhere, at all times."
      },
      "ar": {
        "question": "هل يمكن أن يكون ثمة خالقون متعددون لا خالق واحد؟",
        "subtitle": "يعمل الكون وفق مجموعة واحدة متسقة من القوانين الفيزيائية — في كل مكان، وفي كل وقت."
      }
    },
    "options": [
      {
        "label": {
          "en": "No — one Creator makes more sense",
          "ar": "لا — خالق واحد أكثر منطقية"
        },
        "next": "creator_communicates"
      },
      {
        "label": {
          "en": "Multiple creators is possible",
          "ar": "من الممكن وجود خالقين متعددين"
        },
        "next": "multiple_creators_rebuttal"
      }
    ],
    "evidence": {
      "title": {
        "en": "The argument for one Creator",
        "ar": "الحجة على وجود خالق واحد"
      },
      "points": [
        {
          "id": "om1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Multiple competing creators would logically produce inconsistency and conflict. The unity of natural law — gravity works the same everywhere, light travels at the same speed — points to a single unified source.",
                "ar": "الخالقون المتعددون المتنافسون سيُفضون منطقيًا إلى تناقض وتعارض. إن وحدة القانون الطبيعي — الجاذبية تعمل بنفس الطريقة في كل مكان، والضوء يسير بنفس السرعة — تشير إلى مصدر واحد موحّد."
              }
            },
            {
              "type": "quote",
              "content": {
                "en": "لَوْ كَانَ فِيهِمَا آلِهَةٌ إِلَّا اللَّهُ لَفَسَدَتَا\n\n“Had there been other gods besides Allah in the heavens or the earth, both ˹realms˺ would have surely been corrupted…”",
                "ar": "لَوْ كَانَ فِيهِمَا آلِهَةٌ إِلَّا اللَّهُ لَفَسَدَتَا"
              },
              "source": {
                "en": "Quran 21:22",
                "ar": "سورة الأنبياء 22"
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Quran 21:22",
                "ar": "سورة الأنبياء 22"
              },
              "url": "https://quran.com/21/22",
              "linkType": "source"
            }
          ],
          "readMore": {
            "en": "This is the Argument from Unity. If two gods disagreed on the laws of physics, the universe would be chaotic. Its remarkable consistency points to one will behind it.",
            "ar": "هذه هي حجة الوحدانية. لو اختلف إلهان على قوانين الفيزياء، لكان الكون في فوضى عارمة. إن الاتساق المذهل للكون يشير إلى إرادة واحدة وراءه."
          }
        }
      ]
    }
  }
};
