import { useState } from 'react'
import { searchclose, searchIcon } from '../../utils'
import s from './search.module.scss'
import { filterStore } from '../../store/filterStore';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const {setSearchVal} = filterStore()
  const confirm = (event: React.FormEvent)=>{
    event.preventDefault();
    setSearchVal(searchText)
  }
  const clear = ()=>{
    setSearchText('')
    setSearchVal('')
  }
  return (
    <form onSubmit={confirm} action="" className={s.search}>
      <button className={s.search__btn}>
        <img src={searchIcon} alt="" />
      </button>
      <input 
        type="text" 
        className={s.search__input} 
        placeholder='Введите блюдо или состав'
        value={searchText}
        onChange={(event)=>{setSearchText(event.target.value)}}
      />
      {
        searchText && <img onClick={clear} src={searchclose} alt="" className={s.search__clear} />
      }
    </form>
  )
}

export default Search