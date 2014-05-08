#Простенький css-препроцессор на js

##Зачем нужно это говно?
- можно программировать, а не верстать :trollface:
- знакомый синтаксис (просто javascript)
- `require('/whatever-lib')`+npm=heart vs @import+bower=?
- следует из предыдущего: можно по настоящему переиспользовать переменные и миксины
```js
require('../cssjs').inject();
var ipadWidth = require('common-variables').ipadWidth;
var blockWidth = require('common-variables').blockWidth;

stylesheet([
  media('screen and (min-width: ' + px(ipadWidth) + ')', [
    rule('.widget', [
      display(none),
      width(blockWidth),
      marginTop(-blockWidth/2),
      marginBottom(4),
    ])
  ])
  /*
    table tr:nth-child(1) {
      height: 10px
    }
    table tr:nth-child(2) {
      height: 20px
    }
    table tr:nth-child(3) {
      height: 30px
    }
    table tr:nth-child(4) {
      height: 40px
    }
    table tr:nth-child(5) {
      height: 50px
    }
  */
  [1,2,3,4,5].map(function(row){
    return rule('table tr:nth-child(' + row + ')', [
      height(10 * row)
    ]);
  })
])
```
- опечатки не пройдут - `ReferenceError: backgrund is not defined`
- разумные единицы по умолчанию:
```js
  fontWeight(400) -> font-weight: 400
  margin() -> margin: 0
  paddingTop(50) -> padding-top: 50px;
  transitionTimingFunction(1, 4, 5) -> transition-timing-function: 1s, 4s, 5s
```
- можно упороться и писать стили в emmet-стиле:
```js
// globally load all the shit, yolo!
require('../cssjs').inject();

// .slider.css.js -> .slider
var block = require('../cssjs-bem')(__filename).block;

var tac = { 'text-align': 'center' };

stylesheet([
  rule(block, [
    tac,
    dib(),
    mt(46),
    c(999),
    fsz(14),
    lh(25)
  ]),

  rule(block, [
    absolute(),
    t(285),
    l('50%'),
    oh(),
    h(157),
    ml(-326),
    op()
  ]),
])
```
- оптимизированная прогрессивная компиляция:
`node myfile.css.js > myfile.css`
