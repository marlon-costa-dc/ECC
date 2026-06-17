# Homelab Pi-hole DNS Reference

Step-by-step reference for the `homelab-pihole-dns` skill.

## Docker Compose Install

```yaml
services:
  pihole:
    image: pihole/pihole:<pinned-release-tag>
    container_name: pihole
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "80:80/tcp"
    environment:
      TZ: "America/New_York"
      WEBPASSWORD: "${PIHOLE_WEBPASSWORD}"
      PIHOLE_DNS_: "1.1.1.1;1.0.0.1"
      DNSMASQ_LISTENING: "all"
    volumes:
      - "./etc-pihole:/etc/pihole"
      - "./etc-dnsmasq.d:/etc/dnsmasq.d"
    restart: unless-stopped
    cap_add:
      - NET_ADMIN
```

Pin a release tag; do not use `latest`. Set `PIHOLE_WEBPASSWORD` in a `.env` file with mode 600 and keep it out of git.

## Bare-Metal Install

Assign a static IP first. On Raspberry Pi OS edit `/etc/dhcpcd.conf`:

```text
interface eth0
static ip_address=192.168.3.2/24
static routers=192.168.3.1
static domain_name_servers=192.168.3.1
```

Download and review the installer before running it, then follow the interactive prompts.

## Pointing Your Network at Pi-hole

- **Router DHCP** (recommended): set Pi-hole IP as primary DNS in router DHCP settings; use a second Pi-hole for redundancy or leave secondary blank.
- **Per-device DNS**: set manually on Windows, macOS, or Linux for testing.
- **Pi-hole as DHCP server**: disable router DHCP first to avoid conflicts.

## Blocklist Management

Recommended blocklists:

- `https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts`
- `https://blocklistproject.github.io/Lists/malware.txt`
- `https://blocklistproject.github.io/Lists/tracking.txt`

Update Gravity after changing lists: Tools → Update Gravity. Whitelist false positives in Pi-hole admin → Whitelist.

## DNS-over-HTTPS Upstream

Install `cloudflared`, create `/etc/cloudflared/config.yml`:

```yaml
proxy-dns: true
proxy-dns-port: 5053
proxy-dns-upstream:
  - https://1.1.1.1/dns-query
  - https://1.0.0.1/dns-query
```

Run `sudo cloudflared service install`, then set Pi-hole custom upstream DNS to `127.0.0.1#5053` and uncheck other upstreams.

## Local DNS Records

Use `.home.arpa` (RFC 8375). Add records in Pi-hole admin → Local DNS → DNS Records:

| Domain | IP |
| --- | --- |
| nas.home.arpa | 192.168.30.10 |
| pi.home.arpa | 192.168.30.2 |
| grafana.home.arpa | 192.168.30.3 |

Add CNAMEs in Pi-hole admin → Local DNS → CNAME Records.

## Troubleshooting

```bash
pihole -q example.com        # Check why a domain is blocked
pihole -w example.com        # Whitelist immediately
pihole status                # Check if FTL is running
dig @192.168.3.2 google.com  # Test DNS directly
pihole restartdns            # Restart DNS
pihole -t                    # Live tail queries
pihole -g                    # Update gravity
```

## Anti-Patterns

- Depending on one Pi-hole without a recovery path.
- Installing Pi-hole without a static IP.
- Enabling Pi-hole DHCP without disabling the router's DHCP first.
- Never updating gravity.
- Using a public resolver as secondary when strict blocking is required.
