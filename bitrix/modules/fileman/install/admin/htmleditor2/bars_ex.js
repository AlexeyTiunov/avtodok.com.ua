// #######################################
// ########## Toolbarsets class #############
// #######################################
function BXToolbarSet(pColumn, pMainObj, bVertical)
{
	ar_BXToolbarSetS.push(this);
	this.className = 'BXToolbarSet';
	pColumn.unselectable = "on";
	this.pWnd = pColumn;
	this.pMainObj = pMainObj;
	this.bVertical = bVertical;
	this.pWnd.className = 'bxedtoolbarset';
	this.arToolbarPositions = [];
	pColumn.style.display = "";
	pColumn.parentNode.style.display = "";

	if(bVertical)
	{
		pColumn.style.verticalAlign = "top";
		pColumn.innerHTML = '<img src="' + one_gif_src + '" width="1" height="0">';
		this.pWnd = pColumn.appendChild(this.pMainObj.pDocument.createElement("TABLE"));
		this.pWnd.unselectable = "on";
		this.pWnd.cellSpacing = 0;
		this.pWnd.cellPadding = 0;
		this.pWnd.border = 0;
		this.pWnd.insertRow(0);
		this.pParent = pColumn;
	}

	// Check if coordinate hit in toolbarset area (+/- some inaccuracy)
	// Return array:
	//		"row" - row in toolbarset;
	//		"col" - column in toolbarset;
	//		"addrow"  - between two rows
	// or false - if it's too far
	BXToolbarSet.prototype.HitTest = function (px, py, ind)
	{
		var delta = 3;
		var position;

		if (!(position = CACHE_DISPATCHER['BXToolbarSet_pos_'+ind]))
			position = CACHE_DISPATCHER['BXToolbarSet_pos_'+ind] = GetRealPos((this.bVertical ? this.pParent : this.pWnd));

		//var position = GetRealPos((this.bVertical ? this.pParent : this.pWnd));
		if(	position["left"] - delta < px &&
			px < position["right"] + delta &&
			position["top"] - delta < py &&
			py < position ["bottom"] + delta)
		{
			var result = Array();
			result["row"] = 0;
			result["col"] = 0;
			result["addrow"] = false;
			// find all toolbars in toolbarset
			var allNodes;
			if(this.bVertical)
				allNodes = this.pWnd.rows[0].cells;
			else
				allNodes = this.pWnd.childNodes;

			if(!allNodes || allNodes.length<=0)
			{
				//CACHE_DISPATCHER['BXToolbarSet_pos_'+ind] = null;
				result["addrow"] = true;
				return result;
			}

			var allCells, j;
			for(var i=0, l = allNodes.length; i < l; i++)
			{
				var toolbar_position = GetRealPos(allNodes[i]);
				if(this.bVertical)
				{
					if(toolbar_position["left"] - delta < px && px < toolbar_position["right"] + delta)
					{
						if(toolbar_position["left"] + delta > px)
						{
							result["addrow"] = true;
							result["col"] = i;
						}
						else if(toolbar_position["right"] - delta < px)
						{
							result["addrow"] = true;
							result["col"] = i+1;
						}
						else
						{
							result["col"] = i;
							allCells = allNodes[i].childNodes[0].rows;
							for(j = allCells.length-1; j > 0; j--)
							{
								var celltemp = allCells[j].cells[0];
								var celltemp_position = GetRealPos(celltemp);
								if(celltemp_position["top"] - delta < py)
								{
									result["row"] = j;
									break;
								}
							}
						}
						return result;
					}
				}
				else
				{
					if(toolbar_position["top"] - delta < py && py < toolbar_position["bottom"] + delta)
					{
						if(toolbar_position["top"] + delta > py)
						{
							result["addrow"] = true;
							result["row"] = i;
						}
						else if(toolbar_position["bottom"] - delta < py)
						{
							result["addrow"] = true;
							result["row"] = i + 1;
						}
						else
						{
							result["row"] = i;
							allCells = allNodes[i].rows[0].cells;
							for(j = allCells.length-1; j > 0; j--)
							{
								var cell_position = GetRealPos(allCells[j]);
								if(cell_position["left"] - delta < px)
								{
									result["col"] = j;
									return result;
								}
							}
						}
						return result;
					}
				}
			}
		}
		return false;
	};

	BXToolbarSet.prototype.returnToolbarsPositions = function ()
	{
		return this.arToolbarPositions;
	};


	BXToolbarSet.prototype.__AddRow = function (id)
	{
		var t = this.pMainObj.pDocument.createElement("TABLE");
		t.id = id;
		t.cellSpacing = 0;
		t.cellPadding = 0;
		t.border = 0;
		t.unselectable = "on";
		var r = t.insertRow(0);
		return t;
	};


	// Add toolbar to toolbarset
	BXToolbarSet.prototype.AddToolbar = function (pToolbar, row, col, bAddRow)
	{
		CACHE_DISPATCHER['pEditorFrame'] = null;

		pToolbar.bDocked = true;
		var pColTable = null;
		var rowIcons;
		pToolbar.SetDirection(this.bVertical);

		if(this.bVertical)
		{
			var cols = this.pWnd.rows[0].cells;
			var pRow, tTable;
			if(col>cols.length)
				col = cols.length;
			if(col >= cols.length || bAddRow)
			{
				var ctmp = this.pWnd.rows[0].insertCell(col);
				ctmp.style.verticalAlign = "top";
				tTable = ctmp.appendChild(this.pMainObj.pDocument.createElement("TABLE"));
				tTable.cellSpacing = 0;
				tTable.cellPadding = 0;
				tTable.border = 0;
				tTable.unselectable = "on";
			}
			else
			{
				tTable = cols[col].childNodes[0];
				if(tTable.clientHeight + pToolbar.pWnd.clientHeight > this.pMainObj.arConfig["height"])
				{
					tTable = null;
					return this.AddToolbar(pToolbar, row, col+1, bAddRow);
				}
			}

			if(row>tTable.rows.length)
				row = tTable.rows.length;

			pRow = tTable.insertRow(row);
			pColTable = pRow.insertCell(0);

			tTable = null;
			pRow = null;
			ctmp = null;
			cols = null;
		}
		else
		{
			var allNodes = this.pWnd.childNodes;
			var pRowTable;
			if(row>allNodes.length)
				row = allNodes.length;
			if(row >= allNodes.length || bAddRow)
			{
				var t = this.pMainObj.pDocument.createElement("TABLE");
				t.cellSpacing = 0;
				t.cellPadding = 0;
				t.unselectable = "on";
				var r = t.insertRow(0);

				if(row >= allNodes.length)
					pRowTable = this.pWnd.appendChild(t);
				else
					pRowTable = this.pWnd.insertBefore(t, allNodes[row]);
			}
			else
			{
				pRowTable = allNodes[row];
				if(pRowTable.clientWidth + pToolbar.pWnd.clientWidth > this.pMainObj.arConfig["width"])
					return this.AddToolbar(pToolbar, row+1, col, bAddRow);
			}

			if(col>pRowTable.rows[0].cells.length)
				col = pRowTable.rows[0].cells.length;


			pColTable = pRowTable.rows[0].insertCell(col);

			rowIcons = pToolbar.pIconsTable.rows[0];
			rowIcons.cells[0].style.display = GetDisplStr(1);
			rowIcons.cells[rowIcons.cells.length-1].style.display = GetDisplStr(1);

			r = null;
			t = null;
			pRowTable = null;
			allNodes = null;
		}

		pToolbar.row = row;
		pToolbar.col = col;

		pToolbar.pWnd.style.position = "relative";
		pToolbar.pWnd.style.zIndex = "200";
		pToolbar.pWnd.style.left = null;
		pToolbar.pWnd.style.top = null;

		pToolbar.pTitleRow.style.display = "none";

		pToolbar.pWnd = pColTable.appendChild(pToolbar.pWnd);
		pToolbar.pWnd.style.position = "";
		pToolbar.pToolbarSet = this;
		pToolbar.parentCell = pColTable;

		this.__ReCalc();
		pColTable = null;
	};

	//Dell toolbar from toolbarset
	BXToolbarSet.prototype.DelToolbar = function (pToolbar)
	{
		CACHE_DISPATCHER['pEditorFrame'] = null;

		pToolbar.parentCell.removeChild(pToolbar.pWnd);
		pToolbar.pToolbarSet = null;
		this.__ReCalc();
	};

	BXToolbarSet.prototype.__ReCalc = function ()
	{
		var allNodes;
		var i, j, pToolbar;
		if(this.bVertical)
		{
			var cols = this.pWnd.rows[0].cells;
			for(i=cols.length-1; i>=0; i--)
			{
				allNodes = cols[i].childNodes[0].rows;
				for(j=allNodes.length-1; j>=0; j--)
					if(allNodes[j].cells[0].childNodes.length<=0)
						cols[i].childNodes[0].deleteRow(j);
				if(cols[i].childNodes[0].rows.length<=0)
					this.pWnd.rows[0].deleteCell(i);
			}

			for(i=0; i<cols.length; i++)
			{
				allNodes = cols[i].childNodes[0].rows;
				for(j=0; j<allNodes.length; j++)
				{
					pToolbar = allNodes[j].cells[0].childNodes[0].pObj;
					pToolbar.row = j;
					pToolbar.col = i;
					this.arToolbarPositions[pToolbar.name] = [pToolbar.row,pToolbar.col];
				}
			}
		}
		else
		{
			allNodes = this.pWnd.childNodes;
			for(i=allNodes.length-1; i>=0; i--) // horizontal rows
			{
				var tbl = allNodes[i];
				for(j=tbl.rows[0].cells.length-1; j>=0; j--)
					if(tbl.rows[0].cells[j].childNodes.length<=0)
						tbl.rows[0].deleteCell(j);
				//dell whole table if there are no rows....
				if(tbl.rows[0].cells.length<=0)
					this.pWnd.removeChild(tbl);
			}
			for(i=0; i<allNodes.length; i++)
				for(j=0; j<allNodes[i].rows[0].cells.length; j++)
				{
					pToolbar = allNodes[i].rows[0].cells[j].childNodes[0].pObj;
					pToolbar.row = i;
					pToolbar.col = j;
					this.arToolbarPositions[pToolbar.name] = [pToolbar.row,pToolbar.col];
				}
		}
		pToolbar = null;
		tbl = null;
		allNodes = null;
	};
}


