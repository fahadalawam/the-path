export const monotheistNodes = {
  "multiple_creators_rebuttal": {
    "id": "multiple_creators_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Multiple creators produce a logical problem."
      },
      "ar": {
        "question": "تعدد الخالقين يُفضي إلى إشكالية منطقية."
      }
    },
    "evidence": {
      "title": {
        "en": "The problem with multiple gods",
        "ar": "إشكالية تعدد الآلهة"
      },
      "points": [
        {
          "id": "mc1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "If multiple creators existed with equal power, any decision one made could be overruled by another. Nothing would be stable. Yet the universe has precise, unvarying laws — strong evidence of a single will.",
                "ar": "لو وُجد خالقون متعددون بقدرة متساوية، لأمكن لكل واحد منهم إلغاء قرار الآخر. لما استقر شيء. غير أن الكون له قوانين دقيقة ثابتة — وهذا دليل قوي على إرادة واحدة."
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
          "en": "One Creator — what next?",
          "ar": "خالق واحد — ماذا بعد؟"
        },
        "next": "creator_communicates"
      }
    ]
  },
  "monotheist_start": {
    "id": "monotheist_start",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "You believe in one God — that's a significant starting point. What has stopped you from considering Islam?",
        "subtitle": "There's no wrong answer here."
      },
      "ar": {
        "question": "أنت تؤمن بإله واحد — وهذه نقطة انطلاق مهمة. ما الذي حال دون تأملك في الإسلام؟",
        "subtitle": "لا توجد إجابة خاطئة هنا."
      }
    },
    "options": [
      {
        "label": {
          "en": "I follow a different scripture / tradition",
          "ar": "أتبع كتابًا مقدسًا أو تقليدًا مختلفًا"
        },
        "next": "monotheist_scripture"
      },
      {
        "label": {
          "en": "I have questions about Muhammad ﷺ",
          "ar": "لديّ تساؤلات حول محمد ﷺ"
        },
        "next": "muhammad_intro"
      },
      {
        "label": {
          "en": "I have questions about the Quran",
          "ar": "لديّ تساؤلات حول القرآن"
        },
        "next": "quran_intro"
      },
      {
        "label": {
          "en": "Islam seems too strict or rigid",
          "ar": "يبدو الإسلام متشددًا أو جامدًا للغاية"
        },
        "next": "islam_misconception"
      }
    ],
    "evidence": null
  },
  "monotheist_scripture": {
    "id": "monotheist_scripture",
    "type": "dead_end",
    "status": "live",
    "content": {
      "en": {
        "message": "Exploring how Islam relates to other scriptures is a conversation we'd love to have with you personally. Every tradition has unique points of contact with Islam — let's talk."
      },
      "ar": {
        "message": "استكشاف علاقة الإسلام بالكتب المقدسة الأخرى حوار نودّ أن نخوضه معك شخصيًا. لكل تقليد ديني نقاط التقاء فريدة مع الإسلام — فلنتحدث."
      }
    },
    "options": [],
    "evidence": null
  },
  "creator_communicates": {
    "id": "creator_communicates",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Would a Creator communicate with the beings it created?",
        "subtitle": "If an all-knowing Creator made humans with intellect and moral awareness, would it leave them without guidance?"
      },
      "ar": {
        "question": "هل يتواصل الخالق مع المخلوقات التي خلقها؟",
        "subtitle": "إن كان خالق عليم قد أودع في الإنسان العقل والوعي الأخلاقي، فهل يتركه دون هداية؟"
      }
    },
    "options": [
      {
        "label": {
          "en": "Yes — guidance makes sense",
          "ar": "نعم — الهداية أمر منطقي"
        },
        "next": "which_messenger"
      },
      {
        "label": {
          "en": "No — a Creator wouldn't interfere",
          "ar": "لا — الخالق لن يتدخل"
        },
        "next": "creator_no_communicate_rebuttal"
      },
      {
        "label": {
          "en": "Maybe, but how would we know?",
          "ar": "ربما، لكن كيف نعرف ذلك؟"
        },
        "next": "how_to_know_messenger"
      }
    ],
    "evidence": null
  },
  "creator_no_communicate_rebuttal": {
    "id": "creator_no_communicate_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Would a caring Creator stay silent?"
      },
      "ar": {
        "question": "هل يصمت خالق يكترث لمخلوقاته؟"
      }
    },
    "evidence": {
      "title": {
        "en": "Why silence doesn't fit",
        "ar": "لماذا الصمت لا يتناسب مع الحكمة"
      },
      "points": [
        {
          "id": "cnc1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Humans have moral consciousness, ask why we exist, and distinguish right from wrong. If a Creator designed us this way, it would be strange to leave us without guidance on how to live and what comes after death.",
                "ar": "يمتلك الإنسان وعيًا أخلاقيًا، ويتساءل لماذا يوجد، ويميّز بين الصواب والخطأ. لو صمّمنا الخالق هكذا، لكان من الغريب تركنا دون هداية بشأن كيفية العيش وما يعقب الموت."
              }
            }
          ],
          "readMore": {
            "en": "",
            "ar": ""
          }
        },
        {
          "id": "cnc2",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "A watchmaker who builds a watch and throws away the manual isn't described as wise or caring. The fact that humans universally seek meaning suggests an answer was meant to be found.",
                "ar": "صانع ساعة يبنيها ثم يرمي دليل الاستخدام لا يُوصف بالحكمة والاهتمام. إن كون البشر في كل مكان يبحثون عن المعنى يشير إلى أن الإجابة كانت مقصودة أن تُوجد."
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
          "en": "Let's assume guidance was sent — how do we find it?",
          "ar": "لنفترض أن الهداية قد أُرسلت — كيف نجدها؟"
        },
        "next": "which_messenger"
      }
    ]
  }
};
