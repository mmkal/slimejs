# slimejs
Port of Slime Volleyball/Tennis/Cricket/Basketball to html5/javascript.

[![Build Status](https://travis-ci.org/mmkal/slimejs.svg?branch=master)](https://travis-ci.org/mmkal/slimejs)

#[Play it here](http://slimejs.herokuapp.com)
#[![Yes, play it there.](http://i.imgur.com/ThHVJgb.png)](http://slimejs.herokuapp.com)

## What

Allows you to play the original "Slime" games as found on http://slimegames.eu/, http://slimetennis.com and other similar sites, without having to run Java in your browser.

## How 

This scrapes a few sites that still host the games as Java applets. It finds and downloads the `.class` and `.jar` files.

Once it has got all the compiled java classes, it uses [fernflower](https://github.com/JetBrains/intellij-community/tree/master/plugins/java-decompiler/engine) to decompile them. This seems to have problems with renaming variables in subclasses, so there's also a custom `IIdentifierRenamer` to keep track of the renames and make regex bodging easier.

The java files then get transpiled using [jsweet](http://www.jsweet.org/), after a lot of pre-processing, shimming and horrible regexes. They get transpiled to TypeScript, and I wrote TypeScript versions of all the Java dependencies that the games have (Applet, Image, System, etc.). There are _a lot_ of assumptions made about the transpiler, the decompiler, and the original source code. The technique probably wouldn't immediately work for many other Applets if they were written in a different way. 

In general, the original games work by liberally using Java's Thread.sleep and polling for game state. I shimmed this with a Promise wrapper for setTimeout, and made every method that called it async, and every method that called those methods, etc. So this may not work in browsers that don't like `async`/`await`.

The UI is rendered by calling equivalent html5 canvas methods from the TypeScript Applet shim. Some of them are still implemented a bit wrongly.

## Why

I don't know.

## Helping

If you want to work on this, I'll be... surprised.

You should be able to just clone and run `npm install`. This will take quite a long time because it gets dependencies from a few web services. The flow is more or less this:

|flow|
|---|
| scrape slimegames.eu et al. |
| decompile to Java with fernflower |
| pre-process Java with horrible regexes |
| transpile to TypeScript with jsweet.org |
| post-process TypeScript with horrible regexes |
| compile to JavaScript with webpack |
| play |

You'll need Java 8 `java` and `javac` binaries on your system path.

[![wakeup](http://slimejs.herokuapp.com/wakeup.png)](http://slimejs.herokuapp.com)
