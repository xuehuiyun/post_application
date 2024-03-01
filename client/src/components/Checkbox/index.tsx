import {
    Checkbox as MUICheckbox,
    CheckboxProps as MUICheckboxProps
} from "@mui/material";

import {
    CheckboxIcon,
    IndeterminateCheckboxIcon,
    OutlinedCheckboxIcon
} from "../SvgIcon";

interface CheckboxProps {
    checked: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    onChange?: MUICheckboxProps["onChange"];
    sx?: MUICheckboxProps["sx"];
}

const Checkbox = ({
    checked = false,
    indeterminate = false,
    disabled = false,
    onChange,
    sx
}: CheckboxProps) => {
    return (
        <MUICheckbox
            checked={checked}
            onChange={onChange}
            checkedIcon={<CheckboxIcon disabled={disabled} />}
            icon={<OutlinedCheckboxIcon disabled={disabled} />}
            indeterminate={indeterminate}
            indeterminateIcon={
                <IndeterminateCheckboxIcon disabled={disabled} />
            }
            disableRipple={true}
            sx={[
                {
                    padding: "0",
                    width: "18px",
                    height: "18px",
                    "& .MuiSvgIcon-root": {
                        padding: "0",
                        width: "18px",
                        height: "18px"
                    }
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        />
    );
};

export default Checkbox;
