/**
 * Visually represents, parses, and solves Sudoku puzzles
 * User: morbious
 * Date: 9/14/12
 * Time: 5:03 PM
 */

function generateTable(tableClass, tdClass, rowOffset, columnOffset){ //whole string i.e. "foo" or "bar"
    //returns a jQuery node object
    var puzzle = $('<table class="' + tableClass + '"></table>');
    for(var j=1; j <= 3; ++j)
    {
        var row=$('<tr class="' + tableClass + '-row-' + (j + rowOffset) + '"></tr>');
        for(var i=1; i <= 3; ++i)
        {
            var td=$('<td class="' + tableClass + '-column-' + (i + columnOffset) + ' ' + tdClass + '"></td>');
            row.append(td);
        }
        puzzle.append(row);
    }
    return puzzle;
}

function Cell(row, column, value){
    this.row = row;
    this.column = column;
}
function Answer(row, column, value){
    Cell.call(row, column, value);
}
Answer.inherits(Cell);

function parseSudoku(){
    var test = new Answer(1,1,5);
    var rows=new Array();
    var raw = $("textarea#input").val().toString();//get data from textarea#input
    var pos=0;

    for(var j=0; j<9; ++j){
        rows[j] = new Array();
        for(var i=0; i<9; ++i){
            var input;
            while(isNaN(input=parseInt(raw.charAt(pos)))){
                ++pos;//advance pos until a number found
                if(pos>raw.length)
                    throw new Error();
            }
            rows[j][i]=input;
            ++pos;//since no increment if an int
        }
    }
    return rows;
}

function setEvents(){
    $("input#parse").click(function(e){
        parseSudoku();
        e.preventDefault();
        e.stopPropagation();
    });
}

$(document).ready(function(){
    var main=generateTable("puzzletab", "group", 0, 0);
    main.find("tr").each(function(row){
        $(this).find("td").each(function(column){
            var sub=generateTable("group", "cell", row*3, column*3);
            $(this).append(sub);
        });
    });
    $("div#puzzlearea").append(main);
    setEvents();
});

