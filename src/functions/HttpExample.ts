import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TextAnalysisClient, AzureKeyCredential, TextAnalysisClientOptions } from "@azure/ai-language-text";

const testJson = {
    "AudioFileResults": [
      {
        "AudioFileHash": "e42ae61b8d82627deb33cc0dbf6165ad8fe2aee284c950f86dc6fefe7c31cb29",
        "AudioFileName": "test_call_1.wav",
        "AudioFileUrl": "/usr/local/batch/input/test_call_1.wav",
        "AudioLengthInSeconds": 185.0790625,
        "CombinedResults": [
          {
            "ChannelNumber": null,
            "Display": "Hello, thank you for calling Contoso. Who am I speaking with today? Hi, my name is Mary Rondo. I'm trying to enroll myself with conscious So. Hi, Mary. Uh, are you calling because you need health insurance? Yes, yeah, I'm calling to sign up for insurance. Great. Uh, if you can answer a few questions, uh, we can get you signed up in the jiffy. OK. Umm, so uh, what's your full name? Uh, so Mary Beth Rondo, last name is R like Romeo, O like Ocean, and like Nancy. DD like Dog and O like Ocean again. Randall got it. And what's the best callback number in case we get disconnected? I only have a cell phone, so I can give you that. Yeah, that'll be fine. Sure. So it's 234554 and then 9312. To confirm, it's 234-554-9312. Yep, that's right. Excellent. Uh, Let's get some additional information from your app. For your application, Uh, do you have a job? Uh, yes, I am self-employed. OK, So then you have a Social Security number as well? Uh, yes, I do. OK. And what is your Social Security number please? Uh, sure. So it's 412. Uh 256789. Sorry, what was that? A25 or A225 you cut out for a bit? Uh, it's 22 so. 412, then another two, then 5. Hey, thank you so much and could I have your e-mail address please? Yeah, it's Mary rondo@gmail.com, so myfirstandlastname@gmail.com. No periods, no dashes. Great. Uh, that is the last question. So let me take your information and I'll be able to get you signed up right away. Thank you for calling Contoso and I'll be able to get you signed up immediately. One of our agents will call you back in about 24 hours or so to confirm. Application. That sounds great. Thank you. Absolutely. If you need anything else, please give us a call at 1-800-555-5564 ext 123. Thank you very much for calling Contoso. Uh, actually uh, sorry, one more question. Oh yes, of course. I'm curious what I'd be getting a physical card as proof of coverage. So the default is a digital membership card, but we can send you a physical card if you prefer. Uh, yes. Could you please mail it to me when it's ready? I'd like to have it shipped to you for my address. Oh yeah. Uh so it's 2660 Unit A on Maple Ave. SE Lansing and then zip code is 48823. Absolutely. I've made a note on your file. Awesome. Thanks so much. You're very welcome. Thank you for calling Contoso and have a great day.",
            "ITN": "hello thank you for calling contoso who am i speaking with today hi my name is mary rondo i'm trying to enroll myself with conscious so hi mary uh are you calling because you need health insurance yes yeah i'm calling to sign up for insurance great uh if you can answer a few questions uh we can get you signed up in the jiffy OK umm so uh what's your full name uh so mary beth rondo last name is R like romeo O like ocean and like nancy DD like dog and O like ocean again randall got it and what's the best callback number in case we get disconnected i only have a cell phone so i can give you that yeah that'll be fine sure so it's 234554 and then 9312 to confirm it's 234-554-9312 yep that's right excellent uh let's get some additional information from your app for your application uh do you have a job uh yes i am self employed OK so then you have a social security number as well uh yes i do OK and what is your social security number please uh sure so it's 412 uh 256789 sorry what was that A25 or A225 you cut out for a bit uh it's 22 so 412 then another two then 5 hey thank you so much and could i have your email address please yeah it's mary rondo@gmail.com so myfirstandlastname@gmail.com no periods no dashes great uh that is the last question so let me take your information and i'll be able to get you signed up right away thank you for calling contoso and i'll be able to get you signed up immediately one of our agents will call you back in about 24 hours or so to confirm application that sounds great thank you absolutely if you need anything else please give us a call at 1-800-555-5564 ext 123 thank you very much for calling contoso uh actually uh sorry one more question oh yes of course i'm curious what i'd be getting a physical card as proof of coverage so the default is a digital membership card but we can send you a physical card if you prefer uh yes could you please mail it to me when it's ready i'd like to have it shipped to you for my address oh yeah uh so it's 2660 unit A on maple ave SE lansing and then zip code is 48823 absolutely i've made a note on your file awesome thanks so much you're very welcome thank you for calling contoso and have a great day",
            "Lexical": "hello thank you for calling contoso who am i speaking with today hi my name is mary rondo i'm trying to enroll myself with conscious so hi mary uh are you calling because you need health insurance yes yeah i'm calling to sign up for insurance great uh if you can answer a few questions uh we can get you signed up in the jiffy OK umm so uh what's your full name uh so mary beth rondo last name is R like romeo O like ocean and like nancy D D like dog and O like ocean again randall got it and what's the best callback number in case we get disconnected i only have a cell phone so i can give you that yeah that'll be fine sure so it's two three four five five four and then nine three one two to confirm it's two three four five five four nine three one two yep that's right excellent uh let's get some additional information from your app for your application uh do you have a job uh yes i am self employed OK so then you have a social security number as well uh yes i do OK and what is your social security number please uh sure so it's four one two uh two five six seven eight nine sorry what was that a two five or a two two five you cut out for a bit uh it's double two so four one two then another two then five hey thank you so much and could i have your email address please yeah it's mary rondo at gmail dot com so my first and last name at gmail dot com no periods no dashes great uh that is the last question so let me take your information and i'll be able to get you signed up right away thank you for calling contoso and i'll be able to get you signed up immediately one of our agents will call you back in about twenty four hours or so to confirm application that sounds great thank you absolutely if you need anything else please give us a call at one eight hundred five five five five five six four extension one two three thank you very much for calling contoso uh actually uh sorry one more question ohh yes of course i'm curious what i'd be getting a physical card as proof of coverage so the default is a digital membership card but we can send you a physical card if you prefer uh yes could you please mail it to me when it's ready i'd like to have it shipped to you for my address ohh yeah uh so it's two six six zero unit A on maple avenue southeast lansing and then zip code is four eight eight two three absolutely i've made a note on your file awesome thanks so much you're very welcome thank you for calling contoso and have a great day",
            "MaskedITN": "hello thank you for calling contoso who am i speaking with today hi my name is mary rondo i'm trying to enroll myself with conscious so hi mary uh are you calling because you need health insurance yes yeah i'm calling to sign up for insurance great uh if you can answer a few questions uh we can get you signed up in the jiffy ok umm so uh what's your full name uh so mary beth rondo last name is r like romeo o like ocean and like nancy dd like dog and o like ocean again randall got it and what's the best callback number in case we get disconnected i only have a cell phone so i can give you that yeah that'll be fine sure so it's 234554 and then 9312 to confirm it's 234-554-9312 yep that's right excellent uh let's get some additional information from your app for your application uh do you have a job uh yes i am self-employed ok so then you have a social security number as well uh yes i do ok and what is your social security number please uh sure so it's 412 uh 256789 sorry what was that a25 or a225 you cut out for a bit uh it's 22 so 412 then another two then 5 hey thank you so much and could i have your e-mail address please yeah it's mary rondo@gmail.com so myfirstandlastname@gmail.com no periods no dashes great uh that is the last question so let me take your information and i'll be able to get you signed up right away thank you for calling contoso and i'll be able to get you signed up immediately one of our agents will call you back in about 24 hours or so to confirm application that sounds great thank you absolutely if you need anything else please give us a call at 1-800-555-5564 ext 123 thank you very much for calling contoso uh actually uh sorry one more question oh yes of course i'm curious what i'd be getting a physical card as proof of coverage so the default is a digital membership card but we can send you a physical card if you prefer uh yes could you please mail it to me when it's ready i'd like to have it shipped to you for my address oh yeah uh so it's 2660 unit a on maple ave se lansing and then zip code is 48823 absolutely i've made a note on your file awesome thanks so much you're very welcome thank you for calling contoso and have a great day"
          }
        ],
        "LastProcessedOffsetInSeconds": 184.29,
        "SegmentResults": [
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Hello, thank you for calling Contoso. Who am I speaking with today?",
            "Duration": 27500000,
            "DurationInSeconds": 2.75,
            "Id": "e40573d51d1941dea17841171c2ac7be",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.7919966,
                "Display": "Hello, thank you for calling Contoso. Who am I speaking with today?",
                "ITN": "hello thank you for calling contoso who am i speaking with today",
                "Lexical": "hello thank you for calling contoso who am i speaking with today",
                "MaskedITN": "hello thank you for calling contoso who am i speaking with today",
                "Words": [
                  {
                    "Duration": 4500000,
                    "DurationInSeconds": 0.45,
                    "Offset": 7800000,
                    "OffsetInSeconds": 0.78,
                    "Word": "hello"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 12400000,
                    "OffsetInSeconds": 1.24,
                    "Word": "thank"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 14400000,
                    "OffsetInSeconds": 1.44,
                    "Word": "you"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 15700000,
                    "OffsetInSeconds": 1.57,
                    "Word": "for"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 17000000,
                    "OffsetInSeconds": 1.7,
                    "Word": "calling"
                  },
                  {
                    "Duration": 4300000,
                    "DurationInSeconds": 0.43,
                    "Offset": 19600000,
                    "OffsetInSeconds": 1.96,
                    "Word": "contoso"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 24000000,
                    "OffsetInSeconds": 2.4,
                    "Word": "who"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 25600000,
                    "OffsetInSeconds": 2.56,
                    "Word": "am"
                  },
                  {
                    "Duration": 500000,
                    "DurationInSeconds": 0.05,
                    "Offset": 26600000,
                    "OffsetInSeconds": 2.66,
                    "Word": "i"
                  },
                  {
                    "Duration": 3300000,
                    "DurationInSeconds": 0.33,
                    "Offset": 27200000,
                    "OffsetInSeconds": 2.72,
                    "Word": "speaking"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 30600000,
                    "OffsetInSeconds": 3.06,
                    "Word": "with"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 32400000,
                    "OffsetInSeconds": 3.24,
                    "Word": "today"
                  }
                ]
              }
            ],
            "Offset": 7800000,
            "OffsetInSeconds": 0.78,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Hi, my name is Mary Rondo. I'm trying to enroll myself with conscious So.",
            "Duration": 34600000,
            "DurationInSeconds": 3.46,
            "Id": "818d01dfd82146fdab0033e474df054d",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.74155885,
                "Display": "Hi, my name is Mary Rondo. I'm trying to enroll myself with conscious So.",
                "ITN": "hi my name is mary rondo i'm trying to enroll myself with conscious so",
                "Lexical": "hi my name is mary rondo i'm trying to enroll myself with conscious so",
                "MaskedITN": "hi my name is mary rondo i'm trying to enroll myself with conscious so",
                "Words": [
                  {
                    "Duration": 3900000,
                    "DurationInSeconds": 0.39,
                    "Offset": 45600000,
                    "OffsetInSeconds": 4.56,
                    "Word": "hi"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 49600000,
                    "OffsetInSeconds": 4.96,
                    "Word": "my"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 50800000,
                    "OffsetInSeconds": 5.08,
                    "Word": "name"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 52400000,
                    "OffsetInSeconds": 5.24,
                    "Word": "is"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 53600000,
                    "OffsetInSeconds": 5.36,
                    "Word": "mary"
                  },
                  {
                    "Duration": 5100000,
                    "DurationInSeconds": 0.51,
                    "Offset": 56600000,
                    "OffsetInSeconds": 5.66,
                    "Word": "rondo"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 61800000,
                    "OffsetInSeconds": 6.18,
                    "Word": "i'm"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 63100000,
                    "OffsetInSeconds": 6.31,
                    "Word": "trying"
                  },
                  {
                    "Duration": 600000,
                    "DurationInSeconds": 0.06,
                    "Offset": 65400000,
                    "OffsetInSeconds": 6.54,
                    "Word": "to"
                  },
                  {
                    "Duration": 2400000,
                    "DurationInSeconds": 0.24,
                    "Offset": 66100000,
                    "OffsetInSeconds": 6.61,
                    "Word": "enroll"
                  },
                  {
                    "Duration": 3100000,
                    "DurationInSeconds": 0.31,
                    "Offset": 68600000,
                    "OffsetInSeconds": 6.86,
                    "Word": "myself"
                  },
                  {
                    "Duration": 1600000,
                    "DurationInSeconds": 0.16,
                    "Offset": 71800000,
                    "OffsetInSeconds": 7.18,
                    "Word": "with"
                  },
                  {
                    "Duration": 3800000,
                    "DurationInSeconds": 0.38,
                    "Offset": 73500000,
                    "OffsetInSeconds": 7.35,
                    "Word": "conscious"
                  },
                  {
                    "Duration": 2800000,
                    "DurationInSeconds": 0.28,
                    "Offset": 77400000,
                    "OffsetInSeconds": 7.74,
                    "Word": "so"
                  }
                ]
              }
            ],
            "Offset": 45600000,
            "OffsetInSeconds": 4.56,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Hi, Mary. Uh, are you calling because you need health insurance?",
            "Duration": 25600000,
            "DurationInSeconds": 2.56,
            "Id": "3d501dbe671d4b8b9cdfeafba86a3e0a",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.7718257,
                "Display": "Hi, Mary. Uh, are you calling because you need health insurance?",
                "ITN": "hi mary uh are you calling because you need health insurance",
                "Lexical": "hi mary uh are you calling because you need health insurance",
                "MaskedITN": "hi mary uh are you calling because you need health insurance",
                "Words": [
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 95600000,
                    "OffsetInSeconds": 9.56,
                    "Word": "hi"
                  },
                  {
                    "Duration": 3200000,
                    "DurationInSeconds": 0.32,
                    "Offset": 97100000,
                    "OffsetInSeconds": 9.71,
                    "Word": "mary"
                  },
                  {
                    "Duration": 3200000,
                    "DurationInSeconds": 0.32,
                    "Offset": 100400000,
                    "OffsetInSeconds": 10.04,
                    "Word": "uh"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 103700000,
                    "OffsetInSeconds": 10.37,
                    "Word": "are"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 104800000,
                    "OffsetInSeconds": 10.48,
                    "Word": "you"
                  },
                  {
                    "Duration": 3000000,
                    "DurationInSeconds": 0.3,
                    "Offset": 105900000,
                    "OffsetInSeconds": 10.59,
                    "Word": "calling"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 109000000,
                    "OffsetInSeconds": 10.9,
                    "Word": "because"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 111600000,
                    "OffsetInSeconds": 11.16,
                    "Word": "you"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 112800000,
                    "OffsetInSeconds": 11.28,
                    "Word": "need"
                  },
                  {
                    "Duration": 2000000,
                    "DurationInSeconds": 0.2,
                    "Offset": 114300000,
                    "OffsetInSeconds": 11.43,
                    "Word": "health"
                  },
                  {
                    "Duration": 4800000,
                    "DurationInSeconds": 0.48,
                    "Offset": 116400000,
                    "OffsetInSeconds": 11.64,
                    "Word": "insurance"
                  }
                ]
              }
            ],
            "Offset": 95600000,
            "OffsetInSeconds": 9.56,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Yes, yeah, I'm calling to sign up for insurance.",
            "Duration": 20700000,
            "DurationInSeconds": 2.07,
            "Id": "8650780b4b304adaa426f3475f8331dc",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8254432,
                "Display": "Yes, yeah, I'm calling to sign up for insurance.",
                "ITN": "yes yeah i'm calling to sign up for insurance",
                "Lexical": "yes yeah i'm calling to sign up for insurance",
                "MaskedITN": "yes yeah i'm calling to sign up for insurance",
                "Words": [
                  {
                    "Duration": 5200000,
                    "DurationInSeconds": 0.52,
                    "Offset": 130900000,
                    "OffsetInSeconds": 13.09,
                    "Word": "yes"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 136200000,
                    "OffsetInSeconds": 13.62,
                    "Word": "yeah"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 138200000,
                    "OffsetInSeconds": 13.82,
                    "Word": "i'm"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 139600000,
                    "OffsetInSeconds": 13.96,
                    "Word": "calling"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 142400000,
                    "OffsetInSeconds": 14.24,
                    "Word": "to"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 143400000,
                    "OffsetInSeconds": 14.34,
                    "Word": "sign"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 145000000,
                    "OffsetInSeconds": 14.5,
                    "Word": "up"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 146000000,
                    "OffsetInSeconds": 14.6,
                    "Word": "for"
                  },
                  {
                    "Duration": 4400000,
                    "DurationInSeconds": 0.44,
                    "Offset": 147200000,
                    "OffsetInSeconds": 14.72,
                    "Word": "insurance"
                  }
                ]
              }
            ],
            "Offset": 130900000,
            "OffsetInSeconds": 13.09,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Great. Uh, if you can answer a few questions, uh, we can get you signed up in the jiffy.",
            "Duration": 32300000,
            "DurationInSeconds": 3.23,
            "Id": "1d66bb7d1ca54db8894ab4cce1cd07ce",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8565556,
                "Display": "Great. Uh, if you can answer a few questions, uh, we can get you signed up in the jiffy.",
                "ITN": "great uh if you can answer a few questions uh we can get you signed up in the jiffy",
                "Lexical": "great uh if you can answer a few questions uh we can get you signed up in the jiffy",
                "MaskedITN": "great uh if you can answer a few questions uh we can get you signed up in the jiffy",
                "Words": [
                  {
                    "Duration": 4000000,
                    "DurationInSeconds": 0.4,
                    "Offset": 159900000,
                    "OffsetInSeconds": 15.99,
                    "Word": "great"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 164000000,
                    "OffsetInSeconds": 16.4,
                    "Word": "uh"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 165800000,
                    "OffsetInSeconds": 16.58,
                    "Word": "if"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 166600000,
                    "OffsetInSeconds": 16.66,
                    "Word": "you"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 167700000,
                    "OffsetInSeconds": 16.77,
                    "Word": "can"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 168900000,
                    "OffsetInSeconds": 16.89,
                    "Word": "answer"
                  },
                  {
                    "Duration": 400000,
                    "DurationInSeconds": 0.04,
                    "Offset": 171100000,
                    "OffsetInSeconds": 17.11,
                    "Word": "a"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 171600000,
                    "OffsetInSeconds": 17.16,
                    "Word": "few"
                  },
                  {
                    "Duration": 5500000,
                    "DurationInSeconds": 0.55,
                    "Offset": 173100000,
                    "OffsetInSeconds": 17.31,
                    "Word": "questions"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 178700000,
                    "OffsetInSeconds": 17.87,
                    "Word": "uh"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 179900000,
                    "OffsetInSeconds": 17.99,
                    "Word": "we"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 180900000,
                    "OffsetInSeconds": 18.09,
                    "Word": "can"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 182100000,
                    "OffsetInSeconds": 18.21,
                    "Word": "get"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 183300000,
                    "OffsetInSeconds": 18.33,
                    "Word": "you"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 184500000,
                    "OffsetInSeconds": 18.45,
                    "Word": "signed"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 186700000,
                    "OffsetInSeconds": 18.67,
                    "Word": "up"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 187700000,
                    "OffsetInSeconds": 18.77,
                    "Word": "in"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 188500000,
                    "OffsetInSeconds": 18.85,
                    "Word": "the"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 189700000,
                    "OffsetInSeconds": 18.97,
                    "Word": "jiffy"
                  }
                ]
              }
            ],
            "Offset": 159900000,
            "OffsetInSeconds": 15.99,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "OK.",
            "Duration": 3400000,
            "DurationInSeconds": 0.34,
            "Id": "46362686a7ca4e6eb275b5c25a90634f",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.97535014,
                "Display": "OK.",
                "ITN": "OK",
                "Lexical": "OK",
                "MaskedITN": "ok",
                "Words": [
                  {
                    "Duration": 3400000,
                    "DurationInSeconds": 0.34,
                    "Offset": 202300000,
                    "OffsetInSeconds": 20.23,
                    "Word": "OK"
                  }
                ]
              }
            ],
            "Offset": 202300000,
            "OffsetInSeconds": 20.23,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Umm, so uh, what's your full name?",
            "Duration": 14300000,
            "DurationInSeconds": 1.43,
            "Id": "2505beac02364e89abee138e707dc2ac",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.7327516,
                "Display": "Umm, so uh, what's your full name?",
                "ITN": "umm so uh what's your full name",
                "Lexical": "umm so uh what's your full name",
                "MaskedITN": "umm so uh what's your full name",
                "Words": [
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 215600000,
                    "OffsetInSeconds": 21.56,
                    "Word": "umm"
                  },
                  {
                    "Duration": 2600000,
                    "DurationInSeconds": 0.26,
                    "Offset": 218400000,
                    "OffsetInSeconds": 21.84,
                    "Word": "so"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 221100000,
                    "OffsetInSeconds": 22.11,
                    "Word": "uh"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 222500000,
                    "OffsetInSeconds": 22.25,
                    "Word": "what's"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 224700000,
                    "OffsetInSeconds": 22.47,
                    "Word": "your"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 226200000,
                    "OffsetInSeconds": 22.62,
                    "Word": "full"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 227700000,
                    "OffsetInSeconds": 22.77,
                    "Word": "name"
                  }
                ]
              }
            ],
            "Offset": 215600000,
            "OffsetInSeconds": 21.56,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Uh, so Mary Beth Rondo, last name is R like Romeo, O like Ocean, and like Nancy. DD like Dog and O like Ocean again.",
            "Duration": 90400000,
            "DurationInSeconds": 9.04,
            "Id": "fe895be6350f46bbbb708ad1c5a15467",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.7259561,
                "Display": "Uh, so Mary Beth Rondo, last name is R like Romeo, O like Ocean, and like Nancy. DD like Dog and O like Ocean again.",
                "ITN": "uh so mary beth rondo last name is R like romeo O like ocean and like nancy DD like dog and O like ocean again",
                "Lexical": "uh so mary beth rondo last name is R like romeo O like ocean and like nancy D D like dog and O like ocean again",
                "MaskedITN": "uh so mary beth rondo last name is r like romeo o like ocean and like nancy dd like dog and o like ocean again",
                "Words": [
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 244800000,
                    "OffsetInSeconds": 24.48,
                    "Word": "uh"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 247600000,
                    "OffsetInSeconds": 24.76,
                    "Word": "so"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 249000000,
                    "OffsetInSeconds": 24.9,
                    "Word": "mary"
                  },
                  {
                    "Duration": 2400000,
                    "DurationInSeconds": 0.24,
                    "Offset": 251800000,
                    "OffsetInSeconds": 25.18,
                    "Word": "beth"
                  },
                  {
                    "Duration": 5800000,
                    "DurationInSeconds": 0.58,
                    "Offset": 254300000,
                    "OffsetInSeconds": 25.43,
                    "Word": "rondo"
                  },
                  {
                    "Duration": 3200000,
                    "DurationInSeconds": 0.32,
                    "Offset": 260200000,
                    "OffsetInSeconds": 26.02,
                    "Word": "last"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 263500000,
                    "OffsetInSeconds": 26.35,
                    "Word": "name"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 265800000,
                    "OffsetInSeconds": 26.58,
                    "Word": "is"
                  },
                  {
                    "Duration": 4000000,
                    "DurationInSeconds": 0.4,
                    "Offset": 267900000,
                    "OffsetInSeconds": 26.79,
                    "Word": "R"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 272000000,
                    "OffsetInSeconds": 27.2,
                    "Word": "like"
                  },
                  {
                    "Duration": 8400000,
                    "DurationInSeconds": 0.84,
                    "Offset": 274200000,
                    "OffsetInSeconds": 27.42,
                    "Word": "romeo"
                  },
                  {
                    "Duration": 3900000,
                    "DurationInSeconds": 0.39,
                    "Offset": 283400000,
                    "OffsetInSeconds": 28.34,
                    "Word": "O"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 287400000,
                    "OffsetInSeconds": 28.74,
                    "Word": "like"
                  },
                  {
                    "Duration": 5300000,
                    "DurationInSeconds": 0.53,
                    "Offset": 290000000,
                    "OffsetInSeconds": 29.0,
                    "Word": "ocean"
                  },
                  {
                    "Duration": 3300000,
                    "DurationInSeconds": 0.33,
                    "Offset": 296200000,
                    "OffsetInSeconds": 29.62,
                    "Word": "and"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 299600000,
                    "OffsetInSeconds": 29.96,
                    "Word": "like"
                  },
                  {
                    "Duration": 3900000,
                    "DurationInSeconds": 0.39,
                    "Offset": 301600000,
                    "OffsetInSeconds": 30.16,
                    "Word": "nancy"
                  },
                  {
                    "Duration": 6100000,
                    "DurationInSeconds": 0.61,
                    "Offset": 305600000,
                    "OffsetInSeconds": 30.56,
                    "Word": "D"
                  },
                  {
                    "Duration": 2600000,
                    "DurationInSeconds": 0.26,
                    "Offset": 313400000,
                    "OffsetInSeconds": 31.34,
                    "Word": "D"
                  },
                  {
                    "Duration": 1800000,
                    "DurationInSeconds": 0.18,
                    "Offset": 316100000,
                    "OffsetInSeconds": 31.61,
                    "Word": "like"
                  },
                  {
                    "Duration": 4100000,
                    "DurationInSeconds": 0.41,
                    "Offset": 318000000,
                    "OffsetInSeconds": 31.8,
                    "Word": "dog"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 322200000,
                    "OffsetInSeconds": 32.22,
                    "Word": "and"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 325200000,
                    "OffsetInSeconds": 32.52,
                    "Word": "O"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 327200000,
                    "OffsetInSeconds": 32.72,
                    "Word": "like"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 329200000,
                    "OffsetInSeconds": 32.92,
                    "Word": "ocean"
                  },
                  {
                    "Duration": 3400000,
                    "DurationInSeconds": 0.34,
                    "Offset": 331800000,
                    "OffsetInSeconds": 33.18,
                    "Word": "again"
                  }
                ]
              }
            ],
            "Offset": 244800000,
            "OffsetInSeconds": 24.48,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Randall got it. And what's the best callback number in case we get disconnected?",
            "Duration": 56800000,
            "DurationInSeconds": 5.68,
            "Id": "80ac2d7bb9364a51bd1b630f506fb474",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8180916,
                "Display": "Randall got it. And what's the best callback number in case we get disconnected?",
                "ITN": "randall got it and what's the best callback number in case we get disconnected",
                "Lexical": "randall got it and what's the best callback number in case we get disconnected",
                "MaskedITN": "randall got it and what's the best callback number in case we get disconnected",
                "Words": [
                  {
                    "Duration": 4900000,
                    "DurationInSeconds": 0.49,
                    "Offset": 343800000,
                    "OffsetInSeconds": 34.38,
                    "Word": "randall"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 359600000,
                    "OffsetInSeconds": 35.96,
                    "Word": "got"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 362600000,
                    "OffsetInSeconds": 36.26,
                    "Word": "it"
                  },
                  {
                    "Duration": 4300000,
                    "DurationInSeconds": 0.43,
                    "Offset": 369000000,
                    "OffsetInSeconds": 36.9,
                    "Word": "and"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 373400000,
                    "OffsetInSeconds": 37.34,
                    "Word": "what's"
                  },
                  {
                    "Duration": 3300000,
                    "DurationInSeconds": 0.33,
                    "Offset": 376200000,
                    "OffsetInSeconds": 37.62,
                    "Word": "the"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 380600000,
                    "OffsetInSeconds": 38.06,
                    "Word": "best"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 382800000,
                    "OffsetInSeconds": 38.28,
                    "Word": "callback"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 386600000,
                    "OffsetInSeconds": 38.66,
                    "Word": "number"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 389600000,
                    "OffsetInSeconds": 38.96,
                    "Word": "in"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 390600000,
                    "OffsetInSeconds": 39.06,
                    "Word": "case"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 392200000,
                    "OffsetInSeconds": 39.22,
                    "Word": "we"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 393300000,
                    "OffsetInSeconds": 39.33,
                    "Word": "get"
                  },
                  {
                    "Duration": 6000000,
                    "DurationInSeconds": 0.6,
                    "Offset": 394600000,
                    "OffsetInSeconds": 39.46,
                    "Word": "disconnected"
                  }
                ]
              }
            ],
            "Offset": 343800000,
            "OffsetInSeconds": 34.38,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "I only have a cell phone, so I can give you that.",
            "Duration": 16400000,
            "DurationInSeconds": 1.64,
            "Id": "5e2a02ad46cb49d4afec78f8fc136fbf",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.90648586,
                "Display": "I only have a cell phone, so I can give you that.",
                "ITN": "i only have a cell phone so i can give you that",
                "Lexical": "i only have a cell phone so i can give you that",
                "MaskedITN": "i only have a cell phone so i can give you that",
                "Words": [
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 417800000,
                    "OffsetInSeconds": 41.78,
                    "Word": "i"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 419600000,
                    "OffsetInSeconds": 41.96,
                    "Word": "only"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 421100000,
                    "OffsetInSeconds": 42.11,
                    "Word": "have"
                  },
                  {
                    "Duration": 300000,
                    "DurationInSeconds": 0.03,
                    "Offset": 422600000,
                    "OffsetInSeconds": 42.26,
                    "Word": "a"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 423000000,
                    "OffsetInSeconds": 42.3,
                    "Word": "cell"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 424800000,
                    "OffsetInSeconds": 42.48,
                    "Word": "phone"
                  },
                  {
                    "Duration": 800000,
                    "DurationInSeconds": 0.08,
                    "Offset": 426800000,
                    "OffsetInSeconds": 42.68,
                    "Word": "so"
                  },
                  {
                    "Duration": 400000,
                    "DurationInSeconds": 0.04,
                    "Offset": 427700000,
                    "OffsetInSeconds": 42.77,
                    "Word": "i"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 428200000,
                    "OffsetInSeconds": 42.82,
                    "Word": "can"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 429400000,
                    "OffsetInSeconds": 42.94,
                    "Word": "give"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 430800000,
                    "OffsetInSeconds": 43.08,
                    "Word": "you"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 432000000,
                    "OffsetInSeconds": 43.2,
                    "Word": "that"
                  }
                ]
              }
            ],
            "Offset": 417800000,
            "OffsetInSeconds": 41.78,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Yeah, that'll be fine.",
            "Duration": 8600000,
            "DurationInSeconds": 0.86,
            "Id": "6dcabf6ea43f44a6bdb5d1485577e6c5",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.78906524,
                "Display": "Yeah, that'll be fine.",
                "ITN": "yeah that'll be fine",
                "Lexical": "yeah that'll be fine",
                "MaskedITN": "yeah that'll be fine",
                "Words": [
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 442100000,
                    "OffsetInSeconds": 44.21,
                    "Word": "yeah"
                  },
                  {
                    "Duration": 2800000,
                    "DurationInSeconds": 0.28,
                    "Offset": 444300000,
                    "OffsetInSeconds": 44.43,
                    "Word": "that'll"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 447200000,
                    "OffsetInSeconds": 44.72,
                    "Word": "be"
                  },
                  {
                    "Duration": 2400000,
                    "DurationInSeconds": 0.24,
                    "Offset": 448300000,
                    "OffsetInSeconds": 44.83,
                    "Word": "fine"
                  }
                ]
              }
            ],
            "Offset": 442100000,
            "OffsetInSeconds": 44.21,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Sure. So it's 234554 and then 9312.",
            "Duration": 78100000,
            "DurationInSeconds": 7.81,
            "Id": "8bf14bdfd5dd414287b80dc2311b887d",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.90915877,
                "Display": "Sure. So it's 234554 and then 9312.",
                "ITN": "sure so it's 234554 and then 9312",
                "Lexical": "sure so it's two three four five five four and then nine three one two",
                "MaskedITN": "sure so it's 234554 and then 9312",
                "Words": [
                  {
                    "Duration": 4300000,
                    "DurationInSeconds": 0.43,
                    "Offset": 462000000,
                    "OffsetInSeconds": 46.2,
                    "Word": "sure"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 466400000,
                    "OffsetInSeconds": 46.64,
                    "Word": "so"
                  },
                  {
                    "Duration": 4300000,
                    "DurationInSeconds": 0.43,
                    "Offset": 468600000,
                    "OffsetInSeconds": 46.86,
                    "Word": "it's"
                  },
                  {
                    "Duration": 4900000,
                    "DurationInSeconds": 0.49,
                    "Offset": 473600000,
                    "OffsetInSeconds": 47.36,
                    "Word": "two"
                  },
                  {
                    "Duration": 5700000,
                    "DurationInSeconds": 0.57,
                    "Offset": 478600000,
                    "OffsetInSeconds": 47.86,
                    "Word": "three"
                  },
                  {
                    "Duration": 5700000,
                    "DurationInSeconds": 0.57,
                    "Offset": 484400000,
                    "OffsetInSeconds": 48.44,
                    "Word": "four"
                  },
                  {
                    "Duration": 5900000,
                    "DurationInSeconds": 0.59,
                    "Offset": 494800000,
                    "OffsetInSeconds": 49.48,
                    "Word": "five"
                  },
                  {
                    "Duration": 4700000,
                    "DurationInSeconds": 0.47,
                    "Offset": 500800000,
                    "OffsetInSeconds": 50.08,
                    "Word": "five"
                  },
                  {
                    "Duration": 6700000,
                    "DurationInSeconds": 0.67,
                    "Offset": 505600000,
                    "OffsetInSeconds": 50.56,
                    "Word": "four"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 513000000,
                    "OffsetInSeconds": 51.3,
                    "Word": "and"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 514600000,
                    "OffsetInSeconds": 51.46,
                    "Word": "then"
                  },
                  {
                    "Duration": 5000000,
                    "DurationInSeconds": 0.5,
                    "Offset": 516400000,
                    "OffsetInSeconds": 51.64,
                    "Word": "nine"
                  },
                  {
                    "Duration": 5600000,
                    "DurationInSeconds": 0.56,
                    "Offset": 521500000,
                    "OffsetInSeconds": 52.15,
                    "Word": "three"
                  },
                  {
                    "Duration": 5500000,
                    "DurationInSeconds": 0.55,
                    "Offset": 527600000,
                    "OffsetInSeconds": 52.76,
                    "Word": "one"
                  },
                  {
                    "Duration": 5900000,
                    "DurationInSeconds": 0.59,
                    "Offset": 534200000,
                    "OffsetInSeconds": 53.42,
                    "Word": "two"
                  }
                ]
              }
            ],
            "Offset": 462000000,
            "OffsetInSeconds": 46.2,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "To confirm, it's 234-554-9312.",
            "Duration": 37600000,
            "DurationInSeconds": 3.76,
            "Id": "08d281a2ecff4525a282f838e535ff07",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.87858343,
                "Display": "To confirm, it's 234-554-9312.",
                "ITN": "to confirm it's 234-554-9312",
                "Lexical": "to confirm it's two three four five five four nine three one two",
                "MaskedITN": "to confirm it's 234-554-9312",
                "Words": [
                  {
                    "Duration": 2800000,
                    "DurationInSeconds": 0.28,
                    "Offset": 552500000,
                    "OffsetInSeconds": 55.25,
                    "Word": "to"
                  },
                  {
                    "Duration": 5000000,
                    "DurationInSeconds": 0.5,
                    "Offset": 555400000,
                    "OffsetInSeconds": 55.54,
                    "Word": "confirm"
                  },
                  {
                    "Duration": 3400000,
                    "DurationInSeconds": 0.34,
                    "Offset": 560500000,
                    "OffsetInSeconds": 56.05,
                    "Word": "it's"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 564500000,
                    "OffsetInSeconds": 56.45,
                    "Word": "two"
                  },
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 566100000,
                    "OffsetInSeconds": 56.61,
                    "Word": "three"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 568500000,
                    "OffsetInSeconds": 56.85,
                    "Word": "four"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 572300000,
                    "OffsetInSeconds": 57.23,
                    "Word": "five"
                  },
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 575100000,
                    "OffsetInSeconds": 57.51,
                    "Word": "five"
                  },
                  {
                    "Duration": 4300000,
                    "DurationInSeconds": 0.43,
                    "Offset": 577500000,
                    "OffsetInSeconds": 57.75,
                    "Word": "four"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 581900000,
                    "OffsetInSeconds": 58.19,
                    "Word": "nine"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 583900000,
                    "OffsetInSeconds": 58.39,
                    "Word": "three"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 585900000,
                    "OffsetInSeconds": 58.59,
                    "Word": "one"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 587400000,
                    "OffsetInSeconds": 58.74,
                    "Word": "two"
                  }
                ]
              }
            ],
            "Offset": 552500000,
            "OffsetInSeconds": 55.25,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Yep, that's right.",
            "Duration": 7900000,
            "DurationInSeconds": 0.79,
            "Id": "32523e408dc64202b8a9469fbef7f997",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.84051096,
                "Display": "Yep, that's right.",
                "ITN": "yep that's right",
                "Lexical": "yep that's right",
                "MaskedITN": "yep that's right",
                "Words": [
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 600400000,
                    "OffsetInSeconds": 60.04,
                    "Word": "yep"
                  },
                  {
                    "Duration": 2600000,
                    "DurationInSeconds": 0.26,
                    "Offset": 602800000,
                    "OffsetInSeconds": 60.28,
                    "Word": "that's"
                  },
                  {
                    "Duration": 2800000,
                    "DurationInSeconds": 0.28,
                    "Offset": 605500000,
                    "OffsetInSeconds": 60.55,
                    "Word": "right"
                  }
                ]
              }
            ],
            "Offset": 600400000,
            "OffsetInSeconds": 60.04,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Excellent. Uh, Let's get some additional information from your app. For your application, Uh, do you have a job?",
            "Duration": 55500000,
            "DurationInSeconds": 5.55,
            "Id": "51b370d1e39b4f8db8eab924e09ab414",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8298998,
                "Display": "Excellent. Uh, Let's get some additional information from your app. For your application, Uh, do you have a job?",
                "ITN": "excellent uh let's get some additional information from your app for your application uh do you have a job",
                "Lexical": "excellent uh let's get some additional information from your app for your application uh do you have a job",
                "MaskedITN": "excellent uh let's get some additional information from your app for your application uh do you have a job",
                "Words": [
                  {
                    "Duration": 7900000,
                    "DurationInSeconds": 0.79,
                    "Offset": 616600000,
                    "OffsetInSeconds": 61.66,
                    "Word": "excellent"
                  },
                  {
                    "Duration": 2600000,
                    "DurationInSeconds": 0.26,
                    "Offset": 625600000,
                    "OffsetInSeconds": 62.56,
                    "Word": "uh"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 628300000,
                    "OffsetInSeconds": 62.83,
                    "Word": "let's"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 630300000,
                    "OffsetInSeconds": 63.03,
                    "Word": "get"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 631400000,
                    "OffsetInSeconds": 63.14,
                    "Word": "some"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 632800000,
                    "OffsetInSeconds": 63.28,
                    "Word": "additional"
                  },
                  {
                    "Duration": 4700000,
                    "DurationInSeconds": 0.47,
                    "Offset": 636600000,
                    "OffsetInSeconds": 63.66,
                    "Word": "information"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 641400000,
                    "OffsetInSeconds": 64.14,
                    "Word": "from"
                  },
                  {
                    "Duration": 1600000,
                    "DurationInSeconds": 0.16,
                    "Offset": 643000000,
                    "OffsetInSeconds": 64.3,
                    "Word": "your"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 644700000,
                    "OffsetInSeconds": 64.47,
                    "Word": "app"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 647800000,
                    "OffsetInSeconds": 64.78,
                    "Word": "for"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 649600000,
                    "OffsetInSeconds": 64.96,
                    "Word": "your"
                  },
                  {
                    "Duration": 8100000,
                    "DurationInSeconds": 0.81,
                    "Offset": 651100000,
                    "OffsetInSeconds": 65.11,
                    "Word": "application"
                  },
                  {
                    "Duration": 4300000,
                    "DurationInSeconds": 0.43,
                    "Offset": 659800000,
                    "OffsetInSeconds": 65.98,
                    "Word": "uh"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 664200000,
                    "OffsetInSeconds": 66.42,
                    "Word": "do"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 665500000,
                    "OffsetInSeconds": 66.55,
                    "Word": "you"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 666700000,
                    "OffsetInSeconds": 66.67,
                    "Word": "have"
                  },
                  {
                    "Duration": 600000,
                    "DurationInSeconds": 0.06,
                    "Offset": 668300000,
                    "OffsetInSeconds": 66.83,
                    "Word": "a"
                  },
                  {
                    "Duration": 3100000,
                    "DurationInSeconds": 0.31,
                    "Offset": 669000000,
                    "OffsetInSeconds": 66.9,
                    "Word": "job"
                  }
                ]
              }
            ],
            "Offset": 616600000,
            "OffsetInSeconds": 61.66,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Uh, yes, I am self-employed.",
            "Duration": 15400000,
            "DurationInSeconds": 1.54,
            "Id": "447874acd03e403f9e4a3a4e48562dfe",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8887469,
                "Display": "Uh, yes, I am self-employed.",
                "ITN": "uh yes i am self employed",
                "Lexical": "uh yes i am self employed",
                "MaskedITN": "uh yes i am self-employed",
                "Words": [
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 684600000,
                    "OffsetInSeconds": 68.46,
                    "Word": "uh"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 687600000,
                    "OffsetInSeconds": 68.76,
                    "Word": "yes"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 690400000,
                    "OffsetInSeconds": 69.04,
                    "Word": "i"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 692400000,
                    "OffsetInSeconds": 69.24,
                    "Word": "am"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 693800000,
                    "OffsetInSeconds": 69.38,
                    "Word": "self"
                  },
                  {
                    "Duration": 3900000,
                    "DurationInSeconds": 0.39,
                    "Offset": 696100000,
                    "OffsetInSeconds": 69.61,
                    "Word": "employed"
                  }
                ]
              }
            ],
            "Offset": 684600000,
            "OffsetInSeconds": 68.46,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "OK, So then you have a Social Security number as well? Uh, yes, I do.",
            "Duration": 40500000,
            "DurationInSeconds": 4.05,
            "Id": "24baf0968bb54af49866198db3d95448",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.88624966,
                "Display": "OK, So then you have a Social Security number as well? Uh, yes, I do.",
                "ITN": "OK so then you have a social security number as well uh yes i do",
                "Lexical": "OK so then you have a social security number as well uh yes i do",
                "MaskedITN": "ok so then you have a social security number as well uh yes i do",
                "Words": [
                  {
                    "Duration": 4200000,
                    "DurationInSeconds": 0.42,
                    "Offset": 711900000,
                    "OffsetInSeconds": 71.19,
                    "Word": "OK"
                  },
                  {
                    "Duration": 1600000,
                    "DurationInSeconds": 0.16,
                    "Offset": 716600000,
                    "OffsetInSeconds": 71.66,
                    "Word": "so"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 718300000,
                    "OffsetInSeconds": 71.83,
                    "Word": "then"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 719900000,
                    "OffsetInSeconds": 71.99,
                    "Word": "you"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 721100000,
                    "OffsetInSeconds": 72.11,
                    "Word": "have"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 722900000,
                    "OffsetInSeconds": 72.29,
                    "Word": "a"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 723700000,
                    "OffsetInSeconds": 72.37,
                    "Word": "social"
                  },
                  {
                    "Duration": 3300000,
                    "DurationInSeconds": 0.33,
                    "Offset": 726700000,
                    "OffsetInSeconds": 72.67,
                    "Word": "security"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 730100000,
                    "OffsetInSeconds": 73.01,
                    "Word": "number"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 732300000,
                    "OffsetInSeconds": 73.23,
                    "Word": "as"
                  },
                  {
                    "Duration": 3000000,
                    "DurationInSeconds": 0.3,
                    "Offset": 733400000,
                    "OffsetInSeconds": 73.34,
                    "Word": "well"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 745900000,
                    "OffsetInSeconds": 74.59,
                    "Word": "uh"
                  },
                  {
                    "Duration": 1800000,
                    "DurationInSeconds": 0.18,
                    "Offset": 748200000,
                    "OffsetInSeconds": 74.82,
                    "Word": "yes"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 750100000,
                    "OffsetInSeconds": 75.01,
                    "Word": "i"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 750900000,
                    "OffsetInSeconds": 75.09,
                    "Word": "do"
                  }
                ]
              }
            ],
            "Offset": 711900000,
            "OffsetInSeconds": 71.19,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "OK. And what is your Social Security number please?",
            "Duration": 27300000,
            "DurationInSeconds": 2.73,
            "Id": "e0dcc9a971544146879e6c48652bda94",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.78765213,
                "Display": "OK. And what is your Social Security number please?",
                "ITN": "OK and what is your social security number please",
                "Lexical": "OK and what is your social security number please",
                "MaskedITN": "ok and what is your social security number please",
                "Words": [
                  {
                    "Duration": 3900000,
                    "DurationInSeconds": 0.39,
                    "Offset": 761800000,
                    "OffsetInSeconds": 76.18,
                    "Word": "OK"
                  },
                  {
                    "Duration": 4600000,
                    "DurationInSeconds": 0.46,
                    "Offset": 766300000,
                    "OffsetInSeconds": 76.63,
                    "Word": "and"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 771000000,
                    "OffsetInSeconds": 77.1,
                    "Word": "what"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 772800000,
                    "OffsetInSeconds": 77.28,
                    "Word": "is"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 774100000,
                    "OffsetInSeconds": 77.41,
                    "Word": "your"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 775600000,
                    "OffsetInSeconds": 77.56,
                    "Word": "social"
                  },
                  {
                    "Duration": 3300000,
                    "DurationInSeconds": 0.33,
                    "Offset": 778600000,
                    "OffsetInSeconds": 77.86,
                    "Word": "security"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 782000000,
                    "OffsetInSeconds": 78.2,
                    "Word": "number"
                  },
                  {
                    "Duration": 4500000,
                    "DurationInSeconds": 0.45,
                    "Offset": 784600000,
                    "OffsetInSeconds": 78.46,
                    "Word": "please"
                  }
                ]
              }
            ],
            "Offset": 761800000,
            "OffsetInSeconds": 76.18,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Uh, sure. So it's 412.",
            "Duration": 25300000,
            "DurationInSeconds": 2.53,
            "Id": "bc3a219e4d7c46c1a3336d47e87f241f",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.9004568,
                "Display": "Uh, sure. So it's 412.",
                "ITN": "uh sure so it's 412",
                "Lexical": "uh sure so it's four one two",
                "MaskedITN": "uh sure so it's 412",
                "Words": [
                  {
                    "Duration": 3000000,
                    "DurationInSeconds": 0.3,
                    "Offset": 798700000,
                    "OffsetInSeconds": 79.87,
                    "Word": "uh"
                  },
                  {
                    "Duration": 3800000,
                    "DurationInSeconds": 0.38,
                    "Offset": 801800000,
                    "OffsetInSeconds": 80.18,
                    "Word": "sure"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 805700000,
                    "OffsetInSeconds": 80.57,
                    "Word": "so"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 807900000,
                    "OffsetInSeconds": 80.79,
                    "Word": "it's"
                  },
                  {
                    "Duration": 4100000,
                    "DurationInSeconds": 0.41,
                    "Offset": 812300000,
                    "OffsetInSeconds": 81.23,
                    "Word": "four"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 816500000,
                    "OffsetInSeconds": 81.65,
                    "Word": "one"
                  },
                  {
                    "Duration": 4500000,
                    "DurationInSeconds": 0.45,
                    "Offset": 819500000,
                    "OffsetInSeconds": 81.95,
                    "Word": "two"
                  }
                ]
              }
            ],
            "Offset": 798700000,
            "OffsetInSeconds": 79.87,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Uh 256789.",
            "Duration": 31100000,
            "DurationInSeconds": 3.11,
            "Id": "32edb4a45c244b9cb9c267d27df11d21",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.9063664,
                "Display": "Uh 256789.",
                "ITN": "uh 256789",
                "Lexical": "uh two five six seven eight nine",
                "MaskedITN": "uh 256789",
                "Words": [
                  {
                    "Duration": 2600000,
                    "DurationInSeconds": 0.26,
                    "Offset": 830500000,
                    "OffsetInSeconds": 83.05,
                    "Word": "uh"
                  },
                  {
                    "Duration": 2600000,
                    "DurationInSeconds": 0.26,
                    "Offset": 833200000,
                    "OffsetInSeconds": 83.32,
                    "Word": "two"
                  },
                  {
                    "Duration": 9400000,
                    "DurationInSeconds": 0.94,
                    "Offset": 835900000,
                    "OffsetInSeconds": 83.59,
                    "Word": "five"
                  },
                  {
                    "Duration": 3500000,
                    "DurationInSeconds": 0.35,
                    "Offset": 848000000,
                    "OffsetInSeconds": 84.8,
                    "Word": "six"
                  },
                  {
                    "Duration": 4100000,
                    "DurationInSeconds": 0.41,
                    "Offset": 851600000,
                    "OffsetInSeconds": 85.16,
                    "Word": "seven"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 855800000,
                    "OffsetInSeconds": 85.58,
                    "Word": "eight"
                  },
                  {
                    "Duration": 3600000,
                    "DurationInSeconds": 0.36,
                    "Offset": 858000000,
                    "OffsetInSeconds": 85.8,
                    "Word": "nine"
                  }
                ]
              }
            ],
            "Offset": 830500000,
            "OffsetInSeconds": 83.05,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Sorry, what was that? A25 or A225 you cut out for a bit?",
            "Duration": 38700000,
            "DurationInSeconds": 3.87,
            "Id": "fc07e31ff8224d8cb26dff91973fdaed",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8620278,
                "Display": "Sorry, what was that? A25 or A225 you cut out for a bit?",
                "ITN": "sorry what was that A25 or A225 you cut out for a bit",
                "Lexical": "sorry what was that a two five or a two two five you cut out for a bit",
                "MaskedITN": "sorry what was that a25 or a225 you cut out for a bit",
                "Words": [
                  {
                    "Duration": 3000000,
                    "DurationInSeconds": 0.3,
                    "Offset": 871500000,
                    "OffsetInSeconds": 87.15,
                    "Word": "sorry"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 874600000,
                    "OffsetInSeconds": 87.46,
                    "Word": "what"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 876100000,
                    "OffsetInSeconds": 87.61,
                    "Word": "was"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 877400000,
                    "OffsetInSeconds": 87.74,
                    "Word": "that"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 878900000,
                    "OffsetInSeconds": 87.89,
                    "Word": "a"
                  },
                  {
                    "Duration": 2000000,
                    "DurationInSeconds": 0.2,
                    "Offset": 879700000,
                    "OffsetInSeconds": 87.97,
                    "Word": "two"
                  },
                  {
                    "Duration": 3800000,
                    "DurationInSeconds": 0.38,
                    "Offset": 881800000,
                    "OffsetInSeconds": 88.18,
                    "Word": "five"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 885700000,
                    "OffsetInSeconds": 88.57,
                    "Word": "or"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 886900000,
                    "OffsetInSeconds": 88.69,
                    "Word": "a"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 887900000,
                    "OffsetInSeconds": 88.79,
                    "Word": "two"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 890900000,
                    "OffsetInSeconds": 89.09,
                    "Word": "two"
                  },
                  {
                    "Duration": 4800000,
                    "DurationInSeconds": 0.48,
                    "Offset": 893200000,
                    "OffsetInSeconds": 89.32,
                    "Word": "five"
                  },
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 898100000,
                    "OffsetInSeconds": 89.81,
                    "Word": "you"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 900500000,
                    "OffsetInSeconds": 90.05,
                    "Word": "cut"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 902300000,
                    "OffsetInSeconds": 90.23,
                    "Word": "out"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 903500000,
                    "OffsetInSeconds": 90.35,
                    "Word": "for"
                  },
                  {
                    "Duration": 500000,
                    "DurationInSeconds": 0.05,
                    "Offset": 904700000,
                    "OffsetInSeconds": 90.47,
                    "Word": "a"
                  },
                  {
                    "Duration": 4900000,
                    "DurationInSeconds": 0.49,
                    "Offset": 905300000,
                    "OffsetInSeconds": 90.53,
                    "Word": "bit"
                  }
                ]
              }
            ],
            "Offset": 871500000,
            "OffsetInSeconds": 87.15,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Uh, it's 22 so.",
            "Duration": 15200000,
            "DurationInSeconds": 1.52,
            "Id": "5091c7f4da604d159d61407e04ca0bbd",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8091366,
                "Display": "Uh, it's 22 so.",
                "ITN": "uh it's 22 so",
                "Lexical": "uh it's double two so",
                "MaskedITN": "uh it's 22 so",
                "Words": [
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 920100000,
                    "OffsetInSeconds": 92.01,
                    "Word": "uh"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 922300000,
                    "OffsetInSeconds": 92.23,
                    "Word": "it's"
                  },
                  {
                    "Duration": 3000000,
                    "DurationInSeconds": 0.3,
                    "Offset": 924100000,
                    "OffsetInSeconds": 92.41,
                    "Word": "double"
                  },
                  {
                    "Duration": 3400000,
                    "DurationInSeconds": 0.34,
                    "Offset": 927200000,
                    "OffsetInSeconds": 92.72,
                    "Word": "two"
                  },
                  {
                    "Duration": 4600000,
                    "DurationInSeconds": 0.46,
                    "Offset": 930700000,
                    "OffsetInSeconds": 93.07,
                    "Word": "so"
                  }
                ]
              }
            ],
            "Offset": 920100000,
            "OffsetInSeconds": 92.01,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "412, then another two, then 5.",
            "Duration": 28900000,
            "DurationInSeconds": 2.89,
            "Id": "b97fcc57b2f240d985ac249040c8ab76",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8289541,
                "Display": "412, then another two, then 5.",
                "ITN": "412 then another two then 5",
                "Lexical": "four one two then another two then five",
                "MaskedITN": "412 then another two then 5",
                "Words": [
                  {
                    "Duration": 4100000,
                    "DurationInSeconds": 0.41,
                    "Offset": 946500000,
                    "OffsetInSeconds": 94.65,
                    "Word": "four"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 950700000,
                    "OffsetInSeconds": 95.07,
                    "Word": "one"
                  },
                  {
                    "Duration": 4300000,
                    "DurationInSeconds": 0.43,
                    "Offset": 953700000,
                    "OffsetInSeconds": 95.37,
                    "Word": "two"
                  },
                  {
                    "Duration": 1600000,
                    "DurationInSeconds": 0.16,
                    "Offset": 958600000,
                    "OffsetInSeconds": 95.86,
                    "Word": "then"
                  },
                  {
                    "Duration": 3300000,
                    "DurationInSeconds": 0.33,
                    "Offset": 960300000,
                    "OffsetInSeconds": 96.03,
                    "Word": "another"
                  },
                  {
                    "Duration": 4300000,
                    "DurationInSeconds": 0.43,
                    "Offset": 963700000,
                    "OffsetInSeconds": 96.37,
                    "Word": "two"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 968700000,
                    "OffsetInSeconds": 96.87,
                    "Word": "then"
                  },
                  {
                    "Duration": 4100000,
                    "DurationInSeconds": 0.41,
                    "Offset": 971300000,
                    "OffsetInSeconds": 97.13,
                    "Word": "five"
                  }
                ]
              }
            ],
            "Offset": 946500000,
            "OffsetInSeconds": 94.65,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Hey, thank you so much and could I have your e-mail address please?",
            "Duration": 45600000,
            "DurationInSeconds": 4.56,
            "Id": "56a26fb06400486bb9cb11d83f1a7e09",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.9234662,
                "Display": "Hey, thank you so much and could I have your e-mail address please?",
                "ITN": "hey thank you so much and could i have your email address please",
                "Lexical": "hey thank you so much and could i have your email address please",
                "MaskedITN": "hey thank you so much and could i have your e-mail address please",
                "Words": [
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 985400000,
                    "OffsetInSeconds": 98.54,
                    "Word": "hey"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 987400000,
                    "OffsetInSeconds": 98.74,
                    "Word": "thank"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 989600000,
                    "OffsetInSeconds": 98.96,
                    "Word": "you"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 990800000,
                    "OffsetInSeconds": 99.08,
                    "Word": "so"
                  },
                  {
                    "Duration": 5100000,
                    "DurationInSeconds": 0.51,
                    "Offset": 992200000,
                    "OffsetInSeconds": 99.22,
                    "Word": "much"
                  },
                  {
                    "Duration": 4500000,
                    "DurationInSeconds": 0.45,
                    "Offset": 1003400000,
                    "OffsetInSeconds": 100.34,
                    "Word": "and"
                  },
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 1008400000,
                    "OffsetInSeconds": 100.84,
                    "Word": "could"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1010800000,
                    "OffsetInSeconds": 101.08,
                    "Word": "i"
                  },
                  {
                    "Duration": 5700000,
                    "DurationInSeconds": 0.57,
                    "Offset": 1012200000,
                    "OffsetInSeconds": 101.22,
                    "Word": "have"
                  },
                  {
                    "Duration": 3900000,
                    "DurationInSeconds": 0.39,
                    "Offset": 1018000000,
                    "OffsetInSeconds": 101.8,
                    "Word": "your"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 1022000000,
                    "OffsetInSeconds": 102.2,
                    "Word": "email"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 1024600000,
                    "OffsetInSeconds": 102.46,
                    "Word": "address"
                  },
                  {
                    "Duration": 3400000,
                    "DurationInSeconds": 0.34,
                    "Offset": 1027600000,
                    "OffsetInSeconds": 102.76,
                    "Word": "please"
                  }
                ]
              }
            ],
            "Offset": 985400000,
            "OffsetInSeconds": 98.54,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Yeah, it's Mary rondo@gmail.com, so myfirstandlastname@gmail.com. No periods, no dashes.",
            "Duration": 70500000,
            "DurationInSeconds": 7.05,
            "Id": "05b846edf3b74319860f2d7e2748664d",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8374854,
                "Display": "Yeah, it's Mary rondo@gmail.com, so myfirstandlastname@gmail.com. No periods, no dashes.",
                "ITN": "yeah it's mary rondo@gmail.com so myfirstandlastname@gmail.com no periods no dashes",
                "Lexical": "yeah it's mary rondo at gmail dot com so my first and last name at gmail dot com no periods no dashes",
                "MaskedITN": "yeah it's mary rondo@gmail.com so myfirstandlastname@gmail.com no periods no dashes",
                "Words": [
                  {
                    "Duration": 3500000,
                    "DurationInSeconds": 0.35,
                    "Offset": 1043300000,
                    "OffsetInSeconds": 104.33,
                    "Word": "yeah"
                  },
                  {
                    "Duration": 1800000,
                    "DurationInSeconds": 0.18,
                    "Offset": 1046900000,
                    "OffsetInSeconds": 104.69,
                    "Word": "it's"
                  },
                  {
                    "Duration": 6200000,
                    "DurationInSeconds": 0.62,
                    "Offset": 1048800000,
                    "OffsetInSeconds": 104.88,
                    "Word": "mary"
                  },
                  {
                    "Duration": 7300000,
                    "DurationInSeconds": 0.73,
                    "Offset": 1055100000,
                    "OffsetInSeconds": 105.51,
                    "Word": "rondo"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 1062500000,
                    "OffsetInSeconds": 106.25,
                    "Word": "at"
                  },
                  {
                    "Duration": 3500000,
                    "DurationInSeconds": 0.35,
                    "Offset": 1065100000,
                    "OffsetInSeconds": 106.51,
                    "Word": "gmail"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 1068700000,
                    "OffsetInSeconds": 106.87,
                    "Word": "dot"
                  },
                  {
                    "Duration": 4500000,
                    "DurationInSeconds": 0.45,
                    "Offset": 1070700000,
                    "OffsetInSeconds": 107.07,
                    "Word": "com"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 1075900000,
                    "OffsetInSeconds": 107.59,
                    "Word": "so"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1077700000,
                    "OffsetInSeconds": 107.77,
                    "Word": "my"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 1079100000,
                    "OffsetInSeconds": 107.91,
                    "Word": "first"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 1081900000,
                    "OffsetInSeconds": 108.19,
                    "Word": "and"
                  },
                  {
                    "Duration": 1800000,
                    "DurationInSeconds": 0.18,
                    "Offset": 1083200000,
                    "OffsetInSeconds": 108.32,
                    "Word": "last"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 1085100000,
                    "OffsetInSeconds": 108.51,
                    "Word": "name"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 1087300000,
                    "OffsetInSeconds": 108.73,
                    "Word": "at"
                  },
                  {
                    "Duration": 3100000,
                    "DurationInSeconds": 0.31,
                    "Offset": 1089300000,
                    "OffsetInSeconds": 108.93,
                    "Word": "gmail"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1092500000,
                    "OffsetInSeconds": 109.25,
                    "Word": "dot"
                  },
                  {
                    "Duration": 3100000,
                    "DurationInSeconds": 0.31,
                    "Offset": 1094100000,
                    "OffsetInSeconds": 109.41,
                    "Word": "com"
                  },
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 1097700000,
                    "OffsetInSeconds": 109.77,
                    "Word": "no"
                  },
                  {
                    "Duration": 5300000,
                    "DurationInSeconds": 0.53,
                    "Offset": 1100100000,
                    "OffsetInSeconds": 110.01,
                    "Word": "periods"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 1105900000,
                    "OffsetInSeconds": 110.59,
                    "Word": "no"
                  },
                  {
                    "Duration": 5900000,
                    "DurationInSeconds": 0.59,
                    "Offset": 1107900000,
                    "OffsetInSeconds": 110.79,
                    "Word": "dashes"
                  }
                ]
              }
            ],
            "Offset": 1043300000,
            "OffsetInSeconds": 104.33,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Great. Uh, that is the last question. So let me take your information and I'll be able to get you signed up right away. Thank you for calling Contoso and I'll be able to get you signed up immediately. One of our agents will call you back in about 24 hours or so to confirm.",
            "Duration": 141800000,
            "DurationInSeconds": 14.18,
            "Id": "9e81baaa79e64e47ab3e664fce0b0df2",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8403224,
                "Display": "Great. Uh, that is the last question. So let me take your information and I'll be able to get you signed up right away. Thank you for calling Contoso and I'll be able to get you signed up immediately. One of our agents will call you back in about 24 hours or so to confirm.",
                "ITN": "great uh that is the last question so let me take your information and i'll be able to get you signed up right away thank you for calling contoso and i'll be able to get you signed up immediately one of our agents will call you back in about 24 hours or so to confirm",
                "Lexical": "great uh that is the last question so let me take your information and i'll be able to get you signed up right away thank you for calling contoso and i'll be able to get you signed up immediately one of our agents will call you back in about twenty four hours or so to confirm",
                "MaskedITN": "great uh that is the last question so let me take your information and i'll be able to get you signed up right away thank you for calling contoso and i'll be able to get you signed up immediately one of our agents will call you back in about 24 hours or so to confirm",
                "Words": [
                  {
                    "Duration": 4000000,
                    "DurationInSeconds": 0.4,
                    "Offset": 1128000000,
                    "OffsetInSeconds": 112.8,
                    "Word": "great"
                  },
                  {
                    "Duration": 5700000,
                    "DurationInSeconds": 0.57,
                    "Offset": 1132400000,
                    "OffsetInSeconds": 113.24,
                    "Word": "uh"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 1138200000,
                    "OffsetInSeconds": 113.82,
                    "Word": "that"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 1140800000,
                    "OffsetInSeconds": 114.08,
                    "Word": "is"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 1142800000,
                    "OffsetInSeconds": 114.28,
                    "Word": "the"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 1144800000,
                    "OffsetInSeconds": 114.48,
                    "Word": "last"
                  },
                  {
                    "Duration": 3900000,
                    "DurationInSeconds": 0.39,
                    "Offset": 1147400000,
                    "OffsetInSeconds": 114.74,
                    "Word": "question"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 1151400000,
                    "OffsetInSeconds": 115.14,
                    "Word": "so"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1154400000,
                    "OffsetInSeconds": 115.44,
                    "Word": "let"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 1156000000,
                    "OffsetInSeconds": 115.6,
                    "Word": "me"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 1158200000,
                    "OffsetInSeconds": 115.82,
                    "Word": "take"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1159700000,
                    "OffsetInSeconds": 115.97,
                    "Word": "your"
                  },
                  {
                    "Duration": 6400000,
                    "DurationInSeconds": 0.64,
                    "Offset": 1161300000,
                    "OffsetInSeconds": 116.13,
                    "Word": "information"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 1167800000,
                    "OffsetInSeconds": 116.78,
                    "Word": "and"
                  },
                  {
                    "Duration": 1600000,
                    "DurationInSeconds": 0.16,
                    "Offset": 1169100000,
                    "OffsetInSeconds": 116.91,
                    "Word": "i'll"
                  },
                  {
                    "Duration": 5300000,
                    "DurationInSeconds": 0.53,
                    "Offset": 1170800000,
                    "OffsetInSeconds": 117.08,
                    "Word": "be"
                  },
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 1176600000,
                    "OffsetInSeconds": 117.66,
                    "Word": "able"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 1179000000,
                    "OffsetInSeconds": 117.9,
                    "Word": "to"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 1179800000,
                    "OffsetInSeconds": 117.98,
                    "Word": "get"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 1181100000,
                    "OffsetInSeconds": 118.11,
                    "Word": "you"
                  },
                  {
                    "Duration": 2400000,
                    "DurationInSeconds": 0.24,
                    "Offset": 1182200000,
                    "OffsetInSeconds": 118.22,
                    "Word": "signed"
                  },
                  {
                    "Duration": 800000,
                    "DurationInSeconds": 0.08,
                    "Offset": 1184700000,
                    "OffsetInSeconds": 118.47,
                    "Word": "up"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 1185600000,
                    "OffsetInSeconds": 118.56,
                    "Word": "right"
                  },
                  {
                    "Duration": 3500000,
                    "DurationInSeconds": 0.35,
                    "Offset": 1187600000,
                    "OffsetInSeconds": 118.76,
                    "Word": "away"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 1193600000,
                    "OffsetInSeconds": 119.36,
                    "Word": "thank"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 1196400000,
                    "OffsetInSeconds": 119.64,
                    "Word": "you"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1197700000,
                    "OffsetInSeconds": 119.77,
                    "Word": "for"
                  },
                  {
                    "Duration": 4400000,
                    "DurationInSeconds": 0.44,
                    "Offset": 1199100000,
                    "OffsetInSeconds": 119.91,
                    "Word": "calling"
                  },
                  {
                    "Duration": 6900000,
                    "DurationInSeconds": 0.69,
                    "Offset": 1204200000,
                    "OffsetInSeconds": 120.42,
                    "Word": "contoso"
                  },
                  {
                    "Duration": 3900000,
                    "DurationInSeconds": 0.39,
                    "Offset": 1211200000,
                    "OffsetInSeconds": 121.12,
                    "Word": "and"
                  },
                  {
                    "Duration": 1800000,
                    "DurationInSeconds": 0.18,
                    "Offset": 1215800000,
                    "OffsetInSeconds": 121.58,
                    "Word": "i'll"
                  },
                  {
                    "Duration": 800000,
                    "DurationInSeconds": 0.08,
                    "Offset": 1217700000,
                    "OffsetInSeconds": 121.77,
                    "Word": "be"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 1218600000,
                    "OffsetInSeconds": 121.86,
                    "Word": "able"
                  },
                  {
                    "Duration": 600000,
                    "DurationInSeconds": 0.06,
                    "Offset": 1220100000,
                    "OffsetInSeconds": 122.01,
                    "Word": "to"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 1220800000,
                    "OffsetInSeconds": 122.08,
                    "Word": "get"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 1222000000,
                    "OffsetInSeconds": 122.2,
                    "Word": "you"
                  },
                  {
                    "Duration": 1800000,
                    "DurationInSeconds": 0.18,
                    "Offset": 1223100000,
                    "OffsetInSeconds": 122.31,
                    "Word": "signed"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 1225000000,
                    "OffsetInSeconds": 122.5,
                    "Word": "up"
                  },
                  {
                    "Duration": 8300000,
                    "DurationInSeconds": 0.83,
                    "Offset": 1226000000,
                    "OffsetInSeconds": 122.6,
                    "Word": "immediately"
                  },
                  {
                    "Duration": 3300000,
                    "DurationInSeconds": 0.33,
                    "Offset": 1234800000,
                    "OffsetInSeconds": 123.48,
                    "Word": "one"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 1238200000,
                    "OffsetInSeconds": 123.82,
                    "Word": "of"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1239000000,
                    "OffsetInSeconds": 123.9,
                    "Word": "our"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 1240400000,
                    "OffsetInSeconds": 124.04,
                    "Word": "agents"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 1243400000,
                    "OffsetInSeconds": 124.34,
                    "Word": "will"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 1245600000,
                    "OffsetInSeconds": 124.56,
                    "Word": "call"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 1247400000,
                    "OffsetInSeconds": 124.74,
                    "Word": "you"
                  },
                  {
                    "Duration": 3100000,
                    "DurationInSeconds": 0.31,
                    "Offset": 1248600000,
                    "OffsetInSeconds": 124.86,
                    "Word": "back"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 1251800000,
                    "OffsetInSeconds": 125.18,
                    "Word": "in"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 1252800000,
                    "OffsetInSeconds": 125.28,
                    "Word": "about"
                  },
                  {
                    "Duration": 2400000,
                    "DurationInSeconds": 0.24,
                    "Offset": 1255000000,
                    "OffsetInSeconds": 125.5,
                    "Word": "twenty"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1257500000,
                    "OffsetInSeconds": 125.75,
                    "Word": "four"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 1259100000,
                    "OffsetInSeconds": 125.91,
                    "Word": "hours"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 1261400000,
                    "OffsetInSeconds": 126.14,
                    "Word": "or"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 1262600000,
                    "OffsetInSeconds": 126.26,
                    "Word": "so"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1265200000,
                    "OffsetInSeconds": 126.52,
                    "Word": "to"
                  },
                  {
                    "Duration": 3200000,
                    "DurationInSeconds": 0.32,
                    "Offset": 1266600000,
                    "OffsetInSeconds": 126.66,
                    "Word": "confirm"
                  }
                ]
              }
            ],
            "Offset": 1128000000,
            "OffsetInSeconds": 112.8,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Application.",
            "Duration": 5700000,
            "DurationInSeconds": 0.57,
            "Id": "8c0ecbc08f2240409ab8f6885a61fa44",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.82610345,
                "Display": "Application.",
                "ITN": "application",
                "Lexical": "application",
                "MaskedITN": "application",
                "Words": [
                  {
                    "Duration": 5700000,
                    "DurationInSeconds": 0.57,
                    "Offset": 1270700000,
                    "OffsetInSeconds": 127.07,
                    "Word": "application"
                  }
                ]
              }
            ],
            "Offset": 1270700000,
            "OffsetInSeconds": 127.07,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "That sounds great. Thank you.",
            "Duration": 13900000,
            "DurationInSeconds": 1.39,
            "Id": "a42b89f3ce3f4ae59589871ec295b104",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8925631,
                "Display": "That sounds great. Thank you.",
                "ITN": "that sounds great thank you",
                "Lexical": "that sounds great thank you",
                "MaskedITN": "that sounds great thank you",
                "Words": [
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 1286100000,
                    "OffsetInSeconds": 128.61,
                    "Word": "that"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 1288100000,
                    "OffsetInSeconds": 128.81,
                    "Word": "sounds"
                  },
                  {
                    "Duration": 4000000,
                    "DurationInSeconds": 0.4,
                    "Offset": 1290700000,
                    "OffsetInSeconds": 129.07,
                    "Word": "great"
                  },
                  {
                    "Duration": 2400000,
                    "DurationInSeconds": 0.24,
                    "Offset": 1295300000,
                    "OffsetInSeconds": 129.53,
                    "Word": "thank"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 1297800000,
                    "OffsetInSeconds": 129.78,
                    "Word": "you"
                  }
                ]
              }
            ],
            "Offset": 1286100000,
            "OffsetInSeconds": 128.61,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Absolutely. If you need anything else, please give us a call at 1-800-555-5564 ext 123. Thank you very much for calling Contoso.",
            "Duration": 97800000,
            "DurationInSeconds": 9.78,
            "Id": "ad9e9649502d46a7a3773af60a45441f",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8950991,
                "Display": "Absolutely. If you need anything else, please give us a call at 1-800-555-5564 ext 123. Thank you very much for calling Contoso.",
                "ITN": "absolutely if you need anything else please give us a call at 1-800-555-5564 ext 123 thank you very much for calling contoso",
                "Lexical": "absolutely if you need anything else please give us a call at one eight hundred five five five five five six four extension one two three thank you very much for calling contoso",
                "MaskedITN": "absolutely if you need anything else please give us a call at 1-800-555-5564 ext 123 thank you very much for calling contoso",
                "Words": [
                  {
                    "Duration": 7200000,
                    "DurationInSeconds": 0.72,
                    "Offset": 1312700000,
                    "OffsetInSeconds": 131.27,
                    "Word": "absolutely"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 1321100000,
                    "OffsetInSeconds": 132.11,
                    "Word": "if"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 1324100000,
                    "OffsetInSeconds": 132.41,
                    "Word": "you"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 1325200000,
                    "OffsetInSeconds": 132.52,
                    "Word": "need"
                  },
                  {
                    "Duration": 3100000,
                    "DurationInSeconds": 0.31,
                    "Offset": 1326700000,
                    "OffsetInSeconds": 132.67,
                    "Word": "anything"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 1329900000,
                    "OffsetInSeconds": 132.99,
                    "Word": "else"
                  },
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 1331700000,
                    "OffsetInSeconds": 133.17,
                    "Word": "please"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 1334100000,
                    "OffsetInSeconds": 133.41,
                    "Word": "give"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 1335600000,
                    "OffsetInSeconds": 133.56,
                    "Word": "us"
                  },
                  {
                    "Duration": 600000,
                    "DurationInSeconds": 0.06,
                    "Offset": 1336700000,
                    "OffsetInSeconds": 133.67,
                    "Word": "a"
                  },
                  {
                    "Duration": 2400000,
                    "DurationInSeconds": 0.24,
                    "Offset": 1337400000,
                    "OffsetInSeconds": 133.74,
                    "Word": "call"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 1339900000,
                    "OffsetInSeconds": 133.99,
                    "Word": "at"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 1342100000,
                    "OffsetInSeconds": 134.21,
                    "Word": "one"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 1344300000,
                    "OffsetInSeconds": 134.43,
                    "Word": "eight"
                  },
                  {
                    "Duration": 3100000,
                    "DurationInSeconds": 0.31,
                    "Offset": 1346300000,
                    "OffsetInSeconds": 134.63,
                    "Word": "hundred"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 1349500000,
                    "OffsetInSeconds": 134.95,
                    "Word": "five"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 1351300000,
                    "OffsetInSeconds": 135.13,
                    "Word": "five"
                  },
                  {
                    "Duration": 6700000,
                    "DurationInSeconds": 0.67,
                    "Offset": 1353100000,
                    "OffsetInSeconds": 135.31,
                    "Word": "five"
                  },
                  {
                    "Duration": 2600000,
                    "DurationInSeconds": 0.26,
                    "Offset": 1360200000,
                    "OffsetInSeconds": 136.02,
                    "Word": "five"
                  },
                  {
                    "Duration": 4900000,
                    "DurationInSeconds": 0.49,
                    "Offset": 1362900000,
                    "OffsetInSeconds": 136.29,
                    "Word": "five"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 1368300000,
                    "OffsetInSeconds": 136.83,
                    "Word": "six"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 1370900000,
                    "OffsetInSeconds": 137.09,
                    "Word": "four"
                  },
                  {
                    "Duration": 5300000,
                    "DurationInSeconds": 0.53,
                    "Offset": 1375100000,
                    "OffsetInSeconds": 137.51,
                    "Word": "extension"
                  },
                  {
                    "Duration": 1600000,
                    "DurationInSeconds": 0.16,
                    "Offset": 1380500000,
                    "OffsetInSeconds": 138.05,
                    "Word": "one"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 1382200000,
                    "OffsetInSeconds": 138.22,
                    "Word": "two"
                  },
                  {
                    "Duration": 6100000,
                    "DurationInSeconds": 0.61,
                    "Offset": 1383500000,
                    "OffsetInSeconds": 138.35,
                    "Word": "three"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 1391900000,
                    "OffsetInSeconds": 139.19,
                    "Word": "thank"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1394700000,
                    "OffsetInSeconds": 139.47,
                    "Word": "you"
                  },
                  {
                    "Duration": 1600000,
                    "DurationInSeconds": 0.16,
                    "Offset": 1396100000,
                    "OffsetInSeconds": 139.61,
                    "Word": "very"
                  },
                  {
                    "Duration": 3400000,
                    "DurationInSeconds": 0.34,
                    "Offset": 1397800000,
                    "OffsetInSeconds": 139.78,
                    "Word": "much"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1401900000,
                    "OffsetInSeconds": 140.19,
                    "Word": "for"
                  },
                  {
                    "Duration": 2900000,
                    "DurationInSeconds": 0.29,
                    "Offset": 1403500000,
                    "OffsetInSeconds": 140.35,
                    "Word": "calling"
                  },
                  {
                    "Duration": 4000000,
                    "DurationInSeconds": 0.4,
                    "Offset": 1406500000,
                    "OffsetInSeconds": 140.65,
                    "Word": "contoso"
                  }
                ]
              }
            ],
            "Offset": 1312700000,
            "OffsetInSeconds": 131.27,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Uh, actually uh, sorry, one more question.",
            "Duration": 20300000,
            "DurationInSeconds": 2.03,
            "Id": "fff6c21cf7144389a8c47625da408512",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.831093,
                "Display": "Uh, actually uh, sorry, one more question.",
                "ITN": "uh actually uh sorry one more question",
                "Lexical": "uh actually uh sorry one more question",
                "MaskedITN": "uh actually uh sorry one more question",
                "Words": [
                  {
                    "Duration": 2000000,
                    "DurationInSeconds": 0.2,
                    "Offset": 1421600000,
                    "OffsetInSeconds": 142.16,
                    "Word": "uh"
                  },
                  {
                    "Duration": 4200000,
                    "DurationInSeconds": 0.42,
                    "Offset": 1423700000,
                    "OffsetInSeconds": 142.37,
                    "Word": "actually"
                  },
                  {
                    "Duration": 2000000,
                    "DurationInSeconds": 0.2,
                    "Offset": 1428000000,
                    "OffsetInSeconds": 142.8,
                    "Word": "uh"
                  },
                  {
                    "Duration": 1800000,
                    "DurationInSeconds": 0.18,
                    "Offset": 1430100000,
                    "OffsetInSeconds": 143.01,
                    "Word": "sorry"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1432000000,
                    "OffsetInSeconds": 143.2,
                    "Word": "one"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 1433600000,
                    "OffsetInSeconds": 143.36,
                    "Word": "more"
                  },
                  {
                    "Duration": 6500000,
                    "DurationInSeconds": 0.65,
                    "Offset": 1435400000,
                    "OffsetInSeconds": 143.54,
                    "Word": "question"
                  }
                ]
              }
            ],
            "Offset": 1421600000,
            "OffsetInSeconds": 142.16,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Oh yes, of course.",
            "Duration": 10300000,
            "DurationInSeconds": 1.03,
            "Id": "980f763b51ac4bc7b573b98606623155",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8415381,
                "Display": "Oh yes, of course.",
                "ITN": "oh yes of course",
                "Lexical": "ohh yes of course",
                "MaskedITN": "oh yes of course",
                "Words": [
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 1449400000,
                    "OffsetInSeconds": 144.94,
                    "Word": "ohh"
                  },
                  {
                    "Duration": 1800000,
                    "DurationInSeconds": 0.18,
                    "Offset": 1451700000,
                    "OffsetInSeconds": 145.17,
                    "Word": "yes"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 1453600000,
                    "OffsetInSeconds": 145.36,
                    "Word": "of"
                  },
                  {
                    "Duration": 5300000,
                    "DurationInSeconds": 0.53,
                    "Offset": 1454400000,
                    "OffsetInSeconds": 145.44,
                    "Word": "course"
                  }
                ]
              }
            ],
            "Offset": 1449400000,
            "OffsetInSeconds": 144.94,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "I'm curious what I'd be getting a physical card as proof of coverage.",
            "Duration": 30200000,
            "DurationInSeconds": 3.02,
            "Id": "85592a1a877b4d5ebecee00c72c4b57d",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8768315,
                "Display": "I'm curious what I'd be getting a physical card as proof of coverage.",
                "ITN": "i'm curious what i'd be getting a physical card as proof of coverage",
                "Lexical": "i'm curious what i'd be getting a physical card as proof of coverage",
                "MaskedITN": "i'm curious what i'd be getting a physical card as proof of coverage",
                "Words": [
                  {
                    "Duration": 3300000,
                    "DurationInSeconds": 0.33,
                    "Offset": 1469800000,
                    "OffsetInSeconds": 146.98,
                    "Word": "i'm"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 1473200000,
                    "OffsetInSeconds": 147.32,
                    "Word": "curious"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 1475800000,
                    "OffsetInSeconds": 147.58,
                    "Word": "what"
                  },
                  {
                    "Duration": 800000,
                    "DurationInSeconds": 0.08,
                    "Offset": 1477300000,
                    "OffsetInSeconds": 147.73,
                    "Word": "i'd"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 1478200000,
                    "OffsetInSeconds": 147.82,
                    "Word": "be"
                  },
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 1479400000,
                    "OffsetInSeconds": 147.94,
                    "Word": "getting"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 1481800000,
                    "OffsetInSeconds": 148.18,
                    "Word": "a"
                  },
                  {
                    "Duration": 3500000,
                    "DurationInSeconds": 0.35,
                    "Offset": 1482600000,
                    "OffsetInSeconds": 148.26,
                    "Word": "physical"
                  },
                  {
                    "Duration": 3900000,
                    "DurationInSeconds": 0.39,
                    "Offset": 1486200000,
                    "OffsetInSeconds": 148.62,
                    "Word": "card"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1490200000,
                    "OffsetInSeconds": 149.02,
                    "Word": "as"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 1491600000,
                    "OffsetInSeconds": 149.16,
                    "Word": "proof"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 1493800000,
                    "OffsetInSeconds": 149.38,
                    "Word": "of"
                  },
                  {
                    "Duration": 5200000,
                    "DurationInSeconds": 0.52,
                    "Offset": 1494800000,
                    "OffsetInSeconds": 149.48,
                    "Word": "coverage"
                  }
                ]
              }
            ],
            "Offset": 1469800000,
            "OffsetInSeconds": 146.98,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "So the default is a digital membership card, but we can send you a physical card if you prefer.",
            "Duration": 48900000,
            "DurationInSeconds": 4.89,
            "Id": "51e8ae1296524f4cb3af8e1557a8ae40",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.92462546,
                "Display": "So the default is a digital membership card, but we can send you a physical card if you prefer.",
                "ITN": "so the default is a digital membership card but we can send you a physical card if you prefer",
                "Lexical": "so the default is a digital membership card but we can send you a physical card if you prefer",
                "MaskedITN": "so the default is a digital membership card but we can send you a physical card if you prefer",
                "Words": [
                  {
                    "Duration": 3100000,
                    "DurationInSeconds": 0.31,
                    "Offset": 1515200000,
                    "OffsetInSeconds": 151.52,
                    "Word": "so"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 1518400000,
                    "OffsetInSeconds": 151.84,
                    "Word": "the"
                  },
                  {
                    "Duration": 4500000,
                    "DurationInSeconds": 0.45,
                    "Offset": 1522800000,
                    "OffsetInSeconds": 152.28,
                    "Word": "default"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1527400000,
                    "OffsetInSeconds": 152.74,
                    "Word": "is"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 1528800000,
                    "OffsetInSeconds": 152.88,
                    "Word": "a"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 1529800000,
                    "OffsetInSeconds": 152.98,
                    "Word": "digital"
                  },
                  {
                    "Duration": 4500000,
                    "DurationInSeconds": 0.45,
                    "Offset": 1533600000,
                    "OffsetInSeconds": 153.36,
                    "Word": "membership"
                  },
                  {
                    "Duration": 3300000,
                    "DurationInSeconds": 0.33,
                    "Offset": 1538200000,
                    "OffsetInSeconds": 153.82,
                    "Word": "card"
                  },
                  {
                    "Duration": 2400000,
                    "DurationInSeconds": 0.24,
                    "Offset": 1543200000,
                    "OffsetInSeconds": 154.32,
                    "Word": "but"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 1545700000,
                    "OffsetInSeconds": 154.57,
                    "Word": "we"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 1547000000,
                    "OffsetInSeconds": 154.7,
                    "Word": "can"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 1548200000,
                    "OffsetInSeconds": 154.82,
                    "Word": "send"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 1550200000,
                    "OffsetInSeconds": 155.02,
                    "Word": "you"
                  },
                  {
                    "Duration": 500000,
                    "DurationInSeconds": 0.05,
                    "Offset": 1551400000,
                    "OffsetInSeconds": 155.14,
                    "Word": "a"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 1552000000,
                    "OffsetInSeconds": 155.2,
                    "Word": "physical"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 1555800000,
                    "OffsetInSeconds": 155.58,
                    "Word": "card"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 1558600000,
                    "OffsetInSeconds": 155.86,
                    "Word": "if"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 1559400000,
                    "OffsetInSeconds": 155.94,
                    "Word": "you"
                  },
                  {
                    "Duration": 3500000,
                    "DurationInSeconds": 0.35,
                    "Offset": 1560600000,
                    "OffsetInSeconds": 156.06,
                    "Word": "prefer"
                  }
                ]
              }
            ],
            "Offset": 1515200000,
            "OffsetInSeconds": 151.52,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Uh, yes. Could you please mail it to me when it's ready? I'd like to have it shipped to you for my address.",
            "Duration": 45800000,
            "DurationInSeconds": 4.58,
            "Id": "879885abc4934e509a4df2caa6798c42",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8632384,
                "Display": "Uh, yes. Could you please mail it to me when it's ready? I'd like to have it shipped to you for my address.",
                "ITN": "uh yes could you please mail it to me when it's ready i'd like to have it shipped to you for my address",
                "Lexical": "uh yes could you please mail it to me when it's ready i'd like to have it shipped to you for my address",
                "MaskedITN": "uh yes could you please mail it to me when it's ready i'd like to have it shipped to you for my address",
                "Words": [
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 1577800000,
                    "OffsetInSeconds": 157.78,
                    "Word": "uh"
                  },
                  {
                    "Duration": 2600000,
                    "DurationInSeconds": 0.26,
                    "Offset": 1580600000,
                    "OffsetInSeconds": 158.06,
                    "Word": "yes"
                  },
                  {
                    "Duration": 1800000,
                    "DurationInSeconds": 0.18,
                    "Offset": 1583300000,
                    "OffsetInSeconds": 158.33,
                    "Word": "could"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1585200000,
                    "OffsetInSeconds": 158.52,
                    "Word": "you"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 1586600000,
                    "OffsetInSeconds": 158.66,
                    "Word": "please"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 1588900000,
                    "OffsetInSeconds": 158.89,
                    "Word": "mail"
                  },
                  {
                    "Duration": 500000,
                    "DurationInSeconds": 0.05,
                    "Offset": 1590400000,
                    "OffsetInSeconds": 159.04,
                    "Word": "it"
                  },
                  {
                    "Duration": 500000,
                    "DurationInSeconds": 0.05,
                    "Offset": 1591000000,
                    "OffsetInSeconds": 159.1,
                    "Word": "to"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 1591600000,
                    "OffsetInSeconds": 159.16,
                    "Word": "me"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1592400000,
                    "OffsetInSeconds": 159.24,
                    "Word": "when"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 1593800000,
                    "OffsetInSeconds": 159.38,
                    "Word": "it's"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 1595600000,
                    "OffsetInSeconds": 159.56,
                    "Word": "ready"
                  },
                  {
                    "Duration": 1600000,
                    "DurationInSeconds": 0.16,
                    "Offset": 1598200000,
                    "OffsetInSeconds": 159.82,
                    "Word": "i'd"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 1599900000,
                    "OffsetInSeconds": 159.99,
                    "Word": "like"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 1601400000,
                    "OffsetInSeconds": 160.14,
                    "Word": "to"
                  },
                  {
                    "Duration": 1400000,
                    "DurationInSeconds": 0.14,
                    "Offset": 1602400000,
                    "OffsetInSeconds": 160.24,
                    "Word": "have"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 1603900000,
                    "OffsetInSeconds": 160.39,
                    "Word": "it"
                  },
                  {
                    "Duration": 3200000,
                    "DurationInSeconds": 0.32,
                    "Offset": 1604900000,
                    "OffsetInSeconds": 160.49,
                    "Word": "shipped"
                  },
                  {
                    "Duration": 5700000,
                    "DurationInSeconds": 0.57,
                    "Offset": 1608200000,
                    "OffsetInSeconds": 160.82,
                    "Word": "to"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 1617000000,
                    "OffsetInSeconds": 161.7,
                    "Word": "you"
                  },
                  {
                    "Duration": 1000000,
                    "DurationInSeconds": 0.1,
                    "Offset": 1618100000,
                    "OffsetInSeconds": 161.81,
                    "Word": "for"
                  },
                  {
                    "Duration": 900000,
                    "DurationInSeconds": 0.09,
                    "Offset": 1619200000,
                    "OffsetInSeconds": 161.92,
                    "Word": "my"
                  },
                  {
                    "Duration": 3400000,
                    "DurationInSeconds": 0.34,
                    "Offset": 1620200000,
                    "OffsetInSeconds": 162.02,
                    "Word": "address"
                  }
                ]
              }
            ],
            "Offset": 1577800000,
            "OffsetInSeconds": 157.78,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Oh yeah.",
            "Duration": 4600000,
            "DurationInSeconds": 0.46,
            "Id": "18b8a9a22df642b6ae86c14878251586",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.7751497,
                "Display": "Oh yeah.",
                "ITN": "oh yeah",
                "Lexical": "ohh yeah",
                "MaskedITN": "oh yeah",
                "Words": [
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 1635400000,
                    "OffsetInSeconds": 163.54,
                    "Word": "ohh"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 1637800000,
                    "OffsetInSeconds": 163.78,
                    "Word": "yeah"
                  }
                ]
              }
            ],
            "Offset": 1635400000,
            "OffsetInSeconds": 163.54,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Uh so it's 2660 Unit A on Maple Ave. SE Lansing and then zip code is 48823.",
            "Duration": 99300000,
            "DurationInSeconds": 9.93,
            "Id": "cce1519cde06434cba08d8d2b6551218",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.84529287,
                "Display": "Uh so it's 2660 Unit A on Maple Ave. SE Lansing and then zip code is 48823.",
                "ITN": "uh so it's 2660 unit A on maple ave SE lansing and then zip code is 48823",
                "Lexical": "uh so it's two six six zero unit A on maple avenue southeast lansing and then zip code is four eight eight two three",
                "MaskedITN": "uh so it's 2660 unit a on maple ave se lansing and then zip code is 48823",
                "Words": [
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 1650200000,
                    "OffsetInSeconds": 165.02,
                    "Word": "uh"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1653000000,
                    "OffsetInSeconds": 165.3,
                    "Word": "so"
                  },
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 1654600000,
                    "OffsetInSeconds": 165.46,
                    "Word": "it's"
                  },
                  {
                    "Duration": 4100000,
                    "DurationInSeconds": 0.41,
                    "Offset": 1657600000,
                    "OffsetInSeconds": 165.76,
                    "Word": "two"
                  },
                  {
                    "Duration": 4100000,
                    "DurationInSeconds": 0.41,
                    "Offset": 1661800000,
                    "OffsetInSeconds": 166.18,
                    "Word": "six"
                  },
                  {
                    "Duration": 2700000,
                    "DurationInSeconds": 0.27,
                    "Offset": 1667000000,
                    "OffsetInSeconds": 166.7,
                    "Word": "six"
                  },
                  {
                    "Duration": 6500000,
                    "DurationInSeconds": 0.65,
                    "Offset": 1669800000,
                    "OffsetInSeconds": 166.98,
                    "Word": "zero"
                  },
                  {
                    "Duration": 5100000,
                    "DurationInSeconds": 0.51,
                    "Offset": 1677000000,
                    "OffsetInSeconds": 167.7,
                    "Word": "unit"
                  },
                  {
                    "Duration": 6500000,
                    "DurationInSeconds": 0.65,
                    "Offset": 1682200000,
                    "OffsetInSeconds": 168.22,
                    "Word": "A"
                  },
                  {
                    "Duration": 2300000,
                    "DurationInSeconds": 0.23,
                    "Offset": 1689600000,
                    "OffsetInSeconds": 168.96,
                    "Word": "on"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 1692000000,
                    "OffsetInSeconds": 169.2,
                    "Word": "maple"
                  },
                  {
                    "Duration": 5300000,
                    "DurationInSeconds": 0.53,
                    "Offset": 1695800000,
                    "OffsetInSeconds": 169.58,
                    "Word": "avenue"
                  },
                  {
                    "Duration": 7100000,
                    "DurationInSeconds": 0.71,
                    "Offset": 1701200000,
                    "OffsetInSeconds": 170.12,
                    "Word": "southeast"
                  },
                  {
                    "Duration": 6700000,
                    "DurationInSeconds": 0.67,
                    "Offset": 1708400000,
                    "OffsetInSeconds": 170.84,
                    "Word": "lansing"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1715200000,
                    "OffsetInSeconds": 171.52,
                    "Word": "and"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1716600000,
                    "OffsetInSeconds": 171.66,
                    "Word": "then"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1718200000,
                    "OffsetInSeconds": 171.82,
                    "Word": "zip"
                  },
                  {
                    "Duration": 2600000,
                    "DurationInSeconds": 0.26,
                    "Offset": 1719800000,
                    "OffsetInSeconds": 171.98,
                    "Word": "code"
                  },
                  {
                    "Duration": 5400000,
                    "DurationInSeconds": 0.54,
                    "Offset": 1722500000,
                    "OffsetInSeconds": 172.25,
                    "Word": "is"
                  },
                  {
                    "Duration": 3900000,
                    "DurationInSeconds": 0.39,
                    "Offset": 1729600000,
                    "OffsetInSeconds": 172.96,
                    "Word": "four"
                  },
                  {
                    "Duration": 4300000,
                    "DurationInSeconds": 0.43,
                    "Offset": 1733600000,
                    "OffsetInSeconds": 173.36,
                    "Word": "eight"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 1739200000,
                    "OffsetInSeconds": 173.92,
                    "Word": "eight"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 1743000000,
                    "OffsetInSeconds": 174.3,
                    "Word": "two"
                  },
                  {
                    "Duration": 4300000,
                    "DurationInSeconds": 0.43,
                    "Offset": 1745200000,
                    "OffsetInSeconds": 174.52,
                    "Word": "three"
                  }
                ]
              }
            ],
            "Offset": 1650200000,
            "OffsetInSeconds": 165.02,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Absolutely. I've made a note on your file.",
            "Duration": 18600000,
            "DurationInSeconds": 1.86,
            "Id": "bee82376b021485b8542cdfc5da47505",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.79606736,
                "Display": "Absolutely. I've made a note on your file.",
                "ITN": "absolutely i've made a note on your file",
                "Lexical": "absolutely i've made a note on your file",
                "MaskedITN": "absolutely i've made a note on your file",
                "Words": [
                  {
                    "Duration": 5900000,
                    "DurationInSeconds": 0.59,
                    "Offset": 1763100000,
                    "OffsetInSeconds": 176.31,
                    "Word": "absolutely"
                  },
                  {
                    "Duration": 3700000,
                    "DurationInSeconds": 0.37,
                    "Offset": 1769100000,
                    "OffsetInSeconds": 176.91,
                    "Word": "i've"
                  },
                  {
                    "Duration": 1900000,
                    "DurationInSeconds": 0.19,
                    "Offset": 1772900000,
                    "OffsetInSeconds": 177.29,
                    "Word": "made"
                  },
                  {
                    "Duration": 500000,
                    "DurationInSeconds": 0.05,
                    "Offset": 1774900000,
                    "OffsetInSeconds": 177.49,
                    "Word": "a"
                  },
                  {
                    "Duration": 1700000,
                    "DurationInSeconds": 0.17,
                    "Offset": 1775500000,
                    "OffsetInSeconds": 177.55,
                    "Word": "note"
                  },
                  {
                    "Duration": 700000,
                    "DurationInSeconds": 0.07,
                    "Offset": 1777300000,
                    "OffsetInSeconds": 177.73,
                    "Word": "on"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1778100000,
                    "OffsetInSeconds": 177.81,
                    "Word": "your"
                  },
                  {
                    "Duration": 2000000,
                    "DurationInSeconds": 0.2,
                    "Offset": 1779700000,
                    "OffsetInSeconds": 177.97,
                    "Word": "file"
                  }
                ]
              }
            ],
            "Offset": 1763100000,
            "OffsetInSeconds": 176.31,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "Awesome. Thanks so much.",
            "Duration": 9200000,
            "DurationInSeconds": 0.92,
            "Id": "d47e82819ae04d859f38c2401deb8def",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.8637066,
                "Display": "Awesome. Thanks so much.",
                "ITN": "awesome thanks so much",
                "Lexical": "awesome thanks so much",
                "MaskedITN": "awesome thanks so much",
                "Words": [
                  {
                    "Duration": 3000000,
                    "DurationInSeconds": 0.3,
                    "Offset": 1796000000,
                    "OffsetInSeconds": 179.6,
                    "Word": "awesome"
                  },
                  {
                    "Duration": 2500000,
                    "DurationInSeconds": 0.25,
                    "Offset": 1799100000,
                    "OffsetInSeconds": 179.91,
                    "Word": "thanks"
                  },
                  {
                    "Duration": 1200000,
                    "DurationInSeconds": 0.12,
                    "Offset": 1801700000,
                    "OffsetInSeconds": 180.17,
                    "Word": "so"
                  },
                  {
                    "Duration": 2200000,
                    "DurationInSeconds": 0.22,
                    "Offset": 1803000000,
                    "OffsetInSeconds": 180.3,
                    "Word": "much"
                  }
                ]
              }
            ],
            "Offset": 1796000000,
            "OffsetInSeconds": 179.6,
            "RecognitionStatus": "Success"
          },
          {
            "Channel": 1,
            "ChannelNumber": null,
            "DisplayText": "You're very welcome. Thank you for calling Contoso and have a great day.",
            "Duration": 27700000,
            "DurationInSeconds": 2.77,
            "Id": "dcea366fd4eb4430a0b4318eaf1e534e",
            "Language": "en-US",
            "NBest": [
              {
                "Confidence": 0.7702403,
                "Display": "You're very welcome. Thank you for calling Contoso and have a great day.",
                "ITN": "you're very welcome thank you for calling contoso and have a great day",
                "Lexical": "you're very welcome thank you for calling contoso and have a great day",
                "MaskedITN": "you're very welcome thank you for calling contoso and have a great day",
                "Words": [
                  {
                    "Duration": 3000000,
                    "DurationInSeconds": 0.3,
                    "Offset": 1815200000,
                    "OffsetInSeconds": 181.52,
                    "Word": "you're"
                  },
                  {
                    "Duration": 1600000,
                    "DurationInSeconds": 0.16,
                    "Offset": 1818300000,
                    "OffsetInSeconds": 181.83,
                    "Word": "very"
                  },
                  {
                    "Duration": 3500000,
                    "DurationInSeconds": 0.35,
                    "Offset": 1820000000,
                    "OffsetInSeconds": 182.0,
                    "Word": "welcome"
                  },
                  {
                    "Duration": 2100000,
                    "DurationInSeconds": 0.21,
                    "Offset": 1823600000,
                    "OffsetInSeconds": 182.36,
                    "Word": "thank"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1825800000,
                    "OffsetInSeconds": 182.58,
                    "Word": "you"
                  },
                  {
                    "Duration": 1100000,
                    "DurationInSeconds": 0.11,
                    "Offset": 1827200000,
                    "OffsetInSeconds": 182.72,
                    "Word": "for"
                  },
                  {
                    "Duration": 2800000,
                    "DurationInSeconds": 0.28,
                    "Offset": 1828400000,
                    "OffsetInSeconds": 182.84,
                    "Word": "calling"
                  },
                  {
                    "Duration": 4600000,
                    "DurationInSeconds": 0.46,
                    "Offset": 1831300000,
                    "OffsetInSeconds": 183.13,
                    "Word": "contoso"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1836000000,
                    "OffsetInSeconds": 183.6,
                    "Word": "and"
                  },
                  {
                    "Duration": 1500000,
                    "DurationInSeconds": 0.15,
                    "Offset": 1837600000,
                    "OffsetInSeconds": 183.76,
                    "Word": "have"
                  },
                  {
                    "Duration": 400000,
                    "DurationInSeconds": 0.04,
                    "Offset": 1839200000,
                    "OffsetInSeconds": 183.92,
                    "Word": "a"
                  },
                  {
                    "Duration": 1800000,
                    "DurationInSeconds": 0.18,
                    "Offset": 1839700000,
                    "OffsetInSeconds": 183.97,
                    "Word": "great"
                  },
                  {
                    "Duration": 1300000,
                    "DurationInSeconds": 0.13,
                    "Offset": 1841600000,
                    "OffsetInSeconds": 184.16,
                    "Word": "day"
                  }
                ]
              }
            ],
            "Offset": 1815200000,
            "OffsetInSeconds": 181.52,
            "RecognitionStatus": "Success"
          }
        ],
        "TranscriptionStatus": "Succeeded"
      }
    ]
};

async function SentimentAnalysis(client: any, documents: string[]) {
    let results;
    try {
        results = await client.analyze("SentimentAnalysis", documents.slice(0, 10));
    } catch (error: any) {
        console.error(error);
    }
    return results;
}

async function Summarization(client: any, documents: string[]) {

}

export async function HttpExample(request: HttpRequest, context: InvocationContext): Promise<any> {
    context.log(`Http function processed request for url "${request.url}"`);

    const endpoint = 'https://eastus.api.cognitive.microsoft.com';
    const apiKey = '';
    const documents: string[] = [];

    for (let audioFileResult of testJson.AudioFileResults) {
        for (let segmentResult of audioFileResult.SegmentResults) {
            documents.push(segmentResult.DisplayText);
        }
    }
      
    const options: TextAnalysisClientOptions = {
        allowInsecureConnection: true
    };
    const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey), options);
    
    const sentimentAnalysisResults = await SentimentAnalysis(client, documents);

    return { body: sentimentAnalysisResults || null };
};

app.http('HttpExample', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: HttpExample
});
