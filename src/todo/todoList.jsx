import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'
import { markAsDone, markAsPanding, remove } from './todoActions'


const Todolist = props => {

    const renderRows = () => {
        const list = props.list || []

        return list.map((element, i) => (
            <tr key={element.Id}>
                <td className={element.Done ? 'markedAsDone' : ''}>
                    {element.Description}
                </td>
                <td>
                    <IconButton style='success' icon='check' hide={element.Done} onClick={() => props.markAsDone(element)} />
                    <IconButton style='warning' icon='undo' hide={!element.Done} onClick={() => props.markAsPanding(element)} />
                    <IconButton style='danger' icon='trash-o' hide={!element.Done} onClick={() => props.remove(element)} />
                </td>
            </tr>
        ))
    }

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({ list: state.todo.list })
const mapDispatchToProps = (dispatch) => bindActionCreators({ markAsDone, markAsPanding, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Todolist)