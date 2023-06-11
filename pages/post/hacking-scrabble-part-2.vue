<script lang="ts" setup>
const title = "Hacking Scrabble (2 of 2)";

useSeoMeta({
  title,
  description: "Printable charts and Python code.",
});
</script>

<template>
  <article class="article content">
    <ArticleTitle timestamp="2012-07-27">{{ title }}</ArticleTitle>

    <p>
      <strong>TL;DR:</strong> Skip straight to these summary graphics to improve
      your Scrabble game:
    </p>
    <p>
      <a href="#results"
        ><img
          src="/img/hacking_scrabble_preview.png"
          alt="Jump to Hacking Scrabble results"
      /></a>
    </p>
    <h2 id="introduction">Introduction</h2>
    <p>
      A while ago I was
      <a href="http://blog.zephod.com/post/14167418899/hacking-scrabble-part-1"
        >blogging about</a
      >
      a little research project I called Hacking Scrabble, which received a lot
      of interest and was
      <a href="http://lifehacker.com/5868095/hacking-scrabble-part-one"
        >published on LifeHacker</a
      >. I was trying to get better at the game by using the kind of memory
      tricks we learned in school:
    </p>
    <blockquote>
      <p><em>“My Very Easy Method Just Speeds Up Naming Planets”</em></p>
    </blockquote>
    <p>
      I’m a programmer by trade so inevitably I wrote
      <a href="http://github.com/zephod/scrabble-tools">Mnemonic Finder</a>, a
      Python program to quickly search the dictionary looking for these kinds of
      phrases. The idea was to memorise all <strong>two-letter words</strong>,
      which I’m targeting because:
    </p>
    <ul>
      <li>
        They are vital. Games become stagnant when the board is full up and
        nobody can play in the tight corners without creating a string of
        two-letter words.
      </li>
      <li>
        There aren’t actually that many of them: 124 in the international rules,
        101 in the US rules.
      </li>
    </ul>
    <hr />
    <h2 id="the-solution-first-attempt-">The Solution (First Attempt)</h2>
    <p>
      My
      <a href="http://blog.zephod.com/post/14167418899/hacking-scrabble-part-1"
        >first attempt at writing this column</a
      >
      arrived at a technique which <em>sort of</em> worked.
    </p>
    <ul>
      <li>
        Every 2 letter word is a <strong>prefix</strong> and a
        <strong>suffix</strong>.
        <ul>
          <li>
            <em
              >eg. <strong>“at”</strong> has a prefix <strong>“a”</strong> and a
              suffix <strong>“t”</strong></em
            >
          </li>
        </ul>
      </li>
      <li>
        So every <strong>prefix</strong> can have a few different
        <strong>suffixes</strong>.
        <ul>
          <li>
            <em
              >The prefix <strong>a</strong> can have suffix
              <strong>t</strong> but not suffix <strong>q</strong>, because
              <strong>aq</strong> is not a word.</em
            >
          </li>
        </ul>
      </li>
      <li>
        For each letter, list _all_its possible suffixes.
        <ul>
          <li>
            <em
              ><strong>a</strong> can have any of:
              <strong>abdeghilmnrstwxy</strong></em
            >
          </li>
        </ul>
      </li>
      <li>
        Use Mnemonic Finder to look for a phrase which
        <strong>contains all those letters</strong> but
        <strong>no other letters</strong>.
        <ul>
          <li>
            <em
              >“<strong>birthdays mangle wax</strong>” will help you remember
              all the letters that can go after <strong>a</strong>.</em
            >
          </li>
        </ul>
      </li>
    </ul>
    <hr />
    <h2 id="why-doesn-t-it-work-">Why Doesn’t It Work?</h2>
    <p>
      First, it’s not <em>that</em> great. I still need to memorise twenty six
      phrases and know which letter they each apply to.
    </p>
    <p>
      Second, the suffixes of <strong>u</strong> are <strong>ghmnprst</strong>.
      Can you see the problem? There are no vowels! <strong>ua</strong>,
      <strong>ue</strong>, <strong>ui</strong>, <strong>uo</strong>, and
      <strong>uu</strong> are not words. So Mnemonic Finder can’t find a single
      thing in the dictionary. Maybe you can learn it by saying it out loud:
      “Gahumnapurst”. Maybe not.
    </p>
    <p>
      In fact, out of twenty six attempts, I only succeeded in finding about ten
      useful phrases. Okay, it’s better than learning over a hundred words, but
      we can do better still with a little lateral thinking.
    </p>
    <hr />
    <h2 id="restructuring-the-problem">Restructuring The Problem</h2>
    <p>
      Many astute readers emailed me to point out that
      <strong>nearly all two-letter words contain a vowel</strong>. Instead of
      memorising the suffixes of every letter, we could memorise the
      <strong>suffixes and prefixes of every vowel</strong>.
    </p>
    <table class="table is-narrow is-striped mb-6">
      <thead>
        <tr>
          <th align="right">« prefixes</th>
          <th align="center">|</th>
          <th align="left">suffixes »</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td align="right">ztnlkjhdbfypmae</td>
          <td align="center"><strong>a</strong></td>
          <td align="left">aeibdghlmnrstwxy</td>
        </tr>

        <tr>
          <td align="right">ywtrpnmhfdbaeo</td>
          <td align="center"><strong>e</strong></td>
          <td align="left">aedfhlmnrstx</td>
        </tr>

        <tr>
          <td align="right">xtsqpmlhkdgboa</td>
          <td align="center"><strong>i</strong></td>
          <td align="left">odfnst</td>
        </tr>

        <tr>
          <td align="right">zywtsmlkjhbdgnpio</td>
          <td align="center"><strong>o</strong></td>
          <td align="left">eioubdfhmnprswxy</td>
        </tr>

        <tr>
          <td align="right">gmnxyo</td>
          <td align="center"><strong>u</strong></td>
          <td align="left">ghmnprst</td>
        </tr>
      </tbody>
    </table>
    <ul>
      <li>
        This is a great idea: We only have to memorise <em>ten phrases</em>…
        plus a few words containing no vowels.
      </li>
      <li>
        However, the computer still has trouble finding words in the dictionary…
        “<strong>ghmnprst</strong>” is still up there.
      </li>
      <li>
        There’s a bit of redundant information in there. <strong>o</strong> is
        both a <strong>prefix</strong> and a <strong>suffix</strong> of itself
        because <strong>oo</strong> is a word.
      </li>
    </ul>
    <p>We’re on the right path. A final step is needed to make this work.</p>
    <hr />
    <h2 id="just-the-consonants-please">Just The Consonants, Please</h2>
    <p>
      The problem is that it’s hard to find mnemonics if you don’t have many
      vowels. I experimented with a tweak to Mnemonic Finder allowing it to use
      <em>all the vowels it likes</em>, and once again gave it
      <strong>ghmnprst</strong>.
    </p>
    <pre><code><span class="hljs-string">"prognathism"</span>
