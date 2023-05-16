---
title: 'Python GUIs'
meta_desc: 'python graphical user interfaces'
meta_keywords: 'coding blog'
date: "June 5, 2023"
excerpt: 'What GUI options are there for Python programs?'
cover_image: '/blog/banners/pythonbanner.png'
category: 'Python'
author: 'Andy Davis'
author_image: '/blog/andy-headpic.jpg'
---

### Python GUIs

A lot of new developers are starting their careers by learning Python, it seems to be the entry-level language of choice at the moment. Other industries that need to program but don’t really want to become professional coders are also choosing Python because it works, is powerful and gets the job done (Network engineers, system admins, electrical engineers and even chemists!).

Once you are familiar with the basics of the language and have written a few scripts and console programs the most obvious question is “How do I make a GUI for my program?”.  There are a few options available, none of them really great but definitely workable and they will get the job done.

The most popular option beginners will stumble across is using a GUI program like tkinter, pyQt, Kivy or PySimpleGui. This will seem to be the answer but it is not. These programs will be fairly difficult to program, most won’t have a WYSIWYG-Designer (a visual designer tool) so everything will be done in code and they probably won’t be compatable with different operating systems. So you’d need to build a different GUI for Windows, Mac and Linux.

They also don’ t look great:

<center><img src="/blog/post-imgs/pysimplegui.png" alt="Python GUI" /></center>

A better option would be to use your web browser as the GUI. This is a much better solution as it can be run on any operating system and will look great. You can use HTML and CSS to program the  look and feel. There’s also transferable skills with that to web design! 

So how do you do that? Well, you have to use a web framework like Flask / Django / FastAPI / web2py. You basically turn your Python program into a web app. You can then have it run locally and display a browser window for the user to interact with or even just publish it online, that way you are not passing around a zip file with the program in it.

Flask is a good choice as it is small and light-weight.