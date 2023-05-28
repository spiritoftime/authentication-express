# CommonDocs 
<code><img src="https://commondocs.vercel.app/assets/image-removebg-preview-09ec5f7e.png" alt="commondocs-preview"></code> 
# [AWS Deployment Link](http://13.229.215.120/)
# [Vercel,Render Deployment Link](https://commondocs.vercel.app/)
## Full Stack Application for users to collaborate, edit and organize documents. *Project 3 for Rocket Academy Bootcamp*
### Features - Create, Update, Delete, Read Documents on realtime 
- Folders and documents directory for smooth user interface 
- Organizing documents under folders & nesting/ unnesting them for easy categorisation 
- Ability to share entire folders and its subfolders and subdocuments through implementation of a tree structure and dfs 
- Restricted Access to Folders - Viewer, Collaborator and creator 
- Custom Built Authentication system 
### Tech Used 
#### Frontend:
- State Management: React-Query, useContext 
- Component Library: Material UI 
- Socket.io, React Quill for realtime document editing React-tree-view 

#### Backend: Express
- ORM: sequelize 
- Database: PostgreSQL 

#### Setup: 
1. clone the repo and run npm install on frontend/my-react-app and backend
2. set up env variables: - backend:
``` 
// to generate a salt, run require('crypto').randomBytes(64).toString('hex')
ACCESS_TOKEN_SECRET=<SALT>
REFRESH_TOKEN_SECRET=<SALT> 
PORT=<POSTGRES PORT>
DB_USER=<POSTGRES USER> 
DB_PASSWORD=<POSTGRES PW> 
DB_HOST=<POSTGRES HOST> 
DB_DATABASE=<POSTGRES DATABASE>
DB_DIALECT=postgres
NODE_ENV=development
``` 
-frontend: 
``` 
VITE_ENV=development
VITE_BASE_URL=http://localhost:3000
``` 
3. at backend cwd, run ./migrate-seed.sh 
4. 4. at frontend/my-react-app, run npm run dev

