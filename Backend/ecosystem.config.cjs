module.exports =  {
  apps : [{
    name : "app1", 
    script : "./index.js",
    autorestart: true,
    watch: false,
    env: {
        NODE_ENV: 'production'
      }
  },
  {
    name: "S3UploaderWorker",
    script: "./worker/s3Uploader.worker.js",
    autorestart: true,
    watch: false,
  },
  {
    name: "abrWorker",
    script: "./worker/abr.worker.js",
    autorestart: true,
    watch: false,
  },
  {
    name: "wavWorker",
    script: "./worker/wav.worker.js",
    autorestart: true,
    watch: false,
  }]
}
