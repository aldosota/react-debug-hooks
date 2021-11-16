# react-debug-hooks

Development tool to preview hooks state on Redux DevTools extension

## Installation

Use [npm](https://www.npmjs.com/get-npm) to install react-debug-hooks

Make sure to have [Redux DevTools](https://github.com/reduxjs/redux-devtools) extension installed on your browser!

```bash
npm i react-debug-hooks
```

## Usage

```JavaScript
import React from 'react'
import ReactDOM from 'react-dom'
import reactDebugHooks from 'react-debug-hooks'

reactDebugHooks(React)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

const App = () => {

  const [state, setState] = React.useState({
    loading: false,
    users: [],
    error: null
  }, 'users') // you need to set a second parameter 'string' that will be shown on Redux devTools. 

  React.useEffect(() => {

    setState(state => ({...state, loading: true}))

    getUsers()
    .then(users => {
      setState(state => ({...state, users, loading: false}))
    })
    .catch(error => {
      setState(state => ({...state, error, loading: false}))
    })

  }, [])

  return(
    <>
      {state.users.map(user => (
        <p key={user.id}>{users.name}</p>
      ))}
    </>
  )
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
