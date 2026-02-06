#!/bin/bash
cd /Users/bradleyroth/clawd/thorfunds-new/content/podcasts

# Worker 1 assignment - exact IDs from worker-assignments.json
IDS="17417025 17335420 17297139 17222141 17140478 17103327 17050339 17011027 16924098 16875452 16846928 16797128 16759457 16673252 16627106 16570789 16543594 16500845 16463751 16419024 16281040 16240064 16200465"

count=0
for id in $IDS; do
    # Skip if JSON already exists
    if [ -f "transcripts/${id}.json" ]; then
        echo "SKIP: $id (already exists)"
        continue
    fi
    
    # Check if MP3 exists, download if not
    if [ ! -f "audio/${id}.mp3" ] || [ ! -s "audio/${id}.mp3" ]; then
        echo "Downloading: $id"
        curl -L -s -A "Mozilla/5.0" -o "audio/${id}.mp3" "https://www.buzzsprout.com/2162961/episodes/${id}-.mp3" 2>/dev/null
        # Check again
        if [ ! -s "audio/${id}.mp3" ]; then
            echo "ERROR: Download failed for $id"
            continue
        fi
    fi
    
    echo "Transcribing: $id"
    
    # Transcribe
    ~/.local/bin/whisper "audio/${id}.mp3" --model tiny --output_format txt --output_dir transcripts/ 2>/dev/null
    
    # Create JSON from txt
    if [ -f "transcripts/${id}.txt" ]; then
        txt_content=$(cat "transcripts/${id}.txt")
        escaped=$(echo "$txt_content" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')
        echo "{\"id\": \"$id\", \"transcript\": $escaped}" > "transcripts/${id}.json"
        rm -f "audio/${id}.mp3"
        rm -f "transcripts/${id}.txt"
        count=$((count + 1))
        echo "DONE: $id ($count completed)"
    else
        echo "ERROR: Transcription failed for $id"
    fi
done

echo "Worker 1 finished: $count episodes transcribed"
