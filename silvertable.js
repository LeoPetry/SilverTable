(function( $ ) {
 
    $.fn.silvertable = function( keyVal , options ) {

    	//ex keyVal [{"col1row1":"value11","col2row1":"value21"},{"col1row2":"value12","col2row2":"value22"}];    	

        var settings = $.extend({
            thead : '<div class="thead"></div>',
            tbody : '<div class="tbody"></div>',
            row   : '<div class="row"></div>',
            cell  : '<div class="cell"></div>'
        },
            options
        );

        // set helper variables
        var 
            _buffer,
            cols;

        // assign HTML to variables,
        // we are using the contructor pattern
        // so that we can instantiate
        // new rows, cells and headers

        var
            table = this,
            Row   = function(){ return $(settings.row); },
            Cell  = function(){ return $(settings.cell); },
            Thead = function(){ return $(settings.thead); },
            Tbody = function(){ return $(settings.tbody); };

        // store a reference to the things we are adding to the DOM
        // let the update table function have a closure over them

        var thead, 
            tbody;

        _buffer = [];

        // define each table column

        cols = $.map(keyVal,function(row,index){
            return $.map(row, function(value, key){                
                if($.inArray(key,_buffer) !== -1){
                    return key;
                }
                _buffer.push(key);
            });
        });

        _buffer = null;

        // let's break the sorting
        // into alphabetical characters and numeric values

        function _sortAlphas(rows, thisCol, desc){
            rows.sort(function(a,b){
                if (a[thisCol] > b[thisCol]) {
                  return 1;
                }
                if (a[thisCol] < b[thisCol]) {
                  return -1;
                }

                return 0;
            });

            if(desc === true) {
                rows.reverse();
            }

            return rows;
        };

        function _sortNums(rows, thisCol, desc){
            rows.sort(function(a,b){
                return a[thisCol] - b[thisCol];
            });

            if(desc === true) {
                rows.reverse();
            }

            return rows;
        };

        // let's use a controller function
        // to decide which sorting to use

        function sortController(theadCell){
            var thisCol = $(theadCell).data('colName'),
                descending = $(theadCell).data('desc'),
                nums = [], 
                alphas = [],
                result = [];
            $.each(keyVal,function(index,obj){
                if($.isNumeric(obj[thisCol])) {
                    nums.push(obj);
                }else {
                    alphas.push(obj);
                }
            });
            if(nums.length > 0) {
                nums = _sortNums(nums, thisCol, descending);
                result = result.concat(nums);
            }
            if(alphas.length > 0){
                alphas = _sortAlphas(alphas, thisCol, descending);
                result = result.concat(alphas);
            }
            return result;
        };

        // let's write update_table as a function expression
        // so that we can immediately invoke it
        // and then return the function for later usage

        var update_table = function update_table(rows){
            if(thead === undefined){
                thead = make_thead();
                table.append(thead);
            }
            if(tbody !== undefined){
                tbody.remove();
            }
            tbody = make_tbody(rows);
            table.append(tbody);

            return update_table;
        }(keyVal);

        function make_thead(){
            var _thead = new Thead();
            var row = new Row();
            $.each(cols, function(index, colName){                
                var cell = new Cell();
                cell
                .text(colName)
                .on('click',function(evt){
                    update_table(sortController(this));
                    $(this).data('desc', true);
                })
                .data('colName', colName)
                .data('desc', false);
                row.append(cell);
            });
            _thead.append(row);
            return _thead;
        };

        function make_tbody(rows){
            var _tbody = new Tbody();
            $.each(rows, function(index, value){
                var row = new Row();
                $.each(cols, function(colIndex, colValue){
                    var cell = new Cell();
                    cell.text(value[colValue]);
                    row.append(cell);
                });
                _tbody.append(row);
            });
            return _tbody;
        };        
 
        return this;
 
    };
 
}( jQuery ));