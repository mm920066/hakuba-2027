/**
 * Hakuba Ski Resorts Data (Top 6 Selected Resorts - North to South)
 * Specially curated for 8-person mixed-skill group (Novices to Advanced)
 * Excluded: Goryu/47 (Already visited), Jigatake/Sanosaka (Too small/flat)
 * Added: Kashimayari (Super scenic Lake Aoki views & Central Plaza 1130 onsen, closest to Omachi)
 * Overhaul: Replaced day-by-day dining timetable with flexible Resort Playbooks (Transport + Member Zone Split)
 */

const HAKUBA_DATA = {
  departure: {
    name: "長野縣大町市中心（信濃大町站周邊）",
    shortName: "大町市出發點",
    lat: 36.5036,
    lng: 137.8633,
    note: "每日自駕出發點，沿國道 148 號北上"
  },
  resorts: [
    {
      id: "cortina",
      order: 1,
      name: "白馬 Cortina 滑雪場",
      jpName: "白馬コルチナスキー場",
      enName: "Hakuba Cortina Ski Resort",
      tagline: "北端野雪天花板，合法開放樹林與天然碗狀地形聖地",
      lat: 36.7580,
      lng: 137.9044,
      elevation: { base: 872, top: 1402, drop: 530 },
      areaHa: 50,
      courseCount: 16,
      slopeRange: "6.0° – 27.7° (最大 42°)",
      difficulty: { beginner: 40, intermediate: 30, advanced: 30 },
      beginnerRating: 3,
      mixedGroupRating: 3.5,
      powderRating: 5,
      advancedRating: 5,
      sceneryRating: 4.5,
      maxSnowDepth: "309 cm",
      driveTime: {
        dry: "50–55 分鐘",
        snow: "65–80 分鐘",
        distanceKm: 40,
        note: "最北端，山路彎道多，積雪時路面易有壓雪積冰，務必提早出發"
      },
      parking: {
        capacity: 1100,
        fee: "全日完全免費",
        recommendation: "Hotel Green Plaza Hakuba 前方戶外大停車場，停好步行即可直通雪道與飯店設施"
      },
      elNino: {
        resilienceRating: 4,
        status: "降雪量全山之冠，但考驗鋒面時機",
        analysis: "Cortina 位處北端迎風漏斗地形，只要有冷鋒南下必定下全區最深。在聖嬰暖冬下，即使前期雪遲到，一旦降雪累積速度最快。缺點是底座僅 872m，回溫下雨時底層易變重濕雪或硬冰面。"
      },
      earlyBird: {
        lowestPrice: "¥5,500",
        regularPrice: "¥6,500",
        deadline: "2026/12/15 止 (開季前)",
        bestSources: "WAmazing Snow (完美行) / Winter Plus / Snownavi",
        discountInfo: "現省 ¥1,000 (含乘鞍溫泉 2 場共通一日券)",
        redemption: "憑手機 QR Code 現場自動機台兌換實體 IC 卡直衝纜車"
      },
      playbook: {
        transport: "大町開車雪地約 65–80 分鐘（40km）。停在紅色城堡 Hotel Green Plaza 前方免費大停車場，離纜車站與雪具大廳最近。",
        beginnerZone: "【飯店前池之田下部（Ikenota）】：坡度較緩，但初級道總量很少且偏窄。純新手強烈建議橫向移動到隔壁相連的「乘鞍溫泉若栗平原」，初學滑道寬 3 倍且零撞擊壓力。",
        intermediateZone: "【池之田ゲレンデ全段 ＋ 蕨平コース】：雪道開闊平順，適合中級練 S-turn 與大轉彎刻滑。",
        advancedZone: "【稗田山コース 1/2/3 ＋ 板平（Itadaira）＋ 合法樹林野雪碗公】：白馬全山公認深粉天堂！極限坡度達 42°，冷鋒過境時樹林間積滿鬆軟厚粉雪，進階高手必刷的終極地形。",
        sceneryZone: "【Hotel Green Plaza 紅色歐式宮廷城堡】：宏偉城堡配上純白雪景，彷彿置身哈利波特霍格華茲魔法世界，全白馬最具辨識度的打卡景觀。",
        bestTiming: "❄️ 前夜降大雪（Powder Day）或日本海冷鋒過境時首選！若連日晴朗無新雪則不建議（野雪區會變硬饅頭）。"
      },
      highlights: [
        "合法開放樹林野雪與天然碗狀滑道（Off-piste），粉雪日第一首選",
        "白馬地區降雪量冠軍（歷年積雪深達 309cm），進階者狂熱朝聖地",
        "紅色歐風城堡「Hotel Green Plaza」拍照極美，宛若置身歐洲童話",
        "與乘鞍溫泉雪場相通，新手可前往乘鞍平緩寬闊坡道練習"
      ],
      communitySentiment: {
        ptt: "粉雪日去簡直天堂，樹林合法開放滑起來超爽！但如果連日無大雪會變成凹凸不平的硬饅頭山。",
        dcard: "紅色城堡飯店超像哈利波特的霍格華茲，女生拍照打卡極美。初學新手千萬別上頂峰，初級道偏窄像走道。",
        reddit: "The powder bowl is legendary, but gets tracked out by 10:30 AM on powder mornings. Watch out for the Dam Run!",
        verdict: "進階者粉雪朝聖必去；純新手只建議在飯店前小坡或乘鞍側練功。"
      }
    },
    {
      id: "norikura",
      order: 2,
      name: "白馬乘鞍溫泉滑雪場",
      jpName: "白馬乗鞍温泉スキー場",
      enName: "Hakuba Norikura Onsen",
      tagline: "人少悠閒、若栗平原超緩坡與樹林，與 Cortina 互補雙贏",
      lat: 36.7505,
      lng: 137.9002,
      elevation: { base: 760, top: 1280, drop: 520 },
      areaHa: 50,
      courseCount: 12,
      slopeRange: "6.7° – 21.4°",
      difficulty: { beginner: 30, intermediate: 50, advanced: 20 },
      beginnerRating: 4.5,
      mixedGroupRating: 4,
      powderRating: 4,
      advancedRating: 3.5,
      sceneryRating: 4,
      maxSnowDepth: "243 cm",
      driveTime: {
        dry: "50 分鐘",
        snow: "60–75 分鐘",
        distanceKm: 38,
        note: "位於 Cortina 南側隔壁，自駕沿國道 148 轉若栗方向即可到達"
      },
      parking: {
        capacity: 1000,
        fee: "全日完全免費",
        recommendation: "若栗中央（Wakaguri）纜車旁停車場，下車走幾步就是極緩的練習大平原"
      },
      elNino: {
        resilienceRating: 3,
        status: "人少雪質保存佳，但頂部海拔偏低",
        analysis: "降雪量僅次於 Cortina，因滑客少，野雪保留時間比人滿為患的熱門場更長。但最高標高僅 1,280m，遇到 1 月暖冬高溫時下半部雪質容易轉硬。"
      },
      earlyBird: {
        lowestPrice: "¥5,500",
        regularPrice: "¥6,500",
        deadline: "2026/12/15 止 (開季前)",
        bestSources: "WAmazing Snow / Winter Plus / Snownavi",
        discountInfo: "現省 ¥1,000 (含 Cortina 共通一日券)",
        redemption: "電子票兌換或實體 IC 卡直接過閘門"
      },
      playbook: {
        transport: "大町開車雪地約 60–75 分鐘（38km）。推薦停在【若栗中央（Wakaguri）停車場】，平整免費，出車門就是寬廣緩坡。",
        beginnerZone: "【若栗中央ゲレンデ（Wakaguri Slope）】：極度寬闊且均坡僅 8–10 度，平日遊客僅熱門雪場的三分之一，新手在此反覆練推坡、落葉飄、S-turn 完全不用擔心撞人，建立信心神場！",
        intermediateZone: "【若栗林間コース ＋ 里見中央】：被美麗針葉林包圍的長距離巡航雪道，坡度平順，滑感舒適。",
        advancedZone: "【Sky View コース ＋ 切入 Cortina 樹林】：乘鞍頂部視野開闊，人少所以粉雪被破壞的速度慢；且頂峰直接連通 Cortina，高手隨時可以跨區狂刷 Cortina 樹林野雪。",
        sceneryZone: "【白馬阿爾卑斯飯店天然溫泉】：雪場山腳直結飯店溫泉，滑完可立刻享受熱騰騰露天風呂放鬆緊繃肌肉。",
        bestTiming: "👥 混合組想要一邊新手無壓力練功、一邊高手衝野雪時的極佳平衡點！"
      },
      highlights: [
        "若栗平原坡度平緩寬廣，新手練功極度無壓力",
        "平日遊客稀少，完全不需排隊等待纜車",
        "滑雪後可直接在雪場邊的白馬阿爾卑斯飯店泡天然溫泉",
        "頂部與 Cortina 共通相連，進階者隨時可切過去衝樹林野雪"
      ],
      communitySentiment: {
        ptt: "跟 Cortina 共用一張票，但人少三分之二，若栗平原超好練 S-turn，完全不用怕撞到人！",
        threads: "很安靜很舒服的雪場，雖然纜車稍微老舊，但完全沒有觀光客搶雪道，很享受。",
        reddit: "A peaceful alternative right next to Cortina. Great tree lines without the morning mad rush.",
        verdict: "適合想要避開喧囂、輕鬆練習轉彎的新手，同時進階者有 Cortina 做後盾。"
      }
    },
    {
      id: "tsugaike",
      order: 3,
      name: "白馬栂池高原滑雪場",
      jpName: "つがいけマウンテンリゾート",
      enName: "Tsugaike Mountain Resort",
      tagline: "全白馬最強新手天堂，1.2km 超寬鐘之鳴丘與 1,704m DBD 專家鬆雪",
      lat: 36.7441,
      lng: 137.8965,
      elevation: { base: 800, top: 1704, drop: 904 },
      areaHa: 196,
      courseCount: 18,
      slopeRange: "5.4° – 17.6°",
      difficulty: { beginner: 50, intermediate: 30, advanced: 20 },
      beginnerRating: 5,
      mixedGroupRating: 5,
      powderRating: 4.5,
      advancedRating: 4.5,
      sceneryRating: 4.5,
      maxSnowDepth: "296 cm",
      driveTime: {
        dry: "45–50 分鐘",
        snow: "55–70 分鐘",
        distanceKm: 36,
        note: "經國道 148 號接縣道 433 號，路線平直好開，除雪維護頻繁"
      },
      parking: {
        capacity: 1500,
        fee: "中央第一、第四等大多免費（Gondola 預約位 ¥3,000）",
        recommendation: "中央第一免費停車場（離鐘之鳴丘或纜車站步行約 3–5 分鐘，附有更衣室與洗手間）"
      },
      elNino: {
        resilienceRating: 5,
        status: "超強抗暖冬！垂直落差 904m + 現代化人工造雪",
        analysis: "山頂高達 1,704m，在聖嬰暖冬下山頂栂之森依然保持低溫乾燥鬆雪；且栂池投資大量現代造雪設備，底部鐘之鳴丘優先造雪保證開放，是全白馬保底率最高的雪場之一。"
      },
      earlyBird: {
        lowestPrice: "¥6,500",
        regularPrice: "¥9,800",
        deadline: "2026/11/30 止",
        bestSources: "SURF&SNOW / WAmazing Snow / 官網 Webket / Nippon-ski",
        discountInfo: "狂省 ¥3,300！約 66 折超殺折扣（另有含 ¥1,200 餐券套票 ¥7,500）",
        redemption: "手機憑證 QR Code 於自動兌換機掃描取 IC 卡直行纜車"
      },
      playbook: {
        transport: "大町開車雪地約 55–70 分鐘（36km）。推薦停【中央第一免費停車場】，車位多且設施完備，步行 3 分鐘即達雪道。",
        beginnerZone: "【鐘之鳴丘（鐘の鳴る丘ゲレンデ） ＋ 親之原（Oyanohara）】：全日本首屈一指的新手殿堂！寬度達 1,200 米，均坡僅 8 度，超寬開闊視野完全消除恐懼感，新手在此滑整天都不想走。",
        intermediateZone: "【澯之木（Han-no-ki）中下段 ＋ 馬之背聯絡道】：長達數公里的長坡，適合練習連續高速轉彎與中級進階技術。",
        advancedZone: "【TSUGAPOW DBD 合法粉雪區（山頂 1,704m）】：搭乘全長 4km 的 Eve 廂型纜車登頂，聆聽安全說明並佩戴專屬臂章後，可從各個專用 Gate 進入合法管理的深雪樹林區，雪質極乾極冷！",
        sceneryZone: "【4km Eve 廂型纜車巡航 ＋ 山頂栂之森雪怪樹冰】：新手也能買纜車票搭乘 Eve 廂型車直登 1,700m 高空俯瞰整座白馬雪谷，享受高山純白景致。",
        bestTiming: "🏆 8 人混合程度第一天（Day 1）絕對首選！新手保證順利上手，進階者登頂衝 DBD 毫不無聊。"
      },
      highlights: [
        "全日本聞名的「鐘之鳴丘ゲレンデ」，寬達 1,200 公尺、均坡僅 8 度",
        "全長 4 公里的 Eve 廂型纜車，新手也能安全搭乘登頂賞雪景",
        "山頂設有「TSUGAPOW DBD」合法粉雪管制區（需聽安全講習與佩戴臂章）",
        "生活機能豐富，山腳有眾多特色餐廳、雪具租賃與足湯"
      ],
      communitySentiment: {
        ptt: "初學者來栂池就是重生！鐘之鳴丘寬到像機場跑道，閉著眼睛滑都不會撞到人。",
        dcard: "第一次滑雪摔得懷疑人生，第二天換來栂池立刻順利學會 S-turn，超有成就感！",
        reddit: "Tsugaike is the absolute best beginner field in Japan, yet the DBD zone at 1,700m satisfies serious powder chasers.",
        verdict: "混合程度團體必排清單！新手建立信心，高手登頂衝 DBD，雙贏雪場。"
      }
    },
    {
      id: "iwatake",
      order: 4,
      name: "白馬岩岳滑雪場",
      jpName: "白馬岩岳マウンテンリゾート",
      enName: "Hakuba Iwatake Snow Field",
      tagline: "360° 北阿爾卑斯壯景、THE CITY BAKERY 絕景打卡名所",
      lat: 36.7214,
      lng: 137.8700,
      elevation: { base: 750, top: 1289, drop: 539 },
      areaHa: 120,
      courseCount: 18,
      slopeRange: "8.5° – 19.2°",
      difficulty: { beginner: 30, intermediate: 50, advanced: 20 },
      beginnerRating: 3.5,
      mixedGroupRating: 4.5,
      powderRating: 3,
      advancedRating: 3.5,
      sceneryRating: 5,
      maxSnowDepth: "207 cm",
      driveTime: {
        dry: "40–45 分鐘",
        snow: "50–60 分鐘",
        distanceKm: 33,
        note: "從國道 148 號轉入岩岳入口，車道平整無大山坡"
      },
      parking: {
        capacity: 1000,
        fee: "全日完全免費",
        recommendation: "第 1 停車場（離新廂型纜車站最近，停滿時會引導至第 2 停車場搭免費接駁小車）"
      },
      elNino: {
        resilienceRating: 2,
        status: "標高偏低，暖冬下半山腰容易化雪",
        analysis: "岩岳為獨立山頭，山頂標高僅 1,289m。強烈聖嬰暖冬下若無新雪，下半部南向坡面容易雪量不足或見草。但晴天時山頂 View 區巡航體驗極佳。"
      },
      earlyBird: {
        lowestPrice: "¥5,700",
        regularPrice: "¥7,500–¥8,000",
        deadline: "2026/12/13 止",
        bestSources: "Winter Plus / Snownavi / WAmazing Snow / Asoview",
        discountInfo: "現省 ¥1,800–¥2,300（現場需另付 IC 押金 ¥1,000 退卡返還）",
        redemption: "QR Code 兌換 IC 票卡 / 直達新纜車"
      },
      playbook: {
        transport: "大町開車雪地約 50–60 分鐘（33km）。推薦停【第 1 免費停車場】，直達最新高速廂型纜車站，步行僅 2 分鐘。",
        beginnerZone: "【山頂 View 綠線全景環道】：搭乘新纜車直達山頂，沿著寬平山頂慢慢滑，雪山景致絕佳（注意：山腳的下山綠線較窄，新手下山建議直接搭纜車下山最安全）。",
        intermediateZone: "【South & Sunny Valley 巡航道 ＋ 自然波浪道】：360 度環山中級道，坡度均勻，設有順應地形起伏的天然波浪包，趣味性十足。",
        advancedZone: "【View C/D 碗狀凹地 ＋ 白馬大澤（Dazawa）黑線】：山背面的 View 區域在降雪後保留天然粉雪碗公，大澤黑線則考驗大斜度刻滑技術。",
        sceneryZone: "【HAKUBA MOUNTAIN HARBOR 懸空露台 ＋ THE CITY BAKERY ＋ YOOHOO SWING】：白馬最火紅打卡地！現烤熱可頌配拿鐵，懸空木棧道拍 8 人阿爾卑斯大合照，盪高空大鞦韆！",
        bestTiming: "☀️ 晴朗藍鳥天（Bluebird Day）首選！無敵 360 度視野，既能滑雪又能拍出刷爆朋友圈的超美照片。"
      },
      highlights: [
        "白馬人氣最高打卡點「HAKUBA MOUNTAIN HARBOR」懸空觀景台",
        "山頂知名麵包咖啡廳「THE CITY BAKERY」，現烤可頌配雪山絕景",
        "巨大鞦韆「YOOHOO SWING」，彷彿飛向阿爾卑斯山脈",
        "全新升級高速廂型纜車，搭乘體驗舒適迅速"
      ],
      communitySentiment: {
        ptt: "適合晴天去觀光拍照兼滑中級道，如果是狂熱滑雪控遇到大雪天建議改去 Cortina 或八方。",
        dcard: "山頂咖啡館真的太美了！就算同行有不太滑雪的朋友，大家也能在這裡開心拍一上午。",
        ig: "白馬三山倒映藍天，在懸空木棧道拍照直接刷爆 IG 愛心！",
        verdict: "第 3 天晴朗藍天日首選，結合滑雪與觀光合照的完美收官地。"
      }
    },
    {
      id: "happo",
      order: 5,
      name: "白馬八方尾根滑雪場",
      jpName: "白馬八方尾根スキー場",
      enName: "Hakuba Happo-One",
      tagline: "白馬旗艦精神象徵、1998 冬奧賽場、千米垂直落差雄偉壯麗",
      lat: 36.7020,
      lng: 137.8480,
      elevation: { base: 760, top: 1831, drop: 1071 },
      areaHa: 220,
      courseCount: 26,
      slopeRange: "7.1° – 27.0° (局部 > 35°)",
      difficulty: { beginner: 30, intermediate: 50, advanced: 20 },
      beginnerRating: 3,
      mixedGroupRating: 4.5,
      powderRating: 4.5,
      advancedRating: 5,
      sceneryRating: 5,
      maxSnowDepth: "325 cm",
      driveTime: {
        dry: "35–45 分鐘",
        snow: "45–60 分鐘",
        distanceKm: 30,
        note: "進入白馬村核心區，平日車流順暢，但八方街區巷道狹窄需慢行"
      },
      parking: {
        capacity: 1200,
        fee: "第 2、3、5、6、8、9 停車場全免費（正面 A/B/C 每日 ¥1,000）",
        recommendation: "【強烈推薦停第 8 停車場（咲花 Sakka 區）】：全免費且出門直達平緩新手綠線與魔毯，避開名木山人潮"
      },
      elNino: {
        resilienceRating: 4.5,
        status: "頂部標高 1,831m 白馬最高！高海拔抗暖能力極強",
        analysis: "山頂黑菱與兔平海拔高達 1,600–1,830m，在強聖嬰暖冬下依舊保持零下低溫與紮實積雪。弱點是山底（名木山、白樺）低海拔若遇下雨會變硬冰饅頭，對腿力要求高。"
      },
      earlyBird: {
        lowestPrice: "¥8,300",
        regularPrice: "¥9,800",
        deadline: "2026/11/30 止",
        bestSources: "WAmazing Snow / Snownavi (早割2日券平均一日 ¥8,300) / 官網早割",
        discountInfo: "現省 ¥1,500/日 (購買早割2日券 ¥16,600 免排隊直衝IC卡)",
        redemption: "郵寄直接領取 IC 卡直衝纜車閘門，或憑 QR Code 現場快速感應出卡"
      },
      playbook: {
        transport: "大町開車雪地約 45–60 分鐘（30km）。【關鍵自駕秘訣】：務必把車停在【第 8 停車場（咲花 Sakka 區）】！咲花免費且出車門就是平緩區，千萬別開去名木山擠車位。",
        beginnerZone: "【嚴格限定：咲花（Sakka）ゲレンデ專區】：咲花是八方尾根唯一真正平緩寬闊的安全區，配備專屬慢速纜車與魔毯！新手在這裡安心練功，切勿搭纜車往上誤入兔平或黑菱的陡坡聯絡道。",
        intermediateZone: "【Panorama 景觀寬道 ＋ Skyline 林間道】：中級者能享受超長距離的下坡滑行，白馬盆地全景一覽無遺。",
        advancedZone: "【1998 長野冬奧男子滑降賽道 ＋ 黑菱（Kurobishi）巨型饅頭 ＋ Riesen 經典大斜面】：高手的極限遊樂場！垂直落差超過 1,071 米，黑菱天然饅頭坡考驗腿力與減震，長達數公里的奧運賽道更是全日本標竿。",
        sceneryZone: "【黑菱 Terrace ＋ 八方の湯 / 倉下の湯】：黑菱山頂可近距離仰望白馬三山鋸齒狀雪稜；滑完可前往白馬村泡天然名湯。",
        bestTiming: "⚡ 進階高手想要體驗日本奧運級大山震撼、且新手願意在咲花基地專心練功時的頂級選擇。"
      },
      highlights: [
        "1998 長野冬季奧運官方高山滑降（Downhill）競賽場地，千米落差",
        "黑菱（Kurobishi）與兔平（Usagidaira）經典巨大天然饅頭坡，進階者天堂",
        "長達數公里的 Riesen 經典大滑道，高速刻滑爽快度全白馬第一",
        "咲花（Sakka）基地擁有安靜平緩綠線與魔毯，新手能在此安全練習"
      ],
      communitySentiment: {
        ptt: "八方無新手！綠線常常窄得像聯絡道又帶斜度，新手滑完直接懷疑人生。但黑菱看雪山真的神景！",
        threads: "進階者會愛死八方的 Riesen 長滑道，一路飆到底大腿超酸但是超爽。",
        reddit: "Happo-One is massive and steep. Stick beginners to the Sakka area, experts go straight to Kurobishi and Riesen!",
        verdict: "大山朝聖首選！高手挑戰冬奧滑降與饅頭坡，新手在咲花基地安心滑，兩全其美。"
      }
    },
    {
      id: "kashimayari",
      order: 6,
      name: "鹿島槍滑雪場家庭公園",
      jpName: "鹿島槍スキー場ファミリーパーク",
      enName: "Kashimayari Snow Resort Family Park",
      tagline: "俯瞰青木雙湖蔚藍絕景、空中展望大浴場、大町自駕最近",
      lat: 36.5683,
      lng: 137.8500,
      elevation: { base: 830, top: 1320, drop: 490 },
      areaHa: 78,
      courseCount: 12,
      slopeRange: "8.0° – 22.7°",
      difficulty: { beginner: 40, intermediate: 45, advanced: 15 },
      beginnerRating: 4.5,
      mixedGroupRating: 4,
      powderRating: 3,
      advancedRating: 3.5,
      sceneryRating: 5,
      maxSnowDepth: "196 cm",
      driveTime: {
        dry: "25–30 分鐘",
        snow: "30–40 分鐘",
        distanceKm: 16,
        note: "距離大町市最近的主力雪場！沿國道 148 轉縣道 324，山路短且除雪迅速"
      },
      parking: {
        capacity: 1000,
        fee: "平日完全免費！（週末假日收費 ¥1,000，本團平日全免）",
        recommendation: "中央停車場（直達 Central Plaza 1130 大廳正門，換裝極為方便）"
      },
      elNino: {
        resilienceRating: 3,
        status: "核心基地位於 1,130m，避開谷底化雪層",
        analysis: "核心基地 Central Plaza 標高達 1,130m，主要滑道位於 1,130m 至 1,320m 之間，雖然總標高不是白馬最高，但因為滑行區域普遍居高，避開了谷底化雪問題，雪況比預期穩定。"
      },
      earlyBird: {
        lowestPrice: "¥4,500",
        regularPrice: "¥6,200",
        deadline: "2026/12/15 止",
        bestSources: "Winter Plus / SURF&SNOW / WAmazing Snow",
        discountInfo: "現省 ¥1,700！約 72 折超親民票價（平日停車完全免費）",
        redemption: "電子憑證 QR Code 於櫃台或自動售票機快速換卡"
      },
      playbook: {
        transport: "大町開車雪地僅需 30–40 分鐘（16km，離大町最近！）。停在 Central Plaza 1130 前方中央停車場，平日全天免費，一下車走進大廳就是雪道。",
        beginnerZone: "【中綱ゲレンデ ＋ 黑澤初級雪道】：出 Central Plaza 1130 門口就是平緩初學坡，沒有懸崖與險峻盲區，練習上下纜車與推坡極度安心。",
        intermediateZone: "【Course 1 / 2 / 3（湖景巡航道）】：沿著山脊一路向下滑行，眼前是蔚藍的青木湖與中綱湖，視野開闊，滑行體驗非常舒適療癒。",
        advancedZone: "【Course 5B（北壁黑線陡坡） ＋ 競技專用道】：最大坡度 22.7 度，背陽北向雪面，適合進階者進行中長距離高速卡邊（Carving）練習。",
        sceneryZone: "【Central Plaza 1130 空中展望大浴場「ハイランドの湯」 ＋ 150m 雪上甜甜圈】：滑完雪直接在基地 4 樓泡天然溫泉、隔著整面玻璃大窗看鹿島槍岳日落；雪上甜甜圈刺激好玩。",
        bestTiming: "🏞️ 想要省去雪地長途駕駛、想要看高山湖景、以及想要「滑完立刻在雪場頂樓泡景觀溫泉」的超放鬆日子！"
      },
      highlights: [
        "美景無敵：俯瞰蔚藍的青木湖與中綱湖湖光山色，正對北阿爾卑斯鹿島槍岳雙峰",
        "大町自駕最近：車程僅約 30 分鐘，免去長途雪地駕駛與塞車負擔",
        "Central Plaza 1130 設有高空景觀空中大浴場「ハイランドの湯」，滑完直接泡湯看雪山",
        "設有全日本最長 150 米雪上甜甜圈（Tubing Park）娛樂設施，趣味十足"
      ],
      communitySentiment: {
        ptt: "從大町開過去真的超快！平日雪道壓得很平整，滑完直接在 Central Plaza 泡湯超爽。",
        dcard: "風景真的很美，尤其是天氣好看到青木湖的那條雪道，拍照很有氛圍。室內設施齊全溫暖。",
        reddit: "Great family resort close to Omachi. The lake views on a clear morning are incredible.",
        verdict: "風景絕美、離大町最近、票價最親民！非常適合作為第一天熱身或輕鬆巡航的好選擇。"
      }
    }
  ],
  drivingTips: {
    route: "大町市街 ➔ 國道 148 號（白馬街道）➔ 北上各雪場",
    blackIceWarning: "仁科三湖（木崎湖、中綱湖、青木湖）與佐野坂峠一帶，湖畔濕氣重且山壁背陽，極易形成透明「黑冰（Black Ice）」。務必保持車距，切忌急踩煞車！",
    vehicleReq: "必須預約 4WD（四輪驅動）搭配全套無釘防滑雪胎（Studless Tires）。8 人自駕建議租兩台 4WD 休旅車（比 10 人座大車靈活安全）。",
    departureTime: "平日清晨 07:00–08:00 路上會有鏟雪車緩慢作業，建議抓早 07:30 前出發，避免卡在車隊後方。"
  },
  rentals: [
    {
      id: "sunshine",
      name: "Sunshine Hakuba Rental（日和Rental）",
      badge: "🇹🇼 中文服務 & 性價比首選",
      badgeType: "recommended",
      tagline: "全繁中LINE客服、前一天14:00免費提前取板、支援民宿乾燥室拍照免還板",
      price3Day: "約 ¥12,000 – ¥14,500 / 3天（單/雙板標準套裝）",
      highlights: [
        "【全繁中/廣東話無障礙】：香港與台灣雪友的最愛！LINE（@sunshinehakuba）與 WhatsApp 客服中文秒回，現場試穿溝通零阻礙",
        "【前一天 14:00 免費提前取板】：8 人自駕最大福音！抵達白馬/大町當天下午即可先到白馬駅前店試鞋領板，第一天一早直衝雪場免排隊",
        "【民宿乾燥室拍照免還板】：滑完最後一天只要把雪具留在住宿處 Dry Room，拍照傳 LINE 給客服即可退還，不用開車繞回店裡",
        "【門市位置極佳】：白馬駅前店（大町沿國道 148 號北上最順路）與白馬五龍店"
      ],
      advancedOptions: {
        hasAdvanced: true,
        title: "⚡ 可選進階：名牌旗艦板 ＋ FASE 免彎腰快穿系統",
        price: "單日約 ¥7,500–¥8,500 ｜ 3天約 ¥17,500–¥19,500",
        gear: "Capita (DOA 等熱門神板)、Jones (Mountain Twin)、Burton、K2，標配 FASE 快穿固定器",
        feature: "想滑潮流名牌板，且單板穿脫不想坐雪地冰屁股的進階雪友首選！"
      },
      pros: "價格全白馬連鎖中最親民（單日約 ¥5,500起）、中文客服溝通最順暢、提前取板與免還板服務省下大量自駕時間",
      cons: "若在栂池或 Cortina 滑雪途中需要換雪靴尺寸，需開車回白馬駅前店（無北端雪場直營門市）",
      bookingUrl: "https://www.sunshinehakuba.jp/rentals"
    },
    {
      id: "spicy",
      name: "Spicy Rentals（スパイシー）",
      badge: "⭐ 跨雪場換裝彈性最高",
      badgeType: "recommended",
      tagline: "全白馬分店最多！支援跨店換鞋換板與甲租乙還",
      price3Day: "約 ¥13,000 – ¥16,000 / 3天（標準套裝）",
      highlights: [
        "分店遍布各大雪場：八方尾根、岩岳、栂池高原、Echoland、和田野",
        "跨店免費更換：若第一天雪靴夾腳或想換滑雪風格，可直接在當天雪場旁的 Spicy 門市免費更換尺寸！",
        "線上預約享 9 折早鳥優惠（官網預訂或 Klook 憑證）",
        "可租借全套安全帽、雪鏡與防水透氣雪衣雪褲"
      ],
      advancedOptions: {
        hasAdvanced: true,
        title: "⚡ 可選進階：Performance / Premium 旗艦進階款（可補差額升級）",
        price: "3天約 ¥17,000–¥19,500（比標準款多約 ¥3,500）",
        gear: "Salomon、Atomic、Volkl 當季高階雙板；Burton、Salomon 旗艦粉雪板",
        feature: "第 1 天若租標準款覺得不夠力，第 2 天滑到栂池或八方門市可當場補差額升級 Premium 大山板！"
      },
      pros: "彈性最高，換場滑雪完全不用特意繞回同一家店換裝備",
      cons: "標準款（Standard）裝備款式中規中矩，追求最新潮裝備需選 Premium 款",
      bookingUrl: "https://spicy.co.jp/"
    },
    {
      id: "rhythm",
      name: "Rhythm Japan（白馬旗艦店）",
      badge: "💎 頂級裝備 & Step On 系統",
      badgeType: "premium",
      tagline: "國際頂尖裝備、Burton Step On 免彎腰快穿與粉雪 Demo 板",
      price3Day: "約 ¥16,500 – ¥18,000 / 3天（標準款）",
      highlights: [
        "裝備極新：Burton、Salomon、K2、Jones、Armada 最新季款式",
        "全英文親切服務，店內提供專業高科技足型測量與熱塑雪靴調整",
        "提供白馬村內特定範圍免費裝備運送與取還"
      ],
      advancedOptions: {
        hasAdvanced: true,
        title: "💎 可選進階：Burton Step On® 快穿系統 ＆ 頂級 Demo 粉雪板系列",
        price: "3天約 ¥19,500–¥22,000（含全額租賃損壞保險）",
        gear: "Burton Step On 全系列（快穿靴+卡扣固定器一踩即入）；Jones (Mind Expander)、Armada、Black Crows 等 Demo 粉雪板",
        feature: "全白馬最強進階裝備庫！單板免坐雪地一踩即入；提供當日無限次免費換板（道內刃板 ⇄ 深雪胖胖板隨你換）"
      },
      pros: "裝備保養極佳、顏值最高、想體驗頂級滑行感首選",
      cons: "價格屬於白馬最高一檔，旺季門市需提早預約",
      bookingUrl: "https://www.rhythmjapan.com/locations/hakuba/"
    },
    {
      id: "central",
      name: "Central Snowsports",
      badge: "🚀 八方纜車直達 & 專業野雪板",
      badgeType: "premium",
      tagline: "八方 Gondola 站前直達，粉雪板與野雪裝備庫存豐富",
      price3Day: "約 ¥14,500 – ¥16,500 / 3天（標準款）",
      highlights: [
        "地理位置無敵：八方纜車站正對面，租完轉身直接搭纜車上山",
        "線上預約享早鳥折扣，支援住宿接送服務"
      ],
      advancedOptions: {
        hasAdvanced: true,
        title: "🚀 可選進階：Unlimited Swaps（無限更換）Demo 系列 ＋ 手工熱蠟",
        price: "3天約 ¥17,500–¥21,000",
        gear: "K2、Nitro、Faction、Jones 大山粉雪板與特技公園板，含每日專業高溫熱蠟（Hot Waxing Tuning）",
        feature: "八方纜車站前直達！每天看窗外降雪量，早上直接進店挑當天最合適的板型，天天免費無限換"
      },
      pros: "去八方尾根最省力，進階高手想試乘各種粉雪板首選",
      cons: "若不滑八方尾根，需把雪具搬上車載運",
      bookingUrl: "https://centralsnowsports.com.au/hakuba"
    },
    {
      id: "woody",
      name: "Woody Rental（ウッディレンタル）",
      badge: "💰 小資高 CP 值老字號",
      badgeType: "budget",
      tagline: "白馬在地平價老字號，比大連鎖店便宜 15–20%",
      price3Day: "約 ¥11,000 – ¥13,000 / 3天（超實惠標準款）",
      highlights: [
        "白馬村老牌在地經營，價格親民實惠，省錢首選",
        "八方、岩岳周邊設有店鋪，工作人員親切質樸",
        "初學者套裝性價比極高，雪衣雪褲尺碼齊全"
      ],
      advancedOptions: {
        hasAdvanced: true,
        title: "💰 可選進階：Expert Series（中高階硬度專家板）",
        price: "3天約 ¥14,000–¥15,500",
        gear: "Salomon、Head 中高階硬度刻雪雙板與單板，適合高速巡航與 Carving",
        feature: "比大型連鎖店的進階款便宜約 ¥3,000–¥4,000，適合想升級裝備又注重預算的進階者"
      },
      pros: "租金最划算，8 人同行能大幅節省租具開銷",
      cons: "裝備年式較大連鎖店稍舊，無跨區連鎖換裝點",
      bookingUrl: "https://woody-rental.com/"
    }
  ]
};
