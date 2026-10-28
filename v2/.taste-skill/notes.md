# Notes — hakuba-2027 v2 (tasteskill)

## Inventory (what only this trip has)
1. 8 people, mixed skill, 18–20 Jan 2027, Mon–Wed, all weekdays.
2. Base is Ōmachi (大町市), not Hakuba village. Every morning: Route 148 north past 木崎湖・中綱湖・青木湖, 佐野坂峠 black ice.
3. Six resorts strung along the road south→north by distance from Ōmachi: 鹿島槍 16 km, 八方 30, 岩岳 33, 栂池 36, 乘鞍 38, Cortina 40.
4. El Niño 2026–27 (NOAA 10/8 strong); JMA 9/18 outlook: Japan Sea side snow below normal 50%. So summit height is the argument: 八方 1,831, 栂池 1,704, Cortina 1,402, 鹿島槍 1,320, 岩岳 1,289, 乘鞍 1,280.
5. Early-bird prices per resort vs the ¥32,200 valley 3-day pass; ¥103,200 saved for 8.
6. 07:30 departure to beat the snowploughs; two 4WD cars, not a Hiace.
7. Printed things: the IC lift card, the WAmazing QR, the resort trail map, the Route 148 sign.
8. Places: 鐘の鳴る丘 1,200 m wide; Hotel Green Plaza red castle; Mountain Harbor + City Bakery; 1998 Olympic downhill; Central Plaza 1130 Highland Spa over 青木湖; 咲花 lot 8.
9. Rental: Sunshine (中文 LINE, pick up day before), Spicy (cross-store swap), Rhythm, Central, Woody.

## Idea
On this page, **the drive up Route 148 from Ōmachi, with the six resorts passing one after another** becomes **the pinned poster: the title 白馬 2027 holds while the six stops pass beneath it as covers, each with its distance from Ōmachi and its summit height.**
Competitor test: another Hakuba guide starts in Hakuba village and lists by fame; this one is ordered by the road from Ōmachi and by summit height for a warm winter. Only this trip.

## Live thing
"我是誰" — pick 新手 / 中級 / 進階 / 看風景 on the resort stage; every resort card then shows *your* zone. Stored in localStorage so each of the 8 sees their own. Fallback: the dialog shows all four zones.
Secondary control: the ticket — pick a resort for each of the three days and the number of people; the ticket and the big figure update.

## Direction
Pinned poster, seed 1688764439, sector event. Redraws: intro → right-half-paragraph (pin budget: two held stages max — hero + showcase); how-it-works → itinerary-on-a-slip (content is a timed route and the section must hold the required map). Type: CJK page, dealt Latin faces replaced by Noto Sans TC (display, 900) + Noto Serif TC (text). Palette: dealt proportions kept; greys tilted cold (overcast snow sky), accent = pine green.

## Argument
1. Hero: 8 of us, 18–20 Jan 2027, driving up from Ōmachi. → title + six covers.
2. Intro: warm winter → summit height decides. → statement + elevation profile drawn to scale.
3. Showcase: six resorts, your zone at each. → cards over the range, level selector, dialog.
4. Drive: from Ōmachi, 07:30, the lakes, where to park. → slip on the real map.
5. Pricing: buy early-bird per day, not the valley pass. → the ticket + planner.
6. Stats: what 8 people save. → one figure.
7. List: five rental shops at one size.
8. FAQ: ten questions as reading text.
9. Footer: Lake Aoki + menu + credits.
