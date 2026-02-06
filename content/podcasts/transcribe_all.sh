#!/bin/bash
# Batch transcription script for Behind the Ticker podcast

AUDIO_DIR="/Users/bradleyroth/clawd/thorfunds-new/content/podcasts/audio"
TRANSCRIPT_DIR="/Users/bradleyroth/clawd/thorfunds-new/content/podcasts/transcripts"
MANIFEST="/Users/bradleyroth/clawd/thorfunds-new/content/podcasts/manifest.json"
WHISPER="/Users/bradleyroth/.local/bin/whisper"

mkdir -p "$AUDIO_DIR" "$TRANSCRIPT_DIR"

# Get total count
TOTAL=$(cat "$MANIFEST" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))")
echo "Total episodes: $TOTAL"

# Process each episode
COUNT=0
cat "$MANIFEST" | python3 -c "
import json
import sys
data = json.load(sys.stdin)
for ep in data:
    print(f\"{ep['id']}|{ep['mp3Url']}|{ep['title']}\")
" | while IFS='|' read -r ID URL TITLE; do
    COUNT=$((COUNT + 1))
    
    # Skip if already transcribed
    if [ -f "$TRANSCRIPT_DIR/${ID}.json" ]; then
        echo "[$COUNT/$TOTAL] SKIP: $ID (already done)"
        continue
    fi
    
    echo "[$COUNT/$TOTAL] Processing: $TITLE"
    
    # Download if needed
    if [ ! -f "$AUDIO_DIR/${ID}.mp3" ]; then
        echo "  Downloading..."
        curl -L -s -o "$AUDIO_DIR/${ID}.mp3" "$URL"
    fi
    
    # Transcribe
    if [ -f "$AUDIO_DIR/${ID}.mp3" ]; then
        echo "  Transcribing..."
        cd "$TRANSCRIPT_DIR"
        "$WHISPER" "$AUDIO_DIR/${ID}.mp3" --model base --output_format txt --output_dir "$TRANSCRIPT_DIR" --fp16 False 2>/dev/null
        
        # Find the output file (whisper names it after the input file)
        TRANS_FILE=$(ls -1 "$TRANSCRIPT_DIR"/*.txt 2>/dev/null | head -1)
        
        if [ -n "$TRANS_FILE" ] && [ -f "$TRANS_FILE" ]; then
            TRANSCRIPT=$(cat "$TRANS_FILE")
            python3 << EOF
import json
transcript = """$TRANSCRIPT"""
data = {
    'id': '$ID',
    'transcript': transcript.strip(),
    'keyQuotes': [],
    'topics': [],
    'guestBio': ''
}
with open('$TRANSCRIPT_DIR/${ID}.json', 'w') as f:
    json.dump(data, f, indent=2)
EOF
            rm -f "$TRANS_FILE"
            echo "  Done: ${ID}.json"
        else
            echo "  WARNING: No transcript generated for $ID"
        fi
    fi
    
    # Progress update every 10 episodes
    if [ $((COUNT % 10)) -eq 0 ]; then
        echo "=== PROGRESS: $COUNT/$TOTAL episodes processed ==="
    fi
done

echo "=== TRANSCRIPTION COMPLETE ==="
echo "JSON files created:"
ls -la "$TRANSCRIPT_DIR"/*.json 2>/dev/null | wc -l
