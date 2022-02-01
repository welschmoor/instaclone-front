#  Instagram Clone


###### ToDo
in Login handler change the page refresh. Maybe run useUserHook in App.js to solve 
old cache not updating?

fix background color not reaching all the way down (min height: 100vh would be the fix)

empty feed message

after unsubbing from person, we still see his pics in our feed, so fe need to either evict cache
or modify it. I could refetchQueries the seeProfile. I ended up clearing cache with useEffect each time I am when visiting feed. I am not sure what's the best way.

I was not able to implement input.focus() by using ref={inputRef}, the focus taking works, but the form submit function does not run. NO IDEA WHY. It may be because I use react-hook-form

!!! change the height of grid pictures in profile view!


After picture upload I do: refetchQueries. Find a way to update cache. I came close with id: ROOT_QUERY