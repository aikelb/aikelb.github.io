---
title: "Gamefeel Invaders"
date: 2026-06-13
tool: gamefeel
tags:
  - _posts
  - gamedev
  - tool
seo:
  description: "An interactive demake of my Unity game-feel teaching tool. Layer juice effects onto a Space Invaders clone and watch the same game come alive."
---

Game feel is the part nobody can screenshot. Two games can share identical rules, identical art, identical level layouts, and one of them still feels dead while the other feels great. The difference lives in the small reactions: the squash on a hit, the spark off a bullet, the half-frame of screen shake, the way an enemy eases into place instead of snapping there.

I built a Unity tool to teach this in workshops. It is a plain Space Invaders clone with around thirty "juice" effects that you can stack on one at a time, so a room can watch the same game transform without a single rule changing. This is the web demake of that tool, rebuilt to run in the browser with no image or sound assets at all. Every ship and bullet is drawn as a neon polygon, and every sound is synthesised on the fly.

Press start, then drag the **juice** slider from zero. Each step adds the next effect in the same order I use when teaching: color first, then spawn and movement easing, then the bullets and enemies, then particles, screen shake, and finally sound. You can also flip individual effects from the grouped toggles below, or jump straight to a preset. The fun part is going back to **none** afterwards, because the base game suddenly feels broken even though nothing about how it plays has changed.

The point we make with it: feel is not polish you add at the end. It is a budget you spend deliberately, and most of it costs almost nothing.
