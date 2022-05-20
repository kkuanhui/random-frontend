// var sample2 = [
//   [1, "open"],
//   [2, "open"],
//   [3, "open"],
//   [3, "close"],
// ];

// var sample2 = [
//   [3, "open"], 3 < d < inf
//   [3, "close"], 3 <= d <= 3
//   [2, "open"], 2 < d < 3
//   [1, "open"], 1 < d <= 2
// ];

// var sample2 = [
//   [1, 0],
//   [2, 0],
//   [3, 1],
//   [3, 1],
// ];

// close bondary is superset of open bondary at a point.
// so close is 1 and open is 0.
// close > open

// 1 represents the smaller the better
// 0 represents the bigger the better

function Node(symbolName, symbol, dir, data, grades) {

  this.symbolName = symbolName; // name of symbol
  this.symbol = symbol // symbol of spec: w, ds, l, D
  this.dir = dir; // the bigger the better: 0, the smaller the better: 1
  this.data = data; // raw data
  this.grades = grades // array of grades: ['A', 'C', 'D']
  this.depth = this.grades.length; // how many grades are in this spec

  function fieldSorter(fields) {
    return function (a, b) {
      if(a[0] == 'inheriit'){
        return 0
      }
      return fields
        .map(function (o) {
          var dir = 1;
          if (o[0] === "-") {
            dir = -1;
            o = o.substring(1);
          }
          if (a[o] > b[o]) return dir;
          if (a[o] < b[o]) return -dir;
          return 0;
        })
        .reduce(function firstNonZeroValue(p, n) {
          return p ? p : n;
        }, 0);
    };
  }

  function completement(sign){
    if(sign === '<'){
      return '>=';
    }else if(sign === '<='){
      return '>';
    }else if(sign === '>'){
      return '<=';
    }else{
      return '<'
    }
  }

  function getSign(x){
    if(this.dir){
      if(x == 0){
        return '>'
      }else{
        return '≥'
      }
    }else{
      if(x == 0){
        return '<'
      }else{
        return '≤'
      }
    }
  }

  this.getParenOfLev = function(lev){
    if(this.data[lev][0] == 'inherit'){
      return this.getParent(lev-1);
    }else{
      return this.data[lev-1];
    }
  }

  this.getSpecLev = function(level){
    if(level == 0){
      const start = (this.dir)? '∞ >': '0 ≤'
      const data = this.data
      const end = `${getSign(data[1])} ${data[0]}`
      return `${start} ${end}`
    }else{
      const parent = this.getParentOfLev(level)
      const data = this.data[level];
      if(data[0] == 'inherit'){
        return this.getSpec(level - 1);
      }
      const left = `${parent[0]} ${completement(getSign(parent[1]))}`
      const symbol = this.symbol
      const right = `${getSign(data[1])} ${data[0]}`
      return `${left} ${symbol} ${right}`
    }
  }

  this.getSpec = function(){
    let cLev = 0
    const total = []
    while(cLev < this.depth){
      total = [...total, this.getSpecLev(cLev)]
      cLev++
    }
    return total.join(',\n')
  }

  this.onInsertAtLev = function (lev, arr) {
    // if arr is ['inherit', 'inherit'] it inherits previous spec.
    // arr should be like this: [1, 1] or [3, 0]
    if(arr == ['inherit', 'inherit']){
      this.data[lev] = arr
    }else{
      if (arr in this.data) {
        throw "invalid insert";
      } else if (arr[0] < 0) {
        throw "invalid insert";
      } else {
        this.data[lev] = arr
        if(this.dir === 1) {
          this.data.sort(fieldSorter(["0", "1"]));
        } else {
          this.data.sort(fieldSorter(["-0", "1"]));
        }
      }
    }

  };

}
