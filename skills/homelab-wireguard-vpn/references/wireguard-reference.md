# Homelab WireGuard VPN Reference

Step-by-step reference for the `homelab-wireguard-vpn` skill.

## Server Setup (Linux)

```bash
sudo apt update && sudo apt install wireguard -y

sudo mkdir -p /etc/wireguard
sudo sh -c 'umask 077; wg genkey > /etc/wireguard/server_private.key'
sudo sh -c 'wg pubkey < /etc/wireguard/server_private.key > /etc/wireguard/server_public.key'

sudo tee /etc/wireguard/wg0.conf << 'EOF'
[Interface]
Address = 10.8.0.1/24
ListenPort = 51820
PrivateKey = <paste_server_private_key_here>

PostUp   = iptables -A FORWARD -i wg0 -o eth0 -j ACCEPT
PostUp   = iptables -A FORWARD -i eth0 -o wg0 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
PostUp   = iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -o eth0 -j ACCEPT
PostDown = iptables -D FORWARD -i eth0 -o wg0 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
PostDown = iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
PublicKey = <phone_public_key>
AllowedIPs = 10.8.0.2/32

[Peer]
PublicKey = <laptop_public_key>
AllowedIPs = 10.8.0.3/32
EOF
sudo chmod 600 /etc/wireguard/wg0.conf

echo "net.ipv4.ip_forward=1" | sudo tee /etc/sysctl.d/99-wireguard.conf
sudo sysctl --system

sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0
```

## Client Configuration

```text
[Interface]
PrivateKey = <phone_private_key>
Address = 10.8.0.2/32
DNS = 192.168.1.2

[Peer]
PublicKey = <server_public_key>
Endpoint = your-home-ip.ddns.net:51820
AllowedIPs = 192.168.1.0/24
PersistentKeepalive = 25
```

Use `AllowedIPs = 0.0.0.0/0, ::/0` for full tunnel. For multi-subnet split tunnel, list all home VLANs plus the VPN subnet.

## Key Generation

```bash
umask 077
wg genkey | tee phone_private.key | wg pubkey > phone_public.key
```

## pfSense / OPNsense

- VPN → WireGuard → Add Tunnel: generate keys, port 51820, address 10.8.0.1/24.
- Add Peer per client with public key and Allowed IPs.
- Assign the WireGuard interface and enable it.
- Firewall: WAN allow UDP 51820 inbound; WireGuard interface allow traffic to desired LAN networks.

## DDNS for Dynamic IPs

Cloudflare DDNS via `qmcgaw/ddns-updater` with credentials in a `ddns.env` file (mode 600, not committed).

DuckDNS script (`/usr/local/bin/update-duckdns`, mode 700):

```bash
#!/bin/sh
set -eu
. /etc/ddns.env
curl --fail --silent --show-error --max-time 10 \
  --get "https://www.duckdns.org/update" \
  --data-urlencode "domains=myhome" \
  --data-urlencode "token=${DUCKDNS_TOKEN}" \
  --data-urlencode "ip="
```

Cron: `*/5 * * * * /usr/local/bin/update-duckdns >/dev/null 2>&1`

## Troubleshooting

```bash
sudo wg show                       # Status and last handshake
sudo ufw status                    # Check firewall
sudo wg show wg0 public-key        # Compare to client config
cat /proc/sys/net/ipv4/ip_forward  # Should be 1
dmesg | grep wireguard             # Kernel errors
sudo wg-quick down wg0 && sudo wg-quick up wg0
```

## Anti-Patterns

- Storing private keys in version control or sharing them.
- Using full tunnel on mobile without considering home upload speed.
- Not setting PersistentKeepalive on mobile clients.
- Opening port 51820 but forgetting IP forwarding.
- Sharing a keypair across multiple devices.
- Using a broad `FORWARD ACCEPT` iptables rule.
