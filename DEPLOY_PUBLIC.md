# STATESHIFT PUBLIC MVP - DEPLOYMENT GUIDE

## Overview

This is the public, monetizable version of Stateshift. Users:
1. Pay on Wix → get access code
2. Enter code on Stateshift site
3. Connect their own Spotify
4. Get personalized playlists based on their music taste

---

## STEP 1: Spotify Developer Setup

### Get your Client ID:

1. Go to: https://developer.spotify.com/dashboard
2. Select your existing app (or create new one)
3. Copy the **Client ID** (you'll need this)

### Add Redirect URI:

1. In your Spotify app settings, click **Edit Settings**
2. Add these Redirect URIs:
   - `http://localhost:3000/callback` (for testing)
   - `https://your-vercel-domain.vercel.app/callback` (for production)
3. Save

---

## STEP 2: n8n Workflow Setup

1. Import `Stateshift-Public-MVP.json` into n8n
2. The workflow now accepts `spotify_access_token` and `spotify_user_id` from the frontend
3. No hardcoded Spotify credentials needed for playlist creation
4. Activate the workflow

**Note:** The "Get User Top Artists" node needs updating. In n8n:
1. Click on that node
2. Change authentication to use the token passed from frontend
3. Update the header to: `Authorization: Bearer {{ $json.body.spotify_access_token }}`

---

## STEP 3: Create Access Codes for Wix

You control access codes in the environment variables.

### Simple approach (for MVP):
Add codes directly in Vercel environment variables:
```
NEXT_PUBLIC_VALID_CODES=MUSESHIFT001,MUSESHIFT002,MUSESHIFT003
```

### How it works:
1. Create unique codes (e.g., MUSESHIFT001, MUSESHIFT002, etc.)
2. When someone pays on Wix, manually email them a code
3. They enter the code on Stateshift to unlock access

### Future upgrade:
- Connect to a database (Airtable, Supabase) to generate/validate codes automatically
- Wix webhook triggers code generation on purchase

---

## STEP 4: Deploy Frontend to Vercel

### Create GitHub repo:

```bash
cd "/Users/amonette/Library/CloudStorage/OneDrive-UniWorldGroupInc/Computer/Downloads/Downloads/stateshift-public"
git init
git add .
git commit -m "Initial commit: Stateshift Public MVP"
git remote add origin https://github.com/MUSESHIFT/stateshift-public.git
git push -u origin main
```

### Deploy on Vercel:

1. Go to vercel.com → Add New Project
2. Import `stateshift-public` repo
3. Add Environment Variables:
   - `NEXT_PUBLIC_WEBHOOK_URL` = your ngrok URL + `/webhook`
   - `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` = your Spotify app client ID
   - `NEXT_PUBLIC_VALID_CODES` = comma-separated access codes
4. Deploy

### Update Spotify Redirect URI:

After deployment, add your Vercel URL to Spotify:
- `https://stateshift-public.vercel.app/callback`

---

## STEP 5: Wix Payment Setup

### Create product on Wix:

1. Create a digital product: "Stateshift Access"
2. Set your price
3. In the "Thank You" page or confirmation email, include:
   - The access code
   - Link to stateshift site

### Manual flow (MVP):
1. Customer pays on Wix
2. You get notification
3. You email them an access code
4. They use it on Stateshift

### Future automation:
- Wix Automations can send emails with codes
- Or use Wix Velo + API to auto-generate codes

---

## STEP 6: Test Everything

1. Go to your Vercel URL
2. Enter a valid access code
3. Connect Spotify (you'll be redirected to Spotify auth)
4. After connecting, describe a state
5. Select a pathway
6. Verify playlist appears in your Spotify

---

## Environment Variables Summary

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_WEBHOOK_URL` | `https://your-ngrok.ngrok-free.dev/webhook` |
| `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` | Your Spotify app's Client ID |
| `NEXT_PUBLIC_VALID_CODES` | `CODE1,CODE2,CODE3` |

---

## Files Included

| File | Purpose |
|------|---------|
| `Stateshift-Public-MVP.json` | n8n workflow (uses user's Spotify token) |
| `stateshift-public/` | Frontend with OAuth + access codes |

---

## Limitations (Dev Mode)

- Max 25 Spotify users until Extended Quota approved
- Apply at: developer.spotify.com/dashboard → Your App → Request Extension

---

## You're Ready!

Once deployed:
1. Send people to your Wix store
2. They pay → get code
3. They use Stateshift with their own Spotify
4. Playlists created in their account

This is your live product for the Spotify Extended Quota application.
