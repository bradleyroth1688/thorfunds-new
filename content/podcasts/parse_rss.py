#!/usr/bin/env python3
"""Parse RSS feed and create manifest.json"""
import xml.etree.ElementTree as ET
import json
import re

# Parse the RSS feed
tree = ET.parse('/Users/bradleyroth/clawd/thorfunds-new/content/podcasts/rss_feed.xml')
root = tree.getroot()

# Namespace handling
ns = {
    'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
    'content': 'http://purl.org/rss/1.0/modules/content/'
}

episodes = []
channel = root.find('channel')

for item in channel.findall('item'):
    # Get itunes:title or regular title
    itunes_title = item.find('itunes:title', ns)
    regular_title = item.find('title')
    title = itunes_title.text if itunes_title is not None and itunes_title.text else (regular_title.text if regular_title is not None else '')
    
    # Get description from itunes:summary
    summary = item.find('itunes:summary', ns)
    description = summary.text[:500] if summary is not None and summary.text else ''
    
    # Get MP3 URL from enclosure
    enclosure = item.find('enclosure')
    mp3_url = enclosure.get('url') if enclosure is not None else ''
    
    # Get pub date
    pub_date = item.find('pubDate')
    date_str = pub_date.text if pub_date is not None else ''
    
    # Get duration
    duration = item.find('itunes:duration', ns)
    duration_secs = int(duration.text) if duration is not None and duration.text and duration.text.isdigit() else 0
    duration_mins = duration_secs // 60
    duration_str = f"{duration_mins} min"
    
    # Get GUID for ID
    guid = item.find('guid')
    guid_text = guid.text if guid is not None else ''
    episode_id = re.search(r'Buzzsprout-(\d+)', guid_text)
    episode_id = episode_id.group(1) if episode_id else ''
    
    # Parse guest and company from title
    if title:
        parts = title.split(' - ')
        guest = parts[0].strip()
        company = parts[1].strip() if len(parts) > 1 else ''
    else:
        guest = ''
        company = ''
    
    if episode_id and mp3_url:
        episodes.append({
            "id": episode_id,
            "title": title,
            "guest": guest,
            "company": company,
            "date": date_str,
            "duration": duration_str,
            "mp3Url": mp3_url,
            "description": description
        })

print(f"Found {len(episodes)} episodes")

# Save manifest
with open('/Users/bradleyroth/clawd/thorfunds-new/content/podcasts/manifest.json', 'w') as f:
    json.dump(episodes, f, indent=2)

print("Manifest saved to manifest.json")
