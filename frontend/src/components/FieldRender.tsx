// FieldRender.tsx
import { OneLineInput } from "@/components/OneLineInput";
import { CountrySelect } from "./SelectCountry";

type FieldType = "string" | "country" | "number";

export interface FieldSchema {
  type: FieldType;
  // Transform raw state -> UI string (or number shown as string)
  toDisplay?: (raw: unknown) => string;
  // Transform UI string -> stored value (e.g., Number(s) or ISO code)
  toStorage?: (input: string) => any;
}

export function FieldRender({
  field,
  value,
  schema,
  onChange,
}: {
  field: string;
  value: unknown;
  schema?: FieldSchema;            // if omitted, falls back to "string"
  onChange: (newVal: any) => void;
}) {
  const kind: FieldType = schema?.type ?? "string";
  const placeholder = field.replaceAll("_", " ")


  if (kind === "country") {
    const display =
      schema?.toDisplay?.(value) ??
      (Array.isArray(value) ? value.join(", ") : value?.toString() ?? "");
    return (
      <CountrySelect
        value={display}
        onChange={(v) => onChange(schema?.toStorage ? schema.toStorage(v) : v)}
        placeholder={`Enter ${placeholder}...`}
      />
    );
  }

  if (kind === "number") {
    const display =
      schema?.toDisplay?.(value) ?? (value == null ? "" : String(value));
    return (
      <OneLineInput
        value={display}
        onChange={(s) => onChange(schema?.toStorage ? schema.toStorage(s) : s)}
        placeholder={`Enter ${placeholder}...`}
      />
    );
  }

  const stringValue =
    schema?.toDisplay?.(value) ??
    (Array.isArray(value) ? value.join(", ") : value?.toString() ?? "");
  return (
    <OneLineInput
      value={stringValue}
      onChange={(s) => onChange(schema?.toStorage ? schema.toStorage(s) : s)}
        placeholder={`Enter ${placeholder}...`}

    />
  );
}
