// Spec stands for the whole specification.

function SpecOfGrade(iisNum, modelName, symptom, grades, symbols){

  this.iisNum = iisNum
  this.modelName = modelName
  this.symptom = symptom
  this.grades = KeyValueSwap(grades)
  this.nodes = symbols.reduce((acc, cur) => {
    acc[cur['symbol']] = new Node(
      cur['symbolName'], 
      cur['symbol'], 
      cur['dir'], 
      cur['data'], 
      grades
    )
  }, {})
  
  function KeyValueSwap(obj) {
    const ret = {};
    Object.keys(obj).forEach(key => {
      ret[obj[key]] = key;
    });
    return ret;
  }

  this.getSpecOfLev = function(lev){
    let spec = []
    Object.values(this.Nodes).map(ele => {
      const str = ele.getSpecLevel(this.grade[g])
      spec = [...spec, str]
    })
    return spec.join('\n')
  }

  this.getSpec = function(){
    let spec = []
    Object.values(this.grade).map(lev => {
      let specLev = []
      Object.values(this.Nodes).map(ele => {
        const str = ele.getSpecLevel(this.grade[g])
        specLev = [...specLev, str]
      })
      spec = [...spec, specLev.join(' , ')]
    })
    return spec.join('\n')
  }

  this.onChangeSpec = function(symbol, num, bondary){
    this.Nodes[symbol].onChangeSpec(num, bondary)
  }
}