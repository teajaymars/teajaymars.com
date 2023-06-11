<script lang="ts" setup>
const title = "Hacking Scrabble (1 of 2)";

useSeoMeta({
  title,
  description: "LifeHacker feature on Scrabble memory techniques.",
});
</script>

<template>
  <article class="article content">
    <ArticleTitle timestamp="2011-12-13">{{ title }}</ArticleTitle>

    <p>
      <strong>Edit #2:</strong> This article was
      <a
        href="http://lifehacker.com/5868095/hacking-scrabble-part-one"
        target="_blank"
        >featured on LifeHacker!</a
      >
    </p>
    <p>
      <a
        href="http://lifehacker.com/5868095/hacking-scrabble-part-one"
        target="_blank"
        ><img
          src="/img/hacking_scrabble_lifehacker_wide_placeit.jpg"
          alt="LifeHacker Screenshot"
      /></a>
    </p>
    <p>
      <strong>Edit #1:</strong> See
      <a href="/post/hacking-scrabble-part-2">this article</a> for the final
      result of this project.
    </p>
    <hr />
    <p>
      This post isn’t really about Scrabble. It’s about taking a load of ugly
      data and hacking around with some scripts to refine it into something I
      can commit to memory. <em>Then</em> its about Scrabble. Winning at
      Scrabble.
    </p>
    <h3 id="the-problem">The Problem</h3>
    <p>
      Knowing exactly which two-letter words exist gives a player a sizeable
      advantage because it opens up tight corners of the game board and allows
      them to run two words side-by-side. Sadly most of us only know a handful,
      and beyond that we’re guessing. Then we’re arguing. And then (inevitably)
      looking on Google for a list of valid words.
    </p>
    <p>
      Personally I’m all for having the 2-letter-word-list on display during
      play to help us out of tight spots and to keep things fair. But I’ve had
      plenty of opponents object to this, saying that if I really want to play
      like that I should <em>memorize the list</em>. How hard can it be?
    </p>
    <blockquote>
      <p>
        aa ab ad ae ag ah ai al am an ar as at aw ax ay ba be bi bo by ch da de
        di do ea ed ee ef eh el em en er es et ex fa fe fy gi go gu ha he hi hm
        ho id if in io is it ja jo ka ki ko ky la li lo ma me mi mm mo mu my na
        ne no nu ny ob od oe of oh oi om on oo op or os ou ow ox oy pa pe pi po
        qi re sh si so st ta te ti to ug uh um un up ur us ut we wo xi xu ya ye
        yo yu za zo
      </p>
      <p>
        (source:
        <a
          href="http://en.wiktionary.org/wiki/Appendix:Official_English_Scrabble_2-letter_words"
          >SOWPODS</a
        >, used for British tournament play)
      </p>
    </blockquote>
    <p>
      That’s 124 words! More than a hundred arbitrary letter-pairs, with no
      connecting pattern and most of which I don’t recognise. Committing that to
      memory is better left to sauvants who can happily recall the order of a
      shuffled deck of cards.
    </p>
    <p>
      I had already given up with the problem, and I was writing the list out on
      paper to be kept in the game box. To make it easier to fit on a page, I
      tried to compress the information, producing a table like this:
    </p>
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>a:</strong> abdeghilmnrstwxy</td>
          <td><strong>j:</strong> ao</td>
          <td><strong>s:</strong> hiot</td>
        </tr>
        <tr>
          <td><strong>b:</strong> aeioy</td>
          <td><strong>k:</strong> aioy</td>
          <td><strong>t:</strong> aeio</td>
        </tr>
        <tr>
          <td><strong>c:</strong> h</td>
          <td><strong>l:</strong> aio</td>
          <td><strong>u:</strong> ghmnprst</td>
        </tr>
        <tr>
          <td><strong>d:</strong> aeio</td>
          <td><strong>m:</strong> aeimouy</td>
          <td><strong>w:</strong> eo</td>
        </tr>
        <tr>
          <td><strong>e:</strong> adefhlmnrstx</td>
          <td><strong>n:</strong> aeouy</td>
          <td><strong>x:</strong> iu</td>
        </tr>
        <tr>
          <td><strong>f:</strong> aey</td>
          <td><strong>o:</strong> bdefhimnoprsuwxy</td>
          <td><strong>y:</strong> aeou</td>
        </tr>
        <tr>
          <td><strong>g:</strong> iou</td>
          <td><strong>p:</strong> aeio</td>
          <td><strong>z:</strong> ao</td>
        </tr>
        <tr>
          <td><strong>h:</strong> aeimo</td>
          <td><strong>q:</strong> i</td>
        </tr>
        <tr>
          <td><strong>i:</strong> dfnost</td>
          <td><strong>r:</strong> e</td>
        </tr>
      </tbody>
    </table>
    <p>
      Suddenly it’s not so terrifying, is it? The data has some structure. Every
      <strong>prefix</strong> has a number of possible
      <strong>suffixes.</strong>
    </p>
    <ul>
      <li>
        <strong>b</strong> can be followed by <strong>a</strong>,
        <strong>e</strong>, <strong>i</strong>, <strong>o</strong>, or
        <strong>y</strong>.
      </li>
      <li>
        But <strong>c</strong> can only be followed by <strong>h</strong>.
      </li>
    </ul>
    <p>
      It’s still a lot to commit to memory. Too much: <strong>a</strong> and
      <strong>o</strong> each have sixteen possible suffixes!
    </p>
    <h3 id="the-mnemonic-method">The Mnemonic Method</h3>
    <p>
      I still believe it can be done! The key is in finding an appropriate
      mnemonic to help us remember arbitrary sets of letters.
    </p>
    <p>
      So let’s begin with all the two-letter-words starting with
      <strong>a</strong>. If I can memorize the set of letters
      ’<strong>abdeghilmnrstwxy</strong>’ then I can mentally verify any word
      that starts with <strong>a</strong> by asking, ‘is the
      <strong>suffix</strong> in that set?’
    </p>
    <h4 id="the-mnemonic-method-anagrams">The Mnemonic Method: Anagrams</h4>
    <p>
      Your first thought might be to search for anagrams of the string. Mine was
      too. You’re out of luck - just try asking Wolfram Alpha for
      <a
        href="http://www.wolframalpha.com/input/?i=anagrams+of+abdeghilmnrstwxy"
        title="Wolfram Alpha query"
        >anagrams of abdefhilmnrstwxy</a
      >. The problem is simply that there are too few vowels available to build
      good words.
    </p>
    <h4 id="the-mnemonic-method-word-subsets">
      The Mnemonic Method: Word Subsets
    </h4>
    <p>
      Try asking Wolfram Alpha for
      <a
        href="http://www.wolframalpha.com/input/?i=word+subsets+of+abdeghilmnrstwxy"
        title="Wolfram Alpha query"
        >word subsets of abdeghilmnrstwxy</a
      >. Now we’re on to something - it returns 4243 results.
    </p>
    <blockquote>
      <p>
        a | Abe | abed | Abel | abet | abets | abide | abides | able | abler |
        ables | ablest | ably | Abner | abridge | abridges | abridgment |
        abridgments | abs | ABS | abseil | absent | absently | absinthe | …
        (total: 4243)
      </p>
    </blockquote>
    <p>
      These are words containing only those letters. If we can memorize enough
      of those words to cover all sixteen letters (&#39;axe labs abridgements…’)
      then we can mentally verify any two-letter-word starting with
      <strong>a</strong> by asking &#39;is the <strong>suffix</strong> in any of
      those words?’.
    </p>
    <p>A couple of observations at this point:</p>
    <ul>
      <li>Hand-picking the right words from 4243 results is painful.</li>
      <li>
        Words like <strong>beer</strong> are missing because they re-use the
        letter <strong>e</strong>.
      </li>
    </ul>
    <p>
      For the purpose of this memory-check, we don’t care if a letter appears
      more than once. To memorize the letters <strong>elh</strong>, we might
      remember it as ’<strong>hell</strong>’ - but this method will not suggest
      that word.
    </p>
    <h3 id="the-solution">The Solution</h3>
    <p>Wolfram Alpha’s algorithm is based around the following operation:</p>
    <blockquote>
      <p>
        Find every word in the list of letters, and check it is in the
        dictionary.
      </p>
    </blockquote>
    <p>We can find many more words by reversing the process:</p>
    <blockquote>
      <p>
        Find every word in the dictionary, and check only uses letters in the
        list.
      </p>
    </blockquote>
    <p>
      I went on to
      <a
        href="https://github.com/zephod/scrabble-tools"
        title="GitHub Scrabble Tools link"
        >hack together this Python script</a
      >
      which does exactly this. It allows us to control specific things like
      <strong>minimum and maximum word length</strong> and allows
      <strong>reuse of letters</strong>, so finds many more words than Wolfram
      Alpha can.
    </p>
    <p>
      Armed with this huge number of words, we can programatically look for
      groups of them which cover all the letters, and save them as mnemonic
      devices.
    </p>
    <p>The 100-line algorithm runs as follows:</p>
    <ul>
      <li>
        Load up a good
        <a href="http://wordlist.sourceforge.net/" title="Word lists"
          >British word list</a
        >
        (obtained from anywhere on the internet).
      </li>
      <li>
        Filter the list to remove words which contain the wrong letters. Using
        the letters ’<strong>abdeghilmnrstwxy</strong>’,
        <strong>beer</strong> remains in the list while
        <strong>vodka</strong> is removed.
      </li>
      <li>
        Find the word which uses <em>as many different letters as possible</em>.
        Eg <strong>&#39;nearsightedly</strong>’ which uses twelve of the
        letters. This is the start of the mnemonic.
      </li>
      <li>Keep finding words which use up the remaining letters.</li>
      <li>
        Loop until all letters are covered. Eg. “<strong
          >nearsightedly wax balm</strong
        >”.
      </li>
    </ul>
    <h3 id="demonstration">Demonstration</h3>
    <p>
      This is it! Here I am, searching for mnemonics to help me remember the
      two-letter-words starting with <strong>a</strong>.
    </p>
    <pre>
$ python mf.py abdeghilmnrstwxy --minlen 3 --maxlen 9
==&gt; MnemonicFinder v1.0 
--&gt; Loading dictionary... 
--&gt; Search string: abdeghilmnrstwxy 
--&gt; Generating... 
--&gt; Mnemonic: [&#39;bearishly&#39;, &#39;midwing&#39;, &#39;tax&#39;] 
--&gt; Mnemonic: [&#39;berthings&#39;, &#39;madly&#39;, &#39;wax&#39;] 
--&gt; Mnemonic: [&#39;betraying&#39;, &#39;mildews&#39;, &#39;hex&#39;] 
--&gt; Mnemonic: [&#39;birthdays&#39;, &#39;mangle&#39;, &#39;wax&#39;]
    (output clipped)</pre
    >
    <p>
      Okay, some are better than others. By scanning the output for a sentence
      or phrase which I can attach to a mental image, I can make it memorable:
      “<strong>birthdays mangle wax</strong>” means candles on a birthday cake.
      Is <strong>ap</strong> a word? No, because there’s no
      <strong>p</strong> in that phrase.
    </p>
    <p>
      Hooray! I am one twenty-sixth of the way towards memorising all of the
      two-letter-words permitted in Scrabble. Have a look at
      <a href="https://github.com/zephod/scrabble-tools" title="GitHub link"
        >the files on GitHub</a
      >
      if you want to try out the script for yourself. In Part 2, I’ll develop 26
      mnemonics and work on a technique for memorising them.
    </p>
  </article>
</template>