//###################################################
//#   class BXToolbar - toolbar
//#   pWnd - pointer to TABLE of toolbar
//#   bDragging - dragging state
//#   bDocked - docked state
//###################################################
function BXToolbar(pMainObj, title, name, dx, dy)
{
	ar_BXToolbarS.push(this);
	this.pMainObj = pMainObj;
	this.className = 'BXToolbar';
	this.id = Math.random();
	this.name = name;
	this.bVertical = false;
	this.title = title;
	this.actTInd = 0;//

	var obj = this;
	var tableToolbar = pMainObj.pDocument.createElement("TABLE");

	tableToolbar.unselectable = "on";

	tableToolbar.pObj = this;
	tableToolbar.ondragstart = function (e){return false;};
	tableToolbar.cellSpacing = 0;
	tableToolbar.cellPadding = 0;
	tableToolbar.style.width = (dx != null ? dx : "0%");
	tableToolbar.style.height = (dy != null ? dy : "20px");

	var rowTitle = tableToolbar.insertRow(0);
	var cellTitle = rowTitle.insertCell(0);
	cellTitle.noWrap = "nowrap";
	cellTitle.className = "bxedtoolbartitle";
	cellTitle.unselectable = "on";
	cellTitle.style.cursor = "move";
	cellTitle.innerHTML = '<table cellpadding=0 cellspacing=0 width="100%" class="bxedtoolbartitletext"><tr><td width="99%" nowrap style="padding: 0px 1px 1px 8px;">'+title+'</td><td width="0%">&nbsp;</td><td id="title_x_'+this.id+'" width="1%" style="padding: 0px 3px 0px 3px; cursor: default;"><div class= "iconkit_c" style="width: 6px; height: 6px; background-position: -340px -100px;"></div></td></table>';
	cellTitle.onmousedown = function(e){obj._MouseDown(e); return false;};
	this.pTitleRow = rowTitle;

	var row2 = tableToolbar.insertRow(1);
	var cellrow2 = row2.insertCell(0);
	cellrow2.className = "bxedtoolbar";
	cellrow2.unselectable = "on";
	var tableIcons = pMainObj.CreateElement("TABLE");

	tableIcons.pObj = this;
	tableIcons.cellSpacing = 0;
	tableIcons.cellPadding = 0;
	tableIcons.className = "bxedtoolbaricons";
	tableIcons.style.width = "100%";
	tableIcons.style.height = (dy != null ? dy : "22px");
	tableIcons.unselectable = "on";
	var rowIcons = tableIcons.insertRow(0);
	rowIcons.style.backgroundImage = "url(" + image_path + "/toolbarbg.gif)";

	var cellIcons = rowIcons.insertCell(0);

	cellIcons.style.width = "0%";
	cellIcons.style.cursor = "move";
	cellIcons.appendChild(pMainObj.CreateElement("DIV", {title: title, className: "iconkit_c"}, {backgroundPosition: "-317px -96px", width: "12px", height: "25px"}));

	cellIcons.unselectable = "on";
	cellIcons.onmousedown = function(e){obj._MouseDown(e);  return false;};
	cellIcons = rowIcons.insertCell(-1);
	cellIcons.unselectable = "on";
	cellIcons.style.width = "100%";
	cellIcons.style.backgroundImage = "url(" + image_path + "/toolbarbg.gif)";
	cellIcons.innerHTML = ' ';
	cellIcons = rowIcons.insertCell(-1);
	cellIcons.unselectable = "on";
	cellIcons.style.width = "0%";
	//Right part of toolbar
	cellIcons.appendChild(pMainObj.CreateElement("DIV", {title: title, className: "iconkit_c"}, {backgroundPosition: "-334px -96px", width: "5px", height: "25px"}));
	cellIcons.onmousedown = function(e){obj._MouseDown(e); return false;};

	this.pIconsTable = cellrow2.appendChild(tableIcons);
	this.pWnd = this.pMainObj.pWnd.appendChild(tableToolbar);

	var x_cell = pMainObj.pDocument.getElementById('title_x_'+this.id);
	x_cell.onmousedown = function(e){obj.Close(e)};
	x_cell = null;

	row2 = null;
	cellrow2 = null;
	rowTitle = null;
	cellTitle = null;
	cellIcons = null;
	rowIcons = null;
	tableIcons = null;
	tableToolbar = null;

	// Add button to toolbar
	BXToolbar.prototype.AddButton = function(pButton, num)
	{
		var rowIcons = this.pIconsTable.rows[0];
		var but_count = rowIcons.cells.length - 3;
		if(!num || num>but_count)
			num = but_count;

		var cellIcon = rowIcons.insertCell(num + 1);
		cellIcon.unselectable = "on";
		cellIcon.style.backgroundImage = "url(" + image_path + "/toolbarbg.gif)";
		cellIcon.style.width = "0%";
		cellIcon.appendChild(pButton.pWnd);
		cellIcon.pObj = pButton;

		cellIcon = null;
		rowIcons = null;
	};

	BXToolbar.prototype.SetDirection = function(bVertical)
	{
		if(this.bVertical == bVertical)
			return;

		var obj = this;
		this.bVertical = bVertical;
		var newr, i, buttons, ar = Array();
		if(bVertical)
		{
			buttons = this.pIconsTable.rows[0].cells;
			i=0;
			while(buttons.length > 3)
				ar[i++] = this.pIconsTable.rows[0].removeChild(buttons[1]);

				this.pIconsTable.deleteRow(0);
			var ct = this.pIconsTable.insertRow(0).insertCell(0);
			ct.appendChild(pMainObj.CreateElement("DIV", {title: title, className: "iconkit_c"}, {backgroundPosition: "-291px -100px", width: "25px", height: "12px"}));
			ct.style.width = "0%";

			ct.onmousedown = function(e){obj._MouseDown(e);  return false;};
			ct.style.height = "0%";
			ct.style.cursor = "move";
			for(i = 0, l = ar.length; i < l; i++)
			{
				var ra = this.pIconsTable.insertRow(i+1);
				ct = ra.appendChild(ar[i]);
				ct.style.backgroundImage = "url(" + image_path + "/toolbarbg_vert.gif)";

				if(ar[i].pObj.OnToolbarChangeDirection)
					ar[i].pObj.OnToolbarChangeDirection(bVertical);
			}
			ct = this.pIconsTable.insertRow(-1).insertCell(0).appendChild(pMainObj.CreateElement("IMG", {src: one_gif_src, title: title, className: "iconkit_c"}, {backgroundPosition: "-291px -113px", width: "25px", height: "5px"}));
			ct = null;
			ra = null;
		}
		else
		{
			buttons = this.pIconsTable.rows;
			for(i=1; i<buttons.length-1; i++)
				ar[i-1] = buttons[i].removeChild(buttons[i].cells[0]);

			while(this.pIconsTable.rows.length>0)
				this.pIconsTable.deleteRow(0);

			var r = this.pIconsTable.insertRow(0)
			var ct2 = r.insertCell(0);
			ct2.appendChild(pMainObj.CreateElement("DIV", {title: title, className: "iconkit_c"}, {backgroundPosition: "-317px -96px", width: "12px", height: "25px"}));
			ct2.style.width = "0%";
			ct2.style.height = "0%";
			ct2.style.cursor = "move";
			ct2.onmousedown = function(e){obj.MouseDown(e);  return false;};
			for(i=0; i<ar.length; i++)
			{
				ct2 = r.appendChild(ar[i]);
				ct2.style.width = "0%";
				ct2.style.backgroundImage = "url(" + image_path + "/toolbarbg.gif)";

				if(ct2.pObj.OnToolbarChangeDirection)
					ct2.pObj.OnToolbarChangeDirection(bVertical);
			}
			var ln = r.cells.length;
			ct2 = r.insertCell(ln)
			ct2.innerHTML = ' ';
			ct2.style.width = "100%";
			r.insertCell(-1).appendChild(pMainObj.CreateElement("DIV", {title: title, className: "iconkit_c"}, {backgroundPosition: "-334px -96px", width: "5px", height: "25px"}));

			buttons = null; r = null; ct2 = null;
		}
	};
}