<span class="hljs-string">"graph mints"</span>
<span class="hljs-string">"hemp string"</span>
<span class="hljs-string">"nightmare gasp"</span>
...
</code></pre>
    <p>
      Thousands of phrases tumbled out! This is the key to the solution: Let’s
      seperate the vowels from the consonants. Here’s the table again with
      <strong>only consonants</strong> in the left and right columns.
    </p>
    <table class="table is-narrow is-striped mb-6">
      <thead>
        <tr>
          <th align="right">« prefixes</th>
          <th align="center">|</th>
          <th align="left">suffixes »</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td align="right">ztnlkjhdbfypm</td>
          <td align="center"><strong>a</strong></td>
          <td align="left">bdghlmnrstwxy</td>
        </tr>

        <tr>
          <td align="right">ywtrpnmhfdb</td>
          <td align="center"><strong>e</strong></td>
          <td align="left">dfhlmnrstx</td>
        </tr>

        <tr>
          <td align="right">xtsqpmlhkdgb</td>
          <td align="center"><strong>i</strong></td>
          <td align="left">dfnst</td>
        </tr>

        <tr>
          <td align="right">zywtsmlkjhbdgnp</td>
          <td align="center"><strong>o</strong></td>
          <td align="left">bdfhmnprswxy</td>
        </tr>

        <tr>
          <td align="right">gmnxy</td>
          <td align="center"><strong>u</strong></td>
          <td align="left">ghmnprst</td>
        </tr>
      </tbody>
    </table>
    <p>
      The words we had to remove were the <strong>double vowels</strong>. A
      shame that they didn’t fit, but they won’t be too difficult to memorise:
      There’s only nine of them (or just five for players in the USA).
    </p>
    <pre><code>aa ae ai ee <span class="hljs-keyword">ea</span> io oo <span class="hljs-keyword">ou</span> oe 
</code></pre>
    <p>
      Finally, I’ve avoided telling you about the
      <strong>double consonants</strong>. They never fitted onto that table
      anyway, and must also be memorised the hard way:
    </p>
    <pre><code><span class="hljs-keyword">sh</span> ch <span class="hljs-keyword">st</span> mm hm my ky fy <span class="hljs-keyword">by</span> ny
