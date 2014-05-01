var fcss = require('./fcss');

// globally load all the shit, yolo!
var propList = fcss.propList;
Object.keys(propList).forEach(function(prop){
  this[prop] = propList[prop];
});


var fontSize = 20;
var blockWidth = 150;

mySelectors = '#foo,#bar,.baz';

var support_for_ie = true;

function opacity(n){
  var o = [];
  o.push({opacity: n});
  if (support_for_ie){
    o.push({ filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + Math.round(n * 100) + ')' });
  }
  return o;
}

function comment(txt){
  return { comment: txt};
};

var ipadWidth = px(600);
var ipadWidth = '600px';

var keyframesArray = [0,.2,.4,.6,.8,1].map(function(i){
  return rule(i*100+'%', {
    opacity: i
  })
});

var tac = { 'text-align': 'center' };

console.log()

stylesheet([

  rule('button', [
    tac,
    color('red')
  ]),

  rule('.test', [
    tac,
    { font: px(fontSize) + ' Arial, sans-serif' },
    width(blockWidth),
    marginTop(-blockWidth/2),
    marginBottom(4),
    vendorDecl('transform', 'translateZ(0)'),
    borderRadius('3px'),
    boxShadow('1px 3px 5px #fff')
  ]),

  rule('button',
    borderRadius('1px 2px / 3px 4px')
  ),

  [1,2,3,4,5].map(function(row){
    return rule('table tr:nth-child(' + row + ')', [
      { height: px(10 * row) }
    ]);
  }),

  /*
    mySelectors = '#foo,#bar,.baz'
    {mySelectors}
      background: #000
  */
  rule(mySelectors,
    { background: '#000' }
  ),

  /*
    form input[type=button]
    border-radius(5px)
  */
  rule('form input[type=button]', borderRadius(px(5))),

  /*
    support-for-ie ?= true

    opacity(n)
      opacity n
        if support-for-ie
          filter unquote('progid:DXImageTransform.Microsoft.Alpha(Opacity=' + round(n * 100) + ')')

      #logo
        &:hover
          opacity 0.5
  */
  rule('#logo:hover', opacity(0.5)),

  // I'm a comment!
  rule('#logo:hover', [
    { padding: '5px' }, // some awesome padding
    comment('such comment wow'),
    { margin: px(5) }
  ]),

  /*
  @media screen and (min-width: 600px) {
    .widget {
      padding: 20px;
    }
  }
  */
  at('media screen and (min-width: ' + ipadWidth + ')', [
    rule('.widget', {
      display: 'none'
    })
  ]),

  rule('font-face', [
    { 'font-family': 'Geo' },
    {'font-style': 'normal' },
    {'src': url('fonts/geo_sans_light/GensansLight.ttf') }
  ]),

  at('keyframes', [
    rule('.test', {
      'text-align': 'center'
    })
  ]),

  /*
  @keyframes pulse {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0.2;
    }
    40% {
      opacity: 0.4;
    }
    60% {
      opacity: 0.6;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }*/
  at('keyframes pulse',
    keyframesArray
  ),

  at(vendorProp('keyframes pulse'), keyframesArray),

  /*
  #back-to-top {
    fixed: bottom right;
  }
  */

  // rule('#back-to-top', [
  //   fixed(),
  //   bottom(),
  //   right()
  // ]),

  // rule('#back-to-top', [
  //   tac,
  //   relative,
  //   top,
  //   left
  // ]),

  // rule('#back-to-top', [
  //   absolute(),
  //   bottom(5),
  //   right(10)
  // ]),

  /*
  .news__item {
    zoom: 1;
  }
  .news__item:before,
  .news__item:after {
    content: "";
    display: table;
  }
  .news__item:after {
    clear: both;
  }
  */
  // clearfix('.news__item')


]);