+++
date = "2015-12-30T13:32:49Z"
draft = true
title = "Using Municipal Wifi as a Home Broadband Connection"

thumb_img = "/img/thumb/raspi-modem.jpg"
thumb_title = "Rasperry Pi Modem"
description = "Hacking a home broadband connection using BT Openzone."
+++


Set up the pi with Raspbian

---

Set up a DNS/DHCP server:

{{< highlight shell >}}
sudo apt-get update
apt-get install dnsmasq 
vim /etc/dnsmasq.conf interface="eth0" dhcp-range="192.168.10.10,192.168.10.19,4h"
/etc/init.d/dnsmasq restart
{{< /highlight >}}

Set up wifi:

{{< highlight shell >}}
sudo vi /etc/network/interfaces
# > ADD THE FOLLOWING SECTION

allow-hotplug wlan0
iface wlan0 inet dhcp
    wireless-essid BTWifi-with-FON
    wireless-mode managed
{{< /highlight >}}

Set up Python

{{< highlight shell >}}
sudo apt-get install python-setuptools
sudo easy_install pip
sudo pip install requests
{{< /highlight >}}

---

{{< highlight shell >}}
# Configure the wired port to live on 192.168.10.1
ifdown eth0 
ifconfig eth0 192.168.10.1 netmask 255.255.255.0

# Next we need to activate IP forwarding, and setup iptables to NAT:
sysctl -w net.ipv4.ip_forward=1 
iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
iptables -F FORWARD 
iptables -A FORWARD -j ACCEPT 
iptables -nvL

# Finally we connect to BT's network
python << END
from urllib import urlencode
import urllib2
BT_LOGIN = "zephod8characters"
PASSWORD = "9zBaa3ZUQDxA"
url = "https://www.btopenzone.com:8443/ante"
data = { 'username': BT_LOGIN, 'password': PASSWORD }
req = urllib2.Request(url, urlencode(data), {})
resp = urllib2.urlopen(req)
out = resp.read()
print "Successfully connected" if '/accountLogoff' in out else out
END
{{< /highlight >}}

