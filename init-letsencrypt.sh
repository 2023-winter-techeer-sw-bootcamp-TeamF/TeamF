#!/bin/bash

echo "### Checking for docker-compose installation..."
if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

compose_file='docker-compose-dev.yml'
domains=(tairot.online)
rsa_key_size=4096
data_path="./certbot"
email="tjfgkssk9472@gmail.com" # Adding a valid address is strongly recommended
staging=1 # Set to 1 if you're testing your setup to avoid hitting request limits

echo "### Checking for existing data..."
if [ -d "$data_path" ]; then
    echo "Existing data found for $domains. Replacing existing certificate."
else
    echo "No existing data found for $domains. Proceeding with certificate generation."
fi

echo "### Checking for TLS parameters..."
if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Creating dummy certificate for $domains..."
path="$data_path/conf/live/$domains"
mkdir -p "$path"
echo "Running docker-compose for dummy certificate creation..."
docker-compose -f "$compose_file" run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo

echo "### Starting nginx..."
docker-compose -f "$compose_file" up --force-recreate -d nginx
echo

echo "### Deleting dummy certificate for $domains..."
echo "Running docker-compose to delete dummy certificate..."
docker-compose -f "$compose_file" run --rm --entrypoint "\
  rm -Rf $data_path/conf/live/$domains && \
  rm -Rf $data_path/conf/archive/$domains && \
  rm -Rf $data_path/conf/renewal/$domains.conf" certbot
echo

echo "### Requesting Let's Encrypt certificate for $domains..."
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

email_arg="--email $email"
if [ $staging != "0" ]; then
  staging_arg="--staging"
else
  staging_arg=""
fi

echo "Running docker-compose for Let's Encrypt certificate request..."
docker-compose -f "$compose_file" run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg $email_arg $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Reloading nginx..."
docker-compose -f "$compose_file" exec nginx nginx -s reload
