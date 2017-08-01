var frmtPobj = function (a, b) {
  return { name: makeRGB(a), count: b };
}

var makeRGB = function (name) {
  return ['rgb(', name, ')'].join('');
};

var mapPalette = function (palette) {
  var arr = [];
  for (var prop in palette) { arr.push(frmtPobj(prop, palette[prop])) };
  arr.sort(function (a, b) { return (b.count - a.count) });
  return arr;
};

var fitPalette = function (arr, fitSize) {
  if (arr.length > fitSize) {
    return arr.slice(0, fitSize);
  } else {
    for (var i = arr.length - 1; i < fitSize - 1; i++) { arr.push(frmtPobj('0,0,0', 0)) };
    return arr;
  };
};

onmessage = function (message) {
  console.log(message.data.count);
  var data = message.data.data;
  var paletteSize = message.data.paletteSize;
  var colorCounts = {},
    rgbString = '',
    rgb = [],
    colors = {
      dominant: { name: '', count: 0 },
      palette: []
    };

  var i = 0;
  for (; i < data.length; i += 4) {
    rgb[0] = data[i];
    rgb[1] = data[i + 1];
    rgb[2] = data[i + 2];
    rgbString = rgb[0] + ',' + rgb[1] + ',' + rgb[2];

    // skip undefined data and transparent pixels
    if (rgb.indexOf(undefined) !== -1 || data[i + 3] === 0) {
      continue;
    }

    if (rgbString in colorCounts) {
      colorCounts[rgbString] = colorCounts[rgbString] + 1;
    }
    else {
      colorCounts[rgbString] = 1;
    }

  }

  var palette = fitPalette(mapPalette(colorCounts), paletteSize + 1);
  postMessage(palette);
}