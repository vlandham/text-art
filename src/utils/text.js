
import Complex from 'complex-js';

/*
 * Quick hack to split sentences. most of the hard work came from:
 */
export function sentenceLengths(text) {
  text = text.replace(/['\"\‘\’]/gm, "");
  const tregex = /\n|([^\r\n.!?]+([.!?]+|$))/gim;
  const sentences = text.match(tregex).map((s) => s.trim());
  const data = sentences.map((s) => {
    const d = {};
    d.sentence = s;
    d.length = s.length;

    return d;
    // data = data.filter((d) => d.length > 3);
    // return data
  });

  return data;
}


// real hacky way to copy the R code from original into Javascript.
// original: http://www.r-bloggers.com/sentence-drawing-function-vs-art/
// depends on complex.js library I found:
// https://github.com/patrickroberts/Javascript-Complex-Math-Library
export function findPositions(data, lengthAttribute = "length", turn = -Math.PI / 2.0) {
  const one = Complex(0,1)
  let currentTurn = turn
  let currentPos = Complex(0,0);
  console.log(currentPos)
  let currentX = 0
  let currentY = 0

  data.forEach((d) => {
    d[lengthAttribute] = +(d[lengthAttribute])
    d.facing = (Math.PI / 2.0) + currentTurn
    currentTurn += turn
    let mult = one.mult(Complex(d.facing,0))
    mult = Complex(0,mult.i)
    const imgExp = Complex.exp(mult)
    d.move = Complex(d[lengthAttribute],0).mult(imgExp)
    currentPos = currentPos.add(d.move)
    d.pos = currentPos
    d.x2 = Math.round(d.pos.r)
    d.y2 = Math.round(d.pos.i)
    d.x1 = currentX
    d.y1 = currentY
    currentX = d.x2
    currentY = d.y2

  });

  return data;
}
