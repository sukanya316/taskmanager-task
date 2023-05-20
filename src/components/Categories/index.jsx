import { useEffect,useState } from 'react'
import './index.css'

const Categories=(props)=>{
    const {labelsChanged}=props
    const [categories,setCategories]=useState([])
    const [selectedLabels,setSelectedLabels]=useState([])
    const getCategories=async()=>{
        const url="https://646312614dca1a661353d0ee.mockapi.io/api/Category"
        const response=await fetch(url)
        const data=await response.json()
        const formattedData=data.map(category=>({
            name:category.Name,
            id:category.id,
            labels:category.Labels.map(label=>({
                name:label.Name,
                id:label.id
            }))
        }))
        // console.log(formattedData)
        setCategories(formattedData)
    }

   const changeCategoryLabel=(event)=>{
    const id=event.target.id
    const labelId=id.split('-')[2]
    if(document.getElementById(id).checked){
    const res=categories.map(category=>(category.labels.filter(label=>label.id===labelId)))
    const labelsList=res.flat()
    setSelectedLabels([...selectedLabels,labelsList])
    const labels=[...selectedLabels,labelsList]
    // console.log(selectedLabels.flat())
    labelsChanged(labels.flat())
    }
    else{
        const resList=selectedLabels.map(labelArr=>(labelArr.filter(label=>label.id!==labelId)))
        // selectedLabels.filter(label=>label.id!==labelId)
        const labels=[...resList]
        setSelectedLabels(labels)
        console.log('else',labels.flat())
        labelsChanged(labels.flat())
    }
    }

    useEffect(()=>{
        getCategories()
    },[])

    return(
        <>
            {
                categories.map(category=><div key={category.id}>
            <h4>{category.name}</h4>
        
            {
                category.labels.map(label=><li key={label.id}>
                    <input type="checkbox" id={`category-checkbox-${label.id}`} onChange={changeCategoryLabel}/>
                    <label htmlFor='category-checkbox'>{label.name}</label>
                </li>)
            }
          </div>
            )
        }   

        </>
    )
}
export default Categories