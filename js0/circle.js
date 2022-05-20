/*
 * [1]
 * if this happend
 * 0 <  w <= 0.5
 * 1 <  w <= 5
 * 2 <  w <= 3
 * 3 <  w <  4
 * 4 <= w <  5
 * 5 <= w <= 6
 * 6 <  w < inf
 *
 * then turn to this
 * 0   < w <= 0.5
 * 0.5 < w <= 5
 * 5   < w <= 6
 * 6   < w < inf
 *
 * [2]
 * if this happend
 * inf >  d >= 15
 * 15  >  d >   5
 * 10  >= d >=  5
 * 5   >  d >   0
 *
 * then turn to this
 * inf >  d >= 15
 * 15  >  d >   5
 *  5  >= d >  0
 *
 * */

/*

一個 spec 只要知道上一個 spec 是什麼就好。
所以它的資料結構是

*/

var sampleData = [
  {
    layer: 0,
    category: "w",
    relation: ")",
    boundary: 0.5,
  },
  {
    layer: 1,
    category: "w",
    relation: ")",
    boundary: 1,
  },
  {
    layer: 2,
    category: "w",
    relation: ")",
    boundary: 2,
  },
];

function Node(id, parentInterval, bondary, relation) {
  this.id = id
  this.parentInterval = parentInterval
  this.bondary = bondary
  this.relation = relation
  this.child = null
  this.interval = new Interval()

  this.propagate = function(newBondary, newRelation){
    if(!this.isTail()){
      if(this.child.interval.isBehind(bondary)){
        this.child.interval // change bondary or removethis
      }else if(this.child.interval.isBeyond(bondary)){
        this.child.interval // change bondary
      }else if(this.child.interval.isContain(bondary)){
        this.child.interval // change bondary
      }
    }
  }

  this.isTail = function(){
    return this.child.length == 0
  }

}

function Nodes(cate, direction) {
  this.cate = cate
  this.direction = direction; // g or s. Represent the greater the better or the smaller the better.
  this.root = new Interval("[", 0, Number.POSITIVE_INFINITY, ")");
  this.append = function(){
  }

  this.invertedBondary = (this.relation == "]")
                          ?"("
                          :(this.relation == ")")
                          ?"["
                          :(this.relation == "[")
                          ?")"
                          :"]"
  this.isBondaryVaild = function(num){
    if(this.type == 'smaller'){
      return this.bondary <= num
    }else if(this.type == 'larger'){
      return num >= this.bondary 
    }
  }

  this.changeBondary = function(bondary, relation) {
    if(!this.isBondaryVaild(num)){
      throw Error
    }
    this.bondary = bondary;
    this.relation = relation;
    this.interval = new Interval(this.parent.invertedBondary, this.parent.bondary, bondary, relation);
  }
}
// 如果不知道 child 是誰，在更改 interval 的時候就不能對 children 做 union。 02:10 am.