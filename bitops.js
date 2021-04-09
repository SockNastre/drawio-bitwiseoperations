/**
 * Adds bitwise operations UI as part of the bitOps plugin.
 * Based on: https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/grapheditor/Sidebar.js#L696
 */
Sidebar.prototype.addbitOpsPalette = function(title, placeholder, expand)
{
	// Variable in container which controls title
	var elt = this.createTitle(title);
	
	// Title variable then added as a child to the container
	this.container.appendChild(elt);

	// Creates sidebar box element, giving it properties that will
	// make the later-added textbox inside centered
	var div = document.createElement('div');
	div.className = 'geSidebar';
	div.style.boxSizing = 'border-box';
	div.style.overflow = 'hidden';
	div.style.width = '100%';
	div.style.padding = '8px';
	div.style.paddingTop = '14px';
	div.style.paddingBottom = '0px';

	// If expand is false then title is folded in
	if (!expand)
	{
		div.style.display = 'none';
	}
	
	// Makes title foldable
	this.addFoldingHandler(elt, div);
	
	// Some kind of whitespace, indicating inside of UI
	var inner = document.createElement('div');
	inner.style.whiteSpace = 'nowrap';
	inner.style.textOverflow = 'clip';
	inner.style.paddingBottom = '8px';
	inner.style.cursor = 'default';

	// Creates textbox element, then adds it to "inner" as a child control
	var input = document.createElement('input');
	input.setAttribute('placeholder', placeholder);
	input.setAttribute('type', 'text');
	input.style.fontSize = '12px';
	input.style.overflow = 'hidden';
	input.style.boxSizing = 'border-box';
	input.style.border = 'solid 1px #d5d5d5';
	input.style.borderRadius = '4px';
	input.style.width = '100%';
	input.style.outline = 'none';
	input.style.padding = '6px';

	inner.appendChild(input);
	div.appendChild(inner);

	// Function for generating bitOps output in cell-region
	var gen;

	// Creates button and center frame for button
	var center = document.createElement('center');
	var button = mxUtils.button("Draw", function()
	{
		gen();
	});
	
	// Workaround for inherited line-height in quirks mode
	button.style.lineHeight = 'normal';
	button.style.fontSize = '12px';
	button.style.padding = '6px 12px 6px 12px';
	button.style.marginTop = '4px';
	button.style.marginBottom = '8px';
	center.style.paddingTop = '4px';
	center.style.paddingBottom = '4px';
	
	center.appendChild(button);
	div.appendChild(center);

	// Defining generate function for bitOps
	gen = mxUtils.bind(this, function()
	{
		// Blank input value yields no generation
		if (input.value != '')
		{
			// Generation goes here
		}
	});
	
	////////////////////////////////////////////////////////////////////////////
	//
	// Checks when key is pressed on keyboard
	//
	mxEvent.addListener(input, 'keydown', mxUtils.bind(this, function(evt)
	{
		if (evt.keyCode == 13 /* Enter */)
		{
			find();
			mxEvent.consume(evt);
		}
	}));
	
	////////////////////////////////////////////////////////////////////////////
	//
	// Checks when text is changed in textbox
	//
	mxEvent.addListener(input, 'keyup', mxUtils.bind(this, function(evt)
	{

	}));

	////////////////////////////////////////////////////////////////////////////
	//
    // Workaround for blocked text selection in Editor
	//
    mxEvent.addListener(input, 'mousedown', function(evt)
    {
    	if (evt.stopPropagation)
    	{
    		evt.stopPropagation();
    	}
    	
    	evt.cancelBubble = true;
    });
    
	////////////////////////////////////////////////////////////////////////////
	//
    // Workaround for blocked text selection in Editor
	//
    mxEvent.addListener(input, 'selectstart', function(evt)
    {
    	if (evt.stopPropagation)
    	{
    		evt.stopPropagation();
    	}
    	
    	evt.cancelBubble = true;
    });

	// Adds sidebar element to title
	var outer = document.createElement('div');
    outer.appendChild(div);
    this.container.appendChild(outer);
};

/**
 * Loads bitOps UI into drawio sidebar. Keep this function
 * at bottom!
 */
Draw.loadPlugin(function(ui)
{	
	// Sidebar is null in lightbox
	if (ui.sidebar != null)
	{
		// Adds bitOps side UI
		ui.sidebar.addbitOpsPalette("bitOps", "A OR B", true);
	
	    // Collapses default sidebar entry and inserts this before
	    var c = ui.sidebar.container;
	    c.firstChild.click();
	    c.insertBefore(c.lastChild, c.firstChild);
	    c.insertBefore(c.lastChild, c.firstChild);
	}
});
