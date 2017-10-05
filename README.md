<div><img src="https://raw.githubusercontent.com/mathiasquintero/trumpify/master/logo.png" height=200></div>

# Trumpify

### Make your words be the BEST WORDS.

The President usually set the standard in fashion for the next few years. And no fashion statement of the Trump presidency has been more present than the way he talks (and most importantly tweets). For a demo go [Here](http://quintero.io/trumpify/)

<div><img src="http://i.giphy.com/95EqkcvnV48mY.gif" height=350></div>

Trumpify is here to help you imitate his style. (WIP)

Using NLP Trumpify notices the intent and different entities in your sentences and adds insults or praise as it needs. It also finds any words that may be too complicated and makes them, well... More Trumpy.

For example:

```
The New York Times keeps spreading inaccurate information. 
The media truly is the adversary of my administration.
```

Turns into:

```
The failing New York Times keeps spreading wrong information. 
The media truly is the opponent of my presidential term. 
SO NOT GOOD!
```

So what happened here?

* Trumpify checked the intent of our message and notice a negative position. 
* It added a TrumpStyle finishing sentence using this sentiment. 
* Then it identified that we're talking about the New York Times and added a TrumpStyle insult. 
* Finally it identified the complex words such as "inaccurate" and "administration", and looked for any synonyms that are often used by Trump.

As you can imagine this is perfect for tweeting! ;)

It's still pretty buggy, but I think with a bit more work, we can make Tweeting Great Again

## Possible Uses

* Trump Slack Command
* Trumpify Chrome Extension

