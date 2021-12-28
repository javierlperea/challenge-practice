import React, { useState } from 'react'
import { Button, Modal, Form, Input, Select, Upload } from 'antd';
import { useMutation } from 'react-query';

import { GetLanguages } from '../helpers/GetLanguages'
import { UploadOutlined } from '@ant-design/icons';

import './styles/styles.css'


const { Item } = Form
const { Option } = Select

const formItemLayout = {
    labelCol: {
      xs: { span: 16 },
      sm: { span: 16 },
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 24 },
    },
  };

interface NewProfessionalModalProps {
    visible: boolean
    setVisible: (prop: boolean) => void
}

export const NewProfessionalModal = ({ visible, setVisible }: NewProfessionalModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [proffesional, setProffesional] = useState({
        first_name: '',
        last_name: '',
        email: '',
        profile_image: '',
        language: ''
    })

    const handleCancel = () => {
        setVisible(false);
    }
    
    const onLanguagesChange = (value: string | string[]) => {
        console.log(value);
    }
    
    
    const query: any = GetLanguages()
    const { data } = !!query && query

    const handleChange = (e: any): void => {
        const { value, name } = e.target

        setProffesional({
            ...proffesional,
            [name]: value
        })
        mutation.mutate(proffesional)
        console.log(proffesional)
    }

    const CreateProfessional = async(values: any) => {

        setConfirmLoading(true)
        const { first_name, last_name, email, profile_image } = values;
        
        const response = await fetch('http://challenge.radlena.com/api/v1/professionals/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name,
                last_name, 
                email, 
                // languages, 
                profile_image
            })
        })
        
        if (!response) {
            throw new Error('Error añadiendo el profesionale')
        }
        setConfirmLoading(false)
        return response;
    }

    const mutation = useMutation(CreateProfessional, {
        onSettled: () => {
            console.log('Finalizado');
        },
        onSuccess: () => {
            console.log('Success');
        },
        onError: () => {
            console.log('Error');
        }
    })

    // const OnFinishSucces = (values: any): any => {
    //     console.log(values);
    //     mutation.mutate(values)
    // }

    const onFinishFailed = (): any => {
    }

    const uploadProps: any = {
        action: 'file',
        listType: 'picture',
        previewFile(file: any) {
          // Your process logic. Here we just mock to the same file
          return fetch('http://challenge.radlena.com/api/v1/professionals/', {
            method: 'POST',
            body: file,
          })
            .then(res => res.json())
            .then(({ thumbnail }) => thumbnail);
        },
      };

    return (
        <div>

            <Modal
                title="Nuevo Profesional"
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose={true}
                footer={null}
            >
                <Form {...formItemLayout} name="form" onFinish={handleChange} onFinishFailed={onFinishFailed}>
                    <Item 
                    label="Nombre" 
                    name="first_name" 
                    rules={[{ required: true, message: 'Debe Ingresar su nombre de usuario' }]} 
                    style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginRight: 20 }} className="label"
                    >
                        <Input 
                            name="first_name" 
                            placeholder="Ejemplo: Javier" 
                            value={proffesional && proffesional.first_name} 
                            onChange={handleChange}
                        />
                    </Item>

                    <Item 
                        name="last_name" 
                        label="Apellido" 
                        rules={[{ required: true,  message: 'Debe Ingresar su apellido' }]} 
                        style={{ display: 'inline-block', width: 'calc(50% - 10px)' }} className="label"
                    >
                        <Input 
                            name="last_name" 
                            placeholder="Ejemplo: Perea" 
                            onChange={handleChange}
                        />
                    </Item>

                    <Item 
                        label="Imagen de Perfil" 
                        className="label"
                        style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}
                    >
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>,
                    </Item>

                    <Item 
                        name="email" 
                        label="Email" 
                        rules={[{ required: true,  message: 'Debe Ingresar su email' }]} 
                        className="label" 
                        style={{ display: 'inline-block', width: '100%' }}
                    >
                        <Input 
                            name="email" 
                            placeholder="Ejemplo: javier@gmail.com" 
                            onChange={handleChange}
                        />
                    </Item>
                    
                    <Item 
                        name="languages" 
                        label="Idiomas" 
                        // rules={[{ required: true, message: 'Debe Ingresar el/los idioma/s' }]} 
                        className="label" 
                        style={{ display: 'inline-block', width: '100%' }}
                    >
                    <Select
                        placeholder="Seleccione uno o mas idiomas"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        className="select"
                        mode="multiple"
                        onChange={onLanguagesChange}
                    >   
                    {
                        data?.map( (language: any): any => (
                            <Option key={language.id} name={language.name} value={language.id}>{language.name}</Option>
                        ))
                    }
                    </Select>
                    </Item>
                    
                    <Item>
                        <Button type="primary" htmlType="submit" className="button button-confirm" block>Agregar</Button>
                    </Item>
                </Form>
            </Modal>
        </div>
    )
}
