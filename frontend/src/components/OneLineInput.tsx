import React, { useState } from "react";
import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Delete } from 'lucide-react';

interface OneLineInputProps{
  placeHolder? : string;
  maxLength: number;
}
/**
 * 
 * @param placeHolder - Optional placeholder to keep in the input text
 * @param maxLength - Sets the maximum number of characters allowed; defaults to 50 
 * Example:
 *  <OneLineInputer placeHolder="Username" maxLength =25/>  
 */
const OneLineInput: React.FC<OneLineInputProps> = ({placeHolder, maxLength = 50}) => {
  const [value, setValue] = useState("");
  return (
    <InputGroup>
      <InputGroupInput 
      placeholder={placeHolder} 
      onChange={(e) => setValue(e.target.value)}
      value={value}
      maxLength={maxLength}
      className="
      py-2 pl-3 pr-10 
      "
      />
        {value && (
          <Delete
            onClick={()=> setValue("")} 
            className="
            absolute right-2 top-1/2 -translate-y-1/2
            h-5 w-5 text-grey-200
            hover:scale-125 transition-transform duration-300 ease-in-out
            hover:cursor-pointer
            p1
            "
          />
        )}
    </InputGroup>

  )
};
export default OneLineInput;