Codesandbox Link - https://codesandbox.io/p/github/aryamishra21/CanvasEditor/main

# steps to use 
- search for a image 
- click on add caption of any image to edit
- add shapes or text according to need result will be shown on the right side 
- download image by download button

# design process
- initialized react project using vite, install react router dom for routing, fabric for canvas
- created two components -edit ,search
- / route for search , /edit/:id route for edit
- designed search component with input , search button
- get api key from splash
- on search api call will be made to get images for our input
- show first 4 images with add caption button
- on click of add caption will redirect to edit page with url of image passed in link state.
- in edit page in useeffect(such that it render whenever the page loads) initialize a canvas and add a state (canvas to update data of canvas), cleanup function to remove canvas when component unmounts
- in useeffect create a image object with url from state, show it on our canvas
- add button to add text on canvas with method to add text on canvas
- add buttons to add shapes onclick attached to a function with switch cases according to shape passed in parameter, this function will create a shape and add this shape to our canvas
on the right side download button which on click creates a elements attaches url, caption of image to it and clicks it to download image
- below download image of updated changes is shown with url from state,state is updated in useffect using methods for modify,added,remove.
- logCanvasObjects logs all shapes to console.