</code></pre>
    <hr />
    <h2 id="through-the-mnemonic-machine">Through the Mnemonic Machine</h2>
    <p>
      Using Mnemonic Finder in “free vowels mode” produces hundreds (usually
      thousands) of dictionary words for each entry in the table. At last, we
      can replace ugly blocks such as <strong>ghmnprst</strong> with meaningful,
      memorable phrases like <strong>hemp string</strong>.
    </p>
    <table class="table is-narrow is-striped mb-6">
      <thead>
        <tr>
          <th align="right">« prefixes</th>
          <th align="center">|</th>
          <th align="left">suffixes »</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td align="right">the band played folk jazz metal</td>
          <td align="center"><strong>a</strong></td>
          <td align="left">birthdays mangle wax</td>
        </tr>

        <tr>
          <td align="right">thumbprint fade away</td>
          <td align="center"><strong>e</strong></td>
          <td align="left">tax his farmland</td>
        </tr>

        <tr>
          <td align="right">exquisite godlike humble pie</td>
          <td align="center"><strong>i</strong></td>
          <td align="left">infested</td>
        </tr>

        <tr>
          <td align="right">mask playing with jazz band</td>
          <td align="center"><strong>o</strong></td>
          <td align="left">six dumb hippy windsurfers</td>
        </tr>

        <tr>
          <td align="right">onyx gem</td>
          <td align="center"><strong>u</strong></td>
          <td align="left">hemp string</td>
        </tr>
      </tbody>
    </table>
    <p>
      You can generate your own if these aren’t to your taste. I prefer phrases
      with a powerful (if absurd) mental image. I’ve logged my development in a
      public gist for both the
      <a href="https://gist.github.com/3141231">International version</a> and
      the <a href="https://gist.github.com/3141380">US/Canada version</a>.
    </p>
    <p>
      It is important to remember that we are
      <strong>just memorising consonants</strong>. The suffixes of
      <strong>i</strong> are <strong>“infested”</strong>, meaning
      <strong>n</strong>, <strong>f</strong>, <strong>s</strong>,
      <strong>t</strong>, or <strong>d</strong>. Ignore the vowels;
      <strong>ie</strong> is not a word.
    </p>
    <p>
      Once you understand and memorise that table, you know
      <strong>one hundred and four</strong> words! The remaining twenty I leave
      to you. Did you think it was all going to be that easy?
    </p>
    <pre><code>aa ae ai ee ea io oo <span class="hljs-keyword">ou</span> oe 
<span class="hljs-keyword">sh</span> ch <span class="hljs-keyword">st</span> mm hm my ky fy <span class="hljs-keyword">by</span> ny
</code></pre>
    <hr />
    <h2 id="in-a-real-life-battle-situation-">
      In A Real Life Battle Situation...
    </h2>
    <p>So you want to play a two-letter-word, but you’re not sure it exists?</p>
    <ul>
      <li>
        If it’s a <strong>double consonant</strong>, you should know it by
        heart.
      </li>
      <li>
        If it’s a <strong>double vowel</strong>, you should also know it by
        heart!
      </li>
      <li>
        If it <strong>starts with a vowel</strong>, think of the
        <strong>right hand column</strong>.
        <ul>
          <li>
            <em
              >Eg. The first letter is <strong>e</strong>, the second letter
              must be in <strong>tax his farmland</strong>.</em
            >
          </li>
        </ul>
      </li>
      <li>
        If it <strong>ends with a vowel</strong>, think of the
        <strong>left hand column</strong>.
        <ul>
          <li>
            <em
              >Eg. if the last letter is <strong>e</strong>, the first letter
              must be in <strong>thumbprint fade away</strong>.</em
            >
          </li>
        </ul>
      </li>
    </ul>
    <p>
      Fortunately, I have turned all of this into a beautiful infographic that
      you can print out and treasure forever.
    </p>
    <hr />
    <h2 id="-a-name-results-a-for-players-using-the-north-american-rules">
      <a name="results"></a> For players using the North American rules
    </h2>
    <p>
      <a href="/img/hacking_scrabble_us.png"
        ><img
          src="/img/hacking_scrabble_us.png"
          alt="Hacking Scrabble Cheatsheet: US Edition"
      /></a>
    </p>
    <ul>
      <li>Valid in the US, Canada, and Thailand</li>
    </ul>
    <hr />
    <h2 id="for-players-using-the-international-rules">
      For players using the International rules
    </h2>
    <p>
      <a href="/img/hacking_scrabble_uk.png"
        ><img
          src="/img/hacking_scrabble_uk.png"
          alt="Hacking Scrabble Cheatsheet: Internatinoal Edition"
      /></a>
    </p>
    <ul>
      <li>Valid everywhere <em>except</em> the US, Canada and Thailand</li>
    </ul>
  </article>
</template>
