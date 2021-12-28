import React, { useState } from 'react'
import { Divider, Typography, Input, Button } from 'antd'
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons'

import { ProfessionalsTable } from './ProfessionalsTable'
import { NewProfessionalModal } from './NewProfessionalModal'

import 'antd/dist/antd.css'
import './styles/styles.css'
import { EditProfessionalModal } from './EditProffessionalModal'

const { Search } = Input
const { Title } = Typography

export const Professionals = () => {
    const [visible, setVisible] = useState<any | boolean>(false)
    const [visibleEdit, setVisibleEdit] = useState<any | boolean>(false)
    const [searchResult, setSearchResult] = useState('')

    const showModal = () => {
        setVisible(true);
    };

    const handleSearch = ( value: (string | '') ) => {
        setSearchResult(value)
    }

    return (
        <div className="container">
            <div className="header">
                <Title className="title">Profesionales</Title>
                <Divider />
            </div>
            <div className="search">
                <Search 
                    className="search-input"
                    style={{ width: 400}}
                    placeholder="Buscar por nombre" 
                    prefix={ <SearchOutlined /> }
                    onSearch={handleSearch}
                    enterButton
                />
                <Button
                    className="button-modal"
                    type="primary"
                    icon={ <UserAddOutlined /> }
                    onClick={showModal}
                >
                    Nuevo Profesional
                </Button>
                
                <NewProfessionalModal 
                    visible={visible}
                    setVisible={setVisible}
                />

                <EditProfessionalModal 
                    visibleEdit={visibleEdit}
                    setVisibleEdit={setVisibleEdit}
                />
            </div>
            <div className="proffesionals">
                <ProfessionalsTable 
                    searchResult={searchResult}
                    visibleEdit={visibleEdit}
                    setVisibleEdit={setVisibleEdit}
                />
            </div>
        </div>
    )
}
