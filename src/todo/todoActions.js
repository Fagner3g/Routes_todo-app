import axios from 'axios'

const URL = 'http://localhost:56071/api/tarefa'

export const changeDescription = (event) => ({
    type: 'DESCRIPTION_CHAGED',
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `/?desc=${description}` : ''
        const request = axios.get(`${URL}${search}`)
            .then(resp => dispatch({ type: 'TODO_SEARCHED', payload: resp.data }))
    }
}

export const add = description => {
    return dispatch => {
        axios.post(URL, { description })
            .then(() => dispatch(clear()))
            .then(() => dispatch(search()))
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo.Id}`, { ...todo, done: true })
            .then(resp => dispatch(search()))
    }
}

export const markAsPanding = todo => {
    return dispatch => {
        axios.put(`${URL}/${todo.Id}`, { ...todo, done: false })
            .then(resp => dispatch(search()))
    }
}

export const remove = todo => {
    return dispatch => {
        axios.delete(`${URL}/${todo.Id}`)
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    return [
        { type: 'TODO_CLEAR' },
        search()
    ]
}