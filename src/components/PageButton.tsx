import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

interface Props {
    btnName: string;
    navigateTo:string;
}
const PageButton = ({btnName, navigateTo }:Props) => {
const navigate = useNavigate();
return(<Button
    type="button"
    colorPalette="gray"
    onClick={() => navigate(navigateTo)}
    ml={2}
>
    {btnName}
</Button>);
}
export default PageButton;