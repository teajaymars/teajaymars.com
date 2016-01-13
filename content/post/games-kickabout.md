+++
date = "2011-02-13T13:32:49Z"
draft = false
title = "Java Games: Kickabout League"

thumb_img = "/img/thumb/kickabout.png"
thumb_title = "Kickabout League"
description = "Multiplayer online football in the browser."
+++

> For the sake of posterity, and for completeness, I am including links to software I wrote in my first job. I graduated from the University of Cambridge in 2007 and was hired to write Java browser games to complement [Runescape](http://runescape.com).

[Kickabout](http://www.funorb.com/info.ws?game=kickabout) was a highly ambitious multiplayer football game which I designed and wrote for [FunOrb.com](http://funorb.com). It had over half a million players at its peak during the 2010 World Cup.

[![Kickabout](/img/games_kickabout.jpg)](http://www.funorb.com/info.ws?game=kickabout)

The goal was to test realtime multiplayer mechanics over TCP - which turns out to be a very tough problem.

* Fortunately, a year after launch, the IETF standardised [WebSockets](https://en.wikipedia.org/wiki/WebSocket), which provides a much more elegant solution.
* Sadly, it means the game quickly became obsolete!

I led a team of four people to develop the game over eighteen months. Kickabout featured an auction house, player customisation, and 4v4 in-browser multiplayer. The game is based on the simplified soccer games I used to enjoy on the NES when I was young. 

* The game is still available online [as of 2016] but it's tied to a backend infrastructure which is unlikely to remain online while Jagex winds down their commercial service.

![Screenshot 4](/img/kickabout4.jpg)

![Screenshot 1](/img/kickabout1.jpg)

![Screenshot 2](/img/kickabout2.jpg)

![Screenshot 3](/img/kickabout3.jpg)
