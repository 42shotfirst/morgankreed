# Server Setup for morgankreed.com

## Current Issues
- **405 Method Not Allowed**: Nginx not configured to handle POST requests to PHP files
- **HTML response instead of JSON**: PHP files not executing properly
- **Server**: Nginx/1.22.1 (confirmed from error log)

## Quick Fixes

### 1. Upload Files to Server
Make sure these files are uploaded to your server:
- `api/send-email.php`
- `api/test.php` 
- `api/.htaccess`
- `.htaccess` (root directory)

### 2. Test PHP is Working
Visit: `https://morgankreed.com/api/test.php`
You should see JSON output, not HTML.

### 3. Common Server Configuration Issues

#### Apache Configuration
Add to your virtual host or `.htaccess`:
```apache
# Enable PHP execution
<Files "*.php">
    Order allow,deny
    Allow from all
</Files>

# Enable mod_rewrite
RewriteEngine On

# Allow POST requests to PHP files
<Limit POST>
    Order allow,deny
    Allow from all
</Limit>
```

#### Nginx Configuration (YOUR SERVER)
Your server is running Nginx/1.22.1. Use the complete configuration in `nginx-config.conf`:

```bash
# Copy the nginx configuration
sudo cp nginx-config.conf /etc/nginx/sites-available/morgankreed.com

# Enable the site
sudo ln -s /etc/nginx/sites-available/morgankreed.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

**Key Nginx Settings:**
- Enable CORS for `/api/` endpoints
- Process PHP files with FastCGI
- Handle POST requests to PHP files
- Proper fallback routing

### 4. Check File Permissions
```bash
# Set proper permissions
chmod 644 api/send-email.php
chmod 644 api/test.php
chmod 644 .htaccess
chmod 755 api/
```

### 5. Test Email Function
```bash
# Test if mail() function works
php -r "if(function_exists('mail')) echo 'Mail function available'; else echo 'Mail function NOT available';"
```

### 6. Alternative: Use SMTP
If `mail()` function doesn't work, update `api/send-email.php` to use SMTP:

```php
// Add this at the top of send-email.php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

// Replace the mail() call with PHPMailer
$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'your-smtp-server.com';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@domain.com';
$mail->Password = 'your-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->setFrom('noreply@morgankreed.com', 'Portfolio Contact');
$mail->addAddress('morgan@morgankreed.com');
$mail->addReplyTo($email, $name);

$mail->isHTML(false);
$mail->Subject = $email_subject;
$mail->Body = $email_body;

$mail->send();
```

## Debugging Steps

1. **Check if PHP is working**: Visit `https://morgankreed.com/api/test.php`
2. **Check server logs**: Look at Apache/Nginx error logs
3. **Test mail function**: Check if `mail()` is available
4. **Check file permissions**: Ensure PHP files are readable
5. **Test with curl**:
```bash
curl -X POST https://morgankreed.com/api/test.php \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## Current Fallback
The form will fall back to opening the user's email client if PHP fails, so it's still functional.
