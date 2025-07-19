module.exports =  {
  apps : [{
    name : "app1", 
    script : "./index.js",
    autorestart: true,
    watch: false,
    env: {
        NODE_ENV: 'production'
      }
  }]
}
