#!/bin/bash
# Download and transcribe podcast episodes
# Usage: ./download-and-transcribe.sh [number_of_episodes]

EPISODES_DIR="/Users/bradleyroth/clawd/thorfunds-new/podcasts/episodes"
TRANSCRIPTS_DIR="/Users/bradleyroth/clawd/thorfunds-new/podcasts/transcripts"
MP3_LIST="/Users/bradleyroth/clawd/thorfunds-new/podcasts/mp3-list.json"

mkdir -p "$EPISODES_DIR" "$TRANSCRIPTS_DIR"

NUM_EPISODES=${1:-5}

echo "Processing $NUM_EPISODES episodes..."

# Parse mp3-list.json and download/transcribe
node -e "
const fs = require('fs');
const list = JSON.parse(fs.readFileSync('$MP3_LIST'));
const toProcess = list.slice(0, $NUM_EPISODES);
toProcess.forEach((ep, i) => {
  console.log(JSON.stringify({
    id: ep.id,
    slug: ep.slug,
    url: ep.url,
    guest: ep.guest
  }));
});
" | while read -r episode; do
  ID=$(echo "$episode" | jq -r '.id')
  SLUG=$(echo "$episode" | jq -r '.slug')
  URL=$(echo "$episode" | jq -r '.url')
  GUEST=$(echo "$episode" | jq -r '.guest')
  
  MP3_FILE="$EPISODES_DIR/${ID}.mp3"
  TRANSCRIPT_FILE="$TRANSCRIPTS_DIR/${ID}.txt"
  
  if [ -f "$TRANSCRIPT_FILE" ]; then
    echo "✓ Transcript exists: $SLUG"
    continue
  fi
  
  if [ ! -f "$MP3_FILE" ]; then
    echo "⬇ Downloading: $SLUG"
    curl -sL "$URL" -o "$MP3_FILE"
  fi
  
  if [ -f "$MP3_FILE" ]; then
    echo "🎙 Transcribing: $SLUG"
    whisper "$MP3_FILE" --model base --output_format txt --output_dir "$TRANSCRIPTS_DIR"
    # Rename to match ID
    if [ -f "$TRANSCRIPTS_DIR/${ID}.txt" ]; then
      echo "✓ Transcribed: $SLUG"
    else
      # Try finding the output file
      TEMP_FILE="$TRANSCRIPTS_DIR/$(basename "$MP3_FILE" .mp3).txt"
      if [ -f "$TEMP_FILE" ]; then
        mv "$TEMP_FILE" "$TRANSCRIPT_FILE"
        echo "✓ Transcribed: $SLUG"
      fi
    fi
  fi
done

echo "Done!"
