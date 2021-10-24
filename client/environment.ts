const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000/api',
  },
  prod: {
    apiUrl: 'https://fast-wildwood-57771.herokuapp.com/api',
  },
}

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev
  } else {
    return ENV.prod
  }
}

export default getEnvVars
