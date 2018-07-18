import React from 'react'
import IconButton from '../template/iconButton'

export default props => {

    const renderRows = () => {
        const list = props.list || []

        return list.map((element, i) => (
            <tr key={element.Id}>
                <td className={element.Done ? 'markedAsDone' : ''}>
                    {element.Description}
                </td>
                <td>
                    <IconButton style='success' icon='check' hide={element.Done} onClick={() => props.handleMarkAsDone(element)} />
                    <IconButton style='warning' icon='undo' hide={!element.Done} onClick={() => props.handleMarkAsPending(element)} />
                    <IconButton style='danger' icon='trash-o' hide={!element.Done} onClick={() => props.handleRemove(element)} />
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