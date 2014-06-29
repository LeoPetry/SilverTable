#SilverTable

##What?

A small jquery plugin to sort tables.

##Why?

Because you might want a small easy to modify solution to build sortable tables.

##Can I collaborate?

Yes, please help. This is a small starting project and without your help it is going to stay like this.

##What are the goals?

The main goal is to keep the table script completely decoupled from the html syntax. It should not require any particular class or element to work.

###What needs to be done

  - Initiating the plugin in a set of many elements is causing sorting errors
  ex: $('.table').silvertable( json ) when there is more then one element with table class. $(table).each(plguin) might do it.

  - Creating an interface to bind events to custom elements

##How to use?

Call silvertable( tableValues ) in an empty parent container for the table. 

tableValues is obligatory and should be an array with containing objects. Each object represents a table row.

