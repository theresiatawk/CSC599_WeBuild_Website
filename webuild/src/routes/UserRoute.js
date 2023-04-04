import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const UserRoute = ({component: Component, ...rest}) => {

  const accessToken = localStorage.getItem('accessToken')

  try {
    return (
      <Route
        {...rest}
        render={(props) =>
          accessToken ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {from: props.location},
              }}
            />
          )
        }
      />
    )
  } catch (error) {
    return console.log('USER ERROR', error)
  }
}

export default UserRoute