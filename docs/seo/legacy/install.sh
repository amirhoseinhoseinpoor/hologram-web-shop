#!/bin/bash
# Installs the redirects for the retired domains on the azarhologram.net server.
# Run from the folder that holds legacy-domains.conf and azarhologram-legacy-map.conf.
# Nothing changes for visitors until the domains' DNS points at this server.
set -euo pipefail
cd "$(dirname "$0")"

install -d /var/www/letsencrypt /etc/nginx/ssl
for d in azarhologram.co azarhologram.ir; do
  if [ ! -f "/etc/nginx/ssl/legacy-selfsigned-$d.pem" ]; then
    openssl req -x509 -nodes -newkey rsa:2048 -days 3650 -subj "/CN=$d" \
      -addext "subjectAltName=DNS:$d,DNS:www.$d" \
      -keyout "/etc/nginx/ssl/legacy-selfsigned-$d.key" \
      -out "/etc/nginx/ssl/legacy-selfsigned-$d.pem" 2>/dev/null
  fi
done

cp azarhologram-legacy-map.conf /etc/nginx/azarhologram-legacy-map.conf
# Keep any certificate paths issue-certs.sh already switched to.
if [ ! -f /etc/nginx/sites-available/zz-legacy-domains ]; then
  cp legacy-domains.conf /etc/nginx/sites-available/zz-legacy-domains
fi
ln -sf /etc/nginx/sites-available/zz-legacy-domains /etc/nginx/sites-enabled/zz-legacy-domains

if ! nginx -t 2>&1; then
  rm -f /etc/nginx/sites-enabled/zz-legacy-domains
  echo "nginx config test failed; legacy redirects not enabled" >&2
  exit 1
fi
systemctl reload nginx
echo "legacy redirects installed"
