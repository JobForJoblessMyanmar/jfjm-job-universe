import { useMemo, useState } from "react";
import { Input, Label } from "@/components/ui/input";
import { prefixFirstRank } from "@/lib/utils";

export function SuggestField({
  label,
  value,
  onChange,
  items,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  items: readonly string[];
  placeholder?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const matches = useMemo(
    () => prefixFirstRank(value, [...items], 8),
    [value, items],
  );

  return (
    <div className="relative">
      <Label>{label}</Label>
      <Input
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
      />
      {open && matches.length > 0 ? (
        <div className="suggest-list" role="listbox">
          {matches.map((item) => (
            <button
              key={item}
              type="button"
              className="suggest-item"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
