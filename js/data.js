
// 主檔
// iis=iis-20221155-v01&symptom=亮點(Full Dot)
var main = [
  {
    'iisNum': 'IIS-20221155-V01',
    'symptom': '亮點(Full Dot)',
    'grade': 'A'
  }
]

// 規格類型
// iis=iis-20221155-v01&symptom=亮點(Full Dot)
var symbos = [
  {
    'symbolName': '寬',
    'symbol': 'W',
    'dirName': '望小',
    'dir': 0,
    'data': [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0]
    ]
  },
  {
    'symbolName': '長',
    'symbol': 'L',
    'dirName': '望小',
    'dir': 0,
    'data': [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0]
    ]
  },
  {
    'symbolName': '數',
    'symbol': 'N',
    'dirName': '望小',
    'dir': 0,
    'data': [
      [3, 0],
      ['inherit', 'inherit'],
      [5, 0],
      ['inherit', 'inherit']
    ]
  },
  {
    'symbolName': '距',
    'symbol': 'DS',
    'dirName': '望大',
    'dir': 1,
    'data': [
      [15, 0],
      ['inherit', 'inherit']
      [10, 0],
      ['inherit', 'inherit']
    ]
  }
]

// 規格數值
// iis=iis-20221155-v01&symptom=亮點(Full Dot)&symbol=W
// A  : 0<= w < 1 
// C1 : 1<= w < 2
// C2 : 2<= w < 3
// D  : 3<= w < 4
// Out: 4<= w < inf
var spec = [
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0]
]
// A  : inf >  d > 15 
// C1 : inf >  d > 15
// C2 :  15 >= d > 10
// D  :  15 >= d > 10  
// Out:  10 >= d >= 0 

var inherit = [
  [15, 0],
  ['inherit', 'inherit']
  [10, 0],
  ['inherit', 'inherit']
]


/*
--------------------------------------------------------
{
  'symbol': 'W',
  'bondary': 1,
  'rule': 0,
},
{
  'symbol': 'W',
  'bondary': 2,
  'rule': 0,
}


*/
