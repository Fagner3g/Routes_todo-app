import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:56071/api/tarefa'

export default class todo extends Component {
    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh();
    }

    refresh(description = '') {
        const search = description ? `/?desc=${description}` : ''
        axios.get(`${URL}${search}`)
            .then(resp => this.setState({ ...this.state, description, list: resp.data })
            )
    }

    handleAdd() {
        const data = { Description: this.state.description }
        axios.post(
            URL, data
        ).then(resp => this.refresh())
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleRemove(element) {
        axios.delete(`${URL}/${element.Id}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(element) {
        axios.put(`${URL}/${element.Id}`, { ...element, done: true })
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(element) {
        axios.put(`${URL}/${element.Id}`, { ...element, done: false })
            .then(resp => this.refresh(this.state.description))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleClear() {
        this.refresh()
    }
    render() {
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />
                <hr />
                <TodoForm
                    description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                />
                <TodoList
                    list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                />
            </div>
        )
    }
}