module.exports = {
  apps: [{
    name: "app1",
    script: "./index.js"
  },
  {
    name: "S3UploaderWorker",
    script: "./worker/s3Uploader.worker.js"
  },
  {
    name: "abrWorker",
    script: "./worker/abr.worker.js"
  },
  {
    name: "wavWorker",
    script: "./worker/wav.worker.js"
  }

  ]
}
