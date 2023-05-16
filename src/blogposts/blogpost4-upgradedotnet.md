---
title: 'Upgrading .Net Programs'
meta_desc: 'Advice when upgrading a .NET program'
meta_keywords: 'coding blog'
date: "June 10, 2023"
excerpt: 'Advice when upgrading a .NET program'
cover_image: '/blog/banners/dotnetbanner.png'
category: '.Net'
author: 'Andy Davis'
author_image: '/blog/andy-headpic.jpg'
---

### Upgrading .Net Programs

Recently, I was asked to upgrade an app from .NET 3.5 to a currently supported version. This app was heavily used by a team of 15 people and needed to be upgraded before it was moved from a physical server to a cloud server.

Luckily this was a small application, just one Program.cs file with maybe 800 lines of code. One big script that interacted with network folders to convert documents from one format and layout to another.

I had dreams of upgrading it to .Net 7 but this was a stretch too far! Microsoft has released an “Upgrade Assistant” that does most of the heavy lifting for you. Just follow along with it’s command prompt steps and then fix whatever modules were not working afterwards. Unfortunately, it wanted to turn this console application into a .NET 7 WebAPI for some reason.

Forced to abandon an upgrade to the current .NET 7, the next best solution was .NET Framework v4.8.1, which is still officially supported. To do this, you download the runtime and dev kit, install them and change the “target framework” in your app’s properties to “NET Framework 4.8.1”. The upgrade assistant can be quite helpful here, updating and removing sections of bad code as you move between versions.

<center><img src="/blog/post-imgs/targetframework.png" alt=".NET Framework Upgrade" /><center>

Look at your Nuget packages next, upgrade the ones you can and find replacements for the ones you can’t. In my case, an SDK for Microsoft Exchange needed replaced by a newer Net Core version and I had to change some of the code to use Async / Await statements to support this new module.

<center><img src="/blog/post-imgs/nugetdeprecated.png" alt="Nuget Packages deprecated" /><center>

To my horror, when I went to deploy the upgraded app I found that NET Framework 4.8.1 only works on WinServer2022 and we had the 2019 version! After some meeting with the hosting department we managed to get a 2022 server image and away we go!