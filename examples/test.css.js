// globally load all the shit, yolo!
require('../cssjs').inject();


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

// var ipadWidth = px(600);
var ipadWidth = 600;

var tac = { 'text-align': 'center' };

stylesheet([

  rule('colortest', [
    color(797),
    color(red),
    color('#f40'),
    color(rgb(209, 255, 0)),
    color(rgb('209, 255, 40'))
  ]),


  rule('.test', [
    tac,
    font(fontSize, 'Arial, sans-serif'),
    width(blockWidth),
    marginTop(-blockWidth/2),
    marginBottom(4),
    vendorDecl('transform', translateZ()),
    borderRadius(3),
    // boxShadow(1)(3)(5)('#fff') is look ok?
    boxShadow('1px 3px 5px #fff')
  ]),

  rule('button',
    borderRadius('1px 2px / 3px 4px')
  ),

  [1,2,3,4,5].map(function(row){
    return rule('table tr:nth-child(' + row + ')', [
      height(10 * row)
    ]);
  }),

  /*
    mySelectors = '#foo,#bar,.baz'
    {mySelectors}
      background: #000
  */
  rule(mySelectors,
    background('#000')
  ),

  /*
    form input[type=button]
    border-radius(5px)
  */
  rule('form input[type=button]', borderRadius(5)),

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
    padding(5), // some awesome padding
    comment('such comment wow'),
    margin(5)
  ]),


  /*
  @media screen and (min-width: 600px) {
    .widget {
      padding: 20px;
    }
  }
  */

  media('screen and (min-width: ' + px(ipadWidth) + ')', [
    rule('.widget', display(none) )
  ]),
  media('screen and (min-width: ' + px(ipadWidth) + ')', [
    rule('.widget', display(none) )
  ]),

  fontFace([
    fontFamily('Geo'),
    fontStyle(normal),
    src(url('fonts/geo_sans_light/GensansLight.ttf'))
  ]),

  keyframes('test', [
    rule('.test', tac)
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
  keyframes('pulse', [0,.2,.4,.6,.8,1].map(function(i){
    return rule(pct(100 * i), {
      opacity: i
    })
  })),

  /*
  #back-to-top {
    fixed: bottom right;
  }
  */
  rule('#back-to-top', [
    fixed(),
    bottom(),
    right(),
  ]),

  rule('#back-to-top', [
    tac,
    relative(),
    top(),
    left()
  ]),

  rule('#back-to-top', [
    absolute(),
    bottom(5),
    right(10)
  ]),

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
  clearfix('.news__item')


]);
