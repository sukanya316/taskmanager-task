import {MdOutlineAdd} from 'react-icons/md'
import './index.css'

const Header=()=>{
    return(
        <div className='header-contianer'>
            <h1>File Manager</h1>
            <button type='button' className='upload-btn'><MdOutlineAdd/>Upload</button>
        </div>
    )
}
export default Header