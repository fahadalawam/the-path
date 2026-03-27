export const purposeNodes = {
  "purpose_of_life": {
    "id": "purpose_of_life",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "What is the purpose of life, according to Islam?",
        "subtitle": "Islam's answer is simple, logical, and consistent with everything we've discussed."
      },
      "ar": {
        "question": "ما هو الغرض من الحياة وفق الإسلام؟",
        "subtitle": "إجابة الإسلام بسيطة ومنطقية ومتسقة مع كل ما ناقشناه."
      }
    },
    "options": [
      {
        "label": {
          "en": "Tell me Islam's answer",
          "ar": "أخبرني بإجابة الإسلام"
        },
        "next": "islam_purpose_answer"
      },
      {
        "label": {
          "en": "I think life has no purpose",
          "ar": "أعتقد أن الحياة لا هدف لها"
        },
        "next": "no_purpose_rebuttal"
      },
      {
        "label": {
          "en": "I think we create our own purpose",
          "ar": "أعتقد أننا نصنع هدفنا بأنفسنا"
        },
        "next": "self_purpose_rebuttal"
      }
    ],
    "evidence": null
  },
  "no_purpose_rebuttal": {
    "id": "no_purpose_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "If there's truly no purpose — some things follow."
      },
      "ar": {
        "question": "إن كان لا هدف للحياة حقًا — فثمة نتائج تترتب على ذلك."
      }
    },
    "evidence": {
      "title": {
        "en": "The implications of no purpose",
        "ar": "ما يترتب على انعدام الهدف"
      },
      "points": [
        {
          "id": "np1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "If life has no purpose, then justice, human rights, and morality have no real foundation — they're just preferences. But almost every human acts as though some things truly matter. That universal moral intuition points to something real.",
                "ar": "إن لم يكن للحياة هدف، فإن العدالة وحقوق الإنسان والأخلاق لا أساس حقيقي لها — بل هي مجرد تفضيلات. لكن تقريبًا كل إنسان يتصرف كأن بعض الأشياء تهم فعلًا. هذه الحدسية الأخلاقية الكونية تشير إلى شيء حقيقي."
              }
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        },
        {
          "id": "np2",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "If a Creator made us — as the evidence suggests — then our existence is intentional, not accidental. And something intentionally created has a purpose given by its creator.",
                "ar": "إن كان خالق قد خلقنا — كما تشير الأدلة — فإن وجودنا مقصود لا عشوائي. وما يُخلق بقصد يمتلك هدفًا أعطاه إياه خالقه."
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
          "en": "What does Islam say the purpose is?",
          "ar": "ماذا يقول الإسلام عن الهدف؟"
        },
        "next": "islam_purpose_answer"
      }
    ]
  },
  "self_purpose_rebuttal": {
    "id": "self_purpose_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Creating our own purpose has a problem."
      },
      "ar": {
        "question": "صنع هدفنا الخاص يواجه إشكالية."
      }
    },
    "evidence": {
      "title": {
        "en": "The problem with self-made purpose",
        "ar": "إشكالية الهدف الذاتي"
      },
      "points": [
        {
          "id": "sp1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "If each person creates their own purpose, there's no common ground for morality. One person's purpose could be to harm others. Without an external standard from a Creator, all purposes are equally valid or invalid.",
                "ar": "إن صنع كل شخص هدفه الخاص، فلا أرضية مشتركة للأخلاق. قد يكون هدف شخص ما إيذاء الآخرين. دون معيار خارجي من الخالق، تصبح جميع الأهداف متساوية في الصحة أو الخطأ."
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
          "en": "What does Islam say?",
          "ar": "ماذا يقول الإسلام؟"
        },
        "next": "islam_purpose_answer"
      }
    ]
  },
  "islam_purpose_answer": {
    "id": "islam_purpose_answer",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Islam says: We were created to know and worship God — and in doing so, live justly, with purpose, compassion, and accountability.",
        "subtitle": "\"I did not create jinn and humans except to worship Me.\" — Quran 51:56\n\nWorship in Islam isn't just ritual — it means living consciously in alignment with your Creator's guidance."
      },
      "ar": {
        "question": "يقول الإسلام: خُلقنا لنعرف الله ونعبده — وبذلك نعيش بعدل وهدف ورحمة ومسؤولية.",
        "subtitle": "«وَمَا خَلَقْتُ الجِنَّ وَالإِنسَ إِلاَّ لِيَعْبُدُونِ» — القرآن 51:56\n\nالعبادة في الإسلام ليست مجرد طقوس — بل هي عيش واعٍ في انسجام مع هداية خالقك."
      }
    },
    "options": [
      {
        "label": {
          "en": "This makes sense to me",
          "ar": "هذا منطقي بالنسبة لي"
        },
        "next": "conclusion_positive"
      },
      {
        "label": {
          "en": "I need more time to think",
          "ar": "أحتاج إلى مزيد من الوقت للتفكير"
        },
        "next": "conclusion_thinking"
      },
      {
        "label": {
          "en": "I still have questions",
          "ar": "لا تزال لديّ تساؤلات"
        },
        "next": "conclusion_questions"
      }
    ],
    "evidence": null
  }
};
