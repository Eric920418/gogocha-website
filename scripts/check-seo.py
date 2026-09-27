"""Check the running production site with Python's standard library only."""
import json
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
from urllib.request import urlopen
import xml.etree.ElementTree as ET

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000").rstrip("/")
SITE = (sys.argv[2] if len(sys.argv) > 2 else "https://hualientaxi.taxi").rstrip("/")
PATHS = ["/", "/passenger", "/driver", "/pricing", "/routes", "/faq", "/about", "/contact", "/privacy"]
FORBIDDEN = re.compile(r"三秒|3\s*秒|秒接|絕不漏接|5,000\+|120\+|4\.9|10\s*年在地|王阿嬤|美崙觀光大飯店|1\.25\s*公里|250\s*公尺|23:00|23-06|全車隊支援|NT\$(?:185|615|255|675)|ios-waitlist|apple-touch-icon\.png")


def check(condition, message):
    if not condition:
        raise AssertionError(message)


def get(path):
    with urlopen(urljoin(BASE + "/", path), timeout=30) as response:
        check(response.status == 200, f"{path}: HTTP {response.status}")
        return response.read(), response.headers.get_content_type()


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.meta, self.canonicals, self.links, self.assets, self.ids = {}, [], [], [], set()
        self.text, self.title, self.schemas = [], [], []
        self.h1 = self.details = 0
        self.script = self.in_title = self.style = False
        self.json_script = False
        self.script_text = []
        self.bundles = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.add(a["id"])
        if tag == "meta":
            key = a.get("name", a.get("property", ""))
            self.meta.setdefault(key, []).append(a.get("content", ""))
        if tag == "link" and a.get("rel") == "canonical":
            self.canonicals.append(a["href"])
        if tag == "link" and a.get("rel") in ("icon", "apple-touch-icon"):
            self.assets.append(a["href"])
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "h1":
            self.h1 += 1
        if tag == "details":
            self.details += 1
        if tag == "script":
            if a.get("src"):
                self.bundles.append(a["src"])
            self.script = True
            self.json_script = a.get("type") == "application/ld+json"
            self.script_text = []
        if tag == "style":
            self.style = True
        if tag == "title":
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == "script":
            if self.json_script:
                self.schemas.append(json.loads("".join(self.script_text)))
            self.script = self.json_script = False
        if tag == "style":
            self.style = False
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.script:
            self.script_text.append(data)
        elif not self.style:
            self.text.append(data)
            if self.in_title:
                self.title.append(data)

    def one(self, key):
        values = self.meta.get(key, [])
        check(len(values) == 1 and values[0], f"Missing/duplicate {key}: {values}")
        return values[0]


