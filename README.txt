What is it for?
===============

This repo is used for making temporary public html previews for sharing?

It takes advantage of GitHubs public document html feature

What it is NOT for?
===================

NOT for storing working or despatch file permanently.  Files should be stored or server and / or on a seperate repo.
Not for storing assets referenced by EDMs.  Final despatch versions of edms should reference an S3 bucket.
Not for storing fonts, images or other assets referenced by final despatched display banners.

Why did you do this??!!!!
=========================

There is a method to the madness.

This was done to cheaply and effortlessly create preview links in seconds via git commands - add, commit and push.

Previous solutions required tedious and slow uploading to doubleclick studio platform.  
This was particularly slow when there are multiple rounds of feedback in a short period of time.
So rather than constantly uploading files, which could take up to 10 minutes, it can be done via command line which allows for rapid, multiple rounds of feedback.


Folder structure
================

display
=======

This folder is for previewing display banner sets.  Each set should have its own folder.
Each of these folders should have a child folder for each banner

Use BRX naming conventions based on Job Number, Campaign name, banner type and size.

Mostly used for bespoke banners that are built via html5 to specs.

Included is clickTag_sample
This contains typical folder structure of bannes

Also an additional file

all.html - this is a html doc that previews all banners in the folder.  
The document will need to be edited to match banner folder structure and sizes

edm
===

For displaying edm and assets for internal and external previewing and rounds of feedback.
Each EDM should have its own folder with folder name based on Job number and Campaign name

NOT for final despatch files.  They should be stored on a s3 bucket or provided directly depending on specs.

NOT for device and browser testing.  Currently we use mailgun for edm testing.

NOT for permanent storage.  Should be removed when no longer needed.


utilities
=========

This is the outlier as this is semi permanent


It contains one folder ->

convert2RichMedia
=================

This is a feature where code can pasted into the text  box and converted to richMedia.
The user can then paste into various platforms such as Siesmic and Outlook and instead of just showing the html code as text, it will display as html content.
