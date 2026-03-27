export const agnosticNodes = {
  "agnostic_start": {
    "id": "agnostic_start",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "You're not sure what you believe — that's one of the most honest positions a person can hold. What's your main reason for uncertainty?",
        "subtitle": "This journey is built for you."
      },
      "ar": {
        "question": "أنت لست متأكدًا مما تؤمن به — وهذا من أصدق المواقف التي يمكن للإنسان أن يتخذها. ما السبب الرئيسي لعدم يقينك؟",
        "subtitle": "هذه الرحلة صُمِّمت من أجلك."
      }
    },
    "options": [
      {
        "label": {
          "en": "There's no clear evidence for God",
          "ar": "لا يوجد دليل واضح على وجود الله"
        },
        "next": "atheist_universe"
      },
      {
        "label": {
          "en": "Too many religions claim to be right",
          "ar": "كثير من الأديان تدّعي أنها على حق"
        },
        "next": "agnostic_too_many"
      },
      {
        "label": {
          "en": "Bad things happen — how can there be a God?",
          "ar": "تحدث أشياء سيئة — فكيف يمكن أن يوجد إله؟"
        },
        "next": "agnostic_evil"
      },
      {
        "label": {
          "en": "I just haven't thought about it deeply",
          "ar": "لم أفكر في الأمر بعمق من قبل"
        },
        "next": "atheist_universe"
      }
    ],
    "evidence": null
  },
  "agnostic_too_many": {
    "id": "agnostic_too_many",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Many claims don't mean no answer exists."
      },
      "ar": {
        "question": "كثرة الادعاءات لا تعني انعدام الإجابة."
      }
    },
    "evidence": {
      "title": {
        "en": "Many claims, one method",
        "ar": "ادعاءات كثيرة، منهج واحد"
      },
      "points": [
        {
          "id": "at1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Many people claiming to be right doesn't mean no one is right — it means we need a method to evaluate the claims. That's exactly what this journey does: follow the evidence, step by step.",
                "ar": "كثرة من يدّعون الصواب لا تعني أن أحدًا منهم ليس على صواب — بل تعني أننا بحاجة إلى منهج لتقييم الادعاءات. وهذا بالضبط ما تقوم به هذه الرحلة: اتباع الدليل خطوة بخطوة."
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
          "en": "Let's start from the beginning",
          "ar": "لنبدأ من البداية"
        },
        "next": "atheist_universe"
      }
    ]
  },
  "agnostic_evil": {
    "id": "agnostic_evil",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Evil and suffering are real. But do they disprove God — or do they sharpen the question?"
      },
      "ar": {
        "question": "الشر والمعاناة حقيقيان. لكن هل يدحضان وجود الله — أم أنهما يُعمِّقان السؤال؟"
      }
    },
    "evidence": {
      "title": {
        "en": "What philosophers and theologians actually argue",
        "ar": "ما يقوله الفلاسفة واللاهوتيون فعلًا"
      },
      "points": [
        {
          "id": "evil1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "The \"logical\" problem of evil — the claim that God and evil cannot coexist — was largely resolved in philosophy by Alvin Plantinga's Free Will Defense (1974). Even atheist philosopher J.L. Mackie later conceded the logical version of the argument fails.",
                "ar": "\"مشكلة الشر المنطقية\" — الادعاء بأن الله والشر لا يمكن أن يتعايشا — حُسمت إلى حدٍّ بعيد في الفلسفة من خلال دفاع ألفين بلانتينغا عن الإرادة الحرة (1974). بل إن الفيلسوف الإلحادي ج.ل. ماكي اعترف لاحقًا بفشل الحجة المنطقية."
              }
            },
            {
              "type": "text",
              "content": {
                "en": "A world where genuine moral choice is possible must be a world where evil is possible. A God who overrides every bad choice or natural consequence would not have created free beings — he would have created puppets.",
                "ar": "عالمٌ تكون فيه الحرية الأخلاقية الحقيقية ممكنةً، لا بدّ أن يكون عالمًا يكون فيه الشر ممكنًا. إله يتدخل لمنع كل قرار سيئ أو نتيجة طبيعية لن يكون قد خلق كائنات حرة — بل كان سيخلق دُمى."
              }
            }
          ],
          "readMore": {
            "en": "The remaining debate is the \"evidential\" problem: not that evil disproves God, but that the sheer amount of suffering makes God's existence less probable. This is a serious argument, but it depends on our ability to judge what a perfect God \"should\" permit — which is itself a huge assumption. It also doesn't address whether the suffering serves purposes we cannot fully see.",
            "ar": "النقاش المتبقي هو \"مشكلة الشر الاستدلالية\": ليس أن الشر يدحض الله، بل أن الكم الهائل من المعاناة يجعل وجود الله أقل احتمالًا. هذه حجة جدية، لكنها تعتمد على قدرتنا على الحكم بما ينبغي لإله كامل أن «يسمح» به — وهو افتراض ضخم في حد ذاته. كما أنها لا تعالج ما إذا كانت المعاناة تخدم أغراضًا لا نستطيع رؤيتها بالكامل."
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "But what about innocent suffering — children, natural disasters?",
          "ar": "لكن ماذا عن معاناة البرآء — الأطفال والكوارث الطبيعية؟"
        },
        "next": "agnostic_evil_innocent"
      },
      {
        "label": {
          "en": "I can accept that — let's keep going",
          "ar": "أستطيع قبول ذلك — لنكمل"
        },
        "next": "atheist_universe"
      }
    ]
  },
  "agnostic_evil_innocent": {
    "id": "agnostic_evil_innocent",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Innocent suffering is the hardest case. Islam doesn't dismiss it — it answers it directly."
      },
      "ar": {
        "question": "معاناة البرآء هي أصعب الحالات. الإسلام لا يتجاهلها — بل يجيب عليها مباشرة."
      }
    },
    "evidence": {
      "title": {
        "en": "The Islamic answer to innocent suffering",
        "ar": "الإجابة الإسلامية على معاناة البرآء"
      },
      "points": [
        {
          "id": "evil2",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Islam teaches that this life is not the complete picture. It is a brief, temporary test — and the suffering endured here is not the final word. The Quran states:",
                "ar": "يُعلّم الإسلام أن هذه الحياة ليست الصورة الكاملة. إنها اختبار قصير مؤقت — والمعاناة التي يتحملها الإنسان هنا ليست الكلمة الأخيرة. يقول القرآن الكريم:"
              }
            },
            {
              "type": "quote",
              "content": {
                "en": "وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ\n\n\"We will certainly test you with some fear and hunger, and some loss of possessions and lives and crops. But give good news to the steadfast.\"",
                "ar": "وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ"
              },
              "source": {
                "en": "Quran 2:155",
                "ar": "القرآن الكريم ٢:١٥٥"
              }
            },
            {
              "type": "text",
              "content": {
                "en": "The Prophet Muhammad ﷺ said: \"No fatigue, illness, anxiety, sorrow, harm, or distress befalls a Muslim — even the prick of a thorn — except that Allah expiates some of his sins by it.\" Suffering in this life is not pointless — it is purification, elevation, and the condition for a justice that will be fully realised in the next life.",
                "ar": "قال النبي محمد ﷺ: «ما يصيب المسلم من نَصَبٍ ولا وَصَبٍ ولا هَمٍّ ولا حُزْنٍ ولا أذى ولا غَمٍّ، حتى الشوكة يُشاكها، إلا كَفَّر الله بها من خطاياه». المعاناة في هذه الحياة ليست عبثًا — إنها تطهير، ورفعة، وشرط لعدالة ستتحقق كاملةً في الحياة الآخرة."
              }
            }
          ],
          "readMore": {
            "en": "The child who suffers and dies without cause in this world — Islam's answer is that such a soul goes directly to Paradise. The suffering was real, but so is the justice that follows. A God who sees only this life and ends the story here would be unjust. The God of Islam sees the full picture: this life is the opening paragraph, not the whole book.",
            "ar": "الطفل الذي يعاني ويموت بلا سبب في هذه الدنيا — إجابة الإسلام أن هذه الروح تذهب مباشرة إلى الجنة. كانت المعاناة حقيقية، لكن العدل الذي يليها حقيقي أيضًا. إله يرى هذه الحياة فحسب وينهي القصة هنا سيكون ظالمًا. أما الله في الإسلام فيرى الصورة كاملة: هذه الحياة هي الفقرة الافتتاحية، لا الكتاب كله."
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "Why design a world that needs this much suffering at all?",
          "ar": "لماذا يُصمَّم عالم يحتاج كل هذه المعاناة أصلًا؟"
        },
        "next": "agnostic_evil_design"
      },
      {
        "label": {
          "en": "This is something I'm personally going through",
          "ar": "هذا شيء أمر به شخصيًا"
        },
        "next": "agnostic_evil_personal"
      },
      {
        "label": {
          "en": "I can accept this — let's keep going",
          "ar": "أستطيع قبول ذلك — لنكمل"
        },
        "next": "atheist_universe"
      }
    ]
  },
  "agnostic_evil_design": {
    "id": "agnostic_evil_design",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "Could the highest human qualities exist without the possibility of suffering?"
      },
      "ar": {
        "question": "هل يمكن أن توجد أسمى الصفات الإنسانية دون إمكانية المعاناة؟"
      }
    },
    "evidence": {
      "title": {
        "en": "Why suffering is the condition for meaning",
        "ar": "لماذا المعاناة شرط لوجود المعنى"
      },
      "points": [
        {
          "id": "evil3",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "Courage requires real danger. Compassion requires real pain. Patience requires real hardship. Sacrifice requires something genuinely costly. A world without any possibility of suffering would be a world without any of these — a world of permanent comfort where nothing is at stake and nothing truly matters.",
                "ar": "الشجاعة تستلزم خطرًا حقيقيًا. التعاطف يستلزم ألمًا حقيقيًا. الصبر يستلزم مشقة حقيقية. التضحية تستلزم ثمنًا حقيقيًا. عالم لا تكون فيه المعاناة ممكنة سيكون عالمًا بلا أيٍّ من هذه — عالم من الراحة الدائمة حيث لا شيء على المحك وليس ثمة ما يهم حقًا."
              }
            },
            {
              "type": "text",
              "content": {
                "en": "The philosopher John Hick called this \"soul-making\": the idea that the purpose of this world is not comfort, but growth. We are not placed here as tourists in a hotel. We are here to become something — and that process requires resistance.",
                "ar": "أسمى الفيلسوف جون هيك هذا «صناعة الروح»: فكرة أن الغرض من هذا العالم ليس الراحة، بل النمو. لم نُوضَع هنا كسياح في فندق. نحن هنا لنصير شيئًا — وهذه العملية تستلزم المقاومة."
              }
            },
            {
              "type": "text",
              "content": {
                "en": "Islam frames this explicitly. The Quran says: \"Do people think they will be left alone because they say 'We believe,' and they will not be tested?\" (29:2). The test is not an oversight in the design — it is the design.",
                "ar": "يُصرِّح الإسلام بهذا صراحةً. يقول القرآن: «أَحَسِبَ النَّاسُ أَن يُتْرَكُوا أَن يَقُولُوا آمَنَّا وَهُمْ لَا يُفْتَنُونَ؟» (٢٩:٢). الاختبار ليس إغفالًا في التصميم — بل هو التصميم ذاته."
              }
            }
          ],
          "readMore": {
            "en": "The objection assumes the purpose of existence is maximising comfort. But that's a value judgment, not an obvious truth. If the purpose is something deeper — the development of genuine character, the exercise of real freedom, the earning of a place in something eternal — then a world with resistance makes perfect sense. Islam doesn't promise that this life will be easy. It promises that it will be worth it.",
            "ar": "يفترض الاعتراض أن الغرض من الوجود هو تعظيم الراحة. لكن هذا حكم قيمي، لا حقيقة واضحة. إن كان الغرض أعمق من ذلك — تنمية الشخصية الحقيقية، وممارسة الحرية الفعلية، واكتساب مكانة في شيء أبدي — فإن عالمًا فيه مقاومة يصبح منطقيًا تمامًا. لا يعد الإسلام بأن تكون هذه الحياة سهلة. بل يعد بأنها تستحق."
          }
        }
      ]
    },
    "options": [
      {
        "label": {
          "en": "This is something I'm personally struggling with",
          "ar": "هذا شيء أعاني منه شخصيًا"
        },
        "next": "agnostic_evil_personal"
      },
      {
        "label": {
          "en": "That makes sense — let's continue",
          "ar": "هذا منطقي — لنكمل"
        },
        "next": "atheist_universe"
      }
    ]
  },
  "agnostic_evil_personal": {
    "id": "agnostic_evil_personal",
    "type": "dead_end",
    "status": "live",
    "content": {
      "en": {
        "message": "If your doubt comes from real personal pain — loss, grief, injustice — this is not a place for more arguments. What you're carrying deserves a real conversation, not a web page. We'd genuinely love to hear from you."
      },
      "ar": {
        "message": "إن كان شكّك ينبع من ألم شخصي حقيقي — خسارة، أو حزن، أو ظلم — فهذا ليس مكانًا للمزيد من الحجج. ما تحمله يستحق حوارًا حقيقيًا، لا صفحة ويب. يسعدنا حقًا أن نسمع منك."
      }
    },
    "options": [],
    "evidence": null
  }
};
