#  Instagram Clone


###### ToDo
in Login handler change the page refresh. Maybe run useUserHook in App.js to solve 
old cache not updating?

fix background color not reaching all the way down (min height: 100vh would be the fix)

empty feed message

after unsubbing from person, we still see his pics in our feed, so fe need to either evict cache
or modify it. I could refetchQueries the seeProfile. I ended up clearing cache with useEffect each time I am when visiting feed. I am not sure what's the best way.