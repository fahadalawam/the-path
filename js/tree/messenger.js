export const messengerNodes = {
  "how_to_know_messenger": {
    "id": "how_to_know_messenger",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "That's exactly the right question."
      },
      "ar": {
        "question": "هذا بالضبط هو السؤال الصحيح."
      }
    },
    "evidence": {
      "title": {
        "en": "How to identify a messenger",
        "ar": "كيف نتعرف على الرسول"
      },
      "points": [
        {
          "id": "hkm1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "If a Creator sent guidance, it would come through a human messenger — someone who could speak our language, live among us, and demonstrate the message through their life. The question becomes: which messenger is most credible?",
                "ar": "لو أرسل الخالق هداية، لجاءت عبر رسول بشري — شخص يتكلم لغتنا، ويعيش بيننا، ويُجسّد الرسالة في حياته. والسؤال الذي يطرح نفسه هو: أي رسول أكثر مصداقية؟"
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
          "en": "Let's examine the messengers",
          "ar": "لنفحص الرسل"
        },
        "next": "which_messenger"
      }
    ]
  },
  "which_messenger": {
    "id": "which_messenger",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Many people throughout history claimed to be messengers from God. How do we evaluate them?",
        "subtitle": "What would make a messenger credible?"
      },
      "ar": {
        "question": "ادّعى كثيرون عبر التاريخ أنهم رسل من الله. كيف نقيّمهم؟",
        "subtitle": "ما الذي يجعل رسولًا ذا مصداقية؟"
      }
    },
    "options": [
      {
        "label": {
          "en": "Their character and honesty",
          "ar": "شخصيتهم وصدقهم"
        },
        "next": "prophet_character"
      },
      {
        "label": {
          "en": "Miracles and signs they performed",
          "ar": "المعجزات والآيات التي أتوا بها"
        },
        "next": "prophet_miracles"
      },
      {
        "label": {
          "en": "The consistency and content of their message",
          "ar": "اتساق رسالتهم ومضمونها"
        },
        "next": "prophet_message"
      },
      {
        "label": {
          "en": "All of the above — let's look at Muhammad ﷺ",
          "ar": "كل ما سبق — لنتأمل في محمد ﷺ"
        },
        "next": "muhammad_intro"
      }
    ],
    "evidence": null
  },
  "prophet_character": {
    "id": "prophet_character",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Muhammad ﷺ was known by his people as 'Al-Amin' — The Trustworthy — before any claim to prophethood.",
        "subtitle": "His enemies never accused him of lying in 40 years before his prophethood."
      },
      "ar": {
        "question": "كان محمد ﷺ معروفًا عند قومه بـ'الأمين' قبل أي ادعاء بالنبوة.",
        "subtitle": "لم يتهمه أعداؤه بالكذب في أربعين عامًا قبل نبوته."
      }
    },
    "options": [
      {
        "label": {
          "en": "Yes, character matters a lot",
          "ar": "نعم، الشخصية مهمة جدًا"
        },
        "next": "muhammad_intro"
      },
      {
        "label": {
          "en": "Character alone isn't enough proof",
          "ar": "الشخصية وحدها ليست دليلًا كافيًا"
        },
        "next": "prophet_miracles"
      }
    ],
    "evidence": {
      "title": {
        "en": "His character before prophethood",
        "ar": "شخصيته قبل النبوة"
      },
      "points": [
        {
          "id": "pc1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Muhammad ﷺ lived among his people for 40 years before claiming prophethood. Even his fiercest opponents never called him a liar about worldly matters — they rejected his message, not his character.",
                "ar": "عاش محمد ﷺ بين قومه أربعين عامًا قبل أن يدّعي النبوة. حتى أشد أعدائه لم يسمّوه كاذبًا في شؤون الدنيا — رفضوا رسالته، لا شخصيته."
              }
            }
          ],
          "readMore": {
            "en": "Abu Jahl, one of his greatest enemies, once said privately: 'I know you are not lying — but if I follow you, what will the nobles of Quraysh say?'",
            "ar": "قال أبو جهل، أحد أشد أعدائه، في نجوى خاصة: 'أعلم أنك لا تكذب — لكن لو اتبعتك، ماذا سيقول أشراف قريش؟'"
          }
        }
      ]
    }
  },
  "prophet_miracles": {
    "id": "prophet_miracles",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "The Quran — revealed to an illiterate man — contains knowledge not available in the 7th century.",
        "subtitle": "Unlike other miracles, the Quran can be examined by anyone today."
      },
      "ar": {
        "question": "القرآن — الذي نزل على رجل أمّي — يحوي معرفة لم تكن متاحة في القرن السابع الميلادي.",
        "subtitle": "خلافًا لسائر المعجزات، يمكن لأي شخص اليوم أن يفحص القرآن بنفسه."
      }
    },
    "options": [
      {
        "label": {
          "en": "Tell me more about the Quran",
          "ar": "أخبرني المزيد عن القرآن"
        },
        "next": "quran_intro"
      },
      {
        "label": {
          "en": "How do we know he was illiterate?",
          "ar": "كيف نعرف أنه كان أميًا؟"
        },
        "next": "prophet_illiterate"
      },
      {
        "label": {
          "en": "Let me first understand who Muhammad ﷺ was",
          "ar": "دعني أولًا أفهم من هو محمد ﷺ"
        },
        "next": "muhammad_intro"
      }
    ],
    "evidence": null
  },
  "prophet_illiterate": {
    "id": "prophet_illiterate",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "His illiteracy is historically documented."
      },
      "ar": {
        "question": "أميّته موثّقة تاريخيًا."
      }
    },
    "evidence": {
      "title": {
        "en": "What history records",
        "ar": "ما يسجّله التاريخ"
      },
      "points": [
        {
          "id": "pi1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Muhammad ﷺ never attended school, never learned to read or write. This is confirmed by both Muslim and non-Muslim historical sources. The Quran refers to him as 'the unlettered prophet' (Al-Ummiy).",
                "ar": "لم يلتحق محمد ﷺ بأي مدرسة، ولم يتعلم القراءة أو الكتابة قط. وهذا ما تؤكده المصادر التاريخية الإسلامية وغير الإسلامية على حدٍّ سواء. ويشير إليه القرآن بـ'النبي الأمّي'."
              }
            },
            {
              "type": "link",
              "label": {
                "en": "The Unlettered Prophet",
                "ar": "النبي الأمّي"
              },
              "url": "https://www.islamreligion.com/articles/395/",
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
          "en": "Interesting — let's look at the Quran",
          "ar": "مثير للاهتمام — لننظر في القرآن"
        },
        "next": "quran_intro"
      }
    ]
  },
  "prophet_message": {
    "id": "prophet_message",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Muhammad ﷺ taught one central message: There is only one God, and humans are accountable for their actions.",
        "subtitle": "He didn't ask people to take it on faith alone — he invited rational examination."
      },
      "ar": {
        "question": "علّم محمد ﷺ رسالة محورية واحدة: لا إله إلا الله، والإنسان مسؤول عن أعماله.",
        "subtitle": "لم يطلب من الناس الإيمان بلا دليل — بل دعاهم إلى التأمل العقلاني."
      }
    },
    "options": [
      {
        "label": {
          "en": "Yes, it seems rational and coherent",
          "ar": "نعم، يبدو عقلانيًا ومتسقًا"
        },
        "next": "muhammad_intro"
      },
      {
        "label": {
          "en": "I want to examine the Quran specifically",
          "ar": "أريد أن أفحص القرآن تحديدًا"
        },
        "next": "quran_intro"
      },
      {
        "label": {
          "en": "What about other religions' messengers?",
          "ar": "ماذا عن رسل الأديان الأخرى؟"
        },
        "next": "compare_messengers"
      }
    ],
    "evidence": null
  },
  "muhammad_intro": {
    "id": "muhammad_intro",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Muhammad ﷺ lived in 7th-century Arabia — a time of no scientific advancement. Yet the Quran contains statements that align with modern science.",
        "subtitle": "We're not asking you to accept it — just to examine it honestly."
      },
      "ar": {
        "question": "عاش محمد ﷺ في جزيرة العرب في القرن السابع الميلادي — حقبة لم يكن فيها أي تقدم علمي. ومع ذلك، يحوي القرآن تصريحات تتوافق مع العلم الحديث.",
        "subtitle": "لا نطلب منك أن تقبل ذلك — بل ندعوك فقط إلى فحصه بأمانة."
      }
    },
    "options": [
      {
        "label": {
          "en": "Show me examples",
          "ar": "أرني أمثلة على ذلك"
        },
        "next": "quran_intro"
      },
      {
        "label": {
          "en": "He could have guessed or borrowed the knowledge",
          "ar": "ربما خمّن أو اقتبس هذه المعرفة"
        },
        "next": "quran_borrowed_rebuttal"
      },
      {
        "label": {
          "en": "Coincidences happen",
          "ar": "المصادفات تحدث"
        },
        "next": "quran_coincidence_rebuttal"
      }
    ],
    "evidence": null
  }
};
