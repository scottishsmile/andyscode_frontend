---
title: 'Python JSON Appender'
meta_desc: 'Add key pairs to every json object using python'
meta_keywords: 'coding blog'
date: "June 12, 2023"
excerpt: 'Add new key pairs to every json object using python'
cover_image: '/blog/banners/jsonpythonbanner.png'
category: 'Python'
author: 'Andy Davis'
author_image: '/blog/andy-headpic.jpg'
---

# Python JSON Appender

I ended up writing a little python script today to append Key-Value pairs to a json file. Why didn’t I just use copy paste? The json file was 1000 lines long, made up of 100s of objects and not all were the same. So I couldn’t just find the last key and replace it with a copy and the new key-pair.

This is a simplified version, but you can see the objects int his file are a little different.

We need to add the same key-pairs to all the objects.


### Starting JSON File
```json

[
	{
		"Name": "John",
		"Age": 31
	}, 
	{
		"Name": "Sally",
		"Age": 22,
		"Manager": "John"
	}, 
	{
		"Name": "Susan",
		"Age": 35
	}, 
	{
		"Name": "Dave",
		"Age": 25,
		"Manager": "Susan"
	}
]

```


### Python Script
This is the python script I wrote. You can easily programmatically add, update and delete parts of the json file using the “import json” python library. This script is pretty basic, I didn’t see the need for any error checking or try catch blocks.

```python

# JSON Appender
# Add a new key value pair to all JSON objects inside a json file.
# The json object is a Python dictionary - you can simply add a new value to that, then re-encode and rewrite the file.

import json

my_dictionary = {
    "NewKeyPair1": "Shoes",
    "NewKeyPair2": "01-01-2000",
    "NewKeyPair3": 1000
}

# You may need to add encoding values here to get the file to work!
with open(r"C:\Files\your_json_file.json", "r+", encoding="utf-8-sig", errors="ignore") as json_file:
    json_decoded = json.load(json_file)

    for i in json_decoded:
        i.update(my_dictionary)

    json_file.seek(0)

    # options to indent the json file to make it pretty
    json.dump(json_decoded, json_file, ensure_ascii=True, indent=4, sort_keys=True)

    print('Complete!')


```


### Completed JSON File
The new output is below, our new key-pairs have been added to all the json objects.
This is fantastic for updating Data Transfer Objects (DTOs) in your APIs.

Don’t forget to check the json files using online Json code validators!

```json

[
    {
        "Age": 31,
        "Name": "John",
        "NewKeyPair1": "Shoes",
        "NewKeyPair2": "01-01-2000",
        "NewKeyPair3": 1000
    },
    {
        "Age": 22,
        "Manager": "John",
        "Name": "Sally",
        "NewKeyPair1": "Shoes",
        "NewKeyPair2": "01-01-2000",
        "NewKeyPair3": 1000
    },
    {
        "Age": 35,
        "Name": "Susan",
        "NewKeyPair1": "Shoes",
        "NewKeyPair2": "01-01-2000",
        "NewKeyPair3": 1000
    },
    {
        "Age": 25,
        "Manager": "Susan",
        "Name": "Dave",
        "NewKeyPair1": "Shoes",
        "NewKeyPair2": "01-01-2000",
        "NewKeyPair3": 1000
    }
]
```
