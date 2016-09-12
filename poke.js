/*========================================
	.__________________.
   /|                  |
  | |       \ ' .______|_._____._____
  | |    -..   / .--,
  | |  ----   | (___(   (|) POKE.JS
  | |    _..   \_________._____._____
  | |       / .        |
  | |__________________|
  |/__________________/

__________________________________________
HOW TO USE
==========================================

_____________________
ADD A CLASS


	<div id="barry" onclick="Poke( 'add', '#barry', 'invisible' )"></div>

Makes the div 'barry' get the class 'invisible' when it's clicked.

	<div id="barry" onclick="Poke( 'add', '#liz', 'invisible' )"></div>
	<div id="liz"></div>
	
Makes the div 'liz' get the class 'invisible' when Barry is clicked.

_____________________
REMOVE A CLASS

	<div id="rupert" class="scarf" onmouseover="Poke( 'remove', '#woods .scarf', 'scarf' )"></div>
	<div id="woods">
		<li class="scarf"></li>
		<li class="scarf"></li>
		<li class="scarf"></li>
		<span class="scarf"></span>
	</div>

When you roll the mouse over this element it will remove the class 'scarf' from every element in 
#woods with the class 'scarf' - but not from #rupert.

___________________________________
THE CLASS IS ONLY ON THIS ELEMENT

	<div id="tab1" onclick="Poke ( 'only', '#tab1', 'shown' )></div>
	<div id="tab2"></div>
	div id="tab3" class="shown"></div>

Clicking #tab1 will give it the 'shown' class, but also remove it from any other element in the 
page that has the 'shown' class.

*/

var PokeDebugMode = false;

function Poke( action, selector, classname ){
	
	//the class that's printed onto the selected element. Default is 'poked'
	classname = classname || "poked";
	action = action || "must include an action: 'only', 'add' or 'remove'";
	selector = selector || "didn't include any CSS selectors";
	action = action.toString().toLowerCase();
	selector = selector.toString();
	var author = "Polyducks";
	
	//F
	//-------------------------------------------------
	//remove the specified class from a group of elements	
	var remove = function( action, selector, classname ){
		var oldItems = document.querySelectorAll( selector );
		//match a class name which may contain 0-1 leading white spaces and is a whole word
		var regex = new RegExp('\\s?\\b' + classname +'\\b','g');
		for (var i = 0; i < oldItems.length; i ++){
			//removes the classname as well as any leading spaces
			oldItems[i].className = oldItems[i].className.replace( regex, "" );
		}
		if (PokeDebugMode){
			console.log("POKE: The class ." + classname + " has been removed from all elements matching " + selector + "'.");
		}
	};
	//add new classes to selected elements
	var add = function( action, selector, classname ){
		var newItems = document.querySelectorAll( selector );
		for (var i = 0; i < newItems.length; i ++){
			newItems[i].className += " " + classname;
		}
		if (PokeDebugMode){
			console.log("POKE: The class ." + classname + " has been added to all elements matching '" + selector + "'.");
		}
	};
	//-------------------------------------------------
	
	switch (action){
		case "only":	//removes all other appearances of this class, adding it only to the target
			remove( action, "." + classname, classname );
		case "add":		//shows one set of items without removing any before
			add( action, selector, classname );
			break;
		case "remove":	//hide all the shown items
			remove( action, selector, classname );
			break;
		default:
		//error;
		if (PokeDebugMode){
			console.log("POKE: The script returned these errors: (" + action + ", " + selector + ", new classname is '" + classname +  "')");
		}
	}
}