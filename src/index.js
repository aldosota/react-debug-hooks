
module.exports = React => {
    if(window.__REDUX_DEVTOOLS_EXTENSION__) {
        const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({name: "Hooks"})
        React.oldUseState = React.useState
        const state = {}
        React.useState = (initialState, debugName) => {
            const hookResult = React.oldUseState(initialState)
            if(debugName) {

                // initial state
                if(state[debugName] === undefined) {
                    state[debugName] = initialState
                    devTools.send(`${debugName}-> initial-state`, state)
                }

                // on each setState call
                const originalSetState = hookResult[1]
                const setState = arg => {
                    if(typeof arg !== 'function') {
                        state[debugName] = arg
                        devTools.send(debugName, state)
                        return originalSetState(arg)
                    } else {
                        originalSetState(s => {
                            const result = arg(s)
                            state[debugName] = result
                            devTools.send(debugName, state)
                            return result
                        })
                    }
                } 

                hookResult[1] = setState
            }
            return hookResult
        }
    }
}

