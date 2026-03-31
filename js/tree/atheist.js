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
                "en": "René Descartes tried to doubt everything — his senses, the physical world, even mathematics. But he hit a wall: to doubt, you must be thinking. To be thinking, you must exist. \"I think, therefore I am\" (Cogito ergo sum) is the one statement that survives total skepticism. The experience of uncertainty is itself undeniably real.",
                "ar": "حاول رينيه ديكارت أن يشكك في كل شيء — حواسه، والعالم المادي، وحتى الرياضيات. لكنه اصطدم بجدار: للشك، لا بد أن تفكر. وللتفكير، لا بد أن توجد. «أنا أفكر، إذن أنا موجود» (Cogito ergo sum) هي العبارة الوحيدة التي تصمد أمام الشك المطلق. إن تجربة الشك ذاتها حقيقية لا يمكن إنكارها."
              }
            },
            {
              "type": "text",
              "content": {
                "en": "This doesn't mean we have perfect knowledge of reality. It means that something exists — including you, your experience, and the act of questioning. That's enough to build on.",
                "ar": "هذا لا يعني أن لدينا معرفة كاملة بالواقع. بل يعني أن شيئًا ما موجود — بما فيه أنت، وتجربتك، وفعل التساؤل ذاته. وهذا يكفي كأساس نبني عليه."
              }
            }
          ],
          "readMore": {
            "en": "The philosophical position that nothing can be known is called Pyrrhonian skepticism. Its ancient critics pointed out a fatal flaw: the claim \"nothing can be known\" is itself a knowledge claim. If it's true, we know it — which contradicts it. Complete skepticism collapses under its own weight.",
            "ar": "الموقف الفلسفي القائل بأنه لا يمكن معرفة أي شيء يُعرف بالشكية البيرونية. وقد أشار منتقدوها القدامى إلى خلل قاتل: الادعاء «لا يمكن معرفة أي شيء» هو نفسه ادعاء معرفي. إن صح، فنحن نعرفه — وهذا يناقضه. الشك المطلق ينهار تحت ثقله."
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
                "en": "Philosopher Nick Bostrom's simulation argument (2003) suggests that if advanced civilisations can run simulations of minds, we are probably in one. But notice what this implies: the simulation had to be designed by someone. That designer is real, exists outside our reality, and brought our reality into being. The simulation hypothesis doesn't eliminate God — it describes God.",
                "ar": "يقترح حجة المحاكاة للفيلسوف نيك بوستروم (2003) أنه إذا كانت الحضارات المتقدمة قادرة على تشغيل محاكاة للعقول، فنحن على الأرجح نعيش داخل إحداها. لكن لاحظ ما تعنيه هذه الفكرة: المحاكاة لا بد أن يكون قد صممها أحد ما. ذلك المصمم حقيقي، موجود خارج واقعنا، وأوجد واقعنا. لا تلغي فرضية المحاكاة الله — بل تصفه."
              }
            },
            {
              "type": "text",
              "content": {
                "en": "The simulation hypothesis also pushes the question back rather than answering it. Who created the civilisation that runs the simulation? What are the physical laws of their reality? You still need a first cause — an uncaused originator — at some level. Moving the origin of our universe one level up doesn't escape the need for an ultimate beginning.",
                "ar": "كما أن فرضية المحاكاة تؤجل السؤال بدلاً من الإجابة عليه. من أوجد الحضارة التي تُشغّل المحاكاة؟ ما قوانين الفيزياء في واقعهم؟ لا تزال بحاجة إلى سبب أول — مُوجِد غير مُوجَد — في مستوى ما. إن نقل أصل كوننا مستوى واحداً للأعلى لا يُعفينا من الحاجة إلى بداية مطلقة."
              }
            }
          ],
          "readMore": {
            "en": "Interestingly, many Muslim thinkers note that the Quran already describes existence as something created, sustained, and perceived through faculties given to us by a Creator — not as independently self-existing. In that sense, Islam has always held that the reality we experience is contingent on a higher reality. Whether that's called \"the base reality\" or \"the simulation's host universe\" doesn't change the fundamental question: what caused it?",
            "ar": "ومن المثير للاهتمام أن كثيرًا من المفكرين المسلمين يلاحظون أن القرآن الكريم يصف الوجود بوصفه شيئًا مخلوقًا، مستمرًا بإرادة خالقه، وندركه من خلال ملكات منحها لنا الخالق — لا بوصفه وجودًا قائمًا بذاته. بهذا المعنى، قرر الإسلام دائمًا أن الواقع الذي ندركه مرهون بواقع أعلى. سواء أُطلق عليه «الواقع الأساسي» أم «الكون المضيف للمحاكاة»، لا يتغير السؤال الجوهري: ما الذي أوجده؟"
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
                "en": "The ancient Pyrrhonian skeptics were criticized for leading to apraxia — the inability to act. If you genuinely can't know whether fire burns, you can't decide not to touch it. The philosopher David Hume, one of history's greatest skeptics, acknowledged this himself: after an afternoon of radical philosophy, he would go play backgammon and forget his doubts. Nature, he said, forces us back to common life.",
                "ar": "واجه الشكاك البيرونيون القدامى انتقادًا يتعلق بـ«انعدام الفعل» — أي العجز عن التصرف. فإن كنت حقًا لا تستطيع معرفة ما إذا كانت النار تحرق، لا يمكنك أن تقرر عدم لمسها. والفيلسوف ديفيد هيوم، أحد أعظم الشكاك في التاريخ، اعترف بذلك بنفسه: بعد بعد ساعات من الفلسفة الراديكالية، كان يذهب للعب النرد وينسى شكوكه. الطبيعة، كما قال، تُعيدنا قسرًا إلى الحياة الاعتيادية."
              }
            },
            {
              "type": "text",
              "content": {
                "en": "You avoid cars, trust floors to hold you, expect the sun to rise. These aren't leaps of faith — they're rational inferences from consistent experience. The consistency of reality is itself evidence worth examining. A reality that behaves according to stable, mathematical laws points to something deeper than randomness.",
                "ar": "أنت تتجنب السيارات، وتثق بأن الأرضية ستحملك، وتتوقع شروق الشمس. هذه ليست قفزات إيمانية — بل استنتاجات عقلانية من تجربة متسقة. إن اتساق الواقع ذاته دليل يستحق التأمل. فواقع يسير وفق قوانين ثابتة رياضية يُشير إلى شيء أعمق من العشوائية."
              }
            }
          ],
          "readMore": {
            "en": "Certainty is not the standard required for rational belief. We don't need absolute proof that the sun will rise tomorrow — overwhelming consistent evidence is sufficient. The same standard applies to the question of whether a Creator exists. We're not looking for mathematical proof; we're weighing evidence. And the evidence — the existence of the universe, its fine-tuning, its rational order — is substantial.",
            "ar": "اليقين ليس المعيار المطلوب للاعتقاد العقلاني. لا نحتاج دليلاً مطلقًا على أن الشمس ستشرق غدًا — فالأدلة المتسقة الساحقة كافية. وينطبق المعيار ذاته على سؤال وجود الخالق. لسنا نبحث عن إثبات رياضي؛ بل نزن الأدلة. والأدلة — وجود الكون، وضبطه الدقيق، ونظامه العقلاني — جوهرية وذات ثقل."
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
                "en": "The Big Bang model, supported by overwhelming scientific consensus, tells us the universe began approximately 13.8 billion years ago from an infinitely dense point.",
                "ar": "يخبرنا نموذج الانفجار العظيم، الذي يحظى بتأييد الإجماع العلمي الساحق، بأن الكون بدأ منذ نحو 13.8 مليار سنة من نقطة ذات كثافة لانهائية."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "NASA: Big Bang Overview",
                "ar": "ناسا: نظرة عامة على الانفجار العظيم"
              },
              "url": "https://science.nasa.gov/universe/overview/",
              "linkType": "article"
            },

          ],
          "readMore": {
            "en": "Edwin Hubble's 1929 discovery that galaxies are moving away from us, combined with the detection of Cosmic Microwave Background radiation in 1965, confirmed that the universe is expanding — and therefore had a definite beginning.",
            "ar": "أكّد اكتشاف إدوين هابل عام 1929 أن المجرات تبتعد عنا، إلى جانب رصد إشعاع الخلفية الكونية الميكروي عام 1965، أن الكون في حالة توسع مستمر — وبالتالي كان له بداية محددة."
          }
        },
        {
          "id": "e2",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "The Second Law of Thermodynamics states that the universe is running down. If eternal, it would have already reached heat death. It hasn't — so it can't be eternal.",
                "ar": "تنص القانون الثاني للديناميكا الحرارية على أن الكون يتجه نحو التحلل التدريجي. لو كان أزليًا لكان قد بلغ الموت الحراري بالفعل. لكنه لم يبلغه — وهذا يعني أنه لا يمكن أن يكون أزليًا."
              }
            }
          ],
          "readMore": {
            "en": "This is known as the thermodynamic argument against an eternal universe. Even atheist cosmologists like Stephen Hawking acknowledged that the universe had a beginning.",
            "ar": "يُعرف هذا بالحجة الديناميكية الحرارية ضد الكون الأزلي. حتى علماء الكونيات الملحدون أمثال ستيفن هوكينج اعترفوا بأن للكون بداية."
          }
        },
        {
          "id": "e3",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "The Borde-Guth-Vilenkin theorem (2003) proves that any universe which has been expanding on average — including proposed 'eternal inflation' models — must have had a beginning. This applies even to multiverse scenarios.",
                "ar": "تُثبت مبرهنة بورد-غوث-فيلنكين (2003) أن أي كون كان يتمدد في المتوسط — بما في ذلك نماذج 'التضخم الأزلي' المقترحة — لا بد أن يكون قد كانت له بداية. وينطبق ذلك حتى على سيناريوهات الأكوان المتعددة."
              }
            }
          ],
          "readMore": {
            "en": "Alexander Vilenkin, one of the theorem's authors, stated: 'It is said that an argument is what convinces reasonable men, and a proof is what it takes to convince even an unreasonable man. With the proof now in place, cosmologists can no longer hide behind the possibility of a past-eternal universe.'",
            "ar": "قال ألكسندر فيلنكين، أحد مؤلفي المبرهنة: 'يقال إن الحجة هي ما يقنع العقلاء، أما البرهان فهو ما يلزم حتى غير المعقول. ومع توافر البرهان الآن، لم يعد بإمكان علماء الكونيات الاحتماء وراء احتمالية كون أزلي الماضي.'"
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
                "en": "The Big Bang model shows the universe — including space and time itself — had a definite beginning. An eternal universe contradicts both observational evidence and the laws of thermodynamics.",
                "ar": "يُثبت نموذج الانفجار العظيم أن الكون — بما فيه الزمان والمكان — كانت له بداية محددة. الكون الأزلي يتناقض مع الأدلة الرصدية وقوانين الديناميكا الحرارية على حدٍّ سواء."
              }
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
                "en": "Even models that attempt to avoid a beginning — like the oscillating universe or eternal inflation — still require a beginning point according to the Borde-Guth-Vilenkin theorem (2003).",
                "ar": "حتى النماذج التي تحاول تفادي فكرة البداية — كالكون التذبذبي والتضخم الأزلي — لا تزال تستلزم نقطة بداية وفقًا لمبرهنة بورد-غوث-فيلنكين (2003)."
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
                "en": "The scientific consensus from cosmology, physics and astronomy points clearly to the universe having a beginning. The Big Bang model is the most tested and confirmed theory in modern science.",
                "ar": "يشير الإجماع العلمي في علم الكونيات والفيزياء وعلم الفلك بوضوح إلى أن الكون كانت له بداية. ويُعدّ نموذج الانفجار العظيم أكثر نظرية مختبرة ومؤكدة في العلم الحديث."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Stanford: Cosmology and Theology",
                "ar": "ستانفورد: علم الكونيات واللاهوت"
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
                "en": "Virtual particles don't appear from 'nothing' — they appear from a quantum vacuum, a sea of energy governed by physical laws. Nothing means: no space, no time, no energy, no laws.",
                "ar": "الجسيمات الافتراضية لا تظهر من 'العدم' — بل تظهر من الفراغ الكمي، وهو بحر من الطاقة تحكمه قوانين فيزيائية. العدم الحقيقي يعني: لا مكان، ولا زمان، ولا طاقة، ولا قوانين."
              }
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        },
        {
          "id": "q2",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Even physicist Lawrence Krauss, who wrote 'A Universe from Nothing', was challenged by scientists who pointed out his 'nothing' still contained quantum fields — which is something.",
                "ar": "حتى الفيزيائي لورانس كراوس، مؤلف كتاب 'كون من لا شيء'، واجه انتقادات من علماء أشاروا إلى أن 'لا شيء' عنده لا يزال يحتوي على حقول كمية — وهذا شيء بالفعل."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "David Albert's critique — NY Times",
                "ar": "نقد ديفيد ألبرت — نيويورك تايمز"
              },
              "url": "https://www.nytimes.com/2012/03/25/books/review/a-universe-from-nothing-by-lawrence-krauss.html",
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
            "en": "This is what philosophers call a 'Necessary Being' — something that exists by necessity. All major philosophical traditions converge on this description.",
            "ar": "هذا ما يسميه الفلاسفة 'الواجب الوجود' — الكائن الذي يوجد بالضرورة. وتتقاطع جميع التقاليد الفلسفية الكبرى في هذا الوصف."
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
            "en": "The simulation hypothesis, popularized by philosopher Nick Bostrom, doesn't solve the problem of first cause — it pushes it one level up. Whatever runs the simulation must itself exist, have power to create, and have made a choice. Those attributes map directly onto what every major religion has called God.",
            "ar": "فرضية المحاكاة، التي روّج لها الفيلسوف نيك بوسترام، لا تحل مشكلة السبب الأول — بل ترفعها درجةً واحدة. فما يُشغّل المحاكاة يجب أن يوجد هو نفسه، وأن تكون لديه القدرة على الخلق، وأن يكون قد اتخذ قراراً. هذه الصفات تُقابل مباشرةً ما وصفته الأديان الكبرى بالله."
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
        },
        {
          "id": "ir2",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "We now know time itself began with the universe. So an infinite past chain of causes is physically impossible — there was no 'before' the universe.",
                "ar": "نعلم الآن أن الزمان نفسه بدأ مع الكون. لذا فإن سلسلة الأسباب الماضية اللانهائية مستحيلة فيزيائيًا — لم يكن ثمة 'قبل' الكون."
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
                "en": "'We don't know' is different from 'there is no answer.' The evidence points strongly toward a cause that is timeless, spaceless, and enormously powerful — matching what every major tradition calls God.",
                "ar": "'لا نعرف' يختلف عن 'لا توجد إجابة.' تشير الأدلة بقوة نحو سبب خارج الزمان، خارج المكان، وبالغ القدرة — وهو ما تسميه كل التقاليد الكبرى بالله."
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
