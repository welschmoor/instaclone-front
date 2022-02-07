#  Instagram Clone


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

- change the default avatar pic (make it grey BG or something)

- picModal is not scrollable when the pic is too tall in narrow mobile view

- (done) use the efficient hook instead for scrolling

- (done) add comment added message when adding from feed view.

- implement favorites list

- (done) implement change avatar

- implement change picture description

- fix "load more" button, but the scroll and the % operator

- fix dark mode change not working when logged out

- fix comment added message being in the wrong spot. (add relative somewhere)

- (done) Add back-arrows for closing the picModal!

- tomorrow add edit description and edit bio (maybe even through modal.)

- Maybe remove modal wrapper and give its properties to Grid?

- Dark Mode for login and signup! And for Upload modal duh

- (done) Deploy app

- Scroll is not remembered after visiting SinglePic 

- (done) add cleanup to all useEffect

- remove upload modal functionality when logged out!

- (done) make home component refetch (cache-network) users!!! otherwise they don't appear after sign up

- add helmet title everywhere

- implement messaging

- create skeleton

- add default description for photo caption

- fix heroku not showing a user directly (direct url)

- create delete account functionality

- ask someone about the real-time updates (cache and whatnot).

- Would it be better to split toggleLike in two different resolvers?

## Functionality
You can
- register/login (authentication using JWT tokens)
- upload images, edit image description
- add/remove comments on videos
- edit profile avatar
- follow/unfollow users
- create your personalized feed with picturs from people (or dogs) you follow
