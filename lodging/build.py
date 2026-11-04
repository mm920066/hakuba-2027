"""Build lodging/data.js from lodgings.json + the headline choices below.
Run:  python3 lodging/build.py   (from repo root)"""
import json, pathlib
here = pathlib.Path(__file__).parent
L = json.load(open(here / 'lodgings.json'))
R = json.load(open(here / 'resorts.json'))
by = {h['id']: h for h in L['lodgings']}
BK = 'checkin=2027-01-17&checkout=2027-01-20&group_children=0'
JL = 'stayYear=2027&stayMonth=1&stayDay=17&stayCount=3&roomCount=4&adultNum=2&roomCrack=200000,200000,200000,300000'

# 每間挑一個「代表方案」做比較；其他方案列在詳情裡
H = {
 'santein-otari': dict(no=1, short='サンテインおたり', pp=2434, total=65731, meals='早晚', plan='含兩餐（雙床×3＋和室）', tax=True, cancel='待確認',
   book=[('一休', 'https://www.ikyu.com/zh-tw/00917679/?cid=20270117&cod=20270120&lc=3&ppc=2&si=1&top=rooms')]),
 'shiroi-terrace': dict(no=2, short='白いテラス', pp=1990, total=53638, meals='早', plan='含早・共用衛浴組合', tax=False, cancel='不可退款',
   book=[('Booking', f'https://www.booking.com/hotel/jp/bai-iterasu.zh-tw.html?{BK}&group_adults=9&no_rooms=4')]),
 'bettei-shirouma': dict(no=3, short='別邸しろうま', pp=1119, total=30224, meals='', bf_add=311, plan='整棟包棟（9 人分攤）', tax=False, cancel='11/18 前免費取消',
   warn='Booking 上限 8 人，第 9 人要先問屋主',
   book=[('Booking', f'https://www.booking.com/hotel/jp/bettei-shirouma.zh-tw.html?{BK}&group_adults=8&no_rooms=1')]),
 'arisu-no-izumi': dict(no=4, short='アリスの泉', pp=1941, total=52409, meals='', plan='全私人衛浴組合（App 價）', tax=True, cancel='不可退款',
   book=[('Booking', f'https://www.booking.com/hotel/jp/arisunoquan.zh-tw.html?{BK}&group_adults=9&no_rooms=4')]),
 'summer-leaves': dict(no=5, short='Summer Leaves', pp=2890, total=78018, meals='早', plan='含早・雙人房全私人衛浴（App 價）', tax=False, cancel='12/18 前免費取消',
   book=[('Booking', f'https://www.booking.com/hotel/jp/summer-leaves.zh-tw.html?{BK}&group_adults=9&no_rooms=4')]),
 'life-apartment': dict(no=6, short='L!fe Apartment', pp=2722, total=73496, meals='', plan='只剩 3 間公寓', tax=False, cancel='不可退款', out='只剩 3 間，湊不到 4 房',
   book=[('Booking', f'https://www.booking.com/hotel/jp/l-fe-apartment-hakuba.zh-tw.html?{BK}&group_adults=9&no_rooms=3')]),
 'exce-hakuba': dict(no=7, short='エクセ白馬', pp=1841, total=49695, meals='', plan='Booking 單房公寓×3＋三人房', tax=False, cancel='不可退款',
   book=[('Booking', f'https://www.booking.com/searchresults.zh-tw.html?ss=%E3%82%B3%E3%83%B3%E3%83%89%E3%83%9F%E3%83%8B%E3%82%A2%E3%83%A0%E3%82%A8%E3%82%AF%E3%82%BB%E7%99%BD%E9%A6%AC&{BK}&group_adults=9&no_rooms=4'),
         ('Agoda', 'https://www.agoda.com/zh-tw/accom/property?propertyId=3088014&checkIn=2027-01-17&los=3&adults=9&rooms=4&currencyCode=TWD')]),
 'marukin': dict(no=8, short='丸金旅館', pp=3110, total=83980, meals='早', plan='含早・和室附衛浴', tax=True, cancel='11/27 前免費取消',
   book=[('じゃらん', f'https://www.jalan.net/yad372680/plan/?{JL}')]),
 'eve-plaza': dict(no=9, short='イヴプラザ', pp=2844, total=76797, meals='早', plan='特價週 含早・共用廁所', tax=True, cancel='11/17 前免費取消',
   warn='11/17 後取消要付 100%；特價方案只能在 11/19 前預訂',
   book=[('じゃらん', f'https://www.jalan.net/yad318774/plan/?{JL}')]),
 'hakubaso': dict(no=10, short='ホテル白馬荘', pp=2159, total=58280, meals='早', plan='含早', tax=True, cancel='1/9 前免費取消', out='太北：到八方約 1 小時',
   book=[('じゃらん', f'https://www.jalan.net/yad338804/plan/?{JL}')]),
 'schoendorf-yh': dict(no=11, short='シェーンドルフ YH', pp=1876, total=50650, meals='', plan='不含餐・上下舖', tax=True, cancel='1/9 前免費取消', out='上下舖青旅，同價有更好的',
   book=[('じゃらん', f'https://www.jalan.net/yad305104/plan/?{JL}')]),
 'hiyodori': dict(no=12, short='ひよどり山荘', pp=1269, total=34260, meals='', plan='不含餐（A 方案）', tax=True, cancel='1/9 前免費取消',
   book=[('じゃらん', f'https://www.jalan.net/yad313570/plan/?{JL}')]),
}
def rating10(r):
    if not r or r.get('score') is None: return None
    return round(r['score'] * (2 if r.get('scale') == 5 else 1), 1)
