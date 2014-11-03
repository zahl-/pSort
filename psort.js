(function ($) {
	var pSortCount = 0;

	$.fn.pSort = function(providedOpts) {
		pSortCount++;
		var allColumns = [ ];
		var defaultSorts = [ ];
		var count = 0;
		var rows = [ ];
		var $table = $(this);

		$table.find("thead th").each(function(){
			allColumns.push(count);
			defaultSorts.push(undefined);
			count++;
		});
		var defaultOptions = {
			columns: allColumns,
			sorts: defaultSorts,
			trigger: "click"
		}
		var options = $.extend(defaultOptions, providedOpts);

		count = 0;
		$table.find("tbody tr").each(function(index){
			var $row = $(this)[0]
			count++;
			rows[index] = [ ];
			$.each(options.columns, function(ind, value){
				rows[index].push($($row.cells[value]).html());
			});
		});
		
		var headerRow = $table.find("thead tr")[0];

		$.each(options.columns, function(index, value) {
			headerRow.cells[value].asc = false;
			$(headerRow.cells[value]).bind(options.trigger, function(){
				headerRow.cells[value].asc = !headerRow.cells[value].asc;
				if(options.sorts[index] == undefined) {
					rows.sort(function(a, b){
						if(a[index] > b[index]) return 1;
						if(b[index] > a[index]) return -1;
						return 0;
					});
				} else {
					rows.sort(options.sorts[index]);
				}
				if(!headerRow.cells[value].asc) rows.reverse();
				$table.find("tbody tr").each(function(index){
					var $tr = $(this);
					$.each(options.columns, function(ind, val){
						$($tr.find("td")[val]).html(rows[index][ind])
					}); 				
				});
			});
		});		
		return $(this);
	};
})(jQuery);
	
