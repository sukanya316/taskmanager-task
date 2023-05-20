import { useEffect,useState } from 'react'
import {BiSearch} from 'react-icons/bi'
import {IoIosSettings} from 'react-icons/io'
import Categories from '../Categories'
import FileItem from '../FileItem'
import Header from '../Header'

import './index.css'
import SideBar from '../SideBar'

const FileManager=()=>{
    const [files,setFiles]=useState([])
    const [searchVal,setSearchVal]=useState('')
    const [filteredList,setFilteredList]=useState([])
    console.log('render',filteredList)
  const getFiles=async()=>{
    const url="https://646312614dca1a661353d0ee.mockapi.io/api/Files"
    const response=await fetch(url)
    const data=await response.json()
    const getDate=(d)=>{
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dat=new Date(d)
    const formattedDate=`${dat.getDate()}th ${months[dat.getMonth()]} ${dat.getFullYear()}`
    return formattedDate
    }

    const getLabel=()=>{
      const labelsList=[,'Label 1','Label 2','Label 3','Label 4','Label 5','Label 6']
      const labelInd=Math.floor((Math.random()*labelsList.length-1)+1)
      return labelsList[labelInd]
    }

    const formattedData=data.map(file=>({
        modifiedAt:getDate(file.ModifietAt),
        name:file.Name,
        owner:file.Owner,
        type:file.Type,
        file:file.file,
        id:file.id,
        title:file.title,
        labelChecked:false,
        labels:getLabel()
    }))
   // console.log(formattedData)
    setFiles(formattedData)
    setFilteredList(formattedData)
  }

  const onSearch=(event)=>{
    setSearchVal(event.target.value)
    const searchResult=files.filter(file=>file.name.includes(searchVal))
    setFilteredList(searchResult)
  }

  const filterOnSelectedLabels=(labels)=>{
    const filteredFiles=labels.map(label=>files.filter(file=>file.labels===label.name))
    if(filteredFiles.length!==0){
    setFilteredList(filteredFiles.flat())
    }
    else{
      setFilteredList(files)
    }
  }

  const changeLabelStatus=(fileObj)=>{
    const fileIndex=files.findIndex(file=>file.id===fileObj.id)
    files[fileIndex]=fileObj
    setFilteredList(files)
    setFiles(files)
  }

  const deleteFile=(file)=>{
    const resList=files.filter(fileObj=>fileObj.id!==file.id)
    setFilteredList(resList)
    setFiles(resList)
  }

  const updateFile=(file)=>{
    const fileInd=files.findIndex(fil=>fil.id===file.id)
    files[fileInd]=file
    setFiles(files)
    setFilteredList(files)
    console.log(files)
  }

  const labelsChanged=(labels)=>{
    filterOnSelectedLabels(labels)
  }

  // const markAllLabelsChecked=(event)=>{
  //   if(event.target.checked){
  //   const resList=files.map(file=>Object.keys(file).forEach(fileKey=>{file.labelChecked='checked'})) 
  //   }
  //   else{
  //     const resList=files.map(file=>Object.keys(file).forEach(fileKey=>{file.labelChecked=false})) 
  //   }
  //   setFiles(files)
  //   setFilteredList(files)
  //   console.log(event,'hkj',files)

  // }

  useEffect(()=>{
    getFiles()
  },[])

    return (
      <div className='main-container'>
        <SideBar/>
    <div style={{width:'82%',display:'flex',flexDirection:'column'}}>
        <Header/>
        <div className='search-input-container'>
          <div style={{border:'1px solid lightgray'}}>
        <BiSearch className='search-icon'/> <input type="seacrch" placeholder='Search By Name' value={searchVal} onChange={onSearch} className='search-input' />
          </div>
      </div>
        <div className='file-manager-container'>
            <div className='categories-container'>
              <div style={{display:'flex'}}>  <h4 className='category-heading'>CATEGORIES</h4> <IoIosSettings className='category-icon'/></div>
                <Categories labelsChanged={labelsChanged}/>
            </div>
            <div className='all-items-container'>
                <h3>All items</h3>
                <table className='files-container'>
                    <thead>
                        <tr className='trow'>
                       <th> <input type="checkbox" /></th>
                        <th>NAME</th>
                        <th>OWNER</th>
                        <th>LABELS</th>
                        <th>TYPE</th>
                        <th>MODIFIED</th>
                        <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        filteredList.map(file=><FileItem key={file.id} fileData={file} changeLabelStatus={changeLabelStatus} deleteFile={deleteFile} updateFile={updateFile}/>)
                       }
                    </tbody>
                  
                </table>
            </div>
        </div>
    </div>
    </div>
    )
}
export default FileManager