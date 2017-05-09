Admin mode.

When you click the admin button it makes a new area visible with the cat's name, url and number of clicks. If I go there and change the name it should update the model with the new information and, of course tell the views to refresh (which also hides "admin" mode).

So, what will we need to add?
Html for the admin button and all of the stuff next to it. That will involve two buttons, three inputs, labels and a form to contain these. And it's a good idea to add a "Cancel" button too.

In terms of the MODEL we need a property to say whether or not the admin mode is showing.
We can set it to true or false with our OCTOPUS function. Then whether it true or false VIEW will render or not render this.

In VIEW we have an init() function which we call once. That will ad the event listeners to all our buttons.

Just for review, adding event listeners means we're telling these elements to listen for certain events (in this case - click events) so when the user clicks we run the function.

Now what about the OCTOPUS?
In the OCTOPUS we'll have the function for opening the VIEW when we press the admin button, a function for closing the VIEW when we press "Cancel" and a function for updating the cat with a current values when we press "Save".