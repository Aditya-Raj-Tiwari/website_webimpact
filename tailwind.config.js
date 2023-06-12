module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        webimpactGray: '#DEE9F4',
        menuGrey: '#C3CFD9',
        menuHeaderGrey: '#314F6F',
        bgMenuGridRed: '#FF4D00',
        rankingTextGrey: '#94A2AE'
      },
      width: {
        33: '9rem',
        '13rem': '13rem',
        '18rem': '18rem',
        53: '53px',
        60: '60px',
        88: '88px'
      },
      height: {
        33: '9rem',
        '13rem': '13rem',
        53: '53px',
        60: '60px',
        88: '88px'
      },
      gap: {
        menuitem: '3.3rem'
      }
    },
    plugins: [require('flowbite/plugin')]
  }
}
