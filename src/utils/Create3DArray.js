function Create3DArray(length) {
    var arr = new Array(length || 0),
        i = length;
    
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = Create3DArray.apply(this, args);
    }
      
    return arr;
}
export default Create3DArray;
