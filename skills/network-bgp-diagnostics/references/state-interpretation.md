# BGP State Interpretation

State meanings referenced from [../SKILL.md](../SKILL.md).

| State | First checks |
| --- | --- |
| Established with prefixes | Inspect policy and table selection. |
| Established, zero prefixes | Check inbound policy, max-prefix, advertised routes, and AFI/SAFI. |
| Active | TCP not completing; check routing, source, ACLs, and reachability. |
| Connect | TCP in progress; check path and remote listener. |
| OpenSent/OpenConfirm | TCP works; check ASN, auth, timers, capabilities, and logs. |
| Idle | Neighbor disabled, missing config, blocked by policy, or in backoff. |
