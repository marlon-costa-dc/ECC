# Interface Counter Reference

Counter meanings referenced from [../SKILL.md](../SKILL.md).

| Counter | Meaning | Common cause |
| --- | --- | --- |
| CRC | Received frame checksum failed | Bad cable, dirty fiber, bad optic, duplex mismatch |
| input errors | Aggregate receive-side errors | Check sub-counters before concluding |
| runts | Frames below minimum Ethernet size | Duplex mismatch, collision domain, faulty NIC |
| giants | Frames larger than expected MTU | MTU mismatch or jumbo-frame boundary |
| input drops | Device could not accept inbound packets | Burst, oversubscription, CPU path, queue pressure |
| output drops | Egress queue discarded packets | Congestion, QoS policy, undersized uplink |
| resets | Interface hardware reset | Flapping, keepalive, driver, optic, power |
| collisions | Ethernet collision counter | Half duplex or negotiation mismatch |