BXToolbar.prototype._MouseDown = function (e)
{
	e = getRealMousePos(e, this.pMainObj);
	var position;
	position = GetRealPos(this.pWnd);

	this.pMainObj.bDragging = true;
	this.bDragging = true;

	this.pMainObj.iLeftDragOffset = e.realX - position["left"];
	this.pMainObj.iTopDragOffset = e.realY - position["top"];

	pBXEventDispatcher.SetCursor("move");
	this.pWnd.oldBorder = this.pWnd.style.border;
	this.pWnd.style.zIndex = "1000";
	var _this = this;

	var __BXToolbarMouseMoveCommon = function(e)
	{
		if(_this.pMainObj.bDragging && _this.bDragging)
		{
			// check: if hit the toolbarset
			var bDocked = false;
			var actToolbarSet = false;
			var arToolbarSet = _this.pMainObj.GetToolbarSet();
			var arPos;
			for(var i = 0, tl = arToolbarSet.length; i < tl; i++)
			{
				//var arPos = arToolbarSet[i].HitTest(e.realX, e.realY, i)
				if(arPos = arToolbarSet[i].HitTest(e.realX, e.realY, i))
				{
					bDocked = true;
					actToolbarSet = arToolbarSet[i];
					_this.actTInd = i;
					break;
				}
			}

			if(_this.bDocked && !bDocked) // toolbar go out from toolbarset
			{
				_this.UnDock();
				_this.pWnd.style.left = e.realX - _this.pMainObj.iLeftDragOffset;
				_this.pWnd.style.top = e.realY - _this.pMainObj.iTopDragOffset;
			}
			else if(!_this.bDocked && bDocked && actToolbarSet) // toolbar in toolbarset
			{
				if(_this.pToolbarSet)
					_this.pToolbarSet.DelToolbar(_this);
				actToolbarSet.AddToolbar(_this, arPos['row'], arPos['col'], arPos['addrow']);
			}
			else if(!_this.bDocked && !bDocked)
			{
				_this.pWnd.style.left = e.realX - _this.pMainObj.iLeftDragOffset;
				_this.pWnd.style.top = e.realY - _this.pMainObj.iTopDragOffset;
			}
			else if(arPos["addrow"] || _this.row!=arPos['row'] || _this.col!=arPos['col'])
			{
				if(_this.pToolbarSet)
					_this.pToolbarSet.DelToolbar(_this);
				actToolbarSet.AddToolbar(_this, arPos['row'], arPos['col'], arPos['addrow']);
			}
			_this.bDocked = bDocked;
		}
	};

	var __BXToolbarMouseMove = function(e)
	{
		e = getRealMousePos(e, _this.pMainObj);
		__BXToolbarMouseMoveCommon(e);
	};

	var __BXToolbarMouseMoveF = function(e)
	{
		e = getRealMousePos(e, _this.pMainObj, true);
		__BXToolbarMouseMoveCommon(e);
	};

	var __BXToolbarMouseUp = function(e)
	{
		// Clean event handlers
		removeAdvEvent(document, "mousemove", __BXToolbarMouseMove, true);
		removeAdvEvent(document, "mouseup", __BXToolbarMouseUp, true);
		removeAdvEvent(_this.pMainObj.pEditorDocument, "mousemove", __BXToolbarMouseMoveF, true);
		removeAdvEvent(_this.pMainObj.pEditorDocument, "mouseup", __BXToolbarMouseUp, true);
		if (BX.browser.IsIE())
		{
			removeAdvEvent(_this.pMainObj.pEditorDocument, "selectstart", preventselect, true);
			removeAdvEvent(document, "selectstart", preventselect, true);
		}

		if(_this.pMainObj.bDragging && _this.bDragging)
		{
			_this.pMainObj.bDragging = false;
			_this.bDragging = false;
			_this.pWnd.style.zIndex = "200";
			_this.pWnd.style.border = _this.pWnd.oldBorder;
			pBXEventDispatcher.SetCursor("auto");
			//if (_this.bDocked)
			//	_this.reCalcPositions();

			_this.SaveConfiguration();
		}
	};

	var preventselect = function(e){return false;};

	addAdvEvent(document, "mousemove", __BXToolbarMouseMove, true);
	addAdvEvent(this.pMainObj.pEditorDocument, "mousemove", __BXToolbarMouseMoveF, true);
	addAdvEvent(document, "mouseup", __BXToolbarMouseUp, true);
	addAdvEvent(this.pMainObj.pEditorDocument, "mouseup", __BXToolbarMouseUp, true);

	if (BX.browser.IsIE())
	{
		addAdvEvent(this.pMainObj.pEditorDocument, "selectstart", preventselect, true);
		addAdvEvent(document, "selectstart", preventselect, true);
	}

	if (e.stopPropagandation)
		e.stopPropagandation();
	else
		e.cancelBubble = true;
};