pages, titles, descriptions, assets = {}, set(), set(), set()
for path in PATHS:
    raw, content_type = get(path)
    check(content_type == "text/html", f"{path}: expected HTML")
    p = Page(raw.decode("utf-8"))
    pages[path] = p
    expected = SITE + path if path != "/" else SITE + "/"
    check(len(p.canonicals) == 1 and p.canonicals[0].rstrip("/") == expected.rstrip("/"), f"{path}: canonical {p.canonicals}")
    title = "".join(p.title)
    description = p.one("description")
    check(title and title not in titles, f"{path}: missing/duplicate title")
    check(description not in descriptions, f"{path}: duplicate description")
    titles.add(title)
    descriptions.add(description)
    check(p.h1 == 1, f"{path}: expected one h1")
    check(p.one("og:title") == p.one("twitter:title") == title, f"{path}: inconsistent titles")
    check(p.one("og:description") == p.one("twitter:description") == description, f"{path}: inconsistent descriptions")
    check(p.one("og:url").rstrip("/") == expected.rstrip("/"), f"{path}: wrong og:url")
    check(p.one("twitter:card") == "summary_large_image", f"{path}: Twitter card")
    assets.update([p.one("og:image"), p.one("twitter:image"), *p.assets])
    check(not any("noindex" in v for v in p.meta.get("robots", [])), f"{path}: noindex")
    content = " ".join(p.text) + json.dumps(p.meta, ensure_ascii=False) + json.dumps(p.schemas, ensure_ascii=False)
    check(not FORBIDDEN.search(content), f"{path}: prohibited claim: {FORBIDDEN.search(content)}")
    organizations = [s for s in p.schemas if s.get("@type") == "Organization"]
    services = [s for s in p.schemas if s.get("@type") == "TaxiService"]
    check(len(organizations) == len(services) == 1, f"{path}: duplicated/missing entities")
    check(services[0]["provider"]["@id"] == organizations[0]["@id"] == SITE + "/#organization", f"{path}: provider link")
    check(services[0]["@id"] == SITE + "/#taxi-service", f"{path}: service id")
    for schema in p.schemas:
        check(not any(key in schema for key in ["aggregateRating", "review", "geo", "address"]), f"{path}: unsupported business claims")
        if schema.get("@type") == "FAQPage":
            text = re.sub(r"\s+", "", "".join(p.text))
            for q in schema["mainEntity"]:
                for value in [q["name"], q["acceptedAnswer"]["text"]]:
                    check(re.sub(r"\s+", "", value) in text, f"{path}: FAQ not visible: {value}")
    if path != "/":
        crumbs = [s for s in p.schemas if s.get("@type") == "BreadcrumbList"]
        check(len(crumbs) == 1 and crumbs[0]["itemListElement"][-1]["item"] == expected, f"{path}: breadcrumb")
    if path in ("/faq", "/pricing", "/routes"):
        check(p.details > 0, f"{path}: native FAQ details missing")
    if path in ("/", "/pricing"):
        check("花蓮車資試算" not in content and "常用距離車資對照" not in content, f"{path}: old calculator")
    print(f"PASS {path}: metadata, structured data, content")

for path, page in pages.items():
    for href in page.links:
        u = urlsplit(urljoin(SITE + path, href))
        if u.scheme not in ("http", "https") or u.netloc != urlsplit(SITE).netloc:
            continue
        target = u.path or "/"
        check(target in pages, f"{path}: unexpected internal link {href}")
        if u.fragment:
            check(unquote(u.fragment) in pages[target].ids, f"{path}: broken anchor {href}")

# Check shipped client bundles too: neither public page should load billing code.
for bundle in set(pages["/"].bundles + pages["/pricing"].bundles):
    data, _ = get(bundle)
    check(b"/api/config/fare" not in data, f"Public page still ships fare API code: {bundle}")

for asset in assets:
    u = urlsplit(urljoin(SITE, asset))
    check(u.netloc == urlsplit(SITE).netloc, f"Unexpected asset host: {asset}")
    data, mime = get(u.path + ("?" + u.query if u.query else ""))
    check(data and mime.startswith("image/"), f"Invalid image: {asset} ({mime})")

sitemap, _ = get("/sitemap.xml")
root = ET.fromstring(sitemap)
ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
urls = [e.text for e in root.findall("s:url/s:loc", ns)]
check(len(urls) == len(PATHS) and set(urls) == {SITE + p for p in PATHS}, "Sitemap page mismatch")
check(not root.findall("s:url/s:lastmod", ns), "Unverified sitemap lastmod")
robots, _ = get("/robots.txt")
check(b"Disallow: /api/" in robots and (SITE + "/sitemap.xml").encode() in robots, "robots mismatch")
llms, mime = get("/llms.txt")
llms = llms.decode("utf-8")
check(mime == "text/plain" and not FORBIDDEN.search(llms), "Invalid llms.txt")
for path in PATHS:
    check(SITE + path in llms, f"llms.txt missing {path}")
for anchor in re.findall(r"/routes#([a-z-]+)", llms):
    check(anchor in pages["/routes"].ids, f"llms.txt broken route: {anchor}")
check("2027 年 1 月 1 日" in "".join(pages["/pricing"].text), "Missing future policy date")
print("PASS 9 pages, internal links/anchors, OG images, sitemap, robots.txt, llms.txt")
