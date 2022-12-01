# Server
### Before launching, change the settings in '.prod.env' to suit your needs
  - be sure to change the passwords to the ones you need
  - if you change the server port, then also change it to 'client'


### Starting:
To run using 'npm', use the commands:

    npm i ci
    npm run start

To run using 'docker', use the command
  - docker run -p 5010:5010 -d YOUR_DOCKER_IMAGE


'mysql' is used as the database

# API:
## REST:
  - '/upload' serves to upload a file
  - '/download/:file' serves for downloading a file

## Graphql:
  - query 'files' serves to get all files
  - mutation 'deleteFile' it is used to get the deletion of a file by name