export const quranNodes = {
  "quran_borrowed_rebuttal": {
    "id": "quran_borrowed_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Could he have borrowed the knowledge?"
      },
      "ar": {
        "question": "هل كان بإمكانه اقتباس هذه المعرفة؟"
      }
    },
    "evidence": {
      "title": {
        "en": "Why borrowing doesn't explain it",
        "ar": "لماذا الاقتباس لا يُفسّر الأمر"
      },
      "points": [
        {
          "id": "qb1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "People made this charge in his own lifetime, and the Quran answered it:",
                "ar": "قيل هذا في حياته، وردّ عليه القرآن:"
              }
            },
            {
              "type": "quote",
              "content": {
                "en": "وَلَقَدْ نَعْلَمُ أَنَّهُمْ يَقُولُونَ إِنَّمَا يُعَلِّمُهُ بَشَرٌ ۗ لِّسَانُ الَّذِي يُلْحِدُونَ إِلَيْهِ أَعْجَمِيٌّ وَهَٰذَا لِسَانٌ عَرَبِيٌّ مُّبِينٌ\n\n“And We surely know that they say, ‘No one is teaching him except a human.’ But the man they refer to speaks a foreign tongue, whereas this ˹Quran˺ is ˹in˺ eloquent Arabic.”",
                "ar": "وَلَقَدْ نَعْلَمُ أَنَّهُمْ يَقُولُونَ إِنَّمَا يُعَلِّمُهُ بَشَرٌ ۗ لِّسَانُ الَّذِي يُلْحِدُونَ إِلَيْهِ أَعْجَمِيٌّ وَهَٰذَا لِسَانٌ عَرَبِيٌّ مُّبِينٌ"
              },
              "source": {
                "en": "Quran 16:103",
                "ar": "سورة النحل 103"
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Quran 16:103",
                "ar": "سورة النحل 103"
              },
              "url": "https://quran.com/16/103",
              "linkType": "source"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        },
        {
          "id": "qb2",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "And he could not read, so he could not have copied from books (29:48).",
                "ar": "ثم إنه لم يكن يقرأ، فلم يكن بوسعه أن ينقل من الكتب (العنكبوت 48)."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Quran 29:48",
                "ar": "سورة العنكبوت 48"
              },
              "url": "https://quran.com/29/48",
              "linkType": "source"
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
          "en": "Show me the Quran's content",
          "ar": "أرني محتوى القرآن"
        },
        "next": "quran_intro"
      }
    ]
  },
  "quran_coincidence_rebuttal": {
    "id": "quran_coincidence_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Coincidence becomes increasingly unlikely."
      },
      "ar": {
        "question": "المصادفة تصبح احتمالًا متناقصًا باستمرار."
      }
    },
    "evidence": {
      "title": {
        "en": "The scale of the claim",
        "ar": "حجم الادعاء"
      },
      "points": [
        {
          "id": "qc1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "One accurate statement could be a lucky guess. The question is whether a man in 7th-century Arabia could keep guessing right about things no one then could check. Look at the verses and decide for yourself.",
                "ar": "قد تكون عبارة صحيحة واحدة تخمينًا موفّقًا. لكن السؤال: هل يمكن لرجل في جزيرة العرب في القرن السابع أن يصيب مرة بعد مرة في أمور لم يكن أحد آنذاك قادرًا على التحقق منها؟ انظر في الآيات واحكم بنفسك."
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
          "en": "Let me examine the Quran",
          "ar": "دعني أفحص القرآن"
        },
        "next": "quran_intro"
      }
    ]
  },
  "quran_intro": {
    "id": "quran_intro",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Is the Quran preserved and authentic?",
        "subtitle": "Is the text we read today the one that was first recited?"
      },
      "ar": {
        "question": "هل القرآن محفوظ وأصيل؟",
        "subtitle": "هل النص الذي نقرؤه اليوم هو نفسه الذي تُلي أول مرة؟"
      }
    },
    "options": [
      {
        "label": {
          "en": "Yes — I've heard it's memorized by millions",
          "ar": "نعم — سمعت أنه محفوظ عن ظهر قلب من قِبل الملايين"
        },
        "next": "quran_scientific"
      },
      {
        "label": {
          "en": "How can any ancient text be verified?",
          "ar": "كيف يمكن التحقق من أي نص قديم؟"
        },
        "next": "quran_preservation_evidence"
      },
      {
        "label": {
          "en": "Other scriptures also claim to be authentic",
          "ar": "الكتب المقدسة الأخرى تدّعي هي الأخرى الأصالة"
        },
        "next": "quran_vs_others"
      }
    ],
    "evidence": {
      "title": {
        "en": "How the Quran was preserved",
        "ar": "كيف حُفظ القرآن"
      },
      "points": [
        {
          "id": "qp1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Many Muslims learn the Quran by heart. Someone who has memorised it is called a hafiz, and thousands of students memorise it every year. So the text is kept in people’s memories as well as on paper, and any printed copy can be checked against them.",
                "ar": "يحفظ كثير من المسلمين القرآن عن ظهر قلب، ويُسمّى من حفظه «حافظًا»، ويحفظه آلاف الطلاب كل عام. فالنص محفوظ في الصدور كما هو محفوظ في السطور، ويمكن مقابلة أي نسخة مطبوعة بما يحفظه الحفّاظ."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Wikipedia: Hafiz (Quran)",
                "ar": "ويكيبيديا: حافظ القرآن"
              },
              "url": "https://en.wikipedia.org/wiki/Hafiz_(Quran)",
              "linkType": "article"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    }
  },
  "quran_preservation_evidence": {
    "id": "quran_preservation_evidence",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Its oldest manuscripts can be checked against today’s text."
      },
      "ar": {
        "question": "يمكن مقارنة أقدم مخطوطاته بالنص الذي نقرؤه اليوم."
      }
    },
    "evidence": {
      "title": {
        "en": "The manuscript evidence",
        "ar": "دليل المخطوطات"
      },
      "points": [
        {
          "id": "qpe1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "In 2015 the University of Birmingham had the parchment of its Quran manuscript radiocarbon-dated to between 568 and 645, close to the Prophet’s ﷺ lifetime. According to the university, these portions are “very close to the form of the Qur’an read today.”",
                "ar": "في عام 2015 أرّخت جامعة برمنغهام رقوق مخطوطتها القرآنية بالكربون المشع إلى ما بين عامي 568 و645 للميلاد، أي قريبًا من زمن النبي ﷺ. وبحسب الجامعة، فإن هذه الأجزاء «قريبة جدًا من صورة القرآن الذي يُقرأ اليوم»."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "University of Birmingham (2015): one of the oldest Quran manuscripts",
                "ar": "جامعة برمنغهام (2015): من أقدم مخطوطات القرآن"
              },
              "url": "https://www.birmingham.ac.uk/news/2015/birmingham-quran-manuscript-dated-among-the-oldest-in-the-world",
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
          "en": "What does the Quran actually say?",
          "ar": "ماذا يقول القرآن في الواقع؟"
        },
        "next": "quran_scientific"
      }
    ]
  },
  "quran_vs_others": {
    "id": "quran_vs_others",
    "type": "dead_end",
    "status": "live",
    "content": {
      "en": {
        "message": "Comparing the preservation of the Quran to other scriptures is a detailed topic we'd love to explore with you directly. Reach out and let's continue this conversation."
      },
      "ar": {
        "message": "مقارنة حفظ القرآن بالكتب المقدسة الأخرى موضوع تفصيلي نودّ استكشافه معك مباشرة. تواصل معنا ولنواصل هذا الحوار."
      }
    },
    "options": [],
    "evidence": null
  },
  "quran_scientific": {
    "id": "quran_scientific",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "The Quran describes the embryo developing in stages. What do you make of that?",
        "subtitle": "“…then We developed the drop into a clinging clot, then developed the clot into a lump ˹of flesh˺, then developed the lump into bones, then clothed the bones with flesh…” — Quran 23:14"
      },
      "ar": {
        "question": "يصف القرآن نموّ الجنين على مراحل. ما رأيك في ذلك؟",
        "subtitle": "«ثُمَّ خَلَقْنَا النُّطْفَةَ عَلَقَةً فَخَلَقْنَا الْعَلَقَةَ مُضْغَةً فَخَلَقْنَا الْمُضْغَةَ عِظَامًا فَكَسَوْنَا الْعِظَامَ لَحْمًا» — سورة المؤمنون 14"
      }
    },
    "options": [
      {
        "label": {
          "en": "That's remarkable — show me more",
          "ar": "هذا رائع — أرني المزيد"
        },
        "next": "quran_scientific_more"
      },
      {
        "label": {
          "en": "Could it be a general description anyone might guess?",
          "ar": "هل يمكن أن يكون وصفًا عامًا قد يخمّنه أي شخص؟"
        },
        "next": "embryo_rebuttal"
      },
      {
        "label": {
          "en": "I'm more interested in the Quran's literary miracle",
          "ar": "أنا أكثر اهتمامًا بالإعجاز الأدبي للقرآن"
        },
        "next": "quran_literary"
      }
    ],
    "evidence": {
      "title": {
        "en": "What the verses say",
        "ar": "ما تقوله الآيات"
      },
      "points": [
        {
          "id": "qs1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "The verses describe a sequence: a drop, then a clinging clot, then a lump of flesh, then bones, then the bones clothed with flesh. They were recited in 7th-century Arabia. Read them in full and judge for yourself whether anyone then could have known this.",
                "ar": "تصف الآيات تسلسلًا: نطفة، ثم علقة، ثم مضغة، ثم عظامًا، ثم كسوة العظام لحمًا. وقد تُليت في جزيرة العرب في القرن السابع الميلادي. اقرأها كاملة واحكم بنفسك: هل كان أحد في ذلك الزمان يعرف هذا؟"
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Quran 23:12–14",
                "ar": "سورة المؤمنون 12–14"
              },
              "url": "https://quran.com/23/12-14",
              "linkType": "source"
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
  "quran_scientific_more": {
    "id": "quran_scientific_more",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Embryology isn’t the only example.",
        "subtitle": "The Quran also speaks of the universe expanding."
      },
      "ar": {
        "question": "علم الأجنة ليس المثال الوحيد.",
        "subtitle": "ويتحدث القرآن أيضًا عن توسّع الكون."
      }
    },
    "options": [
      {
        "label": {
          "en": "This is compelling — what does it all mean?",
          "ar": "هذا مقنع — ماذا يعني كل هذا؟"
        },
        "next": "purpose_of_life"
      },
      {
        "label": {
          "en": "I'm still not convinced",
          "ar": "ما زلت غير مقتنع"
        },
        "next": "quran_vs_others"
      }
    ],
    "evidence": {
      "title": {
        "en": "The expanding universe",
        "ar": "توسّع الكون"
      },
      "points": [
        {
          "id": "qsm1",
          "blocks": [
            {
              "type": "quote",
              "content": {
                "en": "وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ\n\n“We built the universe with ˹great˺ might, and We are certainly expanding ˹it˺.”",
                "ar": "وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ"
              },
              "source": {
                "en": "Quran 51:47",
                "ar": "سورة الذاريات 47"
              }
            },
            {
              "type": "text",
              "content": {
                "en": "Today astronomers measure how fast the universe is expanding. They call the rate the Hubble constant.",
                "ar": "واليوم يقيس علماء الفلك سرعة توسّع الكون، ويسمّون هذا المعدّل «ثابت هابل»."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Quran 51:47",
                "ar": "سورة الذاريات 47"
              },
              "url": "https://quran.com/51/47",
              "linkType": "source"
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
        }
      ]
    },
    "steps": [],
    "showContact": false,
    "notes": ""
  },
  "embryo_rebuttal": {
    "id": "embryo_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "It's not a general description."
      },
      "ar": {
        "question": "هذا ليس وصفًا عامًا."
      }
    },
    "evidence": {
      "title": {
        "en": "Why it's specific",
        "ar": "لماذا هو وصف دقيق"
      },
      "points": [
        {
          "id": "er1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "The verses don’t just say that a baby grows. They name five stages in order: a drop, “a clinging clot,” “a lump ˹of flesh˺,” bones, and then bones “clothed … with flesh.”",
                "ar": "الآيات لا تقول فحسب إن الجنين ينمو، بل تسمّي خمس مراحل بالترتيب: نطفة، ثم علقة، ثم مضغة، ثم عظامًا، ثم كسوة العظام لحمًا."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Quran 23:12–14",
                "ar": "سورة المؤمنون 12–14"
              },
              "url": "https://quran.com/23/12-14",
              "linkType": "source"
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
          "en": "What does Islam say about why we exist?",
          "ar": "ماذا يقول الإسلام عن سبب وجودنا؟"
        },
        "next": "purpose_of_life"
      }
    ]
  },
  "quran_literary": {
    "id": "quran_literary",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "The Quran challenges anyone who doubts it to produce one chapter like it.",
        "subtitle": "The challenge is still open."
      },
      "ar": {
        "question": "يتحدّى القرآن كل من يشكّ فيه أن يأتي بسورة مثله.",
        "subtitle": "ولا يزال التحدي قائمًا."
      }
    },
    "options": [
      {
        "label": {
          "en": "That's a significant claim",
          "ar": "هذا ادعاء مهم"
        },
        "next": "purpose_of_life"
      },
      {
        "label": {
          "en": "Literary quality is subjective",
          "ar": "الجودة الأدبية أمر نسبي"
        },
        "next": "literary_rebuttal"
      }
    ],
    "evidence": {
      "title": {
        "en": "Why this is significant",
        "ar": "لماذا هذا مهم"
      },
      "points": [
        {
          "id": "ql1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Poetry was part of public life in pre-Islamic Arabia. In Britannica’s words, the poet was “a major verbal weapon.” The Quran was revealed in that setting, in their own language, and it challenged them directly:",
                "ar": "كان الشعر جزءًا من الحياة العامة في جزيرة العرب قبل الإسلام، وكان الشاعر، كما تقول موسوعة بريتانيكا، «سلاحًا لفظيًا رئيسيًا». وفي هذه البيئة نزل القرآن بلسانهم، وتحدّاهم مباشرة:"
              }
            },
            {
              "type": "quote",
              "content": {
                "en": "وَإِن كُنتُمْ فِي رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُوا بِسُورَةٍ مِّن مِّثْلِهِ وَادْعُوا شُهَدَاءَكُم مِّن دُونِ اللَّهِ إِن كُنتُمْ صَادِقِينَ\n\n“And if you are in doubt about what We have revealed to Our servant, then produce a sûrah like it and call your helpers other than Allah, if what you say is true.”",
                "ar": "وَإِن كُنتُمْ فِي رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُوا بِسُورَةٍ مِّن مِّثْلِهِ وَادْعُوا شُهَدَاءَكُم مِّن دُونِ اللَّهِ إِن كُنتُمْ صَادِقِينَ"
              },
              "source": {
                "en": "Quran 2:23",
                "ar": "سورة البقرة 23"
              }
            },
            {
              "type": "text",
              "content": {
                "en": "If anyone had met it, the challenge would have ended there.",
                "ar": "ولو استطاع أحد أن يأتي بها لانتهى التحدي عندها."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Britannica: Arabic literature, Poetry",
                "ar": "بريتانيكا: الأدب العربي، الشعر"
              },
              "url": "https://www.britannica.com/art/Arabic-literature/Poetry",
              "linkType": "article"
            },
            {
              "type": "link",
              "label": {
                "en": "Quran 2:23",
                "ar": "سورة البقرة 23"
              },
              "url": "https://quran.com/2/23",
              "linkType": "source"
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        }
      ]
    }
  },
  "literary_rebuttal": {
    "id": "literary_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "The challenge is more specific than style."
      },
      "ar": {
        "question": "التحدي أعمق من مجرد الأسلوب."
      }
    },
    "evidence": {
      "title": {
        "en": "More than beauty",
        "ar": "أبعد من مجرد الجمال"
      },
      "points": [
        {
          "id": "lr1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "The challenge is to produce one chapter like the Quran’s. Its shortest chapter, Al-Kawthar, has just three verses. If this were only a matter of style, one short chapter should be easy to match.",
                "ar": "التحدي أن يُؤتى بسورة مثل سور القرآن، وأقصر سوره، سورة الكوثر، ثلاث آيات فقط. لو كان الأمر مجرد أسلوب، لكانت مجاراة سورة قصيرة كهذه أمرًا يسيرًا."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "Quran 108 (Al-Kawthar)",
                "ar": "سورة الكوثر"
              },
              "url": "https://quran.com/108",
              "linkType": "source"
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
          "en": "Let's talk about the purpose of life",
          "ar": "لنتحدث عن الغرض من الحياة"
        },
        "next": "purpose_of_life"
      }
    ]
  }
};
