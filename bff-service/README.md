# st-2-rest-api

# API documentation:

## How to run app:

### 1. If you want to start app in docker container you need just change DB credentials in ormconfig.ts and then run command "docker compose up", it will start development server and postgres database in different containers. Also you must to use PORT=3001 instead PORT=3000, for all queries. If you don't wanna do this, go to the next step.

### 2. Clone repository to local machine

### 3. Enter "npm install" or "yarn install"

### 4. Enter command "npm run migration:run" or "yarn run migration:run" if you need to predefine database with values in your local machine, also you need to change database config in "ormconfig.ts" file, if you don't need this, go to the next step

### 5. Enter command "npm start" or "yarn start" to start server on http://localhost:3000/users

---

## Task 4 and Task 5 endpoints:

### 1. http://localhost:3000/users

<details><summary>POST</summary>
 you need to send in your request:

body = {  
 &ensp;login: string;  
 &ensp;password: string;  
 &ensp;age: number;  
 &ensp;isDeleted: boolean;  
 }

 </details>
 <details><summary>GET</summary>
 you need to add in your query string:

limit={number}, by default limit = 10  
loginSubstring={string}  
totally looks like:  
http://localhost:3000/users?loginSubstring={string}&limit={number}  
you can also use just one of this parameter,  
but if no one use, by default return users without sort, but maximum 10

 </details>

### 2. http://localhost:3000/users/{userId}

 <details><summary>GET</summary>
 add user ID to the end of string

totally looks like:  
 http://localhost:3000/users/{userId}  
 if doesn't have this user or something wrong you will get message

 </details>
 <details><summary>DELETE</summary>
 add user ID to the end of string  
  
 totally looks like:  
 http://localhost:3000/users/{userId}  
 if doesn't have this user or this user already deleted you will get message

 </details>
 <details><summary>PUT</summary>
 add user ID to the end of string  
  
 totally looks like:  
 http://localhost:3000/users/{userId}  
 you need to send in your request:

body = {  
 &ensp;login: string;  
 &ensp;password: string;  
 &ensp;age: number;  
 &ensp;isDeleted: boolean;  
 }  
 you can change only this parameters

also, if user already deleted, or doesn't exist, you can change nothing and will get a message

 </details>

---

## Task 6 endpoints:

### 1. http://localhost:3000/groups

<details><summary>POST</summary>
 you need to send in your request:

body = {  
 &ensp;name: string;  
 &ensp;permissions: Permission[];
}  
where permissions is an array of this type:  
type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

 </details>

 <details><summary>GET</summary>
 don't need extra parameters

 </details>

### 2. http://localhost:3000/groups/{groupId}

 <details><summary>GET</summary>

you just need to add in your path id of group
totally looks like:  
 http://localhost:3000/groups/{groupId}  
 if doesn't have this group or something wrong you will get message

 </details>
 <details><summary>DELETE</summary>
 
 add group ID to the end of string  
  
 totally looks like:  
 http://localhost:3000/groups/{groupId}  
 if doesn't have this group or this user already deleted you will get message

 </details>
 <details><summary>PUT</summary>

add user ID to the end of string

totally looks like:  
 http://localhost:3000/groups/{groupId}  
you need to send in your request:

body = {  
 &ensp;name: string;  
 &ensp;permissions: Permission[];
}  
where permissions is an array of this type:  
type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

 </details>

### 3. Task 6-3 http://localhost:3000/groups/{groupId}

<details><summary>PUT (addUsersToGroup(groupId, userIds))</summary>

add groupId to the end of string like this:  
http://localhost:3000/groups/{groupId}  
you need to send in your request:

body = {  
 &ensp;userIds: UserId[];
}  
where UserId[] is an array of users Ids like this:  
body = {  
 &ensp;userIds: [
"545be190-1a7c-4a40-a1b7-7a957e53c27e",
"63eaee99-b26c-4257-8d4d-dd445f591207",
"85131302-7cee-4333-bdf3-cec578b64025"]  
 }

</details>

## Task 8 endpoints:

<details><summary>POST</summary>

http://localhost:3000/login  
you need to send in your request:

body = {  
 &ensp;login: "masha1";  
 &ensp;password: "pass1";  
 }

after that u will have token for 1 hour, however u can change expiration time

 </details>

## Task 9:

<details><summary>POST</summary>

http://localhost:3000/login  
you need to send in your request:

body = {  
 &ensp;login: "masha1";  
 &ensp;password: "pass1";  
 }

after that u will have token for 1 hour, however u can change expiration time

 </details>
