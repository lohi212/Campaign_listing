displayjson();
 var pager = new Pager('dataTbl', 1);
pager.init();
pager.showPageNav('pager', 'pageNavPosition');
pager.showPage(1);
 /*function displayjson()
 {
	
	 let url="http://localhost:1234/data.json";
	 
	fetch(url)
	.then(response => response.json())
	.then(data => {
		var tablecontents = "";
		
		for (var i = 0; i < 5; i ++)
			{
			console.log(data[i].name);
			tablecontents += " <tr> <td><input type=checkbox name='delBox'></td>";
			tablecontents += "<td>" + data[i].name + "</td>";
			tablecontents += "<td>" + data[i].company + "</td>";
			tablecontents += "<td>" + data[i].type + "</td>";
			tablecontents += "</tr>";
			}
			console.log(tablecontents);
		//tablecontents += "</table>";
     document.getElementById("tablespace").innerHTML = tablecontents;
		   
		
	});  
 }*/
 
 function displayjson()
{
	var arrHead = new Array();
    arrHead = ['ID', 'Campaign Name', 'Type', 'Company'];

    //declaring variable with create method
    var dataTbl=document.createElement('table');
    var row=document.createElement('tr');
    
	row = dataTbl.insertRow(-1);
	for (var h = 0; h < arrHead.length; h++) 
	{
        var head = document.createElement('th'); // the header object.
        head.innerHTML = arrHead[h];
        row.appendChild(head);
		dataTbl.appendChild(row);
		dataTbl.setAttribute("border","1");
		tbl.appendChild(dataTbl);
    }
		
	let url="http://localhost:1234/data.json";
	 
	fetch(url)
	.then(response => response.json())
	.then(data => {
		var tablecontents = "";
		
		var t=document.getElementById('dataTbl');
		
		for (var i = 0; data[i]!==null; i ++)
			{
				row = dataTbl.insertRow(i-1);
				
				var j=0;
				for(x in data[i])
				{ 
					var col=document.createElement('td');col = row.insertCell(j-1);j++;
					col.innerHTML = data[i][x];row.appendChild(col);
					
					console.log(data[i][x]);
				}
				
			
				t.appendChild(row);
				t.setAttribute("border","1");
				tbl.appendChild(t);
				
			}
					
   
	});  
   
   

}

 function Pager(tableName, itemsPerPage) {
	this.tableName = tableName;
	this.itemsPerPage = itemsPerPage;
	this.currentPage = 1;
	this.pages = 0;
	this.inited = false;
	this.showRecords = function(from, to) {

	var rows = document.getElementById(tableName).rows;
	for (var i = 1; i < rows.length; i++) {
		if (i < from || i > to)
			rows[i].style.display = 'none';
		else
			rows[i].style.display = '';
	}
	}

	this.showPage = function(pageNumber) {
	if (! this.inited) {
	alert("not inited");
	return;
	}

	var oldPageAnchor = document.getElementById('pg'+this.currentPage);
	oldPageAnchor.className = 'pg-normal';
	this.currentPage = pageNumber;
	var newPageAnchor = document.getElementById('pg'+this.currentPage);
	newPageAnchor.className = 'pg-selected';
	var from = (pageNumber - 1) * itemsPerPage + 1;
	var to = from + itemsPerPage - 1;
	this.showRecords(from, to);
	}

	this.prev = function() {
	if (this.currentPage > 1)
	this.showPage(this.currentPage - 1);
	}

	this.next = function() {
	if (this.currentPage < this.pages) {
	this.showPage(this.currentPage + 1);
	}

	}

	this.init = function() {
	var rows = document.getElementById(tableName).rows;
	var records = (rows.length - 1);
	this.pages = Math.ceil(records / itemsPerPage);
	this.inited = true;
	}

	this.showPageNav = function(pagerName, positionId) {
	if (! this.inited) {
	alert("not inited");
	return;

	}

	var element = document.getElementById(positionId);
	var pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal style="margin:5px;"> « Prev </span> ';

for (var page = 1; page <= this.pages; page++)

pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span> ';

pagerHtml += '<span onclick="'+pagerName+'.next();" class="pg-normal"> Next »</span>';
	element.innerHTML = pagerHtml;

	
	}

}
 
function searchFunction(){
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTbl");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}
function deleteRows(){

	isTable = document.getElementById('dataTbl');
	nBoxes = document.getElementsByName('delBox');
	for (i=nBoxes.length-1; i>=0; i--)
		{if (nBoxes[i].checked == true){isTable.deleteRow(i+1)}}
}