BXToolbar.prototype.MouseDown = function (e)
{
	return;
	if(window.event)
		e = window.event;

	if(e.pageX || e.pageY)
	{
		e.realX = e.pageX;
		e.realY = e.pageY;
	}
	else if(e.clientX || e.clientY)
	{
		e.realX = e.clientX + document.body.scrollLeft;
		e.realY = e.clientY + document.body.scrollTop;
	}

	var position = GetRealPos(this.pWnd);
	this.pMainObj.bDragging = true;
	this.bDragging = true;

	this.pMainObj.iLeftDragOffset = e.realX - position["left"];
	this.pMainObj.iTopDragOffset = e.realY - position["top"];

	pBXEventDispatcher.SetCursor("move");
	this.pWnd.oldBorder = this.pWnd.style.border;
	this.pWnd.style.zIndex = "1000";
};

BXToolbar.prototype.MouseUp = function (e)
{
	if(this.pMainObj.bDragging && this.bDragging)
	{
		this.pMainObj.bDragging = false;
		this.bDragging = false;
		this.pWnd.style.zIndex = "200";
		this.pWnd.style.border = this.pWnd.oldBorder;
		pBXEventDispatcher.SetCursor("auto");
		//if (this.bDocked)
		//	this.reCalcPositions();

		this.SaveConfiguration();
	}
};


