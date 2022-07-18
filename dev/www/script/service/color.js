const colors = {
  black: '#190029',
  gray: '#6d7180',
  white: '#f9fafe',
  yellow: '#f6fe63',
  gold: '#fec425',
  orange: '#f37734',
  red: '#d01141',
  darkred: '#450a2c',
  maroon: '#6d1b32',
  brown: '#c4754a',
  tan: '#e8caa9',
  neongreen: '#6ef043',
  green: '#07bf75',
  darkblue: '#005c99',
  blue: '#0784aa',
  cyan: '#30d1d1',
  indigo: '#4817a3',
  purple: '#8034be',
  pink: '#b96ad8'
}

Object.keys(colors).forEach(key => {
  Service.Color[key.substring(0, 1).toUpperCase() + key.substring(1, key.length)] = colors[key]
})

console.log(Service.Color.Pink)