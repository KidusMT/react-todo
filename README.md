# React Cookbook

## Create Project
```shell
>> npx create-react-app demo-app
>> cd demo-app
```

## Reusable `api.js` used as a client for making API call
- [fetch vs axios](https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/)

```js
const BASE_URL = "http://localhost:8080";
var config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
};

export const post = (endpoint, data) => {

    const requestOptions = {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data)
    };

    const url  =`${endpoint}`;
    return fetch(url, requestOptions).then( async (response) => {
        if(!response.ok){
            return Promise.reject("Error while posting data!");
        }
    })
}

export const get = (endpoint, id=null) => {
    const url = id ? `${endpoint}/${id}` :  `${endpoint}`

    return fetch(url, config).then( async (response) => {
        const data = await response.json();

        if(response.ok){
            return data;
        }else{
            const error = data || data.message;
            return Promise.reject(error)
        }
    })
}
```
How to use: 
```js
    import {get, post } from '../../api';

    // GET
    const getList = async () => {
        try{
            const result = await get('endpoint/one');
            setList(result)
        }catch(error){
          console.log({error})   
        }
    }

    useEffect( () => {
       getList(); 
    },[])

   // POST
   const postData = async (value)  => {
        try {
            const data = { attribute: value };
            await post('endpoint/two', data);
            // after posting getList() again for updating content
            getList();
        }catch(error){
            console.log({error})
        }
    }
    
    function submit(e){
        e.preventDefault();
        if(attribute) {
            postData(attribute);
        }
    }
```

## Routing library has to be installed , [for more](https://reactrouter.com/web/guides/quick-start)
```shell
>> npm install --save react-router-dom
```

## index.js -> routing

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## App.js -> Router, Switch `react-router-dom` 
```js
import { Route, Switch } from "react-router-dom";
import './App.css';
import NavHeader from './components/layout/NavHeader';
import Footer from './components/layout/Footer';
import Page1 from './components/layout/page1/Page1';
import Page2 from './components/layout/page2/Page2';

function App() {

  return (
    <div>
       <NavHeader/>
       <Switch>
         <Route path="/" exact>
            <Page1 />
         </Route>
         <Route path="/page">
           <Page2 />
         </Route>
       </Switch>
       <Footer/>
    </div>
  );
}

export default App;
```

## fetching using API , we cal also use [axios](https://www.npmjs.com/package/axios) using `useEffect` and `useState`
```js
import React, { useEffect, useState } from 'react';

const [list, setList] = useState([]);
const [attribute, setAttribute] = useState("");

const getList =  function (){
        return fetch('/end-point-url')
        .then(res => res.json())
        .catch(err => console.error(err))
    }

useEffect(() => { 
        getList().then(items => {
        console.log(items)
        setList(items)})
    }, [])
``` 

### Simple `POST` : important methods

```js

      function handle(e){
        setAttribute(e.target.value);
      }

      const postData = function() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              attribute: attribute 
            })
        };

        fetch('/end-point-url',requestOptions)
            .then(res => { console.log(res)})
            .catch(err => console.error(err))
    }
    
    function submit(e){
        e.preventDefault();
        console.log(attribute);
        postData();
        
    }

```
### Simple Form for `POST` inside `return` of the function component
```js
        <div>
            <div className="App">
                    <div>
                        <form onSubmit={submit}>
                            <input onChange={handle} value={attribute} id="name" name="name" />
                            <button onClick={submit} type="submit">Submit</button>
                        </form>
                    </div>
                    <div>
                        <br></br>
                        <ul className="column-list">
                                {list && list.map(item => {item.attribute} )}
                        </ul>
                    </div>
            </div>
        </div>
```


## Some UI Components: keep components in components package and name css files with `.module.css` extesions

## Header
```js
import classes from "./NavHeader.module.css";
import { Link } from "react-router-dom";

export default function NavHeader(){

    return (
        <header className={classes.header}>
          <nav>
            <ul>
              <li>
                <Link className={classes.link} to="/"><h3>Page 1</h3></Link>
              </li>
              <li>
                <Link className={classes.link} to="/page"><h3>Page 2</h3></Link>                
              </li>
            </ul>
          </nav>
        </header>
      );
}
```

## Footer 
```js
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer(){

    return (
        <footer className={classes.footer}>
          <div>
            <h1>We can put the @ copy right 2021 thing here</h1>
          </div>
        </footer>
      );
}
```
## Important CSS 

```css
/* keeping padding between column */
.column-list {
  padding-left: 5rem;
  padding-right: 5rem;
}


li {
  margin-left: 3rem;
  vertical-align: middle;
}

/* keeping headers between column */
.header {
    width: 100%;
    height: 5rem;
    background-color: color-name;
    padding: 0 10%;
  }

  .header ul {
    margin: 0;
    padding: 0;
    display: flex;
  }
  
/* formatting anchor tags and links */
  .link {
    padding: 10 0;
    text-decoration: none;
    color: color-name;
  }
```

## .travis.yml configs -> was for NodeJS backend project

```yml
sudo: required
services:
  - docker

script:
  - docker build -t kidusmt/name-of-project .
  - docker images kidusmt/name-of-project

before_deploy:
  - docker login -u username -p password

deploy:
  provider: script
  script: docker push kidusmt/node
  on:
    branch: main
```

## Dockerfile configs for NodeJS backend project

```Dockerfile
FROM node:10.0.0

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

EXPOSE 4000

CMD [ "npm", "start" ]
```
## HTTP API test files: `POST` and `GET` requests with response body : `test.http`

```
POST http://localhost:3000/item
Content-Type: application/json

{
        "name": "chipsw",
        "quantity": 2
}

###

GET http://localhost:3000/items

###

PUT  http://localhost:3000/item/5cf80b731ad6501f0ca9d49e/quantity/3
```

## react-bootstrap library for UI
### Card Components [for more](https://react-bootstrap.github.io/components/cards/)

```js
import logo from '/path/of/file/logo.svg';

<Card key={item.id}
    style={{ width: "100%", height: "3rem" , display: 'flex', flexDirection: 'row'}}
    className="mb-1">
    <Card.Img 
        style={{ width: "50px", height: "50px" }} 
        src={logo} />
    <Card.Body>
        <Card.Title>{item.attribute}</Card.Title>
    </Card.Body>
</Card>
```


## Reactjs Table with React-Bootstrap
```js
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
```