// Undock toolbar from toolbarset:
//      .... position = absolute
//      show toolbar title
BXToolbar.prototype.UnDock = function ()
{
	if(this.pToolbarSet)
		this.pToolbarSet.DelToolbar(this);
	this.pWnd.style.zIndex = "1000";
	this.pWnd.style.position = "absolute";
	this.pMainObj.pWnd.appendChild(this.pWnd);
	var rowIcons = this.pIconsTable.rows[0];
	this.pTitleRow.style.display = GetDisplStr(1);
	this.SetDirection(false);
	this.bDocked = false;
};

BXToolbar.prototype.Close = function ()
{
	if(this.pToolbarSet)
		this.pToolbarSet.DelToolbar(this);
	this.pWnd.style.display = GetDisplStr(0);

	this.SaveConfiguration();
};

BXToolbar.prototype.SaveConfiguration = function ()
{
	if (!this.pMainObj.RS_toolbars)
		return;

	var arTlbrSet_old = copyObj(SETTINGS[this.pMainObj.name].arToolbarSettings);
	if (this.bDocked)
		this.reCalcPositions();

	var arTlbrSet = SETTINGS[this.pMainObj.name].arToolbarSettings;
	arTlbrSet[this.name].show = !(this.pWnd.style.display == "none" && this.name != 'standart');
	if (!this.bDocked)
	{
		arTlbrSet[this.name].docked = false;
		arTlbrSet[this.name].position = {x:this.pWnd.style.left,y:this.pWnd.style.top};
	}

	if (compareObj(arTlbrSet_old, arTlbrSet))
		return;

	var postData = oBXEditorUtils.ConvertArray2Post(arTlbrSet, 'tlbrset');
	BXSetConfiguration(this.pMainObj, "toolbars", "POST", postData);
};

