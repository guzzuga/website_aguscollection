#!/bin/bash
# Auto-fix script: clears Next.js cache and restarts dev server + ngrok
# Run when CSS stops loading or page appears unstyled

echo "🔧 Mengatasi cache korup Next.js..."

cd ~/websiteAS

# Kill existing processes
pkill -f "next dev" 2>/dev/null
pkill -f "ngrok http 3000" 2>/dev/null
sleep 1

# Force kill if still running
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:4040 | xargs kill -9 2>/dev/null
sleep 1

# Clear cache
rm -rf .next node_modules/.cache
echo "✅ Cache cleared"

# Start dev server
npx next dev --port 3000 &
DEV_PID=$!
echo "✅ Dev server started (PID: $DEV_PID)"

# Wait for compile
echo "⏳ Menunggu compile..."
for i in $(seq 1 30); do
    if curl -s http://localhost:3000/ | grep -q "Agus Collection"; then
        sleep 3
        break
    fi
    sleep 1
done

# Verify CSS
CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/_next/static/css/app/layout.css)
if [ "$CSS_STATUS" = "200" ]; then
    echo "✅ CSS loaded (HTTP $CSS_STATUS)"
else
    echo "❌ CSS gagal load (HTTP $CSS_STATUS). Retry..."
    exit 1
fi

# Start ngrok
~/bin/ngrok http 3000 &
NGROK_PID=$!
echo "✅ Ngrok started (PID: $NGROK_PID)"

echo ""
echo "🎉 Website siap!"
echo "   Lokal: http://localhost:3000"
echo "   Ngrok: ~/bin/ngrok http 3000 (cek URL di terminal)"