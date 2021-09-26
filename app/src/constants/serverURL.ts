export const serverURL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.1.5.sslip.io:3000'
    : 'http://192.168.1.5.sslip.io:3000'
