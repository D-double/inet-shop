import { useState } from 'react';
import Select from 'react-select'
import filterStore from '../../store/filterStore';

const options = [
  { value: '', label: 'товары' },
  { value: 'price', label: 'Цене' },
  { value: 'rating', label: 'Рейтингу' },
  { value: 'title', label: 'Названию' }
];

const Sort = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { setSortValue } = filterStore(state => state)
  const changeOption = (option)=>{
    setSelectedOption(option)
    setSortValue(option.value)
    // console.log(option);
  }
  return (
  <Select
    placeholder='Сортировать по:'
    options={options}
    value={selectedOption}
    onChange={changeOption}
  />
  )
}

export default Sort