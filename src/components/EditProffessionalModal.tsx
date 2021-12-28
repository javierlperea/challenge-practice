import React, { useState } from 'react'
import { Button, Modal, Upload, Form, Input, Select, message,  } from 'antd';
import { useMutation } from 'react-query';

import { GetLanguages } from '../helpers/GetLanguages'
import { UploadOutlined } from '@ant-design/icons';

import './styles/styles.css'
import { GetProfessionals } from '../helpers/GetProfessionals';

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

  interface EditProfessionalModalProps {
    visibleEdit: boolean
    setVisibleEdit: (prop: boolean) => void
}

export const EditProfessionalModal = ({ visibleEdit, setVisibleEdit } : EditProfessionalModalProps )=> {
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);

    const [proffesional, setProffesional] = useState({
        first_name: '',
        last_name: '',
        email: '',
        profile_image: '',
        language: ''
    })
    
    const onLanguagesChange = (value: string | string[]) => {
        console.log(value);
    }
    
    const getLanguages: any = GetLanguages()
    const { data } = !!getLanguages && getLanguages
    console.log(data);

    const getProffesionals: any = GetProfessionals()
    const { results } = !!getProffesionals && getProffesionals
    console.log(results);

    const handleChange = (e: any): void => {
        const { value, name } = e.target

        setProffesional({
            ...proffesional,
            [name]: value
        })

        console.log(proffesional)
    }

    const selectProffesional = () => {
        setProffesional(proffesional);
        // (case === "Edit") ? setVisibleEdit(true) : setVisibleEdit(false)
    }


    const EditProfessional = async( values: any ) => {

        setConfirmLoadingEdit(true)
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
                profile_image
            })
        })
        
        if (!response) {
            throw new Error('Error añadiendo el profesionale')
        }
        setConfirmLoadingEdit(false)
        return response;
    }

    const mutation = useMutation(EditProfessional, {
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

    const handleCancelEdit = () => {
        setVisibleEdit(false);
        // setConfirmLoadingEdit(false)
    }

    const OnFinishSucces = (values: any): any => {
        // console.log(values);
        mutation.mutate(values)
    }

    const onFinishFailed = (): any => {
    }

    const uploadProps = {
        name: 'file',
        action: 'http://challenge.radlena.com/api/v1/professionals/',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info: any) {
          if (info.file.status !== 'Subiendo') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} Archivo cargado correctamente`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} Error subiendo archivo`);
          }
        },
      };

    return (
        <div>
            <Modal
                title="Editar Profesional"
                visible={visibleEdit}
                confirmLoading={confirmLoadingEdit}
                onCancel={handleCancelEdit}
                destroyOnClose={true}
                footer={null}
            >
                <Form {...formItemLayout} name="form" onFinish={OnFinishSucces} onFinishFailed={onFinishFailed}>
                    <Item 
                    label="Nombre" 
                    name="first_name" 
                    rules={[{ required: true, message: 'Debe Ingresar su nombre de usuario' }]} 
                    style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginRight: 20 }} className="label"
                    >
                        <Input 
                            name="first_name" 
                            placeholder="Ejemplo: Javier" 
                            onChange={handleChange}
                            // value={proffesionalData && proffesionalData.first_name}
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
                            // value={proffesionalData && proffesionalData.last_name}
                            onChange={handleChange}
                        />
                    </Item>

                    <Item 
                        label="Imagen de Perfil" 
                        className="label"
                        style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}
                    >
                        <Item name="profile_image" valuePropName="fileList">
                            <Upload {...uploadProps} type="drag" accept="file" maxCount={1} method="POST">
                                <Button icon={<UploadOutlined />}>Agregar Imagen</Button>
                            </Upload>
                        </Item>
                    </Item>

                    <Item 
                        name="email" label="Email" 
                        rules={[{ required: true,  message: 'Debe Ingresar su email' }]} 
                        className="label" 
                        style={{ display: 'inline-block', width: '100%' }}
                    >
                        <Input 
                            name="email" 
                            placeholder="Ejemplo: javier@gmail.com" 
                            // value={proffesionalData && proffesionalData.email}
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
                            // value={laguagesData && laguagesData.language}
                            onChange={onLanguagesChange}
                        >   
                        {
                            data?.map( (language: any): any => (
                                <Option key={language.id} name={language.name} value={language.id}>{language.name}</Option>
                            ))
                        }
                        </Select>
                    </Item>
                </Form>
            </Modal>
        </div>
    )
}
