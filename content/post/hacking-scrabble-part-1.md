+++
date = "2011-12-13T13:32:49Z"
draft = false
title = "Hacking Scrabble (1 of 2)"
disable_comments = true

thumb_img = "/img/thumb/scrabble1.jpg"
thumb_title = "Hacking Scrabble #1"
description = "LifeHacker feature on Scrabble memory techniques."

aliases = [
    "post/14167418899/hacking-scrabble-part-1"
]
+++

**Edit #2:** This article was [featured on LifeHacker!](http://lifehacker.com/5868095/hacking-scrabble-part-one)

[![LifeHacker Screenshot](/img/hacking_scrabble_lifehacker_wide_placeit.jpg)](http://lifehacker.com/5868095/hacking-scrabble-part-one)

**Edit #1:** See [this article](/post/hacking-scrabble-part-2) for the final result of this project.

---

This post isn’t really about Scrabble. It’s about taking a load of ugly data and hacking around with some scripts to refine it into something I can commit to memory. _Then_ its about Scrabble. Winning at Scrabble.

### The Problem

Knowing exactly which two-letter words exist gives a player a sizeable advantage because it opens up tight corners of the game board and allows them to run two words side-by-side. Sadly most of us only know a handful, and beyond that we’re guessing. Then we’re arguing. And then (inevitably) looking on Google for a list of valid words. 

Personally I’m all for having the 2-letter-word-list on display during play to help us out of tight spots and to keep things fair. But I’ve had plenty of opponents object to this, saying that if I really want to play like that I should _memorize the list_. How hard can it be?

> aa ab ad ae ag ah ai al am an ar as at aw ax ay ba be bi bo by ch da de di do ea ed ee ef eh el em en er es et ex fa fe fy gi go gu ha he hi hm ho id if in io is it ja jo ka ki ko ky la li lo ma me mi mm mo mu my na ne no nu ny ob od oe of oh oi om on oo op or os ou ow ox oy pa pe pi po qi re sh si so st ta te ti to ug uh um un up ur us ut we wo xi xu ya ye yo yu za zo
>
> (source: [SOWPODS](http://en.wiktionary.org/wiki/Appendix:Official_English_Scrabble_2-letter_words), used for British tournament play)

That’s 124 words! More than a hundred arbitrary letter-pairs, with no connecting pattern and most of which I don’t recognise. Committing that to memory is better left to sauvants who can happily recall the order of a shuffled deck of cards.

I had already given up with the problem, and I was writing the list out on paper to be kept in the game box. To make it easier to fit on a page, I tried to compress the information, producing a table like this:

||| 
|---|---|---
| **a:** abdeghilmnrstwxy | **j:** ao               | **s:** hiot
| **b:** aeioy            | **k:** aioy             | **t:** aeio
| **c:** h                | **l:** aio              | **u:** ghmnprst
| **d:** aeio             | **m:** aeimouy          | **w:** eo
| **e:** adefhlmnrstx     | **n:** aeouy            | **x:** iu
| **f:** aey              | **o:** bdefhimnoprsuwxy | **y:** aeou
| **g:** iou              | **p:** aeio             | **z:** ao
| **h:** aeimo            | **q:** i                |  
| **i:** dfnost           | **r:** e                |  

Suddenly it’s not so terrifying, is it? The data has some structure. Every **prefix** has a number of possible **suffixes.**

*   **b** can be followed by **a**, **e**, **i**, **o**, or **y**.
*   But **c** can only be followed by **h**.

It’s still a lot to commit to memory. Too much: **a** and **o** each have sixteen possible suffixes!

### The Mnemonic Method

I still believe it can be done! The key is in finding an appropriate mnemonic to help us remember arbitrary sets of letters.

So let’s begin with all the two-letter-words starting with **a**. If I can memorize the set of letters ’**abdeghilmnrstwxy**’ then I can mentally verify any word that starts with **a** by asking, ‘is the **suffix** in that set?’

#### The Mnemonic Method: Anagrams

Your first thought might be to search for anagrams of the string. Mine was too. You’re out of luck - just try asking Wolfram Alpha for [anagrams of abdefhilmnrstwxy](http://www.wolframalpha.com/input/?i=anagrams+of+abdeghilmnrstwxy "Wolfram Alpha query"). The problem is simply that there are too few vowels available to build good words. 

#### The Mnemonic Method: Word Subsets

Try asking Wolfram Alpha for [word subsets of abdeghilmnrstwxy](http://www.wolframalpha.com/input/?i=word+subsets+of+abdeghilmnrstwxy "Wolfram Alpha query"). Now we’re on to something - it returns 4243 results. 

> a  |  Abe  |  abed  |  Abel  |  abet  |  abets  |  abide  |  abides  |  able  |  abler  |  ables  |  ablest  |  ably  |  Abner  |  abridge  |  abridges  |  abridgment  |  abridgments  |  abs  |  ABS  |  abseil  |  absent  |  absently  |  absinthe  |  …   (total: 4243)

These are words containing only those letters. If we can memorize enough of those words to cover all sixteen letters ('axe labs abridgements…’) then we can mentally verify any two-letter-word starting with **a** by asking 'is the **suffix** in any of those words?’.

A couple of observations at this point:

*   Hand-picking the right words from 4243 results is painful.
*   Words like **beer** are missing because they re-use the letter **e**.

For the purpose of this memory-check, we don’t care if a letter appears more than once. To memorize the letters **elh**, we might remember it as ’**hell**’ - but this method will not suggest that word.

### The Solution

Wolfram Alpha’s algorithm is based around the following operation:

> Find every word in the list of letters, and check it is in the dictionary.

We can find many more words by reversing the process:

> Find every word in the dictionary, and check only uses letters in the list.

I went on to [hack together this Python script](https://github.com/zephod/scrabble-tools "GitHub Scrabble Tools link") which does exactly this. It allows us to control specific things like **minimum and maximum word length** and allows **reuse of letters**, so finds many more words than Wolfram Alpha can.

Armed with this huge number of words, we can programatically look for groups of them which cover all the letters, and save them as mnemonic devices.

The 100-line algorithm runs as follows:

*   Load up a good [British word list](http://wordlist.sourceforge.net/ "Word lists") (obtained from anywhere on the internet).
*   Filter the list to remove words which contain the wrong letters. Using the letters ’**abdeghilmnrstwxy**’, **beer** remains in the list while **vodka** is removed.
*   Find the word which uses _as many different letters as possible_. Eg **'nearsightedly**’ which uses twelve of the letters. This is the start of the mnemonic.
*   Keep finding words which use up the remaining letters.
*   Loop until all letters are covered. Eg. “**nearsightedly wax balm**”.

### Demonstration 

This is it! Here I am, searching for mnemonics to help me remember the two-letter-words starting with **a**.

{{< highlight python >}}
$ python mf.py abdeghilmnrstwxy --minlen 3 --maxlen 9
==> MnemonicFinder v1.0
--> Loading dictionary...
--> Search string: abdeghilmnrstwxy
--> Generating...
--> Mnemonic: ['bearishly', 'midwing', 'tax']
--> Mnemonic: ['berthings', 'madly', 'wax']
--> Mnemonic: ['betraying', 'mildews', 'hex']
--> Mnemonic: ['birthdays', 'mangle', 'wax']
    (output clipped)
{{< /highlight >}}

Okay, some are better than others. By scanning the output for a sentence or phrase which I can attach to a mental image, I can make it memorable: “**birthdays mangle wax**” means candles on a birthday cake. Is **ap** a word? No, because there’s no **p** in that phrase.

Hooray! I am one twenty-sixth of the way towards memorising all of the two-letter-words permitted in Scrabble. Have a look at [the files on GitHub](https://github.com/zephod/scrabble-tools "GitHub link") if you want to try out the script for yourself. In Part 2, I’ll develop 26 mnemonics and work on a technique for memorising them.

* * *

This article was originally published on zephod.com on Tumblr, and has been migrated to tomre.es on GitHub Pages.

<img src="/img/tumblr_archive_1.png" alt="(defunct) Tumblr Social Links" style="margin: 0; width: 425px;"/>
