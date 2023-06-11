<script lang="ts" setup>
const title = "/usr/bin/filter";

useSeoMeta({
  title,
  description: "Bash extension for renaming groups of files",
});
</script>

<template>
  <article class="article content">
    <ArticleTitle timestamp="2012-04-13">{{ title }}</ArticleTitle>

    <blockquote>
      <a href="https://github.com/teajaymars/filter" target="_blank">
        <Icon pack="fab" icon="github" />
        View on Github</a
      >
    </blockquote>
    <h2 id="replacing-mv-">Replacing <code>mv</code></h2>
    <p>
      Filter uses
      <a href="http://en.wikipedia.org/wiki/Regular_expression"
        >regular expressions</a
      >
      to rename files. I have always felt this is the &quot;missing UNIX
      command&quot;:
    </p>
    <pre>
$ filter report* &quot;s/..from.chris.//&quot;

report analysis (from chris).doc   -&gt; report analysis.doc
report datasheet (from chris).xls  -&gt; report datasheet.xls
report discussion (from chris).doc -&gt; report discussion.doc

Rename these files? [y/N]</pre
    >
    <pre>
$ filter * &quot;s/Episode./S01E0/&quot;
Game of Thrones Episode 1.mpg -&gt; Game of Thrones S01E01.mpg
Game of Thrones Episode 2.mpg -&gt; Game of Thrones S01E02.mpg
Game of Thrones Episode 3.mpg -&gt; Game of Thrones S01E03.mpg

ename these files? [y/N]</pre
    >
    <h2 id="usage">Usage</h2>
    <p>
      <strong>filter</strong> wraps around GNU
      <a href="http://en.wikipedia.org/wiki/Sed">sed</a>, so it uses
      <code>s/search/replace</code> syntax. For example, to rename all
      <code>.txt</code> files, changing the <code>a</code>&#39;s to
      <code>e</code>&#39;s:
    </p>
    <pre>$ filter *.txt s/a/e/</pre>
    <p>
      The syntax also supports
      <a href="http://www.regular-expressions.info/brackets.html"
        >backreferences</a
      >, which are captured in brackets. Refer to groups with <code>\1</code>,
      <code>\2</code> etc.
    </p>
    <pre>
$ filter * &quot;s/foo(.)bar/baz\1/&quot;

foo1bar.txt -&gt; baz1.txt
foo2bar.txt -&gt; baz2.txt
foo3bar.txt -&gt; baz3.txt

Rename these files? [y/N]</pre
    >
    <h2 id="why-">Why?</h2>
    <p>
      <strong>filter</strong> is just a small script, but it solves a
      frustrating problem. Every time I&#39;m in this situation I consult Google
      and come across gems like:
    </p>
    <pre>find . -exec echo echo &quot;{}&quot; | sed &#39;s/./foo/g&#39;\;</pre>
    <pre>ls F00001-0708-*|sed &#39;s/\(.\).\(.*\)/mv &amp; \1\2/&#39; | sh</pre>
    <pre>
for i in *; do ; mv &quot;$i&quot; &quot;echo $i | sed &quot;s/(.) - (.) - (.) - (.).ogg/\1 - \4 - \3 - \2.ogg/&quot;&quot;; done</pre
    >
    <p>I hope that you like my solution better.</p>
  </article>
</template>