BXToolbar.prototype.reCalcPositions = function ()
{
	var arTlbrSet = SETTINGS[this.pMainObj.name].arToolbarSettings;
	var arToolbarSet = this.pMainObj.GetToolbarSet();
	var __arToolBarPos = arToolbarSet[this.actTInd].returnToolbarsPositions();
	arTlbrSet[this.name].docked = true;
	arTlbrSet[this.name].position = [];
	for (var k in __arToolBarPos)
		if (arTlbrSet[k] && arTlbrSet[k].docked)
			arTlbrSet[k].position = [this.actTInd,__arToolBarPos[k][0],__arToolBarPos[k][1]];
};


BXToolbar.prototype.SetPosition = function (x,y)
{
	if (this.bDocked)
		this.UnDock();
	this.pWnd.style.top = y+"px";
	this.pWnd.style.left = x+"px";
};

// Mouse moving:
//	if it's dragging than check nearest toolbarset with help of BXToolToolbarSet.HitTest...
//	And dock or undock toolbar....
BXToolbar.prototype.MouseMove = function (e)
{
	if(this.pMainObj.bDragging && this.bDragging)
	{
		// check: if hit the toolbarset
		var bDocked = false;
		var actToolbarSet = false;
		var arToolbarSet = this.pMainObj.GetToolbarSet();
		for(var i=0; i<arToolbarSet.length; i++)
		{
			var arPos = arToolbarSet[i].HitTest(e.realX, e.realY)
			if(arPos)
			{
				bDocked = true;
				actToolbarSet = arToolbarSet[i];
				this.actTInd = i;
				break;
			}
		}

		if(this.bDocked && !bDocked) // toolbar go out from toolbarset
		{
			this.UnDock();
			this.pWnd.style.left = e.realX - this.pMainObj.iLeftDragOffset;
			this.pWnd.style.top = e.realY - this.pMainObj.iTopDragOffset;
		}
		else if(!this.bDocked && bDocked && actToolbarSet) // toolbar in toolbarset
		{
			if(this.pToolbarSet)
				this.pToolbarSet.DelToolbar(this);
			actToolbarSet.AddToolbar(this, arPos['row'], arPos['col'], arPos['addrow']);
		}
		else if(!this.bDocked && !bDocked)
		{
			this.pWnd.style.left = e.realX - this.pMainObj.iLeftDragOffset;
			this.pWnd.style.top = e.realY - this.pMainObj.iTopDragOffset;
		}
		else if(arPos["addrow"] || this.row!=arPos['row'] || this.col!=arPos['col'])
		{
			if(this.pToolbarSet)
				this.pToolbarSet.DelToolbar(this);
			actToolbarSet.AddToolbar(this, arPos['row'], arPos['col'], arPos['addrow']);
		}
		this.bDocked = bDocked;
	}
};


