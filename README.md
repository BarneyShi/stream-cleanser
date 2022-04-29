# stream-cleanser
Have you ever feel tired seeing trolls plaguing streams and want their comments to disappear forever?\
Here's a tampermonkey script for Douyu.com to filter trolls' comments.\
Click on the small `X` next to users' nicknames, and they would disappear from comments and danmus forever.

![img](https://i.imgur.com/f92t6N1.png)

Pros:
- Douyu.com disables some events, but I found `MutationObserver` is very handy to check if some key elements have been loaded.
- Use `Event Bubbling` to reduce CPU workloads.

Weakness:
- Block list is stored in `localStorage`, so it'll disappear if you clear browser data.