def rating_txt(r):
    if not r: return '—'
    s, c, p = r.get('score'), r.get('count'), r.get('platform', '')
    if s is None: return f"{p.split('（')[0]} 無分數" + (f"（{c} 則）" if c else '')
    return f"{s}{'/5' if r.get('scale') == 5 else ''} · {p.split('（')[0]}" + (f" {c} 則" if c else '')
def alt_plans(h):
    out = []
    for p in h.get('plans', []):
        if 'total_twd' in p: out.append((p['plan'], p['pp_night_twd'], p['total_twd']))
    for c in h.get('price_combos', []):
        if 'total' in c: out.append((c['label'] + '：' + c['rooms'], round(c['total'] / 27), c['total']))
    return out
items = []
for hid, d in H.items():
    h = by[hid]
    dist = h.get('distance_to_resorts', {})
    adj = d['pp'] + (0 if '早' in d['meals'] else d.get('bf_add', 300))
    items.append(dict(
        id=hid, no=d['no'], name=h['name'], short=d['short'], type=h['type'], area=h['area'],
        lat=h['lat'], lng=h['lng'], pp=d['pp'], ppBreakfast=adj, total=d['total'], meals=d['meals'],
        plan=d['plan'], tax=d['tax'], cancel=d['cancel'], warn=d.get('warn'), out=d.get('out'),
        rating=rating10(h.get('rating')), ratingText=rating_txt(h.get('rating')),
        ratingNote=(h.get('rating') or {}).get('summary', ''),
        fit=h.get('fits_group', ''), rooms=h.get('room_types', []),
        facilities=h.get('facilities', []), missing=h.get('missing', []),
        pros=h.get('pros', []), cons=h.get('cons', []),
        dist={k: v['min_winter'] for k, v in dist.items()}, nearest=h.get('nearest'),
        plans=alt_plans(h), book=d['book'], note=h.get('price_note', ''), cancelPolicy=h.get('cancel_policy', ''),
    ))
items.sort(key=lambda x: x['no'])
out = dict(updated='2026-11-04', fx=L['fx'], trip=L['trip'],
           resorts=[{k: r[k] for k in ('id', 'name', 'lat', 'lng')} for r in R['resorts']], lodgings=items)
(here / 'data.js').write_text('/* 由 lodging/build.py 產生，請改 lodgings.json 後重跑 */\nwindow.LODGING = ' +
                              json.dumps(out, ensure_ascii=False, indent=1) + ';\n')
print('ok', len(items))
