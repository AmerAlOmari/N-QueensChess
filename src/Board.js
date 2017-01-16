// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      }else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // -------------------------------------  -------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      var arrayTarget = this.rows()[rowIndex];
      var count = 0;

      for (var i = 0; i < arrayTarget.length; i++){
        if (arrayTarget[ i ] === 1){
          count++;
        }
      }
      if (count > 1) {
        return true;
      } 
      return false;     
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      var arrayOfArrays = this.rows();

      for (var i = 0; i < arrayOfArrays.length; i++){
        var count = 0;
        for (var k = 0; k < arrayOfArrays[i].length; k++){
         if (arrayOfArrays[ i ][ k ] === 1){
          count++;
        }
      }
      if (count > 1) {
        return true;
      }
    } 
    return false;     
  },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var arrayOfArrays = this.rows();
      var count = 0;

      for (var i = 0; i < arrayOfArrays.length; i++){
        if(arrayOfArrays[ i ][ colIndex ] === 1){
          count++;
        }
      }
      if (count > 1) {
        return true;
      }
      else return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var arrayOfArrays = this.rows();

      //use k as an index number here for each array, this is our column number
      for(var k = 0; k < arrayOfArrays[ 0 ].length; k++){
        var count = 0;

        // looping through all the arrays looking for elements with the same
        // index number k

        for (var i = 0; i < arrayOfArrays.length; i++){

          // if a chess piece exists on the matching row-col, then count up

          if(arrayOfArrays[ i ][ k ] === 1){
            count++;
          }
        }
        // return a conflict exists only if there are more than 1 pieces in one of
        // the columns
        if (count > 1) {
          return true;
        }
      } 
      // return no conflict exists if no columns have more than 1 piece
      return false;     
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // time complexity Big O(n)
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var count = 0, input = majorDiagonalColumnIndexAtFirstRow, size = this.get('n'), i, j;
      if ( input > -1 ){
        i = 0; 
        j = input;
      }
      else if ( input < 0){
        j = 0; 
        i = Math.abs(input); 
      }

      for (; i < size && j < size; i++, j++) {
        if (this.rows()[ i ][ j ] === 1){
          count ++;
        }
      }
      if (count > 1){
        return true;
      }
      else {
        return false;
      }
    },


    // test if any major diagonals on this board contain conflicts
    // time complexity : Big O (n^2)
    hasAnyMajorDiagonalConflicts: function() {
     var size = this.get('n');
     for (var i = 0; i < size; i++) {
       for (var j = 0; j < size; j++) {
         if (this.hasMajorDiagonalConflictAt ( this._getFirstRowColumnIndexForMajorDiagonalOn ( i , j))){
          return true;
        }
      }
    }
    return false
  },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var count = 0, input = minorDiagonalColumnIndexAtFirstRow, size = this.get('n'), i, j;
      if ( input < size){
        i = 0;
        j = input;
      }
      else if (input >= size){
        i = input - (size - 1);
        j = size - 1;
      }
      for (; i < size && j < size; i++, j--) {
        if (this.rows()[ i ][ j ] === 1){
          count ++;
        }
      }
      if (count > 1){
        return true;
      }
      else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
     var size = this.get('n');
     for (var i = 0; i < size; i++) {
       for (var j = 0; j < size; j++) {
         if (this.hasMinorDiagonalConflictAt ( this._getFirstRowColumnIndexForMinorDiagonalOn ( i , j))){
          return true;
        }
      }
    }
    return false
  },
    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
