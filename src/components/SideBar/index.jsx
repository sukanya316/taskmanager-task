import {Link} from 'react-router-dom'
import './index.css'

const SideBar=()=>{
    return(
        <div className='sidebar-container'>
            <h1>Stealth</h1>
           <Link to="/" className='remove-underline'> <h3 className='file-manager-heading'>File Manager</h3></Link>
        </div>
    )
}
export default SideBar