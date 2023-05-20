import Popup from 'reactjs-popup'
import { useState } from 'react'
import {MdDelete,MdOutlineCancel} from 'react-icons/md'
import {FiEdit} from 'react-icons/fi'
import {GiConfirmed} from 'react-icons/gi'
import './index.css'

const FileItem=(props)=>{
    const {fileData,changeLabelStatus,deleteFile,updateFile}=props
    const [modalOpen,setModalOpen]=useState(false)
    const [editOpen,setEditOpen]=useState(false)
    const [editName,setEditName]=useState(fileData.name)
    const [editlabels,setEditLabels]=useState(fileData.labels)
    
    const updateLabelStatus=(event)=>{
        fileData.labelChecked=!fileData.labelChecked
        const checkboxEl=document.getElementById(`file-checkbox-${fileData.id}`)
        checkboxEl.checked=fileData.labelChecked
        changeLabelStatus(fileData)
    }

    const closeModal=()=>{
        setModalOpen(false)
    }

    const onDelete=()=>{
       setModalOpen(true)
    }

    const onEditOpen=()=>{
        setEditOpen(true)
    }

    const onEditClose=()=>{
        setEditOpen(false)
    }

   const onConfirm=()=>{
        deleteFile(fileData)
    }

    const onUpdate=(event)=>{
        event.preventDefault()
        const nameEl=document.getElementById(`edit-name-${fileData.id}`).value;
        const labelEl=document.getElementById(`edit-label-${fileData.id}`).value;
        fileData.name=nameEl
        fileData.labels=labelEl
        updateFile(fileData)
        setEditOpen(false)
        console.log('update',fileData)
    }

    return(
        <tr>
            <td className='align-center '> <input type="checkbox" id={`file-checkbox-${fileData.id}`} onChange={updateLabelStatus}/></td>
            <td className='width-20vw'><img className='file-img' src={fileData.file} alt={fileData.title}/><span>{fileData.name}</span></td>
            <td className='align-center width-20vw'><img className='owner-img' src={fileData.owner} alt={fileData.name}/></td>
            <td className='align-center width-20vw'>{fileData.labels}</td>
            <td className='align-center width-20vw'>{fileData.type}</td>
            <td className='align-center width-20vw'>{fileData.modifiedAt}</td>
            <td className='align-center width-20vw'><FiEdit onClick={onEditOpen}/><MdDelete onClick={onDelete}/></td>
            <td className='width-20vw'>
            <Popup open={modalOpen} closeOnDocumentClick onClose={closeModal} className='popup'>
                <div className='popup-container'>
                    <div><MdDelete/>Remove</div>
                    <div className='flex-row'><div>Are you sure?</div><div><MdOutlineCancel className='cancel-icon' onClick={closeModal}/><GiConfirmed className='confirm-icon' onClick={onConfirm}/></div></div>
                </div>
            </Popup>
            </td>
            <Popup open={editOpen} closeOnDocumentClick onClose={closeModal} className='popup'>
            <form className='edit-form-container' onSubmit={onUpdate}>
                <p>Edit Details</p>
                <div className='margin-input'>
                <label htmlFor={`edit-name-${fileData.id}`}>Name: </label>
                <input type="input" id={`edit-name-${fileData.id}`} value={editName} onChange={(event)=>setEditName(event.target.value)}/>
                </div>
                <div className='margin-input'>
                <label htmlFor={`edit-label-${fileData.id}`}>Labels: </label>
                <input type='input' id={`edit-label-${fileData.id}`} value={editlabels} onChange={(event)=>setEditLabels(event.target.value)}/>
                </div>
                <div>
                <button type='submit'>Submit</button>
                <button type="button" onClick={onEditClose}>Cancel</button>
                </div>
            </form>
             </Popup>
        </tr>
    )
}
export default FileItem