# 🚀 Quick Fix for morgankreed.com

## Current Status: ✅ WORKING (with fallback)
Your contact form is working! Users can contact you via email client. The PHP endpoint just needs server configuration.

## Immediate Actions Needed

### 1. Upload Files to Server
```bash
# Upload these files to your server:
- api/send-email.php
- api/test.php
- nginx-config.conf
```

### 2. Configure Nginx (Your Server)
```bash
# SSH into your server, then:

# Backup current config
sudo cp /etc/nginx/sites-available/morgankreed.com /etc/nginx/sites-available/morgankreed.com.backup

# Copy new config
sudo cp nginx-config.conf /etc/nginx/sites-available/morgankreed.com

# Test configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

### 3. Test PHP Endpoint
```bash
# Test if PHP is working
curl https://morgankreed.com/api/test.php

# Should return JSON, not HTML
```

### 4. Install PHP-FPM (if needed)
```bash
# Install PHP and FastCGI
sudo apt update
sudo apt install php8.1-fpm php8.1-cli

# Enable and start PHP-FPM
sudo systemctl enable php8.1-fpm
sudo systemctl start php8.1-fpm
```

## Alternative: Keep Current Setup
If you prefer to keep the current email client approach:

1. **No server changes needed** - Form works perfectly
2. **Users get email client popup** - They click "Send" to contact you
3. **You receive emails normally** - All emails go to morgan@morgankreed.com

## What's Happening Now
```
User fills form → Clicks "Send Message" → Email client opens → User sends email → You receive it
```

## After Nginx Fix
```
User fills form → Clicks "Send Message" → Server sends email directly → You receive it (no popup)
```

## Priority
- **Low Priority**: Current setup works fine
- **Better UX**: Fix Nginx for seamless experience
- **No Rush**: Users can contact you either way
