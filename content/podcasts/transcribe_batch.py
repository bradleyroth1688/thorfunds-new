#!/usr/bin/env python3
"""
Batch transcription script for Behind the Ticker podcast.
Downloads and transcribes all episodes using Whisper.
"""

import json
import subprocess
import os
import glob
import sys
import time

AUDIO_DIR = "/Users/bradleyroth/clawd/thorfunds-new/content/podcasts/audio"
TRANSCRIPT_DIR = "/Users/bradleyroth/clawd/thorfunds-new/content/podcasts/transcripts"
MANIFEST = "/Users/bradleyroth/clawd/thorfunds-new/content/podcasts/manifest.json"
WHISPER = "/Users/bradleyroth/.local/bin/whisper"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(TRANSCRIPT_DIR, exist_ok=True)

# Load manifest
with open(MANIFEST) as f:
    episodes = json.load(f)

total = len(episodes)
print(f"Total episodes: {total}")
sys.stdout.flush()

for i, ep in enumerate(episodes, 1):
    episode_id = ep['id']
    mp3_url = ep['mp3Url']
    title = ep['title']
    
    json_path = os.path.join(TRANSCRIPT_DIR, f"{episode_id}.json")
    mp3_path = os.path.join(AUDIO_DIR, f"{episode_id}.mp3")
    
    # Skip if already transcribed
    if os.path.exists(json_path):
        print(f"[{i}/{total}] SKIP: {episode_id} (already done)")
        sys.stdout.flush()
        continue
    
    print(f"[{i}/{total}] Processing: {title}")
    sys.stdout.flush()
    
    # Download if needed (or re-download if file is too small/HTML)
    need_download = not os.path.exists(mp3_path)
    if os.path.exists(mp3_path) and os.path.getsize(mp3_path) < 100000:
        need_download = True  # Re-download if file is too small (likely error page)
    
    if need_download:
        print("  Downloading...")
        sys.stdout.flush()
        try:
            subprocess.run(
                ['curl', '-L', '-s', '-A', USER_AGENT, '-o', mp3_path, mp3_url],
                check=True,
                timeout=300
            )
        except subprocess.TimeoutExpired:
            print(f"  ERROR: Download timeout for {episode_id}")
            continue
        except subprocess.CalledProcessError as e:
            print(f"  ERROR: Download failed for {episode_id}: {e}")
            continue
    
    # Verify the download
    if os.path.exists(mp3_path):
        size = os.path.getsize(mp3_path)
        if size < 100000:
            print(f"  ERROR: File too small ({size} bytes), likely download error")
            os.remove(mp3_path)
            continue
    
    # Transcribe
    if os.path.exists(mp3_path):
        print("  Transcribing...")
        sys.stdout.flush()
        
        # Run whisper
        try:
            result = subprocess.run(
                [WHISPER, mp3_path, '--model', 'tiny', '--output_format', 'txt', 
                 '--output_dir', TRANSCRIPT_DIR, '--language', 'en'],
                capture_output=True,
                text=True,
                timeout=1800  # 30 min timeout
            )
        except subprocess.TimeoutExpired:
            print(f"  ERROR: Transcription timeout for {episode_id}")
            continue
        
        # Find the output file (whisper names it after the audio file)
        txt_files = glob.glob(os.path.join(TRANSCRIPT_DIR, "*.txt"))
        
        transcript = ""
        for txt_file in txt_files:
            with open(txt_file) as f:
                transcript = f.read()
            os.remove(txt_file)  # Clean up
            break
        
        if transcript:
            # Save as JSON
            data = {
                'id': episode_id,
                'transcript': transcript.strip(),
                'keyQuotes': [],
                'topics': [],
                'guestBio': ''
            }
            with open(json_path, 'w') as f:
                json.dump(data, f, indent=2)
            print(f"  Done: {episode_id}.json ({len(transcript)} chars)")
            sys.stdout.flush()
        else:
            print(f"  WARNING: No transcript generated for {episode_id}")
            if result.stderr:
                print(f"  Whisper stderr: {result.stderr[:500]}")
            sys.stdout.flush()
    
    # Progress update every 10 episodes
    if i % 10 == 0:
        completed = len(glob.glob(os.path.join(TRANSCRIPT_DIR, "*.json")))
        print(f"=== PROGRESS: {i}/{total} processed, {completed} transcripts completed ===")
        sys.stdout.flush()

# Final summary
completed = len(glob.glob(os.path.join(TRANSCRIPT_DIR, "*.json")))
print(f"\n=== TRANSCRIPTION COMPLETE ===")
print(f"Total episodes: {total}")
print(f"Transcripts created: {completed}")