function BXRefreshToolbars(pMainObj)
{
	var arTlbrSet = SETTINGS[pMainObj.name].arToolbarSettings;
	var sToolBarId;
	for (var k in ar_BXToolbarS)
	{
		var BXToolbar = ar_BXToolbarS[k];
		sToolBarId = BXToolbar.name;

		if (BXToolbar.pMainObj.name!=pMainObj.name)
			continue;

		if (!arTlbrSet || !arTlbrSet[sToolBarId])
			continue;

		if (arTlbrSet[sToolBarId].show && BXToolbar.pWnd.style.display == 'none')
		{
			if (arTlbrSet[sToolBarId].docked)
					pMainObj.arToolbarSet[arTlbrSet[sToolBarId].position[0]].AddToolbar(BXToolbar,arTlbrSet[sToolBarId].position[1],arTlbrSet[sToolBarId].position[2]);

			BXToolbar.pWnd.style.display = GetDisplStr(1);
		}
		else if (!arTlbrSet[sToolBarId].show && BXToolbar.pWnd.style.display != 'none')
		{
			if(BXToolbar.pToolbarSet)
				BXToolbar.pToolbarSet.DelToolbar(BXToolbar);
			BXToolbar.pWnd.style.display = GetDisplStr(0);
		}
	}
}
