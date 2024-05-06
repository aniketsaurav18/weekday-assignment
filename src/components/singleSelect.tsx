import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SingleSelect({
  options,
  selectedOption,
  setSelectedOption,
  label,
}: any) {
  const handleChange = (event: SelectChangeEvent) => {
    console.log("single select event", event.target.value);
    setSelectedOption(event.target.value as string);
  };

  return (
    <div
      className="single-select"
      style={{
        minWidth: "200px",
        display: "inline-flex",
        margin: "10px 10px 10px 10px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOption}
          label={label}
          onChange={handleChange}
        >
          {options.map((d: string) => {
            return <MenuItem value={d}>{d}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
