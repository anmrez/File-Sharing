# Client
### If you want to change the server address/port, then this is done in:
- open: client/src/environments/environment.prod.ts
- edit: 'ipServer'

### If you want to change the client port (default is 5011):
- open: client/package.json
- edit: 'script/start'

### Starting:
To run using 'npm', use the commands:

    npm i ci
    npm run build
    npm run start

To run using 'docker', use the command
    
    docker run -p 5011:5011 -d YOUR_DOCKER_IMAGE