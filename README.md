#  Instagram Clone

![preview picture instagram clone](https://github.com/welschmoor/instaclone-front/blob/main/preview_pics/one.jpg)

Video overview: https://youtu.be/ir6Q6OM3SX4

Live demonstration: https://instopound.herokuapp.com

backend repo can be found here: `https://github.com/welschmoor/instaclone-nc`


## Functionality
You can:
- register/login (authentication using JWT tokens)
- upload images, edit image description
- add/remove comments on videos
- edit profile avatar
- follow/unfollow users
- create your personalized feed with pictures from people (or dogs) you follow. On instapound you follow dogs, in real life dogs follow YOU!
- dark mode - choice remembered by the browser.


## Fail

- I have failed to implement optimistic response, because I that requires me to redo all backend and have the resolvers return the Comment, Photo, User instead of a simple Boolean. (I fixed it, see my blog post: `https://dev.to/welschmoor/optimistic-ui-with-graphql-in-apollo-e87`)
- I failed to implement real-time UI updates for certain components which require loops. I will try it again later. Woo hoo I managed to implement real-time UI updates after 3 days of struggle `https://dev.to/welschmoor/optimistic-ui-with-graphql-in-apollo-e87`
- Need help here! I failed to implement react router scroll restoration. When I go back from a single picture view, the scroll position I had previously is not remembered and window.scrollTo was of no help, because it scrolls before data loads. Solution would be to implement single view ABOVE the picture feed, like a modal.


###### ToDo
- (done with fetch queries policy, thanks Kalle) in Login handler change the page refresh. Maybe run useUserHook in App.js to solve 
old cache not updating? 
- (done) fix background color not reaching all the way down (min height: 100vh would be the fix) 
- (done) empty feed message 
- (done with cache-and-network policy)after unsubbing from person, we still see his pics in our feed, so fe need to either evict cache or modify it. I could refetchQueries the seeProfile. I ended up clearing cache with useEffect each time I am when visiting feed. I am not sure what's the best way. 
- I was not able to implement input.focus() by using ref={inputRef}, the focus taking works, but the form submit function does not run. NO IDEA WHY. It may be because I use react-hook-form. 
- (not necessary)!!! change the height of grid pictures in profile view! 
- Redo: Continues loading. Implement remembering the page after we leave the page. Ok I've implemented it with: cache-and-network policty of the FEED query. Now Maybe remember the scroll position and scroll the page to that point?
- (done) FIX Profile page not rerendering after deleting picture through Modal
- if user goes to pic which does not exist, display a message that the pic does not exist (if for example data is empty)

- add some hover effect (like show icons or something) for grid pics
- styled the modal form better!
- (done) change the default avatar pic (make it grey BG or something)
- picModal is not scrollable when the pic is too tall in narrow mobile view
- (done) use the efficient hook instead for scrolling
- (done) add comment added message when adding from feed view.
- implement favorites list
- (done) implement change avatar
- (done) implement change picture description
- fix "load more" button, but the scroll and the % operator
- (done) fix dark mode change not working when logged out
- (done) fix comment added message being in the wrong spot. (add relative somewhere)
- (done) Add back-arrows for closing the picModal!
- (edit description done, bio not yet) tomorrow add edit description and edit bio (maybe even through modal.)
- Maybe remove modal wrapper and give its properties to Grid?
- (done) Dark Mode for login and signup! And for Upload modal duh
- (done) Deploy app
- Scroll is not remembered after visiting SinglePic 
- (done) add cleanup to all useEffect
- (done) remove upload modal functionality when logged out!
- (done) make home component refetch (cache-network) users!!! otherwise they don't appear after sign up
- (done) add helmet title everywhere
- implement messaging
- create skeleton
- (done) add default description for photo caption
- (done, thanks @angelxv01) fix heroku not showing a user directly (direct url to profile)
- (done) create delete account functionality
- Would it be better to split toggleLike in two different resolvers? (no)
- (done) fix vertical line through avatar pic
- ask someone about the real-time updates (cache and whatnot).
- (done my own way) implement optimistic mutations
- (done) fix edit caption icon (position absolute!)
- hide Load more pictures button when there are only 4 pictures! (but I would need to .count() pictures for that because we don't know how many more are available)
- (done) fix login/signup screen showing uneven change in color when changing theme (only Firefox)
- (done) does not work well on mobile, everything is wider than it should be. (probably min-width settings)
- /hashtag and /search dont have any like handlers implemented!
- icons are crooked after navbar thins
- create a mirror-link on heroku just in case
- (done) fix avatar pics that are not square appearing stretched
- fix pic comments line height. Other than that, I tested everything, works great!
- make it impossible to submit commment when logged out!