import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const FilterForm = ({fields}) => {
    const [selectedValue, setSelectedValue] = useState()
    const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({});
  const [selectedQuickFilter, setSelectedQuickFilter] = useState("All");

  useEffect(() => {
    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
      fields?.forEach(field => {
        if (field.fieldName === param) {
          const val = field.fieldOptions?.find(option => option[field.type || "text"] === value);
          if (val) {
            setFormData(prevState => ({
              ...prevState,
              [param]: val
            }));
          }
        }
      });
    }
  }, [fields, searchParams]);

  useEffect(() => {
    if (!selectedQuickFilter) {
      setSearchParams({ quickFilter: "All" });
    }
  }, []);

  const handleInputChange = (fieldName, value) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
      console.log(selectedValue)
      setSearchParams((prevSearchParams) => {
        const dataArray = Object.entries(selectedValue).map(([key, value]) => ({ key, value }));
        dataArray.forEach(({ key, value }) => {
          const currentField = fields.find((el) => el.fieldName === key);
          const currentType = currentField?.type || "text";
          if (currentType && value?.[currentType]) {
            prevSearchParams.set(key, value?.[currentType]);
            prevSearchParams.set("pageNumber",1);
          } else {
            prevSearchParams.delete(key);
            prevSearchParams.set("pageNumber", 1);
          }
        });
  
        return prevSearchParams.toString();
      });
  };

  const handleQuickFilter = filter => {
    setSelectedQuickFilter(filter);
  };

  const handleReset = () => {
    const params = Object.fromEntries([...searchParams]);
    for (const key in params) {
      if (key !== "quickFilter") {
        searchParams.delete(key);
      }
    }
    setSearchParams(searchParams);
    setFormData({});
    setSelectedQuickFilter("All");
    window.location.search = "";
  };
    const handeChange = (e,name) =>{
e.preventDefault();
setSelectedValue(prev => ({ ...prev, [name]: e.target.value }));

    }
  return (
  <form onSubmit={handleSubmit}>
    <div style={{display: "flex", flexWrap: "wrap", gap:"1rem"}}>
    {fields?.map((field,index) => {
    return(<div key={index} style={{display: "flex", flexDirection:'column'}}>
    <p> {field.label}</p>
    <input name={field?.fieldName} type={"text"}  value={formData[field.fieldName] && selectedValue[field.fieldName]} placeholder={field.placeHolder} onChange={(e)=> handeChange(e,field.fieldName)}/>
    </div>)
})}
</div>
<button type='submit' > Filter </button>
  </form>
  )
}

export default FilterForm