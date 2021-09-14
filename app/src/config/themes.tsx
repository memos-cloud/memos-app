export type themes =
  | 'orange'
  | 'yellow'
  | 'purble'
  | 'pink'
  | 'pink2'
  | 'coral'
  | 'green'
  | 'teal'
  | 'beige'
  | 'peach'
  | 'maroon'
  | 'darkTeal'

// export const themes = [
//   { orange: '#FF4C29' },
//   { purble: '#7B29FF' },
//   { pink: '#FF29F6' },
//   { pink2: '#FAAFFF' },
//   { coral: '#FF7B7B' },
//   { green: '#16C79A' },
//   { teal: '#00C1D4' },
//   { yellow: '#FFB344' },
//   { beige: '#FFC288' },
//   { peach: '#FA9579' },
//   { maroon: '#970747' },
// ]

export const themes = [
  {
    type: 'Electronic',
    colors: [{ orange: '#FF4C29' }, { purble: '#7B29FF' }, { pink: '#FF29F6' }],
  },
  {
    type: 'Soft',
    colors: [
      { pink2: '#FAAFFF' },
      { coral: '#FF7B7B' },
      { peach: '#FA9579' },
      { beige: '#FFC288' },
    ],
  },
  {
    type: 'Artists',
    colors: [{ green: '#16C79A' }, { teal: '#00C1D4' }, { yellow: '#FFB344' }],
  },
  {
    type: 'Classic',
    colors: [{ maroon: '#970747' }, { darkTeal: '#345B63' }],
  },
]
