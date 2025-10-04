# GCP VM Deployment Guide

## Prerequisites
- GCP VM instance with Apache/Nginx and PHP installed
- Domain name pointed to your VM's IP address (optional but recommended)

## Deployment Steps

### 1. Install Required Software
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Apache and PHP
sudo apt install apache2 php php-cli php-mbstring php-curl -y

# Enable Apache
sudo systemctl enable apache2
sudo systemctl start apache2
```

### 2. Configure Apache
```bash
# Enable mod_rewrite for clean URLs
sudo a2enmod rewrite
sudo a2enmod headers

# Configure virtual host (replace with your domain)
sudo nano /etc/apache2/sites-available/your-domain.conf
```

Add this configuration:
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/html/morgankreed
    
    <Directory /var/www/html/morgankreed>
        AllowOverride All
        Require all granted
    </Directory>
    
    # Enable CORS for API
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header always set Access-Control-Allow-Headers "Content-Type"
    
    ErrorLog ${APACHE_LOG_DIR}/morgankreed_error.log
    CustomLog ${APACHE_LOG_DIR}/morgankreed_access.log combined
</VirtualHost>
```

### 3. Deploy Your Application
```bash
# Create project directory
sudo mkdir -p /var/www/html/morgankreed

# Copy your built files
sudo cp -r dist/* /var/www/html/morgankreed/
sudo cp -r api /var/www/html/morgankreed/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/html/morgankreed
sudo chmod -R 755 /var/www/html/morgankreed
```

### 4. Configure PHP Mail
```bash
# Install mail utilities
sudo apt install sendmail -y

# Configure sendmail (optional - for better email delivery)
sudo dpkg-reconfigure sendmail
```

### 5. SSL Certificate (Recommended)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache -y

# Get SSL certificate
sudo certbot --apache -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 6. Firewall Configuration
```bash
# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 7. Test the Contact Form
1. Visit your website
2. Fill out the contact form
3. Check if you receive the email at morgan@morgankreed.com
4. Check Apache logs: `sudo tail -f /var/log/apache2/morgankreed_error.log`

## Troubleshooting

### Email Not Working
1. Check if sendmail is running: `sudo systemctl status sendmail`
2. Test email manually: `echo "Test" | mail -s "Test Subject" your-email@example.com`
3. Check PHP mail configuration: `php -m | grep mail`

### CORS Issues
- Ensure the .htaccess file is in the api directory
- Check Apache headers module is enabled
- Verify CORS headers in PHP file

### File Permissions
```bash
sudo chown -R www-data:www-data /var/www/html/morgankreed
sudo chmod -R 755 /var/www/html/morgankreed
sudo chmod 666 /var/www/html/morgankreed/api/contact_log.txt
```

## Build and Deploy Script
Create a deployment script for easy updates:
```bash
#!/bin/bash
# deploy.sh

# Build the project
npm run build

# Copy to server (replace with your VM's IP)
rsync -avz --delete dist/ user@your-vm-ip:/var/www/html/morgankreed/
rsync -avz api/ user@your-vm-ip:/var/www/html/morgankreed/api/

echo "Deployment complete!"
```
