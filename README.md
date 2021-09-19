# React Meetup

## Create Project
```shell
>> npx create-react-app demo-app
>> cd demo-app
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
