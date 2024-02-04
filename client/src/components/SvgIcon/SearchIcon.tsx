import { SvgIcon, SvgIconProps } from "@mui/material";

const SearchIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon
            sx={{
                padding: "2px"
            }}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g opacity="0.3">
                <path
                    fill="none"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.7778 7.74038C12.7778 10.5228 10.5228 12.7777 7.74045 12.7777C4.95911 12.7777 2.7037 10.5228 2.7037 7.74038C2.7037 4.95905 4.95911 2.70364 7.74045 2.70364C10.5228 2.70364 12.7778 4.95905 12.7778 7.74038Z"
                    stroke="black"
                />
                <path d="M15.2963 15.2963L11.1481 11.1481" stroke="black" />
            </g>
        </SvgIcon>
    );
};

export default SearchIcon;
