import Select, { type SingleValue } from "react-select"
import countryList from "react-select-country-list"
import {  useMemo } from "react"



type CountryOption = {label: string; value: string;}

interface CountrySelectProps{
    value?:string;
    onChange: (newValue:string) => void;
    placeholder?:string;
    className?:string
}


export function CountrySelect({
    value,
    onChange,
    placeholder = "Select a country...",
    className
}:CountrySelectProps){
    const options = useMemo(() => countryList().getData() as CountryOption[], []);
    const selected = options.find((o) => o.label === value) ?? options.find((o) => o.value === value);
    
    const handleChange =(option: SingleValue<CountryOption>) =>{
        if(option) onChange(option.label)
    }
    return(
        <Select 
            options={options}
            value={selected?? null}
            onChange={handleChange}
            placeholder={placeholder}
            isSearchable
            className={className || ""}
            classNamePrefix="country"
            styles={
                {
                    menuList: (base) =>({
                        ...base,
                        maxHeight: 220,
                        overflowY: "auto",
                    })
                }
            }   
        />

    )


}