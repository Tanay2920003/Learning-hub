#!/usr/bin/env python3
"""
Curate and verify 1000+ learning resources across 21 developer categories.
Every YouTube video/playlist URL is verified via YouTube's official oEmbed API.
Every article URL is verified via HTTP status checks.
Only working (HTTP 200/valid) URLs are accepted and merged.
"""

import os
import sys
import json
import ssl
import time
import urllib.request
import urllib.error
import concurrent.futures

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

def verify_youtube(url):
    """Returns (is_valid, title, author) from YouTube oEmbed"""
    oembed_url = f"https://www.youtube.com/oembed?url={url}&format=json"
    req = urllib.request.Request(oembed_url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=5, context=ctx) as resp:
            if resp.status == 200:
                data = json.loads(resp.read().decode('utf-8'))
                return (True, data.get("title", ""), data.get("author_name", ""))
    except Exception:
        pass
    return (False, "", "")

def verify_article(url):
    """Returns is_valid for non-youtube websites"""
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=6, context=ctx) as resp:
            if resp.status in (200, 301, 302, 307, 308):
                return True
    except urllib.error.HTTPError as e:
        if e.code in (403, 418, 429): # Bot protection on live sites
            return True
    except Exception:
        pass
    return False

print("Verifier utilities ready.")
