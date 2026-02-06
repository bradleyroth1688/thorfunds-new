#!/bin/bash
cd /Users/bradleyroth/clawd/thorfunds-new/content/podcasts

WHISPER=/Users/bradleyroth/.local/bin/whisper

# My batch of 23 episodes (indices 23-45)
declare -a IDS=(
  "16419024|https://www.buzzsprout.com/2162961/episodes/16419024-kevin-carter-emqq-global.mp3"
  "16281040|https://www.buzzsprout.com/2162961/episodes/16281040-david-dziekanski-quantify-funds.mp3"
  "16240064|https://www.buzzsprout.com/2162961/episodes/16240064-ai-in-finance-ut-catt-2024-global-analytics-conference-kyle-wiggs-suhir-holla-tal-schwartz.mp3"
  "16200465|https://www.buzzsprout.com/2162961/episodes/16200465-al-chu-american-beacon-glg-natural-resources-etf-mgnr.mp3"
  "16163375|https://www.buzzsprout.com/2162961/episodes/16163375-raymond-holst-practus.mp3"
  "16117620|https://www.buzzsprout.com/2162961/episodes/16117620-garrett-stevens-rich-malinowski-exchange-traded-concepts.mp3"
  "16078399|https://www.buzzsprout.com/2162961/episodes/16078399-brett-eichenberger-cohen-co.mp3"
  "16038462|https://www.buzzsprout.com/2162961/episodes/16038462-petra-bakosova-hull-tactical.mp3"
  "15997509|https://www.buzzsprout.com/2162961/episodes/15997509-joe-benoit-grimes-co.mp3"
  "15953265|https://www.buzzsprout.com/2162961/episodes/15953265-david-allen-octane-investments.mp3"
  "15916284|https://www.buzzsprout.com/2162961/episodes/15916284-federico-brokate-21shares.mp3"
  "15873205|https://www.buzzsprout.com/2162961/episodes/15873205-nancy-davis-quadratic-capital.mp3"
  "15834498|https://www.buzzsprout.com/2162961/episodes/15834498-mike-venuto-tidal-the-etf-masters.mp3"
  "15791286|https://www.buzzsprout.com/2162961/episodes/15791286-sylvia-jablonski-defiance-etfs.mp3"
  "15707534|https://www.buzzsprout.com/2162961/episodes/15707534-james-st-aubin-ocean-park-asset-management.mp3"
  "15633947|https://www.buzzsprout.com/2162961/episodes/15633947-springer-harris-get-etf-d.mp3"
  "15597367|https://www.buzzsprout.com/2162961/episodes/15597367-howard-chan-kurv-investment-management.mp3"
  "15561979|https://www.buzzsprout.com/2162961/episodes/15561979-joanna-gallegos-bondbloxx.mp3"
  "15523679|https://www.buzzsprout.com/2162961/episodes/15523679-taylor-krystkowiak-themesetfs.mp3"
  "15484014|https://www.buzzsprout.com/2162961/episodes/15484014-will-rhind-graniteshares.mp3"
  "15446649|https://www.buzzsprout.com/2162961/episodes/15446649-tim-kramer-cnic-funds.mp3"
  "15412002|https://www.buzzsprout.com/2162961/episodes/15412002-meb-faber-cambria-investments.mp3"
  "15365878|https://www.buzzsprout.com/2162961/episodes/15365878-john-mchugh-wealthtrust-asset-management.mp3"
)

count=0
for item in "${IDS[@]}"; do
  id="${item%%|*}"
  url="${item#*|}"
  
  # Skip if JSON already exists
  if [ -f "transcripts/${id}.json" ]; then
    echo "SKIP $id (already exists)"
    continue
  fi
  
  echo "Processing $id..."
  
  # Download
  curl -L -A "Mozilla/5.0" -s -o "audio/${id}.mp3" "$url"
  if [ ! -s "audio/${id}.mp3" ]; then
    echo "FAIL download $id"
    continue
  fi
  
  # Transcribe
  $WHISPER "audio/${id}.mp3" --model tiny --output_format txt --output_dir transcripts/ 2>/dev/null
  
  # Create JSON from txt
  if [ -f "transcripts/${id}.txt" ]; then
    txt_content=$(cat "transcripts/${id}.txt")
    echo "{\"transcript\": $(echo "$txt_content" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')}" > "transcripts/${id}.json"
    rm "transcripts/${id}.txt"
    echo "OK $id"
    ((count++))
  else
    echo "FAIL transcribe $id"
  fi
  
  # Cleanup audio
  rm -f "audio/${id}.mp3"
done

echo "Completed: $count episodes"
