import type { User, Interest} from "@/../../shared/types/types.ts"
import pfp from "@/assets/profile_picture_example.jpg"
import { useState} from 'react'
import { ProfileIcon } from "@/components/ProfileIcon";
import { Progress } from "@/components/ui/progress";
import Button from "@/components/Button";
import { FieldRender, type FieldSchema } from "@/components/FieldRender"; 

export const exampleUserStringInterests: User = {
  user_id: "c3b6a6f1-1b7d-4de1-9c37-5a5f2d2b2a11",
  email: "amina.khan@example.org",
  name: "Amina Khan",
  age: 28,
  country: "Kenya",
  language: "en",
  affiliation:"UMD",
  interests: [
    "climate_action",
    "gender_equality",
    "inclusive_governance",
    "sustainable_cities",
  ] as unknown as Interest[],
  created_at: "2025-10-08T13:45:12.000Z",
  updated_at: "2025-10-08T13:45:12.000Z",
  profile_picture: pfp,
};

const FIELD_SCHEMAS: Partial<Record<keyof User, FieldSchema>> = {
  country: { type: "country" },
  age: {
    type: "number",
    toDisplay: (v) => (v == null ? "" : String(v)),
    toStorage: (s) => (s === "" ? undefined : Number(s)),
  },
  email: { type: "email" },
};

export function ProfilePage(){
    const [userData, setUserData] = useState(exampleUserStringInterests)
    const [completionPercentage, setCompletionPercentage] = useState(70)

    const hidden = ["user_id", "created_at", "updated_at", "profile_picture"]


    const handleFieldChange = (key: keyof User, value: string) => {
      setUserData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
    const saveChanges = async () =>{
      console.log(userData)
    }

    return(
        <>
        <div>
            <div>
                <ProfileIcon diameter={300} enable_replace={true}/>
              <div className="grid grid-cols-3 items-center mb-1">
                <span className="col-start-2 justify-self-center text-lg font-medium">
                  Profile Completion
                </span>
                <span className="col-start-3 justify-self-end text-lg font-medium">
                  {completionPercentage}%
                </span>
              </div>

                <Progress 
                  value={completionPercentage}
                  className="h-5"
                />
            </div>
              {/* Editable Form for ALL fields */}
<div className="space-y-6 text-left pt-10">
        {Object.entries(userData).map(([key, value]) => {
          if (hidden.includes(key)) return null;
          const typedKey = key as keyof User;

          return (
            <div key={key} className="space-y-2">
              <label className="block text-lg font-medium capitalize">
                {key.replaceAll("_", " ")}
              </label>
              <FieldRender
                field={key}
                value={value}
                schema={FIELD_SCHEMAS[typedKey]}
                onChange={(newVal) => handleFieldChange(typedKey, newVal)}
              />
            </div>
          );
        })}
      </div>
        <div className="pt-6">
          <Button 
          label="Save"
          onClick={saveChanges}
          />
        </div>

      </div>
    </>
    )



}