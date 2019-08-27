import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (localStorage.getItem('user')) {
                return <Component {...props} />
            } else {
                return (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        }

        }
    />
)