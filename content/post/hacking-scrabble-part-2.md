+++
date = "2012-07-27T11:49:49Z"
draft = false
title = "Hacking Scrabble (2 of 2)"
disable_comments = true

thumb_img = "/img/thumb/scrabble2.jpg"
thumb_title = "Hacking Scrabble #2"
description = "Printable charts and Python code."

aliases = [
    "post/28118665268/hacking-scrabble",
    "image/27935087126",
    "image/27933044619"
]
+++

## [Hacking Scrabble](http://blog.zephod.com/post/28118665268/hacking-scrabble)

**TL;DR:** Skip straight to these summary graphics to improve your Scrabble game:

[![Jump to Hacking Scrabble results](/img/hacking_scrabble_preview.png)](#results)

## Introduction

A while ago I was [blogging about](http://blog.zephod.com/post/14167418899/hacking-scrabble-part-1) a little research project I called Hacking Scrabble, which received a lot of interest and was [published on LifeHacker](http://lifehacker.com/5868095/hacking-scrabble-part-one). I was trying to get better at the game by using the kind of memory tricks we learned in school:

> _“My Very Easy Method Just Speeds Up Naming Planets”_

I’m a programmer by trade so inevitably I wrote [Mnemonic Finder](http://github.com/zephod/scrabble-tools), a Python program to quickly search the dictionary looking for these kinds of phrases. The idea was to memorise all **two-letter words**, which I’m targeting because:

*   They are vital. Games become stagnant when the board is full up and nobody can play in the tight corners without creating a string of two-letter words.
*   There aren’t actually that many of them: 124 in the international rules, 101 in the US rules.

---

## The Solution (First Attempt)

My [first attempt at writing this column](http://blog.zephod.com/post/14167418899/hacking-scrabble-part-1) arrived at a technique which _sort of_ worked.

*   Every 2 letter word is a **prefix** and a **suffix**.
    *   _eg. **“at”** has a prefix **“a”** and a suffix **“t”**_
*   So every **prefix** can have a few different **suffixes**.
    *   _The prefix **a** can have suffix **t** but not suffix **q**, because **aq** is not a word._
*   For each letter, list _all_its possible suffixes.
    *   _**a** can have any of: **abdeghilmnrstwxy**_
*   Use Mnemonic Finder to look for a phrase which **contains all those letters** but **no other letters**.
    *   _“**birthdays mangle wax**” will help you remember all the letters that can go after **a**._

---

## Why Doesn’t It Work?

First, it’s not _that_ great. I still need to memorise twenty six phrases and know which letter they each apply to.

Second, the suffixes of **u** are **ghmnprst**. Can you see the problem? There are no vowels! **ua**, **ue**, **ui**, **uo**, and **uu** are not words. So Mnemonic Finder can’t find a single thing in the dictionary. Maybe you can learn it by saying it out loud: “Gahumnapurst”. Maybe not.

In fact, out of twenty six attempts, I only succeeded in finding about ten useful phrases. Okay, it’s better than learning over a hundred words, but we can do better still with a little lateral thinking.

---

## Restructuring The Problem

Many astute readers emailed me to point out that **nearly all two-letter words contain a vowel**. Instead of memorising the suffixes of every letter, we could memorise the **suffixes and prefixes of every vowel**.

&laquo; prefixes  |  \| |  suffixes &raquo;
|--:|:-:|:--
  ztnlkjhdbfypmae |   **a**    | aeibdghlmnrstwxy
   ywtrpnmhfdbaeo |   **e**    | aedfhlmnrstx
   xtsqpmlhkdgboa |   **i**    | odfnst
zywtsmlkjhbdgnpio |   **o**    | eioubdfhmnprswxy
           gmnxyo |   **u**    | ghmnprst

*   This is a great idea: We only have to memorise _ten phrases_… plus a few words containing no vowels.
*   However, the computer still has trouble finding words in the dictionary… “**ghmnprst**” is still up there.
*   There’s a bit of redundant information in there. **o** is both a **prefix** and a **suffix** of itself because **oo** is a word.

We’re on the right path. A final step is needed to make this work.

---

## Just The Consonants, Please

The problem is that it’s hard to find mnemonics if you don’t have many vowels. I experimented with a tweak to Mnemonic Finder allowing it to use _all the vowels it likes_, and once again gave it **ghmnprst**.

    "prognathism"
    "graph mints"
    "hemp string"
    "nightmare gasp"
    ...

Thousands of phrases tumbled out! This is the key to the solution: Let’s seperate the vowels from the consonants. Here’s the table again with **only consonants** in the left and right columns.

&laquo; prefixes  |  \| |  suffixes &raquo;
|--:|:-:|:--
  ztnlkjhdbfypm  | **a** |   bdghlmnrstwxy
    ywtrpnmhfdb  | **e** |   dfhlmnrstx
   xtsqpmlhkdgb  | **i** |   dfnst
zywtsmlkjhbdgnp  | **o** |   bdfhmnprswxy
          gmnxy  | **u** |   ghmnprst

The words we had to remove were the **double vowels**. A shame that they didn’t fit, but they won’t be too difficult to memorise: There’s only nine of them (or just five for players in the USA).

    aa ae ai ee ea io oo ou oe 

Finally, I’ve avoided telling you about the **double consonants**. They never fitted onto that table anyway, and must also be memorised the hard way:

    sh ch st mm hm my ky fy by ny

---

## Through the Mnemonic Machine

Using Mnemonic Finder in “free vowels mode” produces hundreds (usually thousands) of dictionary words for each entry in the table. At last, we can replace ugly blocks such as **ghmnprst** with meaningful, memorable phrases like **hemp string**.

&laquo; prefixes  | \| |  suffixes &raquo;
|--:|:-:|:--
  the band played folk jazz metal |  **a** |   birthdays mangle wax
             thumbprint fade away |  **e** |   tax his farmland
     exquisite godlike humble pie |  **i** |   infested
      mask playing with jazz band |  **o** |   six dumb hippy windsurfers
                         onyx gem |  **u** |   hemp string

You can generate your own if these aren’t to your taste. I prefer phrases with a powerful (if absurd) mental image. I’ve logged my development in a public gist for both the [International version](https://gist.github.com/3141231) and the [US/Canada version](https://gist.github.com/3141380).

It is important to remember that we are **just memorising consonants**. The suffixes of **i** are **“infested”**, meaning **n**, **f**, **s**, **t**, or **d**. Ignore the vowels; **ie** is not a word.

Once you understand and memorise that table, you know **one hundred and four** words! The remaining twenty I leave to you. Did you think it was all going to be that easy?

    aa ae ai ee ea io oo ou oe 
    sh ch st mm hm my ky fy by ny

---

## In A Real Life Battle Situation...

So you want to play a two-letter-word, but you’re not sure it exists?

*   If it’s a **double consonant**, you should know it by heart.
*   If it’s a **double vowel**, you should also know it by heart!
*   If it **starts with a vowel**, think of the **right hand column**.
    *   _Eg. The first letter is **e**, the second letter must be in **tax his farmland**._
*   If it **ends with a vowel**, think of the **left hand column**.
    *   _Eg. if the last letter is **e**, the first letter must be in **thumbprint fade away**._

Fortunately, I have turned all of this into a beautiful infographic that you can print out and treasure forever.

---

## <a name="results"></a> For players using the North American rules 

[![Hacking Scrabble Cheatsheet: US Edition](/img/hacking_scrabble_us.png)](/img/hacking_scrabble_us.png)

* Valid in the US, Canada, and Thailand
* Source data: [https://gist.github.com/3141380](https://gist.github.com/3141380)

---

## For players using the International rules

[![Hacking Scrabble Cheatsheet: Internatinoal Edition](/img/hacking_scrabble_uk.png)](/img/hacking_scrabble_uk.png)

* Valid everywhere _except_ the US, Canada and Thailand
* Source data: [https://gist.github.com/3141231](https://gist.github.com/3141231)

* * *

This article was originally published on zephod.com on Tumblr, and has been migrated to tomre.es on GitHub Pages.

<img src="/img/tumblr_archive_2.png" alt="(defunct) Tumblr Social Links" style="margin: 0; width: 292px;"/>
