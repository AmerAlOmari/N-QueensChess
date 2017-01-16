    var hasMajorDiagonalConflictAt = function(majorDiagonalColumnIndexAtFirstRow) {
      var array = [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    ];
      var count = 0, input = majorDiagonalColumnIndexAtFirstRow, size = 4, i, j;
      if ( input > -1 ){
        i = 0; 
        j = input;
      }
      else if ( input < 0){
        j = 0; 
        i = input; 
      }
      
      for (; i < size && j < size; i++, j++) {
        if (array[ i ][ j ] === 1){
          count ++;
        }
      }
      if (count > 1){
        return true;
      }
      else {
        return false;
      }
    }


    var hasMinorDiagonalConflictAt = function(minorDiagonalColumnIndexAtFirstRow) {
    var array = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ];
        var count = 0, input = minorDiagonalColumnIndexAtFirstRow, size = 4, i, j;
        if ( input < size){
          i = 0;
          j = input;
        }
        else if (input >= size){
          i = input - (size - 1);
          j = size - 1;
        }
        for (; i < size && j < size; i++, j--) {
          if (array[ i ][ j ] === 1){
            count ++;
          }
      }
      if (count > 1){
        return true;
      }
      else {
        return false;
      }
    }


















    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    //   // console.log(majorDiagonalColumnIndexAtFirstRow)
    //   var count = 0;
    //   var size = this.get('n');
    //   for ( var row = 0, col = majorDiagonalColumnIndexAtFirstRow; row < size && col < size; row++, col++){
    //     if (this.rows()[ row ][ col ] === 1){
    //       count ++;
    //     }
    //     if ( count > 1){
    //       return true;
    //     }
    //   }
    //   return false;
    // },


    // // test if any major diagonals on this board contain conflicts
    // // time complexity : Big O (n^2)
    // hasAnyMajorDiagonalConflicts: function() {
    //   var count = 0;
    //   var size = this.get('n');

    //   for ( var i = 1 - size; i < size; i++){
    //     if (this.hasMajorDiagonalConflictAt( i )){
    //       return true;
    //     }
    //   }
    //  return false;
    // },

    // // Minor Diagonals - go from top-right to bottom-left
    // // --------------------------------------------------------------
    // //
    // // test if a specific minor diagonal on this board contains a conflict
    // hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    //   // console.log(minorDiagonalColumnIndexAtFirstRow)
    //   var count = 0;
    //   var size = this.get('n');
    //   for ( var row = 0, col = minorDiagonalColumnIndexAtFirstRow; row < size && col < size; row++, col--){
    //     if (this.rows()[ row ][ col ] === 1){
    //       count ++;
    //     }
    //   }
    //   if ( count > 1){
    //     return true;
    //   }
    //   else {
    //     return false;
    //   }
    // },

    // // test if any minor diagonals on this board contain conflicts
    // hasAnyMinorDiagonalConflicts: function() {
    //   var count = 0;
    //   var size = this.get('n');

    //   for ( var i = 0; i <= size + 2; i++){
    //     if (i < size){
    //     if (this.hasMinorDiagonalConflictAt( i )){
    //       return true;
    //     }
    //   } 
    //       }

    //     return false;
    // },