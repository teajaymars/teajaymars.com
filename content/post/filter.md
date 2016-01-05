+++
date = "2012-04-13T13:32:49Z"
draft = false
title = "/usr/bin/filter"

thumb_img = "/img/thumb/filter.png"
thumb_title = "/usr/bin/filter"
description = "Bash extension for renaming groups of files"

+++

* [Download .ZIP](https://github.com/downloads/zephod/filter/filter.zip)  
* [Download .TAR.GZ](https://github.com/downloads/zephod/filter/filter.tar.gz)
* [View on Github](https://github.com/zephod/filter)

---

## Replacing `mv`

Filter uses [regular expressions](http://en.wikipedia.org/wiki/Regular_expression) to rename files. I have always felt this is the "missing UNIX command":

{{< highlight bash >}}
$ filter report* "s/..from.chris.//"

report analysis (from chris).doc     ->     report analysis.doc
report datasheet (from chris).xls    ->     report datasheet.xls
report discussion (from chris).doc   ->     report discussion.doc
Rename these files? [y/N]
{{< /highlight >}}

{{< highlight bash >}}
$ filter * "s/Episode./S01E0/"

Game of Thrones Episode 1.mpg    ->     Game of Thrones S01E01.mpg
Game of Thrones Episode 2.mpg    ->     Game of Thrones S01E02.mpg
Game of Thrones Episode 3.mpg    ->     Game of Thrones S01E03.mpg
Rename these files? [y/N]
{{< /highlight >}}

## Usage

**filter** wraps around GNU [sed](http://en.wikipedia.org/wiki/Sed), so it uses `s/search/replace` syntax. For example, to rename all `.txt` files, changing the `a`'s to `e`'s:

{{< highlight bash >}}
$ filter *.txt s/a/e/
{{< /highlight >}}

The syntax also supports [backreferences](http://www.regular-expressions.info/brackets.html), which are captured in brackets. Refer to groups with `\1`, `\2` etc.

{{< highlight bash >}}
$ filter * "s/foo\(.\)bar/baz\1/"

foo1bar.txt    ->     baz1.txt
foo2bar.txt    ->     baz2.txt
foo3bar.txt    ->     baz3.txt
Rename these files? [y/N]
{{< /highlight >}}

## Why?

**filter** is just a small script, but it solves a frustrating problem. Every time I'm in this situation I consult Google and come across gems like:

*   `find . -exec echo `echo "{}" | sed 's/./foo/g'` \;`
*   `ls F00001-0708-*|sed 's/\(.\).\(.*\)/mv & \1\2/' | sh`
*   `for i in *; do ; mv "$i" "`echo $i | sed "s/\(.*\) - \(.*\) - \(.*\) - \(.*\).ogg/\1 - \4 - \3 - \2.ogg/"`"; done`

I hope that you like my solution better.
