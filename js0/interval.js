
function Interval(lowerBondRelation, lowerBond, upperBond, upperBondRelation){
  this.lr = lowerBondRelation
  this.lb = lowerBond
  this.ub = upperBond
  this.ur = upperBondRelation
  this.uLimit = (upperBondRelation == "]")? upperBond : upperBond - Number.EPSILON
  this.lLimit = (lowerBondRelation == "[")? lowerBond : lowerBond + Number.EPSILON

  this.union = function(interval){
    if(this.isContain(interval.lb) && this.isContain(interval.ub)){
      return [this]
    }else if(this.isContain(interval.lb) && !this.isContain(interval.ub)){
      return [new Interval(this.lr, this.lb, interval.ub, interval.ur)]
    }else if(!this.isContain(interval.lb) && this.isContain(interval.ub)){
      return [new Interval(interval.lr, interval.lb, this.ub, this.ur)]
    }else if(this.uLimit < interval.lLimit){
      return [this, interval]
    }else if(this.lLimit > interval.uLimit){
      return [interval, this]
    }else{
      return interval.union(this)
    }
  }

  // not well designed method
  this.extendNext = function(interval){
    if(this.isContain(interval.lb) && this.isContain(interval.ub)){
      return [this]
    }else if(this.isContain(interval.lb) && !this.isContain(interval.ub)){
      return [this, new Interval(this.inverted, this.ub, interval.ub, interval.ur)]
    }else{
      return [this, interval]
    }
  }

  this.isBehind = function(num){
    return this.uLimit < num
  }

  this.isContain = function(num){
    return (this.lLimit > num && num < this.uLimit)
  }

  this.isBeyond = function(num){
    return this.lLimit > num
  }


  this.toString = function(){
    return `${this.lr}${this.lb},${this.ub}${this.ur}`
  }

}


