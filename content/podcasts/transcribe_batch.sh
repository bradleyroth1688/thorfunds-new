#!/bin/bash
cd /Users/bradleyroth/clawd/thorfunds-new/content/podcasts

# List of IDs to process (my batch, excluding 17529585 which already exists)
IDS="17496282 17417025 17335420 17297139 17222141 17140478 17103327 17050339 17011027 16924098 16875452 16846928 16797128 16759457 16673252 16627106 16570789"

count=0
for id in $IDS; do
    # Skip if JSON already exists
    if [ -f "transcripts/${id}.json" ]; then
        echo "SKIP: $id (already exists)"
        continue
    fi
    
    # Check if MP3 exists
    if [ ! -f "audio/${id}.mp3" ]; then
        echo "SKIP: $id (no MP3)"
        continue
    fi
    
    echo "Processing: $id"
    
    # Transcribe
    ~/.local/bin/whisper "audio/${id}.mp3" --model tiny --output_format txt --output_dir transcripts/ 2>/dev/null
    
    # Create JSON from txt
    if [ -f "transcripts/${id}.txt" ]; then
        # Read the transcript and create JSON
        txt_content=$(cat "transcripts/${id}.txt")
        # Escape for JSON
        escaped=$(echo "$txt_content" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')
        echo "{\"id\": \"$id\", \"transcript\": $escaped}" > "transcripts/${id}.json"
        
        # Clean up MP3 to save space
        rm -f "audio/${id}.mp3"
        
        count=$((count + 1))
        echo "DONE: $id ($count completed)"
    else
        echo "ERROR: $id transcription failed"
    fi
done

echo "Total completed: $count"
