#!/bin/bash
# Run once per domain after its DNS (both the bare name and www) points at this server:
#   /root/legacy-domains/issue-certs.sh azarhologram.ir you@example.com
# This registers with Let's Encrypt under your email; running it means you accept
# their Subscriber Agreement. It then issues a certificate for the domain and its www
# and switches the redirect server from the self-signed certificate to it.
set -euo pipefail
DOMAIN=${1:?domain, e.g. azarhologram.ir}
EMAIL=${2:?email for Let's Encrypt notices}
SITE=/etc/nginx/sites-available/zz-legacy-domains
IP=45.139.11.95

for host in "$DOMAIN" "www.$DOMAIN"; do
  got=$(dig +short A "$host" @1.1.1.1 | tail -n1)
  if [ "$got" != "$IP" ]; then
    echo "$host resolves to '${got:-nothing}', not $IP; change the DNS first" >&2
    exit 1
  fi
done

certbot certonly --webroot -w /var/www/letsencrypt \
  -d "$DOMAIN" -d "www.$DOMAIN" --cert-name "$DOMAIN" \
  -m "$EMAIL" --agree-tos --non-interactive \
  --deploy-hook "systemctl reload nginx"

sed -i \
  -e "s#/etc/nginx/ssl/legacy-selfsigned-$DOMAIN.pem#/etc/letsencrypt/live/$DOMAIN/fullchain.pem#" \
  -e "s#/etc/nginx/ssl/legacy-selfsigned-$DOMAIN.key#/etc/letsencrypt/live/$DOMAIN/privkey.pem#" \
  "$SITE"
nginx -t
systemctl reload nginx
echo "https://$DOMAIN now redirects with a valid certificate"
