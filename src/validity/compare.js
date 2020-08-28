function colorStrToTuple(s, min, max) {
  let parts= s.toString().split('(')
  parts= parts[1].split(')')[0]
  parts= parts.replace(new RegExp(' ', 'g'), '')
  parts= parts.split(',')
  parts= parts.map((p) => {
    try {
      let n= parseInt(p)
      if(n<min) {
        return min
      } else if (n>max) {
        return max
      }
      return n
    } catch(e) {
      return min
    }
  })
  return parts
}

function hslToRgb(h, s, l){
  let r, g, b;

  if(s == 0){
      r = g = b = l; // achromatic
  }else{
      let hue2rgb = function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r, g, b) {
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}

function colorToHex(s) {
  if (typeof s != 'string') {
    console.error(`Valium: Unknown color type ${typeof s} ${s}`)
    return undefined
  }

  if (s.indexOf('#')==0)
    return s
  
  let rgb= undefined
  
  if (s.indexOf('hsl')==0) {
    let [r,g,b]= colorStrToTuple(s, 0, 1)
    rgb= hslToRgb(r, g, b)
  }

  if (s.indexOf('rgb')==0) {
    rgb= colorStrToTuple(s, 0, 255)
  }

  if (rgb!=undefined) {
    return rgbToHex(...rgb)
  }

  console.error(`Valium: Unable to parse color type ${typeof s} ${s}`)
  return undefined  
}


const parseForCompare = (inputType, value) => {

  inputType= inputType.toLowerCase()

  if (inputType==='text' || inputType==='select') {
    return value===undefined 
           ? ''
           : value.toString()
  }

  if (inputType==='number') {
    if (value===undefined || value==='' || isNaN(value)) {
      return undefined
    }
    return parseFloat(value)    
  }

  if (inputType==='checkbox') {
    if (value===true || value === 'true' || value === 1 || value === '1') {
      return true
    }
    return false    
  }

  if (inputType==='color') {
    if (value===undefined || value==='') {
      return undefined
    }
    return colorToHex(value)    
  }

  if (inputType==='date') {
    if (value==='' || value === undefined) {
      return undefined
    }
    let vdate= undefined
    if (value instanceof Date) {
      vdate= value
    }
    if (typeof value === 'string') {
      vdate= new Date(value)
    }
    if (typeof value === 'number') {
      vdate= new Date(value * 1000)
    }    
    try {
      vdate= new Date(value)
    } catch(e) {
      console.error(`Valium: input of type date cannot convert value ${value} to Date`)
      return undefined
    }
    const tdate= `${vdate.getFullYear()}/${vdate.getMonth()+1}/${vdate.getDate()}`
    return tdate    
  }

  if (inputType==='select-multiple') {
    try {
      return value.sort().join(',')
    } catch(e) {}
    return ''    
  }

  return value===undefined 
          ? ''
          : value.toString()
}

export default parseForCompare