import { useState } from 'react';
import Select from 'react-select';
import { filterStore } from '../../store/filterStore';
const options = [
  { value: 'price', label: 'По цене' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'title', label: 'По названию' },
];

const Sort = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {setSortVal} = filterStore()
  const handleChange = (opt)=>{
    setSortVal(opt.value)
    setSelectedOption(opt)
  }
  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder='Сортировать по:'
    />
  )
}

export default Sort