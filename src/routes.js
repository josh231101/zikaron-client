import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

const routes = [
  // Auth Pages
  {
    path: '/:qrUrl',
    Component: lazy(() => import('./pages/Markers')),
    exact: true,
  },
]

const mapStateToProps = ({ settings, user }) => ({
  routerAnimation: settings.routerAnimation,
  user,
})

const withAccessControl = (Component, acl) => (currentUserRole) => {
  if (!acl) {
    return <Component />
  }
  const decision = acl[currentUserRole]
  if (!decision || decision.allow === true) {
    return <Component />
  } else if (decision.allow === false && decision.redirect) {
    return <Redirect to="auth/404" />
  }
  return <div>Ocurrió un error</div>
}

const Router = ({ history, routerAnimation, user }) => {
  const currentUserRole = user.role || 'guest'
  return (
    <ConnectedRouter history={history}>
        <Route
          render={(state) => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Redirect to="/" />} />
                    {routes.map(({ path, Component, exact, acl = {} }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => (
                          <React.Fragment>
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                            </div>
                          </React.Fragment>
                        )}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
