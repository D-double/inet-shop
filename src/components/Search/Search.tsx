import { useState } from 'react'
import { searchclose, searchIcon } from '../../utils'
import s from './Search.module.scss'
import filterStore from '../../store/filterStore'

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const {setSearchValue} = filterStore()
const confirm = (event: React.FormEvent)=>{
  event.preventDefault()
  setSearchValue(searchText)
}
const reset = ()=>{
  setSearchText('')
  setSearchValue('')
}
return (
<form className={s.search} onSubmit={confirm}>
  <button className={s.search__btn}>
    <img src={searchIcon} alt="" />
  </button>
  <input 
    type="text" 
    className={s.search__input} 
    placeholder='Введите блюдо или состав'
    value={searchText}
    onChange={(e)=>{ setSearchText(e.target.value)}}
  />
  {searchText && <img onClick={reset} src={searchclose} alt="" className={s.search__clear} />}
</form>
)
}

export default Search