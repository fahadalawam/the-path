export const polytheistNodes = {
  "polytheist_start": {
    "id": "polytheist_start",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "You believe in multiple gods. The universe operates under one unified set of physical laws — everywhere, at all times. Does that suggest one source or many?",
        "subtitle": "Gravity works the same on the moon as it does on Earth. Light travels at the same speed everywhere."
      },
      "ar": {
        "question": "أنت تؤمن بآلهة متعددة. يعمل الكون وفق مجموعة واحدة موحدة من القوانين الفيزيائية — في كل مكان وفي كل وقت. هل يشير ذلك إلى مصدر واحد أم إلى مصادر متعددة؟",
        "subtitle": "الجاذبية تعمل بنفس الطريقة على القمر كما تعمل على الأرض. والضوء يسير بنفس السرعة في كل مكان."
      }
    },
    "options": [
      {
        "label": {
          "en": "That's a good point — one source makes sense",
          "ar": "هذه نقطة وجيهة — مصدر واحد أمر منطقي"
        },
        "next": "creator_communicates"
      },
      {
        "label": {
          "en": "The gods could agree on the laws",
          "ar": "يمكن أن تتفق الآلهة على هذه القوانين"
        },
        "next": "polytheist_rebuttal"
      },
      {
        "label": {
          "en": "I want to understand more",
          "ar": "أريد أن أفهم أكثر"
        },
        "next": "atheist_one_or_many"
      }
    ],
    "evidence": null
  },
  "polytheist_rebuttal": {
    "id": "polytheist_rebuttal",
    "type": "rebuttal",
    "status": "live",
    "content": {
      "en": {
        "question": "If gods agree — what makes them gods?"
      },
      "ar": {
        "question": "إن كانت الآلهة تتفق — فما الذي يجعلها آلهة؟"
      }
    },
    "evidence": {
      "title": {
        "en": "The problem with agreeing gods",
        "ar": "إشكالية الآلهة المتوافقة"
      },
      "points": [
        {
          "id": "pr1",
          "blocks": [
            {
              "type": "text",
              "content": {
                "en": "If multiple gods must agree and defer to each other, none is truly all-powerful or independent. You'd need a higher principle governing them all — which is, effectively, the one God.",
                "ar": "إن كانت آلهة متعددة مضطرة إلى التوافق والخضوع لبعضها البعض، فلا يكون أي منها قادرًا على كل شيء حقًا أو مستقلًا. ستحتاج إلى مبدأ أعلى يحكمها جميعًا — وهو في جوهره الإله الواحد."
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
          "en": "Let's follow the logic of one Creator",
          "ar": "لنتتبع منطق الخالق الواحد"
        },
        "next": "creator_communicates"
      }
    ]
  }
};
