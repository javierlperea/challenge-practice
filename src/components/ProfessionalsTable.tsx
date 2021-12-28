import React from 'react'
import { Table, Button, Tooltip } from 'antd'
import { EditOutlined, UserDeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

import { GetProfessionals } from '../helpers/GetProfessionals';
import './styles/styles.css'

interface ProfessionalsTableProps {
    searchResult: string | '',
    visibleEdit: boolean,
    setVisibleEdit: (prop: boolean) => void,
}

export const ProfessionalsTable = ({ searchResult, visibleEdit, setVisibleEdit }: ProfessionalsTableProps) => {

    const query: any = GetProfessionals()
    console.log(searchResult);

    const onEdit = (id: any) => {
        console.log(id);
        setVisibleEdit(!visibleEdit)
    }

    const onDelete = (id: any) => {
        console.log(id);
    }

    const columns = [
        {
            title: 'Perfil',
            dataIndex: 'profile_image',
            key: 'profile_image',
            render: (row: any) => (
                <img
                    className="image"
                    alt={row}
                    src={row} 
                />
            )
        },
        {
            title: 'Nombre',
            dataIndex: 'first_name',
            key: query.first_name
        },
        {
            title: 'Apellido',
            dataIndex: 'last_name',
            key: query.last_name
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: query.email
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: query.id
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            key: 'actions',
            render: (key: any, record: any) => ( 
                <> 
                    <Tooltip title="Editar">
                        <Button 
                            className="button button-edit" 
                            icon={ <EditOutlined /> }
                            shape="circle"
                            onClick={ () => console.log(key) }
                            /> 
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button 
                            danger 
                            className="button" 
                            icon={ <UserDeleteOutlined /> } 
                            shape="circle" 
                            onClick={ () => onDelete(query) }
                        />
                    </Tooltip>
                </>
            )
        },
    ]

    const data = [  
        query.results?.map((proffesional: any): any => (
            {
                key: proffesional.id,
                first_name: proffesional.first_name,
                last_name: proffesional.last_name,
                email: proffesional.email,
                id: proffesional.id,
                is_active: proffesional.is_active,
                profile_image: proffesional.profile_image
            }
        ))
    ]

    return (
        <div className="container">
            <Table columns={columns} dataSource={data[0]} pagination={{ pageSize: query.count }}/>  
        </div>
    )
}
