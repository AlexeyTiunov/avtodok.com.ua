/*
 *  Document   : tablesDatatables.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in Tables Datatables page
 */
import {App} from '../app.js';   
export var TablesDatatables = function() {
	
    return {
        init: function() {
            /* Initialize Bootstrap Datatables Integration */
            App.datatables();

            /* Initialize Datatables */
            $('#example-datatable').dataTable({
                "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 1, 5 ] } ],
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 20, 30, -1], [10, 20, 30, "Всі"]]
            });

            /* Add placeholder attribute to the search input */
            $('.dataTables_filter input').attr('placeholder', 'Пошук');
        }
    
        }
}();
//$(function(){ TablesDatatables.init(); });